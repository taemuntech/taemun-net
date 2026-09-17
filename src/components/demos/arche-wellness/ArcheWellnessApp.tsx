'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StudioZones } from './components/StudioZones';
import { AirTelemetryHUD } from './components/AirTelemetryHUD';
import { MaterialArchive } from './components/MaterialArchive';
import { MaterialModal } from './components/MaterialModal';
import { TrialModal } from './components/TrialModal';
import { Footer } from './components/Footer';
import { WellnessMaterial } from './types';

export const ArcheWellnessApp: React.FC<{ isEmbed?: boolean }> = ({ isEmbed }) => {
  const [selectedMaterial, setSelectedMaterial] = useState<WellnessMaterial | null>(null);
  const [isTrialOpen, setIsTrialOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf7f2] text-[#3d322a] font-sans selection:bg-[#d27952] selection:text-white">
      <Header onOpenTrial={() => setIsTrialOpen(true)} />
      <main>
        <Hero onOpenTrial={() => setIsTrialOpen(true)} />
        <StudioZones />
        <AirTelemetryHUD />
        <MaterialArchive onSelectMaterial={setSelectedMaterial} />
      </main>
      <Footer />

      {/* Modals */}
      <MaterialModal
        material={selectedMaterial}
        onClose={() => setSelectedMaterial(null)}
      />
      <TrialModal
        isOpen={isTrialOpen}
        onClose={() => setIsTrialOpen(false)}
      />
    </div>
  );
};
