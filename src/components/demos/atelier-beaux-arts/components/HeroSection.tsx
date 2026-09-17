'use client';

import React from 'react';

interface HeroSectionProps {
  onOpenEvaluation: () => void;
  onScrollToGallery: () => void;
}

export function HeroSection({ onOpenEvaluation, onScrollToGallery }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#16191F] py-20 lg:py-32 border-b border-[#2A303C] text-white">
      {/* Background Lighting Effect */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#0284C7]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E293B] border border-[#334155] text-[#38BDF8] text-xs font-semibold tracking-wide mb-6">
            <span>🏛️</span>
            <span>최상위권 명문 미대 실기 & 디자인 조형 연구소 (예시)</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl lg:text-5xl font-serif font-bold text-white leading-[1.3] mb-6">
            화면을 장악하는 압도적 조형미,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7DD3FC] via-[#38BDF8] to-[#0284C7]">
              합격을 결정하는 3D 시각 발상 드로잉
            </span>
          </h1>

          {/* Description */}
          <p className="text-base lg:text-lg text-[#94A3B8] leading-relaxed mb-10 font-sans">
            서울대 디자인, 국민대 조형대, 홍익대, 한예종 등 최상위 명문 미대 실기 시험은 기술적 묘사를 넘어선 창의적 문제 해결력을 평가합니다. 출제 의도를 꿰뚫는 발문 분석과 정밀한 화면 황금분할 구도로 실기 A+ 합격권을 이끕니다.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-16">
            <button
              type="button"
              onClick={onScrollToGallery}
              className="px-7 py-4 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#38BDF8] text-white font-semibold hover:brightness-110 active:scale-95 transition-all text-center min-h-[44px] shadow-lg flex items-center justify-center gap-2"
            >
              <span>🔍</span>
              <span>3D 합격작 큐레이션 갤러리 둘러보기</span>
            </button>
            <button
              type="button"
              onClick={onOpenEvaluation}
              className="px-7 py-4 rounded-xl bg-[#1E293B] border border-[#334155] text-[#38BDF8] font-semibold hover:bg-[#2A374A] active:scale-95 transition-all text-center min-h-[44px] flex items-center justify-center"
            >
              1:1 모의 실기 평가 & 포트폴리오 진단
            </button>
          </div>

          {/* Key Metric Counters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-[#2A303C]">
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-[#38BDF8]">4개교</p>
              <p className="text-xs text-[#94A3B8] mt-1">서울대·국민대·홍익대·한예종 특화 (예시)</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-[#38BDF8]">1:1.618</p>
              <p className="text-xs text-[#94A3B8] mt-1">황금분할 3점 투시 구도 설계</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-[#38BDF8]">5시간</p>
              <p className="text-xs text-[#94A3B8] mt-1">실전 타임어택 실기 모의 시뮬레이션</p>
            </div>
            <div>
              <p className="text-2xl lg:text-3xl font-serif font-bold text-[#38BDF8]">50여종</p>
              <p className="text-xs text-[#94A3B8] mt-1">유리·금속·자연물 질감 묘사 라이브러리</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
