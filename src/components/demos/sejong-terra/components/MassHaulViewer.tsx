'use client';

import React, { useState } from 'react';
import { EARTHWORK_PHASES } from '../data/terraData';
import { EarthworkPhase } from '../types';

export default function MassHaulViewer() {
  const [selectedPhase, setSelectedPhase] = useState<EarthworkPhase>(EARTHWORK_PHASES[0]);

  return (
    <section id="mass-haul" className="py-24 bg-stone-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-4">
            Digital Earthwork Engineering Cycle
          </div>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white mb-4">
            3D 절·성토 밸런스 &amp; 스마트 머신가이던스 4단계 사이클
          </h2>
          <p className="text-stone-400 text-base lg:text-lg leading-relaxed">
            드론 항공 라이다 측량부터 최적 토량 이동 배분, 스마트 중장비 위성 유도 굴삭, 지능형 연속 다짐까지 사토와 반입 없는 무결점 단지토목 프로세스입니다(예시).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 공정 단계 선택 리스트 */}
          <div className="lg:col-span-5 bg-stone-950/80 rounded-2xl p-6 border border-stone-800 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-800">
              <span className="text-xs font-bold text-stone-400 tracking-wider">디지털 토공 공정 (Earthwork Flow)</span>
              <span className="text-xs font-semibold text-amber-400">클릭하여 단계별 사양 확인</span>
            </div>

            <div className="space-y-3">
              {EARTHWORK_PHASES.map((phase) => {
                const isSelected = selectedPhase.phaseNumber === phase.phaseNumber;
                return (
                  <button
                    key={phase.phaseNumber}
                    type="button"
                    onClick={() => setSelectedPhase(phase)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-950/70 to-stone-900 border-amber-500/80 shadow-lg shadow-amber-950/40 translate-x-1'
                        : 'bg-stone-900/60 border-stone-800/80 hover:border-stone-700 hover:bg-stone-900'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                          isSelected
                            ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/30'
                            : 'bg-stone-800 text-stone-400'
                        }`}
                      >
                        {phase.phaseNumber}
                      </div>
                      <div>
                        <span className="text-xs text-amber-400 font-semibold block">{phase.subtitle}</span>
                        <h4 className="text-sm font-bold text-white mt-0.5 line-clamp-1">{phase.title}</h4>
                      </div>
                    </div>
                    <div className="text-stone-500 text-xs font-bold shrink-0">
                      {isSelected ? '선택됨' : '확인'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 공정 상세 정보 디스플레이 패널 */}
          <div className="lg:col-span-7 bg-stone-950/90 rounded-2xl p-8 border border-amber-900/40 shadow-2xl relative">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-800">
              <div>
                <span className="text-amber-400 font-mono text-xs font-bold tracking-widest uppercase block mb-1">
                  PHASE {selectedPhase.phaseNumber} · {selectedPhase.engTitle}
                </span>
                <h3 className="text-2xl font-black text-white">{selectedPhase.title}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-400 block">단계별 엔지니어링 목표</span>
                <span className="text-sm font-bold text-amber-400">{selectedPhase.outputQuality}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-stone-900/90 p-5 rounded-xl border border-stone-800">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  토목 공학 원리 및 시스템 설명
                </h4>
                <p className="text-stone-300 text-sm lg:text-base leading-relaxed">
                  {selectedPhase.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
                  핵심 디지털 스마트 토공 기술 사양
                </h4>
                <div className="space-y-2.5">
                  {selectedPhase.techPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-stone-900/60 border border-stone-800 flex items-start gap-3 text-xs text-stone-300"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/40 flex items-start gap-3 text-xs text-stone-300">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                  i
                </span>
                <p className="leading-relaxed">
                  세종테라개발은 전 공정 드론 및 GNSS 머신가이던스 연계를 통해 단지 토공 시공 오차를 기준치 대비 60% 이상 축소하고 있습니다(예시).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
