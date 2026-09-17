import React, { useState } from 'react';
import { MapPin, Clock, Phone, User, Menu, X, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

interface HeaderProps {
  onOpenBooking: () => void;
}

const NAV_ITEMS: { id: string; label: string; labelLong: string }[] = [
  { id: 'philosophy', label: '의원 철학', labelLong: '의원 철학 (Philosophy)' },
  { id: 'dermatologists', label: '전문의 소개', labelLong: '전문의 소개 (Medical Faculty)' },
  { id: 'signature-lifting', label: '시그니처 리프팅', labelLong: '시그니처 리프팅 (Signature Protocols)' },
  { id: 'skin-spectrum', label: '4광원 정밀 진단', labelLong: '4광원 정밀 진단 (Skin Spectrum)' },
  { id: 'private-suites', label: '1인 프라이빗 룸', labelLong: '1인 프라이빗 룸 (Single Suites)' },
  { id: 'genuine-verification', label: '소모품 확인 센터', labelLong: '소모품 확인 센터 (Sterile Check)' },
];

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (!element) return;
    const y = element.getBoundingClientRect().top + window.pageYOffset - 90;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-[var(--sample-bar-h,0px)] left-0 right-0 z-50 bg-[#fbf9f6]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#eae8e5]">
      {/* Top Utility Ribbon */}
      <div className="bg-[#eae8e5] text-[#424845] border-b border-[#e4e2df]">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 h-11 lg:h-10 flex items-center justify-between gap-3 text-xs tracking-wider">
          <div className="flex items-center gap-4 min-w-0">
            <span className="flex items-center gap-1.5 min-w-0">
              <MapPin className="w-3.5 h-3.5 text-[#745a2a] shrink-0" />
              {/* 모바일에서는 전체 주소가 잘려 「서울시 …」 만 보였다 — 짧은 안내로 바꾼다 */}
              <span className="lg:hidden truncate">{CLINIC_INFO.addressShort}</span>
              <span className="hidden lg:inline truncate">{CLINIC_INFO.address} (발렛 파킹 지원)</span>
            </span>
            <span className="hidden lg:inline text-[#c1c8c4]">•</span>
            <span className="hidden lg:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#745a2a] shrink-0" />
              <span>진료시간: 월-금 10:00 - 20:00 (야간진료) / 토 10:00 - 16:00</span>
            </span>
          </div>

          <div className="flex items-center shrink-0">
            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="flex h-11 lg:h-10 items-center gap-1.5 font-semibold text-[#00110b] hover:text-[#745a2a] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#745a2a] shrink-0" />
              <span className="lg:hidden">전화 예약</span>
              <span className="hidden lg:inline">VIP Concierge: {CLINIC_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="h-20 max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Crest & Logo — 아무 데도 가지 않는 링크였다. 맨 위로 올리는 버튼으로 바꿨다 */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="더 노블 청담 피부과 — 맨 위로"
          className="flex items-center gap-3.5 shrink-0 group min-h-11 text-left"
        >
          <img
            src="/demo-media/the-noble-dermatology/the-noble-dermatology-07.png"
            alt="The Noble Cheongdam Logo"
            className="h-8 lg:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-serif text-lg lg:text-xl font-medium tracking-tight text-[#00110b] leading-none">
              THE NOBLE
            </span>
            <span className="text-[10px] lg:text-xs text-[#745a2a] tracking-[0.22em] uppercase font-semibold mt-1">
              Cheongdam Medical
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-4 lg:gap-5 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className="text-[#424845] hover:text-[#00110b] py-2 tracking-wide transition-colors whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Button & VIP Icon */}
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBooking}
            className="relative inline-flex items-center justify-center gap-1.5 lg:gap-2 px-3.5 lg:px-6 min-h-11 py-2 lg:py-2.5 rounded-lg bg-[#00110b] text-[#ffffff] text-xs lg:text-sm font-semibold tracking-wider shadow-[0_4px_20px_-4px_rgba(13,40,32,0.2)] hover:bg-[#0d2820] active:scale-95 transition-all duration-300"
          >
            <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-[#fedb9e]" />
            <span>
              <span className="lg:hidden">1:1 예약</span>
              <span className="hidden lg:inline">1:1 프라이빗 예약</span>
            </span>
          </button>

          {/* 데스크톱 전용 — 모바일에서는 바로 옆 예약 버튼과 같은 동작이라 겹쳐 두지 않는다 */}
          <button
            type="button"
            onClick={onOpenBooking}
            aria-label="VIP 예약 바로가기"
            className="hidden lg:flex w-11 h-11 rounded-full bg-[#00110b] items-center justify-center text-[#ffffff] hover:bg-[#0d2820] transition-colors shrink-0"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="메뉴 열기"
            aria-expanded={mobileMenuOpen}
            className="lg:hidden w-11 h-11 flex items-center justify-center rounded-lg text-[#00110b] hover:bg-[#eae8e5] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fbf9f6] border-b border-[#eae8e5] px-6 py-3 shadow-xl max-h-[calc(100vh-180px)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col font-medium text-[#1b1c1a]">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToSection(item.id)}
                className="text-left min-h-12 py-3 hover:text-[#745a2a] border-b border-[#efeeeb]"
              >
                {item.labelLong}
              </button>
            ))}
            <button
              type="button"
              onClick={() => scrollToSection('location-hours')}
              className="text-left min-h-12 py-3 hover:text-[#745a2a]"
            >
              오시는 길 &amp; 진료 안내 (Location)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
