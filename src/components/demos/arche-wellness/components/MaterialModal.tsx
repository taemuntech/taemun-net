'use client';

import React from 'react';
import { WellnessMaterial } from '../types';

interface MaterialModalProps {
  material: WellnessMaterial | null;
  onClose: () => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({ material, onClose }) => {
  if (!material) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-fade-in text-[#3d322a]">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-[#ebdcd0] p-6 lg:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#f5efe6] hover:bg-[#ebdcd0] text-[#5a483c] flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* Color Badge Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl border border-black/10 shadow-md shrink-0"
            style={{ backgroundColor: material.colorHex }}
          />
          <div>
            <span className="text-[10px] font-mono text-[#b8613d] uppercase tracking-widest block">
              ECO MATERIAL SPEC SHEET
            </span>
            <h3 className="text-xl font-bold text-[#2d221b]">{material.name}</h3>
            <p className="text-xs font-mono text-[#8a7566] uppercase">{material.engName}</p>
          </div>
        </div>

        {/* Spec Table */}
        <div className="space-y-3 mb-6 p-4 rounded-xl bg-[#faf7f2] border border-[#ebdcd0]">
          <div>
            <span className="text-[11px] font-mono text-[#8a7566] block mb-0.5">자재 스펙 (Spec)</span>
            <span className="text-xs text-[#2d221b] font-mono font-medium">{material.spec}</span>
          </div>
          <div className="pt-2 border-t border-[#ebdcd0]">
            <span className="text-[11px] font-mono text-[#8a7566] block mb-0.5">친환경 인증 기준</span>
            <span className="text-xs text-emerald-700 font-mono font-medium">{material.ecoCert}</span>
          </div>
          <div className="pt-2 border-t border-[#ebdcd0]">
            <span className="text-[11px] font-mono text-[#8a7566] block mb-0.5">촉각 및 후각 노트</span>
            <p className="text-xs text-[#5a483c] font-light leading-relaxed">
              {material.sensoryNote}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h4 className="text-xs font-bold text-[#2d221b] mb-2 uppercase">공간 치유 효과 해설</h4>
          <p className="text-xs lg:text-sm text-[#5a483c] font-light leading-relaxed">
            {material.desc}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-[#d27952] hover:bg-[#b8613d] text-white font-bold text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
        >
          확인 완료
        </button>
      </div>
    </div>
  );
};
