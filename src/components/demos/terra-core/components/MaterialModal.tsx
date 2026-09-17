import React from 'react';
import Image from 'next/image';
import { X, Hammer, ShieldCheck, Check } from 'lucide-react';
import { GeotechMaterial } from '../types';

interface MaterialModalProps {
  material: GeotechMaterial | null;
  onClose: () => void;
}

export const MaterialModal: React.FC<MaterialModalProps> = ({ material, onClose }) => {
  if (!material) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden shadow-2xl font-mono text-white">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 hover:bg-black text-[#8b949e] hover:text-white transition-colors cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative h-64 w-full">
          <Image
            src={material.image}
            alt={material.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-transparent to-black/40" />
          <div className="absolute bottom-4 left-6">
            <span className="text-[10px] text-[#ff6b2b] uppercase tracking-widest block font-bold">
              {material.category}
            </span>
            <h3 className="text-xl font-black text-white mt-0.5">
              {material.name}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          <p className="text-xs font-sans text-[#c9d1d9] leading-relaxed">
            {material.description}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-3 border-t border-[#30363d] text-xs">
            <div className="p-3 rounded bg-[#0d1117] border border-[#30363d]">
              <span className="text-[10px] text-[#8b949e] block">ENGINEERING SPECIFICATION</span>
              <span className="font-bold text-white mt-0.5 block">{material.spec}</span>
            </div>
            <div className="p-3 rounded bg-[#0d1117] border border-[#30363d]">
              <span className="text-[10px] text-[#8b949e] block">PRESSURE &amp; PERFORMANCE</span>
              <span className="font-bold text-emerald-400 mt-0.5 block">{material.strength}</span>
            </div>
          </div>

          <div className="p-3 rounded bg-[#ff6b2b]/10 border border-[#ff6b2b]/30 flex items-center gap-2 text-xs text-[#ff6b2b]">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>핵심 특성: {material.feature}</span>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={onClose}
              className="w-full py-3 rounded bg-[#21262d] hover:bg-[#30363d] text-white font-bold text-xs tracking-wider transition-colors cursor-pointer"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
