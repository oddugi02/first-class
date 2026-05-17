import { motion } from 'framer-motion';
import { spring } from '../../lib/motion';
import { GlassCard } from '../ui/GlassCard';

const TILES = [
  {
    title: 'Jedong Hanwoo Sirloin',
    titleKo: '제동한우 등심',
    desc: 'Eco-friendly sirloin with special sauce. Select doneness on the in-flight screen.',
    accent: 'from-amber-900/20 to-slate/5',
  },
  {
    title: 'Gourmet Pairing Course',
    titleKo: '고메 페어링 코스',
    desc: 'Burgundy white & Bordeaux red decanted per course — caviar and champagne trolley.',
    accent: 'from-serenity/10 to-cream',
  },
  {
    title: 'Personal Dining',
    titleKo: '퍼스널 다이닝',
    desc: 'Dining mode deploys table, warm bulb lighting, and gentle cabin hum.',
    accent: 'from-brass/10 to-cream',
  },
];

export function CourseVisualTiles() {
  return (
    <section>
      <p className="luxury-label mb-3">Representative mains</p>
      <div className="grid gap-4 md:grid-cols-3">
        {TILES.map((tile, i) => (
          <GlassCard key={tile.title} className={`overflow-hidden p-0 ${tile.accent}`}>
            <motion.div
              className={`bg-gradient-to-br ${tile.accent} p-5`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: i * 0.08 }}
            >
              <div className="mb-4 h-24 rounded-lg bg-gradient-to-br from-slate/15 to-slate/5" />
              <p className="text-sm font-bold text-slate">{tile.title}</p>
              <p className="luxury-caption mt-0.5">{tile.titleKo}</p>
              <p className="luxury-body mt-2">{tile.desc}</p>
            </motion.div>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
