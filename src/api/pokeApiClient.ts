const API_BASE = 'https://pokeapi.co/api/v2';

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

const fetchJson = async <T,>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(String(res.status));
  return (await res.json()) as T;
};

export const fetchPokemonList = (offset: number, limit: number): Promise<PokeListResponse> =>
  fetchJson<PokeListResponse>(`${API_BASE}/pokemon?offset=${offset}&limit=${limit}`);

export const fetchPokemonByName = (name: string): Promise<PokeDetailResponse> =>
  fetchJson<PokeDetailResponse>(`${API_BASE}/pokemon/${name}`);

export const fetchPokemonById = (id: string): Promise<PokeDetailResponse> =>
  fetchJson<PokeDetailResponse>(`${API_BASE}/pokemon/${id}`);
