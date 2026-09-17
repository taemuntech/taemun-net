'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 bg-[#f2e6d8] border-t border-[#ebdcd0] text-[#6b523e]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-8 border-b border-[#ebdcd0]/70">
          <div>
            <span className="font-serif text-xl font-bold text-[#2e2319] block">
              RESONANCE · 공명
            </span>
            <span className="text-xs text-[#856b54] font-mono">
              Hi-Fi Audio Architecture & Acoustic Design
            </span>
          </div>

          <p className="text-xs text-[#856b54] text-center lg:text-right [word-break:keep-all]">
            이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아닙니다.
          </p>
        </div>

        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-[11px] text-[#856b54]">
          <p>© 2026 RESONANCE AUDIO STUDIO. All architectural rights reserved.</p>
          <p>Designed by TAEMUN DEV STUDIO</p>
        </div>
      </div>
    </footer>
  );
};
