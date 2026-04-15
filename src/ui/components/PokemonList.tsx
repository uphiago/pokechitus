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
  onPrefetchDetail?: (id: string) => void;
};

export const PokemonList = ({
  items,
  page,
  pageSize,
  total,
  isHydrating,
  onPageChange,
  onToggleFavorite,
  onOpenDetail,
  onPrefetchDetail
}: Props) => {
  const maxPage = Math.max(1, Math.ceil(total / pageSize));
  const startItem = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, total);
  const pageWindowStart = Math.max(1, page - 2);
  const pageWindowEnd = Math.min(maxPage, page + 2);
  const visiblePages = Array.from(
    { length: pageWindowEnd - pageWindowStart + 1 },
    (_, index) => pageWindowStart + index
  );

  return (
    <section>
      <div className="results-head">
        <p>
          Exibindo <strong>{startItem}-{endItem}</strong> de <strong>{total}</strong>
        </p>
        <p>
          Página <strong>{page}</strong> / {maxPage}
        </p>
      </div>

      <div className="grid motion-fade" key={`grid-${page}`}>
        {items.map((pokemon, idx) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            animIndex={idx}
            onToggleFavorite={onToggleFavorite}
            onOpenDetail={onOpenDetail}
            onPrefetchDetail={onPrefetchDetail}
          />
        ))}
      </div>

      <div className="pagination sticky-pagination">
        <button className="btn" onClick={() => onPageChange(1)} disabled={page <= 1}>
          Início
        </button>
        <button className="btn" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
          Anterior
        </button>
        <div className="pagination-pages">
          {visiblePages.map((pageNumber) => (
            <button
              key={pageNumber}
              className={`btn page-pill ${pageNumber === page ? 'btn-primary' : ''}`}
              onClick={() => onPageChange(pageNumber)}
              aria-current={pageNumber === page ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          ))}
        </div>
        <button className="btn" onClick={() => onPageChange(page + 1)} disabled={page >= maxPage}>
          Próxima
        </button>
        <button className="btn" onClick={() => onPageChange(maxPage)} disabled={page >= maxPage}>
          Final
        </button>
        {isHydrating ? <span className="hydrating">Carregando mais...</span> : null}
      </div>
    </section>
  );
};
