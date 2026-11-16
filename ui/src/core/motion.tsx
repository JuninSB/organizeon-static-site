import {
  LazyMotion,
  domAnimation,
  MotionConfig,
  useReducedMotion,
} from "motion/react";
import * as m from "motion/react-m";
import type { ReactNode } from "react";
export { m };
/** Shared lightweight animation policy; native drawer drag remains owned by Base UI. */
export function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion="user"
        transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
export function MotionPane({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <m.div
      initial={reduced ? false : { opacity: 0, y: 7 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : -5 }}
      className={className}
    >
      {children}
    </m.div>
  );
}
