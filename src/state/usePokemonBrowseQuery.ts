import { useQuery } from '@tanstack/react-query';
import { fetchPokemonByName, fetchPokemonList } from '../api/pokeApiClient';
import { toPokemonSummary } from '../adapters/pokemonAdapters';
import { queryKeys } from './queryKeys';

export const usePokemonBrowseQuery = (
  page: number,
  pageSize: number,
  favoriteIds: string[]
) => {
  return useQuery({
    queryKey: queryKeys.list(page, pageSize),
    queryFn: async () => {
      const offset = (page - 1) * pageSize;
      const list = await fetchPokemonList(offset, pageSize);
      const details = await Promise.all(list.results.map((r) => fetchPokemonByName(r.name)));
      return details.map((d) => toPokemonSummary(d, favoriteIds.includes(String(d.id))));
    }
  });
};
