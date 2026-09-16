'use client';

import React, { useState, useRef } from 'react';
import { X, RotateCcw, ChevronLeft, ChevronRight, Compass, Maximize2 } from 'lucide-react';
import { BEFORE_AFTER_DATA, HERO_IMAGE_URL } from '../data/portfolioData';

interface VRViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VRViewerModal: React.FC<VRViewerModalProps> = ({ isOpen, onClose }) => {
  const [panX, setPanX] = useState<number>(0);
  const [activeScene, setActiveScene] = useState<'living' | 'courtyard' | 'master'>(
    'living'
  );
  const isDragging = useRef(false);
  const startX = useRef(0);

  if (!isOpen) return null;

  const scenes = {
    living: {
      title: '한남 더 힐 펜트하우스 — 메인 리빙 파빌리온',
      img: BEFORE_AFTER_DATA.afterImage,
      spec: '105평 메인 거실 • 6m 보이드 천장 • 나보나 트래버틴 벽난로',
    },
    courtyard: {
      title: '다이닝 & 중정 파티오 테라스',
      img: HERO_IMAGE_URL,
      spec: '남향 채광 정원 • 벨기에 레이너스 3중 시스템 창호',
    },
    master: {
      title: '마스터 베드룸 & 프라이빗 서재',
      img: BEFORE_AFTER_DATA.beforeImage,
      spec: '스모크드 오크 마루 • 오더메이드 월넛 서가 & 히든 도어',
    },
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    startX.current = e.clientX;
    setPanX((prev) => prev + delta * 0.4);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#1b1c1e] border border-[#c5a880]/50 max-w-4xl w-full p-6 lg:p-8 shadow-2xl relative flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <Compass className="w-5 h-5 text-[#c5a880] animate-spin-slow" />
            <div>
              <span className="text-xs uppercase tracking-[0.18em] text-[#c5a880] font-semibold block">
                Virtual Spatial Simulation
              </span>
              <h3 className="text-lg font-serif text-[#f4efea] break-keep [word-break:keep-all]">
                {scenes[activeScene].title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#998f83] hover:text-white transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 360 Viewport Container */}
        <div
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="relative w-full h-[320px] lg:h-[420px] bg-[#0d0e10] border border-white/10 overflow-hidden mt-4 cursor-grab active:cursor-grabbing select-none"
        >
          <div
            className="w-[180%] h-full flex transition-transform duration-75 ease-out"
            style={{
              transform: `translateX(${((panX % 400) - 200) * 0.5}px) scale(1.15)`,
            }}
          >
            <img
              src={scenes[activeScene].img}
              alt="360 Panorama Scene"
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>

          {/* HUD Overlay */}
          <div className="absolute top-3 left-3 bg-[#0d0e10]/80 backdrop-blur-md border border-white/15 px-3 py-1.5 text-[11px] text-[#e0c298] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Interactive 360° Panning (좌우 드래그로 공간 회전)</span>
          </div>

          {/* Directional Controls */}
          <div className="absolute inset-y-0 left-2 flex items-center">
            <button
              onClick={() => setPanX((prev) => prev + 60)}
              className="p-2 bg-[#121315]/80 hover:bg-[#c5a880] text-white hover:text-[#121315] transition cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-2 flex items-center">
            <button
              onClick={() => setPanX((prev) => prev - 60)}
              className="p-2 bg-[#121315]/80 hover:bg-[#c5a880] text-white hover:text-[#121315] transition cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button
              onClick={() => setPanX(0)}
              className="p-1.5 bg-[#121315]/80 hover:bg-[#121315] text-[#c5a880] text-xs flex items-center gap-1 border border-white/15 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>각도 초기화</span>
            </button>
          </div>
        </div>

        {/* Scene Selection Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-4 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setActiveScene('living');
                setPanX(0);
              }}
              className={`text-xs px-3 py-1.5 transition cursor-pointer ${
                activeScene === 'living'
                  ? 'bg-[#c5a880] text-[#121315] font-semibold'
                  : 'bg-[#121315] text-[#d1c5b8] border border-white/10 hover:border-white/30'
              }`}
            >
              01. 메인 리빙 파빌리온
            </button>
            <button
              onClick={() => {
                setActiveScene('courtyard');
                setPanX(0);
              }}
              className={`text-xs px-3 py-1.5 transition cursor-pointer ${
                activeScene === 'courtyard'
                  ? 'bg-[#c5a880] text-[#121315] font-semibold'
                  : 'bg-[#121315] text-[#d1c5b8] border border-white/10 hover:border-white/30'
              }`}
            >
              02. 중정 파티오 테라스
            </button>
            <button
              onClick={() => {
                setActiveScene('master');
                setPanX(0);
              }}
              className={`text-xs px-3 py-1.5 transition cursor-pointer ${
                activeScene === 'master'
                  ? 'bg-[#c5a880] text-[#121315] font-semibold'
                  : 'bg-[#121315] text-[#d1c5b8] border border-white/10 hover:border-white/30'
              }`}
            >
              03. 마스터 스위트 &amp; 서재
            </button>
          </div>

          <span className="text-xs text-[#998f83]">
            {scenes[activeScene].spec}
          </span>
        </div>
      </div>
    </div>
  );
};
