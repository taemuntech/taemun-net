import React from 'react';
import { HERO_IMAGE_URL } from '../data/mockData';
import { ArrowRight, PlayCircle } from './Icons';
import { MetricsBar } from './MetricsBar';

interface HeroProps {
  onOpenVideoModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenVideoModal }) => {
  return (
    <section
      id="vision"
      className="relative min-h-[85vh] lg:min-h-[90vh] flex flex-col justify-between overflow-hidden border-b border-[#bcc9c6]/30"
    >
      {/* High-Resolution Visual Showcase Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          id="hero-bg-video"
          autoPlay
          loop
          muted
          playsInline
          poster={HERO_IMAGE_URL}
          className="w-full h-full object-cover object-center scale-100 filter brightness-[1.02] contrast-[0.98]"
        >
          <source src="/videos/h2-offshore-wind.mp4" type="video/mp4" />
          <img
            id="hero-bg-img"
            alt="Offshore Wind Hydrogen Infrastructure"
            className="w-full h-full object-cover object-center scale-100 filter brightness-[1.02] contrast-[0.98]"
            src={HERO_IMAGE_URL}
          />
        </video>
        {/* High-Key Nordic Translucent Clean Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/35 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9ff] via-transparent to-white/50"></div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-4 lg:px-12 pt-12 pb-8 flex flex-col justify-center flex-grow">
        <div className="max-w-3xl">
          {/* Net-Zero Status Pill */}
          <div
            id="hero-status-pill"
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-[#00685f]/20 backdrop-blur-md shadow-xs mb-4"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00685f] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00685f]"></span>
            </span>
            <span className="font-mono text-xs text-[#00685f] font-semibold tracking-wider">
              GLOBAL RENEWABLE ALLIANCE • RE100 &amp; NET-ZERO 2035
            </span>
          </div>

          {/* Headline */}
          <h1
            id="hero-main-headline"
            className="text-3xl lg:text-[54px] font-bold tracking-tight text-[#0b1c30] mb-5 leading-[1.18] drop-shadow-xs"
          >
            바람과 물에서 시작되는<br />
            무한한 청정에너지의 새로운 시대
          </h1>

          {/* Subtitle */}
          <p
            id="hero-subtitle"
            className="text-base lg:text-lg text-[#3d4947] max-w-2xl mb-8 font-normal leading-relaxed"
          >
            기가와트(GW)급 해상풍력 연계 고효율 PEM 수전해 플랜트부터 영하 253도 액화수소 글로벌 밸류체인까지. 지속 가능한 대한민국 산업 생태계를 위한 넷제로 에너지 엔지니어링을 선도합니다.
          </p>

          {/* CTAs */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3 mb-8">
            <a
              id="hero-cta-proposal"
              className="inline-flex items-center justify-center gap-2 bg-[#00685f] hover:bg-[#008378] text-white text-base font-semibold px-6 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 text-center"
              href="#consultation"
            >
              <span>사업 제휴 및 PPA 계약 제안서</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <button
              id="hero-cta-video"
              type="button"
              onClick={onOpenVideoModal}
              className="inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-[#eff4ff] text-[#00685f] border border-[#bcc9c6]/50 text-base font-semibold px-6 py-3.5 rounded-lg backdrop-blur-md shadow-xs hover:border-[#00685f]/40 transition-all duration-200 cursor-pointer text-center"
            >
              <PlayCircle className="w-5 h-5 text-[#006398]" />
              <span>서남해 1.2GW 해상풍력 실물 영상</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-Time Trust Metrics Bar */}
      <MetricsBar />
    </section>
  );
};
