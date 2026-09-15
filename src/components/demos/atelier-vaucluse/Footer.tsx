'use client';

import React from 'react';

interface FooterProps {
  onSelectCategory: (cat: 'residential' | 'commercial') => void;
  onOpenMaterialArchive: () => void;
  onOpenJournal: () => void;
  onOpenPress: () => void;
  onOpenConsultation: () => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenMaterialArchive,
  onOpenJournal,
  onOpenPress,
  onOpenConsultation,
  onOpenPrivacy,
}) => {
  return (
    <footer className="bg-[#f4f3f1] text-[#161714] full-width border-t border-[#c8c7bf]/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
          <span className="text-xl font-serif text-[#161714] block mb-2 tracking-wide font-bold">
            ATELIER VAUCLUSE
          </span>
          <p className="text-xs text-[#474741] max-w-md font-sans leading-relaxed">
            아뜰리에 보클루즈 인테리어 아키텍처 | 대표: 권진우, 서유경 | 사업자등록번호: 211-88-94103 | 통신판매업신고: 제2023-서울강남-0412호
          </p>
          <p className="text-[11px] uppercase tracking-wider text-[#474741]/70 mt-3 font-sans">
            &copy; 2025 Atelier Vaucluse Interior Architecture. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 lg:gap-8 text-xs uppercase tracking-wider font-sans">
          <button
            onClick={() => onSelectCategory('residential')}
            className="text-[#474741] hover:text-[#161714] transition-colors duration-200 cursor-pointer"
          >
            Residential Works
          </button>
          <button
            onClick={() => onSelectCategory('commercial')}
            className="text-[#474741] hover:text-[#161714] transition-colors duration-200 cursor-pointer"
          >
            Commercial Spaces
          </button>
          <button
            onClick={onOpenMaterialArchive}
            className="text-[#474741] hover:text-[#161714] transition-colors duration-200 cursor-pointer"
          >
            Material Archive
          </button>
          <button
            onClick={onOpenJournal}
            className="text-[#474741] hover:text-[#161714] transition-colors duration-200 cursor-pointer"
          >
            Studio Journal
          </button>
          <button
            onClick={onOpenPress}
            className="text-[#474741] hover:text-[#161714] transition-colors duration-200 cursor-pointer"
          >
            Press &amp; Inquiries
          </button>
          <button
            onClick={onOpenPrivacy}
            className="text-[#474741] hover:text-[#161714] transition-colors duration-200 cursor-pointer"
          >
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  );
};
