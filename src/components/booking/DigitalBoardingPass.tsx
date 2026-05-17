import { motion } from 'framer-motion';
import { DESTINATIONS, formatFlightDate, ORIGIN } from '../../data/booking';
import type { BookingDetails } from '../../types/booking';
interface DigitalBoardingPassProps {
  booking: BookingDetails;
  compact?: boolean;
}

export function DigitalBoardingPass({ booking, compact }: DigitalBoardingPassProps) {
  const dest = DESTINATIONS[booking.destination];

  return (
    <motion.div
      className={`relative overflow-hidden rounded-sm border border-slate/15 bg-cream shadow-[0_32px_80px_rgba(28,30,33,0.18)] ${
        compact ? 'w-[min(92vw,360px)]' : 'w-[min(92vw,400px)]'
      }`}
      layout
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-serenity to-transparent" />

      <div className="relative px-7 py-6">
        <div
          className="absolute right-0 top-0 h-full w-14 border-l border-dashed border-slate/12"
          style={{
            background:
              'repeating-linear-gradient(180deg, transparent 0px, transparent 6px, rgba(28,30,33,0.05) 6px, rgba(28,30,33,0.05) 12px)',
          }}
          aria-hidden
        />

        <div className="flex items-start justify-between pr-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-serenity">
            <span className="text-[11px] font-bold text-cream">KE</span>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-brass">
            First Class
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 border-b border-slate/10 pb-4">
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-slate-muted">From</p>
            <p className="mt-0.5 text-xl font-bold text-slate">{ORIGIN.code}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-slate-muted">To</p>
            <p className="mt-0.5 text-xl font-bold text-slate">{dest.code}</p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <motion.div>
            <p className="text-[9px] font-medium uppercase tracking-[0.18em] text-slate-muted">
              Passenger
            </p>
            <p className="mt-0.5 text-lg font-medium tracking-tight text-slate">
              GUEST / KOSMO SUITE
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-3 gap-3 border-t border-slate/10 pt-3">
            {[
              { label: 'Flight', value: `KE ${booking.destination === 'JFK' ? '081' : '901'}` },
              { label: 'Seat', value: booking.seat },
              { label: 'Date', value: formatFlightDate(booking.date).split(',')[0] },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[9px] font-medium uppercase tracking-[0.14em] text-slate-muted">
                  {item.label}
                </p>
                <p className="mt-0.5 font-mono text-sm font-semibold text-slate">{item.value}</p>
              </div>
            ))}
          </motion.div>

          <div className="flex items-end justify-between border-t border-slate/10 pt-3">
            <motion.div className="flex gap-[2px]" aria-hidden>
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-slate"
                  style={{
                    width: i % 3 === 0 ? 2 : 1,
                    height: 24 + (i % 5) * 3,
                  }}
                />
              ))}
            </motion.div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-serenity">
              Confirmed
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
