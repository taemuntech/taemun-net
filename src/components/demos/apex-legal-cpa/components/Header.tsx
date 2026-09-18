import React, { useState, useEffect } from 'react';
import { LOGO_IMAGE } from '../data/mockData';
import { User, Menu, X, Phone, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenAudit: () => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAudit, activeSection }) => {
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
    { id: 'hero', label: 'I. THE COLONNADE & CREED', href: '#hero' },
    { id: 'matrix-section', label: 'II. LEET·CPA ADMISSION MATRIX', href: '#matrix-section' },
    { id: 'carrel-floorplan', label: 'III. CARREL FLOORPLAN', href: '#carrel-floorplan' },
    { id: 'faculty-section', label: 'IV. SUPREME FACULTY', href: '#faculty-section' },
    { id: 'audit-form', label: 'V. ADMISSION AUDIT 2025/26', href: '#audit-form' },
  ];

  return (
    <header className={`fixed top-[var(--sample-bar-h,0px)] w-full z-50 transition-all duration-200 ${
      isScrolled ? 'bg-[#f8f9ff]/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.06)]' : 'bg-[#f8f9ff]/90 backdrop-blur-md shadow-[0_1px_4px_rgba(0,0,0,0.03)]'
    }`}>
      <div className="h-20 w-full px-4 lg:px-6 lg:px-8 xl:px-12 flex items-center justify-between border-b border-[#0d1c2f]/10">
        {/* Brand Logo & Name */}
        <a href="#hero" className="flex items-center gap-3 group">
          <img
            src={LOGO_IMAGE}
            alt="APEX Legal & CPA Academy Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-headline-md text-lg lg:text-xl tracking-tight uppercase text-[#0d1c2f] font-bold">
              APEX ACADEMY
            </span>
            <span className="font-label-sm text-[10px] uppercase tracking-widest text-[#45464d]">
              Judicial & Fiscal Scholastic Collegium
            </span>
          </div>
        </a>

        {/* Desktop Nav Items */}
        <nav className="hidden xl:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                className={`font-label-md text-xs uppercase tracking-wider py-1.5 px-3 transition-colors ${
                  isActive
                    ? 'bg-[#131b2e] text-[#eff4ff] font-semibold'
                    : 'text-[#45464d] hover:text-[#0d1c2f] hover:bg-[#eff4ff]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="hidden lg:flex flex-col text-right">
            <span className="font-label-sm text-[10px] text-[#45464d] uppercase tracking-widest flex items-center justify-end gap-1">
              <Phone className="w-2.5 h-2.5 text-[#cf6721]" />
              Dean Office Direct
            </span>
            <a
              href="tel:025887700"
              className="font-label-md text-xs text-[#0d1c2f] tracking-wider font-semibold hover:text-[#cf6721] transition-colors"
            >
              +82 (02) 588-7700
            </a>
          </div>

          <button
            onClick={onOpenAudit}
            className="bg-[#000000] text-white font-label-md text-xs uppercase tracking-wider py-2 px-3 lg:px-4 hover:bg-[#131b2e] hover:text-[#dae2fd] transition-all flex items-center gap-1.5 shadow-sm active:translate-y-0.5"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#ffb68e]" />
            <span className="hidden lg:inline">입학 전형 스크리닝 신청</span>
            <span className="lg:hidden">스크리닝 신청</span>
            <span className="text-[10px] opacity-80">(APPLY)</span>
          </button>

          <button
            aria-label="User Profile"
            className="w-8 h-8 rounded-full bg-[#000000] flex items-center justify-center text-white hover:bg-[#131b2e] transition-colors"
            title="법조·회계 수험생 포털"
            onClick={onOpenAudit}
          >
            <User className="w-4 h-4 text-white" />
          </button>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 text-[#0d1c2f] hover:bg-[#e6eeff] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#f8f9ff] border-b border-[#0d1c2f]/15 px-6 py-4 space-y-2 shadow-lg animate-in slide-in-from-top-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block font-label-md text-xs uppercase tracking-wider py-2 px-3 hover:bg-[#eff4ff] text-[#0d1c2f]"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 border-t border-[#0d1c2f]/10 flex items-center justify-between text-xs text-[#45464d] font-label-sm">
            <span>Dean Office Direct: +82 (02) 588-7700</span>
            <span className="text-[#cf6721] font-semibold">SEOCHO SANCTUARY</span>
          </div>
        </div>
      )}
    </header>
  );
};
