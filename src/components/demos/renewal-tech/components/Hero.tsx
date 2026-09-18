'use client';

import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onOpenConsultation: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export default function Hero({ onOpenConsultation, onNavigateSection }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-neutral-950 pt-28 pb-16 lg:pt-36 lg:pb-24">
      {/* Background Graphic & Texture */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/portfolio/renewal-tech/renewal-02.jpg"
          alt="도심 프라임 사옥 대수선 완공 전경"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-25 brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-950/60 px-3.5 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-wider text-cyan-300">
              도심 노후 빌딩 리모델링 &amp; 밸류애드 엔지니어링
            </span>
          </div>

          {/* Main Title */}
          <h1 className="mt-6 font-mono text-3xl font-black leading-tight tracking-tight text-white lg:text-5xl">
            노후 빌딩의 한계를 넘어,{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
              프라임 랜드마크로의 재탄생
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base leading-relaxed text-neutral-300 lg:text-lg">
            철거 후 신축 대비 <strong className="text-cyan-300">공사비 약 40% 절감(예시)</strong>과{' '}
            <strong className="text-cyan-300">공기 60% 단축(예시)</strong>. 정밀 구조 진단부터 탄소섬유 내진 보강,
            초단열 삼중 로이 커튼월, 합법적 수직 증축까지 건물 자산 가치를 극대화하는 원스톱 솔루션을 제공합니다.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => onNavigateSection('section-before-after')}
              className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 font-mono text-sm font-bold text-neutral-950 shadow-lg shadow-cyan-500/25 transition-all hover:from-cyan-400 hover:to-blue-500"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              비포 &amp; 애프터 실물 비교
            </button>
            <button
              onClick={onOpenConsultation}
              className="flex items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/80 px-6 py-3.5 font-mono text-sm font-semibold text-neutral-200 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:bg-neutral-800 hover:text-white"
            >
              <svg className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              노후 건물 무료 자산 진단 의뢰
            </button>
          </div>

          {/* Key Metrics Grid */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-neutral-800/80 pt-8 lg:grid-cols-4">
            <div className="rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-3.5">
              <span className="font-mono text-xs text-neutral-400">신축 대비 공사비 절감</span>
              <p className="mt-1 font-mono text-xl font-black text-cyan-400">약 42% 절감</p>
              <span className="text-[10px] text-neutral-500">(예시 기준)</span>
            </div>
            <div className="rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-3.5">
              <span className="font-mono text-xs text-neutral-400">공사 기간 획기적 단축</span>
              <p className="mt-1 font-mono text-xl font-black text-white">8개월 준공</p>
              <span className="text-[10px] text-neutral-500">신축 20개월 대비</span>
            </div>
            <div className="rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-3.5">
              <span className="font-mono text-xs text-neutral-400">구조 안전 성능 등급</span>
              <p className="mt-1 font-mono text-xl font-black text-cyan-400">특등급 내진</p>
              <span className="text-[10px] text-neutral-500">탄소섬유 보강(예시)</span>
            </div>
            <div className="rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-3.5">
              <span className="font-mono text-xs text-neutral-400">누적 대수선 밸류애드</span>
              <p className="mt-1 font-mono text-xl font-black text-white">48개동 완공</p>
              <span className="text-[10px] text-neutral-500">수도권 주요 권역(예시)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
