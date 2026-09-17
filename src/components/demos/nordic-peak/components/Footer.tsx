import React from 'react';
import { BRAND_LOGO_URL, CATEGORIES } from '../data/products';

interface FooterProps {
  /** 분류를 골라 목록으로 데려간다 — 빈 앵커 주소로 아무 일도 안 하는 링크를 두지 않는다 */
  onSelectCategory: (category: string) => void;
  /** 페이지 안 구역으로 데려간다 */
  onGoToSection: (id: string) => void;
  onOpenSearch: () => void;
}

const linkClass =
  'min-h-11 lg:min-h-0 lg:py-0.5 inline-flex items-center text-left hover:text-on-surface transition-colors cursor-pointer';

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onGoToSection, onOpenSearch }) => {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-outline-variant">
          {/* 브랜드·사업자 표기 */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                alt="NORDIC PEAK 브랜드 로고 (가상 브랜드)"
                className="w-8 h-8 object-contain rounded-sm border border-outline-variant"
                src={BRAND_LOGO_URL}
                referrerPolicy="no-referrer"
              />
              <span className="font-headline-sm text-headline-sm font-bold tracking-widest text-on-surface uppercase">
                NORDIC PEAK
              </span>
            </div>
            <p className="font-body-md text-body-md text-outline leading-relaxed max-w-md [word-break:keep-all]">
              노르딕 피크는 극지 원정대원·고산 알피니스트·부시크래프트 이용자를 위한 택티컬 아웃도어
              기어 브랜드라는 설정으로 만든 가상 브랜드입니다. 화면의 상호·사양·수치는 모두 예시이며
              실제 업체가 아닙니다.
            </p>
            <div className="font-label-mono-sm text-label-mono-sm text-on-surface-variant space-y-1">
              <div>운영사: (주)노르딕피크 익스페디션 코리아 (예시) | 대표: 표기 자리 (예시)</div>
              <div>사업자등록번호: 000-00-00000 | 통신판매업신고: 표기 자리 (예시)</div>
              <div>본사 및 필드 랩: 강원특별자치도 평창군 대관령면 (주소 표기 자리 · 예시)</div>
            </div>
          </div>

          {/* 기어 아카이브 — 누르면 실제로 그 분류가 걸린다 */}
          <div className="lg:col-span-2">
            <h4 className="font-label-mono-md text-label-mono-md font-bold uppercase mb-3 text-primary">
              기어 아카이브
            </h4>
            <ul className="space-y-1 lg:space-y-2 font-label-mono-sm text-label-mono-sm text-outline">
              {CATEGORIES.map((c) => (
                <li key={c.key}>
                  <button type="button" className={linkClass} onClick={() => onSelectCategory(c.key)}>
                    {c.shortLabel}
                  </button>
                </li>
              ))}
              <li>
                <button type="button" className={linkClass} onClick={onOpenSearch}>
                  기어 통합 검색
                </button>
              </li>
            </ul>
          </div>

          {/* 원정대 케어 — 누르면 해당 구역으로 데려간다 */}
          <div className="lg:col-span-2">
            <h4 className="font-label-mono-md text-label-mono-md font-bold uppercase mb-3 text-primary">
              원정대 케어
            </h4>
            <ul className="space-y-1 lg:space-y-2 font-label-mono-sm text-label-mono-sm text-outline">
              <li>
                <button type="button" className={linkClass} onClick={() => onGoToSection('field-service')}>
                  수리·보증 정책 안내
                </button>
              </li>
              <li>
                <button type="button" className={linkClass} onClick={() => onGoToSection('field-service')}>
                  설산 긴급 부품 지원
                </button>
              </li>
              <li>
                <button type="button" className={linkClass} onClick={() => onGoToSection('field-service')}>
                  폴대 리페어 센터 안내
                </button>
              </li>
              <li>
                <button type="button" className={linkClass} onClick={() => onGoToSection('dimension-sim')}>
                  피칭 설계도 보기
                </button>
              </li>
              <li>
                <button type="button" className={linkClass} onClick={() => onGoToSection('gear-showcase')}>
                  전체 라인업 보기
                </button>
              </li>
            </ul>
          </div>

          {/* 고객 지원 */}
          <div className="lg:col-span-3 bg-surface-container p-4 rounded-sm border border-outline-variant">
            <div className="font-label-mono-sm text-label-mono-sm text-tertiary mb-1 font-bold">
              OPERATOR DESK // 고객 지원 센터
            </div>
            <div className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight mb-1">
              02-0000-0000
            </div>
            <p className="font-body-sm text-body-sm text-outline mb-3">
              평일 09:30 - 18:00 (점심시간 12:30 - 13:30)
              <br />
              동계 시즌 주말 현장 지원 운영 (예시 안내)
            </p>
            <div className="pt-2 border-t border-outline-variant text-outline font-label-mono-sm text-label-mono-sm [word-break:keep-all]">
              이 화면은 샘플 사이트입니다 — 주문·결제는 접수되지 않고, 입력하신 내용은 어디에도
              전송되지 않습니다.
            </div>
          </div>
        </div>

        {/* 저작권·하단 메뉴 */}
        <div className="pt-6 flex flex-col lg:flex-row justify-between items-center gap-4 text-center lg:text-left">
          <div className="font-label-mono-sm text-label-mono-sm text-outline [word-break:keep-all]">
            © 2026 NORDIC PEAK EXPEDITION GEAR — 가상 브랜드 샘플입니다. 실제 업체가 아닙니다.
          </div>
          <div className="flex items-center gap-x-4 font-label-mono-sm text-label-mono-sm text-outline flex-wrap justify-center">
            <button type="button" className={linkClass} onClick={() => onGoToSection('dimension-sim')}>
              Expedition Standards
            </button>
            <span className="text-outline-variant">·</span>
            <button type="button" className={linkClass} onClick={() => onGoToSection('field-service')}>
              Warranty Policy
            </button>
            <span className="text-outline-variant">·</span>
            <button type="button" className={linkClass} onClick={() => onGoToSection('field-service')}>
              Field Repair Service
            </button>
            <span className="text-outline-variant">·</span>
            <button type="button" className={linkClass} onClick={() => onGoToSection('gear-showcase')}>
              Gear Lineup
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
