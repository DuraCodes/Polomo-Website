'use client';
import React, { useRef, useMemo, useEffect, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';

interface FloatingHeroVectorsProps {
  starPoints: string;
}

interface ShapeItemProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  factor?: number; // Parallax multiplier (-0.08 to +0.08)
  floatYRange?: [number, number]; // Idle vertical drift in px
  floatDuration?: number; // Idle cycle duration in seconds
  rotateRange?: [number, number]; // Idle rotation wobble in deg
  spinDuration?: number; // Full 360-deg continuous spin duration if any
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/**
 * Single Floating Shape with Compositor-Only Mouse Parallax & Idle Drift
 * Sourced from: 21st.dev / Motion Primitives & Magic UI Parallax patterns
 */
function FloatingShape({
  mouseX,
  mouseY,
  factor = 0.04,
  floatYRange = [-8, 8],
  floatDuration = 8,
  rotateRange = [-3, 3],
  spinDuration,
  className = '',
  style = {},
  children,
}: ShapeItemProps) {
  // Translate mouse coordinate (-0.5 to 0.5) to pixel delta
  const px = useTransform(mouseX, (v) => v * factor * 500);
  const py = useTransform(mouseY, (v) => v * factor * 500);

  return (
    <motion.div
      style={{
        x: px,
        y: py,
        position: 'absolute',
        ...style,
      }}
      className={`shape pointer-events-none select-none will-change-transform ${className}`}
    >
      <motion.div
        animate={{
          y: [floatYRange[0], floatYRange[1], floatYRange[0]],
          rotate: spinDuration
            ? [0, 360]
            : [rotateRange[0], rotateRange[1], rotateRange[0]],
        }}
        transition={{
          y: {
            repeat: Infinity,
            repeatType: 'reverse',
            duration: floatDuration,
            ease: 'easeInOut',
          },
          rotate: {
            repeat: Infinity,
            duration: spinDuration || floatDuration * 1.5,
            ease: spinDuration ? 'linear' : 'easeInOut',
          },
        }}
        className="w-full h-full will-change-transform"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/**
 * FloatingHeroVectors
 * Orchestrates multi-layered geometric vectors around the hero perimeter.
 * Guarantees zero interference with typography or CTA buttons:
 * - pointer-events-none and z-0
 * - Strictly GPU-accelerated (transform & opacity)
 * - Anti-jank spring damping
 */
export function FloatingHeroVectors({ starPoints }: FloatingHeroVectorsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Mouse normalized coords (-0.5 to +0.5)
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  // Smooth critically damped spring physics for zero cursor jitter
  const springConfig = { stiffness: 90, damping: 24, mass: 0.6 };
  const smoothMouseX = useSpring(rawMouseX, springConfig);
  const smoothMouseY = useSpring(rawMouseY, springConfig);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handlePointerMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Calculate normalized offset from screen center (-0.5 to +0.5)
      const nx = (e.clientX / innerWidth) - 0.5;
      const ny = (e.clientY / innerHeight) - 0.5;
      rawMouseX.set(nx);
      rawMouseY.set(ny);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, [rawMouseX, rawMouseY, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="hero__shapes pointer-events-none select-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* ================= DESKTOP SHAPES (>= 768px) ================= */}
      <div className="hero__shapes--desktop">
        {/* Top-Left: Red Aura Circle (Distant depth plane) */}
        <FloatingShape
          mouseX={smoothMouseX}
          mouseY={smoothMouseY}
          factor={-0.03}
          floatYRange={[-10, 8]}
          floatDuration={9}
          style={{
            left: '-100px',
            top: '-40px',
            width: '220px',
            height: '220px',
          }}
        >
          <span
            className="block w-full h-full shape--circle"
            style={{ background: '#FF0000', opacity: 0.42 }}
          />
        </FloatingShape>

        {/* Top-Left: Yellow Pentagon (Mid depth plane) */}
        <FloatingShape
          mouseX={smoothMouseX}
          mouseY={smoothMouseY}
          factor={0.045}
          floatYRange={[-7, 9]}
          floatDuration={8}
          rotateRange={[-4, 4]}
          style={{
            left: '40px',
            top: '10px',
            width: '150px',
            height: '160px',
          }}
        >
          <svg
            className="w-full h-full"
            style={{ opacity: 0.5 }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon points="50,0 100,38 81,100 19,100 0,38" fill="#FFE500" />
          </svg>
        </FloatingShape>

        {/* Top-Right: Arctic Cyan Circle (Far depth plane) */}
        <FloatingShape
          mouseX={smoothMouseX}
          mouseY={smoothMouseY}
          factor={-0.035}
          floatYRange={[-9, 7]}
          floatDuration={10.5}
          style={{
            right: '-40px',
            top: '-25px',
            width: '200px',
            height: '200px',
          }}
        >
          <span
            className="block w-full h-full shape--circle"
            style={{ background: '#8FD4EE', opacity: 0.6 }}
          />
        </FloatingShape>

        {/* Mid-Right: Yellow Tilted Squircle (Foreground accent) */}
        <FloatingShape
          mouseX={smoothMouseX}
          mouseY={smoothMouseY}
          factor={0.06}
          floatYRange={[-6, 8]}
          floatDuration={7.5}
          rotateRange={[10, 18]}
          style={{
            right: '24px',
            top: '38%',
            width: '120px',
            height: '120px',
          }}
        >
          <span
            className="block w-full h-full"
            style={{
              background: '#FFE500',
              opacity: 0.65,
              borderRadius: '16px',
            }}
          />
        </FloatingShape>

        {/* Mid-Left: Green Acute Triangle (Mid depth plane) */}
        <FloatingShape
          mouseX={smoothMouseX}
          mouseY={smoothMouseY}
          factor={-0.05}
          floatYRange={[-8, 6]}
          floatDuration={8.5}
          rotateRange={[-5, 5]}
          style={{
            left: '24px',
            top: '38%',
            width: '130px',
            height: '140px',
          }}
        >
          <svg
            className="w-full h-full"
            style={{ opacity: 0.65 }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon points="0,0 100,48 12,100" fill="#00E575" />
          </svg>
        </FloatingShape>

        {/* Bottom-Right: Hot Pink 14-Point Star Burst (Slow continuous rotation) */}
        <FloatingShape
          mouseX={smoothMouseX}
          mouseY={smoothMouseY}
          factor={0.055}
          floatYRange={[-7, 7]}
          floatDuration={9.5}
          spinDuration={55}
          style={{
            right: '44px',
            bottom: '24px',
            width: '130px',
            height: '130px',
          }}
        >
          <svg
            className="w-full h-full"
            id="star"
            style={{ opacity: 0.6 }}
            viewBox="-50 -50 100 100"
          >
            <polygon fill="#FF4071" points={starPoints} />
          </svg>
        </FloatingShape>

        {/* Bottom-Left: Hot Pink Outer Aura Circle */}
        <FloatingShape
          mouseX={smoothMouseX}
          mouseY={smoothMouseY}
          factor={-0.04}
          floatYRange={[-8, 8]}
          floatDuration={11}
          style={{
            left: '-40px',
            bottom: '20px',
            width: '130px',
            height: '130px',
          }}
        >
          <span
            className="block w-full h-full shape--circle"
            style={{ background: '#FF4071', opacity: 0.42 }}
          />
        </FloatingShape>

        {/* Bottom-Left: Crimson Accent Circle */}
        <FloatingShape
          mouseX={smoothMouseX}
          mouseY={smoothMouseY}
          factor={0.03}
          floatYRange={[-6, 6]}
          floatDuration={8}
          style={{
            left: '50px',
            bottom: '12px',
            width: '90px',
            height: '90px',
          }}
        >
          <span
            className="block w-full h-full shape--circle"
            style={{ background: '#FF3B30', opacity: 0.35 }}
          />
        </FloatingShape>
      </div>

      {/* ================= MOBILE SHAPES (< 768px) ================= */}
      <div className="hero__shapes--mobile">
        {/* Top-Left Yellow Angle */}
        <FloatingShape
          mouseX={smoothMouseX}
          mouseY={smoothMouseY}
          factor={0.02}
          floatYRange={[-4, 4]}
          floatDuration={7}
          style={{
            left: '-10px',
            top: '-10px',
            width: '60px',
            height: '64px',
          }}
        >
          <svg
            className="w-full h-full"
            style={{ opacity: 0.45 }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon points="0,0 100,28 65,100 0,72" fill="#FFE500" />
          </svg>
        </FloatingShape>

        {/* Top-Right Arctic Cyan Circle */}
        <FloatingShape
          mouseX={smoothMouseX}
          mouseY={smoothMouseY}
          factor={-0.02}
          floatYRange={[-5, 5]}
          floatDuration={8.5}
          style={{
            right: '-16px',
            top: '10px',
            width: '60px',
            height: '60px',
          }}
        >
          <span
            className="block w-full h-full shape--circle"
            style={{ background: '#8FD4EE', opacity: 0.55 }}
          />
        </FloatingShape>

        {/* Bottom-Left Green Accent */}
        <FloatingShape
          mouseX={smoothMouseX}
          mouseY={smoothMouseY}
          factor={-0.02}
          floatYRange={[-4, 4]}
          floatDuration={7.5}
          style={{
            left: '-10px',
            bottom: '10px',
            width: '54px',
            height: '58px',
          }}
        >
          <svg
            className="w-full h-full"
            style={{ opacity: 0.5 }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon points="0,0 100,48 12,100" fill="#00E575" />
          </svg>
        </FloatingShape>

        {/* Bottom-Right Hot Pink Star */}
        <FloatingShape
          mouseX={smoothMouseX}
          mouseY={smoothMouseY}
          factor={0.02}
          floatYRange={[-4, 4]}
          floatDuration={9}
          spinDuration={60}
          style={{
            right: '-12px',
            bottom: '10px',
            width: '58px',
            height: '58px',
          }}
        >
          <svg
            className="w-full h-full"
            style={{ opacity: 0.45 }}
            viewBox="-50 -50 100 100"
          >
            <polygon fill="#FF4071" points={starPoints} />
          </svg>
        </FloatingShape>
      </div>
    </div>
  );
}
