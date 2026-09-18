'use client';

import React, { useState } from 'react';
import { WATER_PROCESS_STEPS } from '../data/aquaData';
import { WaterProcessStep } from '../types';

export default function WaterProcessViewer() {
  const [selectedStep, setSelectedStep] = useState<WaterProcessStep>(WATER_PROCESS_STEPS[0]);

  return (
    <section id="process" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-4">
            Underground Eco-Purification Process
          </div>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white mb-4">
            지하 4단계 MBR 수처리 &amp; 지상 생태공원 순환 공학
          </h2>
          <p className="text-slate-400 text-base lg:text-lg leading-relaxed">
            도심 하천의 오수를 지하 30m에서 침사, 생물학적 고도 분해, 0.04㎛ 정밀 분리막 여과를 거쳐 지상 1급수 생태 호수공원으로 완벽 환원시키는 친환경 공정 메커니즘입니다(예시).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 공정 단계 선택 리스트 */}
          <div className="lg:col-span-5 bg-slate-950/80 rounded-2xl p-6 border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 tracking-wider">정화 공정 단계 (Purification Flow)</span>
              <span className="text-xs font-semibold text-cyan-400">클릭하여 단계별 사양 확인</span>
            </div>

            <div className="space-y-3">
              {WATER_PROCESS_STEPS.map((step) => {
                const isSelected = selectedStep.stepNumber === step.stepNumber;
                return (
                  <button
                    key={step.stepNumber}
                    type="button"
                    onClick={() => setSelectedStep(step)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-950/70 to-slate-900 border-cyan-500/80 shadow-lg shadow-cyan-950/40 translate-x-1'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                          isSelected
                            ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {step.stepNumber}
                      </div>
                      <div>
                        <span className="text-xs text-cyan-400 font-semibold block">{step.subtitle}</span>
                        <h4 className="text-sm font-bold text-white mt-0.5 line-clamp-1">{step.title}</h4>
                      </div>
                    </div>
                    <div className="text-slate-500 text-xs font-bold shrink-0">
                      {isSelected ? '선택됨' : '확인'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 공정 상세 정보 디스플레이 패널 */}
          <div className="lg:col-span-7 bg-slate-950/90 rounded-2xl p-8 border border-cyan-900/40 shadow-2xl relative">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
              <div>
                <span className="text-cyan-400 font-mono text-xs font-bold tracking-widest uppercase block mb-1">
                  STAGE {selectedStep.stepNumber} · {selectedStep.engTitle}
                </span>
                <h3 className="text-2xl font-black text-white">{selectedStep.title}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">단계별 목표 수질</span>
                <span className="text-sm font-bold text-cyan-400">{selectedStep.outputQuality}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  공정 개요 및 정화 원리
                </h4>
                <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
                  {selectedStep.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  핵심 토목 엔지니어링 기술 사양
                </h4>
                <div className="space-y-2.5">
                  {selectedStep.techPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3 text-xs text-slate-300"
                    >
                      <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 flex items-start gap-3 text-xs text-slate-300">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                  i
                </span>
                <p className="leading-relaxed">
                  아쿠아인프라엔지니어링은 공정별 지하 음압 탈취 시스템과 원격 수질 TMS 연계를 통해 냄새 걱정 없는 지상 공원 환경을 실천하고 있습니다(예시).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
