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
              아펙스 글로벌 파트너스는 금융감독위원회(FSC) 인가 전문사모집합투자업자이자 글로벌 기관투자자(LP)의 절대적 수탁자로서 대를 잇는 장기 가치를 실현합니다.
            </p>
            <div className="font-mono-metric text-[11px] text-[#f2ca50]/90 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#f2ca50]" />
              <span>ITAR Compliant Custody &amp; Swiss Banking Tier-1 Clearing</span>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 lg:grid-cols-4 gap-6 text-xs">
            <div>
              <span className="font-mono-metric text-[11px] text-[#dee2ef] uppercase block mb-3 font-semibold">
                SEOUL (HQ)
              </span>
              <p className="text-[#d0c5af]/80 leading-relaxed font-sans-body">
                서울특별시 강남구 테헤란로 521 파르나스타워 38F<br />
                T: +82 (2) 580-9900<br />
                ir-korea@apex-capital.com
              </p>
            </div>
            <div>
              <span className="font-mono-metric text-[11px] text-[#dee2ef] uppercase block mb-3 font-semibold">
                SINGAPORE
              </span>
              <p className="text-[#d0c5af]/80 leading-relaxed font-sans-body">
                Marina Bay Financial Centre Tower 2, Level 41, Singapore 018983<br />
                T: +65 6819 7200
              </p>
            </div>
            <div>
              <span className="font-mono-metric text-[11px] text-[#dee2ef] uppercase block mb-3 font-semibold">
                LONDON
              </span>
              <p className="text-[#d0c5af]/80 leading-relaxed font-sans-body">
                25 Berkeley Square, Mayfair, London W1J 6HB, United Kingdom<br />
                T: +44 20 7946 0192
              </p>
            </div>
            <div>
              <span className="font-mono-metric text-[11px] text-[#dee2ef] uppercase block mb-3 font-semibold">
                NEW YORK
              </span>
              <p className="text-[#d0c5af]/80 leading-relaxed font-sans-body">
                50 Hudson Yards, 48th Floor, New York, NY 10001, USA<br />
                T: +1 (212) 890-4500
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
              SEC / FSC Regulatory Disclosures
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
            © 2025 Apex Partners Sovereign Capital LLC. FSC Registered Entity No. 8941-K &amp; ITAR Compliant Institutional Custody. Absolute Discretion Reserved.
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
