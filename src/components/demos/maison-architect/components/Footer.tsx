import React from 'react';
import { BRAND_LOGO_URL } from '../data/products';
import type { PolicyTopic } from './PolicyModal';

interface FooterProps {
  onOpenShowroomModal: () => void;
  /** 약관·정책·고객센터처럼 이 샘플에 실제 지면이 없는 항목 — 눌리면 「무엇을 싣는 자리인가」 모달을 연다 */
  onOpenPolicy: (topic: PolicyTopic) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenShowroomModal, onOpenPolicy }) => {
  // 이 샘플엔 약관·정책 지면이 없다. 「눌리는 것처럼 보이는데 아무 일도 안 나는 글자」를 남기지 않으려고
  // 전부 버튼으로 두고 PolicyModal 로 잇는다.
  const policyLinks: { label: PolicyTopic; strong?: boolean }[] = [
    { label: '이용약관' },
    { label: '개인정보처리방침', strong: true },
    { label: '사업자 정보 확인' }
  ];

  return (
    <footer className="bg-[#f6ece5] text-[#100e0d] border-t border-[#d0c4c0]/40 mt-12">
      <div className="w-full max-w-7xl mx-auto px-6 py-16 lg:px-8 flex flex-col gap-12">
        {/* Top Branding and Column Grid */}
        {/* 375 에서 두 열이 되면 링크 글자가 잘린다 — 640 부터 두 열, lg 부터 다섯 열 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="sm:col-span-2 space-y-4">
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
            <ul className="space-y-1 text-xs">
              <li>
                <button
                  type="button"
                  onClick={onOpenShowroomModal}
                  className="flex items-center min-h-11 lg:min-h-0 lg:py-1 text-left text-[#4d4542] hover:text-[#100e0d] transition-colors"
                >
                  청담 쇼룸 예약
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenShowroomModal}
                  className="flex items-center min-h-11 lg:min-h-0 lg:py-1 text-left text-[#4d4542] hover:text-[#100e0d] transition-colors"
                >
                  한남 쇼룸 예약
                </button>
              </li>
              <li>
                <a
                  href="#furniture"
                  className="flex items-center min-h-11 lg:min-h-0 lg:py-1 text-[#4d4542] hover:text-[#100e0d] transition-colors"
                >
                  2인 전문 기사 프리미엄 배송
                </a>
              </li>
              <li>
                <a
                  href="#spatial-tour"
                  className="flex items-center min-h-11 lg:min-h-0 lg:py-1 text-[#4d4542] hover:text-[#100e0d] transition-colors"
                >
                  3D 룸투어 공간 시뮬레이션
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: 소재 표기 — 인증기관 이름을 실적처럼 쓰지 않고 「예시 표기」로 남긴다 */}
          <div>
            <h4 className="font-sans text-xs font-bold text-[#100e0d] uppercase tracking-wider mb-3.5">
              소재 &amp; 품질 표기
            </h4>
            <ul className="space-y-2 text-xs text-[#4d4542]">
              <li>친환경 목재 인증 표기 자리 (예시)</li>
              <li>친환경 패브릭 등급 표기 자리 (예시)</li>
              <li>골조 프레임 품질 보상 정책 표기 자리 (예시)</li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPolicy('고객 케어 센터')}
                  className="flex items-center min-h-11 lg:min-h-0 lg:py-1 text-left hover:text-[#100e0d] transition-colors"
                >
                  고객 케어 센터
                </button>
              </li>
            </ul>
          </div>

          {/* Links Column 3: 약관 & 정책 */}
          <div>
            <h4 className="font-sans text-xs font-bold text-[#100e0d] uppercase tracking-wider mb-3.5">
              약관 &amp; 정책
            </h4>
            <ul className="space-y-1 text-xs">
              {policyLinks.map((item) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => onOpenPolicy(item.label)}
                    className={`flex items-center min-h-11 lg:min-h-0 lg:py-1 text-left transition-colors ${
                      item.strong
                        ? 'text-[#100e0d] font-bold underline underline-offset-4'
                        : 'text-[#4d4542] hover:text-[#100e0d]'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li className="text-[#4d4542] pt-1 leading-relaxed">
                주문·결제·예약은 접수되지 않는 샘플 화면입니다
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 border-t border-[#d0c4c0]/30 flex flex-col lg:flex-row items-center justify-between gap-4 text-[11px] text-[#7f7571]">
          <p className="text-center lg:text-left">
            © 2026 MAISON ARCHITECT (가상 브랜드 샘플). ALL RIGHTS RESERVED. 실제 업체가 아니며 주문·결제는
            접수되지 않습니다.
          </p>
          <p className="text-center lg:text-right">
            대표자: 김아키 (예시) | 사업자등록번호: 000-00-00000 (예시) | 통신판매업신고 표기 자리 (예시)
          </p>
        </div>
      </div>
    </footer>
  );
};
