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
            중앙 슬라이더를 좌우로 드래그하여, 과교정 없이 본연의 매력을 극대화한 온새미로의 정교한 변화를 실시간으로 비교해보세요.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <button
            onClick={() => {
              setActiveCategory('eye');
              setSplitPos(50);
            }}
            className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${
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
            className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${
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
            className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-all cursor-pointer ${
              activeCategory === 'lift'
                ? 'bg-[#1A1817] text-[#fdf9f5] shadow-md'
                : 'bg-[#ebe7e4] text-[#1c1c19] hover:bg-[#e5e2de]'
            }`}
          >
            미니 SMAS 안면거상
          </button>
        </div>

        {/* Interactive Before/After Split Viewer Container */}
        <div className="bg-[#ffffff] rounded-3xl p-6 lg:p-8 shadow-[0_12px_40px_rgba(114,91,56,0.06)] border border-[#d1c5b8]/30 flex flex-col gap-6">
          {/* Viewer Viewport */}
          <div
            ref={containerRef}
            onMouseDown={onMouseDown}
            onTouchStart={onTouchStart}
            className="relative w-full h-[380px] lg:h-[480px] lg:h-[560px] rounded-2xl overflow-hidden select-none cursor-ew-resize bg-[#ebe7e4] border border-[#d1c5b8]/40"
          >
            {/* After Image Layer (Background) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={currentCase.afterImg}
                alt={`${currentCase.title} 수술 후`}
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[#fdf9f5] text-[12px] font-medium shadow-md">
                온새미로 수술 후 (After)
              </div>
            </div>

            {/* Before Image Layer (Clipped via splitPos %) */}
            <div
              className="absolute inset-0 h-full overflow-hidden"
              style={{ width: `${splitPos}%` }}
            >
              <div
                className="h-full relative"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100vw'
                }}
              >
                <img
                  src={currentCase.beforeImg}
                  alt={`${currentCase.title} 수술 전`}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[#fdf9f5] text-[12px] font-medium shadow-md">
                수술 전 (Before)
              </div>
            </div>

            {/* Divider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-[#c5a880] shadow-[0_0_12px_rgba(0,0,0,0.4)] pointer-events-none"
              style={{ left: `${splitPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -left-4 w-9 h-9 rounded-full bg-[#fdf9f5] shadow-xl flex items-center justify-center text-[#725b38] border border-[#c5a880]">
                <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
              </div>
            </div>
          </div>

          {/* Controls & Case Meta Info */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2 border-b border-[#f1ede9] pb-6">
            {/* Quick Snap View Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSplitPos(100)}
                className={`px-3.5 py-1.5 rounded-lg text-[12px] font-medium transition-colors cursor-pointer ${
                  splitPos === 100 ? 'bg-[#725b38] text-white' : 'bg-[#ebe7e4] text-[#1c1c19] hover:bg-[#e5e2de]'
                }`}
              >
                Before 100%
              </button>
              <button
                onClick={() => setSplitPos(50)}
                className={`px-3.5 py-1.5 rounded-lg text-[12px] font-semibold transition-colors cursor-pointer ${
                  splitPos === 50 ? 'bg-[#725b38] text-white' : 'bg-[#ebe7e4] text-[#1c1c19] hover:bg-[#e5e2de]'
                }`}
              >
                50:50 분할뷰
              </button>
              <button
                onClick={() => setSplitPos(0)}
                className={`px-3.5 py-1.5 rounded-lg text-[12px] font-medium transition-colors cursor-pointer ${
                  splitPos === 0 ? 'bg-[#725b38] text-white' : 'bg-[#ebe7e4] text-[#1c1c19] hover:bg-[#e5e2de]'
                }`}
              >
                After 100%
              </button>
            </div>

            {/* Dynamic Case Narrative */}
            <div className="flex flex-col lg:items-end">
              <span className="font-serif text-[18px] font-semibold text-[#1c1c19]">
                {currentCase.title}
              </span>
              <span className="text-[13px] text-[#4d463c]">
                {currentCase.desc}
              </span>
            </div>
          </div>

          {/* Procedure Key Highlights */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-[12px]">
            <div className="flex flex-wrap gap-2">
              {currentCase.keyPoints.map((point, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-[#f7f3ef] text-[#725b38] font-medium flex items-center gap-1 border border-[#c5a880]/30">
                  <span className="material-symbols-outlined text-[14px]">check</span>
                  <span>{point}</span>
                </span>
              ))}
            </div>
            <div className="text-[#4d463c] font-medium">
              예상 회복 기간: <span className="text-[#725b38] font-semibold">{currentCase.recoveryPeriod}</span>
            </div>
          </div>

          {/* Medical Disclaimer Badge */}
          <div className="p-3.5 rounded-xl bg-[#f1ede9]/70 text-center text-[12px] text-[#4d463c] leading-relaxed border border-[#d1c5b8]/30">
            ※ 상기 비포&amp;애프터 사진은 동일 환자의 동의하에 동일한 조명 및 각도에서 촬영된 실제 임상 증례이며, 개인의 체질에 따라 회복 기간 및 출혈·염증 등의 합병증 발생에 차이가 있을 수 있습니다.
          </div>
        </div>
      </div>
    </section>
  );
};
