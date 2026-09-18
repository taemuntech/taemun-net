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
          src="/portfolio/logis-park/desktop.png"
          alt="로지스파크 초대형 물류센터 완공 전경"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/75 to-neutral-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.18),rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-950/60 px-3.5 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-wider text-cyan-300">
              초대형 스마트 콜드체인 &amp; 자동화 풀필먼트 턴키 시공
            </span>
          </div>

          {/* Main Title */}
          <h1 className="mt-6 font-mono text-3xl font-black leading-tight tracking-tight text-white lg:text-5xl">
            물류의 속도와 온도를 완성하는{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
              스마트 메가 허브
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base leading-relaxed text-neutral-300 lg:text-lg">
            용인·이천·안성 등 수도권 핵심 물류 거점 연면적 3만평 이상 초대형 복합 물류센터 시공 전문. 
            영하 25℃ 초저온 냉동창고 단열부터 대형 PC(Precast Concrete) 고속 가설, 
            로봇 AGV를 위한 FM1 초평탄 바닥까지 완벽한 기술력으로 책임 시공합니다.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => onNavigateSection('section-projects')}
              className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 font-mono text-sm font-bold text-neutral-950 shadow-lg shadow-cyan-500/30 transition-all hover:from-cyan-400 hover:to-blue-500"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              완공 물류 허브 둘러보기
            </button>
            <button
              onClick={onOpenConsultation}
              className="flex items-center justify-center gap-2 rounded-lg border border-neutral-700 bg-neutral-900/80 px-6 py-3.5 font-mono text-sm font-semibold text-neutral-200 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:bg-neutral-800 hover:text-white"
            >
              <svg className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              물류부지 인허가 &amp; 턴키 견적 의뢰
            </button>
          </div>

          {/* Key Metrics Grid */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-neutral-800/80 pt-8 lg:grid-cols-4">
            <div className="rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-3.5">
              <span className="font-mono text-xs text-neutral-400">누적 시공 연면적</span>
              <p className="mt-1 font-mono text-xl font-black text-cyan-400">180만 ㎡ 준공</p>
              <span className="text-[10px] text-neutral-500">(수도권 누적 예시)</span>
            </div>
            <div className="rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-3.5">
              <span className="font-mono text-xs text-neutral-400">바닥 평탄도 정밀도</span>
              <p className="mt-1 font-mono text-xl font-black text-white">FM1 초평탄</p>
              <span className="text-[10px] text-neutral-500">TR34 DM2 규격(예시)</span>
            </div>
            <div className="rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-3.5">
              <span className="font-mono text-xs text-neutral-400">초저온 냉동 공조</span>
              <p className="mt-1 font-mono text-xl font-black text-cyan-400">-25℃ 안정 유지</p>
              <span className="text-[10px] text-neutral-500">PIR 150T 단열(예시)</span>
            </div>
            <div className="rounded-lg border border-neutral-800/60 bg-neutral-900/40 p-3.5">
              <span className="font-mono text-xs text-neutral-400">종합건설업 등록</span>
              <p className="mt-1 font-mono text-xl font-black text-white">토목건축공사업</p>
              <span className="text-[10px] text-neutral-500">대형 물류 플랜트(예시)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
