'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { BRAND_LOGO_URL } from '../data/portfolioData';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0d0e10] border-t border-white/10 py-16 text-[#998f83]">
      <div className="max-w-7xl mx-auto px-5 lg:px-16">
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
                <a href="#selected-works" className="inline-flex min-h-11 items-center hover:text-[#c5a880] transition">
                  Selected Works
                </a>
              </li>
              <li>
                <a href="#transformation" className="inline-flex min-h-11 items-center hover:text-[#c5a880] transition">
                  3D vs Built
                </a>
              </li>
              <li>
                <a href="#material-archive" className="inline-flex min-h-11 items-center hover:text-[#c5a880] transition">
                  Material Library
                </a>
              </li>
              <li>
                <a href="#process-atelier" className="inline-flex min-h-11 items-center hover:text-[#c5a880] transition">
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
              <span className="block mt-2">TEL : 02-0000-0000 (예시)</span>
              <span>EMAIL : hello@example.com</span>
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
                사업자등록번호: 000-00-00000 (예시)
                <br />
                실내건축공사업 등록면허 표기 자리 (예시)
              </p>
            </div>
            <button
              onClick={scrollToTop}
              className="mt-6 inline-flex min-h-11 items-center gap-2 text-xs text-[#c5a880] hover:text-white transition cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 접을 수 없는 자리에 남기는 샘플 고지 — 위 사업자·연락처 정보가 실재하는 업체로 읽히면 안 된다 */}
        <p className="mt-8 border border-[#c5a880]/40 bg-[#121315] px-4 py-3 text-[13px] leading-relaxed text-[#f4efea] [word-break:keep-all]"><SampleFooterNote /></p>

        {/* 여기 있던 소셜·정책 링크 네 개는 전부 빈 앵커라 눌러도 아무 데도 가지 않았고,
            그중 하나는 실존 건축 매체 이름이라 가상 브랜드의 공식 채널처럼 읽혔다.
            매체 이름은 지우고, 연결할 곳이 없다는 사실을 그대로 적은 표기 자리로 바꾼다. */}
        <div className="pt-8 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-center lg:text-left">
          <p>© {new Date().getFullYear()} HAUS &amp; SPACE. All Rights Reserved.</p>
          <p className="[word-break:keep-all]">
            소셜 채널 · 개인정보처리방침 링크 자리 (예시) — 샘플이라 연결된 페이지가 없습니다
          </p>
        </div>
      </div>
    </footer>
  );
};
