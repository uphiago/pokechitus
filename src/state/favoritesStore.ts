import { readFavorites, writeFavorites } from './favoritesStorage';

export type FavoritesState = {
  ids: string[];
  persistError: string | null;
};

export const hydrateFavorites = (): FavoritesState => ({
  ids: readFavorites().ids,
  persistError: null
});

export const toggleFavorite = (state: FavoritesState, id: string): FavoritesState => {
  const has = state.ids.includes(id);
  const nextIds = has ? state.ids.filter((v) => v !== id) : [...state.ids, id];
  try {
    const persisted = writeFavorites(nextIds);
    return { ids: persisted.ids, persistError: null };
  } catch {
    return { ...state, persistError: 'Could not persist favorites.' };
  }
};
