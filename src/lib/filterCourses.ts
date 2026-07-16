import type {
  CategoryFilter,
  Course,
  DurationFilter,
} from '../types/course';

export interface CourseFilters {
  query: string;
  category: CategoryFilter;
  duration: DurationFilter;
}

const durationMap: Record<Exclude<DurationFilter, 'all'>, Course['durationMinutes']> = {
  '60': 60,
  '90': 90,
  'up-to-120': 120,
};

function normalize(value: string): string {
  return value.toLocaleLowerCase().replace(/\s+/g, ' ').trim();
}

function searchableText(course: Course): string {
  return normalize(
    [
      course.title,
      course.shortTitle,
      course.summary,
      course.outcome,
      course.audience,
      ...course.learningPoints,
      ...course.searchTerms,
    ].join(' '),
  );
}

export function filterCourses(items: Course[], filters: CourseFilters): Course[] {
  const query = normalize(filters.query);

  return items.filter((course) => {
    const matchesQuery = query === '' || searchableText(course).includes(query);
    const matchesCategory =
      filters.category === 'All Workshops' || course.category === filters.category;
    const matchesDuration =
      filters.duration === 'all' || course.durationMinutes === durationMap[filters.duration];

    return matchesQuery && matchesCategory && matchesDuration;
  });
}
