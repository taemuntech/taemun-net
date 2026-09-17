'use client';

import React, { useState } from 'react';
import { EXAM_ARTWORKS } from '../data/beauxArtsData';
import { ExamArtwork } from '../types';

export function VirtualGallerySection() {
  const [selectedArtwork, setSelectedArtwork] = useState<ExamArtwork>(EXAM_ARTWORKS[0]);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [tiltAngle, setTiltAngle] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20; // -10 to +10 deg
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    setTiltAngle({ x, y });
  };

  const handleMouseLeave = () => {
    setTiltAngle({ x: 0, y: 0 });
  };

  return (
    <section id="gallery-3d-section" className="py-20 lg:py-28 bg-[#12141A] border-b border-[#2A303C] text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#38BDF8] block mb-2">
            3D Virtual Art Exhibition & Loupe Lab
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-white mb-4">
            3D 큐레이션 합격작 & 구도 해체 돋보기
          </h2>
          <p className="text-sm lg:text-base text-[#94A3B8] leading-relaxed">
            명문 미대 합격생들의 실제 재현작을 3D 원근 앵글과 황금분할 그리드로 정밀 분석해 보실 수 있습니다. 작품에 마우스를 올려 3D 틸트 효과를 체험하고 구도 분석선을 켜보십시오.
          </p>
        </div>

        {/* Artwork Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {EXAM_ARTWORKS.map((art) => (
            <button
              key={art.id}
              type="button"
              onClick={() => {
                setSelectedArtwork(art);
                setZoomLevel(1);
              }}
              className={`px-5 py-3 rounded-xl text-xs font-semibold transition-all min-h-[44px] ${
                selectedArtwork.id === art.id
                  ? 'bg-[#0284C7] text-white shadow-lg shadow-[#0284C7]/30 ring-2 ring-[#38BDF8]'
                  : 'bg-[#1E2229] border border-[#2A303C] text-[#94A3B8] hover:text-white'
              }`}
            >
              {art.university} · {art.major}
            </button>
          ))}
        </div>

        {/* Main 3D Canvas Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: 3D Tilt Canvas & Overlay Grid (lg: 7 cols) */}
          <div className="lg:col-span-7 bg-[#1A1D24] border border-[#2A303C] rounded-3xl p-6 lg:p-8 relative">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-4 pb-4 border-b border-[#2A303C]">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#0284C7]/20 border border-[#0284C7]/40 text-[#38BDF8] text-[11px] font-bold">
                  {selectedArtwork.badge}
                </span>
                <span className="text-xs text-[#94A3B8] font-mono">{selectedArtwork.year}</span>
              </div>

              {/* View Control Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowGrid(!showGrid)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[44px] ${
                    showGrid
                      ? 'bg-[#38BDF8] text-[#0F172A]'
                      : 'bg-[#2A303C] text-[#94A3B8] hover:text-white'
                  }`}
                >
                  {showGrid ? '✓ 황금분할선 켜짐' : '황금분할선 끄기'}
                </button>
                <button
                  type="button"
                  onClick={() => setZoomLevel((z) => (z === 1 ? 1.3 : 1))}
                  className="px-3 py-1.5 rounded-lg bg-[#2A303C] text-[#94A3B8] hover:text-white text-xs font-semibold min-h-[44px]"
                >
                  {zoomLevel === 1 ? '🔍 1.3배 확대' : '원래 크기'}
                </button>
              </div>
            </div>

            {/* 3D Perspective Container */}
            <div
              className="relative w-full h-[380px] lg:h-[460px] rounded-2xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] overflow-hidden border border-[#334155] flex items-center justify-center cursor-crosshair shadow-2xl transition-transform duration-200"
              style={{ perspective: '1000px' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Artwork Simulated Surface */}
              <div
                className="relative w-[90%] h-[88%] rounded-xl bg-gradient-to-tr from-[#1E293B] to-[#334155] border-2 border-[#475569] shadow-2xl flex flex-col items-center justify-center p-8 transition-transform duration-200 ease-out"
                style={{
                  transform: `rotateX(${tiltAngle.y}deg) rotateY(${tiltAngle.x}deg) scale(${zoomLevel})`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Center Artwork Mock Graphic */}
                <div className="text-center">
                  <div className="text-6xl mb-4 filter drop-shadow-lg">🎨</div>
                  <h3 className="text-lg lg:text-xl font-serif font-bold text-white mb-2">
                    {selectedArtwork.title}
                  </h3>
                  <p className="text-xs text-[#38BDF8] font-medium max-w-md mx-auto leading-relaxed">
                    {selectedArtwork.examTopic}
                  </p>
                </div>

                {/* Golden Ratio Overlay Grid */}
                {showGrid && (
                  <div className="absolute inset-0 pointer-events-none grid grid-cols-3 grid-rows-3 border border-[#38BDF8]/40">
                    <div className="border-r border-b border-[#38BDF8]/30" />
                    <div className="border-r border-b border-[#38BDF8]/30" />
                    <div className="border-b border-[#38BDF8]/30" />
                    <div className="border-r border-b border-[#38BDF8]/30" />
                    <div className="border-r border-b border-[#38BDF8]/50 bg-[#38BDF8]/5 relative">
                      <span className="absolute top-2 left-2 text-[9px] font-mono text-[#38BDF8]">
                        주제부 초점 (1:1.618)
                      </span>
                    </div>
                    <div className="border-b border-[#38BDF8]/30" />
                    <div className="border-r border-[#38BDF8]/30" />
                    <div className="border-r border-[#38BDF8]/30" />
                    <div />
                  </div>
                )}
              </div>
            </div>

            <p className="text-center text-xs text-[#64748B] mt-3">
              ※ 마우스를 올리시면 3D 틸트 원근 효과가 작동합니다. (스마트폰에서는 터치로 확인 가능)
            </p>
          </div>

          {/* Right: Detailed Exam Rubric Breakdown (lg: 5 cols) */}
          <div className="lg:col-span-5 bg-[#1A1D24] border border-[#2A303C] rounded-3xl p-6 lg:p-8">
            <span className="text-xs font-semibold text-[#38BDF8] uppercase tracking-wider block mb-2">
              Exam Rubric Breakdown
            </span>
            <h3 className="text-xl font-serif font-bold text-white mb-1">
              {selectedArtwork.title}
            </h3>
            <p className="text-xs text-[#94A3B8] mb-6">{selectedArtwork.examTopic}</p>

            <div className="space-y-4 mb-8">
              <div className="p-4 rounded-xl bg-[#12141A] border border-[#2A303C]">
                <span className="text-[11px] text-[#64748B] block mb-1">화면 구도 비율</span>
                <span className="text-xs font-semibold text-[#38BDF8]">
                  {selectedArtwork.compositionRatio}
                </span>
              </div>

              <div>
                <span className="text-xs font-bold text-[#E2E8F0] block mb-2">
                  평가위원 채점 핵심 주안점
                </span>
                <div className="space-y-2">
                  {selectedArtwork.analysisPoints.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#94A3B8]">
                      <span className="text-[#38BDF8] mt-0.5">✦</span>
                      <span className="leading-relaxed">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#0F172A] border border-[#1E293B] text-[11px] text-[#64748B]">
              <p>※ 본 합격 재현작 및 분석 코멘트는 당사 조형 연구소의 가상 출제 분석 모델링 샘플입니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
