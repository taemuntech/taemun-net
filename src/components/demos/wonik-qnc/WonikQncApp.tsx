"use client";

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MediaShowcaseSection } from './components/MediaShowcaseSection';
import { BusinessDivisionsSection } from './components/BusinessDivisionsSection';
import { EsgSection } from './components/EsgSection';
import { IrStockSection } from './components/IrStockSection';
import { NewsRecruitSection } from './components/NewsRecruitSection';
import { Footer } from './components/Footer';

import { VideoModal } from './components/VideoModal';
import { PartnerProposalModal } from './components/PartnerProposalModal';
import { VisitReservationModal } from './components/VisitReservationModal';
import { BrochureModal } from './components/BrochureModal';
import { DivisionDetailModal } from './components/DivisionDetailModal';
import { IrDetailModal } from './components/IrDetailModal';
import { RecruitPortalModal } from './components/RecruitPortalModal';

import { VIDEOS, INITIAL_STOCK } from './data';
import { VideoItem, BusinessDivision, IrHubItem } from './types';

interface WonikQncAppProps {
  isEmbed?: boolean;
}

export function WonikQncApp({ isEmbed = false }: WonikQncAppProps) {
  // Modal states
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [proposalModalOpen, setProposalModalOpen] = useState(false);
  const [visitModalOpen, setVisitModalOpen] = useState(false);
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<BusinessDivision | null>(null);
  const [selectedIrItem, setSelectedIrItem] = useState<IrHubItem | null>(null);
  const [stockDetailOpen, setStockDetailOpen] = useState(false);
  const [recruitModalOpen, setRecruitModalOpen] = useState(false);

  // Active section tracker for header highlights
  const [activeSection, setActiveSection] = useState('business');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['company', 'business', 'media', 'esg', 'ir', 'recruit'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8ff] text-[#131b2e] font-sans antialiased selection:bg-[#c6e7ff] selection:text-[#003d9b]">
      {/* Primary Sticky Header */}
      <Header
        onOpenProposal={() => setProposalModalOpen(true)}
        onOpenVisit={() => setVisitModalOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Banner with Corporate Statement & 40th Video Trigger */}
        <HeroSection
          onPlayAnniversaryVideo={() => setActiveVideo(VIDEOS[0])}
          onOpenBrochure={() => setBrochureModalOpen(true)}
        />

        {/* Core Business Divisions (Quartz, Ceramics, Cleaning, Optics) */}
        <BusinessDivisionsSection
          onSelectDivision={(division) => setSelectedDivision(division)}
        />

        {/* Media Room & PR Video Showcase Theater */}
        <MediaShowcaseSection
          onSelectVideo={(video) => setActiveVideo(video)}
        />

        {/* ESG Sustainability Framework (With, Worth, Will, Wave) */}
        <EsgSection />

        {/* Real-time Stock Information & IR Center */}
        <IrStockSection
          onSelectIrItem={(item) => setSelectedIrItem(item)}
          onOpenStockDetail={() => setStockDetailOpen(true)}
        />

        {/* News Center & Talent / Careers Hub */}
        <NewsRecruitSection
          onOpenCareers={() => setRecruitModalOpen(true)}
        />
      </main>

      {/* Corporate Footer */}
      <Footer />

      {/* Modals & Dialogs */}
      <VideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />

      <PartnerProposalModal
        isOpen={proposalModalOpen}
        onClose={() => setProposalModalOpen(false)}
      />

      <VisitReservationModal
        isOpen={visitModalOpen}
        onClose={() => setVisitModalOpen(false)}
      />

      <BrochureModal
        isOpen={brochureModalOpen}
        onClose={() => setBrochureModalOpen(false)}
      />

      <DivisionDetailModal
        division={selectedDivision}
        onClose={() => setSelectedDivision(null)}
        onInquire={(divTitle) => {
          setSelectedDivision(null);
          setProposalModalOpen(true);
        }}
      />

      <IrDetailModal
        item={selectedIrItem}
        stock={INITIAL_STOCK}
        isStockDetailMode={stockDetailOpen}
        onClose={() => {
          setSelectedIrItem(null);
          setStockDetailOpen(false);
        }}
      />

      <RecruitPortalModal
        isOpen={recruitModalOpen}
        onClose={() => setRecruitModalOpen(false)}
      />
    </div>
  );
}

export default WonikQncApp;
