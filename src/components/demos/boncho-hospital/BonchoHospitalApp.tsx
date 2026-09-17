"use client";

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SpecializedCentersSection } from './components/SpecializedCentersSection';
import { SuitesSection } from './components/SuitesSection';
import { CleanDecoctionLabSection } from './components/CleanDecoctionLabSection';
import { GourmetNutritionSection } from './components/GourmetNutritionSection';
import { AdmissionConciergeSection } from './components/AdmissionConciergeSection';
import { NetworkAndLocationSection } from './components/NetworkAndLocationSection';
import { Footer } from './components/Footer';

// Modals
import { RoomTourModal } from './components/modals/RoomTourModal';
import { InsuranceCalculatorModal } from './components/modals/InsuranceCalculatorModal';
import { BedStatusModal } from './components/modals/BedStatusModal';

interface BonchoHospitalAppProps {
  isEmbed?: boolean;
}

export default function BonchoHospitalApp({ isEmbed = false }: BonchoHospitalAppProps = {}) {
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [tourRoomType, setTourRoomType] = useState<'royal' | 'harmony'>('royal');

  const [isInsuranceOpen, setIsInsuranceOpen] = useState(false);
  const [isBedStatusOpen, setIsBedStatusOpen] = useState(false);

  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<'royal' | 'harmony' | 'undecided'>('royal');
  const [selectedPurposeForBooking, setSelectedPurposeForBooking] = useState<'oncology' | 'traffic' | 'rehab' | 'outpatient'>('oncology');

  const scrollToConcierge = () => {
    const el = document.getElementById('admission-concierge');
    if (el) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleOpenTour = (roomType?: 'royal' | 'harmony') => {
    if (roomType) setTourRoomType(roomType);
    setIsTourOpen(true);
  };

  const handleRoomSelect = (room: 'royal' | 'harmony') => {
    setSelectedRoomForBooking(room);
    scrollToConcierge();
  };

  const handleDepartmentSelect = (dept: string) => {
    if (dept === 'oncology') setSelectedPurposeForBooking('oncology');
    else if (dept === 'traffic') setSelectedPurposeForBooking('traffic');
    else if (dept === 'rehab') setSelectedPurposeForBooking('rehab');
    scrollToConcierge();
  };

  const handleBedSelect = (roomType: 'royal' | 'harmony') => {
    setSelectedRoomForBooking(roomType);
    scrollToConcierge();
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1a1c1a] font-sans selection:bg-[#cbe9da] selection:text-[#102a20]">
      {/* Fixed Sticky Header */}
      <Header
        currentSection="home"
        onOpenBooking={scrollToConcierge}
        onOpenBedStatus={() => setIsBedStatusOpen(true)}
        onOpenTour={() => handleOpenTour('royal')}
        onOpenInsurance={() => setIsInsuranceOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="pt-28 lg:pt-32">
        {/* 1. Hero Section */}
        <HeroSection
          onOpenBooking={scrollToConcierge}
          onOpenTour={() => handleOpenTour('royal')}
          onOpenBedStatus={() => setIsBedStatusOpen(true)}
        />

        {/* 2. Specialized Centers Section */}
        <SpecializedCentersSection
          onSelectDepartment={handleDepartmentSelect}
        />

        {/* 3. 360 VIP Suites Section */}
        <SuitesSection
          onSelectRoom={handleRoomSelect}
          onOpenTour={handleOpenTour}
          onOpenInsurance={() => setIsInsuranceOpen(true)}
        />

        {/* 4. Smart Clean Decoction Lab & Traceability Search */}
        <CleanDecoctionLabSection />

        {/* 5. Therapeutic Gourmet Nutrition */}
        <GourmetNutritionSection />

        {/* 6. Smart Admission Concierge & Booking */}
        <AdmissionConciergeSection
          key={`${selectedRoomForBooking}-${selectedPurposeForBooking}`}
          initialRoomType={selectedRoomForBooking}
          initialPurpose={selectedPurposeForBooking}
        />

        {/* 7. University Hospital Network & Location */}
        <NetworkAndLocationSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Bottom Quick Bar for Mobile & Tablet */}
      <div className="fixed bottom-4 left-4 right-4 z-40 lg:hidden bg-[#102a20]/95 backdrop-blur-lg text-white p-2.5 rounded-2xl shadow-2xl border border-[#264035] flex items-center justify-between gap-2">
        <a
          href="tel:02-0000-0000"
          className="flex-1 py-2 bg-[#264035] rounded-xl text-center text-[12px] font-semibold flex items-center justify-center gap-1 text-white"
        >
          <span className="material-symbols-outlined text-[16px]">call</span>
          <span>전화상담</span>
        </a>
        <button
          onClick={() => setIsBedStatusOpen(true)}
          className="flex-1 py-2 bg-[#ffd9b4] text-[#3a1f04] rounded-xl text-center text-[12px] font-bold flex items-center justify-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">hotel</span>
          <span>병실잔여(5)</span>
        </button>
        <button
          onClick={scrollToConcierge}
          className="flex-1 py-2 bg-[#cbe9da] text-[#052017] rounded-xl text-center text-[12px] font-bold flex items-center justify-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">calendar_month</span>
          <span>입원예약</span>
        </button>
      </div>

      {/* Interactive Modals */}
      <RoomTourModal
        isOpen={isTourOpen}
        initialRoom={tourRoomType}
        onClose={() => setIsTourOpen(false)}
        onBookRoom={(room) => {
          handleRoomSelect(room);
        }}
      />

      <InsuranceCalculatorModal
        isOpen={isInsuranceOpen}
        onClose={() => setIsInsuranceOpen(false)}
        onProceedBooking={() => {
          scrollToConcierge();
        }}
      />

      <BedStatusModal
        isOpen={isBedStatusOpen}
        onClose={() => setIsBedStatusOpen(false)}
        onSelectBed={handleBedSelect}
      />
    </div>
  );
}
