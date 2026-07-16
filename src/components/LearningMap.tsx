import { Brain, Bot, MessageCircleMore, Presentation } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';

const nodes = [
  { label: 'Emotional intelligence', className: 'map-node teal', Icon: Brain },
  { label: 'Teams & communication', className: 'map-node amber', Icon: MessageCircleMore },
  { label: 'Leadership', className: 'map-node coral', Icon: Presentation },
  { label: 'Artificial intelligence', className: 'map-node violet', Icon: Bot },
];

export function LearningMap() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="learning-map" aria-hidden="true">
      <svg className="map-paths" viewBox="0 0 560 460" fill="none">
        <motion.path
          d="M70 92C164 48 214 142 284 172C367 207 391 92 493 112"
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.1, delay: 0.3 }}
        />
        <motion.path
          d="M89 357C178 411 219 310 282 278C360 239 405 345 495 329"
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.1, delay: 0.45 }}
        />
        <motion.path
          d="M283 172V278"
          initial={{ pathLength: reduceMotion ? 1 : 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduceMotion ? 0 : 0.6, delay: 0.9 }}
        />
      </svg>
      {nodes.map(({ label, className, Icon }, index) => (
        <motion.div
          key={label}
          className={className}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: reduceMotion ? 0 : 0.45 + index * 0.12 }}
        >
          <Icon size={19} />
          <span>{label}</span>
        </motion.div>
      ))}
      <motion.div
        className="map-card card-one"
        initial={reduceMotion ? false : { opacity: 0, y: 16, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: -1 }}
        transition={{ delay: reduceMotion ? 0 : 0.85, duration: 0.45 }}
      >
        <span>Workshop 07</span>
        <strong>AI 101</strong>
        <small>60 min · Beginner friendly</small>
      </motion.div>
      <motion.div
        className="map-card card-two"
        initial={reduceMotion ? false : { opacity: 0, y: 16, rotate: 2 }}
        animate={{ opacity: 1, y: 0, rotate: 2 }}
        transition={{ delay: reduceMotion ? 0 : 1, duration: 0.45 }}
      >
        <span>Workshop 03</span>
        <strong>Team Building 101</strong>
        <small>60 min · Activity based</small>
      </motion.div>
      <div className="map-center">
        <span>11</span>
        <small>ways to grow</small>
      </div>
    </div>
  );
}
