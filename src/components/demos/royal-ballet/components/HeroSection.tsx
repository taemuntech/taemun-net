'use client';

import React from 'react';

interface HeroSectionProps {
  onOpenAudition: () => void;
  onScrollToAnatomy: () => void;
}

export function HeroSection({ onOpenAudition, onScrollToAnatomy }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0F0E11] via-[#1A1721] to-[#0F0E11] py-24 lg:py-36 border-b border-[#252229] text-[#F7F3F5]">
      {/* Dramatic Stage Spotlight Backdrop */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-b from-[#D8829D]/20 via-[#F4ACB7]/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#251E28] border border-[#48374B] text-[#F4ACB7] text-xs font-semibold tracking-wide mb-6">
            <span>👑</span>
            <span>영국 로열 발레단 & 러시아 바가노바 정통 메소드 (예시)</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl lg:text-5xl font-serif font-bold text-[#F7F3F5] leading-[1.3] mb-6">
            공기를 가르는 완벽한 도약,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FCE7EC] via-[#F4ACB7] to-[#D8829D]">
              해부학적 정렬로 완성하는 순수 무용의 정점
            </span>
          </h1>

          {/* Description */}
          <p className="text-base lg:text-lg text-[#BDB5BC] leading-relaxed mb-10 font-sans">
            무리한 관절 꺾임이 아닌, 골반 외회전근과 코어 호흡을 일치시키는 과학적 턴아웃(Turnout) 클리닉을 제공합니다. 3중 충격 흡수 탄성 스프렁 플로어(Sprung Floor)에서 예중·예고 입시부터 해외 유수 발레단 오디션까지 1:1 도제 지도를 전담합니다.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-16">
            <button
              type="button"
              onClick={onScrollToAnatomy}
              className="px-7 py-4 rounded-full bg-gradient-to-r from-[#D8829D] to-[#F4ACB7] text-[#0F0E11] font-semibold hover:brightness-110 active:scale-95 transition-all text-center min-h-[44px] shadow-lg flex items-center justify-center gap-2"
            >
              <span>🩰</span>
              <span>5대 발 포지션 해부학 시뮬레이터</span>
            </button>
            <button
              type="button"
              onClick={onOpenAudition}
              className="px-7 py-4 rounded-full bg-[#1E1924] border border-[#3E2E42] text-[#F4ACB7] font-semibold hover:bg-[#2B2333] active:scale-95 transition-all text-center min-h-[44px] flex items-center justify-center"
            >
              1:1 체형 진단 & 실기 오디션 신청
            </button>
          </div>

          {/* Key Metric Counters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-[#252229]">
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-[#F4ACB7]">180°</p>
              <p className="text-xs text-[#9E939D] mt-1">이상적 골반 외회전 턴아웃</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-[#F4ACB7]">3중</p>
              <p className="text-xs text-[#9E939D] mt-1">관절 보호 탄성 스프렁 마룻바닥</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-[#F4ACB7]">8단계</p>
              <p className="text-xs text-[#9E939D] mt-1">정통 바가노바 테크닉 체계</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-[#F4ACB7]">1:1</p>
              <p className="text-xs text-[#9E939D] mt-1">무대 바리에이션 독점 코칭</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
