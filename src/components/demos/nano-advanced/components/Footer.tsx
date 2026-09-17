'use client';

import React, { useState } from 'react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { LOGO_URL, SAMPLE_INDUSTRY, SAMPLE_SLUG } from '../data/packagingData';

export const Footer: React.FC = () => {
  // href="#" 로 아무 데도 가지 않던 링크 3개(ESG·전자공시·개인정보처리방침)를 치웠다.
  // 이 화면에 지면이 있는 것은 앵커로, 없는 것은 「샘플이라 따로 없다」고 알려 주는 안내 모달로 잇는다(2026-09-17).
  const [noticeFeature, setNoticeFeature] = useState<string | null>(null);

  const anchorLinks = [
    { label: '기술 백서 아카이브', href: '#solutions' },
    { label: '파운드리 인증 현황', href: '#yield-metrics' },
    { label: '품질 경영 방침', href: '#yield-metrics' },
  ];

  const noticeLinks = ['ESG 지속가능경영', '회사 소개 (예시)', '개인정보처리방침'];

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
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-1 text-xs font-semibold">
            {anchorLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex max-lg:min-h-11 items-center text-[#444653] hover:text-[#00288e] hover:underline transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
            {noticeLinks.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => setNoticeFeature(label)}
                className="inline-flex max-lg:min-h-11 items-center text-[#444653] hover:text-[#00288e] hover:underline transition-colors duration-150 cursor-pointer"
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs text-[#444653]">
          <div>
            © 2026 NANO ADVANCED Corp. All Rights Reserved. 국내 시스템반도체 R&amp;D 센터 &amp;
            첨단 패키징 팹 1/2 캠퍼스 (예시 표기).
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

      <SampleNotice
        open={noticeFeature !== null}
        onClose={() => setNoticeFeature(null)}
        slug={SAMPLE_SLUG}
        industry={SAMPLE_INDUSTRY}
        featureName={noticeFeature ? `${noticeFeature} 지면` : undefined}
      />
    </footer>
  );
};
