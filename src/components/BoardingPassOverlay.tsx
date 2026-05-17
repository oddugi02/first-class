import { motion } from 'framer-motion';
import { spring, hoverLift } from '../lib/motion';

interface BoardingPassOverlayProps {
  onScan: () => void;
}

export function BoardingPassOverlay({ onScan }: BoardingPassOverlayProps) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate/95 backdrop-blur-md"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={spring}
    >
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 39px,
            #F9F9FB 39px,
            #F9F9FB 40px
          )`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="text-center"
        >
          <p className="luxury-label !tracking-[0.35em] !text-brass">
            Boarding Pass Scanner
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-cream md:text-4xl">
            KAL First Class Experience
          </h1>
          <p className="luxury-caption mt-2 !text-cream/50">
            Present your boarding pass to enter your suite
          </p>
        </motion.div>

        <motion.button
          type="button"
          onClick={onScan}
          className="group relative cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brass/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ...spring, delay: 0.15 }}
          whileHover={{ ...hoverLift, scale: 1.01 }}
          whileTap={{ scale: 0.98, y: -1 }}
          aria-label="Scan boarding pass to enter cabin"
        >
          <div className="relative overflow-hidden rounded-sm border border-brass/30 bg-gradient-to-br from-cream to-cream/90 p-[1px] shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
            <motion.div
              className="absolute inset-x-0 top-0 z-20 h-0.5 bg-gradient-to-r from-transparent via-serenity to-transparent"
              animate={{ y: [0, 220, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="absolute inset-0 z-10 bg-serenity/5"
              animate={{ opacity: [0, 0.6, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative w-[min(92vw,380px)] overflow-hidden rounded-sm bg-cream px-8 py-7 text-left">
              <motion.div
                className="absolute right-0 top-0 h-full w-16 border-l border-dashed border-slate/15"
                style={{
                  background:
                    'repeating-linear-gradient(180deg, transparent 0px, transparent 6px, rgba(28,30,33,0.06) 6px, rgba(28,30,33,0.06) 12px)',
                }}
              />

              <motion.div
                className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-slate/95"
                aria-hidden
              />

              <motion.div className="flex items-start justify-between">
                <motion.div
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-serenity"
                  whileHover={{ rotate: 5 }}
                >
                  <span className="text-[10px] font-bold tracking-tight text-cream">KE</span>
                </motion.div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-brass">
                  First Class
                </span>
              </motion.div>

              <div className="mt-6 space-y-4">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-slate-muted">
                    Passenger
                  </p>
                  <p className="mt-0.5 text-lg font-medium tracking-tight text-slate">
                    GUEST / FIRST CLASS
                  </p>
                </motion.div>

                <motion.div
                  className="grid grid-cols-3 gap-4 border-t border-slate/10 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {[
                    { label: 'Flight', value: 'KE 2026' },
                    { label: 'Seat', value: '1A' },
                    { label: 'Gate', value: 'A12' },
                  ].map((item) => (
                    <motion.div key={item.label}>
                      <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-slate-muted">
                        {item.label}
                      </p>
                      <p className="mt-0.5 font-mono text-sm font-semibold text-slate">
                        {item.value}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="flex items-end justify-between border-t border-slate/10 pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="flex gap-[2px]" aria-hidden>
                    {Array.from({ length: 48 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="bg-slate"
                        style={{
                          width: i % 3 === 0 ? 2 : 1,
                          height: 28 + (i % 5) * 4,
                        }}
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: 1 }}
                        transition={{ delay: 0.9 + i * 0.02 }}
                      />
                    ))}
                  </div>
                  <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-serenity group-hover:text-serenity-light">
                    Tap to Scan →
                  </p>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.p
            className="mt-6 text-center text-xs font-light tracking-wide text-cream/40"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Click boarding pass to authenticate
          </motion.p>
        </motion.button>
      </div>
    </motion.div>
  );
}
