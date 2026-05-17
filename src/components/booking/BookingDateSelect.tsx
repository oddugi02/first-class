import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatFlightDate } from '../../data/booking';
import { spring, hoverLift } from '../../lib/motion';

interface BookingDateSelectProps {
  value: Date;
  onChange: (date: Date) => void;
}

function buildOptions(count = 21): Date[] {
  const base = new Date();
  base.setHours(12, 0, 0, 0);
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(base);
    d.setDate(base.getDate() + i + 1);
    return d;
  });
}

export function BookingDateSelect({ value, onChange }: BookingDateSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const options = useMemo(() => buildOptions(), []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  const monthLabel = value.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <motion.div ref={ref} className="booking-panel relative">
      <p className="luxury-label mb-4">Date</p>
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-lg border border-slate/12 bg-white/80 px-5 py-4 text-left"
        whileHover={hoverLift}
        transition={spring}
        aria-expanded={open}
      >
        <div>
          <p className="text-lg font-bold tracking-tight text-slate">{formatFlightDate(value)}</p>
          <p className="mt-0.5 text-xs font-light text-slate-muted">First Class · Flexible</p>
        </div>
        <motion.svg
          viewBox="0 0 20 20"
          className="h-5 w-5 text-slate-muted"
          animate={{ rotate: open ? 180 : 0 }}
          transition={spring}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-slate/10 bg-white shadow-[0_24px_64px_rgba(28,30,33,0.12)]"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={spring}
          >
            <motion.div className="border-b border-slate/8 px-4 py-3">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate">{monthLabel}</p>
            </motion.div>
            <motion.div className="grid grid-cols-7 gap-px bg-slate/8 p-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                <span
                  key={`${d}-${i}`}
                  className="py-1 text-center text-[9px] font-semibold uppercase tracking-wider text-slate-muted"
                >
                  {d}
                </span>
              ))}
              {options.map((date) => {
                const selected =
                  date.toDateString() === value.toDateString();
                return (
                  <motion.button
                    key={date.toISOString()}
                    type="button"
                    onClick={() => {
                      onChange(date);
                      setOpen(false);
                    }}
                    className={`aspect-square rounded-md text-xs font-semibold ${
                      selected
                        ? 'bg-serenity text-cream'
                        : 'bg-white text-slate hover:bg-serenity/8'
                    }`}
                    whileTap={{ scale: 0.92 }}
                  >
                    {date.getDate()}
                  </motion.button>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
