'use client';

import React, { useState } from 'react';
import { BrandMark } from './BrandMark';
import { CharterModal } from './CharterModal';
import { CHARTERS } from '../data/charters';
import type { Charter, Villa } from '../types';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";

interface FooterProps {
  onNavigateToSection: (id: string) => void;
  /** 허브 이름을 누르면 컬렉션 필터까지 그 안식처로 맞춘다 — 전에는 넷 다 #collection 으로만 갔다 */
  onSelectHub: (villaType: Villa['type']) => void;
  /** 컨시어지 항목을 누르면 문의 폼의 요청 사항을 그 주제로 채운다 — 전에는 셋 다 #concierge 로만 갔다 */
  onConciergeTopic: (topic: string) => void;
}

// 푸터 링크는 모바일에서 줄 간격 대신 링크 자체를 키워 탭 영역을 확보한다(lg 부터는 원래 간격).
const FOOTER_LINK_CLASS =
  'flex min-h-11 items-center lg:inline lg:min-h-0 hover:text-[#030402] transition-colors';

export const Footer: React.FC<FooterProps> = ({ onNavigateToSection, onSelectHub, onConciergeTopic }) => {
  // 예전엔 차터 링크가 빈 앵커라 눌러도 아무 일이 없었다 — 내용이 있는 모달을 연다.
  const [openCharter, setOpenCharter] = useState<Charter | null>(null);

  const sectionLink = (id: string, label: string) => (
    <li key={`${id}-${label}`}>
      <a
        href={`#${id}`}
        onClick={(e) => {
          e.preventDefault();
          onNavigateToSection(id);
        }}
        className={FOOTER_LINK_CLASS}
      >
        {label}
      </a>
    </li>
  );

  const hubLink = (villaType: Villa['type'], label: string) => (
    <li key={`hub-${villaType}`}>
      <button type="button" onClick={() => onSelectHub(villaType)} className={FOOTER_LINK_CLASS}>
        {label}
      </button>
    </li>
  );

  const conciergeLink = (topic: string, label: string) => (
    <li key={`concierge-${label}`}>
      <button type="button" onClick={() => onConciergeTopic(topic)} className={FOOTER_LINK_CLASS}>
        {label}
      </button>
    </li>
  );

  const charterLink = (charterId: string, label?: string) => {
    const charter = CHARTERS.find((c) => c.id === charterId);
    if (!charter) return null;
    return (
      <li key={charter.id}>
        <button type="button" onClick={() => setOpenCharter(charter)} className={FOOTER_LINK_CLASS}>
          {label ?? charter.label}
        </button>
      </li>
    );
  };

  return (
    <footer className="bg-[#f6f3ed] border-t border-[#c6c7c0]/20 transition-colors duration-300">
      <div className="w-full px-6 lg:px-14 pt-14 lg:pt-16 pb-12 mx-auto max-w-7xl flex flex-col justify-between">
        {/* Top Tier: Monumental Brand Title & Global Hubs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 lg:pb-16 border-b border-[#c6c7c0]/20">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <BrandMark className="w-9 h-9" />
              <span className="font-editorial text-3xl lg:text-4xl tracking-[0.25em] text-[#030402] uppercase font-bold">
                ATLAS
              </span>
            </div>
            <p className="text-xs lg:text-sm text-[#454742] font-light max-w-sm leading-relaxed">
              청정한 대지 위에 조각된 프라이빗 에스테이트 &amp; 생츄어리 컬렉션. 세상과의 거리를 두고 얻는 평온.
            </p>
          </div>

          {/* Sanctuary Hubs Links */}
          <div className="lg:col-span-7 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div>
              <span className="text-[10px] text-[#725b38] tracking-[0.22em] uppercase font-semibold block mb-2 lg:mb-4">
                SANCTUARY HUBS
              </span>
              <ul className="text-xs text-[#454742] lg:space-y-2.5">
                {hubLink('presidential', 'Jeju Gotjawal')}
                {hubLink('cliff', 'Namhae Cliffside')}
                {hubLink('forest', 'Bali Ubud')}
              </ul>
            </div>

            <div>
              <span className="text-[10px] text-[#725b38] tracking-[0.22em] uppercase font-semibold block mb-2 lg:mb-4">
                CONCIERGE
              </span>
              <ul className="text-xs text-[#454742] lg:space-y-2.5">
                {conciergeLink('전담 버틀러 상시 응대를 요청합니다.', 'Butler Concierge Direct')}
                {conciergeLink('전용기 운항 슬롯과 공항 VIP 핸들링 조율을 요청합니다.', 'Aviation Handling')}
                {conciergeLink('리조트 헬리패드 진입 및 헬기 트랜스퍼를 요청합니다.', 'Helipad Access')}
                {sectionLink('wellness', 'Private Dining Cellar')}
              </ul>
            </div>

            <div>
              <span className="text-[10px] text-[#725b38] tracking-[0.22em] uppercase font-semibold block mb-2 lg:mb-4">
                CHARTERS
              </span>
              <ul className="text-xs text-[#454742] lg:space-y-2.5">
                {charterLink('privacy')}
                {charterLink('sustainability')}
                {charterLink('booking')}
                {charterLink('conservation', 'Conservation Fund (예시)')}
              </ul>
            </div>

            <div>
              <span className="text-[10px] text-[#725b38] tracking-[0.22em] uppercase font-semibold block mb-2 lg:mb-4">
                DIRECT ACCESS
              </span>
              <p className="text-xs text-[#454742] mb-1">Seoul VIP Suite:</p>
              <p className="text-xs text-[#030402] font-medium leading-snug">
                Seoul, Republic of Korea (예시 주소)
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Baseline: Exact Copyright and Legal Line */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between text-[10px] text-[#767872] uppercase tracking-[0.2em] gap-2 lg:gap-4">
          <div className="text-center lg:text-left leading-relaxed">
            &copy; 2026 ATLAS RESORTS &amp; PRIVATE VILLAS. ALL RIGHTS RESERVED. ARCHITECTURAL SANCTUARIES &amp;
            PRIVATE ESTATES.
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-x-6">
            {charterLink('privacy')}
            {charterLink('sustainability')}
            {charterLink('booking', 'Disclosures')}
          </ul>
        </div>

        {/* 샘플 고지 — 상단 샘플 바를 접거나 ?embed=true 로 화면만 열어도 남아야 하는 표시 */}
        <p className="mt-6 rounded border border-[#c6c7c0]/40 px-4 py-3 text-xs leading-relaxed text-[#454742] normal-case tracking-normal"><SampleFooterNote /></p>
      </div>

      <CharterModal charter={openCharter} onClose={() => setOpenCharter(null)} />
    </footer>
  );
};
