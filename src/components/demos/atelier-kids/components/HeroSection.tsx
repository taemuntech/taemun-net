'use client';

import React from 'react';

interface HeroSectionProps {
  onOpenTrialModal: () => void;
  onScrollToCollage: () => void;
}

export function HeroSection({ onOpenTrialModal, onScrollToCollage }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] py-20 lg:py-28 border-b border-[#E8E2D9]">
      {/* Whimsical organic shape accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#F4A261]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#81B29A]/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FDF0EC] border border-[#F4C4B7] text-[#E07A5F] text-xs font-semibold tracking-wide mb-6">
            <span>🎨</span>
            <span>프랑스 에꼴 드 보자르 조형 철학 & 4인 원탁 소수정예 (예시)</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl lg:text-5xl font-serif font-bold text-[#2D2A26] leading-[1.3] mb-6">
            틀에 맞추어 그리지 않습니다.<br />
            <span className="text-[#E07A5F]">
              아이의 고유한 감각과 상상이 자라는 비정형 아뜰리에
            </span>
          </h1>

          {/* Description */}
          <p className="text-base lg:text-lg text-[#5C554D] leading-relaxed mb-10 font-sans">
            도화지의 네모난 경계를 넘어 한지, 점토, 패브릭, 천연 안료를 자유롭게 융합합니다. 정형화된 형태를 주입하는 대신 스스로 질감을 만지고 색채의 온도를 발견하는 1:1 감각 미술 테라피를 제공합니다.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-16">
            <button
              type="button"
              onClick={onScrollToCollage}
              className="px-7 py-4 rounded-2xl bg-[#E07A5F] text-white font-semibold hover:bg-[#c9684f] active:scale-95 transition-all text-center min-h-[44px] shadow-lg flex items-center justify-center gap-2"
            >
              <span>✂️</span>
              <span>비정형 꼴라주 캔버스 직접 조작하기</span>
            </button>
            <button
              type="button"
              onClick={onOpenTrialModal}
              className="px-7 py-4 rounded-2xl bg-white border-2 border-[#E07A5F] text-[#E07A5F] font-semibold hover:bg-[#FDF0EC] active:scale-95 transition-all text-center min-h-[44px] flex items-center justify-center"
            >
              1회 원데이 감각 체험 수업 신청
            </button>
          </div>

          {/* Key Metric Counters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-[#E8E2D9]">
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-[#E07A5F]">4인</p>
              <p className="text-xs text-[#7A7369] mt-1">테이블당 최대 정원 (소수정예)</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-[#81B29A]">100%</p>
              <p className="text-xs text-[#7A7369] mt-1">무독성 유럽 CE 인증 안료 (예시)</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-[#F4A261]">120종</p>
              <p className="text-xs text-[#7A7369] mt-1">오감 탐색 자연 조형 재료</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-[#2D2A26]">연 2회</p>
              <p className="text-xs text-[#7A7369] mt-1">어린이 정기 개인전 큐레이션</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
