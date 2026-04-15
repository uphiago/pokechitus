import { env } from '../config/env';

const API_BASE = env.pokeApiBaseUrl;

export type PokeListResponse = {
  count: number;
  results: Array<{ name: string; url: string }>;
};

export type PokeDetailResponse = {
  id: number;
  name: string;
  types: Array<{ slot: number; type: { name: string } }>;
  sprites?: { front_default?: string | null };
  height?: number;
  weight?: number;
  abilities?: Array<{ ability: { name: string } }>;
  stats?: Array<{ base_stat: number; stat: { name: string } }>;
};

export type PokeSpeciesResponse = {
  evolution_chain?: { url: string };
};

export type PokeEvolutionNode = {
  species: { name: string; url: string };
  evolves_to: PokeEvolutionNode[];
};

export type PokeEvolutionResponse = {
  chain: PokeEvolutionNode;
};

export type PokeTypeResponse = {
  damage_relations: {
    double_damage_from: Array<{ name: string }>;
    half_damage_from: Array<{ name: string }>;
    no_damage_from: Array<{ name: string }>;
  };
};

const fetchJson = async <T,>(url: string, signal?: AbortSignal): Promise<T> => {
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error(String(res.status));
  return (await res.json()) as T;
};

export const fetchPokemonList = (
  offset: number,
  limit: number,
  signal?: AbortSignal
): Promise<PokeListResponse> =>
  fetchJson<PokeListResponse>(`${API_BASE}/pokemon?offset=${offset}&limit=${limit}`, signal);

export const fetchPokemonByName = (name: string, signal?: AbortSignal): Promise<PokeDetailResponse> =>
  fetchJson<PokeDetailResponse>(`${API_BASE}/pokemon/${name}`, signal);

export const fetchPokemonById = (id: string, signal?: AbortSignal): Promise<PokeDetailResponse> =>
  fetchJson<PokeDetailResponse>(`${API_BASE}/pokemon/${id}`, signal);

export const fetchPokemonSpecies = (id: string, signal?: AbortSignal): Promise<PokeSpeciesResponse> =>
  fetchJson<PokeSpeciesResponse>(`${API_BASE}/pokemon-species/${id}`, signal);

export const fetchEvolutionChain = (url: string, signal?: AbortSignal): Promise<PokeEvolutionResponse> =>
  fetchJson<PokeEvolutionResponse>(url, signal);

export const fetchTypeByName = (typeName: string, signal?: AbortSignal): Promise<PokeTypeResponse> =>
  fetchJson<PokeTypeResponse>(`${API_BASE}/type/${typeName}`, signal);
