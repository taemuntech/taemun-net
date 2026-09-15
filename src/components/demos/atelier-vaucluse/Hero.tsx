'use client';

import React from 'react';
import { ArrowRight, Eye } from 'lucide-react';
import { HERO_IMAGES } from './data/projects';

interface HeroProps {
  onExplorePortfolio: () => void;
  onRequestConsultation: () => void;
  onSelectImage: (imageData: { url: string; label: string; description: string; alt: string }) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExplorePortfolio,
  onRequestConsultation,
  onSelectImage,
}) => {
  return (
    <section className="relative pt-12 lg:pt-20 pb-20 border-b border-[#c8c7bf]/20 bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Editorial Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16">
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center space-x-3">
              <span className="w-8 h-[1px] bg-[#904b35]"></span>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#904b35] font-sans">
                Atelier Vaucluse Interior Studio
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-normal font-serif leading-[1.15] text-[#161714] tracking-[-0.02em]">
              공간에 머무는 <br className="hidden lg:inline" />
              <span className="italic font-normal font-serif text-[#904b35]/95">시간의 결</span>을 짓습니다.
            </h1>

            <p className="text-base lg:text-lg text-[#474741] max-w-2xl font-light leading-relaxed font-sans">
              자연스러운 석재의 거친 표면, 건조된 참나무의 고요한 온기, 정제된 여백. 아뜰리에 보클루즈는 유행을 넘어 영속적인 미학을 담은 하이엔드 주거 및 감도 높은 상업 공간을 설계합니다.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={onExplorePortfolio}
                className="bg-[#2b2b28] text-[#faf9f7] hover:bg-[#904b35] transition-all duration-300 text-xs font-semibold uppercase tracking-wider px-8 py-4 rounded flex items-center gap-2 cursor-pointer group shadow-sm hover:shadow"
              >
                <span>포트폴리오 둘러보기</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onRequestConsultation}
                className="border border-[#2b2b28] text-[#161714] hover:bg-[#efeeec] transition-all duration-300 text-xs font-semibold uppercase tracking-wider px-8 py-4 rounded flex items-center gap-2 cursor-pointer"
              >
                <span>1:1 공간 컨설팅 신청</span>
              </button>
            </div>
          </div>

          {/* Studio Metrics Badge Panel */}
          <div className="lg:col-span-4 bg-[#f4f3f1] p-8 rounded border border-[#c8c7bf]/30 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#474741] font-medium block pb-2 border-b border-[#c8c7bf]/30 font-sans">
              Studio Metrics / 기준과 신뢰
            </span>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <span className="text-2xl lg:text-3xl font-serif text-[#161714] block">12+</span>
                <span className="text-[11px] tracking-wider text-[#474741] font-sans">Years of Studio</span>
              </div>
              <div>
                <span className="text-2xl lg:text-3xl font-serif text-[#161714] block">280+</span>
                <span className="text-[11px] tracking-wider text-[#474741] font-sans">Spaces Built</span>
              </div>
              <div>
                <span className="text-2xl lg:text-3xl font-serif text-[#161714] block">98%</span>
                <span className="text-[11px] tracking-wider text-[#474741] font-sans">Satisfaction</span>
              </div>
            </div>
            <p className="text-xs lg:text-sm text-[#474741]/85 border-t border-[#c8c7bf]/30 pt-4 leading-relaxed font-sans">
              공간 기획 단계부터 마감재 맞춤 가공, 현장 상주 감리까지 타협 없는 원칙으로 완결성을 보증합니다.
            </p>
          </div>
        </div>

        {/* Hero Visual Banner Collage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main 8-col */}
          <div
            onClick={() => onSelectImage(HERO_IMAGES.main)}
            className="lg:col-span-8 overflow-hidden rounded relative group h-[380px] lg:h-[560px] bg-[#efeeec] cursor-pointer shadow-sm border border-[#c8c7bf]/20"
          >
            <img
              referrerPolicy="no-referrer"
              src={HERO_IMAGES.main.url}
              alt={HERO_IMAGES.main.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
            <div className="absolute bottom-6 left-6 bg-[#faf9f7]/95 backdrop-blur-md px-4 py-2 rounded border border-[#c8c7bf]/40 flex items-center gap-2 shadow-sm">
              <span className="text-xs uppercase tracking-[0.15em] text-[#161714] font-medium font-sans">
                {HERO_IMAGES.main.label}
              </span>
              <Eye size={13} className="text-[#904b35] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* 4-col Side Vertical Collage */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div
              onClick={() => onSelectImage(HERO_IMAGES.detail1)}
              className="flex-1 overflow-hidden rounded relative group h-[220px] lg:h-auto bg-[#efeeec] cursor-pointer shadow-sm border border-[#c8c7bf]/20"
            >
              <img
                referrerPolicy="no-referrer"
                src={HERO_IMAGES.detail1.url}
                alt={HERO_IMAGES.detail1.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
              <div className="absolute bottom-4 left-4 bg-[#faf9f7]/95 backdrop-blur-md px-3 py-1.5 rounded border border-[#c8c7bf]/40 flex items-center gap-2 shadow-sm">
                <span className="text-[11px] tracking-[0.15em] text-[#161714] font-medium font-sans">
                  {HERO_IMAGES.detail1.label}
                </span>
                <Eye size={12} className="text-[#904b35] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div
              onClick={() => onSelectImage(HERO_IMAGES.detail2)}
              className="flex-1 overflow-hidden rounded relative group h-[220px] lg:h-auto bg-[#efeeec] cursor-pointer shadow-sm border border-[#c8c7bf]/20"
            >
              <img
                referrerPolicy="no-referrer"
                src={HERO_IMAGES.detail2.url}
                alt={HERO_IMAGES.detail2.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors pointer-events-none" />
              <div className="absolute bottom-4 left-4 bg-[#faf9f7]/95 backdrop-blur-md px-3 py-1.5 rounded border border-[#c8c7bf]/40 flex items-center gap-2 shadow-sm">
                <span className="text-[11px] tracking-[0.15em] text-[#161714] font-medium font-sans">
                  {HERO_IMAGES.detail2.label}
                </span>
                <Eye size={12} className="text-[#904b35] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
