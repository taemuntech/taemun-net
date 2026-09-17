import React from 'react';

export const TopNoticeBar: React.FC = () => {
  return (
    <aside
      id="top-notice-bar"
      className="bg-[#3e1c06] text-[#FAF7F2] py-2 px-4 border-b border-[#583119] text-center text-xs"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <span className="hidden lg:inline text-[11px] tracking-widest text-[#f6b998]/90 font-medium">
          KOREAN HERITAGE ATELIER &amp; BESPOKE GIFTING
        </span>
        <p className="text-[11px] mx-auto flex items-center gap-2 font-medium">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C84B31] animate-pulse"></span>
          전통 보자기 선물 포장 &amp; 맞춤 캘리그라피 카드 전 상품 무료 증정 이벤트 | 희망일 안심 예약 배송 지원
        </p>
        <div className="hidden lg:flex items-center gap-4 text-[11px] text-[#f6b998]/80 font-medium">
          <a className="hover:underline transition-colors" href="#lookbook">
            보자기 룩북
          </a>
          <span>·</span>
          <a className="hover:underline transition-colors" href="#bespoke-simulator">
            각인 시뮬레이터
          </a>
        </div>
      </div>
    </aside>
  );
};
