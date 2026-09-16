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
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#bcc9c6]/30'
          : 'bg-white/85 backdrop-blur-md border-b border-[#bcc9c6]/20'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12 flex justify-between items-center h-20">
        {/* Brand Anchor */}
        <a
          id="brand-logo-anchor"
          aria-label="H2 NEXT 홈"
          className="flex items-center gap-2 group"
          href="#vision"
        >
          <img
            id="brand-logo-img"
            alt="H2 NEXT Brand Logo"
            className="h-10 w-10 object-contain rounded-lg p-0.5 bg-white border border-[#bcc9c6]/40 group-hover:scale-105 transition-transform duration-200"
            src={LOGO_URL}
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-[#00685f] leading-none">
              H2 NEXT
            </span>
            <span className="text-[10px] font-mono text-[#6d7a77] tracking-wider mt-1 hidden lg:block">
              ENERGY SYSTEMS
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                id={`nav-${link.id}`}
                href={link.href}
                className={`text-[15px] font-semibold transition-all pb-1 ${
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
        <div className="flex items-center gap-3">
          <a
            id="cta-header-ppa"
            className="inline-flex items-center gap-2 bg-[#00685f] hover:bg-[#008378] text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm hover:shadow transition-all duration-200 active:scale-95 whitespace-nowrap"
            href="#consultation"
          >
            <span>RE100 전력 PPA 제휴 문의</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {/* Mobile menu hamburger */}
          <button
            id="mobile-menu-toggle"
            aria-label="모바일 메뉴 열기"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#0b1c30] hover:bg-slate-100 lg:hidden"
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
              className="block py-2 text-base font-semibold text-[#0b1c30] hover:text-[#00685f]"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 border-t border-slate-100">
            <a
              href="#consultation"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-[#00685f] text-white py-2.5 rounded-lg font-semibold"
            >
              RE100 전력 PPA 제휴 문의
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
