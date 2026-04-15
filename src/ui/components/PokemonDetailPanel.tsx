import { useEffect, useMemo, useState } from 'react';
import type { PokemonDetail } from '../../domain/pokemon';

const FALLBACK_SPRITE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';

type TabKey = 'overview' | 'stats' | 'evolution' | 'moves';

type Props = {
  detail: PokemonDetail;
  onToggleFavorite: (id: string) => void;
  onOpenPokemon: (id: string) => void;
};

const statLabel = (raw: string) =>
  raw.replace(/-/g, ' ').replace(/\b\w/g, (m) => m.toUpperCase());

const capitalized = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const typeClass = (type: string | undefined): string => {
  if (!type) return 'type-default';
  return `type-${type.replace(/\s+/g, '-').toLowerCase()}`;
};

const statColor = (value: number) => {
  if (value >= 100) return '#22c55e';
  if (value >= 60) return '#f59e0b';
  return '#ef4444';
};

export const PokemonDetailPanel = ({ detail, onToggleFavorite, onOpenPokemon }: Props) => {
  const artSrc = detail.artworkUrl ?? detail.spriteUrl ?? FALLBACK_SPRITE;
  const [src, setSrc] = useState(artSrc);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState<TabKey>('overview');

  useEffect(() => {
    setSrc(detail.artworkUrl ?? detail.spriteUrl ?? FALLBACK_SPRITE);
    setLoaded(false);
    setTab('overview');
  }, [detail.id, detail.artworkUrl, detail.spriteUrl]);

  const totalStats = useMemo(
    () => detail.stats.reduce((acc, stat) => acc + stat.value, 0),
    [detail.stats]
  );

  const primaryType = detail.types[0];
  const topMoves = detail.moves.slice(0, 16);

  return (
    <section className={`card detail-card ${typeClass(primaryType)}`}>
      <div className="detail-shell">
        <div className="detail-left">
          <div className="detail-artwork-wrap">
            {!loaded && <div className="skeleton skeleton-block detail-artwork" />}
            <img
              className={`detail-artwork ${loaded ? 'is-ready' : 'is-loading'}`}
              src={src}
              alt={detail.name}
              onLoad={() => setLoaded(true)}
              onError={() => {
                if (src !== FALLBACK_SPRITE) {
                  setSrc(FALLBACK_SPRITE);
                  return;
                }
                setLoaded(true);
              }}
            />
          </div>

          <div className="detail-id-row">
            <span className="card-sub">#{detail.id.padStart(3, '0')}</span>
            {detail.isLegendary && <span className="legend-badge">Lendário</span>}
          </div>
          <h2 className="detail-name">{detail.name}</h2>

          <div className="type-badges centered" style={{ marginBottom: 12 }}>
            {(detail.types.length ? detail.types : ['unknown']).map((type) => (
              <span key={type} className={`type-pill ${typeClass(type)}`}>
                {type}
              </span>
            ))}
          </div>

          {detail.flavorText && (
            <p className="detail-flavor">{detail.flavorText}</p>
          )}

          <button className="btn btn-ghost touch-btn detail-fav-btn" onClick={() => onToggleFavorite(detail.id)}>
            {detail.isFavorite ? '★ Favorito' : '☆ Favoritar'}
          </button>
        </div>

        <div className="detail-right">
          <div className="detail-metrics">
            <div className="metric-card">
              <span>Peso</span>
              <strong>{detail.weight == null ? 'N/A' : `${(detail.weight / 10).toFixed(1)} kg`}</strong>
            </div>
            <div className="metric-card">
              <span>Altura</span>
              <strong>{detail.height == null ? 'N/A' : `${(detail.height / 10).toFixed(1)} m`}</strong>
            </div>
          </div>

          <div className="detail-tabs" role="tablist" aria-label="Pokemon detail sections">
            {(['overview', 'stats', 'evolution', 'moves'] as TabKey[]).map((t) => (
              <button
                key={t}
                className={`btn tab-btn ${tab === t ? 'tab-active' : ''}`}
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
              >
                {t === 'overview' ? 'Overview' : t === 'stats' ? 'Stats' : t === 'evolution' ? 'Evolução' : 'Moves'}
              </button>
            ))}
          </div>

          {tab === 'overview' && (
            <div className="detail-section motion-fade">
              <div className="detail-block">
                <h3>Habilidades</h3>
                <div className="chip-row">
                  {detail.abilities.length ? (
                    detail.abilities.map((item) => (
                      <span key={item} className="chip neutral">{capitalized(item)}</span>
                    ))
                  ) : (
                    <span className="chip neutral">N/A</span>
                  )}
                </div>
              </div>

              {detail.heldItems.length > 0 && (
                <div className="detail-block">
                  <h3>Itens Carregados</h3>
                  <div className="chip-row">
                    {detail.heldItems.slice(0, 8).map((item) => (
                      <span key={item} className="chip neutral">{capitalized(item)}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="chip-section">
                <h3>Matchup de Tipo</h3>
                {detail.typeMatchup.weakTo.length > 0 && (
                  <div className="chip-group">
                    <span className="chip-label">Fraco contra</span>
                    {detail.typeMatchup.weakTo.map((item) => (
                      <span key={item} className={`type-pill ${typeClass(item)} chip-sm`}>{item}</span>
                    ))}
                  </div>
                )}
                {detail.typeMatchup.resistantTo.length > 0 && (
                  <div className="chip-group">
                    <span className="chip-label">Resiste a</span>
                    {detail.typeMatchup.resistantTo.map((item) => (
                      <span key={item} className={`type-pill ${typeClass(item)} chip-sm`}>{item}</span>
                    ))}
                  </div>
                )}
                {detail.typeMatchup.immuneTo.length > 0 && (
                  <div className="chip-group">
                    <span className="chip-label">Imune a</span>
                    {detail.typeMatchup.immuneTo.map((item) => (
                      <span key={item} className={`type-pill ${typeClass(item)} chip-sm`}>{item}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === 'stats' && (
            <div className="detail-section motion-fade">
              <div className="stats">
                {detail.stats.map((stat) => (
                  <div key={stat.name} className="stat-row">
                    <span className="stat-name">{statLabel(stat.name)}</span>
                    <div className="stat-bar-wrap">
                      <div
                        className="stat-bar"
                        style={{
                          width: `${Math.min(stat.value, 150) / 1.5}%`,
                          background: statColor(stat.value)
                        }}
                      />
                    </div>
                    <span className="stat-val">{stat.value}</span>
                  </div>
                ))}
              </div>
              <p className="stats-total">Total: <strong>{totalStats}</strong></p>
            </div>
          )}

          {tab === 'evolution' && (
            <div className="detail-section motion-fade">
              <div className="evo-chain">
                {detail.evolutionChain.map((evo, index) => (
                  <div key={evo.id} className="evo-node-wrap">
                    <button className="btn evo-node" onClick={() => onOpenPokemon(evo.id)}>
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evo.id}.png`}
                        alt={evo.name}
                        className="evo-sprite"
                      />
                      <span>#{evo.id.padStart(3, '0')}</span>
                      <span>{capitalized(evo.name)}</span>
                    </button>
                    {index < detail.evolutionChain.length - 1 && <span className="evo-arrow">→</span>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'moves' && (
            <div className="detail-section motion-fade">
              <div className="chip-row">
                {topMoves.length ? (
                  topMoves.map((move) => (
                    <span key={move} className="chip neutral">{capitalized(move)}</span>
                  ))
                ) : (
                  <span className="chip neutral">Nenhum move disponível.</span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
