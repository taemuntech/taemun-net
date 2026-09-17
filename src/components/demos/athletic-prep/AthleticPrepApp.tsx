'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InteractiveSportsTelemetry } from './components/InteractiveSportsTelemetry';
import { AthleticPassShowcase } from './components/AthleticPassShowcase';
import { CurriculumSection } from './components/CurriculumSection';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';

interface AthleticPrepAppProps {
  isEmbed?: boolean;
}

export function AthleticPrepApp({ isEmbed = false }: AthleticPrepAppProps) {
  const [consultOpen, setConsultOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>();

  const handleOpenConsult = (courseTitle?: string) => {
    setSelectedCourse(courseTitle);
    setConsultOpen(true);
  };

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#06090E] text-zinc-100 font-sans antialiased selection:bg-lime-500/30 selection:text-lime-200">
      <Header
        onOpenConsult={() => handleOpenConsult()}
        onScrollTo={handleScrollTo}
      />

      <main>
        <HeroSection
          onOpenConsult={() => handleOpenConsult()}
          onScrollToLab={() => handleScrollTo('telemetry-lab')}
        />

        <InteractiveSportsTelemetry />

        <AthleticPassShowcase />

        <CurriculumSection onOpenConsult={handleOpenConsult} />
      </main>

      <Footer />

      <ConsultationModal
        isOpen={consultOpen}
        onClose={() => setConsultOpen(false)}
        defaultCourse={selectedCourse}
      />
    </div>
  );
}
