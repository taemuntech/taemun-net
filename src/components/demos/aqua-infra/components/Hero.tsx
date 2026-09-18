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
          src="/portfolio/aqua-infra/desktop.png"
          alt="아쿠아인프라 지하화 친환경 수처리 및 생태하천 복합단지 전경"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35 brightness-75 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.18),rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-950/60 px-3.5 py-1.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-mono text-xs font-semibold tracking-wider text-cyan-300">
              대용량 상수도 · 지하화 하수처리장 · 대심도 빗물터널 토목
            </span>
          </div>

          {/* Main Title */}
          <h1 className="mt-6 font-mono text-3xl font-black leading-tight tracking-tight text-white lg:text-5xl">
            도시의 지하를 살리고 생명을 순환시키는{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
              스마트 수자원 메가 토목
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base leading-relaxed text-slate-300 lg:text-lg">
            도심 침수 피해를 선제 예방하는 지하 45m 대심도 빗물 배수터널(방수로), 
            일일 50만톤 완전 지하화 친환경 복합 수질복원센터, 팔당 원수를 공급하는 Ø2,400mm 광역 도수터널, 
            그리고 맑은 물과 어도가 살아 숨 쉬는 도심 생태하천 복원까지 신뢰받는 수자원 인프라를 완성합니다(예시).
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-col gap-4 lg:flex-row">
            <button
              type="button"
              onClick={() => onNavigateSection('section-projects')}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3.5 font-mono text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/30 transition-all hover:from-cyan-400 hover:to-blue-500"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              수자원 메가 프로젝트 둘러보기
            </button>
            <button
              type="button"
              onClick={onOpenConsultation}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 font-mono text-sm font-semibold text-slate-200 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:bg-slate-800 hover:text-white"
            >
              <svg className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              인프라 타당성 검토 &amp; 기술 제휴 신청
            </button>
          </div>

          {/* Key Metrics Grid */}
          <div className="mt-12 grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-8 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-3.5">
              <span className="font-mono text-xs text-slate-400">일일 수처리 용량</span>
              <p className="mt-1 font-mono text-xl font-black text-cyan-400">50만 ㎥/일</p>
              <span className="text-[10px] text-slate-500">완전 지하화 MBR(예시)</span>
            </div>
            <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-3.5">
              <span className="font-mono text-xs text-slate-400">대심도 빗물터널</span>
              <p className="mt-1 font-mono text-xl font-black text-white">내경 Ø10m</p>
              <span className="text-[10px] text-slate-500">지하 45m 방수로(예시)</span>
            </div>
            <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-3.5">
              <span className="font-mono text-xs text-slate-400">광역 도수관로</span>
              <p className="mt-1 font-mono text-xl font-black text-cyan-400">총 32km 준공</p>
              <span className="text-[10px] text-slate-500">비개착 실드 추진(예시)</span>
            </div>
            <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-3.5">
              <span className="font-mono text-xs text-slate-400">방류수 수질 등급</span>
              <p className="mt-1 font-mono text-xl font-black text-white">BOD 1.0 이하</p>
              <span className="text-[10px] text-slate-500">생태 1급수 달성(예시)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
