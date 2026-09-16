'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { BRAND_LOGO_URL } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0d0e10] border-t border-white/10 py-16 text-[#998f83]">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          <div className="lg:col-span-4">
            <img
              src={BRAND_LOGO_URL}
              alt="HAUS & SPACE Logo"
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-xs leading-relaxed max-w-sm">
              하우스앤스페이스는 시간의 흐름 속에서도 고유한 미학적 가치를 유지하는 하이엔드 주거 및 상업 공간을 창조하는 아키텍처 디자인 랩입니다.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-widest text-[#f4efea] mb-4 font-semibold break-keep [word-break:keep-all]">
              Archival
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#selected-works" className="hover:text-[#c5a880] transition">
                  Selected Works
                </a>
              </li>
              <li>
                <a href="#transformation" className="hover:text-[#c5a880] transition">
                  3D vs Built
                </a>
              </li>
              <li>
                <a href="#material-archive" className="hover:text-[#c5a880] transition">
                  Material Library
                </a>
              </li>
              <li>
                <a href="#process-atelier" className="hover:text-[#c5a880] transition">
                  Atelier Protocol
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-[#f4efea] mb-4 font-semibold break-keep [word-break:keep-all]">
              Atelier &amp; Studio
            </h4>
            <p className="text-xs leading-relaxed">
              서울시 강남구 압구정로 60길 18
              <br />
              하우스앤스페이스 디자인 아틀리에
              <br />
              <span className="block mt-2">TEL : 02. 548. 9210</span>
              <span>EMAIL : atelier@hausandspace.com</span>
            </p>
          </div>

          <div className="lg:col-span-3 flex flex-col justify-between">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-[#f4efea] mb-4 font-semibold break-keep [word-break:keep-all]">
                Business Info
              </h4>
              <p className="text-xs leading-relaxed">
                (주)하우스앤스페이스 아키텍처
                <br />
                사업자등록번호: 211-88-92401
                <br />
                실내건축공사업 등록면허: 강남 제2015-18호
              </p>
            </div>
            <button
              onClick={scrollToTop}
              className="mt-6 inline-flex items-center gap-2 text-xs text-[#c5a880] hover:text-white transition cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} HAUS &amp; SPACE. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#c5a880] transition">
              Instagram
            </a>
            <a href="#" className="hover:text-[#c5a880] transition">
              YouTube Archival
            </a>
            <a href="#" className="hover:text-[#c5a880] transition">
              ArchDaily
            </a>
            <a href="#" className="hover:text-[#c5a880] transition">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
