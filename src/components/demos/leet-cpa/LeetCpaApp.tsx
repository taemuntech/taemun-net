'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InteractiveLeetLab } from './components/InteractiveLeetLab';
import { CaseStudySection } from './components/CaseStudySection';
import { CurriculumSection } from './components/CurriculumSection';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';

interface LeetCpaAppProps {
  isEmbed?: boolean;
}

export function LeetCpaApp({ isEmbed = false }: LeetCpaAppProps) {
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
    <div className="min-h-screen bg-[#070B13] text-zinc-100 font-sans antialiased selection:bg-amber-500/30 selection:text-amber-200">
      <Header
        onOpenConsult={() => handleOpenConsult()}
        onScrollTo={handleScrollTo}
      />

      <main>
        <HeroSection
          onOpenConsult={() => handleOpenConsult()}
          onScrollToLab={() => handleScrollTo('leet-lab')}
        />

        <InteractiveLeetLab />

        <CaseStudySection />

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
