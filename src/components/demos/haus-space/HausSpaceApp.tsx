'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { TransformationSection } from './components/TransformationSection';
import { SelectedWorksSection } from './components/SelectedWorksSection';
import { ProcessSection } from './components/ProcessSection';
import { MaterialArchiveSection } from './components/MaterialArchiveSection';
import { ConsultationSection } from './components/ConsultationSection';
import { PressSection } from './components/PressSection';
import { Footer } from './components/Footer';
import { ProjectDossierModal } from './components/ProjectDossierModal';
import { VRViewerModal } from './components/VRViewerModal';
import { ProjectItem } from './types';

interface HausSpaceAppProps {
  isEmbed?: boolean;
}

export default function HausSpaceApp({ isEmbed = false }: HausSpaceAppProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isVROpen, setIsVROpen] = useState<boolean>(false);
  const [consultProjectTitle, setConsultProjectTitle] = useState<string>('');

  const scrollToConsultation = (projectTitle?: string) => {
    if (projectTitle) {
      setConsultProjectTitle(projectTitle);
    }
    const elem = document.getElementById('consultation');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSelectedWorks = () => {
    const elem = document.getElementById('selected-works');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMaterialArchive = () => {
    const elem = document.getElementById('material-archive');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#121315] text-[#e3e2e5] font-sans antialiased selection:bg-[#c5a880] selection:text-[#121315]">
      {/* 🌟 Taemun Dev Studio Top Floating Demo Bar */}
      {!isEmbed && (
        <aside
          aria-label="데모 안내 바"
          className="sticky top-0 z-[60] bg-zinc-950/95 backdrop-blur-md text-white border-b border-zinc-800 text-xs py-2 px-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Link
              href="/#category-interior"
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>포트폴리오 목록</span>
            </Link>
            <span className="text-zinc-600">|</span>
            <span className="flex items-center gap-1.5 font-medium text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-semibold text-white">HAUS &amp; SPACE</span> 한남 더 힐 펜트하우스 라이브 데모
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden lg:inline text-zinc-400">
              태문 DEV STUDIO 하이엔드 인테리어 아키텍처 레퍼런스
            </span>
            <Link
              href="/inquiry?from=haus-space"
              className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-3 py-1 rounded text-xs transition-colors flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              <span>이런 사이트 제작 문의</span>
            </Link>
          </div>
        </aside>
      )}

      {/* Sticky Monograph Header */}
      <Header onOpenConsultation={() => scrollToConsultation()} />

      {/* Main Content Sections */}
      <main>
        {/* Issue No. 28 Hero Monograph */}
        <HeroSection
          onExploreArchival={scrollToSelectedWorks}
          onExploreMaterial={scrollToMaterialArchive}
        />

        {/* Archival Spotlight 2025: Hannam The Hill Before & After */}
        <TransformationSection
          onConsultProject={(title) => scrollToConsultation(title)}
          onOpenVRModal={() => setIsVROpen(true)}
        />

        {/* Curated Portfolio Archive: Selected Works */}
        <SelectedWorksSection
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Bespoke Construction Protocol: 4-Step Atelier Process */}
        <ProcessSection />

        {/* Tactile Patina & Provenance: Material Archive */}
        <MaterialArchiveSection />

        {/* Private Bureau: By Appointment Only Consultation */}
        <ConsultationSection
          key={consultProjectTitle}
          initialProjectType={
            consultProjectTitle
              ? `프로젝트 문의: ${consultProjectTitle}`
              : '하이엔드 주거 (아파트/펜트하우스)'
          }
          initialMessage={
            consultProjectTitle
              ? `[${consultProjectTitle}] 프로젝트와 유사한 무드의 설계 및 맞춤 자재 시공 컨설팅을 희망합니다.`
              : ''
          }
        />

        {/* Press & Curatorial Accolades */}
        <PressSection />
      </main>

      {/* Architectural Dossier Modal */}
      <ProjectDossierModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={(title) => scrollToConsultation(title)}
      />

      {/* 360 VR Virtual Spatial Simulation */}
      <VRViewerModal isOpen={isVROpen} onClose={() => setIsVROpen(false)} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
