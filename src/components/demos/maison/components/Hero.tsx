"use client";

import React from 'react';
import { BRAND_INFO } from '../data/antiqueData';

interface HeroProps {
  onExploreClick: () => void;
  onReserveClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onReserveClick }) => {
  return (
    <section
      id="hero-section"
      className="relative bg-[#fbf2ed] border-b border-[#d6c2c2] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-16 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Asymmetric Left Content: Monograph Narrative (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 space-y-6">
            <div className="inline-flex items-center space-x-2">
              <span className="text-[#735b24] text-[11px] tracking-[0.2em] uppercase font-bold">
                Provenance &amp; Antiquité
              </span>
              <span className="w-8 h-[1px] bg-[#735b24]"></span>
            </div>

            <h1
              id="hero-main-title"
              className="font-serif text-[34px] lg:text-[54px] text-[#300a10] tracking-tight leading-[1.18]"
            >
              시간이 빚어낸 예술,<br />
              공간을 채우는<br />
              <span className="italic">백 년의 헤리티지.</span>
            </h1>

            <p className="font-serif text-[17px] lg:text-[19px] text-[#514344] leading-relaxed max-w-xl">
              {BRAND_INFO.subheadline}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                id="btn-hero-view-collection"
                type="button"
                onClick={onExploreClick}
                className="bg-[#4a1e23] text-[#fff8f5] hover:bg-[#300a10] px-7 py-3.5 text-[13px] uppercase tracking-wider font-semibold transition-colors duration-300 border border-[#735b24]/40 cursor-pointer shadow-sm"
              >
                새로 입고된 컬렉션 보기
              </button>
              <button
                id="btn-hero-reserve-showroom"
                type="button"
                onClick={onReserveClick}
                className="bg-[#fff8f5] text-[#1e1b18] border border-[#1e1b18] hover:bg-[#f5ece7] px-7 py-3.5 text-[13px] uppercase tracking-wider font-semibold transition-colors duration-300 cursor-pointer"
              >
                프라이빗 쇼룸 예약
              </button>
            </div>

            {/* Curatorial Trust Seals (Parchment Pedestal) */}
            <div className="pt-8 border-t border-[#d6c2c2]/60 grid grid-cols-3 gap-3 text-center lg:text-left">
              <div>
                <p className="text-[10px] text-[#735b24] uppercase font-bold tracking-wider">
                  Certificat
                </p>
                <p className="font-serif font-medium text-[16px] text-[#300a10] mt-0.5">
                  출처 기록 동봉
                </p>
                <p className="font-serif text-[12px] text-[#514344]">소장 등록 대장 발급</p>
              </div>
              <div className="border-l border-[#d6c2c2]/50 pl-3">
                <p className="text-[10px] text-[#735b24] uppercase font-bold tracking-wider">
                  Atelier
                </p>
                <p className="font-serif font-medium text-[16px] text-[#300a10] mt-0.5">
                  장인 수작업 복원
                </p>
                <p className="font-serif text-[12px] text-[#514344]">프렌치 폴리싱 기법</p>
              </div>
              <div className="border-l border-[#d6c2c2]/50 pl-3">
                <p className="text-[10px] text-[#735b24] uppercase font-bold tracking-wider">
                  Livraison
                </p>
                <p className="font-serif font-medium text-[16px] text-[#300a10] mt-0.5">
                  화이트글러브 운송
                </p>
                <p className="font-serif text-[12px] text-[#514344]">온습도 특수 케어</p>
              </div>
            </div>
          </div>

          {/* Asymmetric Right Photo: Hero Editorial Photograph (7 cols) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative bg-[#f5ece7] p-3 lg:p-4 rag-border shadow-sm">
              <div className="overflow-hidden relative aspect-[16/11]">
                <video
                  id="hero-editorial-image"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={BRAND_INFO.heroImageUrl}
                  src={BRAND_INFO.heroVideoUrl || "/demo-media/maison/maison-heritage-loop.mp4"}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
                <div className="absolute bottom-4 left-4 bg-[#fff8f5]/90 backdrop-blur-sm px-4 py-2 border border-[#d6c2c2] text-left">
                  <span className="text-[9px] uppercase tracking-widest text-[#735b24] font-semibold block">
                    Le Salon Hannam · Room I
                  </span>
                  <span className="font-serif text-[14px] text-[#300a10] italic">
                    Bureau de Ministre &amp; Miroir Doré Louis XV
                  </span>
                </div>
              </div>

              {/* Heritage Circular Seal — 연호는 지어낼 수 없어 넣지 않는다 */}
              <div
                id="hero-heritage-seal"
                className="absolute -top-3 -right-3 hidden lg:flex items-center justify-center w-16 h-16 rounded-full bg-[#fff8f5] border border-[#735b24] text-[#735b24] text-[10px] font-semibold uppercase tracking-widest text-center shadow-md rotate-12 select-none"
              >
                Archive<br />Heritage
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
