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
import { ReservationFormData } from './types';

interface DaechiPrestigeAppProps {
  isEmbed?: boolean;
}

export const DaechiPrestigeApp: React.FC<DaechiPrestigeAppProps> = ({ isEmbed = false }) => {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [solutionModalOpen, setSolutionModalOpen] = useState(false);
  const [vipModalOpen, setVipModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const scrollToReservation = () => {
    const el = document.getElementById('reservation-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReservationSuccess = (data: ReservationFormData) => {
    setToastMessage(`[${data.studentName}] 학생의 1:1 심층진단 신청 예시가 확인되었습니다(가상 시연).`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface text-on-surface selection:bg-primary/20 selection:text-primary font-sans antialiased">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-inverse-surface text-surface text-sm shadow-2xl flex items-center gap-3 border border-neutral-700 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <span className="material-symbols-outlined text-[#10B981] text-[20px]">
            check_circle
          </span>
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            aria-label="알림 닫기"
            className="ml-2 text-outline-variant hover:text-surface cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

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
        <CampusReservationSection
          onReservationSuccess={handleReservationSuccess}
        />
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
