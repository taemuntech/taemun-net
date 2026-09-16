'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { TickerBar } from './components/TickerBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ContainerTracker } from './components/ContainerTracker';
import { RateSimulator } from './components/RateSimulator';
import { PillarsSection } from './components/PillarsSection';
import { PortHubsSection } from './components/PortHubsSection';
import { RfpSection } from './components/RfpSection';
import { Footer } from './components/Footer';
import { PortRadarModal } from './components/PortRadarModal';
import { SensorNodesModal } from './components/SensorNodesModal';
import { PortHub } from './types';

interface TransoceanScmAppProps {
  isEmbed?: boolean;
}

export default function TransoceanScmApp({ isEmbed = false }: TransoceanScmAppProps) {
  const [currentBl, setCurrentBl] = useState<string>('TOCU-8924018');
  const [quickSearchInput, setQuickSearchInput] = useState<string>('TOCU-8924018');
  
  // Modals state
  const [radarModalOpen, setRadarModalOpen] = useState<boolean>(false);
  const [selectedHubId, setSelectedHubId] = useState<string | null>(null);
  const [sensorModalOpen, setSensorModalOpen] = useState<boolean>(false);

  // Prefilled quotation from simulator to RFP
  const [prefilledRfpNote, setPrefilledRfpNote] = useState<string | null>(null);

  const handleQuickSearchSubmit = () => {
    const targetBl = quickSearchInput.trim().toUpperCase() || 'TOCU-8924018';
    setCurrentBl(targetBl);
    const trackingEl = document.getElementById('trackingSection');
    trackingEl?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenRadar = (hubId?: string) => {
    if (hubId) setSelectedHubId(hubId);
    setRadarModalOpen(true);
  };

  const handleSelectHub = (hub: PortHub) => {
    setSelectedHubId(hub.id);
    setRadarModalOpen(true);
  };

  const handleLockRate = (planName: string, quoteDetails: string) => {
    setPrefilledRfpNote(quoteDetails);
    const rfpEl = document.getElementById('rfpSection');
    rfpEl?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTracking = () => {
    const el = document.getElementById('trackingSection');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToSimulator = () => {
    const el = document.getElementById('rateSimulator');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#061426] text-[#d6e3fe] flex flex-col font-sans selection:bg-[#2563eb] selection:text-white">
      {/* 🌟 Taemun Dev Studio Top Floating Demo Bar */}
      {!isEmbed && (
        <aside
          aria-label="데모 안내 바"
          className="sticky top-0 z-[60] bg-zinc-950/95 backdrop-blur-md text-white border-b border-zinc-800 text-xs py-2 px-4 flex items-center justify-between"
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
              [08] 트랜스오션 글로벌 SCM (TRANSOCEAN SCM) — 스마트 항만 &amp; AI 복합물류
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/inquiry?from=transocean-scm"
              className="px-3 py-1 rounded bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-[11px] transition-all flex items-center gap-1 shadow-sm"
            >
              <span>이 프로젝트 견적 문의</span>
              <Send className="w-3 h-3" />
            </Link>
          </div>
        </aside>
      )}

      {/* 1. Live Port Congestion Radar Ticker */}
      <TickerBar onOpenRadar={handleOpenRadar} />

      {/* 2. Top Nav Bar */}
      <Header
        quickSearchValue={quickSearchInput}
        onQuickSearchChange={(val) => setQuickSearchInput(val)}
        onQuickSearchSubmit={handleQuickSearchSubmit}
        onOpenRadar={() => handleOpenRadar()}
        onOpenSensors={() => setSensorModalOpen(true)}
      />

      <main className="flex-1">
        {/* 3. Mission Control Hero Section */}
        <HeroSection
          onTrackClick={scrollToTracking}
          onSimulateClick={scrollToSimulator}
        />

        {/* 4. Live Container Tracking HUD */}
        <ContainerTracker
          currentBl={currentBl}
          onSelectBl={(blId) => {
            setCurrentBl(blId);
            setQuickSearchInput(blId);
          }}
          onOpenSensorDetails={() => setSensorModalOpen(true)}
        />

        {/* 5. Multimodal Rate & Carbon Abatement Simulator */}
        <RateSimulator onLockRateClick={handleLockRate} />

        {/* 6. Smart Port Automation & Autonomous Maritime Pillars */}
        <PillarsSection />

        {/* 7. Strategic Port Operations Hubs */}
        <PortHubsSection onSelectHub={handleSelectHub} />

        {/* 8. Enterprise SCM RFP & Allocation Desk */}
        <RfpSection prefilledPlanNote={prefilledRfpNote} />
      </main>

      {/* 9. Institutional Maritime Footer */}
      <Footer />

      {/* Modals */}
      <PortRadarModal
        isOpen={radarModalOpen}
        onClose={() => {
          setRadarModalOpen(false);
          setSelectedHubId(null);
        }}
        selectedHubId={selectedHubId}
      />

      <SensorNodesModal
        isOpen={sensorModalOpen}
        onClose={() => setSensorModalOpen(false)}
        blId={currentBl}
      />
    </div>
  );
}
