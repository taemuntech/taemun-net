'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { TopTicker } from './components/TopTicker';
import { TopNavBar } from './components/TopNavBar';
import { HeroSection } from './components/HeroSection';
import { MetricsBentoGrid } from './components/MetricsBentoGrid';
import { ChargingSimulator } from './components/ChargingSimulator';
import { ArchitectureExplorer } from './components/ArchitectureExplorer';
import { CertificationsSection } from './components/CertificationsSection';
import { RfqWizard } from './components/RfqWizard';
import { Footer } from './components/Footer';

interface VoltronEvAppProps {
  isEmbed?: boolean;
}

export default function VoltronEvApp({ isEmbed = false }: VoltronEvAppProps) {
  const handleLaunchSimulator = () => {
    const el = document.getElementById('charging-sim');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadWhitepaper = () => {
    const el = document.getElementById('technical-dossier');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenTelemetryHud = () => {
    const el = document.getElementById('telemetry-hud');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenRfq = () => {
    const el = document.getElementById('rfq-wizard');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // 한글 제목이 낱말 한가운데서 쪼개지던 자리(「차세/대」·「패키/징」) — 이 데모 안의 제목에 keep-all 을 한 번에 건다
  return (
    <div className="bg-[#0b0e13] text-[#e1e2ea] min-h-screen relative flex flex-col font-sans selection:bg-[#00e5ff] selection:text-[#001f24] [&_h1]:break-keep [&_h2]:break-keep [&_h3]:break-keep">
      {/* 🌟 Taemun Dev Studio Top Floating Demo Bar */}
      {!isEmbed && (
        <aside
          aria-label="데모 안내 바"
          className="sticky top-[var(--sample-bar-h,0px)] z-[60] bg-zinc-950/95 backdrop-blur-md text-white border-b border-zinc-800 text-xs py-2 px-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Link
              href="/#category-corporate"
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>갤러리 아카이브로 돌아가기</span>
            </Link>
            <span className="text-zinc-600 hidden lg:inline">|</span>
            <span className="text-zinc-400 hidden lg:inline font-mono">
              [09] 볼트론 EV 전장 (VOLTRON ADVANCED EV) — 800V SiC 전력반도체 &amp; 메가와트 초급속 충전
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/inquiry?from=voltron-ev"
              className="px-3 py-1 rounded bg-[#00e5ff] hover:bg-[#00cbe6] text-black font-bold text-[11px] transition-all flex items-center gap-1 shadow-sm"
            >
              <span>이 프로젝트 견적 문의</span>
              <Send className="w-3 h-3" />
            </Link>
          </div>
        </aside>
      )}

      {/* TOP LIVE TELEMETRY TICKER */}
      <TopTicker />

      {/* TOP NAVIGATION BAR */}
      <TopNavBar
        onOpenTelemetryHud={handleOpenTelemetryHud}
        onOpenRfq={handleOpenRfq}
      />

      {/* MAIN APPLICATION SECTIONS */}
      <main className="flex-1">
        {/* HERO 800V ARCHITECTURE SHOWCASE */}
        <HeroSection
          onLaunchSimulator={handleLaunchSimulator}
          onDownloadWhitepaper={handleDownloadWhitepaper}
        />

        {/* 4-BOX TELEMETRY BENTO GRID */}
        <MetricsBentoGrid />

        {/* 800V ULTRA-FAST CHARGING & THERMAL SIMULATOR */}
        <ChargingSimulator />

        {/* EXPLOSIVE POWERTRAIN ARCHITECTURE EXPLORER */}
        <ArchitectureExplorer />

        {/* GLOBAL OEM COMPLIANCE & POWERTRAIN VALIDATION */}
        <CertificationsSection />

        {/* CONFIDENTIAL OEM RFQ & ENGINEERING CONSULTATION */}
        <RfqWizard />
      </main>

      {/* GLOBAL TIER-1 ENGINEERING FOOTER */}
      <Footer />
    </div>
  );
}
