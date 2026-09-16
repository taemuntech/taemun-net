"use client";

import React from 'react';
import { RESIDENCE_STORIES } from '../data/antiqueData';

export const ResidenceStories: React.FC = () => {
  return (
    <section
      id="residence-stories"
      className="py-16 lg:py-20 bg-[#fbf2ed] border-b border-[#d6c2c2]"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-14">
          <span className="text-[10px] text-[#735b24] uppercase tracking-[0.25em] font-bold">
            Patrons &amp; Provenance in Modern Spaces
          </span>
          <h2 className="font-serif text-[28px] lg:text-[36px] text-[#300a10] mt-2">
            메종 당티크와 함께한 공간들
          </h2>
          <p className="font-serif text-[16px] text-[#514344] mt-2">
            시간이 빚어낸 앤틱 마스터피스가 현대의 주거와 부티크 공간 속에 녹아든 순간을 기록합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {RESIDENCE_STORIES.map((story) => (
            <article
              key={story.id}
              id={`story-card-${story.id}`}
              className="bg-[#fff8f5] p-5 rag-border flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
            >
              <div className="space-y-4">
                <div className="aspect-[16/10] overflow-hidden bg-[#efe6e2]">
                  <img
                    alt={story.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    src={story.image}
                  />
                </div>

                <p className="font-serif text-[15px] text-[#514344] leading-relaxed italic">
                  "{story.quote}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#d6c2c2]/60">
                <p className="font-serif text-[16px] font-bold text-[#300a10]">
                  {story.clientName}
                </p>
                <p className="text-[12px] text-[#735b24] font-medium">
                  {story.clientRole} · {story.projectLocation}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
