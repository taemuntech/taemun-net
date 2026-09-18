'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DepthStratumViewer from './components/DepthStratumViewer';
import FoundationShowcase from './components/FoundationShowcase';
import ExcavationEstimator from './components/ExcavationEstimator';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';

export function GeoFoundationApp({ isEmbed }: { isEmbed?: boolean } = {}) {
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
          <FoundationShowcase />
        </div>

        <div id="section-strata">
          <DepthStratumViewer />
        </div>

        <div id="section-estimator">
          <ExcavationEstimator
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

export default GeoFoundationApp;
