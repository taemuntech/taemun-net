'use client';

import React, { useId, useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { MedicalMaterial } from '../types';

interface MaterialModalProps {
  material: MedicalMaterial | null;
  onClose: () => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({ material, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Esc · 배경 스크롤 잠금 · 포커스 가두기 — 샘플 공용 훅(배경 클릭은 아래 onMouseDown 이 맡는다)
  useSampleDialog({ open: material !== null, onClose, dialogRef });

  if (!material) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-4 bg-stone-900/60 backdrop-blur-md animate-fade-in text-[#2d241e]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* 모바일에서는 시트형(아래 붙임) · lg 이상에서는 가운데 카드 */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative w-full max-w-lg max-h-[92vh] lg:max-h-[90vh] overflow-y-auto rounded-t-3xl lg:rounded-3xl bg-white border border-[#ebdcd0] p-6 pb-8 lg:p-8 shadow-2xl outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="자재 상세 닫기"
          className="absolute top-4 right-4 lg:top-6 lg:right-6 w-11 h-11 rounded-full bg-[#faf7f2] hover:bg-[#ebdcd0] text-[#6e5849] flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        <span className="text-[10px] font-mono text-[#a38068] uppercase tracking-widest block mb-1">
          {material.category}
        </span>
        <h3 id={titleId} className="font-serif text-2xl font-bold text-[#2d241e] mb-1 pr-14 [word-break:keep-all]">
          {material.name}
        </h3>
        <p className="text-xs text-[#7a6252] font-mono mb-6">{material.engName}</p>

        <div className="space-y-4 mb-8 text-xs">
          <div className="p-4 bg-[#faf7f2] rounded-2xl border border-[#ebdcd0] space-y-2">
            <div className="flex justify-between gap-4">
              <span className="text-[#9c8473] shrink-0">원산지 / 채석처</span>
              <span className="font-medium text-[#2d241e] text-right [word-break:keep-all]">{material.origin}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-[#9c8473] shrink-0">물성 규격</span>
              <span className="font-medium text-[#2d241e] text-right [word-break:keep-all]">{material.specs}</span>
            </div>
            {material.acousticRating && (
              <div className="flex justify-between gap-4">
                <span className="text-[#9c8473] shrink-0">음향 차음 등급</span>
                <span className="font-medium text-[#2d241e] text-right [word-break:keep-all]">{material.acousticRating}</span>
              </div>
            )}
            {material.certification && (
              <div className="flex justify-between gap-4">
                <span className="text-[#9c8473] shrink-0">친환경 등급 (예시 표기)</span>
                <span className="font-medium text-[#2d241e] text-right [word-break:keep-all]">{material.certification}</span>
              </div>
            )}
          </div>

          <p className="text-[#6e5849] font-light leading-relaxed [word-break:keep-all]">
            {material.description}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-3.5 min-h-11 rounded-full bg-[#524135] hover:bg-[#3d2f26] text-white font-medium text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
        >
          확인 닫기
        </button>
      </div>
    </div>
  );
};
