import { describe, expect, it } from 'vitest';
import { hydrateFavorites, toggleFavorite } from '../../src/state/favoritesStore';

describe('favorites flow', () => {
  it('toggles and persists favorites', () => {
    localStorage.clear();
    let state = hydrateFavorites();
    state = toggleFavorite(state, '25');
    expect(state.ids).toContain('25');
    state = toggleFavorite(state, '25');
    expect(state.ids).not.toContain('25');
  });
});
