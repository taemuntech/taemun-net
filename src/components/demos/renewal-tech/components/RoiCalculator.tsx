'use client';

import React, { useState, useId } from 'react';

interface RoiCalculatorProps {
  onOpenConsultation: () => void;
}

export default function RoiCalculator({ onOpenConsultation }: RoiCalculatorProps) {
  const gfaInputId = useId();
  const districtSelectId = useId();
  const [pyeong, setPyeong] = useState<number>(800);
  const [locationType, setLocationType] = useState<string>('gangnam'); // gangnam, cbd, seongsu, other

  // 평당 건축비 기준 (2025-2026 기준 추정치, 만원 단위)
  const newBuildCostPerPyeong = 1000; // 신축 평당 1,000만원
  const demolitionCostPerPyeong = 60; // 신축 철거비 평당 60만원
  const retrofitCostPerPyeong = 580; // 리모델링 대수선 평당 580만원

  // 공사 기간 (월 단위)
  const newBuildMonths = Math.round(16 + (pyeong / 200));
  const retrofitMonths = Math.round(6 + (pyeong / 400));
  const savedMonths = newBuildMonths - retrofitMonths;

  // 신축 총비용 (억원)
  const newDemolitionTotal = (pyeong * demolitionCostPerPyeong) / 10000;
  const newConstructionTotal = (pyeong * newBuildCostPerPyeong) / 10000;
  const newBuildTotalCost = newDemolitionTotal + newConstructionTotal;

  // 대수선 총비용 (억원)
  const retrofitDemolitionTotal = (pyeong * 10) / 10000; // 내부 철거만 소액
  const retrofitConstructionTotal = (pyeong * retrofitCostPerPyeong) / 10000;
  const retrofitTotalCost = retrofitDemolitionTotal + retrofitConstructionTotal;

  // 공사비 절감액
  const savedCost = newBuildTotalCost - retrofitTotalCost;
  const savingPercentage = Math.round((savedCost / newBuildTotalCost) * 100);

  // 조기 임대 개시로 인한 추가 임대수익 추정 (평당 월임대료)
  const monthlyRentPerPyeong = locationType === 'gangnam' ? 14 : locationType === 'cbd' ? 13 : locationType === 'seongsu' ? 11 : 9;
  const earlyRentIncome = (pyeong * 0.6 * monthlyRentPerPyeong * savedMonths) / 10000; // 전용률 60% 가정

  return (
    <section id="section-roi" className="w-full bg-neutral-900 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest">
            FINANCIAL SIMULATION
          </span>
          <h2 className="mt-3 font-mono text-2xl font-black text-white lg:text-4xl">
            신축 VS 대수선 비용 &amp; ROI 비교 시뮬레이터
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            소유하신 건물의 연면적을 입력해 보세요. 기존 골조 보존으로 절감되는 공사비와 
            공기 단축에 따른 조기 임대수익 효과를 즉시 계산해 드립니다.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Controls Panel */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 lg:col-span-5 lg:p-8">
            <h3 className="font-mono text-base font-bold text-white">건물 기본 정보 설정</h3>
            <p className="mt-1 text-xs text-neutral-500">슬라이더를 움직여 건물 연면적을 설정하세요.</p>

            <div className="mt-6 space-y-6">
              {/* 연면적 슬라이더 */}
              <div>
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={gfaInputId} className="text-neutral-400 cursor-pointer">건물 총 연면적</label>
                  <span className="font-bold text-cyan-400">
                    {pyeong.toLocaleString()} 평 ({Math.round(pyeong * 3.3058).toLocaleString()} ㎡)
                  </span>
                </div>
                <input
                  id={gfaInputId}
                  type="range"
                  min="200"
                  max="3000"
                  step="50"
                  value={pyeong}
                  onChange={(e) => setPyeong(Number(e.target.value))}
                  className="mt-3 w-full accent-cyan-400"
                />
                <div className="mt-1 flex justify-between font-mono text-[10px] text-neutral-600">
                  <span>200평 (소형)</span>
                  <span>1,500평 (중형)</span>
                  <span>3,000평 (대형)</span>
                </div>
              </div>

              {/* 상권 권역 선택 */}
              <div>
                <label htmlFor={districtSelectId} className="block font-mono text-xs text-neutral-400">
                  소재지 권역 (예상 임대료 산정)
                </label>
                <select
                  id={districtSelectId}
                  value={locationType}
                  onChange={(e) => setLocationType(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2.5 font-mono text-xs text-neutral-200 focus:border-cyan-500 focus:outline-none"
                >
                  <option value="gangnam">강남·테헤란로 업무권역 (평당 14만원선)</option>
                  <option value="cbd">종로·중구 CBD 도심권역 (평당 13만원선)</option>
                  <option value="seongsu">성수·한남 트렌드 상권 (평당 11만원선)</option>
                  <option value="other">기타 수도권 및 광역시 (평당 9만원선)</option>
                </select>
              </div>

              {/* 공법별 비교 포인트 요약 */}
              <div className="rounded-lg border border-cyan-500/20 bg-cyan-950/20 p-4 font-mono text-xs text-cyan-300">
                <div className="flex items-center gap-2 font-bold text-cyan-400">
                  <span>💡</span> 대수선 공법의 핵심 우위
                </div>
                <ul className="mt-2 space-y-1 text-[11px] text-neutral-300">
                  <li>• 기존 철근콘크리트 골조를 유지하여 철거비 80% 이상 절감</li>
                  <li>• 건축 심의 및 인허가 기간이 신축 대비 대폭 단축</li>
                  <li>• 기초 터파기 공사가 없어 인근 민원 및 지반 침하 리스크 최소화</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Result Panel */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 lg:col-span-7 lg:p-8">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-base font-bold text-white">비교 분석 시뮬레이션 결과</h3>
              <span className="font-mono text-[11px] text-neutral-500">(예시 시뮬레이션)</span>
            </div>

            {/* Comparison Cards */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* 신축 박스 */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5">
                <span className="font-mono text-xs text-neutral-500">기존 철거 후 전면 신축</span>
                <p className="mt-2 font-mono text-2xl font-black text-neutral-300">
                  {newBuildTotalCost.toFixed(1)} <span className="text-sm font-normal">억원</span>
                </p>
                <div className="mt-4 space-y-1.5 font-mono text-[11px] text-neutral-400">
                  <div className="flex justify-between">
                    <span>완전 철거 및 폐기물</span>
                    <span>{newDemolitionTotal.toFixed(1)} 억원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>순수 신축 공사비</span>
                    <span>{newConstructionTotal.toFixed(1)} 억원</span>
                  </div>
                  <div className="flex justify-between border-t border-neutral-800 pt-1 text-neutral-300">
                    <span>예상 공사 기간</span>
                    <span className="text-rose-400 font-bold">약 {newBuildMonths} 개월</span>
                  </div>
                </div>
              </div>

              {/* 대수선 박스 */}
              <div className="rounded-xl border border-cyan-500/50 bg-cyan-950/20 p-5 shadow-lg shadow-cyan-950/50">
                <span className="font-mono text-xs font-bold text-cyan-400">리뉴얼테크 대수선 엔지니어링</span>
                <p className="mt-2 font-mono text-2xl font-black text-cyan-300">
                  {retrofitTotalCost.toFixed(1)} <span className="text-sm font-normal">억원</span>
                </p>
                <div className="mt-4 space-y-1.5 font-mono text-[11px] text-neutral-300">
                  <div className="flex justify-between">
                    <span>내부 부분 철거비</span>
                    <span>{retrofitDemolitionTotal.toFixed(1)} 억원</span>
                  </div>
                  <div className="flex justify-between">
                    <span>보강 &amp; 커튼월 공사비</span>
                    <span>{retrofitConstructionTotal.toFixed(1)} 억원</span>
                  </div>
                  <div className="flex justify-between border-t border-cyan-500/20 pt-1 text-white">
                    <span>예상 공사 기간</span>
                    <span className="text-cyan-400 font-bold">약 {retrofitMonths} 개월</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Highlighted Savings Banner */}
            <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-5">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <div>
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    ★ 리뉴얼테크 적용 시 총 절감 기대 효과 (예시)
                  </span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-mono text-3xl font-black text-white">
                      약 {savedCost.toFixed(1)} 억원
                    </span>
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      ({savingPercentage}% 절감)
                    </span>
                  </div>
                </div>
                <div className="text-left sm:text-right font-mono text-xs text-neutral-300">
                  <p>공기 단축 효과: <strong className="text-cyan-400">{savedMonths}개월 단축</strong></p>
                  <p className="mt-1">조기 임대 기대수익: <strong className="text-emerald-300">+{earlyRentIncome.toFixed(1)}억원</strong></p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-6">
              <button
                onClick={onOpenConsultation}
                className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 font-mono text-xs font-bold text-neutral-950 shadow-md shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-blue-500"
              >
                내 건물 맞춤형 정밀 가치평가 및 수지분석표 받아보기 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
