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
  const query = usePokemonBrowseQuery();

  const catalog = useMemo(() => {
    if (!query.data) return [];
    return query.data.map((pokemon) => ({
      ...pokemon,
      isFavorite: favorites.ids.includes(pokemon.id)
    }));
  }, [favorites.ids, query.data]);

  const visible = useMemo(() => {
    if (!catalog.length) return { items: [], total: 0 };
    return selectVisiblePokemon(catalog, session);
  }, [catalog, session]);

  const typeOptions = useMemo(() => {
    const set = new Set<string>();
    for (const p of catalog) {
      for (const t of p.types) set.add(t);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [catalog]);

  return (
    <main>
      <header className="hero">
        <p className="hero-kicker">PokeAPI Explorer</p>
        <h1>PokeCheetos</h1>
        <p className="hero-text">
          Discover Pokemon with a richer catalog view, instant filters, favorites, and fluid navigation.
        </p>
      </header>

      <BrowseFilters
        session={session}
        typeOptions={typeOptions}
        resultCount={visible.total}
        onQueryChange={(value) => setSession((old) => setQuery(old, value))}
        onTypeChange={(value) => setSession((old) => setTypeFilter(old, value))}
      />

      <AsyncState
        loading={query.isPending}
        error={query.isError ? 'Could not load Pokemon list.' : null}
        empty={!query.isPending && !query.isError && visible.total === 0}
        partial={query.isFetching && query.isSuccess}
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
