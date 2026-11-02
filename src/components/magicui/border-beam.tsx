'use client';
import React from 'react';
import { motion } from 'motion/react';

export interface BorderBeamProps {
  className?: string;
  size?: number; // Size of beam in px
  duration?: number; // Animation duration in seconds
  colorFrom?: string;
  colorVia?: string;
  colorTo?: string;
  delay?: number;
}

/**
 * BorderBeam Component
 * Sourced from: Magic UI (magicui.design / dillionverma)
 *
 * Produces a sleek, continuous laser-grade gradient beam travelling along borders.
 * Strictly GPU-accelerated: utilizes compositor transforms without triggering layout reflows.
 */
export function BorderBeam({
  className = '',
  size = 280,
  duration = 8,
  colorFrom = '#FF0000',
  colorVia = '#FFE500',
  colorTo = '#00E575',
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 h-[1.5px] overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100vw' }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration,
          delay,
        }}
        style={{
          width: size,
          background: `linear-gradient(90deg, transparent 0%, ${colorFrom} 30%, ${colorVia} 65%, ${colorTo} 85%, transparent 100%)`,
        }}
        className="h-full will-change-transform shadow-[0_0_12px_rgba(255,229,0,0.6)]"
      />
    </div>
  );
}
