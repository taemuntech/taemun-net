'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProcessTimelapseSlider from './components/ProcessTimelapseSlider';
import RuggedSiteHUD from './components/RuggedSiteHUD';
import LandmarkShowcase from './components/LandmarkShowcase';
import MaterialArchive from './components/MaterialArchive';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';

export function StrataBuildApp({ isEmbed }: { isEmbed?: boolean } = {}) {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [activeSection] = useState('timelapse');

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
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* 고정 헤더 */}
      <Header
        onOpenConsultation={() => setIsConsultationOpen(true)}
        activeSection={activeSection}
      />

      {/* 히어로 섹션 */}
      <Hero
        onScrollToTimelapse={() => scrollToSection('timelapse')}
        onScrollToHUD={() => scrollToSection('hud')}
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* 4단계 공정 타임랩스 시뮬레이터 */}
      <ProcessTimelapseSlider />

      {/* 러기드 현장 감리 패드 텔레메트리 HUD */}
      <RuggedSiteHUD />

      {/* 메가 랜드마크 실적 쇼케이스 */}
      <LandmarkShowcase />

      {/* 초고성능 구조재 아카이브 */}
      <MaterialArchive />

      {/* 푸터 */}
      <Footer />

      {/* 도급 견적 및 현장 감리 신청 모달 */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}

export default StrataBuildApp;
