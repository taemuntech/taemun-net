'use client';

import React from 'react';

interface HeroSectionProps {
  onOpenReservation: (type?: string) => void;
  onScrollToPiano: () => void;
}

export function HeroSection({ onOpenReservation, onScrollToPiano }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#121110] via-[#1a1715] to-[#121110] text-[#f5f0eb] py-20 lg:py-32 border-b border-[#2d2926]">
      {/* Background Decorative Ambience */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#d4af37] rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2a241e] border border-[#524434] text-[#d4af37] text-xs font-medium tracking-wide mb-6">
            <span>✨</span>
            <span>정통 비엔나 피아니즘 & 스타인웨이 D-274 살롱 (예시)</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl lg:text-5xl font-serif font-bold tracking-tight text-[#f5f0eb] leading-[1.3] mb-6">
            한 음의 터치 속에 담긴 깊이,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f7e2a9] via-[#d4af37] to-[#aa8328]">
              타건의 예술을 완성하는 피아노 마스터클래스
            </span>
          </h1>

          {/* Description */}
          <p className="text-base lg:text-lg text-[#b8b0a7] leading-relaxed mb-10 font-sans">
            오스트리아 빈 국립음대 및 미국 줄리어드 음악원 출신 교수진이 직접 지도하는 1:1 도제식 클래식 피아노 아카데미입니다. 스타인웨이 풀 콘서트 그랜드 피아노 D-274 홀에서 음향 스펙트럼과 타건 릴랙스를 과학적으로 분석하여 최상위 콩쿠르와 명문 음대 실기 합격을 견인합니다.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-16">
            <button
              type="button"
              onClick={onScrollToPiano}
              className="px-7 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#b89528] text-[#121110] font-semibold hover:brightness-110 active:scale-95 transition-all text-center min-h-[44px] shadow-lg flex items-center justify-center gap-2"
            >
              <span>🎹</span>
              <span>인터랙티브 건반 즉석 연주해보기</span>
            </button>
            <button
              type="button"
              onClick={() => onOpenReservation('audition')}
              className="px-7 py-4 rounded-xl bg-[#221f1c] border border-[#443a2f] text-[#e0c298] font-semibold hover:bg-[#2d2925] active:scale-95 transition-all text-center min-h-[44px] flex items-center justify-center"
            >
              1:1 실기 오디션 및 청강 예약
            </button>
          </div>

          {/* Key Metric Counters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-[#2d2926]">
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-[#d4af37]">100%</p>
              <p className="text-xs text-[#a0978e] mt-1">스타인웨이 전 연습실 보유 (예시)</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-[#d4af37]">1.85s</p>
              <p className="text-xs text-[#a0978e] mt-1">콘서트홀 최적 음향 잔향 설계</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-[#d4af37]">24인</p>
              <p className="text-xs text-[#a0978e] mt-1">연간 소수정예 집중 케어</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-[#d4af37]">3단계</p>
              <p className="text-xs text-[#a0978e] mt-1">타건 릴랙스·배음 클리닉</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
