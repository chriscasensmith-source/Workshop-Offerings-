import * as Dialog from '@radix-ui/react-dialog';
import { CircleAlert, Clock3, Sparkle, Users, X } from 'lucide-react';
import { motion } from 'motion/react';
import type { Course } from '../types/course';
import { RegistrationLink } from './RegistrationLink';

interface CourseDetailProps {
  course: Course | null;
  onOpenChange: (open: boolean) => void;
  returnFocus: HTMLButtonElement | null;
}

export function CourseDetail({ course, onOpenChange, returnFocus }: CourseDetailProps) {
  return (
    <Dialog.Root open={course !== null} onOpenChange={onOpenChange}>
      {course && (
        <Dialog.Portal>
          <Dialog.Overlay
            className="drawer-overlay"
            data-testid="course-detail-overlay"
            onClick={() => onOpenChange(false)}
          />
          <Dialog.Content
            asChild
            aria-describedby={`course-summary-${course.id}`}
            onCloseAutoFocus={(event) => {
              event.preventDefault();
              returnFocus?.focus();
            }}
          >
            <motion.section
              className="course-drawer"
              data-category={course.category}
              initial={{ opacity: 0, x: 56 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 32 }}
              transition={{ type: 'spring', stiffness: 360, damping: 34 }}
            >
              <div className="drawer-accent" aria-hidden="true" />
              <Dialog.Close asChild>
                <button type="button" className="drawer-close" aria-label="Close course details">
                  <X aria-hidden="true" size={22} />
                </button>
              </Dialog.Close>
              <div className="drawer-content">
                <div className="drawer-kicker">
                  <span className="category-tag">{course.category}</span>
                  <span className="duration">
                    <Clock3 aria-hidden="true" size={16} />
                    {course.duration}
                  </span>
                </div>
                <Dialog.Title asChild>
                  <h2>{course.title}</h2>
                </Dialog.Title>
                <p className="drawer-audience">
                  <Users aria-hidden="true" size={18} />
                  {course.audience}
                </p>
                <Dialog.Description asChild>
                  <p id={`course-summary-${course.id}`} className="drawer-summary">
                    {course.summary}
                  </p>
                </Dialog.Description>

                <div className="drawer-outcome">
                  <span>Participant outcome</span>
                  <p>{course.outcome}</p>
                </div>

                <div className="learning-list">
                  <h3>What you’ll practice</h3>
                  <ul>
                    {course.learningPoints.map((point) => (
                      <li key={point}>
                        <Sparkle aria-hidden="true" size={16} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {course.note && (
                  <aside className="course-note">
                    <CircleAlert aria-hidden="true" size={19} />
                    <p>{course.note}</p>
                  </aside>
                )}

                <RegistrationLink className="button button-primary drawer-register" courseTitle={course.title}>
                  Register for this workshop
                </RegistrationLink>
              </div>
            </motion.section>
          </Dialog.Content>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  );
}
