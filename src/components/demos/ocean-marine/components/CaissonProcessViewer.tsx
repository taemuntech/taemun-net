'use client';

import React, { useState } from 'react';
import { CAISSON_STEPS } from '../data/marineData';
import { CaissonStep } from '../types';

export default function CaissonProcessViewer() {
  const [selectedStep, setSelectedStep] = useState<CaissonStep>(CAISSON_STEPS[0]);

  return (
    <section id="caisson" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold tracking-wider uppercase mb-4">
            Offshore Caisson Engineering Process
          </div>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white mb-4">
            12,000톤급 메가 케이슨 제작 &amp; 해저 정밀 거치 4단계 공법
          </h2>
          <p className="text-slate-400 text-base lg:text-lg leading-relaxed">
            바다 위 플로팅 독 슬립폼 연속 타설부터 수심 35m 해저 사석 마운드 정밀 고르기, 위성 유도 침설 및 모래 속채움 캡핑까지 심해 중력식 방파제 축조 프로세스입니다(예시).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 공정 단계 선택 리스트 */}
          <div className="lg:col-span-5 bg-slate-950/80 rounded-2xl p-6 border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 tracking-wider">케이슨 해양 시공 단계 (Caisson Flow)</span>
              <span className="text-xs font-semibold text-sky-400">클릭하여 단계별 사양 확인</span>
            </div>

            <div className="space-y-3">
              {CAISSON_STEPS.map((step) => {
                const isSelected = selectedStep.stepNumber === step.stepNumber;
                return (
                  <button
                    key={step.stepNumber}
                    type="button"
                    onClick={() => setSelectedStep(step)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-sky-950/70 to-slate-900 border-sky-500/80 shadow-lg shadow-sky-950/40 translate-x-1'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                          isSelected
                            ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {step.stepNumber}
                      </div>
                      <div>
                        <span className="text-xs text-sky-400 font-semibold block">{step.subtitle}</span>
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
          <div className="lg:col-span-7 bg-slate-950/90 rounded-2xl p-8 border border-sky-900/40 shadow-2xl relative">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
              <div>
                <span className="text-sky-400 font-mono text-xs font-bold tracking-widest uppercase block mb-1">
                  STAGE {selectedStep.stepNumber} · {selectedStep.engTitle}
                </span>
                <h3 className="text-2xl font-black text-white">{selectedStep.title}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">단계별 시공 목표</span>
                <span className="text-sm font-bold text-sky-400">{selectedStep.outputQuality}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2">
                  해양 토목 시공 메커니즘
                </h4>
                <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
                  {selectedStep.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  핵심 해양 엔지니어링 기술 사양
                </h4>
                <div className="space-y-2.5">
                  {selectedStep.techPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-3 text-xs text-slate-300"
                    >
                      <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-800/40 flex items-start gap-3 text-xs text-slate-300">
                <span className="w-5 h-5 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                  i
                </span>
                <p className="leading-relaxed">
                  오션마린건설은 전 공정 해양 조위·유속 원격 관제와 3D 수중 소나 검측을 통해 심해 케이슨의 설계 안착 오차 30mm 이내 기준을 준수하고 있습니다(예시).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
