"use client";

import React from 'react';
import { ArrowRight, Download, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  currentLang: 'KR' | 'EN';
  onOpenBrochure: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onOpenBrochure }) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#283044] text-[#faf8ff]">
      {/* Cleanroom Background Overlay with Gradient Vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYWWRQL8TrOm6uhYUSENCtpc_flRXvG7tpaU04gam55xIYwlqOc5Bjzo_uqYhCwrrkUT5Opn3HsWSYHQ496EnRKjOI0NIIpH1NklHQkN-1iU2OWkkJF2rqlXQx0CGdpoGgGpdKcLb0Aw1wdEbv0uxHzg94ocoxLaZL9RxCwL_gh0S7zLo5Kr7KXGsHCYtSTiLDDXSrDj7xusKsYCQgPItrE2nGLQzBpEW4aiOfqZyqxyzXUFB8F6oN"
          alt="Cleanroom Robotic Automation"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-35 scale-105 transform motion-safe:transition-transform motion-safe:duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#283044] via-[#283044]/85 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#283044] via-transparent to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-16 lg:pt-28 lg:pb-24 flex flex-col justify-between min-h-[82vh]">
        {/* Top Badging & Headlines */}
        <div className="max-w-3xl space-y-6">
          {/* Precision Node Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-lg border border-[#b2c5ff]/30 bg-[#283044]/80 backdrop-blur-md text-[#c6e7ff] font-mono text-[11px] tracking-wider uppercase shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#0052cc] animate-ping"></span>
            <span>ADVANCED SEMICONDUCTOR FA &amp; GAS ENGINEERING</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-[32px] lg:text-[54px] font-extrabold tracking-tight leading-[1.18] font-sans">
            {currentLang === 'KR' ? (
              <>
                어제보다 오늘 더,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b2c5ff] via-[#81cfff] to-[#e2e7ff]">
                  오늘보다 내일 더
                </span><br />
                반도체 자동화와 가스 제어의 미래
              </>
            ) : (
              <>
                Better Today Than Yesterday,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b2c5ff] via-[#81cfff] to-[#e2e7ff]">
                  Greater Tomorrow Than Today
                </span><br />
                The Future of Semiconductor FA &amp; Gas Control
              </>
            )}
          </h1>

          {/* Subheadline */}
          <p className="text-[16px] lg:text-[18px] text-[#d2d9f4]/90 max-w-2xl leading-relaxed">
            {currentLang === 'KR' ? (
              '한양시스템은 반도체 제조 공정에서 필수적인 고정밀 자동화(FA) 장비, 실시간 스마트 S/W 제어 솔루션, 초고순도(UHP) 특수가스 공급 인프라를 공급하는 대한민국 대표 반도체 엔지니어링 파트너입니다.'
            ) : (
              'HANYANGSYSTEM is a premier semiconductor engineering partner delivering high-precision factory automation (FA), real-time smart S/W control solutions, and ultra-high-purity (UHP) specialty gas infrastructure for advanced fabs.'
            )}
          </p>

          {/* CTA Cluster */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a
              href="#consultation"
              id="hero-btn-consultation"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-lg bg-[#0052cc] hover:bg-[#0c56d0] text-white text-[15px] font-semibold transition-all duration-200 shadow-lg shadow-[#0052cc]/30 active:scale-95 border-t border-white/20 cursor-pointer"
            >
              <span>{currentLang === 'KR' ? '맞춤형 설비 상담 신청' : 'Request Consultation'}</span>
              <ArrowRight className="w-5 h-5" />
            </a>

            <button
              type="button"
              id="hero-btn-brochure"
              onClick={onOpenBrochure}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-white/10 hover:bg-white/15 text-[#faf8ff] border border-white/20 text-[15px] font-medium backdrop-blur-md transition-all duration-200 cursor-pointer active:scale-95"
            >
              <Download className="w-5 h-5 text-[#81cfff]" />
              <span>{currentLang === 'KR' ? '솔루션 브로슈어 다운로드' : 'Download Brochure'}</span>
            </button>
          </div>
        </div>

        {/* Trust Metrics HUD Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 backdrop-blur-md bg-[#283044]/50 p-6 rounded-xl border border-white/10">
          <div className="space-y-1">
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-[36px] lg:text-[46px] font-bold text-white tracking-tight">30</span>
              <span className="font-mono text-[22px] font-bold text-[#b2c5ff]">+</span>
            </div>
            <p className="font-mono text-[11px] text-[#d2d9f4] uppercase tracking-wider">
              {currentLang === 'KR' ? '공정 장비 공급 레퍼런스' : 'Equipment Supply Track Record'}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-[36px] lg:text-[46px] font-bold text-white tracking-tight">99.98</span>
              <span className="font-mono text-[22px] font-bold text-[#b2c5ff]">%</span>
            </div>
            <p className="font-mono text-[11px] text-[#d2d9f4] uppercase tracking-wider">
              {currentLang === 'KR' ? '라인 무중단 가동 신뢰도' : 'Line Zero-Downtime Reliability'}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-[28px] lg:text-[38px] font-bold text-white tracking-tight">ISO</span>
              <span className="font-mono text-[12px] lg:text-[14px] font-semibold text-[#b2c5ff] ml-1">9001/14001</span>
            </div>
            <p className="font-mono text-[11px] text-[#d2d9f4] uppercase tracking-wider">
              {currentLang === 'KR' ? '글로벌 품질·환경 인증' : 'Global Quality & Enviro Certs'}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-baseline gap-1">
              <span className="font-mono text-[36px] lg:text-[46px] font-bold text-white tracking-tight">100</span>
              <span className="font-mono text-[22px] font-bold text-[#b2c5ff]">%</span>
            </div>
            <p className="font-mono text-[11px] text-[#d2d9f4] uppercase tracking-wider">
              {currentLang === 'KR' ? '국산화 특화 자동화 S/W' : 'Proprietary Automation S/W'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
