import React, { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { LOGO_IMG_URL } from '../data/mockData';

interface HeaderProps {
  onOpenDeckModal: () => void;
}

/** 데스크톱 가로 네비와 모바일 메뉴가 같은 목록을 쓴다 — 한쪽만 고쳐져 어긋나던 것을 막는다 */
const NAV_ITEMS = [
  { id: 'vision', label: 'Corporate Vision' },
  { id: 'pipeline', label: 'R&D Pipeline' },
  { id: 'platform', label: 'PROTEA-AI Platform' },
  { id: 'infrastructure', label: 'cGMP Infrastructure' },
  { id: 'sab', label: 'SAB' },
  { id: 'wizard', label: 'Global Partnerships' },
] as const;

export const Header: React.FC<HeaderProps> = ({ onOpenDeckModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // 예전에는 Corporate Vision 에 밑줄이 **항상** 켜져 있었다(어디를 보든 같은 표시 = 죽은 표시).
  // 실제로 보고 있는 구역을 따라가게 한다.
  const [activeSection, setActiveSection] = useState<string>('vision');

  useEffect(() => {
    const sections = NAV_ITEMS.map(item => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      // 고정 헤더(80px) 밑으로 들어온 부분만 센다
      { rootMargin: '-80px 0px -55% 0px', threshold: [0.01, 0.25, 0.5] },
    );
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    // 구역 머리가 고정 헤더 밑에 깔리지 않게 하는 여백은 각 <section> 의 scroll-mt-* 가 맡는다
    // (푸터의 #앵커 링크도 같은 여백을 쓰게 하려고 CSS 쪽에 둔다).
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // 로고가 href="#" 였다 — 아무 데도 가지 않으면서 주소만 더럽히던 자리라 맨 위로 올리는 버튼으로 바꾼다
  const scrollToTop = () => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // 공용 샘플 바(44px)에 가리지 않게 top 을 변수로 둔다 — 바가 없으면 0px 라 지금 화면은 그대로다
    <header className="fixed top-[var(--sample-bar-h,0px)] left-0 right-0 z-50 bg-[#ffffff]/90 backdrop-blur-md shadow-xs border-b border-[#c4c5d5]/30 h-20">
      {/*
        gap 이 없어 1280~1440 에서 워드마크와 첫 내비(「Corporate Vision」) 사이가 2px, 마지막 내비와 CTA 사이가 1px 이었다
        (나머지 항목 간격은 32px). 최소 간격을 주고, lg 구간에서는 내비 간격·CTA 라벨을 조금 줄여 눌리지 않게 한다.
      */}
      <div className="flex items-center justify-between gap-4 xl:gap-6 px-6 lg:px-12 max-w-7xl mx-auto h-full">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="맨 위로"
          className="flex min-h-11 items-center space-x-3 text-left text-[20px] font-bold text-[#00288e] tracking-tight group cursor-pointer"
        >
          <img
            alt="Celebris Biopharma Logo"
            className="h-10 w-10 object-contain rounded-lg shadow-xs group-hover:scale-105 transition-transform"
            src={LOGO_IMG_URL}
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="text-[16px] lg:text-[20px] font-bold text-[#00288e] tracking-tight leading-tight whitespace-nowrap">
              CELEBRIS BIOPHARMA
            </span>
            <span className="text-[11px] font-code-mono text-[#757684] uppercase tracking-wider">
              Oncology TPD & ADC
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              aria-current={activeSection === item.id ? 'true' : undefined}
              className={`transition-colors text-[12px] xl:text-[13px] cursor-pointer whitespace-nowrap ${
                activeSection === item.id
                  ? 'text-[#00288e] font-semibold border-b-2 border-[#00288e] pb-1'
                  : 'text-[#444653] font-medium hover:text-[#00288e]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Trailing Action */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            onClick={() => scrollToSection('wizard')}
            className="inline-flex min-h-11 items-center space-x-2 bg-[#1e40af] hover:bg-[#00288e] text-white px-5 py-2.5 rounded-lg text-[13px] font-semibold transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            {/* 1440 에서도 워드마크가 한 줄로 남게 CTA 라벨을 줄인다 — 긴 라벨은 아주 넓은 화면에서만 */}
            <span className="2xl:hidden">L/O Inquiry</span>
            <span className="hidden 2xl:inline">L/O &amp; Partnering Inquiry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-[#0b1c30] hover:text-[#00288e] hover:bg-[#eff4ff] focus:outline-none cursor-pointer"
            aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        // 메뉴가 길어 화면을 넘던 자리 — 헤더 아래 남는 높이만큼만 쓰고 그 안에서 스크롤한다
        <div className="lg:hidden max-h-[calc(100dvh-5rem-var(--sample-bar-h,0px))] overflow-y-auto bg-white border-b border-[#c4c5d5]/40 px-6 py-4 space-y-1 shadow-lg">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              aria-current={activeSection === item.id ? 'true' : undefined}
              className={`flex min-h-11 w-full items-center rounded-lg px-1 text-left text-sm hover:bg-[#eff4ff] cursor-pointer ${
                activeSection === item.id
                  ? 'font-semibold text-[#00288e]'
                  : 'font-medium text-[#444653] hover:text-[#00288e]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 mt-2 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => scrollToSection('wizard')}
              className="w-full min-h-11 flex items-center justify-center space-x-2 bg-[#1e40af] hover:bg-[#00288e] text-white py-2.5 rounded-lg text-sm font-semibold cursor-pointer"
            >
              <span>L/O &amp; Partnering Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {/* 모바일 메뉴에서도 파이프라인 덱 안내로 갈 수 있게 — 이전에는 히어로 버튼이 유일한 입구였다 */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDeckModal();
              }}
              className="w-full min-h-11 flex items-center justify-center space-x-2 border border-[#c4c5d5]/60 text-[#0b1c30] hover:bg-[#eff4ff] py-2.5 rounded-lg text-sm font-medium cursor-pointer"
            >
              <span>글로벌 임상 파이프라인 덱 신청</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
