import { useEffect, useState } from 'react';
import type { DestinationCode } from '../types/booking';
import {
  FLIGHT_CLOCK_START_OFFSET_MS,
  FLIGHT_DURATION_MS,
} from '../data/booking';

const DEFAULT_MAX_MS = FLIGHT_DURATION_MS.JFK;

function formatElapsed(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':');
}

/**
 * Elapsed en-route time (HH:MM:SS), 1s per real second, capped at planned flight duration.
 */
export function useFlightClock(active: boolean, destination: DestinationCode | null) {
  const maxMs = destination ? FLIGHT_DURATION_MS[destination] : DEFAULT_MAX_MS;
  const [displayMs, setDisplayMs] = useState(FLIGHT_CLOCK_START_OFFSET_MS);

  useEffect(() => {
    if (!active) {
      setDisplayMs(FLIGHT_CLOCK_START_OFFSET_MS);
      return;
    }

    const sessionStart = Date.now();

    const tick = () => {
      const sessionElapsed = Date.now() - sessionStart;
      const total = Math.min(
        FLIGHT_CLOCK_START_OFFSET_MS + sessionElapsed,
        maxMs,
      );
      setDisplayMs(total);
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [active, maxMs]);

  return formatElapsed(displayMs);
}
