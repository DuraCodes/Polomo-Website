'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface Hero3DCanvasProps {
  className?: string;
}

export type DeviceTier = 'high' | 'medium' | 'low';

interface HardwareProfile {
  tier: DeviceTier;
  maxDpr: number;
  useShadows: boolean;
  antialias: boolean;
  ringSegments: number;
  numRings: number;
  nodeCountPerPod: number;
  particleCount: number;
  sphereSubdivisions: number;
  isTouch: boolean;
}

/**
 * Detects device hardware capability and touch profile prior to WebGL instantiation.
 * Isolates desktop vs mobile interactivity to prevent touch-scroll jank and battery drain.
 */
function detectHardwareProfile(): HardwareProfile {
  if (typeof window === 'undefined') {
    return {
      tier: 'medium',
      maxDpr: 1.5,
      useShadows: false,
      antialias: false,
      ringSegments: 64,
      numRings: 3,
      nodeCountPerPod: 4,
      particleCount: 20,
      sphereSubdivisions: 16,
      isTouch: false,
    };
  }

  // 1. Detect software WebGL or low-spec GPU
  let isSoftware = false;
  let gpuRenderer = '';
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) {
      isSoftware = true;
    } else {
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      gpuRenderer = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      isSoftware = /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpuRenderer);
    }
  } catch {
    isSoftware = false;
  }

  // 2. Evaluate hardware & screen attributes
  const isMobileScreen = window.innerWidth < 768;
  const isTabletScreen = window.innerWidth >= 768 && window.innerWidth < 1024;
  const isTouch = window.matchMedia('(hover: none)').matches || 'ontouchstart' in window || navigator.maxTouchPoints > 0 || isMobileScreen;
  const cores = navigator.hardwareConcurrency || 4;
  const deviceMemory = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;

  const isLowPowerGpu = /Adreno\s*(3|4|5\d\d)|Mali-(4|T)|PowerVR/i.test(gpuRenderer);

  // 3. Classify tier
  let tier: DeviceTier = 'high';
  if (isSoftware || (isMobileScreen && (cores <= 4 || deviceMemory <= 4 || isLowPowerGpu))) {
    tier = 'low';
  } else if (isMobileScreen || isTabletScreen || isTouch || cores <= 6) {
    tier = 'medium';
  } else {
    tier = 'high';
  }

  switch (tier) {
    case 'low':
      return {
        tier: 'low',
        maxDpr: 1.0, // Strict 1.0 DPR limit eliminates mobile GPU fill-rate strain
        useShadows: false,
        antialias: false,
        ringSegments: 48,
        numRings: 2,
        nodeCountPerPod: 3,
        particleCount: 15,
        sphereSubdivisions: 12,
        isTouch,
      };
    case 'medium':
      return {
        tier: 'medium',
        maxDpr: isMobileScreen ? 1.25 : 1.5,
        useShadows: false,
        antialias: true,
        ringSegments: 72,
        numRings: 3,
        nodeCountPerPod: 5,
        particleCount: 25,
        sphereSubdivisions: 18,
        isTouch,
      };
    case 'high':
    default:
      return {
        tier: 'high',
        maxDpr: 1.5, // Strict 1.5 maximum DPR cap to eliminate mobile GPU fill-rate strain
        useShadows: true,
        antialias: true,
        ringSegments: 128,
        numRings: 4,
        nodeCountPerPod: 6,
        particleCount: 45,
        sphereSubdivisions: 28,
        isTouch,
      };
  }
}

/**
 * Hero3DCanvas
 * Mobile-First Performance & Touch-Optimized 3D WebGL Motion Canvas:
 * 1. Touch-Optimized Interaction Redesign:
 *    - Replaces desktop mousemove with container-confined touch-swipe inertial physics on mobile.
 *    - Segregates touch vs desktop: zero document-level touchmove listeners during page scrolling.
 * 2. Device-Tier Interactivity Scaling:
 *    - On mobile, automatically supplements with autonomous organic breathing kinematics (Lissajous curves),
 *      keeping the stage alive and responsive with zero battery drain.
 * 3. Passive Event Listeners & Throttling:
 *    - All scroll, touch, and resize handlers are marked strictly as passive ({ passive: true }).
 *    - Activity wake-up notifications throttled to eliminate main-thread scroll blocking.
 * 4. Automatic Viewport & Idle Culling:
 *    - IntersectionObserver pauses render loop when scrolled out of view.
 *    - Inactivity timer pauses loop after 5s of user idle time, resuming instantly upon touch or scroll.
 */
