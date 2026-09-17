'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TimeMoodController } from './components/TimeMoodController';
import { SpatialZones } from './components/SpatialZones';
import { MaterialTale } from './components/MaterialTale';
import { ArchitecturePhilosophy } from './components/ArchitecturePhilosophy';
import { MaterialModal } from './components/MaterialModal';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';
import { StayMaterial } from './types';

interface StayJejuAppProps {
  isEmbed?: boolean;
}

export const StayJejuApp: React.FC<StayJejuAppProps> = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<StayMaterial | null>(null);
  const [consultationOpen, setConsultationOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#111215] text-stone-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* 1. Sticky Header */}
      <Header
        onNavigate={scrollToSection}
        onOpenConsultation={() => setConsultationOpen(true)}
      />

      {/* 2. Hero Section */}
      <main>
        <Hero
          onExploreMood={() => scrollToSection('timemood')}
          onExploreZones={() => scrollToSection('zones')}
        />

        {/* 3. Time Mood Controller (Lighting & Day/Sunset/Night) */}
        <TimeMoodController />

        {/* 4. Spatial Zones & Hotspot Tour */}
        <SpatialZones />

        {/* 5. Jeju Materials Tactile Archive */}
        <MaterialTale onSelectMaterial={(mat) => setSelectedMaterial(mat)} />

        {/* 6. Architectural Ethos & Philosophy */}
        <ArchitecturePhilosophy />
      </main>

      {/* 7. Footer */}
      <Footer onOpenConsultation={() => setConsultationOpen(true)} />

      {/* Modals */}
      <MaterialModal
        material={selectedMaterial}
        onClose={() => setSelectedMaterial(null)}
      />

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
      />
    </div>
  );
};

export default StayJejuApp;
