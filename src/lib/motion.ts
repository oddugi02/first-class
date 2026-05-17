/** Primary luxury spring — used across the experience */
export const spring = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 15,
};

export const springEnter = {
  ...spring,
  opacity: { ...spring },
};

export const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 12 },
  transition: spring,
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: spring,
};

export const slideFromLeft = {
  initial: { opacity: 0, x: -24 },
  animate: { opacity: 1, x: 0 },
  transition: spring,
};

export const slideFromRight = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  transition: spring,
};

/** Hover lift + crisp border for interactive surfaces */
export const hoverLift = {
  y: -3,
  boxShadow: '0 12px 40px rgba(28, 30, 33, 0.08), inset 0 0 0 1px rgba(196, 163, 90, 0.25)',
};

export const hoverRest = {
  y: 0,
  boxShadow: '0 4px 20px rgba(28, 30, 33, 0.04), inset 0 0 0 1px rgba(28, 30, 33, 0.06)',
};
