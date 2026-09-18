'use client';

import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onOpenReserve: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenReserve }) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-stone-950 text-stone-100">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/portfolio/nouveau-dining/nouveau-01.jpg"
          alt="누보 다이닝 성수동 인테리어 전경"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45 scale-105 animate-fade-in"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
        <div className="absolute inset-0 bg-radial from-transparent via-stone-950/50 to-stone-950" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 lg:px-8 py-20 text-center">
        {/* Category Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 font-mono text-xs mb-8 tracking-wider">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          F&B RESTAURANT & CAFE SPATIAL DESIGN
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-3xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight break-keep">
          미식과 공간의 조화,
          <br />
          <span className="bg-gradient-to-r from-amber-200 via-amber-300 to-amber-500 bg-clip-text text-transparent">
            체류 시간을 완성하는 F&B 인테리어
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-sm lg:text-lg text-stone-300 font-light leading-relaxed mb-10 break-keep">
          성수와 청담의 미식 공간을 위한 감각적인 공간 디자인.
          화이트 테라조 바 카운터와 통창 채광, 셰프의 동선과 고객의 오감을 고려한
          하이엔드 다이닝 & 카페 아키텍처를 제안합니다.
        </p>

        {/* Spec Grid Mini */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-3xl mx-auto mb-12">
          <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-800 backdrop-blur-sm">
            <span className="block text-[11px] font-mono text-stone-400 uppercase">LOCATION</span>
            <span className="text-sm lg:text-base font-bold text-amber-200 break-keep">
              서울 성수동 카페거리
            </span>
          </div>
          <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-800 backdrop-blur-sm">
            <span className="block text-[11px] font-mono text-stone-400 uppercase">SCALE</span>
            <span className="text-sm lg:text-base font-bold text-amber-200 break-keep">
              지상 1·2층 120평형 (예시)
            </span>
          </div>
          <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-800 backdrop-blur-sm">
            <span className="block text-[11px] font-mono text-stone-400 uppercase">CONCEPT</span>
            <span className="text-sm lg:text-base font-bold text-amber-200 break-keep">
              프렌치 모던 비스트로
            </span>
          </div>
          <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-800 backdrop-blur-sm">
            <span className="block text-[11px] font-mono text-stone-400 uppercase">KEY FEATURE</span>
            <span className="text-sm lg:text-base font-bold text-amber-200 break-keep">
              오픈 셰프 키친 & 테라스
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          <a
            href="#zones"
            className="w-full lg:w-auto px-8 py-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm tracking-wide shadow-xl shadow-amber-500/20 transition-all active:scale-95"
          >
            3대 공간 조닝 둘러보기
          </a>
          <button
            type="button"
            onClick={onOpenReserve}
            className="w-full lg:w-auto px-8 py-4 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-stone-200 border border-stone-700 font-semibold text-sm transition-all active:scale-95 cursor-pointer"
          >
            F&B 시공 견적 상담 예약
          </button>
        </div>
      </div>
    </section>
  );
};
