import { ArrowUpRight, Clock3, Users } from 'lucide-react';
import { motion } from 'motion/react';
import type { Course } from '../types/course';
import { RegistrationLink } from './RegistrationLink';

interface CourseCardProps {
  course: Course;
  onViewDetails: (course: Course) => void;
}

export function CourseCard({ course, onViewDetails }: CourseCardProps) {
  return (
    <motion.article
      className="course-card"
      data-category={course.category}
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.28 }}
    >
      <div className="card-accent" aria-hidden="true" />
      <div className="card-meta-row">
        <span className="category-tag">{course.category}</span>
        <span className="duration">
          <Clock3 aria-hidden="true" size={15} />
          {course.duration}
        </span>
      </div>
      <h3>{course.title}</h3>
      <p className="course-summary">{course.summary}</p>
      <div className="outcome-block">
        <span>You will leave able to</span>
        <p>{course.outcome}</p>
      </div>
      <p className="audience">
        <Users aria-hidden="true" size={17} />
        <span>
          <strong>Best for:</strong> {course.audience}
        </span>
      </p>
      <div className="card-actions">
        <button type="button" className="button button-secondary" onClick={() => onViewDetails(course)}>
          View Details
          <ArrowUpRight aria-hidden="true" size={16} />
        </button>
        <RegistrationLink className="button button-ghost" courseTitle={course.title}>
          Register
        </RegistrationLink>
      </div>
    </motion.article>
  );
}
