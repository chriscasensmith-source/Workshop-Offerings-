import type { DurationFilter } from '../types/course';

interface DurationFiltersProps {
  value: DurationFilter;
  onChange: (value: DurationFilter) => void;
}

const durations: Array<{ label: string; value: DurationFilter }> = [
  { label: 'All Durations', value: 'all' },
  { label: '60 Minutes', value: '60' },
  { label: '90 Minutes', value: '90' },
  { label: 'Up to 2 Hours', value: 'up-to-120' },
];

export function DurationFilters({ value, onChange }: DurationFiltersProps) {
  return (
    <div className="filter-group" aria-labelledby="duration-filter-label">
      <p id="duration-filter-label" className="filter-label">
        Duration
      </p>
      <div className="duration-options" role="group" aria-label="Workshop duration">
        {durations.map((duration) => (
          <button
            key={duration.value}
            type="button"
            className="duration-button"
            aria-pressed={value === duration.value}
            onClick={() => onChange(duration.value)}
          >
            {duration.label}
          </button>
        ))}
      </div>
    </div>
  );
}
