import { useEffect, useState, type ReactNode } from 'react';

type Props = {
  loading?: boolean;
  loadingFallback?: ReactNode;
  error?: string | null;
  empty?: boolean;
  partial?: boolean;
  children: ReactNode;
  onRetry?: () => void;
};

export const AsyncState = ({
  loading,
  loadingFallback,
  error,
  empty,
  partial,
  children,
  onRetry
}: Props) => {
  const [showPartial, setShowPartial] = useState(false);

  useEffect(() => {
    if (!partial) {
      setShowPartial(false);
      return;
    }

    const timer = setTimeout(() => setShowPartial(true), 220);
    return () => clearTimeout(timer);
  }, [partial]);

  if (loading) {
    return loadingFallback ?? <p data-testid="state-loading">Loading...</p>;
  }

  if (error) {
    return (
      <div data-testid="state-error" className="state-panel state-error">
        <h3>Oops, something failed</h3>
        <p>{error}</p>
        {onRetry ? (
          <button className="btn btn-primary touch-btn" onClick={onRetry}>
            Retry
          </button>
        ) : null}
      </div>
    );
  }

  if (empty) {
    return (
      <div data-testid="state-empty" className="state-panel state-empty">
        <h3>No Pokemon found</h3>
        <p>Try another name or remove filters to broaden your search.</p>
      </div>
    );
  }

  return (
    <>
      {showPartial ? (
        <div className="banner warn" role="status" aria-live="polite">
          Showing last available data while refreshing.
        </div>
      ) : null}
      {children}
    </>
  );
};
