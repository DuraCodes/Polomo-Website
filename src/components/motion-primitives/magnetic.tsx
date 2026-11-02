'use client';
import React, { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  type MotionProps,
  type SpringOptions,
} from 'motion/react';

export interface MagneticProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // Distance multiplier for magnetic attraction (default 0.35)
  range?: number; // Activation boundary in pixels (default 80)
  springOptions?: SpringOptions;
  disabled?: boolean;
}

/**
 * Magnetic Component
 * Sourced from: Motion Primitives (Julien Thibeaut) & 21st.dev
 *
 * Pulls elements smoothly toward the user's cursor with spring physics.
 * Strictly GPU-accelerated: only updates 2D/3D translate transforms on the compositor.
 */
export function Magnetic({
  children,
  className = '',
  intensity = 0.35,
  springOptions = { stiffness: 260, damping: 18, mass: 0.1 },
  disabled = false,
  ...props
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springOptions);
  const springY = useSpring(y, springOptions);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;

    // Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = (e.clientX - centerX) * intensity;
    const deltaY = (e.clientY - centerY) * intensity;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        x: springX,
        y: springY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block will-change-transform ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
