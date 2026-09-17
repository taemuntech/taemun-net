'use client';

import React from 'react';
import { SoundMaterial } from '../types';

interface MaterialModalProps {
  material: SoundMaterial | null;
  onClose: () => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({ material, onClose }) => {
  if (!material) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-fade-in text-[#2e2319]">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-[#ebdcd0] p-6 lg:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#faf6f0] hover:bg-[#ebdcd0] text-[#6b523e] flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        <span className="text-[10px] font-mono text-[#8c6544] uppercase tracking-widest block mb-1">
          {material.category}
        </span>
        <h3 className="font-serif text-2xl font-bold text-[#2e2319] mb-1">
          {material.name}
        </h3>
        <p className="text-xs text-[#856b54] font-mono mb-6">{material.engName}</p>

        <div className="space-y-4 mb-8 text-xs">
          <div className="p-4 bg-[#faf6f0] rounded-2xl border border-[#ebdcd0] space-y-2">
            <div className="flex justify-between">
              <span className="text-[#856b54]">원산지 / 가공처</span>
              <span className="font-medium text-[#2e2319]">{material.origin}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#856b54]">물성 규격</span>
              <span className="font-medium text-[#2e2319]">{material.specs}</span>
            </div>
            {material.absorptionRate && (
              <div className="flex justify-between">
                <span className="text-[#856b54]">흡음 계수 (NRC)</span>
                <span className="font-medium text-[#2e2319]">{material.absorptionRate}</span>
              </div>
            )}
            {material.frequencyRange && (
              <div className="flex justify-between">
                <span className="text-[#856b54]">확산 주파수</span>
                <span className="font-medium text-[#2e2319]">{material.frequencyRange}</span>
              </div>
            )}
          </div>

          <p className="text-[#6b523e] font-light leading-relaxed">
            {material.description}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-full bg-[#5c422c] hover:bg-[#473220] text-white font-bold text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
        >
          확인 닫기
        </button>
      </div>
    </div>
  );
};
