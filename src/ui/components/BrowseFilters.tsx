import type { SearchSession } from '../../domain/pokemon';

type Props = {
  session: SearchSession;
  onQueryChange: (value: string) => void;
  onTypeChange: (value: string) => void;
};

const TYPES = ['', 'grass', 'fire', 'water', 'electric'];

export const BrowseFilters = ({ session, onQueryChange, onTypeChange }: Props) => {
  return (
    <div className="row">
      <input
        aria-label="Search Pokemon"
        value={session.query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search by name"
      />
      <select
        aria-label="Filter by type"
        value={session.filters.type}
        onChange={(e) => onTypeChange(e.target.value)}
      >
        {TYPES.map((type) => (
          <option key={type || 'all'} value={type}>
            {type || 'all types'}
          </option>
        ))}
      </select>
    </div>
  );
};
