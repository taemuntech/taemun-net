'use client';

import React, { useState, useMemo } from 'react';
import { UNIVERSITIES } from '../data/mockData';

interface SimulatorSectionProps {
  onOpenReservation: () => void;
}

export const SimulatorSection: React.FC<SimulatorSectionProps> = ({ onOpenReservation }) => {
  const [korean, setKorean] = useState<number>(98);
  const [math, setMath] = useState<number>(99);
  const [science, setScience] = useState<number>(98);
  const [savedCalculation, setSavedCalculation] = useState<boolean>(false);

  // Dynamic calculations based on university weights
  const calculationResults = useMemo(() => {
    return UNIVERSITIES.map((univ) => {
      // Score calculation model matching the formula
      const rawComposite =
        korean * univ.weightKorean +
        math * univ.weightMath +
        science * univ.weightScience;

      // Normalize around university base score calibration
      const baseRatio = univ.id === 'snu' ? 0.992 : univ.id === 'ysu' ? 0.984 : univ.id === 'cmc' ? 0.983 : 0.97;
      const score = (rawComposite * baseRatio).toFixed(1);
      const numScore = parseFloat(score);

      let statusBadge = '도전 소신권(예시)';
      let badgeStyle = 'bg-[#FFFBEB] text-[#B45309]';

      if (numScore >= univ.statusThreshSafe) {
        statusBadge = univ.id === 'khu' ? '최상위 안정(예시)' : '안정 지원권(예시)';
        badgeStyle = 'bg-[#ECFDF5] text-[#047857]';
      } else if (numScore >= univ.statusThreshOptimal) {
        statusBadge = '적정 합격권(예시)';
        badgeStyle = 'bg-primary/10 text-primary';
      } else {
        statusBadge = '도전 소신권(예시)';
        badgeStyle = 'bg-[#FFFBEB] text-[#B45309]';
      }

      return {
        ...univ,
        calculatedScore: score,
        statusBadge,
        badgeStyle,
      };
    });
  }, [korean, math, science]);

  const handleSaveCalculation = () => {
    setSavedCalculation(true);
    setTimeout(() => setSavedCalculation(false), 2500);
  };

  return (
    <section className="w-full py-16 lg:py-24 bg-surface-container-low" id="simulator">
      <div className="max-w-[1320px] mx-auto px-4 lg:px-12 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col text-center items-center gap-3 max-w-2xl mx-auto">
          <span className="font-label-md text-primary tracking-widest uppercase">
            REAL-TIME SIMULATION ENGINE
          </span>
          <h2 className="font-headline-lg text-on-surface">
            모의지원 정밀 시뮬레이터 (Med-Pass Preview, 예시)
          </h2>
          <p className="font-body-md text-on-surface-variant">
            자녀의 예상 수능 국어/수학/과탐 백분위를 슬라이더로 조작해 보십시오. 10개년 입결 분석 알고리즘이 전국 주요 의과대학 합격 가능성을 시뮬레이션합니다(가상 예시).
          </p>
        </div>

        {/* Simulator Main Card */}
        <div className="p-6 lg:p-12 rounded-3xl bg-surface-container-lowest shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-10 border border-surface-container-high/40">
          {/* Sliders Form (Left) */}
          <div className="lg:col-span-6 flex flex-col gap-8">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container">
              <h3 className="font-title-lg text-on-surface">영역별 백분위 입력</h3>
              <span className="font-label-sm text-primary font-semibold">
                2026학년도 수능 반영비율 적용(예시)
              </span>
            </div>

            {/* Korean Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="font-title-md text-on-surface" htmlFor="slider-korean">
                  국어 영역 (언어와 매체)
                </label>
                <span className="font-headline-sm text-primary font-bold">
                  {korean}%
                </span>
              </div>
              <input
                id="slider-korean"
                type="range"
                min="92"
                max="100"
                step="1"
                value={korean}
                onChange={(e) => setKorean(parseInt(e.target.value, 10))}
                className="w-full h-2.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between font-label-sm text-outline">
                <span>92% (1등급 컷)</span>
                <span>100% (만점)</span>
              </div>
            </div>

            {/* Math Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="font-title-md text-on-surface" htmlFor="slider-math">
                  수학 영역 (미적분/기하)
                </label>
                <span className="font-headline-sm text-primary font-bold">
                  {math}%
                </span>
              </div>
              <input
                id="slider-math"
                type="range"
                min="90"
                max="100"
                step="1"
                value={math}
                onChange={(e) => setMath(parseInt(e.target.value, 10))}
                className="w-full h-2.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between font-label-sm text-outline">
                <span>90% (상위 2등급)</span>
                <span>100% (전국 수석)</span>
              </div>
            </div>

            {/* Science Slider */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="font-title-md text-on-surface" htmlFor="slider-sci">
                  과학탐구 2과목 평균
                </label>
                <span className="font-headline-sm text-primary font-bold">
                  {science}%
                </span>
              </div>
              <input
                id="slider-sci"
                type="range"
                min="90"
                max="100"
                step="1"
                value={science}
                onChange={(e) => setScience(parseInt(e.target.value, 10))}
                className="w-full h-2.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between font-label-sm text-outline">
                <span>90% (상위권)</span>
                <span>100% (만점)</span>
              </div>
            </div>

            {/* Info and Save Callout */}
            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-xl bg-surface-container-low flex items-center gap-3 border border-surface-container">
                <span className="material-symbols-outlined text-primary text-[24px] shrink-0">
                  verified
                </span>
                <span className="font-body-sm text-on-surface-variant">
                  영어 1등급, 한국사 1등급 기본 적용 상태의 환산점수 산출입니다(예시).
                </span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={handleSaveCalculation}
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer min-h-[44px]"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    bookmark
                  </span>
                  <span>{savedCalculation ? '시뮬레이션 결과 저장됨!' : '이 성적 조합 저장하기'}</span>
                </button>
                <button
                  onClick={() => {
                    setKorean(100);
                    setMath(100);
                    setScience(100);
                  }}
                  className="text-xs text-on-surface-variant hover:text-primary transition-colors cursor-pointer min-h-[44px]"
                >
                  전과목 수석(100%) 프리셋
                </button>
              </div>
            </div>
          </div>

          {/* Real-Time Result Cards (Right) */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-title-lg text-on-surface">대학별 실시간 합격 확률 판독(예시)</h3>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="font-label-sm text-on-surface font-semibold">
                  계산 엔진 가동중
                </span>
              </div>
            </div>

            {/* University Cards */}
            <div className="flex flex-col gap-3">
              {calculationResults.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between shadow-xs border border-surface-container-high/40 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center font-bold text-on-surface text-xs shadow-xs">
                      {item.code}
                    </div>
                    <div>
                      <div className="font-title-md text-on-surface text-sm lg:text-base">
                        {item.name}
                      </div>
                      <div className="font-label-sm text-on-surface-variant">
                        환산 표준점수{' '}
                        <span className="font-bold text-on-surface">
                          {item.calculatedScore}점
                        </span>{' '}
                        {item.quotaNote}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full font-title-md text-xs lg:text-sm font-bold shrink-0 ${item.badgeStyle}`}
                  >
                    {item.statusBadge}
                  </span>
                </div>
              ))}
            </div>

            <p className="font-label-sm text-outline text-right mt-2">
              * 2026학년도 대학별 변환표준점수 산출공식 반영 기준 (오차범위 ±0.3점, 예시)
            </p>

            <div className="mt-auto p-4 rounded-xl bg-surface-container flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-title-md text-xs text-on-surface font-bold">
                  자녀의 정밀 진단 성적표와 맞춤 전략이 필요하신가요?
                </span>
                <span className="text-[11px] text-on-surface-variant">
                  1:1 심층 브리핑 신청 접수 중(예시)
                </span>
              </div>
              <button
                onClick={onOpenReservation}
                className="px-3.5 py-2 rounded-lg bg-inverse-surface text-surface text-xs font-semibold hover:bg-on-surface transition-colors cursor-pointer shadow-xs min-h-[44px]"
              >
                1:1 분석 신청
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
