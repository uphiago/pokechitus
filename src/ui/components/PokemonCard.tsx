import type { PokemonSummary } from '../../domain/pokemon';

type Props = {
  pokemon: Pick<PokemonSummary, 'id' | 'name' | 'types' | 'isFavorite' | 'spriteUrl'>;
  onToggleFavorite: (id: string) => void;
  onOpenDetail?: (id: string) => void;
};

export const PokemonCard = ({ pokemon, onToggleFavorite, onOpenDetail }: Props) => {
  return (
    <article className="card" data-testid="pokemon-card">
      <div className="card-head">
        <img
          className="sprite"
          src={pokemon.spriteUrl ?? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'}
          alt={pokemon.name}
          loading="lazy"
        />
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
