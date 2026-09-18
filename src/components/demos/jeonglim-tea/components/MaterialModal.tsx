'use client';

import React, { useId, useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { HanokMaterial } from '../types';

interface MaterialModalProps {
  material: HanokMaterial | null;
  onClose: () => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({ material, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Esc·배경 스크롤 잠금·포커스 순환은 샘플 공용 훅으로 (조건부 호출이 되지 않도록 반환 전에 부른다)
  useSampleDialog({ open: material !== null, onClose, dialogRef });

  if (!material) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in text-[#f4ede2]"
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
        className="relative w-full max-w-lg max-h-[88vh] overflow-y-auto overscroll-contain rounded-3xl bg-[#1c1714] border border-[#382f29] p-6 lg:p-8 shadow-2xl outline-none break-keep"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="자재 상세 닫기"
          className="absolute top-4 right-4 w-11 h-11 rounded-full bg-[#261f1a] hover:bg-[#382f29] text-[#a89888] flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* Color Badge Header */}
        <div className="flex items-center gap-3 mb-6 pr-12">
          <div
            className="w-10 h-10 rounded-xl border border-white/10 shadow-md shrink-0"
            style={{ backgroundColor: material.colorHex }}
          />
          <div>
            <span className="text-[10px] font-mono text-[#d8b896] uppercase tracking-widest block">
              TRADITIONAL MATERIAL SPEC SHEET
            </span>
            <h3 id={titleId} className="text-xl font-bold text-white">
              {material.name}
            </h3>
            <p className="text-xs font-mono text-[#8a7566] uppercase">{material.engName}</p>
          </div>
        </div>

        {/* Spec Table */}
        <div className="space-y-3 mb-6 p-4 rounded-xl bg-[#14100e] border border-[#2e2621]">
          <div>
            <span className="text-[11px] font-mono text-[#8a7566] block mb-0.5">자재 스펙 (Spec)</span>
            <span className="text-xs text-[#d8b896] font-mono font-medium">{material.spec}</span>
          </div>
          <div className="pt-2 border-t border-[#2e2621]">
            <span className="text-[11px] font-mono text-[#8a7566] block mb-0.5">전통 공예 제작 방식</span>
            <span className="text-xs text-[#cbb094] font-mono font-medium">
              {material.craftHeritage}
            </span>
          </div>
          <div className="pt-2 border-t border-[#2e2621]">
            <span className="text-[11px] font-mono text-[#8a7566] block mb-0.5">촉각 및 질감 노트</span>
            <p className="text-xs text-[#b8a796] font-light leading-relaxed">
              {material.sensoryNote}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h4 className="text-xs font-bold text-white mb-2 uppercase">한옥 공간 해설</h4>
          <p className="text-xs lg:text-sm text-[#a89888] font-light leading-relaxed">
            {material.desc}
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full min-h-11 py-3.5 rounded-xl bg-[#6b5545] hover:bg-[#856b57] text-[#f4ede2] font-bold text-xs tracking-wider uppercase transition-all active:scale-95 border border-[#8c715c] cursor-pointer"
        >
          확인 완료
        </button>
      </div>
    </div>
  );
};
