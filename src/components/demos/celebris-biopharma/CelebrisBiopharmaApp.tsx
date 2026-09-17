'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PipelineMatrix } from './components/PipelineMatrix';
import { PlatformSection } from './components/PlatformSection';
import { CmgpSection } from './components/CmgpSection';
import { SabSection } from './components/SabSection';
import { PartneringWizard } from './components/PartneringWizard';
import { VisionSection } from './components/VisionSection';
import { Footer } from './components/Footer';
import { MoAVideoModal, ProtocolModal, PublicationModal, DeckModal } from './components/Modals';
import { PipelineItem, Publication } from './types';

interface CelebrisBiopharmaAppProps {
  isEmbed?: boolean;
}

export default function CelebrisBiopharmaApp({ isEmbed = false }: CelebrisBiopharmaAppProps) {
  const [moaModalOpen, setMoaModalOpen] = useState(false);
  const [deckModalOpen, setDeckModalOpen] = useState(false);
  const [selectedProtocol, setSelectedProtocol] = useState<PipelineItem | null>(null);
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);

  const handleNavigateToWizard = () => {
    const wizardEl = document.getElementById('wizard');
    if (wizardEl) {
      wizardEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 한글 제목이 낱말 한가운데서 쪼개지던 자리(「차세/대」·「패키/징」) — 이 데모 안의 제목에 keep-all 을 한 번에 건다
  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col selection:bg-[#1e40af] selection:text-white font-sans [&_h1]:break-keep [&_h2]:break-keep [&_h3]:break-keep">
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
              [03] 셀레브리스 바이오파마 (CELEBRIS BIOPHARMA) — 표적 단백질 분해 & ADC 혁신 신약
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/inquiry?from=celebris-biopharma"
              className="px-3 py-1 rounded bg-[#1e40af] hover:bg-[#1d4ed8] text-white font-bold text-[11px] transition-all flex items-center gap-1 shadow-sm"
            >
              <span>이 프로젝트 견적 문의</span>
              <Send className="w-3 h-3" />
            </Link>
          </div>
        </aside>
      )}

      {/* Fixed Navigation Header */}
      <Header onOpenDeckModal={() => setDeckModalOpen(true)} />

      {/* Main Content Area */}
      {/* 헤더가 h-20(80px) 고정인데 여백이 pt-16(64px) 이라 16px 이 헤더 밑에 깔려 있었다 */}
      <main className="flex-1 w-full pt-20">
        {/* Hero Section */}
        <Hero
          onOpenMoAModal={() => setMoaModalOpen(true)}
          onOpenDeckModal={() => setDeckModalOpen(true)}
        />

        {/* Corporate Vision & IPO Preparation Status */}
        <VisionSection />

        {/* R&D Pipeline Matrix */}
        <PipelineMatrix onSelectProtocol={item => setSelectedProtocol(item)} />

        {/* PROTEA-AI Platform Section */}
        <PlatformSection />

        {/* Songdo cGMP & CMC Infrastructure */}
        <CmgpSection />

        {/* Scientific Advisory Board (SAB) & Publications */}
        <SabSection onSelectPublication={pub => setSelectedPublication(pub)} />

        {/* BD & Tech Transfer Licensing Wizard */}
        <PartneringWizard />
      </main>

      {/* Global Enterprise Footer */}
      <Footer />

      {/* Modals */}
      <MoAVideoModal
        isOpen={moaModalOpen}
        onClose={() => setMoaModalOpen(false)}
      />

      <DeckModal
        isOpen={deckModalOpen}
        onClose={() => setDeckModalOpen(false)}
        onNavigateToWizard={handleNavigateToWizard}
      />

      <ProtocolModal
        item={selectedProtocol}
        onClose={() => setSelectedProtocol(null)}
      />

      <PublicationModal
        publication={selectedPublication}
        onClose={() => setSelectedPublication(null)}
      />
    </div>
  );
}
