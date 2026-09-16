'use client';

import React, { useState } from 'react';
import { TopNavBar } from './components/TopNavBar';
import { HeroSection } from './components/HeroSection';
import { LayerExplorer } from './components/LayerExplorer';
import { PlatformPillars } from './components/PlatformPillars';
import { ThermalWarpageSimulator } from './components/ThermalWarpageSimulator';
import { QualityInspection } from './components/QualityInspection';
import { ConsultationForm } from './components/ConsultationForm';
import { Footer } from './components/Footer';
import { ExplodedViewModal, WhitepaperModal, ReportModal } from './components/Modals';
import { SimSettings } from './types';

interface NanoAdvancedAppProps {
  /** 기기 전환 툴바(DevicePreviewFrame) 안의 iframe 으로 열렸는지 — 지금은 화면 구성이 같다 */
  isEmbed?: boolean;
}

export default function NanoAdvancedApp({ isEmbed = false }: NanoAdvancedAppProps) {
  void isEmbed;
  const [isExplodedViewOpen, setIsExplodedViewOpen] = useState(false);
  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);

  const [simReportData, setSimReportData] = useState<{
    settings: SimSettings;
    results: { bandwidth: string; warpage: string; solution: string };
  }>({
    settings: { pkgDim: 100, hbmCount: 8, tdp: 850 },
    results: {
      bandwidth: '9.6 TB/s',
      warpage: '< 16.2 µm',
      solution: 'Glass Core 10-Layer Hybrid Interposer Architecture',
    },
  });

  const scrollToConsultation = () => {
    const el = document.getElementById('technical-request');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGenerateReport = (
    settings: SimSettings,
    results: { bandwidth: string; warpage: string; solution: string }
  ) => {
    setSimReportData({ settings, results });
    setIsReportOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans selection:bg-[#00288e] selection:text-white">
      {/* 상단 태문 표시(로고·갤러리·제작 문의)는 기기 전환 툴바(DevicePreviewFrame)가 맡는다 — 화면 안에 따로 두지 않는다 */}

      {/* 1. Header Navigation */}
      <TopNavBar onOpenConsultation={scrollToConsultation} />

      {/* Main Content Sections — 헤더가 sticky(흐름 안)라 위쪽 여백을 따로 주지 않는다 */}
      <main className="flex-grow">
        {/* 2. Hero Section with Sensor Telemetry & Trust Metrics */}
        <HeroSection
          onOpenWhitepaper={() => setIsWhitepaperOpen(true)}
          onOpenExplodedView={() => setIsExplodedViewOpen(true)}
        />

        {/* 3. Interactive 4-Layer Heterogeneous Integration Micro-Architecture Explorer */}
        <LayerExplorer />

        {/* 4. 3 Core Semiconductor Platform Pillars */}
        <PlatformPillars
          onOpenWhitepaper={() => setIsWhitepaperOpen(true)}
          onOpenConsultation={scrollToConsultation}
        />

        {/* 5. Online AI Chipset Thermal & Warpage Simulator */}
        <ThermalWarpageSimulator onGenerateReport={handleGenerateReport} />

        {/* 6. Global Foundry Quality Standards & 5-Step Non-Destructive Inspection */}
        <QualityInspection />

        {/* 7. Engineering Evaluation Sample & Technical Meeting Request Wizard */}
        <ConsultationForm />
      </main>

      {/* 8. Institutional Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ExplodedViewModal
        isOpen={isExplodedViewOpen}
        onClose={() => setIsExplodedViewOpen(false)}
      />

      <WhitepaperModal
        isOpen={isWhitepaperOpen}
        onClose={() => setIsWhitepaperOpen(false)}
      />

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        settings={simReportData.settings}
        results={simReportData.results}
      />
    </div>
  );
}
