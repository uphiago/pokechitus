import { useParams } from 'react-router-dom';
import { usePokemonDetailQuery } from '../../state/usePokemonDetailQuery';
import { type FavoritesState, toggleFavorite } from '../../state/favoritesStore';
import { AsyncState } from '../components/AsyncState';
import { PokemonDetailPanel } from '../components/PokemonDetailPanel';
import { PokemonDetailSkeleton } from '../components/Skeletons';

type Props = {
  favorites: FavoritesState;
  setFavorites: (next: FavoritesState) => void;
};

export const DetailPage = ({ favorites, setFavorites }: Props) => {
  const params = useParams<{ id: string }>();
  const detail = usePokemonDetailQuery(params.id ?? '', favorites.ids);

  return (
    <main>
      <h1>Pokemon Detail</h1>
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
          />
        ) : null}
      </AsyncState>
    </main>
  );
};
