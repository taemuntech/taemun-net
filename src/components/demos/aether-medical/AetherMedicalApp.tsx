'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ClinicZones } from './components/ClinicZones';
import { AcousticSilenceHUD } from './components/AcousticSilenceHUD';
import { MaterialArchive } from './components/MaterialArchive';
import { MaterialModal } from './components/MaterialModal';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';
import { MedicalMaterial } from './types';

export function AetherMedicalApp() {
  const [selectedMaterial, setSelectedMaterial] = useState<MedicalMaterial | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#2d241e] font-sans antialiased selection:bg-[#524135] selection:text-white">
      <Header onOpenConsultation={() => setIsConsultationOpen(true)} />
      <main>
        <Hero onOpenConsultation={() => setIsConsultationOpen(true)} />
        <ClinicZones />
        <AcousticSilenceHUD />
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

export default AetherMedicalApp;
