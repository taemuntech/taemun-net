import React, { useState } from 'react';
import { Shield, Activity, Compass, Hammer, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onOpenConsultation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-40 bg-[#0d1117]/95 backdrop-blur-md border-b border-[#30363d] text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Telemetry Status */}
        <div className="flex items-center space-x-4">
          <a href="#hero" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded bg-[#ff6b2b] flex items-center justify-center text-black font-black text-xl shadow-[0_0_15px_rgba(255,107,43,0.4)] group-hover:scale-105 transition-transform">
              TC
            </div>
            <div>
              <div className="font-mono font-black tracking-widest text-lg text-white flex items-center gap-2">
                TERRA-CORE
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#ff6b2b]/20 text-[#ff6b2b] border border-[#ff6b2b]/40 font-semibold">
                  TBM 14.2M
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#8b949e] uppercase tracking-wider">
                Subterranean Engineering &amp; Tunnel Dynamics
              </p>
            </div>
          </a>

          {/* Subterranean Drive Status Badge (Desktop Only) */}
          <div className="hidden lg:flex items-center space-x-2 pl-6 border-l border-[#30363d]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-xs text-emerald-400 tracking-wider">
              BEDROCK DRIVE: -80.0M ACTIVE
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-xs font-mono tracking-wider text-[#c9d1d9]">
          <a href="#strata-hud" className="hover:text-[#ff6b2b] transition-colors flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#ff6b2b]" />
            STRATA HUD
          </a>
          <a href="#tbm-dynamics" className="hover:text-[#ff6b2b] transition-colors flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-[#ff6b2b]" />
            14.2M TBM
          </a>
          <a href="#strata-zones" className="hover:text-[#ff6b2b] transition-colors flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#ff6b2b]" />
            4대 지층 단면
          </a>
          <a href="#materials" className="hover:text-[#ff6b2b] transition-colors flex items-center gap-1.5">
            <Hammer className="w-3.5 h-3.5 text-[#ff6b2b]" />
            토목 신소재
          </a>
        </nav>

        {/* CTA & Mobile Hamburger */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenConsultation}
            className="hidden lg:inline-flex items-center space-x-2 px-5 py-2.5 rounded bg-[#ff6b2b] hover:bg-[#ff8246] text-black font-mono font-bold text-xs tracking-wider transition-all shadow-lg hover:shadow-[#ff6b2b]/30"
          >
            <span>대심도 기술 제안</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#8b949e] hover:text-white border border-[#30363d] rounded"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#30363d] bg-[#0d1117] px-4 py-4 space-y-3 font-mono text-xs">
          <a
            href="#strata-hud"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#c9d1d9] hover:text-[#ff6b2b] border-b border-[#21262d]"
          >
            01. STRATA HUD (수직 심도)
          </a>
          <a
            href="#tbm-dynamics"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#c9d1d9] hover:text-[#ff6b2b] border-b border-[#21262d]"
          >
            02. 14.2M 쉴드 TBM
          </a>
          <a
            href="#strata-zones"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#c9d1d9] hover:text-[#ff6b2b] border-b border-[#21262d]"
          >
            03. 4대 지층 단면 핫스팟
          </a>
          <a
            href="#materials"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-[#c9d1d9] hover:text-[#ff6b2b] border-b border-[#21262d]"
          >
            04. 토목 지반 신소재
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenConsultation();
            }}
            className="w-full py-3 mt-2 rounded bg-[#ff6b2b] text-black font-bold tracking-wider"
          >
            대심도 기술 제안 및 자문 의뢰
          </button>
        </div>
      )}
    </header>
  );
};
