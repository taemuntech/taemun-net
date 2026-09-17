'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PhilosophySection } from './components/PhilosophySection';
import { FacialProportionSection } from './components/FacialProportionSection';
import { BeforeAfterSection } from './components/BeforeAfterSection';
import { SafetySystemSection } from './components/SafetySystemSection';
import { RecoveryLoungeSection } from './components/RecoveryLoungeSection';
import { DoctorsSection } from './components/DoctorsSection';
import { ConsultationSection } from './components/ConsultationSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';

import { FaceAnalysisModal } from './components/modals/FaceAnalysisModal';
import { SafetyInspectionModal } from './components/modals/SafetyInspectionModal';
import { RecoveryGuideModal } from './components/modals/RecoveryGuideModal';

interface OnsaemiroAppProps {
  isEmbed?: boolean;
}

export const OnsaemiroApp: React.FC<OnsaemiroAppProps> = ({ isEmbed = false }) => {
  // Modals state
  const [safetyModalOpen, setSafetyModalOpen] = useState(false);
  const [recoveryModalOpen, setRecoveryModalOpen] = useState(false);
  const [analysisModalOpen, setAnalysisModalOpen] = useState(false);
  const [analysisData, setAnalysisData] = useState<{
    upperRatio: number;
    midRatio: number;
    lowerRatio: number;
    nasolabialAngle: number;
    chinProjection: number;
    harmonyScore: number;
    presetName: string;
  } | null>(null);

  const handleOpenAnalysisModal = (data: {
    upperRatio: number;
    midRatio: number;
    lowerRatio: number;
    nasolabialAngle: number;
    chinProjection: number;
    harmonyScore: number;
    presetName: string;
  }) => {
    setAnalysisData(data);
    setAnalysisModalOpen(true);
  };

  const handleScrollToConsultation = () => {
    const el = document.getElementById('consultation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToProportion = () => {
    const el = document.getElementById('proportion');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1817] text-[#1A1817] selection:bg-[#C5A880] selection:text-white font-sans">
      {/* Header */}
      <Header
        onOpenConsultation={handleScrollToConsultation}
        onOpenSafetyModal={() => setSafetyModalOpen(true)}
      />

      {/* Main Sections */}
      <main>
        <HeroSection
          onOpenConsultation={handleScrollToConsultation}
          onOpenSafetyModal={() => setSafetyModalOpen(true)}
          onScrollToProportion={handleScrollToProportion}
        />

        <PhilosophySection />

        <FacialProportionSection
          onOpenAnalysisModal={handleOpenAnalysisModal}
        />

        <BeforeAfterSection />

        <SafetySystemSection
          onOpenSafetyModal={() => setSafetyModalOpen(true)}
        />

        <RecoveryLoungeSection
          onOpenRecoveryModal={() => setRecoveryModalOpen(true)}
        />

        <DoctorsSection />

        <ConsultationSection />

        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <FaceAnalysisModal
        open={analysisModalOpen}
        onClose={() => setAnalysisModalOpen(false)}
        data={analysisData}
        onProceedToConsultation={handleScrollToConsultation}
      />

      <SafetyInspectionModal
        open={safetyModalOpen}
        onClose={() => setSafetyModalOpen(false)}
      />

      <RecoveryGuideModal
        open={recoveryModalOpen}
        onClose={() => setRecoveryModalOpen(false)}
      />
    </div>
  );
};
