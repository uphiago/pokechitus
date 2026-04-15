import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import { DetailPage } from '../../src/ui/pages/DetailPage';
import type { FavoritesState } from '../../src/state/favoritesStore';

describe('detail flow', () => {
  it('renders detail data', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 1, name: 'bulbasaur', types: [{ slot: 1, type: { name: 'grass' } }] })
    }));
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
