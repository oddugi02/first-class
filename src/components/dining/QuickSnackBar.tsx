import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  QUICK_SNACK_ITEMS,
  SNACK_FOOD,
  getFoodById,
} from '../../data/diningGuide';
import { spring, hoverLift } from '../../lib/motion';
import { GlassCard } from '../ui/GlassCard';
import { FoodIllustration } from './FoodIllustration';

interface QuickSnackBarProps {
  orderedIds: Set<string>;
  eatenIds: Set<string>;
  onAddOrdered: (ids: string[]) => void;
  onOpenExpress: () => void;
}

export function QuickSnackBar({
  orderedIds,
  eatenIds,
  onAddOrdered,
  onOpenExpress,
}: QuickSnackBarProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [serving, setServing] = useState(false);
  const [lastServedAt, setLastServedAt] = useState<number | null>(null);

  const snackOnTable = useMemo(
    () => SNACK_FOOD.filter((f) => orderedIds.has(f.id) && !eatenIds.has(f.id)).length,
    [orderedIds, eatenIds],
  );

  const toggleSnack = useCallback(
    (foodId: string) => {
      if (serving) return;
      const onTable = orderedIds.has(foodId) && !eatenIds.has(foodId);
      if (onTable) return;
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(foodId)) next.delete(foodId);
        else next.add(foodId);
        return next;
      });
    },
    [serving, orderedIds, eatenIds],
  );

  const serveSnacks = useCallback(() => {
    if (selected.size === 0 || serving) return;
    setServing(true);
    setTimeout(() => {
      onAddOrdered([...selected]);
      setSelected(new Set());
      setLastServedAt(Date.now());
      setServing(false);
    }, 800);
  }, [selected, serving, onAddOrdered]);

  return (
    <section>
      <motion.div
        className="mb-4 flex flex-wrap items-end justify-between gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={spring}
      >
        <motion.div>
          <p className="luxury-label">24H Unlimited</p>
          <h3 className="luxury-subheading mt-1">Quick Snack Bar</h3>
          <p className="luxury-caption mt-0.5">스낵을 선택하고 즉시 서빙받으세요</p>
        </motion.div>
        <div className="flex flex-wrap items-center gap-2">
          {snackOnTable > 0 && (
            <span className="luxury-caption rounded-full border border-brass/30 bg-brass/5 px-3 py-1 !text-brass">
              {snackOnTable} snack{snackOnTable !== 1 ? 's' : ''} on table
            </span>
          )}
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
      </motion.div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {QUICK_SNACK_ITEMS.map((entry, i) => {
          const food = getFoodById(entry.foodId);
          if (!food) return null;

          const onTable = orderedIds.has(food.id) && !eatenIds.has(food.id);
          const wasEaten = eatenIds.has(food.id);
          const isSelected = selected.has(food.id);

          return (
            <GlassCard key={food.id} className="!p-0 overflow-hidden" interactive={false}>
              <motion.button
                type="button"
                onClick={() => toggleSnack(food.id)}
                disabled={onTable || serving}
                className={`flex w-full flex-col items-center p-4 text-center transition-colors ${
                  onTable
                    ? 'cursor-default bg-brass/[0.06]'
                    : isSelected
                      ? 'bg-serenity/8 ring-2 ring-inset ring-serenity/30'
                      : 'hover:bg-white/60'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: i * 0.06 }}
                whileHover={!onTable && !serving ? hoverLift : undefined}
                whileTap={!onTable && !serving ? { scale: 0.98 } : undefined}
                aria-pressed={isSelected}
                aria-label={`${food.label}${onTable ? ' — 서빙됨' : ''}`}
              >
                <span className="text-2xl" role="img" aria-hidden>
                  {entry.icon}
                </span>
                <div className="mt-2 flex h-[52px] items-center justify-center">
                  <FoodIllustration id={food.id} className="h-[48px] w-[72px]" />
                </div>
                <p className="mt-2 text-xs font-bold leading-snug text-slate">{food.label}</p>
                <p className="luxury-caption mt-0.5">{entry.titleKo}</p>
                {onTable ? (
                  <span className="mt-2 rounded-full bg-brass px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                    On table ↑
                  </span>
                ) : wasEaten ? (
                  <span className="luxury-caption mt-2 !text-slate-muted">다시 주문 가능</span>
                ) : isSelected ? (
                  <span className="mt-2 text-[9px] font-bold uppercase tracking-wider text-serenity">
                    Selected
                  </span>
                ) : (
                  <span className="luxury-caption mt-2 opacity-0 group-hover:opacity-100">
                    Tap to select
                  </span>
                )}
              </motion.button>
            </GlassCard>
          );
        })}
      </div>

      <motion.div className="mt-5 flex flex-wrap items-center gap-3">
        <motion.button
          type="button"
          onClick={serveSnacks}
          disabled={selected.size === 0 || serving}
          className="inline-flex items-center gap-2 rounded-full border border-slate/20 bg-slate px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-cream shadow-[0_4px_20px_rgba(28,30,33,0.15)] disabled:opacity-50"
          whileHover={selected.size > 0 ? hoverLift : undefined}
          whileTap={{ scale: 0.98 }}
          transition={spring}
        >
          {serving ? 'Preparing snacks…' : `Serve Snacks (${selected.size})`}
        </motion.button>
        {selected.size > 0 && !serving && (
          <motion.button
            type="button"
            onClick={() => setSelected(new Set())}
            className="luxury-caption rounded-full border border-slate/15 px-4 py-2 hover:bg-cream"
            whileHover={hoverLift}
            transition={spring}
          >
            Clear
          </motion.button>
        )}
      </motion.div>

      <AnimatePresence>
        {lastServedAt && !serving && (
          <motion.p
            className="luxury-caption mt-4 rounded-lg border border-slate/15 bg-slate/5 px-4 py-3 !text-slate"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={spring}
          >
            스낵이 스위트 테이블로 서빙되었습니다. 위 갤러리에서 확인하세요.
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
}
