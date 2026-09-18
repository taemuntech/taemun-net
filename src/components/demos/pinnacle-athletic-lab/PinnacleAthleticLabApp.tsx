/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ScoreConverterSection } from './components/ScoreConverterSection';
import { Biomechanics3DSection } from './components/Biomechanics3DSection';
import { CohortRecordsSection } from './components/CohortRecordsSection';
import { FacultySection } from './components/FacultySection';
import { AuditBookingSection } from './components/AuditBookingSection';
import { Footer } from './components/Footer';
import { SimulationModal } from './components/SimulationModal';
import { SimulationState } from './types';

export default function PinnacleAthleticLabApp() {
  const [activeNav, setActiveNav] = useState('track-and-field-lab');
  const [simulationState, setSimulationState] = useState<SimulationState>({
    isOpen: false,
    type: 'sprint',
    title: '',
  });

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = [
      'track-and-field-lab',
      'score-converter',
      'biomechanics-3d',
      'cohort-records',
      'admissions-diagnostic',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveNav(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectNav = (path: string) => {
    setActiveNav(path);
    const targetEl = document.getElementById(path);
    if (targetEl) {
      const yOffset = -70; // offset for fixed header
      const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleBookClick = () => {
    handleSelectNav('admissions-diagnostic');
  };

  const handleOpenSimulation = (type: 'sprint' | 'jump' | 'grip', title: string) => {
    setSimulationState({
      isOpen: true,
      type,
      title,
    });
  };

  const handleCloseSimulation = () => {
    setSimulationState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#e5e2e1] flex flex-col font-sans selection:bg-[#c3f400] selection:text-[#131313]">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .font-telemetry {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-feature-settings: "tnum" 1, "zero" 1;
        }
      `,
        }}
      />
      {/* Global Precision Header */}
      <Header
        activeNav={activeNav}
        onSelectNav={handleSelectNav}
        onBookClick={handleBookClick}
      />

      {/* Main Content Area (offset by header height) */}
      <main className="flex-1 pt-20">
        <HeroSection onOpenSimulation={handleOpenSimulation} />
        <ScoreConverterSection />
        <Biomechanics3DSection />
        <CohortRecordsSection />
        <FacultySection />
        <AuditBookingSection />
      </main>

      {/* Global Spec Footer */}
      <Footer />

      {/* Interactive Biomechanics Simulation Modal */}
      <SimulationModal
        simulationState={simulationState}
        onClose={handleCloseSimulation}
      />
    </div>
  );
}

