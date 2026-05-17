import { useEffect, useState } from 'react';

function formatFlightTime(date: Date): string {
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function useFlightClock(active: boolean) {
  const [time, setTime] = useState(() => formatFlightTime(new Date()));

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setTime(formatFlightTime(new Date())), 1000);
    return () => clearInterval(id);
  }, [active]);

  return time;
}
