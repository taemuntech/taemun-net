import React from 'react';
import { BRAND_LOGO_URL } from '../data/resorts';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f6f3ed] border-t border-[#c6c7c0]/20 transition-colors duration-300">
      <div className="w-full px-6 lg:px-14 pt-16 pb-12 mx-auto max-w-7xl flex flex-col justify-between">
        {/* Top Tier: Monumental Brand Title & Global Hubs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-[#c6c7c0]/20">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={BRAND_LOGO_URL}
                alt="ATLAS RESORTS Brand Logo"
                className="w-9 h-9 object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="font-editorial text-3xl lg:text-4xl tracking-[0.25em] text-[#030402] uppercase font-bold">
                ATLAS
              </span>
            </div>
            <p className="text-xs lg:text-sm text-[#454742] font-light max-w-sm leading-relaxed">
              세계에서 가장 청정한 대지 위에 조각된 프라이빗 에스테이트 &amp; 생츄어리 컬렉션. 세상과의 단절을 통한 가장 완벽한 평온.
            </p>
          </div>

          {/* Sanctuary Hubs Links */}
          <div className="lg:col-span-7 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <span className="text-[10px] text-[#725b38] tracking-[0.22em] uppercase font-semibold block mb-4">
                SANCTUARY HUBS
              </span>
              <ul className="space-y-2.5 text-xs text-[#454742]">
                <li>
                  <a href="#collection" className="hover:text-[#030402] transition-colors">
                    Jeju Gotjawal
                  </a>
                </li>
                <li>
                  <a href="#collection" className="hover:text-[#030402] transition-colors">
                    Namhae Cliffside
                  </a>
                </li>
                <li>
                  <a href="#collection" className="hover:text-[#030402] transition-colors">
                    Bali Ubud
                  </a>
                </li>
                <li>
                  <a href="#collection" className="hover:text-[#030402] transition-colors">
                    Kyoto Arashiyama
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] text-[#725b38] tracking-[0.22em] uppercase font-semibold block mb-4">
                CONCIERGE
              </span>
              <ul className="space-y-2.5 text-xs text-[#454742]">
                <li>
                  <a href="#concierge" className="hover:text-[#030402] transition-colors">
                    Butler Concierge Direct
                  </a>
                </li>
                <li>
                  <a href="#concierge" className="hover:text-[#030402] transition-colors">
                    Aviation Handling
                  </a>
                </li>
                <li>
                  <a href="#concierge" className="hover:text-[#030402] transition-colors">
                    Helipad Access
                  </a>
                </li>
                <li>
                  <a href="#wellness" className="hover:text-[#030402] transition-colors">
                    Private Dining Cellar
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] text-[#725b38] tracking-[0.22em] uppercase font-semibold block mb-4">
                CHARTERS
              </span>
              <ul className="space-y-2.5 text-xs text-[#454742]">
                <li>
                  <a href="#" className="hover:text-[#030402] transition-colors">
                    Privacy Charter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#030402] transition-colors">
                    Sustainability Charter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#030402] transition-colors">
                    Bespoke Booking Disclosures
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#030402] transition-colors">
                    Conservation Fund Alliance (예시)
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] text-[#725b38] tracking-[0.22em] uppercase font-semibold block mb-4">
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
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between text-[10px] text-[#767872] uppercase tracking-[0.2em] gap-4">
          <div className="text-center lg:text-left">
            &copy; 2025 ATLAS RESORTS &amp; PRIVATE VILLAS. ALL RIGHTS RESERVED. ARCHITECTURAL SANCTUARIES &amp; PRIVATE ESTATES.
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-[#030402] transition-colors">
              Privacy Charter
            </a>
            <a href="#" className="hover:text-[#030402] transition-colors">
              Sustainability Charter
            </a>
            <a href="#" className="hover:text-[#030402] transition-colors">
              Disclosures
            </a>
          </div>
        </div>

        {/* 샘플 고지 — 상단 샘플 바를 접거나 ?embed=true 로 화면만 열어도 남아야 하는 표시 */}
        <p className="mt-6 rounded border border-[#c6c7c0]/40 px-4 py-3 text-xs leading-relaxed text-[#454742] normal-case tracking-normal">
          이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며, 화면의 회사명·객실·요금·수치·연락처는
          모두 예시입니다. 예약·문의 폼은 접수되지 않습니다.
        </p>
      </div>
    </footer>
  );
};
