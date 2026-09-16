'use client';

import React, { useState } from 'react';
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
import { Destination, Villa } from './types';

interface AtlasResortAppProps {
  isEmbed?: boolean;
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
    if (villa.type === 'cliff') {
      const namhae = DESTINATIONS.find((d) => d.id === 'namhae');
      if (namhae) setSelectedDestination(namhae);
    } else if (villa.type === 'presidential') {
      const jeju = DESTINATIONS.find((d) => d.id === 'jeju');
      if (jeju) setSelectedDestination(jeju);
    } else if (villa.type === 'forest') {
      const bali = DESTINATIONS.find((d) => d.id === 'bali');
      if (bali) setSelectedDestination(bali);
    }

    const calcEl = document.getElementById('calculator');
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Grand Total calculation for modal preview
  const addonsTotal = ADDONS.filter((addon) => selectedAddonIds.includes(addon.id)).reduce(
    (sum, addon) => sum + addon.price,
    0
  );
  const stayCost = Math.round(selectedVilla.pricePerNight * nights * selectedDestination.multiplier);
  const totalEstimate = stayCost + addonsTotal;

  return (
    <div className="min-h-screen bg-[#fcf9f3] text-[#1c1c18] flex flex-col selection:bg-[#725b38]/20 selection:text-[#030402] font-sans">
      {/* 🌟 Taemun Dev Studio Top Floating Demo Bar */}
      {!isEmbed && (
        <aside
          aria-label="데모 안내 바"
          className="sticky top-0 z-[60] bg-zinc-950/95 backdrop-blur-md text-white border-b border-zinc-800 text-xs py-2 px-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Link
              href="/#category-corporate"
              className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-white font-medium transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>갤러리 아카이브로 돌아가기</span>
            </Link>
            <span className="text-zinc-600 hidden lg:inline">|</span>
            <span className="text-zinc-400 hidden lg:inline font-mono">
              [07] 아틀라스 리조트 (ATLAS RESORTS) — 럭셔리 부티크 호스피탈리티 &amp; 프라이빗 빌라
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/inquiry?from=atlas-resort"
              className="px-3 py-1 rounded bg-[#725b38] hover:bg-[#856b43] text-white font-bold text-[11px] transition-all flex items-center gap-1 shadow-sm"
            >
              <span>이 프로젝트 견적 문의</span>
              <Send className="w-3 h-3" />
            </Link>
          </div>
        </aside>
      )}

      {/* Editorial Navigation Bar */}
      <Header onOpenBooking={() => setIsBookingModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Cinematic Hero */}
        <Hero />

        {/* 2. Interactive Villa Suite Explorer */}
        <VillaExplorer onSelectVillaForStay={handleSelectVillaFromExplorer} />

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
        />

        {/* 4. Michelin Gastronomy & Spa Sanctuary Showcase */}
        <ArtisanalExperience />

        {/* 5. Discreet Concierge & VIP Private Charter Gate */}
        <ConciergeGate
          defaultDestination={`${selectedDestination.nameKo} (${selectedDestination.name})`}
        />
      </main>

      {/* 6. Monumental Editorial Footer */}
      <Footer />

      {/* 7. Reservation Modal */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        selectedDestination={selectedDestination}
        selectedVilla={selectedVilla}
        nights={nights}
        totalEstimate={totalEstimate}
      />
    </div>
  );
}
