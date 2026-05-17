import { motion } from 'framer-motion';
import type { CabinState, TimeOfDay } from '../types';
import { TIME_OF_DAY_LABELS } from '../types';
import { spring } from '../lib/motion';
import { VirtualWindow } from './VirtualWindow';
import { RippleButton } from './RippleButton';
import { PanelHeader } from './ui/PanelHeader';
import { GlassCard } from './ui/GlassCard';

interface SuiteViewProps {
  state: CabinState;
  onTimeOfDayChange: (time: TimeOfDay) => void;
  visible: boolean;
}

const TIME_MODES: {
  id: TimeOfDay;
  label: string;
  sublabel: string;
}[] = [
  { id: 'sunrise', label: 'Sunrise', sublabel: 'Dawn palette' },
  { id: 'day', label: 'Cruising Altitude', sublabel: 'Day' },
  { id: 'midnight', label: 'Midnight Flight', sublabel: 'Stars & mood light' },
];

export function SuiteView({
  state,
  onTimeOfDayChange,
  visible,
}: SuiteViewProps) {
  const cozyGlow = state.seatMode === 'bed' || state.bedAmbienceLinked;

  return (
    <motion.section
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 24 }}
      transition={{ ...spring, delay: visible ? 0.2 : 0 }}
      className="glass-panel relative flex flex-1 flex-col border-l border-white/30"
    >
      <PanelHeader label="Private Suite" title="The Suite View" />

      <div className="relative flex flex-1 flex-col p-6 lg:p-8">
        <motion.div
          className="relative flex-1 overflow-hidden rounded-sm border border-white/40 shadow-[0_32px_80px_rgba(28,30,33,0.1)]"
          layout
          transition={spring}
        >
          <motion.div className="absolute inset-0 bg-gradient-to-b from-slate/85 via-slate/65 to-slate/80 p-3 md:p-4">
            <VirtualWindow
              timeOfDay={state.timeOfDay}
              ambient={state.ambient}
              cozyGlow={cozyGlow}
            />
          </motion.div>
          <div className="pointer-events-none absolute inset-3 rounded-sm border border-brass/20 md:inset-4" />
        </motion.div>

        <motion.div
          className="mt-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
          transition={{ ...spring, delay: 0.25 }}
        >
          <p className="luxury-caption mb-3">Time of Day</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {TIME_MODES.map((mode) => (
              <RippleButton
                key={mode.id}
                active={state.timeOfDay === mode.id}
                onClick={() => onTimeOfDayChange(mode.id)}
                aria-label={TIME_OF_DAY_LABELS[mode.id]}
                className="py-3.5"
              >
                <motion.div className="relative z-10">
                  <p
                    className={`text-xs font-bold leading-snug ${
                      state.timeOfDay === mode.id ? 'text-serenity' : 'text-slate'
                    }`}
                  >
                    {mode.label}
                  </p>
                  <p className="luxury-caption mt-1 !text-[9px] !tracking-[0.14em]">
                    {mode.sublabel}
                  </p>
                  <motion.div
                    className="mt-2 h-1 w-full overflow-hidden rounded-full bg-slate/10"
                    aria-hidden
                  >
                    <motion.div
                      className="h-full rounded-full"
                      animate={{
                        width: '100%',
                        background:
                          mode.id === 'sunrise'
                            ? 'linear-gradient(90deg, #F8C4D0, #F4D58D, #A8D8F0)'
                            : mode.id === 'day'
                              ? 'linear-gradient(90deg, #0B3D7A, #4A9FE8)'
                              : 'linear-gradient(90deg, #030508, #1a2240)',
                        opacity: state.timeOfDay === mode.id ? 1 : 0.35,
                      }}
                      transition={spring}
                    />
                  </motion.div>
                </motion.div>
              </RippleButton>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-4 grid grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
          transition={{ ...spring, delay: 0.35 }}
        >
          {[
            { label: 'View', value: TIME_OF_DAY_LABELS[state.timeOfDay] },
            { label: 'Altitude', value: '38,000 ft' },
            { label: 'Suite', value: '1A Private' },
          ].map((item, i) => (
            <GlassCard key={item.label} className="px-4 py-3">
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: 0.4 + i * 0.06 }}
              >
                <p className="luxury-caption !text-[9px]">{item.label}</p>
                <p className="mt-1 text-sm font-bold text-slate">{item.value}</p>
              </motion.div>
            </GlassCard>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
