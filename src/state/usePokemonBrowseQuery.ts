import { useQuery } from '@tanstack/react-query';
import { fetchPokemonByName, fetchPokemonList } from '../api/pokeApiClient';
import { toPokemonSummary } from '../adapters/pokemonAdapters';

const CATALOG_LIMIT = 151;

export const usePokemonBrowseQuery = () => {
  return useQuery({
    queryKey: ['pokemon', 'catalog', CATALOG_LIMIT],
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const list = await fetchPokemonList(0, CATALOG_LIMIT);
      const details = await Promise.all(list.results.map((r) => fetchPokemonByName(r.name)));
      return details.map((d) => toPokemonSummary(d, false));
    }
  });
};
