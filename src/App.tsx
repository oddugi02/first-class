import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TopNav } from './components/TopNav';
import { BookingSimulation } from './components/booking/BookingSimulation';
import { VirtualSeatController } from './components/VirtualSeatController';
import { SuiteView } from './components/SuiteView';
import { DiningAmenitiesPanel } from './components/DiningAmenitiesPanel';
import { AmbientSoundToggle } from './components/AmbientSoundToggle';
import type { AmbientSound, CabinState, SeatMode, TimeOfDay } from './types';
import type { BookingDetails } from './types/booking';
import { SEAT_MODE_CONFIG } from './types';
import { spring } from './lib/motion';
import { useAmbientSound } from './hooks/useAmbientSound';

const INITIAL_STATE: CabinState = {
  seatMode: 'upright',
  recline: SEAT_MODE_CONFIG.upright.recline,
  legRest: SEAT_MODE_CONFIG.upright.legRest,
  ambient: 45,
  temperature: 22,
  timeOfDay: 'day',
  bedAmbienceLinked: false,
  diningAmbienceLinked: false,
};

export default function App() {
  const [inCabin, setInCabin] = useState(false);
  const [booking, setBooking] = useState<BookingDetails | null>(null);
  const [cabin, setCabin] = useState<CabinState>(INITIAL_STATE);
  const [ambientSound, setAmbientSound] = useState<AmbientSound>(null);
  useAmbientSound(ambientSound);
  const handleEnterCabin = useCallback((details: BookingDetails) => {
    setBooking(details);
    setInCabin(true);
  }, []);

  const handleSeatModeChange = useCallback((mode: SeatMode) => {
    const cfg = SEAT_MODE_CONFIG[mode];
    setCabin((prev) => {
      const next: CabinState = {
        ...prev,
        seatMode: mode,
        recline: cfg.recline,
        legRest: cfg.legRest,
        bedAmbienceLinked: false,
        diningAmbienceLinked: false,
      };

      if (mode === 'bed') {
        next.timeOfDay = 'midnight';
        next.ambient = Math.max(prev.ambient, 55);
        next.bedAmbienceLinked = true;
        setAmbientSound(null);
      } else if (mode === 'relax') {
        next.timeOfDay = 'sunrise';
        next.ambient = Math.max(prev.ambient, 62);
        next.diningAmbienceLinked = true;
        setAmbientSound('cabin');
      } else {
        setAmbientSound(null);
      }

      return next;
    });
  }, []);

  const handleTimeOfDayChange = useCallback((timeOfDay: TimeOfDay) => {
    setCabin((prev) => ({
      ...prev,
      timeOfDay,
      bedAmbienceLinked: prev.bedAmbienceLinked && timeOfDay === 'midnight',
      diningAmbienceLinked:
        prev.diningAmbienceLinked && timeOfDay === 'sunrise',
    }));
  }, []);

  const handleAmbientChange = useCallback((ambient: number) => {
    setCabin((prev) => ({ ...prev, ambient }));
  }, []);

  const seatLabel = booking?.seat ?? '1A';

  return (
    <motion.div
      className="relative flex min-h-screen flex-col bg-cream"
      initial={false}
    >
      <motion.div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,85,165,0.06),transparent),radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(196,163,90,0.05),transparent)]"
        aria-hidden
      />

      <AnimatePresence mode="wait">
        {!inCabin && (
          <BookingSimulation key="booking" onEnterCabin={handleEnterCabin} />
        )}
      </AnimatePresence>

      <motion.div
        className="relative flex min-h-screen flex-1 flex-col"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: inCabin ? 1 : 0, y: inCabin ? 0 : 32 }}
        transition={{ ...spring, duration: 0.7 }}
        style={{ pointerEvents: inCabin ? 'auto' : 'none' }}
      >
        <TopNav visible={inCabin} destination={booking?.destination ?? null} />

        <main className="grid flex-1 grid-cols-1 lg:grid-cols-[minmax(340px,400px)_1fr]">
          <VirtualSeatController
            state={cabin}
            onSeatModeChange={handleSeatModeChange}
            onAmbientChange={handleAmbientChange}
            visible={inCabin}
          />
          <SuiteView
            state={cabin}
            onTimeOfDayChange={handleTimeOfDayChange}
            visible={inCabin}
          />
        </main>

        <DiningAmenitiesPanel visible={inCabin} />

        <AmbientSoundToggle
          visible={inCabin}
          activeSound={ambientSound}
          onSoundChange={setAmbientSound}
        />

        <motion.footer
          className="glass-dock border-t border-white/40 px-8 py-4 text-center lg:px-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: inCabin ? 1 : 0 }}
          transition={{ ...spring, delay: 0.4 }}
        >
          <p className="luxury-caption !tracking-[0.28em]">
            KAL First Class Experience · Seat {seatLabel} · Premium Suite
          </p>
        </motion.footer>
      </motion.div>
    </motion.div>
  );
}
