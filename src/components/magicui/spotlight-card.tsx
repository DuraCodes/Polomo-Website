'use client';
import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'motion/react';

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
  spotlightOpacity?: number;
}

/**
 * SpotlightCard Component
 * Sourced from: 21st.dev & Magic UI (magicui.design)
 *
 * Casts a responsive specular radial spotlight following the user's cursor.
 * Strictly GPU-accelerated: utilizes pointer coordinate interpolation on radial gradients.
 */
export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255, 229, 0, 0.18)',
  spotlightSize = 360,
  spotlightOpacity = 1,
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    mouseX.set(-1000);
    mouseY.set(-1000);
  }

  const background = useMotionTemplate`radial-gradient(${spotlightSize}px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden group ${className}`}
      {...props}
    >
      {/* Specular Radial Spotlight Layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background,
          opacity: isHovered ? spotlightOpacity : 0,
        }}
        aria-hidden="true"
      />
      {/* Card Content Layer */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
