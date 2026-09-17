"use client";

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ImplantSection } from './components/ImplantSection';
import { VeneerSection } from './components/VeneerSection';
import { FacultySection } from './components/FacultySection';
import { TechSection } from './components/TechSection';
import { BookingSection } from './components/BookingSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { ClinicTourModal } from './components/ClinicTourModal';
import { PhilosophyModal } from './components/PhilosophyModal';
import { BookingModal } from './components/BookingModal';
import { FloatingActions } from './components/FloatingActions';
import { BookingFormData } from './types';

interface CheongdamArteDentalAppProps {
  isEmbed?: boolean;
}

export default function CheongdamArteDentalApp(_props: CheongdamArteDentalAppProps = {}) {
  const [isClinicTourOpen, setIsClinicTourOpen] = useState(false);
  const [isPhilosophyOpen, setIsPhilosophyOpen] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingFormData | null>(null);

  const scrollToBooking = () => {
    const el = document.getElementById('booking-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToImplant = () => {
    const el = document.getElementById('navigation-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 예약 폼은 스스로 샘플 고지(SampleNotice)를 먼저 띄우고, 그 고지를 닫은 뒤에 이 요약 화면을 연다.
  const handleCompleteBooking = (data: BookingFormData) => {
    setConfirmedBooking(data);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#1a1c1a] font-sans selection:bg-[#ffdea5] selection:text-[#261900] flex flex-col">
      {/* Sticky Header with Navigation */}
      <Header
        onOpenClinicTour={() => setIsClinicTourOpen(true)}
        onOpenPhilosophy={() => setIsPhilosophyOpen(true)}
        onNavigateToBooking={scrollToBooking}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-20 lg:pt-28">
        {/* 1. Hero Section with Luxury Suite Showcase and 4 Stats Cards */}
        <HeroSection
          onNavigateToBooking={scrollToBooking}
          onNavigateToImplant={scrollToImplant}
          onOpenClinicTour={() => setIsClinicTourOpen(true)}
        />

        {/* 2. 3D Digital Navigation Implant Section with Comparative Toggle */}
        <ImplantSection />

        {/* 3. Bespoke Aesthetic Veneers Section with Draggable Before/After Slider */}
        <VeneerSection />

        {/* 4. Faculty & Certified Specialists Section */}
        <FacultySection />

        {/* 5. Painless & Safe System 4-Tech Section */}
        <TechSection />

        {/* 6. Concierge Reservation Form with Sensitivity / Fear Pre-Screening */}
        <BookingSection
          onCompleteBooking={handleCompleteBooking}
        />

        {/* 7. Chic Cheongdam Location, Map, and Valet Parking */}
        <LocationSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenPhilosophy={() => setIsPhilosophyOpen(true)}
        onOpenClinicTour={() => setIsClinicTourOpen(true)}
        onGoToBooking={scrollToBooking}
      />

      {/* Interactive Modals */}
      <ClinicTourModal
        isOpen={isClinicTourOpen}
        onClose={() => setIsClinicTourOpen(false)}
        onBookTour={scrollToBooking}
      />

      <PhilosophyModal
        isOpen={isPhilosophyOpen}
        onClose={() => setIsPhilosophyOpen(false)}
        onGoToBooking={scrollToBooking}
      />

      <BookingModal
        bookingData={confirmedBooking}
        onClose={() => setConfirmedBooking(null)}
      />

      {/* Floating Quick CTA and Top-scroll Button */}
      <FloatingActions
        onGoToBooking={scrollToBooking}
      />

    </div>
  );
}
