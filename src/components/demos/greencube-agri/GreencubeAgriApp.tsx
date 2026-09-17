'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { HeaderTicker } from './components/HeaderTicker';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { YieldCalculator } from './components/YieldCalculator';
import { SpectrumMatrix } from './components/SpectrumMatrix';
import { ColdChainSection } from './components/ColdChainSection';
import { B2BInquirySection } from './components/B2BInquirySection';
import { Footer } from './components/Footer';
import { TelemetryModal } from './components/TelemetryModal';
import { FacilityTourModal } from './components/FacilityTourModal';
import { DocModal } from './components/DocModal';
import { QuotePrefill } from './types';

interface GreencubeAgriAppProps {
  isEmbed?: boolean;
}

export default function GreencubeAgriApp({ isEmbed = false }: GreencubeAgriAppProps) {
  const [telemetryOpen, setTelemetryOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [docTitle, setDocTitle] = useState<string | null>(null);
  // 계산기의 「이 조건으로 견적 요청」이 B2B 폼을 실제로 채우게 한다 — 예전엔 값을 받고도 버리고 스크롤만 했다.
  const [quotePrefill, setQuotePrefill] = useState<QuotePrefill | null>(null);

  const handleQuoteRequested = (size: number, cropName: string, annualTonnes: number) => {
    setQuotePrefill({ stamp: Date.now(), footprintPyung: size, cropName, annualTonnes });
    const b2bSection = document.getElementById('b2b-contract');
    if (b2bSection) {
      b2bSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 한글 제목이 낱말 한가운데서 쪼개지던 자리(「차세/대」·「패키/징」) — 이 데모 안의 제목에 keep-all 을 한 번에 건다
  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff] text-[#131b2e] font-sans selection:bg-[#006948] selection:text-white [&_h1]:break-keep [&_h2]:break-keep [&_h3]:break-keep">
      {/* 🌟 Taemun Dev Studio Top Floating Demo Bar */}
      {!isEmbed && (
        <aside
          aria-label="데모 안내 바"
          // 공용 샘플 바(44px)에 가려지지 않게 top-0 대신 --sample-bar-h 를 쓴다 — 바가 없으면 0px 라 화면은 그대로다.
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
              [10] 그린큐브 버티컬 팜 (GREENCUBE AGRI-TECH) — AI 무농약 밀폐형 수직 스마트팜
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/inquiry?from=greencube-agri"
              className="px-3 py-1 rounded bg-[#006948] hover:bg-[#005137] text-white font-bold text-[11px] transition-all flex items-center gap-1 shadow-sm"
            >
              <span>이 프로젝트 견적 문의</span>
              <Send className="w-3 h-3" />
            </Link>
          </div>
        </aside>
      )}

      {/* 0. Clinical Telemetry Stream Ticker (Top) */}
      <HeaderTicker onOpenTelemetry={() => setTelemetryOpen(true)} />

      {/* 1. Sticky Navigation Bar */}
      <Navbar
        onOpenTelemetry={() => setTelemetryOpen(true)}
        onOpenTour={() => setTourOpen(true)}
        onOpenInvestor={() => setDocTitle('Investor Portal')}
      />

      {/* Main Content Modules */}
      <main className="flex-1">
        {/* 2. Scientific Hero Section with Live HUDs */}
        <HeroSection />

        {/* 3. Interactive Harvest & Environmental Yield Calculator */}
        <YieldCalculator onQuoteRequested={handleQuoteRequested} />

        {/* 4. Spectral AI Growth Matrix (Interactive Demo) */}
        <SpectrumMatrix />

        {/* 5. 4-Hour Farm-to-Table Ultra-Cold-Chain & Proof Ribbon */}
        <ColdChainSection />

        {/* 6. Turnkey Engineering & B2B Inquiry Form */}
        <B2BInquirySection prefill={quotePrefill} />
      </main>

      {/* 7. Footer */}
      <Footer onOpenDocModal={(title) => setDocTitle(title)} />

      {/* Interactive Modals */}
      <TelemetryModal
        isOpen={telemetryOpen}
        onClose={() => setTelemetryOpen(false)}
      />

      <FacilityTourModal
        isOpen={tourOpen}
        onClose={() => setTourOpen(false)}
      />

      <DocModal
        title={docTitle}
        onClose={() => setDocTitle(null)}
      />
    </div>
  );
}
