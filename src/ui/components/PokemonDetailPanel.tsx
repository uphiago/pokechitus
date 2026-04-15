import type { PokemonDetail } from '../../domain/pokemon';

type Props = {
  detail: PokemonDetail;
  onToggleFavorite: (id: string) => void;
};

export const PokemonDetailPanel = ({ detail, onToggleFavorite }: Props) => {
  return (
    <section className="card detail-card">
      <div className="detail-head">
        <img
          className="detail-sprite"
          src={detail.spriteUrl ?? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png'}
          alt={detail.name}
        />
        <div>
          <h2>{detail.name}</h2>
          <p className="card-sub">#{detail.id.padStart(3, '0')}</p>
          <p className="types">{detail.types.join(' • ') || 'unknown'}</p>
        </div>
      </div>

      <div className="detail-grid">
        <p>
          <strong>Height:</strong> {detail.height ?? 'N/A'}
        </p>
        <p>
          <strong>Weight:</strong> {detail.weight ?? 'N/A'}
        </p>
        <p>
          <strong>Abilities:</strong> {detail.abilities.join(', ') || 'N/A'}
        </p>
      </div>

      <div className="stats">
        {detail.stats.slice(0, 4).map((stat) => (
          <div key={stat.name} className="stat-row">
            <span>{stat.name}</span>
            <div className="stat-bar-wrap">
              <div className="stat-bar" style={{ width: `${Math.min(stat.value, 120) / 1.2}%` }} />
            </div>
            <span>{stat.value}</span>
          </div>
        ))}
      </div>

      <button className="btn btn-ghost" onClick={() => onToggleFavorite(detail.id)}>
        {detail.isFavorite ? '★ Favorited' : '☆ Favorite'}
      </button>
    </section>
  );
};
