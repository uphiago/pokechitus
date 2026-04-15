import { defaultSearchSession, type SearchSession } from '../domain/pokemon';
import { applySearchAndFilters, paginate } from '../domain/filters';
import type { PokemonSummary } from '../domain/pokemon';

export const createSearchSession = (): SearchSession => defaultSearchSession();

export const setQuery = (session: SearchSession, query: string): SearchSession => ({
  ...session,
  query,
  page: 1
});

export const setTypeFilter = (session: SearchSession, type: string): SearchSession => ({
  ...session,
  filters: { ...session.filters, type },
  page: 1
});

export const setPage = (session: SearchSession, page: number): SearchSession => ({
  ...session,
  page: Math.max(1, page)
});

export const selectVisiblePokemon = (
  all: PokemonSummary[],
  session: SearchSession
): { items: PokemonSummary[]; total: number } => {
  const filtered = applySearchAndFilters(all, session);
  return { items: paginate(filtered, session.page, session.pageSize), total: filtered.length };
};
