export const courseCategories = [
  'Emotional Intelligence',
  'Teams and Communication',
  'Leadership',
  'Artificial Intelligence',
] as const;

export type CourseCategory = (typeof courseCategories)[number];

export type CategoryFilter = 'All Workshops' | CourseCategory;

export type DurationFilter = 'all' | '60' | '90' | 'up-to-120';

export type CourseIconName =
  | 'brain'
  | 'heart-pulse'
  | 'blocks'
  | 'users-round'
  | 'presentation'
  | 'sparkles'
  | 'bot'
  | 'wand-sparkles'
  | 'compass'
  | 'scan-search'
  | 'waypoints';

export interface Course {
  id: string;
  title: string;
  shortTitle: string;
  category: CourseCategory;
  duration: string;
  durationMinutes: 60 | 90 | 120;
  audience: string;
  summary: string;
  outcome: string;
  learningPoints: string[];
  searchTerms: string[];
  featured: boolean;
  icon: CourseIconName;
  note?: string;
}
