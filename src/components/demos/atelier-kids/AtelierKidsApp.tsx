'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InteractiveCollageSection } from './components/InteractiveCollageSection';
import { SensoryHudSection } from './components/SensoryHudSection';
import { KidsCurriculumSection } from './components/KidsCurriculumSection';
import { ArtGallerySection } from './components/ArtGallerySection';
import { TrialClassModal } from './components/TrialClassModal';
import { Footer } from './components/Footer';

interface AtelierKidsAppProps {
  isEmbed?: boolean;
}

export function AtelierKidsApp({ isEmbed: _isEmbed }: AtelierKidsAppProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAge, setSelectedAge] = useState<string | undefined>(undefined);

  const handleOpenTrial = (ageGroup?: string) => {
    setSelectedAge(ageGroup);
    setModalOpen(true);
  };

  const scrollToCollage = () => {
    const el = document.getElementById('collage-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D2A26] font-sans antialiased selection:bg-[#E07A5F] selection:text-white">
      <Header onOpenTrialModal={handleOpenTrial} />
      <main>
        <HeroSection
          onOpenTrialModal={() => handleOpenTrial()}
          onScrollToCollage={scrollToCollage}
        />
        <InteractiveCollageSection />
        <SensoryHudSection />
        <KidsCurriculumSection onOpenTrialModal={handleOpenTrial} />
        <ArtGallerySection />
      </main>
      <Footer />

      <TrialClassModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultAgeGroup={selectedAge}
      />
    </div>
  );
}
