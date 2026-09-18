"use client";

import React from 'react';
import { BRAND_INFO } from '../data/antiqueData';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  /** 입고 아카이브 필터를 걸고 그 구역으로 보낸다 */
  onSelectCategory: (filterKey: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onSelectCategory }) => {
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
              큐레이션하고 보존 복원하는 아카이브 살롱입니다. 작품마다 전해 오는
              출처 기록과 보존 상태 소견을 함께 정리해 드립니다.
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
                  className="inline-flex min-h-11 items-center hover:text-[#ffdf9c] transition-colors lg:min-h-0"
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
                  className="inline-flex min-h-11 items-center hover:text-[#ffdf9c] transition-colors lg:min-h-0"
                >
                  빅토리안 &amp; 조지안 서재
                </a>
              </li>
              <li>
                <a
                  href="#arrivals"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectCategory('lighting');
                  }}
                  className="inline-flex min-h-11 items-center hover:text-[#ffdf9c] transition-colors lg:min-h-0"
                >
                  오르몰루 길트 조명 샹들리에
                </a>
              </li>
              <li>
                <a
                  href="#arrivals"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectCategory('mirrors');
                  }}
                  className="inline-flex min-h-11 items-center hover:text-[#ffdf9c] transition-colors lg:min-h-0"
                >
                  루이 필립 길트 수은 거울
                </a>
              </li>
              <li>
                <a
                  href="#arrivals"
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectCategory('objects');
                  }}
                  className="inline-flex min-h-11 items-center hover:text-[#ffdf9c] transition-colors lg:min-h-0"
                >
                  유럽 자기 &amp; 은제 오브제
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
                  className="inline-flex min-h-11 items-center hover:text-[#ffdf9c] transition-colors lg:min-h-0"
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
                  className="inline-flex min-h-11 items-center hover:text-[#ffdf9c] transition-colors lg:min-h-0"
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
                  className="inline-flex min-h-11 items-center hover:text-[#ffdf9c] transition-colors lg:min-h-0"
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
                  className="inline-flex min-h-11 items-center hover:text-[#ffdf9c] transition-colors lg:min-h-0"
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
                  className="inline-flex min-h-11 items-center hover:text-[#ffdf9c] transition-colors lg:min-h-0"
                >
                  소장 이력 정리 및 보존 소견
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
                * 전 시간대 사전 예약제
              </p>
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onNavigateSection('viewing')}
                className="inline-flex min-h-11 items-center text-[11px] uppercase tracking-widest text-[#ffdf9c] border-b border-[#735b24] hover:text-[#ffffff] transition-colors lg:min-h-0 lg:pb-0.5"
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
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            <span>Terms of Provenance</span>
            <span>Privacy Policy</span>
          </div>
        </div>

        {/* 샘플 고지 — 상단 툴바를 접거나 ?embed=true 로 화면만 열어도 남아야 하는 표시 */}
        <p className="mt-6 rounded-lg border border-[#e9e1dc]/20 px-4 py-3 text-xs leading-relaxed text-[#e9e1dc]/70"><SampleFooterNote /></p>
      </div>
    </footer>
  );
};
