'use client';

import React, { useState, useId } from 'react';

interface LogisticsCostCalculatorProps {
  onOpenConsultation: () => void;
}

export default function LogisticsCostCalculator({ onOpenConsultation }: LogisticsCostCalculatorProps) {
  const gfaRangeId = useId();
  const facilityTypeSelectId = useId();
  const rampSelectId = useId();

  const [facilityType, setFacilityType] = useState<'ambient' | 'hybrid' | 'cold-asrs'>('hybrid');
  const [pyeong, setPyeong] = useState<number>(20000);
  const [rampType, setRampType] = useState<string>('double-ramp');

  // 평당 공사비 (만원 단위)
  const baseCostMap = {
    ambient: 460,       // 상온 전용 평당 460만원
    hybrid: 630,        // 상온+저온 복합 평당 630만원
    'cold-asrs': 790,   // 자동화 초저온 풀필먼트 평당 790만원
  };

  const rampAddCost = rampType === 'double-ramp' ? 40 : rampType === 'single-ramp' ? 20 : 0;
  const costPerPyeong = baseCostMap[facilityType] + rampAddCost;
  const totalCostWon = (pyeong * costPerPyeong) / 10000; // 억원 단위

  // 예상 공기 (개월)
  const baseMonths = facilityType === 'ambient' ? 16 : facilityType === 'hybrid' ? 20 : 23;
  const estimatedMonths = Math.round(baseMonths + (pyeong / 10000));

  // 예상 도크 개수
  const estimatedDocks = Math.round(pyeong / 400);

  return (
    <section id="section-calc" className="w-full bg-neutral-900 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest">
            LOGISTICS ESTIMATION SIMULATOR
          </span>
          <h2 className="mt-3 font-mono text-2xl font-black text-white lg:text-4xl">
            물류센터 규모별 예상 공사비 &amp; 시공 기간 계산기
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            개발 예정 부지의 목표 연면적과 저온 설비 비중을 선택하세요.
            개략 공사비와 최적화된 램프 접안 설계를 즉시 시뮬레이션해 드립니다.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Controls */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 lg:col-span-5 lg:p-8">
            <h3 className="font-mono text-base font-bold text-white">물류 시설 개발 조건 설정</h3>
            <p className="mt-1 text-xs text-neutral-500">슬라이더와 옵션을 선택해 시뮬레이션을 실행하세요.</p>

            <div className="mt-6 space-y-6">
              {/* 시설 유형 */}
              <div>
                <label htmlFor={facilityTypeSelectId} className="block font-mono text-xs text-neutral-300">물류 시설 유형</label>
                <select
                  id={facilityTypeSelectId}
                  value={facilityType}
                  onChange={(e) => setFacilityType(e.target.value as 'ambient' | 'hybrid' | 'cold-asrs')}
                  className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 p-2.5 font-mono text-xs text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="ambient">상온 전용 풀필먼트 센터 (평탄도 특화)</option>
                  <option value="hybrid">상온 + 저온 복합 메가 허브 (추천 표준)</option>
                  <option value="cold-asrs">-25℃ 전자동화 초저온 냉동창고 (AS/RS)</option>
                </select>
              </div>

              {/* 연면적 슬라이더 */}
              <div>
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={gfaRangeId} className="text-neutral-300 cursor-pointer">개발 총 연면적</label>
                  <span className="font-bold text-cyan-400">
                    {pyeong.toLocaleString()} 평 ({Math.round(pyeong * 3.3058).toLocaleString()} ㎡)
                  </span>
                </div>
                <input
                  id={gfaRangeId}
                  type="range"
                  min="10000"
                  max="50000"
                  step="2000"
                  value={pyeong}
                  onChange={(e) => setPyeong(Number(e.target.value))}
                  className="mt-3 w-full accent-cyan-400"
                />
                <div className="mt-1 flex justify-between font-mono text-[10px] text-neutral-600">
                  <span>1만평 (중형)</span>
                  <span>3만평 (대형)</span>
                  <span>5만평 (메가 허브)</span>
                </div>
              </div>

              {/* 램프 접안 방식 */}
              <div>
                <label htmlFor={rampSelectId} className="block font-mono text-xs text-neutral-300">화물차 램프 접안 방식</label>
                <select
                  id={rampSelectId}
                  value={rampType}
                  onChange={(e) => setRampType(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 p-2.5 font-mono text-xs text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="double-ramp">전 층 직접 접안 원형 더블 램프 (회전 효율 극대화)</option>
                  <option value="single-ramp">1~2층 직접 램프 + 상층부 화물 리프트</option>
                  <option value="lift-only">1층 전용 도크 + 화물 수직 반송기(Vrc)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 lg:col-span-7 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-base font-bold text-white">시뮬레이션 산출 결과</h3>
                <span className="font-mono text-[11px] text-neutral-500">(예시 시뮬레이션)</span>
              </div>

              {/* Primary Card */}
              <div className="mt-6 rounded-xl border border-cyan-500/40 bg-cyan-950/20 p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-baseline">
                  <div>
                    <span className="font-mono text-xs text-cyan-300">예상 순시공비 (VAT 별도)</span>
                    <p className="mt-1 font-mono text-3xl font-black text-white">
                      약 {totalCostWon.toFixed(1)} <span className="text-lg font-normal text-slate-300">억원</span>
                    </p>
                  </div>
                  <div className="font-mono text-xs text-slate-300 sm:text-right">
                    <span>예상 평당 시공비:</span>{' '}
                    <strong className="text-cyan-400">약 {costPerPyeong.toLocaleString()} 만원/평</strong>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-cyan-500/20 pt-4 font-mono text-xs">
                  <div>
                    <span className="text-neutral-400">예상 시공 기간:</span>
                    <p className="mt-1 text-sm font-bold text-white">약 {estimatedMonths} 개월 (PC공법 적용)</p>
                  </div>
                  <div>
                    <span className="text-neutral-400">예상 하역 도크 쉘터:</span>
                    <p className="mt-1 text-sm font-bold text-emerald-400">약 {estimatedDocks} 개 도크(예시)</p>
                  </div>
                </div>
              </div>

              {/* Engineering Highlights for this selection */}
              <div className="mt-6 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 font-mono text-xs">
                <span className="font-bold text-cyan-400">💡 시공 최적화 제안</span>
                <p className="mt-1.5 text-xs text-neutral-300 leading-relaxed">
                  PC(프리캐스트 콘크리트) 공법 적용 시 동절기 골조 타설 중단 없이 연속 시공이 가능하여,
                  RC 대비 공사 기간을 4~5개월 단축할 수 있습니다(예시).
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <button
                onClick={onOpenConsultation}
                className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 font-mono text-xs font-bold text-neutral-950 shadow-md shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-blue-500"
              >
                소유 부지 물류 개발 타당성 및 수지분석 리포트 신청하기 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
