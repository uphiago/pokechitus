import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { BrowsePage } from '../../src/ui/pages/BrowsePage';
import type { FavoritesState } from '../../src/state/favoritesStore';

const mockData = {
  count: 2,
  results: [
    { name: 'bulbasaur', url: 'x' },
    { name: 'charmander', url: 'y' }
  ]
};

const mockDetail = (id: number, name: string, type: string) => ({ id, name, types: [{ slot: 1, type: { name: type } }] });

describe('browse flow', () => {
  it('renders results and supports filtering', async () => {
    vi.stubGlobal('fetch', vi.fn()
      .mockResolvedValueOnce({ ok: true, json: async () => mockData })
      .mockResolvedValueOnce({ ok: true, json: async () => mockDetail(1, 'bulbasaur', 'grass') })
      .mockResolvedValueOnce({ ok: true, json: async () => mockDetail(4, 'charmander', 'fire') }));

    const queryClient = new QueryClient();
    const favorites: FavoritesState = { ids: [], persistError: null };
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <BrowsePage favorites={favorites} setFavorites={() => undefined} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    await waitFor(() => expect(screen.getAllByTestId('pokemon-card').length).toBe(2));
    await userEvent.type(screen.getByLabelText('Search Pokemon'), 'bulb');
    expect(screen.getAllByTestId('pokemon-card').length).toBe(1);
  });
});
