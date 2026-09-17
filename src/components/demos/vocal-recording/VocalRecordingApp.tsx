'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { DawMixerSection } from './components/DawMixerSection';
import { VocalRangeSection } from './components/VocalRangeSection';
import { AuditionTracksSection } from './components/AuditionTracksSection';
import { CurriculumSection } from './components/CurriculumSection';
import { StudioGearSection } from './components/StudioGearSection';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';

interface VocalRecordingAppProps {
  isEmbed?: boolean;
}

export function VocalRecordingApp({ isEmbed = false }: VocalRecordingAppProps) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>();

  const handleOpenBooking = (courseTitle?: string) => {
    setSelectedCourse(courseTitle);
    setBookingOpen(true);
  };

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C10] text-zinc-100 font-sans antialiased selection:bg-pink-500/30 selection:text-pink-300">
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onScrollToSection={handleScrollTo}
      />

      <main>
        <HeroSection
          onOpenBooking={() => handleOpenBooking()}
          onScrollToMixer={() => handleScrollTo('daw-mixer')}
        />

        <DawMixerSection />

        <VocalRangeSection />

        <AuditionTracksSection />

        <CurriculumSection onOpenBooking={handleOpenBooking} />

        <StudioGearSection />
      </main>

      <Footer />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        defaultCourse={selectedCourse}
      />
    </div>
  );
}
