'use client';

import React, { useId, useRef } from 'react';
import { KidsMaterial } from '../types';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface MaterialModalProps {
  material: KidsMaterial | null;
  onClose: () => void;
}

// 본문은 고른 자재마다 다른 값을 보여 준다 — 카드에서 누른 mat 이 그대로 내려온다.
// Esc·배경 클릭 닫힘 · 배경 스크롤 잠금 · 포커스 가두기는 샘플 공용 훅(use-sample-dialog)에 맡긴다.
export const MaterialModal: React.FC<MaterialModalProps> = ({ material, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useSampleDialog({ open: material !== null, onClose, dialogRef });

  if (!material) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-4 bg-stone-900/60 backdrop-blur-md animate-fade-in text-[#3b2e1e]"
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
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-t-3xl lg:rounded-3xl bg-white border border-[#ebdcd0] p-6 lg:p-8 shadow-2xl outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="자재 상세 닫기"
          className="absolute top-5 right-5 w-11 h-11 rounded-full bg-[#fcf9f2] hover:bg-[#ebdcd0] text-[#6e5840] flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        <span className="text-[10px] font-mono text-[#c98330] uppercase tracking-widest block mb-1 pr-14">
          {material.category}
        </span>
        <h3 id={titleId} className="font-serif text-2xl font-bold text-[#3b2e1e] mb-1 pr-14 [word-break:keep-all]">
          {material.name}
        </h3>
        <p className="text-xs text-[#8c7456] font-mono mb-6">{material.engName}</p>

        <div className="space-y-4 mb-8 text-xs">
          <div className="p-4 bg-[#fcf9f2] rounded-2xl border border-[#ebdcd0] space-y-2">
            <div className="flex justify-between gap-3">
              <span className="text-[#8c7456] shrink-0">원산지 / 벌채처</span>
              <span className="font-medium text-[#3b2e1e] text-right [word-break:keep-all]">{material.origin}</span>
            </div>
            <div className="flex justify-between gap-3">
              <span className="text-[#8c7456] shrink-0">규격 및 성분</span>
              <span className="font-medium text-[#3b2e1e] text-right [word-break:keep-all]">{material.specs}</span>
            </div>
            {material.safetyCert && (
              <div className="flex justify-between gap-3">
                <span className="text-[#8c7456] shrink-0">친환경 등급 표기</span>
                <span className="font-medium text-[#2e5b3b] text-right [word-break:keep-all]">{material.safetyCert}</span>
              </div>
            )}
          </div>

          <p className="text-[#6e5840] font-light leading-relaxed [word-break:keep-all]">
            {material.description}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full min-h-[44px] py-3.5 rounded-full bg-[#e39c44] hover:bg-[#c98330] text-white font-bold text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
        >
          확인 닫기
        </button>
      </div>
    </div>
  );
};
