'use client';

import React, { useCallback, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { VillaExplorer } from './components/VillaExplorer';
import { StayCalculator } from './components/StayCalculator';
import { ArtisanalExperience } from './components/ArtisanalExperience';
import { ConciergeGate } from './components/ConciergeGate';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { DESTINATIONS, VILLAS, ADDONS } from './data/resorts';
import type {
  Currency,
  Destination,
  ExperiencePillarId,
  NavTarget,
  Villa,
  VillaFilter,
} from './types';

interface AtlasResortAppProps {
  isEmbed?: boolean;
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  // 구역마다 scroll-mt 를 줘서 고정 헤더·샘플 바에 가리지 않게 했다
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function AtlasResortApp({ isEmbed = false }: AtlasResortAppProps) {
  // Stay calculator state
  const [selectedDestination, setSelectedDestination] = useState<Destination>(DESTINATIONS[0]);
  const [selectedVilla, setSelectedVilla] = useState<Villa>(VILLAS[0]);
  const [nights, setNights] = useState<number>(3);
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>([
    'addon-yacht',
    'addon-dinner',
  ]);

  // 화면 전체가 공유하는 상태 — 헤더 메뉴가 이 값들을 바꿔야 메뉴가 「실제로 무언가 하는」 메뉴가 된다
  const [currency, setCurrency] = useState<Currency>('KRW');
  const [villaFilter, setVillaFilter] = useState<VillaFilter>('all');
  /** 푸터 컨시어지 항목이 채워 넣는 요청 사항 — 세 링크가 모두 같은 구역으로만 가던 자리 */
  const [conciergePrefill, setConciergePrefill] = useState<string | null>(null);
  const [activePillarId, setActivePillarId] = useState<ExperiencePillarId>('gastro');
  const [activeNav, setActiveNav] = useState<NavTarget>('collection');

  // Booking modal state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);

  // Toggle addons
  const handleToggleAddon = (addonId: string) => {
    setSelectedAddonIds((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  // When clicking "스위트 셀렉트" from the Villa Explorer
  const handleSelectVillaFromExplorer = (villa: Villa) => {
    setSelectedVilla(villa);
    const regionByType: Record<Villa['type'], string> = {
      cliff: 'namhae',
      presidential: 'jeju',
      forest: 'bali',
    };
    const destination = DESTINATIONS.find((d) => d.id === regionByType[villa.type]);
    if (destination) setSelectedDestination(destination);
    scrollToSection('calculator');
  };

  // 헤더 메뉴 — 이동만 하지 않고 그 항목이 가리키는 필터·탭까지 맞춘다
  const handleNavigate = useCallback((target: NavTarget) => {
    setActiveNav(target);
    switch (target) {
      case 'collection':
        setVillaFilter('all');
        scrollToSection('collection');
        break;
      case 'estates':
        setVillaFilter('presidential');
        scrollToSection('collection');
        break;
      case 'gastronomy':
        setActivePillarId('gastro');
        scrollToSection('wellness');
        break;
      case 'wellness':
        setActivePillarId('wellness');
        scrollToSection('wellness');
        break;
      case 'journeys':
        setActivePillarId('journeys');
        scrollToSection('wellness');
        break;
    }
  }, []);

  // Grand Total calculation for modal preview
  const addonsTotal = ADDONS.filter((addon) => selectedAddonIds.includes(addon.id)).reduce(
    (sum, addon) => sum + addon.price,
    0
  );
  const stayCost = Math.round(selectedVilla.pricePerNight * nights * selectedDestination.multiplier);
  const totalEstimate = stayCost + addonsTotal;

  // 한글 제목이 낱말 한가운데서 쪼개지던 자리(「차세/대」·「패키/징」) — 이 데모 안의 제목에 keep-all 을 한 번에 건다
  return (
    <div className="min-h-screen bg-[#fcf9f3] text-[#1c1c18] flex flex-col selection:bg-[#725b38]/20 selection:text-[#030402] font-sans [&_h1]:break-keep [&_h2]:break-keep [&_h3]:break-keep">
      {/* 🌟 Taemun Dev Studio Top Floating Demo Bar */}
      {!isEmbed && (
        <aside
          aria-label="데모 안내 바"
          className="sticky top-[var(--sample-bar-h,0px)] z-[60] bg-zinc-950/95 backdrop-blur-md text-white border-b border-zinc-800 text-xs py-2 px-4 flex items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Link
              href="/#category-corporate"
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white font-medium transition-colors whitespace-nowrap"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>갤러리 아카이브로 돌아가기</span>
            </Link>
            <span className="text-zinc-600 hidden lg:inline">|</span>
            <span className="text-zinc-400 hidden lg:inline font-mono truncate">
              [07] 아틀라스 리조트 (ATLAS RESORTS) — 럭셔리 부티크 호스피탈리티 &amp; 프라이빗 빌라
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/inquiry?from=atlas-resort"
              className="px-3 py-1 rounded bg-[#725b38] hover:bg-[#856b43] text-white font-bold text-[11px] transition-all flex items-center gap-1 shadow-sm whitespace-nowrap"
            >
              <span>이 프로젝트 견적 문의</span>
              <Send className="w-3 h-3" />
            </Link>
          </div>
        </aside>
      )}

      {/* Editorial Navigation Bar */}
      <Header
        onOpenBooking={() => setIsBookingModalOpen(true)}
        currency={currency}
        onToggleCurrency={() => setCurrency((prev) => (prev === 'KRW' ? 'USD' : 'KRW'))}
        onNavigate={handleNavigate}
        activeNav={activeNav}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Cinematic Hero */}
        <Hero
          onGoToCollection={() => handleNavigate('collection')}
          onGoToCalculator={() => scrollToSection('calculator')}
        />

        {/* 2. Interactive Villa Suite Explorer */}
        <VillaExplorer
          onSelectVillaForStay={handleSelectVillaFromExplorer}
          activeFilter={villaFilter}
          onFilterChange={setVillaFilter}
          currency={currency}
        />

        {/* 3. Bespoke Stay & Experience Calculator */}
        <StayCalculator
          selectedDestination={selectedDestination}
          onSelectDestination={setSelectedDestination}
          selectedVilla={selectedVilla}
          onSelectVilla={setSelectedVilla}
          nights={nights}
          onNightsChange={setNights}
          selectedAddons={selectedAddonIds}
          onToggleAddon={handleToggleAddon}
          onOpenBooking={() => setIsBookingModalOpen(true)}
          currency={currency}
        />

        {/* 4. Gastronomy & Spa Sanctuary Showcase */}
        <ArtisanalExperience activePillarId={activePillarId} onSelectPillar={setActivePillarId} />

        {/* 5. Discreet Concierge & VIP Private Charter Gate */}
        <ConciergeGate
          selectedDestinationId={selectedDestination.id}
          prefillRequest={conciergePrefill}
        />
      </main>

      {/* 6. Monumental Editorial Footer */}
      <Footer
        onNavigateToSection={scrollToSection}
        onSelectHub={(villaType) => {
          setVillaFilter(villaType);
          scrollToSection('collection');
        }}
        onConciergeTopic={(topic) => {
          setConciergePrefill(topic);
          scrollToSection('concierge');
        }}
      />

      {/* 7. Reservation Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedDestination={selectedDestination}
        selectedVilla={selectedVilla}
        nights={nights}
        totalEstimate={totalEstimate}
        currency={currency}
      />
    </div>
  );
}
