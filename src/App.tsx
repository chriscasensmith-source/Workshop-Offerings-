import { RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CategoryFilters } from './components/CategoryFilters';
import { CourseGrid } from './components/CourseGrid';
import { DurationFilters } from './components/DurationFilters';
import { SearchBar } from './components/SearchBar';
import { courses } from './data/courses';
import { filterCourses } from './lib/filterCourses';
import type { CategoryFilter, DurationFilter } from './types/course';

export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('All Workshops');
  const [duration, setDuration] = useState<DurationFilter>('all');

  const filteredCourses = useMemo(
    () => filterCourses(courses, { query, category, duration }),
    [query, category, duration],
  );
  const hasActiveFilters = query.trim() !== '' || category !== 'All Workshops' || duration !== 'all';

  const resetFilters = () => {
    setQuery('');
    setCategory('All Workshops');
    setDuration('all');
  };

  const resultLabel = `${filteredCourses.length} ${
    filteredCourses.length === 1 ? 'workshop' : 'workshops'
  } found`;

  return (
    <main>
      <section id="courses" className="catalog-section" aria-labelledby="catalog-heading">
        <div className="section-shell">
          <div className="section-heading-row">
            <div>
              <p className="eyebrow">Explore the catalog</p>
              <h2 id="catalog-heading">Find the workshop that fits.</h2>
            </div>
            <p className="result-count" role="status" aria-live="polite">
              {resultLabel}
            </p>
          </div>
          <div className="explorer-panel">
            <SearchBar value={query} onChange={setQuery} />
            <div className="filter-layout">
              <CategoryFilters value={category} onChange={setCategory} />
              <DurationFilters value={duration} onChange={setDuration} />
            </div>
            {hasActiveFilters && (
              <button type="button" className="reset-button" onClick={resetFilters}>
                <RotateCcw aria-hidden="true" size={15} />
                Reset Filters
              </button>
            )}
          </div>
          <CourseGrid
            courses={filteredCourses}
            onReset={resetFilters}
            onViewDetails={() => undefined}
          />
        </div>
      </section>
    </main>
  );
}
