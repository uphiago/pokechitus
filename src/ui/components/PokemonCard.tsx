import { useEffect, useMemo, useState } from 'react';
import type { PokemonSummary } from '../../domain/pokemon';

const FALLBACK_SPRITE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';

type Props = {
  pokemon: Pick<PokemonSummary, 'id' | 'name' | 'types' | 'isFavorite' | 'spriteUrl'>;
  animIndex?: number;
  onToggleFavorite: (id: string) => void;
  onOpenDetail?: (id: string) => void;
  onPrefetchDetail?: (id: string) => void;
};

const typeClass = (type: string | undefined): string => {
  if (!type) return 'type-default';
  return `type-${type.replace(/\s+/g, '-').toLowerCase()}`;
};

export const PokemonCard = ({ pokemon, animIndex = 0, onToggleFavorite, onOpenDetail, onPrefetchDetail }: Props) => {
  const [src, setSrc] = useState(pokemon.spriteUrl ?? FALLBACK_SPRITE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSrc(pokemon.spriteUrl ?? FALLBACK_SPRITE);
    setLoaded(false);
  }, [pokemon.spriteUrl]);

  const themeClass = useMemo(() => typeClass(pokemon.types[0]), [pokemon.types]);
  const delay = Math.min(animIndex * 35, 500);

  return (
    <article
      className={`card ${themeClass}`}
      data-testid="pokemon-card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="card-media">
        <div className="card-sprite-wrap">
          {!loaded && <div className="skeleton skeleton-block card-sprite-img" />}
          <img
            className={`card-sprite-img ${loaded ? 'is-ready' : 'is-loading'}`}
            src={src}
            alt={pokemon.name}
            loading="lazy"
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
        {pokemon.isFavorite && <span className="fav-badge">★</span>}
      </div>

      <div className="card-body">
        <p className="card-sub">#{pokemon.id.padStart(3, '0')}</p>
        <h3 className="card-title">{pokemon.name}</h3>
        <div className="type-badges centered">
          {(pokemon.types.length ? pokemon.types : ['unknown']).map((type) => (
            <span key={type} className={`type-pill ${typeClass(type)}`}>
              {type}
            </span>
          ))}
        </div>
      </div>

      <div className="card-actions">
        <button className="btn btn-ghost btn-icon" onClick={() => onToggleFavorite(pokemon.id)} aria-label={pokemon.isFavorite ? 'Remover favorito' : 'Favoritar'}>
          {pokemon.isFavorite ? '★' : '☆'}
        </button>
        {onOpenDetail && (
          <button
            className="btn btn-primary btn-full"
            onMouseEnter={() => onPrefetchDetail?.(pokemon.id)}
            onFocus={() => onPrefetchDetail?.(pokemon.id)}
            onClick={() => onOpenDetail(pokemon.id)}
          >
            Detalhes
          </button>
        )}
      </div>
    </article>
  );
};
