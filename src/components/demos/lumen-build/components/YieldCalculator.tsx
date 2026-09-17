'use client';

import React, { useState } from 'react';

interface YieldCalculatorProps {
  onOpenConsultation: () => void;
}

export default function YieldCalculator({ onOpenConsultation }: YieldCalculatorProps) {
  const [sitePyeong, setSitePyeong] = useState<number>(65);
  const [zoning, setZoning] = useState<'type2' | 'type3' | 'semi' | 'commercial'>('type2');

  const zoningSpecs = {
    type2: {
      name: '제2종 일반주거지역',
      bcr: 60, // 건폐율 60%
      far: 200, // 용적률 200%
      floors: '지하 1층 / 지상 4~5층',
      buildCostPerPyeong: 980, // 평당 980만원
      monthlyRentPerPyeong: 16, // 평당 월 16만원
      depositRatio: 10, // 월세의 약 10~12배 보증금
      desc: '골목 상권 꼬마빌딩의 가장 일반적인 용도지역 (성수·연남 안쪽 상권)',
    },
    type3: {
      name: '제3종 일반주거지역',
      bcr: 50,
      far: 250,
      floors: '지하 1층 / 지상 5~6층',
      buildCostPerPyeong: 1020,
      monthlyRentPerPyeong: 18,
      depositRatio: 10,
      desc: '일조사선 여유가 있고 층수를 더 올릴 수 있는 주거밀집 상권',
    },
    semi: {
      name: '준주거지역',
      bcr: 60,
      far: 400,
      floors: '지하 1층 / 지상 7~8층',
      buildCostPerPyeong: 1080,
      monthlyRentPerPyeong: 22,
      depositRatio: 10,
      desc: '대로변 인접, 높은 용적률로 고수익 근생 타워 개발이 가능한 부지',
    },
    commercial: {
      name: '일반상업지역',
      bcr: 60,
      far: 800,
      floors: '지하 2층 / 지상 10~12층',
      buildCostPerPyeong: 1180,
      monthlyRentPerPyeong: 28,
      depositRatio: 10,
      desc: '역세권 및 메인 상권, 초대형 상업 근생 복합 빌딩 신축',
    },
  };

  const current = zoningSpecs[zoning];
  // 지상 연면적 = 대지면적 * (용적률 / 100)
  const aboveGfa = Math.round(sitePyeong * (current.far / 100));
  // 지하 1층 면적 (대지면적의 약 70%)
  const belowGfa = Math.round(sitePyeong * 0.7);
  const totalGfa = aboveGfa + belowGfa;

  // 총 예상 건축비 = 연면적 * 평당 건축비
  const estBuildCost = Math.round(totalGfa * current.buildCostPerPyeong);
  // 임대 가능 전용 면적 (전용률 약 72%)
  const leasableArea = Math.round(totalGfa * 0.72);
  // 월 총 임대료 = 임대가능면적 * 평당 월임대료
  const estMonthlyRent = Math.round(leasableArea * current.monthlyRentPerPyeong);
  // 보증금 = 월세 * 12개월
  const estDeposit = Math.round(estMonthlyRent * 12);
  // 연간 임대 수익 = 월세 * 12
  const annualRent = estMonthlyRent * 12;
  // 순 건축비 대비 단순 연수익률 (토지대 제외 건축투자비 대비)
  const yieldRate = estBuildCost > 0 ? ((annualRent / estBuildCost) * 100).toFixed(1) : '0';

  return (
    <section id="calculator" className="w-full bg-neutral-950 py-16 text-white lg:py-24 border-t border-neutral-800">
      <div className="mx-auto max-w-6xl px-6">
        {/* 헤더 */}
        <div className="text-center">
          <p className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest">
            SIMULATION TOOL
          </p>
          <h2 className="mt-2 font-mono text-2xl font-black tracking-tight text-white lg:text-4xl">
            꼬마빌딩 신축 사업성 &amp; 임대수익률 간이 계산기 (예시)
          </h2>
          <p className="mt-3 text-xs text-neutral-400 lg:text-sm">
            보유하신 대지의 면적과 용도지역을 선택하시면 예상 건축 규모와 공사비, 예상 월 임대료를 즉시 시뮬레이션해 드립니다.
          </p>
        </div>

        {/* 메인 계산기 카드 */}
        <div className="mt-10 rounded-xl border border-amber-500/30 bg-neutral-900/90 p-6 shadow-2xl backdrop-blur-xl lg:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* 좌측: 조건 입력 컨트롤 (6열) */}
            <div className="space-y-6 lg:col-span-6">
              {/* 대지 면적 슬라이더 */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-neutral-200">
                    대지 면적 (토지 평수)
                  </label>
                  <span className="font-mono text-lg font-black text-amber-400">
                    {sitePyeong}평 ({Math.round(sitePyeong * 3.3058)}㎡)
                  </span>
                </div>
                <input
                  type="range"
                  min={35}
                  max={150}
                  step={5}
                  value={sitePyeong}
                  onChange={(e) => setSitePyeong(Number(e.target.value))}
                  className="mt-3 h-2 w-full cursor-ew-resize appearance-none rounded-lg bg-neutral-800 accent-amber-500"
                />
                <div className="mt-1 flex justify-between text-[11px] font-mono text-neutral-500">
                  <span>35평 (협소 부지)</span>
                  <span>65평 (성수 표준)</span>
                  <span>150평 (코너 대형)</span>
                </div>
              </div>

              {/* 용도지역 선택 탭 */}
              <div>
                <label className="block text-xs font-bold text-neutral-200 mb-2.5">
                  해당 부지 용도지역 선택
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['type2', 'type3', 'semi', 'commercial'] as const).map((key) => {
                    const opt = zoningSpecs[key];
                    const isChecked = zoning === key;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setZoning(key)}
                        className={`rounded border p-3 text-left transition-all ${
                          isChecked
                            ? 'border-amber-500 bg-amber-500/15 text-white shadow-[0_0_12px_rgba(245,158,11,0.2)]'
                            : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700 hover:text-white'
                        }`}
                      >
                        <div className="text-xs font-bold">{opt.name}</div>
                        <div className="mt-1 font-mono text-[11px] text-amber-400">
                          용적률 {opt.far}% / 건폐율 {opt.bcr}%
                        </div>
                      </button>
                    );
                  })}
                </div>
                <p className="mt-2 text-[11px] text-neutral-400 font-mono">
                  {current.desc}
                </p>
              </div>

              {/* 기본 적용 가정 지표 */}
              <div className="rounded border border-neutral-800 bg-neutral-950/60 p-3.5 text-xs text-neutral-400">
                <div className="flex justify-between py-1 border-b border-neutral-800/60">
                  <span>기준 건축 규모:</span>
                  <span className="font-mono text-white font-bold">{current.floors}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-neutral-800/60">
                  <span>기준 평당 건축비:</span>
                  <span className="font-mono text-white font-bold">약 {current.buildCostPerPyeong}만원선 (예시)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>기준 평당 월 임대료:</span>
                  <span className="font-mono text-amber-400 font-bold">월 {current.monthlyRentPerPyeong}만원선 (예시)</span>
                </div>
              </div>
            </div>

            {/* 우측: 시뮬레이션 산출 패널 (6열) */}
            <div className="flex flex-col justify-between rounded-lg border border-amber-500/40 bg-neutral-950 p-6 lg:col-span-6">
              <div>
                <span className="font-mono text-[11px] text-amber-400">FEASIBILITY SIMULATION REPORT</span>
                <h3 className="mt-1 font-mono text-lg font-bold text-white">
                  예상 신축 규모 &amp; 임대 수익률 (예시)
                </h3>

                {/* 대형 핵심 지표 (월세 및 연수익률) */}
                <div className="my-5 grid grid-cols-2 gap-3">
                  <div className="rounded border border-neutral-800 bg-neutral-900/70 p-3.5 text-center">
                    <span className="text-[11px] text-neutral-400">예상 월 총 임대료</span>
                    <div className="mt-1 font-mono text-xl font-black text-amber-400 lg:text-2xl">
                      약 {estMonthlyRent.toLocaleString()}만 원
                    </div>
                    <span className="text-[10px] text-neutral-500 font-mono">보증금 약 {(estDeposit / 10000).toFixed(1)}억 원</span>
                  </div>

                  <div className="rounded border border-amber-500/40 bg-amber-500/10 p-3.5 text-center">
                    <span className="text-[11px] text-amber-300">건축비 대비 연수익률</span>
                    <div className="mt-1 font-mono text-xl font-black text-amber-300 lg:text-2xl">
                      연 {yieldRate}%
                    </div>
                    <span className="text-[10px] text-amber-400/80 font-mono">연간 약 {(annualRent / 10000).toFixed(2)}억 원</span>
                  </div>
                </div>

                {/* 세부 건축 규모 breakdown */}
                <div className="space-y-2 border-t border-neutral-800 pt-3 text-xs">
                  <div className="flex justify-between text-neutral-400">
                    <span>예상 연면적 (지상+지하 합계):</span>
                    <span className="font-mono text-white font-bold">{totalGfa}평 ({Math.round(totalGfa * 3.3058)}㎡)</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>임대 가능 전용 면적 (전용률 72%):</span>
                    <span className="font-mono text-white font-bold">{leasableArea}평 ({Math.round(leasableArea * 3.3058)}㎡)</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>예상 총 신축 공사비:</span>
                    <span className="font-mono text-amber-400 font-bold">약 {(estBuildCost / 10000).toFixed(2)}억 원 (예시)</span>
                  </div>
                </div>
              </div>

              {/* 하단 신청 버튼 */}
              <div className="mt-6 border-t border-neutral-800 pt-4">
                <p className="text-[11px] leading-relaxed text-neutral-500">
                  ※ 실제 도로 조건, 정화조, 주차 대수, 일조사선 규제에 따라 규모가 달라집니다.
                  정밀 가설계 도면과 테넌트 MD 배치안을 무료로 진단받아 보세요.
                </p>
                <button
                  onClick={onOpenConsultation}
                  className="mt-4 w-full rounded bg-gradient-to-r from-amber-500 to-amber-600 py-3 text-xs font-bold text-neutral-950 transition-all hover:from-amber-400 hover:to-amber-500 shadow-lg"
                >
                  해당 부지 무료 정밀 사업성 분석 신청하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
