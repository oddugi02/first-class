import { motion } from 'framer-motion';
import type { AmbientSound } from '../types';
import { AMBIENT_SOUND_LABEL } from '../types';
import { spring, hoverLift, hoverRest } from '../lib/motion';

interface AmbientSoundToggleProps {
  visible: boolean;
  activeSound: AmbientSound;
  onSoundChange: (sound: AmbientSound) => void;
}

const CABIN_ICON = (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 12c2-4 6-6 8-6s6 2 8 6" strokeLinecap="round" />
    <path d="M6 14c1.5 2 4 3 6 3s4.5-1 6-3" strokeLinecap="round" opacity="0.6" />
    <path d="M8 16c1 1.5 2.5 2 4 2s3-.5 4-2" strokeLinecap="round" opacity="0.4" />
  </svg>
);

export function AmbientSoundToggle({
  visible,
  activeSound,
  onSoundChange,
}: AmbientSoundToggleProps) {
  const isOn = activeSound === 'cabin';

  if (!visible) return null;

  return (
    <motion.div
      className="fixed bottom-24 right-6 z-40 flex flex-col items-end gap-2"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...spring, delay: 0.6 }}
    >
      {isOn && (
        <motion.p
          className="glass-panel rounded-full border px-3 py-1.5 text-[10px] font-semibold text-slate shadow-sm"
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={spring}
        >
          {AMBIENT_SOUND_LABEL}
        </motion.p>
      )}

      <motion.button
        type="button"
        onClick={() => onSoundChange(isOn ? null : 'cabin')}
        className={`glass-card flex h-12 w-12 items-center justify-center rounded-full !p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-serenity/40 ${
          isOn ? '!border-serenity/35 !bg-serenity text-cream' : 'text-slate'
        }`}
        initial={hoverRest}
        whileHover={hoverLift}
        whileTap={{ scale: 0.94 }}
        transition={spring}
        aria-label={isOn ? 'Turn off cabin hum' : 'Turn on cabin hum'}
        aria-pressed={isOn}
      >
        {CABIN_ICON}
      </motion.button>
    </motion.div>
  );
}
