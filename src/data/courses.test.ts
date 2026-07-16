import { courses } from './courses';

describe('course catalog', () => {
  it('contains exactly 11 workshops with unique IDs', () => {
    expect(courses).toHaveLength(11);
    expect(new Set(courses.map((course) => course.id)).size).toBe(11);
  });

  it('stores the CliftonStrengths assessment note in the catalog', () => {
    const course = courses.find((item) => item.id === 'cliftonstrengths-team-workshop');

    expect(course?.note).toBe(
      'Participants may need to complete the CliftonStrengths assessment before attending.',
    );
  });

  it('uses only supported duration minute values', () => {
    expect(new Set(courses.map((course) => course.durationMinutes))).toEqual(
      new Set([60, 90, 120]),
    );
  });
});
