"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import * as THREE from "three";

interface StarFieldProps {
  count?: number;
  className?: string;
}

export default function StarField({ count = 3000, className }: StarFieldProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const nebulaRef = useRef<THREE.Points | null>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!mountRef.current) return;
    const mount = mountRef.current;
    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 2000);
    camera.position.z = 400;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ── Stars ──────────────────────────────────────────────────────────────
    const starPositions = new Float32Array(count * 3);
    const starColors = new Float32Array(count * 3);
    const starSizes = new Float32Array(count);

    // Colour palette: white, cool blue, warm gold, soft purple
    const palette = [
      new THREE.Color(0xffffff),
      new THREE.Color(0x9ee6ff),
      new THREE.Color(0xffeaaa),
      new THREE.Color(0xc4b5fd),
      new THREE.Color(0x67e8f9),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Distribute in a sphere shell
      const radius = 200 + Math.random() * 800;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      starPositions[i3 + 2] = radius * Math.cos(phi);

      const colour = palette[Math.floor(Math.random() * palette.length)];
      starColors[i3] = colour.r;
      starColors[i3 + 1] = colour.g;
      starColors[i3 + 2] = colour.b;

      starSizes[i] = Math.random() < 0.05 ? Math.random() * 3 + 2 : Math.random() * 1.5 + 0.3;
    }

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));
    starGeo.setAttribute("size", new THREE.BufferAttribute(starSizes, 1));

    const starMat = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vSize;
        void main() {
          vColor = color;
          vSize = size;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vSize;
        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float dist = length(uv);
          if (dist > 0.5) discard;
          // Soft glow falloff
          float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
          alpha = pow(alpha, 1.5);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);
    starsRef.current = stars;

    // ── Nebula cloud (coloured particles) ──────────────────────────────────
    const nebulaCount = 300;
    const nebPos = new Float32Array(nebulaCount * 3);
    const nebColors = new Float32Array(nebulaCount * 3);
    const nebSizes = new Float32Array(nebulaCount);
    const nebulaColors = [
      new THREE.Color(0x7c3aed),
      new THREE.Color(0x0891b2),
      new THREE.Color(0x4f46e5),
      new THREE.Color(0x059669),
    ];

    for (let i = 0; i < nebulaCount; i++) {
      const i3 = i * 3;
      // Cluster around centre with gaussian-ish spread
      const r = (Math.random() + Math.random()) * 120;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      nebPos[i3] = r * Math.sin(phi) * Math.cos(theta);
      nebPos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.5;
      nebPos[i3 + 2] = r * Math.cos(phi) - 100;

      const c = nebulaColors[Math.floor(Math.random() * nebulaColors.length)];
      nebColors[i3] = c.r;
      nebColors[i3 + 1] = c.g;
      nebColors[i3 + 2] = c.b;
      nebSizes[i] = Math.random() * 8 + 4;
    }

    const nebGeo = new THREE.BufferGeometry();
    nebGeo.setAttribute("position", new THREE.BufferAttribute(nebPos, 3));
    nebGeo.setAttribute("color", new THREE.BufferAttribute(nebColors, 3));
    nebGeo.setAttribute("size", new THREE.BufferAttribute(nebSizes, 1));

    const nebMat = new THREE.ShaderMaterial({
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (250.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          vec2 uv = gl_PointCoord - vec2(0.5);
          float dist = length(uv);
          if (dist > 0.5) discard;
          float alpha = 1.0 - smoothstep(0.1, 0.5, dist);
          alpha = pow(alpha, 2.0) * 0.35;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const nebula = new THREE.Points(nebGeo, nebMat);
    scene.add(nebula);
    nebulaRef.current = nebula;

    // ── Mouse parallax ──────────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // ── Resize ──────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mount || !renderer || !camera) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ──────────────────────────────────────────────────────
    let t = 0;
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      t += 0.0004;

      if (stars) {
        stars.rotation.x = mouseRef.current.y * 0.05 + t * 0.3;
        stars.rotation.y = mouseRef.current.x * 0.05 + t;
      }
      if (nebula) {
        nebula.rotation.x = mouseRef.current.y * 0.03 + t * 0.15;
        nebula.rotation.y = mouseRef.current.x * 0.03 + t * 0.5;
        nebula.rotation.z = t * 0.1;
      }

      // Gentle camera drift
      camera.position.x += (mouseRef.current.x * 15 - camera.position.x) * 0.02;
      camera.position.y += (mouseRef.current.y * 10 - camera.position.y) * 0.02;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      starGeo.dispose();
      starMat.dispose();
      nebGeo.dispose();
      nebMat.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Opacity based on theme (lighter in light mode)
  const opacity = resolvedTheme === "dark" ? 1 : 0.4;

  return (
    <div
      ref={mountRef}
      className={className}
      style={{
        opacity,
        transition: "opacity 0.5s ease",
      }}
      aria-hidden
    />
  );
}
