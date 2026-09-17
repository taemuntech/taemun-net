'use client';

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BuildingShowcase from './components/BuildingShowcase';
import YieldCalculator from './components/YieldCalculator';
import StrategySection from './components/StrategySection';
import OneStopProcess from './components/OneStopProcess';
import Footer from './components/Footer';
import ConsultationModal from './components/ConsultationModal';

export function LumenBuildApp({ isEmbed }: { isEmbed?: boolean } = {}) {
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
    <div className="min-h-screen bg-neutral-950 font-sans text-neutral-100 antialiased selection:bg-amber-500 selection:text-neutral-950">
      {/* 헤더 */}
      <Header onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* 히어로 */}
      <main>
        <Hero
          onScrollToShowcase={() => scrollToSection('showcase')}
          onScrollToCalculator={() => scrollToSection('calculator')}
          onOpenConsultation={() => setIsConsultationOpen(true)}
        />

        {/* 완공 꼬마빌딩 갤러리 */}
        <BuildingShowcase />

        {/* 신축 사업성 계산기 */}
        <YieldCalculator onOpenConsultation={() => setIsConsultationOpen(true)} />

        {/* 임대 수익 극대화 전략 */}
        <StrategySection />

        {/* 원스톱 5단계 신축 로드맵 */}
        <OneStopProcess />
      </main>

      {/* 푸터 */}
      <Footer />

      {/* 무료 사업성 검토 모달 */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </div>
  );
}

export default LumenBuildApp;
