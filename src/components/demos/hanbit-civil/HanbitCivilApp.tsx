'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import InfrastructureShowcase from './components/InfrastructureShowcase';
import EngineeringTechSection from './components/EngineeringTechSection';
import CivilCostEstimator from './components/CivilCostEstimator';
import ConsultationModal from './components/ConsultationModal';
import Footer from './components/Footer';

export function HanbitCivilApp({ isEmbed }: { isEmbed?: boolean } = {}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenConsultation = () => setIsModalOpen(true);
  const handleCloseConsultation = () => setIsModalOpen(false);

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-100 antialiased selection:bg-amber-500 selection:text-neutral-950">
      <Header
        onOpenConsultation={handleOpenConsultation}
        onNavigateSection={handleNavigateSection}
      />
      <main>
        <Hero
          onOpenConsultation={handleOpenConsultation}
          onNavigateSection={handleNavigateSection}
        />
        <InfrastructureShowcase onOpenConsultation={handleOpenConsultation} />
        <EngineeringTechSection />
        <CivilCostEstimator onOpenConsultation={handleOpenConsultation} />
      </main>
      <Footer />
      <ConsultationModal isOpen={isModalOpen} onClose={handleCloseConsultation} />
    </div>
  );
}

export default HanbitCivilApp;
