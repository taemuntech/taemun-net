'use client';

import React, { useState } from 'react';
import { KILLER_CALLOUTS } from '../data/mockData';

interface KillerAnatomySectionProps {
  onOpenSolutionModal: () => void;
}

export const KillerAnatomySection: React.FC<KillerAnatomySectionProps> = ({
  onOpenSolutionModal,
}) => {
  const [activeCalloutId, setActiveCalloutId] = useState<'A' | 'B' | 'C' | null>(null);

  return (
    <section className="w-full py-16 lg:py-24 bg-surface-container-low" id="killer-anatomy">
      <div className="max-w-[1320px] mx-auto px-4 lg:px-12 flex flex-col gap-12">
        {/* Section Header */}
        <div className="flex flex-col gap-2 max-w-2xl">
          <span className="font-label-md text-primary tracking-widest uppercase">
            QUESTION DISSECTION ANATOMY
          </span>
          <h2 className="font-headline-lg text-on-surface tracking-tight">
            수학 미적분 30번 킬러문항 시각 해부도(예시) —<br />
            두려운 수식 대신 3초 구조화
          </h2>
          <p className="font-body-md text-on-surface-variant">
            학부모님께서도 한눈에 납득할 수 있는 문항 해체도입니다. 복잡한 18분의 계산 과정을 평가원 출제자의 의도에 맞춘 3분 30초 대칭 숏컷으로 변환합니다(예시).
          </p>
        </div>

        {/* 2-Column Dissection Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Mock Exam Paper with Visual Annotations */}
          <div className="lg:col-span-7 p-6 lg:p-8 rounded-2xl bg-surface-container-lowest shadow-md flex flex-col gap-6 relative border border-surface-container-high/40">
            {/* Exam Header */}
            <div className="flex items-center justify-between pb-4 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-surface-container-high font-title-md text-primary font-bold text-sm">
                  2026학년도 대비 모의평가(예시)
                </span>
                <span className="font-title-md text-on-surface">수학 영역 (미적분)</span>
              </div>
              <span className="font-headline-sm text-primary font-bold">30번 [4점]</span>
            </div>

            {/* Problem Description */}
            <div className="p-4 rounded-xl bg-surface-container-low font-body-md text-on-surface leading-relaxed relative border border-surface-container">
              <p className="mb-3">
                최고차항의 계수가 1인 사차함수 <span className="font-serif italic font-semibold">f(x)</span>와 구간 <span className="font-serif italic font-semibold">(0, ∞)</span>에서 정의된 함수 <span className="font-serif italic font-semibold">g(x) = ln(f(x))</span>가 다음 조건을 만족시킨다.
              </p>
              <div className="p-4 rounded-lg bg-surface-container-lowest shadow-xs flex flex-col gap-2 my-2 text-sm border border-surface-container/60">
                <p>
                  (가) 모든 양수 <span className="font-serif italic">x</span>에 대하여 <span className="font-serif italic">g'(x) ≤ 0</span>이다.
                </p>
                <p>
                  (나) 함수 <span className="font-serif italic">| g(x) - t |</span>가 오직 한 점에서만 미분가능하지 않도록 하는 모든 실수 <span className="font-serif italic">t</span>의 값의 범위는 <span className="font-serif italic">t ≥ ln 2</span>이다.
                </p>
              </div>
              <p className="mt-2 text-on-surface font-semibold">
                <span className="font-serif italic">f'(3) / f(1)</span>의 값을 구하시오.
              </p>
            </div>

            {/* 3 Visual Callouts */}
            <div className="flex flex-col gap-3">
              {KILLER_CALLOUTS.map((callout) => {
                const isActive = activeCalloutId === callout.id;
                return (
                  <div
                    key={callout.id}
                    onClick={() =>
                      setActiveCalloutId(isActive ? null : callout.id)
                    }
                    className={`p-4 rounded-xl flex items-start gap-3.5 shadow-xs transition-all cursor-pointer border ${
                      isActive ? 'ring-2 ring-primary/40 shadow-md' : 'hover:shadow-sm'
                    }`}
                    style={{ backgroundColor: callout.bgColor }}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs"
                      style={{
                        backgroundColor:
                          callout.id === 'A'
                            ? '#725B38'
                            : callout.id === 'B'
                            ? '#BA1A1A'
                            : '#10B981',
                        color: '#FFFFFF',
                      }}
                    >
                      {callout.id}
                    </div>
                    <div className="flex-1">
                      <div
                        className="font-title-md font-bold"
                        style={{ color: callout.textColor }}
                      >
                        {callout.title}
                      </div>
                      <p className="font-body-sm text-on-surface-variant mt-0.5">
                        {callout.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick solution preview button */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={onOpenSolutionModal}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-primary font-semibold text-xs transition-colors cursor-pointer min-h-[44px]"
              >
                <span className="material-symbols-outlined text-[18px]">
                  visibility
                </span>
                <span>출제위원 3초 구조화 풀이노트 전체보기(예시)</span>
              </button>
            </div>
          </div>

          {/* Side-by-side Time & Efficiency Comparison Banner */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-md flex flex-col gap-5 border border-surface-container-high/40">
              <h3 className="font-title-lg text-on-surface">풀이 시간 및 정답률 임상 비교(예시)</h3>

              {/* Comparison Item 1 */}
              <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-title-md text-secondary">일반 수험생 전개식 풀이(예시)</span>
                  <span className="font-label-md text-error font-semibold">위험도 높음</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display-lg-mobile text-on-surface font-bold">18분</span>
                  <span className="font-body-sm text-on-surface-variant">
                    소요 (시험 시간의 18%)
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-secondary rounded-full w-[85%]" />
                </div>
                <div className="flex justify-between font-label-sm text-on-surface-variant">
                  <span>계산오류 발생 확률</span>
                  <span className="text-error font-bold">42.8%(예시)</span>
                </div>
              </div>

              {/* Transition Icon */}
              <div className="flex justify-center -my-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-xs">
                  <span className="material-symbols-outlined text-[18px]">south</span>
                </div>
              </div>

              {/* Comparison Item 2 */}
              <div className="p-4 rounded-xl bg-primary/10 flex flex-col gap-2 border border-primary/20">
                <div className="flex items-center justify-between">
                  <span className="font-title-md text-primary font-bold">
                    대치 프레스티지 구조화 숏컷(예시)
                  </span>
                  <span className="font-label-md text-[#047857] font-semibold">최적화 완료</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display-lg-mobile text-primary font-bold">3분 30초</span>
                  <span className="font-body-sm text-on-surface">종결 (14분 30초 비축)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-[20%]" />
                </div>
                <div className="flex justify-between font-label-sm text-on-surface">
                  <span>실전 정답률</span>
                  <span className="text-[#047857] font-bold text-title-md">99.4%(예시)</span>
                </div>
              </div>
            </div>

            {/* Strategic Advice Card */}
            <div className="p-6 rounded-2xl bg-surface-container-high flex items-start gap-4 shadow-xs">
              <span className="material-symbols-outlined text-primary text-[32px] shrink-0">
                tips_and_updates
              </span>
              <div>
                <div className="font-title-md text-on-surface">
                  의대 수능 수학은 '속도'가 아닌 '설계'의 싸움
                </div>
                <p className="font-body-sm text-on-surface-variant mt-1">
                  시간이 모자란 것이 아니라, 발문을 구조화하지 못한 채 수식부터 쓰기 때문입니다. 프레스티지 메디컬 랩은 첫 10초 구조화 훈련을 집중 지도합니다(예시).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
