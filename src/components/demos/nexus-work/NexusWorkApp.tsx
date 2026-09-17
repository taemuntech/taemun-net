'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WorkspaceZones } from './components/WorkspaceZones';
import { MeetingRoomHUD } from './components/MeetingRoomHUD';
import { AcousticMaterials } from './components/AcousticMaterials';
import { WorkPhilosophy } from './components/WorkPhilosophy';
import { MaterialModal } from './components/MaterialModal';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';
import { AcousticMaterial } from './types';

interface NexusWorkAppProps {
  isEmbed?: boolean;
}

export const NexusWorkApp: React.FC<NexusWorkAppProps> = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<AcousticMaterial | null>(null);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [consultationNote, setConsultationNote] = useState('');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleOpenConsultationWithNote = (note: string) => {
    setConsultationNote(note);
    setConsultationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090a0f] text-zinc-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* 1. Sticky Header */}
      <Header
        onNavigate={scrollToSection}
        onOpenConsultation={() => {
          setConsultationNote('');
          setConsultationOpen(true);
        }}
      />

      {/* 2. Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onExploreZones={() => scrollToSection('zones')}
          onExploreHUD={() => scrollToSection('meeting-hud')}
        />

        {/* 4 Specialized Workspace Zones */}
        <WorkspaceZones />

        {/* Smart Meeting Room IoT Telemetry HUD */}
        <MeetingRoomHUD
          onOpenBookingNotice={(roomName) =>
            handleOpenConsultationWithNote(`[스마트 회의실 예약 문의]: ${roomName}`)
          }
        />

        {/* Acoustic Materials Specification Archive */}
        <AcousticMaterials onSelectMaterial={(mat) => setSelectedMaterial(mat)} />

        {/* Architectural Ethos & Workspace Philosophy */}
        <WorkPhilosophy />
      </main>

      {/* 3. Footer */}
      <Footer
        onOpenConsultation={() => {
          setConsultationNote('');
          setConsultationOpen(true);
        }}
      />

      {/* Modals */}
      <MaterialModal
        material={selectedMaterial}
        onClose={() => setSelectedMaterial(null)}
      />

      <ConsultationModal
        isOpen={consultationOpen}
        initialNote={consultationNote}
        onClose={() => setConsultationOpen(false)}
      />
    </div>
  );
};

export default NexusWorkApp;
