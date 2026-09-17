'use client';

import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 bg-[#f0e6dc] border-t border-[#ebdcd0] text-[#6e5849]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-8 border-b border-[#ebdcd0]/70">
          <div>
            <span className="font-serif text-xl font-bold text-[#2d241e] block">
              AETHER MEDICAL
            </span>
            <span className="text-xs text-[#7a6252] font-mono">
              Cheongdam Aesthetic Clinic Architecture
            </span>
          </div>

          <p className="text-xs text-[#7a6252] text-center lg:text-right [word-break:keep-all]">
            이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아닙니다.
          </p>
        </div>

        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-[11px] text-[#9c8473]">
          <p>© 2026 AETHER MEDICAL ATELIER. All architectural rights reserved.</p>
          <p>Designed by TAEMUN DEV STUDIO</p>
        </div>
      </div>
    </footer>
  );
};
