'use client';
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { ProportionHUD } from './components/ProportionHUD';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { SafetyDeclaration } from './components/SafetyDeclaration';
import { VipRecoveryCare } from './components/VipRecoveryCare';
import { MedicalDirectors } from './components/MedicalDirectors';
import { ReservationSection } from './components/ReservationSection';
import { LocationConcierge } from './components/LocationConcierge';
import { Footer } from './components/Footer';
import { ReportModal } from './components/ReportModal';
import { SafetyModal } from './components/SafetyModal';
import { SimpleModal } from './components/PriceModal';
import { HUDParameters } from './types';

interface OnsaemiroAppProps {
  isEmbed?: boolean;
}

export const OnsaemiroApp: React.FC<OnsaemiroAppProps> = ({ isEmbed = false }) => {
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [simpleModalState, setSimpleModalState] = useState<{
    isOpen: boolean;
    title: string;
    type: 'privacy' | 'price';
  }>({
    isOpen: false,
    title: '',
    type: 'privacy'
  });

  const [activeHUDReport, setActiveHUDReport] = useState<{
    params: HUDParameters;
    score: number;
    status: string;
    summary: string;
  } | null>(null);

  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('any');
  const [prefilledNotes, setPrefilledNotes] = useState<string>('');

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleOpenReportModal = (
    params: HUDParameters,
    score: number,
    status: string,
    summary: string
  ) => {
    setActiveHUDReport({ params, score, status, summary });
    setIsReportModalOpen(true);
  };

  const handleBookWithReport = () => {
    setIsReportModalOpen(false);
    if (activeHUDReport) {
      const note = `[3D 안면 황금비율 HUD 진단 데이터 연동]\n• 상/중/하 비율: ${activeHUDReport.params.upper.toFixed(2)} : ${activeHUDReport.params.mid.toFixed(2)} : ${activeHUDReport.params.lower.toFixed(2)}\n• 비순각: ${activeHUDReport.params.angle}° / 턱끝 프로젝션: ${activeHUDReport.params.projection}mm\n• 하모니 평가: ${activeHUDReport.score}점 (${activeHUDReport.status})`;
      setPrefilledNotes(note);
    }
    scrollToElement('vip-inquiry');
  };

  const handleSelectDoctor = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    scrollToElement('vip-inquiry');
  };

  return (
    <div className="min-h-screen bg-[#fdf9f5] text-[#1c1c19] font-sans antialiased selection:bg-[#c5a880] selection:text-[#513d1d]">
      {/* Top Fixed Header */}
      <Header
        onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
        onOpenReservation={() => scrollToElement('vip-inquiry')}
      />

      {/* Main Content Sections */}
      <main className="w-full pt-24 lg:pt-28">
        <Hero
          onScrollToHUD={() => scrollToElement('proportion-hud')}
          onScrollToReservation={() => scrollToElement('vip-inquiry')}
        />

        <Philosophy />

        <ProportionHUD onOpenReportModal={handleOpenReportModal} />

        <BeforeAfterGallery />

        <SafetyDeclaration onOpenSafetyModal={() => setIsSafetyModalOpen(true)} />

        <VipRecoveryCare />

        <MedicalDirectors onSelectDoctorForConsultation={handleSelectDoctor} />

        <ReservationSection
          selectedDoctorId={selectedDoctorId}
          prefilledNotes={prefilledNotes}
        />

        <LocationConcierge />
      </main>

      {/* Footer */}
      <Footer
        onOpenSafetyModal={() => setIsSafetyModalOpen(true)}
        onOpenPrivacyModal={() =>
          setSimpleModalState({
            isOpen: true,
            title: '개인정보처리방침',
            type: 'privacy'
          })
        }
        onOpenNonReimbursableModal={() =>
          setSimpleModalState({
            isOpen: true,
            title: '비급여 진료비 고지',
            type: 'price'
          })
        }
      />

      {/* 3D HUD Report Modal */}
      {activeHUDReport && (
        <ReportModal
          isOpen={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          params={activeHUDReport.params}
          score={activeHUDReport.score}
          status={activeHUDReport.status}
          summary={activeHUDReport.summary}
          onBookWithReport={handleBookWithReport}
        />
      )}

      {/* 5 Safety Pillars Charter Modal */}
      <SafetyModal
        isOpen={isSafetyModalOpen}
        onClose={() => setIsSafetyModalOpen(false)}
      />

      {/* Simple Information Modal (Privacy / Price) */}
      <SimpleModal
        isOpen={simpleModalState.isOpen}
        onClose={() => setSimpleModalState(prev => ({ ...prev, isOpen: false }))}
        title={simpleModalState.title}
        type={simpleModalState.type}
      />
    </div>
  );
}

export default OnsaemiroApp;
