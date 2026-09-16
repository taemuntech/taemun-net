import React from 'react';
import { HERO_BG_URL, DESTINATIONS } from '../data/resorts';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-28 flex flex-col justify-between overflow-hidden bg-[#fcf9f3]">
      {/* Full-bleed background viewport with hairline overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_BG_URL}
          alt="Namhae Cliffside Villa Estate at golden hour sunset"
          className="w-full h-full object-cover object-center filter brightness-[0.92]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030402]/80 via-[#030402]/25 to-transparent" />
      </div>

      {/* Top spacer */}
      <div className="relative z-10 w-full px-6 lg:px-14 pt-8" />

      {/* Hero Central Content */}
      <div className="relative z-10 w-full px-6 lg:px-14 max-w-6xl mx-auto text-left pb-16">
        {/* Live Curator Weather & Time Pills */}
        <div className="flex flex-wrap gap-2 lg:gap-3 mb-6" id="hero-weather-pills">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="bg-[#fcf9f3]/85 backdrop-blur-md px-3.5 py-1.5 rounded border border-[#c6c7c0]/30 text-[#1c1c18] text-[10px] lg:text-[10px] tracking-[0.22em] uppercase font-semibold transition-all hover:bg-[#fcf9f3]"
            >
              {dest.name} • {dest.temp} {dest.time}
            </div>
          ))}
        </div>

        <p className="text-[11px] lg:text-[11px] text-[#fcf9f3] uppercase tracking-[0.24em] mb-3 opacity-90 font-medium">
          Transcendent Serenity in Untouched Sanctuaries
        </p>

        <h1 className="font-editorial text-4xl lg:text-7xl text-[#fcf9f3] leading-[1.15] font-normal mb-6 max-w-4xl tracking-tight">
          자연과 교감하는 가장 순수한 안식처
        </h1>

        <p className="text-sm lg:text-lg text-[#f0eee8] max-w-2xl font-light mb-10 leading-relaxed">
          제주 원시 곶자왈 숲, 남해의 에메랄드 해안 절벽, 발리 우붓의 깊은 영혼이 깃든 밸리까지. 아틀라스가 선사하는 세상에 단 하나뿐인 건축적 휴식.
        </p>

        {/* CTA Action Cluster */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4">
          <a
            href="#collection"
            id="hero-cta-collection"
            className="inline-flex justify-center items-center bg-[#fcf9f3] text-[#030402] px-8 lg:px-10 py-4 rounded text-[11px] tracking-[0.22em] uppercase font-medium hover:bg-[#ebe8e2] transition-colors duration-300 shadow-sm"
          >
            익스피리언스 컬렉션 살펴보기
          </a>
          <a
            href="#calculator"
            id="hero-cta-estate"
            className="inline-flex justify-center items-center bg-transparent border border-[#725b38] text-[#fcf9f3] px-8 lg:px-10 py-4 rounded text-[11px] tracking-[0.22em] uppercase font-medium hover:bg-[#725b38] hover:text-[#fcf9f3] transition-all duration-300"
          >
            프라이빗 에스테이트 전용 예약
          </a>
        </div>
      </div>

      {/* Architectural Baseline Divider */}
      <div className="relative z-10 w-full border-t border-[#c6c7c0]/20 bg-[#f0eee8]/90 backdrop-blur-sm py-4 px-6 lg:px-14 flex flex-col lg:flex-row justify-between items-center text-[#454742] text-[10px] tracking-[0.25em] uppercase font-medium">
        <span>ARCHITECTURAL SANCTUARY COLLECTION 2025</span>
        <span className="mt-2">THE EPITOME OF INTENTIONAL RETREATS &amp; UNCOMPROMISED PRIVACY</span>
      </div>
    </section>
  );
};
