import { ArrowDownRight, Clock3, Lightbulb, LibraryBig } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { LearningMap } from './LearningMap';
import { RegistrationLink } from './RegistrationLink';

export function Hero() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : { opacity: 0, y: 18 };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-shell">
        <div className="hero-copy">
          <motion.p
            className="eyebrow hero-eyebrow"
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            Workshops built for real work
          </motion.p>
          <motion.h1
            id="hero-title"
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.08 }}
          >
            Learn something useful. <span>Bring it back to the job.</span>
          </motion.h1>
          <motion.p
            className="hero-description"
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.16 }}
          >
            Explore practical workshops in emotional intelligence, teamwork, leadership,
            communication, and artificial intelligence. Find the session that fits what you or your
            team needs next.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.24 }}
          >
            <a className="button button-primary" href="#courses">
              Browse Workshops
              <ArrowDownRight aria-hidden="true" size={18} />
            </a>
            <RegistrationLink className="button button-outline">
              Register for a Workshop
            </RegistrationLink>
          </motion.div>
          <motion.ul
            className="hero-facts"
            initial={initial}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: reduceMotion ? 0 : 0.32 }}
          >
            <li>
              <LibraryBig aria-hidden="true" size={18} />
              <span>11 workshops</span>
            </li>
            <li>
              <Clock3 aria-hidden="true" size={18} />
              <span>60 to 120 minute sessions</span>
            </li>
            <li>
              <Lightbulb aria-hidden="true" size={18} />
              <span>Practical activities and workplace takeaways</span>
            </li>
          </motion.ul>
        </div>
        <motion.div
          className="hero-visual"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.2 }}
        >
          <LearningMap />
        </motion.div>
      </div>
    </section>
  );
}
