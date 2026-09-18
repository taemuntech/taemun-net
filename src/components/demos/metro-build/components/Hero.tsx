'use client';

import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onOpenConsultation: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export default function Hero({ onOpenConsultation, onNavigateSection }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-slate-950 pt-24 pb-16 lg:pt-32 lg:pb-24">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/portfolio/metro-build/desktop.png"
          alt="메트로종합건설 기업사옥 시공 전경"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30 brightness-75 contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.18),rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-950/60 px-3.5 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-wider text-blue-300">
              기업사옥 &amp; 스마트 지식산업센터 턴키 시공
            </span>
          </div>

          {/* Main Title */}
          <h1 className="mt-6 font-mono text-3xl font-black leading-tight tracking-tight text-white lg:text-5xl">
            기술과 신뢰로 완성하는{' '}
            <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              기업의 랜드마크
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base leading-relaxed text-slate-300 lg:text-lg">
            판교 테크노밸리, 마곡 바이오 클러스터, 가산 지식산업단지까지. 
            부지 적합성 분석부터 인허가, 디지털 트윈 BIM 4D 정밀 시공, 책임 준공까지 
            메트로종합건설이 기업의 미래 공간을 완벽하게 시공합니다.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => onNavigateSection('section-portfolio')}
              className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-mono text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:from-blue-500 hover:to-indigo-500"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              주요 완공 실적 둘러보기
            </button>
            <button
              onClick={onOpenConsultation}
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900/80 px-6 py-3.5 font-mono text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-slate-800 hover:text-white"
            >
              <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              신축 부지 법적 검토 &amp; 견적 신청
            </button>
          </div>

          {/* Key Metrics Grid */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-8 lg:grid-cols-4">
            <div className="rounded-lg border border-slate-800/60 bg-slate-900/40 p-3.5">
              <span className="font-mono text-xs text-slate-400">누적 시공 연면적</span>
              <p className="mt-1 font-mono text-xl font-black text-blue-400">120만 ㎡ 준공</p>
              <span className="text-[10px] text-slate-500">(누적 실적 예시)</span>
            </div>
            <div className="rounded-lg border border-slate-800/60 bg-slate-900/40 p-3.5">
              <span className="font-mono text-xs text-slate-400">공기 준수 실적</span>
              <p className="mt-1 font-mono text-xl font-black text-white">99.8% 달성</p>
              <span className="text-[10px] text-slate-500">(준공 현장 기준 예시)</span>
            </div>
            <div className="rounded-lg border border-slate-800/60 bg-slate-900/40 p-3.5">
              <span className="font-mono text-xs text-slate-400">품질 및 안전 등급</span>
              <p className="mt-1 font-mono text-xl font-black text-blue-400">안전 관리 우수</p>
              <span className="text-[10px] text-slate-500">BIM 4D 통합 관제(예시)</span>
            </div>
            <div className="rounded-lg border border-slate-800/60 bg-slate-900/40 p-3.5">
              <span className="font-mono text-xs text-slate-400">종합건설업 등록</span>
              <p className="mt-1 font-mono text-xl font-black text-white">건축공사업 면허</p>
              <span className="text-[10px] text-slate-500">국토교통부 등록(예시)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
