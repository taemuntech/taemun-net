'use client';
import React, { useId, useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { MaterialItem } from '../types';

interface MaterialModalProps {
  material: MaterialItem | null;
  onClose: () => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({ material, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  // Esc·배경 스크롤 잠금·포커스 순환 — 샘플 공용 훅. 훅이라 early return 앞에서 부른다
  useSampleDialog({ open: material !== null, onClose, dialogRef });

  if (!material) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
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
        className="bg-[#17181c] border border-white/10 rounded-t-xl lg:rounded-sm max-w-lg w-full max-h-[88vh] overflow-y-auto overscroll-contain p-6 lg:p-8 text-white space-y-6 shadow-2xl relative outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 flex h-11 w-11 items-center justify-center rounded text-stone-400 hover:text-white text-lg"
          aria-label="닫기"
        >
          ✕
        </button>

        {/* Color Preview Block */}
        <div
          className="w-full h-32 rounded-sm relative overflow-hidden border border-white/10 flex items-end p-4"
          style={{ backgroundColor: material.colorHex }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="relative z-10">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/60 text-white border border-white/10">
              {material.category}
            </span>
            <h3 id={titleId} className="font-serif text-xl font-bold text-white mt-1">
              {material.name}
            </h3>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-mono text-stone-400">
            원산지 / 조달: <span className="text-stone-200 font-semibold">{material.origin}</span>
          </p>
          <p className="text-sm text-stone-300 leading-relaxed font-light">
            {material.textureDesc}
          </p>
        </div>

        {/* Technical Specs List */}
        <div className="space-y-2 border-y border-white/10 py-4 text-xs">
          <div className="flex justify-between gap-3 font-mono">
            <span className="text-stone-400 shrink-0">내구성 및 표면 강도</span>
            <span className="text-stone-200 text-right [word-break:keep-all]">{material.durability}</span>
          </div>
          <div className="flex justify-between gap-3 font-mono">
            <span className="text-stone-400 shrink-0">권장 조명 색온도 페어링</span>
            <span className="text-amber-300 text-right [word-break:keep-all]">{material.lightingPairing}</span>
          </div>
        </div>

        {/* Detailed Points */}
        <div>
          <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block mb-2">
            시공 및 감리 핵심 규격
          </span>
          <ul className="space-y-1.5 text-xs text-stone-300">
            {material.specDetails.map((detail, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-amber-400 mr-2 font-mono">•</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full min-h-11 py-3 rounded-sm bg-stone-800 hover:bg-stone-700 text-stone-200 font-mono text-xs tracking-wider uppercase transition-colors"
        >
          닫기
        </button>
      </div>
    </div>
  );
};
