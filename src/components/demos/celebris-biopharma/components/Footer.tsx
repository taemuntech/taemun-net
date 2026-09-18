import React from 'react';
import { LOGO_IMG_URL } from '../data/mockData';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";

/** 각 항목은 이 지면에 실제로 있는 구역(id)만 가리킨다 */
const FOOTER_LINKS = [
  { href: '#vision', label: 'Corporate Vision' },
  { href: '#pipeline', label: 'R&D Pipeline' },
  { href: '#platform', label: 'PROTEA-AI Platform' },
  { href: '#infrastructure', label: 'cGMP Infrastructure' },
  { href: '#sab', label: 'Scientific Advisory Board' },
  { href: '#wizard', label: 'Partnering & L/O' },
] as const;

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-16 px-6 lg:px-12 max-w-7xl mx-auto bg-[#eff4ff]/60 border-t border-[#c4c5d5]/40 mt-12 rounded-t-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Col 1: Brand & Listing-prep Badge */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center space-x-3">
            <img
              alt="Celebris Biopharma Logo"
              className="h-8 w-8 object-contain rounded shadow-xs"
              src={LOGO_IMG_URL}
              referrerPolicy="no-referrer"
            />
            <span className="text-[20px] font-bold text-[#00288e] tracking-tight">
              CELEBRIS BIOPHARMA
            </span>
          </div>
          <p className="text-[13px] text-[#444653] max-w-sm leading-relaxed">
            Next-Generation Targeted Protein Degradation (TPD) & Multispecific ADC Biotherapeutics.
          </p>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-white border border-[#c4c5d5]/50 font-code-mono text-[11px] text-[#00288e] shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1e40af] animate-pulse"></span>
            <span>LISTING PREP STAGE • DISCLOSURE SAMPLE</span>
          </div>
        </div>

        {/* Col 2: Locations & Campuses */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-[11px] font-code-mono text-[#757684] uppercase font-bold tracking-wider">
            R&D Facilities & Headquarters
          </div>
          <div className="text-[13px] text-[#0b1c30] space-y-3">
            <div>
              <strong className="font-semibold text-[#00288e]">
                인천 송도 바이오클러스터 본사 & cGMP 캠퍼스
              </strong>
              <div className="text-[#444653] mt-0.5">
                인천광역시 연수구 ○○대로 000 셀레브리스 바이오타워 1-8F (예시 주소)
              </div>
            </div>
            <div>
              <strong className="font-semibold text-[#00687a]">
                미국 보스턴 R&D 이노베이션 센터
              </strong>
              <div className="text-[#444653] mt-0.5">
                Bio-Hub Innovation Center Suite 000, Greater Boston Area, MA, USA (예시 주소)
              </div>
            </div>
          </div>
        </div>

        {/* Col 3: Institutional Links */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-[11px] font-code-mono text-[#757684] uppercase font-bold tracking-wider">
            Institutional Disclosures
          </div>
          {/* 이름표와 가는 곳이 서로 달랐다 — 공시 시스템 이름을 단 링크가 엉뚱한 구역으로 갔다.
              실존 기관 이름을 빼고, 라벨을 실제 도착 구역 이름으로 맞춘다. */}
          <div className="grid grid-cols-2 gap-x-2 text-[13px]">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                className="flex min-h-11 items-center text-[#444653] hover:text-[#00288e] transition-colors"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 샘플 고지 — 접을 수 없는 자리에 남긴다(가상 브랜드라는 사실이 화면에서 사라지면 안 된다) */}
      <div className="mb-8 rounded-xl border border-[#1e40af]/30 bg-white px-4 py-3 text-center text-[12px] lg:text-[13px] leading-relaxed text-[#0b1c30] [word-break:keep-all]"><SampleFooterNote /></div>

      <div className="pt-8 border-t border-[#c4c5d5]/30 flex flex-col lg:flex-row items-center justify-between text-[12px] text-[#444653] gap-4">
        <div className="font-code-mono text-center lg:text-left">
          © 2026 CELEBRIS BIOPHARMA Inc. All Rights Reserved. Songdo Bio-Cluster HQ & Boston Innovation Center. Listing Prep Stage (Sample).
        </div>
        {/* 「Terms of Research」 는 약관 지면이 없는데도 Corporate Vision 으로 가던 링크라 뺐다 */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 font-code-mono text-[12px]">
          <a className="flex min-h-11 items-center hover:text-[#00288e] transition" href="mailto:ir@example.com">IR: ir@example.com</a>
          <a className="flex min-h-11 items-center hover:text-[#00288e] transition" href="mailto:bd@example.com">BD: bd@example.com</a>
        </div>
      </div>
    </footer>
  );
};
