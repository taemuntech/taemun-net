'use client';

import React, { useState, useEffect, useRef } from 'react';
import { POLYHEDRONS } from '../data/eulerData';
import { PolyhedronData } from '../types';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export function InteractiveGeometryLab() {
  const [selectedShape, setSelectedShape] = useState<PolyhedronData>(POLYHEDRONS[1]); // Cube
  const [rotSpeed, setRotSpeed] = useState<number>(1);
  const [isRotating, setIsRotating] = useState<boolean>(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3D Geometry definitions for Platonic solids
  const getVertices = (id: string): Point3D[] => {
    const s = 70;
    if (id === 'tetrahedron') {
      return [
        { x: s, y: s, z: s },
        { x: -s, y: -s, z: s },
        { x: -s, y: s, z: -s },
        { x: s, y: -s, z: -s },
      ];
    }
    if (id === 'octahedron') {
      return [
        { x: s * 1.3, y: 0, z: 0 },
        { x: -s * 1.3, y: 0, z: 0 },
        { x: 0, y: s * 1.3, z: 0 },
        { x: 0, y: -s * 1.3, z: 0 },
        { x: 0, y: 0, z: s * 1.3 },
        { x: 0, y: 0, z: -s * 1.3 },
      ];
    }
    // Default cube
    return [
      { x: -s, y: -s, z: -s },
      { x: s, y: -s, z: -s },
      { x: s, y: s, z: -s },
      { x: -s, y: s, z: -s },
      { x: -s, y: -s, z: s },
      { x: s, y: -s, z: s },
      { x: s, y: s, z: s },
      { x: -s, y: s, z: s },
    ];
  };

  const getEdges = (id: string): [number, number][] => {
    if (id === 'tetrahedron') {
      return [
        [0, 1], [0, 2], [0, 3],
        [1, 2], [1, 3], [2, 3],
      ];
    }
    if (id === 'octahedron') {
      return [
        [0, 2], [0, 3], [0, 4], [0, 5],
        [1, 2], [1, 3], [1, 4], [1, 5],
        [2, 4], [4, 3], [3, 5], [5, 2],
      ];
    }
    // Cube
    return [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7],
    ];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angleX = 0;
    let angleY = 0;
    let animId: number;

    const vertices = getVertices(selectedShape.id);
    const edges = getEdges(selectedShape.id);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Rotate and project points
      const radX = angleX * (Math.PI / 180);
      const radY = angleY * (Math.PI / 180);

      const projected: { x: number; y: number }[] = vertices.map((v) => {
        // Rotate Y
        const x1 = v.x * Math.cos(radY) + v.z * Math.sin(radY);
        const z1 = -v.x * Math.sin(radY) + v.z * Math.cos(radY);
        // Rotate X
        const y2 = v.y * Math.cos(radX) - z1 * Math.sin(radX);
        const z2 = v.y * Math.sin(radX) + z1 * Math.cos(radX);

        const fov = 300;
        const scale = fov / (fov + z2);
        return {
          x: cx + x1 * scale,
          y: cy + y2 * scale,
        };
      });

      // Draw Edges
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 2;
      edges.forEach(([p1, p2]) => {
        if (projected[p1] && projected[p2]) {
          ctx.beginPath();
          ctx.moveTo(projected[p1].x, projected[p1].y);
          ctx.lineTo(projected[p2].x, projected[p2].y);
          ctx.stroke();
        }
      });

      // Draw Vertices
      projected.forEach((p, idx) => {
        ctx.fillStyle = idx === 0 ? '#F43F5E' : '#38BDF8';
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      if (isRotating) {
        angleX += 0.4 * rotSpeed;
        angleY += 0.7 * rotSpeed;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [selectedShape, rotSpeed, isRotating]);

  return (
    <section id="geometry-lab" className="py-20 lg:py-28 bg-[#0F1420] border-y border-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-2">
            INTERACTIVE POLYHEDRON LAB
          </span>
          <h2 className="text-2xl lg:text-4xl font-mono font-extrabold text-white tracking-tight">
            오일러 다면체 정리 (Euler&apos;s Formula) 시뮬레이터
          </h2>
          <p className="text-xs lg:text-sm text-slate-400 mt-2">
            플라톤의 정다면체를 직접 회전시키며 꼭짓점(V), 모서리(E), 면(F) 간의 위상수학적 불변량 V - E + F = 2 를 검증해 보십시오.
          </p>
        </div>

        {/* 3D Lab Container */}
        <div className="bg-[#131926] border border-[#232F46] rounded-3xl p-6 lg:p-10 shadow-2xl">
          {/* Shape Selection Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {POLYHEDRONS.map((poly) => {
              const isSelected = selectedShape.id === poly.id;
              return (
                <button
                  key={poly.id}
                  onClick={() => setSelectedShape(poly)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer min-h-[44px] flex items-center ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                      : 'bg-[#1C2538] text-slate-300 hover:text-white hover:bg-[#25324A]'
                  }`}
                >
                  {poly.koreanName.split(' ')[0]}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 3D Canvas Box (7 Cols) */}
            <div className="lg:col-span-7 bg-[#0A0D14] border border-[#1E293B] rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden h-[340px] lg:h-[420px]">
              <canvas
                ref={canvasRef}
                width={500}
                height={380}
                className="max-w-full h-full object-contain cursor-grab active:cursor-grabbing"
              />

              {/* Controls Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-4 bg-[#131926]/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-[#232F46]">
                <button
                  onClick={() => setIsRotating(!isRotating)}
                  className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 cursor-pointer min-h-[36px] flex items-center"
                >
                  {isRotating ? '⏸️ 일시정지' : '▶️ 자동회전'}
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono">Speed</span>
                  <input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.1"
                    value={rotSpeed}
                    onChange={(e) => setRotSpeed(Number(e.target.value))}
                    className="w-20 accent-cyan-400 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-cyan-300 w-8">{rotSpeed}x</span>
                </div>
              </div>
            </div>

            {/* Formula & Metrics Box (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest block mb-1">
                  TOPOLOGICAL INVARIANT
                </span>
                <h3 className="text-xl lg:text-2xl font-mono font-bold text-white mb-2">
                  {selectedShape.koreanName}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {selectedShape.description}
                </p>
              </div>

              {/* Formula HUD Display */}
              <div className="p-6 rounded-2xl bg-[#0A0D14] border border-cyan-500/30">
                <div className="text-center mb-4">
                  <span className="text-xs font-mono text-slate-400 block mb-1">Euler&apos;s Characteristic (&Chi;)</span>
                  <p className="text-2xl lg:text-3xl font-mono font-black text-cyan-400">
                    V - E + F = 2
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-800 text-center font-mono">
                  <div className="p-2.5 rounded-xl bg-[#131926]">
                    <span className="text-[10px] text-slate-400 block">꼭짓점 (V)</span>
                    <span className="text-lg font-bold text-white">{selectedShape.vertices}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#131926]">
                    <span className="text-[10px] text-slate-400 block">모서리 (E)</span>
                    <span className="text-lg font-bold text-white">{selectedShape.edges}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#131926]">
                    <span className="text-[10px] text-slate-400 block">면 (F)</span>
                    <span className="text-lg font-bold text-white">{selectedShape.faces}</span>
                  </div>
                </div>

                <div className="mt-4 p-2.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-center">
                  <span className="text-xs font-mono text-cyan-300">
                    {selectedShape.vertices} - {selectedShape.edges} + {selectedShape.faces} = {selectedShape.vertices - selectedShape.edges + selectedShape.faces} (성립 확인)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
