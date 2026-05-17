import { motion } from 'framer-motion';
import { SNACK_BAR_ITEMS } from '../../data/diningGuide';
import { spring, hoverLift } from '../../lib/motion';
import { GlassCard } from '../ui/GlassCard';

interface SnackBarLineupProps {
  onOpenExpress: () => void;
}

export function SnackBarLineup({ onOpenExpress }: SnackBarLineupProps) {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <p className="luxury-label">24H Unlimited</p>
          <h3 className="luxury-subheading mt-1">Snack Bar Lineup</h3>
        </div>
        <motion.button
          type="button"
          onClick={onOpenExpress}
          className="luxury-caption shrink-0 rounded-full border border-serenity/25 bg-serenity/5 px-4 py-2 !text-serenity transition-colors hover:bg-serenity/10"
          whileHover={hoverLift}
          transition={spring}
        >
          Midnight Snack Express →
        </motion.button>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {SNACK_BAR_ITEMS.map((item, i) => (
          <GlassCard key={item.id} className="p-5 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: i * 0.08 }}
            >
              <span className="text-3xl" role="img" aria-hidden>
                {item.icon}
              </span>
              <p className="mt-3 text-sm font-bold text-slate">{item.title}</p>
              <p className="luxury-caption mt-0.5">{item.titleKo}</p>
              <p className="luxury-body mt-2 text-center">{item.desc}</p>
            </motion.div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
