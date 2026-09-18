'use client';

import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onOpenConsultation: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export default function Hero({ onOpenConsultation, onNavigateSection }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-neutral-950 pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/portfolio/geo-foundation/desktop.png"
          alt="지오파운데이션 대심도 흙막이 굴착 전경"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35 brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-neutral-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(217,119,6,0.18),rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-950/60 px-3.5 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-wider text-amber-300">
              대심도 흙막이 · 지하연속벽 D-Wall · RCD 특수기초 토목
            </span>
          </div>

          {/* Main Title */}
          <h1 className="mt-6 font-mono text-3xl font-black leading-tight tracking-tight text-white lg:text-5xl">
            지상 100층을 지탱하는{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
              대심도 특수기초
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base leading-relaxed text-neutral-300 lg:text-lg">
            도심 초고밀도 인접지 지하 50m 대심도 굴착, 수밀성 영구 지하연속벽(D-Wall), 
            직경 2.5m 대구경 RCD 현장타설 암반말뚝, 초고압 차수 제트그라우팅까지. 
            인접 건물 침하와 도로 함몰 리스크를 원천 차단하는 지반 엔지니어링을 수행합니다.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col gap-4 lg:flex-row">
            <button
              onClick={() => onNavigateSection('section-projects')}
              className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-600 to-yellow-600 px-6 py-3.5 font-mono text-sm font-bold text-neutral-950 shadow-lg shadow-amber-600/30 transition-all hover:from-amber-500 hover:to-yellow-500"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              특수기초 프로젝트 둘러보기
            </button>
            <button
              onClick={onOpenConsultation}
              className="flex items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/80 px-6 py-3.5 font-mono text-sm font-semibold text-neutral-200 backdrop-blur-sm transition-all hover:border-amber-500/50 hover:bg-neutral-800 hover:text-white"
            >
              <svg className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              지반 시추조사서 기술 검토 의뢰
            </button>
          </div>

          {/* Key Metrics Grid */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-neutral-800/80 pt-8 lg:grid-cols-4">
            <div className="rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-3.5">
              <span className="font-mono text-xs text-neutral-400">최대 굴착 심도</span>
              <p className="mt-1 font-mono text-xl font-black text-amber-400">지하 52m 관통</p>
              <span className="text-[10px] text-neutral-500">(D-Wall 완공 기준 예시)</span>
            </div>
            <div className="rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-3.5">
              <span className="font-mono text-xs text-neutral-400">누적 흙막이 실적</span>
              <p className="mt-1 font-mono text-xl font-black text-white">260개소 준공</p>
              <span className="text-[10px] text-neutral-500">(도심 대심도 예시)</span>
            </div>
            <div className="rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-3.5">
              <span className="font-mono text-xs text-neutral-400">지반 변위 제어</span>
              <p className="mt-1 font-mono text-xl font-black text-amber-400">1.0mm 이내 억제</p>
              <span className="text-[10px] text-neutral-500">인접 지하철 구간(예시)</span>
            </div>
            <div className="rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-3.5">
              <span className="font-mono text-xs text-neutral-400">전문건설업 면허</span>
              <p className="mt-1 font-mono text-xl font-black text-white">지반조성·포장</p>
              <span className="text-[10px] text-neutral-500">특수기초 전문(예시)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
