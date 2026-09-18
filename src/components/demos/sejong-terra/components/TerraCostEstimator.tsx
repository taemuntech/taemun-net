'use client';

import React, { useState } from 'react';

interface TerraCostEstimatorProps {
  onOpenConsultation?: () => void;
}

export default function TerraCostEstimator({ onOpenConsultation }: TerraCostEstimatorProps) {
  const [landAreaPyeong, setLandAreaPyeong] = useState<number>(30); // 만평 (10만평 ~ 150만평)
  const [terrainType, setTerrainType] = useState<'flat' | 'rolling' | 'mountain'>('rolling');
  const [hasSoftGround, setHasSoftGround] = useState<boolean>(false);
  const [includeUtilityTunnel, setIncludeUtilityTunnel] = useState<boolean>(true);

  // 간이 사업비 산출 로직 (순수 예시용)
  const calculateCost = () => {
    // 1만평당 기본 부지조성 단가 (토공, 도로, 상하수도, 조경 등)
    let unitCostPerManPyeong = 85; // 억원 / 만평

    if (terrainType === 'flat') unitCostPerManPyeong = 65;
    else if (terrainType === 'mountain') unitCostPerManPyeong = 115; // 대규모 절토 및 암반 파쇄

    let total = landAreaPyeong * unitCostPerManPyeong;

    if (hasSoftGround) {
      total += landAreaPyeong * 22; // PBD 및 샌드매트 지반 개량비
    }

    if (includeUtilityTunnel) {
      total += Math.round(landAreaPyeong * 0.15) * 45; // 간선 공동구 박스 공사비
    }

    return Math.max(300, Math.round(total));
  };

  const estimatedCost = calculateCost();

  return (
    <section id="estimator" className="py-24 bg-stone-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-4">
            Land Development Cost Simulator
          </div>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white mb-4">
            스마트 산업단지 · 부지조성 개략 공사비 산출기
          </h2>
          <p className="text-stone-400 text-base leading-relaxed">
            계획 부지 면적(만평)과 원지형 조건, 연약지반 및 지하 공동구 매설 여부를 반영하여 최적 토공 배분과 개략 조성비를 즉시 시뮬레이션해 드립니다(예시).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 입력 폼 */}
          <div className="lg:col-span-7 bg-stone-950/80 rounded-2xl p-8 border border-stone-800 shadow-2xl flex flex-col justify-between">
            <div className="space-y-8">
              {/* 계획 부지 면적 슬라이더 */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="area-slider" className="text-sm font-bold text-stone-300">
                    산업단지 계획 면적 (만평)
                  </label>
                  <span className="text-amber-400 font-mono font-black text-lg">
                    {landAreaPyeong}만 평 (약 {(landAreaPyeong * 3.3).toFixed(1)}만 ㎡)
                  </span>
                </div>
                <input
                  id="area-slider"
                  type="range"
                  min={10}
                  max={150}
                  step={5}
                  value={landAreaPyeong}
                  onChange={(e) => setLandAreaPyeong(Number(e.target.value))}
                  className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-xs text-stone-500 mt-2">
                  <span>10만평 (소규모 산단)</span>
                  <span>50만평 (중형 산단)</span>
                  <span>150만평 (메가 국가산단)</span>
                </div>
              </div>

              {/* 지형 조건 선택 */}
              <div>
                <span className="text-sm font-bold text-stone-300 block mb-3">
                  사업 대상지 원지형 조건
                </span>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setTerrainType('flat')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      terrainType === 'flat'
                        ? 'bg-amber-950/60 border-amber-500 text-white shadow-md'
                        : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-amber-400 mb-1">평탄 평야지</div>
                    <div className="text-xs">토공량 최소·단순 정지</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTerrainType('rolling')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      terrainType === 'rolling'
                        ? 'bg-amber-950/60 border-amber-500 text-white shadow-md'
                        : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-amber-400 mb-1">완경사 구릉지</div>
                    <div className="text-xs">절·성토 수급 밸런스 최적</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTerrainType('mountain')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      terrainType === 'mountain'
                        ? 'bg-amber-950/60 border-amber-500 text-white shadow-md'
                        : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-amber-400 mb-1">임야 산악 구릉</div>
                    <div className="text-xs">대규모 암반 절취·사면보강</div>
                  </button>
                </div>
              </div>

              {/* 특수 인프라 및 지반 조건 */}
              <div className="space-y-4">
                <span className="text-sm font-bold text-stone-300 block">
                  부가 특수 토목 공종 옵션
                </span>

                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer bg-stone-900/60 p-3 rounded-xl border border-stone-800">
                    <input
                      type="checkbox"
                      checked={hasSoftGround}
                      onChange={(e) => setHasSoftGround(e.target.checked)}
                      className="accent-amber-500 w-4 h-4 rounded"
                    />
                    <div>
                      <span className="text-xs font-bold text-stone-200 block">하천변 / 매립지 연약지반 PBD 압밀 탈수 개량</span>
                      <span className="text-[11px] text-stone-400">PBD 타설 및 샌드매트 지반 안정화 가산</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer bg-stone-900/60 p-3 rounded-xl border border-stone-800">
                    <input
                      type="checkbox"
                      checked={includeUtilityTunnel}
                      onChange={(e) => setIncludeUtilityTunnel(e.target.checked)}
                      className="accent-amber-500 w-4 h-4 rounded"
                    />
                    <div>
                      <span className="text-xs font-bold text-stone-200 block">단지 간선 4련 지하 공동구 통합 박스 시공</span>
                      <span className="text-[11px] text-stone-400">전력·통신·용수관로 무굴착 통합 터널 가산</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 결과 디스플레이 패널 */}
          <div className="lg:col-span-5 bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950/40 rounded-2xl p-8 border border-amber-500/30 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-800">
                <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
                  Development Estimate
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  산출 결과 (예시)
                </span>
              </div>

              <div className="mb-6">
                <span className="text-xs text-stone-400 block mb-1">
                  추천 토공 시공 공법
                </span>
                <div className="text-xl font-black text-white">
                  {terrainType === 'mountain'
                    ? '3D 발파 절취 + 계단식 보강토 옹벽'
                    : hasSoftGround
                    ? '머신가이던스 대토공 + PBD 압밀 탈수'
                    : '드론 라이다 Mass-Haul 균형 토공'}
                </div>
              </div>

              <div className="bg-stone-900/90 rounded-xl p-5 border border-stone-800 mb-6">
                <span className="text-xs text-stone-400 block mb-1">
                  개략 부지조성 총공사비 (예시)
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl lg:text-4xl font-black text-amber-400">
                    약 {estimatedCost.toLocaleString()}억
                  </span>
                  <span className="text-stone-300 text-sm font-semibold">원 내외</span>
                </div>
                <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                  * 절·성토, 도로망 포장, 배수관로, 상하수도, 가로수 조경 일체가 반영된 추산치입니다(예시).
                </p>
              </div>

              <div className="space-y-2 text-xs text-stone-300 mb-6">
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-500">예상 부지조성 공기</span>
                  <span className="font-bold">
                    {Math.round(landAreaPyeong * 0.25 + 18)}개월 내외 (예시)
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-800/60">
                  <span className="text-stone-500">외부 사토/반입량</span>
                  <span className="font-bold text-emerald-400">0 ㎥ (부지 내 100% 자급)(예시)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-stone-500">시공 오차 허용치</span>
                  <span className="font-bold text-amber-400">±20mm 이내 정밀 시공(예시)</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="w-full py-4 rounded-xl bg-amber-500 text-stone-950 font-black text-sm hover:bg-amber-400 transition-all duration-300 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
            >
              <span>사업계획서 기반 정밀 3D 토공 자문 신청</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
