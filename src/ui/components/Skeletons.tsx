export const PokemonListSkeleton = ({ count = 12 }: { count?: number }) => {
  return (
    <section>
      <div className="results-head skeleton-row">
        <div className="skeleton skeleton-pill" />
        <div className="skeleton skeleton-pill" />
      </div>
      <div className="grid" aria-hidden="true">
        {Array.from({ length: count }).map((_, index) => (
          <article key={index} className="card">
            <div className="card-head">
              <div className="sprite-wrap">
                <div className="skeleton skeleton-block sprite" />
              </div>
              <div>
                <div className="skeleton skeleton-line title" />
                <div className="skeleton skeleton-line tiny" />
              </div>
            </div>
            <div className="skeleton skeleton-line" style={{ marginTop: 10 }} />
            <div className="row" style={{ marginTop: 12 }}>
              <div className="skeleton skeleton-btn" />
              <div className="skeleton skeleton-btn" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export const PokemonDetailSkeleton = () => {
  return (
    <section className="card detail-card" aria-hidden="true">
      <div className="detail-head">
        <div className="skeleton skeleton-block detail-sprite" />
        <div style={{ width: '100%' }}>
          <div className="skeleton skeleton-line title" />
          <div className="skeleton skeleton-line tiny" />
          <div className="skeleton skeleton-line" />
        </div>
      </div>

      <div className="detail-grid" style={{ marginTop: 12 }}>
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line" />
      </div>

      <div className="stats" style={{ marginTop: 14 }}>
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line" />
        <div className="skeleton skeleton-line" />
      </div>

      <div className="skeleton skeleton-btn" />
    </section>
  );
};
