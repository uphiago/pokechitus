import { useQuery } from '@tanstack/react-query';
import {
  fetchEvolutionChain,
  fetchPokemonById,
  fetchPokemonSpecies,
  fetchTypeByName,
  type PokeEvolutionNode,
  type PokeTypeResponse
} from '../api/pokeApiClient';
import { toPokemonDetailBase } from '../adapters/pokemonAdapters';
import type { PokemonEvolution, PokemonTypeMatchup } from '../domain/pokemon';
import { queryKeys } from './queryKeys';

const parseSpeciesId = (url: string): string | null => {
  const match = /\/pokemon-species\/(\d+)\/?$/.exec(url);
  return match?.[1] ?? null;
};

const flattenEvolutionChain = (root: PokeEvolutionNode): PokemonEvolution[] => {
  const out: PokemonEvolution[] = [];
  const walk = (node: PokeEvolutionNode) => {
    const id = parseSpeciesId(node.species.url);
    if (id) out.push({ id, name: node.species.name });
    node.evolves_to.forEach(walk);
  };
  walk(root);

  const seen = new Set<string>();
  return out.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
};

const computeTypeMatchup = (types: PokeTypeResponse[]): PokemonTypeMatchup => {
  const multipliers = new Map<string, number>();

  const adjust = (name: string, factor: number) => {
    const current = multipliers.get(name) ?? 1;
    multipliers.set(name, current * factor);
  };

  for (const typeData of types) {
    typeData.damage_relations.double_damage_from.forEach((t) => adjust(t.name, 2));
    typeData.damage_relations.half_damage_from.forEach((t) => adjust(t.name, 0.5));
    typeData.damage_relations.no_damage_from.forEach((t) => multipliers.set(t.name, 0));
  }

  const weakTo: string[] = [];
  const resistantTo: string[] = [];
  const immuneTo: string[] = [];

  for (const [name, value] of multipliers.entries()) {
    if (value === 0) immuneTo.push(name);
    else if (value > 1) weakTo.push(name);
    else if (value < 1) resistantTo.push(name);
  }

  const byName = (a: string, b: string) => a.localeCompare(b);

  return {
    weakTo: weakTo.sort(byName),
    resistantTo: resistantTo.sort(byName),
    immuneTo: immuneTo.sort(byName)
  };
};

const defaultTypeMatchup: PokemonTypeMatchup = {
  weakTo: [],
  resistantTo: [],
  immuneTo: []
};

const isRetryable = (error: unknown): boolean => {
  if (!(error instanceof Error)) return true;
  if (error.message === '404') return false;
  return true;
};

export const fetchPokemonDetailView = async (
  id: string,
  favoriteIds: string[],
  signal?: AbortSignal
) => {
  const detail = await fetchPokemonById(id, signal);
  const base = toPokemonDetailBase(detail, favoriteIds.includes(String(detail.id)));

  let evolutionChain: PokemonEvolution[] = [{ id: base.id, name: base.name }];
  let typeMatchup: PokemonTypeMatchup = defaultTypeMatchup;
  let flavorText: string | null = null;
  let isLegendary = false;

  try {
    const species = await fetchPokemonSpecies(base.id, signal);
    const entry = species.flavor_text_entries?.find((e) => e.language.name === 'en');
    if (entry) flavorText = entry.flavor_text.replace(/[\f\n]/g, ' ').replace(/\s+/g, ' ').trim();
    isLegendary = Boolean(species.is_legendary || species.is_mythical);
    if (species.evolution_chain?.url) {
      const evolution = await fetchEvolutionChain(species.evolution_chain.url, signal);
      const parsed = flattenEvolutionChain(evolution.chain);
      if (parsed.length) evolutionChain = parsed;
    }
  } catch {
    // Keep base detail even when evolution lookup fails.
  }

  try {
    const typeData = await Promise.all(base.types.map((typeName) => fetchTypeByName(typeName, signal)));
    typeMatchup = computeTypeMatchup(typeData);
  } catch {
    // Keep base detail even when matchup lookup fails.
  }

  return {
    ...base,
    evolutionChain,
    typeMatchup,
    flavorText,
    isLegendary
  };
};

export const usePokemonDetailQuery = (id: string, favoriteIds: string[]) => {
  return useQuery({
    queryKey: queryKeys.detail(id),
    queryFn: ({ signal }) => fetchPokemonDetailView(id, favoriteIds, signal),
    enabled: Boolean(id),
    retry: (failures, error) => failures < 2 && isRetryable(error),
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 5000)
  });
};
