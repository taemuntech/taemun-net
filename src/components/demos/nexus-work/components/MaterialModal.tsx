'use client';

import React, { useId, useRef } from 'react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { AcousticMaterial } from '../types';

interface MaterialModalProps {
  material: AcousticMaterial | null;
  onClose: () => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({ material, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  // Esc·배경 스크롤 잠금(원래 값 복원)·포커스 가둠·복귀 — 샘플 공용 훅. 훅이라 early return 앞에서 부른다.
  useSampleDialog({ open: material !== null, onClose, dialogRef });

  if (!material) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
      // mousedown 기준이라 모달 안에서 시작한 드래그(글자 선택)가 배경에서 끝나도 안 닫힌다.
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
        className="bg-[#14161f] border border-zinc-700 text-zinc-100 rounded-3xl max-w-xl w-full my-auto p-6 lg:p-8 relative shadow-2xl overflow-hidden outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-4 right-4 w-11 h-11 rounded-full bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4 pr-14">
          <span
            className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
            style={{ backgroundColor: material.colorHex }}
          />
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            {material.engName}
          </span>
        </div>

        <h3 id={titleId} className="text-2xl lg:text-3xl font-bold text-white mb-2 pr-14 [word-break:keep-all]">
          {material.name}
        </h3>
        <p className="text-xs font-mono text-emerald-400 mb-6">
          인증 규격: {material.ecoCert}
        </p>

        <div className="space-y-4 mb-6">
          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
            <span className="text-xs font-mono text-cyan-400 block mb-1">
              음향 흡음 성능 (Acoustic Rating)
            </span>
            <p className="text-sm text-zinc-200 font-bold font-mono">
              {material.nrcGrade}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
            <span className="text-xs font-mono text-zinc-400 block mb-1">
              자재 개요 및 차음 원리
            </span>
            <p className="text-sm text-zinc-200 font-light leading-relaxed">
              {material.desc}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-zinc-900/90 border border-zinc-800">
            <span className="text-xs font-mono text-zinc-400 block mb-1">
              촉각 및 시각 노트 (Sensory Note)
            </span>
            <p className="text-sm text-zinc-300 font-light leading-relaxed italic">
              {material.sensoryNote}
            </p>
          </div>
        </div>

        <div>
          <span className="text-xs font-mono text-zinc-400 block mb-2">
            설계 시공 스펙 (Key Specifications)
          </span>
          <div className="flex flex-wrap gap-2">
            {material.specs.map((spec, idx) => (
              <span
                key={idx}
                className="text-xs px-3 py-1.5 rounded-full bg-zinc-800/80 text-zinc-300 border border-zinc-700/60 font-light"
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
