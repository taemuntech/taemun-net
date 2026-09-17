'use client';

import React from 'react';

interface HeroSectionProps {
  onOpenConsultation: () => void;
  onScrollToCritique: () => void;
}

export function HeroSection({ onOpenConsultation, onScrollToCritique }: HeroSectionProps) {
  return (
    <section id="hero" className="relative pt-20 pb-20 lg:pt-28 lg:pb-32 overflow-hidden bg-[#12141A]">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-rose-600/15 via-amber-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F2432] border border-rose-500/30 text-rose-400 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>ACADEMIC LOGIC &amp; MEDICAL MMI ADMISSION</span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-serif font-extrabold text-white tracking-tight leading-tight mb-6">
            논증의 허점을 파고드는<br />
            <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
              빨간펜 정밀 대면 첨삭과
            </span><br />
            의대 MMI 딜레마 다면 심층면접
          </h1>

          <p className="text-sm lg:text-base text-slate-300 leading-relaxed mb-10">
            문장 단위 비문 교정부터 헌법적 가치·생명윤리 딜레마의 다면적 논거 구축까지.<br className="hidden lg:inline" />
            평가위원의 채점 루브릭을 완벽히 꿰뚫는 1:1 맞춤형 논술 첨삭 및 MMI 모의면접 시스템을 경험해 보십시오.
          </p>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-16">
            <button
              onClick={onScrollToCritique}
              className="px-6 py-4 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:brightness-110 text-white font-bold text-sm shadow-xl shadow-rose-600/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <span>✍️</span>
              <span>답안 첨삭 전후(Before/After) 비교 체험</span>
            </button>
            <button
              onClick={onOpenConsultation}
              className="px-6 py-4 rounded-xl bg-[#1D2230] border border-[#2D354A] hover:bg-[#252C3E] text-slate-200 font-semibold text-sm active:scale-95 transition-all flex items-center justify-center cursor-pointer min-h-[44px]"
            >
              1:1 서면 첨삭 &amp; MMI 모의면접 예약
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-slate-800">
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-rose-400">1:1 대면</p>
              <p className="text-xs text-slate-400 mt-1">빨간펜 심층 서술 크리틱</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-amber-400">6개 스테이션</p>
              <p className="text-xs text-slate-400 mt-1">실전 MMI 다면 모의 시뮬레이션</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-rose-400">루브릭 기반</p>
              <p className="text-xs text-slate-400 mt-1">대학별 채점 기준 핀셋 적용</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-amber-400">의약학 특화</p>
              <p className="text-xs text-slate-400 mt-1">생명윤리 50대 핫이슈 (예시)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
