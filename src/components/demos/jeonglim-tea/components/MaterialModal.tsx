'use client';

import React from 'react';
import { HanokMaterial } from '../types';

interface MaterialModalProps {
  material: HanokMaterial | null;
  onClose: () => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({ material, onClose }) => {
  if (!material) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in text-[#f4ede2]">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#1c1714] border border-[#382f29] p-6 lg:p-8 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#261f1a] hover:bg-[#382f29] text-[#a89888] flex items-center justify-center transition-colors cursor-pointer"
        >
          ✕
        </button>

        {/* Color Badge Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl border border-white/10 shadow-md shrink-0"
            style={{ backgroundColor: material.colorHex }}
          />
          <div>
            <span className="text-[10px] font-mono text-[#d8b896] uppercase tracking-widest block">
              TRADITIONAL MATERIAL SPEC SHEET
            </span>
            <h3 className="text-xl font-bold text-white">{material.name}</h3>
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
            <span className="text-[11px] font-mono text-[#8a7566] block mb-0.5">전통 공예 장인 기준</span>
            <span className="text-xs text-[#cbb094] font-mono font-medium">{material.craftHeritage}</span>
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
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-[#6b5545] hover:bg-[#856b57] text-[#f4ede2] font-bold text-xs tracking-wider uppercase transition-all active:scale-95 border border-[#8c715c] cursor-pointer"
        >
          확인 완료
        </button>
      </div>
    </div>
  );
};
