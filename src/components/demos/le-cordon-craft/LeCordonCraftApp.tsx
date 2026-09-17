'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InteractiveCraftStudio } from './components/InteractiveCraftStudio';
import { CurriculumSection } from './components/CurriculumSection';
import { MasteryGallery } from './components/MasteryGallery';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';
import { CraftDiscipline } from './types';

export default function LeCordonCraftApp() {
  const [discipline, setDiscipline] = useState<CraftDiscipline>('patisserie');
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const scrollToStudio = () => {
    const el = document.getElementById('craft-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-600 selection:text-white">
      <Header
        activeDiscipline={discipline}
        setActiveDiscipline={setDiscipline}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      <main>
        <HeroSection
          onOpenConsultation={() => setIsConsultationOpen(true)}
          onScrollToStudio={scrollToStudio}
        />

        <InteractiveCraftStudio
          discipline={discipline}
          setDiscipline={setDiscipline}
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        <CurriculumSection
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        <MasteryGallery />
      </main>

      <Footer />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}
