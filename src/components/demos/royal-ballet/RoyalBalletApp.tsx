'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { BalletAnatomySection } from './components/BalletAnatomySection';
import { CurriculumSection } from './components/CurriculumSection';
import { PerformanceArchiveSection } from './components/PerformanceArchiveSection';
import { AuditionModal } from './components/AuditionModal';
import { Footer } from './components/Footer';

interface RoyalBalletAppProps {
  isEmbed?: boolean;
}

export function RoyalBalletApp({ isEmbed: _isEmbed }: RoyalBalletAppProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenAudition = () => {
    setModalOpen(true);
  };

  const scrollToAnatomy = () => {
    const el = document.getElementById('anatomy-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0E11] text-[#F7F3F5] font-sans antialiased selection:bg-[#F4ACB7] selection:text-[#0F0E11]">
      <Header onOpenAudition={handleOpenAudition} />
      <main>
        <HeroSection
          onOpenAudition={handleOpenAudition}
          onScrollToAnatomy={scrollToAnatomy}
        />
        <BalletAnatomySection />
        <CurriculumSection onOpenAudition={handleOpenAudition} />
        <PerformanceArchiveSection />
      </main>
      <Footer />

      <AuditionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
