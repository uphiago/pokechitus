import type { PokemonSummary } from '../../domain/pokemon';
import { PokemonCard } from './PokemonCard';

type Props = {
  items: PokemonSummary[];
  page: number;
  pageSize: number;
  total: number;
  isHydrating?: boolean;
  onPageChange: (page: number) => void;
  onToggleFavorite: (id: string) => void;
  onOpenDetail: (id: string) => void;
};

export const PokemonList = ({
  items,
  page,
  pageSize,
  total,
  isHydrating,
  onPageChange,
  onToggleFavorite,
  onOpenDetail
}: Props) => {
  const maxPage = Math.max(1, Math.ceil(total / pageSize));

  return (
    <section>
      <div className="results-head">
        <p>
          Showing <strong>{items.length}</strong> of <strong>{total}</strong>
        </p>
        <p>
          Page <strong>{page}</strong> / {maxPage}
        </p>
      </div>

      <div className="grid motion-fade" key={`grid-${page}`}>
        {items.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            onToggleFavorite={onToggleFavorite}
            onOpenDetail={onOpenDetail}
          />
        ))}
      </div>

      <div className="pagination sticky-pagination">
        <button className="btn" onClick={() => onPageChange(1)} disabled={page <= 1}>
          First
        </button>
        <button className="btn" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
          Previous
        </button>
        <span data-testid="page-indicator" className="page-pill">
          {page}
        </span>
        <button className="btn" onClick={() => onPageChange(page + 1)} disabled={page >= maxPage}>
          Next
        </button>
        <button className="btn" onClick={() => onPageChange(maxPage)} disabled={page >= maxPage}>
          Last
        </button>
        {isHydrating ? <span className="hydrating">Loading more...</span> : null}
      </div>
    </section>
  );
};
