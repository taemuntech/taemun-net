'use client';

import React from 'react';

interface HeroSectionProps {
  onOpenApply: () => void;
  onScrollToTerminal: () => void;
}

export function HeroSection({ onOpenApply, onScrollToTerminal }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-b border-emerald-500/15">
      {/* Background glow & matrix lines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            2026 풀스택 &amp; AI 엔지니어링 10기 집중 선발반 (예시)
          </div>

          <h1 className="text-3xl lg:text-5xl font-black font-mono tracking-tight text-white leading-tight mb-6">
            코드 한 줄로 시작해,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              프로덕션 분산 시스템
            </span>
            <br />
            아키텍처를 완성하다
          </h1>

          <p className="text-base lg:text-lg text-zinc-300 leading-relaxed mb-8">
            단순 클론 코딩(Clone Coding)은 이제 기업 면접관의 눈을 사로잡을 수 없습니다.
            CRDT 실시간 동기화부터 Redis 분산 락, Kafka 이벤트 큐, 그리고
            엔터프라이즈 하이브리드 RAG 파이프라인까지 현업 수준의 아키텍처를 완벽히 구축합니다.
          </p>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-14">
            <button
              type="button"
              onClick={onScrollToTerminal}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-emerald-500/25 text-center min-h-[44px] cursor-pointer font-mono"
            >
              인터랙티브 CLI 콘솔 실행하기 &gt;_
            </button>
            <button
              type="button"
              onClick={onOpenApply}
              className="px-7 py-3.5 rounded-xl bg-zinc-900 border border-emerald-500/30 text-emerald-300 font-bold text-sm hover:bg-zinc-800 hover:border-emerald-500/60 active:scale-95 transition-all text-center min-h-[44px] cursor-pointer font-mono"
            >
              1:1 코딩테스트 &amp; 사전 역량 진단
            </button>
          </div>

          {/* Metrics HUD */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 border-t border-zinc-800 pt-8">
            <div className="p-4 rounded-2xl bg-[#0B0F17]/80 border border-emerald-500/20">
              <span className="text-xs text-zinc-400 block mb-1 font-mono">
                개발자 취업 성공률 (예시)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-mono font-black text-emerald-400">
                  96.8%
                </span>
                <span className="text-[11px] text-zinc-500">수료 후 6개월 내</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B0F17]/80 border border-emerald-500/20">
              <span className="text-xs text-zinc-400 block mb-1 font-mono">
                1인당 평균 깃 커밋 수 (예시)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-mono font-black text-teal-300">
                  840+
                </span>
                <span className="text-[11px] text-zinc-500">16주 몰입 과정</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0B0F17]/80 border border-emerald-500/20">
              <span className="text-xs text-zinc-400 block mb-1 font-mono">
                신입 평균 연봉 상승률 (예시)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-mono font-black text-white">
                  +42.5%
                </span>
                <span className="text-[11px] text-zinc-500">비전공자 초임 대비</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
