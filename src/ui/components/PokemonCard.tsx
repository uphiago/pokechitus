import { useEffect, useMemo, useState } from 'react';
import type { PokemonSummary } from '../../domain/pokemon';

const FALLBACK_SPRITE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';

type Props = {
  pokemon: Pick<PokemonSummary, 'id' | 'name' | 'types' | 'isFavorite' | 'spriteUrl'>;
  onToggleFavorite: (id: string) => void;
  onOpenDetail?: (id: string) => void;
  onPrefetchDetail?: (id: string) => void;
};

const typeClass = (type: string | undefined): string => {
  if (!type) return 'type-default';
  return `type-${type.replace(/\s+/g, '-').toLowerCase()}`;
};

export const PokemonCard = ({ pokemon, onToggleFavorite, onOpenDetail, onPrefetchDetail }: Props) => {
  const [src, setSrc] = useState(pokemon.spriteUrl ?? FALLBACK_SPRITE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSrc(pokemon.spriteUrl ?? FALLBACK_SPRITE);
    setLoaded(false);
  }, [pokemon.spriteUrl]);

  const themeClass = useMemo(() => typeClass(pokemon.types[0]), [pokemon.types]);

  return (
    <article className={`card ${themeClass}`} data-testid="pokemon-card">
      <div className="card-head">
        <div className="sprite-wrap">
          {!loaded ? <div className="skeleton skeleton-block sprite" /> : null}
          <img
            className={`sprite ${loaded ? 'is-ready' : 'is-loading'}`}
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
        <div>
          <h3 className="card-title">{pokemon.name}</h3>
          <p className="card-sub">#{pokemon.id.padStart(3, '0')}</p>
        </div>
        {pokemon.isFavorite ? <span className="fav-badge">Favorite</span> : null}
      </div>
      <div className="type-badges">
        {(pokemon.types.length ? pokemon.types : ['unknown']).map((type) => (
          <span key={type} className={`type-pill ${typeClass(type)}`}>
            {type}
          </span>
        ))}
      </div>
      <div className="row">
        <button className="btn btn-ghost touch-btn" onClick={() => onToggleFavorite(pokemon.id)}>
          {pokemon.isFavorite ? '★ Favorited' : '☆ Favorite'}
        </button>
        {onOpenDetail ? (
          <button
            className="btn btn-primary touch-btn"
            onMouseEnter={() => onPrefetchDetail?.(pokemon.id)}
            onFocus={() => onPrefetchDetail?.(pokemon.id)}
            onClick={() => onOpenDetail(pokemon.id)}
          >
            Details
          </button>
        ) : null}
      </div>
    </article>
  );
};
