import React from 'react';
import { HERO_BACKGROUND_IMAGE } from '../data/mockData';
import { Shield, FileSpreadsheet, Award, BrainCircuit, Headphones } from 'lucide-react';

interface HeroSectionProps {
  onApplyClick: () => void;
  onExploreDataClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onApplyClick,
  onExploreDataClick,
}) => {
  return (
    <section id="hero" className="relative w-full overflow-hidden bg-[#ffffff]">
      {/* Marble Colonnade Canvas Layer */}
      <div
        className="relative w-full min-h-[660px] xl:min-h-[740px] flex items-center bg-cover bg-center"
        style={{
          backgroundImage: `url('${HERO_BACKGROUND_IMAGE}')`,
        }}
      >
        {/* Travertine Stone & Deep Ink Scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#ffffff] via-[#ffffff]/90 to-[#ffffff]/45 backdrop-blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#ffffff] via-transparent to-transparent"></div>

        {/* Content Well */}
        <div className="relative z-10 w-full px-4 lg:px-8 lg:px-12 xl:px-16 py-16 lg:py-20 lg:py-24">
          <div className="max-w-4xl space-y-6">
            {/* Latin Epigraph & Seal Stamp */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 bg-[#eff4ff] border border-[#0d1c2f]/10 shadow-xs">
              <span className="w-2 h-2 bg-[#cf6721] inline-block"></span>
              <span className="font-label-sm text-[11px] lg:text-xs uppercase tracking-widest text-[#0d1c2f] font-semibold">
                CURIA IURIDICA ET RATIONIS FISCALIS // EST. 2011
              </span>
              <span className="font-label-sm text-[10px] lg:text-[11px] text-[#45464d] font-semibold">
                ◆ SEOCHO JUDICIAL SANCTUARY
              </span>
            </div>

            {/* Monumental Headline */}
            <h1 className="font-display-lg text-4xl lg:text-5xl lg:text-6xl text-[#0d1c2f] tracking-tight leading-[1.12] uppercase font-bold">
              합격은 타협하지 않는 <br />
              <span className="italic font-title-lg font-normal text-[#0d1c2f]/90">
                집념에서
              </span>{' '}
              시작됩니다.
            </h1>

            {/* Scholastic Subtitle */}
            <p className="font-body-lg text-lg lg:text-xl text-[#45464d] max-w-2xl leading-relaxed pt-1">
              대한민국 사법시험 출신 법조인, 재판연구관, 대형 회계법인 파트너 출신 교수진(예시)이 함께하는 법학전문대학원(LEET)·공인회계사(CPA)·변호사시험 정밀 합격 지원 시스템(예시).
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onApplyClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#000000] text-white font-label-md text-xs lg:text-sm tracking-wider uppercase shadow-md hover:bg-[#131b2e] hover:text-[#dae2fd] transition-all cursor-pointer group"
              >
                <Shield className="w-4 h-4 text-[#ffb68e] group-hover:scale-110 transition-transform" />
                <span>2025/26 정규반 심층 입학사정 신청</span>
              </button>

              <button
                onClick={onExploreDataClick}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#e6eeff] text-[#0d1c2f] font-label-md text-xs lg:text-sm tracking-wider uppercase border border-[#0d1c2f]/15 hover:bg-[#dde9ff] hover:border-[#0d1c2f]/30 transition-all cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#cf6721]" />
                <span>합격자 점수 데이터 리포트 열람</span>
              </button>
            </div>

            {/* Telemetry Institutional Metrics Badges */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4 pt-6">
              <div className="p-4 bg-[#eff4ff] border border-[#0d1c2f]/10 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-[11px] text-[#45464d] uppercase tracking-wider">
                    Historical Placement
                  </span>
                  <Award className="w-4 h-4 text-[#cf6721]" />
                </div>
                <div className="font-headline-md text-2xl lg:text-3xl text-[#0d1c2f] font-bold mt-1.5">
                  96.4%
                </div>
                <div className="font-body-sm text-xs lg:text-sm text-[#45464d] mt-0.5">
                  SKY 로스쿨 & Big 4 회계법인 누적
                </div>
              </div>

              <div className="p-4 bg-[#eff4ff] border border-[#0d1c2f]/10 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-[11px] text-[#45464d] uppercase tracking-wider">
                    LEET Score Telemetry
                  </span>
                  <BrainCircuit className="w-4 h-4 text-[#cf6721]" />
                </div>
                <div className="font-headline-md text-2xl lg:text-3xl text-[#0d1c2f] font-bold mt-1.5">
                  138.4 pt
                </div>
                <div className="font-body-sm text-xs lg:text-sm text-[#45464d] mt-0.5">
                  언어이해·추리논증 전국 상위 0.8%
                </div>
              </div>

              <div className="p-4 bg-[#eff4ff] border border-[#0d1c2f]/10 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-[11px] text-[#45464d] uppercase tracking-wider">
                    Acoustic Infrastructure
                  </span>
                  <Headphones className="w-4 h-4 text-[#cf6721]" />
                </div>
                <div className="font-headline-md text-2xl lg:text-3xl text-[#0d1c2f] font-bold mt-1.5">
                  1,240 Carrels
                </div>
                <div className="font-body-sm text-xs lg:text-sm text-[#45464d] mt-0.5">
                  서초동 최고사양 1인 밀폐 독서실
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
