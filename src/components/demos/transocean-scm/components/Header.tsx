import React, { useState } from 'react';
import { BRAND_LOGO_URL } from '../data/mockData';
import { Search, ArrowRight, Menu, X, Bell, User } from 'lucide-react';

interface HeaderProps {
  quickSearchValue: string;
  onQuickSearchChange: (val: string) => void;
  onQuickSearchSubmit: () => void;
  onOpenRadar: () => void;
  onOpenSensors: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  quickSearchValue,
  onQuickSearchChange,
  onQuickSearchSubmit,
  onOpenRadar,
  onOpenSensors,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onQuickSearchSubmit();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#132033]/95 backdrop-blur-md border-b border-[#434655]/30 w-full px-4 lg:px-8 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3">
          <a href="#" className="flex items-center space-x-3 group">
            <img
              alt="TRANSOCEAN GLOBAL SCM Brand Logo"
              referrerPolicy="no-referrer"
              className="w-10 h-10 object-contain rounded-lg border border-[#434655]/40 bg-[#0e1c2f] p-1 group-hover:border-[#2563eb] transition-all"
              src={BRAND_LOGO_URL}
            />
            <div>
              <span className="font-headline-md text-base lg:text-lg font-bold tracking-tight text-[#d6e3fe] uppercase block leading-tight">
                TRANSOCEAN GLOBAL SCM
              </span>
              <span className="text-[11px] font-mono text-[#ffb693] tracking-widest block uppercase">
                트랜스오션 스마트 해운·복합물류
              </span>
            </div>
          </a>
        </div>

        {/* Quick B/L Prefilled Bar */}
        <div className="hidden lg:flex items-center bg-[#0e1c2f] border border-[#434655]/40 rounded-lg px-3 py-1 space-x-2 focus-within:border-[#2563eb] transition-colors">
          <Search className="w-4 h-4 text-[#8d90a0]" />
          <input
            id="quickTrackNavInput"
            type="text"
            className="bg-transparent text-[#d6e3fe] font-mono text-xs focus:outline-none border-0 p-0 w-36 placeholder:text-[#8d90a0]"
            placeholder="Track B/L..."
            value={quickSearchValue}
            onChange={(e) => onQuickSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            id="quick-track-nav-btn"
            onClick={onQuickSearchSubmit}
            className="text-[11px] font-mono bg-[#2563eb] text-white px-2 py-0.5 rounded font-semibold uppercase hover:bg-[#1d4ed8] transition-colors"
          >
            LOCATE
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-6">
          <a
            href="#trackingSection"
            className="text-[#b4c5ff] border-b-2 border-[#2563eb] pb-0.5 text-xs font-semibold uppercase tracking-wider"
          >
            Ocean Freight
          </a>
          <a
            href="#automationSection"
            className="text-[#c3c6d7] hover:text-[#d6e3fe] transition-colors text-xs font-semibold uppercase tracking-wider"
          >
            Smart Ports
          </a>
          <a
            href="#automationSection"
            className="text-[#c3c6d7] hover:text-[#d6e3fe] transition-colors text-xs font-semibold uppercase tracking-wider"
          >
            Digital Twin
          </a>
          <a
            href="#rateSimulator"
            className="text-[#c3c6d7] hover:text-[#d6e3fe] transition-colors text-xs font-semibold uppercase tracking-wider"
          >
            ESG Green Fleet
          </a>
          <a
            href="#hubsSection"
            className="text-[#c3c6d7] hover:text-[#d6e3fe] transition-colors text-xs font-semibold uppercase tracking-wider"
          >
            Client Portal
          </a>
        </nav>

        {/* Trailing Actions */}
        <div className="flex items-center space-x-3">
          <button
            type="button"
            id="nav-radar-btn"
            onClick={onOpenRadar}
            className="hidden lg:flex items-center space-x-1 text-xs text-[#c3c6d7] hover:text-white px-2.5 py-1.5 rounded transition-colors border border-[#434655]/40 hover:border-[#2563eb]"
          >
            <span className="material-symbols-outlined text-[16px] text-[#2563eb]">radar</span>
            <span className="font-semibold">Port Congestion Radar</span>
          </button>

          <a
            id="nav-rfp-cta"
            href="#rfpSection"
            className="bg-[#fe6b00] text-white px-3.5 py-2 rounded-lg text-xs tracking-wide uppercase hover:brightness-110 active:scale-95 transition-all flex items-center space-x-1.5 font-bold shadow-md"
          >
            <span>Enterprise RFP / Quote</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>

          {/* Quick HUD Action Icons */}
          <div className="flex items-center space-x-1 border-l border-[#434655]/40 pl-2.5 text-[#c3c6d7]">
            <button
              id="header-sensor-btn"
              onClick={onOpenSensors}
              className="p-1.5 hover:bg-[#1d2a3e] rounded transition-colors text-[#b4c5ff]"
              title="IoT Telemetry Node Diagnostics"
            >
              <span className="material-symbols-outlined text-[20px]">sensors</span>
            </button>

            <div className="relative">
              <button
                id="header-notif-btn"
                onClick={() => setNotifOpen(!notifOpen)}
                className="p-1.5 hover:bg-[#1d2a3e] rounded transition-colors relative"
                title="Operational Alerts"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#fe6b00]" />
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-[#132033] border border-[#434655] rounded-lg shadow-2xl p-3 z-50 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-[#434655]/40 mb-2">
                    <span className="font-mono uppercase font-bold text-[#b4c5ff]">AIS Network Feed (Live)</span>
                    <span className="text-[10px] text-emerald-400">All Nodes OK</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 bg-[#0e1c2f] rounded border-l-2 border-[#fe6b00]">
                      <div className="font-semibold text-[#d6e3fe]">Rotterdam Berth Window Assigned</div>
                      <div className="text-[11px] text-[#8d90a0]">MV Transocean Titan allocated Automated Crane #44</div>
                    </div>
                    <div className="p-2 bg-[#0e1c2f] rounded border-l-2 border-emerald-400">
                      <div className="font-semibold text-[#d6e3fe]">Busan T4 AGV Fleet Optimal</div>
                      <div className="text-[11px] text-[#8d90a0]">Average crane turnaround 14.2h · safety incidents 0 (예시 수치)</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setNotifOpen(false)}
                    className="w-full mt-2 pt-1 text-center text-[11px] text-[#8d90a0] hover:text-[#b4c5ff]"
                  >
                    Dismiss Alerts
                  </button>
                </div>
              )}
            </div>

