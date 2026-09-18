'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { KidsZones } from './components/KidsZones';
import { EcoSafetyHUD } from './components/EcoSafetyHUD';
import { MaterialArchive } from './components/MaterialArchive';
import { MaterialModal } from './components/MaterialModal';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';
import { KidsMaterial } from './types';

export function RaonKidsApp() {
  const [selectedMaterial, setSelectedMaterial] = useState<KidsMaterial | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#fcf9f2] text-[#3b2e1e] font-sans antialiased selection:bg-[#e39c44] selection:text-white">
      <Header onOpenConsultation={() => setIsConsultationOpen(true)} />
      <main>
        <Hero onOpenConsultation={() => setIsConsultationOpen(true)} />
        <KidsZones />
        <EcoSafetyHUD />
        <MaterialArchive onSelectMaterial={(mat) => setSelectedMaterial(mat)} />
      </main>
      <Footer />

      {/* Modals */}
      <MaterialModal
        material={selectedMaterial}
        onClose={() => setSelectedMaterial(null)}
      />
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}

export default RaonKidsApp;

