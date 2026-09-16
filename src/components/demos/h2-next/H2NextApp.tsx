'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PillarsSection } from './components/PillarsSection';
import { HubsTelemetrySection } from './components/HubsTelemetrySection';
import { CalculatorSection } from './components/CalculatorSection';
import { GovernanceSection } from './components/GovernanceSection';
import { ConsultationSection } from './components/ConsultationSection';
import { Footer } from './components/Footer';
import { VideoModal } from './components/VideoModal';
import { Toast, ToastData } from './components/Toast';

interface H2NextAppProps {
  isEmbed?: boolean;
}

export default function H2NextApp({ isEmbed = false }: H2NextAppProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [currentToast, setCurrentToast] = useState<ToastData | null>(null);

  const showToast = (title: string, message: string, type: 'success' | 'download' | 'info' = 'success') => {
    setCurrentToast({
      id: Date.now().toString(),
      title,
      message,
      type,
    });
  };

  // 제안서·보고서 내려받기와 제휴 문의는 각 구역이 SampleNotice 를 직접 연다(가짜 접수·가짜 다운로드 금지).
  // 아래 토스트는 「자료를 보내 준다」는 약속이 아니라 샘플이라는 안내만 한다.
  const handlePillarAction = (actionText: string) => {
    if (actionText.includes('도면') || actionText.includes('스펙')) {
      showToast(
        '샘플 사이트 안내',
        '태문 DEV STUDIO 가 만든 가상 브랜드 샘플이라 실제 기술 자료는 없습니다. 자료 신청 화면이 필요하면 그대로 만들어 드립니다.',
        'info'
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans selection:bg-[#00685f]/20 selection:text-[#00685f]">
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
              [02] 하이드로젠 넥스트 (H2 NEXT) — 차세대 신재생에너지 & 그린수소 엔터프라이즈
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/inquiry?from=h2-next"
              className="px-3 py-1 rounded bg-[#00685f] hover:bg-[#008378] text-white font-bold text-[11px] transition-all flex items-center gap-1 shadow-sm"
            >
              <span>이 프로젝트 견적 문의</span>
              <Send className="w-3 h-3" />
            </Link>
          </div>
        </aside>
      )}

      {/* 1. Global Navigation Bar */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-grow pt-20">
        {/* 2. Hero Section with Nordic Atmosphere Canvas & Trust Metrics */}
        <Hero onOpenVideoModal={() => setIsVideoModalOpen(true)} />

        {/* 3. 3 Core Green Hydrogen Pillars */}
        <PillarsSection onSelectAction={handlePillarAction} />

        {/* 4. Live Telemetry & SCADA Hub Network */}
        <HubsTelemetrySection />

        {/* 5. Enterprise PPA Financial Engine & Carbon Calculator */}
        <CalculatorSection />

        {/* 6. Global Standards & ESG Governance */}
        <GovernanceSection />

        {/* 7. Enterprise Consultation & PPA Meeting Booking Form */}
        <ConsultationSection />
      </main>

      {/* 8. Enterprise Footer */}
      <Footer />

      {/* Interactive Video Showcase Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />

      {/* Notification Toast Component */}
      <Toast
        toast={currentToast}
        onClose={() => setCurrentToast(null)}
      />
    </div>
  );
}
