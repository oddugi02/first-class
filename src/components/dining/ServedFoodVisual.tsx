import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { OrderableFood } from '../../data/diningGuide';
import { spring, hoverLift } from '../../lib/motion';
import { FoodIllustration, EmptyPlateIllustration } from './FoodIllustration';

interface ServedFoodVisualProps {
  item: OrderableFood;
  eaten: boolean;
  onEat: (id: string) => void;
}

function Steam() {
  return (
    <motion.div className="absolute -top-2 left-1/2 flex -translate-x-1/2 gap-1.5" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-4 w-1 rounded-full bg-white/60"
          animate={{ opacity: [0.15, 0.75, 0.15], y: [0, -14, 0], scaleX: [1, 1.3, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.35 }}
        />
      ))}
    </motion.div>
  );
}

const HOT_ITEMS = new Set(['main-korean', 'main-western', 'snack-ramen', 'snack-noodle']);

export function ServedFoodVisual({ item, eaten, onEat }: ServedFoodVisualProps) {
  const [eating, setEating] = useState(false);
  const hot = HOT_ITEMS.has(item.id) && !eaten;

  const handleEat = useCallback(() => {
    if (eaten || eating) return;
    setEating(true);
    setTimeout(() => {
      onEat(item.id);
      setEating(false);
    }, 700);
  }, [eaten, eating, item.id, onEat]);

  return (
    <motion.article
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.88, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: 8 }}
      transition={spring}
      layout
    >
      <motion.button
        type="button"
        onClick={handleEat}
        disabled={eaten || eating}
        className={`group relative w-full max-w-[160px] rounded-xl text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-serenity/40 ${
          eaten ? 'cursor-default' : 'cursor-pointer'
        }`}
        whileHover={!eaten && !eating ? hoverLift : undefined}
        whileTap={!eaten && !eating ? { scale: 0.97 } : undefined}
        transition={spring}
        aria-label={
          eaten
            ? `${item.label} — 접시가 비었습니다`
            : `${item.label} — 탭하여 식사하기`
        }
      >
        {hot && <Steam />}
        <motion.div
          className={`relative overflow-hidden rounded-xl border bg-gradient-to-b from-white to-zinc-50 shadow-[0_16px_40px_rgba(28,30,33,0.14)] ${
            eaten
              ? 'border-slate/15 opacity-90'
              : eating
                ? 'border-brass/50'
                : 'border-brass/30 group-hover:border-brass/50'
          }`}
          animate={eating ? { scale: [1, 1.02, 1] } : { scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-brass/40 to-transparent" />
          <div className="relative flex h-[100px] items-center justify-center bg-gradient-to-b from-zinc-50/80 to-white px-3 pt-2">
            <AnimatePresence mode="wait">
              {eaten ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={spring}
                >
                  <EmptyPlateIllustration className="h-[76px] w-[114px]" />
                </motion.div>
              ) : (
                <motion.div
                  key="food"
                  initial={{ opacity: 1, scale: 1 }}
                  animate={
                    eating
                      ? { opacity: 0, scale: 0.6, y: 8, rotate: eating ? 4 : 0 }
                      : { opacity: 1, scale: 1, y: 0, rotate: 0 }
                  }
                  exit={{ opacity: 0, scale: 0.5, y: 12 }}
                  transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                >
                  <FoodIllustration id={item.id} className="h-[76px] w-[114px]" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {!eaten && !eating && (
            <motion.span
              className="absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-slate/80 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white opacity-0 transition-opacity group-hover:opacity-100"
              initial={false}
            >
              Tap to enjoy
            </motion.span>
          )}
        </motion.div>
      </motion.button>

      <motion.div
        className="mt-3 w-full px-1 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ...spring, delay: 0.15 }}
      >
        <p
          className={`text-[10px] font-bold uppercase tracking-[0.16em] ${
            eaten ? 'text-slate-muted' : 'text-brass'
          }`}
        >
          {eating ? 'Enjoying…' : eaten ? 'Finished' : 'Served'}
        </p>
        <p
          className={`mt-1.5 text-xs font-bold leading-snug ${
            eaten ? 'text-slate-muted line-through decoration-slate-muted/40' : 'text-slate'
          }`}
        >
          {item.label}
        </p>
        <p className="luxury-caption mt-1 !text-[9px]">
          {eaten ? '접시가 비었습니다' : item.courseLabel}
        </p>
      </motion.div>
    </motion.article>
  );
}
