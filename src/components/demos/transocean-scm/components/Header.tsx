import React, { useEffect, useRef, useState } from 'react';
import { BrandMark } from './BrandMark';
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
  const notifRef = useRef<HTMLDivElement>(null);

  // 알림 드롭다운은 바깥을 누르거나 Esc 로 닫힌다 — 전에는 같은 버튼을 다시 눌러야만 닫혔다.
  useEffect(() => {
    if (!notifOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setNotifOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [notifOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onQuickSearchSubmit();
    }
  };

  return (
    <header className="sticky top-[var(--sample-bar-h,0px)] z-50 bg-[#132033]/95 backdrop-blur-md border-b border-[#434655]/30 w-full px-4 lg:px-8 py-2.5 transition-all">
      <div className="max-w-7xl min-[1400px]:max-w-[1400px] mx-auto flex justify-between items-center gap-2">
        {/* Brand Logo & Title */}
        <div className="flex items-center min-w-0 shrink">
          <a
            href="#hero-mission-control"
            className="flex items-center gap-2.5 group min-w-0"
            aria-label="TRANSOCEAN GLOBAL SCM — 관제 화면 맨 위로"
          >
            <BrandMark className="w-9 h-9 lg:w-10 lg:h-10 shrink-0 rounded-lg group-hover:brightness-125 transition-all" />
            {/* 좁은 폭에서는 잘라내지 않고 두 줄(TRANSOCEAN / GLOBAL SCM)로 접히게 둔다 — 말줄임표보다 읽힌다 */}
            <span className="min-w-0">
              <span className="font-headline-md text-sm sm:text-base lg:text-lg font-bold tracking-tight text-[#d6e3fe] uppercase block leading-tight sm:truncate">
                TRANSOCEAN GLOBAL SCM
              </span>
              {/* 한글 부제는 아주 좁은 폭(<640)에서만 접는다 — 태블릿(768)·데스크톱에선 한 줄에 들어간다 */}
              <span className="hidden sm:block text-[11px] font-mono text-[#ffb693] tracking-widest uppercase truncate">
                트랜스오션 스마트 해운·복합물류
              </span>
            </span>
          </a>
        </div>

        {/* Quick B/L Prefilled Bar — 입력칸을 줄여 상호가 잘리지 않을 자리를 남긴다 */}
        <div className="hidden lg:flex shrink-0 items-center bg-[#0e1c2f] border border-[#434655]/40 rounded-lg px-3 py-1 space-x-2 focus-within:border-[#2563eb] transition-colors">
          <Search className="w-4 h-4 text-[#8d90a0]" />
          <input
            id="quickTrackNavInput"
            type="text"
            className="bg-transparent text-[#d6e3fe] font-mono text-xs focus:outline-none border-0 p-0 w-24 min-[1400px]:w-28 placeholder:text-[#8d90a0]"
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

        {/* Navigation Links — 도착하는 구역이 4개뿐이라 항목도 4개다.
            (전에는 「Smart Ports」와 「Digital Twin」이 둘 다 #automationSection 으로 갔고,
             「ESG Green Fleet」·「Client Portal」은 운임 시뮬레이터·항만 허브로 가 이름과 도착지가 달랐다.
             서랍 메뉴는 이미 아래 이름을 쓰고 있어 둘을 같은 이름으로 맞췄다.)
            가로 막대는 1400px 부터 — 그 아래에서는 상호가 「TRANS…」 로 잘려 서랍으로 내린다. */}
        <nav className="hidden min-[1400px]:flex items-center space-x-4 shrink-0">
          <a
            href="#trackingSection"
            className="text-[#b4c5ff] border-b-2 border-[#2563eb] pb-0.5 text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
          >
            Ocean Freight
          </a>
          <a
            href="#automationSection"
            className="text-[#c3c6d7] hover:text-[#d6e3fe] transition-colors text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
          >
            Smart Ports
          </a>
          <a
            href="#rateSimulator"
            className="text-[#c3c6d7] hover:text-[#d6e3fe] transition-colors text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
          >
            Rate Simulator
          </a>
          <a
            href="#hubsSection"
            className="text-[#c3c6d7] hover:text-[#d6e3fe] transition-colors text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
          >
            Strategic Hubs
          </a>
        </nav>

        {/* Trailing Actions */}
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          <button
            type="button"
            id="nav-radar-btn"
            onClick={onOpenRadar}
            aria-label="Port Congestion Radar"
            title="Port Congestion Radar"
            className="hidden lg:flex w-11 items-center justify-center text-xs text-[#c3c6d7] hover:text-white min-h-11 rounded transition-colors border border-[#434655]/40 hover:border-[#2563eb]"
          >
            <span className="material-symbols-outlined text-[16px] text-[#2563eb]">radar</span>
            {/* 라벨을 펴면 데스크톱 어느 폭에서도 상호가 「TRANS…」 로 잘려 아이콘만 남긴다 (이름은 title·aria-label 로) */}
            <span className="sr-only">Port Congestion Radar</span>
          </button>

          <a
            id="nav-rfp-cta"
            href="#rfpSection"
            className="bg-[#fe6b00] text-white px-3 lg:px-3.5 min-h-11 rounded-lg text-xs tracking-wide uppercase hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 font-bold shadow-md whitespace-nowrap"
          >
            {/* 좁은 폭에서는 라벨을 줄인다 — 전체 라벨을 넣으면 브랜드 블록을 밀어 지면이 375 를 넘쳤다. */}
            <span className="hidden xl:max-[1399px]:inline">Enterprise RFP / Quote</span>
            <span className="hidden max-[1279px]:inline min-[1400px]:inline">RFP 문의</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </a>

          {/* Quick HUD Action Icons — 좁은 폭에서는 햄버거 메뉴 안으로 내린다 */}
          <div className="flex items-center space-x-1 lg:border-l lg:border-[#434655]/40 lg:pl-2.5 text-[#c3c6d7]">
            <button
              id="header-sensor-btn"
              onClick={onOpenSensors}
              className="hidden lg:flex w-11 h-11 items-center justify-center hover:bg-[#1d2a3e] rounded transition-colors text-[#b4c5ff]"
              title="IoT Telemetry Node Diagnostics"
            >
              <span className="material-symbols-outlined text-[20px]">sensors</span>
            </button>

            <div className="relative hidden lg:block" ref={notifRef}>
              <button
                id="header-notif-btn"
                onClick={() => setNotifOpen(!notifOpen)}
                className="w-11 h-11 flex items-center justify-center hover:bg-[#1d2a3e] rounded transition-colors relative"
                title="Operational Alerts"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#fe6b00]" />
              </button>

              {notifOpen && (
                <div className="absolute right-0 mt-2 w-[min(20rem,calc(100vw-2rem))] bg-[#132033] border border-[#434655] rounded-lg shadow-2xl p-3 z-50 text-xs">
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
              className="hidden lg:flex w-11 h-11 items-center justify-center hover:bg-[#1d2a3e] rounded transition-colors"
              title="Enterprise Client Portal"
            >
              <User className="w-4 h-4" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 flex items-center justify-center hover:bg-[#1d2a3e] rounded min-[1400px]:hidden text-[#d6e3fe]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="min-[1400px]:hidden bg-[#0e1c2f] border-t border-[#434655]/40 mt-2 px-4 py-3 space-y-3 rounded-b-lg">
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
              className="min-h-11 px-2 flex items-center rounded bg-[#132033] text-[#b4c5ff] hover:bg-[#1d2a3e]"
            >
              Ocean Freight
            </a>
            <a
              href="#automationSection"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-11 px-2 flex items-center rounded bg-[#132033] text-[#c3c6d7] hover:bg-[#1d2a3e]"
            >
              Smart Ports
            </a>
            <a
              href="#rateSimulator"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-11 px-2 flex items-center rounded bg-[#132033] text-[#c3c6d7] hover:bg-[#1d2a3e]"
            >
              Rate Simulator
            </a>
            <a
              href="#hubsSection"
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-11 px-2 flex items-center rounded bg-[#132033] text-[#c3c6d7] hover:bg-[#1d2a3e]"
            >
              Strategic Hubs
            </a>
          </div>

          {/* 좁은 폭에서 헤더 아이콘을 숨긴 대신 레이더·센서 진단을 여기서 연다 — 기능을 죽이지 않는다 */}
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold lg:hidden">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRadar();
              }}
              className="min-h-11 px-2 rounded bg-[#132033] text-[#ffb693] hover:bg-[#1d2a3e] flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px] text-[#2563eb]">radar</span>
              <span>혼잡도 레이더</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSensors();
              }}
              className="min-h-11 px-2 rounded bg-[#132033] text-[#b4c5ff] hover:bg-[#1d2a3e] flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">sensors</span>
              <span>센서 노드 진단</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
