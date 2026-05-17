import { motion } from 'framer-motion';
import type { SeatMode } from '../types';
import { spring } from '../lib/motion';

interface SeatSchematicProps {
  seatMode: SeatMode;
  recline: number;
  legRest: boolean;
}

const BACK_ORIGIN = { x: 52, y: 118 };

export function SeatSchematic({ seatMode, recline, legRest }: SeatSchematicProps) {
  const backAngle = -recline;
  const legAngle = legRest ? -8 : 0;
  const footrestExtended = legRest && recline > 50;

  return (
    <motion.div
      className="relative mx-auto aspect-[4/3] w-full max-w-[280px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={spring}
    >
      <svg
        viewBox="0 0 200 160"
        className="h-full w-full"
        aria-label={`Seat schematic in ${seatMode} position`}
        role="img"
      >
        <defs>
          <linearGradient id="seatFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3d4248" />
            <stop offset="100%" stopColor="#1c1e21" />
          </linearGradient>
          <linearGradient id="accentLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0055A5" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#C4A35A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0055A5" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Floor guide */}
        <motion.line
          x1="20"
          y1="138"
          x2="180"
          y2="138"
          stroke="url(#accentLine)"
          strokeWidth="0.5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Base / ottoman */}
        <motion.rect
          x="38"
          y="108"
          width="95"
          height="28"
          rx="4"
          fill="url(#seatFill)"
          stroke="#4a4d52"
          strokeWidth="0.75"
          animate={{ y: footrestExtended ? 112 : 108 }}
          transition={spring}
        />

        {/* Leg rest */}
        <motion.g
          animate={{
            transform: `rotate(${legAngle} 52 118)`,
            opacity: legRest ? 1 : 0.35,
          }}
          transition={spring}
        >
          <motion.rect
            x="48"
            y="98"
            width="72"
            height="14"
            rx="3"
            fill="url(#seatFill)"
            stroke="#4a4d52"
            strokeWidth="0.75"
            animate={{
              height: footrestExtended ? 22 : 14,
              y: footrestExtended ? 92 : 98,
            }}
            transition={spring}
          />
        </motion.g>

        {/* Seat cushion */}
        <motion.rect
          x="42"
          y="88"
          width="88"
          height="22"
          rx="5"
          fill="url(#seatFill)"
          stroke="#4a4d52"
          strokeWidth="0.75"
        />

        {/* Seat back — rotates from hinge */}
        <motion.g
          animate={{
            transform: `rotate(${backAngle} ${BACK_ORIGIN.x} ${BACK_ORIGIN.y})`,
          }}
          transition={spring}
        >
          <motion.rect
            x="44"
            y="38"
            width="84"
            height="82"
            rx="8"
            fill="url(#seatFill)"
            stroke="#4a4d52"
            strokeWidth="0.75"
            animate={{
              height: seatMode === 'bed' ? 76 : 82,
              y: seatMode === 'bed' ? 44 : 38,
            }}
            transition={spring}
          />
          {/* Headrest */}
          <motion.rect
            x="50"
            y="32"
            width="72"
            height="18"
            rx="6"
            fill="#2a2d31"
            stroke="#C4A35A"
            strokeWidth="0.5"
            strokeOpacity="0.5"
            animate={{ y: seatMode === 'bed' ? 40 : 32 }}
            transition={spring}
          />
          {/* Stitch line */}
          <line
            x1="86"
            y1="50"
            x2="86"
            y2="108"
            stroke="#C4A35A"
            strokeWidth="0.35"
            strokeOpacity="0.35"
          />
        </motion.g>

        {/* Armrests */}
        <motion.rect
          x="32"
          y="78"
          width="10"
          height="52"
          rx="3"
          fill="#2a2d31"
          stroke="#4a4d52"
          strokeWidth="0.5"
          animate={{ opacity: seatMode === 'bed' ? 0.4 : 1 }}
        />
        <motion.rect
          x="132"
          y="78"
          width="10"
          height="52"
          rx="3"
          fill="#2a2d31"
          stroke="#4a4d52"
          strokeWidth="0.5"
          animate={{ opacity: seatMode === 'bed' ? 0.4 : 1 }}
        />

        {/* Angle indicator arc */}
        <motion.path
          d={`M 24 118 A 28 28 0 0 1 24 ${118 - recline * 0.35}`}
          fill="none"
          stroke="#0055A5"
          strokeWidth="1"
          strokeOpacity="0.4"
          strokeDasharray="2 2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1, opacity: recline > 5 ? 1 : 0 }}
          transition={spring}
        />
      </svg>

      <motion.p
        className="luxury-caption mt-2 text-center font-mono !tracking-[0.12em]"
        key={recline}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring}
      >
        {recline}° recline
      </motion.p>
    </motion.div>
  );
}
