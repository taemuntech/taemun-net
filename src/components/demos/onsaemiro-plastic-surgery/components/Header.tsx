import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Phone, ShieldCheck } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeaderProps {
  onOpenConsultation: () => void;
  onOpenSafetyModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenConsultation,
  onOpenSafetyModal,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '온새미로 철학', href: '#philosophy' },
    { label: '황금비율 시뮬레이터', href: '#proportion' },
    { label: '비포&애프터', href: '#before-after' },
    { label: '5대 안심안전망', href: '#safety' },
    { label: 'VIP 회복케어', href: '#recovery' },
    { label: '의료진', href: '#doctors' },
    { label: '오시는 길', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-[var(--sample-bar-h,0px)] left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#1A1817]/90 backdrop-blur-md border-b border-[#C5A880]/20 py-3 shadow-lg'
          : 'bg-gradient-to-b from-[#1A1817]/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E8DDD4] to-[#C5A880] flex items-center justify-center text-[#1A1817] shadow-inner font-serif font-bold text-[18px]">
            온
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[17px] font-bold text-white tracking-tight group-hover:text-[#C5A880] transition-colors">
                {CLINIC_INFO.name}
              </span>
              <span className="hidden lg:inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#C5A880]/20 text-[#E8DDD4] border border-[#C5A880]/30">
                압구정 부티크
              </span>
            </div>
            <div className="text-[10px] text-[#A69F97] tracking-widest uppercase font-light">
              Onsaemiro Aesthetic &amp; Plastic Surgery
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7 text-[14px] text-[#D3CBC3]">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-[#C5A880] after:absolute after:bottom-0 after:left-0 after:transition-all"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenSafetyModal}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-[12px] text-[#E8DDD4] bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>5대 안심선언</span>
          </button>
          <button
            onClick={onOpenConsultation}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-medium text-[#1A1817] bg-gradient-to-r from-[#E8DDD4] to-[#C5A880] hover:brightness-105 shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>프라이빗 1:1 상담</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenConsultation}
            className="px-3 py-1.5 rounded-full text-[12px] font-medium text-[#1A1817] bg-gradient-to-r from-[#E8DDD4] to-[#C5A880]"
          >
            상담예약
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#E8DDD4] hover:text-white"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#1A1817]/98 border-b border-[#C5A880]/20 px-4 py-6 space-y-4">
          <div className="flex flex-col space-y-3 pb-4 border-b border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-[15px] font-medium text-[#D3CBC3] hover:text-[#C5A880] py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSafetyModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] text-[#E8DDD4] bg-white/5 border border-white/10"
            >
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>5대 무결점 환자안심 시스템 확인</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[14px] font-bold text-[#1A1817] bg-gradient-to-r from-[#E8DDD4] to-[#C5A880]"
            >
              <Sparkles className="w-4 h-4" />
              <span>프라이빗 1:1 비밀상담 신청</span>
            </button>
            <div className="flex items-center justify-center gap-2 text-[12px] text-[#A69F97] pt-2">
              <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{CLINIC_INFO.tel}</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
