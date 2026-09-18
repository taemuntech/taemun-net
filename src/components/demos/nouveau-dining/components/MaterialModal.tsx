'use client';

import React, { useId, useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { DiningMaterial } from '../types';

interface MaterialModalProps {
  material: DiningMaterial | null;
  onClose: () => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({ material, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Esc 닫기 · 배경 스크롤 잠금 · 포커스 가두기·복귀 — 샘플 공용 훅(SampleNotice 와 같은 것)
  useSampleDialog({ open: material !== null, onClose, dialogRef });

  if (!material) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in"
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
        className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto rounded-t-3xl lg:rounded-3xl bg-stone-900 border border-stone-800 p-6 lg:p-8 shadow-2xl text-stone-100 outline-none break-keep"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="자재 상세 닫기"
          className="absolute top-4 right-4 w-11 h-11 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* Color Badge Header */}
        <div className="flex items-center gap-3 mb-6 pr-12">
          <div
            className="w-10 h-10 rounded-xl border border-stone-700 shadow-md shrink-0"
            style={{ backgroundColor: material.colorHex }}
          />
          <div>
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
              MATERIAL SPEC SHEET
            </span>
            <h3 id={titleId} className="text-xl font-bold text-white">
              {material.name}
            </h3>
            <p className="text-xs font-mono text-stone-400 uppercase">{material.engName}</p>
          </div>
        </div>

        {/* Spec Table */}
        <div className="space-y-3 mb-6 p-4 rounded-xl bg-stone-950 border border-stone-800">
          <div>
            <span className="text-[11px] font-mono text-stone-400 block mb-0.5">자재 규격 (Spec)</span>
            <span className="text-xs text-amber-200 font-mono font-medium">{material.spec}</span>
          </div>
          <div className="pt-2 border-t border-stone-800/80">
            <span className="text-[11px] font-mono text-stone-400 block mb-0.5">원산지 및 품질 기준</span>
            <span className="text-xs text-stone-300 font-mono">{material.origin}</span>
          </div>
          <div className="pt-2 border-t border-stone-800/80">
            <span className="text-[11px] font-mono text-stone-400 block mb-0.5">촉각적 물성 노트</span>
            <p className="text-xs text-stone-300 font-light leading-relaxed">
              {material.tactileNote}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h4 className="text-xs font-bold text-stone-300 mb-2 uppercase">공간 적용 해설</h4>
          <p className="text-xs lg:text-sm text-stone-400 font-light leading-relaxed">
            {material.desc}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full min-h-11 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
        >
          확인 완료
        </button>
      </div>
    </div>
  );
};
