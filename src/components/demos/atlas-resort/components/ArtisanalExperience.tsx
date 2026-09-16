import React, { useState } from 'react';
import { PILLARS } from '../data/resorts';
import { ExperiencePillarId } from '../types';

export const ArtisanalExperience: React.FC = () => {
  const [activePillarId, setActivePillarId] = useState<ExperiencePillarId>('gastro');

  const currentPillar = PILLARS.find((p) => p.id === activePillarId) || PILLARS[0];

  return (
    <section className="py-20 lg:py-24 bg-[#f6f3ed]" id="wellness">
      <div className="w-full px-6 lg:px-14 mx-auto max-w-7xl">
        <div className="max-w-3xl mb-10">
          <span className="text-[11px] text-[#725b38] uppercase tracking-[0.22em] font-medium block mb-2">
            Artisanal Experience
          </span>
          <h2 className="font-editorial text-3xl lg:text-5xl text-[#030402]">
            미식과 치유, 영혼을 깨우는 여정
          </h2>
        </div>

        {/* Pillar Showcase Tabs */}
        <div className="flex border-b border-[#c6c7c0]/20 mb-12 overflow-x-auto" id="pillar-tabs">
          {PILLARS.map((pillar) => {
            const isActive = pillar.id === activePillarId;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActivePillarId(pillar.id)}
                className={`pb-4 px-6 text-[11px] uppercase tracking-[0.22em] font-medium whitespace-nowrap transition-all duration-300 border-b-2 ${ isActive ? 'border-[#030402] text-[#030402] font-semibold' : 'border-transparent text-[#454742] hover:text-[#030402]' }`}
              >
                {pillar.tabTitle}
              </button>
            );
          })}
        </div>

        {/* Pillar Content Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-[10px] text-[#725b38] tracking-[0.22em] uppercase font-semibold">
              {currentPillar.category}
            </span>
            <h3 className="font-editorial text-2xl lg:text-4xl text-[#030402] leading-tight">
              {currentPillar.title}
            </h3>
            <p className="text-xs lg:text-sm text-[#454742] font-light leading-relaxed">
              {currentPillar.description}
            </p>
            <div className="pt-4 border-t border-[#c6c7c0]/20 grid grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] text-[#767872] uppercase tracking-[0.2em] block mb-1">
                  {currentPillar.stats.label1}
                </span>
                <span className="font-editorial text-xl lg:text-2xl text-[#030402]">
                  {currentPillar.stats.val1}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-[#767872] uppercase tracking-[0.2em] block mb-1">
                  {currentPillar.stats.label2}
                </span>
                <span className="font-editorial text-xl lg:text-2xl text-[#030402]">
                  {currentPillar.stats.val2}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 rounded overflow-hidden shadow-sm">
            <img
              src={currentPillar.imageUrl}
              alt={currentPillar.alt}
              className="w-full h-[320px] lg:h-[420px] object-cover transition-transform duration-700 hover:scale-[1.02]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
