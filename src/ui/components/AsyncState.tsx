import type { ReactNode } from 'react';

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
  if (loading) {
    return loadingFallback ?? <p data-testid="state-loading">Loading...</p>;
  }

  if (error) {
    return (
      <div data-testid="state-error" className="banner err">
        <p>{error}</p>
        {onRetry ? <button className="btn" onClick={onRetry}>Retry</button> : null}
      </div>
    );
  }

  if (empty) return <p data-testid="state-empty">No Pokemon found.</p>;

  return (
    <>
      {partial ? <div className="banner warn">Showing last available data.</div> : null}
      {children}
    </>
  );
};
