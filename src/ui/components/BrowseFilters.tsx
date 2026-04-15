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
};

export const BrowseFilters = ({
  session,
  typeOptions,
  resultCount,
  loadedCount,
  totalAvailable,
  onQueryChange,
  onTypeChange
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <section className="toolbar">
      <div className="toolbar-top row">
        <button className="btn filter-toggle" type="button" onClick={() => setOpen((value) => !value)}>
          {open ? 'Hide filters' : 'Show filters'}
        </button>
        <p className="toolbar-meta">
          {resultCount} matches • {loadedCount}/{totalAvailable} loaded
        </p>
      </div>

      <div className={`toolbar-main ${open ? 'is-open' : ''}`}>
        <input
          className="input"
          aria-label="Search Pokemon"
          value={session.query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search by name"
        />
        <select
          className="input"
          aria-label="Filter by type"
          value={session.filters.type}
          onChange={(e) => onTypeChange(e.target.value)}
        >
          <option value="">all types</option>
          {typeOptions.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
};
