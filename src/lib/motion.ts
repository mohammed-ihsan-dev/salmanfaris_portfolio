/** JS mirror of the motion tokens in globals.css. Keep both in sync. */
export const ease = {
  outExpo: [0.16, 1, 0.3, 1],
  outQuart: [0.25, 1, 0.5, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;

export const duration = {
  fast: 0.16,
  base: 0.28,
  slow: 0.6,
  reveal: 1,
} as const;

export const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: duration.base, ease: ease.outQuart },
} as const;
