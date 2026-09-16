import React, { useState } from 'react';

interface NavbarProps {
  onOpenTelemetry: () => void;
  onOpenTour: () => void;
  onOpenInvestor: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenTelemetry,
  onOpenTour,
  onOpenInvestor,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('technology');

  const navItems = [
    { id: 'technology', label: 'Technology', href: '#technology' },
    { id: 'cultivars', label: 'Cultivars', href: '#cultivars' },
    { id: 'facilities', label: 'Facilities', href: '#facilities' },
    { id: 'b2b-contract', label: 'B2B Contract', href: '#b2b-contract' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#ffffff]/90 backdrop-blur-md border-b border-[#bccac0]/30 shadow-xs transition-all duration-200">
      <div className="flex justify-between items-center w-full px-4 lg:px-12 max-w-7xl mx-auto h-20">
        {/* Logo + Identity */}
        <a 
          href="#" 
          className="flex items-center gap-3.5 group cursor-pointer"
          onClick={() => setActiveSection('')}
        >
          <img
            alt="GREENCUBE AGRI-TECH Brand Logo"
            className="w-10 h-10 object-contain rounded-lg border border-[#bccac0]/40 p-0.5 bg-white shadow-xs group-hover:border-[#006948] transition-colors"
            src="https://lh3.googleusercontent.com/aida/AEtjO1UPJFEO7mdvmQW-F6jZ_TPyvDxg4oW4QXpPXQdhxB5SN82tVMKwyP7HzxgLgi7ND3Vqgz2sIAORnDO6EhzBUXoqSM4hDriyqn8dWrD-sfczEg-NGrNGVxwyhanqsoIu1VJmCoQVESQjfTmfFT-6pdEXKrhdaYQe4RW7_4fA-dQj5Kf-GBLjo6Fq10V61PT45TKRLG0lxWJc7akNr5n7UgUMuG6xlxI_uUv86b3QTuHcD7BK-2VztiDGBt4"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="font-headline text-lg lg:text-xl font-bold tracking-tight text-[#131b2e]">
              GREENCUBE AGRI-TECH
            </span>
            <span className="font-mono text-[10px] lg:text-[11px] text-[#006948] tracking-widest uppercase -mt-0.5 font-semibold">
              그린큐브 AI 수직스마트팜
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => {
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
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Telemetry Icons */}
          <div className="hidden lg:flex items-center space-x-2 mr-1">
            <button
              onClick={onOpenTelemetry}
              className="p-2 text-[#3d4a42] hover:text-[#006948] hover:bg-[#006948]/5 transition-colors rounded-lg border border-[#bccac0]/30 hover:border-[#006948]/40 bg-white cursor-pointer"
              title="실시간 바이오 텔레메트리"
            >
              <span className="material-symbols-outlined text-lg">vital_signs</span>
            </button>
            <button
              onClick={onOpenTelemetry}
              className="p-2 text-[#3d4a42] hover:text-[#006948] hover:bg-[#006948]/5 transition-colors rounded-lg border border-[#bccac0]/30 hover:border-[#006948]/40 bg-white cursor-pointer"
              title="센서 그리드 상태"
            >
              <span className="material-symbols-outlined text-lg">sensors</span>
            </button>
          </div>

          <button
            onClick={onOpenInvestor}
            className="hidden items-center px-3 py-2 font-mono text-[12px] text-[#131b2e] font-medium hover:text-[#006948] transition-colors cursor-pointer"
          >
            Investor Portal
          </button>

          <button
            onClick={onOpenTour}
            className="inline-flex items-center justify-center px-3.5 lg:px-4 py-2.5 bg-[#006948] text-white font-mono text-[11px] lg:text-[12px] font-semibold rounded-lg shadow-xs hover:bg-[#00855d] active:scale-95 transition-all duration-150 cursor-pointer"
          >
            Request Facility Tour
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-[#bccac0]/40 text-[#131b2e] hover:text-[#006948] cursor-pointer"
            aria-label="Toggle Menu"
          >
            <span className="material-symbols-outlined">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#bccac0]/30 bg-white px-6 py-4 space-y-3 shadow-lg">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => {
                setActiveSection(item.id);
                setMobileMenuOpen(false);
              }}
              className="block font-mono text-sm py-2 text-[#131b2e] hover:text-[#006948] border-b border-gray-100"
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
              className="flex items-center justify-center gap-2 py-2 border border-[#bccac0]/50 rounded-lg text-xs font-mono text-[#131b2e]"
            >
              <span className="material-symbols-outlined text-sm">vital_signs</span>
              실시간 텔레메트리 관제
            </button>
            <button
              onClick={() => {
                onOpenInvestor();
                setMobileMenuOpen(false);
              }}
              className="py-2 text-xs font-mono text-[#131b2e] hover:text-[#006948]"
            >
              Investor Portal (IR 공시 & ESG)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
