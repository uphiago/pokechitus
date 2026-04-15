import type { SearchSession } from '../../domain/pokemon';

type Props = {
  session: SearchSession;
  typeOptions: string[];
  resultCount: number;
  onQueryChange: (value: string) => void;
  onTypeChange: (value: string) => void;
};

export const BrowseFilters = ({
  session,
  typeOptions,
  resultCount,
  onQueryChange,
  onTypeChange
}: Props) => {
  return (
    <section className="toolbar">
      <div className="toolbar-main">
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
      <p className="toolbar-meta">{resultCount} Pokemon match your criteria</p>
    </section>
  );
};
