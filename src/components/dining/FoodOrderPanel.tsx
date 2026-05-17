import { useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COURSE_FOOD, COURSE_FOOD_META } from '../../data/diningGuide';
import { spring, hoverLift, hoverRest } from '../../lib/motion';
import { GlassCard } from '../ui/GlassCard';

const CIRCUMFERENCE = 283;

function courseCounts(ids: Set<string>) {
  const counts: Record<'appetizer' | 'main' | 'dessert', number> = {
    appetizer: 0,
    main: 0,
    dessert: 0,
  };
  for (const item of COURSE_FOOD) {
    if (ids.has(item.id)) counts[item.course as keyof typeof counts]++;
  }
  return counts;
}

interface FoodOrderPanelProps {
  orderedIds: Set<string>;
  onAddOrdered: (ids: string[]) => void;
}

export function FoodOrderPanel({ orderedIds, onAddOrdered }: FoodOrderPanelProps) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [lastOrderAt, setLastOrderAt] = useState<number | null>(null);

  const counts = useMemo(() => courseCounts(selected), [selected]);
  const totalSelected = selected.size;

  const courseOnTable = useMemo(
    () => COURSE_FOOD.filter((f) => orderedIds.has(f.id)).length,
    [orderedIds],
  );

  const chartSegments = useMemo(() => {
    return COURSE_FOOD_META.map((meta) => ({
      ...meta,
      count: counts[meta.course as keyof typeof counts],
      pct: totalSelected
        ? (counts[meta.course as keyof typeof counts] / totalSelected) * 100
        : 33,
    }));
  }, [counts, totalSelected]);

  const toggleItem = useCallback(
    (id: string) => {
      if (orderedIds.has(id)) return;
      setSelected((prev) => {
        if (prev.has(id)) return new Set();
        return new Set([id]);
      });
    },
    [orderedIds],
  );

  const placeOrder = useCallback(() => {
    if (totalSelected === 0 || submitting) return;
    setSubmitting(true);
    setTimeout(() => {
      onAddOrdered([...selected]);
      setSelected(new Set());
      setLastOrderAt(Date.now());
      setSubmitting(false);
    }, 900);
  }, [selected, totalSelected, submitting, onAddOrdered]);

  const clearCart = useCallback(() => {
    setSelected(new Set());
  }, []);

  let dashOffset = 0;

  return (
    <section>
      <motion.div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="h-6 w-1 rounded-full bg-serenity" aria-hidden />
          <motion.div>
            <h3 className="luxury-subheading">À la Carte</h3>
            <p className="luxury-caption mt-0.5">코스 메뉴 중 한 가지만 추가 주문</p>
          </motion.div>
        </div>
        {courseOnTable > 0 && (
          <p className="luxury-caption rounded-full border border-brass/30 bg-brass/5 px-3 py-1 !text-brass">
            {courseOnTable} course{courseOnTable !== 1 ? 's' : ''} on your table
          </p>
        )}
      </motion.div>

      <GlassCard className="p-6" interactive={false}>
        <motion.div className="grid gap-8 lg:grid-cols-[minmax(160px,200px)_1fr]">
          <div className="flex flex-col items-center">
            <p className="luxury-caption mb-3 w-full text-center">Your selection</p>
            <div className="relative h-40 w-40">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                {totalSelected === 0 ? (
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(28,30,33,0.08)"
                    strokeWidth="10"
                  />
                ) : (
                  chartSegments.map((seg) => {
                    if (seg.count === 0) return null;
                    const dash = (seg.pct / 100) * CIRCUMFERENCE;
                    const offset = dashOffset;
                    dashOffset += dash;
                    return (
                      <motion.circle
                        key={seg.course}
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="10"
                        strokeDasharray={`${dash} ${CIRCUMFERENCE}`}
                        strokeDashoffset={-offset}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={spring}
                      />
                    );
                  })
                )}
              </svg>
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center"
                key={totalSelected}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={spring}
              >
                <span className="text-2xl font-bold text-slate">{totalSelected}</span>
                <span className="luxury-caption !text-[9px]">selected</span>
              </motion.div>
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {COURSE_FOOD_META.map((m) => (
                <span
                  key={m.course}
                  className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-slate-muted"
                >
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: m.color }} />
                  {m.label}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {COURSE_FOOD.map((item) => {
              const isSelected = selected.has(item.id);
              const isOrdered = orderedIds.has(item.id);
              return (
                <motion.div
                  key={item.id}
                  layout
                  className={
                    isOrdered
                      ? 'overflow-hidden rounded-lg border border-brass/20 bg-brass/[0.03]'
                      : undefined
                  }
                >
                  {isOrdered ? (
                    <motion.div className="flex items-center gap-3 px-3 py-2">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brass text-[10px] text-white">
                        ✓
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate">{item.label}</p>
                        <p className="luxury-caption !text-brass">On your suite table ↑</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.button
                      type="button"
                      onClick={() => toggleItem(item.id)}
                      className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left ${
                        isSelected
                          ? 'border-serenity/40 bg-serenity/8'
                          : 'border-slate/8 bg-white/50'
                      }`}
                      initial={hoverRest}
                      whileHover={hoverLift}
                      whileTap={{ scale: 0.99 }}
                      transition={spring}
                      aria-pressed={isSelected}
                    >
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                          isSelected
                            ? 'border-serenity bg-serenity text-white'
                            : 'border-slate/20 bg-white'
                        }`}
                      >
                        {isSelected && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={spring}
                          >
                            ✓
                          </motion.span>
                        )}
                      </span>
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: item.color }}
                        aria-hidden
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-slate">{item.label}</p>
                        <p className="luxury-caption mt-0.5 !normal-case !tracking-normal">
                          {item.description}
                        </p>
                      </div>
                      <span className="luxury-caption shrink-0 !text-[8px]">
                        {item.courseLabel}
                      </span>
                    </motion.button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate/8 pt-5">
          <motion.button
            type="button"
            onClick={placeOrder}
            disabled={totalSelected === 0 || submitting}
            className="inline-flex items-center gap-2 rounded-full border border-serenity/30 bg-serenity px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-cream shadow-[0_4px_20px_rgba(0,85,165,0.2)] disabled:opacity-50"
            whileHover={totalSelected > 0 ? hoverLift : undefined}
            whileTap={{ scale: 0.98 }}
            transition={spring}
          >
            {submitting ? 'Plating your course…' : `Place Order (${totalSelected})`}
          </motion.button>
          {totalSelected > 0 && !submitting && (
            <motion.button
              type="button"
              onClick={clearCart}
              className="luxury-caption rounded-full border border-slate/15 px-4 py-2 hover:bg-cream"
              whileHover={hoverLift}
              transition={spring}
            >
              Clear selection
            </motion.button>
          )}
        </motion.div>

        <AnimatePresence>
          {lastOrderAt && !submitting && (
            <motion.div
              className="mt-4 rounded-lg border border-serenity/20 bg-serenity/5 px-4 py-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={spring}
            >
              <p className="luxury-label !text-serenity">Service in progress</p>
              <p className="luxury-body mt-1 text-slate">
                Your selections have been plated and delivered to your suite table above.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </section>
  );
}
