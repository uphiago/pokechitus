import { describe, expect, it } from 'vitest';
import { toPokemonDetail } from '../../src/adapters/pokemonAdapters';

describe('pokemon detail adapter', () => {
  it('applies safe defaults', () => {
    const detail = toPokemonDetail({ id: 25, name: 'pikachu', types: [] }, false);
    expect(detail.abilities).toEqual([]);
    expect(detail.stats).toEqual([]);
    expect(detail.height).toBeNull();
  });
});
