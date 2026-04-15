import { useState } from 'react';
import type { SearchSession } from '../../domain/pokemon';

type Props = {
  session: SearchSession;
  typeOptions: string[];
  resultCount: number;
  loadedCount: number;
  totalAvailable: number;
  onQueryChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  onClearFilters: () => void;
};

export const BrowseFilters = ({
  session,
  typeOptions,
  resultCount,
  loadedCount,
  totalAvailable,
  onQueryChange,
  onTypeChange,
  onClearFilters
}: Props) => {
  const [open, setOpen] = useState(false);
  const hasQuery = session.query.trim().length > 0;
  const hasType = Boolean(session.filters.type);
  const hasFilters = hasQuery || hasType;

  return (
    <section className="toolbar">
      <div className="toolbar-top row">
        <button className="btn filter-toggle" type="button" onClick={() => setOpen((value) => !value)}>
          {open ? 'Hide filters' : 'Show filters'}
        </button>
        <p className="toolbar-meta">
          <strong>{resultCount}</strong> matches • {loadedCount}/{totalAvailable} loaded
        </p>
      </div>

      <div className={`toolbar-main ${open ? 'is-open' : ''}`}>
        <input
          className="input"
          aria-label="Search Pokemon"
          value={session.query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Procure por um Pokémon..."
        />
        <select
          className="input"
          aria-label="Filter by type"
          value={session.filters.type}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <option value="">todos os tipos</option>
          {typeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button className="btn" type="button" onClick={onClearFilters} disabled={!hasFilters}>
          Limpar filtros
        </button>
      </div>

      {hasFilters ? (
        <div className="active-filters" aria-live="polite">
          {hasQuery ? <span className="chip neutral">Busca: {session.query.trim()}</span> : null}
          {hasType ? <span className="chip neutral">Tipo: {session.filters.type}</span> : null}
        </div>
      ) : null}

      {!hasFilters ? (
        <p className="toolbar-hint">Dica: combine tipo + busca para resultados mais rápidos.</p>
      ) : null}
      {resultCount === 0 ? (
        <p className="toolbar-hint">Nenhum resultado com os filtros atuais.</p>
      ) : null}
      {resultCount > 0 && loadedCount < totalAvailable ? (
        <p className="toolbar-hint">Mais resultados são carregados conforme você pagina.</p>
      ) : null}
    </section>
  );
};
