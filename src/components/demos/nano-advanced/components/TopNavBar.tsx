import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { LOGO_URL } from '../data/packagingData';

interface TopNavBarProps {
  onOpenConsultation: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({ onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 모든 href 는 이 화면에 실제로 있는 섹션 id 만 가리킨다.
  // 없던 #quality-standards 와, 이 샘플에 없는 「IR 공시」 지면을 가리키던 항목을 실재 섹션으로 바꿨다(2026-09-17).
  // wideOnly: 1024~1279px 에서는 6개가 로고·CTA 와 한 줄에 못 들어가 넘친다 — xl 부터만 보여 준다(드로어에는 전부 남는다).
  const navLinks = [
    { label: '기술 혁신', href: '#solutions', active: true, wideOnly: false },
    { label: '2.5D/3D 패키징 솔루션', href: '#layer-explorer', active: false, wideOnly: false },
    { label: '차세대 유리 기판 (Glass Core)', href: '#solutions', active: false, wideOnly: true },
    { label: '발열·휨 시뮬레이터', href: '#interposer-spec', active: false, wideOnly: true },
    { label: '파운드리 수율 데이터', href: '#yield-metrics', active: false, wideOnly: false },
    { label: '기술 미팅 신청', href: '#technical-request', active: false, wideOnly: false },
  ];

  // 공용 샘플 바(44px)에 가리지 않게 fixed top-0 이 아니라 sticky + 바 높이 변수를 쓴다(바가 없으면 0px 라 화면은 그대로).
  return (
    <header className="bg-[#f8f9ff]/90 backdrop-blur-md text-[#00288e] sticky top-[var(--sample-bar-h,0px)] w-full z-50 border-b border-[#c4c5d5]/30 shadow-[0_1px_3px_0_rgba(15,23,42,0.04)]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full flex justify-between items-center h-16">
        {/* Brand Logo */}
        <a
          href="#hero"
          aria-label="NANO ADVANCED 홈 — 맨 위로"
          className="flex min-h-11 items-center gap-x-2.5 active:scale-[0.98] transition-transform duration-100 ease-out group"
        >
          <img
            alt="NANO ADVANCED Brand Logo"
            className="h-8 w-auto object-contain"
            src={LOGO_URL} referrerPolicy="no-referrer" />
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-x-4 xl:gap-x-6 text-[12px] xl:text-[13px] font-semibold whitespace-nowrap">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`${ link.wideOnly ? 'hidden xl:inline-block' : '' } ${ link.active ? 'text-[#00288e] font-bold border-b-2 border-[#00288e] pb-1' : 'text-[#444653] hover:text-[#00288e]' } transition-colors duration-150 active:scale-[0.98]`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Trailing Action Systems */}
        {/* 언어(KR/EN) 토글이 있었지만 EN 지면이 없어 눌러도 아무것도 바뀌지 않았다 — 죽은 기능이라 걷어냈다(2026-09-17). */}
        <div className="flex items-center gap-x-2">
          {/* CTA Button — 모바일에서는 잘리지 않게 짧은 문구를 쓴다 */}
          <button
            onClick={onOpenConsultation}
            className="bg-[#1e40af] text-white text-[12px] font-semibold px-3 min-h-11 rounded-lg hover:bg-[#00288e] transition-colors duration-150 active:scale-[0.98] shadow-sm flex items-center gap-x-1.5 cursor-pointer"
            type="button"
          >
            <span className="lg:hidden">상담 신청</span>
            <span className="hidden lg:inline">엔지니어링 샘플 및 수율 검토 신청</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex min-h-11 min-w-11 items-center justify-center rounded-lg text-[#444653] hover:text-[#00288e]"
            aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f8f9ff] border-b border-[#c4c5d5]/40 px-4 py-4 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex min-h-11 items-center py-2 text-sm font-semibold text-[#0b1c30] hover:text-[#00288e] border-b border-[#c4c5d5]/20 last:border-none"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full min-h-11 bg-[#00288e] text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
            >
              <span>엔지니어링 기술 상담 접수</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
