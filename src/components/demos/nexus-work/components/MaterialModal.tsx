'use client';

import React, { useEffect } from 'react';
import { AcousticMaterial } from '../types';

interface MaterialModalProps {
  material: AcousticMaterial | null;
  onClose: () => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({ material, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (material) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [material, onClose]);

  if (!material) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#14161f] border border-zinc-700 text-zinc-100 rounded-3xl max-w-xl w-full p-6 lg:p-8 relative shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-zinc-800 text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4">
          <span
            className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
            style={{ backgroundColor: material.colorHex }}
          />
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            {material.engName}
          </span>
        </div>

        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
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
