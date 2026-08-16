/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { gsap } from 'gsap';
import { Network, Zap, Cpu, Server, Compass, Layers, Milestone, Radio, ShieldCheck } from 'lucide-react';

interface CityHub {
  id: string;
  name: string;
  coordinates: { x: number; y: number; z: number };
  activeFleets: number;
  clearingVolume: number; // AED/mo
  qualityScore: number;
  contracts: number;
}

export default function GccNetworkScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('dxb');
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const [particleSpeed, setParticleSpeed] = useState<number>(1);
  const [totalSimulatedSpillovers, setTotalSimulatedSpillovers] = useState<number>(134);

  // GCC Hubs config
  const cityHubs: CityHub[] = [
    {
      id: 'dxb',
      name: 'Dubai (Hub Alpha)',
      coordinates: { x: 4, y: 0.5, z: -1 },
      activeFleets: 45,
      clearingVolume: 1250000,
      qualityScore: 98,
      contracts: 24,
    },
    {
      id: 'ruh',
      name: 'Riyadh (KSA Core)',
      coordinates: { x: -3, y: 0.2, z: 2 },
      activeFleets: 32,
      clearingVolume: 980000,
      qualityScore: 96,
      contracts: 18,
    },
    {
      id: 'doh',
      name: 'Doha (West Bay)',
      coordinates: { x: 1, y: 0.1, z: 0.5 },
      activeFleets: 18,
      clearingVolume: 490000,
      qualityScore: 94,
      contracts: 11,
    },
    {
      id: 'kwi',
      name: 'Kuwait City (HQ)',
      coordinates: { x: -2, y: 0, z: -3 },
      activeFleets: 15,
      clearingVolume: 350000,
      qualityScore: 92,
      contracts: 8,
    },
    {
      id: 'mct',
      name: 'Muscat (Oman Hub)',
      coordinates: { x: 6, y: -0.4, z: -4 },
      activeFleets: 12,
      clearingVolume: 220000,
      qualityScore: 95,
      contracts: 5,
    },
    {
      id: 'bah',
      name: 'Manama (Bahrain Desk)',
      coordinates: { x: 0, y: 0, z: -1.5 },
      activeFleets: 9,
      clearingVolume: 180000,
      qualityScore: 93,
      contracts: 4,
    },
  ];

  const currentCityData = cityHubs.find((c) => c.id === selectedCity) || cityHubs[0];

  // Active particle list for Three.js animations
  const particlesRef = useRef<{
    mesh: THREE.Mesh;
    curve: THREE.CatmullRomCurve3;
    progress: number;
    speed: number;
    source: string;
    target: string;
  }[]>([]);

  const mountedRef = useRef<boolean>(true);
  const timeoutsRef = useRef<any[]>([]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      // Clear active simulated spark timers on unmount
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, []);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const nodeMeshesRef = useRef<Map<string, THREE.Mesh>>(new Map());

  // Function to simulate capacity transfer spark
  const triggerSpilloverSpark = (sourceId: string, targetId: string) => {
    const sourceCity = cityHubs.find((c) => c.id === sourceId);
    const targetCity = cityHubs.find((c) => c.id === targetId);
    if (!sourceCity || !targetCity || !sceneRef.current) return;

    // Get 3D vectors
    const pStart = new THREE.Vector3(sourceCity.coordinates.x, sourceCity.coordinates.y, sourceCity.coordinates.z);
    const pEnd = new THREE.Vector3(targetCity.coordinates.x, targetCity.coordinates.y, targetCity.coordinates.z);

    // Create a quadratic Bezier rise curve for transport flight path
    const pMid = new THREE.Vector3()
      .addVectors(pStart, pEnd)
      .multiplyScalar(0.5);
    pMid.y += 2.0; // Arch height in space

    const curve = new THREE.CatmullRomCurve3([pStart, pMid, pEnd]);

    // Spawn animated golden orb mesh
    const particleGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const particleMat = new THREE.MeshBasicMaterial({
      color: 0xb8943f,
      transparent: true,
      opacity: 0.9,
    });
    const particleMesh = new THREE.Mesh(particleGeo, particleMat);
    sceneRef.current.add(particleMesh);

    particlesRef.current.push({
      mesh: particleMesh,
      curve: curve,
      progress: 0,
      speed: 0.015 * particleSpeed,
      source: sourceCity.name,
      target: targetCity.name,
    });

    if (mountedRef.current) {
      setTotalSimulatedSpillovers((prev) => prev + 1);
    }

    // Temporarily trigger flash on cities scale via GSAP
    const sourceMesh = nodeMeshesRef.current.get(sourceId);
    const targetMesh = nodeMeshesRef.current.get(targetId);
    if (sourceMesh) {
      gsap.to(sourceMesh.scale, { x: 1.6, y: 1.6, z: 1.6, duration: 0.3, yoyo: true, repeat: 1 });
    }
    if (targetMesh) {
      gsap.delayedCall(0.5, () => {
        gsap.to(targetMesh.scale, { x: 1.6, y: 1.6, z: 1.6, duration: 0.3, yoyo: true, repeat: 1 });
      });
    }
  };

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // SCENE & SETUP
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null; // Transparent scene to seamlessly blend into application canvas background

    // CAMERA
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 5, 12);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.maxDistance = 20;
    controls.minDistance = 5;
    controls.maxPolarAngle = Math.PI / 2 + 0.1; // Limit panning too far below horizon
    controlsRef.current = controls;

    // PROCEDURAL GRID LAYER (GCC Floor Plate)
    const gridHelper = new THREE.GridHelper(18, 18, 0x2a2c31, 0x1c1d21);
    gridHelper.position.y = -1;
    scene.add(gridHelper);

    // AMBIENT GLOW LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xb8943f, 4, 30);
    pointLight1.position.set(5, 5, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3b8bd4, 2, 25);
    pointLight2.position.set(-5, 3, -5);
    scene.add(pointLight2);

    // BUILD CITY NODES & HUB CONCENTRIC RINGS
    const meshesMap = new Map<string, THREE.Mesh>();

    cityHubs.forEach((city) => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.set(city.coordinates.x, city.coordinates.y, city.coordinates.z);

      // Main core sphere
      const sphereGeo = new THREE.SphereGeometry(0.25, 32, 32);
      const isAlpha = city.id === 'dxb';
      const isSelected = city.id === selectedCity;

      const sphereMat = new THREE.MeshPhongMaterial({
        color: isAlpha ? 0xb8943f : 0x3b8bd4,
        emissive: isAlpha ? 0x2d2105 : 0x081b2d,
        shininess: 80,
      });

      const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
      nodeGroup.add(sphereMesh);
      meshesMap.set(city.id, sphereMesh);

      // Concentric rings (glowing orbits)
      const ringGeo = new THREE.RingGeometry(0.35, 0.4, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: isAlpha ? 0xb8943f : 0x3b8bd4,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      nodeGroup.add(ringMesh);

      scene.add(nodeGroup);
    });

    nodeMeshesRef.current = meshesMap;

    // BUILD INTERCONNECT LINKS (CORRIDORS)
    const links: [string, string][] = [
      ['dxb', 'ruh'],
      ['dxb', 'doh'],
      ['ruh', 'doh'],
      ['ruh', 'kwi'],
      ['doh', 'bah'],
      ['dxb', 'mct'],
      ['dxb', 'bah'],
      ['kwi', 'bah'],
    ];

    links.forEach(([src, dest]) => {
      const cSrc = cityHubs.find((c) => c.id === src);
      const cDest = cityHubs.find((c) => c.id === dest);
      if (!cSrc || !cDest) return;

      const pStart = new THREE.Vector3(cSrc.coordinates.x, cSrc.coordinates.y, cSrc.coordinates.z);
      const pEnd = new THREE.Vector3(cDest.coordinates.x, cDest.coordinates.y, cDest.coordinates.z);

      // Create high curvature Bezier line
      const pMid = new THREE.Vector3().addVectors(pStart, pEnd).multiplyScalar(0.5);
      pMid.y += 1.5; // Curvature elevation

      const curve = new THREE.CatmullRomCurve3([pStart, pMid, pEnd]);
      const points = curve.getPoints(50);
      const pathGeo = new THREE.BufferGeometry().setFromPoints(points);

      const pathMat = new THREE.LineBasicMaterial({
        color: 0x2a2c31,
        transparent: true,
        opacity: 0.4,
      });

      const line = new THREE.Line(pathGeo, pathMat);
      scene.add(line);
    });

    // CLOUD SCENE ATMOSPHERE PARTICLES (Starry background constellation representation)
    const starsGeo = new THREE.BufferGeometry();
    const starsCount = 120;
    const starsPos = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount * 3; i += 3) {
      starsPos[i] = (Math.random() - 0.5) * 35;
      starsPos[i + 1] = Math.random() * 8;
      starsPos[i + 2] = (Math.random() - 0.5) * 35;
    }

    starsGeo.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
    const starsMat = new THREE.PointsMaterial({
      color: 0xb8943f,
      size: 0.04,
      transparent: true,
      opacity: 0.45,
    });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // ANIMATION LOOP
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Soft rotating orbit of the whole scene
      if (isRotating) {
        scene.rotation.y = elapsedTime * 0.05;
      } else {
        scene.rotation.y = 0; // lock to default axis
      }

      // Animate active particle sparks flowing down roads
      const activeParticles = particlesRef.current;
      for (let i = activeParticles.length - 1; i >= 0; i--) {
        const p = activeParticles[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          // Completed path - remove mesh and data element safely
          scene.remove(p.mesh);
          p.mesh.geometry.dispose();
          if (Array.isArray(p.mesh.material)) {
            p.mesh.material.forEach((m) => m.dispose());
          } else {
            p.mesh.material.dispose();
          }
          activeParticles.splice(i, 1);
        } else {
          // Slide along the Catmull curve path
          const position = p.curve.getPointAt(p.progress);
          p.mesh.position.copy(position);
        }
      }

      // Floating / scaling effects on nodes slightly
      meshesMap.forEach((mesh, id) => {
        mesh.rotation.y += 0.01;
        const baselineScale = id === selectedCity ? 1.3 : 1.0;
        // Idle gentle scale pulse
        const pulse = baselineScale + Math.sin(elapsedTime * 3 + (id.charCodeAt(0) % 5)) * 0.1;
        mesh.scale.set(pulse, pulse, pulse);
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // RESIZE MONITOR
    const handleResize = () => {
      if (!canvasRef.current || !containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Initial camera zoom-in cinematic animation using GSAP
    gsap.from(camera.position, {
      x: 0,
      y: 12,
      z: 22,
      duration: 1.8,
      ease: 'power2.out',
    });

    // Clean up unmounting WebGL elements
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);

      // Clean meshes
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose());
            } else {
              obj.material.dispose();
            }
          }
        }
      });

      controls.dispose();
      renderer.dispose();
    };
  }, [isRotating, particleSpeed]);

  // Adjust camera focus node selectively
  const handleSelectCity = (cityId: string) => {
    setSelectedCity(cityId);

    const city = cityHubs.find((c) => c.id === cityId);
    if (!city || !cameraRef.current || !controlsRef.current) return;

    // Spin camera nicely on node selection using GSAP
    const targetX = city.coordinates.x * 1.5;
    const targetZ = city.coordinates.z * 1.5 + 8;

    gsap.to(cameraRef.current.position, {
      x: targetX,
      y: 4,
      z: targetZ,
      duration: 1.2,
      ease: 'power3.out',
      onUpdate: () => {
        if (controlsRef.current) {
          controlsRef.current.target.set(city.coordinates.x, city.coordinates.y, city.coordinates.z);
        }
      },
    });

    // Trigger instant beautiful flow representation spark to Riyadh or Dubai
    const counterParty = cityId === 'dxb' ? 'ruh' : 'dxb';
    triggerSpilloverSpark(cityId, counterParty);
  };

  return (
    <div className="bg-immersive-surface border border-immersive-border rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl relative">
      <div className="absolute top-0 right-0 z-20 p-4">
        <span className="text-[10px] bg-immersive-gold/10 border border-immersive-gold/30 text-immersive-gold font-mono px-3 py-1 rounded-full flex items-center gap-1.5 uppercase font-bold tracking-widest backdrop-blur">
          <Radio className="w-3.5 h-3.5 animate-pulse shrink-0" />
          WebGL Active Node Network
        </span>
      </div>

      {/* 3D Visualizer WebGL Canvas Node */}
      <div ref={containerRef} className="lg:col-span-8 min-h-[380px] lg:min-h-[460px] relative bg-gradient-to-b from-slate-950 to-immersive-bg/95">
        <canvas ref={canvasRef} className="w-full h-full block absolute inset-0 cursor-grab active:cursor-grabbing z-10" />

        {/* Floating Mini Controller Row */}
        <div className="absolute bottom-4 left-4 z-20 flex gap-2.5 flex-wrap">
          <button
            onClick={() => setIsRotating((prev) => !prev)}
            className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono font-bold uppercase transition flex items-center gap-1.5 ${
              isRotating
                ? 'bg-immersive-gold text-slate-950 border-immersive-gold shadow-md'
                : 'bg-immersive-surface text-immersive-secondary-text border-immersive-border hover:text-slate-200'
            }`}
          >
            <Milestone className="w-3.5 h-3.5" />
            <span>{isRotating ? 'Orbit: Auto' : 'Orbit: Locked'}</span>
          </button>

          <button
            onClick={() => {
              // Trigger multiple random simulation beams
              const cIds = cityHubs.map((c) => c.id);
              for (let i = 0; i < 4; i++) {
                const src = cIds[Math.floor(Math.random() * cIds.length)];
                let dest = cIds[Math.floor(Math.random() * cIds.length)];
                while (src === dest) {
                  dest = cIds[Math.floor(Math.random() * cIds.length)];
                }
                const delay = i * 250;
                const timer = setTimeout(() => {
                  if (mountedRef.current) {
                    triggerSpilloverSpark(src, dest);
                  }
                }, delay);
                timeoutsRef.current.push(timer);
              }
            }}
            className="px-3 py-1.5 rounded-lg bg-immersive-accent hover:bg-immersive-border text-slate-200 hover:text-immersive-gold border border-immersive-border text-[10px] font-mono font-bold uppercase transition flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5 text-immersive-gold" />
            <span>Simulate Multi-Route Spike</span>
          </button>
        </div>
      </div>

      {/* Side Metadata Console Feed */}
      <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-immersive-border p-5 flex flex-col justify-between space-y-5 bg-immersive-bg/50 backdrop-blur-md">
        <div className="space-y-4">
          <div className="border-b border-immersive-border pb-3">
            <span className="text-[10px] text-immersive-secondary-text font-mono uppercase tracking-widest block">GCC Expansion Interface</span>
            <h3 className="text-sm font-bold text-slate-200 mt-1 flex items-center gap-2">
              <Server className="w-4 h-4 text-immersive-gold" />
              <span>Multi-Tenant Network Node</span>
            </h3>
          </div>

          {/* Quick city selector buttons */}
          <div className="grid grid-cols-3 gap-1.5">
            {cityHubs.map((c) => (
              <button
                key={c.id}
                onClick={() => handleSelectCity(c.id)}
                className={`py-1.5 rounded-lg text-[10px] font-mono uppercase font-semibold transition border ${
                  selectedCity === c.id
                    ? 'bg-immersive-gold/10 border-immersive-gold text-immersive-gold font-bold shadow-md shadow-immersive-gold/5'
                    : 'bg-immersive-accent border-immersive-border text-immersive-secondary-text hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {c.id.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Active selection data card */}
          <div className="bg-immersive-surface/90 border border-immersive-border rounded-xl p-4 space-y-3.5">
            <div className="flex justify-between items-center border-b border-immersive-border/40 pb-2">
              <span className="text-xs font-bold text-[#FFFFFF]">{currentCityData.name}</span>
              <span className="text-[9px] font-mono bg-immersive-success/10 border border-immersive-success/20 text-immersive-success px-2 py-0.5 rounded uppercase font-black">
                {currentCityData.qualityScore}% Quality Score
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[9px] text-immersive-secondary-text font-mono uppercase block">Active Alliance Fleets</span>
                <span className="text-sm font-bold text-slate-200 font-mono mt-0.5 block">{currentCityData.activeFleets} Operators</span>
              </div>
              <div>
                <span className="text-[9px] text-immersive-secondary-text font-mono uppercase block">Platform ARR Quota</span>
                <span className="text-sm font-bold text-immersive-gold font-mono mt-0.5 block">
                  AED {(currentCityData.clearingVolume * 12 / 1000000).toFixed(2)}M/yr
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-immersive-border/30 flex justify-between items-center text-[10px] text-immersive-secondary-text">
              <span className="font-mono uppercase">VIP Anchor Contracts:</span>
              <span className="font-bold text-slate-200">{currentCityData.contracts} Corporate Accounts</span>
            </div>
          </div>
        </div>

        {/* Dynamic bottom telemetry metadata panel */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-[10px] border-t border-immersive-border/40 pt-4 text-immersive-secondary-text font-mono uppercase">
            <span>Sparks Dispatched:</span>
            <span className="text-slate-200 font-bold">{totalSimulatedSpillovers} Events</span>
          </div>

          <div className="bg-immersive-accent/60 rounded-lg p-3 text-[10px] text-immersive-secondary-text leading-relaxed">
            <p className="flex items-start gap-1.5 font-sans">
              <ShieldCheck className="w-4 h-4 text-immersive-success shrink-0 mt-0.5" />
              <span>
                Capacity exchange automatically channels demand corridors autonomously using local driver pools to maintain high margin containment.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
