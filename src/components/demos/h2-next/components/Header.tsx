import React, { useState, useEffect } from 'react';
import { LOGO_URL } from '../data/mockData';
import { Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onOpenConsultation?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('vision');
  // 로고는 외부 호스트 직접 참조라 차단·만료되면 깨진 그림이 뜬다 — 그때는 글자 마크로 대신한다.
  const [logoFailed, setLogoFailed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['vision', 'pillars', 'nodes', 'calculator', 'governance', 'ir'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '기업 비전', href: '#vision', id: 'vision' },
    { label: '그린수소 솔루션', href: '#pillars', id: 'pillars' },
    { label: '실시간 발전 거점', href: '#nodes', id: 'nodes' },
    { label: 'PPA 산출기', href: '#calculator', id: 'calculator' },
    { label: 'ESG 경영 공시', href: '#governance', id: 'governance' },
    { label: 'IR 투자정보', href: '#ir', id: 'ir' },
  ];

  return (
    <header
      // 공용 샘플 바(44px)에 가려지지 않게 top-0 대신 --sample-bar-h 를 쓴다 — 바가 없으면 0px 라 화면은 그대로다.
      className={`fixed top-[var(--sample-bar-h,0px)] left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#bcc9c6]/30'
          : 'bg-white/85 backdrop-blur-md border-b border-[#bcc9c6]/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-12 flex justify-between items-center h-20">
        {/* Brand Anchor */}
        <a
          id="brand-logo-anchor"
          aria-label="H2 NEXT 홈"
          className="flex min-w-0 items-center gap-2 py-2 group"
          href="#vision"
        >
          {logoFailed ? (
            <span
              aria-hidden="true"
              className="h-10 w-10 shrink-0 rounded-lg bg-white border border-[#bcc9c6]/40 flex items-center justify-center text-[13px] font-bold text-[#00685f]"
            >
              H2
            </span>
          ) : (
            <img
              id="brand-logo-img"
              alt="H2 NEXT Brand Logo"
              className="h-10 w-10 shrink-0 object-contain rounded-lg p-0.5 bg-white border border-[#bcc9c6]/40 group-hover:scale-105 transition-transform duration-200"
              src={LOGO_URL}
              referrerPolicy="no-referrer"
              onError={() => setLogoFailed(true)}
            />
          )}
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-[#00685f] leading-none whitespace-nowrap">
              H2 NEXT
            </span>
            <span className="text-[10px] font-mono text-[#6d7a77] tracking-wider mt-1 hidden lg:block">
              ENERGY SYSTEMS
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        {/* 가로 메뉴가 처음 나타나는 1024~1279 구간이 가장 빡빡하다(기준선은 375·768·1440 만 쟀다).
            그 구간만 글자·간격을 줄이고, 1280 이상은 원래 값(gap-7 · 15px)으로 되돌린다. */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                id={`nav-${link.id}`}
                href={link.href}
                className={`text-[13px] xl:text-[15px] font-semibold whitespace-nowrap transition-all pb-1 ${
                  isActive
                    ? 'text-[#00685f] border-b-2 border-[#00685f]'
                    : 'text-[#3d4947] hover:text-[#00685f]'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Trailing Primary Action */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* 폭 예외(sm=640): lg 미만을 한 덩어리로 다루면 375 에서 이 버튼이 로고 글자를 덮는다.
              모바일/웹 구분이 아니라 머리띠가 물리적으로 안 들어가는 폭의 문제라 sm 으로 끊고,
              감춘 구간은 햄버거 서랍 안에 같은 버튼이 그대로 있다(죽은 자리 아님). */}
          <a
            id="cta-header-ppa"
            className="hidden sm:inline-flex items-center gap-2 bg-[#00685f] hover:bg-[#008378] text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-200 active:scale-95 whitespace-nowrap"
            href="#consultation"
          >
            <span className="xl:hidden">PPA 제휴 문의</span>
            <span className="hidden xl:inline">RE100 전력 PPA 제휴 문의</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </a>

          {/* Mobile menu hamburger — 탭 대상 44px */}
          <button
            id="mobile-menu-toggle"
            type="button"
            aria-label={mobileMenuOpen ? '모바일 메뉴 닫기' : '모바일 메뉴 열기'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-[#0b1c30] hover:bg-slate-100 lg:hidden cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#bcc9c6]/40 px-6 py-4 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-base font-semibold text-[#0b1c30] hover:text-[#00685f]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <a
              href="#consultation"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-[#00685f] text-white py-3 rounded-lg font-semibold"
            >
              RE100 전력 PPA 제휴 문의
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
