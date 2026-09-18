'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MarineProjectShowcase from './components/MarineProjectShowcase';
import CaissonProcessViewer from './components/CaissonProcessViewer';
import MarineCostEstimator from './components/MarineCostEstimator';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';

export function OceanMarineApp({ isEmbed }: { isEmbed?: boolean } = {}) {
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
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-sky-500 selection:text-slate-950">
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
          <MarineProjectShowcase />
        </div>

        <div id="section-caisson">
          <CaissonProcessViewer />
        </div>

        <div id="section-estimator">
          <MarineCostEstimator
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

export default OceanMarineApp;
