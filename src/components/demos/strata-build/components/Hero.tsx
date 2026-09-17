'use client';

import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onScrollToTimelapse: () => void;
  onScrollToHUD: () => void;
  onOpenConsultation: () => void;
}

export default function Hero({ onScrollToTimelapse, onScrollToHUD, onOpenConsultation }: HeroProps) {
  const kpis = [
    { label: '안전 무재해', value: '820일', sub: '현장 품질안전 목표 (예시)' },
    { label: '매트 기초 강도', value: '60 MPa', sub: '초고강도 저발열 콘크리트' },
    { label: 'BIM 연동율', value: '6D 풀패키지', sub: '설계·시공·원가 통합 모델' },
    { label: '수직 연직도 오차', value: 'H/1000', sub: '레이저 및 GPS 오차 관리' },
  ];

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden bg-slate-950 text-white">
      {/* 배경 이미지 & 오버레이 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/portfolio/strata-build/strata-02.jpg"
          alt="스트라타 종합건설 메가 시공 현장"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-40 filter contrast-125"
        />
        {/* 테크니컬 그리드 & 비네팅 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-slate-950/60 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        {/* CAD 십자선 & 스텐실 그리드 패턴 */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:40px_40px] opacity-70" />
      </div>

      {/* 테크니컬 워터마크 모서리 표시 */}
      <div className="pointer-events-none absolute top-6 left-6 z-10 hidden font-mono text-[10px] text-amber-500/40 lg:block">
        + STRATA MEGA-ENGINEERING SPEC-PAD
        <br />+ GRID-REF: SEC-04B-TOWER
      </div>
      <div className="pointer-events-none absolute top-6 right-6 z-10 hidden font-mono text-right text-[10px] text-amber-500/40 lg:block">
        ELEVATION: +315.8M
        <br />STRUCT-CLASS: SPECIAL-1
      </div>

      <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-7xl flex-col justify-between px-4 pt-12 pb-12 lg:pt-16">
        {/* 본문 히어로 카피 */}
        <div className="max-w-3xl">
          {/* 배지 */}
          <div className="mb-4 inline-flex items-center gap-2 rounded border border-amber-500/40 bg-amber-500/10 px-3 py-1 text-xs font-mono text-amber-300 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-ping" />
            <span>종합건설 · 메가 스트럭처 & 정밀 시공 엔지니어링</span>
          </div>

          <h1 className="text-3xl font-black tracking-tight text-white lg:text-6xl">
            <span className="block text-slate-400 font-mono text-lg font-bold tracking-widest lg:text-2xl mb-1">
              STRATA MEGA-BUILD
            </span>
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              대지 깊은 곳에서부터
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              초고층 하늘을 세우다
            </span>
          </h1>

          <p className="mt-5 text-sm leading-relaxed text-slate-300 lg:text-base">
            대심도 터파기 흙막이부터 60MPa 초고강도 대형 매트 콘크리트 연속 타설,
            초고층 메가 기둥 철골 양중과 삼중 로이 커튼월 외장까지.
            <br className="hidden lg:inline" />
            BIM 6D와 실시간 현장 계측 감리 패드로 오차 없는 완벽한 건축 공정을 실현합니다.
          </p>

          {/* CTA 버튼 그룹 */}
          <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
            <button
              onClick={onScrollToTimelapse}
              className="flex items-center justify-center gap-2 rounded border border-amber-500 bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all hover:from-amber-400 hover:to-amber-500"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>4단계 공정 타임랩스 시뮬레이터</span>
            </button>

            <button
              onClick={onScrollToHUD}
              className="flex items-center justify-center gap-2 rounded border border-slate-700 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all hover:border-slate-500 hover:bg-slate-800"
            >
              <svg className="h-4 w-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>러기드 현장 감리 HUD</span>
            </button>

            <button
              onClick={onOpenConsultation}
              className="flex items-center justify-center gap-2 rounded border border-slate-800 bg-slate-950/60 px-5 py-3 text-sm font-medium text-slate-400 hover:text-white"
            >
              <span>시공 도급 상담 신청</span>
              <span className="font-mono text-xs">→</span>
            </button>
          </div>
        </div>

        {/* 하단 공학 지표 그리드 (KPI 바) */}
        <div className="mt-12 grid grid-cols-2 gap-3 border-t border-slate-800/80 pt-6 lg:grid-cols-4">
          {kpis.map((kpi, idx) => (
            <div
              key={idx}
              className="rounded border border-slate-800/60 bg-slate-900/40 p-3.5 backdrop-blur-sm transition-all hover:border-amber-500/30"
            >
              <p className="font-mono text-[11px] text-slate-400">{kpi.label}</p>
              <p className="mt-1 font-mono text-xl font-black text-amber-400 lg:text-2xl">
                {kpi.value}
              </p>
              <p className="mt-0.5 text-[11px] text-slate-400">{kpi.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
