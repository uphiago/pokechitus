import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRoutes } from './routes';
import { FavoritesPersistenceNotice } from './ui/components/FavoritesPersistenceNotice';
import { hydrateFavorites, type FavoritesState } from './state/favoritesStore';
import './styles.css';

const queryClient = new QueryClient();

const App = () => {
  const [favorites, setFavorites] = useState<FavoritesState>(() => hydrateFavorites());

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <FavoritesPersistenceNotice message={favorites.persistError} />
        <AppRoutes favorites={favorites} setFavorites={setFavorites} />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
