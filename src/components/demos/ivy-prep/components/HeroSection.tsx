'use client';

import React from 'react';

interface HeroSectionProps {
  onOpenConsult: () => void;
  onScrollToRadar: () => void;
}

export function HeroSection({ onOpenConsult, onScrollToRadar }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-b border-rose-900/30">
      {/* Background glow & classic crest pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(225,29,72,0.15),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/60 border border-amber-500/30 text-amber-300 text-xs font-serif mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            2026 IVY LEAGUE &amp; TOP 20 BOARDING SCHOOL CONSULTING (예시)
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold font-serif tracking-tight text-white leading-tight mb-6">
            평범한 스펙을 넘어,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 to-amber-400">
              입학사정관을 매료시키는
            </span>
            <br />
            독보적 스파이크(Spike) 설계
          </h1>

          <p className="text-base lg:text-lg text-rose-100/80 leading-relaxed mb-8 font-sans">
            모든 과목을 잘하는 올라운더는 더 이상 아이비리그의 우선순위가 아닙니다.
            9학년부터 완성하는 Unweighted 4.0 내신 로드맵과 Digital SAT 1560+ 달성,
            그리고 학생의 지적 호기심을 증명하는 독창적 학술 리서치로 합격을 완성합니다.
          </p>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-14">
            <button
              type="button"
              onClick={onScrollToRadar}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 text-amber-50 font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-rose-950/40 text-center min-h-[44px] cursor-pointer font-serif border border-amber-400/40"
            >
              6대 입시역량 Radar 시뮬레이터 조작하기
            </button>
            <button
              type="button"
              onClick={onOpenConsult}
              className="px-7 py-3.5 rounded-xl bg-rose-950/80 border border-amber-500/30 text-amber-200 font-bold text-sm hover:bg-rose-900/60 hover:border-amber-400/60 active:scale-95 transition-all text-center min-h-[44px] cursor-pointer font-serif"
            >
              1:1 프라이빗 입시 로드맵 상담 신청
            </button>
          </div>

          {/* Metrics HUD */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 border-t border-rose-900/50 pt-8">
            <div className="p-4 rounded-2xl bg-[#25050F]/80 border border-amber-500/20">
              <span className="text-xs text-rose-200/70 block mb-1 font-serif">
                아이비리그 &amp; Top20 합격률 (예시)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-serif font-black text-amber-300">
                  98.4%
                </span>
                <span className="text-[11px] text-rose-300/60">3개년 종합</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#25050F]/80 border border-amber-500/20">
              <span className="text-xs text-rose-200/70 block mb-1 font-serif">
                보딩스쿨 &amp; 명문대 누적 합격 (예시)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-serif font-black text-rose-300">
                  240+
                </span>
                <span className="text-[11px] text-rose-300/60">명 배출</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#25050F]/80 border border-amber-500/20">
              <span className="text-xs text-rose-200/70 block mb-1 font-serif">
                수강생 Digital SAT 1550+ (예시)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-serif font-black text-white">
                  82.1%
                </span>
                <span className="text-[11px] text-rose-300/60">달성률</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
