"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { LOGO_URL } from '../data/hanokData';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('philosophy');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['philosophy', 'technology', 'master-builder', 'projects', 'roadmap', 'consultation'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: '한옥의 미학', href: '#philosophy', id: 'philosophy' },
    { label: '주요 완공작', href: '#projects', id: 'projects' },
    { label: '현대식 한옥 단열·구조 공법', href: '#technology', id: 'technology' },
    { label: '도편수 및 장인 소개', href: '#master-builder', id: 'master-builder' },
    { label: '건축 상담', href: '#consultation', id: 'consultation' },
  ];

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-[#faf9f7]/95 backdrop-blur-md border-[#c8c7bf]/40 shadow-xs'
          : 'bg-[#faf9f7] border-[#c8c7bf]/30'
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-16">
        {/* Brand Logo Cluster */}
        <a
          id="brand-logo-link"
          href="#"
          className="flex items-center gap-3 group"
          aria-label="소담재 건축공방 홈"
        >
          <img
            src={LOGO_URL}
            alt="소담재 건축공방 로고"
            className="h-10 w-10 object-contain rounded-xs transition-transform duration-200 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-serif text-xl lg:text-2xl text-[#161714] tracking-tight font-normal leading-tight">
              Sodamjae Hanok Architecture
            </span>
            <span className="text-[11px] lg:text-xs text-[#474741] tracking-wider font-sans">
              소담재 건축공방 · 전통한옥 설계·시공
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav id="desktop-navigation" className="hidden lg:flex items-center gap-7">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                id={`nav-link-${item.id}`}
                href={item.href}
                className={`text-[13px] tracking-wider font-medium transition-colors pb-1 border-b-2 ${
                  isActive
                    ? 'border-[#161714] text-[#161714]'
                    : 'border-transparent text-[#474741] hover:text-[#904b35]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Primary Action CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            id="header-consult-cta"
            onClick={onOpenConsultation}
            className="inline-flex items-center justify-center text-[13px] font-medium tracking-wide bg-[#161714] text-[#faf9f7] px-5 py-2.5 rounded-sm hover:bg-[#904b35] transition-colors duration-200 active:scale-[0.99] cursor-pointer"
          >
            대지 현장 상담 예약
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          id="mobile-menu-button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#161714] hover:text-[#904b35] focus:outline-none"
          aria-label="메뉴 열기/닫기"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden border-t border-[#c8c7bf]/30 bg-[#faf9f7] px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200"
        >
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-serif text-[#161714] hover:text-[#904b35] py-1 border-b border-[#c8c7bf]/10 flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[#777770]" />
              </a>
            ))}
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full text-center text-sm font-medium bg-[#161714] text-[#faf9f7] py-3 rounded-sm hover:bg-[#904b35] transition-colors"
            >
              대지 현장 상담 예약
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
