'use client';

import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onScrollToShowcase: () => void;
  onScrollToCalculator: () => void;
  onOpenConsultation: () => void;
}

export default function Hero({ onScrollToShowcase, onScrollToCalculator, onOpenConsultation }: HeroProps) {
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden bg-neutral-950 text-white">
      {/* 배경 메인 화보 */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/portfolio/lumen-build/desktop.png"
          alt="루멘 빌드 성수동 붉은 벽돌 상업 꼬마빌딩 완공작"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-50 filter contrast-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-neutral-950/60" />
      </div>

      {/* 히어로 본문 */}
      <div className="relative z-10 mx-auto flex min-h-[85vh] max-w-7xl flex-col justify-between px-6 pt-16 pb-12 lg:pt-24">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3.5 py-1 text-xs font-mono text-amber-400 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span>COMMERCIAL ARCHITECTURE &amp; VALUE-ADD BUILD</span>
          </div>

          <h1 className="font-mono text-3xl font-black tracking-tight text-white lg:text-5xl lg:leading-tight">
            잠자는 노후 부지를
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
              골목의 핫플레이스 랜드마크
            </span>
            로
            <br />
            탈바꿈합니다
          </h1>

          <p className="mt-6 text-sm leading-relaxed text-neutral-300 lg:text-base">
            성수·한남·연남·도산의 트렌드를 선도하는 감각적인 파사드 디자인부터
            <br className="hidden lg:inline" />
            용적률 0.1%까지 찾아먹는 정밀 공간 설계와 우량 테넌트 임대 세팅까지.
            <br className="hidden lg:inline" />
            건축주의 임대 수익률과 자산 가치를 극대화하는 꼬마빌딩 신축 파트너입니다.
          </p>

          {/* CTA 버튼 */}
          <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
            <button
              onClick={onScrollToCalculator}
              className="flex items-center justify-center gap-2 rounded bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3.5 text-xs font-bold tracking-wider text-neutral-950 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all hover:from-amber-400 hover:to-amber-500"
            >
              <span>신축 사업성 시뮬레이터 실행</span>
              <span>→</span>
            </button>

            <button
              onClick={onScrollToShowcase}
              className="flex items-center justify-center gap-2 rounded border border-neutral-700 bg-neutral-900/70 px-6 py-3.5 text-xs font-semibold tracking-wider text-neutral-200 backdrop-blur-md transition-all hover:border-neutral-500 hover:bg-neutral-800"
            >
              <span>대표 완공 실적 감상하기</span>
              <span>↓</span>
            </button>

            <button
              onClick={onOpenConsultation}
              className="flex items-center justify-center gap-2 rounded border border-amber-500/40 bg-amber-500/10 px-5 py-3.5 text-xs font-semibold text-amber-300 transition-all hover:bg-amber-500/20"
            >
              <span>무료 사업성 검토 신청</span>
            </button>
          </div>
        </div>

        {/* 하단 신뢰 지표 바 */}
        <div className="mt-12 grid grid-cols-2 gap-4 border-t border-neutral-800/80 pt-6 lg:grid-cols-4">
          <div className="border-l border-neutral-800 pl-4">
            <p className="text-xs text-neutral-400 font-mono">TRACK RECORD</p>
            <p className="mt-1 font-mono text-lg font-bold text-amber-400 lg:text-xl">
              38+ 꼬마빌딩 완공
            </p>
            <p className="text-[11px] text-neutral-500">성수·한남·연남·강남 등</p>
          </div>
          <div className="border-l border-neutral-800 pl-4">
            <p className="text-xs text-neutral-400 font-mono">EFFICIENCY</p>
            <p className="mt-1 font-mono text-lg font-bold text-white lg:text-xl">
              평균 전용률 73%
            </p>
            <p className="text-[11px] text-neutral-500">코어 최소화 면적 극대화</p>
          </div>
          <div className="border-l border-neutral-800 pl-4">
            <p className="text-xs text-neutral-400 font-mono">PRE-LEASING</p>
            <p className="mt-1 font-mono text-lg font-bold text-white lg:text-xl">
              앵커 테넌트 매칭
            </p>
            <p className="text-[11px] text-neutral-500">준공 전 팝업·F&B 유치</p>
          </div>
          <div className="border-l border-neutral-800 pl-4">
            <p className="text-xs text-neutral-400 font-mono">LICENSE</p>
            <p className="mt-1 font-mono text-lg font-bold text-white lg:text-xl">
              건축사 + 종합건설
            </p>
            <p className="text-[11px] text-neutral-500">설계·시공 원스톱 직영</p>
          </div>
        </div>
      </div>
    </section>
  );
}
