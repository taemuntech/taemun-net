"use client";

import React from 'react';
import { ArrowRight, Calendar, Compass } from 'lucide-react';
import { HERO_IMAGE_URL, HERO_FEATURED_PROJECT } from '../data/hanokData';
import { Project } from '../types';

interface HeroProps {
  onSelectProject: (project: Project) => void;
  onOpenConsultation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSelectProject, onOpenConsultation }) => {
  return (
    <section id="hero" className="relative pt-10 lg:pt-14 pb-16 lg:pb-20 overflow-hidden border-b border-[#c8c7bf]/30 bg-[#faf9f7]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        {/* Hero Editorial Lead Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-10 lg:mb-12">
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#efeeec] border border-[#c8c7bf]/40 rounded-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#904b35] animate-pulse"></span>
              <span className="text-xs text-[#474741] font-medium tracking-wide">
                전통의 비례와 현대의 편안함을 짓는 한옥 건축 명가
              </span>
            </div>
            
            <h1 className="font-serif text-3xl lg:text-[4.25rem] text-[#161714] tracking-tight leading-[1.12] mb-6">
              자연을 담고 시간을 품는 집,<br />
              <span className="italic font-light text-[#1a1c1b]">현대인을 위한</span> 프리미엄 한옥
            </h1>
            
            <p className="text-base lg:text-lg text-[#474741] max-w-2xl leading-relaxed font-sans font-light">
              100년 목재 건조 노하우, 전통 결구(사개맞춤) 공법의 구조미 위에 최고 등급 시스템 삼중창호와 현대식 지열·단열 설비를 더해, 사계절 내내 따스하고 편리한 힐링 주거를 완성합니다.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3.5 lg:items-end justify-end">
            <a
              id="hero-portfolio-cta"
              href="#projects"
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#161714] text-[#faf9f7] rounded-sm text-sm font-medium hover:bg-[#904b35] transition-all duration-200 group shadow-xs cursor-pointer"
            >
              <span>완공 한옥 포트폴리오 보기</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            
            <button
              id="hero-consult-cta"
              onClick={onOpenConsultation}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 border border-[#161714] text-[#161714] bg-transparent rounded-sm text-sm font-medium hover:bg-[#efeeec] transition-colors duration-200 cursor-pointer"
            >
              <span>건축 상담 신청</span>
              <Calendar className="w-4 h-4 text-[#777770]" />
            </button>
          </div>
        </div>

        {/* Hero Masterpiece Photography Container */}
        <div 
          id="hero-masterpiece-container"
          onClick={() => onSelectProject(HERO_FEATURED_PROJECT)}
          className="relative w-full overflow-hidden rounded-md border border-[#c8c7bf]/40 group cursor-pointer shadow-sm"
        >
          <div className="aspect-[16/9] w-full max-h-[640px] overflow-hidden bg-[#e9e8e6]">
            <img
              src={HERO_IMAGE_URL}
              alt="소담재 건축공방 완공작 - 가평 서종 호반 한옥주택 담솔헌 황혼 전경"
              className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-[1.018]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Floating Subtle Click Hint */}
          <div className="absolute top-4 right-4 bg-[#161714]/80 backdrop-blur-md text-[#faf9f7] text-xs px-3 py-1.5 rounded-xs flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Compass className="w-3.5 h-3.5 text-[#fea58a]" />
            <span>상세 건축스펙 보기</span>
          </div>

          {/* Tactile Architectural Floating Metadata Badge */}
          <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-auto lg:max-w-md p-5 lg:p-6 bg-[#faf9f7]/95 backdrop-blur-md border border-[#c8c7bf]/50 rounded-xs shadow-md transition-transform duration-300 group-hover:-translate-y-1">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="text-xs text-[#904b35] font-semibold tracking-wider">2024 완공 대표작</span>
              <span className="text-[11px] text-[#777770] font-mono">Gyeonggi Gapyeong</span>
            </div>
            <h3 className="font-serif text-lg lg:text-xl text-[#161714] mb-1 font-medium">
              가평 서종 호반 한옥주택 (담솔헌 澹率軒)
            </h3>
            <p className="text-xs lg:text-sm text-[#474741] leading-relaxed">
              배산임수의 축을 따라 유려하게 휘어진 팔작지붕과 북한강 물안개를 품는 대청 통창, 최고 효율 지열 공조 시스템이 융합된 78평형 주거 한옥.
            </p>
          </div>
        </div>

        {/* Key Credibility Metrics Ribbon (Bento Micro Strip) */}
        <div id="hero-metrics-ribbon" className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mt-8 pt-8 border-t border-[#c8c7bf]/30">
          <div className="p-5 bg-[#f4f3f1] rounded-xs border border-[#c8c7bf]/20 hover:border-[#c8c7bf]/60 transition-colors">
            <div className="font-serif text-2xl lg:text-3xl text-[#161714] tracking-tight mb-1">
              25+ <span className="text-sm font-sans text-[#474741] font-normal">년</span>
            </div>
            <p className="text-xs lg:text-sm text-[#1a1c1b] font-semibold mb-0.5">도편수 직영 목수단</p>
            <p className="text-[11px] lg:text-xs text-[#777770]">국가공인 문화재 수리기능자 직접 총괄</p>
          </div>

          <div className="p-5 bg-[#f4f3f1] rounded-xs border border-[#c8c7bf]/20 hover:border-[#c8c7bf]/60 transition-colors">
            <div className="font-serif text-2xl lg:text-3xl text-[#161714] tracking-tight mb-1">
              68+ <span className="text-sm font-sans text-[#474741] font-normal">채</span>
            </div>
            <p className="text-xs lg:text-sm text-[#1a1c1b] font-semibold mb-0.5">전국 고급 한옥 완공</p>
            <p className="text-[11px] lg:text-xs text-[#777770]">서울 북촌, 양평, 가평, 강릉, 제주 등</p>
          </div>

          <div className="p-5 bg-[#f4f3f1] rounded-xs border border-[#c8c7bf]/20 hover:border-[#c8c7bf]/60 transition-colors">
            <div className="font-serif text-2xl lg:text-3xl text-[#904b35] tracking-tight mb-1">
              65% <span className="text-sm font-sans text-[#474741] font-normal">절감</span>
            </div>
            <p className="text-xs lg:text-sm text-[#1a1c1b] font-semibold mb-0.5">패시브급 단열 성능</p>
            <p className="text-[11px] lg:text-xs text-[#777770]">독일식 로이 3중 시스템 창호 및 기밀벽체</p>
          </div>

          <div className="p-5 bg-[#f4f3f1] rounded-xs border border-[#c8c7bf]/20 hover:border-[#c8c7bf]/60 transition-colors">
            <div className="font-serif text-2xl lg:text-3xl text-[#161714] tracking-tight mb-1">
              100% <span className="text-sm font-sans text-[#474741] font-normal">엄선</span>
            </div>
            <p className="text-xs lg:text-sm text-[#1a1c1b] font-semibold mb-0.5">함수율 15% 이하 건조목</p>
            <p className="text-[11px] lg:text-xs text-[#777770]">천연 자연건조 금강송 육송 결구</p>
          </div>
        </div>
      </div>
    </section>
  );
};
