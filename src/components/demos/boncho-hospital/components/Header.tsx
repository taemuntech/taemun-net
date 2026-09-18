import React, { useState } from 'react';
import { AVAILABLE_HARMONY, AVAILABLE_ROYAL, HOSPITAL_IMAGES } from '../data/hospitalData';
import { ClinicalTab } from '../types';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenBedStatus: () => void;
  onOpenTour: () => void;
  onOpenInsurance: () => void;
  /** 특화센터로 이동하면서 그 탭까지 실제로 바꾼다 — 예전에는 스크롤만 하고 탭은 그대로였다 */
  onNavigateCenter: (tab: ClinicalTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenBedStatus,
  onOpenTour,
  onOpenInsurance,
  onNavigateCenter,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="fixed top-[var(--sample-bar-h,0px)] left-0 right-0 z-50 bg-[#faf9f6]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-all">
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#102a20] text-white py-1.5 px-4 lg:px-8 border-b border-[#264035]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-1 text-[11px] font-medium tracking-wide">
          <div className="flex items-center gap-2 break-keep">
            <span className="material-symbols-outlined text-[15px] text-[#cbe9da]">verified_user</span>
            <span>의·한의 협진 80병상 입원 한방병원 · 가상 브랜드 샘플</span>
          </div>

          <button
            onClick={onOpenBedStatus}
            className="hidden lg:flex items-center gap-2 bg-[#264035] hover:bg-[#324c41] px-2.5 py-0.5 rounded-full text-white transition-colors cursor-pointer break-keep"
            title="병동 현황 보기"
          >
            <span className="w-2 h-2 rounded-full bg-[#cbe9da] animate-pulse shrink-0"></span>
            <span>
              오늘 입원 가능 병상 안내(예시): 1인실 {AVAILABLE_ROYAL}실 · 2인실 {AVAILABLE_HARMONY}병상
            </span>
            <span className="material-symbols-outlined text-[12px] opacity-80 shrink-0">arrow_forward</span>
          </button>

          <div className="hidden lg:flex items-center gap-3 text-[#e9e8e5]">
            <a
              href="tel:02-0000-0000"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">call</span>
              <span>24시간 입원상담 02-0000-0000</span>
            </a>
            <span className="opacity-40">|</span>
            <span className="hidden lg:inline">방문객 주차 안내</span>
          </div>
        </div>
      </div>

      {/* Main Header Navigation Bar */}
      {/* 본문은 1280(max-w-7xl)인데 이 줄만 1360 에 둔다 — 로고·메뉴 6개(줄바꿈 금지)·전화·예약 버튼이
          윈도우 글꼴로 약 1400px 을 차지해 1280 으로 묶으면 오른쪽 버튼이 더 밀려 잘린다. 메뉴 손질이 먼저다. */}
      <div className="h-20 max-w-[1360px] mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <button
          type="button"
          aria-label="맨 위로"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3.5 shrink-0 cursor-pointer group text-left"
        >
          <img
            alt="본초 통합한방병원 엠블럼"
            className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
            src={HOSPITAL_IMAGES.emblem}
          />
          <div className="flex flex-col">
            <span className="font-serif text-[18px] lg:text-[20px] text-[#102a20] font-semibold tracking-tight leading-tight">
              본초 통합한방병원
            </span>
            <span className="text-[10px] lg:text-[11px] text-[#75593c] tracking-widest uppercase font-semibold">
              Integrative Oncology &amp; Rehab
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => scrollToSection('hospital-philosophy')}
            className="px-3.5 py-2 text-[14px] font-semibold text-[#102a20] hover:bg-[#efeeeb] rounded-lg transition-colors whitespace-nowrap"
          >
            병원 철학
          </button>
          <button
            onClick={() => {
              onNavigateCenter('oncology');
              scrollToSection('specialized-centers');
            }}
            className="px-3.5 py-2 text-[14px] font-medium text-[#424844] hover:text-[#102a20] hover:bg-[#efeeeb] rounded-lg transition-colors whitespace-nowrap"
          >
            암 통합진료 센터
          </button>
          <button
            onClick={() => scrollToSection('suites-section')}
            className="px-3.5 py-2 text-[14px] font-medium text-[#424844] hover:text-[#102a20] hover:bg-[#efeeeb] rounded-lg transition-colors whitespace-nowrap"
          >
            360° VIP 입원실
          </button>
          <button
            onClick={() => scrollToSection('smart-decoction-lab')}
            className="px-3.5 py-2 text-[14px] font-medium text-[#424844] hover:text-[#102a20] hover:bg-[#efeeeb] rounded-lg transition-colors whitespace-nowrap"
          >
            스마트 청정 탕전실
          </button>
          <button
            onClick={() => {
              onNavigateCenter('traffic');
              scrollToSection('specialized-centers');
            }}
            className="px-3.5 py-2 text-[14px] font-medium text-[#424844] hover:text-[#102a20] hover:bg-[#efeeeb] rounded-lg transition-colors whitespace-nowrap"
          >
            교통사고·수술재활
          </button>
          <button
            onClick={onOpenBedStatus}
            className="px-3.5 py-2 text-[14px] font-medium text-[#424844] hover:text-[#102a20] hover:bg-[#efeeeb] rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#102a20]"></span>
            <span>입원실 현황</span>
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          {/* 1024~1535px 노트북에서는 이 덩어리가 자리를 먹어 오른쪽 예약 버튼이 화면 밖으로 밀려났다(2026-09-18 실측: 1366px 에서 3개 요소가 화면 밖). 넓은 화면(2xl, 1536px~)에서만 보인다. */}
          <a
            className="hidden 2xl:flex flex-col items-end text-right px-2"
            href="tel:02-0000-0000"
          >
            <span className="text-[11px] font-medium text-[#75593c]">전화 직통상담</span>
            <span className="text-[15px] font-bold text-[#102a20] tracking-tight">02-0000-0000</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center px-3.5 lg:px-4 py-2 lg:py-2.5 max-lg:min-h-[44px] rounded-lg bg-[#102a20] text-white text-[12px] lg:text-[13px] font-semibold shadow-[0_4px_16px_rgba(16,42,32,0.18)] hover:bg-[#264035] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
          >
            <span>입원·외래 간편예약</span>
          </button>

          <button
            onClick={onOpenTour}
            className="hidden lg:flex w-9 h-9 rounded-lg border border-[#c2c8c3] text-[#102a20] hover:bg-[#efeeeb] items-center justify-center transition-colors cursor-pointer"
            title="360° 가상 투어"
          >
            <span className="material-symbols-outlined text-[19px]">view_in_ar</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-11 h-11 rounded-lg bg-[#efeeeb] text-[#102a20] flex items-center justify-center cursor-pointer"
            aria-label="메뉴 열기/닫기"
            aria-expanded={mobileMenuOpen}
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf9f6] border-b border-[#e3e2e0] px-4 py-4 space-y-2 shadow-lg animate-in fade-in duration-200 break-keep">
          <button
            onClick={() => scrollToSection('hospital-philosophy')}
            className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg font-medium text-[#102a20] hover:bg-[#efeeeb]"
          >
            병원 철학 및 소개
          </button>
          <button
            onClick={() => {
              onNavigateCenter('oncology');
              scrollToSection('specialized-centers');
            }}
            className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg font-medium text-[#102a20] hover:bg-[#efeeeb]"
          >
            본초 3대 진료 특화 센터
          </button>
          <button
            onClick={() => {
              onNavigateCenter('traffic');
              scrollToSection('specialized-centers');
            }}
            className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg font-medium text-[#102a20] hover:bg-[#efeeeb]"
          >
            교통사고·수술 후 재활 입원
          </button>
          <button
            onClick={() => scrollToSection('suites-section')}
            className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg font-medium text-[#102a20] hover:bg-[#efeeeb]"
          >
            360° VIP 프라이빗 입원실
          </button>
          <button
            onClick={() => scrollToSection('smart-decoction-lab')}
            className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg font-medium text-[#102a20] hover:bg-[#efeeeb]"
          >
            원내 스마트 청정 탕전실 & 이력조회
          </button>
          <button
            onClick={() => scrollToSection('gourmet-nutrition')}
            className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg font-medium text-[#102a20] hover:bg-[#efeeeb]"
          >
            치료 중 회복 식단 안내
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBedStatus();
            }}
            className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg font-medium text-[#102a20] hover:bg-[#efeeeb] flex items-center justify-between"
          >
            <span>병동 현황 안내 (1인실 {AVAILABLE_ROYAL}실 / 2인실 {AVAILABLE_HARMONY}병상)</span>
            <span className="material-symbols-outlined text-[18px]">hotel</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenInsurance();
            }}
            className="w-full text-left px-3 py-2.5 min-h-[44px] rounded-lg font-medium text-[#75593c] hover:bg-[#ffd9b4]/30 flex items-center justify-between"
          >
            <span>실손의료비 & 자동차보험 비용 계산기</span>
            <span className="material-symbols-outlined text-[18px]">calculate</span>
          </button>
          <div className="pt-2 border-t border-[#e3e2e0] flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="flex-1 py-3 min-h-[44px] bg-[#102a20] text-white rounded-lg font-semibold text-center text-sm"
            >
              간편 입원상담 예약
            </button>
            <a
              href="tel:02-0000-0000"
              className="flex-1 py-3 min-h-[44px] bg-[#efeeeb] text-[#102a20] rounded-lg font-semibold text-center text-sm flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>02-0000-0000</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
