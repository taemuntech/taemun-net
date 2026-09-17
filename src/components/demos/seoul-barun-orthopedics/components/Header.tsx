import React, { useState, useEffect } from 'react';
import { CLINIC_IMAGES } from '../data/clinicData';

interface HeaderProps {
  onOpenBooking: (prefill?: { part?: string; doctor?: string }) => void;
  onSelectNav: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onSelectNav }) => {
  const [activeNav, setActiveNav] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '병원소개', id: 'about' },
    { label: '의료진', id: 'medical-staff' },
    { label: '비수술 척추센터', id: 'spine-center' },
    { label: '관절·연골센터', id: 'joint-cartilage-center' },
    { label: '100평 1:1 도수재활', id: 'rehab-center' },
    { label: '당일 MRI 원스톱', id: 'fast-track-booking' },
  ];

  const handleNavClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveNav(id);
    setMobileMenuOpen(false);
    onSelectNav(id);

    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="fixed top-[var(--sample-bar-h,0px)] w-full z-50 bg-[#FAF9F6]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-all">
      {/* Top utility sub-bar */}
      <div className="bg-[#F4F3F1] border-b border-[#E9E8E5]/70">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 lg:px-12 h-10 flex items-center justify-between text-xs text-[#3F493F]">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#15803D] text-white font-medium text-[11px] lg:text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              <span>화/목 야간진료 ~20:00 진행중</span>
            </div>
            <div className="hidden lg:flex items-center gap-1 text-[#3F493F]">
              <span className="material-symbols-outlined text-[15px] text-[#6F7A6E]">location_on</span>
              <span>서울시 서초구 서초중앙로 바른마디 메디컬타워 2~5F (교대역 4번출구)</span>
            </div>
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <a
              href="#fast-track-booking"
              className="flex items-center gap-1 font-semibold text-[#00652C] hover:opacity-80 transition-opacity"
            >
              <span className="material-symbols-outlined text-[17px]">call</span>
              <span>02-0000-0000</span>
            </a>
            <div className="hidden lg:flex items-center gap-1 text-[#545F73]">
              <span className="material-symbols-outlined text-[15px]">local_parking</span>
              <span>발렛파킹 및 전용주차 완비</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand identity */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group"
        >
          <img
            alt="Seoul Barun Madi Orthopedic Logo"
            className="h-8 lg:h-9 w-auto object-contain transition-transform group-hover:scale-105"
            src={CLINIC_IMAGES.logo}
           referrerPolicy="no-referrer" />
          <div className="flex flex-col">
            <span className="text-[17px] lg:text-[19px] font-bold text-[#1A1C1A] tracking-tight leading-tight">
              서울 바른마디 척추관절 정형외과
            </span>
            <span className="text-[10px] lg:text-[11px] text-[#6F7A6E] tracking-wider uppercase font-medium">
              Seoul Barun Madi Orthopedic Clinic
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 p-1 bg-white rounded-xl shadow-[0_1px_3px_rgba(30,41,59,0.04)] border border-[#E9E8E5]">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(item.id, e)}
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#15803D] text-white shadow-sm'
                    : 'text-[#3F493F] hover:text-[#1A1C1A] hover:bg-[#F4F3F1]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Fast-Track CTA & User button */}
        <div className="flex items-center gap-2 lg:gap-3">
          <button
            onClick={() => onOpenBooking()}
            className="relative inline-flex items-center gap-1.5 px-3.5 lg:px-5 h-11 lg:h-12 bg-[#00652C] hover:bg-[#15803D] text-white text-xs lg:text-sm font-bold rounded-xl shadow-[0_4px_16px_rgba(21,128,61,0.25)] transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined text-[18px] lg:text-[20px] text-white">bolt</span>
            <span>당일 진료·MRI 예약 (Fast-Track)</span>
          </button>

          <a
            href="#fast-track-booking"
            title="전화 문의"
            className="w-10 h-10 lg:w-11 lg:h-11 rounded-full bg-[#00652C] text-white flex items-center justify-center hover:bg-[#15803D] transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">person</span>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden w-10 h-10 rounded-xl bg-white border border-[#E9E8E5] text-[#1A1C1A] flex items-center justify-center cursor-pointer"
            aria-label="Toggle navigation"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-[#E9E8E5] px-6 py-4 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="text-xs font-semibold text-[#6F7A6E] pb-1 uppercase tracking-wider">
            진료 및 센터 바로가기
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={(e) => handleNavClick(item.id, e as any)}
                className="text-left px-3 py-2.5 rounded-lg text-sm font-semibold bg-[#F4F3F1] hover:bg-[#DCFCE7] text-[#1A1C1A] transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-2 border-t border-[#E9E8E5] flex items-center justify-between text-xs text-[#545F73]">
            <span>진료 문의: 02-0000-0000</span>
            <span className="text-[#00652C] font-semibold">화/목 야간 ~20:00</span>
          </div>
        </div>
      )}
    </header>
  );
};
