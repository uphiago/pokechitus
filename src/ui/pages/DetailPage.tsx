import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { usePokemonDetailQuery } from '../../state/usePokemonDetailQuery';
import { type FavoritesState, toggleFavorite } from '../../state/favoritesStore';
import { AsyncState } from '../components/AsyncState';
import { PokemonDetailPanel } from '../components/PokemonDetailPanel';
import { PokemonDetailSkeleton } from '../components/Skeletons';

type Props = {
  favorites: FavoritesState;
  setFavorites: (next: FavoritesState) => void;
};

const MAX_POKEMON_ID = 151;

export const DetailPage = ({ favorites, setFavorites }: Props) => {
  const params = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  const detail = usePokemonDetailQuery(params.id ?? '', favorites.ids);
  const currentId = Number(params.id ?? '1');
  const backTarget = location.search ? `/?${location.search.slice(1)}` : '/';

  useEffect(() => {
    headingRef.current?.focus();
  }, [params.id]);

  return (
    <main>
      <div className="detail-topbar">
        <button className="btn" onClick={() => navigate(backTarget)}>
          ← Back to results
        </button>
        <div className="row">
          <button className="btn" disabled={currentId <= 1} onClick={() => navigate(`/pokemon/${currentId - 1}${location.search}`)}>
            Prev
          </button>
          <button
            className="btn"
            disabled={currentId >= MAX_POKEMON_ID}
            onClick={() => navigate(`/pokemon/${currentId + 1}${location.search}`)}
          >
            Next
          </button>
        </div>
      </div>

      <h1 ref={headingRef} tabIndex={-1}>Pokemon Detail</h1>
      <AsyncState
        loading={detail.isPending}
        loadingFallback={<PokemonDetailSkeleton />}
        error={detail.isError ? 'Could not load Pokemon detail.' : null}
        partial={detail.isFetching && detail.isSuccess}
        onRetry={() => detail.refetch()}
      >
        {detail.data ? (
          <PokemonDetailPanel
            detail={detail.data}
            onToggleFavorite={(id) => setFavorites(toggleFavorite(favorites, id))}
            onOpenPokemon={(id) => navigate(`/pokemon/${id}${location.search}`)}
          />
        ) : null}
      </AsyncState>
    </main>
  );
};
