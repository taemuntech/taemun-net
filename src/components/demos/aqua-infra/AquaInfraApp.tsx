'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import WaterProjectShowcase from './components/WaterProjectShowcase';
import WaterProcessViewer from './components/WaterProcessViewer';
import WaterCostEstimator from './components/WaterCostEstimator';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';

export function AquaInfraApp({ isEmbed }: { isEmbed?: boolean } = {}) {
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
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950">
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
          <WaterProjectShowcase />
        </div>

        <div id="section-process">
          <WaterProcessViewer />
        </div>

        <div id="section-estimator">
          <WaterCostEstimator
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

export default AquaInfraApp;
