import React from 'react';

interface FooterProps {
  onOpenDocModal?: (title: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDocModal }) => {
  const institutionalLinks = [
    'Food Safety Compliance',
    'Cleanroom Protocols',
    'Cultivar Registry',
    'ESG Transparency',
    'Biosecurity Terms',
    'Privacy Shield',
  ];

  // 예전엔 빈 해시 앵커에 preventDefault 를 걸어 모달을 열었다 — 주소로는 아무 데도 가지 않는 「죽은 링크」로 세어진다.
  // 실제로 하는 일이 모달 열기이므로 버튼으로 바꿨다(모양은 그대로).
  const handleLinkClick = (link: string) => {
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
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {institutionalLinks.map((link) => (
              <button
                key={link}
                type="button"
                onClick={() => handleLinkClick(link)}
                className="flex items-center min-h-11 text-[#3d4a42] font-mono text-xs hover:text-[#006948] transition-colors duration-150 cursor-pointer"
              >
                {link}
              </button>
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
              충청북도 ○○군 ○○산업단지 00 그린큐브 기가 바이오스피어 타워 1-4동 (예시 주소)
            </p>
            <p className="font-mono text-[11px] text-[#6d7a72] mt-1">
              클린룸 등급: Class 1000급 (예시 표기)
            </p>
          </div>

          <div>
            <span className="font-mono text-xs font-bold text-[#131b2e] block mb-1">
              세종 AI 농생명 바이오 R&amp;D 연구소
            </span>
            <p className="leading-relaxed">
              세종특별자치시 ○○로 00 아그로테크놀로지 융합 연구관 (예시 주소)
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
              유기농 인증 / 식품안전경영 인증 / 우수관리인증 (모두 예시 표기 — 실제 취득 인증이 아닙니다)
            </p>
            <p className="font-mono text-[11px] text-[#006947] font-semibold mt-1">
              재생에너지 100% 전환을 목표로 하는 스마트팜 설정 (예시)
            </p>
          </div>
        </div>

        {/* Bottom Row: Copyright & Legal */}
        <div className="pt-6 border-t border-[#bccac0]/20 flex flex-col lg:flex-row justify-between items-center gap-4 text-center lg:text-left">
          <p className="font-body text-xs text-[#6d7a72]">
            이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며, 화면의 회사 정보·인증·수치는 모두 예시 값입니다.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-[11px] text-[#6d7a72]">
            <span>사업자등록번호: 000-00-00000 (예시)</span>
            <span>•</span>
            <span>대표이사: 홍길동 (예시)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
