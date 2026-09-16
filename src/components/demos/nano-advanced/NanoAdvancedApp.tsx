'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { TopNavBar } from './components/TopNavBar';
import { HeroSection } from './components/HeroSection';
import { LayerExplorer } from './components/LayerExplorer';
import { PlatformPillars } from './components/PlatformPillars';
import { ThermalWarpageSimulator } from './components/ThermalWarpageSimulator';
import { QualityInspection } from './components/QualityInspection';
import { ConsultationForm } from './components/ConsultationForm';
import { Footer } from './components/Footer';
import {
  ExplodedViewModal,
  WhitepaperModal,
  ReportModal,
  SuccessModal,
} from './components/Modals';
import { SimSettings, ConsultationFormData } from './types';

interface NanoAdvancedAppProps {
  isEmbed?: boolean;
}

export default function NanoAdvancedApp({ isEmbed = false }: NanoAdvancedAppProps) {
  const [isExplodedViewOpen, setIsExplodedViewOpen] = useState(false);
  const [isWhitepaperOpen, setIsWhitepaperOpen] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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

  const [submittedConsultation, setSubmittedConsultation] =
    useState<ConsultationFormData | null>(null);

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

  const handleSubmitConsultation = (data: ConsultationFormData) => {
    setSubmittedConsultation(data);
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans selection:bg-[#00288e] selection:text-white">
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
              [04] 나노어드밴스드 (NANO ADVANCED) — 2.5D/3D 반도체 첨단 패키징 &amp; 글래스 기판
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/inquiry?from=nano-advanced"
              className="px-3 py-1 rounded bg-[#00288e] hover:bg-[#1e40af] text-white font-bold text-[11px] transition-all flex items-center gap-1 shadow-sm"
            >
              <span>이 프로젝트 견적 문의</span>
              <Send className="w-3 h-3" />
            </Link>
          </div>
        </aside>
      )}

      {/* 1. Header Navigation */}
      <TopNavBar onOpenConsultation={scrollToConsultation} />

      {/* Main Content Sections */}
      <main className="pt-16 flex-grow">
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
        <ConsultationForm onSubmitSuccess={handleSubmitConsultation} />
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

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        data={submittedConsultation}
      />
    </div>
  );
}
