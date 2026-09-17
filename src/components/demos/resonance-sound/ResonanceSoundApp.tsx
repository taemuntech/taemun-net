'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SoundZones } from './components/SoundZones';
import { RT60AcousticHUD } from './components/RT60AcousticHUD';
import { MaterialArchive } from './components/MaterialArchive';
import { MaterialModal } from './components/MaterialModal';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';
import { SoundMaterial } from './types';

export function ResonanceSoundApp({ isEmbed }: { isEmbed?: boolean } = {}) {
  const [selectedMaterial, setSelectedMaterial] = useState<SoundMaterial | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf6f0] text-[#2e2319] font-sans antialiased selection:bg-[#5c422c] selection:text-white">
      <Header onOpenConsultation={() => setIsConsultationOpen(true)} />
      <main>
        <Hero onOpenConsultation={() => setIsConsultationOpen(true)} />
        <SoundZones />
        <RT60AcousticHUD />
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

export default ResonanceSoundApp;

