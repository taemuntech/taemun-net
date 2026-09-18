'use client';

import React, { useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { StayMaterial } from '../types';

interface MaterialModalProps {
  material: StayMaterial | null;
  onClose: () => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({ material, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  // Esc·배경 스크롤 잠금(원래 값 복원)·포커스 가둠·복귀 — 샘플 공용 훅. 훅이라 early return 앞에서 부른다.
  useSampleDialog({ open: material !== null, onClose, dialogRef });

  if (!material) return null;

  return (
    <div
      // 모바일은 시트형으로 아래에 붙이고, 내용이 길면 카드 안에서 스크롤된다(세로 짧은 화면에서 잘리던 것).
      className="fixed inset-0 z-50 flex items-end lg:items-center justify-center p-0 lg:p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      // mousedown 기준이라 모달 안에서 시작한 드래그(글자 선택)가 배경에서 끝나도 안 닫힌다.
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${material.name} 물성 상세`}
        tabIndex={-1}
        className="bg-[#17191f] border border-stone-700 text-stone-100 rounded-t-3xl lg:rounded-3xl max-w-xl w-full max-h-[88vh] lg:max-h-[86vh] overflow-y-auto overscroll-contain p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:p-8 relative shadow-2xl outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-4 right-4 lg:top-6 lg:right-6 w-11 h-11 rounded-full bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4 pr-12">
          <span
            className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
            style={{ backgroundColor: material.colorHex }}
          />
          <span className="text-xs font-mono text-amber-500 uppercase tracking-widest">
            {material.engName}
          </span>
        </div>

        <h3 className="text-2xl lg:text-3xl font-serif text-stone-100 mb-2 pr-12">
          {material.name}
        </h3>
        <p className="text-xs font-mono text-stone-400 mb-6">
          산지 및 규격: {material.origin}
        </p>

        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-800">
            <span className="text-xs font-mono text-stone-400 block mb-1">
              물성 및 텍스처 (Texture)
            </span>
            <p className="text-sm text-stone-200 font-light leading-relaxed">
              {material.textureDesc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-800">
            <span className="text-xs font-mono text-amber-400/90 block mb-1">
              감각 노트 (Sensory Note)
            </span>
            <p className="text-sm text-amber-200/90 font-light leading-relaxed italic">
              {material.sensoryNote}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/70 border border-stone-800">
            <span className="text-xs font-mono text-stone-400 block mb-1">
              장인 공법 (Craftsmanship)
            </span>
            <p className="text-sm text-stone-200 font-light leading-relaxed">
              {material.craftsmanship}
            </p>
          </div>
        </div>

        <div>
          <span className="text-xs font-mono text-stone-400 block mb-2">
            설계 적용 스펙 (Key Specifications)
          </span>
          <div className="flex flex-wrap gap-2">
            {material.specs.map((spec, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1.5 rounded-full bg-stone-800/80 text-stone-300 border border-stone-700/60 font-light"
              >
                ✓ {spec}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
