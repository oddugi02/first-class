import { useEffect, useState } from 'react';

/** Eases toward target with slot-machine style stepping */
export function useSlotMachinePrice(target: number, active: boolean, durationMs = 1200) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!active || target === 0) {
      setDisplay(0);
      return;
    }

    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      const eased = 1 - (1 - t) ** 3;
      const jitter = t < 1 ? Math.floor(Math.random() * target * 0.15) : 0;
      setDisplay(Math.round(target * eased + jitter * (1 - eased)));
      if (t < 1) frame = requestAnimationFrame(tick);
      else setDisplay(target);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, active, durationMs]);

  return display;
}
