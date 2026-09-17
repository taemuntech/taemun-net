import React, { useState, useEffect } from 'react';
import { CLINIC_IMAGES } from '../data/clinicData';

interface HeaderProps {
  onOpenSafetyModal: () => void;
  onOpenReservation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSafetyModal, onOpenReservation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = [
        'philosophy',
        'proportion-hud',
        'before-after-cases',
        'safety-declaration',
        'vip-recovery-care',
        'medical-directors',
        'location-concierge'
      ];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 140) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className={`fixed top-[var(--sample-bar-h,0px)] left-0 w-full z-40 transition-all duration-300 ${
      isScrolled ? 'bg-[#fdf9f5]/95 backdrop-blur-xl shadow-[0_1px_16px_rgba(114,91,56,0.08)]' : 'bg-[#fdf9f5]/90 backdrop-blur-md'
    }`}>
      {/* Top micro-announcement bar */}
      <div className="w-full bg-[#ebe7e4] py-1.5 px-4 lg:px-8 text-center text-[#4d463c] text-[11px] font-medium tracking-wider flex items-center justify-center gap-3 overflow-x-auto whitespace-nowrap border-b border-[#d1c5b8]/30">
        <span className="w-1.5 h-1.5 rounded-full bg-[#725b38] inline-block animate-pulse"></span>
        <span>본연의 아름다움을 거스르지 않는 자연스러움의 미학</span>
        <span className="text-[#d1c5b8]">·</span>
        <span>100% 한국인 전문의 실명집도제</span>
        <span className="text-[#d1c5b8]">·</span>
        <span>압구정로데오역 5번 출구</span>
      </div>

      {/* Main navigation container */}
      <div className="h-18 lg:h-20 max-w-[1320px] mx-auto px-4 lg:px-10 flex items-center justify-between gap-4 lg:gap-6">
        {/* Brand identity */}
        <div className="flex items-center gap-2.5 lg:gap-3.5 shrink-0">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 lg:gap-3 group text-left cursor-pointer"
          >
            <div className="relative flex items-center justify-center">
              <img
                src={CLINIC_IMAGES.logoProfile}
                alt="온새미로 로고"
                className="w-8 h-8 lg:w-9 lg:h-9 rounded-full object-cover shadow-[0_0_12px_rgba(197,168,128,0.35)] ring-1 ring-[#c5a880]/40 group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-[18px] lg:text-[22px] leading-tight tracking-tight text-[#1c1c19] group-hover:text-[#725b38] transition-colors font-medium">
                온새미로
              </span>
              <span className="text-[9px] lg:text-[10px] uppercase tracking-[0.14em] text-[#4d463c] font-medium">
                Aesthetic &amp; Plastic Surgery
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-4 lg:gap-6">
          <button
            onClick={() => scrollTo('philosophy')}
            className={`text-[13px] tracking-tight transition-colors py-1 cursor-pointer whitespace-nowrap ${
              activeSection === 'philosophy' ? 'text-[#725b38] font-semibold border-b-2 border-[#725b38]' : 'text-[#4d463c] hover:text-[#1c1c19]'
            }`}
          >
            온새미로 철학
          </button>
          <button
            onClick={() => scrollTo('proportion-hud')}
            className={`text-[13px] tracking-tight transition-colors py-1 cursor-pointer flex items-center gap-1 whitespace-nowrap ${
              activeSection === 'proportion-hud' ? 'text-[#725b38] font-semibold border-b-2 border-[#725b38]' : 'text-[#4d463c] hover:text-[#1c1c19]'
            }`}
          >
            <span>황금비율 HUD</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]"></span>
          </button>
          <button
            onClick={() => scrollTo('before-after-cases')}
            className={`text-[13px] tracking-tight transition-colors py-1 cursor-pointer whitespace-nowrap ${
              activeSection === 'before-after-cases' ? 'text-[#725b38] font-semibold border-b-2 border-[#725b38]' : 'text-[#4d463c] hover:text-[#1c1c19]'
            }`}
          >
            비포&amp;애프터
          </button>
          <button
            onClick={() => scrollTo('safety-declaration')}
            className={`text-[13px] tracking-tight transition-colors py-1 cursor-pointer whitespace-nowrap ${
              activeSection === 'safety-declaration' ? 'text-[#725b38] font-semibold border-b-2 border-[#725b38]' : 'text-[#4d463c] hover:text-[#1c1c19]'
            }`}
          >
            5대 안심선언
          </button>
          <button
            onClick={() => scrollTo('vip-recovery-care')}
            className={`text-[13px] tracking-tight transition-colors py-1 cursor-pointer whitespace-nowrap ${
              activeSection === 'vip-recovery-care' ? 'text-[#725b38] font-semibold border-b-2 border-[#725b38]' : 'text-[#4d463c] hover:text-[#1c1c19]'
            }`}
          >
            VIP 회복케어
          </button>
          <button
            onClick={() => scrollTo('medical-directors')}
            className={`text-[13px] tracking-tight transition-colors py-1 cursor-pointer whitespace-nowrap ${
              activeSection === 'medical-directors' ? 'text-[#725b38] font-semibold border-b-2 border-[#725b38]' : 'text-[#4d463c] hover:text-[#1c1c19]'
            }`}
          >
            의료진
          </button>
          <button
            onClick={() => scrollTo('location-concierge')}
            className={`text-[13px] tracking-tight transition-colors py-1 cursor-pointer whitespace-nowrap ${
              activeSection === 'location-concierge' ? 'text-[#725b38] font-semibold border-b-2 border-[#725b38]' : 'text-[#4d463c] hover:text-[#1c1c19]'
            }`}
          >
            오시는 길
          </button>
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-2 lg:gap-4 shrink-0">
          {/* VIP Private Phone */}
          <div className="hidden lg:flex flex-col items-end text-right">
            <span className="text-[11px] uppercase tracking-wider text-[#4d463c]">
              VIP Private Line
            </span>
            <a
              href="tel:02-0000-0000"
              className="text-[15px] text-[#725b38] tracking-tight font-semibold hover:text-[#1c1c19] transition-colors"
            >
              02-0000-0000
            </a>
          </div>

          {/* Safety declaration pill button */}
          <button
            onClick={onOpenSafetyModal}
            className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ebe7e4] text-[#4d463c] hover:bg-[#e5e2de] hover:text-[#1c1c19] text-[12px] font-medium transition-all shadow-[0_1px_4px_rgba(0,0,0,0.03)] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] text-[#725b38]">verified_user</span>
            <span>5대 안심선언 열람</span>
          </button>

          {/* Signature VIP Booking Button */}
          <button
            onClick={onOpenReservation}
            className="inline-flex items-center gap-1.5 lg:gap-2 px-3.5 lg:px-5 py-2 lg:py-2.5 rounded-full bg-[#1A1817] text-[#fdf9f5] text-[12px] font-semibold tracking-wider shadow-[0_4px_20px_rgba(197,168,128,0.22)] hover:bg-[#2E2A27] hover:shadow-[0_4px_24px_rgba(197,168,128,0.36)] transition-all duration-300 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] lg:text-[18px] text-[#fedeb2]">calendar_month</span>
            <span className="lg:hidden whitespace-nowrap">1:1 상담 예약</span>
            <span className="hidden lg:inline whitespace-nowrap">프라이빗 1:1 상담 예약</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-[#1c1c19] hover:bg-[#ebe7e4] transition-colors cursor-pointer"
            aria-label="메뉴 열기"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fdf9f5] border-t border-[#d1c5b8]/30 px-6 py-5 shadow-xl break-keep">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => scrollTo('philosophy')}
              className="text-left py-2 text-[#1c1c19] text-[15px] font-medium border-b border-[#f1ede9]"
            >
              온새미로 철학
            </button>
            <button
              onClick={() => scrollTo('proportion-hud')}
              className="text-left py-2 text-[#725b38] font-semibold text-[15px] border-b border-[#f1ede9] flex items-center justify-between"
            >
              <span>1:1:0.8 안면 황금비율 HUD</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-[#c5a880]/20 text-[#725b38]">시뮬레이터</span>
            </button>
            <button
              onClick={() => scrollTo('before-after-cases')}
              className="text-left py-2 text-[#1c1c19] text-[15px] font-medium border-b border-[#f1ede9]"
            >
              비포&amp;애프터 듀얼 갤러리
            </button>
            <button
              onClick={() => scrollTo('safety-declaration')}
              className="text-left py-2 text-[#1c1c19] text-[15px] font-medium border-b border-[#f1ede9]"
            >
              5대 무결점 환자 안심 시스템
            </button>
            <button
              onClick={() => scrollTo('vip-recovery-care')}
              className="text-left py-2 text-[#1c1c19] text-[15px] font-medium border-b border-[#f1ede9]"
            >
              1인 VIP 회복케어 &amp; 14일 로드맵
            </button>
            <button
              onClick={() => scrollTo('medical-directors')}
              className="text-left py-2 text-[#1c1c19] text-[15px] font-medium border-b border-[#f1ede9]"
            >
              성형외과 &amp; 마취과 의료진
            </button>
            <button
              onClick={() => scrollTo('location-concierge')}
              className="text-left py-2 text-[#1c1c19] text-[15px] font-medium border-b border-[#f1ede9]"
            >
              오시는 길 &amp; 프라이빗 발렛 안내
            </button>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="tel:02-0000-0000"
                className="w-full py-3 rounded-xl bg-[#ebe7e4] text-center font-semibold text-[#725b38] text-[14px]"
              >
                VIP 전화 상담 (02-0000-0000)
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full py-3 rounded-xl bg-[#1A1817] text-[#fdf9f5] font-semibold text-[14px] text-center"
              >
                1:1 시크릿 예약 신청
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
