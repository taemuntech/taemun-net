'use client';

import React, { useState } from 'react';
import { COMPETENCY_AXES } from '../data/mockData';

export const RadarChartSection: React.FC = () => {
  const [selectedAxisId, setSelectedAxisId] = useState<string | null>(null);
  const [displayMode, setDisplayMode] = useState<'all' | 'baseline' | 'target'>('all');

  return (
    <section className="w-full py-16 lg:py-24 bg-surface-container-low" id="admission-diagram">
      <div className="max-w-[1320px] mx-auto px-4 lg:px-12 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <span className="font-label-md text-primary tracking-widest uppercase">
              PRECISION RADAR DIAGNOSIS
            </span>
            <h2 className="font-headline-lg text-on-surface tracking-tight">
              막연한 '열심히 해라'는 끝났습니다 —<br />
              5가지 핵심 메디컬 역량 정밀 시각화(예시)
            </h2>
            <p className="font-body-md text-on-surface-variant">
              학부모님께서 자녀의 현재 학습 상태와 12주 후 목표치를 직관적인 5각 방사형 다이어그램으로 3초 만에 즉시 판독할 수 있는 수학적 임상 데이터 차트입니다(예시).
            </p>
          </div>

          {/* Legend and View Mode Toggles */}
          <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container-high/40">
            <button
              onClick={() => setDisplayMode(displayMode === 'baseline' ? 'all' : 'baseline')}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer min-h-[44px] ${
                displayMode === 'baseline'
                  ? 'bg-slate-100 ring-2 ring-slate-400'
                  : 'hover:bg-surface-container'
              }`}
            >
              <span className="w-3.5 h-3.5 rounded-full bg-[#64748B]" />
              <span className="font-label-sm text-on-surface-variant">
                현재 입학 진단치 (64점, 예시)
              </span>
            </button>

            <button
              onClick={() => setDisplayMode(displayMode === 'target' ? 'all' : 'target')}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all cursor-pointer min-h-[44px] ${
                displayMode === 'target'
                  ? 'bg-primary/10 ring-2 ring-primary'
                  : 'hover:bg-surface-container'
              }`}
            >
              <span className="w-3.5 h-3.5 rounded-full bg-primary" />
              <span className="font-label-sm text-on-surface font-semibold">
                12주 후 최종 달성치 (98점, 예시)
              </span>
            </button>
          </div>
        </div>

        {/* Main 2-Column: Radar SVG on Left, Prescription Cards on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* SVG Radar Chart Container */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 lg:p-8 rounded-2xl bg-surface-container-lowest shadow-md border border-surface-container-high/40">
            <div className="relative w-full max-w-[460px] aspect-square flex items-center justify-center">
              <svg
                aria-label="5-Axis Medical Competency Radar Diagram"
                className="w-full h-full overflow-visible select-none"
                viewBox="0 0 500 500"
              >
                {/* Radial Grid Polygons */}
                <polygon
                  fill="none"
                  points="250,50 440,188 367,412 133,412 60,188"
                  stroke="#E5E2DE"
                  strokeDasharray="4 4"
                  strokeWidth="1.5"
                />
                <polygon
                  fill="none"
                  points="250,90 402,200 344,380 156,380 98,200"
                  stroke="#E5E2DE"
                  strokeWidth="1"
                />
                <polygon
                  fill="none"
                  points="250,130 364,213 320,347 180,347 136,213"
                  stroke="#E5E2DE"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <polygon
                  fill="none"
                  points="250,170 326,225 297,314 203,314 174,225"
                  stroke="#E5E2DE"
                  strokeWidth="1"
                />
                <polygon
                  fill="none"
                  points="250,210 288,238 273,282 227,282 212,238"
                  stroke="#E5E2DE"
                  strokeWidth="1"
                />

                {/* Axis Lines from Center (250,250) */}
                <line stroke="#D1C5B8" strokeWidth="1.5" x1="250" x2="250" y1="250" y2="50" />
                <line stroke="#D1C5B8" strokeWidth="1.5" x1="250" x2="440" y1="250" y2="188" />
                <line stroke="#D1C5B8" strokeWidth="1.5" x1="250" x2="367" y1="250" y2="412" />
                <line stroke="#D1C5B8" strokeWidth="1.5" x1="250" x2="133" y1="250" y2="412" />
                <line stroke="#D1C5B8" strokeWidth="1.5" x1="250" x2="60" y1="250" y2="188" />

                {/* CURRENT Polygon (Baseline 64%, Slate Tone) */}
                {(displayMode === 'all' || displayMode === 'baseline') && (
                  <g className="transition-opacity duration-300">
                    <polygon
                      fill="#64748B"
                      fillOpacity={selectedAxisId ? 0.15 : 0.22}
                      points="250,178 372,210 325,353 175,353 129,210"
                      stroke="#64748B"
                      strokeWidth="2.5"
                    />
                    <circle cx="250" cy="178" fill="#64748B" r="4" />
                    <circle cx="372" cy="210" fill="#64748B" r="4" />
                    <circle cx="325" cy="353" fill="#64748B" r="4" />
                    <circle cx="175" cy="353" fill="#64748B" r="4" />
                    <circle cx="129" cy="210" fill="#64748B" r="4" />
                  </g>
                )}

                {/* TARGET Polygon (Target 98% Prestige Level, Champagne Gold) */}
                {(displayMode === 'all' || displayMode === 'target') && (
                  <g className="transition-opacity duration-300">
                    <polygon
                      fill="#C5A880"
                      fillOpacity={selectedAxisId ? 0.45 : 0.38}
                      points="250,58 436,190 365,409 135,409 64,190"
                      stroke="#725B38"
                      strokeWidth="3"
                    />
                    <circle
                      cx="250"
                      cy="58"
                      fill="#725B38"
                      r={selectedAxisId === 'concept' ? 8 : 6}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                    <circle
                      cx="436"
                      cy="190"
                      fill="#725B38"
                      r={selectedAxisId === 'speed' ? 8 : 6}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                    <circle
                      cx="365"
                      cy="409"
                      fill="#725B38"
                      r={selectedAxisId === 'pacing' ? 8 : 6}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                    <circle
                      cx="135"
                      cy="409"
                      fill="#725B38"
                      r={selectedAxisId === 'resilience' ? 8 : 6}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                    <circle
                      cx="64"
                      cy="190"
                      fill="#725B38"
                      r={selectedAxisId === 'defense' ? 8 : 6}
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                  </g>
                )}

                {/* Axis Interactive Labels */}
                <g
                  className="cursor-pointer transition-transform hover:scale-105"
                  onClick={() =>
                    setSelectedAxisId(selectedAxisId === 'concept' ? null : 'concept')
                  }
                >
                  <text
                    fill={selectedAxisId === 'concept' ? '#725B38' : '#1C1C19'}
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                    fontSize="14"
                    fontWeight="700"
                    textAnchor="middle"
                    x="250"
                    y="28"
                  >
                    1. 개념 완성도 (98%)
                  </text>
                </g>

                <g
                  className="cursor-pointer transition-transform hover:scale-105"
                  onClick={() =>
                    setSelectedAxisId(selectedAxisId === 'speed' ? null : 'speed')
                  }
                >
                  <text
                    fill={selectedAxisId === 'speed' ? '#725B38' : '#1C1C19'}
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                    fontSize="14"
                    fontWeight="700"
                    textAnchor="start"
                    x="445"
                    y="180"
                  >
                    2. 킬러 연산 속도
                  </text>
                  <text
                    fill="#725B38"
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                    fontSize="12"
                    textAnchor="start"
                    x="445"
                    y="198"
                  >
                    (99% 도달)
                  </text>
                </g>

                <g
                  className="cursor-pointer transition-transform hover:scale-105"
                  onClick={() =>
                    setSelectedAxisId(selectedAxisId === 'pacing' ? null : 'pacing')
                  }
                >
                  <text
                    fill={selectedAxisId === 'pacing' ? '#725B38' : '#1C1C19'}
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                    fontSize="14"
                    fontWeight="700"
                    textAnchor="start"
                    x="375"
                    y="435"
                  >
                    3. 실전 시간 안배
                  </text>
                  <text
                    fill="#725B38"
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                    fontSize="12"
                    textAnchor="start"
                    x="375"
                    y="453"
                  >
                    (97% 통제)
                  </text>
                </g>

                <g
                  className="cursor-pointer transition-transform hover:scale-105"
                  onClick={() =>
                    setSelectedAxisId(selectedAxisId === 'resilience' ? null : 'resilience')
                  }
                >
                  <text
                    fill={selectedAxisId === 'resilience' ? '#725B38' : '#1C1C19'}
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                    fontSize="14"
                    fontWeight="700"
                    textAnchor="end"
                    x="125"
                    y="435"
                  >
                    4. 실전 멘탈 회복력
                  </text>
                  <text
                    fill="#725B38"
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                    fontSize="12"
                    textAnchor="end"
                    x="125"
                    y="453"
                  >
                    (98% 무결점)
                  </text>
                </g>

                <g
                  className="cursor-pointer transition-transform hover:scale-105"
                  onClick={() =>
                    setSelectedAxisId(selectedAxisId === 'defense' ? null : 'defense')
                  }
                >
                  <text
                    fill={selectedAxisId === 'defense' ? '#725B38' : '#1C1C19'}
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                    fontSize="14"
                    fontWeight="700"
                    textAnchor="end"
                    x="55"
                    y="180"
                  >
                    5. 오답 함정 방어율
                  </text>
                  <text
                    fill="#725B38"
                    fontFamily="'Plus Jakarta Sans', sans-serif"
                    fontSize="12"
                    textAnchor="end"
                    x="55"
                    y="198"
                  >
                    (99.4% 방어)
                  </text>
                </g>
              </svg>
            </div>
            <p className="text-xs text-on-surface-variant mt-4 text-center">
              * 차트의 각 꼭짓점이나 우측 역량 카드를 클릭하시면 정밀 임상 처방전을 확인하실 수 있습니다.
            </p>
          </div>

          {/* Metric Details & Prescription Cards (Right) */}
          <div className="lg:col-span-6 flex flex-col gap-3.5">
            {COMPETENCY_AXES.map((axis, index) => {
              const isSelected = selectedAxisId === axis.id;
              const numStr = String(index + 1).padStart(2, '0');

              return (
                <div
                  key={axis.id}
                  onClick={() => setSelectedAxisId(isSelected ? null : axis.id)}
                  className={`p-4 rounded-xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-surface-container-lowest shadow-lg border-primary ring-2 ring-primary/20 scale-[1.01]'
                      : 'bg-surface-container-lowest shadow-xs border-transparent hover:shadow-md hover:border-surface-container-high'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center font-title-md font-bold transition-colors ${
                          isSelected
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface-container-high text-primary'
                        }`}
                      >
                        {numStr}
                      </div>
                      <div>
                        <h3 className="font-title-md text-on-surface">{axis.description}</h3>
                        <p className="font-body-sm text-on-surface-variant">{axis.details}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end shrink-0 ml-3">
                      <span className="font-title-md text-primary font-bold">{axis.growth}</span>
                      <span className="px-2 py-0.5 rounded bg-surface-container-high font-label-sm text-on-surface-variant">
                        {axis.badge}
                      </span>
                    </div>
                  </div>

                  {/* Expandable Clinical Note when selected */}
                  {isSelected && (
                    <div className="mt-3 pt-3 border-t border-surface-container text-xs text-on-surface bg-surface-container-low/60 p-3 rounded-lg flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                        clinical_notes
                      </span>
                      <div>
                        <span className="font-bold text-primary mr-1">[대치 프레스티지 임상 가이드(예시)]</span>
                        <span>{axis.clinicalNote}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
