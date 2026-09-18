'use client';

import React from 'react';

interface HeroSectionProps {
  onOpenTrial: () => void;
  onScrollToLab: () => void;
}

export function HeroSection({ onOpenTrial, onScrollToLab }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 border-b border-orange-500/15">
      {/* Background glow & grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-mono mb-6">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            2026 K-ROBOT CHAMPIONSHIP &amp; FLL 청소년 공학반 (예시)
          </div>

          <h1 className="text-3xl lg:text-5xl font-black font-mono tracking-tight text-white leading-tight mb-6">
            단순 조립을 넘어,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
              기구학(Kinematics)과 임베디드
            </span>
            <br />
            본질을 꿰뚫는 영재 공학
          </h1>

          <p className="text-base lg:text-lg text-zinc-300 leading-relaxed mb-8">
            레고식 규격 부품 조립에 머무르지 않습니다.
            카본 프레임 3D 모델링부터 브레드보드 회로 해석, C++ 모터 제어 및
            ROS 2 기반 AI 자율주행 알고리즘까지 직접 설계하고 코딩합니다.
          </p>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-14">
            <button
              type="button"
              onClick={onScrollToLab}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-xl shadow-orange-500/25 text-center min-h-[44px] cursor-pointer"
            >
              4자유도 로봇암 분해도 &amp; 시뮬레이터 조작하기
            </button>
            <button
              type="button"
              onClick={onOpenTrial}
              className="px-7 py-3.5 rounded-xl bg-zinc-900 border border-orange-500/30 text-orange-300 font-bold text-sm hover:bg-zinc-800 hover:border-orange-500/60 active:scale-95 transition-all text-center min-h-[44px] cursor-pointer"
            >
              1:1 공학 적성 진단 체험 신청
            </button>
          </div>

          {/* Metrics HUD */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 border-t border-zinc-800 pt-8">
            <div className="p-4 rounded-2xl bg-[#0F172A]/60 border border-orange-500/20">
              <span className="text-xs text-zinc-400 block mb-1">
                전국 로봇대회 본선 진출률 (예시)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-mono font-black text-orange-400">
                  94.2%
                </span>
                <span className="text-[11px] text-zinc-500">최근 3개년</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F172A]/60 border border-orange-500/20">
              <span className="text-xs text-zinc-400 block mb-1">
                수강생 직접 코딩 프로젝트 (예시)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-mono font-black text-amber-300">
                  1,480+
                </span>
                <span className="text-[11px] text-zinc-500">아카이브 완료</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0F172A]/60 border border-orange-500/20">
              <span className="text-xs text-zinc-400 block mb-1">
                자율주행 알고리즘 구현 (예시)
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl lg:text-3xl font-mono font-black text-white">
                  12주
                </span>
                <span className="text-[11px] text-zinc-500">평균 수료 기간</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
