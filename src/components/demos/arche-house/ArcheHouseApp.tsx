'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectGallery from './components/ProjectGallery';
import PhilosophySection from './components/PhilosophySection';
import CostEstimator from './components/CostEstimator';
import ProcessRoadmap from './components/ProcessRoadmap';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';

export function ArcheHouseApp({ isEmbed }: { isEmbed?: boolean } = {}) {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 antialiased selection:bg-amber-800 selection:text-white">
      {/* 헤더 */}
      <Header onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* 히어로 */}
      <main>
        <Hero
          onScrollToProjects={() => scrollToSection('projects')}
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* 완공 프로젝트 갤러리 */}
        <ProjectGallery />

        {/* 건축 철학 & 스튜디오 */}
        <PhilosophySection />

        {/* 예상 건축비 가이드 */}
        <CostEstimator onOpenConsultation={() => setIsConsultationOpen(true)} />

        {/* 4단계 프로세스 로드맵 */}
        <ProcessRoadmap />
      </main>

      {/* 푸터 */}
      <Footer />

      {/* 1:1 상담 모달 */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}

export default ArcheHouseApp;
