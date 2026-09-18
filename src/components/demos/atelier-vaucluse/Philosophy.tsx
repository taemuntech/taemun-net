'use client';

import React, { useState } from 'react';
import { PHILOSOPHY_PILLARS } from './data/projects';
import { Layers, CheckCircle2 } from 'lucide-react';

interface PhilosophyProps {
  onOpenMaterialArchive: () => void;
}

export const Philosophy: React.FC<PhilosophyProps> = ({ onOpenMaterialArchive }) => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section className="py-24 bg-[#f4f3f1] border-b border-[#c8c7bf]/20" id="philosophy">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#904b35] block mb-3 font-sans">
            Our Core Philosophy
          </span>
          <h2 className="text-3xl lg:text-5xl font-serif font-normal text-[#161714] leading-tight tracking-[-0.015em] break-keep [word-break:keep-all]">
            공간을 대하는 보클루즈의 <br className="hidden lg:inline" />세 가지 시선
          </h2>
          <p className="text-sm lg:text-base text-[#474741] mt-4 font-light leading-relaxed font-sans break-keep [word-break:keep-all]">
            우리는 겉으로 드러나는 일시적 장식을 지양하고, 사용자의 호흡과 시간의 무게를 오롯이 담아내는 구조적 본질에 집중합니다.
          </p>
        </div>

        {/* Mobile Swipe Notice */}
        <div className="flex lg:hidden items-center justify-between text-xs text-[#777770] font-sans mb-3 px-1">
          <span className="font-medium text-[#161714]">보클루즈 3대 설계 철학</span>
          <span className="flex items-center gap-1 font-mono text-[11px] text-[#904b35]">
            좌우 스와이프 &rarr;
          </span>
        </div>

        {/* 3 Pillars: Mobile Horizontal Swipe Carousel & Desktop 3-col Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 scrollbar-none lg:grid lg:grid-cols-3 lg:gap-8 lg:mx-0 lg:px-0">
          {PHILOSOPHY_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.num}
              onMouseEnter={() => setActiveCard(idx)}
              onMouseLeave={() => setActiveCard(null)}
              className={`w-[84vw] shrink-0 snap-center lg:w-auto bg-[#faf9f7] p-7 lg:p-8 rounded border transition-all duration-300 flex flex-col justify-between ${
                activeCard === idx
                  ? 'border-[#161714] shadow-md lg:-translate-y-1'
                  : 'border-[#c8c7bf]/30 hover:border-[#777770]'
              }`}
            >
              <div>
                <div className="flex justify-between items-baseline mb-6 pb-4 border-b border-[#c8c7bf]/20">
                  <span className="text-3xl font-serif text-[#904b35]">{pillar.num}</span>
                  <span className="text-[11px] uppercase tracking-[0.18em] font-medium text-[#474741] font-sans">
                    {pillar.category}
                  </span>
                </div>

                <h3 className="text-xl lg:text-2xl font-serif text-[#161714] mb-3 break-keep [word-break:keep-all]">
                  {pillar.titleKr} <br />
                  <span className="text-xs font-sans font-normal tracking-wide text-[#474741] block mt-1">
                    {pillar.titleEn}
                  </span>
                </h3>

                <p className="text-sm text-[#474741] leading-relaxed font-sans font-light break-keep [word-break:keep-all]">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#c8c7bf]/20 flex items-center justify-between text-xs text-[#161714] font-sans">
                <span className="font-medium text-[#161714]/90 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-[#904b35]" />
                  {pillar.badge}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Material Archive Callout */}
        <div className="mt-10 lg:mt-12 bg-[#efeeec] p-6 rounded border border-[#c8c7bf]/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start lg:items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#faf9f7] flex items-center justify-center text-[#904b35] shadow-xs shrink-0 mt-0.5 lg:mt-0">
              <Layers size={18} />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-[#161714] font-sans break-keep [word-break:keep-all]">스튜디오 실물 마감재 무드보드 라이브러리</h4>
              <p className="text-xs text-[#474741] font-sans mt-0.5 break-keep [word-break:keep-all]">
                도산공원 아틀리에 쇼룸에서 천연 석재 슬랩과 고유 질감의 미장 플라스터를 직접 만져보실 수 있습니다. (보유 품목 수·구성은 예시)
              </p>
            </div>
          </div>
          <button
            onClick={onOpenMaterialArchive}
            className="group inline-flex min-h-11 items-center shrink-0 cursor-pointer"
          >
            <span className="text-xs font-semibold uppercase tracking-wider text-[#161714] group-hover:text-[#904b35] border-b border-[#161714] group-hover:border-[#904b35] pb-0.5 transition-colors">
              마감재 아카이브 살펴보기 &rarr;
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};
