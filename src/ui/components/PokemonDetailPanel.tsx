import type { PokemonDetail } from '../../domain/pokemon';

type Props = {
  detail: PokemonDetail;
  onToggleFavorite: (id: string) => void;
};

export const PokemonDetailPanel = ({ detail, onToggleFavorite }: Props) => {
  return (
    <section className="card">
      <h2>{detail.name}</h2>
      <p>Types: {detail.types.join(', ') || 'unknown'}</p>
      <p>Height: {detail.height ?? 'N/A'}</p>
      <p>Weight: {detail.weight ?? 'N/A'}</p>
      <p>Abilities: {detail.abilities.join(', ') || 'N/A'}</p>
      <button onClick={() => onToggleFavorite(detail.id)}>
        {detail.isFavorite ? 'Unfavorite' : 'Favorite'}
      </button>
    </section>
  );
};
