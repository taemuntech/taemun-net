'use client';

import React, { useEffect } from 'react';
import { StayMaterial } from '../types';

interface MaterialModalProps {
  material: StayMaterial | null;
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-[#17191f] border border-stone-700 text-stone-100 rounded-3xl max-w-xl w-full p-6 lg:p-8 relative shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition-colors"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4">
          <span
            className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
            style={{ backgroundColor: material.colorHex }}
          />
          <span className="text-xs font-mono text-amber-500 uppercase tracking-widest">
            {material.engName}
          </span>
        </div>

        <h3 className="text-2xl lg:text-3xl font-serif text-stone-100 mb-2">
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
