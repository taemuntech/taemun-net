import React from 'react';
import { BRAND_LOGO_URL } from '../data/products';

interface FooterProps {
  onOpenShowroomModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenShowroomModal }) => {
  return (
    <footer className="bg-[#f6ece5] text-[#100e0d] border-t border-[#d0c4c0]/40 mt-12">
      <div className="w-full max-w-7xl mx-auto px-6 py-16 lg:px-8 flex flex-col gap-12">
        {/* Top Branding and Column Grid */}
        <div className="grid grid-cols-1 grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={BRAND_LOGO_URL}
                alt="MAISON ARCHITECT Brand Logo"
                className="w-7 h-7 object-contain rounded-sm"
              referrerPolicy="no-referrer" />
              <span className="font-serif text-xl tracking-widest text-[#100e0d] uppercase">
                MAISON ARCHITECT
              </span>
            </div>
            <p className="text-xs text-[#4d4542] max-w-sm leading-relaxed">
              건축적 비례와 지속 가능한 천연 소재가 주는 평온함. 시간이 흘러도 변함없는 예술적
              조형미의 주거 컬렉션을 제안합니다.
            </p>
            <div className="pt-2 text-xs text-[#4d4542]">
              <span className="font-bold text-[#100e0d]">고객 케어 센터: 02-0000-0000 (예시)</span>
              <p className="text-[11px] text-[#7f7571] mt-0.5">
                평일 10:00 - 18:00 (점심시간 12:30 - 13:30 / 공휴일 휴무)
              </p>
            </div>
          </div>

          {/* Links Column 1: 쇼룸 & 서비스 */}
          <div>
            <h4 className="font-sans text-xs font-bold text-[#100e0d] uppercase tracking-wider mb-3.5">
              쇼룸 &amp; 서비스
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenShowroomModal}
                  className="text-[#4d4542] hover:text-[#100e0d] transition-colors"
                >
                  청담 쇼룸 예약
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenShowroomModal}
                  className="text-[#4d4542] hover:text-[#100e0d] transition-colors"
                >
                  한남 쇼룸 예약
                </button>
              </li>
              <li>
                <a href="#furniture" className="text-[#4d4542] hover:text-[#100e0d] transition-colors">
                  2인 전문 기사 프리미엄 배송
                </a>
              </li>
              <li>
                <a href="#spatial-tour" className="text-[#4d4542] hover:text-[#100e0d] transition-colors">
                  3D 룸투어 공간 시뮬레이션
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: 신뢰 & 보증 */}
          <div>
            <h4 className="font-sans text-xs font-bold text-[#100e0d] uppercase tracking-wider mb-3.5">
              신뢰 &amp; 보증
            </h4>
            <ul className="space-y-2 text-xs text-[#4d4542]">
              <li>FSC 인증 스칸디나비안 목재 보증</li>
              <li>오코텍스 1등급 친환경 패브릭</li>
              <li>골조 프레임 10년 무상 품질보증</li>
              <li>
                <span className="hover:text-[#100e0d] cursor-pointer">고객 케어 센터</span>
              </li>
            </ul>
          </div>

          {/* Links Column 3: 약관 & 정책 */}
          <div>
            <h4 className="font-sans text-xs font-bold text-[#100e0d] uppercase tracking-wider mb-3.5">
              약관 &amp; 정책
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-[#4d4542] hover:text-[#100e0d] cursor-pointer">이용약관</span>
              </li>
              <li>
                <span className="text-[#100e0d] font-bold underline underline-offset-4 cursor-pointer">
                  개인정보처리방침
                </span>
              </li>
              <li className="text-[#4d4542]">에스크로 결제 안심 시스템 (가상 데모)</li>
              <li>
                <span className="text-[#4d4542] hover:text-[#100e0d] cursor-pointer">
                  사업자 정보 확인
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 border-t border-[#d0c4c0]/30 flex flex-col lg:flex-row items-center justify-between gap-4 text-[11px] text-[#7f7571]">
          <p>© 2026 MAISON ARCHITECT (가상 브랜드 샘플). ALL RIGHTS RESERVED. 에스크로 결제 안심 시스템 (가상 데모).</p>
          <p>
            대표자: 김아키 | 사업자등록번호: 000-00-00000 (예시) | 통신판매업신고 표기 자리 (예시)
          </p>
        </div>
      </div>
    </footer>
  );
};
