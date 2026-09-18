'use client';

import React, { useState, useId } from 'react';

interface CivilCostEstimatorProps {
  onOpenConsultation: () => void;
}

export default function CivilCostEstimator({ onOpenConsultation }: CivilCostEstimatorProps) {
  const lengthRangeId = useId();
  const infraTypeSelectId = useId();
  const groundTypeSelectId = useId();

  const [infraType, setInfraType] = useState<'bridge' | 'tunnel' | 'highway'>('bridge');
  const [lengthKm, setLengthKm] = useState<number>(3.5);
  const [groundCondition, setGroundCondition] = useState<string>('complex');

  // km당 개략 공사비 (억원)
  const costPerKmMap = {
    bridge: 850,   // 교량 km당 약 850억원
    tunnel: 680,   // 터널 km당 약 680억원
    highway: 320,  // 도로 km당 약 320억원
  };

  const groundFactor = groundCondition === 'complex' ? 1.15 : groundCondition === 'hard' ? 1.05 : 1.0;
  const totalCostWon = lengthKm * costPerKmMap[infraType] * groundFactor;

  // 예상 소요 공기 (개월)
  const baseMonths = infraType === 'bridge' ? 36 : infraType === 'tunnel' ? 30 : 24;
  const estimatedMonths = Math.round(baseMonths + (lengthKm * 3.5));

  return (
    <section id="section-estimator" className="w-full bg-neutral-900 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest">
            CIVIL INFRASTRUCTURE ESTIMATOR
          </span>
          <h2 className="mt-3 font-mono text-2xl font-black text-white lg:text-4xl">
            인프라 공종별 개략 사업비 &amp; 공기 시뮬레이터
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            계획 중인 인프라 공종(교량, 터널, 도로)과 총 연장(km)을 선택하세요.
            국토교통 표준품셈 기준의 개략 순공사비와 적정 공사 기간을 즉시 산출해 드립니다.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Controls */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 lg:col-span-5 lg:p-8">
            <h3 className="font-mono text-base font-bold text-white">인프라 사업 조건 설정</h3>
            <p className="mt-1 text-xs text-neutral-500">슬라이더를 움직여 노선 연장을 설정하세요.</p>

            <div className="mt-6 space-y-6">
              {/* 공종 선택 */}
              <div>
                <label htmlFor={infraTypeSelectId} className="block font-mono text-xs text-neutral-300">인프라 공종 유형</label>
                <select
                  id={infraTypeSelectId}
                  value={infraType}
                  onChange={(e) => setInfraType(e.target.value as 'bridge' | 'tunnel' | 'highway')}
                  className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 p-2.5 font-mono text-xs text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="bridge">해상 / 산악 장대교량 (사장교·PSC박스)</option>
                  <option value="tunnel">도심 대심도 복선 철도 터널 (NATM)</option>
                  <option value="highway">산악 4~6차선 고속도로 토공 및 분기점</option>
                </select>
              </div>

              {/* 연장 슬라이더 */}
              <div>
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={lengthRangeId} className="text-neutral-300 cursor-pointer">구간 계획 총 연장</label>
                  <span className="font-bold text-amber-400">
                    {lengthKm.toFixed(1)} km ({(lengthKm * 1000).toLocaleString()} m)
                  </span>
                </div>
                <input
                  id={lengthRangeId}
                  type="range"
                  min="0.5"
                  max="15.0"
                  step="0.5"
                  value={lengthKm}
                  onChange={(e) => setLengthKm(Number(e.target.value))}
                  className="mt-3 w-full accent-amber-500"
                />
                <div className="mt-1 flex justify-between font-mono text-[10px] text-neutral-600">
                  <span>0.5 km (단기)</span>
                  <span>7.5 km (중기)</span>
                  <span>15.0 km (대형 SOC)</span>
                </div>
              </div>

              {/* 지반/해상 난이도 */}
              <div>
                <label htmlFor={groundTypeSelectId} className="block font-mono text-xs text-neutral-300">지반 및 환경 조건</label>
                <select
                  id={groundTypeSelectId}
                  value={groundCondition}
                  onChange={(e) => setGroundCondition(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 p-2.5 font-mono text-xs text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="complex">고난도 복합 지형 (외해 조류 / 단층 파쇄대)</option>
                  <option value="hard">경암 지반 / 일반 하천 횡단</option>
                  <option value="standard">일반 평지 및 구릉지</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 lg:col-span-7 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-base font-bold text-white">개략 사업비 산출 결과</h3>
                <span className="font-mono text-[11px] text-neutral-500">(예시 시뮬레이션)</span>
              </div>

              {/* Card */}
              <div className="mt-6 rounded-xl border border-amber-500/40 bg-amber-950/20 p-6">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-baseline">
                  <div>
                    <span className="font-mono text-xs text-amber-300">예상 순공사비 (토목 직접비)</span>
                    <p className="mt-1 font-mono text-3xl font-black text-white">
                      약 {Math.round(totalCostWon).toLocaleString()} <span className="text-lg font-normal text-slate-300">억원</span>
                    </p>
                  </div>
                  <div className="font-mono text-xs text-slate-300 sm:text-right">
                    <span>km당 평균 공사비:</span>{' '}
                    <strong className="text-amber-400">약 {Math.round(costPerKmMap[infraType] * groundFactor)} 억원/km</strong>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-amber-500/20 pt-4 font-mono text-xs">
                  <div>
                    <span className="text-neutral-400">예상 소요 공사기간:</span>
                    <p className="mt-1 text-sm font-bold text-white">약 {estimatedMonths} 개월</p>
                  </div>
                  <div>
                    <span className="text-neutral-400">적용 특화 공법:</span>
                    <p className="mt-1 text-sm font-bold text-emerald-400">
                      {infraType === 'bridge' ? 'MSS / 사장교 가설' : infraType === 'tunnel' ? '도심 NATM 터널' : '입체 토공 밸런싱'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Engineering Advice */}
              <div className="mt-6 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 font-mono text-xs">
                <span className="font-bold text-amber-400">💡 엔지니어링 제안</span>
                <p className="mt-1.5 text-xs text-neutral-300 leading-relaxed">
                  드론 3D 라이다 기반 정밀 지형 측량과 BIM 토공량 최적화를 적용하면,
                  설계 변경률을 1.5% 이내로 통제하고 토공 운반비를 대폭 절감할 수 있습니다(예시).
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <button
                onClick={onOpenConsultation}
                className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 py-3.5 font-mono text-xs font-bold text-neutral-950 shadow-md shadow-amber-500/20 transition-all hover:from-amber-400 hover:to-orange-400"
              >
                인프라 개발 타당성 및 턴키 견적 협력 신청하기 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
