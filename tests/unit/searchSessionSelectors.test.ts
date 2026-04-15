import { describe, expect, it } from 'vitest';
import { createSearchSession, selectVisiblePokemon, setPage, setQuery, setTypeFilter } from '../../src/state/searchSessionStore';
import type { PokemonSummary } from '../../src/domain/pokemon';

const sample: PokemonSummary[] = [
  { id: '1', name: 'bulbasaur', types: ['grass'], spriteUrl: null, isFavorite: false },
  { id: '2', name: 'charmander', types: ['fire'], spriteUrl: null, isFavorite: false },
  { id: '3', name: 'squirtle', types: ['water'], spriteUrl: null, isFavorite: false }
];

describe('search session selectors', () => {
  it('filters by query', () => {
    const session = setQuery(createSearchSession(), 'char');
    const out = selectVisiblePokemon(sample, session);
    expect(out.items).toHaveLength(1);
    expect(out.items[0].name).toBe('charmander');
  });

  it('filters by type and paginates', () => {
    let session = setTypeFilter(createSearchSession(), 'grass');
    session = setPage(session, 1);
    const out = selectVisiblePokemon(sample, session);
    expect(out.total).toBe(1);
    expect(out.items[0].id).toBe('1');
  });
});
