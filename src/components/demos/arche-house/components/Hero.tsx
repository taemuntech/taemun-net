'use client';

import React from 'react';

interface HeroProps {
  onScrollToProjects: () => void;
  onOpenConsultation: () => void;
}

export default function Hero({ onScrollToProjects, onOpenConsultation }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden bg-stone-950 text-white">
      {/* 배경 메인 화보 */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/portfolio/arche-house/desktop.png"
          src="/portfolio/arche-house/arche-house-loop.mp4"
          className="h-full w-full object-cover object-center opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/70 via-transparent to-stone-950/40" />
      </div>

      {/* 히어로 본문 */}
      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-between px-6 pt-16 pb-12 lg:pt-24">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-stone-400/40 bg-stone-900/60 px-3.5 py-1 text-xs font-medium text-stone-200 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span>ARCHITECTURAL DESIGN ATELIER · EST. 2018</span>
          </div>

          <h1 className="font-serif text-3xl font-normal tracking-tight text-white lg:text-5xl lg:leading-tight">
            자연과 빛을 품고,
            <br />
            가족의 시간이 머무는
            <br />
            <span className="font-bold text-amber-200">단 하나의 집을 짓습니다</span>
          </h1>

          <p className="mt-6 text-sm leading-relaxed text-stone-300 lg:text-base">
            대지가 지닌 고유의 결을 읽고, 프라이빗 중정과 정갈한 노출 콘크리트로
            <br className="hidden lg:inline" />
            세월이 흐를수록 깊이를 더하는 하이엔드 단독주택 및 별서를 설계합니다.
          </p>

          {/* CTA 버튼 */}
          <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
            <button
              onClick={onScrollToProjects}
              className="flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3.5 text-xs font-semibold tracking-wider text-stone-950 shadow-lg transition-all hover:bg-stone-200"
            >
              <span>완공 프로젝트 둘러보기</span>
              <span>↓</span>
            </button>

            <button
              onClick={onOpenConsultation}
              className="flex items-center justify-center gap-2 rounded-sm border border-stone-400/60 bg-stone-900/60 px-6 py-3.5 text-xs font-semibold tracking-wider text-white backdrop-blur-md transition-all hover:bg-stone-800"
            >
              <span>1:1 건축 설계 상담 예약</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* 하단 신뢰 지표 바 */}
        <div className="mt-12 grid grid-cols-2 gap-4 border-t border-stone-800/80 pt-6 lg:grid-cols-4">
          <div className="border-l border-stone-700 pl-4">
            <p className="text-xs text-stone-400">설계 면허</p>
            <p className="mt-1 font-serif text-base font-bold text-stone-100 lg:text-lg">
              공인 건축사사무소
            </p>
            <p className="text-[11px] text-stone-500">대한건축사협회 정회원</p>
          </div>
          <div className="border-l border-stone-700 pl-4">
            <p className="text-xs text-stone-400">주거 완공 실적</p>
            <p className="mt-1 font-serif text-base font-bold text-amber-200 lg:text-lg">
              42+ 완공 프로젝트
            </p>
            <p className="text-[11px] text-stone-500">판교·가평·서초·용인 등</p>
          </div>
          <div className="border-l border-stone-700 pl-4">
            <p className="text-xs text-stone-400">설계 감리 방식</p>
            <p className="mt-1 font-serif text-base font-bold text-stone-100 lg:text-lg">
              1:1 대표 건축사 직영
            </p>
            <p className="text-[11px] text-stone-500">대지 분석부터 준공까지</p>
          </div>
          <div className="border-l border-stone-700 pl-4">
            <p className="text-xs text-stone-400">건축 시공 연계</p>
            <p className="mt-1 font-serif text-base font-bold text-stone-100 lg:text-lg">
              직영 정밀 시공팀 연계
            </p>
            <p className="text-[11px] text-stone-500">하자 없는 시공 책임제</p>
          </div>
        </div>
      </div>
    </section>
  );
}
