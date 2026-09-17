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
import { SHIPMENT_DOSSIERS } from './data/mockData';
import { PortHub } from './types';

interface TransoceanScmAppProps {
  isEmbed?: boolean;
}

export default function TransoceanScmApp({ isEmbed = false }: TransoceanScmAppProps) {
  const DEFAULT_BL = 'TOCU-8924018';
  const [currentBl, setCurrentBl] = useState<string>(DEFAULT_BL);
  const [quickSearchInput, setQuickSearchInput] = useState<string>(DEFAULT_BL);
  /** 헤더 LOCATE 의 조회 결과 안내 — 트래커 화면이 이 문구를 그린다(예전엔 헤더 조회가 말없이 기본 화물로 떨어졌다) */
  const [quickSearchFeedback, setQuickSearchFeedback] = useState<string | null>(null);
  
  // Modals state
  const [radarModalOpen, setRadarModalOpen] = useState<boolean>(false);
  const [selectedHubId, setSelectedHubId] = useState<string | null>(null);
  const [sensorModalOpen, setSensorModalOpen] = useState<boolean>(false);

  // Prefilled quotation from simulator to RFP
  const [prefilledRfpNote, setPrefilledRfpNote] = useState<string | null>(null);

  // 없는 B/L 을 넣으면 예전에는 아무 말 없이 기본 화물로 떨어지고, 센서 모달 제목에는 그 없는 번호가 찍혔다.
  // 판정을 여기서 하고 안내 문구까지 만들어 트래커로 내려 준다.
  const handleQuickSearchSubmit = () => {
    const targetBl = quickSearchInput.trim().toUpperCase() || DEFAULT_BL;
    const isKnown = Object.prototype.hasOwnProperty.call(SHIPMENT_DOSSIERS, targetBl);
    const resolved = isKnown ? targetBl : DEFAULT_BL;
    setCurrentBl(resolved);
    setQuickSearchInput(resolved);
    setQuickSearchFeedback(
      isKnown
        ? `Sample B/L manifest ${resolved} loaded (예시 데이터 — 실제 조회가 아닙니다).`
        : `No sample manifest for ${targetBl} — loaded the default Bio-Logistics sample ${resolved} (예시 데이터).`,
    );
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

  // 한글 제목이 낱말 한가운데서 쪼개지던 자리(「차세/대」·「패키/징」) — 이 데모 안의 제목에 keep-all 을 한 번에 건다
  return (
    <div className="min-h-screen bg-[#061426] text-[#d6e3fe] flex flex-col font-sans selection:bg-[#2563eb] selection:text-white [&_h1]:break-keep [&_h2]:break-keep [&_h3]:break-keep">
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
          incomingFeedback={quickSearchFeedback}
          onSelectBl={(blId) => {
            setCurrentBl(blId);
            setQuickSearchInput(blId);
            setQuickSearchFeedback(null);
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
        dossier={SHIPMENT_DOSSIERS[currentBl] ?? SHIPMENT_DOSSIERS[DEFAULT_BL]}
      />
    </div>
  );
}
