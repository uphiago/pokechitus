import type { PokemonSummary } from '../../domain/pokemon';
import { PokemonCard } from './PokemonCard';

type Props = {
  items: PokemonSummary[];
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onToggleFavorite: (id: string) => void;
  onOpenDetail: (id: string) => void;
};

export const PokemonList = ({
  items,
  page,
  pageSize,
  total,
  onPageChange,
  onToggleFavorite,
  onOpenDetail
}: Props) => {
  const maxPage = Math.max(1, Math.ceil(total / pageSize));
  return (
    <section>
      <div className="grid">
        {items.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onToggleFavorite={onToggleFavorite}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </div>
      <div className="row" style={{ marginTop: 12 }}>
        <button onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
          Previous
        </button>
        <span data-testid="page-indicator">Page {page}</span>
        <button onClick={() => onPageChange(page + 1)} disabled={page >= maxPage}>
          Next
        </button>
      </div>
    </section>
  );
};
