import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ORDERABLE_FOOD } from '../../data/diningGuide';
import { spring } from '../../lib/motion';
import { ServedFoodVisual } from './ServedFoodVisual';

interface ServedFoodGalleryProps {
  orderedIds: Set<string>;
  eatenIds: Set<string>;
  onEat: (id: string) => void;
}

export function ServedFoodGallery({ orderedIds, eatenIds, onEat }: ServedFoodGalleryProps) {
  const servedItems = useMemo(
    () => ORDERABLE_FOOD.filter((f) => orderedIds.has(f.id)),
    [orderedIds],
  );

  const allEaten = servedItems.length > 0 && servedItems.every((f) => eatenIds.has(f.id));

  return (
    <AnimatePresence mode="popLayout">
      {servedItems.length > 0 && (
        <motion.section
          key="gallery"
          className="mt-8 rounded-xl border border-brass/25 bg-gradient-to-b from-brass/5 to-cream/30 p-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={spring}
        >
          <motion.div
            className="mb-5 flex flex-wrap items-end justify-between gap-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
          >
            <div>
              <p className="luxury-label">Your Suite Table</p>
              <h4 className="luxury-subheading mt-1 !text-base">Now Serving</h4>
              {!allEaten && (
                <p className="luxury-caption mt-1.5 !text-slate-muted">
                  접시를 탭하여 식사하세요
                </p>
              )}
            </div>
            <motion.span
              className="luxury-caption rounded-full border border-brass/30 bg-white/80 px-3 py-1"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              {allEaten ? 'Table cleared' : 'Seat 1A · Course service'}
            </motion.span>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            layout
          >
            <AnimatePresence mode="popLayout">
              {servedItems.map((item) => (
                <ServedFoodVisual
                  key={item.id}
                  item={item}
                  eaten={eatenIds.has(item.id)}
                  onEat={onEat}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          <motion.p
            className="luxury-body mt-6 text-center italic text-slate-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...spring, delay: 0.3 }}
          >
            {allEaten
              ? 'Thank you for dining with Korean Air First Class.'
              : 'Bon appétit at 40,000 feet — crafted for your private suite.'}
          </motion.p>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
