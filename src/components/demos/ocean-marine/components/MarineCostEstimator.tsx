'use client';

import React, { useState } from 'react';

interface MarineCostEstimatorProps {
  onOpenConsultation?: () => void;
}

export default function MarineCostEstimator({ onOpenConsultation }: MarineCostEstimatorProps) {
  const [marineType, setMarineType] = useState<'quay' | 'breakwater' | 'ttp' | 'dredging'>('quay');
  const [scale, setScale] = useState<number>(700); // 안벽: m(350~2100), 방파제: m(500~3000), TTP: m(500~2500), 준설: 만m3(300~2500)
  const [waterDepth, setWaterDepth] = useState<number>(20); // 수심 (-12m ~ -35m)
  const [includeAutomationTrack, setIncludeAutomationTrack] = useState<boolean>(true);

  // 간이 해양 사업비 산출 로직 (순수 예시용)
  const calculateCost = () => {
    let unitCost = 1.0; // m당 또는 만m3당

    switch (marineType) {
      case 'quay': // 안벽 부두 (m당 약 1.8억~2.8억)
        unitCost = 2.2;
        if (waterDepth >= 20) unitCost *= 1.25;
        if (includeAutomationTrack) unitCost += 0.35;
        return Math.round(scale * unitCost);
      case 'breakwater': // 케이슨 방파제 (m당 약 2.5억~4.2억)
        unitCost = 2.8;
        if (waterDepth >= 25) unitCost *= 1.4;
        return Math.round(scale * unitCost);
      case 'ttp': // TTP 소파블록 호안 (m당 약 1.2억~1.9억)
        unitCost = 1.5;
        if (waterDepth >= 20) unitCost *= 1.2;
        return Math.round(scale * unitCost);
      case 'dredging': // 준설 매립 (만m3당 약 4.5억~7.0억)
        unitCost = 5.5;
        return Math.round(scale * unitCost);
      default:
        return 1500;
    }
  };

  const estimatedCost = calculateCost();

  return (
    <section id="estimator" className="py-24 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold tracking-wider uppercase mb-4">
            Marine Infrastructure Cost Simulator
          </div>
          <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white mb-4">
            스마트 항만 · 외해 방파제 개략 공사비 산출기
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            항만 공종과 계획 안벽 연장, 외해 시공 수심, 무인 자동화 하역 트랙 옵션을 입력하시면 최적 케이슨 규격과 개략 총공사비를 즉시 시뮬레이션해 드립니다(예시).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 입력 폼 */}
          <div className="lg:col-span-7 bg-slate-950/80 rounded-2xl p-8 border border-slate-800 shadow-2xl flex flex-col justify-between">
            <div className="space-y-8">
              {/* 해양 공종 선택 */}
              <div>
                <span className="text-sm font-bold text-slate-300 block mb-3">
                  해양 토목 공종 구분
                </span>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setMarineType('quay');
                      setScale(700);
                      setWaterDepth(20);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      marineType === 'quay'
                        ? 'bg-sky-950/60 border-sky-500 text-white shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-sky-400 mb-1">스마트 안벽 부두</div>
                    <div className="text-xs">24,000 TEU 케이슨 안벽 + AGV 트랙</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMarineType('breakwater');
                      setScale(1000);
                      setWaterDepth(25);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      marineType === 'breakwater'
                        ? 'bg-sky-950/60 border-sky-500 text-white shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-sky-400 mb-1">외해 케이슨 방파제</div>
                    <div className="text-xs">12,000톤급 슬릿 케이슨 + 사석 마운드</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMarineType('ttp');
                      setScale(1200);
                      setWaterDepth(18);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      marineType === 'ttp'
                        ? 'bg-sky-950/60 border-sky-500 text-white shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-sky-400 mb-1">초대형 TTP 호안</div>
                    <div className="text-xs">80톤급 테트라포드 인터로킹 소파공</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setMarineType('dredging');
                      setScale(800);
                      setWaterDepth(15);
                    }}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      marineType === 'dredging'
                        ? 'bg-sky-950/60 border-sky-500 text-white shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-sky-400 mb-1">해상 준설 매립</div>
                    <div className="text-xs">CSD 펌프 준설 + 배후단지 매립</div>
                  </button>
                </div>
              </div>

              {/* 계획 연장 / 토량 슬라이더 */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="scale-slider" className="text-sm font-bold text-slate-300">
                    {marineType === 'dredging' ? '준설 매립 계획 토량 (만㎥)' : '시공 계획 총 연장 (m)'}
                  </label>
                  <span className="text-sky-400 font-mono font-black text-lg">
                    {scale.toLocaleString()} {marineType === 'dredging' ? '만 ㎥' : 'm'}
                    {marineType === 'quay' ? ` (약 ${Math.round(scale / 350)}개 선석)` : ''}
                  </span>
                </div>
                <input
                  id="scale-slider"
                  type="range"
                  min={marineType === 'dredging' ? 200 : 350}
                  max={marineType === 'dredging' ? 2500 : 3000}
                  step={marineType === 'dredging' ? 50 : 50}
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>{marineType === 'dredging' ? '200만 ㎥' : '350m (1선석)'}</span>
                  <span>{marineType === 'dredging' ? '1,200만 ㎥' : '1,500m (4선석)'}</span>
                  <span>{marineType === 'dredging' ? '2,500만 ㎥' : '3,000m (대형)'}</span>
                </div>
              </div>

              {/* 시공 해역 수심 슬라이더 */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label htmlFor="depth-slider" className="text-sm font-bold text-slate-300">
                    시공 해역 설계 수심 (Water Depth)
                  </label>
                  <span className="text-sky-400 font-mono font-black text-lg">
                    수심 -{waterDepth}m
                  </span>
                </div>
                <input
                  id="depth-slider"
                  type="range"
                  min={12}
                  max={35}
                  step={1}
                  value={waterDepth}
                  onChange={(e) => setWaterDepth(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>-12m (중소형 선석)</span>
                  <span>-20m (24,000TEU 초대형 모선)</span>
                  <span>-35m (심해 외해 방파제)</span>
                </div>
              </div>

              {/* 스마트 항만 옵션 */}
              {marineType === 'quay' && (
                <div>
                  <label className="flex items-center gap-3 cursor-pointer bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <input
                      type="checkbox"
                      checked={includeAutomationTrack}
                      onChange={(e) => setIncludeAutomationTrack(e.target.checked)}
                      className="accent-sky-500 w-4 h-4 rounded"
                    />
                    <div>
                      <span className="text-xs font-bold text-slate-200 block">무인 완전자동화 AGV 전용 트랙 및 STS 고내진 레일 일체화</span>
                      <span className="text-[11px] text-slate-400">오차 5mm 이내 정밀 트랙 기초 시공 반영</span>
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* 결과 디스플레이 패널 */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950/40 rounded-2xl p-8 border border-sky-500/30 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
                <span className="text-xs font-bold text-sky-400 tracking-wider uppercase">
                  Harbor Estimate Summary
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/40">
                  산출 결과 (예시)
                </span>
              </div>

              <div className="mb-6">
                <span className="text-xs text-slate-400 block mb-1">
                  추천 해양 토목 공법
                </span>
                <div className="text-xl font-black text-white">
                  {marineType === 'quay'
                    ? '8,500톤급 중력식 케이슨 + 수중 사석 마운드'
                    : marineType === 'breakwater'
                    ? '12,000톤급 유공 슬릿형 케이슨 방파제'
                    : marineType === 'ttp'
                    ? '80톤급 초대형 TTP 3차원 맞물림 소파공'
                    : '15,000마력 대형 CSD 펌프 준설 및 수평 드레인'}
                </div>
              </div>

              <div className="bg-slate-900/90 rounded-xl p-5 border border-slate-800 mb-6">
                <span className="text-xs text-slate-400 block mb-1">
                  개략 총공사비 (예시)
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl lg:text-4xl font-black text-sky-400">
                    약 {estimatedCost.toLocaleString()}억
                  </span>
                  <span className="text-slate-300 text-sm font-semibold">원 내외</span>
                </div>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  * 해저 기초 지반 개량, 케이슨 제작/거치, 속채움, 상부 캡핑 공사비가 통합 반영된 추산치입니다(예시).
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-300 mb-6">
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-500">예상 공사 기간</span>
                  <span className="font-bold">
                    {marineType === 'quay' ? '36~48개월' : marineType === 'breakwater' ? '42~54개월' : '24~36개월'} (예시)
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-500">내습 설계 파고</span>
                  <span className="font-bold text-emerald-400">파고 12.5m 100년 빈도 태풍 안전(예시)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">해저 거치 정밀도</span>
                  <span className="font-bold text-sky-400">설계 오차 30mm 이내(예시)</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenConsultation}
              className="w-full py-4 rounded-xl bg-sky-500 text-slate-950 font-black text-sm hover:bg-sky-400 transition-all duration-300 shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2"
            >
              <span>항만 기본계획서 기반 정밀 해양 토목 자문 신청</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
