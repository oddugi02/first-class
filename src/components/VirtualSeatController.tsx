import { motion, AnimatePresence } from 'framer-motion';
import type { CabinState, SeatMode } from '../types';
import { SEAT_MODE_CONFIG } from '../types';
import { spring } from '../lib/motion';
import { RippleButton } from './RippleButton';
import { SeatSchematic } from './SeatSchematic';
import { PanelHeader } from './ui/PanelHeader';
import { GlassCard } from './ui/GlassCard';

interface VirtualSeatControllerProps {
  state: CabinState;
  onSeatModeChange: (mode: SeatMode) => void;
  onAmbientChange: (ambient: number) => void;
  visible: boolean;
}

const MODES: SeatMode[] = ['upright', 'relax', 'bed'];

export function VirtualSeatController({
  state,
  onSeatModeChange,
  onAmbientChange,
  visible,
}: VirtualSeatControllerProps) {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : -24 }}
      transition={{ ...spring, delay: visible ? 0.15 : 0 }}
      className="glass-panel flex flex-col border-r"
    >
      <PanelHeader label="Suite Controls" title="Virtual Seat Controller" />

      <motion.div className="flex-1 space-y-6 overflow-y-auto px-6 py-6 lg:px-8">
        <GlassCard className="p-5">
          <p className="luxury-caption mb-4">Seat Position</p>
          <SeatSchematic
            seatMode={state.seatMode}
            recline={state.recline}
            legRest={state.legRest}
          />
        </GlassCard>

        <section>
          <p className="luxury-caption mb-3">Configuration</p>
          <motion.div className="flex flex-col gap-2.5">
            {MODES.map((mode) => {
              const cfg = SEAT_MODE_CONFIG[mode];
              const active = state.seatMode === mode;
              return (
                <RippleButton
                  key={mode}
                  active={active}
                  onClick={() => onSeatModeChange(mode)}
                  aria-label={`${cfg.label} ${cfg.sublabel}`}
                >
                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <div>
                      <p
                        className={`text-sm font-bold tracking-tight ${
                          active ? 'text-serenity' : 'text-slate'
                        }`}
                      >
                        {cfg.label}
                        <span className="font-normal text-slate-muted">
                          {' '}
                          / {cfg.sublabel}
                        </span>
                      </p>
                      <p className="luxury-caption mt-1 !tracking-[0.16em]">
                        {cfg.recline}° · {cfg.legRest ? 'Leg rest on' : 'Standard'}
                      </p>
                    </div>
                    <motion.span
                      className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold ${
                        active
                          ? 'border-serenity/30 bg-serenity text-cream'
                          : 'border-slate/10 bg-white/80 text-slate-muted'
                      }`}
                      animate={active ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                      transition={spring}
                    >
                      {mode === 'upright' ? '↑' : mode === 'relax' ? '↗' : '∥'}
                    </motion.span>
                  </div>
                </RippleButton>
              );
            })}
          </motion.div>
        </section>

        <AnimatePresence>
          {state.diningAmbienceLinked && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={spring}
              className="overflow-hidden"
            >
              <GlassCard className="border-serenity/20 !bg-serenity/5 px-4 py-3" interactive={false}>
                <p className="luxury-label !text-serenity">Dining mode · 115°</p>
                <p className="luxury-body mt-1.5 text-slate">
                  Table deployed, warm bulb lighting, and cabin hum activated per Kosmo Suite 2.0.
                </p>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {state.bedAmbienceLinked && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={spring}
              className="overflow-hidden"
            >
              <GlassCard className="border-brass/20 !bg-brass/5 px-4 py-3" interactive={false}>
                <p className="luxury-label !text-brass">Rest ambience</p>
                <p className="luxury-body mt-1.5 text-slate">
                  Window set to Midnight Flight with cozy cabin glow for sleep.
                </p>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>

        <GlassCard className="p-5">
          <div className="mb-3 flex items-baseline justify-between">
            <span className="luxury-caption">Cabin Ambient</span>
            <span className="font-mono text-sm font-semibold tabular-nums text-slate">
              {state.ambient}
              <span className="luxury-caption ml-0.5 !inline">%</span>
            </span>
          </div>
          <div className="relative h-1 rounded-full bg-slate/10">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brass/80 to-serenity"
              style={{ width: `${state.ambient}%` }}
              layout
              transition={spring}
            />
            <input
              type="range"
              min={0}
              max={100}
              value={state.ambient}
              onChange={(e) => onAmbientChange(Number(e.target.value))}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              aria-label="Cabin ambient light"
            />
          </div>
        </GlassCard>
      </motion.div>
    </motion.aside>
  );
}
