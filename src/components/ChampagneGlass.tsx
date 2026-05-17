import { motion, AnimatePresence } from 'framer-motion';
import { spring } from '../lib/motion';

interface ChampagneGlassProps {
  filling: boolean;
  ordered: boolean;
}

const BUBBLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: 38 + (i % 5) * 5 + (i % 3) * 2,
  delay: i * 0.18,
  size: i % 3 === 0 ? 2.5 : 1.5,
}));

export function ChampagneGlass({ filling, ordered }: ChampagneGlassProps) {
  return (
    <div className="relative flex h-36 w-24 flex-col items-center justify-end">
      <svg
        viewBox="0 0 80 120"
        className="h-full w-full drop-shadow-[0_8px_24px_rgba(28,30,33,0.12)]"
        aria-hidden
      >
        <defs>
          <linearGradient id="champagneLiquid" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#E8D4A8" />
            <stop offset="45%" stopColor="#F5E6B8" />
            <stop offset="100%" stopColor="#FFF8E7" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="glassShine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0.35" />
            <stop offset="50%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Glass bowl */}
        <path
          d="M 22 28 Q 40 8 58 28 L 52 72 Q 40 82 28 72 Z"
          fill="rgba(255,255,255,0.12)"
          stroke="rgba(196,163,90,0.5)"
          strokeWidth="0.75"
        />
        {/* Stem */}
        <rect x="37" y="72" width="6" height="28" rx="1" fill="rgba(255,255,255,0.08)" stroke="rgba(196,163,90,0.35)" strokeWidth="0.5" />
        {/* Base */}
        <ellipse cx="40" cy="104" rx="14" ry="4" fill="rgba(255,255,255,0.06)" stroke="rgba(196,163,90,0.35)" strokeWidth="0.5" />

        {/* Liquid fill */}
        <motion.path
          d="M 26 72 Q 40 78 54 72 L 54 72 Q 56 50 40 42 Q 24 50 26 72 Z"
          fill="url(#champagneLiquid)"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{
            opacity: filling || ordered ? 1 : 0,
            scaleY: filling || ordered ? 1 : 0,
          }}
          style={{ transformOrigin: '40px 72px' }}
          transition={spring}
        />

        {/* Shine */}
        <path
          d="M 30 32 Q 36 24 42 30 L 38 65 Q 36 68 34 65 Z"
          fill="url(#glassShine)"
        />
      </svg>

      {/* Bubble particles */}
      <AnimatePresence>
        {(filling || ordered) && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {BUBBLES.map((b) => (
              <motion.span
                key={b.id}
                className="absolute rounded-full bg-white/70"
                style={{
                  left: `${b.left}%`,
                  bottom: '28%',
                  width: b.size,
                  height: b.size,
                }}
                initial={{ opacity: 0, y: 0 }}
                animate={{
                  opacity: [0, 0.9, 0],
                  y: -55 - (b.id % 4) * 12,
                }}
                transition={{
                  ...spring,
                  repeat: Infinity,
                  delay: b.delay,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {ordered && !filling && (
          <motion.p
            className="absolute -bottom-1 text-[9px] font-medium uppercase tracking-[0.2em] text-brass"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Served
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
