import React from 'react';

interface FooterProps {
  /** 이 지면 안에 실제로 있는 구역으로 보낸다 */
  onScrollTo: (sectionId: string) => void;
  /** 샘플이라 문서가 없는 자리 — 눌리면 무엇이 없는지 그 자리에서 알려 준다 */
  onNotice: (message: string) => void;
}

/**
 * 푸터 링크는 예전에 전부 빈 앵커 주소였다 — 11개가 눌러도 아무 일이 없었다.
 * 지금은 셋 중 하나다: (1) 이 지면의 실제 구역으로 스크롤, (2) 무엇이 없는지 알리는 안내,
 * (3) 링크가 아니라 글자. 「준비 중」이라고 적지 않는다.
 */
type FooterLink =
  | { label: string; to: string; strong?: boolean }
  | { label: string; notice: string; strong?: boolean };

const LINK_GROUPS: ReadonlyArray<{ heading: string; links: ReadonlyArray<FooterLink> }> = [
  {
    heading: '서비스 안내',
    links: [
      { label: '회사소개', notice: '가상 브랜드 샘플이라 회사소개 페이지는 들어 있지 않습니다.' },
      { label: '골든 콜드체인 철학', to: 'coldchain-inspection', strong: true },
      { label: '친환경 배송 포장재', to: 'verde-pillars' },
      { label: '입점문의', notice: '샘플 사이트라 입점문의 접수는 동작하지 않습니다.' }
    ]
  },
  {
    heading: '고객 지원',
    links: [
      { label: '고객만족센터', notice: '화면의 고객센터 번호는 예시 표기입니다 — 연결되지 않습니다.' },
      { label: '교환·환불 안내', to: 'verde-pillars' },
      { label: '대량주문 B2B 상담', notice: '샘플 사이트라 B2B 상담 접수는 동작하지 않습니다.' },
      { label: '자주 묻는 질문(FAQ)', notice: '가상 브랜드 샘플이라 FAQ 문서는 들어 있지 않습니다.' }
    ]
  },
  {
    heading: '약관 및 정책',
    links: [
      { label: '이용약관', notice: '샘플 사이트라 약관 문서는 들어 있지 않습니다.' },
      { label: '개인정보처리방침', notice: '샘플 사이트라 개인정보처리방침 문서는 들어 있지 않습니다.', strong: true },
      { label: '전자금융거래 기본약관', notice: '샘플 사이트라 약관 문서는 들어 있지 않습니다.' },
      { label: '결제 이용안내', notice: '샘플 사이트라 결제가 연동돼 있지 않습니다 — 주문은 접수되지 않습니다.' }
    ]
  }
];

export const Footer: React.FC<FooterProps> = ({ onScrollTo, onNotice }) => {
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
            {LINK_GROUPS.map((group) => (
              <div key={group.heading}>
                <h4 className="font-bold text-primary mb-2 text-sm">{group.heading}</h4>
                <ul className="text-on-surface-variant">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <button
                        type="button"
                        onClick={() => ('to' in link ? onScrollTo(link.to) : onNotice(link.notice))}
                        className={`inline-flex min-h-11 items-center text-left hover:text-primary transition-colors ${ link.strong ? 'font-bold text-secondary' : '' }`}
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
            {/* 결제 안전장치를 뜻하는 말은 법에 요건이 걸려 있어 쓰지 않는다 — 연동 표시라고만 적는다 */}
            <span className="inline-flex items-center gap-1 bg-surface-container px-3 py-1.5 rounded text-[11px] font-mono border border-outline-variant">
              <span className="material-symbols-outlined text-secondary text-sm">lock</span>
              결제대행사(예시) 연동 표시
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
