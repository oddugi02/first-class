import { motion } from 'framer-motion';
import { DESTINATIONS, ORIGIN } from '../../data/booking';
import type { DestinationCode } from '../../types/booking';
import { spring, hoverLift } from '../../lib/motion';

interface RouteSelectionProps {
  destination: DestinationCode;
  onDestinationChange: (code: DestinationCode) => void;
}

export function RouteSelection({ destination, onDestinationChange }: RouteSelectionProps) {
  return (
    <div className="booking-panel">
      <p className="luxury-label mb-4">Route</p>
      <motion.div
        className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8"
        layout
        transition={spring}
      >
        <motion.div
          className="rounded-lg border border-slate/10 bg-white/80 px-5 py-4"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={spring}
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-muted">From</p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-slate">{ORIGIN.code}</p>
          <p className="mt-0.5 text-sm font-light text-slate-muted">{ORIGIN.city}</p>
        </motion.div>

        <motion.div
          className="flex flex-col items-center gap-1 text-slate-muted"
          aria-hidden
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <svg viewBox="0 0 48 12" className="h-3 w-12" fill="none" stroke="currentColor" strokeWidth="1">
            <path d="M0 6h40M34 2l6 4-6 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[9px] uppercase tracking-widest">Nonstop</span>
        </motion.div>

        <motion.div className="space-y-2" layout>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-muted">To</p>
          <motion.div className="flex flex-wrap gap-2">
            {(Object.keys(DESTINATIONS) as DestinationCode[]).map((code) => {
              const dest = DESTINATIONS[code];
              const selected = destination === code;
              return (
                <motion.button
                  key={code}
                  type="button"
                  onClick={() => onDestinationChange(code)}
                  className={`min-w-[120px] flex-1 rounded-lg border px-4 py-3 text-left transition-colors ${
                    selected
                      ? 'border-serenity bg-serenity text-cream shadow-[0_8px_24px_rgba(0,85,165,0.2)]'
                      : 'border-slate/12 bg-white/80 text-slate hover:border-slate/25'
                  }`}
                  whileHover={hoverLift}
                  whileTap={{ scale: 0.99 }}
                  transition={spring}
                  aria-pressed={selected}
                >
                  <p className="text-xl font-bold tracking-tight">{dest.code}</p>
                  <p className={`mt-0.5 text-xs font-light ${selected ? 'text-cream/80' : 'text-slate-muted'}`}>
                    {dest.city}
                  </p>
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
