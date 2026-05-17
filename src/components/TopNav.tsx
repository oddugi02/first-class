import { motion } from 'framer-motion';
import { spring, hoverLift } from '../lib/motion';
import { useFlightClock } from '../hooks/useFlightClock';
import type { DestinationCode } from '../types/booking';

interface TopNavProps {
  visible: boolean;
  destination?: DestinationCode | null;
}

export function TopNav({ visible, destination = null }: TopNavProps) {
  const flightTime = useFlightClock(visible, destination);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -12 }}
      transition={{ ...spring, delay: visible ? 0.1 : 0 }}
      className="glass-nav flex items-center justify-between border-b border-white/40 px-8 py-5 lg:px-12"
    >
      <motion.div
        className="flex items-center gap-4"
        whileHover={{ scale: 1.01 }}
        transition={spring}
      >
        <motion.div
          className="glass-card flex h-11 w-11 items-center justify-center rounded-full !p-0"
          aria-hidden
          whileHover={hoverLift}
          transition={spring}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-serenity" fill="currentColor">
            <path d="M12 2L4 8v14h16V8L12 2zm0 2.5L17 9v11H7V9l5-4.5z" />
            <circle cx="12" cy="14" r="2" className="opacity-60" />
          </svg>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ...spring, delay: 0.2 }}
        >
          <p className="luxury-label">Korean Air</p>
          <p className="luxury-heading mt-0.5 !text-sm">First Class Experience</p>
        </motion.div>
      </motion.div>

      <div className="hidden items-center gap-8 md:flex">
        <div className="text-right">
          <p className="luxury-caption">Flight</p>
          <p className="mt-0.5 font-mono text-sm font-bold tracking-wider text-slate">
            KAL-2026
          </p>
        </div>
        <motion.div
          className="h-8 w-px bg-slate/10"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ ...spring, delay: 0.25 }}
        />
        <motion.div
          className="glass-card rounded-lg px-5 py-2.5"
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={hoverLift}
          transition={{ ...spring, delay: 0.2 }}
        >
          <p className="luxury-caption">Time En Route</p>
          <p className="mt-0.5 font-mono text-lg font-semibold tabular-nums tracking-widest text-serenity">
            {flightTime}
          </p>
        </motion.div>
      </div>
    </motion.header>
  );
}
