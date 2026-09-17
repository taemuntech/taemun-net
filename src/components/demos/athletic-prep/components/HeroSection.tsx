'use client';

import React from 'react';

interface HeroSectionProps {
  onOpenConsult: () => void;
  onScrollToLab: () => void;
}

export function HeroSection({ onOpenConsult, onScrollToLab }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-b border-lime-500/20">
      {/* Background glow & athletic grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(132,204,22,0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(132,204,22,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(132,204,22,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-500/10 border border-lime-500/30 text-lime-400 text-xs font-mono mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            2026 S·Y·K 체육교육과 &amp; 명문 체대 집중 선발반 (예시)
          </div>

          <h1 className="text-3xl lg:text-5xl font-black font-mono tracking-tight text-white leading-tight mb-6">
            근거 없는 체력 훈련을 넘어,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-300 to-teal-300">
              디지털 전자계측 텔레메트리로
            </span>
            <br />
            기초실기 올만점을 완성하다
          </h1>

          <p className="text-base lg:text-lg text-zinc-300 leading-relaxed mb-8">
            눈대중 지도와 무모한 반복 훈련은 부상과 감점을 부를 뿐입니다.
            실제 대학 실기고사장과 100% 동일한 전자 레이저 센서와 로드셀 계측 장비를 도입하여,
            도약 각도 1°와 접지 시간 0.01초를 과학적으로 교정합니다.
          </p>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-14 font-mono">
            <button
              type="button"
              onClick={onScrollToLab}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-lime-500 to-emerald-500 text-slate-950 font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-lime-500/25 text-center min-h-[44px] cursor-pointer"
            >
              기초실기 센서 HUD &amp; 합격 계산기 조작하기
            </button>
            <button
              type="button"
              onClick={onOpenConsult}
              className="px-7 py-3.5 rounded-xl bg-zinc-900 border border-lime-500/30 text-lime-300 font-bold text-sm hover:bg-zinc-800 hover:border-lime-500/60 active:scale-95 transition-all text-center min-h-[44px] cursor-pointer"
            >
              1:1 전자기측기 무료 실기 테스트 신청
            </button>
          </div>

          {/* Metrics HUD */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 border-t border-zinc-800 pt-8 font-mono">
            <div className="p-4 rounded-2xl bg-[#0D1526]/80 border border-lime-500/20">
              <span className="text-xs text-zinc-400 block mb-1">
                주요 명문 체대 최종 합격률 (예시)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-black text-lime-400">
                  94.7%
                </span>
                <span className="text-[11px] text-zinc-500">최근 3개년 정시반</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D1526]/80 border border-lime-500/20">
              <span className="text-xs text-zinc-400 block mb-1">
                전자기측기 실전 훈련율 (예시)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-black text-white">
                  100%
                </span>
                <span className="text-[11px] text-zinc-500">실기장 동일 장비</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D1526]/80 border border-lime-500/20">
              <span className="text-xs text-zinc-400 block mb-1">
                연간 실기 만점 배출 (예시)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-black text-teal-300">
                  320+
                </span>
                <span className="text-[11px] text-zinc-500">종목별 기록</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
