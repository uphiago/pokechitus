import { useEffect, useState } from 'react';
import type { PokemonSummary } from '../../domain/pokemon';

const FALLBACK_SPRITE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png';

type Props = {
  pokemon: Pick<PokemonSummary, 'id' | 'name' | 'types' | 'isFavorite' | 'spriteUrl'>;
  onToggleFavorite: (id: string) => void;
  onOpenDetail?: (id: string) => void;
};

export const PokemonCard = ({ pokemon, onToggleFavorite, onOpenDetail }: Props) => {
  const [src, setSrc] = useState(pokemon.spriteUrl ?? FALLBACK_SPRITE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setSrc(pokemon.spriteUrl ?? FALLBACK_SPRITE);
    setLoaded(false);
  }, [pokemon.spriteUrl]);

  return (
    <article className="card" data-testid="pokemon-card">
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
      </div>
      <p className="types">{pokemon.types.join(' • ') || 'unknown type'}</p>
      <div className="row">
        <button className="btn btn-ghost" onClick={() => onToggleFavorite(pokemon.id)}>
          {pokemon.isFavorite ? '★ Favorited' : '☆ Favorite'}
        </button>
        {onOpenDetail ? (
          <button className="btn btn-primary" onClick={() => onOpenDetail(pokemon.id)}>
            Details
          </button>
        ) : null}
      </div>
    </article>
  );
};
