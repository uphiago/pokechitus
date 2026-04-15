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
  raw
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase());

const capitalized = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);

const typeClass = (type: string | undefined): string => {
  if (!type) return 'type-default';
  return `type-${type.replace(/\s+/g, '-').toLowerCase()}`;
};

export const PokemonDetailPanel = ({ detail, onToggleFavorite, onOpenPokemon }: Props) => {
  const [src, setSrc] = useState(detail.spriteUrl ?? FALLBACK_SPRITE);
  const [loaded, setLoaded] = useState(false);
  const [tab, setTab] = useState<TabKey>('overview');

  useEffect(() => {
    setSrc(detail.spriteUrl ?? FALLBACK_SPRITE);
    setLoaded(false);
    setTab('overview');
  }, [detail.id, detail.spriteUrl]);

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
          <p className="card-sub detail-number">#{detail.id.padStart(3, '0')}</p>
          <h2>{detail.name}</h2>

          <div className="sprite-wrap detail-sprite-wrap">
            {!loaded ? <div className="skeleton skeleton-block detail-sprite" /> : null}
            <img
              className={`detail-sprite ${loaded ? 'is-ready' : 'is-loading'}`}
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

          <div className="type-badges centered">
            {(detail.types.length ? detail.types : ['unknown']).map((type) => (
              <span key={type} className={`type-pill ${typeClass(type)}`}>
                {type}
              </span>
            ))}
          </div>

          <div className="detail-actions">
            <button className="btn btn-ghost touch-btn" onClick={() => onToggleFavorite(detail.id)}>
              {detail.isFavorite ? '★ Favorited' : '☆ Favorite'}
            </button>
          </div>
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
            <button
              className={`btn ${tab === 'overview' ? 'btn-primary' : ''}`}
              role="tab"
              aria-selected={tab === 'overview'}
              onClick={() => setTab('overview')}
            >
              Overview
            </button>
            <button
              className={`btn ${tab === 'stats' ? 'btn-primary' : ''}`}
              role="tab"
              aria-selected={tab === 'stats'}
              onClick={() => setTab('stats')}
            >
              Stats
            </button>
            <button
              className={`btn ${tab === 'evolution' ? 'btn-primary' : ''}`}
              role="tab"
              aria-selected={tab === 'evolution'}
              onClick={() => setTab('evolution')}
            >
              Evolution
            </button>
            <button
              className={`btn ${tab === 'moves' ? 'btn-primary' : ''}`}
              role="tab"
              aria-selected={tab === 'moves'}
              onClick={() => setTab('moves')}
            >
              Moves
            </button>
          </div>

          {tab === 'overview' ? (
            <div className="detail-section motion-fade">
              <div className="detail-block">
                <h3>Abilities</h3>
                <div className="type-badges">
                  {detail.abilities.length ? (
                    detail.abilities.map((item) => (
                      <span key={item} className="chip neutral">
                        {capitalized(item)}
                      </span>
                    ))
                  ) : (
                    <span className="chip neutral">N/A</span>
                  )}
                </div>
              </div>

              <div className="detail-block">
                <h3>Held Items</h3>
                <div className="type-badges">
                  {detail.heldItems.length ? (
                    detail.heldItems.slice(0, 8).map((item) => (
                      <span key={item} className="chip neutral">
                        {capitalized(item)}
                      </span>
                    ))
                  ) : (
                    <span className="chip neutral">None</span>
                  )}
                </div>
              </div>

              <div className="chip-section">
                <h3>Type Matchup</h3>
                <div className="chip-group">
                  <span className="chip-label">Weak to</span>
                  {detail.typeMatchup.weakTo.length ? (
                    detail.typeMatchup.weakTo.map((item) => <span key={item} className="chip weak">{item}</span>)
                  ) : (
                    <span className="chip neutral">None</span>
                  )}
                </div>
                <div className="chip-group">
                  <span className="chip-label">Resistant to</span>
                  {detail.typeMatchup.resistantTo.length ? (
                    detail.typeMatchup.resistantTo.map((item) => (
                      <span key={item} className="chip resist">{item}</span>
                    ))
                  ) : (
                    <span className="chip neutral">None</span>
                  )}
                </div>
                <div className="chip-group">
                  <span className="chip-label">Immune to</span>
                  {detail.typeMatchup.immuneTo.length ? (
                    detail.typeMatchup.immuneTo.map((item) => (
                      <span key={item} className="chip immune">{item}</span>
                    ))
                  ) : (
                    <span className="chip neutral">None</span>
                  )}
                </div>
              </div>
            </div>
          ) : null}

          {tab === 'stats' ? (
            <div className="detail-section motion-fade">
              <div className="stats">
                {detail.stats.map((stat) => (
                  <div key={stat.name} className="stat-row">
                    <span>{statLabel(stat.name)}</span>
                    <div className="stat-bar-wrap">
                      <div className="stat-bar" style={{ width: `${Math.min(stat.value, 150) / 1.5}%` }} />
                    </div>
                    <span>{stat.value}</span>
                  </div>
                ))}
              </div>
              <p className="stats-total">Base stat total: {totalStats}</p>
            </div>
          ) : null}

          {tab === 'evolution' ? (
            <div className="detail-section motion-fade">
              <div className="evo-chain">
                {detail.evolutionChain.map((evo, index) => (
                  <div key={evo.id} className="evo-node-wrap">
                    <button className="btn evo-node" onClick={() => onOpenPokemon(evo.id)}>
                      #{evo.id.padStart(3, '0')} {capitalized(evo.name)}
                    </button>
                    {index < detail.evolutionChain.length - 1 ? <span className="evo-arrow">→</span> : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {tab === 'moves' ? (
            <div className="detail-section motion-fade">
              <div className="type-badges">
                {topMoves.length ? (
                  topMoves.map((move) => (
                    <span key={move} className="chip neutral">
                      {capitalized(move)}
                    </span>
                  ))
                ) : (
                  <span className="chip neutral">No moves available.</span>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
};
