import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AsyncState } from '../components/AsyncState';
import { BrowseFilters } from '../components/BrowseFilters';
import { PokemonList } from '../components/PokemonList';
import {
  createSearchSession,
  selectVisiblePokemon,
  setPage,
  setQuery,
  setTypeFilter
} from '../../state/searchSessionStore';
import { usePokemonBrowseQuery } from '../../state/usePokemonBrowseQuery';
import { type FavoritesState, toggleFavorite } from '../../state/favoritesStore';

type Props = {
  favorites: FavoritesState;
  setFavorites: (next: FavoritesState) => void;
};

export const BrowsePage = ({ favorites, setFavorites }: Props) => {
  const navigate = useNavigate();
  const [session, setSession] = useState(createSearchSession());
  const query = usePokemonBrowseQuery(session.page, session.pageSize, favorites.ids);

  const visible = useMemo(() => {
    if (!query.data) return { items: [], total: 0 };
    return selectVisiblePokemon(query.data, session);
  }, [query.data, session]);

  return (
    <main>
      <h1>PokeCheetos</h1>
      <BrowseFilters
        session={session}
        onQueryChange={(value) => setSession((old) => setQuery(old, value))}
        onTypeChange={(value) => setSession((old) => setTypeFilter(old, value))}
      />
      <AsyncState
        loading={query.isPending}
        error={query.isError ? 'Could not load Pokemon list.' : null}
        empty={!query.isPending && !query.isError && visible.total === 0}
        partial={false}
        onRetry={() => query.refetch()}
      >
        <PokemonList
          items={visible.items}
          page={session.page}
          pageSize={session.pageSize}
          total={visible.total}
          onPageChange={(page) => setSession((old) => setPage(old, page))}
          onToggleFavorite={(id) => setFavorites(toggleFavorite(favorites, id))}
          onOpenDetail={(id) => navigate(`/pokemon/${id}`)}
        />
      </AsyncState>
    </main>
  );
};
