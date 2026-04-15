import type { PokemonSummary, SearchSession } from './pokemon';

export const applySearchAndFilters = (
  items: PokemonSummary[],
  session: Pick<SearchSession, 'query' | 'filters'>
): PokemonSummary[] => {
  const q = session.query.trim().toLowerCase();
  return items.filter((item) => {
    const queryMatch = q.length === 0 || item.name.toLowerCase().includes(q);
    const typeMatch = !session.filters.type || item.types.includes(session.filters.type);
    return queryMatch && typeMatch;
  });
};

export const paginate = <T,>(items: T[], page: number, pageSize: number): T[] => {
  const start = (Math.max(page, 1) - 1) * pageSize;
  return items.slice(start, start + pageSize);
};
