import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BEFORE_AFTER_CASES } from '../data/clinicData';

export const BeforeAfterGallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'eye' | 'nose' | 'lift'>('eye');
  const [splitPos, setSplitPos] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentCase = BEFORE_AFTER_CASES[activeCategory];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let offsetX = clientX - rect.left;
    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;
    const pct = Math.round((offsetX / rect.width) * 100);
    setSplitPos(pct);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const onWindowMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };
    const onWindowMouseUp = () => {
      setIsDragging(false);
    };
    const onWindowTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        handleMove(e.touches[0].clientX);
      }
    };
    const onWindowTouchEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', onWindowMouseMove);
      window.addEventListener('mouseup', onWindowMouseUp);
      window.addEventListener('touchmove', onWindowTouchMove);
      window.addEventListener('touchend', onWindowTouchEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseup', onWindowMouseUp);
      window.removeEventListener('touchmove', onWindowTouchMove);
      window.removeEventListener('touchend', onWindowTouchEnd);
    };
  }, [isDragging, handleMove]);

  return (
    <section className="w-full py-20 bg-[#f7f3ef] relative" id="before-after-cases">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="flex flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#725b38] font-bold">
              CLINICAL EXCELLENCE
            </span>
            <h2 className="font-serif text-[28px] lg:text-[34px] text-[#1c1c19]">
              비포 &amp; 애프터 듀얼 인터랙티브 갤러리
            </h2>
          </div>
          <p className="text-[14px] leading-relaxed text-[#4d463c] max-w-md">
            중앙 슬라이더를 좌우로 드래그하면 수술 전후를 비교해 볼 수 있습니다. 화면의 사진은 실제 환자가 아닌 예시 이미지입니다.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => {
              setActiveCategory('eye');
              setSplitPos(50);
            }}
            className={`px-4 py-2 min-h-[44px] inline-flex items-center rounded-full text-[13px] font-semibold transition-all cursor-pointer ${
              activeCategory === 'eye'
                ? 'bg-[#1A1817] text-[#fdf9f5] shadow-md'
                : 'bg-[#ebe7e4] text-[#1c1c19] hover:bg-[#e5e2de]'
            }`}
          >
            자연유착 눈성형
          </button>
          <button
            onClick={() => {
              setActiveCategory('nose');
              setSplitPos(50);
            }}
            className={`px-4 py-2 min-h-[44px] inline-flex items-center rounded-full text-[13px] font-semibold transition-all cursor-pointer ${
              activeCategory === 'nose'
                ? 'bg-[#1A1817] text-[#fdf9f5] shadow-md'
                : 'bg-[#ebe7e4] text-[#1c1c19] hover:bg-[#e5e2de]'
            }`}
          >
            자가연골 코성형
          </button>
          <button
            onClick={() => {
              setActiveCategory('lift');
              setSplitPos(50);
            }}
            className={`px-4 py-2 min-h-[44px] inline-flex items-center rounded-full text-[13px] font-semibold transition-all cursor-pointer ${
              activeCategory === 'lift'
                ? 'bg-[#1A1817] text-[#fdf9f5] shadow-md'
                : 'bg-[#ebe7e4] text-[#1c1c19] hover:bg-[#e5e2de]'
            }`}
          >
            미니 SMAS 안면거상
          </button>
        </div>

        {/* Interactive Before/After Split Viewer Container */}
        <div className="bg-[#ffffff] rounded-3xl p-6 lg:p-10 shadow-[0_12px_40px_rgba(114,91,56,0.06)] border border-[#d1c5b8]/30 flex flex-col gap-6 items-center">
          {/* Viewer Viewport with natural 3:4 portrait ratio */}
          <div
            ref={containerRef}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            className="relative w-full max-w-[560px] aspect-[3/4] rounded-2xl overflow-hidden select-none cursor-ew-resize bg-[#f4f1ee] border border-[#d1c5b8]/40 shadow-inner"
          >
            {/* After Image Layer (Full Background) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={currentCase.afterImg}
                alt={`${currentCase.title} 수술 후`}
                className="w-full h-full object-cover object-center pointer-events-none"
                draggable={false}
              />
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[#fdf9f5] text-[12px] font-medium shadow-md">
                수술 후 (After) · 예시 이미지
              </div>
            </div>

            {/* Before Image Layer (Clipped via CSS clip-path for 100% pixel-perfect sync without JS delay) */}
            <div
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{
                clipPath: `inset(0 ${100 - splitPos}% 0 0)`
              }}
            >
              <img
                src={currentCase.beforeImg}
                alt={`${currentCase.title} 수술 전`}
                className="w-full h-full object-cover object-center pointer-events-none"
                draggable={false}
              />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[#fdf9f5] text-[12px] font-medium shadow-md">
                수술 전 (Before) · 예시 이미지
              </div>
            </div>

            {/* Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-[#c5a880] shadow-[0_0_12px_rgba(0,0,0,0.4)] pointer-events-none"
              style={{ left: `${splitPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -left-4.5 w-9 h-9 rounded-full bg-[#fdf9f5] shadow-xl flex items-center justify-center text-[#725b38] border border-[#c5a880]">
                <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
              </div>
            </div>
          </div>

          {/* Controls & Case Meta Info */}
          <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-b border-[#f1ede9] pb-6">
            {/* Quick Snap View Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSplitPos(100)}
                className={`px-3.5 py-1.5 min-h-[44px] inline-flex items-center rounded-lg text-[12px] font-medium transition-colors cursor-pointer ${
                  splitPos === 100 ? 'bg-[#725b38] text-white' : 'bg-[#ebe7e4] text-[#1c1c19] hover:bg-[#e5e2de]'
                }`}
              >
                Before 100%
              </button>
              <button
                onClick={() => setSplitPos(50)}
                className={`px-3.5 py-1.5 min-h-[44px] inline-flex items-center rounded-lg text-[12px] font-semibold transition-colors cursor-pointer ${
                  splitPos === 50 ? 'bg-[#725b38] text-white' : 'bg-[#ebe7e4] text-[#1c1c19] hover:bg-[#e5e2de]'
                }`}
              >
                50:50 분할뷰
              </button>
              <button
                onClick={() => setSplitPos(0)}
                className={`px-3.5 py-1.5 min-h-[44px] inline-flex items-center rounded-lg text-[12px] font-medium transition-colors cursor-pointer ${
                  splitPos === 0 ? 'bg-[#725b38] text-white' : 'bg-[#ebe7e4] text-[#1c1c19] hover:bg-[#e5e2de]'
                }`}
              >
                After 100%
              </button>
            </div>

            {/* Dynamic Case Narrative */}
            <div className="flex flex-col lg:items-end break-keep">
              <span className="font-serif text-[18px] font-semibold text-[#1c1c19]">
                {currentCase.title}
              </span>
              <span className="text-[13px] text-[#4d463c]">
                {currentCase.desc}
              </span>
            </div>
          </div>

          {/* Procedure Key Highlights */}
          <div className="w-full flex flex-wrap items-center justify-between gap-3 text-[12px]">
            <div className="flex flex-wrap gap-2">
              {currentCase.keyPoints.map((point, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-[#f7f3ef] text-[#725b38] font-medium flex items-center gap-1 border border-[#c5a880]/30 break-keep">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                  <span>{point}</span>
                </span>
              ))}
            </div>
            <div className="text-[#4d463c] font-medium break-keep">
              예상 회복 기간: <span className="text-[#725b38] font-semibold">{currentCase.recoveryPeriod}</span>
            </div>
          </div>

          {/* Medical Disclaimer Badge */}
          <div className="w-full p-3.5 rounded-xl bg-[#f1ede9] text-center text-[12px] text-[#4d463c] leading-relaxed border border-[#c5a880]/40 break-keep">
            <strong className="text-[#725b38] font-semibold">※ 예시 이미지 · 개인차가 있으며 부작용이 있을 수 있습니다.</strong>
            <br className="hidden lg:inline" />{' '}
            본 화면은 가상 브랜드 샘플로, 실제 환자의 수술 전후 사진이 아닙니다. 모든 수술은 출혈·감염·염증·신경 손상·비대칭 등의 부작용이 발생할 수 있고 회복 기간과 결과에는 개인차가 있으므로, 집도의와의 대면 상담과 사전 설명이 반드시 필요합니다.
          </div>
        </div>
      </div>
    </section>
  );
};