            <button
              id="header-account-btn"
              onClick={() => {
                const rfp = document.getElementById('rfpSection');
                rfp?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-1.5 hover:bg-[#1d2a3e] rounded transition-colors"
              title="Enterprise Client Portal"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 hover:bg-[#1d2a3e] rounded xl:hidden text-[#d6e3fe]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0e1c2f] border-t border-[#434655]/40 mt-2 px-4 py-3 space-y-3 rounded-b-lg">
          <div className="flex items-center bg-[#132033] border border-[#434655]/40 rounded px-2.5 py-1.5 space-x-2">
            <Search className="w-4 h-4 text-[#8d90a0]" />
            <input
              type="text"
              className="bg-transparent text-white font-mono text-xs w-full focus:outline-none"
              placeholder="Track Container / B/L..."
              value={quickSearchValue}
              onChange={(e) => onQuickSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={() => {
                onQuickSearchSubmit();
                setMobileMenuOpen(false);
              }}
              className="bg-[#2563eb] text-white px-2 py-0.5 rounded text-xs uppercase font-bold"
            >
              LOCATE
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <a
              href="#trackingSection"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-[#132033] text-[#b4c5ff] hover:bg-[#1d2a3e]"
            >
              Ocean Freight
            </a>
            <a
              href="#automationSection"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-[#132033] text-[#c3c6d7] hover:bg-[#1d2a3e]"
            >
              Smart Ports
            </a>
            <a
              href="#rateSimulator"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-[#132033] text-[#c3c6d7] hover:bg-[#1d2a3e]"
            >
              Rate Simulator
            </a>
            <a
              href="#hubsSection"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded bg-[#132033] text-[#c3c6d7] hover:bg-[#1d2a3e]"
            >
              Strategic Hubs
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
