'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { HERO_IMAGE_URL } from '../data/portfolioData';

interface HeroSectionProps {
  onExploreArchival: () => void;
  onExploreMaterial: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreArchival,
  onExploreMaterial,
}) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#0d0e10] border-b border-white/10 pt-8 pb-16 lg:py-24">
      {/* Subtle ambient glow background */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#c5a880]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-5 lg:px-16">
        {/* Monograph Header Subtitle */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-2 bg-[#c5a880] shadow-[0_0_8px_rgba(197,168,128,0.8)]" />
            <span className="text-xs uppercase tracking-[0.2em] text-[#c5a880] font-medium">
              ARCHITECTURAL ESSAY • ISSUE NO. 28
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs tracking-[0.15em] text-[#998f83]">
            <span>SEOUL • CHEONGDAM • HANNAM</span>
            <span className="hidden lg:inline text-white/20">—</span>
            <span className="hidden lg:inline">EST. 2014</span>
          </div>
        </div>

        {/* Main Asymmetric Monograph Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mt-12">
          {/* Text Narrative (5 columns) */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#c5a880] mb-3 block font-semibold">
              Master of Space &amp; Materiality
            </span>
            <h1 className="text-3xl lg:text-4xl lg:text-[50px] lg:leading-[1.2] font-serif text-[#f4efea] tracking-tight break-keep [word-break:keep-all]">
              공간의 가치를 짓는
              <br />
              <span className="italic font-serif text-[#c5a880]">하이엔드 주거 &amp; 상업</span>
              <br />
              인테리어 아키텍처.
            </h1>
            <p className="mt-6 text-base lg:text-[17px] text-[#d1c5b8] leading-relaxed max-w-xl font-light">
              하우스앤스페이스는 단순한 공간 장식을 넘어, 빛의 흐름, 시간의 퇴적을 견디는 천연 석재와 목재, 그리고 거주자의 철학을 건축적 조형 언어로 승화시킵니다.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-5">
              <button
                onClick={onExploreArchival}
                className="inline-flex items-center gap-3 bg-[#c5a880] text-[#121315] font-medium px-8 py-3.5 text-xs tracking-[0.16em] uppercase hover:bg-[#e0c298] shadow-lg shadow-[#c5a880]/10 transition-all duration-300 cursor-pointer"
              >
                <span>View Archival Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onExploreMaterial}
                className="inline-flex items-center gap-2 border border-white/20 text-[#f4efea] px-6 py-3.5 text-xs tracking-[0.16em] uppercase hover:border-[#c5a880] hover:text-[#c5a880] transition-all duration-300 cursor-pointer"
              >
                <span>Material Dossier</span>
              </button>
            </div>

            {/* Curatorial Spec Bar — 실적처럼 읽히는 수치라 셋 다 예시 표기를 단다.
                「3 Years Provenance Warranty」는 기간·범위·면책이 붙는 보증 약속이라
                사후 점검 프로그램 표기로 바꿨다(가상 브랜드가 보증을 약속하면 안 된다). */}
            <div className="grid grid-cols-3 gap-4 pt-10 mt-10 border-t border-white/10 text-left">
              <div>
                <p className="text-2xl lg:text-3xl font-serif text-[#f4efea]">128+</p>
                <p className="text-[11px] text-[#998f83] uppercase tracking-[0.16em] mt-1 break-keep [word-break:keep-all]">
                  Penthouse Projects (예시)
                </p>
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-serif text-[#c5a880]">0.1mm</p>
                <p className="text-[11px] text-[#998f83] uppercase tracking-[0.16em] mt-1 break-keep [word-break:keep-all]">
                  Precision Craft (예시)
                </p>
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-serif text-[#f4efea]">3 Years</p>
                <p className="text-[11px] text-[#998f83] uppercase tracking-[0.16em] mt-1 break-keep [word-break:keep-all]">
                  Aftercare Programme (예시)
                </p>
              </div>
            </div>
          </div>

          {/* Hero Frame (7 columns) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative bg-[#1b1c1e] p-3 border border-white/10 shadow-2xl group">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0d0e10]">
                <img
                  src={HERO_IMAGE_URL}
                  alt="하우스앤스페이스 대표 주거 프로젝트 외관 — 목재와 강재 프레임의 저녁 전경 (예시)"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.02]"
                />
              </div>
              {/* 좁은 화면에서 두 줄이 서로를 밀어 글자가 눌리던 자리 — lg 미만은 위아래로 쌓는다 */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-1 lg:gap-4 pt-3.5 px-1 border-t border-white/5 mt-1">
                <span className="text-[11px] text-[#c5a880] uppercase tracking-[0.15em] font-medium break-keep [word-break:keep-all]">
                  Plate 01 • Courtyard Elevation — Timber, Steel &amp; Evening Light
                </span>
                <span className="text-[11px] text-[#998f83] tracking-wider shrink-0">
                  Seoul, Republic of Korea
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
