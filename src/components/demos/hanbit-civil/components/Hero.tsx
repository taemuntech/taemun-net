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
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/portfolio/hanbit-civil/desktop.png"
          alt="한빛토목 해상 장대교량 완공 전경"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35 brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-neutral-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.15),rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-950/60 px-3.5 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-wider text-amber-300">
              국가 기간망 인프라 · 해상교량 · 대심도 철도 토목
            </span>
          </div>

          {/* Main Title */}
          <h1 className="mt-6 font-mono text-3xl font-black leading-tight tracking-tight text-white lg:text-5xl">
            국토를 잇고 내일을 여는{' '}
            <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
              메가 인프라 토목
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base leading-relaxed text-neutral-300 lg:text-lg">
            서해를 횡단하는 초대형 해상 사장교부터 도심 지하 55m 대심도 고속철도 터널, 
            산악 지형을 관통하는 6차선 고속도로까지. 정밀 라이다 측량과 특수 가설 공법으로 
            대한민국 국토의 가치를 높이는 메가 인프라를 시공합니다.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => onNavigateSection('section-projects')}
              className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3.5 font-mono text-sm font-bold text-neutral-950 shadow-lg shadow-amber-500/30 transition-all hover:from-amber-400 hover:to-orange-400"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              주요 인프라 실적 확인
            </button>
            <button
              onClick={onOpenConsultation}
              className="flex items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/80 px-6 py-3.5 font-mono text-sm font-semibold text-neutral-200 backdrop-blur-sm transition-all hover:border-amber-500/50 hover:bg-neutral-800 hover:text-white"
            >
              <svg className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              인프라 사업 참여 &amp; 기술 협력 의뢰
            </button>
          </div>

          {/* Key Metrics Grid */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-neutral-800/80 pt-8 lg:grid-cols-4">
            <div className="rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-3.5">
              <span className="font-mono text-xs text-neutral-400">교량·터널 시공 연장</span>
              <p className="mt-1 font-mono text-xl font-black text-amber-400">340 km 완공</p>
              <span className="text-[10px] text-neutral-500">(누적 인프라 예시)</span>
            </div>
            <div className="rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-3.5">
              <span className="font-mono text-xs text-neutral-400">해상 사장교 주경간</span>
              <p className="mt-1 font-mono text-xl font-black text-white">최대 540m</p>
              <span className="text-[10px] text-neutral-500">강합성 사장교(예시)</span>
            </div>
            <div className="rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-3.5">
              <span className="font-mono text-xs text-neutral-400">구조 내진 설계 등급</span>
              <p className="mt-1 font-mono text-xl font-black text-amber-400">내진 특등급</p>
              <span className="text-[10px] text-neutral-500">규모 7.0 지진 대응(예시)</span>
            </div>
            <div className="rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-3.5">
              <span className="font-mono text-xs text-neutral-400">종합건설업 등록</span>
              <p className="mt-1 font-mono text-xl font-black text-white">토목공사업 면허</p>
              <span className="text-[10px] text-neutral-500">국토교통부 등록(예시)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
