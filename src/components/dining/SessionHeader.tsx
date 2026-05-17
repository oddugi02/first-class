import { motion } from 'framer-motion';
import { spring } from '../../lib/motion';

interface SessionHeaderProps {
  session: string;
  title: string;
  titleKo?: string;
}

export function SessionHeader({ session, title, titleKo }: SessionHeaderProps) {
  return (
    <motion.div
      className="session-banner -mx-6 mb-6 px-6 py-5 lg:-mx-8 lg:px-8"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
    >
      <div className="mx-auto max-w-lg text-center">
        <motion.div
          className="mx-auto mb-3 h-px w-10 bg-brass/70"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={spring}
        />
        <p className="font-serif text-2xl font-bold tracking-[0.12em] text-white md:text-3xl" style={{ fontFamily: 'var(--font-serif)' }}>
          {session}
        </p>
        <p className="mt-2 text-xs font-medium tracking-[0.22em] text-white/85">
          {title}
        </p>
        {titleKo && (
          <p className="mt-1 text-[10px] tracking-[0.18em] text-white/55">{titleKo}</p>
        )}
      </div>
    </motion.div>
  );
}
