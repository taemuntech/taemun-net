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
            아뜰리에 보클루즈 인테리어 아키텍처 | 대표: 홍길동(예시) | 사업자등록번호: 000-00-00000 (예시) | 통신판매업신고 표기 자리 (예시)
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

      {/* 샘플 고지 — 상단 툴바를 접거나 ?embed=true 로 화면만 열어도 남아야 하는 표시 */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-10">
        <p className="rounded-lg border border-[#c8c7bf]/60 bg-white/70 px-4 py-3 text-xs leading-relaxed text-[#474741]">
          이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며, 화면의 회사명·수치·연락처는 모두 예시입니다.
          상담·문의 폼은 접수되지 않습니다.
        </p>
      </div>
    </footer>
  );
};
