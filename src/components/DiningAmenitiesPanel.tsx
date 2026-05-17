import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { spring, hoverLift } from '../lib/motion';
import { SessionHeader } from './dining/SessionHeader';
import { WelcomeLuxuryService } from './dining/WelcomeLuxuryService';
import { DiningMenuTable } from './dining/DiningMenuTable';
import { CourseVisualTiles } from './dining/CourseVisualTiles';
import { QuickSnackBar } from './dining/QuickSnackBar';
import { FoodOrderPanel } from './dining/FoodOrderPanel';
import { ServedFoodGallery } from './dining/ServedFoodGallery';
import { MidnightSnackExpress } from './dining/MidnightSnackExpress';
import { MENU_TRACK_FOOD_IDS, type MenuTrack } from '../data/diningGuide';

interface DiningAmenitiesPanelProps {
  visible: boolean;
}

export function DiningAmenitiesPanel({ visible }: DiningAmenitiesPanelProps) {
  const [expanded, setExpanded] = useState(false);
  const [champagneOrdered, setChampagneOrdered] = useState(false);
  const [champagneFilling, setChampagneFilling] = useState(false);
  const [caviarServed, setCaviarServed] = useState(false);
  const [snackExpressOpen, setSnackExpressOpen] = useState(false);
  const [orderedIds, setOrderedIds] = useState<Set<string>>(new Set());
  const [eatenIds, setEatenIds] = useState<Set<string>>(new Set());
  const [servedMenuTrack, setServedMenuTrack] = useState<MenuTrack | null>(null);

  const addOrdered = useCallback((ids: string[]) => {
    setOrderedIds((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.add(id));
      return next;
    });
    setEatenIds((prev) => {
      const next = new Set(prev);
      ids.forEach((id) => next.delete(id));
      return next;
    });
  }, []);

  const eatFood = useCallback((id: string) => {
    setEatenIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const serveCourseMenu = useCallback((track: MenuTrack) => {
    const allCourseIds = [
      ...MENU_TRACK_FOOD_IDS.korean,
      ...MENU_TRACK_FOOD_IDS.western,
    ];
    setOrderedIds((prev) => {
      const next = new Set(prev);
      allCourseIds.forEach((id) => next.delete(id));
      MENU_TRACK_FOOD_IDS[track].forEach((id) => next.add(id));
      return next;
    });
    setEatenIds((prev) => {
      const next = new Set(prev);
      allCourseIds.forEach((id) => next.delete(id));
      return next;
    });
    setServedMenuTrack(track);
  }, []);

  const orderChampagne = useCallback(() => {
    if (champagneFilling) return;
    setChampagneFilling(true);
    setChampagneOrdered(true);
    setTimeout(() => setChampagneFilling(false), 1600);
  }, [champagneFilling]);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="glass-dock relative z-30 border-t border-white/40"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...spring, delay: 0.5 }}
      >
        <motion.button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="interactive-surface flex w-full items-center justify-between px-6 py-3.5 text-left lg:px-12"
          aria-expanded={expanded}
          whileHover={hoverLift}
          transition={spring}
        >
          <div className="flex items-center gap-3">
            <span className="glass-card flex h-8 w-8 items-center justify-center rounded-full !p-0">
              <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-brass" fill="currentColor">
                <path d="M10 2l1.2 3.6h3.8l-3.1 2.3 1.2 3.6L10 9.2 6.9 11.5l1.2-3.6-3.1-2.3h3.8L10 2z" opacity="0.9" />
              </svg>
            </span>
            <div>
              <p className="luxury-label">First Class</p>
              <p className="luxury-heading mt-0.5 !text-sm">
                In-flight Dining & Amenities
              </p>
            </div>
          </div>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={spring}
            className="text-slate-muted"
            aria-hidden
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
        </motion.button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={spring}
              className="overflow-hidden"
            >
              <div className="space-y-10 border-t border-white/30 px-6 pb-10 pt-4 lg:px-12">
                <div>
                  <SessionHeader
                    session="SESSION 01"
                    title="Luxury Korean & Western Course Dining"
                    titleKo="명품 한식 정찬 & 코스 다이닝"
                  />
                  <div className="space-y-8">
                    <WelcomeLuxuryService
                      champagneOrdered={champagneOrdered}
                      champagneFilling={champagneFilling}
                      caviarServed={caviarServed}
                      onOrderChampagne={orderChampagne}
                      onToggleCaviar={() => setCaviarServed((s) => !s)}
                    />
                    <DiningMenuTable
                      orderedIds={orderedIds}
                      onServeCourseMenu={serveCourseMenu}
                      servedMenuTrack={servedMenuTrack}
                    />
                    <ServedFoodGallery
                      orderedIds={orderedIds}
                      eatenIds={eatenIds}
                      onEat={eatFood}
                    />
                    <CourseVisualTiles />
                    <FoodOrderPanel orderedIds={orderedIds} onAddOrdered={addOrdered} />
                  </div>
                </div>

                <motion.div>
                  <SessionHeader
                    session="SESSION 02"
                    title="Privilege at 35,000 ft — Night Snack Service"
                    titleKo="고도 35,000피트의 특권, 야간 스낵 서비스"
                  />
                  <motion.div className="space-y-8">
                    <QuickSnackBar
                      orderedIds={orderedIds}
                      eatenIds={eatenIds}
                      onAddOrdered={addOrdered}
                      onOpenExpress={() => setSnackExpressOpen(true)}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <MidnightSnackExpress open={snackExpressOpen} onClose={() => setSnackExpressOpen(false)} />
    </>
  );
}
