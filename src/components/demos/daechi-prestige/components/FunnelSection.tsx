'use client';

import React, { useState } from 'react';
import { FUNNEL_STAGES } from '../data/mockData';

interface FunnelSectionProps {
  onOpenReservation: () => void;
}

export const FunnelSection: React.FC<FunnelSectionProps> = ({ onOpenReservation }) => {
  const [activeStageIndex, setActiveStageIndex] = useState<number | null>(null);

  return (
    <section className="w-full py-16 lg:py-24 bg-surface">
      <div className="max-w-[1320px] mx-auto px-4 lg:px-12 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col text-center items-center gap-3 max-w-2xl mx-auto">
          <span className="font-label-md text-primary tracking-widest uppercase">
            MED-PASS FUNNEL ARCHITECTURE
          </span>
          <h2 className="font-headline-lg text-on-surface">의대 합격 3단계 정밀 로드맵(예시)</h2>
          <p className="font-body-md text-on-surface-variant">
            오직 상위 0.01% 메디컬 지망생만을 위해 설계된 체계적인 3단계 파이프라인(예시). 막연한 다독이 아닌 수험생의 점수를 확실한 합격권으로 끌어올립니다.
          </p>
        </div>

        {/* 3-Stage Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
          {FUNNEL_STAGES.map((item, index) => {
            const isSelected = activeStageIndex === index;
            const isStage2 = index === 1;

            return (
              <div
                key={item.stage}
                onClick={() => setActiveStageIndex(isSelected ? null : index)}
                className={`flex flex-col p-8 rounded-2xl transition-all cursor-pointer border ${
                  isStage2
                    ? 'bg-surface-container-lowest shadow-md hover:shadow-xl border-tertiary-container/40'
                    : 'bg-surface-container-low shadow-xs hover:shadow-md border-transparent'
                } ${isSelected ? 'ring-2 ring-primary scale-[1.02]' : ''}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`font-label-md font-bold px-3 py-1 rounded ${
                      isStage2
                        ? 'text-tertiary bg-tertiary-container/30'
                        : 'text-primary bg-primary/10'
                    }`}
                  >
                    {item.stage}
                  </span>
                  <span
                    className={`material-symbols-outlined text-[28px] ${
                      isStage2 ? 'text-tertiary' : 'text-primary'
                    }`}
                  >
                    {item.icon}
                  </span>
                </div>

                <h3 className="font-title-lg text-on-surface mb-2">{item.title}</h3>
                <p className="font-body-md text-on-surface-variant mb-6">{item.description}</p>

                {/* Optional expanded curriculum */}
                {isSelected && (
                  <div className="mb-6 p-3 bg-surface-container rounded-xl text-xs flex flex-col gap-1.5 animate-in fade-in">
                    <span className="font-bold text-on-surface mb-1">핵심 세부 커리큘럼(예시):</span>
                    {item.curriculum.map((c, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-on-surface-variant">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-auto flex flex-col gap-2 pt-4 border-none">
                  <div className="flex justify-between font-label-sm text-on-surface-variant">
                    <span>{item.metricLabel}</span>
                    <span
                      className={`font-bold ${
                        isStage2 ? 'text-tertiary font-title-md' : 'text-primary font-title-md'
                      }`}
                    >
                      {item.metricValue}
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isStage2 ? 'bg-tertiary' : 'bg-primary'
                      }`}
                      style={{ width: `${item.progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="p-6 rounded-2xl bg-inverse-surface text-surface flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed-dim/20 flex items-center justify-center shrink-0 text-primary-fixed-dim">
              <span className="material-symbols-outlined text-[28px]">
                verified
              </span>
            </div>
            <div>
              <h4 className="font-title-lg text-surface">
                단계별 합격 가능성 1:1 맞춤 진단이 필요하신가요?
              </h4>
              <p className="font-body-sm text-surface/80">
                원장단이 학생의 최근 3개년 모의고사 성적표를 직접 정밀 해체하여 0.1점 단위의 맞춤형 합격 로드맵을 설계해 드립니다(예시).
              </p>
            </div>
          </div>
          <button
            onClick={onOpenReservation}
            className="px-6 py-3.5 rounded-xl bg-primary text-on-primary font-title-md font-bold shadow-md hover:bg-primary-container hover:text-on-primary-container transition-all shrink-0 cursor-pointer min-h-[44px]"
          >
            로드맵 1:1 진단 예약하기
          </button>
        </div>
      </div>
    </section>
  );
};
