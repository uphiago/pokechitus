export const PokemonListSkeleton = ({ count = 12 }: { count?: number }) => {
  return (
    <section>
      <div className="results-head" style={{ marginBottom: 12 }}>
        <div className="skeleton skeleton-pill" style={{ width: 120 }} />
        <div className="skeleton skeleton-pill" style={{ width: 80 }} />
      </div>
      <div className="grid" aria-hidden="true">
        {Array.from({ length: count }).map((_, index) => (
          <article
            key={index}
            className="card"
            style={{ animationDelay: `${index * 35}ms` }}
          >
            <div className="card-media card-media--skeleton">
              <div className="skeleton skeleton-block card-sprite-img" />
            </div>
            <div className="card-body">
              <div className="skeleton skeleton-line tiny" style={{ width: 44, margin: '0 auto 6px' }} />
              <div className="skeleton skeleton-line title" style={{ width: 100, margin: '0 auto 10px' }} />
              <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                <div className="skeleton skeleton-pill" style={{ width: 52, height: 22 }} />
                <div className="skeleton skeleton-pill" style={{ width: 52, height: 22 }} />
              </div>
            </div>
            <div className="card-actions">
              <div className="skeleton skeleton-btn" style={{ width: 36 }} />
              <div className="skeleton skeleton-btn" style={{ flex: 1 }} />
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
      <div className="detail-shell">
        <div className="detail-left">
          <div className="skeleton skeleton-block detail-artwork" style={{ marginBottom: 14 }} />
          <div className="skeleton skeleton-line tiny" style={{ width: 50, margin: '0 auto 8px' }} />
          <div className="skeleton skeleton-line title" style={{ width: 160, margin: '0 auto 12px' }} />
          <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 14 }}>
            <div className="skeleton skeleton-pill" style={{ width: 60, height: 26 }} />
            <div className="skeleton skeleton-pill" style={{ width: 60, height: 26 }} />
          </div>
          <div className="skeleton skeleton-line" style={{ width: '100%', height: 60, borderRadius: 10 }} />
        </div>
        <div className="detail-right">
          <div className="detail-metrics">
            <div className="skeleton skeleton-block" style={{ height: 72, borderRadius: 12 }} />
            <div className="skeleton skeleton-block" style={{ height: 72, borderRadius: 12 }} />
          </div>
          <div className="row" style={{ margin: '12px 0' }}>
            <div className="skeleton skeleton-btn" />
            <div className="skeleton skeleton-btn" />
            <div className="skeleton skeleton-btn" />
            <div className="skeleton skeleton-btn" />
          </div>
          <div className="stats" style={{ marginTop: 14 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="skeleton skeleton-line" style={{ animationDelay: `${i * 60}ms` }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
