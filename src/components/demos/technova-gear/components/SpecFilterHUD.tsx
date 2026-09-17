'use client';

import React from 'react';
import {
  CPU_OPTIONS,
  DISPLAY_OPTIONS,
  GPU_OPTIONS,
  RAM_OPTIONS,
  type SpecFilterState,
  type SpecOption,
} from '../flagship-config';

export type { SpecFilterState };

interface SpecFilterHUDProps {
  filters: SpecFilterState;
  onChangeFilter: <K extends keyof SpecFilterState>(key: K, value: SpecFilterState[K]) => void;
  onReset: () => void;
}

/**
 * 플래그십 **구성기**. 아래 상품 랙을 거르는 필터가 아니다.
 *
 * 예전에는 「하드웨어 분류」 칩 5종(울트라북·AI 워크스테이션·…)이 맨 윗줄에 있었는데,
 * `filters.segment` 를 읽는 코드가 저장소에 **한 줄도** 없었다 — 누르면 파랗게 켜지고 「[선택]」까지
 * 붙는데 히어로도 상품 랙도 그대로였다. 화면 맨 위 전폭 줄의 첫 행이라 방문자가 가장 먼저 누르는 자리다.
 * 그 줄은 걷어냈고, 남은 칩(GPU·CPU·패널·RAM)은 **타이탄 16 프로 한 대의 구성을 바꾼다**는 사실을
 * 제목에서 그대로 말한다.
 */
export const SpecFilterHUD: React.FC<SpecFilterHUDProps> = ({
  filters,
  onChangeFilter,
  onReset,
}) => {
  const renderChips = <K extends keyof SpecFilterState>(
    key: K,
    options: ReadonlyArray<SpecOption>,
    activeClass: string,
    dotClass: string,
  ) =>
    options.map((option) => {
      const isSelected = filters[key] === option.value;
      return (
        <button
          key={option.value}
          type="button"
          aria-pressed={isSelected}
          onClick={() => onChangeFilter(key, option.value as SpecFilterState[K])}
          className={`px-2 py-0.5 shrink-0 max-lg:min-h-11 max-lg:min-w-11 max-lg:inline-flex max-lg:items-center max-lg:justify-center rounded text-[11px] border transition-colors whitespace-nowrap cursor-pointer ${ isSelected ? `bg-[#31353e] ${activeClass} font-bold flex items-center gap-1` : 'bg-[#1c2028] text-[#8c909f] border-[#424754]/60 hover:border-[#8c909f]' }`}
        >
          {isSelected && <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`}></span>}
          {option.label}
        </button>
      );
    });

  return (
    <section id="spec-filter-hud" className="bg-[#0a0e16] border-b border-[#424754] py-2">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 flex flex-col gap-2">
        {/* 구성기 제목 — 「목록을 거른다」가 아니라 「한 대의 구성을 바꾼다」는 말이 먼저 보이게 */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-label">
          <span className="text-[#4cd7f6] uppercase tracking-wider whitespace-nowrap flex items-center gap-1 font-bold">
            <span className="material-symbols-outlined text-[14px]">tune</span> 플래그십 구성기
          </span>
          <span className="text-[#8c909f]">
            아래 히어로의 <span className="text-[#dfe2ee]">타이탄 16 프로</span> 한 대를 구성합니다 — 가격·점수·주문서가 함께 바뀝니다
          </span>
        </div>

        {/* Spec Chips Matrix */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 pt-1 border-t border-[#424754]/40 text-xs font-label">
          {/* GPU Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#8c909f] uppercase text-[10px] w-12 shrink-0">GPU</span>
            <div className="flex gap-1 overflow-x-auto min-w-0">
              {renderChips('gpu', GPU_OPTIONS, 'text-[#4cd7f6] border-[#4cd7f6]', 'bg-[#4cd7f6]')}
            </div>
          </div>

          {/* CPU Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#8c909f] uppercase text-[10px] w-12 shrink-0">CPU</span>
            <div className="flex gap-1 overflow-x-auto min-w-0">
              {renderChips('cpu', CPU_OPTIONS, 'text-[#adc6ff] border-[#adc6ff]', 'bg-[#adc6ff]')}
            </div>
          </div>

          {/* Display Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-[#8c909f] uppercase text-[10px] w-14 shrink-0">패널/주사율</span>
            <div className="flex gap-1 overflow-x-auto min-w-0">
              {renderChips('display', DISPLAY_OPTIONS, 'text-[#4cd7f6] border-[#4cd7f6]', 'bg-[#4cd7f6]')}
            </div>
          </div>

          {/* Memory / Reset */}
          <div className="flex items-center justify-between gap-1.5">
            <div className="flex items-center gap-1 overflow-x-auto min-w-0">
              <span className="text-[#8c909f] uppercase text-[10px] w-8 shrink-0">RAM</span>
              {renderChips('ram', RAM_OPTIONS, 'text-[#dfe2ee] border-[#8c909f]', 'bg-[#dfe2ee]')}
            </div>
            <button
              id="btn-reset-filters"
              type="button"
              onClick={onReset}
              className="text-[#8c909f] hover:text-[#ec6a06] flex items-center gap-0.5 text-[11px] transition-colors shrink-0 cursor-pointer max-lg:min-h-11 max-lg:px-2"
              title="구성을 기본값으로 되돌립니다"
            >
              <span className="material-symbols-outlined text-[13px]">refresh</span> 초기화
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
