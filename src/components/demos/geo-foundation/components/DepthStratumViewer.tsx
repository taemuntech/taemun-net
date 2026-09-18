'use client';

import React, { useState } from 'react';
import { STRATA_LAYERS } from '../data/geoData';
import { StrataLayer } from '../types';

export default function DepthStratumViewer() {
  const [selectedLayer, setSelectedLayer] = useState<StrataLayer>(STRATA_LAYERS[0]);

  return (
    <section id="stratum" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-4">
            Underground Strata Analysis
          </div>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white mb-4">
            지하 50m 대심도 지층별 특수공법 뷰어
          </h2>
          <p className="text-slate-400 text-base lg:text-lg leading-relaxed">
            토압과 피압지하수가 급증하는 심도 구간마다 최적화된 흙막이 벽체와 차수 공법을 선제 적용합니다(예시). 지층을 선택하시면 상세 설계 기준을 확인하실 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 지층 단면 인터랙티브 컬럼 */}
          <div className="lg:col-span-5 bg-slate-950/80 rounded-2xl p-6 border border-slate-800 shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 tracking-wider">심도 단면도 (Depth Profile)</span>
              <span className="text-xs font-semibold text-cyan-400">클릭하여 지층별 공법 확인</span>
            </div>

            <div className="space-y-3">
              {STRATA_LAYERS.map((layer, idx) => {
                const isSelected = selectedLayer.depthRange === layer.depthRange;
                return (
                  <button
                    key={layer.depthRange}
                    type="button"
                    onClick={() => setSelectedLayer(layer)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-center justify-between ${
                      isSelected
                        ? 'bg-gradient-to-r from-cyan-950/70 to-slate-900 border-cyan-500/80 shadow-lg shadow-cyan-950/40 translate-x-1'
                        : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-black shrink-0 ${
                          isSelected
                            ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        0{idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                            {layer.depthRange}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white mt-1 line-clamp-1">{layer.soilName}</h4>
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

          {/* 지층 상세 정보 디스플레이 패널 */}
          <div className="lg:col-span-7 bg-slate-950/90 rounded-2xl p-8 border border-cyan-900/40 shadow-2xl relative">
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
              <div>
                <span className="text-cyan-400 font-mono text-sm font-black px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-800/50 inline-block mb-2">
                  심도 {selectedLayer.depthRange} 상세 토질 특성
                </span>
                <h3 className="text-2xl font-black text-white">{selectedLayer.soilName}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">지반 안정성 지표</span>
                <span className="text-sm font-bold text-emerald-400">정밀 계측 대상</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-2">
                  지층 역학적 특성 및 지중 환경
                </h4>
                <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
                  {selectedLayer.description}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 block mb-1">적용 흙막이 및 기초 공법</span>
                  <p className="text-sm font-bold text-white leading-snug">
                    {selectedLayer.retainingMethod}
                  </p>
                </div>

                <div className="bg-slate-900/90 p-5 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-amber-400 block mb-1">주요 위험 요인 및 관리 기준</span>
                  <p className="text-sm font-bold text-slate-200 leading-snug">
                    {selectedLayer.riskFactor}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-800/40 flex items-start gap-3 text-xs text-slate-300">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold shrink-0 mt-0.5">
                  i
                </span>
                <p className="leading-relaxed">
                  지오파운데이션은 지층 경계면마다 3D 지반변위 자동 계측센서를 설치하여 허용치 2.0mm 이내의 변위 관리 기준을 실천하고 있습니다(예시).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
