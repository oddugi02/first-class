import { motion } from 'framer-motion';
import { spring } from '../../lib/motion';

interface IssueTicketButtonProps {
  disabled: boolean;
  onClick: () => void;
}

export function IssueTicketButton({ disabled, onClick }: IssueTicketButtonProps) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className="group relative w-full max-w-md overflow-hidden rounded-full border-2 border-slate bg-slate px-8 py-4 disabled:cursor-not-allowed disabled:opacity-40"
      whileHover={disabled ? undefined : { scale: 1.01 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={spring}
    >
      <motion.span
        className="absolute inset-0 origin-left bg-serenity"
        initial={{ scaleX: 0 }}
        whileHover={disabled ? undefined : { scaleX: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      />
      <span className="relative z-10 flex flex-col items-center gap-0.5 text-cream">
        <span className="text-[11px] font-bold uppercase tracking-[0.22em]">
          Issue First Class Ticket
        </span>
        <span className="text-sm font-light tracking-wide opacity-90">무료 체험하기</span>
      </span>
    </motion.button>
  );
}
