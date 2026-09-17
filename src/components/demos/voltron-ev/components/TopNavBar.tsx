import React, { useState } from 'react';
import { Cpu, Terminal, Shield, Gauge, ShieldCheck, Menu, X } from 'lucide-react';

interface TopNavBarProps {
  onOpenTelemetryHud?: () => void;
  onOpenRfq?: () => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({ onOpenTelemetryHud, onOpenRfq }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // 공용 샘플 바에 가려지지 않게 top-0 대신 --sample-bar-h 를 쓴다 — 바가 없으면 0px 라 화면은 그대로다.
    <header
      id="top-nav-bar"
      className="bg-[#0b0e13]/90 backdrop-blur-md sticky top-[var(--sample-bar-h,0px)] z-50 border-b border-[#3b494c]/30 shadow-[0_4px_24px_rgba(0,229,255,0.08)]"
    >
      <div className="flex justify-between items-center gap-3 w-full px-6 lg:px-12 py-3.5 max-w-[1720px] mx-auto">
        {/* BRAND / LOGO CLUSTER */}
        <a
          href="#powertrain"
          className="flex items-center gap-2.5 lg:gap-3.5 group cursor-pointer min-w-0"
          id="nav-logo-link"
        >
          <div className="relative shrink-0 flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 rounded border border-[#00e5ff]/40 bg-[#1d2025] p-1 shadow-[0_0_12px_rgba(0,229,255,0.2)] group-hover:border-[#00e5ff] transition-all">
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1Vfapt3CAgxnMQ5fSg-h_yZdJQOjQiRF3FYJvRx9sRg16uGwVJ9hzT3XgtCKxbyWON1K3Tcy4ewnGBKyoVkzZp99aP5Vwd8CrEoiWQUch8Qdn6MYbpoAI3x29LlTPM1_Mpj8zD7CMBfB4rD7JFZTbGSYPlXdlPcRTQTMy1NNB6snxpIx99ohMowlH4hsbfQ_5CSKL4sLkwNia7jMdta5W7_2P1CXZqyz7c5F2eTWJqJQvmPEUKXlnIa5w"
              alt="VOLTRON ADVANCED EV Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>
          {/* 375px 에서 브랜드명이 3줄로 접히며 오른쪽 RFQ 버튼과 겹쳤다 — 한 줄로 묶고 넘치면 말줄임한다. */}
          <div className="flex flex-col min-w-0">
            <span className="font-display text-[15px] sm:text-[17px] lg:text-xl font-bold tracking-tight text-[#c3f5ff] uppercase group-hover:text-[#00e5ff] transition-colors whitespace-nowrap overflow-hidden text-ellipsis">
              VOLTRON ADVANCED EV
            </span>
            <span className="font-display text-[8px] lg:text-[9px] tracking-widest text-[#00e5ff] font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
              TIER-1 POWERTRAIN ARCHITECTURE // ASIL-D
            </span>
          </div>
        </a>

        {/* DESKTOP NAVIGATION */}
        <nav
          id="desktop-nav"
          className="hidden min-[1400px]:flex shrink-0 items-center gap-5 font-display text-[10px] tracking-widest uppercase font-semibold whitespace-nowrap"
        >
          <button
            onClick={() => scrollTo('powertrain')}
            className="text-[#00e5ff] border-b-2 border-[#00e5ff] pb-1 font-bold transition-all hover:text-[#00e5ff]"
            id="nav-item-powertrain"
          >
            POWERTRAIN 800V
          </button>
          <button
            onClick={() => scrollTo('sic-semiconductor')}
            className="text-[#bac9cc] hover:text-[#c3f5ff] transition-colors pb-1"
            id="nav-item-sic"
          >
            SiC ARCHITECTURE
          </button>
          <button
            onClick={() => scrollTo('charging-sim')}
            className="text-[#bac9cc] hover:text-[#c3f5ff] transition-colors pb-1"
            id="nav-item-sim"
          >
            CHARGING SIM
          </button>
          <button
            onClick={() => scrollTo('certifications')}
            className="text-[#bac9cc] hover:text-[#c3f5ff] transition-colors pb-1"
            id="nav-item-certs"
          >
            CERTIFICATIONS
          </button>
          <button
            onClick={() => scrollTo('rfq-wizard')}
            className="text-[#bac9cc] hover:text-[#c3f5ff] transition-colors pb-1"
            id="nav-item-rfq"
          >
            OEM GATEWAY
          </button>
        </nav>

        {/* TRAILING ACTIONS */}
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          {/* Status Icons */}
          <div className="hidden min-[1400px]:flex items-center gap-2 pr-2">
            <button
              onClick={() => scrollTo('sic-semiconductor')}
              className="text-[#849396] hover:text-[#00e5ff] p-1.5 rounded hover:bg-[#1d2025] transition-colors"
              title="Semiconductor Core"
              id="header-chip-icon-btn"
            >
              <Cpu className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollTo('telemetry-hud')}
              className="text-[#849396] hover:text-[#00e5ff] p-1.5 rounded hover:bg-[#1d2025] transition-colors"
              title="Telemetry Terminal"
              id="header-terminal-icon-btn"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollTo('certifications')}
              className="text-[#849396] hover:text-[#00e5ff] p-1.5 rounded hover:bg-[#1d2025] transition-colors"
              title="ASIL-D Hardware Encryption Lock"
              id="header-security-icon-btn"
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => {
              if (onOpenTelemetryHud) onOpenTelemetryHud();
              scrollTo('telemetry-hud');
            }}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-display uppercase tracking-wider text-[#00e5ff] border border-[#00e5ff]/40 bg-[#191c21] hover:border-[#00e5ff] hover:shadow-[0_0_12px_rgba(0,229,255,0.35)] transition-all font-bold"
            id="btn-nav-telemetry-hud"
          >
            <Gauge className="w-3.5 h-3.5" />
            TELEMETRY HUD
          </button>

          <button
            onClick={() => {
              if (onOpenRfq) onOpenRfq();
              scrollTo('rfq-wizard');
            }}
            className="hidden sm:inline-flex relative group clip-chamfer px-3 lg:px-4 min-h-11 py-2 bg-gradient-to-r from-[#00e5ff] to-cyan-500 text-[#0b0e13] font-display text-[11px] lg:text-xs tracking-wider uppercase font-bold shadow-[0_0_16px_rgba(0,229,255,0.4)] hover:shadow-[0_0_24px_rgba(0,229,255,0.7)] transition-all active:scale-[0.98] whitespace-nowrap"
            id="btn-nav-confidential-rfq"
          >
            <span className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5] shrink-0" />
              CONFIDENTIAL RFQ
            </span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-[1400px]:hidden p-2.5 -mr-1.5 text-[#bac9cc] hover:text-[#00e5ff]"
            id="btn-mobile-menu-toggle"
            aria-label="Toggle Navigation"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="min-[1400px]:hidden bg-[#101319] border-b border-[#3b494c] px-6 py-3 space-y-1 font-display text-xs tracking-wider uppercase max-h-[calc(100dvh-8rem)] overflow-y-auto"
        >
          <button
            onClick={() => {
              if (onOpenRfq) onOpenRfq();
              scrollTo('rfq-wizard');
            }}
            className="flex items-center justify-center gap-1.5 w-full min-h-11 py-2 mb-2 clip-chamfer bg-gradient-to-r from-[#00e5ff] to-cyan-500 text-[#0b0e13] font-bold"
          >
            <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5] shrink-0" />
            CONFIDENTIAL RFQ
          </button>
          <button
            onClick={() => scrollTo('powertrain')}
            className="flex items-center w-full text-left min-h-11 py-2 text-[#00e5ff] font-bold"
          >
            POWERTRAIN 800V
          </button>
          <button
            onClick={() => scrollTo('sic-semiconductor')}
            className="flex items-center w-full text-left min-h-11 py-2 text-[#bac9cc] hover:text-[#c3f5ff]"
          >
            SiC ARCHITECTURE
          </button>
          <button
            onClick={() => scrollTo('charging-sim')}
            className="flex items-center w-full text-left min-h-11 py-2 text-[#bac9cc] hover:text-[#c3f5ff]"
          >
            CHARGING SIM
          </button>
          <button
            onClick={() => scrollTo('certifications')}
            className="flex items-center w-full text-left min-h-11 py-2 text-[#bac9cc] hover:text-[#c3f5ff]"
          >
            CERTIFICATIONS
          </button>
          <button
            onClick={() => scrollTo('rfq-wizard')}
            className="flex items-center w-full text-left min-h-11 py-2 text-[#bac9cc] hover:text-[#c3f5ff]"
          >
            OEM GATEWAY
          </button>
          {/* 데스크톱에만 있던 TELEMETRY HUD 를 폰에서도 갈 수 있게 서랍에 넣는다 */}
          <button
            onClick={() => {
              if (onOpenTelemetryHud) onOpenTelemetryHud();
              scrollTo('telemetry-hud');
            }}
            className="flex items-center gap-1.5 w-full text-left min-h-11 py-2 text-[#bac9cc] hover:text-[#c3f5ff]"
          >
            <Gauge className="w-3.5 h-3.5 shrink-0" />
            TELEMETRY HUD
          </button>
        </div>
      )}
    </header>
  );
};
