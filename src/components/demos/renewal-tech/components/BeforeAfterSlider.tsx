'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <section id="section-before-after" className="w-full bg-neutral-900 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded bg-cyan-500/10 px-3 py-1 text-xs font-mono font-bold text-cyan-400">
              INTERACTIVE COMPARISON
            </div>
            <h2 className="mt-3 font-mono text-2xl font-black tracking-tight text-white lg:text-4xl">
              실물 비포 &amp; 애프터 비교
            </h2>
            <p className="mt-2 text-sm text-neutral-400">
              슬라이더를 좌우로 드래그하여 30년 된 노후 화강석 빌딩의 놀라운 변신을 직접 확인해 보세요.
            </p>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs text-neutral-400">
            <span className="flex items-center gap-1.5 rounded bg-neutral-800 px-2.5 py-1 text-neutral-300">
              <span className="h-2 w-2 rounded-full bg-rose-500" /> 비포 (리모델링 전)
            </span>
            <span>VS</span>
            <span className="flex items-center gap-1.5 rounded bg-neutral-800 px-2.5 py-1 text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400" /> 애프터 (대수선 완공)
            </span>
          </div>
        </div>

        {/* Interactive Comparison Container */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchMove={handleTouchMove}
          className="relative mt-10 h-[420px] w-full select-none overflow-hidden rounded-2xl border border-neutral-700/80 bg-neutral-950 shadow-2xl lg:h-[600px]"
        >
          {/* After Image (Full Background) */}
          <div className="absolute inset-0">
            <Image
              src="/portfolio/renewal-tech/renewal-02.jpg"
              alt="대수선 완공 후 프라임 테크 타워"
              fill
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
            />
            {/* Tag Right */}
            <div className="absolute top-6 right-6 rounded-lg border border-cyan-500/40 bg-neutral-950/80 px-3 py-1.5 backdrop-blur-md">
              <p className="font-mono text-xs font-bold text-cyan-400">
                AFTER 2025 · 서울 테크 타워
              </p>
              <p className="text-[11px] text-neutral-300">삼중 로이 글래스 커튼월 &amp; 아트리움</p>
            </div>
          </div>

          {/* Before Image (Clipped with Left percentage) */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <div className="relative h-full w-[100vw] max-w-7xl">
              <Image
                src="/portfolio/renewal-tech/renewal-01.jpg"
                alt="리모델링 전 노후 화강석 상가 빌딩"
                fill
                sizes="(max-width: 1024px) 100vw, 1200px"
                className="object-cover"
              />
              {/* Tag Left */}
              <div className="absolute top-6 left-6 rounded-lg border border-rose-500/40 bg-neutral-950/80 px-3 py-1.5 backdrop-blur-md">
                <p className="font-mono text-xs font-bold text-rose-400">
                  BEFORE 1994 · 노후 화강석 빌딩
                </p>
                <p className="text-[11px] text-neutral-300">단열 취약 · 누수 · 높은 공실률</p>
              </div>
            </div>
          </div>

          {/* Drag Handle Divider */}
          <div
            className="absolute top-0 bottom-0 z-20 w-1 bg-cyan-400 cursor-ew-resize shadow-[0_0_12px_rgba(6,182,212,0.8)]"
            style={{ left: `${sliderPosition}%` }}
            onMouseDown={handleMouseDown}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-cyan-400 bg-neutral-950 shadow-xl">
              <svg
                className="h-5 w-5 text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" transform="rotate(90 12 12)" />
              </svg>
            </div>
          </div>
        </div>

        {/* Comparison Details Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-6">
            <span className="font-mono text-xs text-cyan-400">POINT 01</span>
            <h3 className="mt-1 font-mono text-base font-bold text-white">
              신축 대비 공사 기간 14개월 단축
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-neutral-400">
              전면 철거 및 토공사 없이 기존 R.C(철근콘크리트) 골조를 100% 보존·재활용하여 인허가 및 공사 기간을 획기적으로 줄였습니다.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-6">
            <span className="font-mono text-xs text-cyan-400">POINT 02</span>
            <h3 className="mt-1 font-mono text-base font-bold text-white">
              에너지 손실 32% 절감 파사드(예시)
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-neutral-400">
              노후 단판 알루미늄 창호를 고성능 단열 프레임과 삼중 로이 복층 유리로 전면 교체하여 여름철 일사 차단 및 겨울철 단열 성능을 대폭 향상했습니다(예시).
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-950/70 p-6">
            <span className="font-mono text-xs text-cyan-400">POINT 03</span>
            <h3 className="mt-1 font-mono text-base font-bold text-white">
              임대 수익률 및 자산 가치 배가
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-neutral-400">
              어둡고 침침했던 1~2층을 복층 오픈 아트리움 로비로 조성하여 프라임 테크 기업 입주를 유치하고, 자산 감정평가액 2배 이상 상승 효과를 창출했습니다(예시).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