export function Hero3DCanvas({ className = '' }: Hero3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const idleId = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        () => setIsHydrated(true),
        { timeout: 600 }
      );
      return () => {
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      };
    } else {
      const timerId = setTimeout(() => setIsHydrated(true), 100);
      return () => clearTimeout(timerId);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const container = mountRef.current;
    if (!container) return;

    const profile = detectHardwareProfile();
    const isSoftwareGl = profile.tier === 'low' && typeof window !== 'undefined' && !window.WebGL2RenderingContext;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Renderer setup with strict mobile DPR capping and ACES Filmic tone mapping
    const renderer = new THREE.WebGLRenderer({
      antialias: profile.antialias,
      alpha: true,
      powerPreference: 'high-performance',
      precision: profile.tier === 'low' ? 'mediump' : 'highp',
    });

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, profile.maxDpr));

    const initialWidth = container.clientWidth || window.innerWidth;
    const initialHeight = container.clientHeight || 650;
    renderer.setSize(initialWidth, initialHeight);

    renderer.domElement.style.display = 'block';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, initialWidth / initialHeight, 0.1, 100);
    camera.position.set(0, 0, 11);

    // Studio Environment Reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnvTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = roomEnvTexture;
    pmremGenerator.dispose();

    // -------------------------------------------------------------
    // LIGHTING RIG: Spotlight & Scrutiny Lighting
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, profile.tier === 'low' ? 0.9 : 0.65);
    scene.add(ambientLight);

    const scrutinySpotlight = new THREE.SpotLight(0xfff5e6, 3.2);
    scrutinySpotlight.position.set(0, 6, 8);
    scrutinySpotlight.angle = Math.PI / 4.5;
    scrutinySpotlight.penumbra = 0.85;
    scrutinySpotlight.decay = 1.8;
    scrutinySpotlight.distance = 25;

    const spotlightTarget = new THREE.Object3D();
    spotlightTarget.position.set(0, 0, 0);
    scene.add(spotlightTarget);
    scrutinySpotlight.target = spotlightTarget;
    scene.add(scrutinySpotlight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.4);
    rimLight.position.set(-6, -4, -3);
    scene.add(rimLight);

    const redAccentLight = new THREE.DirectionalLight(0xff0033, 1.2);
    redAccentLight.position.set(6, -4, -2);
    scene.add(redAccentLight);

    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Disposable tracking
    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];

    const trackGeom = <G extends THREE.BufferGeometry>(g: G): G => {
      geometriesToDispose.push(g);
      return g;
    };
    const trackMat = <M extends THREE.Material>(m: M): M => {
      materialsToDispose.push(m);
      return m;
    };

    // -------------------------------------------------------------
    // 1. ACOUSTIC WAVEFORM / HARMONIC FREQUENCY RINGS
    // -------------------------------------------------------------
    const ringGroup = new THREE.Group();
    masterGroup.add(ringGroup);

    interface WaveRingData {
      line: THREE.LineLoop;
      baseRadius: number;
      baseZ: number;
      speed: number;
      freq: number;
      amplitude: number;
      color: THREE.Color;
      posArray: Float32Array;
    }

    const waveRings: WaveRingData[] = [];
    const ringPalette = [
      new THREE.Color(0xff0033),
      new THREE.Color(0xffe500),
      new THREE.Color(0x00e575),
      new THREE.Color(0x38bdf8),
    ];

    const segs = profile.ringSegments;
    for (let r = 0; r < profile.numRings; r++) {
      const baseRadius = 2.4 + r * 1.5;
      const positions = new Float32Array((segs + 1) * 3);
      const ringGeom = trackGeom(new THREE.BufferGeometry());
      ringGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const ringColor = ringPalette[r % ringPalette.length];
      const ringMat = trackMat(
        new THREE.LineBasicMaterial({
          color: ringColor,
          transparent: true,
          opacity: 0.22 - r * 0.035,
          blending: THREE.AdditiveBlending,
          linewidth: 1,
        })
      );

      const ringLine = new THREE.LineLoop(ringGeom, ringMat);
      ringLine.position.set(0, 0, -1.2 - r * 0.4);
      ringGroup.add(ringLine);

      waveRings.push({
        line: ringLine,
        baseRadius,
        baseZ: -1.2 - r * 0.4,
        speed: 0.8 + r * 0.35,
        freq: 3 + r * 2,
        amplitude: 0.18 + r * 0.07,
        color: ringColor,
        posArray: positions,
      });
    }

    // -------------------------------------------------------------
    // 2. ATMOSPHERIC SPOTLIGHT PARTICLES (THEATRICAL DUST MOTES)
    // -------------------------------------------------------------
    const particleCount = profile.particleCount;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
      particleSpeeds[i] = Math.random() * 0.2 + 0.1;
    }

    const particleGeom = trackGeom(new THREE.BufferGeometry());
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMat = trackMat(
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: profile.tier === 'low' ? 0.08 : 0.11,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );

    const particleSystem = new THREE.Points(particleGeom, particleMat);
    masterGroup.add(particleSystem);

    // -------------------------------------------------------------
    // 3. INTERACTIVE PRACTICE POD NODES & SYNAPTIC FILAMENTS
    // -------------------------------------------------------------
    interface PodNode {
      mesh: THREE.Mesh;
      basePos: THREE.Vector3;
      side: 'left' | 'right';
      podIndex: number;
      floatSpeed: number;
      floatOffset: number;
      pulseRate: number;
    }

    const podNodes: PodNode[] = [];
    const podGroup = new THREE.Group();
    masterGroup.add(podGroup);

    const nodeMaterials = [
      trackMat(
        new THREE.MeshPhysicalMaterial({
          color: 0x00e575,
          roughness: 0.15,
          metalness: 0.2,
          clearcoat: 0.9,
          emissive: new THREE.Color(0x00e575),
          emissiveIntensity: 0.25,
        })
      ),
      trackMat(
        new THREE.MeshPhysicalMaterial({
          color: 0xffe500,
          roughness: 0.12,
          metalness: 0.1,
          clearcoat: 0.9,
          emissive: new THREE.Color(0xffe500),
          emissiveIntensity: 0.2,
        })
      ),
      trackMat(
        new THREE.MeshPhysicalMaterial({
          color: 0xff3366,
          roughness: 0.2,
          metalness: 0.15,
          clearcoat: 0.8,
          emissive: new THREE.Color(0xff3366),
          emissiveIntensity: 0.3,
        })
      ),
      trackMat(
        new THREE.MeshPhysicalMaterial({
          color: 0x38bdf8,
          roughness: 0.1,
          metalness: 0.1,
          clearcoat: 0.95,
          emissive: new THREE.Color(0x38bdf8),
          emissiveIntensity: 0.25,
        })
      ),
    ];

    const sphereGeom = trackGeom(
      new THREE.SphereGeometry(0.38, profile.sphereSubdivisions, profile.sphereSubdivisions)
    );

    const nodesPerSide = profile.nodeCountPerPod;

    const createPodSide = (side: 'left' | 'right') => {
      for (let i = 0; i < nodesPerSide; i++) {
        const mat = nodeMaterials[i % nodeMaterials.length];
        const mesh = new THREE.Mesh(sphereGeom, mat);
        const nodeScale = i === 0 ? 1.25 : 0.85 + (i % 3) * 0.18;
        mesh.scale.set(nodeScale, nodeScale, nodeScale);
        podGroup.add(mesh);

        podNodes.push({
          mesh,
          basePos: new THREE.Vector3(0, 0, 0),
          side,
          podIndex: i,
          floatSpeed: 0.9 + i * 0.2,
          floatOffset: i * 1.1 + (side === 'left' ? 0 : Math.PI),
          pulseRate: 1.2 + i * 0.3,
        });
      }
    };

    createPodSide('left');
    createPodSide('right');

    const maxLines = nodesPerSide * (nodesPerSide - 1);
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);

    const connectionGeom = trackGeom(new THREE.BufferGeometry());
    connectionGeom.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    connectionGeom.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const connectionMat = trackMat(
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        linewidth: 1,
      })
    );

    const connectionLines = new THREE.LineSegments(connectionGeom, connectionMat);
    podGroup.add(connectionLines);

    // -------------------------------------------------------------
    // Responsive Frustum & Horizontal Margin Re-anchoring
    // -------------------------------------------------------------
    const updateResponsiveLayout = () => {
      const currentWidth = container.clientWidth || window.innerWidth;
      const currentHeight = container.clientHeight || 650;

      camera.aspect = currentWidth / currentHeight;
      camera.updateProjectionMatrix();

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, profile.maxDpr));
      renderer.setSize(currentWidth, currentHeight);

      const vFovRad = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(vFovRad / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;
      const halfW = visibleWidth / 2;
      const halfH = visibleHeight / 2;

      const leftNodes = podNodes.filter((n) => n.side === 'left');
      const rightNodes = podNodes.filter((n) => n.side === 'right');

      if (currentWidth < 640) {
        masterGroup.scale.set(0.62, 0.62, 0.62);

        leftNodes.forEach((node, idx) => {
          const yNorm = idx === 0 ? 0.78 : idx === 1 ? -0.78 : 0.25;
          const xNorm = idx === 2 ? -0.88 : -0.76;
          node.basePos.set(halfW * xNorm, halfH * yNorm, -0.2 + idx * 0.2);
          node.mesh.position.copy(node.basePos);
        });

        rightNodes.forEach((node, idx) => {
          const yNorm = idx === 0 ? 0.78 : idx === 1 ? -0.78 : -0.25;
          const xNorm = idx === 2 ? 0.88 : 0.76;
          node.basePos.set(halfW * xNorm, halfH * yNorm, -0.2 + idx * 0.2);
          node.mesh.position.copy(node.basePos);
        });

        ringGroup.scale.set(0.65, 0.65, 0.65);
      } else if (currentWidth < 1024) {
        masterGroup.scale.set(0.78, 0.78, 0.78);

        leftNodes.forEach((node, idx) => {
          const angle = (idx / nodesPerSide) * Math.PI * 1.1 - Math.PI * 0.55;
          const x = -halfW * 0.82 + Math.cos(angle) * 0.9;
          const y = Math.sin(angle) * (halfH * 0.65);
          node.basePos.set(x, y, -0.2 + (idx % 2) * 0.4);
          node.mesh.position.copy(node.basePos);
        });

        rightNodes.forEach((node, idx) => {
          const angle = (idx / nodesPerSide) * Math.PI * 1.1 - Math.PI * 0.55;
          const x = halfW * 0.82 - Math.cos(angle) * 0.9;
          const y = Math.sin(angle) * (halfH * 0.65);
          node.basePos.set(x, y, -0.2 + (idx % 2) * 0.4);
          node.mesh.position.copy(node.basePos);
        });

        ringGroup.scale.set(0.85, 0.85, 0.85);
      } else {
        masterGroup.scale.set(1.0, 1.0, 1.0);

        const leftOffsets = [
          { x: -0.84, y: 0.55, z: 0.2 },
          { x: -0.75, y: 0.28, z: -0.4 },
          { x: -0.86, y: 0.02, z: 0.4 },
          { x: -0.76, y: -0.22, z: -0.2 },
          { x: -0.85, y: -0.52, z: 0.3 },
          { x: -0.72, y: -0.68, z: -0.5 },
        ];

        leftNodes.forEach((node, idx) => {
          const off = leftOffsets[idx % leftOffsets.length];
          node.basePos.set(halfW * off.x, halfH * off.y, off.z);
          node.mesh.position.copy(node.basePos);
        });

        const rightOffsets = [
          { x: 0.84, y: 0.55, z: 0.2 },
          { x: 0.75, y: 0.28, z: -0.4 },
          { x: 0.86, y: 0.02, z: 0.4 },
          { x: 0.76, y: -0.22, z: -0.2 },
          { x: 0.85, y: -0.52, z: 0.3 },
          { x: 0.72, y: -0.68, z: -0.5 },
        ];

        rightNodes.forEach((node, idx) => {
          const off = rightOffsets[idx % rightOffsets.length];
          node.basePos.set(halfW * off.x, halfH * off.y, off.z);
          node.mesh.position.copy(node.basePos);
        });

        ringGroup.scale.set(1.0, 1.0, 1.0);
      }
    };

    updateResponsiveLayout();

    // -------------------------------------------------------------
    // Mobile-Optimized Interaction & Touch Physics Architecture
    // -------------------------------------------------------------
    const interaction = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
      spotlightTargetX: 0,
      spotlightTargetY: 0,
      spotlightCurrentX: 0,
      spotlightCurrentY: 0,
      // Inertial touch-swipe decay physics
      touchVelocityX: 0,
      touchVelocityY: 0,
      touchImpulseX: 0,
      touchImpulseY: 0,
    };

    let isIntersecting = true;
    let isDocumentVisible = !document.hidden;
    let isUserActive = true;
    let isLoopRunning = false;
    let frameId = 0;
    let inactivityTimer: number | null = null;
    const INACTIVITY_TIMEOUT_MS = 5000;
    const clock = new THREE.Clock();

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    const animate = () => {
      if (!isLoopRunning) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (profile.isTouch) {
        // MOBILE / TOUCH TIER:
        // Autonomous organic ambient breathing kinematics (Lissajous curves)
        // so the scene breathes and feels alive on mobile without user input overhead
        const autoTime = elapsed * 0.45;
        const ambientX = Math.sin(autoTime) * 1.5;
        const ambientY = Math.cos(autoTime * 0.7) * 0.8;

        // Inertial decay of touch swipe impulse
        interaction.touchVelocityX *= 0.92;
        interaction.touchVelocityY *= 0.92;
        interaction.touchImpulseX = THREE.MathUtils.damp(
          interaction.touchImpulseX,
          interaction.touchVelocityX,
          3.5,
          delta
        );
        interaction.touchImpulseY = THREE.MathUtils.damp(
          interaction.touchImpulseY,
          interaction.touchVelocityY,
          3.5,
          delta
        );

        interaction.spotlightCurrentX = THREE.MathUtils.damp(
          interaction.spotlightCurrentX,
          ambientX + interaction.touchImpulseX * 2.0,
          2.5,
          delta
        );
        interaction.spotlightCurrentY = THREE.MathUtils.damp(
          interaction.spotlightCurrentY,
          ambientY + interaction.touchImpulseY * 2.0,
          2.5,
          delta
        );

        interaction.currentX = THREE.MathUtils.damp(
          interaction.currentX,
          (ambientX * 0.25) + interaction.touchImpulseX * 0.4,
          2.8,
          delta
        );
        interaction.currentY = THREE.MathUtils.damp(
          interaction.currentY,
          (ambientY * 0.25) + interaction.touchImpulseY * 0.4,
          2.8,
          delta
        );
      } else {
        // DESKTOP TIER: Direct responsive cursor tracking
        interaction.currentX = THREE.MathUtils.damp(interaction.currentX, interaction.targetX, 3.8, delta);
        interaction.currentY = THREE.MathUtils.damp(interaction.currentY, interaction.targetY, 3.8, delta);

        interaction.spotlightCurrentX = THREE.MathUtils.damp(
          interaction.spotlightCurrentX,
          interaction.spotlightTargetX,
          3.0,
          delta
        );
        interaction.spotlightCurrentY = THREE.MathUtils.damp(
          interaction.spotlightCurrentY,
          interaction.spotlightTargetY,
          3.0,
          delta
        );
      }

      spotlightTarget.position.set(interaction.spotlightCurrentX, interaction.spotlightCurrentY, 0);
      scrutinySpotlight.position.x = interaction.spotlightCurrentX * 0.45;
      scrutinySpotlight.position.y = 5.5 + interaction.spotlightCurrentY * 0.35;

      masterGroup.rotation.y = interaction.currentX * 0.16;
      masterGroup.rotation.x = -interaction.currentY * 0.12;

      // 1. Modulate Acoustic Harmonic Frequency Rings
      if (!prefersReducedMotion) {
        for (let r = 0; r < waveRings.length; r++) {
          const ring = waveRings[r];
          const positions = ring.posArray;
          const baseR = ring.baseRadius;
          const time = elapsed * ring.speed;

          for (let i = 0; i <= segs; i++) {
            const theta = (i / segs) * Math.PI * 2;
            const harmonic1 = Math.sin(theta * ring.freq + time) * ring.amplitude;
            const harmonic2 = Math.cos(theta * (ring.freq + 2) - time * 0.7) * (ring.amplitude * 0.5);
            const radius = baseR + harmonic1 + harmonic2;
            const zHarmonic = Math.sin(theta * 3 + time * 1.2) * 0.2;

            positions[i * 3] = Math.cos(theta) * radius;
            positions[i * 3 + 1] = Math.sin(theta) * radius;
            positions[i * 3 + 2] = ring.baseZ + zHarmonic;
          }

          ring.line.geometry.attributes.position.needsUpdate = true;
          ring.line.rotation.z = elapsed * 0.04 * (r % 2 === 0 ? 1 : -1);
        }
      }

      // 2. Animate Atmospheric Stage Particles
      if (!prefersReducedMotion) {
        const pPositions = particleGeom.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          pPositions[i * 3 + 1] += particleSpeeds[i] * delta;
          pPositions[i * 3] += Math.sin(elapsed * 0.5 + i) * 0.005;

          if (pPositions[i * 3 + 1] > 4.5) {
            pPositions[i * 3 + 1] = -4.5;
            pPositions[i * 3] = (Math.random() - 0.5) * 12;
          }
        }
        particleGeom.attributes.position.needsUpdate = true;
      }

      // 3. Animate Practice Pod Nodes & Synaptic Link Pulses
      const leftNodes = podNodes.filter((n) => n.side === 'left');
      const rightNodes = podNodes.filter((n) => n.side === 'right');

      for (let i = 0; i < podNodes.length; i++) {
        const node = podNodes[i];
        const floatY = Math.sin(elapsed * node.floatSpeed + node.floatOffset) * 0.22;
        const floatX = Math.cos(elapsed * (node.floatSpeed * 0.8) + node.floatOffset) * 0.12;
        const reactiveX = interaction.currentX * 0.35;
        const reactiveY = interaction.currentY * 0.25;

        node.mesh.position.y = node.basePos.y + floatY + reactiveY;
        node.mesh.position.x = node.basePos.x + floatX + reactiveX;

        const pulse = 1.0 + Math.sin(elapsed * node.pulseRate + node.floatOffset) * 0.06;
        node.mesh.scale.setScalar(pulse * (node.podIndex === 0 ? 1.25 : 0.95));
      }

      // 4. Update Synaptic Filament Lines
      let lineVertexIdx = 0;
      const posAttr = connectionGeom.attributes.position.array as Float32Array;
      const colAttr = connectionGeom.attributes.color.array as Float32Array;

      const updatePodFilaments = (nodes: PodNode[]) => {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const p1 = nodes[i].mesh.position;
            const p2 = nodes[j].mesh.position;
            const dist = p1.distanceTo(p2);

            if (dist < 3.2 && lineVertexIdx < maxLines * 6) {
              posAttr[lineVertexIdx] = p1.x;
              posAttr[lineVertexIdx + 1] = p1.y;
              posAttr[lineVertexIdx + 2] = p1.z;

              posAttr[lineVertexIdx + 3] = p2.x;
              posAttr[lineVertexIdx + 4] = p2.y;
              posAttr[lineVertexIdx + 5] = p2.z;

              const pulseIntensity = Math.sin(elapsed * 2.5 + i + j) * 0.3 + 0.7;
              const r = i % 2 === 0 ? 0.0 : 1.0;
              const g = i % 2 === 0 ? 0.9 : 0.85;
              const b = i % 2 === 0 ? 0.45 : 0.0;

              colAttr[lineVertexIdx] = r * pulseIntensity;
              colAttr[lineVertexIdx + 1] = g * pulseIntensity;
              colAttr[lineVertexIdx + 2] = b * pulseIntensity;

              colAttr[lineVertexIdx + 3] = r * pulseIntensity;
              colAttr[lineVertexIdx + 4] = g * pulseIntensity;
              colAttr[lineVertexIdx + 5] = b * pulseIntensity;

              lineVertexIdx += 6;
            }
          }
        }
      };

      updatePodFilaments(leftNodes);
      updatePodFilaments(rightNodes);

      for (let k = lineVertexIdx; k < maxLines * 6; k++) {
        posAttr[k] = 0;
        colAttr[k] = 0;
      }

      connectionGeom.attributes.position.needsUpdate = true;
      connectionGeom.attributes.color.needsUpdate = true;
      connectionGeom.setDrawRange(0, lineVertexIdx / 3);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(animate);
      } else {
        frameId = requestAnimationFrame(animate);
      }
    };

    const startLoop = () => {
      if (isLoopRunning) return;
      isLoopRunning = true;
      clock.getDelta();
      if (isSoftwareGl) {
        afterDraw(animate);
      } else {
        frameId = requestAnimationFrame(animate);
      }
    };

    const stopLoop = () => {
      if (!isLoopRunning) return;
      isLoopRunning = false;
      if (isSoftwareGl) {
        window.clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }
    };

    // Throttled activity notification to eliminate main-thread scroll blocking
    let activityThrottleTimer: number | null = null;
    const recordUserActivity = () => {
      isUserActive = true;
      if (!isLoopRunning && isIntersecting && isDocumentVisible) {
        startLoop();
      }
      if (inactivityTimer !== null) {
        window.clearTimeout(inactivityTimer);
      }
      inactivityTimer = window.setTimeout(() => {
        isUserActive = false;
        stopLoop();
      }, INACTIVITY_TIMEOUT_MS);
    };

    const recordThrottledActivity = () => {
      if (activityThrottleTimer === null) {
        activityThrottleTimer = window.setTimeout(() => {
          activityThrottleTimer = null;
        }, 300);
        recordUserActivity();
      }
    };

    // -------------------------------------------------------------
    // Desktop Mouse Handlers (Confined to Desktop Screens)
    // -------------------------------------------------------------
    const handleDesktopMouseMove = (e: MouseEvent) => {
      if (profile.isTouch) return;
      const xRatio = (e.clientX / window.innerWidth) * 2 - 1;
      const yRatio = -(e.clientY / window.innerHeight) * 2 + 1;
      interaction.targetX = Math.max(-1, Math.min(1, xRatio));
      interaction.targetY = Math.max(-1, Math.min(1, yRatio));
      interaction.spotlightTargetX = interaction.targetX * 5.0;
      interaction.spotlightTargetY = interaction.targetY * 3.0;
      recordUserActivity();
    };

    // -------------------------------------------------------------
    // Mobile Touch Handlers (Confined strictly to Hero Container)
    // Avoids document-level touchmove interruption during page scroll
    // -------------------------------------------------------------
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let isTouchingHero = false;

    const handleHeroTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isTouchingHero = true;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = performance.now();
        interaction.touchVelocityX = 0;
        interaction.touchVelocityY = 0;
        recordUserActivity();
      }
    };

    const handleHeroTouchMove = (e: TouchEvent) => {
      if (isTouchingHero && e.touches.length === 1) {
        const currentX = e.touches[0].clientX;
        const currentY = e.touches[0].clientY;
        const dx = (currentX - touchStartX) / (window.innerWidth || 375);
        const dy = (currentY - touchStartY) / (window.innerHeight || 650);

        // Apply gentle inertial steering vector
        interaction.touchVelocityX = Math.max(-2.0, Math.min(2.0, dx * 3.0));
        interaction.touchVelocityY = Math.max(-2.0, Math.min(2.0, -dy * 3.0));
        recordUserActivity();
      }
    };

    const handleHeroTouchEnd = (e: TouchEvent) => {
      if (isTouchingHero) {
        isTouchingHero = false;
        const dt = Math.max(16, performance.now() - touchStartTime);
        if (e.changedTouches.length > 0) {
          const endX = e.changedTouches[0].clientX;
          const endY = e.changedTouches[0].clientY;
          const vx = ((endX - touchStartX) / dt) * 35;
          const vy = (-(endY - touchStartY) / dt) * 35;
          interaction.touchVelocityX = Math.max(-2.5, Math.min(2.5, vx));
          interaction.touchVelocityY = Math.max(-2.5, Math.min(2.5, vy));
        }
      }
    };

    // Register Desktop vs Mobile Listeners with strictly passive flags
    if (!profile.isTouch) {
      window.addEventListener('mousemove', handleDesktopMouseMove, { passive: true });
    } else {
      container.addEventListener('touchstart', handleHeroTouchStart, { passive: true });
      container.addEventListener('touchmove', handleHeroTouchMove, { passive: true });
      container.addEventListener('touchend', handleHeroTouchEnd, { passive: true });
      container.addEventListener('touchcancel', handleHeroTouchEnd, { passive: true });
    }

    // Passive global activity listeners to wake from idle during navigation
    window.addEventListener('scroll', recordThrottledActivity, { passive: true });
    window.addEventListener('touchstart', recordThrottledActivity, { passive: true });
    window.addEventListener('keydown', recordThrottledActivity, { passive: true });
    window.addEventListener('pointerdown', recordThrottledActivity, { passive: true });

    const resizeObserver = new ResizeObserver(() => {
      updateResponsiveLayout();
      recordUserActivity();
    });
    resizeObserver.observe(container);

    const handleResize = () => {
      updateResponsiveLayout();
      recordUserActivity();
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // -------------------------------------------------------------
    // Viewport Visibility Culling (IntersectionObserver)
    // -------------------------------------------------------------
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const wasIntersecting = isIntersecting;
        isIntersecting = entry.isIntersecting;

        if (isIntersecting && !wasIntersecting && isDocumentVisible && isUserActive) {
          startLoop();
        } else if (!isIntersecting && wasIntersecting) {
          stopLoop();
        }
      },
      {
        root: null,
        threshold: 0.05,
        rootMargin: '100px 0px 100px 0px',
      }
    );
    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
      if (isDocumentVisible && isIntersecting && isUserActive) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    recordUserActivity();

    // -------------------------------------------------------------
    // Comprehensive Disposal & Cleanup on Unmount
    // -------------------------------------------------------------
    return () => {
      stopLoop();

      if (inactivityTimer !== null) {
        window.clearTimeout(inactivityTimer);
      }
      if (activityThrottleTimer !== null) {
        window.clearTimeout(activityThrottleTimer);
      }

      if (!profile.isTouch) {
        window.removeEventListener('mousemove', handleDesktopMouseMove);
      } else {
        container.removeEventListener('touchstart', handleHeroTouchStart);
        container.removeEventListener('touchmove', handleHeroTouchMove);
        container.removeEventListener('touchend', handleHeroTouchEnd);
        container.removeEventListener('touchcancel', handleHeroTouchEnd);
      }

      window.removeEventListener('scroll', recordThrottledActivity);
      window.removeEventListener('touchstart', recordThrottledActivity);
      window.removeEventListener('keydown', recordThrottledActivity);
      window.removeEventListener('pointerdown', recordThrottledActivity);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();

      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
      roomEnvTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isHydrated]);

  return (
    <div
      ref={mountRef}
      className={`hero-3d-scene absolute inset-0 w-full h-full select-none z-0 overflow-hidden pointer-events-auto touch-pan-y ${className}`}
      aria-hidden="true"
    />
  );
}
