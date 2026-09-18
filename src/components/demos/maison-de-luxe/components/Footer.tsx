import React from 'react';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";

// 걷어낸 것: 빈 앵커 주소 링크 10개(전부 아무 데도 안 갔다) · 「200% Authenticity Guarantee」·「Vault Secure
// Settlement」(지킬 수 없는 보증·결제대금예치 표기) · 「PARIS ESCROW VAULT」 · 실존 주소(28 Place Vendôme).
// 남는 링크는 이 페이지에 실제로 있는 구역으로만 간다. 이용약관·개인정보처리방침은 샘플에 없으니 링크도 없앴다.

const FOOTER_GROUPS: Array<{ title: string; links: Array<{ label: string; to: string }> }> = [
  {
    title: 'COLLECTION',
    links: [
      { label: '아카이브 컬렉션 보기', to: 'collection' },
      { label: '검수 이력 조회 안내', to: 'ledger' },
    ],
  },
  {
    title: 'AUTHENTICATION',
    links: [
      { label: '3단계 검수 시스템', to: 'inspection' },
      { label: '봉인 태그 · 이력서', to: 'inspection' },
    ],
  },
  {
    title: 'SERVICE',
    links: [
      { label: '살롱 패키징', to: 'packaging' },
      { label: '컨시어지 대면 배송', to: 'packaging' },
    ],
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#4d4635] bg-[#0e0e0e] py-12 lg:py-16">
      {/* 배경·위 구분선은 화면 끝까지, 내용은 1280(max-w-7xl) 안 */}
      <div className="max-w-7xl mx-auto px-4 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-serif text-xl lg:text-2xl uppercase tracking-widest text-[#f2ca50] block font-medium">
              MAISON DE LUXE
            </span>
            <p className="text-xs text-[#d0c5af] max-w-sm leading-relaxed font-light [word-break:keep-all]"><SampleFooterNote /></p>
            <div className="pt-2 flex items-center gap-3 flex-wrap">
              <span className="text-[10px] text-[#99907c] uppercase tracking-wider font-semibold">PARTNERS:</span>
              <span className="text-[11px] text-[#e5e2e1] tracking-wider font-semibold">
                APPRAISAL ACADEMY (예시)
              </span>
              <span className="text-[#99907c]">·</span>
              <span className="text-[11px] text-[#e5e2e1] tracking-wider font-semibold">
                SECURE LOGISTICS (예시)
              </span>
            </div>
          </div>

          {/* Footer Quick Links — 전부 이 페이지 안 구역으로 간다 */}
          <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {FOOTER_GROUPS.map((group) => (
              <div key={group.title}>
                <h4 className="font-serif text-sm lg:text-base text-[#f2ca50] mb-3 font-medium">{group.title}</h4>
                <ul className="space-y-1">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        className="text-xs text-[#d0c5af] hover:text-[#f2ca50] transition-colors inline-flex items-center min-h-11 lg:min-h-0 lg:py-1 [word-break:keep-all]"
                        href={`#${link.to}`}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Korean Legal Compliance Footnote — 전부 예시 자리표시다 */}
        <div className="border-t border-[#4d4635] pt-6 pb-4 text-[10px] text-[#99907c] space-y-1.5 leading-relaxed">
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[#d0c5af]">
            <span>상호명: (주)메종드럭스코리아 (예시)</span>
            <span>대표이사: 표기 자리 (예시)</span>
            <span>사업자등록번호: 000-00-00000</span>
            <span>통신판매업신고 표기 자리 (예시)</span>
            <span>개인정보보호책임자: 표기 자리 (예시)</span>
          </div>
          <div>
            <span className="[word-break:keep-all]">
              본점 소재지: 서울특별시 ○○구 ○○로 000 메종 드 럭스 타워 12층 (예시) · 유럽 사무소: 파리 1구 (예시)
            </span>
          </div>
          <div>
            <span className="[word-break:keep-all]">
              고객센터: 02-0000-0000 (평일 09:30 ~ 18:30) · 전자우편: concierge@example.com
            </span>
          </div>
        </div>

        {/* Copyright Text */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-2 pt-4 border-t border-[#4d4635] text-[10px] text-[#99907c] text-center lg:text-left">
          <p className="[word-break:keep-all]">태문넷 제작 샘플 · 실제 거래는 이루어지지 않습니다</p>
        </div>
      </div>
    </footer>
  );
};
