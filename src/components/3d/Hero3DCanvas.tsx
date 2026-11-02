'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

interface Hero3DCanvasProps {
  className?: string;
}

/**
 * Hero3DCanvas
 * Immersive, full-bleed real-time 3D WebGL scene for the Hero section.
 * Sourced from open-source 21st.dev / Three.js PBR physical motion patterns:
 * - Dynamic Camera Frustum calculation & Aspect-Ratio Mapping:
 *   Calculates visible viewport width & height in real-time, spreading 3D elements
 *   outward into the horizontal left and right margins across standard, laptop, and ultrawide viewports.
 * - Guaranteed Central Safe Zone:
 *   Keeps the center corridor [-0.45 * halfW, +0.45 * halfW] completely free of dense geometries,
 *   preserving unobstructed readability for the headline, pill badge, lede prose, and CTAs.
 * - RoomEnvironment reflection mapping with PMREMGenerator
 * - Glassmorphic transmission & physical clearcoat materials
 * - Procedural geometries: extruded beveled starburst, triangular prism, rounded boxes, toruses, and sapphire sphere
 * - Full-screen viewport mouse parallax with frame-rate independent THREE.MathUtils.damp spring kinematics
 * - Safe software-WebGL fallback detection (isSoftwareGl) and graceful cleanup
 */
