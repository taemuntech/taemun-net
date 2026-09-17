'use client';

import React from 'react';
import { DiningMaterial } from '../types';

interface MaterialModalProps {
  material: DiningMaterial | null;
  onClose: () => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({ material, onClose }) => {
  if (!material) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-stone-900 border border-stone-800 p-6 lg:p-8 shadow-2xl text-stone-100">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* Color Badge Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl border border-stone-700 shadow-md shrink-0"
            style={{ backgroundColor: material.colorHex }}
          />
          <div>
            <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
              MATERIAL SPEC SHEET
            </span>
            <h3 className="text-xl font-bold text-white">{material.name}</h3>
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
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
        >
          확인 완료
        </button>
      </div>
    </div>
  );
};
