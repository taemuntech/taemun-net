import React, { useState, useRef } from 'react';
import { Sparkles, Eye, Scissors, MoveHorizontal, AlertCircle, CheckCircle2 } from 'lucide-react';
import { BEFORE_AFTER_CASES } from '../data/clinicData';
import { ProcedureCategory, BeforeAfterCase } from '../types';

export const BeforeAfterSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProcedureCategory | 'all'>('all');
  const [selectedCaseId, setSelectedCaseId] = useState<string>(BEFORE_AFTER_CASES[0].id);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredCases = activeCategory === 'all'
    ? BEFORE_AFTER_CASES
    : BEFORE_AFTER_CASES.filter((c) => c.category === activeCategory);

  const currentCase: BeforeAfterCase =
    BEFORE_AFTER_CASES.find((c) => c.id === selectedCaseId) || BEFORE_AFTER_CASES[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const touch = e.touches[0];
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  return (
    <section id="before-after" className="py-20 lg:py-28 bg-[#FAF6F2] text-[#1A1817]">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8DDD4] text-[#8C6D4F] text-[12px] font-semibold mb-3">
            <Sparkles className="w-3 h-3 text-[#B08968]" />
            <span>임상 포트폴리오</span>
          </div>
          <h2 className="text-[28px] lg:text-[40px] font-serif font-bold text-[#1A1817] leading-tight mb-4">
            전후를 직접 드래그하여 확인하는<br />
            <span className="text-[#8C6D4F]">정교한 비포 &amp; 애프터 갤러리</span>
          </h2>
          <p className="text-[15px] text-[#68625D] leading-relaxed">
            중앙의 조절 슬라이더를 좌우로 드래그하면 시술 전후의 자연스러운 변화를 실시간으로 비교해보실 수 있습니다.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: '전체 사례' },
            { id: 'eye', label: '눈성형' },
            { id: 'nose', label: '코성형' },
            { id: 'lifting', label: '리프팅 & 동안' },
            { id: 'contour', label: '안면윤곽' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id as ProcedureCategory | 'all');
                const matched = tab.id === 'all'
                  ? BEFORE_AFTER_CASES[0]
                  : BEFORE_AFTER_CASES.find((c) => c.category === tab.id);
                if (matched) setSelectedCaseId(matched.id);
              }}
              className={`px-5 py-2 rounded-full text-[13px] font-medium transition-all ${
                activeCategory === tab.id
                  ? 'bg-[#1A1817] text-white shadow-md'
                  : 'bg-white text-[#68625D] border border-[#E8DDD4] hover:bg-[#F2ECE4]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Interactive Slider Box */}
        <div className="bg-white rounded-3xl p-6 lg:p-10 border border-[#E8DDD4] shadow-sm mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Dual Split Interactive Comparison (7 cols) */}
            <div className="lg:col-span-7">
              <div
                ref={containerRef}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onMouseLeave={() => setIsDragging(false)}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                className="relative w-full h-[360px] lg:h-[460px] rounded-2xl overflow-hidden select-none cursor-ew-resize bg-[#252220] shadow-inner"
              >
                {/* After Image (Background) */}
                <img
                  src={currentCase.afterImage}
                  alt={`${currentCase.title} 수술 후`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-[#1A1817]/80 backdrop-blur-sm text-white text-[12px] font-bold border border-[#C5A880]/40">
                  AFTER (수술 후)
                </div>

                {/* Before Image (Clipped Overlay) */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden"
                  style={{ width: `${sliderPosition}%` }}
                >
                  <img
                    src={currentCase.beforeImage}
                    alt={`${currentCase.title} 수술 전`}
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: containerRef.current?.offsetWidth || '100%' }}
                  />
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#1A1817]/80 backdrop-blur-sm text-[#D3CBC3] text-[12px] font-bold border border-white/20">
                    BEFORE (수술 전)
                  </div>
                </div>

                {/* Divider Line & Handle */}
                <div
                  className="absolute inset-y-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize"
                  style={{ left: `${sliderPosition}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#1A1817] border-2 border-white text-white flex items-center justify-center shadow-xl">
                    <MoveHorizontal className="w-4 h-4 text-[#C5A880]" />
                  </div>
                </div>
              </div>

              {/* Quick Jump Buttons */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSliderPosition(100)}
                    className={`px-3 py-1 rounded-lg text-[12px] transition-colors ${
                      sliderPosition === 100
                        ? 'bg-[#1A1817] text-white font-bold'
                        : 'bg-[#FAF6F2] text-[#68625D] hover:bg-[#E8DDD4]'
                    }`}
                  >
                    수술 전만 보기
                  </button>
                  <button
                    onClick={() => setSliderPosition(50)}
                    className={`px-3 py-1 rounded-lg text-[12px] transition-colors ${
                      sliderPosition === 50
                        ? 'bg-[#1A1817] text-white font-bold'
                        : 'bg-[#FAF6F2] text-[#68625D] hover:bg-[#E8DDD4]'
                    }`}
                  >
                    50:50 듀얼 비교
                  </button>
                  <button
                    onClick={() => setSliderPosition(0)}
                    className={`px-3 py-1 rounded-lg text-[12px] transition-colors ${
                      sliderPosition === 0
                        ? 'bg-[#1A1817] text-white font-bold'
                        : 'bg-[#FAF6F2] text-[#68625D] hover:bg-[#E8DDD4]'
                    }`}
                  >
                    수술 후만 보기
                  </button>
                </div>
                <div className="text-[11px] text-[#8C857D] hidden lg:block">
                  ※ 좌우로 드래그하세요
                </div>
              </div>
            </div>

            {/* Right: Case Detail Info (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="inline-block px-2.5 py-1 rounded text-[11px] font-bold bg-[#FAF6F2] text-[#8C6D4F] border border-[#E8DDD4] mb-2">
                  {currentCase.categoryName} · 온새미로 시그니처
                </div>
                <h3 className="text-[22px] font-serif font-bold text-[#1A1817]">
                  {currentCase.title}
                </h3>
                <div className="text-[13px] text-[#8C6D4F] font-medium mt-1">
                  집도: {currentCase.doctorName}
                </div>
              </div>

              <p className="text-[14px] text-[#68625D] leading-relaxed">
                {currentCase.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {currentCase.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg text-[12px] bg-[#FAF6F2] text-[#554F49] border border-[#E8DDD4]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Period Spec */}
              <div className="p-3.5 rounded-2xl bg-[#FAF6F2] border border-[#E8DDD4] flex items-center justify-between text-[13px]">
                <span className="text-[#68625D] font-medium">경과 관찰 시점</span>
                <span className="font-bold text-[#1A1817]">{currentCase.period}</span>
              </div>

              {/* Medical Notice */}
              <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/60 flex items-start gap-2.5 text-[12px] text-amber-900 leading-relaxed">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold">의료법 관련 표준 안내:</span> {currentCase.caution}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector List */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredCases.map((c) => (
            <div
              key={c.id}
              onClick={() => {
                setSelectedCaseId(c.id);
                setSliderPosition(50);
              }}
              className={`p-3 rounded-2xl bg-white border transition-all cursor-pointer ${
                selectedCaseId === c.id
                  ? 'border-[#8C6D4F] ring-2 ring-[#8C6D4F]/20 shadow-md'
                  : 'border-[#E8DDD4] hover:border-[#8C6D4F]/50'
              }`}
            >
              <div className="relative h-28 rounded-xl overflow-hidden mb-2 bg-[#FAF6F2]">
                <img
                  src={c.afterImage}
                  alt={c.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-[#1A1817]/80 text-white">
                  {c.categoryName}
                </span>
              </div>
              <div className="text-[13px] font-bold text-[#1A1817] truncate">
                {c.title}
              </div>
              <div className="text-[11px] text-[#8C857D] truncate mt-0.5">
                {c.doctorName}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
