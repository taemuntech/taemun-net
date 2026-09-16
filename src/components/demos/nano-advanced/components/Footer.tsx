import React from 'react';
import { LOGO_URL } from '../data/packagingData';

export const Footer: React.FC = () => {
  const footerLinks = [
    { label: '기술 백서 아카이브', href: '#solutions' },
    { label: '파운드리 인증 현황', href: '#yield-metrics' },
    { label: '품질 경영 방침', href: '#yield-metrics' },
    { label: 'ESG 지속가능경영', href: '#' },
    { label: '전자공시 (예시)', href: '#' },
    { label: '개인정보처리방침', href: '#' },
  ];

  return (
    <footer
      className="bg-white text-[#00288e] w-full border-t border-[#c4c5d5]/30"
      id="footer-section"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 lg:py-12 flex flex-col gap-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#c4c5d5]/20">
          <div className="flex items-center gap-3">
            <img
              alt="NANO ADVANCED Brand Logo"
              className="h-8 w-auto object-contain"
              src={LOGO_URL} referrerPolicy="no-referrer" />
          </div>

          {/* Institutional links */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#444653] hover:text-[#00288e] hover:underline transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs text-[#444653]">
          <div>
            © 2026 NANO ADVANCED Corp. All Rights Reserved. 판교 시스템반도체 R&amp;D 센터 &amp; 구미
            첨단 패키징 팹 1/2 캠퍼스.
          </div>
          <div className="font-mono text-[11px] text-[#757684]">
            INTERNATIONAL STANDARD COMPLIANCE • PARTNER PROGRAM (SAMPLE)
          </div>
        </div>

        {/* 샘플 고지 — 상단 툴바를 접거나 ?embed=true 로 바로 열어도 남아야 하는 표시 */}
        <p className="rounded-xl border border-[#c4c5d5]/50 bg-[#f8f9ff] px-4 py-3 text-xs leading-relaxed text-[#444653]">
          이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며, 화면의 회사명·수치·인증·연락처는 모두
          예시입니다. 문의·신청 폼은 접수되지 않습니다.
        </p>
      </div>
    </footer>
  );
};
