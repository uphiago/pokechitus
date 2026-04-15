import { Routes, Route } from 'react-router-dom';
import { BrowsePage } from '../ui/pages/BrowsePage';
import { DetailPage } from '../ui/pages/DetailPage';
import type { FavoritesState } from '../state/favoritesStore';

type Props = {
  favorites: FavoritesState;
  setFavorites: (next: FavoritesState) => void;
};

export const AppRoutes = ({ favorites, setFavorites }: Props) => (
  <Routes>
    <Route path="/" element={<BrowsePage favorites={favorites} setFavorites={setFavorites} />} />
    <Route
      path="/pokemon/:id"
      element={<DetailPage favorites={favorites} setFavorites={setFavorites} />}
    />
  </Routes>
);
