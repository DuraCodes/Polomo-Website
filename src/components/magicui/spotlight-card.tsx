'use client';
import React, { useRef, useState, useEffect } from 'react';
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
 * Desktop: Casts a responsive specular radial spotlight following the user's cursor.
 * Mobile: Replaces high-frequency mousemove listener with lightweight passive touch response
 * to eliminate main-thread blocking during mobile scrolling.
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

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isTouchDevice || !cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  }

  function handleMouseEnter() {
    if (!isTouchDevice) {
      setIsHovered(true);
    }
  }

  function handleMouseLeave() {
    if (!isTouchDevice) {
      setIsHovered(false);
      mouseX.set(-1000);
      mouseY.set(-1000);
    }
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
      {/* Specular Radial Spotlight Layer (Desktop active, subtle ambient on touch) */}
      {!isTouchDevice ? (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background,
            opacity: isHovered ? spotlightOpacity : 0,
          }}
          aria-hidden="true"
        />
      ) : (
        <div
          className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-100"
          aria-hidden="true"
        />
      )}
      {/* Card Content Layer */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
