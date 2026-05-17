import { motion } from 'framer-motion';
import { spring, hoverLift, hoverRest } from '../../lib/motion';
import { ChampagneGlass } from '../ChampagneGlass';
import { CaviarPlate } from '../CaviarPlate';
import { GlassCard } from '../ui/GlassCard';

interface WelcomeLuxuryServiceProps {
  champagneOrdered: boolean;
  champagneFilling: boolean;
  caviarServed: boolean;
  onOrderChampagne: () => void;
  onToggleCaviar: () => void;
}

export function WelcomeLuxuryService({
  champagneOrdered,
  champagneFilling,
  caviarServed,
  onOrderChampagne,
  onToggleCaviar,
}: WelcomeLuxuryServiceProps) {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <GlassCard className="p-6">
        <p className="luxury-label">Welcome Luxury Service</p>
        <h3 className="luxury-subheading mt-1">Henri Giraud Champagne</h3>
        <p className="luxury-body mt-2">
          Premium French Henri Giraud with Beluga caviar from the in-flight trolley.
          Hover the glass for rising bubble particles — flavor and refreshment at altitude.
        </p>
        <motion.button
          type="button"
          onClick={onOrderChampagne}
          disabled={champagneFilling}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-serenity/30 bg-serenity px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-cream shadow-[0_4px_20px_rgba(0,85,165,0.2)] disabled:opacity-70"
          initial={hoverRest}
          whileHover={hoverLift}
          whileTap={{ scale: 0.98 }}
          transition={spring}
        >
          {champagneOrdered ? 'Pour Again' : 'Decant Champagne'}
          <span aria-hidden>→</span>
        </motion.button>
        <div className="mt-4 flex justify-center">
          <motion.div
            whileHover={{ y: -4 }}
            transition={spring}
            className="rounded-xl p-2"
          >
            <ChampagneGlass filling={champagneFilling} ordered={champagneOrdered} />
          </motion.div>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <p className="luxury-label">Caviar & Champagne Pairing</p>
        <h3 className="luxury-subheading mt-1">Beluga · Calvisius</h3>
        <p className="luxury-body mt-2">
          Oscietra pearls with blini, egg, and chive — served on gold-rim porcelain.
        </p>
        <motion.button
          type="button"
          onClick={onToggleCaviar}
          className={`mt-4 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] ${
            caviarServed
              ? 'border-slate/20 bg-cream/80 text-slate-muted'
              : 'border-brass/40 bg-white/80 text-slate'
          }`}
          initial={hoverRest}
          whileHover={hoverLift}
          whileTap={{ scale: 0.98 }}
          transition={spring}
          aria-pressed={caviarServed}
        >
          {caviarServed ? 'Clear Service' : 'Serve Caviar Plate'}
        </motion.button>
        <div className="mt-4 flex justify-center">
          <CaviarPlate served={caviarServed} />
        </div>
      </GlassCard>
    </section>
  );
}
