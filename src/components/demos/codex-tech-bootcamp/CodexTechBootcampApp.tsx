'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InteractiveDevTerminal } from './components/InteractiveDevTerminal';
import { ProjectShowcaseSection } from './components/ProjectShowcaseSection';
import { CurriculumSection } from './components/CurriculumSection';
import { ApplicationModal } from './components/ApplicationModal';
import { Footer } from './components/Footer';

interface CodexTechBootcampAppProps {
  isEmbed?: boolean;
}

export function CodexTechBootcampApp({ isEmbed = false }: CodexTechBootcampAppProps) {
  const [applyOpen, setApplyOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>();

  const handleOpenApply = (courseTitle?: string) => {
    setSelectedCourse(courseTitle);
    setApplyOpen(true);
  };

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-zinc-100 font-sans antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
      <Header
        onOpenApply={() => handleOpenApply()}
        onScrollTo={handleScrollTo}
      />

      <main>
        <HeroSection
          onOpenApply={() => handleOpenApply()}
          onScrollToTerminal={() => handleScrollTo('terminal-sandbox')}
        />

        <InteractiveDevTerminal />

        <ProjectShowcaseSection />

        <CurriculumSection onOpenApply={handleOpenApply} />
      </main>

      <Footer />

      <ApplicationModal
        isOpen={applyOpen}
        onClose={() => setApplyOpen(false)}
        defaultCourse={selectedCourse}
      />
    </div>
  );
}
