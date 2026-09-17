import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-container-low text-primary border-t border-outline-variant mt-16">
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-12 py-10">
        {/* Footer Top Tier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10 pb-8 border-b border-outline-variant/70">
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src="/demo-media/verde-gourmet/verde-gourmet-08.png"
                alt="VERDE GOURMET Brand Logo"
                className="w-8 h-8 rounded object-contain"
              referrerPolicy="no-referrer" />
              <span className="text-xl font-bold text-primary">VERDE GOURMET</span>
            </div>
            <p className="text-[13px] text-on-surface-variant max-w-md">
              베르데 고메는 전국의 장인 생산자와 도시의 미식가를 온전한 온도로 연결하는 새벽배송 프리미엄 마켓입니다.
            </p>
            <div className="pt-2 text-xs font-mono text-primary font-bold">
              고객만족센터 1588-0000 (예시)
              <span className="text-[12px] font-sans font-normal text-on-surface-variant ml-2">
                (오전 07:00 ~ 오후 23:00 연중무휴)
              </span>
            </div>
          </div>

          {/* Footer Links */}
          <div className="lg:col-span-7 grid grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
            <div>
              <h4 className="font-bold text-primary mb-3 text-sm">서비스 안내</h4>
              <ul className="space-y-2 text-on-surface-variant">
                <li><a href="#" className="hover:text-primary transition-colors">회사소개</a></li>
                <li><a href="#coldchain-inspection" className="hover:text-primary transition-colors font-bold text-secondary">골든 콜드체인 철학</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">친환경 배송 포장재</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">입점문의</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-3 text-sm">고객 지원</h4>
              <ul className="space-y-2 text-on-surface-variant">
                <li><a href="#" className="hover:text-primary transition-colors">고객만족센터</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">교환·환불 정책</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">대량주문 B2B 상담</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">자주 묻는 질문(FAQ)</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-primary mb-3 text-sm">약관 및 정책</h4>
              <ul className="space-y-2 text-on-surface-variant">
                <li><a href="#" className="hover:text-primary transition-colors">이용약관</a></li>
                <li><a href="#" className="hover:text-primary transition-colors font-bold">개인정보처리방침</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">전자금융거래 기본약관</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">안전결제 이용안내</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Legal Info */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs text-on-surface-variant">
          <div>
            {/* 회사 정보는 전부 자리표시 — 지어낸 사업자등록번호·신고번호·주소는 실존 값과 부딪힌다 */}
            <p className="text-[11px] font-mono text-outline leading-relaxed">
              주식회사 베르데고메 (예시) | 대표이사: 홍길동 (예시) | 사업자등록번호: 000-00-00000 (예시) | 통신판매업신고번호: 예시 표기<br />
              사업장소재지: 서울특별시 ○○구 ○○로 00, 0층 (예시 주소) | 개인정보보호책임자: 홍길동 (예시)
            </p>
            <p className="mt-2 text-[11px] font-mono font-medium text-primary">
              © VERDE GOURMET (가상 브랜드 샘플). 화면의 회사명·번호·주소는 모두 예시입니다.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-1 bg-surface-container px-3 py-1.5 rounded text-[11px] font-mono border border-outline-variant">
              <span className="material-symbols-outlined text-secondary text-sm">lock</span>
              결제대행사(예시) 안전결제 연동 표시
            </span>
          </div>
        </div>

        {/* 샘플 고지 — 상단 툴바를 접거나 ?embed=true 로 화면만 열어도 남아야 하는 표시 */}
        <p className="mt-6 rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 text-[11px] leading-relaxed text-on-surface-variant">
          이 사이트는 태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며, 화면의 회사명·상품·산지·가격·후기 수·온도
          기록·연락처는 모두 예시입니다. 주문·배송지 조회 폼은 접수되지 않습니다.
        </p>
      </div>
    </footer>
  );
};
