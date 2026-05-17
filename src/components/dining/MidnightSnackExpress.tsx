import { motion, AnimatePresence } from 'framer-motion';
import { MIDNIGHT_SNACKS } from '../../data/diningGuide';
import { spring, hoverLift } from '../../lib/motion';

interface MidnightSnackExpressProps {
  open: boolean;
  onClose: () => void;
}

export function MidnightSnackExpress({ open, onClose }: MidnightSnackExpressProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-slate/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={spring}
            onClick={onClose}
          />
          <motion.aside
            className="glass-panel fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l shadow-2xl"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={spring}
          >
            <div className="flex items-center justify-between border-b border-white/30 px-6 py-5">
              <div>
                <p className="luxury-label">Quick Snack Bar</p>
                <h3 className="luxury-heading mt-1 !text-lg">Midnight Snack Express</h3>
              </div>
              <motion.button
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate/10 text-slate-muted"
                whileHover={{ scale: 1.05 }}
                transition={spring}
                aria-label="Close panel"
              >
                ×
              </motion.button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <p className="luxury-body mb-6">
                One-touch orders from 35,000 ft. Tap a card to simulate cabin preparation.
              </p>
              <div className="space-y-3">
                {MIDNIGHT_SNACKS.map((snack, i) => (
                  <motion.button
                    key={snack.id}
                    type="button"
                    className="glass-card w-full px-4 py-4 text-left"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ ...spring, delay: i * 0.06 }}
                    whileHover={hoverLift}
                    whileTap={{ scale: 0.98 }}
                  >
                    <p className="text-sm font-bold text-slate">{snack.label}</p>
                    <p className="luxury-caption mt-1">Preparing · ~8 min</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
