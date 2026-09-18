'use client';
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { InteractiveZoning } from './components/InteractiveZoning';
import { MaterialArchive } from './components/MaterialArchive';
import { ProjectCaseStudies } from './components/ProjectCaseStudies';
import { SpaceEstimator } from './components/SpaceEstimator';
import { Footer } from './components/Footer';
import { MaterialModal } from './components/MaterialModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ConsultationModal } from './components/ConsultationModal';
import { MaterialItem, ProjectCase } from './types';

export const SeongsuShowroomApp: React.FC = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectCase | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);
  const [consultationNote, setConsultationNote] = useState<string>('');

  const scrollToElement = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleOpenConsultationWithNote = (note: string) => {
    setConsultationNote(note);
    setIsConsultationOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0d0e11] text-stone-100 font-sans selection:bg-amber-500 selection:text-stone-950">
      {/* Top Sticky Header */}
      <Header
        onNavigate={scrollToElement}
        onOpenConsultation={() => {
          setConsultationNote('');
          setIsConsultationOpen(true);
        }}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero
          onExploreZoning={() => scrollToElement('zoning')}
          onOpenEstimator={() => scrollToElement('estimator')}
        />

        {/* Spatial Architecture Philosophy */}
        <Philosophy onExploreDetail={scrollToElement} />

        {/* Interactive 3-Floor Zoning Experience */}
        <InteractiveZoning />

        {/* Tactile Material Spec Archive */}
        <MaterialArchive onSelectMaterial={(mat) => setSelectedMaterial(mat)} />

        {/* Commercial Project Case Studies */}
        <ProjectCaseStudies onSelectProject={(p) => setSelectedProject(p)} />

        {/* Space Estimator Simulation Tool */}
        <SpaceEstimator
          onRequestConsultationWithEstimate={(summary) =>
            handleOpenConsultationWithNote(summary)
          }
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenConsultation={() => {
          setConsultationNote('');
          setIsConsultationOpen(true);
        }}
      />

      {/* Modals */}
      <MaterialModal
        material={selectedMaterial}
        onClose={() => setSelectedMaterial(null)}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onConsult={(projectTitle) =>
          handleOpenConsultationWithNote(`[희망 프로젝트 스타일]: ${projectTitle}`)
        }
      />

      <ConsultationModal
        isOpen={isConsultationOpen}
        initialNote={consultationNote}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
};
