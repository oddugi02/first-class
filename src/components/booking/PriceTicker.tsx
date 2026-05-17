import { motion } from 'framer-motion';
import { formatPriceKRW, MILES_DISPLAY, PRICES_KRW } from '../../data/booking';
import { useSlotMachinePrice } from '../../hooks/useSlotMachinePrice';
import type { DestinationCode } from '../../types/booking';
import { spring, hoverLift } from '../../lib/motion';

interface PriceTickerProps {
  destination: DestinationCode;
  seatSelected: boolean;
  useMiles: boolean;
  onToggleMiles: () => void;
}

export function PriceTicker({
  destination,
  seatSelected,
  useMiles,
  onToggleMiles,
}: PriceTickerProps) {
  const target = seatSelected ? PRICES_KRW[destination] : 0;
  const displayPrice = useSlotMachinePrice(target, seatSelected);

  return (
    <motion.div
      className="booking-panel text-center"
      layout
      transition={spring}
    >
      <p className="luxury-label mb-3">Total Fare</p>

      <motion.div
        className="font-serif text-4xl font-bold tracking-tight text-slate md:text-5xl"
        key={useMiles ? 'miles' : 'krw'}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
      >
        {useMiles ? (
          <span>
            {MILES_DISPLAY}
            <span className="ml-2 text-2xl font-sans font-light text-slate-muted">
              Miles + $0
            </span>
          </span>
        ) : (
          <span className="tabular-nums">{formatPriceKRW(displayPrice)}</span>
        )}
      </motion.div>

      <motion.button
        type="button"
        onClick={onToggleMiles}
        className="luxury-caption mt-4 inline-block rounded-full border border-slate/15 px-4 py-2 transition-colors hover:border-serenity/30 hover:text-serenity"
        whileHover={hoverLift}
        transition={spring}
      >
        {useMiles ? 'Switch to KRW fare' : 'Pay with Miles instead'}
      </motion.button>

      {!seatSelected && (
        <motion.p
          className="mt-3 text-xs font-light text-slate-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Select your Kosmo Suite to reveal fare
        </motion.p>
      )}
    </motion.div>
  );
}
