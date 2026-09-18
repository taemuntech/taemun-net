'use client';

import React from 'react';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onScrollToMixer: () => void;
}

export function HeroSection({ onOpenBooking, onScrollToMixer }: HeroSectionProps) {
  return (
    <section id="hero" className="relative pt-20 pb-24 lg:pt-32 lg:pb-36 overflow-hidden bg-[#0B0C10]">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-pink-600/15 via-purple-600/15 to-transparent blur-3xl pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F2430] border border-pink-500/30 text-pink-400 text-xs font-semibold mb-6">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            <span>PRO AUDIO RECORDING &amp; VOCAL TRAINING</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            숨소리의 결까지 담아내는<br />
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              멀티트랙 보컬 레코딩
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm lg:text-lg text-zinc-300 leading-relaxed mb-10">
            피치와 호흡의 정밀 분석, 아날로그 진공관 하모닉스, 그리고 프로페셔널 믹스다운까지.<br className="hidden lg:inline" />
            오디션 합격과 실용음악 입시를 위한 전문 보컬 프로덕션 스튜디오 환경을 직접 경험해 보십시오.
          </p>

          {/* Actions */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-16">
            <button
              onClick={onScrollToMixer}
              className="px-6 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:brightness-110 text-white font-semibold text-sm shadow-xl shadow-pink-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              <span>🎛️</span>
              <span>DAW 실시간 멀티트랙 믹서 체험</span>
            </button>
            <button
              onClick={onOpenBooking}
              className="px-6 py-4 rounded-xl bg-[#161A22] border border-[#2B3444] text-zinc-200 hover:text-white hover:bg-[#1E2430] font-semibold text-sm active:scale-95 transition-all flex items-center justify-center cursor-pointer min-h-[44px]"
            >
              1:1 보컬 진단 &amp; 마이크 테스트 신청
            </button>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-[#1F2430]">
            <div>
              <p className="text-2xl lg:text-3xl font-black text-pink-400">96kHz / 24bit</p>
              <p className="text-xs text-zinc-400 mt-1">하이엔드 마스터링 규격</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-black text-purple-400">4트랙</p>
              <p className="text-xs text-zinc-400 mt-1">스튜디오 실시간 믹서</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-black text-pink-400">1:1 맞춤</p>
              <p className="text-xs text-zinc-400 mt-1">성구 전환 &amp; 발성 교정</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-black text-purple-400">100% 실습</p>
              <p className="text-xs text-zinc-400 mt-1">전문 부스 레코딩 세션 (예시)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