export function Hero3DCanvas({ className = '' }: Hero3DCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL renderer (SwiftShader / llvmpipe / WARP)
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // Setup Three.js WebGLRenderer adhering strictly to modern color space and PBR pipeline
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const initialWidth = container.clientWidth || window.innerWidth;
    const initialHeight = container.clientHeight || 650;
    renderer.setSize(initialWidth, initialHeight);

    // Ensure canvas element spans cleanly edge-to-edge
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

    // Mandatory Procedural Studio Environment Reflection
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnvTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = roomEnvTexture;
    pmremGenerator.dispose();

    // Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Warm directional key light
    const keyLight = new THREE.DirectionalLight(0xfff3e0, 2.3);
    keyLight.position.set(6, 8, 7);
    if (!isSoftwareGl) {
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 25;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    // Cool rim light for rich specular edge highlights
    const rimLight = new THREE.DirectionalLight(0xec4899, 1.8);
    rimLight.position.set(-7, -4, -4);
    scene.add(rimLight);

    // Hemisphere sky/ground contrast fill
    const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x0f172a, 1.2);
    scene.add(hemiLight);

    // Master Group for Parallax Tilt & Global Responsive Scale
    const masterGroup = new THREE.Group();
    scene.add(masterGroup);

    // Array to track individual meshes for physics, idle float, and rotation
    interface AnimatedMeshItem {
      id: string;
      object: THREE.Object3D;
      basePos: THREE.Vector3;
      baseRot: THREE.Euler;
      floatSpeed: number;
      floatDistance: number;
      rotSpeed: THREE.Vector3;
      parallaxFactor: number;
    }

    const animatedItems: AnimatedMeshItem[] = [];

    // Array to track all disposable resources for clean unmount
    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];

    // Helper to register disposables
    const track = <G extends THREE.BufferGeometry, M extends THREE.Material>(mesh: THREE.Mesh<G, M>) => {
      geometriesToDispose.push(mesh.geometry);
      if (Array.isArray(mesh.material)) {
        materialsToDispose.push(...mesh.material);
      } else {
        materialsToDispose.push(mesh.material);
      }
      return mesh;
    };

    // -------------------------------------------------------------
    // 1. GREEN TRIANGULAR PRISM (Outer Left Flank)
    // -------------------------------------------------------------
    const triShape = new THREE.Shape();
    const triH = 1.6;
    const triW = 1.7;
    triShape.moveTo(0, triH * 0.55);
    triShape.lineTo(triW * 0.5, -triH * 0.45);
    triShape.lineTo(-triW * 0.5, -triH * 0.45);
    triShape.closePath();

    const triGeom = new THREE.ExtrudeGeometry(triShape, {
      depth: 0.38,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.07,
      bevelSegments: 4,
    });
    triGeom.center();

    const triMat = new THREE.MeshPhysicalMaterial({
      color: 0x00e575,
      roughness: 0.18,
      metalness: 0.18,
      clearcoat: 0.9,
      clearcoatRoughness: 0.12,
      reflectivity: 0.8,
    });

    const triMesh = track(new THREE.Mesh(triGeom, triMat));
    triMesh.rotation.set(0.2, -0.4, 0.15);
    masterGroup.add(triMesh);

    animatedItems.push({
      id: 'green-triangle',
      object: triMesh,
      basePos: new THREE.Vector3(-5.5, 0.2, 0.4),
      baseRot: triMesh.rotation.clone(),
      floatSpeed: 1.1,
      floatDistance: 0.24,
      rotSpeed: new THREE.Vector3(0.35, 0.45, 0.2),
      parallaxFactor: 0.07,
    });

    // -------------------------------------------------------------
    // 2. YELLOW GLASSMORPHIC CUBES / ROUNDED BOXES
    // -------------------------------------------------------------
    const yellowGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffe500,
      roughness: 0.12,
      metalness: 0.08,
      transmission: isSoftwareGl ? 0 : 0.84,
      transparent: true,
      opacity: isSoftwareGl ? 0.65 : 0.92,
      ior: 1.52,
      thickness: 1.4,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
      reflectivity: 0.9,
    });

    // Top-Left Primary Cube (Framing Upper Left Margin)
    const cubeGeom1 = new RoundedBoxGeometry(1.4, 1.4, 1.4, 5, 0.24);
    const cubeMesh1 = track(new THREE.Mesh(cubeGeom1, yellowGlassMat));
    cubeMesh1.rotation.set(0.4, 0.6, 0.2);
    masterGroup.add(cubeMesh1);

    animatedItems.push({
      id: 'yellow-cube-1',
      object: cubeMesh1,
      basePos: new THREE.Vector3(-5.8, 2.5, -0.5),
      baseRot: cubeMesh1.rotation.clone(),
      floatSpeed: 0.9,
      floatDistance: 0.22,
      rotSpeed: new THREE.Vector3(0.25, 0.35, -0.15),
      parallaxFactor: 0.06,
    });

    // Mid-Right Secondary Rounded Box (Framing Right Margin)
    const cubeGeom2 = new RoundedBoxGeometry(1.25, 1.25, 0.45, 4, 0.18);
    const cubeMesh2 = track(new THREE.Mesh(cubeGeom2, yellowGlassMat));
    cubeMesh2.rotation.set(-0.3, 0.5, 0.35);
    masterGroup.add(cubeMesh2);

    animatedItems.push({
      id: 'yellow-box-2',
      object: cubeMesh2,
      basePos: new THREE.Vector3(6.0, 0.3, 0.5),
      baseRot: cubeMesh2.rotation.clone(),
      floatSpeed: 1.3,
      floatDistance: 0.2,
      rotSpeed: new THREE.Vector3(-0.2, 0.3, 0.25),
      parallaxFactor: 0.08,
    });

    // -------------------------------------------------------------
    // 3. SOFT BLUE GLASSMORPHIC SPHERE (Top-Right Depth Plane)
    // -------------------------------------------------------------
    const sphereGeom = new THREE.SphereGeometry(1.35, 48, 48);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      roughness: 0.08,
      metalness: 0.05,
      transmission: isSoftwareGl ? 0 : 0.88,
      transparent: true,
      opacity: isSoftwareGl ? 0.6 : 0.95,
      ior: 1.48,
      thickness: 1.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.06,
      attenuationColor: new THREE.Color(0x0284c7),
      attenuationDistance: 1.6,
      reflectivity: 0.95,
    });

    const sphereMesh = track(new THREE.Mesh(sphereGeom, sphereMat));
    masterGroup.add(sphereMesh);

    animatedItems.push({
      id: 'blue-sphere',
      object: sphereMesh,
      basePos: new THREE.Vector3(5.7, 2.4, -0.4),
      baseRot: sphereMesh.rotation.clone(),
      floatSpeed: 0.85,
      floatDistance: 0.26,
      rotSpeed: new THREE.Vector3(0.12, 0.18, 0.08),
      parallaxFactor: 0.05,
    });

    // -------------------------------------------------------------
    // 4. MAGENTA 3D STARBURST (Bottom-Right Flank)
    // -------------------------------------------------------------
    const starShape = new THREE.Shape();
    const starSpikes = 14;
    const outerRadius = 0.95;
    const innerRadius = 0.58;

    for (let i = 0; i < starSpikes * 2; i++) {
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (Math.PI * i) / starSpikes - Math.PI / 2;
      const x = r * Math.cos(angle);
      const y = r * Math.sin(angle);
      if (i === 0) starShape.moveTo(x, y);
      else starShape.lineTo(x, y);
    }
    starShape.closePath();

    const starGeom = new THREE.ExtrudeGeometry(starShape, {
      depth: 0.28,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.05,
      bevelSegments: 3,
    });
    starGeom.center();

    const starMat = new THREE.MeshPhysicalMaterial({
      color: 0xff3366,
      roughness: 0.24,
      metalness: 0.22,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
      reflectivity: 0.85,
    });

    const starMesh = track(new THREE.Mesh(starGeom, starMat));
    starMesh.rotation.set(0.1, 0.2, 0);
    masterGroup.add(starMesh);

    animatedItems.push({
      id: 'magenta-star',
      object: starMesh,
      basePos: new THREE.Vector3(5.6, -2.4, 0.3),
      baseRot: starMesh.rotation.clone(),
      floatSpeed: 1.0,
      floatDistance: 0.22,
      rotSpeed: new THREE.Vector3(0.08, 0.1, 0.5), // Prominent Z-rotation spin
      parallaxFactor: 0.07,
    });

    // -------------------------------------------------------------
    // 5. RED OVERLAPPING TRANSLUCENT DISCS / TORUSES (Bottom-Left Flank)
    // -------------------------------------------------------------
    const redTranslucentMat = new THREE.MeshPhysicalMaterial({
      color: 0xff0033,
      transparent: true,
      opacity: 0.55,
      roughness: 0.16,
      metalness: 0.1,
      clearcoat: 0.95,
      clearcoatRoughness: 0.08,
      depthWrite: false, // Prevents Z-sorting artifacts between overlapping translucent meshes
    });

    const redGroup = new THREE.Group();

    // Torus Ring 1 (Outer Ring)
    const torusGeom1 = new THREE.TorusGeometry(1.08, 0.22, 28, 54);
    const torusMesh1 = track(new THREE.Mesh(torusGeom1, redTranslucentMat));
    torusMesh1.rotation.set(Math.PI / 3, 0.3, 0);
    redGroup.add(torusMesh1);

    // Torus Ring 2 (Inner Intersecting Ring)
    const torusGeom2 = new THREE.TorusGeometry(0.74, 0.16, 24, 48);
    const torusMesh2 = track(new THREE.Mesh(torusGeom2, redTranslucentMat));
    torusMesh2.position.set(0.35, -0.2, 0.25);
    torusMesh2.rotation.set(-Math.PI / 4, 0.5, 0.2);
    redGroup.add(torusMesh2);

    masterGroup.add(redGroup);

    animatedItems.push({
      id: 'red-torus-group',
      object: redGroup,
      basePos: new THREE.Vector3(-5.5, -2.3, -0.3),
      baseRot: redGroup.rotation.clone(),
      floatSpeed: 0.95,
      floatDistance: 0.2,
      rotSpeed: new THREE.Vector3(0.2, 0.25, 0.15),
      parallaxFactor: 0.065,
    });

    // -------------------------------------------------------------
    // Responsive Frustum & Dynamic Aspect-Ratio Mapping
    // Repositions shapes to hug the outer left & right margins
    // while keeping the center safe zone completely pristine!
    // -------------------------------------------------------------
    const updateResponsiveLayout = () => {
      const currentWidth = container.clientWidth || window.innerWidth;
      const currentHeight = container.clientHeight || 650;

      camera.aspect = currentWidth / currentHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentWidth, currentHeight);

      // Frustum calculation in Three.js world coordinates at z=0 plane (distance=11)
      const vFovRad = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(vFovRad / 2) * camera.position.z;
      const visibleWidth = visibleHeight * camera.aspect;
      const halfW = visibleWidth / 2;
      const halfH = visibleHeight / 2;

      // Find individual item records
      const greenTri = animatedItems.find((i) => i.id === 'green-triangle');
      const yellowCube = animatedItems.find((i) => i.id === 'yellow-cube-1');
      const yellowBox = animatedItems.find((i) => i.id === 'yellow-box-2');
      const blueSph = animatedItems.find((i) => i.id === 'blue-sphere');
      const magentaStar = animatedItems.find((i) => i.id === 'magenta-star');
      const redTorus = animatedItems.find((i) => i.id === 'red-torus-group');

      if (currentWidth < 640) {
        // MOBILE (< 640px):
        // Scale elements down smoothly and tuck them into peripheral corners / extremes
        // to leave the central vertical corridor entirely clear of obstruction.
        masterGroup.scale.set(0.58, 0.58, 0.58);

        // Top periphery
        if (yellowCube) yellowCube.basePos.set(-halfW * 0.74, halfH * 0.82, -0.5);
        if (blueSph) blueSph.basePos.set(halfW * 0.74, halfH * 0.82, -0.4);

        // Mid periphery
        if (greenTri) greenTri.basePos.set(-halfW * 0.88, halfH * 0.25, 0.3);
        if (yellowBox) yellowBox.basePos.set(halfW * 0.88, -halfH * 0.22, 0.4);

        // Bottom periphery
        if (redTorus) redTorus.basePos.set(-halfW * 0.74, -halfH * 0.82, -0.3);
        if (magentaStar) magentaStar.basePos.set(halfW * 0.74, -halfH * 0.82, 0.3);
      } else if (currentWidth < 1024) {
        // TABLET (640px - 1023px):
        // Push shapes to 82%-88% of half-width, framing the headline gracefully
        masterGroup.scale.set(0.76, 0.76, 0.76);

        // Left Flank
        if (yellowCube) yellowCube.basePos.set(-halfW * 0.82, halfH * 0.62, -0.5);
        if (greenTri) greenTri.basePos.set(-halfW * 0.87, halfH * 0.02, 0.4);
        if (redTorus) redTorus.basePos.set(-halfW * 0.80, -halfH * 0.64, -0.3);

        // Right Flank
        if (blueSph) blueSph.basePos.set(halfW * 0.82, halfH * 0.60, -0.4);
        if (yellowBox) yellowBox.basePos.set(halfW * 0.87, halfH * 0.04, 0.5);
        if (magentaStar) magentaStar.basePos.set(halfW * 0.80, -halfH * 0.64, 0.3);
      } else {
        // DESKTOP & ULTRAWIDE (>= 1024px):
        // Dynamically tracks aspect ratio so elements spread all the way into the outer margins.
        // Ultrawide (21:9 or 32:9) monitors seamlessly extend without dark dead corners!
        masterGroup.scale.set(1.0, 1.0, 1.0);

        // Left Margin (Outer Flank)
        if (yellowCube) yellowCube.basePos.set(-halfW * 0.82, halfH * 0.58, -0.5);
        if (greenTri) greenTri.basePos.set(-halfW * 0.86, halfH * 0.04, 0.4);
        if (redTorus) redTorus.basePos.set(-halfW * 0.78, -halfH * 0.60, -0.3);

        // Right Margin (Outer Flank)
        if (blueSph) blueSph.basePos.set(halfW * 0.82, halfH * 0.56, -0.4);
        if (yellowBox) yellowBox.basePos.set(halfW * 0.86, halfH * 0.06, 0.5);
        if (magentaStar) magentaStar.basePos.set(halfW * 0.78, -halfH * 0.58, 0.3);
      }

      // Snap current objects to basePos immediately
      for (const item of animatedItems) {
        item.object.position.copy(item.basePos);
      }
    };

    updateResponsiveLayout();

    // -------------------------------------------------------------
    // Mouse Pointer & Physics State (Full-Viewport Parallax)
    // -------------------------------------------------------------
    const mouse = {
      targetX: 0,
      targetY: 0,
      currentX: 0,
      currentY: 0,
    };

    const handlePointerMove = (e: MouseEvent) => {
      // Map smoothly across the entire viewport for natural tilt
      const xRatio = (e.clientX / window.innerWidth) * 2 - 1;
      const yRatio = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.targetX = Math.max(-1, Math.min(1, xRatio));
      mouse.targetY = Math.max(-1, Math.min(1, yRatio));
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Use ResizeObserver for accurate container tracking alongside window resize
    const resizeObserver = new ResizeObserver(() => {
      updateResponsiveLayout();
    });
    resizeObserver.observe(container);

    const handleResize = () => {
      updateResponsiveLayout();
    };
    window.addEventListener('resize', handleResize);

    // -------------------------------------------------------------
    // Render Loop with Damped Inertia & Software WebGL Pacing
    // -------------------------------------------------------------
    let frameId = 0;
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
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Silky-smooth exponential spring damping for mouse parallax
      mouse.currentX = THREE.MathUtils.damp(mouse.currentX, mouse.targetX, 3.8, delta);
      mouse.currentY = THREE.MathUtils.damp(mouse.currentY, mouse.targetY, 3.8, delta);

      // Tilt entire master group gently with mouse
      masterGroup.rotation.y = mouse.currentX * 0.18;
      masterGroup.rotation.x = -mouse.currentY * 0.14;

      // Update individual 3D shapes with idle sinusoidal float & rotation
      for (let i = 0; i < animatedItems.length; i++) {
        const item = animatedItems[i];
        const idleOffset = Math.sin(elapsed * item.floatSpeed + i * 1.3) * item.floatDistance;
        const reactiveX = mouse.currentX * item.parallaxFactor * 4;
        const reactiveY = mouse.currentY * item.parallaxFactor * 4;

        item.object.position.y = item.basePos.y + idleOffset + reactiveY;
        item.object.position.x = item.basePos.x + reactiveX;

        item.object.rotation.x += item.rotSpeed.x * delta;
        item.object.rotation.y += item.rotSpeed.y * delta;
        item.object.rotation.z += item.rotSpeed.z * delta;
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(animate);
      } else {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    // -------------------------------------------------------------
    // Comprehensive Disposal & Cleanup on Unmount
    // -------------------------------------------------------------
    return () => {
      if (isSoftwareGl) {
        clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }

      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();

      // Clean up Three.js scene resources
      geometriesToDispose.forEach((g) => g.dispose());
      materialsToDispose.forEach((m) => m.dispose());
      roomEnvTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`hero-3d-scene absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
