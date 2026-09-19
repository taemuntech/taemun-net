import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ASSET_IMAGES } from '../data/mockData';

export const SplitComparisonViewer: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [showAnnotations, setShowAnnotations] = useState<boolean>(true);
  const [paletteMode] = useState<'ironbow' | 'rainbow' | 'whitehot'>('ironbow');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let pos = ((clientX - rect.left) / rect.width) * 100;
    if (pos < 5) pos = 5;
    if (pos > 95) pos = 95;
    setSliderPos(pos);
  }, []);

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <section id="split-viewer" className="w-full max-w-7xl mx-auto px-4 lg:px-12 py-16 flex flex-col gap-8">
      {/* Header and Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs text-sky-700 font-semibold uppercase">
            PAYLOAD LIVE TELEMETRY COMPARISON
          </span>
          <h2 className="text-xl lg:text-3xl font-extrabold text-zinc-950 tracking-tight [word-break:keep-all]">
            4K 광학 RGB vs 방사측정 열화상·라이다 비교
          </h2>
        </div>
        <div className="flex flex-col items-start lg:items-end gap-2">
          <p className="text-xs lg:text-sm text-zinc-600 max-w-lg lg:text-right [word-break:keep-all]">
            슬라이더를 좌우로 드래그하여 육안으로 식별 불가능한 송전탑 발열 핫스팟 및 교량 콘크리트 미세 균열의 실시간 AI 판독 화면을 비교하십시오.
          </p>
          {/* Quick presets */}
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <span className="font-mono text-[11px] text-zinc-500">분할 비율:</span>
            {[25, 50, 75].map((val) => (
              <button
                key={val}
                onClick={() => setSliderPos(val)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors cursor-pointer ${
                  Math.round(sliderPos) === val
                    ? 'bg-sky-600 text-white font-bold'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                {val}%
              </button>
            ))}
            <button
              onClick={() => setShowAnnotations(!showAnnotations)}
              className="ml-1 lg:ml-2 px-2.5 py-0.5 rounded text-[11px] font-mono bg-zinc-100 text-zinc-700 hover:bg-zinc-200 cursor-pointer flex items-center gap-1 border border-zinc-200"
            >
              <span className="material-symbols-outlined text-[14px]">
                {showAnnotations ? 'visibility' : 'visibility_off'}
              </span>
              <span>AI 주석 {showAnnotations ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dual Comparison Slider Container */}
      <div
        ref={containerRef}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          if (e.touches[0]) handleMove(e.touches[0].clientX);
        }}
        className="relative w-full rounded-2xl overflow-hidden bg-zinc-900 select-none aspect-[16/10] lg:aspect-[21/9] shadow-xl border border-zinc-200 cursor-ew-resize group"
      >
        {/* Layer 1: Left Background (RGB Optical Daylight) */}
        <div className="absolute inset-0 w-full h-full">
          <img
            className="w-full h-full object-cover select-none pointer-events-none"
            alt="4K aerial photography of steel electric transmission tower"
            src={ASSET_IMAGES.rgbTower}
          />

          {/* RGB Overlay Tag (Desktop Only) */}
          <div className="absolute top-6 left-6 p-3 rounded-lg bg-black/75 backdrop-blur-md text-white font-mono text-[11px] hidden lg:flex flex-col gap-1 border border-white/10 shadow-lg pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              <span className="font-bold">RGB OPTICAL (4K ZOOM SENSOR)</span>
            </div>
            <span className="text-white/70">RESOLUTION: 3840 x 2160 @ 60FPS</span>
            <span className="text-white/50 text-[10px]">INSPECTION MODE: VISUAL DEFECT SCAN</span>
          </div>

          {/* Defect Tag on Concrete Joint (Visible in RGB) */}
          {showAnnotations && (
            <div className="absolute top-1/2 left-[5%] lg:left-[25%] -translate-y-1/2 p-1.5 lg:p-2 rounded bg-black/85 backdrop-blur-md border border-white/20 text-white font-mono text-[10px] lg:text-[11px] flex items-center gap-1.5 shadow-xl pointer-events-none z-10">
              <span className="material-symbols-outlined text-xs lg:text-sm text-sky-400">search</span>
              <span>외관 부식 등급: C (예시)</span>
            </div>
          )}
        </div>

        {/* Layer 2: Right Background (Radiometric Thermal + LiDAR Heatmap) */}
        <div
          className="absolute inset-0 h-full overflow-hidden pointer-events-none"
          style={{ width: `${sliderPos}%` }}
        >
          <div
            className="absolute inset-0 h-full"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100vw' }}
          >
            <img
              className={`w-full h-full object-cover filter contrast-125 select-none ${
                paletteMode === 'rainbow' ? 'hue-rotate-60' : paletteMode === 'whitehot' ? 'grayscale' : ''
              }`}
              alt="Radiometric thermal infrared aerial heatmap of power utility infrastructure"
              src={ASSET_IMAGES.thermalTower}
            />

            {/* Thermal Overlay Tag (Desktop Only) */}
            <div className="absolute top-6 left-6 p-3 rounded-lg bg-amber-950/85 backdrop-blur-md text-white font-mono text-[11px] hidden lg:flex flex-col gap-1 border border-amber-500/40 shadow-lg pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
                <span className="font-bold text-amber-300">RADIOMETRIC THERMAL (FLIR 640p)</span>
              </div>
              <span className="text-amber-100/90 font-bold">TEMP RANGE: -20°C ~ 650°C</span>
              <span className="text-amber-200/60 text-[10px]">THERMAL SENSITIVITY &lt; 30mK</span>
            </div>

            {/* Hotspot Anomaly Pin */}
            {showAnnotations && (
              <div className="absolute top-[35%] lg:top-[42%] left-[8%] lg:left-[18%] p-1.5 lg:p-2.5 rounded bg-red-950/90 backdrop-blur-md border border-red-500 text-white font-mono text-[10px] lg:text-[11px] flex flex-col gap-0.5 shadow-2xl animate-pulse pointer-events-none z-10 max-w-[160px] lg:max-w-none">
                <div className="flex items-center gap-1 text-red-300 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
                  <span className="text-[9px] lg:text-[11px]">HOTSPOT DETECTED</span>
                </div>
                <span className="text-xs lg:text-sm text-white font-bold">
                  74.2°C <span className="text-[9px] font-normal text-red-200 hidden lg:inline">(Δ+32°C 주의)</span>
                </span>
                <span className="text-[9px] text-red-200 hidden lg:inline">애자 절연 파괴 임계점 도달 (예시)</span>
              </div>
            )}
          </div>
        </div>

        {/* Live Split Divider Bar with Drag Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-[0_0_12px_rgba(0,0,0,0.6)] z-20 flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-8 h-8 lg:w-9 lg:h-9 -ml-3.5 lg:-ml-4 rounded-full bg-white text-zinc-900 shadow-2xl flex items-center justify-center border-2 border-sky-600 hover:scale-110 active:scale-95 transition-transform pointer-events-auto cursor-ew-resize">
            <span className="material-symbols-outlined text-sm lg:text-base select-none text-sky-600">
              code_blocks
            </span>
          </div>
        </div>

        {/* Telemetry Bottom Bar in Split Container (Desktop) */}
        <div className="hidden lg:flex absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-black/80 backdrop-blur-md text-white items-center justify-between font-mono text-xs z-10 border border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              AI REAL-TIME FUSION
            </span>
            <span className="text-white/60">FPS: 59.8</span>
            <span className="text-white/60">LiDAR DENSITY: 1,840 pts/㎡</span>
          </div>
          <div className="flex items-center gap-2 text-white/80">
            <span className="material-symbols-outlined text-sm">drag_indicator</span>
            <span className="text-[11px]">슬라이더를 좌우로 드래그하여 교차 검증</span>
          </div>
        </div>

        {/* Mobile Minimal Guide Bar (영상 위 하단 슬림 태그) */}
        <div className="lg:hidden absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none px-2 py-1 rounded bg-black/75 backdrop-blur-md text-white font-mono text-[10px] border border-white/10 z-10">
          <span className="text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            AI FUSION
          </span>
          <span className="text-white/80 flex items-center gap-1">
            <span className="material-symbols-outlined text-[12px]">drag_indicator</span>
            좌우 드래그 비교
          </span>
        </div>
      </div>

      {/* Mobile-Only Comparison Info Grid (슬라이더 아래에 작고 깔끔하게 배치) */}
      <div className="grid grid-cols-2 gap-2 lg:hidden w-full font-mono">
        {/* Left: RGB 광학 */}
        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white flex flex-col gap-0.5">
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="flex items-center gap-1 text-sky-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              RGB 광학
            </span>
            <span className="text-zinc-400 text-[9px]">4K ZOOM</span>
          </div>
          <span className="text-xs font-bold text-zinc-100">3840×2160 @ 60FPS</span>
          <span className="text-[10px] text-zinc-400">외관 부식 및 결함 탐지</span>
        </div>

        {/* Right: 열화상 */}
        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white flex flex-col gap-0.5">
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              방사 열화상
            </span>
            <span className="text-red-400 font-bold text-[9px]">74.2℃ 검출</span>
          </div>
          <span className="text-xs font-bold text-zinc-100">-20℃ ~ 650℃ (FLIR)</span>
          <span className="text-[10px] text-amber-300/90">송전탑 핫스팟 이상 진단</span>
        </div>
      </div>
    </section>
  );
};
