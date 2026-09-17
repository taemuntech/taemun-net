'use client';

import React from 'react';

interface HeroSectionProps {
  onOpenConsult: () => void;
  onScrollToLab: () => void;
}

export function HeroSection({ onOpenConsult, onScrollToLab }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-b border-amber-500/20">
      {/* Background glow & subtle academic grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(217,119,6,0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(217,119,6,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(217,119,6,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-serif mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            2026 로스쿨 LEET &amp; CPA 고시 정규 순환반 (예시)
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold font-serif tracking-tight text-white leading-tight mb-6">
            감(感)에 의존하는 풀이를 끝내고,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-500">
              엄밀한 논리 구조로
            </span>
            <br />
            합격을 완성하다
          </h1>

          <p className="text-base lg:text-lg text-zinc-300 leading-relaxed mb-8 font-sans">
            LEET와 CPA는 단순 암기형 시험이 아닙니다.
            출제위원의 킬러 함정(Trap) 출제 알고리즘을 꿰뚫고,
            형식논리학과 규범 추론의 필연적 인과관계를 체화해야만 표준점수 140+의 문이 열립니다.
          </p>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-14 font-serif">
            <button
              type="button"
              onClick={onScrollToLab}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-amber-900/30 text-center min-h-[44px] cursor-pointer"
            >
              기출 문항 핀셋 해체 &amp; 점수 계산기 실행
            </button>
            <button
              type="button"
              onClick={onOpenConsult}
              className="px-7 py-3.5 rounded-xl bg-zinc-900 border border-amber-500/30 text-amber-300 font-bold text-sm hover:bg-zinc-800 hover:border-amber-500/60 active:scale-95 transition-all text-center min-h-[44px] cursor-pointer"
            >
              1:1 학점/영어 연계 합격 가능성 진단
            </button>
          </div>

          {/* Metrics HUD */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 border-t border-zinc-800 pt-8 font-serif">
            <div className="p-4 rounded-2xl bg-[#0F172A]/80 border border-amber-500/20">
              <span className="text-xs text-zinc-400 block mb-1">
                로스쿨 최종 합격률 (예시)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-amber-400">
                  89.2%
                </span>
                <span className="text-[11px] text-zinc-500 font-sans">정규 순환반 수료생</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F172A]/80 border border-amber-500/20">
              <span className="text-xs text-zinc-400 block mb-1">
                LEET 135+ 표준점수 달성 (예시)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-white">
                  180+
                </span>
                <span className="text-[11px] text-zinc-500 font-sans">명 배출</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F172A]/80 border border-amber-500/20">
              <span className="text-xs text-zinc-400 block mb-1">
                3개년 CPA 최종 합격생 (예시)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-bold text-amber-300">
                  94명
                </span>
                <span className="text-[11px] text-zinc-500 font-sans">동차 및 유예 합격</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
