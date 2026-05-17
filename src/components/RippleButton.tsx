import { useState, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hoverLift, hoverRest, spring } from '../lib/motion';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface RippleButtonProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
  className?: string;
  'aria-label'?: string;
}

export function RippleButton({
  active,
  onClick,
  children,
  className = '',
  'aria-label': ariaLabel,
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x, y }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 700);
      onClick();
    },
    [onClick],
  );

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-pressed={active}
      className={`glass-card relative overflow-hidden rounded-xl px-4 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-serenity/40 focus-visible:ring-offset-2 ${
        active
          ? '!border-serenity/35 !bg-serenity/6'
          : ''
      } ${className}`}
      initial={hoverRest}
      whileHover={hoverLift}
      whileTap={{ scale: 0.985, y: -1 }}
      transition={spring}
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="pointer-events-none absolute rounded-full bg-serenity/15"
            style={{ left: ripple.x, top: ripple.y }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.6 }}
            animate={{ width: 280, height: 280, x: -140, y: -140, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={spring}
          />
        ))}
      </AnimatePresence>
      {active && (
        <motion.span
          layoutId="seat-mode-glow"
          className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-brass/35"
          transition={spring}
        />
      )}
      {children}
    </motion.button>
  );
}
