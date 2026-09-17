'use client';

import React from 'react';
import { KidsMaterial } from '../types';

interface MaterialModalProps {
  material: KidsMaterial | null;
  onClose: () => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({ material, onClose }) => {
  if (!material) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-fade-in text-[#3b2e1e]">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-[#ebdcd0] p-6 lg:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#fcf9f2] hover:bg-[#ebdcd0] text-[#6e5840] flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        <span className="text-[10px] font-mono text-[#c98330] uppercase tracking-widest block mb-1">
          {material.category}
        </span>
        <h3 className="font-serif text-2xl font-bold text-[#3b2e1e] mb-1">
          {material.name}
        </h3>
        <p className="text-xs text-[#8c7456] font-mono mb-6">{material.engName}</p>

        <div className="space-y-4 mb-8 text-xs">
          <div className="p-4 bg-[#fcf9f2] rounded-2xl border border-[#ebdcd0] space-y-2">
            <div className="flex justify-between">
              <span className="text-[#8c7456]">원산지 / 벌채처</span>
              <span className="font-medium text-[#3b2e1e]">{material.origin}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#8c7456]">규격 및 성분</span>
              <span className="font-medium text-[#3b2e1e]">{material.specs}</span>
            </div>
            {material.safetyCert && (
              <div className="flex justify-between">
                <span className="text-[#8c7456]">친환경 안전 인증 (예시 표기)</span>
                <span className="font-medium text-[#2e5b3b]">{material.safetyCert}</span>
              </div>
            )}
          </div>

          <p className="text-[#6e5840] font-light leading-relaxed">
            {material.description}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-full bg-[#e39c44] hover:bg-[#c98330] text-white font-bold text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
        >
          확인 닫기
        </button>
      </div>
    </div>
  );
};
