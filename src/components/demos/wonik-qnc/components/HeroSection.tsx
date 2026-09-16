"use client";

import React from 'react';
import { Play, Download } from 'lucide-react';

interface HeroSectionProps {
  onPlayAnniversaryVideo: () => void;
  onOpenBrochure: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPlayAnniversaryVideo,
  onOpenBrochure,
}) => {
  return (
    <section className="relative bg-[#283044] text-[#eef0ff] overflow-hidden quartz-grid" id="company">
      {/* Cold ambient quartz radiance overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#283044] via-[#283044]/90 to-[#006187]/30 pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#003d9b]/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-[#006187]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1320px] mx-auto px-6 pt-16 pb-20 lg:pt-24 lg:pb-28 flex flex-col justify-between">
        {/* Top Tagline & Node Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md w-fit mb-6 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-[#c6e7ff] animate-pulse" />
          <span className="text-[11px] font-mono font-semibold text-[#c6e7ff] tracking-wider uppercase">
            GLOBAL NO.1 QUARTZ &amp; ADVANCED MATERIALS
          </span>
        </div>

        {/* Main Corporate Hero Statement */}
        <div className="max-w-4xl">
          <h1 className="text-4xl lg:text-[56px] font-extrabold text-white mb-6 leading-[1.15] tracking-tight">
            세계 최고의 기술로
            <br />
            <span className="bg-gradient-to-r from-[#c6e7ff] via-[#dae2ff] to-white bg-clip-text text-transparent">
              초정밀 반도체 소재의 한계
            </span>
            를 넘습니다
          </h1>

          <p className="text-lg lg:text-xl text-[#d2d9f4] max-w-2xl mb-10 leading-relaxed font-light">
            원익큐앤씨는 쿼츠(Quartz), 세라믹(Ceramics), 정밀 세정·코팅(Cleaning &amp; Coating), 옵틱(Optics) 분야에서 글로벌 반도체 핵심 공정의 수율과 신뢰성을 책임집니다.
          </p>

          {/* CTA Cluster */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Primary Video Modal Trigger */}
            <button
              type="button"
              onClick={onPlayAnniversaryVideo}
              id="btn-hero-video-play"
              className="inline-flex items-center gap-3 px-6 py-3.5 rounded-md bg-[#0052cc] hover:bg-[#0c56d0] text-white font-semibold text-base transition-all duration-200 shadow-lg shadow-[#0052cc]/30 border-t border-white/20 group cursor-pointer"
            >
              <span className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-white text-white translate-x-0.5" />
              </span>
              <span>40주년 기념 영상 재생 (03:45)</span>
            </button>

            {/* Ghost Technical Download Button */}
            <button
              type="button"
              onClick={onOpenBrochure}
              id="btn-hero-brochure"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-md border border-white/30 hover:border-white text-white font-mono text-sm tracking-wider bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#c6e7ff]" />
              <span className="text-[#c6e7ff] font-bold">[+]</span>
              <span>기업소개서 브로슈어 다운로드</span>
            </button>
          </div>
        </div>

        {/* Key Performance Metric Ticker Overlay */}
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col group">
            <span className="font-mono text-xs text-[#81cfff] uppercase tracking-wider font-semibold mb-1">
              Heritage
            </span>
            <span className="font-mono text-3xl lg:text-5xl font-bold text-white tracking-tight">
              1984
            </span>
            <span className="text-sm text-[#d2d9f4] mt-1">40+ Years Material Mastery</span>
          </div>

          <div className="flex flex-col group">
            <span className="font-mono text-xs text-[#81cfff] uppercase tracking-wider font-semibold mb-1">
              Global Market
            </span>
            <span className="font-mono text-3xl lg:text-5xl font-bold text-[#c6e7ff] tracking-tight">
              NO. 1
            </span>
            <span className="text-sm text-[#d2d9f4] mt-1">반도체 쿼츠웨어 시장 점유율</span>
          </div>

          <div className="flex flex-col group">
            <span className="font-mono text-xs text-[#81cfff] uppercase tracking-wider font-semibold mb-1">
              Global Network
            </span>
            <span className="font-mono text-3xl lg:text-5xl font-bold text-white tracking-tight">
              10+
            </span>
            <span className="text-sm text-[#d2d9f4] mt-1">한국·미국·독일·대만·중국 거점</span>
          </div>

          <div className="flex flex-col group">
            <span className="font-mono text-xs text-[#81cfff] uppercase tracking-wider font-semibold mb-1">
              Listing Trust
            </span>
            <span className="font-mono text-3xl lg:text-5xl font-bold text-white tracking-tight">
              074600
            </span>
            <span className="text-sm text-[#d2d9f4] mt-1">KOSDAQ 우량 기술 기업</span>
          </div>
        </div>
      </div>
    </section>
  );
};
