'use client';

import React, { useState, useRef, useCallback } from 'react';
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
      className="py-16 lg:py-24 bg-[#121315] max-w-[1440px] mx-auto px-5 lg:px-16"
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
            <span className="inline-block bg-[#1f2022] border border-[#c5a880]/30 text-[#e0c298] text-[11px] px-2.5 py-0.5 tracking-wider uppercase">
              {BEFORE_AFTER_DATA.badge}
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif text-[#f4efea] break-keep [word-break:keep-all]">
            {BEFORE_AFTER_DATA.title}
          </h2>
          <p className="text-[15px] text-[#d1c5b8] mt-2 max-w-2xl font-light leading-relaxed">
            도심 속 안식처를 지향하는 최고급 펜트하우스 전용 포트폴리오 사이트로, 시공 전 3D 렌더링과 완공 후 8K 실물 사진을 인터랙티브 슬라이더로 정밀 비교 감상할 수 있습니다.
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

          {/* View Modes & VR Tour Trigger */}
          <div className="flex items-center gap-2">
            <div className="inline-flex bg-[#121315] p-1 border border-white/10 text-xs">
              <button
                onClick={() => setViewMode('slider')}
                className={`px-2.5 py-1 flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'slider'
                    ? 'bg-[#c5a880] text-[#121315] font-medium'
                    : 'text-[#998f83] hover:text-white'
                }`}
                title="인터랙티브 듀얼 슬라이더"
              >
                <Split className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Slider</span>
              </button>
              <button
                onClick={() => setViewMode('render')}
                className={`px-2.5 py-1 flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'render'
                    ? 'bg-[#c5a880] text-[#121315] font-medium'
                    : 'text-[#998f83] hover:text-white'
                }`}
                title="시공 전 3D 기획 렌더만 보기"
              >
                <Box className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">3D Render</span>
              </button>
              <button
                onClick={() => setViewMode('built')}
                className={`px-2.5 py-1 flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'built'
                    ? 'bg-[#c5a880] text-[#121315] font-medium'
                    : 'text-[#998f83] hover:text-white'
                }`}
                title="완공 후 8K 실물 사진만 보기"
              >
                <Eye className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">Actual Built</span>
              </button>
            </div>

            <button
              onClick={onOpenVRModal}
              className="inline-flex items-center gap-1.5 bg-[#121315] hover:bg-[#292a2c] text-[#e0c298] border border-[#c5a880]/40 px-3 py-1.5 text-xs tracking-wider transition cursor-pointer"
            >
              <Compass className="w-3.5 h-3.5 text-[#c5a880]" />
              <span>360 VR Tour</span>
            </button>
          </div>
        </div>

        {/* Interactive Comparison Stage */}
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-[380px] lg:h-[620px] bg-[#0d0e10] border border-white/10 overflow-hidden select-none cursor-ew-resize group"
          id="slider-container"
        >
          {/* Base Layer: Actual Built (After) Image */}
          <img
            src={BEFORE_AFTER_DATA.afterImage}
            alt="한남 더 힐 펜트하우스 완공 후 실물 사진"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          <div className="absolute top-4 right-4 z-10 bg-[#0d0e10]/85 backdrop-blur-md text-[#f4efea] text-[11px] px-3 py-1.5 uppercase tracking-wider border border-white/10 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>완공 후 8K 실물 사진 (Actual Built)</span>
          </div>

          {/* Overlay Layer: 3D Render Preview (Before) Image */}
          <div
            className="absolute inset-y-0 left-0 overflow-hidden transition-[width] duration-75 ease-out"
            style={{ width: `${currentWidthPercent}%` }}
          >
            <div className="relative w-full h-full min-w-[340px] lg:min-w-[1300px]">
              <img
                src={BEFORE_AFTER_DATA.beforeImage}
                alt="시공 전 3D 기획 렌더"
                className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
                style={{ width: containerRef.current?.clientWidth || '100%' }}
              />
            </div>
            <div className="absolute top-4 left-4 z-10 bg-[#c5a880]/95 backdrop-blur-sm text-[#121315] font-semibold text-[11px] px-3 py-1.5 uppercase tracking-wider shadow-md flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
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

          {/* Interactive Spec Pin 01 */}
          <div
            className="absolute z-30 group/pin"
            style={{
              left: `${BEFORE_AFTER_DATA.pins[0].xPercent}%`,
              top: `${BEFORE_AFTER_DATA.pins[0].yPercent}%`,
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActivePin(activePin === '01' ? null : '01');
              }}
              className="w-7 h-7 bg-[#121315]/90 border border-[#c5a880] text-[#c5a880] flex items-center justify-center text-xs font-bold shadow-lg hover:scale-110 transition-transform cursor-pointer"
            >
              01
            </button>
            <div
              className={`${
                activePin === '01' ? 'block' : 'hidden group-hover/pin:block'
              } absolute bottom-9 left-0 w-64 p-3 bg-[#1b1c1e] border border-[#c5a880]/40 shadow-2xl z-40 animate-in fade-in duration-200`}
            >
              <p className="text-[10px] uppercase tracking-wider text-[#c5a880] font-semibold">
                {BEFORE_AFTER_DATA.pins[0].category}
              </p>
              <p className="text-sm font-serif text-[#f4efea] mt-0.5">
                {BEFORE_AFTER_DATA.pins[0].name}
              </p>
              <p className="text-xs text-[#d1c5b8] mt-1 leading-relaxed">
                {BEFORE_AFTER_DATA.pins[0].detail}
              </p>
            </div>
          </div>

          {/* Interactive Spec Pin 02 */}
          <div
            className="absolute z-30 group/pin"
            style={{
              left: `${BEFORE_AFTER_DATA.pins[1].xPercent}%`,
              top: `${BEFORE_AFTER_DATA.pins[1].yPercent}%`,
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActivePin(activePin === '02' ? null : '02');
              }}
              className="w-7 h-7 bg-[#121315]/90 border border-[#c5a880] text-[#c5a880] flex items-center justify-center text-xs font-bold shadow-lg hover:scale-110 transition-transform cursor-pointer"
            >
              02
            </button>
            <div
              className={`${
                activePin === '02' ? 'block' : 'hidden group-hover/pin:block'
              } absolute top-9 right-0 w-64 p-3 bg-[#1b1c1e] border border-[#c5a880]/40 shadow-2xl z-40 animate-in fade-in duration-200`}
            >
              <p className="text-[10px] uppercase tracking-wider text-[#c5a880] font-semibold">
                {BEFORE_AFTER_DATA.pins[1].category}
              </p>
              <p className="text-sm font-serif text-[#f4efea] mt-0.5">
                {BEFORE_AFTER_DATA.pins[1].name}
              </p>
              <p className="text-xs text-[#d1c5b8] mt-1 leading-relaxed">
                {BEFORE_AFTER_DATA.pins[1].detail}
              </p>
            </div>
          </div>
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
            {['Next.js', 'Tailwind CSS', 'TypeScript', 'Image Compare Slider', '360 VR Panoramas'].map(
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
          <div className="flex items-center gap-6">
            <span className="text-xs text-[#998f83] flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#c5a880]" />
              {BEFORE_AFTER_DATA.duration}
            </span>
            <button
              onClick={() => onConsultProject('한남 더 힐 펜트하우스 105평')}
              className="inline-flex items-center gap-2 bg-[#121315] text-[#c5a880] border border-[#c5a880]/60 px-5 py-2 text-xs tracking-wider uppercase hover:bg-[#c5a880] hover:text-[#121315] transition-colors cursor-pointer"
            >
              <span>이 프로젝트처럼 의뢰하기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
