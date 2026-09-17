"use client";

import React from 'react';

interface FooterProps {
  currentLang: 'KR' | 'EN';
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onOpenPrivacy, onOpenTerms }) => {
  return (
    <footer className="w-full bg-[#283044] text-[#faf8ff] border-t border-white/10">
      <div className="w-full py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
        {/* Top Grid: Brand, Divisions, Quick Nav, Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Col 1 & 2: Brand Profile */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/portfolio/hysfa/hysfa-02.png"
                alt="HANYANGSYSTEM Logo"
                referrerPolicy="no-referrer"
                className="h-9 w-auto object-contain brightness-0 invert"
              />
              <span className="text-[22px] font-extrabold tracking-tight text-[#faf8ff] font-sans">
                한양시스템㈜
              </span>
            </div>

            <p className="text-[14px] text-[#d2d9f4] max-w-sm leading-relaxed">
              {currentLang === 'KR'
                ? '한양시스템(HANYANGSYSTEM Co., Ltd.)은 반도체 공정 자동화 설비(FA), 초고순도 가스 캐비닛 및 실시간 스마트 S/W 솔루션을 공급하는 정밀 엔지니어링 기업입니다.'
                : 'HANYANGSYSTEM Co., Ltd. is a precision engineering enterprise delivering semiconductor FA systems, ultra-high-purity gas cabinets, and real-time smart S/W.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-[#d2d9f4] font-mono text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#b2c5ff]"></span>
                <span>Headquarters: Siheung, KR</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#b2c5ff]"></span>
                <span>Cleanroom Class 10/100</span>
              </div>
            </div>
          </div>

          {/* Col 3: Business Divisions */}
          <div className="space-y-3">
            <h5 className="text-[16px] font-semibold text-white">
              {currentLang === 'KR' ? '사업영역' : 'Divisions'}
            </h5>
            <ul className="space-y-2 text-[14px] text-[#d2d9f4]">
              <li><a href="#divisions" className="hover:text-white transition-colors">장비사업부 (FA설비)</a></li>
              <li><a href="#divisions" className="hover:text-white transition-colors">가스사업부 (UHP Gas)</a></li>
              <li><a href="#divisions" className="hover:text-white transition-colors">정보사업부 (제어S/W)</a></li>
              <li><a href="#divisions" className="hover:text-white transition-colors">웨이퍼 반송 로봇</a></li>
              <li><a href="#divisions" className="hover:text-white transition-colors">가스 캐비닛 &amp; VMB</a></li>
            </ul>
          </div>

          {/* Col 4: Corporate & R&D */}
          <div className="space-y-3">
            <h5 className="text-[16px] font-semibold text-white">
              {currentLang === 'KR' ? '기업 정보' : 'Corporate'}
            </h5>
            <ul className="space-y-2 text-[14px] text-[#d2d9f4]">
              <li><a href="#company" className="hover:text-white transition-colors">회사개요 &amp; 연혁</a></li>
              <li><a href="#company" className="hover:text-white transition-colors">경영이념 및 비전</a></li>
              <li><a href="#rnd" className="hover:text-white transition-colors">R&amp;D 센터 기술력</a></li>
              <li><a href="#quality" className="hover:text-white transition-colors">품질정책 및 인증현황</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">인재상 &amp; 복리후생</a></li>
            </ul>
          </div>

          {/* Col 5: Contact Direct */}
          <div className="space-y-3">
            <h5 className="text-[16px] font-semibold text-white">
              {currentLang === 'KR' ? '기술지원 센터' : 'Tech Support'}
            </h5>
            <div className="space-y-2 text-[14px] text-[#d2d9f4]">
              <p><strong className="text-white">TEL:</strong> 031-434-7300</p>
              <p><strong className="text-white">FAX:</strong> 031-434-7310</p>
              <p><strong className="text-white">운영시간:</strong> 평일 08:30 - 18:00</p>
              <div className="pt-2">
                <a
                  href="#consultation"
                  className="inline-block px-3.5 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white text-[12px] font-mono border border-white/20 transition-colors"
                >
                  {currentLang === 'KR' ? '기술 문의 바로가기' : 'Inquire Online'}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Company Registration Information Bar */}
        <div className="pt-8 border-t border-white/10 space-y-4">
          {/* Horizontal Compliance Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-[#d2d9f4]">
            <a href="#company" className="text-white font-semibold hover:underline">Privacy Policy</a>
            <a href="#company" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#company" className="hover:text-white transition-colors">Compliance &amp; Ethics</a>
            <a href="#quality" className="hover:text-white transition-colors">Global Certifications</a>
            <a href="#quality" className="hover:text-white transition-colors">ISO Quality Standards</a>
            <a href="#consultation" className="hover:text-white transition-colors">Whistleblower Hotline</a>
            <a href="#divisions" className="hover:text-white transition-colors">Site Map</a>
          </div>

          {/* Official Registration Detail Line */}
          <div className="text-[13px] text-[#d2d9f4]/80 space-y-1">
            <p>
              상호명 : 한양시스템㈜ | 대표자 : 김태훈 | 사업자등록번호 : 134-81-47082 | 통신판매업신고 : 시흥시 제2019-호
            </p>
            <p>
              사업장 및 스마트 팩토리 주소 : 경기도 시흥시 시화벤처로 331 (정왕동, 시화MTV 3사 307호) | 대표번호 : 031-434-7300 | 팩스 : 031-434-7310
            </p>
          </div>

          {/* Exact Copyright Text */}
          <div className="pt-2 font-mono text-[10px] text-[#d2d9f4]/60 tracking-wider">
            COPYRIGHT © 2024 HANYANGSYSTEM CO., LTD. ALL RIGHTS RESERVED. HEADQUARTERS &amp; SMART FACTORY: SIHEUNG-SI, GYEONGGI-DO, REPUBLIC OF KOREA. BIZ REG: 134-81-00000. TEL: +82-31-000-0000.
          </div>
        </div>
      </div>
    </footer>
  );
};
