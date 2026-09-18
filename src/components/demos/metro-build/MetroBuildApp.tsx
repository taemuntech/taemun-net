'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BimControlCenter from './components/BimControlCenter';
import PortfolioShowcase from './components/PortfolioShowcase';
import TurnkeyRoadmap from './components/TurnkeyRoadmap';
import CostCalculator from './components/CostCalculator';
import ConsultationModal from './components/ConsultationModal';
import Footer from './components/Footer';

export function MetroBuildApp({ isEmbed }: { isEmbed?: boolean } = {}) {
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
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 antialiased selection:bg-blue-600 selection:text-white">
      <Header
        onOpenConsultation={handleOpenConsultation}
        onNavigateSection={handleNavigateSection}
      />
      <main>
        <Hero
          onOpenConsultation={handleOpenConsultation}
          onNavigateSection={handleNavigateSection}
        />
        <PortfolioShowcase onOpenConsultation={handleOpenConsultation} />
        <BimControlCenter />
        <TurnkeyRoadmap />
        <CostCalculator onOpenConsultation={handleOpenConsultation} />
      </main>
      <Footer />
      <ConsultationModal isOpen={isModalOpen} onClose={handleCloseConsultation} />
    </div>
  );
}

export default MetroBuildApp;
