import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { DetailPage } from '../../src/ui/pages/DetailPage';
import type { FavoritesState } from '../../src/state/favoritesStore';

describe('detail flow', () => {
  it('renders detail data', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn((input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes('/pokemon/1')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              id: 1,
              name: 'bulbasaur',
              types: [{ slot: 1, type: { name: 'grass' } }],
              abilities: [{ ability: { name: 'overgrow' } }],
              stats: [{ base_stat: 45, stat: { name: 'hp' } }]
            })
          });
        }
        if (url.includes('/pokemon-species/1')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({ evolution_chain: { url: 'https://pokeapi.co/api/v2/evolution-chain/1/' } })
          });
        }
        if (url.includes('/evolution-chain/1/')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              chain: {
                species: { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon-species/1/' },
                evolves_to: [
                  {
                    species: { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon-species/2/' },
                    evolves_to: []
                  }
                ]
              }
            })
          });
        }
        if (url.includes('/type/grass')) {
          return Promise.resolve({
            ok: true,
            json: async () => ({
              damage_relations: {
                double_damage_from: [{ name: 'fire' }],
                half_damage_from: [{ name: 'water' }],
                no_damage_from: []
              }
            })
          });
        }
        return Promise.resolve({ ok: false, json: async () => ({}) });
      })
    );

    const queryClient = new QueryClient();
    const favorites: FavoritesState = { ids: [], persistError: null };

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/pokemon/1']}>
          <Routes>
            <Route path="/pokemon/:id" element={<DetailPage favorites={favorites} setFavorites={() => undefined} />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => expect(screen.getByText('bulbasaur')).toBeInTheDocument());
  });
});
