'use client';

import React, { useState, useRef, useCallback, useLayoutEffect } from 'react';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  Split,
  Eye,
  Box,
  Compass,
  Sparkles,
} from 'lucide-react';
import { BEFORE_AFTER_DATA } from '../data/portfolioData';

interface TransformationSectionProps {
  onConsultProject: (title: string) => void;
  onOpenVRModal: () => void;
}

export const TransformationSection: React.FC<TransformationSectionProps> = ({
  onConsultProject,
  onOpenVRModal,
}) => {
  const [sliderPos, setSliderPos] = useState<number>(52);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [activePin, setActivePin] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'slider' | 'render' | 'built'>('slider');

  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * 「시공 전」 레이어는 폭이 %인 상자 안에 있어서, 안쪽 사진은 **무대 전체 폭**을 그대로 유지해야
   * 뒤에 깔린 「완공 후」 사진과 기준선이 맞는다. 예전에는 렌더 도중 `containerRef.current?.clientWidth`
   * 를 읽었는데, 첫 렌더에는 ref 가 null 이라 임시 값이 쓰이고 창 크기를 바꿔도 갱신되지 않았다
   * (첫 드래그에서 왼쪽 사진이 튀고, 리사이즈 뒤 두 장이 어긋났다). 상태로 승격해 ResizeObserver 로 따라간다.
   */
  const [stageWidth, setStageWidth] = useState<number>(0);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const apply = () => setStageWidth(el.clientWidth);
    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const handleSliderMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let pos = ((clientX - rect.left) / rect.width) * 100;
    if (pos < 2) pos = 2;
    if (pos > 98) pos = 98;
    setSliderPos(pos);
    setViewMode('slider');
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleSliderMove(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleSliderMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 상자 밖에서 버튼을 떼면 onMouseUp 이 안 와서 드래그가 계속 붙어 있었다 — 나갈 때도 놓는다.
  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleSliderMove(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleSliderMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Determine visual width based on view mode
  const currentWidthPercent =
    viewMode === 'render' ? 100 : viewMode === 'built' ? 0 : sliderPos;

  return (
    <section
      // 헤더가 sticky 라 앵커로 건너뛰면 제목이 그 밑으로 숨었다 — 헤더(80px)+샘플 바만큼 여유를 둔다
      className="py-16 lg:py-24 bg-[#121315] max-w-[1440px] mx-auto px-5 lg:px-16 scroll-mt-[calc(var(--sample-bar-h,0px)_+_80px)]"
      id="transformation"
    >
      {/* Section Header */}
      <div
        className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 pb-6 border-b border-white/10"
        id="featured-spotlight"
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs uppercase tracking-[0.18em] text-[#c5a880] font-semibold">
              ARCHIVAL SPOTLIGHT 2025
            </span>
            <span className="text-white/20">•</span>
            <span className="inline-block bg-[#1f2022] border border-[#c5a880]/30 text-[#e0c298] text-[11px] px-2.5 py-0.5 tracking-wider uppercase whitespace-nowrap">
              {BEFORE_AFTER_DATA.badge}
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif text-[#f4efea] break-keep [word-break:keep-all]">
            {BEFORE_AFTER_DATA.title}
          </h2>
          <p className="text-[15px] text-[#d1c5b8] mt-2 max-w-2xl font-light leading-relaxed">
            도심 속 안식처를 지향하는 하이엔드 펜트하우스 전용 포트폴리오 사이트로, 시공 전 3D 렌더링과 완공 후 실물 사진을 인터랙티브 슬라이더로 나란히 비교해 볼 수 있습니다.
          </p>
        </div>
        <div className="mt-6 lg:mt-0 flex items-center gap-3">
          <span className="text-xs text-[#c5a880] tracking-[0.15em] uppercase font-medium">
            클라이언트: {BEFORE_AFTER_DATA.client}
          </span>
        </div>
      </div>

      {/* Interactive Dossier Card */}
      <div className="bg-[#1b1c1e] p-4 lg:p-6 border border-white/10 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between pb-4 gap-3">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2.5 h-2.5 bg-[#c5a880]" />
            <span className="text-xs uppercase tracking-[0.16em] text-[#f4efea] font-medium">
              Interactive Transformation Dossier
            </span>
          </div>

          {/* View Modes & VR Tour Trigger
              lg 미만에서는 글자가 숨어 34×22 짜리 아이콘 버튼만 남아 손가락으로 누르기 어려웠다
              → 데스크톱 모양은 그대로 두고 lg 미만에서만 44px 를 확보한다 */}
          <div className="flex items-center gap-2">
            <div className="inline-flex bg-[#121315] p-1 border border-white/10 text-xs">
              {(
                [
                  { mode: 'slider' as const, Icon: Split, label: 'Slider', title: '인터랙티브 듀얼 슬라이더' },
                  { mode: 'render' as const, Icon: Box, label: '3D Render', title: '시공 전 3D 기획 렌더만 보기' },
                  { mode: 'built' as const, Icon: Eye, label: 'Actual Built', title: '완공 후 실물 사진만 보기' },
                ]
              ).map(({ mode, Icon, label, title }) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  aria-pressed={viewMode === mode}
                  className={`min-h-11 min-w-11 lg:min-h-0 lg:min-w-0 px-2.5 py-1 flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    viewMode === mode
                      ? 'bg-[#c5a880] text-[#121315] font-medium'
                      : 'text-[#998f83] hover:text-white'
                  }`}
                  title={title}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden lg:inline">{label}</span>
                  <span className="sr-only lg:hidden">{title}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onOpenVRModal}
              className="inline-flex min-h-11 lg:min-h-0 items-center gap-1.5 bg-[#121315] hover:bg-[#292a2c] text-[#e0c298] border border-[#c5a880]/40 px-3 py-1.5 text-xs tracking-wider transition cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>와이드 장면 뷰어</span>
            </button>
          </div>
        </div>

        {/* Interactive Comparison Stage */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          // touch-action: pan-y — 가로로 끌면 슬라이더가 움직이고, 세로로 끌면 지면이 그대로 스크롤된다
          // (예전에는 손가락을 대는 순간 지면과 슬라이더가 같이 움직였다)
          style={{ touchAction: 'pan-y' }}
          className="relative w-full h-[380px] lg:h-[620px] bg-[#0d0e10] border border-white/10 overflow-hidden select-none cursor-ew-resize group"
          id="slider-container"
        >
          {/* Base Layer: Actual Built (After) Image */}
          <img
            src={BEFORE_AFTER_DATA.afterImage}
            alt="도심 하이엔드 펜트하우스(예시) 완공 후 실물 사진"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute top-4 right-4 z-10 max-w-[calc(100%-2rem)] bg-[#0d0e10]/85 backdrop-blur-md text-[#f4efea] text-[11px] px-3 py-1.5 uppercase tracking-wider border border-white/10 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
            <span>완공 후 실물 사진 (Actual Built)</span>
          </div>

          {/* Overlay Layer: 3D Render Preview (Before) Image */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden transition-[width] duration-75 ease-out"
            style={{ width: `${currentWidthPercent}%` }}
          >
            <div
              className="relative w-full h-full min-w-[340px] lg:min-w-[1300px] overflow-hidden"
              style={stageWidth ? { width: `${stageWidth}px`, minWidth: `${stageWidth}px` } : undefined}
            >
              <img
                src={BEFORE_AFTER_DATA.beforeImage}
                alt="시공 전 3D 기획 렌더"
                className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
              />
            </div>
            <div className="absolute top-4 left-4 z-10 max-w-[calc(100%-2rem)] bg-[#c5a880]/95 backdrop-blur-sm text-[#121315] font-semibold text-[11px] px-3 py-1.5 uppercase tracking-wider shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>시공 전 3D 기획 렌더 (3D Render Preview)</span>
            </div>
          </div>

          {/* Handle Divider Line */}
          {viewMode === 'slider' && (
            <div
              className="absolute top-0 bottom-0 z-20 w-[2px] bg-[#c5a880] shadow-[0_0_15px_rgba(197,168,128,0.8)] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-[#1b1c1e] text-[#c5a880] border border-[#c5a880] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Split className="w-4 h-4 rotate-90" />
              </div>
            </div>
          )}

          {/* Interactive Spec Pins — 좌표는 사진 기준인데 핀은 무대 상자 기준이라,
              사진이 가로로 잘리는 lg 미만에서는 핀이 엉뚱한 곳을 가리키고 말풍선도 상자 밖으로 잘렸다.
              → lg 이상에서만 핀을 띄우고, lg 미만에서는 같은 내용을 무대 아래 카드로 편다(정보는 양쪽 다 도달 가능). */}
          {BEFORE_AFTER_DATA.pins.map((pin, idx) => (
            <div
              key={pin.id}
              className="absolute z-30 group/pin hidden lg:block"
              style={{ left: `${pin.xPercent}%`, top: `${pin.yPercent}%` }}
            >
              <button
                type="button"
                aria-expanded={activePin === pin.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePin(activePin === pin.id ? null : pin.id);
                }}
                className="w-7 h-7 bg-[#121315]/90 border border-[#c5a880] text-[#c5a880] flex items-center justify-center text-xs font-bold shadow-lg hover:scale-110 transition-transform cursor-pointer"
              >
                {pin.id}
              </button>
              <div
                className={`${
                  activePin === pin.id ? 'block' : 'hidden group-hover/pin:block'
                } absolute ${
                  idx === 0 ? 'bottom-9 left-0' : 'top-9 right-0'
                } w-64 p-3 bg-[#1b1c1e] border border-[#c5a880]/40 shadow-2xl z-40 animate-in fade-in duration-200`}
              >
                <p className="text-[10px] uppercase tracking-wider text-[#c5a880] font-semibold">
                  {pin.category}
                </p>
                <p className="text-sm font-serif text-[#f4efea] mt-0.5">{pin.name}</p>
                <p className="text-xs text-[#d1c5b8] mt-1 leading-relaxed">{pin.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* lg 미만 전용 — 위 핀과 같은 자재 스펙 */}
        <div className="grid grid-cols-1 gap-3 mt-4 lg:hidden">
          {BEFORE_AFTER_DATA.pins.map((pin) => (
            <div key={pin.id} className="bg-[#121315] p-3 border border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 shrink-0 border border-[#c5a880] text-[#c5a880] flex items-center justify-center text-[11px] font-bold">
                  {pin.id}
                </span>
                <p className="text-[10px] uppercase tracking-wider text-[#c5a880] font-semibold">
                  {pin.category}
                </p>
              </div>
              <p className="text-sm font-serif text-[#f4efea] mt-1.5">{pin.name}</p>
              <p className="text-xs text-[#d1c5b8] mt-1 leading-relaxed [word-break:keep-all]">
                {pin.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Deliverable Specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
          {BEFORE_AFTER_DATA.deliverables.map((item) => (
            <div
              key={item.title}
              className="bg-[#121315] p-4 border border-white/10 flex items-start gap-3 hover:border-[#c5a880]/40 transition"
            >
              <CheckCircle2 className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[15px] font-medium text-[#f4efea] break-keep [word-break:keep-all]">{item.title}</h4>
                <p className="text-xs text-[#998f83] mt-1 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack & Action Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-2">
            {['Next.js', 'Tailwind CSS', 'TypeScript', 'Image Compare Slider', 'Wide Scene Viewer'].map(
              (tech) => (
                <span
                  key={tech}
                  className="bg-[#121315] text-[#d1c5b8] border border-white/10 text-[11px] px-3 py-1 font-mono"
                >
                  {tech}
                </span>
              )
            )}
          </div>
          {/* lg 미만에서는 버튼이 눌려 글자가 세 줄로 접혔다 — 폭을 채우고 줄바꿈을 막는다 */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 w-full lg:w-auto">
            <span className="text-xs text-[#998f83] flex items-start lg:items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5 lg:mt-0" />
              {BEFORE_AFTER_DATA.duration}
            </span>
            <button
              type="button"
              onClick={() => onConsultProject('도심 하이엔드 펜트하우스(예시) 105평')}
              className="inline-flex min-h-11 w-full lg:w-auto items-center justify-center gap-2 bg-[#121315] text-[#c5a880] border border-[#c5a880]/60 px-5 py-2 text-xs tracking-wider uppercase hover:bg-[#c5a880] hover:text-[#121315] transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>이 레퍼런스로 제작 문의</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
