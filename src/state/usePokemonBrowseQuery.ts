import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { fetchPokemonByName, fetchPokemonList } from '../api/pokeApiClient';
import { toPokemonSummary } from '../adapters/pokemonAdapters';

const CATALOG_LIMIT = 151;
const CHUNK_SIZE = 30;

type CatalogIndex = {
  count: number;
  names: string[];
};

type CatalogChunk = {
  items: ReturnType<typeof toPokemonSummary>[];
  nextOffset: number;
};

export const usePokemonBrowseQuery = () => {
  const indexQuery = useQuery({
    queryKey: ['pokemon', 'catalog-index', CATALOG_LIMIT],
    staleTime: 10 * 60 * 1000,
    queryFn: async (): Promise<CatalogIndex> => {
      const list = await fetchPokemonList(0, CATALOG_LIMIT);
      return { count: list.count, names: list.results.map((result) => result.name) };
    }
  });

  const chunkQuery = useInfiniteQuery<CatalogChunk>({
    queryKey: ['pokemon', 'catalog-chunks', CATALOG_LIMIT],
    enabled: Boolean(indexQuery.data),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (!indexQuery.data) return undefined;
      const nextOffset = lastPage.nextOffset;
      return nextOffset < indexQuery.data.names.length ? nextOffset : undefined;
    },
    queryFn: async ({ pageParam }): Promise<CatalogChunk> => {
      const offset = Number(pageParam);
      if (!indexQuery.data) return { items: [], nextOffset: offset };
      const names = indexQuery.data.names.slice(offset, offset + CHUNK_SIZE);
      const details = await Promise.all(names.map((name) => fetchPokemonByName(name)));
      return {
        items: details.map((detail) => toPokemonSummary(detail, false)),
        nextOffset: offset + names.length
      };
    }
  });

  useEffect(() => {
    if (chunkQuery.hasNextPage && !chunkQuery.isFetchingNextPage) {
      const timer = window.setTimeout(() => {
        void chunkQuery.fetchNextPage();
      }, 120);
      return () => window.clearTimeout(timer);
    }
    return;
  }, [chunkQuery.fetchNextPage, chunkQuery.hasNextPage, chunkQuery.isFetchingNextPage]);

  const catalog = useMemo(() => {
    if (!chunkQuery.data) return [];
    return chunkQuery.data.pages.flatMap((page) => page.items);
  }, [chunkQuery.data]);

  return {
    data: catalog,
    totalAvailable: indexQuery.data?.count ?? CATALOG_LIMIT,
    loadedCount: catalog.length,
    isPending: indexQuery.isPending || (chunkQuery.isPending && catalog.length === 0),
    isError: indexQuery.isError || chunkQuery.isError,
    isSuccess: Boolean(indexQuery.isSuccess),
    isFetching: indexQuery.isFetching || chunkQuery.isFetchingNextPage,
    isHydrating: chunkQuery.hasNextPage || chunkQuery.isFetchingNextPage,
    hasNextPage: chunkQuery.hasNextPage,
    fetchNextPage: chunkQuery.fetchNextPage,
    isFetchingNextPage: chunkQuery.isFetchingNextPage,
    refetch: async () => {
      await Promise.all([indexQuery.refetch(), chunkQuery.refetch()]);
    }
  };
};
