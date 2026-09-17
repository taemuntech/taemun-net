'use client';

import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { InteractiveGeometryLab } from './components/InteractiveGeometryLab';
import { ProblemAnalysisSection } from './components/ProblemAnalysisSection';
import { CurriculumSection } from './components/CurriculumSection';
import { DiagnosticModal } from './components/DiagnosticModal';
import { Footer } from './components/Footer';

interface EulerMathAppProps {
  isEmbed?: boolean;
}

export function EulerMathApp({ isEmbed = false }: EulerMathAppProps) {
  const [diagnosticOpen, setDiagnosticOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>();

  const handleOpenDiagnostic = (courseTitle?: string) => {
    setSelectedCourse(courseTitle);
    setDiagnosticOpen(true);
  };

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0D14] text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      <Header
        onOpenDiagnostic={() => handleOpenDiagnostic()}
        onScrollTo={handleScrollTo}
      />

      <main>
        <HeroSection
          onOpenDiagnostic={() => handleOpenDiagnostic()}
          onScrollToLab={() => handleScrollTo('geometry-lab')}
        />

        <InteractiveGeometryLab />

        <ProblemAnalysisSection />

        <CurriculumSection onOpenDiagnostic={handleOpenDiagnostic} />
      </main>

      <Footer />

      <DiagnosticModal
        isOpen={diagnosticOpen}
        onClose={() => setDiagnosticOpen(false)}
        defaultCourse={selectedCourse}
      />
    </div>
  );
}
