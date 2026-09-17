'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import StrategiesSection from './components/StrategiesSection';
import PortfolioSection from './components/PortfolioSection';
import ReturnCalculatorSection from './components/ReturnCalculatorSection';
import AdvisorySection from './components/AdvisorySection';
import VdrSection from './components/VdrSection';
import Footer from './components/Footer';
import PortfolioModal from './components/PortfolioModal';
import { PortfolioItem } from './types';

interface ApexPartnersAppProps {
  isEmbed?: boolean;
}

export default function ApexPartnersApp({ isEmbed = false }: ApexPartnersAppProps) {
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);

  const handleOpenVdr = () => {
    const el = document.getElementById('vdr');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 한글 제목이 낱말 한가운데서 쪼개지던 자리(「차세/대」·「패키/징」) — 이 데모 안의 제목에 keep-all 을 한 번에 건다
  return (
    <div className="min-h-screen bg-[#090e17] text-[#dee2ef] selection:bg-[#f2ca50] selection:text-[#3c2f00] relative overflow-x-hidden font-sans [&_h1]:break-keep [&_h2]:break-keep [&_h3]:break-keep">
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
              [06] 아펙스 파트너스 (APEX PARTNERS) — 글로벌 사모펀드 &amp; VC 대체투자
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/inquiry?from=apex-partners"
              className="px-3 py-1 rounded bg-[#f2ca50] hover:bg-[#e2bb43] text-zinc-950 font-bold text-[11px] transition-all flex items-center gap-1 shadow-sm"
            >
              <span>이 프로젝트 견적 문의</span>
              <Send className="w-3 h-3" />
            </Link>
          </div>
        </aside>
      )}

      {/* Header with Global Timezones & LP Access */}
      <Header onOpenVdr={handleOpenVdr} />

      {/* Main Landing Flow */}
      <main className="w-full">
        {/* Hero Section with Boardroom Banner and 4-Stat Telemetry */}
        <HeroSection onOpenVdr={handleOpenVdr} />

        {/* 4 Core Investment Strategy Pillars */}
        <StrategiesSection onOpenVdr={handleOpenVdr} />

        {/* Portfolio Matrix & Exit Hall */}
        <PortfolioSection onSelectItem={(item) => setSelectedPortfolioItem(item)} />

        {/* Actuarial Return Calculator (IRR & DPI Simulator) */}
        <ReturnCalculatorSection onOpenVdr={handleOpenVdr} />

        {/* Stewardship & Senior Advisory Board */}
        <AdvisorySection />

        {/* Institutional LP Virtual Data Room Gate */}
        <VdrSection />
      </main>

      {/* Sovereign Institutional Footer */}
      <Footer onOpenVdr={handleOpenVdr} />

      {/* Portfolio Item Detail Modal */}
      <PortfolioModal
        item={selectedPortfolioItem}
        onClose={() => setSelectedPortfolioItem(null)}
        onOpenVdr={handleOpenVdr}
      />
    </div>
  );
}
