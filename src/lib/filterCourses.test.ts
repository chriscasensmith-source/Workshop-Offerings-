import type { Course } from '../types/course';
import { filterCourses } from './filterCourses';

const sampleCourses: Course[] = [
  {
    id: 'eq',
    title: 'EQ in the Workplace',
    shortTitle: 'Workplace EQ',
    category: 'Emotional Intelligence',
    duration: '120 minutes',
    durationMinutes: 120,
    audience: 'Employees and leaders',
    summary: 'Build empathy and trust at work.',
    outcome: 'Handle feedback with intention.',
    learningPoints: ['Recognize emotional patterns'],
    searchTerms: ['conflict', 'communication'],
    featured: false,
    icon: 'heart-pulse',
  },
  {
    id: 'ai-rca',
    title: 'AI Assisted Root Cause Analysis',
    shortTitle: 'AI Assisted RCA',
    category: 'Artificial Intelligence',
    duration: '90 minutes',
    durationMinutes: 90,
    audience: 'Quality teams and process owners',
    summary: 'Organize investigation evidence.',
    outcome: 'Strengthen investigation thinking.',
    learningPoints: ['Use fishbone analysis', 'Challenge assumptions'],
    searchTerms: ['Five Whys', 'problem solving'],
    featured: true,
    icon: 'scan-search',
  },
  {
    id: 'team',
    title: 'Team Building 101',
    shortTitle: 'Team Building',
    category: 'Teams and Communication',
    duration: '60 minutes',
    durationMinutes: 60,
    audience: 'Project groups',
    summary: 'Practice planning together.',
    outcome: 'Work better as a team.',
    learningPoints: ['Adapt when plans change'],
    searchTerms: ['collaboration'],
    featured: false,
    icon: 'blocks',
  },
];

const defaults = {
  query: '',
  category: 'All Workshops' as const,
  duration: 'all' as const,
};

describe('filterCourses', () => {
  it.each([
    ['title', 'ROOT CAUSE'],
    ['short title', 'assisted rca'],
    ['summary', 'investigation evidence'],
    ['outcome', 'investigation thinking'],
    ['audience', 'process owners'],
    ['learning points', 'fishbone'],
    ['search terms', 'five whys'],
  ])('matches a course by %s', (_field, query) => {
    expect(filterCourses(sampleCourses, { ...defaults, query }).map((course) => course.id)).toEqual([
      'ai-rca',
    ]);
  });

  it('filters by category', () => {
    expect(
      filterCourses(sampleCourses, {
        ...defaults,
        category: 'Emotional Intelligence',
      }).map((course) => course.id),
    ).toEqual(['eq']);
  });

  it.each([
    ['60', 'team'],
    ['90', 'ai-rca'],
    ['up-to-120', 'eq'],
  ] as const)('filters the %s duration', (duration, expectedId) => {
    expect(
      filterCourses(sampleCourses, { ...defaults, duration }).map((course) => course.id),
    ).toEqual([expectedId]);
  });

  it('combines search, category, and duration filters', () => {
    expect(
      filterCourses(sampleCourses, {
        query: 'fishbone',
        category: 'Artificial Intelligence',
        duration: '90',
      }).map((course) => course.id),
    ).toEqual(['ai-rca']);
  });

  it('treats whitespace-only search as empty', () => {
    expect(filterCourses(sampleCourses, { ...defaults, query: '   ' })).toHaveLength(3);
  });
});
