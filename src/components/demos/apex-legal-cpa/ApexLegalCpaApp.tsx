/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AdmissionMatrix } from './components/AdmissionMatrix';
import { CarrelFloorplan } from './components/CarrelFloorplan';
import { FacultySection } from './components/FacultySection';
import { AdmissionAuditForm } from './components/AdmissionAuditForm';
import { Footer } from './components/Footer';
import { CarrelSeat } from './types';

export default function ApexLegalCpaApp() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedSeatForBooking, setSelectedSeatForBooking] = useState<CarrelSeat | null>(null);

  // Scroll spy to update active nav tab
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'matrix-section', 'carrel-floorplan', 'faculty-section', 'audit-form'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSeatSelected = (seat: CarrelSeat) => {
    setSelectedSeatForBooking(seat);
    scrollToSection('audit-form');
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0d1c2f] flex flex-col font-serif">
      {/* Fixed Sticky Header */}
      <Header
        onOpenAudit={() => scrollToSection('audit-form')}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="w-full pt-20 flex-1">
        {/* Section I: Hero Colonnade */}
        <HeroSection
          onApplyClick={() => scrollToSection('audit-form')}
          onExploreDataClick={() => scrollToSection('matrix-section')}
        />

        {/* Section II: 3-Year LEET & CPA Admission Matrix */}
        <AdmissionMatrix />

        {/* Section III: 1-Person Soundproof Carrel Floorplan */}
        <CarrelFloorplan onSelectSeatForApplication={handleSeatSelected} />

        {/* Section IV: Supreme Faculty */}
        <FacultySection />

        {/* Section V: Candidate Screening & Diagnostic Audit */}
        <AdmissionAuditForm selectedSeat={selectedSeatForBooking} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
