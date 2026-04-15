import { beforeEach, describe, expect, it, vi } from 'vitest';
import { readFavorites, writeFavorites } from '../../src/state/favoritesStorage';

describe('favorites storage', () => {
  beforeEach(() => localStorage.clear());

  it('writes and reads unique favorites', () => {
    writeFavorites(['1', '1', '2']);
    const out = readFavorites();
    expect(out.ids).toEqual(['1', '2']);
  });

  it('recovers from invalid payload', () => {
    localStorage.setItem('pokecheetos:favorites', '{bad json');
    const out = readFavorites();
    expect(out.ids).toEqual([]);
  });

  it('throws on write failure', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('fail');
    });
    expect(() => writeFavorites(['1'])).toThrowError();
    spy.mockRestore();
  });
});
