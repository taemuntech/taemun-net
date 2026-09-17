import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenTelemetry: () => void;
  onOpenTour: () => void;
  onOpenInvestor: () => void;
}

const NAV_ITEMS = [
  { id: 'technology', label: 'Technology', href: '#technology' },
  { id: 'cultivars', label: 'Cultivars', href: '#cultivars' },
  { id: 'facilities', label: 'Facilities', href: '#facilities' },
  { id: 'b2b-contract', label: 'B2B Contract', href: '#b2b-contract' },
];

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTelemetry,
  onOpenTour,
  onOpenInvestor,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // 밑줄이 실제로 보고 있는 구역을 따라가게 한다 — 예전엔 눌러야만 바뀌고 처음엔 엉뚱한 곳이 켜져 있었다.
  useEffect(() => {
    const targets = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      // 헤더(80px)와 그 위 바에 가린 구간은 빼고 화면 위쪽 1/3 에 들어온 구역을 현재로 본다
      { rootMargin: '-120px 0px -60% 0px', threshold: 0 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    setActiveSection('');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    // 공용 샘플 바(44px)에 가려지지 않게 top-0 대신 --sample-bar-h 를 쓴다 — 바가 없으면 0px 라 화면은 그대로다.
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 bg-[#ffffff]/90 backdrop-blur-md border-b border-[#bccac0]/30 shadow-xs transition-all duration-200">
      <div className="flex justify-between items-center w-full gap-3 px-4 lg:px-12 max-w-7xl mx-auto h-20">
        {/* Logo + Identity — 빈 해시 앵커라 아무 데도 가지 않던 죽은 링크였다. 맨 위로 올리는 버튼으로 바꿨다. */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="맨 위로"
          className="flex items-center gap-2.5 lg:gap-3.5 group cursor-pointer text-left min-w-0"
        >
          <img
            alt="GREENCUBE AGRI-TECH Brand Logo"
            className="w-10 h-10 shrink-0 object-contain rounded-lg border border-[#bccac0]/40 p-0.5 bg-white shadow-xs group-hover:border-[#006948] transition-colors"
            src="https://lh3.googleusercontent.com/aida/AEtjO1UPJFEO7mdvmQW-F6jZ_TPyvDxg4oW4QXpPXQdhxB5SN82tVMKwyP7HzxgLgi7ND3Vqgz2sIAORnDO6EhzBUXoqSM4hDriyqn8dWrD-sfczEg-NGrNGVxwyhanqsoIu1VJmCoQVESQjfTmfFT-6pdEXKrhdaYQe4RW7_4fA-dQj5Kf-GBLjo6Fq10V61PT45TKRLG0lxWJc7akNr5n7UgUMuG6xlxI_uUv86b3QTuHcD7BK-2VztiDGBt4"
            referrerPolicy="no-referrer"
          />
          {/* 375 에서 "GREENCUBE AGRI-TECH" 가 두 줄로 쪼개지고 "수직스마트팜" 이 낱자로 끊겼다 —
              한 줄로 고정하고 좁은 화면에서는 글자만 한 단계 줄인다. */}
          <span className="flex flex-col min-w-0">
            <span className="font-headline text-[13px] sm:text-base lg:text-xl font-bold tracking-tight text-[#131b2e] truncate">
              GREENCUBE AGRI-TECH
            </span>
            <span className="font-mono text-[9px] sm:text-[10px] lg:text-[11px] text-[#006948] tracking-widest uppercase -mt-0.5 font-semibold truncate">
              그린큐브 AI 수직스마트팜
            </span>
          </span>
        </button>

        {/* Desktop Navigation Links */}
        {/* 가로 막대는 1280(xl) 부터 — 1024 에서는 상호가 「GREENCUBE…」 로 잘려 서랍으로 내린다 */}
        <nav className="hidden xl:flex shrink-0 items-center space-x-8">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveSection(item.id)}
                className={`font-mono text-[13px] font-medium tracking-wide transition-colors duration-150 py-1 ${ isActive ? 'text-[#006948] border-b-2 border-[#006948]' : 'text-[#3d4a42] hover:text-[#006948]' }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Trailing Action Cluster */}
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          {/* 관제 모달을 여는 아이콘. 예전엔 같은 동작을 하는 아이콘이 둘이라(vital_signs·sensors) 하나를 지웠다. */}
          <button
            onClick={onOpenTelemetry}
            aria-label="실시간 바이오 텔레메트리 열기"
            className="hidden lg:flex items-center justify-center min-w-11 min-h-11 text-[#3d4a42] hover:text-[#006948] hover:bg-[#006948]/5 transition-colors rounded-lg border border-[#bccac0]/30 hover:border-[#006948]/40 bg-white cursor-pointer"
            title="실시간 바이오 텔레메트리"
          >
            <span className="material-symbols-outlined text-lg">vital_signs</span>
          </button>

          {/* 예전엔 `hidden` 만 붙어 있어 어느 폭에서도 뜨지 않던 버튼이다 — 데스크톱에서 실제로 보이게 했다. */}
          <button
            onClick={onOpenInvestor}
            className="hidden lg:inline-flex items-center px-3 py-2 min-h-11 font-mono text-[12px] text-[#131b2e] font-medium hover:text-[#006948] transition-colors cursor-pointer whitespace-nowrap"
          >
            Investor Portal
          </button>

          {/* 좁은 화면에서 "Request Facility Tour" 가 세 줄로 접혀 헤더를 밀어냈다 — 모바일은 짧은 이름으로 */}
          <button
            onClick={onOpenTour}
            className="inline-flex items-center justify-center px-3 lg:px-4 py-2.5 min-h-11 bg-[#006948] text-white font-mono text-[11px] lg:text-[12px] font-semibold rounded-lg shadow-xs hover:bg-[#00855d] active:scale-95 transition-all duration-150 cursor-pointer whitespace-nowrap"
          >
            <span className="lg:hidden">투어 예약</span>
            <span className="hidden lg:inline">Request Facility Tour</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden flex items-center justify-center min-w-11 min-h-11 rounded-lg border border-[#bccac0]/40 text-[#131b2e] hover:text-[#006948] cursor-pointer"
            aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={mobileMenuOpen}
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-[#bccac0]/30 bg-white px-6 py-4 space-y-2 shadow-lg">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => {
                setActiveSection(item.id);
                setMobileMenuOpen(false);
              }}
              className="flex items-center min-h-11 font-mono text-sm text-[#131b2e] hover:text-[#006948] border-b border-gray-100"
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenTelemetry();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 min-h-11 border border-[#bccac0]/50 rounded-lg text-xs font-mono text-[#131b2e] cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">vital_signs</span>
              실시간 텔레메트리 관제
            </button>
            <button
              onClick={() => {
                onOpenInvestor();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center min-h-11 text-xs font-mono text-[#131b2e] hover:text-[#006948] cursor-pointer"
            >
              Investor Portal (IR 공시 &amp; ESG)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
