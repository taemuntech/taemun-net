import React from 'react';
import { BRAND_LOGO_URL } from '../data/products';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-outline-variant">
          {/* Brand identity & HQ Contact */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img
                alt="NORDIC PEAK Brand Logo"
                className="w-8 h-8 object-contain rounded-sm border border-outline-variant"
                src={BRAND_LOGO_URL} referrerPolicy="no-referrer" />
              <span className="font-headline-sm text-headline-sm font-bold tracking-widest text-on-surface uppercase">
                NORDIC PEAK
              </span>
            </div>
            <p className="font-body-md text-body-md text-outline leading-relaxed max-w-md">
              노르딕 피크는 극지 원정대원, 고산 알파이니스트, 부시크래프트 전문가들을 위해 탄생한 하이엔드 택티컬 아웃도어 기어 전문 브랜드입니다. 자연의 거친 힘 앞에서도 타협 없는 엔지니어링을 증명합니다.
            </p>
            <div className="font-label-mono-sm text-label-mono-sm text-on-surface-variant space-y-1">
              <div>운영사: (주)노르딕피크 익스페디션 코리아 (예시) | 대표이사: 귀하</div>
              <div>사업자등록번호: 000-00-00000 | 통신판매업신고: 표기 자리 (예시)</div>
              <div>본사 및 필드 랩: 강원특별자치도 평창군 대관령면 경강로 5120 노르딕 피크 베이스랩</div>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="lg:col-span-2">
            <h4 className="font-label-mono-md text-label-mono-md font-bold text-on-surface uppercase mb-3 text-primary">
              기어 아카이브
            </h4>
            <ul className="space-y-2 font-label-mono-sm text-label-mono-sm text-outline">
              <li>
                <a className="hover:text-on-surface transition-colors" href="#">
                  지오데식 텐트 라인
                </a>
              </li>
              <li>
                <a className="hover:text-on-surface transition-colors" href="#">
                  실타프 &amp; 익스텐션
                </a>
              </li>
              <li>
                <a className="hover:text-on-surface transition-colors" href="#">
                  7075 듀랄루민 체어
                </a>
              </li>
              <li>
                <a className="hover:text-on-surface transition-colors" href="#">
                  Grade 1 순수 티타늄
                </a>
              </li>
              <li>
                <a className="hover:text-on-surface transition-colors" href="#">
                  극한기 구스다운 1000FP
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2: Warranty & Support */}
          <div className="lg:col-span-2">
            <h4 className="font-label-mono-md text-label-mono-md font-bold text-on-surface uppercase mb-3 text-primary">
              원정대 케어
            </h4>
            <ul className="space-y-2 font-label-mono-sm text-label-mono-sm text-outline">
              <li>
                <a className="hover:text-on-surface transition-colors" href="#">
                  평생 보증 가이드
                </a>
              </li>
              <li>
                <a className="hover:text-on-surface transition-colors" href="#">
                  설산 긴급 부품 지원
                </a>
              </li>
              <li>
                <a className="hover:text-on-surface transition-colors" href="#">
                  폴대 리페어 센터 접수
                </a>
              </li>
              <li>
                <a className="hover:text-on-surface transition-colors" href="#">
                  원단 발수/심실링 복원
                </a>
              </li>
              <li>
                <a className="hover:text-on-surface transition-colors" href="#">
                  B2B 알핀 원정대 협찬
                </a>
              </li>
            </ul>
          </div>

          {/* Emergency Customer Center */}
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
              동계 설산 시즌 주말 현장 응급 핫라인 운영
            </p>
            <div className="pt-2 border-t border-outline-variant flex items-center justify-between text-outline font-label-mono-sm text-label-mono-sm">
              <span>구매자 안심 결제 가동 중</span>
              <span className="text-primary font-bold">안심 구매 보호 (예시)</span>
            </div>
          </div>
        </div>

        {/* Copyright & Bottom Nav links */}
        <div className="pt-6 flex flex-col lg:flex-row justify-between items-center gap-4 text-center lg:text-left">
          <div className="font-label-mono-sm text-label-mono-sm text-outline">
            © 2024 NORDIC PEAK EXPEDITION GEAR. ALL RIGHTS RESERVED. MIL-SPEC TESTED.
          </div>
          <div className="flex items-center gap-4 font-label-mono-sm text-label-mono-sm text-outline flex-wrap justify-center">
            <a className="hover:text-on-surface transition-colors" href="#">
              Expedition Standards
            </a>
            <span className="text-outline-variant">·</span>
            <a className="hover:text-on-surface transition-colors" href="#">
              Lifetime Warranty
            </a>
            <span className="text-outline-variant">·</span>
            <a className="hover:text-on-surface transition-colors" href="#">
              Field Repair Service
            </a>
            <span className="text-outline-variant">·</span>
            <a className="hover:text-on-surface transition-colors" href="#">
              Tactical Support
            </a>
            <span className="text-outline-variant">·</span>
            <a className="hover:text-on-surface transition-colors" href="#">
              Contact HQ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
