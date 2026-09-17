'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HanokZones } from './components/HanokZones';
import { TeaPairingHUD } from './components/TeaPairingHUD';
import { MaterialArchive } from './components/MaterialArchive';
import { MaterialModal } from './components/MaterialModal';
import { TeaModal } from './components/TeaModal';
import { Footer } from './components/Footer';
import { HanokMaterial } from './types';

export const JeonglimTeaApp: React.FC<{ isEmbed?: boolean }> = ({ isEmbed }) => {
  const [selectedMaterial, setSelectedMaterial] = useState<HanokMaterial | null>(null);
  const [isTeaModalOpen, setIsTeaModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#181412] text-[#f4ede2] font-sans selection:bg-[#6b5545] selection:text-white">
      <Header onOpenTeaModal={() => setIsTeaModalOpen(true)} />
      <main>
        <Hero onOpenTeaModal={() => setIsTeaModalOpen(true)} />
        <HanokZones />
        <TeaPairingHUD />
        <MaterialArchive onSelectMaterial={setSelectedMaterial} />
      </main>
      <Footer />

      {/* Modals */}
      <MaterialModal
        material={selectedMaterial}
        onClose={() => setSelectedMaterial(null)}
      />
      <TeaModal
        isOpen={isTeaModalOpen}
        onClose={() => setIsTeaModalOpen(false)}
      />
    </div>
  );
};
