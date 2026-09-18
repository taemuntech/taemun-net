'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { RadarChartSection } from './components/RadarChartSection';
import { FunnelSection } from './components/FunnelSection';
import { KillerAnatomySection } from './components/KillerAnatomySection';
import { LearningLoopSection } from './components/LearningLoopSection';
import { SimulatorSection } from './components/SimulatorSection';
import { CampusReservationSection } from './components/CampusReservationSection';
import { Footer } from './components/Footer';
import { ReportModal } from './components/ReportModal';
import { SolutionModal } from './components/SolutionModal';
import { VipPortalModal } from './components/VipPortalModal';

interface DaechiPrestigeAppProps {
  isEmbed?: boolean;
}

export const DaechiPrestigeApp: React.FC<DaechiPrestigeAppProps> = ({ isEmbed = false }) => {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [solutionModalOpen, setSolutionModalOpen] = useState(false);
  const [vipModalOpen, setVipModalOpen] = useState(false);

  const scrollToReservation = () => {
    const el = document.getElementById('reservation-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 샘플이라 예약을 받지 않는다 — 「정상 접수되었습니다」 토스트는 걷어냈고,
  // 예약 폼은 제출하면 스스로 공용 안내(SampleNotice)를 연다.

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface selection:bg-primary/20 selection:text-primary font-sans antialiased">

      {/* Sticky Header */}
      <Header
        onOpenReservation={scrollToReservation}
        onOpenVipModal={() => setVipModalOpen(true)}
      />

      {/* Main Content with top offset */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <HeroSection
          onOpenReservation={scrollToReservation}
          onOpenReportModal={() => setReportModalOpen(true)}
        />

        {/* Section 2: 5-Axis Medical Competency Radar Diagram */}
        <RadarChartSection />

        {/* Section 3: 3-Stage Admission Pathway Funnel */}
        <FunnelSection onOpenReservation={scrollToReservation} />

        {/* Section 4: Question Dissection Anatomy (수학 30번) */}
        <KillerAnatomySection
          onOpenSolutionModal={() => setSolutionModalOpen(true)}
        />

        {/* Section 5: Weekly 168-Hour Loop & Parent Mobile Feed */}
        <LearningLoopSection
          onOpenReportModal={() => setReportModalOpen(true)}
        />

        {/* Section 6: Real-Time Simulation Engine (Med-Pass Preview) */}
        <SimulatorSection onOpenReservation={scrollToReservation} />

        {/* Section 7: Premium Spaces & 1:1 Level Test Reservation */}
        <CampusReservationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <ReportModal
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />

      <SolutionModal
        isOpen={solutionModalOpen}
        onClose={() => setSolutionModalOpen(false)}
      />

      <VipPortalModal
        isOpen={vipModalOpen}
        onClose={() => setVipModalOpen(false)}
        onOpenReservation={scrollToReservation}
      />
    </div>
  );
};

export default DaechiPrestigeApp;
