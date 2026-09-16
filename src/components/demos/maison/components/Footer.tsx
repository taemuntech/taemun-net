"use client";

import React from 'react';
import { BRAND_INFO } from '../data/antiqueData';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  return (
    <footer
      id="main-footer"
      className="bg-[#14190e] text-[#fff8f5] pt-16 pb-12 border-t border-[#735b24]/40"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 pb-12 border-b border-[#fff8f5]/10">
          {/* Col 1 & 2: Brand & Address (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <img
                alt="Maison d'Antique Seal"
                className="h-10 w-10 object-contain invert brightness-200"
                src={BRAND_INFO.logoUrl}
              />
              <div>
                <span className="font-serif text-[24px] tracking-tight italic block">
                  {BRAND_INFO.name}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#735b24] font-semibold">
                  {BRAND_INFO.tagline}
                </span>
              </div>
            </div>

            <p className="font-serif text-[14px] text-[#e9e1dc]/80 leading-relaxed max-w-md">
              18~19세기 프랑스 및 영국 오리지널 앤틱 가구, 조명, 예술 공예품을
              큐레이션하고 보존 복원하는 프리미엄 아카이브 살롱입니다. 모든
              작품은 검증된 출처 증명서와 보존 등급이 함께 발행됩니다.
            </p>

            <div className="space-y-1 text-xs text-[#e9e1dc]/70 font-serif pt-2">
              <p>
                <strong>한남 살롱 :</strong> {BRAND_INFO.contact.address}
              </p>
              <p>
                <strong>복원 연구소 :</strong> {BRAND_INFO.contact.atelier}
              </p>
              <p>
                <strong>대표 문의 :</strong> {BRAND_INFO.contact.phone} |{' '}
                {BRAND_INFO.contact.email}
              </p>
            </div>
          </div>

          {/* Col 3: Archival Divisions */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#735b24] font-bold">
              Archival Divisions
            </h4>
            <ul className="space-y-2 text-[14px] font-serif text-[#e9e1dc]/80">
              <li>
                <a
                  href="#furniture"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('furniture');
                  }}
                  className="hover:text-[#ffdf9c] transition-colors"
                >
                  루이 15세 &amp; 16세 가구
                </a>
              </li>
              <li>
                <a
                  href="#furniture"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('furniture');
                  }}
                  className="hover:text-[#ffdf9c] transition-colors"
                >
                  빅토리안 &amp; 조지안 서재
                </a>
              </li>
              <li>
                <a
                  href="#lighting"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('lighting');
                  }}
                  className="hover:text-[#ffdf9c] transition-colors"
                >
                  오르몰루 길트 조명 샹들리에
                </a>
              </li>
              <li>
                <a
                  href="#furniture"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('furniture');
                  }}
                  className="hover:text-[#ffdf9c] transition-colors"
                >
                  루이 필립 길트 수은 거울
                </a>
              </li>
              <li>
                <a
                  href="#objects"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('objects');
                  }}
                  className="hover:text-[#ffdf9c] transition-colors"
                >
                  세브르 &amp; 마이센 포슬린
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Heritage Services */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#735b24] font-bold">
              Heritage Services
            </h4>
            <ul className="space-y-2 text-[14px] font-serif text-[#e9e1dc]/80">
              <li>
                <a
                  href="#atelier"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('atelier');
                  }}
                  className="hover:text-[#ffdf9c] transition-colors"
                >
                  전통 셸락 프렌치 폴리싱
                </a>
              </li>
              <li>
                <a
                  href="#curation"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('curation');
                  }}
                  className="hover:text-[#ffdf9c] transition-colors"
                >
                  해외 옥션 &amp; 귀족가 소장 의뢰
                </a>
              </li>
              <li>
                <a
                  href="#viewing"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('viewing');
                  }}
                  className="hover:text-[#ffdf9c] transition-colors"
                >
                  주거 &amp; 상업 공간 큐레이션
                </a>
              </li>
              <li>
                <a
                  href="#viewing"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('viewing');
                  }}
                  className="hover:text-[#ffdf9c] transition-colors"
                >
                  화이트글러브 전담 배송 설치
                </a>
              </li>
              <li>
                <a
                  href="#curation"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateSection('curation');
                  }}
                  className="hover:text-[#ffdf9c] transition-colors"
                >
                  공식 감정 및 소장 증명서 발급
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Private Salon Hours */}
          <div className="space-y-3">
            <h4 className="text-[11px] uppercase tracking-[0.2em] text-[#735b24] font-bold">
              Private Salon Hours
            </h4>
            <div className="text-[13px] font-serif text-[#e9e1dc]/80 space-y-1">
              <p className="text-[#fff8f5] font-semibold">
                화 — 일요일 11:00 — 19:00
              </p>
              <p>매주 월요일 정기 휴관</p>
              <p className="text-[#735b24] text-xs pt-1">
                * 100% 프라이빗 사전 예약제
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigateSection('viewing')}
                className="text-[11px] uppercase tracking-widest text-[#ffdf9c] border-b border-[#735b24] pb-0.5 hover:text-[#ffffff] transition-colors"
              >
                도슨트 뷰잉 신청하기 &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col lg:flex-row justify-between items-center text-xs text-[#e9e1dc]/50 font-serif gap-4">
          <p>
            &copy; 2026 {BRAND_INFO.name} Paris &amp; Seoul. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            <span className="hover:text-[#e9e1dc] cursor-pointer">
              Terms of Provenance
            </span>
            <span className="hover:text-[#e9e1dc] cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-[#e9e1dc] cursor-pointer">
              Museum Association Member
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
