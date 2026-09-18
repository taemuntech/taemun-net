'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LexileLibrarySection } from './components/LexileLibrarySection';
import { SpeakingLabSection } from './components/SpeakingLabSection';
import { CurriculumSection } from './components/CurriculumSection';
import { FacultySection } from './components/FacultySection';
import { LevelTestModal } from './components/LevelTestModal';
import { Footer } from './components/Footer';

interface VeritasJuniorEnglishAppProps {
  isEmbed?: boolean;
}

export function VeritasJuniorEnglishApp({ isEmbed = false }: VeritasJuniorEnglishAppProps) {
  const [levelTestOpen, setLevelTestOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>();

  const handleOpenLevelTest = (courseTitle?: string) => {
    setSelectedCourse(courseTitle);
    setLevelTestOpen(true);
  };

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-blue-600/20 selection:text-blue-900">
      <Header
        onOpenLevelTest={() => handleOpenLevelTest()}
        onScrollTo={handleScrollTo}
      />

      <main>
        <HeroSection
          onOpenLevelTest={() => handleOpenLevelTest()}
          onScrollToLibrary={() => handleScrollTo('lexile-library')}
        />

        <LexileLibrarySection />

        <SpeakingLabSection />

        <CurriculumSection onOpenLevelTest={handleOpenLevelTest} />

        <FacultySection />
      </main>

      <Footer />

      <LevelTestModal
        isOpen={levelTestOpen}
        onClose={() => setLevelTestOpen(false)}
        defaultCourse={selectedCourse}
      />
    </div>
  );
}
