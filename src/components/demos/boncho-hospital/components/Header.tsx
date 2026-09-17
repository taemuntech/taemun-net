import React, { useState } from 'react';
import { HOSPITAL_IMAGES } from '../data/hospitalData';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenBedStatus: () => void;
  onOpenTour: () => void;
  onOpenInsurance: () => void;
  currentSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenBedStatus,
  onOpenTour,
  onOpenInsurance,
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
        <div className="max-w-[1360px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-1 text-[11px] font-medium tracking-wide">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[15px] text-[#cbe9da]">verified_user</span>
            <span>보건복지부 규격 80병상 · 의·한의 협진 암면역재활 전문병원</span>
          </div>

          <button
            onClick={onOpenBedStatus}
            className="flex items-center gap-2 bg-[#264035] hover:bg-[#324c41] px-2.5 py-0.5 rounded-full text-white transition-colors cursor-pointer"
            title="실시간 병동 현황 보기"
          >
            <span className="w-2 h-2 rounded-full bg-[#cbe9da] animate-pulse"></span>
            <span>오늘의 실시간 입원실 현황: 1인실 2실 · 2인실 3실 잔여 (즉시 입원 가능)</span>
            <span className="material-symbols-outlined text-[12px] opacity-80">arrow_forward</span>
          </button>

          <div className="flex items-center gap-3 text-[#e9e8e5]">
            <a href="tel:02-0000-0000" className="flex items-center gap-1 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[14px]">call</span>
              <span>24시간 입원상담 02-0000-0000</span>
            </a>
            <span className="opacity-40">|</span>
            <span className="hidden lg:inline">24시간 무료 발렛파킹 안내</span>
          </div>
        </div>
      </div>

      {/* Main Header Navigation Bar */}
      <div className="h-20 max-w-[1360px] mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3.5 shrink-0 cursor-pointer group"
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
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1.5 lg:gap-2">
          <button
            onClick={() => scrollToSection('hospital-philosophy')}
            className="px-3.5 py-2 text-[14px] font-semibold text-[#102a20] hover:bg-[#efeeeb] rounded-lg transition-colors"
          >
            병원 철학
          </button>
          <button
            onClick={() => scrollToSection('specialized-centers')}
            className="px-3.5 py-2 text-[14px] font-medium text-[#424844] hover:text-[#102a20] hover:bg-[#efeeeb] rounded-lg transition-colors"
          >
            암면역 집중센터
          </button>
          <button
            onClick={() => scrollToSection('suites-section')}
            className="px-3.5 py-2 text-[14px] font-medium text-[#424844] hover:text-[#102a20] hover:bg-[#efeeeb] rounded-lg transition-colors"
          >
            360° VIP 입원실
          </button>
          <button
            onClick={() => scrollToSection('smart-decoction-lab')}
            className="px-3.5 py-2 text-[14px] font-medium text-[#424844] hover:text-[#102a20] hover:bg-[#efeeeb] rounded-lg transition-colors"
          >
            스마트 청정 탕전실
          </button>
          <button
            onClick={() => {
              scrollToSection('specialized-centers');
            }}
            className="px-3.5 py-2 text-[14px] font-medium text-[#424844] hover:text-[#102a20] hover:bg-[#efeeeb] rounded-lg transition-colors"
          >
            교통사고·수술재활
          </button>
          <button
            onClick={onOpenBedStatus}
            className="px-3.5 py-2 text-[14px] font-medium text-[#424844] hover:text-[#102a20] hover:bg-[#efeeeb] rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#102a20]"></span>
            <span>입원실 실시간 조회</span>
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            className="hidden lg:flex flex-col items-end text-right px-2"
            href="tel:02-0000-0000"
          >
            <span className="text-[11px] font-medium text-[#75593c]">전화 직통상담</span>
            <span className="text-[16px] font-bold text-[#102a20] tracking-tight">02-0000-0000</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-[#102a20] text-white text-[13px] font-semibold shadow-[0_4px_16px_rgba(16,42,32,0.18)] hover:bg-[#264035] active:scale-95 transition-all cursor-pointer"
          >
            <span>입원·외래 간편예약</span>
          </button>

          <button
            onClick={onOpenTour}
            className="hidden lg:flex w-9 h-9 rounded-lg border border-[#c2c8c3] text-[#102a20] hover:bg-[#efeeeb] items-center justify-center transition-colors"
            title="360° 가상 투어"
          >
            <span className="material-symbols-outlined text-[19px]">view_in_ar</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-9 h-9 rounded-lg bg-[#efeeeb] text-[#102a20] flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#faf9f6] border-b border-[#e3e2e0] px-4 py-4 space-y-2 shadow-lg animate-in fade-in duration-200">
          <button
            onClick={() => scrollToSection('hospital-philosophy')}
            className="w-full text-left px-3 py-2.5 rounded-lg font-medium text-[#102a20] hover:bg-[#efeeeb]"
          >
            병원 철학 및 소개
          </button>
          <button
            onClick={() => scrollToSection('specialized-centers')}
            className="w-full text-left px-3 py-2.5 rounded-lg font-medium text-[#102a20] hover:bg-[#efeeeb]"
          >
            본초 3대 집중 진료 특화 센터
          </button>
          <button
            onClick={() => scrollToSection('suites-section')}
            className="w-full text-left px-3 py-2.5 rounded-lg font-medium text-[#102a20] hover:bg-[#efeeeb]"
          >
            360° VIP 프라이빗 입원실
          </button>
          <button
            onClick={() => scrollToSection('smart-decoction-lab')}
            className="w-full text-left px-3 py-2.5 rounded-lg font-medium text-[#102a20] hover:bg-[#efeeeb]"
          >
            원내 스마트 청정 탕전실 & 이력조회
          </button>
          <button
            onClick={() => scrollToSection('gourmet-nutrition')}
            className="w-full text-left px-3 py-2.5 rounded-lg font-medium text-[#102a20] hover:bg-[#efeeeb]"
          >
            1:1 임상 항암 약선 식단
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBedStatus();
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg font-medium text-[#102a20] hover:bg-[#efeeeb] flex items-center justify-between"
          >
            <span>실시간 병상 현황 (1인실 2실 / 2인실 3실)</span>
            <span className="material-symbols-outlined text-[18px]">hotel</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenInsurance();
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg font-medium text-[#75593c] hover:bg-[#ffd9b4]/30 flex items-center justify-between"
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
              className="flex-1 py-3 bg-[#102a20] text-white rounded-lg font-semibold text-center text-sm"
            >
              간편 입원상담 예약
            </button>
            <a
              href="tel:02-0000-0000"
              className="flex-1 py-3 bg-[#efeeeb] text-[#102a20] rounded-lg font-semibold text-center text-sm flex items-center justify-center gap-1"
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
