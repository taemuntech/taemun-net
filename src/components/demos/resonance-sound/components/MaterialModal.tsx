'use client';

import React, { useId, useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { SoundMaterial } from '../types';

interface MaterialModalProps {
  material: SoundMaterial | null;
  onClose: () => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({ material, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Esc · 배경 스크롤 잠금 · 포커스 가두기 — 샘플 공용 훅 (배경 클릭은 아래 onMouseDown)
  useSampleDialog({ open: material !== null, onClose, dialogRef });

  if (!material) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-fade-in text-[#2e2319]"
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
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto overscroll-contain rounded-3xl bg-white border border-[#ebdcd0] p-6 lg:p-8 shadow-2xl outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-4 right-4 lg:top-6 lg:right-6 w-11 h-11 rounded-full bg-[#faf6f0] hover:bg-[#ebdcd0] text-[#6b523e] flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        <span className="text-[10px] font-mono text-[#8c6544] uppercase tracking-widest block mb-1 pr-14">
          {material.category}
        </span>
        <h3 id={titleId} className="font-serif text-2xl font-bold text-[#2e2319] mb-1 pr-14 [word-break:keep-all]">
          {material.name}
        </h3>
        <p className="text-xs text-[#856b54] font-mono mb-6 pr-14">{material.engName}</p>

        <div className="space-y-4 mb-8 text-xs">
          <div className="p-4 bg-[#faf6f0] rounded-2xl border border-[#ebdcd0] space-y-2">
            <div className="flex justify-between gap-3">
              <span className="text-[#856b54] shrink-0">원산지 / 가공처</span>
              <span className="font-medium text-[#2e2319] text-right [word-break:keep-all]">{material.origin}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-[#856b54] shrink-0">물성 규격</span>
              <span className="font-medium text-[#2e2319] text-right [word-break:keep-all]">{material.specs}</span>
            </div>
            {material.absorptionRate && (
              <div className="flex justify-between gap-3">
                <span className="text-[#856b54] shrink-0">흡음 계수 (NRC)</span>
                <span className="font-medium text-[#2e2319] text-right [word-break:keep-all]">{material.absorptionRate}</span>
              </div>
            )}
            {material.frequencyRange && (
              <div className="flex justify-between gap-3">
                <span className="text-[#856b54] shrink-0">확산 주파수</span>
                <span className="font-medium text-[#2e2319] text-right [word-break:keep-all]">{material.frequencyRange}</span>
              </div>
            )}
          </div>

          <p className="text-[#6b523e] font-light leading-relaxed [word-break:keep-all]">
            {material.description}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full min-h-[44px] py-3.5 rounded-full bg-[#5c422c] hover:bg-[#473220] text-white font-bold text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
        >
          확인 닫기
        </button>
      </div>
    </div>
  );
};
