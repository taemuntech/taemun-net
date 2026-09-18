'use client';

import React from 'react';
import { ASSETS } from '../data/mockData';
import { SampleFooterNote } from "@/components/demo-kit/SampleFooterNote";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-inverse-surface text-surface-variant pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-[1320px] mx-auto px-4 lg:px-12 flex flex-col gap-12">
        {/* Top Branding & Info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-neutral-800">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                alt="Daechi Prestige Academic Logo"
                className="h-8 w-auto object-contain brightness-125"
                src={ASSETS.logo}
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-surface tracking-tight font-serif">
                  DAECHI PRESTIGE
                </span>
                <span className="font-label-sm text-primary-fixed-dim uppercase tracking-widest text-[10px]">
                  대치 프레스티지 의치약한 전문관 (예시)
                </span>
              </div>
            </div>
            <p className="font-body-sm text-outline-variant max-w-md leading-relaxed">
              서울 강남구 대치동 상위 0.01% 메디컬 입시 정밀 데이터 랩(예시). 오차 없는 데이터와 수학적 시각 진단으로 합격을 현실로 만듭니다.
            </p>
            <div className="flex items-center gap-2 text-xs text-primary-fixed-dim">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>누적 의치약한 합격생 142명 배출(예시)</span>
            </div>
            <p className="text-[11px] text-neutral-500">
              * 본 웹사이트의 모든 상호, 인물, 합격자 수치 및 통계는 포트폴리오 시연을 위해 구성된 가상 예시입니다.
            </p>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-3">
            <span className="font-title-md text-surface font-semibold text-sm">
              본원 캠퍼스 안내 (예시)
            </span>
            <ul className="flex flex-col gap-2 font-body-sm text-outline-variant text-xs">
              <li>서울특별시 강남구 삼성로 000 (대치역 인근, 예시)</li>
              <li>상위 0.01% 전용 1인 독립 오크 부스 60석 완비(예시)</li>
              <li>명문대 의예과 출신 1:1 디렉터진 상주(예시)</li>
              <li>학원설립·운영등록번호: 강남 제0000호 (예시)</li>
            </ul>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-title-md text-surface font-semibold text-sm">
              학부모 VIP 직통 데스크 (예시)
            </span>
            <div className="flex flex-col gap-1">
              <div className="font-display-lg-mobile text-primary-fixed-dim font-bold text-2xl">
                02-0000-0000
              </div>
              <span className="font-label-sm text-outline-variant text-xs">
                운영시간: 09:00 - 22:00 (주말 및 공휴일 심층상담 운영, 예시)
              </span>
              <span className="font-label-sm text-outline-variant text-xs">
                문의 이메일: contact@example.com
              </span>
            </div>
            <div className="pt-2 flex flex-wrap gap-2">
              <a
                href="#reservation-section"
                className="px-3.5 py-2 rounded-lg bg-surface-container-highest/20 hover:bg-surface-container-highest/30 text-surface text-xs font-semibold transition-colors min-h-[44px] flex items-center"
              >
                1:1 입학 레벨테스트 신청
              </a>
              <a
                href="#simulator"
                className="px-3.5 py-2 rounded-lg bg-primary text-on-primary text-xs font-semibold hover:bg-primary-container hover:text-on-primary-container transition-colors min-h-[44px] flex items-center"
              >
                합격 시뮬레이터 실행
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-outline font-label-sm">
          <div>
            © 2026 DAECHI PRESTIGE MEDICAL LAB. ALL RIGHTS RESERVED. DESIGNED BY 태문넷.
          </div>
          <div className="flex items-center gap-4">
            <span>개인정보처리방침(예시)</span>
            <span className="text-neutral-700">|</span>
            <span>이용약관(예시)</span>
            <span className="text-neutral-700">|</span>
            <span>교습비 반환 규정 준수(예시)</span>
          </div>
        </div>
      </div>
      <p className="mt-6 max-w-7xl mx-auto px-4 text-center text-[11px] leading-relaxed opacity-60 [word-break:keep-all]"><SampleFooterNote /></p>
    </footer>
  );
};
