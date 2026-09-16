'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import TopNavBar from './components/TopNavBar';
import HeroSection from './components/HeroSection';
import SensorExplorer from './components/SensorExplorer';
import SolutionsSection from './components/SolutionsSection';
import HardwareArchitecture from './components/HardwareArchitecture';
import TaskingWizard from './components/TaskingWizard';
import Footer from './components/Footer';
import Modals from './components/Modals';
import { ModalType } from './types';

interface StellaOrbitalAppProps {
  isEmbed?: boolean;
}

export default function StellaOrbitalApp({ isEmbed = false }: StellaOrbitalAppProps) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const handleScrollToTasking = () => {
    const el = document.getElementById('tasking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30] font-sans selection:bg-[#00288e] selection:text-white">
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
              [05] 스텔라 궤도 데이터 (STELLA ORBITAL) — 초소형 인공위성 군집 &amp; 지구관측 AI
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/inquiry?from=stella-orbital"
              className="px-3 py-1 rounded bg-[#00288e] hover:bg-[#1e40af] text-white font-bold text-[11px] transition-all flex items-center gap-1 shadow-sm"
            >
              <span>이 프로젝트 견적 문의</span>
              <Send className="w-3 h-3" />
            </Link>
          </div>
        </aside>
      )}

      {/* 1. Shared Navigation Component */}
      {/* 「Task a Satellite」 는 폼 없이 접수증을 띄우던 버튼이라 촬영 의뢰 폼으로 내려보낸다 */}
      <TopNavBar
        onOpenModal={(modal) => setActiveModal(modal)}
        onScrollToTasking={handleScrollToTasking}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 2. Cinematic Hero Section */}
        <HeroSection
          onOpenModal={(modal) => setActiveModal(modal)}
          onScrollToTasking={handleScrollToTasking}
        />

        {/* 3. Interactive Multi-Layer Sensor Suite & Radar Interface */}
        <SensorExplorer
          onOpenModal={(modal) => setActiveModal(modal)}
          onScrollToTasking={handleScrollToTasking}
        />

        {/* 4. Planetary Analytics & Industrial Enterprise Solutions */}
        <SolutionsSection />

        {/* 5. Aerospace Hardware Architecture & Flight Heritage */}
        <HardwareArchitecture />

        {/* 6. Interactive Satellite Tasking & Downlink API Wizard */}
        <TaskingWizard />
      </main>

      {/* 7. Institutional Aerospace Footer */}
      <Footer />

      {/* 8. Interactive Modals (Whitepaper Dossier, GeoTIFF Inspector) */}
      <Modals activeModal={activeModal} onClose={() => setActiveModal(null)} />
    </div>
  );
}
