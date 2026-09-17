'use client';

import React from 'react';
import { MedicalMaterial } from '../types';

interface MaterialModalProps {
  material: MedicalMaterial | null;
  onClose: () => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({ material, onClose }) => {
  if (!material) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-md animate-fade-in text-[#2d241e]">
      <div className="relative w-full max-w-lg rounded-3xl bg-white border border-[#ebdcd0] p-6 lg:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#faf7f2] hover:bg-[#ebdcd0] text-[#6e5849] flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        <span className="text-[10px] font-mono text-[#a38068] uppercase tracking-widest block mb-1">
          {material.category}
        </span>
        <h3 className="font-serif text-2xl font-bold text-[#2d241e] mb-1">
          {material.name}
        </h3>
        <p className="text-xs text-[#7a6252] font-mono mb-6">{material.engName}</p>

        <div className="space-y-4 mb-8 text-xs">
          <div className="p-4 bg-[#faf7f2] rounded-2xl border border-[#ebdcd0] space-y-2">
            <div className="flex justify-between">
              <span className="text-[#9c8473]">원산지 / 채석처</span>
              <span className="font-medium text-[#2d241e]">{material.origin}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#9c8473]">물성 규격</span>
              <span className="font-medium text-[#2d241e]">{material.specs}</span>
            </div>
            {material.acousticRating && (
              <div className="flex justify-between">
                <span className="text-[#9c8473]">음향 차음 등급</span>
                <span className="font-medium text-[#2d241e]">{material.acousticRating}</span>
              </div>
            )}
            {material.certification && (
              <div className="flex justify-between">
                <span className="text-[#9c8473]">친환경 인증 (예시 표기)</span>
                <span className="font-medium text-[#2d241e]">{material.certification}</span>
              </div>
            )}
          </div>

          <p className="text-[#6e5849] font-light leading-relaxed">
            {material.description}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-full bg-[#524135] hover:bg-[#3d2f26] text-white font-medium text-xs tracking-wider uppercase transition-all active:scale-95 cursor-pointer"
        >
          확인 닫기
        </button>
      </div>
    </div>
  );
};
