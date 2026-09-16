import React from 'react';
import { LOGO_URL } from '../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-[#bcc9c6]/40">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12 py-12 lg:py-16">
        {/* Top Row: Brand, Credentials, Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-[#bcc9c6]/30">
          {/* Brand & Vision (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center gap-2">
              <img
                alt="H2 NEXT Brand Logo"
                className="h-8 w-8 object-contain"
                src={LOGO_URL}
              />
              <span className="text-xl font-bold text-[#00685f]">H2 NEXT</span>
            </div>
            <p className="text-xs lg:text-sm text-[#3d4947] max-w-sm leading-relaxed">
              H2 NEXT(하이드로젠 넥스트)는 기가와트 해상풍력과 PEM 고효율 수전해, 극저온 액화수소 밸류체인을 선도하는 대한민국 대표 청정에너지 엔지니어링 기업입니다.
            </p>
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-[#6d7a77] pt-1">
              <span className="px-2 py-0.5 rounded bg-[#eff4ff] border border-[#bcc9c6]/40">
                KOSPI 392810
              </span>
              <span className="px-2 py-0.5 rounded bg-[#eff4ff] border border-[#bcc9c6]/40">
                RE100 Verified
              </span>
              <span className="px-2 py-0.5 rounded bg-[#eff4ff] border border-[#bcc9c6]/40">
                ISO 14001 / 50001
              </span>
            </div>
          </div>

          {/* Links Columns (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-6">
            <div>
              <h5 className="text-sm font-bold text-[#0b1c30] mb-3">그린수소 기술</h5>
              <ul className="space-y-2 text-xs lg:text-sm text-[#3d4947]">
                <li><a className="hover:text-[#00685f] transition-colors" href="#pillars">PEM 수전해 스택</a></li>
                <li><a className="hover:text-[#00685f] transition-colors" href="#pillars">-253℃ 극저온 구형탱크</a></li>
                <li><a className="hover:text-[#00685f] transition-colors" href="#pillars">분산형 PPA 그리드</a></li>
                <li><a className="hover:text-[#00685f] transition-colors" href="#nodes">기술 특허 포트폴리오</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-bold text-[#0b1c30] mb-3">발전 및 터미널 거점</h5>
              <ul className="space-y-2 text-xs lg:text-sm text-[#3d4947]">
                <li><a className="hover:text-[#00685f] transition-colors" href="#nodes">신안 자은 1.2GW 해상풍력</a></li>
                <li><a className="hover:text-[#00685f] transition-colors" href="#nodes">울산 남항 액화수소 터미널</a></li>
                <li><a className="hover:text-[#00685f] transition-colors" href="#nodes">포항 80MW 수소연료전지</a></li>
                <li><a className="hover:text-[#00685f] transition-colors" href="#nodes">호주 필바라 수출 기지</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-bold text-[#0b1c30] mb-3">ESG &amp; IR 공시</h5>
              <ul className="space-y-2 text-xs lg:text-sm text-[#3d4947]">
                <li><a className="hover:text-[#00685f] transition-colors" href="#governance">지속가능경영보고서</a></li>
                <li><a className="hover:text-[#00685f] transition-colors" href="#governance">TCFD 기후 리스크 보고</a></li>
                <li><a className="hover:text-[#00685f] transition-colors" href="https://dart.fss.or.kr" target="_blank" rel="noreferrer">DART 분기/결산 재무제표</a></li>
                <li><a className="hover:text-[#00685f] transition-colors" href="#governance">이사회 및 윤리경영 규정</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-sm font-bold text-[#0b1c30] mb-3">엔지니어링 문의</h5>
              <ul className="space-y-2 text-xs lg:text-sm text-[#3d4947]">
                <li><a className="hover:text-[#00685f] transition-colors" href="#consultation">기업 RE100 컨설팅</a></li>
                <li><a className="hover:text-[#00685f] transition-colors" href="#calculator">K-ETS 배출권 산출</a></li>
                <li><a className="hover:text-[#00685f] transition-colors" href="#consultation">EPC 기술 제휴</a></li>
                <li><a className="hover:text-[#00685f] transition-colors" href="mailto:contact@taemun.co.kr">IR 투자자 미팅 접수</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Corporate Info */}
        <div className="pt-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 text-xs ] text-[#6d7a77]">
          <div className="space-y-1">
            <p>
              <span className="font-semibold text-[#0b1c30]">H2 NEXT Energy Systems Inc. (주식회사 하이드로젠넥스트)</span> | 대표이사: 강태양, 김해원 | 사업자등록번호: 104-86-49201
            </p>
            <p>
              서울 본사: 서울특별시 종로구 종로1길 50 더케이트윈타워 A동 18층 | 울산 캠퍼스: 울산광역시 남구 장생포고래로 188 수소에너지 혁신센터
            </p>
            <p className="font-mono text-[11px] pt-1">
              © 2025 H2 NEXT Energy Systems Inc. All rights reserved. RE100 &amp; ISO 14001 / ISO 45001 Certified.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <a className="hover:underline text-[#3d4947]" href="#privacy">개인정보처리방침</a>
            <span className="text-[#bcc9c6]">|</span>
            <a className="hover:underline text-[#3d4947]" href="#terms">이용약관</a>
            <span className="text-[#bcc9c6]">|</span>
            <a className="hover:underline text-[#3d4947]" href="#whistleblower">사이버신문고</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
