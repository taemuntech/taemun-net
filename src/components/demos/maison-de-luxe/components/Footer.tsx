import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#4d4635] bg-[#0e0e0e] px-4 lg:px-16 py-12 lg:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
        {/* Brand & Mission Column */}
        <div className="lg:col-span-4 space-y-4">
          <span className="font-serif text-xl lg:text-2xl uppercase tracking-widest text-[#f2ca50] block font-medium">
            MAISON DE LUXE
          </span>
          <p className="text-xs text-[#d0c5af] max-w-sm leading-relaxed font-light">
            메종 드 럭스는 유럽 최상위 명품 하우스 아카이브 및 3단계 다이아몬드 검수 체계를 결합한 하이엔드 온라인 럭셔리 살롱입니다. 
            고객님의 모든 오더는 진품 감정 보증 및 안심 예치로 보호됩니다.
          </p>
          <div className="pt-2 flex items-center gap-3">
            <span className="text-[10px] text-[#99907c] uppercase tracking-wider font-semibold">
              PARTNERS:
            </span>
            <span className="text-[11px] text-[#e5e2e1] tracking-wider font-semibold">
              APPRAISAL ACADEMY (예시)
            </span>
            <span className="text-[#99907c]">·</span>
            <span className="text-[11px] text-[#e5e2e1] tracking-wider font-semibold">
              PARIS ESCROW VAULT (예시)
            </span>
          </div>
        </div>

        {/* Footer Quick Links */}
        <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <div>
            <h4 className="font-serif text-sm lg:text-base text-[#f2ca50] mb-3 font-medium">
              SERVICES
            </h4>
            <ul className="space-y-2">
              <li>
                <a className="text-xs text-[#d0c5af] hover:text-[#f2ca50] transition-colors" href="#">
                  200% Authenticity Guarantee
                </a>
              </li>
              <li>
                <a className="text-xs text-[#d0c5af] hover:text-[#f2ca50] transition-colors" href="#">
                  Vault Secure Settlement
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-sm lg:text-base text-[#f2ca50] mb-3 font-medium">
              CURATION
            </h4>
            <ul className="space-y-2">
              <li>
                <a className="text-xs text-[#d0c5af] hover:text-[#f2ca50] transition-colors" href="#">
                  Private Atelier Concierge
                </a>
              </li>
              <li>
                <a className="text-xs text-[#d0c5af] hover:text-[#f2ca50] transition-colors" href="#">
                  Archival Provenance Verification
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-sm lg:text-base text-[#f2ca50] mb-3 font-medium">
              SECURITY
            </h4>
            <ul className="space-y-2">
              <li>
                <a className="text-xs text-[#d0c5af] hover:text-[#f2ca50] transition-colors" href="#">
                  Curatorial Appraisal Reports
                </a>
              </li>
              <li>
                <a className="text-xs text-[#d0c5af] hover:text-[#f2ca50] transition-colors" href="#">
                  Bespoke Insurance &amp; Logistics
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Korean Legal Compliance Footnote */}
      <div className="border-t border-[#4d4635] pt-6 pb-4 text-[10px] text-[#99907c] space-y-1.5 leading-relaxed">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[#d0c5af]">
          <span>상호명: (주)메종드럭스코리아 (예시)</span>
          <span>대표이사: 귀하</span>
          <span>사업자등록번호: 000-00-00000</span>
          <span>통신판매업신고 표기 자리 (예시)</span>
          <span>개인정보보호책임자: 아틀리에 살롱</span>
        </div>
        <div>
          <span>
            본점 소재지: 서울특별시 강남구 압구정로 000 메종 드 럭스 타워 12층 (예시) · 유럽 본부: 28 Place Vendôme, 75001 Paris, France (예시)
          </span>
        </div>
        <div>
          <span>
            고객센터: 02-0000-0000 (운영시간: 평일 09:30 ~ 18:30, VIP 컨시어지 365일 연중무휴) · 전자우편: concierge@example.com
          </span>
        </div>
      </div>

      {/* Copyright Text */}
      <div className="flex flex-col lg:flex-row items-center justify-between pt-4 border-t border-[#4d4635] text-[10px] text-[#99907c]">
        <p>© 2025 MAISON DE LUXE ARCHIVAL SALON. ALL RIGHTS RESERVED. 200% AUTHENTICITY APPRAISED &amp; BONDED ASSURANCE.</p>
        <div className="flex gap-4 mt-2 lg:mt-0">
          <a className="hover:text-[#f2ca50] transition-colors" href="#">이용약관</a>
          <a className="hover:text-[#f2ca50] transition-colors" href="#">개인정보처리방침</a>
          <a className="hover:text-[#f2ca50] transition-colors" href="#">구매자안심보증서비스</a>
        </div>
      </div>
    </footer>
  );
};
