import { ShieldCheck } from 'lucide-react';
import { CREST_LOGO_URL } from '../data/investmentData';

interface FooterProps {
  onOpenVdr: () => void;
}

export default function Footer({ onOpenVdr }: FooterProps) {
  return (
    <footer className="w-full bg-[#090e17] border-t border-[#4d4635]/40 text-[#d0c5af]">
      <div className="w-full px-6 lg:px-14 py-16 max-w-[1680px] mx-auto flex flex-col gap-10">
        {/* Top Grid: Brand & Global Presence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-10 border-b border-[#4d4635]/20">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src={CREST_LOGO_URL}
                alt="Apex sovereign gold monogram crest"
                className="w-9 h-9 object-contain rounded border border-[#f2ca50]/30"
                referrerPolicy="no-referrer"
              />
              <span className="font-serif-display text-2xl text-[#f2ca50] tracking-widest uppercase font-bold">
                APEX PARTNERS
              </span>
            </div>
            <p className="text-xs lg:text-sm text-[#d0c5af]/80 max-w-md leading-relaxed">
              이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 「아펙스 글로벌 파트너스」는 실제 업체가 아니며, 화면의 인가·실적·포트폴리오·연락처는 모두 예시입니다.
            </p>
            <div className="font-mono-metric text-[11px] text-[#f2ca50]/90 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
              <span>Institutional Custody &amp; Clearing Framework (예시 설정)</span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 lg:grid-cols-4 gap-6 text-xs">
            <div>
              <span className="font-mono-metric text-[11px] text-[#dee2ef] uppercase block mb-3 font-semibold">
                SEOUL (HQ)
              </span>
              <p className="text-[#d0c5af]/80 leading-relaxed font-sans-body">
                서울특별시 강남구 ○○로 000, 00층 (예시 주소)<br />
                T: 02-0000-0000<br />
                ir-korea@example.com
              </p>
            </div>
            <div>
              <span className="font-mono-metric text-[11px] text-[#dee2ef] uppercase block mb-3 font-semibold">
                SINGAPORE
              </span>
              <p className="text-[#d0c5af]/80 leading-relaxed font-sans-body">
000 Sample Avenue, Level 00, Singapore 000000 (예시 주소)<br />
                T: +00 0000 0000
              </p>
            </div>
            <div>
              <span className="font-mono-metric text-[11px] text-[#dee2ef] uppercase block mb-3 font-semibold">
                LONDON
              </span>
              <p className="text-[#d0c5af]/80 leading-relaxed font-sans-body">
00 Sample Square, London 000 000, United Kingdom (예시 주소)<br />
                T: +00 00 0000 0000
              </p>
            </div>
            <div>
              <span className="font-mono-metric text-[11px] text-[#dee2ef] uppercase block mb-3 font-semibold">
                NEW YORK
              </span>
              <p className="text-[#d0c5af]/80 leading-relaxed font-sans-body">
000 Sample Street, 00th Floor, New York, NY 00000, USA (예시 주소)<br />
                T: +0 (000) 000-0000
              </p>
            </div>
          </div>
        </div>

        {/* Legal Links Horizontal Stack */}
        <div className="flex flex-wrap items-center justify-between gap-4 font-mono-metric text-[11px]">
          <div className="flex flex-wrap gap-6">
            <a
              href="#hero"
              className="text-[#d0c5af]/80 hover:text-[#f2ca50] transition-colors duration-150"
            >
              Mandates &amp; Fund Structures
            </a>
            <a
              href="#vdr"
              onClick={onOpenVdr}
              className="text-[#d0c5af]/80 hover:text-[#f2ca50] transition-colors duration-150"
            >
              LP Portal Gateway
            </a>
            <a
              href="#hero"
              className="text-[#d0c5af]/80 hover:text-[#f2ca50] transition-colors duration-150"
            >
              Regulatory Disclosures (예시)
            </a>
            <a
              href="#hero"
              className="text-[#d0c5af]/80 hover:text-[#f2ca50] transition-colors duration-150"
            >
              Swiss Private Custody Framework
            </a>
            <a
              href="#advisory"
              className="text-[#d0c5af]/80 hover:text-[#f2ca50] transition-colors duration-150"
            >
              Global Hubs: Seoul · Singapore · London · New York
            </a>
            <a
              href="#vdr"
              className="text-[#d0c5af]/80 hover:text-[#f2ca50] transition-colors duration-150"
            >
              Whistleblower &amp; AML Discretion
            </a>
          </div>
        </div>

        {/* Copyright & Security Status */}
        <div className="pt-6 border-t border-[#4d4635]/20 flex flex-col lg:flex-row justify-between items-start lg:items-center text-xs text-[#d0c5af]/60 gap-4 font-mono-metric">
          <p>
            © 2025 Apex Partners Sovereign Capital (가상 브랜드). 태문 DEV STUDIO 가 만든 샘플 화면이며 실제 업체·인가·등록번호가 아닙니다.
          </p>
          <div className="flex items-center gap-2 text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#4edea3]" />
            <span className="text-[#4edea3]">ALL SECURITY PROTOCOLS NOMINAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
