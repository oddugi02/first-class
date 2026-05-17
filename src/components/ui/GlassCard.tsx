import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { hoverLift, hoverRest, spring } from '../../lib/motion';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}

export function GlassCard({
  children,
  className = '',
  interactive = true,
}: GlassCardProps) {
  return (
    <motion.div
      className={`glass-card rounded-xl ${className}`}
      initial={hoverRest}
      whileHover={interactive ? hoverLift : undefined}
      transition={spring}
    >
      {children}
    </motion.div>
  );
}
