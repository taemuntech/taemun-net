'use client';

import React, { useState, useId } from 'react';

interface CostCalculatorProps {
  onOpenConsultation: () => void;
}

export default function CostCalculator({ onOpenConsultation }: CostCalculatorProps) {
  const gfaRangeId = useId();
  const buildTypeSelectId = useId();
  const basementSelectId = useId();

  const [buildingType, setBuildingType] = useState<'corporate' | 'kic' | 'rnd'>('corporate');
  const [pyeong, setPyeong] = useState<number>(3000);
  const [basementFloors, setBasementFloors] = useState<number>(3);

  // 유형별 평당 공사비 기준 (만원 단위, 2026 기준 추정치)
  const costMap = {
    corporate: 980, // 사옥 평당 980만원
    kic: 820,       // 지식산업센터 평당 820만원
    rnd: 1150,      // 바이오 R&D 평당 1,150만원
  };

  const baseCostPerPyeong = costMap[buildingType] + (basementFloors - 2) * 35; // 지하층 추가 비용
  const totalCostWon = (pyeong * baseCostPerPyeong) / 10000; // 억원 단위

  // 예상 소요 공기 (개월)
  const baseMonths = buildingType === 'corporate' ? 20 : buildingType === 'kic' ? 24 : 22;
  const estimatedMonths = Math.round(baseMonths + (pyeong / 2000) + (basementFloors * 1.5));

  return (
    <section id="section-calculator" className="w-full bg-slate-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs font-bold text-blue-400 uppercase tracking-widest">
            ESTIMATION SIMULATOR
          </span>
          <h2 className="mt-3 font-mono text-2xl font-black text-white lg:text-4xl">
            신축 규모별 예상 공사비 &amp; 공기 시뮬레이터
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            건축하고자 하는 건축물의 용도와 연면적을 선택해 보세요.
            표준 내역 기준의 대략적인 총 공사비와 예상 시공 일정을 즉시 계산해 드립니다.
          </p>
        </div>

        {/* Simulator Card Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Controls */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 lg:col-span-5 lg:p-8">
            <h3 className="font-mono text-base font-bold text-white">건축 계획 기본 조건 설정</h3>
            <p className="mt-1 text-xs text-slate-400">항목을 조정하여 시뮬레이션을 실행하세요.</p>

            <div className="mt-6 space-y-6">
              {/* 건물 용도 */}
              <div>
                <label htmlFor={buildTypeSelectId} className="block font-mono text-xs text-slate-300">건물 주용도</label>
                <select
                  id={buildTypeSelectId}
                  value={buildingType}
                  onChange={(e) => setBuildingType(e.target.value as 'corporate' | 'kic' | 'rnd')}
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 font-mono text-xs text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value="corporate">기업 본사 사옥 (커튼월 &amp; 로비 특화)</option>
                  <option value="kic">스마트 지식산업센터 (드라이브인 램프 &amp; 물류)</option>
                  <option value="rnd">첨단 바이오 / 제약 R&amp;D 센터 (클린룸 설비)</option>
                </select>
              </div>

              {/* 연면적 슬라이더 */}
              <div>
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={gfaRangeId} className="text-slate-300 cursor-pointer">건축 총 연면적</label>
                  <span className="font-bold text-blue-400">
                    {pyeong.toLocaleString()} 평 ({Math.round(pyeong * 3.3058).toLocaleString()} ㎡)
                  </span>
                </div>
                <input
                  id={gfaRangeId}
                  type="range"
                  min="1000"
                  max="15000"
                  step="500"
                  value={pyeong}
                  onChange={(e) => setPyeong(Number(e.target.value))}
                  className="mt-3 w-full accent-blue-500"
                />
                <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-400">
                  <span>1,000평</span>
                  <span>7,500평</span>
                  <span>15,000평</span>
                </div>
              </div>

              {/* 지하 층수 */}
              <div>
                <label htmlFor={basementSelectId} className="block font-mono text-xs text-slate-300">지하 굴착 층수 (토공사 규모)</label>
                <select
                  id={basementSelectId}
                  value={basementFloors}
                  onChange={(e) => setBasementFloors(Number(e.target.value))}
                  className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-2.5 font-mono text-xs text-white focus:border-blue-500 focus:outline-none"
                >
                  <option value={2}>지하 2층 (일반 굴착)</option>
                  <option value={3}>지하 3층 (도심 표준)</option>
                  <option value={4}>지하 4층 (대심도 흙막이)</option>
                  <option value={5}>지하 5층 (초심도 역타 공법)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Result Display */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 lg:col-span-7 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-base font-bold text-white">시뮬레이션 산출 결과</h3>
                <span className="font-mono text-[11px] text-slate-400">(예시 시뮬레이션)</span>
              </div>

              {/* Top Result Card */}
              <div className="mt-6 rounded-xl border border-blue-500/40 bg-blue-950/30 p-6 shadow-inner">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-baseline">
                  <div>
                    <span className="font-mono text-xs text-blue-300">예상 순공사비 (VAT 별도)</span>
                    <p className="mt-1 font-mono text-3xl font-black text-white">
                      약 {totalCostWon.toFixed(1)} <span className="text-lg font-normal text-slate-300">억원</span>
                    </p>
                  </div>
                  <div className="font-mono text-xs text-slate-300 sm:text-right">
                    <span>예상 평당 공사비:</span>{' '}
                    <strong className="text-blue-400">약 {baseCostPerPyeong.toLocaleString()} 만원/평</strong>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-800 pt-4 font-mono text-xs">
                  <div>
                    <span className="text-slate-400">예상 소요 공기:</span>
                    <p className="mt-1 text-sm font-bold text-white">약 {estimatedMonths} 개월</p>
                  </div>
                  <div>
                    <span className="text-slate-400">BIM 4D 관제 적용 시:</span>
                    <p className="mt-1 text-sm font-bold text-emerald-400">공기 지연 리스크 0건 목표(예시)</p>
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="mt-6 space-y-2 font-mono text-xs">
                <span className="font-bold text-slate-400">공종별 예상 비중 (개략 표준)</span>
                <div className="grid grid-cols-4 gap-2 text-center text-[11px]">
                  <div className="rounded bg-slate-950 p-2 border border-slate-800">
                    <span className="text-slate-400">토공·기초</span>
                    <p className="mt-1 font-bold text-slate-200">18%</p>
                  </div>
                  <div className="rounded bg-slate-950 p-2 border border-slate-800">
                    <span className="text-slate-400">골조(SRC)</span>
                    <p className="mt-1 font-bold text-slate-200">32%</p>
                  </div>
                  <div className="rounded bg-slate-950 p-2 border border-slate-800">
                    <span className="text-slate-400">커튼월·마감</span>
                    <p className="mt-1 font-bold text-slate-200">28%</p>
                  </div>
                  <div className="rounded bg-slate-950 p-2 border border-slate-800">
                    <span className="text-slate-400">설비·전기</span>
                    <p className="mt-1 font-bold text-slate-200">22%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <button
                onClick={onOpenConsultation}
                className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-mono text-xs font-bold text-white shadow-md shadow-blue-600/30 transition-all hover:from-blue-500 hover:to-indigo-500"
              >
                소유 부지 맞춤형 정밀 턴키 견적서 받아보기 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
