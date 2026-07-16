import { RotateCcw } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CategoryFilters } from './components/CategoryFilters';
import { CourseDetail } from './components/CourseDetail';
import { CourseGrid } from './components/CourseGrid';
import { DurationFilters } from './components/DurationFilters';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { RegistrationCTA } from './components/RegistrationCTA';
import { SearchBar } from './components/SearchBar';
import { courses } from './data/courses';
import { filterCourses } from './lib/filterCourses';
import type { CategoryFilter, Course, DurationFilter } from './types/course';

export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('All Workshops');
  const [duration, setDuration] = useState<DurationFilter>('all');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [detailTrigger, setDetailTrigger] = useState<HTMLButtonElement | null>(null);

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

  const openCourse = (course: Course, trigger: HTMLButtonElement) => {
    setDetailTrigger(trigger);
    setSelectedCourse(course);
  };

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <div id="top" />
        <Hero />
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
            onViewDetails={openCourse}
          />
        </div>
        </section>
        <HowItWorks />
        <RegistrationCTA />
        <CourseDetail
          course={selectedCourse}
          onOpenChange={(open) => {
            if (!open) setSelectedCourse(null);
          }}
          returnFocus={detailTrigger}
        />
      </main>
      <Footer />
    </>
  );
}
