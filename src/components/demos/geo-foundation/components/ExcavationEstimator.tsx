'use client';

import React, { useState } from 'react';

interface ExcavationEstimatorProps {
  onOpenConsultation?: () => void;
}

export default function ExcavationEstimator({ onOpenConsultation }: ExcavationEstimatorProps) {
  const [depth, setDepth] = useState<number>(20); // 굴착 심도 (10m ~ 50m)
  const [siteArea, setSiteArea] = useState<number>(2000); // 굴착 연면적/대지 (500 ~ 10000 m2)
  const [soilCondition, setSoilCondition] = useState<'standard' | 'high-water' | 'rock'>('standard');
  const [nearSubway, setNearSubway] = useState<boolean>(true);

  // 공사비 간이 계산 로직 (순수 예시용)
  const calculateCost = () => {
    // 기본 심도 단가 계수 (m당)
    let baseRate = 85; // 만원/m2 (굴착 둘레/면적 가중치)
    if (depth > 30) baseRate *= 1.45;
    else if (depth > 20) baseRate *= 1.25;

    // 지반 계수
    let soilMultiplier = 1.0;
    if (soilCondition === 'high-water') soilMultiplier = 1.35; // 차수 그라우팅 및 D-Wall 가산
    if (soilCondition === 'rock') soilMultiplier = 1.25; // 암반 천공 가산

    // 지하철/인접 구조물 계수
    const subwayMultiplier = nearSubway ? 1.2 : 1.0;

    // 대지 둘레 추정치 (정방형 기준: 4 * sqrt(area)) * depth
    const perimeter = 4 * Math.sqrt(siteArea);
    const wallArea = perimeter * depth;

    // 추정 공사비 (억원 단위 산출)
    const totalCost = (wallArea * baseRate * soilMultiplier * subwayMultiplier) / 10000;
    return Math.max(12, Math.round(totalCost));
  };

  const estimatedCost = calculateCost();

  return (
    <section id="estimator" className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-4">
            Cost & Engineering Simulation
          </div>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white mb-4">
            대심도 흙막이 · 특수기초 개략 공사비 산출기
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            굴착 심도와 지반 조건, 인접 철도·건물 유무를 반영하여 최적 가시설 공법 조합과 개략 공사비를 즉시 시뮬레이션해 드립니다(예시).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 입력 폼 */}
          <div className="lg:col-span-7 bg-slate-950/80 rounded-2xl p-8 border border-slate-800 shadow-2xl flex flex-col justify-between">
            <div className="space-y-8">
              {/* 굴착 심도 */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="depth-range" className="text-sm font-bold text-slate-300">
                    계획 굴착 심도 (Depth)
                  </label>
                  <span className="text-cyan-400 font-mono font-black text-lg">
                    지하 {depth}m (약 지하 {Math.ceil(depth / 4)}층)
                  </span>
                </div>
                <input
                  id="depth-range"
                  type="range"
                  min={10}
                  max={50}
                  step={2}
                  value={depth}
                  onChange={(e) => setDepth(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>10m (일반 굴착)</span>
                  <span>30m (대심도)</span>
                  <span>50m (초대심도 D-Wall)</span>
                </div>
              </div>

              {/* 굴착 대지 면적 */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="area-range" className="text-sm font-bold text-slate-300">
                    대지 기준 굴착 바닥 면적
                  </label>
                  <span className="text-cyan-400 font-mono font-black text-lg">
                    {siteArea.toLocaleString()} ㎡ (약 {Math.round(siteArea * 0.3025)} 평)
                  </span>
                </div>
                <input
                  id="area-range"
                  type="range"
                  min={500}
                  max={10000}
                  step={500}
                  value={siteArea}
                  onChange={(e) => setSiteArea(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>500 ㎡</span>
                  <span>5,000 ㎡</span>
                  <span>10,000 ㎡</span>
                </div>
              </div>

              {/* 지반 상태 조건 */}
              <div>
                <span className="text-sm font-bold text-slate-300 block mb-3">
                  현장 대표 지반 조건
                </span>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSoilCondition('standard')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      soilCondition === 'standard'
                        ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-cyan-400 mb-1">일반 도심 복합</div>
                    <div className="text-xs">사질토 + 풍화토</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSoilCondition('high-water')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      soilCondition === 'high-water'
                        ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-cyan-400 mb-1">고수위 연약 지반</div>
                    <div className="text-xs">하천변/매립 점토</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSoilCondition('rock')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      soilCondition === 'rock'
                        ? 'bg-cyan-950/60 border-cyan-500 text-white shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-cyan-400 mb-1">천부 암반 지반</div>
                    <div className="text-xs">연암/경암 파쇄대</div>
                  </button>
                </div>
              </div>

              {/* 인접 구조물 영향 */}
              <div>
                <span className="text-sm font-bold text-slate-300 block mb-3">
                  인접 중요 구조물 조건
                </span>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="subway"
                      checked={nearSubway}
                      onChange={() => setNearSubway(true)}
                      className="accent-cyan-500"
                    />
                    <span className="text-xs text-slate-300">
                      지하철/철도 20m 이내 인접 (초정밀 변위 제어)
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="subway"
                      checked={!nearSubway}
                      onChange={() => setNearSubway(false)}
                      className="accent-cyan-500"
                    />
                    <span className="text-xs text-slate-300">일반 도로변 인접</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 결과 디스플레이 패널 */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 rounded-2xl p-8 border border-cyan-500/30 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">
                  Simulation Summary
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  산출 결과 (예시)
                </span>
              </div>

              <div className="mb-6">
                <span className="text-xs text-slate-400 block mb-1">
                  추천 흙막이 및 차수 공법
                </span>
                <div className="text-xl font-black text-white">
                  {depth >= 35
                    ? '하이드로프리즈 D-Wall (1,200mm) + 역타'
                    : soilCondition === 'high-water'
                    ? 'CIP 주열벽 + 초고압 차수 그라우팅(JSP)'
                    : 'CIP + 프리스트레스트 어스앵커 공법'}
                </div>
              </div>

              <div className="bg-slate-900/90 rounded-xl p-5 border border-slate-800 mb-6">
                <span className="text-xs text-slate-400 block mb-1">
                  개략 가시설 및 기초 공사비 (예시)
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl lg:text-4xl font-black text-cyan-400">
                    약 {estimatedCost.toLocaleString()}억
                  </span>
                  <span className="text-slate-300 text-sm font-semibold">원 내외</span>
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  * 벽체 면적 약 {Math.round(4 * Math.sqrt(siteArea) * depth).toLocaleString()} ㎡ 기준 토류벽, 차수, 지지 버팀보가 반영된 추산치입니다(예시).
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-300 mb-6">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-500">예상 공사 기간</span>
                  <span className="font-bold">{Math.round(depth * 0.4 + 4)}개월 (예시)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-500">지반 변위 목표치</span>
                  <span className="font-bold text-emerald-400">2.0mm 이내 제어 (예시)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">지하수 차수율</span>
                  <span className="font-bold text-cyan-400">99.8% 달성 기준 (예시)</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="w-full py-4 rounded-xl bg-cyan-500 text-slate-950 font-black text-sm hover:bg-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2"
            >
              <span>현장 지반조사보고서 기반 정밀 견적 신청하기</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
