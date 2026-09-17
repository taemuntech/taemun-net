import React from 'react';
import { PILLARS } from '../data/resorts';
import type { ExperiencePillarId } from '../types';

interface ArtisanalExperienceProps {
  /** 탭 상태는 상위가 들고 있다 — 헤더의 Gastronomy·Wellness·Sanctuary Journeys 메뉴가 같은 탭을 움직인다 */
  activePillarId: ExperiencePillarId;
  onSelectPillar: (id: ExperiencePillarId) => void;
}

export const ArtisanalExperience: React.FC<ArtisanalExperienceProps> = ({
  activePillarId,
  onSelectPillar,
}) => {
  const currentPillar = PILLARS.find((p) => p.id === activePillarId) ?? PILLARS[0];

  return (
    <section
      className="py-16 lg:py-24 bg-[#f6f3ed] scroll-mt-[calc(var(--sample-bar-h,0px)_+_64px)]"
      id="wellness"
    >
      <div className="w-full px-6 lg:px-14 mx-auto max-w-7xl">
        <div className="max-w-3xl mb-8 lg:mb-10">
          <span className="text-[11px] text-[#725b38] uppercase tracking-[0.22em] font-medium block mb-2">
            Artisanal Experience
          </span>
          <h2 className="font-editorial text-3xl lg:text-5xl text-[#030402] [word-break:keep-all]">
            미식과 치유, 영혼을 깨우는 여정
          </h2>
        </div>

        {/* Pillar Showcase Tabs — 가로 스크롤이면 셋째 탭이 화면 밖에 숨어 있었다. 좁은 폭에서는 세 칸으로 편다 */}
        <div
          className="grid grid-cols-3 lg:flex border-b border-[#c6c7c0]/20 mb-10 lg:mb-12"
          id="pillar-tabs"
          role="tablist"
          aria-label="익스피리언스 분야"
        >
          {PILLARS.map((pillar) => {
            const isActive = pillar.id === activePillarId;
            return (
              <button
                key={pillar.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelectPillar(pillar.id)}
                className={`min-h-12 px-2 pb-3 pt-1 lg:px-6 lg:pb-4 text-[10px] lg:text-[11px] uppercase tracking-[0.16em] lg:tracking-[0.22em] font-medium lg:whitespace-nowrap transition-all duration-300 border-b-2 ${
                  isActive
                    ? 'border-[#030402] text-[#030402] font-semibold'
                    : 'border-transparent text-[#454742] hover:text-[#030402]'
                }`}
              >
                {pillar.tabTitle}
              </button>
            );
          })}
        </div>

        {/* Pillar Content Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-5 lg:space-y-6">
            <span className="text-[10px] text-[#725b38] tracking-[0.22em] uppercase font-semibold block">
              {currentPillar.category}
            </span>
            <h3 className="font-editorial text-2xl lg:text-4xl text-[#030402] leading-tight [word-break:keep-all]">
              {currentPillar.title}
            </h3>
            <p className="text-xs lg:text-sm text-[#454742] font-light leading-relaxed">
              {currentPillar.description}
            </p>
            <div className="pt-4 border-t border-[#c6c7c0]/20 grid grid-cols-1 min-[480px]:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] text-[#767872] uppercase tracking-[0.2em] block mb-1">
                  {currentPillar.stats.label1}
                </span>
                <span className="font-editorial text-lg lg:text-2xl text-[#030402] leading-snug block">
                  {currentPillar.stats.val1}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#767872] uppercase tracking-[0.2em] block mb-1">
                  {currentPillar.stats.label2}
                </span>
                <span className="font-editorial text-lg lg:text-2xl text-[#030402] leading-snug block">
                  {currentPillar.stats.val2}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 rounded overflow-hidden shadow-sm">
            <img
              src={currentPillar.imageUrl}
              alt={currentPillar.alt}
              className="w-full h-[240px] sm:h-[320px] lg:h-[420px] object-cover transition-transform duration-700 hover:scale-[1.02]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
