'use client';

import React, { useState } from 'react';
import { RADAR_CATEGORIES } from '../data/ivyData';
import { AdmissionCompetency } from '../types';

export function InteractiveAdmissionRadar() {
  const [competencies, setCompetencies] = useState<AdmissionCompetency[]>(RADAR_CATEGORIES);
  const [selectedCategory, setSelectedCategory] = useState<AdmissionCompetency>(RADAR_CATEGORIES[0]);

  // Digital SAT Telemetry States
  const [targetCollege, setTargetCollege] = useState<'H-Univ' | 'M-Tech' | 'C-Univ' | 'K-Univ'>('H-Univ');
  const [satRW, setSatRW] = useState<number>(760);
  const [satMath, setSatMath] = useState<number>(790);

  const collegeCutoffs: Record<string, { p25: number; p75: number; avgGPA: string }> = {
    'H-Univ': { p25: 1510, p75: 1580, avgGPA: '4.00 / 4.18' },
    'M-Tech': { p25: 1530, p75: 1580, avgGPA: '4.00 / 4.17' },
    'C-Univ': { p25: 1490, p75: 1560, avgGPA: '3.98 / 4.15' },
    'K-Univ': { p25: 1450, p75: 1540, avgGPA: '3.90 / 4.08' },
  };

  const totalSat = satRW + satMath;

  // Preset Handlers
  const applyPreset = (type: 'ivy' | 'boarding' | 'average') => {
    if (type === 'ivy') {
      setCompetencies([
        { ...competencies[0], score: 98 },
        { ...competencies[1], score: 99 },
        { ...competencies[2], score: 95 },
        { ...competencies[3], score: 94 },
        { ...competencies[4], score: 92 },
        { ...competencies[5], score: 96 },
      ]);
    } else if (type === 'boarding') {
      setCompetencies([
        { ...competencies[0], score: 96 },
        { ...competencies[1], score: 92 },
        { ...competencies[2], score: 85 },
        { ...competencies[3], score: 92 },
        { ...competencies[4], score: 88 },
        { ...competencies[5], score: 95 },
      ]);
    } else {
      setCompetencies([
        { ...competencies[0], score: 75 },
        { ...competencies[1], score: 72 },
        { ...competencies[2], score: 65 },
        { ...competencies[3], score: 68 },
        { ...competencies[4], score: 55 },
        { ...competencies[5], score: 70 },
      ]);
    }
  };

  // Helper: Radar coordinates for 6 axes
  const center = { x: 180, y: 180 };
  const radius = 130;
  const numAxes = 6;

  const getCoordinates = (index: number, val: number) => {
    const angle = (Math.PI * 2 / numAxes) * index - Math.PI / 2;
    const r = (val / 100) * radius;
    return {
      x: center.x + r * Math.cos(angle),
      y: center.y + r * Math.sin(angle),
    };
  };

  const polygonPoints = competencies
    .map((c, i) => {
      const pt = getCoordinates(i, c.score);
      return `${pt.x},${pt.y}`;
    })
    .join(' ');

  return (
    <section id="radar-lab" className="py-16 lg:py-24 bg-[#120207] border-b border-rose-900/30 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-serif text-amber-400 uppercase tracking-widest mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Holistic Admissions Telemetry
            </div>
            <h2 className="text-2xl lg:text-4xl font-serif font-bold text-white">
              6대 입시역량 Radar &amp; Digital SAT 진단기
            </h2>
            <p className="text-sm text-rose-200/70 mt-2 max-w-2xl font-sans">
              GPA, SAT, AP, 과외활동, 수상 실적, 에세이의 6대 핵심 영역을 시각화하고
              목표 명문대 합격선과의 갭을 실시간으로 분석하십시오.
            </p>
          </div>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2 font-serif">
            <button
              type="button"
              onClick={() => applyPreset('ivy')}
              className="px-3 py-1.5 rounded-lg bg-rose-950 border border-amber-500/40 text-xs text-amber-200 hover:bg-rose-900 transition-all cursor-pointer shadow-sm"
            >
              아이비리그 합격권 프리셋 (예시)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('boarding')}
              className="px-3 py-1.5 rounded-lg bg-rose-950 border border-rose-800 text-xs text-rose-200 hover:bg-rose-900 transition-all cursor-pointer"
            >
              Top 20 보딩스쿨 프리셋 (예시)
            </button>
            <button
              type="button"
              onClick={() => applyPreset('average')}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 hover:text-white transition-all cursor-pointer"
            >
              일반 지원자 평균선 (예시)
            </button>
          </div>
        </div>

        {/* 2-Column Lab Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* Left: SVG Radar Chart */}
          <div className="lg:col-span-6 bg-[#1A030A] border border-rose-900/40 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-rose-900/30 mb-4 text-xs font-serif text-rose-300">
              <span>6-AXIS COMPETENCY MATRIX</span>
              <span className="text-amber-400">SCORE: {Math.round(competencies.reduce((a, b) => a + b.score, 0) / 6)}/100</span>
            </div>

            <div className="w-full h-80 flex items-center justify-center relative">
              <svg viewBox="0 0 360 360" className="w-full h-full select-none">
                {/* Background circles / polygons (20%, 40%, 60%, 80%, 100%) */}
                {[0.2, 0.4, 0.6, 0.8, 1.0].map((level, lIdx) => {
                  const pts = Array.from({ length: 6 })
                    .map((_, i) => {
                      const pt = getCoordinates(i, level * 100);
                      return `${pt.x},${pt.y}`;
                    })
                    .join(' ');
                  return (
                    <polygon
                      key={lIdx}
                      points={pts}
                      fill="none"
                      stroke="#4C0519"
                      strokeWidth={lIdx === 4 ? '1.5' : '1'}
                      strokeDasharray={lIdx === 4 ? 'none' : '3 3'}
                    />
                  );
                })}

                {/* Axes lines */}
                {Array.from({ length: 6 }).map((_, i) => {
                  const pt = getCoordinates(i, 100);
                  return (
                    <line
                      key={i}
                      x1={center.x}
                      y1={center.y}
                      x2={pt.x}
                      y2={pt.y}
                      stroke="#4C0519"
                      strokeWidth="1.2"
                    />
                  );
                })}

                {/* Filled Radar Area */}
                <polygon
                  points={polygonPoints}
                  fill="rgba(244, 63, 94, 0.25)"
                  stroke="#F43F5E"
                  strokeWidth="2.5"
                  className="transition-all duration-300 ease-out"
                />

                {/* Vertex Dots & Click Triggers */}
                {competencies.map((c, i) => {
                  const pt = getCoordinates(i, c.score);
                  const isSel = selectedCategory.key === c.key;
                  return (
                    <g key={c.key} onClick={() => setSelectedCategory(c)} className="cursor-pointer">
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isSel ? 7 : 5}
                        fill={isSel ? '#F59E0B' : '#FB7185'}
                        stroke="#FFF"
                        strokeWidth="1.5"
                        className="transition-all duration-200"
                      />
                    </g>
                  );
                })}

                {/* Axis Labels */}
                {competencies.map((c, i) => {
                  const labelPt = getCoordinates(i, 118);
                  const isSel = selectedCategory.key === c.key;
                  return (
                    <text
                      key={c.key}
                      x={labelPt.x}
                      y={labelPt.y + 4}
                      textAnchor="middle"
                      fill={isSel ? '#F59E0B' : '#FECDD3'}
                      fontSize="10"
                      fontFamily="serif"
                      fontWeight={isSel ? 'bold' : 'normal'}
                      onClick={() => setSelectedCategory(c)}
                      className="cursor-pointer select-none"
                    >
                      {c.name.split(' ')[0]}
                    </text>
                  );
                })}
              </svg>
            </div>

            {/* Slider Controls for Selected Axis */}
            <div className="pt-4 border-t border-rose-900/40">
              <div className="flex justify-between text-xs font-serif mb-2">
                <span className="text-rose-200/80">[{selectedCategory.name}] 점수 조절:</span>
                <span className="text-amber-400 font-bold">{selectedCategory.score}점</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={selectedCategory.score}
                onChange={(e) => {
                  const newScore = Number(e.target.value);
                  setCompetencies((prev) =>
                    prev.map((c) => (c.key === selectedCategory.key ? { ...c, score: newScore } : c))
                  );
                  setSelectedCategory((prev) => ({ ...prev, score: newScore }));
                }}
                className="w-full accent-amber-500 h-2 bg-rose-950 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Right: Category Strategy Detail Card */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-3xl bg-[#1C040C] border border-amber-500/30 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-serif px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  AREA SPECIFICATION
                </span>
                <span className="text-xs font-mono text-rose-300/60">
                  WEIGHT: 16.6%
                </span>
              </div>

              <h3 className="text-xl font-serif font-bold text-white mb-2">
                {selectedCategory.name}
              </h3>
              <p className="text-xs text-rose-100/80 leading-relaxed mb-6">
                {selectedCategory.description}
              </p>

              <div className="p-4 rounded-2xl bg-rose-950/60 border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed mb-6 font-sans">
                <span className="font-bold text-amber-300 font-serif block mb-1">
                  💡 아이비 프렙 전략 솔루션:
                </span>
                {selectedCategory.strategy}
              </div>

              <div className="space-y-2 pt-4 border-t border-rose-900/40">
                <span className="text-xs text-rose-300/70 font-serif block">
                  빠른 영역 탐색:
                </span>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                  {competencies.map((c) => (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => setSelectedCategory(c)}
                      className={`p-2 rounded-xl text-left text-xs font-serif transition-all cursor-pointer ${
                        selectedCategory.key === c.key
                          ? 'bg-rose-800/80 border border-amber-400 text-amber-200 font-bold'
                          : 'bg-rose-950 border border-rose-900 text-rose-300/70 hover:text-white'
                      }`}
                    >
                      {c.name.split(' ')[0]} ({c.score}점)
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Digital SAT Score Telemetry Box */}
        <div id="sat-telemetry" className="p-6 lg:p-8 rounded-3xl bg-[#1A030A] border border-amber-500/30 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
            <div>
              <span className="text-xs font-serif text-amber-400 font-bold block mb-1">
                DIGITAL SAT 1600 PREDICTOR
              </span>
              <h3 className="text-xl font-serif font-bold text-white">
                목표 대학별 Digital SAT 합격 컷라인 비교 텔레메트리 (예시)
              </h3>
            </div>

            {/* University Selector */}
            <div className="flex gap-2">
              {(['H-Univ', 'M-Tech', 'C-Univ', 'K-Univ'] as const).map((uni) => (
                <button
                  key={uni}
                  type="button"
                  onClick={() => setTargetCollege(uni)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all cursor-pointer ${
                    targetCollege === uni
                      ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                      : 'bg-rose-950 border border-rose-900 text-rose-300 hover:text-white'
                  }`}
                >
                  {uni}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-serif mb-1">
                  <span className="text-rose-200">Reading &amp; Writing (RW):</span>
                  <span className="text-amber-300 font-bold">{satRW}점 / 800</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="800"
                  step="10"
                  value={satRW}
                  onChange={(e) => setSatRW(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-rose-950 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-serif mb-1">
                  <span className="text-rose-200">Mathematics (Math):</span>
                  <span className="text-amber-300 font-bold">{satMath}점 / 800</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="800"
                  step="10"
                  value={satMath}
                  onChange={(e) => setSatMath(Number(e.target.value))}
                  className="w-full accent-amber-500 h-1.5 bg-rose-950 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-rose-900/50 text-center">
              <span className="text-xs text-rose-300/70 font-serif block mb-1">
                예상 총점 (Total SAT)
              </span>
              <span className="text-3xl lg:text-4xl font-serif font-black text-amber-300">
                {totalSat}
              </span>
              <span className="text-xs text-rose-200/50 block mt-1">
                / 1600 만점
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/40 border border-amber-500/20 text-xs font-serif space-y-2">
              <div className="flex justify-between">
                <span className="text-rose-200">{targetCollege} 25th~75th:</span>
                <span className="text-white font-bold">
                  {collegeCutoffs[targetCollege].p25} ~ {collegeCutoffs[targetCollege].p75}점 (예시)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-rose-200">합격생 평균 GPA:</span>
                <span className="text-white font-bold">{collegeCutoffs[targetCollege].avgGPA} (예시)</span>
              </div>
              <div className="pt-2 border-t border-rose-900/40">
                <span className={`font-bold ${totalSat >= collegeCutoffs[targetCollege].p75 ? 'text-emerald-400' : totalSat >= collegeCutoffs[targetCollege].p25 ? 'text-amber-300' : 'text-rose-400'}`}>
                  {totalSat >= collegeCutoffs[targetCollege].p75
                    ? '상위 75th(예시) 백분위 이상 상위권 경쟁력 확보'
                    : totalSat >= collegeCutoffs[targetCollege].p25
                    ? '✓ 합격 가능 범위 (에세이 및 EC 차별화 필수)'
                    : '▲ 점수 향상 집중 트레이닝 권장'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
