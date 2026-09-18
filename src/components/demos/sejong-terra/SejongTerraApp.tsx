'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import TerraProjectShowcase from './components/TerraProjectShowcase';
import MassHaulViewer from './components/MassHaulViewer';
import TerraCostEstimator from './components/TerraCostEstimator';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';

export function SejongTerraApp({ isEmbed }: { isEmbed?: boolean } = {}) {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const handleOpenConsultation = () => setIsConsultationOpen(true);
  const handleCloseConsultation = () => setIsConsultationOpen(false);

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 font-sans text-stone-100 antialiased selection:bg-amber-500 selection:text-stone-950">
      <Header
        onOpenConsultation={handleOpenConsultation}
        onNavigateSection={handleNavigateSection}
      />

      <main>
        <Hero
          onOpenConsultation={handleOpenConsultation}
          onNavigateSection={handleNavigateSection}
        />

        <div id="section-projects">
          <TerraProjectShowcase />
        </div>

        <div id="section-mass-haul">
          <MassHaulViewer />
        </div>

        <div id="section-estimator">
          <TerraCostEstimator
            onOpenConsultation={handleOpenConsultation}
          />
        </div>
      </main>

      <Footer />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={handleCloseConsultation}
      />
    </div>
  );
}

export default SejongTerraApp;
