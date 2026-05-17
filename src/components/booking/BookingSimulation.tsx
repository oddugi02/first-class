import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BookingDetails, DestinationCode } from '../../types/booking';
import { RouteSelection } from './RouteSelection';
import { BookingDateSelect } from './BookingDateSelect';
import { CabinSeatMap } from './CabinSeatMap';
import { PriceTicker } from './PriceTicker';
import { IssueTicketButton } from './IssueTicketButton';
import { TicketPrintTransition } from './TicketPrintTransition';
import { spring } from '../../lib/motion';

interface BookingSimulationProps {
  onEnterCabin: (booking: BookingDetails) => void;
}

function defaultDate(): Date {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  d.setHours(12, 0, 0, 0);
  return d;
}

export function BookingSimulation({ onEnterCabin }: BookingSimulationProps) {
  const [destination, setDestination] = useState<DestinationCode>('JFK');
  const [date, setDate] = useState(defaultDate);
  const [seat, setSeat] = useState<BookingDetails['seat'] | null>(null);
  const [useMiles, setUseMiles] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const ready = seat !== null;

  const handleIssue = useCallback(() => {
    if (!seat || !ctaRef.current) return;
    const btn = ctaRef.current.querySelector('button');
    setButtonRect(btn?.getBoundingClientRect() ?? null);
    setPrinting(true);
  }, [seat]);

  const handlePrintComplete = useCallback(() => {
    if (!seat) return;
    onEnterCabin({
      destination,
      date,
      seat,
      useMiles,
    });
  }, [destination, date, seat, useMiles, onEnterCabin]);

  return (
    <>
      <AnimatePresence>
        {!printing && (
          <motion.div
            key="booking"
            className="relative min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div className="booking-grain pointer-events-none fixed inset-0" aria-hidden />

            <div className="relative mx-auto max-w-6xl px-6 py-12 lg:px-12 lg:py-16">
              <motion.header
                className="mb-12 border-b border-slate/10 pb-10"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={spring}
              >
                <p className="luxury-label">Korean Air · First Class</p>
                <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-[-0.03em] text-slate md:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
                  Reserve Your Kosmo Suite
                </h1>
                <p className="mt-4 max-w-xl text-sm font-light leading-relaxed text-slate-muted">
                  An ultra-minimal booking experience. Select your route, date, and suite —
                  then issue your complimentary First Class trial ticket.
                </p>
              </motion.header>

              <motion.div
                className="booking-grid gap-8 lg:gap-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ ...spring, delay: 0.1 }}
              >
                <div className="space-y-8 lg:col-span-2">
                  <RouteSelection
                    destination={destination}
                    onDestinationChange={setDestination}
                  />
                  <BookingDateSelect value={date} onChange={setDate} />
                  <CabinSeatMap selectedSeat={seat} onSelectSeat={setSeat} />
                </div>

                <div className="flex flex-col items-center justify-start gap-8 lg:sticky lg:top-12 lg:self-start">
                  <PriceTicker
                    destination={destination}
                    seatSelected={ready}
                    useMiles={useMiles}
                    onToggleMiles={() => setUseMiles((m) => !m)}
                  />

                  <motion.div
                    ref={ctaRef}
                    className="w-full flex justify-center pt-4"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...spring, delay: 0.25 }}
                  >
                    <IssueTicketButton disabled={!ready} onClick={handleIssue} />
                  </motion.div>

                  <p className="max-w-xs text-center text-[10px] font-light leading-relaxed text-slate-muted">
                    This is a simulation. No payment will be processed. Continue to experience
                    the full KAL First Class cabin.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {printing && seat && (
          <TicketPrintTransition
            booking={{ destination, date, seat, useMiles }}
            buttonRect={buttonRect}
            onComplete={handlePrintComplete}
          />
        )}
      </AnimatePresence>
    </>
  );
}
