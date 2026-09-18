import React, { useState } from 'react';
import { Gauge, ShieldCheck, Menu, X } from 'lucide-react';

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
      <div className="flex justify-between items-center gap-3 w-full px-6 lg:px-12 py-3.5 max-w-7xl mx-auto">
        {/* BRAND / LOGO CLUSTER */}
        <a
          href="#powertrain"
          className="flex items-center gap-2.5 lg:gap-3.5 group cursor-pointer min-w-0"
          id="nav-logo-link"
        >
          <div className="relative shrink-0 flex items-center justify-center w-9 h-9 lg:w-10 lg:h-10 rounded border border-[#00e5ff]/40 bg-[#1d2025] p-1 shadow-[0_0_12px_rgba(0,229,255,0.2)] group-hover:border-[#00e5ff] transition-all">
            <img
              src="/demo-media/voltron-ev/voltron-ev-02.png"
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

        {/* 가로 메뉴(5개)와 상태 아이콘 3개는 1400px 이상에서만 펼쳤는데, 그건 안쪽 줄이 1720 까지 넓어질 때의 이야기다.
            본문과 같이 1280(max-w-7xl) 안에 묶은 뒤로는 어떤 화면에서도 안쪽 줄이 1280 화면과 같은 폭(1184)이라
            로고+가로 메뉴+아이콘+버튼 두 개(어림 1,300px)가 들어가지 않는다 — 넣으면 상호가 말줄임으로 잘린다.
            그래서 1280 화면이 원래 보여 주던 모양(햄버거 → 서랍) 하나로 통일한다. 서랍에 같은 메뉴가 전부 있다. */}

        {/* TRAILING ACTIONS */}
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
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
            className="p-2.5 -mr-1.5 text-[#bac9cc] hover:text-[#00e5ff]"
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
          className="bg-[#101319] border-b border-[#3b494c] font-display text-xs tracking-wider uppercase max-h-[calc(100dvh-8rem)] overflow-y-auto"
        >
          {/* 서랍 배경은 끝까지, 항목은 헤더와 같은 1280 안에 */}
          <div className="max-w-7xl mx-auto px-6 py-3 space-y-1">
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
        </div>
      )}
    </header>
  );
};
