'use client';

import React from 'react';

interface HeroSectionProps {
  onOpenDiagnostic: () => void;
  onScrollToLab: () => void;
}

export function HeroSection({ onOpenDiagnostic, onScrollToLab }: HeroSectionProps) {
  return (
    <section id="hero" className="relative pt-20 pb-20 lg:pt-28 lg:pb-32 overflow-hidden bg-[#0A0D14]">
      {/* Background Math Formula Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-600/10 via-indigo-600/15 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#131B2A] border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>KMO OLYMPIAD &amp; GIFTED MATHEMATICS ACADEMY</span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-mono font-extrabold text-white tracking-tight leading-tight mb-6">
            공식 암기를 넘어<br />
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              수학적 구조를 증명하고 시각화하는
            </span><br />
            영재사고력의 깊은 울림
          </h1>

          <p className="text-sm lg:text-base text-slate-300 leading-relaxed mb-10">
            오일러 다면체 정리부터 KMO 4대 영역(정수·기하·대수·조합) 심층 증명까지.<br className="hidden lg:inline" />
            단순 문제 풀이 기술이 아닌, 수학의 본질적 아름다움과 엄밀한 논증력을 체화하는 상위 0.1% 영재 교육을 선도합니다.
          </p>

          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-16">
            <button
              onClick={onScrollToLab}
              className="px-6 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-slate-950 font-bold text-sm shadow-xl shadow-cyan-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <span>📐</span>
              <span>가상 3D 다면체 기하학 Lab 조작하기</span>
            </button>
            <button
              onClick={onOpenDiagnostic}
              className="px-6 py-4 rounded-xl bg-[#131B2A] border border-[#23314A] hover:bg-[#1B2538] text-slate-200 font-semibold text-sm active:scale-95 transition-all flex items-center justify-center cursor-pointer min-h-[44px]"
            >
              1:1 영재성 정밀 진단평가 신청
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-slate-800">
            <div>
              <p className="text-2xl lg:text-3xl font-mono font-bold text-cyan-400">V - E + F = 2</p>
              <p className="text-xs text-slate-400 mt-1">다면체 기하학 시뮬레이터</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-mono font-bold text-indigo-400">4대 영역</p>
              <p className="text-xs text-slate-400 mt-1">정수·기하·대수·조합 균형</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-mono font-bold text-cyan-400">1:1 구술</p>
              <p className="text-xs text-slate-400 mt-1">영재교 심층 면접 대비</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-mono font-bold text-indigo-400">사고력 중심</p>
              <p className="text-xs text-slate-400 mt-1">자체 심화 탐구 교재 (예시)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
