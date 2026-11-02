'use client';
import React, { useRef, useState, useEffect } from 'react';
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
  intensity?: number;
  range?: number;
  springOptions?: SpringOptions;
  disabled?: boolean;
}

/**
 * Magnetic Component
 * Sourced from: Motion Primitives (Julien Thibeaut) & 21st.dev
 *
 * Desktop: Pulls elements smoothly toward the user's cursor with spring physics.
 * Mobile / Touch: Automatically scales back cursor tracking, substituting with
 * a crisp, hardware-accelerated tap scale interaction (whileTap={{ scale: 0.96 }}).
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
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        window.matchMedia('(hover: none)').matches ||
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 768
      );
    };
    checkTouch();
    window.addEventListener('resize', checkTouch, { passive: true });
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, springOptions);
  const springY = useSpring(y, springOptions);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || isTouchDevice || !ref.current) return;

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
    if (isTouchDevice) return;
    x.set(0);
    y.set(0);
  };

  if (isTouchDevice || disabled) {
    return (
      <motion.div
        ref={ref}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 450, damping: 25 }}
        className={`inline-block will-change-transform ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      style={{
        x: springX,
        y: springY,
      }}
      whileTap={{ scale: 0.96 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block will-change-transform ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
