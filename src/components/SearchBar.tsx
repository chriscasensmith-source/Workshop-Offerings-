import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="search-field">
      <label htmlFor="course-search">Search workshops</label>
      <div className="search-input-wrap">
        <Search aria-hidden="true" size={22} />
        <input
          id="course-search"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search by topic, skill, or outcome"
        />
        {value && (
          <button
            type="button"
            className="search-clear"
            onClick={() => onChange('')}
            aria-label="Clear search"
          >
            <X aria-hidden="true" size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
