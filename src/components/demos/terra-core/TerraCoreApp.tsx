'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StrataDepthHUD } from './components/StrataDepthHUD';
import { TbmInteractiveSection } from './components/TbmInteractiveSection';
import { StrataZones } from './components/StrataZones';
import { MaterialArchive } from './components/MaterialArchive';
import { MaterialModal } from './components/MaterialModal';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';
import { GeotechMaterial } from './types';

export function TerraCoreApp({ isEmbed }: { isEmbed?: boolean } = {}) {
  const [selectedMaterial, setSelectedMaterial] = useState<GeotechMaterial | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans antialiased selection:bg-[#ff6b2b] selection:text-black">
      <Header onOpenConsultation={() => setIsConsultationOpen(true)} />
      <main>
        <Hero onOpenConsultation={() => setIsConsultationOpen(true)} />
        <StrataDepthHUD />
        <TbmInteractiveSection />
        <StrataZones />
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

export default TerraCoreApp;
