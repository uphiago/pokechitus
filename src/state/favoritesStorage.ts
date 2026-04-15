import type { FavoriteSet } from '../domain/pokemon';

const KEY = 'pokecheetos:favorites';

const nowIso = () => new Date().toISOString();

const normalize = (ids: string[]): string[] => Array.from(new Set(ids.filter(Boolean)));

export const readFavorites = (): FavoriteSet => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ids: [], lastUpdatedAt: nowIso() };
    const parsed = JSON.parse(raw) as Partial<FavoriteSet>;
    return {
      ids: normalize(Array.isArray(parsed.ids) ? parsed.ids : []),
      lastUpdatedAt: typeof parsed.lastUpdatedAt === 'string' ? parsed.lastUpdatedAt : nowIso()
    };
  } catch {
    return { ids: [], lastUpdatedAt: nowIso() };
  }
};

export const writeFavorites = (ids: string[]): FavoriteSet => {
  try {
    const next: FavoriteSet = { ids: normalize(ids), lastUpdatedAt: nowIso() };
    localStorage.setItem(KEY, JSON.stringify(next));
    return next;
  } catch {
    throw new Error('storage-write-failure');
  }
};
