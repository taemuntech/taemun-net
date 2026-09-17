'use client';

import React from 'react';

interface SolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SolutionModal: React.FC<SolutionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-surface-container-lowest p-6 lg:p-8 shadow-2xl border border-surface-container-high relative flex flex-col gap-6">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-surface-container pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[24px]">
                auto_stories
              </span>
            </div>
            <div>
              <h3 className="font-headline-sm text-on-surface">
                평가원 미적분 30번 [출제위원 시각 3분 숏컷 해설(예시)]
              </h3>
              <p className="font-body-sm text-on-surface-variant">
                18분의 무의미한 전개 대신 3줄 기하 대칭성으로 끝내는 프레스티지 솔루션(예시)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="창 닫기"
            className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* 3 Step Breakdown */}
        <div className="flex flex-col gap-4 text-xs lg:text-sm">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2 border border-surface-container">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-primary text-on-primary font-bold text-xs">
                STEP 1
              </span>
              <span className="font-title-md text-on-surface font-semibold">
                발문 3초 스캐닝 &amp; 진수 조건 제약
              </span>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              <code className="bg-surface-container-highest px-1.5 py-0.5 rounded text-primary font-mono">
                g(x) = ln(f(x))
              </code>
              에서 진수 조건 <code className="font-mono">f(x) &gt; 0 (x &gt; 0)</code>. 또한 조건 (가)에서{' '}
              <code className="font-mono">g'(x) = f'(x)/f(x) ≤ 0</code>이므로, <span className="font-semibold text-on-surface">양수 구간에서 f(x)는 단조감소</span>합니다.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-2 border border-surface-container">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#BA1A1A] text-white font-bold text-xs">
                STEP 2
              </span>
              <span className="font-title-md text-on-surface font-semibold">
                꺾임점 미분불가 조건 (나)의 기하학적 직관화
              </span>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              <code className="font-mono">| g(x) - t |</code>가 오직 한 점에서만 미분불가능하다는 것은 직선 <code className="font-mono">y = t</code>가 곡선 <code className="font-mono">y = g(x)</code>와 교차할 때 접하지 않는 교점이 정확히 1개라는 뜻입니다.
              단조감소 함수이므로 <code className="font-mono">t ≥ ln 2</code>에서만 성립한다는 조건은, <span className="font-semibold text-primary">x → ∞ 일 때 점근선 또는 극솟값 경계가 ln 2</span>임을 2초 만에 확정합니다.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-[#ECFDF5] flex flex-col gap-2 border border-[#10B981]/30">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#047857] text-white font-bold text-xs">
                STEP 3
              </span>
              <span className="font-title-md text-[#047857] font-semibold">
                사차함수 비율관계 3초 대입 &amp; 정답 도출
              </span>
            </div>
            <p className="text-stone-700 leading-relaxed font-mono">
              f(x) = (x - α)⁴ + 2 또는 3차 비율관계에 의해 f(1) = 2, f'(3) = 48.<br />
              따라서 구하는 값은 <strong>f'(3) / f(1) = 48 / 2 = 24</strong>.
            </p>
            <span className="text-[11px] text-[#047857] font-medium">
              * 일반 계산 과정을 기하 대칭성으로 단 30초 내에 암산으로 도출하는 대치 프레스티지 비기입니다(예시).
            </span>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-inverse-surface text-surface text-xs font-semibold hover:bg-on-surface transition-colors cursor-pointer min-h-[44px]"
          >
            확인했습니다
          </button>
        </div>
      </div>
    </div>
  );
};
