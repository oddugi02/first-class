import { motion } from 'framer-motion';
import { FIRST_CLASS_SEATS } from '../../data/booking';
import type { BookingDetails } from '../../types/booking';
import { spring } from '../../lib/motion';

type SeatId = BookingDetails['seat'];

interface CabinSeatMapProps {
  selectedSeat: SeatId | null;
  onSelectSeat: (seat: SeatId) => void;
}

const ECONOMY_ROWS = 12;
const BUSINESS_ROWS = 4;

export function CabinSeatMap({ selectedSeat, onSelectSeat }: CabinSeatMapProps) {
  return (
    <motion.div className="booking-panel">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="luxury-label">Cabin</p>
          <p className="mt-1 text-sm font-light text-slate-muted">
            Kosmo Suite 2.0 · Forward cabin only
          </p>
        </div>
        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-serenity">
          Nose →
        </span>
      </div>

      <motion.div
        className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-slate/10 bg-white/60 p-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
      >
        {/* Fuselage */}
        <div className="relative rounded-xl border border-slate/8 bg-gradient-to-b from-zinc-50 to-white px-6 py-5">
          {/* First Class — selectable */}
          <div className="mb-3 flex flex-col items-center gap-2">
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-brass">
              First Class Kosmo Suite
            </p>
            <div className="flex justify-center gap-6">
              {FIRST_CLASS_SEATS.map((seat) => {
                const selected = selectedSeat === seat;
                return (
                  <motion.button
                    key={seat}
                    type="button"
                    onClick={() => onSelectSeat(seat)}
                    className="relative focus:outline-none focus-visible:ring-2 focus-visible:ring-serenity/50"
                    animate={
                      selected
                        ? { scale: 1.08 }
                        : { scale: 1 }
                    }
                    whileHover={{ scale: selected ? 1.1 : 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={spring}
                    aria-pressed={selected}
                    aria-label={`Select seat ${seat}`}
                  >
                    {selected && (
                      <motion.span
                        className="absolute -inset-3 rounded-2xl bg-serenity/15"
                        layoutId="seat-glow"
                        transition={spring}
                        style={{
                          boxShadow: '0 0 32px rgba(0, 85, 165, 0.35)',
                        }}
                      />
                    )}
                    <motion.span
                      className={`relative flex h-14 w-[4.5rem] flex-col items-center justify-center rounded-lg border-2 ${
                        selected
                          ? 'border-serenity bg-serenity text-cream'
                          : 'border-serenity/30 bg-white text-serenity shadow-[0_0_20px_rgba(0,85,165,0.12)]'
                      }`}
                      animate={
                        selected
                          ? {
                              boxShadow: [
                                '0 0 24px rgba(0,85,165,0.25)',
                                '0 0 40px rgba(0,85,165,0.4)',
                                '0 0 24px rgba(0,85,165,0.25)',
                              ],
                            }
                          : {}
                      }
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider">Suite</span>
                      <span className="text-lg font-bold leading-none">{seat}</span>
                    </motion.span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Business — blurred */}
          <div className="relative mb-2 select-none">
            <div className="pointer-events-none blur-[3px] opacity-40">
              <SeatRowGrid rows={BUSINESS_ROWS} cols={4} prefix="B" />
            </div>
            <p className="absolute inset-0 flex items-center justify-center text-[9px] font-bold uppercase tracking-[0.2em] text-slate-muted">
              Not for You
            </p>
          </div>

          {/* Economy — blurred */}
          <div className="relative select-none">
            <div className="pointer-events-none blur-[4px] opacity-30">
              <SeatRowGrid rows={ECONOMY_ROWS} cols={6} prefix="Y" />
            </div>
            <p className="absolute inset-0 flex items-center justify-center text-[9px] font-bold uppercase tracking-[0.2em] text-slate-muted/80">
              Sold Out
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SeatRowGrid({
  rows,
  cols,
  prefix,
}: {
  rows: number;
  cols: number;
  prefix: string;
}) {
  return (
    <div className="space-y-1 px-2">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex justify-center gap-1">
          {Array.from({ length: cols }).map((_, c) => (
            <span
              key={c}
              className="h-2 w-2 rounded-sm bg-slate/25"
              aria-hidden
              title={`${prefix}${r + 1}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
