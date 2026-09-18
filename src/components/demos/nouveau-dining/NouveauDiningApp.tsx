'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SpatialZones } from './components/SpatialZones';
import { LightingSimulation } from './components/LightingSimulation';
import { MaterialArchive } from './components/MaterialArchive';
import { MaterialModal } from './components/MaterialModal';
import { ReserveModal } from './components/ReserveModal';
import { Footer } from './components/Footer';
import { DiningMaterial } from './types';

export const NouveauDiningApp: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<DiningMaterial | null>(null);
  const [isReserveOpen, setIsReserveOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 font-sans selection:bg-amber-400 selection:text-stone-950">
      <Header onOpenReserve={() => setIsReserveOpen(true)} />
      <main>
        <Hero onOpenReserve={() => setIsReserveOpen(true)} />
        <SpatialZones />
        <LightingSimulation />
        <MaterialArchive onSelectMaterial={setSelectedMaterial} />
      </main>
      <Footer />

      {/* Modals */}
      <MaterialModal
        material={selectedMaterial}
        onClose={() => setSelectedMaterial(null)}
      />
      <ReserveModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
      />
    </div>
  );
};
