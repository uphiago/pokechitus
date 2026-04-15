export type PokemonSummary = {
  id: string;
  name: string;
  types: string[];
  spriteUrl: string | null;
  isFavorite: boolean;
};

export type PokemonDetail = {
  id: string;
  name: string;
  types: string[];
  height: number | null;
  weight: number | null;
  abilities: string[];
  stats: Array<{ name: string; value: number }>;
  isFavorite: boolean;
};

export type SearchFilters = {
  type: string;
};

export type SearchSession = {
  query: string;
  filters: SearchFilters;
  page: number;
  pageSize: number;
};

export type FavoriteSet = {
  ids: string[];
  lastUpdatedAt: string;
};

export const DEFAULT_PAGE_SIZE = 20;

export const defaultSearchSession = (): SearchSession => ({
  query: '',
  filters: { type: '' },
  page: 1,
  pageSize: DEFAULT_PAGE_SIZE
});
