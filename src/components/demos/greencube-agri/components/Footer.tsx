import React from 'react';

interface FooterProps {
  onOpenDocModal?: (title: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDocModal }) => {
  const institutionalLinks = [
    'ISO 22000 Compliance',
    'Cleanroom Protocols',
    'Cultivar Registry',
    'ESG Transparency',
    'Biosecurity Terms',
    'Privacy Shield',
  ];

  const handleLinkClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault();
    if (onOpenDocModal) {
      onOpenDocModal(link);
    }
  };

  return (
    <footer className="w-full bg-[#f2f3ff] border-t border-[#bccac0]/30 transition-colors">
      <div className="w-full px-4 lg:px-12 max-w-7xl mx-auto py-12 flex flex-col gap-8">
        {/* Top Row: Brand & Key Institutional Links */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-[#bccac0]/30">
          <div className="flex items-center gap-3">
            <img
              alt="GREENCUBE AGRI-TECH Brand Logo"
              className="w-9 h-9 object-contain rounded border border-[#bccac0]/40 p-0.5 bg-white"
              src="https://lh3.googleusercontent.com/aida/AEtjO1UPJFEO7mdvmQW-F6jZ_TPyvDxg4oW4QXpPXQdhxB5SN82tVMKwyP7HzxgLgi7ND3Vqgz2sIAORnDO6EhzBUXoqSM4hDriyqn8dWrD-sfczEg-NGrNGVxwyhanqsoIu1VJmCoQVESQjfTmfFT-6pdEXKrhdaYQe4RW7_4fA-dQj5Kf-GBLjo6Fq10V61PT45TKRLG0lxWJc7akNr5n7UgUMuG6xlxI_uUv86b3QTuHcD7BK-2VztiDGBt4"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="font-headline text-base lg:text-lg font-bold text-[#131b2e]">
                GREENCUBE AGRI-TECH
              </span>
              <span className="block font-mono text-[10px] text-[#6d7a72] tracking-wider">
                BIOSPHERE ENGINEERING &amp; DATA SYSTEMS
              </span>
            </div>
          </div>

          {/* Institutional Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {institutionalLinks.map((link) => (
              <a
                key={link}
                href="#"
                onClick={(e) => handleLinkClick(e, link)}
                className="text-[#3d4a42] font-mono text-xs hover:text-[#006948] transition-colors duration-150 cursor-pointer"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        {/* Center Row: Institutional Facility Addresses & Accreditations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 font-body text-xs lg:text-sm text-[#3d4a42]">
          <div>
            <span className="font-mono text-xs font-bold text-[#131b2e] block mb-1">
              본사 및 진천 기가팜 제1센터
            </span>
            <p className="leading-relaxed">
              충청북도 진천군 덕산읍 신척산단 5길 42 그린큐브 기가 바이오스피어 타워 1-4동
            </p>
            <p className="font-mono text-[11px] text-[#6d7a72] mt-1">
              클린룸 등급: ISO Class 1000 (FED STD 209E)
            </p>
          </div>

          <div>
            <span className="font-mono text-xs font-bold text-[#131b2e] block mb-1">
              세종 AI 농생명 바이오 R&amp;D 연구소
            </span>
            <p className="leading-relaxed">
              세종특별자치시 집현중앙로 77 세종테크노밸리 아그로테크놀로지 융합 연구관
            </p>
            <p className="font-mono text-[11px] text-[#6d7a72] mt-1">
              지표 물질 분석 및 분광 제어 알고리즘 실증 센터
            </p>
          </div>

          <div>
            <span className="font-mono text-xs font-bold text-[#131b2e] block mb-1">
              글로벌 인증 및 인증 라이선스
            </span>
            <p className="leading-relaxed">
              USDA Organic / ISO 22000 식품안전경영인증 / GAP 우수관리인증
            </p>
            <p className="font-mono text-[11px] text-[#006947] font-semibold mt-1">
              ESG RE100 100% 신재생에너지 자립 스마트팜
            </p>
          </div>
        </div>

        {/* Bottom Row: Copyright & Legal */}
        <div className="pt-6 border-t border-[#bccac0]/20 flex flex-col lg:flex-row justify-between items-center gap-4 text-center lg:text-left">
          <p className="font-body text-xs text-[#6d7a72]">
            © 2025 GREENCUBE AGRI-TECH BIOSPHERE INC. ALL RIGHTS RESERVED. CERTIFIED ISO CLASS 1000 / USDA ORGANIC / ESG RE100.
          </p>
          <div className="flex items-center gap-4 font-mono text-[11px] text-[#6d7a72]">
            <span>사업자등록번호: 314-86-01942</span>
            <span>•</span>
            <span>대표이사: 강동원</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
