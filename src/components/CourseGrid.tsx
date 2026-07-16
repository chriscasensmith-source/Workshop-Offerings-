import { SearchX } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { Course } from '../types/course';
import { CourseCard } from './CourseCard';

interface CourseGridProps {
  courses: Course[];
  onReset: () => void;
  onViewDetails: (course: Course) => void;
}

export function CourseGrid({ courses, onReset, onViewDetails }: CourseGridProps) {
  if (courses.length === 0) {
    return (
      <motion.div
        className="empty-state"
        role="region"
        aria-label="No workshops found"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <SearchX aria-hidden="true" size={32} />
        <h3>No workshops match yet</h3>
        <p>Try a broader search or clear your filters to see the full catalog.</p>
        <button type="button" className="button button-primary" onClick={onReset}>
          Clear all filters
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div className="course-grid" layout>
      <AnimatePresence mode="popLayout">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} onViewDetails={onViewDetails} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
