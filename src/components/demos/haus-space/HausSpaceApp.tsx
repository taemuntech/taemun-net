'use client';

import React, { useState } from 'react';
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
import { ConsultationPrefill, ProjectItem } from './types';

export default function HausSpaceApp() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isVROpen, setIsVROpen] = useState<boolean>(false);
  const [consultPrefill, setConsultPrefill] = useState<ConsultationPrefill | null>(null);

  // 모달을 닫으면서 이동하는 경로가 있다. 모달은 열려 있는 동안 body 스크롤을 잠그는데,
  // 그 잠금이 풀리는 건 React 가 화면을 갱신한 뒤라 같은 호출 안에서 바로 스크롤하면 먹지 않는다
  // → 다음 프레임으로 한 박자 미룬다.
  const scrollToSection = (id: string) => {
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    });
  };

  // 고른 프로젝트는 **요청 사항 칸에만** 싣는다. 「프로젝트 유형」 select 에 넣으면 option 에 없는 값이라
  // 필수 항목이 빈 칸으로 보인다. nonce 로 같은 프로젝트를 다시 눌러도 다시 적용되게 한다.
  const scrollToConsultation = (projectTitle?: string) => {
    if (projectTitle) {
      setConsultPrefill({
        nonce: Date.now(),
        message: `[${projectTitle}] 프로젝트와 유사한 무드의 설계 및 맞춤 자재 시공 컨설팅을 희망합니다.`,
      });
    }
    scrollToSection('consultation');
  };

  const scrollToSelectedWorks = () => scrollToSection('selected-works');

  const scrollToMaterialArchive = () => scrollToSection('material-archive');

  return (
    <div className="min-h-screen bg-[#121315] text-[#e3e2e5] font-sans antialiased selection:bg-[#c5a880] selection:text-[#121315]">
      {/* Sticky Monograph Header */}
      <Header onOpenConsultation={() => scrollToConsultation()} />

      {/* Main Content Sections */}
      <main>
        {/* Issue No. 28 Hero Monograph */}
        <HeroSection
          onExploreArchival={scrollToSelectedWorks}
          onExploreMaterial={scrollToMaterialArchive}
        />

        {/* Archival Spotlight 2025: 도심 펜트하우스(예시) 시공 전후 비교 */}
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
        <ConsultationSection prefill={consultPrefill} />

        {/* Press & Curatorial Accolades */}
        <PressSection />
      </main>

      {/* Architectural Dossier Modal */}
      <ProjectDossierModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={(title) => scrollToConsultation(title)}
      />

      {/* 와이드 장면 뷰어 (좌우 패닝) */}
      <VRViewerModal isOpen={isVROpen} onClose={() => setIsVROpen(false)} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
