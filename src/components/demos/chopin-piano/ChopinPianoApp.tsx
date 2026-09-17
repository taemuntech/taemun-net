'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InteractivePianoSection } from './components/InteractivePianoSection';
import { AcousticSpectrumSection } from './components/AcousticSpectrumSection';
import { MasterclassSection } from './components/MasterclassSection';
import { FacultySection } from './components/FacultySection';
import { PracticeRoomsSection } from './components/PracticeRoomsSection';
import { ReservationModal } from './components/ReservationModal';
import { Footer } from './components/Footer';

interface ChopinPianoAppProps {
  isEmbed?: boolean;
}

export function ChopinPianoApp({ isEmbed: _isEmbed }: ChopinPianoAppProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | undefined>(undefined);

  const handleOpenReservation = (program?: string) => {
    setSelectedProgram(program);
    setModalOpen(true);
  };

  const scrollToPiano = () => {
    const el = document.getElementById('piano-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#121110] text-[#f5f0eb] font-sans antialiased selection:bg-[#d4af37] selection:text-[#121110]">
      <Header onOpenReservation={handleOpenReservation} />
      <main>
        <HeroSection
          onOpenReservation={handleOpenReservation}
          onScrollToPiano={scrollToPiano}
        />
        <InteractivePianoSection />
        <AcousticSpectrumSection />
        <MasterclassSection onOpenReservation={handleOpenReservation} />
        <FacultySection />
        <PracticeRoomsSection onOpenReservation={handleOpenReservation} />
      </main>
      <Footer />

      <ReservationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultProgram={selectedProgram}
      />
    </div>
  );
}
