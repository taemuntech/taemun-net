'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InteractiveCritiqueSection } from './components/InteractiveCritiqueSection';
import { MmiScenarioLab } from './components/MmiScenarioLab';
import { CurriculumSection } from './components/CurriculumSection';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';

interface MmiEssayAppProps {
  isEmbed?: boolean;
}

export function MmiEssayApp({ isEmbed = false }: MmiEssayAppProps) {
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>();

  const handleOpenConsultation = (courseTitle?: string) => {
    setSelectedCourse(courseTitle);
    setConsultationOpen(true);
  };

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#12141A] text-slate-100 font-sans antialiased selection:bg-rose-500/30 selection:text-rose-200">
      <Header
        onOpenConsultation={() => handleOpenConsultation()}
        onScrollTo={handleScrollTo}
      />

      <main>
        <HeroSection
          onOpenConsultation={() => handleOpenConsultation()}
          onScrollToCritique={() => handleScrollTo('critique-lab')}
        />

        <InteractiveCritiqueSection />

        <MmiScenarioLab />

        <CurriculumSection onOpenConsultation={handleOpenConsultation} />
      </main>

      <Footer />

      <ConsultationModal
        isOpen={consultationOpen}
        onClose={() => setConsultationOpen(false)}
        defaultCourse={selectedCourse}
      />
    </div>
  );
}
