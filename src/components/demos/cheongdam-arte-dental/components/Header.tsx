import React, { useState, useEffect } from 'react';
import { CLINIC_IMAGES } from '../data/clinicData';
import { 
  MapPin, 
  Phone, 
  Car, 
  Menu, 
  X, 
  User, 
  Sparkles,
  CalendarDays
} from 'lucide-react';

interface HeaderProps {
  onOpenClinicTour: () => void;
  onOpenPhilosophy: () => void;
  onNavigateToBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenClinicTour,
  onOpenPhilosophy,
  onNavigateToBooking
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('philosophy');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string, sectionKey?: string) => {
    setMobileMenuOpen(false);
    if (sectionKey) setActiveSection(sectionKey);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-[var(--sample-bar-h,0px)] w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-[#faf9f6]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]' : 'bg-[#faf9f6]/85 backdrop-blur-xl'
    }`}>
      {/* Top Pre-header Announcement Bar */}
      <div className="bg-[#e9e8e5]/60 hidden lg:block border-b border-[#d1c5b4]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-9 text-[#4e4639] text-xs font-sans">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#775a19]" />
              서울특별시 강남구 압구정로 88-1 청담 아르떼 메디컬 타워 4-5F
            </span>
            <span className="h-2.5 w-[1px] bg-[#d1c5b4]" />
            <a href="#booking-section" className="flex items-center gap-1.5 hover:text-[#775a19] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#775a19]" />
              VIP 예약: 02-0000-0000
            </a>
            <span className="h-2.5 w-[1px] bg-[#d1c5b4]" />
            <span className="flex items-center gap-1.5">
              <Car className="w-3.5 h-3.5 text-[#775a19]" />
              전용 발렛 파킹 리셉션 서비스 (1F 상시 대기)
            </span>
          </div>
          
          {/* 좁은 데스크톱(1024~1279)에서 왼쪽 안내와 부딪히지 않게 xl 부터만 보인다 */}
          <span className="hidden xl:flex items-center gap-1.5 font-medium whitespace-nowrap">
            <CalendarDays className="w-3.5 h-3.5 text-[#775a19]" />
            화·목 야간진료 21:00
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="h-20 max-w-7xl mx-auto px-4 lg:px-6 lg:px-12 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="맨 위로"
          className="flex items-center gap-3 group py-1.5 min-h-11 text-left cursor-pointer"
        >
          <img
            src={CLINIC_IMAGES.logo}
            alt="Cheongdam Arte Dental Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
          referrerPolicy="no-referrer" />
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-tight text-[#1a1c1a] font-bold">
              청담 아르떼 치과의원
            </span>
            <span className="text-[10px] text-[#7f7667] tracking-widest uppercase font-medium">
              Cheongdam Arte Dental Atelier
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          <button
            onClick={() => { setActiveSection('philosophy'); onOpenPhilosophy(); }}
            className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'philosophy' 
                ? 'bg-[#c5a059] text-white shadow-sm' 
                : 'text-[#4e4639] hover:text-[#1a1c1a] hover:bg-[#efeeeb]'
            }`}
          >
            병원 철학
          </button>
          <button
            onClick={() => scrollToSection('faculty-section', 'faculty')}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'faculty' 
                ? 'bg-[#c5a059] text-white shadow-sm' 
                : 'text-[#4e4639] hover:text-[#1a1c1a] hover:bg-[#efeeeb]'
            }`}
          >
            의료진 소개
          </button>
          <button
            onClick={() => scrollToSection('navigation-section', 'digital-implant')}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'digital-implant' 
                ? 'bg-[#c5a059] text-white shadow-sm' 
                : 'text-[#4e4639] hover:text-[#1a1c1a] hover:bg-[#efeeeb]'
            }`}
          >
            디지털 임플란트
          </button>
          <button
            onClick={() => scrollToSection('veneer-section', 'aesthetic-veneer')}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'aesthetic-veneer' 
                ? 'bg-[#c5a059] text-white shadow-sm' 
                : 'text-[#4e4639] hover:text-[#1a1c1a] hover:bg-[#efeeeb]'
            }`}
          >
            심미 라미네이트
          </button>
          <button
            onClick={() => scrollToSection('painless-section', 'painless-tech')}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'painless-tech' 
                ? 'bg-[#c5a059] text-white shadow-sm' 
                : 'text-[#4e4639] hover:text-[#1a1c1a] hover:bg-[#efeeeb]'
            }`}
          >
            안심 저통증 진료
          </button>
          <button
            onClick={() => { setActiveSection('clinic-tour'); onOpenClinicTour(); }}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'clinic-tour' 
                ? 'bg-[#c5a059] text-white shadow-sm' 
                : 'text-[#4e4639] hover:text-[#1a1c1a] hover:bg-[#efeeeb]'
            }`}
          >
            클리닉 투어
          </button>
          <button
            onClick={() => scrollToSection('booking-section', 'online-booking')}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeSection === 'online-booking' 
                ? 'bg-[#c5a059] text-white shadow-sm' 
                : 'text-[#4e4639] hover:text-[#1a1c1a] hover:bg-[#efeeeb]'
            }`}
          >
            온라인 간편예약
          </button>
        </nav>

        {/* Action Button & Mobile Menu Trigger */}
        <div className="flex items-center gap-2 lg:gap-3">
          <button
            onClick={onNavigateToBooking}
            className="hidden lg:inline-flex items-center justify-center px-4 lg:px-5 py-2.5 rounded-full bg-gradient-to-r from-[#c5a059] to-[#775a19] text-white text-xs font-semibold tracking-wider shadow-[0_4px_20px_rgba(197,160,89,0.35)] hover:shadow-[0_6px_24px_rgba(197,160,89,0.5)] transition-all transform hover:-translate-y-0.5 cursor-pointer whitespace-nowrap"
          >
            상담 및 예약 신청
          </button>
          
          <button
            type="button"
            onClick={onNavigateToBooking}
            className="w-11 h-11 lg:w-8 lg:h-8 rounded-full bg-[#775a19] flex items-center justify-center text-white hover:bg-[#c5a059] transition-colors cursor-pointer"
            title="VIP 환자 리셉션"
            aria-label="예약 신청으로 이동"
          >
            <User className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg text-[#1a1c1a] hover:bg-[#efeeeb] transition-colors cursor-pointer"
            aria-label="메뉴 열기"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#faf9f6] border-b border-[#d1c5b4]/40 px-6 py-5 shadow-2xl space-y-3 break-keep">
          <div className="flex items-center justify-between pb-3 border-b border-[#d1c5b4]/30">
            <span className="text-xs font-semibold text-[#775a19]">진료 과목 & 안내</span>
            <span className="text-[11px] text-[#7f7667]">화·목 야간진료 21:00</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs font-medium">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenPhilosophy(); }}
              className="text-left px-3 py-3 min-h-11 rounded-lg bg-[#efeeeb] hover:bg-[#e9e8e5]"
            >
              병원 철학
            </button>
            <button
              onClick={() => scrollToSection('faculty-section')}
              className="text-left px-3 py-3 min-h-11 rounded-lg bg-[#efeeeb] hover:bg-[#e9e8e5]"
            >
              의료진 소개
            </button>
            <button
              onClick={() => scrollToSection('navigation-section')}
              className="text-left px-3 py-3 min-h-11 rounded-lg bg-[#efeeeb] hover:bg-[#e9e8e5]"
            >
              디지털 임플란트
            </button>
            <button
              onClick={() => scrollToSection('veneer-section')}
              className="text-left px-3 py-3 min-h-11 rounded-lg bg-[#efeeeb] hover:bg-[#e9e8e5]"
            >
              심미 라미네이트
            </button>
            <button
              onClick={() => scrollToSection('painless-section')}
              className="text-left px-3 py-3 min-h-11 rounded-lg bg-[#efeeeb] hover:bg-[#e9e8e5]"
            >
              안심 저통증 진료
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenClinicTour(); }}
              className="text-left px-3 py-3 min-h-11 rounded-lg bg-[#efeeeb] hover:bg-[#e9e8e5]"
            >
              클리닉 투어
            </button>
          </div>

          <button
            onClick={() => scrollToSection('booking-section')}
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#c5a059] to-[#775a19] text-white text-xs font-bold shadow-md text-center flex items-center justify-center gap-2"
          >
            <CalendarDays className="w-4 h-4" />
            온라인 간편예약 바로가기
          </button>
        </div>
      )}
    </header>
  );
};
