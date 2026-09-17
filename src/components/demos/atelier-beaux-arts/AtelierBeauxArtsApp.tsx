'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { VirtualGallerySection } from './components/VirtualGallerySection';
import { ExamAnalysisSection } from './components/ExamAnalysisSection';
import { CurriculumSection } from './components/CurriculumSection';
import { EvaluationModal } from './components/EvaluationModal';
import { Footer } from './components/Footer';

interface AtelierBeauxArtsAppProps {
  isEmbed?: boolean;
}

export function AtelierBeauxArtsApp({ isEmbed: _isEmbed }: AtelierBeauxArtsAppProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenEvaluation = () => {
    setModalOpen(true);
  };

  const scrollToGallery = () => {
    const el = document.getElementById('gallery-3d-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#12141A] text-white font-sans antialiased selection:bg-[#38BDF8] selection:text-[#0F172A]">
      <Header onOpenEvaluation={handleOpenEvaluation} />
      <main>
        <HeroSection
          onOpenEvaluation={handleOpenEvaluation}
          onScrollToGallery={scrollToGallery}
        />
        <VirtualGallerySection />
        <ExamAnalysisSection />
        <CurriculumSection onOpenEvaluation={handleOpenEvaluation} />
      </main>
      <Footer />

      <EvaluationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
