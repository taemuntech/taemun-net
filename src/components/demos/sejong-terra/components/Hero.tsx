'use client';

import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onOpenConsultation: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export default function Hero({ onOpenConsultation, onNavigateSection }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-stone-950 pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/portfolio/sejong-terra/desktop.png"
          alt="세종테라개발 100만평 첨단 스마트 산업단지 대토공 조성 전경"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35 brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/75 to-stone-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(245,158,11,0.18),rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-950/60 px-3.5 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-wider text-amber-300">
              100만평 스마트 산단 · 3D 디지털 토공 · 지하 공동구 토목
            </span>
          </div>

          {/* Main Title */}
          <h1 className="mt-6 font-mono text-3xl font-black leading-tight tracking-tight text-white lg:text-5xl">
            미래 산업 거점의 기틀을 세우는{' '}
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
              스마트 메가 단지토목
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base leading-relaxed text-stone-300 lg:text-lg">
            100만평(330만㎡) 국가전략 산업단지와 신도시 배후단지 부지조성, 
            1,500만㎥ 절토·성토 토량 수급 3D 디지털 밸런스, 
            오차 ±20mm 이내의 스마트 중장비 머신가이던스(MG/MC) 무말뚝 시공, 
            그리고 4련 초대형 지하 공동구까지 미래형 인프라 부지를 책임 시공합니다(예시).
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col gap-4 lg:flex-row">
            <button
              type="button"
              onClick={() => onNavigateSection('section-projects')}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 px-6 py-3.5 font-mono text-sm font-bold text-stone-950 shadow-lg shadow-amber-500/30 transition-all hover:from-amber-400 hover:to-yellow-500"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              단지조성 핵심 프로젝트 둘러보기
            </button>
            <button
              type="button"
              onClick={onOpenConsultation}
              className="flex items-center justify-center gap-2 rounded-xl border border-stone-700 bg-stone-900/80 px-6 py-3.5 font-mono text-sm font-semibold text-stone-200 backdrop-blur-sm transition-all hover:border-amber-500/50 hover:bg-stone-800 hover:text-white"
            >
              <svg className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              부지조성 타당성 &amp; 3D 토공 검토 의뢰
            </button>
          </div>

          {/* Key Metrics Grid */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-stone-800/80 pt-8 lg:grid-cols-4">
            <div className="rounded-xl border border-stone-800/60 bg-stone-900/40 p-3.5">
              <span className="font-mono text-xs text-stone-400">최대 단지 면적</span>
              <p className="mt-1 font-mono text-xl font-black text-amber-400">330만 ㎡</p>
              <span className="text-[10px] text-stone-500">약 100만평 조성(예시)</span>
            </div>
            <div className="rounded-xl border border-stone-800/60 bg-stone-900/40 p-3.5">
              <span className="font-mono text-xs text-stone-400">단일 토공량</span>
              <p className="mt-1 font-mono text-xl font-black text-white">1,480만 ㎥</p>
              <span className="text-[10px] text-stone-500">절·성토 수급 밸런스(예시)</span>
            </div>
            <div className="rounded-xl border border-stone-800/60 bg-stone-900/40 p-3.5">
              <span className="font-mono text-xs text-stone-400">머신가이던스 시공</span>
              <p className="mt-1 font-mono text-xl font-black text-amber-400">오차 ±20mm</p>
              <span className="text-[10px] text-stone-500">GNSS 3D 정밀 가이던스(예시)</span>
            </div>
            <div className="rounded-xl border border-stone-800/60 bg-stone-900/40 p-3.5">
              <span className="font-mono text-xs text-stone-400">지하 공동구 턴키</span>
              <p className="mt-1 font-mono text-xl font-black text-white">연장 12.8km</p>
              <span className="text-[10px] text-stone-500">4련 콘크리트 박스(예시)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
