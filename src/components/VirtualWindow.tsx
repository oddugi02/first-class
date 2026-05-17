import { motion, AnimatePresence } from 'framer-motion';
import type { TimeOfDay } from '../types';
import { spring } from '../lib/motion';

const SKY_GRADIENTS: Record<TimeOfDay, string> = {
  sunrise:
    'linear-gradient(180deg, #F8C4D0 0%, #F4D58D 35%, #A8D8F0 70%, #E8F4FC 100%)',
  day: 'linear-gradient(180deg, #0B3D7A 0%, #1E6BB8 40%, #4A9FE8 75%, #B8E0FF 100%)',
  midnight:
    'linear-gradient(180deg, #030508 0%, #0a0e1a 30%, #12182e 60%, #1a2240 100%)',
};

interface VirtualWindowProps {
  timeOfDay: TimeOfDay;
  ambient: number;
  cozyGlow: boolean;
}

function Stars() {
  const stars = Array.from({ length: 48 }, (_, i) => ({
    id: i,
    left: `${(i * 17 + 7) % 100}%`,
    top: `${(i * 23 + 11) % 75}%`,
    size: i % 4 === 0 ? 2 : 1,
    delay: (i % 7) * 0.3,
  }));

  return (
  <>
    {stars.map((star) => (
      <motion.div
        key={star.id}
        className="absolute rounded-full bg-white"
        style={{
          left: star.left,
          top: star.top,
          width: star.size,
          height: star.size,
        }}
        animate={{ opacity: [0.2, 0.9, 0.2], scale: [1, 1.2, 1] }}
        transition={{
          duration: 2 + (star.id % 3),
          repeat: Infinity,
          delay: star.delay,
          ease: 'easeInOut',
        }}
      />
    ))}
  </>
  );
}

function CloudLayer({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/80 blur-2xl"
          style={{
            width: 100 + i * 40,
            height: 32 + i * 12,
            top: `${12 + i * 18}%`,
          }}
          animate={{ x: ['-30%', '130%'] }}
          transition={{
            duration: 22 + i * 5,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 5,
          }}
        />
      ))}
    </>
  );
}

export function VirtualWindow({ timeOfDay, ambient, cozyGlow }: VirtualWindowProps) {
  const isDay = timeOfDay === 'day';
  const isMidnight = timeOfDay === 'midnight';
  const isSunrise = timeOfDay === 'sunrise';
  const ambientBoost = 0.2 + (ambient / 100) * 0.5;

  return (
    <motion.div
      className="relative h-full w-full overflow-hidden rounded-sm"
      layout
    >
      <motion.div
        className="absolute inset-0"
        animate={{ background: SKY_GRADIENTS[timeOfDay] }}
        transition={spring}
      />

      {/* Sunrise sun glow */}
      <AnimatePresence>
        {isSunrise && (
          <motion.div
            className="absolute left-1/2 top-[28%] h-24 w-24 -translate-x-1/2 rounded-full bg-gradient-to-br from-amber-200/90 to-orange-300/60 blur-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={spring}
          />
        )}
      </AnimatePresence>

      <CloudLayer visible={isDay} />

      <AnimatePresence>
        {isMidnight && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={spring}
          >
            <Stars />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Horizon line per mode */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/4"
        animate={{
          background:
            isSunrise
              ? 'linear-gradient(to top, rgba(244,213,141,0.35), transparent)'
              : isDay
                ? 'linear-gradient(to top, rgba(184,224,255,0.25), transparent)'
                : 'linear-gradient(to top, rgba(26,34,64,0.6), transparent)',
        }}
        transition={spring}
      />

      {/* Cabin mood light — edges */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{
          boxShadow: cozyGlow
            ? `inset 0 0 80px 20px rgba(196,163,90,${0.15 + ambientBoost * 0.2}), inset 0 0 120px 40px rgba(0,85,165,${0.08 + ambientBoost * 0.1})`
            : isMidnight
              ? `inset 0 0 60px 15px rgba(196,163,90,${0.08 + ambientBoost * 0.12})`
              : 'inset 0 0 0 0 transparent',
        }}
        transition={spring}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        animate={{
          background: cozyGlow
            ? 'radial-gradient(ellipse at 50% 100%, rgba(255,220,180,0.25) 0%, transparent 55%)'
            : 'transparent',
          opacity: cozyGlow ? ambientBoost : 0,
        }}
        transition={spring}
      />

      {/* Window glare */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-transparent"
        animate={{ opacity: isMidnight ? 0.08 : 0.2 }}
        transition={spring}
      />
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-white/15" />
    </motion.div>
  );
}
