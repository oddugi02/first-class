import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { BookingDetails } from '../../types/booking';
import { DigitalBoardingPass } from './DigitalBoardingPass';
import { spring } from '../../lib/motion';

interface TicketPrintTransitionProps {
  booking: BookingDetails;
  buttonRect: DOMRect | null;
  onComplete: () => void;
}

export function TicketPrintTransition({
  booking,
  buttonRect,
  onComplete,
}: TicketPrintTransitionProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    const duration = 2200;
    let frame: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setProgress(t);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const done = setTimeout(onComplete, 3200);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(done);
    };
  }, [onComplete]);

  const originX = buttonRect ? buttonRect.left + buttonRect.width / 2 : window.innerWidth / 2;
  const originY = buttonRect ? buttonRect.top + buttonRect.height / 2 : window.innerHeight * 0.85;

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-cream/95 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="booking-grain pointer-events-none absolute inset-0" aria-hidden />

      <motion.p
        className="absolute top-[12%] luxury-label !text-serenity"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Issuing your ticket
      </motion.p>

      {/* Print progress bar */}
      <motion.div
        className="absolute top-[18%] h-px w-48 overflow-hidden rounded-full bg-slate/10 md:w-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="h-full bg-serenity"
          style={{ width: `${progress * 100}%` }}
          transition={{ ease: 'linear' }}
        />
      </motion.div>

      <motion.div
        className="relative z-10"
        initial={{
          scale: 0.15,
          opacity: 0,
          x: originX - window.innerWidth / 2,
          y: originY - window.innerHeight / 2,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          x: 0,
          y: 0,
        }}
        transition={{
          ...spring,
          duration: 1.1,
          delay: 0.15,
        }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <DigitalBoardingPass booking={booking} />
        </motion.div>

        <motion.p
          className="mt-6 text-center text-xs font-light tracking-[0.2em] text-slate-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.5, delay: 1.2, times: [0, 0.2, 0.7, 1] }}
        >
          Welcome aboard
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
