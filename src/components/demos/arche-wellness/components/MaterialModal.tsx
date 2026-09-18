'use client';

// 자재 카드가 여는 스펙 모달. 예전에는 Esc·배경 클릭으로 닫히지 않고 배경도 같이 스크롤됐다.
// Esc·배경 클릭·배경 스크롤 잠금·포커스 가둠은 샘플 공용 훅(use-sample-dialog)을 그대로 쓴다.
// 모바일에서는 아래에서 올라오는 시트, lg 이상에서는 가운데 카드. 본문만 스크롤하고
// 닫기 버튼과 「확인 완료」는 늘 보이는 자리에 남는다.

import React, { useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { WellnessMaterial } from '../types';

interface MaterialModalProps {
  material: WellnessMaterial | null;
  onClose: () => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({ material, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useSampleDialog({ open: material !== null, onClose, dialogRef, initialFocusRef: closeRef });

  if (!material) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-stone-900/60 p-0 backdrop-blur-md animate-fade-in text-[#3d322a] lg:items-center lg:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`material-title-${material.id}`}
        tabIndex={-1}
        className="relative flex max-h-[88svh] w-full max-w-lg flex-col rounded-t-3xl bg-white border border-[#ebdcd0] p-6 lg:p-8 shadow-2xl outline-none lg:max-h-[86svh] lg:rounded-3xl"
      >
        {/* Close Button */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="자재 스펙 닫기"
          className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-[#f5efe6] hover:bg-[#ebdcd0] text-[#5a483c] flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="flex-1 overflow-y-auto">
          {/* Color Badge Header */}
          <div className="flex items-center gap-3 mb-6 pr-12">
            <div
              className="w-10 h-10 rounded-xl border border-black/10 shadow-md shrink-0"
              style={{ backgroundColor: material.colorHex }}
            />
            <div>
              <span className="text-[10px] font-mono text-[#b8613d] uppercase tracking-widest block">
                ECO MATERIAL SPEC SHEET
              </span>
              <h3 id={`material-title-${material.id}`} className="text-xl font-bold text-[#2d221b]">
                {material.name}
              </h3>
              <p className="text-xs font-mono text-[#8a7566] uppercase">{material.engName}</p>
            </div>
          </div>

          {/* Spec Table */}
          <div className="space-y-3 mb-6 p-4 rounded-xl bg-[#faf7f2] border border-[#ebdcd0]">
            <div>
              <span className="text-[11px] font-mono text-[#8a7566] block mb-0.5">
                자재 스펙 (Spec)
              </span>
              <span className="text-xs text-[#2d221b] font-mono font-medium">{material.spec}</span>
            </div>
            <div className="pt-2 border-t border-[#ebdcd0]">
              {/* 실존 인증 제도로 읽히지 않게 「인증」이 아니라 「규격 (예시 표기)」로 적는다. */}
              <span className="text-[11px] font-mono text-[#8a7566] block mb-0.5">
                친환경 자재 규격 (예시 표기)
              </span>
              <span className="text-xs text-emerald-700 font-mono font-medium">
                {material.ecoCert}
              </span>
            </div>
            <div className="pt-2 border-t border-[#ebdcd0]">
              <span className="text-[11px] font-mono text-[#8a7566] block mb-0.5">
                촉각 및 후각 노트
              </span>
              <p className="text-xs text-[#5a483c] font-light leading-relaxed">
                {material.sensoryNote}
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-xs font-bold text-[#2d221b] mb-2 uppercase">자재 특성 해설</h4>
            <p className="text-xs lg:text-sm text-[#5a483c] font-light leading-relaxed">
              {material.desc}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-2 shrink-0 w-full min-h-11 py-3.5 rounded-xl bg-[#d27952] hover:bg-[#b8613d] text-white font-bold text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
        >
          확인 완료
        </button>
      </div>
    </div>
  );
};
