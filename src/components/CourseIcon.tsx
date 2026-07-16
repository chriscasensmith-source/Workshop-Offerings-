import {
  Blocks,
  Bot,
  Brain,
  Compass,
  HeartPulse,
  Presentation,
  ScanSearch,
  Sparkles,
  UsersRound,
  WandSparkles,
  Waypoints,
  type LucideIcon,
} from 'lucide-react';
import type { CourseIconName } from '../types/course';

const icons: Record<CourseIconName, LucideIcon> = {
  brain: Brain,
  'heart-pulse': HeartPulse,
  blocks: Blocks,
  'users-round': UsersRound,
  presentation: Presentation,
  sparkles: Sparkles,
  bot: Bot,
  'wand-sparkles': WandSparkles,
  compass: Compass,
  'scan-search': ScanSearch,
  waypoints: Waypoints,
};

interface CourseIconProps {
  name: CourseIconName;
  size?: number;
}

export function CourseIcon({ name, size = 22 }: CourseIconProps) {
  const Icon = icons[name];
  return <Icon aria-hidden="true" size={size} strokeWidth={1.8} />;
}
