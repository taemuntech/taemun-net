import React from 'react';
import { HERO_BG_URL, DESTINATIONS } from '../data/resorts';
import { useLocalTimes } from '../use-local-times';

interface HeroProps {
  onGoToCollection: () => void;
  onGoToCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onGoToCollection, onGoToCalculator }) => {
  // 예전엔 '17:42' 가 데이터에 박혀 있어 언제 봐도 같은 시각이었다 — 지금은 목적지 시간대의 실제 시각이다.
  const localTimes = useLocalTimes(DESTINATIONS);

  return (
    // min-h-svh: 모바일 브라우저 주소창이 100vh 를 넘겨 히어로가 화면 밖으로 밀리는 것을 막는다
    <section
      id="top"
      className="relative min-h-svh pt-20 lg:pt-28 flex flex-col justify-between overflow-hidden bg-[#fcf9f3]"
    >
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
      <div className="relative z-10 w-full px-6 lg:px-14 pt-6" />

      {/* Hero Central Content */}
      <div className="relative z-10 w-full px-6 lg:px-14 max-w-6xl mx-auto text-left pb-12 lg:pb-16">
        {/* Local Time & Weather Pills */}
        <div className="flex flex-wrap gap-2 lg:gap-3 mb-3" id="hero-weather-pills">
          {DESTINATIONS.map((dest) => (
            <div
              key={dest.id}
              className="bg-[#fcf9f3]/85 backdrop-blur-md px-3 py-1.5 rounded border border-[#c6c7c0]/30 text-[#1c1c18] text-[10px] tracking-[0.18em] uppercase font-semibold transition-all hover:bg-[#fcf9f3]"
            >
              {dest.name} • {localTimes?.[dest.id] ?? '--:--'} · {dest.temp}
            </div>
          ))}
        </div>
        {/*
          이 고지가 놓이는 높이는 스크림의 via(25%) 구간이라 배경이 밝다 —
          10px 반투명 흰 글자로는 석양 사진 위에서 읽히지 않았다. 위 날씨 칩과 같은 칩 안에 넣어 대비를 준다.
        */}
        <p className="inline-block bg-[#fcf9f3]/85 backdrop-blur-md px-2.5 py-1 rounded border border-[#c6c7c0]/30 text-[11px] text-[#1c1c18] tracking-[0.1em] mb-6 normal-case">
          현지 시각은 실제 시각이고, 기온은 예시입니다.
        </p>

        <p className="text-[11px] text-[#fcf9f3] uppercase tracking-[0.24em] mb-3 opacity-90 font-medium">
          Transcendent Serenity in Untouched Sanctuaries
        </p>

        {/* 태블릿(768)에서 데스크톱 크기를 그대로 쓰면 넘치고, 모바일 크기를 그대로 쓰면 허전해 중간 단계를 뒀다 */}
        <h1 className="font-editorial text-[2rem] sm:text-5xl lg:text-7xl text-[#fcf9f3] leading-[1.15] font-normal mb-5 max-w-4xl tracking-tight [word-break:keep-all]">
          자연과 교감하는 가장 순수한 안식처
        </h1>

        <p className="text-sm lg:text-lg text-[#f0eee8] max-w-2xl font-light mb-8 lg:mb-10 leading-relaxed">
          제주 원시 곶자왈 숲, 남해의 에메랄드 해안 절벽, 발리 우붓의 깊은 영혼이 깃든 밸리까지. 아틀라스가 선사하는
          건축적 휴식.
        </p>

        {/* CTA Action Cluster — 앵커로도 열리고, 클릭하면 해당 구역의 필터·탭까지 맞춰 준다 */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 lg:gap-4">
          <a
            href="#collection"
            id="hero-cta-collection"
            onClick={(e) => {
              e.preventDefault();
              onGoToCollection();
            }}
            className="inline-flex min-h-12 justify-center items-center bg-[#fcf9f3] text-[#030402] px-8 lg:px-10 py-4 rounded text-[11px] tracking-[0.22em] uppercase font-medium hover:bg-[#ebe8e2] transition-colors duration-300 shadow-sm"
          >
            익스피리언스 컬렉션 살펴보기
          </a>
          <a
            href="#calculator"
            id="hero-cta-estate"
            onClick={(e) => {
              e.preventDefault();
              onGoToCalculator();
            }}
            className="inline-flex min-h-12 justify-center items-center bg-transparent border border-[#725b38] text-[#fcf9f3] px-8 lg:px-10 py-4 rounded text-[11px] tracking-[0.22em] uppercase font-medium hover:bg-[#725b38] hover:text-[#fcf9f3] transition-all duration-300"
          >
            프라이빗 에스테이트 전용 예약
          </a>
        </div>
      </div>

      {/* Architectural Baseline Divider */}
      <div className="relative z-10 w-full border-t border-[#c6c7c0]/20 bg-[#f0eee8]/90 backdrop-blur-sm py-4 px-6 lg:px-14 flex flex-col lg:flex-row justify-between items-center gap-1 text-center text-[#454742] text-[10px] tracking-[0.2em] uppercase font-medium">
        <span>ARCHITECTURAL SANCTUARY COLLECTION 2025</span>
        <span>THE EPITOME OF INTENTIONAL RETREATS &amp; UNCOMPROMISED PRIVACY</span>
      </div>
    </section>
  );
};
