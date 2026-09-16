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
                src="https://lh3.googleusercontent.com/aida/AEtjO1VmxE1YrHr6FSfXDIw14QsD1V3JIe0Ck4q3cfeFVfd4EbLtTBx7_KadPpwjs0q1KHmbRMpjVCfbhWsZOT2tv0EPXTdBRIOhEnhS5jvTk55yKbi-kook61H20rogooepq7PkV_QfZtyE2BbpjP-ve486vVVQOYKRcagqCyo2ljD2yhnvudc8Ssbr1972RWC-7QWDitjVDML6VeY1kSbqkn6RMgUa1TPZbMXG8_udOA90Slp6SrdSPIaSkpw"
                alt="VERDE GOURMET Brand Logo"
                className="w-8 h-8 rounded object-contain"
              referrerPolicy="no-referrer" />
              <span className="text-xl font-bold text-primary">VERDE GOURMET</span>
            </div>
            <p className="text-[13px] text-on-surface-variant max-w-md">
              베르데 고메는 전국의 장인 생산자와 도시의 미식가를 온전한 온도로 연결하는 샛별배송 프리미엄 마켓입니다.
            </p>
            <div className="pt-2 text-xs font-mono text-primary font-bold">
              고객만족센터 1644-8920
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
                <li><a href="#" className="hover:text-primary transition-colors">100% 환불보증 정책</a></li>
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
                <li><a href="#" className="hover:text-primary transition-colors">에스크로 구매안전서비스</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Legal Info */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs text-on-surface-variant">
          <div>
            <p className="text-[11px] font-mono text-outline leading-relaxed">
              주식회사 베르데고메 | 대표이사: 권우성 | 사업자등록번호: 214-88-92102 | 통신판매업신고: 제 2025-서울용산-0192호<br />
              사업장소재지: 서울특별시 용산구 한남대로 98 베르데빌딩 4층 | 개인정보보호책임자: 최현식
            </p>
            <p className="mt-2 text-[11px] font-mono font-medium text-primary">
              © 2025 VERDE GOURMET INC. ALL RIGHTS RESERVED. 100% 생분해성 에코 패키징 및 안심 콜드체인 보증.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="inline-flex items-center gap-1 bg-surface-container px-3 py-1.5 rounded text-[11px] font-mono border border-outline-variant">
              <span className="material-symbols-outlined text-secondary text-sm">lock</span>
              토스페이먼츠 구매안전 에스크로 가입
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
