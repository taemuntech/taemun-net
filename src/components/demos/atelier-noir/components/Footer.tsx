import React from 'react';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";

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
                입고 검수 절차
              </div>
              <div className="text-[#8f9378] text-[11px]">
                입고 상품을 검수한 뒤 판매하는 절차 (예시 정책)
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-2">
            <span className="material-symbols-outlined text-[#caf300] text-[28px]">
              local_shipping
            </span>
            <div className="text-left">
              <div className="font-label-sm text-xs text-[#ffffff] font-bold">
                반품 &amp; 교환 안내
              </div>
              <div className="text-[#8f9378] text-[11px]">
                사이즈 교환 절차를 적는 자리 (예시 정책)
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-2">
            <span className="material-symbols-outlined text-[#caf300] text-[28px]">
              shield
            </span>
            <div className="text-left">
              <div className="font-label-sm text-xs text-[#ffffff] font-bold">
                카드 · 간편결제 연동
              </div>
              <div className="text-[#8f9378] text-[11px]">
                샘플 화면이라 실제 결제는 이루어지지 않습니다
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
                미리 적어 둔 예시 답변으로 도는 샘플 상담 화면
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
            <p>대표이사: 홍길동 (예시) | 개인정보보호책임자: 홍길동 (예시)</p>
            <p>사업자등록번호: 000-00-00000 (예시) | 통신판매업 신고번호: 제0000-서울○○-0000호 (예시)</p>
            <p>사업장 소재지: 서울특별시 ○○구 ○○로 000, 0층 (예시)</p>
          </div>
        </div>

        {/* Regulatory & Policy Links (Col 5-8) */}
        <div className="col-span-12 lg:col-span-4">
          <h3 className="font-headline-sm text-sm text-[#ffffff] font-semibold mb-3 tracking-wider">
            REGULATORY &amp; POLICIES
          </h3>
          <ul className="space-y-2 font-label-sm text-xs text-[#8f9378]">
            <li>
              <button
                onClick={() => onOpenPolicy('이용약관 및 개인정보처리방침')}
                className="hover:text-[#ffffff] underline transition-colors text-left min-h-11 flex items-center"
              >
                TERMS OF USE &amp; PRIVACY POLICY
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenPolicy('결제 및 보안 안내')}
                className="hover:text-[#ffffff] underline transition-colors text-left min-h-11 flex items-center"
              >
                PAYMENT &amp; SECURITY
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenPolicy('사업자정보 안내')}
                className="hover:text-[#ffffff] underline transition-colors text-left min-h-11 flex items-center"
              >
                BUSINESS INFORMATION
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenPolicy('입고 검수 절차 안내')}
                className="hover:text-[#ffffff] underline transition-colors text-left min-h-11 flex items-center"
              >
                INBOUND QUALITY CHECK
              </button>
            </li>
            <li>
              <button
                onClick={() => onOpenPolicy('배송 및 교환/환불 규정 안내')}
                className="hover:text-[#ffffff] underline transition-colors text-left min-h-11 flex items-center"
              >
                SHIPPING &amp; RETURN POLICIES
              </button>
            </li>
            <li>
              <button
                onClick={onOpenConcierge}
                className="hover:text-[#ffffff] underline transition-colors text-left min-h-11 flex items-center"
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
              1588-0000 <span className="text-sm font-normal text-[#8f9378]">(예시 번호)</span>
            </div>
            <p className="font-label-sm text-[#8f9378] text-[11px] mb-4">
              평일 10:00 - 18:00 (점심시간 12:30 - 13:30) / 주말 및 공휴일 휴무
            </p>
            <button
              onClick={onOpenConcierge}
              className="inline-flex items-center gap-2 bg-[#1f2021] hairline-all px-4 min-h-11 py-2.5 text-xs font-label-sm hover:border-[#caf300] text-[#ffffff] transition-colors cursor-pointer"
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
                간편결제 A (예시)
              </span>
              <span className="px-2.5 py-1 hairline-all bg-[#121314] text-[#ffffff]">
                간편결제 B (예시)
              </span>
              <span className="px-2.5 py-1 hairline-all bg-[#121314] text-[#ffffff]">
                간편결제 C (예시)
              </span>
              <span className="px-2.5 py-1 hairline-all bg-[#121314] text-[#ffffff]">
                계좌이체 (예시)
              </span>
              <span className="px-2.5 py-1 hairline-all bg-[#121314] text-[#8f9378]">
                신용 · 체크카드 (예시)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Sub-Footer */}
      <div className="hairline-t py-4 px-4 lg:px-6 bg-[#0d0e0f]">
        <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row justify-between items-center text-[#8f9378] font-label-sm text-[11px] gap-2">
          <div><SampleFooterNote /></div>
          <div className="flex items-center gap-4">
            <span>SAMPLE SITE · 태문 DEV STUDIO</span>
            <span>회사 정보 · 번호는 모두 예시입니다</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
