import type { PokemonSummary } from '../../domain/pokemon';

type Props = {
  pokemon: Pick<PokemonSummary, 'id' | 'name' | 'types' | 'isFavorite'>;
  onToggleFavorite: (id: string) => void;
  onOpenDetail?: (id: string) => void;
};

export const PokemonCard = ({ pokemon, onToggleFavorite, onOpenDetail }: Props) => {
  return (
    <article className="card" data-testid="pokemon-card">
      <h3>{pokemon.name}</h3>
      <p>{pokemon.types.join(', ') || 'unknown type'}</p>
      <div className="row">
        <button onClick={() => onToggleFavorite(pokemon.id)}>
          {pokemon.isFavorite ? 'Unfavorite' : 'Favorite'}
        </button>
        {onOpenDetail ? <button onClick={() => onOpenDetail(pokemon.id)}>Details</button> : null}
      </div>
    </article>
  );
};
