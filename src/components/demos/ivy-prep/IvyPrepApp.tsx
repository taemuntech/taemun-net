'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InteractiveAdmissionRadar } from './components/InteractiveAdmissionRadar';
import { IvyAdmissionsShowcase } from './components/IvyAdmissionsShowcase';
import { CurriculumSection } from './components/CurriculumSection';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';

interface IvyPrepAppProps {
  isEmbed?: boolean;
}

export function IvyPrepApp({ isEmbed = false }: IvyPrepAppProps) {
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
    <div className="min-h-screen bg-[#100105] text-rose-50 font-sans antialiased selection:bg-rose-500/30 selection:text-amber-200">
      <Header
        onOpenConsult={() => handleOpenConsult()}
        onScrollTo={handleScrollTo}
      />

      <main>
        <HeroSection
          onOpenConsult={() => handleOpenConsult()}
          onScrollToRadar={() => handleScrollTo('radar-lab')}
        />

        <InteractiveAdmissionRadar />

        <IvyAdmissionsShowcase />

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
