import { motion } from 'framer-motion';
import type { SpiceLevel } from '../../data/diningGuide';
import { RAMEN_GARNISHES, SPICE_LABELS } from '../../data/diningGuide';
import { spring, hoverLift, hoverRest } from '../../lib/motion';
import { GlassCard } from '../ui/GlassCard';

const SPICE_GLOW = [
  'rgba(255, 200, 120, 0.15)',
  'rgba(255, 140, 60, 0.25)',
  'rgba(220, 50, 40, 0.35)',
];

interface RamenInteractionProps {
  spiceLevel: SpiceLevel;
  garnishes: string[];
  onSpiceChange: (level: SpiceLevel) => void;
  onToggleGarnish: (id: string) => void;
}

export function RamenInteraction({
  spiceLevel,
  garnishes,
  onSpiceChange,
  onToggleGarnish,
}: RamenInteractionProps) {
  return (
    <GlassCard className="overflow-hidden p-6" interactive={false}>
      <motion.div
        animate={{
          boxShadow: `inset 0 0 80px 30px ${SPICE_GLOW[spiceLevel]}`,
        }}
        transition={spring}
        className="grid gap-6 md:grid-cols-2"
      >
        <div>
          <p className="luxury-label">Session 02 · Night Service</p>
          <h3 className="luxury-subheading mt-1">Luxury Late-Night Ramen</h3>
          <p className="luxury-body mt-2">
            Dried pollock hangover ramen & jjamppong — privilege at 35,000 feet.
          </p>

          <div className="mt-5">
            <p className="luxury-caption mb-2">Spice intensity</p>
            <motion.div className="flex gap-2">
              {SPICE_LABELS.map((label, i) => (
                <motion.button
                  key={label}
                  type="button"
                  onClick={() => onSpiceChange(i as SpiceLevel)}
                  className={`flex-1 rounded-lg border py-2 text-[10px] font-bold uppercase tracking-[0.12em] ${
                    spiceLevel === i
                      ? 'border-serenity/40 bg-serenity/10 text-serenity'
                      : 'border-slate/10 bg-white/60 text-slate-muted'
                  }`}
                  whileHover={hoverLift}
                  transition={spring}
                >
                  {label}
                </motion.button>
              ))}
            </motion.div>
          </div>

          <div className="mt-5">
            <p className="luxury-caption mb-2">Garnish customization</p>
            <div className="flex flex-wrap gap-2">
              {RAMEN_GARNISHES.map((g) => {
                const on = garnishes.includes(g.id);
                return (
                  <motion.button
                    key={g.id}
                    type="button"
                    onClick={() => onToggleGarnish(g.id)}
                    className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] ${
                      on ? 'border-brass/50 bg-brass/10 text-slate' : 'border-slate/10 text-slate-muted'
                    }`}
                    initial={hoverRest}
                    whileHover={hoverLift}
                    whileTap={{ scale: 0.95 }}
                    transition={spring}
                    aria-pressed={on}
                  >
                    {on ? '✓ ' : ''}
                    {g.label}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            filter: `hue-rotate(${spiceLevel * 8}deg) saturate(${1 + spiceLevel * 0.25})`,
          }}
          transition={spring}
        >
          <div className="relative h-44 w-44 overflow-hidden rounded-2xl border border-slate/10 bg-gradient-to-b from-red-100 to-red-200 shadow-inner">
            <motion.div
              className="absolute inset-x-4 bottom-8 top-10 rounded-full bg-gradient-to-b from-red-500/90 to-red-700/90"
              animate={{ opacity: 0.85 + spiceLevel * 0.05 }}
              transition={spring}
            />
            {garnishes.includes('scallion') && (
              <motion.div
                className="absolute left-1/2 top-12 h-8 w-20 -translate-x-1/2 rounded-full bg-green-500/80"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={spring}
              />
            )}
            {garnishes.includes('sprouts') && (
              <motion.div
                className="absolute bottom-14 left-8 h-6 w-10 rounded-full bg-green-300/70"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={spring}
              />
            )}
            {garnishes.includes('chili') && (
              <motion.div
                className="absolute bottom-16 right-8 h-4 w-4 rounded-full bg-red-800"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={spring}
              />
            )}
          </div>
          <p className="luxury-caption absolute -bottom-1">Broth density · live preview</p>
        </motion.div>
      </motion.div>
    </GlassCard>
  );
}
