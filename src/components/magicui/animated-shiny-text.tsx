'use client';
import React from 'react';
import { motion } from 'motion/react';

export interface AnimatedShinyTextProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}

/**
 * AnimatedShinyText Component
 * Sourced from: Magic UI (magicui.design)
 *
 * Produces a light-sweep gradient shimmer across typography.
 * Strictly GPU-accelerated: text background clip with animating background position.
 */
export function AnimatedShinyText({
  children,
  className = '',
  duration = 3.5,
}: AnimatedShinyTextProps) {
  return (
    <motion.span
      className={`inline-block bg-[length:250%_100%] bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-[#FFE500] to-neutral-200 ${className}`}
      animate={{
        backgroundPosition: ['0% center', '200% center'],
      }}
      transition={{
        repeat: Infinity,
        repeatType: 'loop',
        duration,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  );
}
