'use client';

import React, { useId, useRef, useState } from 'react';
import { X, RotateCcw, ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { BEFORE_AFTER_DATA, HERO_IMAGE_URL } from '../data/portfolioData';

interface VRViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SceneKey = 'living' | 'courtyard' | 'shell';

// 장면 설명은 **실제로 그 사진에 찍힌 것**만 적는다.
// 예전 03 번은 골조 상태 렌더를 띄워 놓고 「마스터 베드룸 · 스모크드 오크 마루」라고 적어 두었다.
const SCENES: Record<SceneKey, { nav: string; title: string; img: string; spec: string }> = {
  living: {
    nav: '01. 메인 리빙 파빌리온',
    title: '도심 하이엔드 펜트하우스(예시) — 메인 리빙 파빌리온',
    img: BEFORE_AFTER_DATA.afterImage,
    spec: '105평 메인 거실 • 보이드 천장 • 트래버틴 벽난로 아트월',
  },
  courtyard: {
    nav: '02. 중정 & 파티오 전경',
    title: '중정 & 파티오 테라스 전경',
    img: HERO_IMAGE_URL,
    spec: '남향 채광 정원 • 벨기에산 3중 시스템 창호',
  },
  shell: {
    nav: '03. 착공 전 골조 스캔',
    title: '착공 전 골조 스캔 & 가구 배치 시뮬레이션',
    img: BEFORE_AFTER_DATA.beforeImage,
    spec: '철거 후 골조 실측 • 오더메이드 가구 배치 검토 (예시)',
  },
};

const SCENE_ORDER: SceneKey[] = ['living', 'courtyard', 'shell'];

export const VRViewerModal: React.FC<VRViewerModalProps> = ({ isOpen, onClose }) => {
  const [panX, setPanX] = useState<number>(0);
  const [activeScene, setActiveScene] = useState<SceneKey>('living');
  const isDragging = useRef(false);
  const startX = useRef(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Esc 닫기 · 배경 스크롤 잠금 · Tab 순환 (샘플 공용 훅) — 훅은 조건 없이 호출한다.
  useSampleDialog({ open: isOpen, onClose, dialogRef });

  if (!isOpen) return null;

  const scene = SCENES[activeScene];

  const beginDrag = (clientX: number) => {
    isDragging.current = true;
    startX.current = clientX;
  };

  const moveDrag = (clientX: number) => {
    if (!isDragging.current) return;
    const delta = clientX - startX.current;
    startX.current = clientX;
    setPanX((prev) => prev + delta * 0.4);
  };

  const endDrag = () => {
    isDragging.current = false;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="bg-[#1b1c1e] border border-[#c5a880]/50 max-w-4xl w-full my-8 p-6 lg:p-8 shadow-2xl relative flex flex-col outline-none animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-start gap-2.5 min-w-0">
            <Compass className="w-5 h-5 text-[#c5a880] shrink-0 mt-1" />
            <div className="min-w-0">
              <span className="text-xs uppercase tracking-[0.18em] text-[#c5a880] font-semibold block">
                Virtual Spatial Simulation
              </span>
              <h3
                id={titleId}
                className="text-lg font-serif text-[#f4efea] break-keep [word-break:keep-all]"
              >
                {scene.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="와이드 장면 뷰어 닫기"
            className="flex h-11 w-11 shrink-0 items-center justify-center text-[#998f83] hover:text-white transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 와이드 장면 뷰어 — 한 장의 사진을 좌우로 끌어 보는 장치다. 파노라마 투영도 세로 축도 없으니
            「360」이라고 부르지 않는다(기능 과장). 손가락으로도 끌 수 있고, 세로 스크롤은 지면에 넘겨
            주려고 touch-action 은 pan-y 로 둔다. */}
        <div
          onMouseDown={(e) => beginDrag(e.clientX)}
          onMouseMove={(e) => moveDrag(e.clientX)}
          onMouseUp={endDrag}
          onMouseLeave={endDrag}
          onTouchStart={(e) => beginDrag(e.touches[0].clientX)}
          onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
          onTouchEnd={endDrag}
          style={{ touchAction: 'pan-y' }}
          className="relative w-full h-[320px] lg:h-[420px] bg-[#0d0e10] border border-white/10 overflow-hidden mt-4 cursor-grab active:cursor-grabbing select-none"
        >
          <div
            className="w-[180%] h-full flex transition-transform duration-75 ease-out"
            style={{
              transform: `translateX(${((panX % 400) - 200) * 0.5}px) scale(1.15)`,
            }}
          >
            <img
              src={scene.img}
              alt={`${scene.title} 와이드 장면`}
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>

          {/* HUD Overlay */}
          <div className="absolute top-3 left-3 right-3 lg:right-auto bg-[#0d0e10]/80 backdrop-blur-md border border-white/15 px-3 py-1.5 text-[11px] text-[#e0c298] flex items-center gap-2">
            <span className="w-2 h-2 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
            <span className="[word-break:keep-all]">
              Interactive Wide Panning (좌우로 끌어 장면 둘러보기)
            </span>
          </div>

          {/* Directional Controls */}
          <div className="absolute inset-y-0 left-2 flex items-center">
            <button
              type="button"
              aria-label="왼쪽으로 회전"
              onClick={() => setPanX((prev) => prev + 60)}
              className="flex h-11 w-11 items-center justify-center bg-[#121315]/80 hover:bg-[#c5a880] text-white hover:text-[#121315] transition cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-2 flex items-center">
            <button
              type="button"
              aria-label="오른쪽으로 회전"
              onClick={() => setPanX((prev) => prev - 60)}
              className="flex h-11 w-11 items-center justify-center bg-[#121315]/80 hover:bg-[#c5a880] text-white hover:text-[#121315] transition cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="absolute bottom-3 right-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPanX(0)}
              className="min-h-11 px-2.5 bg-[#121315]/80 hover:bg-[#121315] text-[#c5a880] text-xs flex items-center gap-1 border border-white/15 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>각도 초기화</span>
            </button>
          </div>
        </div>

        {/* Scene Selection Switcher */}
        <div className="flex flex-col lg:flex-row lg:flex-wrap lg:items-center justify-between gap-3 mt-4 pt-4 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {SCENE_ORDER.map((key) => (
              <button
                key={key}
                type="button"
                aria-pressed={activeScene === key}
                onClick={() => {
                  setActiveScene(key);
                  setPanX(0);
                }}
                className={`text-xs min-h-11 px-3 py-1.5 transition cursor-pointer ${
                  activeScene === key
                    ? 'bg-[#c5a880] text-[#121315] font-semibold'
                    : 'bg-[#121315] text-[#d1c5b8] border border-white/10 hover:border-white/30'
                }`}
              >
                {SCENES[key].nav}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#998f83] [word-break:keep-all]">{scene.spec}</span>
        </div>
      </div>
    </div>
  );
};
