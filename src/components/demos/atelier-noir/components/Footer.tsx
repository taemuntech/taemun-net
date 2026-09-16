import React from 'react';

interface FooterProps {
  onOpenConcierge: () => void;
  onOpenPolicy: (title: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenConcierge,
  onOpenPolicy,
}) => {
  return (
    <footer className="bg-[#0d0e0f] text-[#e3e2e3] hairline-t">
      {/* Trust Guarantee Badges Row */}
      <div className="hairline-b bg-[#1f2021] py-4">
        <div className="max-w-[1920px] mx-auto px-4 lg:px-6 grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-3 p-2">
            <span className="material-symbols-outlined text-[#caf300] text-[28px]">
              verified
            </span>
            <div className="text-left">
              <div className="font-label-sm text-xs text-[#ffffff] font-bold">
                100% 정품 보증 · 200% 책임보상제
              </div>
              <div className="text-[#8f9378] text-[11px]">
                가품 발견 즉시 결제금액 200% 보상 환불
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-2">
            <span className="material-symbols-outlined text-[#caf300] text-[28px]">
              local_shipping
            </span>
            <div className="text-left">
              <div className="font-label-sm text-xs text-[#ffffff] font-bold">
                무료 반품 &amp; 교환 안심케어
              </div>
              <div className="text-[#8f9378] text-[11px]">
                사이즈 미스 시 1회 왕복 무료배송 교환 지원
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-2">
            <span className="material-symbols-outlined text-[#caf300] text-[28px]">
              shield
            </span>
            <div className="text-left">
              <div className="font-label-sm text-xs text-[#ffffff] font-bold">
                토스페이먼츠 에스크로 결제보호
              </div>
              <div className="text-[#8f9378] text-[11px]">
                고객님의 결제 대금을 배송완료까지 안전 예치
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-2">
            <span className="material-symbols-outlined text-[#caf300] text-[28px]">
              support_agent
            </span>
            <div className="text-left">
              <div className="font-label-sm text-xs text-[#ffffff] font-bold">
                1:1 VIP 컨시어지 케어
              </div>
              <div className="text-[#8f9378] text-[11px]">
                패션 전문 큐레이터 1:1 스타일링 실시간 상담
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="w-full px-4 lg:px-6 py-12 lg:py-16 mx-auto max-w-[1920px] grid grid-cols-12 gap-8 lg:gap-12">
        {/* Brand & Corporate (Col 1-4) */}
        <div className="col-span-12 lg:col-span-4">
          <div className="font-headline-md text-xl lg:text-2xl font-bold tracking-tight text-[#ffffff] uppercase mb-3">
            ATELIER NOIR
          </div>
          <p className="font-body-sm text-xs text-[#c5c9ac] max-w-sm mb-4 leading-relaxed">
            (주)아틀리에 누아르는 국내외 하이엔드 디자이너 레이블과 동시대 컨템포러리 패션을 선별하여 선보이는 프리미엄 셀렉트 숍 플랫폼입니다.
          </p>
          <div className="text-[#8f9378] font-label-sm text-[11px] space-y-1">
            <p>대표이사: 한태민 | 개인정보보호책임자: 김진서</p>
            <p>사업자등록번호: 214-88-09821 | 통신판매업 신고번호: 제2025-서울강남-0814호</p>
            <p>사업장 소재지: 서울특별시 강남구 도산대로 411 아틀리에빌딩 8층</p>
          </div>
        </div>

        {/* Regulatory & Escrow Links (Col 5-8) */}
        <div className="col-span-12 lg:col-span-4">
          <h3 className="font-headline-sm text-sm text-[#ffffff] font-semibold mb-3 tracking-wider">
            REGULATORY &amp; POLICIES
          </h3>
          <ul className="space-y-2 font-label-sm text-xs text-[#8f9378]">
            <li>
              <button
                onClick={() => onOpenPolicy('이용약관 및 개인정보처리방침')}
                className="hover:text-[#ffffff] underline transition-colors text-left"
              >
                TERMS OF USE &amp; PRIVACY POLICY
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenPolicy('토스페이먼츠 구매안전 에스크로')}
                className="hover:text-[#ffffff] underline transition-colors text-left"
              >
                ESCROW GUARANTEE (TOSS PAYMENTS)
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenPolicy('공정거래위원회 사업자정보확인')}
                className="hover:text-[#ffffff] underline transition-colors text-left"
              >
                KOREA FTC BUSINESS VERIFICATION
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenPolicy('200% 정품 보증제도')}
                className="hover:text-[#ffffff] underline transition-colors text-left"
              >
                AUTHENTICITY GUARANTEE 200%
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenPolicy('배송 및 교환/환불 규정 안내')}
                className="hover:text-[#ffffff] underline transition-colors text-left"
              >
                SHIPPING &amp; RETURN POLICIES
              </button>
            </li>
            <li>
              <button
                onClick={onOpenConcierge}
                className="hover:text-[#ffffff] underline transition-colors text-left"
              >
                GLOBAL CONCIERGE &amp; CS CENTER
              </button>
            </li>
          </ul>
        </div>

        {/* CS Center & Payment System (Col 9-12) */}
        <div className="col-span-12 lg:col-span-4 flex flex-col justify-between">
          <div>
            <h3 className="font-headline-sm text-sm text-[#ffffff] font-semibold mb-1 tracking-wider">
              CUSTOMER CENTER
            </h3>
            <div className="font-display-hero text-2xl lg:text-3xl font-bold text-[#caf300] mb-1">
              1544-0982
            </div>
            <p className="font-label-sm text-[#8f9378] text-[11px] mb-4">
              평일 10:00 - 18:00 (점심시간 12:30 - 13:30) / 주말 및 공휴일 휴무
            </p>
            <button
              onClick={onOpenConcierge}
              className="inline-flex items-center gap-2 bg-[#1f2021] hairline-all px-4 py-2.5 text-xs font-label-sm hover:border-[#caf300] text-[#ffffff] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] text-[#caf300]">chat</span>
              <span>1:1 라이브 컨시어지 상담</span>
            </button>
          </div>

          {/* Payment Badges Supported */}
          <div className="mt-6 pt-4 hairline-t">
            <div className="font-label-sm text-[10px] text-[#8f9378] mb-2 uppercase">
              SECURE PAYMENT OPTIONS:
            </div>
            <div className="flex flex-wrap items-center gap-2 font-label-sm text-[11px]">
              <span className="px-2.5 py-1 hairline-all bg-[#121314] text-[#ffffff]">
                NAVER PAY
              </span>
              <span className="px-2.5 py-1 hairline-all bg-[#121314] text-[#ffffff]">
                KAKAO PAY
              </span>
              <span className="px-2.5 py-1 hairline-all bg-[#121314] text-[#ffffff]">
                TOSS PAY
              </span>
              <span className="px-2.5 py-1 hairline-all bg-[#121314] text-[#ffffff]">
                SAMSUNG PAY
              </span>
              <span className="px-2.5 py-1 hairline-all bg-[#121314] text-[#8f9378]">
                VISA / MASTER
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Sub-Footer */}
      <div className="hairline-t py-4 px-4 lg:px-6 bg-[#0d0e0f]">
        <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row justify-between items-center text-[#8f9378] font-label-sm text-[11px] gap-2">
          <div>
            © 2025 ATELIER NOIR CO., LTD. ALL RIGHTS RESERVED. SECURE ESCROW ENABLED.
          </div>
          <div className="flex items-center gap-4">
            <span>KOREA INTELLECTUAL PROPERTY REGISTERED</span>
            <span>SSL 256-BIT ENCRYPTION</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
