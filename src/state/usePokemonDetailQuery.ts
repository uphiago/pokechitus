import { useQuery } from '@tanstack/react-query';
import { fetchPokemonById } from '../api/pokeApiClient';
import { toPokemonDetail } from '../adapters/pokemonAdapters';
import { queryKeys } from './queryKeys';

export const usePokemonDetailQuery = (id: string, favoriteIds: string[]) => {
  return useQuery({
    queryKey: queryKeys.detail(id),
    queryFn: async ({ signal }) => {
      const detail = await fetchPokemonById(id, signal);
      return toPokemonDetail(detail, favoriteIds.includes(String(detail.id)));
    },
    enabled: Boolean(id)
  });
};
