'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InteractiveRobotDisassembly } from './components/InteractiveRobotDisassembly';
import { StemProjectsSection } from './components/StemProjectsSection';
import { CurriculumSection } from './components/CurriculumSection';
import { TrialClassModal } from './components/TrialClassModal';
import { Footer } from './components/Footer';

interface RobotStemAppProps {
  isEmbed?: boolean;
}

export function RobotStemApp({ isEmbed = false }: RobotStemAppProps) {
  const [trialOpen, setTrialOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>();

  const handleOpenTrial = (courseTitle?: string) => {
    setSelectedCourse(courseTitle);
    setTrialOpen(true);
  };

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-zinc-100 font-sans antialiased selection:bg-orange-500/30 selection:text-orange-200">
      <Header
        onOpenTrial={() => handleOpenTrial()}
        onScrollTo={handleScrollTo}
      />

      <main>
        <HeroSection
          onOpenTrial={() => handleOpenTrial()}
          onScrollToLab={() => handleScrollTo('robot-lab')}
        />

        <InteractiveRobotDisassembly />

        <StemProjectsSection />

        <CurriculumSection onOpenTrial={handleOpenTrial} />
      </main>

      <Footer />

      <TrialClassModal
        isOpen={trialOpen}
        onClose={() => setTrialOpen(false)}
        defaultCourse={selectedCourse}
      />
    </div>
  );
}
