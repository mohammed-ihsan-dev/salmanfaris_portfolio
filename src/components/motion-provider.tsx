"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

/**
 * One motion context for the whole app: lazy-loaded feature bundle, and
 * transforms are dropped automatically for prefers-reduced-motion users
 * (opacity changes are kept so state changes are still perceivable).
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
