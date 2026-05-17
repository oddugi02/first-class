import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MAIN_DINING_MENU,
  MENU_TRACK_META,
  MENU_TRACK_FOOD_IDS,
  type MenuTrack,
} from '../../data/diningGuide';
import { spring, hoverLift, hoverRest } from '../../lib/motion';

interface DiningMenuTableProps {
  orderedIds: Set<string>;
  onServeCourseMenu: (track: MenuTrack) => void;
  servedMenuTrack: MenuTrack | null;
}

export function DiningMenuTable({
  orderedIds,
  onServeCourseMenu,
  servedMenuTrack,
}: DiningMenuTableProps) {
  const [selectedTrack, setSelectedTrack] = useState<MenuTrack | null>(null);
  const [serving, setServing] = useState(false);

  const koreanFullyServed = MENU_TRACK_FOOD_IDS.korean.every((id) => orderedIds.has(id));
  const westernFullyServed = MENU_TRACK_FOOD_IDS.western.every((id) => orderedIds.has(id));

  const handleSelectTrack = (track: MenuTrack) => {
    if (serving) return;
    if (servedMenuTrack !== null && servedMenuTrack !== track) return;
    if (track === 'korean' && koreanFullyServed) return;
    if (track === 'western' && westernFullyServed) return;
    setSelectedTrack(track);
  };

  const serveMenu = useCallback(() => {
    if (!selectedTrack || serving) return;
    setServing(true);
    setTimeout(() => {
      onServeCourseMenu(selectedTrack);
      setSelectedTrack(null);
      setServing(false);
    }, 1000);
  }, [selectedTrack, serving, onServeCourseMenu]);

  return (
    <section>
      <motion.div
        className="mb-4 flex flex-wrap items-end justify-between gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={spring}
      >
        <div className="flex items-center gap-3">
          <span className="h-6 w-1 rounded-full bg-serenity" aria-hidden />
          <div>
            <h3 className="luxury-subheading">Main Dining Menu</h3>
            <p className="luxury-caption mt-0.5">
              한식 · 양식 중 하나의 코스만 선택·서빙할 수 있습니다
            </p>
          </div>
        </div>
      </motion.div>

      {/* Track selection cards */}
      <div className="mb-5 grid gap-4 sm:grid-cols-2">
        {(['korean', 'western'] as MenuTrack[]).map((track) => {
          const meta = MENU_TRACK_META[track];
          const isSelected = selectedTrack === track;
          const isServed = track === 'korean' ? koreanFullyServed : westernFullyServed;
          const isActiveServed = servedMenuTrack === track;
          const blockedByOtherTrack =
            servedMenuTrack !== null && servedMenuTrack !== track;

          return (
            <motion.button
              key={track}
              type="button"
              onClick={() => handleSelectTrack(track)}
              disabled={isServed || serving || blockedByOtherTrack}
              className={`relative overflow-hidden rounded-xl border-2 p-5 text-left transition-colors ${
                isServed
                  ? 'cursor-default border-brass/40 bg-brass/5'
                  : isSelected
                    ? 'border-serenity bg-serenity/8 shadow-[0_8px_32px_rgba(0,85,165,0.12)]'
                    : 'border-slate/10 bg-white/80 hover:border-slate/25'
              }`}
              initial={hoverRest}
              whileHover={!isServed && !serving ? hoverLift : undefined}
              whileTap={!isServed ? { scale: 0.99 } : undefined}
              transition={spring}
              aria-pressed={isSelected}
            >
              {isServed && (
                <span className="absolute right-3 top-3 rounded-full bg-brass px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                  Served
                </span>
              )}
              <p className="luxury-label" style={{ color: meta.color }}>
                {meta.labelKo}
              </p>
              <p className="mt-1 text-sm font-bold text-slate">{meta.label}</p>
              <p className="luxury-body mt-2">{meta.description}</p>
              <ul className="mt-4 space-y-1.5 border-t border-slate/8 pt-3">
                {MAIN_DINING_MENU.map((row) => (
                  <li key={row.course} className="flex gap-2 text-[11px] leading-snug text-slate-muted">
                    <span className="shrink-0 font-bold text-slate">{row.courseKo}</span>
                    <span>{track === 'korean' ? row.korean : row.western}</span>
                  </li>
                ))}
              </ul>
              {isActiveServed && !isSelected && (
                <p className="luxury-caption mt-3 !text-brass">현재 서빙 중인 코스</p>
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {selectedTrack && !serving && (
          <motion.div
            className="mb-4 flex justify-center"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={spring}
          >
            <motion.button
              type="button"
              onClick={serveMenu}
              className="inline-flex items-center gap-2 rounded-full border border-serenity/30 bg-serenity px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-cream shadow-[0_4px_20px_rgba(0,85,165,0.2)]"
              whileHover={hoverLift}
              whileTap={{ scale: 0.98 }}
              transition={spring}
            >
              {MENU_TRACK_META[selectedTrack].label} 3코스 서빙
              <span aria-hidden>→</span>
            </motion.button>
          </motion.div>
        )}
        {serving && (
          <motion.p
            className="luxury-caption mb-4 text-center !text-serenity"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            객실 승무원이 코스를 플레이팅하고 있습니다…
          </motion.p>
        )}
      </AnimatePresence>

      {/* Reference table */}
      <motion.div
        className="overflow-hidden rounded-xl border border-slate/8 opacity-90"
        initial={hoverRest}
        transition={spring}
      >
        <motion.div className="grid grid-cols-[minmax(72px,1fr)_1fr_1fr] bg-slate/90 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
          <div className="px-3 py-2.5">Course</div>
          <div className={`border-l border-white/10 px-3 py-2.5 ${selectedTrack === 'korean' || servedMenuTrack === 'korean' ? 'bg-serenity/30' : ''}`}>
            Korean
          </div>
          <div className={`border-l border-white/10 px-3 py-2.5 ${selectedTrack === 'western' || servedMenuTrack === 'western' ? 'bg-brass/20' : ''}`}>
            Western
          </div>
        </motion.div>
        {MAIN_DINING_MENU.map((row, i) => (
          <motion.div
            key={row.course}
            className="grid grid-cols-[minmax(72px,1fr)_1fr_1fr] border-t border-slate/6 bg-white/70 text-[10px] leading-snug text-slate md:text-[11px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...spring, delay: i * 0.04 }}
          >
            <div className="px-3 py-2.5 font-bold text-serenity">
              {row.courseKo}
            </div>
            <div
              className={`border-l border-slate/6 px-3 py-2.5 ${
                orderedIds.has(row.koreanId) ? 'bg-serenity/5 line-through opacity-60' : ''
              } ${selectedTrack === 'korean' ? 'ring-1 ring-inset ring-serenity/20' : ''}`}
            >
              {row.korean}
            </div>
            <div
              className={`border-l border-slate/6 px-3 py-2.5 ${
                orderedIds.has(row.westernId) ? 'bg-brass/5 line-through opacity-60' : ''
              } ${selectedTrack === 'western' ? 'ring-1 ring-inset ring-brass/30' : ''}`}
            >
              {row.western}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
