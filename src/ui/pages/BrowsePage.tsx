import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AsyncState } from '../components/AsyncState';
import { BrowseFilters } from '../components/BrowseFilters';
import { PokemonList } from '../components/PokemonList';
import { PokemonListSkeleton } from '../components/Skeletons';
import { Toast } from '../components/Toast';
import {
  createSearchSession,
  selectVisiblePokemon,
  setPage,
  setQuery,
  setTypeFilter
} from '../../state/searchSessionStore';
import { usePokemonBrowseQuery } from '../../state/usePokemonBrowseQuery';
import { type FavoritesState, toggleFavorite } from '../../state/favoritesStore';
import { fetchPokemonDetailView } from '../../state/usePokemonDetailQuery';
import { queryKeys } from '../../state/queryKeys';

type Props = {
  favorites: FavoritesState;
  setFavorites: (next: FavoritesState) => void;
};

const readSessionFromParams = (params: URLSearchParams) => {
  const session = createSearchSession();
  const query = params.get('q') ?? '';
  const type = params.get('type') ?? '';
  const page = Number(params.get('page') ?? '1');

  return {
    ...session,
    query,
    filters: { ...session.filters, type },
    page: Number.isFinite(page) && page > 0 ? Math.floor(page) : 1
  };
};

const sessionToQueryString = (session: ReturnType<typeof createSearchSession>) => {
  const params = new URLSearchParams();
  if (session.query.trim()) params.set('q', session.query.trim());
  if (session.filters.type) params.set('type', session.filters.type);
  if (session.page > 1) params.set('page', String(session.page));
  return params.toString();
};

export const BrowsePage = ({ favorites, setFavorites }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const [session, setSession] = useState(() => readSessionFromParams(searchParams));
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const query = usePokemonBrowseQuery();

  useEffect(() => {
    const fromUrl = readSessionFromParams(searchParams);
    setSession((current) => {
      if (
        current.query === fromUrl.query &&
        current.filters.type === fromUrl.filters.type &&
        current.page === fromUrl.page
      ) {
        return current;
      }
      return fromUrl;
    });
  }, [searchParams]);

  useEffect(() => {
    const nextPageNeed = (session.page + 1) * session.pageSize;
    if (query.loadedCount < nextPageNeed && query.hasNextPage && !query.isFetchingNextPage) {
      void query.fetchNextPage();
    }
  }, [
    query.fetchNextPage,
    query.hasNextPage,
    query.isFetchingNextPage,
    query.loadedCount,
    session.page,
    session.pageSize
  ]);

  useEffect(() => {
    const next = sessionToQueryString(session);
    if (next !== searchParams.toString()) {
      setSearchParams(next, { replace: true });
    }
  }, [searchParams, session, setSearchParams]);

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

  const liveMessage = `Showing ${visible.items.length} Pokemon on page ${session.page}. Total matching: ${visible.total}.`;

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 1800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  return (
    <main>
      <header className="hero">
        <p className="hero-kicker">PokeAPI Explorer</p>
        <h1 id="browse-title" tabIndex={-1}>Pokédex</h1>
        <p className="hero-text">
          Encontre informações sobre os 151 Pokémons originais.
        </p>
      </header>

      <p className="sr-only" aria-live="polite">{liveMessage}</p>
      <Toast message={toastMessage} />

      <BrowseFilters
        session={session}
        typeOptions={typeOptions}
        resultCount={visible.total}
        loadedCount={query.loadedCount}
        totalAvailable={query.totalAvailable}
        onQueryChange={(value) => setSession((old) => setQuery(old, value))}
        onTypeChange={(value) => setSession((old) => setTypeFilter(old, value))}
        onClearFilters={() =>
          setSession((old) => ({
            ...old,
            query: '',
            filters: { ...old.filters, type: '' },
            page: 1
          }))
        }
      />

      <AsyncState
        loading={query.isPending}
        loadingFallback={<PokemonListSkeleton count={session.pageSize} />}
        error={query.isError ? 'Could not load Pokemon list.' : null}
        empty={!query.isPending && !query.isError && visible.total === 0}
        partial={query.isRefreshing && query.isSuccess}
        onRetry={() => query.refetch()}
      >
        <PokemonList
          items={visible.items}
          page={session.page}
          pageSize={session.pageSize}
          total={visible.total}
          isHydrating={query.isHydrating}
          onPageChange={(page) => setSession((old) => setPage(old, page))}
          onToggleFavorite={(id) => {
            const wasFavorite = favorites.ids.includes(id);
            const next = toggleFavorite(favorites, id);
            setFavorites(next);
            if (!next.persistError) {
              setToastMessage(wasFavorite ? 'Removed from favorites' : 'Added to favorites');
            }
          }}
          onOpenDetail={(id) => {
            const qs = sessionToQueryString(session);
            navigate(`/pokemon/${id}${qs ? `?${qs}` : ''}`);
          }}
          onPrefetchDetail={(id) => {
            void queryClient.prefetchQuery({
              queryKey: queryKeys.detail(id),
              queryFn: ({ signal }) => fetchPokemonDetailView(id, favorites.ids, signal)
            });
          }}
        />
      </AsyncState>
    </main>
  );
};
