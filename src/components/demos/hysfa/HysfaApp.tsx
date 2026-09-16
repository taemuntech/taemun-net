"use client";

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Divisions } from './components/Divisions';
import { PhilosophyRnd } from './components/PhilosophyRnd';
import { QualityCertifications } from './components/QualityCertifications';
import { CareersWelfare } from './components/CareersWelfare';
import { ConsultationForm } from './components/ConsultationForm';
import { Footer } from './components/Footer';
import { BrochureModal } from './components/BrochureModal';
import { DetailModal } from './components/DetailModal';
import { ArrowUp, PhoneCall, FileDown } from 'lucide-react';

interface HysfaAppProps {
  isEmbed?: boolean;
}

export function HysfaApp({ isEmbed = false }: HysfaAppProps) {
  const [currentLang, setCurrentLang] = useState<'KR' | 'EN'>('KR');
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut to close modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsBrochureOpen(false);
        setSelectedDivision(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleLang = () => {
    setCurrentLang((prev) => (prev === 'KR' ? 'EN' : 'KR'));
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-sans selection:bg-[#0052cc] selection:text-white">
      {/* Top Header Navigation */}
      <Header
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
        onOpenConsultation={() => scrollToSection('consultation')}
      />

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <Hero
          currentLang={currentLang}
          onOpenBrochure={() => setIsBrochureOpen(true)}
        />

        {/* Core Divisions Showcase */}
        <Divisions
          currentLang={currentLang}
          onSelectDivision={(id) => setSelectedDivision(id)}
        />

        {/* Corporate Philosophy & R&D Tectonics */}
        <PhilosophyRnd
          currentLang={currentLang}
          onOpenConsultation={() => scrollToSection('consultation')}
        />

        {/* Quality Management & Certifications */}
        <QualityCertifications currentLang={currentLang} />

        {/* Careers & Talent Management */}
        <CareersWelfare currentLang={currentLang} />

        {/* Quotation & Engineering Meeting Form */}
        <ConsultationForm currentLang={currentLang} />
      </main>

      {/* Footer */}
      <Footer currentLang={currentLang} />

      {/* Floating Speed Actions (Scroll-to-top & Quick brochure trigger) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5">
        {showScrollTop && (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Scroll to top"
            className="w-11 h-11 rounded-full bg-white text-[#131b2e] border border-[#c3c6d6]/60 shadow-lg flex items-center justify-center hover:bg-[#eaedff] hover:text-[#003d9b] transition-all cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        <button
          type="button"
          onClick={() => setIsBrochureOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0052cc] text-white shadow-xl hover:bg-[#003d9b] transition-all text-[13px] font-semibold cursor-pointer border border-white/20"
        >
          <FileDown className="w-4 h-4" />
          <span className="hidden lg:inline">
            {currentLang === 'KR' ? '브로슈어 다운로드' : 'Brochure'}
          </span>
        </button>
      </div>

      {/* Brochure Modal */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
        currentLang={currentLang}
      />

      {/* Division Detail Modal */}
      <DetailModal
        divisionId={selectedDivision}
        onClose={() => setSelectedDivision(null)}
        currentLang={currentLang}
        onNavigateToQuote={() => scrollToSection('consultation')}
      />
    </div>
  );
}

export default HysfaApp;
