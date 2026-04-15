import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { usePokemonDetailQuery } from '../../state/usePokemonDetailQuery';
import { type FavoritesState, toggleFavorite } from '../../state/favoritesStore';
import { AsyncState } from '../components/AsyncState';
import { PokemonDetailPanel } from '../components/PokemonDetailPanel';
import { PokemonDetailSkeleton } from '../components/Skeletons';
import { Toast } from '../components/Toast';

type Props = {
  favorites: FavoritesState;
  setFavorites: (next: FavoritesState) => void;
};

const MAX_POKEMON_ID = 151;

export const DetailPage = ({ favorites, setFavorites }: Props) => {
  const params = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const detail = usePokemonDetailQuery(params.id ?? '', favorites.ids);
  const currentId = Number(params.id ?? '1');
  const backTarget = location.search ? `/?${location.search.slice(1)}` : '/';

  useEffect(() => {
    headingRef.current?.focus();
  }, [params.id]);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => setToastMessage(null), 1800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  return (
    <main>
      <div className="detail-topbar">
        <button className="btn" onClick={() => navigate(backTarget)}>
          ← Voltar para a Lista
        </button>
        <div className="row">
          <button className="btn" disabled={currentId <= 1} onClick={() => navigate(`/pokemon/${currentId - 1}${location.search}`)}>
            Prev
          </button>
          <button
            className="btn"
            disabled={currentId >= MAX_POKEMON_ID}
            onClick={() => navigate(`/pokemon/${currentId + 1}${location.search}`)}
          >
            Next
          </button>
        </div>
      </div>

      <header className="hero">
        <h1 ref={headingRef} tabIndex={-1}>Pokédex</h1>
        <p className="hero-text">Encontre informações sobre os 151 Pokémons originais.</p>
      </header>
      <Toast message={toastMessage} />
      <AsyncState
        loading={detail.isPending}
        loadingFallback={<PokemonDetailSkeleton />}
        error={detail.isError ? 'Could not load Pokemon detail.' : null}
        partial={detail.isFetching && detail.isSuccess}
        onRetry={() => detail.refetch()}
      >
        {detail.data ? (
          <PokemonDetailPanel
            detail={detail.data}
            onToggleFavorite={(id) => {
              const wasFavorite = favorites.ids.includes(id);
              const next = toggleFavorite(favorites, id);
              setFavorites(next);
              if (!next.persistError) {
                setToastMessage(wasFavorite ? 'Removed from favorites' : 'Added to favorites');
              }
            }}
            onOpenPokemon={(id) => navigate(`/pokemon/${id}${location.search}`)}
          />
        ) : null}
      </AsyncState>
    </main>
  );
};
