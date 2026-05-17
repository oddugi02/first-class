import { motion, AnimatePresence } from 'framer-motion';
import { spring } from '../lib/motion';

interface CaviarPlateProps {
  served: boolean;
}

export function CaviarPlate({ served }: CaviarPlateProps) {
  return (
    <AnimatePresence mode="wait">
      {served ? (
        <motion.div
          key="plate"
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 8 }}
          transition={spring}
          className="relative"
        >
          <motion.div
            className="relative mx-auto h-28 w-28 rounded-full border border-brass/25 bg-gradient-to-br from-slate-800 via-slate-900 to-black p-1 shadow-[0_12px_40px_rgba(28,30,33,0.2)]"
            animate={{ rotate: [0, 0.5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div className="relative h-full w-full overflow-hidden rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200">
              {/* Caviar mound */}
              <div className="absolute left-1/2 top-1/2 h-14 w-16 -translate-x-1/2 -translate-y-[55%] rounded-full bg-slate-900/95 shadow-inner">
                <div className="absolute inset-1 grid grid-cols-6 gap-[2px] p-1.5">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <motion.span
                      key={i}
                      className="rounded-full bg-slate-700"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.03 * i, duration: 0.2 }}
                      style={{
                        width: 3,
                        height: 3,
                        opacity: 0.7 + (i % 3) * 0.1,
                      }}
                    />
                  ))}
                </div>
              </div>
              {/* Blini */}
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-2 w-4 rounded-full bg-amber-100/90 shadow-sm"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.08 }}
                  />
                ))}
              </div>
              {/* Garnish */}
              <motion.div
                className="absolute right-4 top-4 h-3 w-1 rounded-full bg-emerald-600/80"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <p className="luxury-label">Oscietra · Chilled</p>
            <p className="luxury-body mt-1.5 max-w-[200px] italic">
              0.001% privilege at 40,000 feet — pearls for those who never wait in line,
              even among the clouds.
            </p>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex h-36 flex-col items-center justify-center rounded-xl border border-dashed border-slate/12 bg-cream/50"
        >
          <div className="h-16 w-16 rounded-full border border-slate/10 bg-white/80" />
          <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-slate-muted">
            Awaiting service
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
