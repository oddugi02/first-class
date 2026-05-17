import { motion } from 'framer-motion';
import { spring } from '../../lib/motion';

interface PanelHeaderProps {
  label: string;
  title: string;
  className?: string;
}

export function PanelHeader({ label, title, className = '' }: PanelHeaderProps) {
  return (
    <motion.div
      className={`border-b border-white/30 px-6 py-5 lg:px-8 ${className}`}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
    >
      <p className="luxury-label">{label}</p>
      <h2 className="luxury-heading mt-1.5">{title}</h2>
    </motion.div>
  );
}
