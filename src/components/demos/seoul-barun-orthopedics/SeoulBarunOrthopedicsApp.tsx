"use client";

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SymptomChecker } from './components/SymptomChecker';
import { TechnologySection } from './components/TechnologySection';
import { RehabSuiteSection } from './components/RehabSuiteSection';
import { MedicalStaffSection } from './components/MedicalStaffSection';
import { FastTrackBooking } from './components/FastTrackBooking';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { TechDetailModal } from './components/TechDetailModal';
import { RehabModal } from './components/RehabModal';
import { TechnologyItem, RehabEquipment, BookingState, BodyRegion } from './types';

interface SeoulBarunOrthopedicsAppProps {
  isEmbed?: boolean;
}

export default function SeoulBarunOrthopedicsApp({ isEmbed }: SeoulBarunOrthopedicsAppProps = {}) {
  const [selectedTech, setSelectedTech] = useState<TechnologyItem | null>(null);
  const [selectedRehab, setSelectedRehab] = useState<RehabEquipment | null>(null);
  const [prefilledBooking, setPrefilledBooking] = useState<Partial<BookingState>>({});

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleOpenBooking = (prefill?: { part?: string; doctor?: string }) => {
    if (prefill) {
      setPrefilledBooking((prev) => ({ ...prev, ...prefill }));
    }
    scrollToSection('fast-track-booking');
  };

  const handleSymptomProceed = (region: BodyRegion) => {
    const partMapping: Record<BodyRegion, string> = {
      neck: '목/경추 센터',
      lumbar: '허리/요추 센터',
      knee: '무릎 관절 센터',
      ankle: '고관절/발목 센터',
    };
    setPrefilledBooking({
      part: partMapping[region] || '허리/요추 센터',
      duration: '1~3개월 지속',
      vas: 7,
    });
    scrollToSection('fast-track-booking');
  };

  const handleDoctorSelect = (doctorName: string) => {
    setPrefilledBooking((prev) => ({
      ...prev,
      doctor: doctorName.includes('박진우') ? '박진우 대표원장 (척추)' : '최윤석 원장 (관절)',
    }));
    scrollToSection('fast-track-booking');
  };

  const handleTechBook = (title: string) => {
    setPrefilledBooking((prev) => ({
      ...prev,
      part: title.includes('척추') || title.includes('경추') ? '허리/요추 센터' : '무릎 관절 센터',
    }));
    scrollToSection('fast-track-booking');
  };

  const handleRehabBook = () => {
    setPrefilledBooking((prev) => ({
      ...prev,
      part: '100평 1:1 도수재활 센터',
    }));
    scrollToSection('fast-track-booking');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1A1C1A] antialiased">
      {/* Fixed Header */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onSelectNav={(id) => scrollToSection(id)}
      />

      {/* Main Content Sections */}
      {/* 고정 헤더 높이 = 상단 바(모바일 44 · lg 40) + 네비 80 */}
      <main className="flex-1 pt-[124px] lg:pt-[120px]">
        <HeroSection
          onScrollToQuiz={() => scrollToSection('self-diagnosis')}
          onScrollToBooking={() => scrollToSection('fast-track-booking')}
          onScrollToRehab={() => scrollToSection('rehab-center')}
        />

        <SymptomChecker onProceedToBooking={handleSymptomProceed} />

        <TechnologySection onSelectTechnology={(tech) => setSelectedTech(tech)} />

        <RehabSuiteSection
          onSelectEquipment={(item) => setSelectedRehab(item)}
          onBookConsultation={() => {
            setPrefilledBooking({ part: '100평 1:1 도수재활 센터' });
            scrollToSection('fast-track-booking');
          }}
        />

        <MedicalStaffSection onSelectDoctor={handleDoctorSelect} />

        <FastTrackBooking initialState={prefilledBooking} />

        <LocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <TechDetailModal
        technology={selectedTech}
        onClose={() => setSelectedTech(null)}
        onBookTech={handleTechBook}
      />

      <RehabModal
        item={selectedRehab}
        onClose={() => setSelectedRehab(null)}
        onBookRehab={handleRehabBook}
      />
    </div>
  );
}
