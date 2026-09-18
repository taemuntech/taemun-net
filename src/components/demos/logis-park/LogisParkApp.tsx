'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ChamberDiagram from './components/ChamberDiagram';
import EngineeringShowcase from './components/EngineeringShowcase';
import LogisticsShowcase from './components/LogisticsShowcase';
import LogisticsCostCalculator from './components/LogisticsCostCalculator';
import ConsultationModal from './components/ConsultationModal';
import Footer from './components/Footer';

export function LogisParkApp({ isEmbed }: { isEmbed?: boolean } = {}) {
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
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-100 antialiased selection:bg-cyan-500 selection:text-neutral-950">
      <Header
        onOpenConsultation={handleOpenConsultation}
        onNavigateSection={handleNavigateSection}
      />
      <main>
        <Hero
          onOpenConsultation={handleOpenConsultation}
          onNavigateSection={handleNavigateSection}
        />
        <LogisticsShowcase onOpenConsultation={handleOpenConsultation} />
        <ChamberDiagram />
        <EngineeringShowcase />
        <LogisticsCostCalculator onOpenConsultation={handleOpenConsultation} />
      </main>
      <Footer />
      <ConsultationModal isOpen={isModalOpen} onClose={handleCloseConsultation} />
    </div>
  );
}

export default LogisParkApp;
