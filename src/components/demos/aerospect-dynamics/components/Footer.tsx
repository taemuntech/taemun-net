import React from 'react';
import { SampleFooterNote } from '@/components/demo-kit/SampleFooterNote';
import { ScreenType } from '../types';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
  onOpenWhitepaper: () => void;
  onOpenPocModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenWhitepaper,
  onOpenPocModal,
}) => {
  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-t border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-10 pb-8 border-b border-outline-variant/30">
          <div className="max-w-md flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                AEROSPECT DYNAMICS
              </span>
            </div>
            <p className="text-on-surface-variant font-body-sm text-body-sm leading-relaxed">
              국방 표준 및 항공 규격을 준수하는 고신뢰성 완전 무인 자율 비행 로보틱스 플랫폼. 전장 감시, 산업 인프라 및 전술형 페이로드 제어를 실시간 지원합니다.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-2.5 py-1 bg-surface-container font-telemetry-code text-telemetry-code text-on-surface-variant rounded border border-outline-variant/30">
                ISO 9001 (예시)
              </span>
              <span className="px-2.5 py-1 bg-surface-container font-telemetry-code text-telemetry-code text-on-surface-variant rounded border border-outline-variant/30">
                AS9100D (예시)
              </span>
              <span className="px-2.5 py-1 bg-surface-container font-telemetry-code text-telemetry-code text-on-surface-variant rounded border border-outline-variant/30">
                MIL-STD-810H (예시)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
              <span className="font-telemetry-label text-telemetry-label text-on-surface uppercase tracking-wider font-bold">
                하드웨어 아키텍처
              </span>
              <button
                onClick={() => onNavigate('fleet')}
                className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                AP-X9 전술형 쿼드
              </button>
              <button
                onClick={() => onNavigate('fleet')}
                className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                VTOL 장거리 정찰기
              </button>
              <button
                onClick={() => onNavigate('dock-system')}
                className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                오토 도킹 인클로저
              </button>
              <button
                onClick={() => onNavigate('payloads')}
                className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                라이다 융합 페이로드
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-telemetry-label text-telemetry-label text-on-surface uppercase tracking-wider font-bold">
                지능형 관제 SW
              </span>
              <button
                onClick={() => onNavigate('solutions')}
                className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                NeuroPilot 자율 비행
              </button>
              <button
                onClick={() => onNavigate('solutions')}
                className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                엣지 AI 실시간 객체인식
              </button>
              <button
                onClick={() => onNavigate('solutions')}
                className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                LTE/5G·위성 데이터링크
              </button>
              <button
                onClick={() => onNavigate('dock-system')}
                className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                C2 전술 지휘 체계
              </button>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-telemetry-label text-telemetry-label text-on-surface uppercase tracking-wider font-bold">
                기술 규격 및 방위
              </span>
              <button
                onClick={onOpenWhitepaper}
                className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                방산 납품 실적서
              </button>
              <button
                onClick={onOpenWhitepaper}
                className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                보안 적합성 검증
              </button>
              <button
                onClick={onOpenWhitepaper}
                className="text-left font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
              >
                연구 개발 백서 (API)
              </button>
              <button
                onClick={onOpenPocModal}
                className="text-left font-body-sm text-body-sm text-secondary hover:underline transition-colors cursor-pointer font-medium"
              >
                기술 협업 문의 (PoC)
              </button>
            </div>
          </div>
        </div>

        {/* 샘플 고지 — 접을 수 없는 자리에 남긴다(?embed=true 로 화면만 직접 열어도 보인다) */}
        <div className="rounded-lg border border-outline-variant/40 bg-surface-container-low px-4 py-3 text-xs leading-relaxed text-on-surface [word-break:keep-all] mt-6">
          <span className="font-bold"><SampleFooterNote /></span>{' '}
          화면의 회사 이름·수치·기체 사양·실증 이력·인증 표기·연락처는 모두 예시이며, PoC 실증 신청 및 보고서 신청 폼은 접수되지 않습니다.
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center pt-6 gap-4 text-xs">
          <div className="flex flex-col gap-1 text-center lg:text-left">
            <span className="font-telemetry-code text-telemetry-code text-on-surface-variant">
              AEROSPECT DYNAMICS CORP. (가상 데모) | 사업자등록번호: 000-00-00000 | 대표이사: 항공시스템공학 연구소
            </span>
            <span className="font-telemetry-code text-telemetry-code text-on-surface-variant">
              본사: 대전광역시 유성구 항공우주로 테크노밸리 R&amp;D 캠퍼스 (가상 주소) | CONTACT: contact@example.com
            </span>
          </div>
          <div className="font-telemetry-code text-telemetry-code text-on-surface-variant whitespace-nowrap">
            © 2025 AEROSPECT DYNAMICS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};
