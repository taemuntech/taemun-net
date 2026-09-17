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

interface H2NextAppProps {
  isEmbed?: boolean;
}

export default function H2NextApp({ isEmbed = false }: H2NextAppProps) {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  /** 거점 화면이 보여 주는 거점 — 푸터 거점 링크도 이 값을 바꾼다 */
  const [hubIndex, setHubIndex] = useState(0);
  /** 푸터 IR 링크가 고른 문서 — 거버넌스 구역의 샘플 안내에 이름을 실어 연다 */
  const [requestedDoc, setRequestedDoc] = useState<{ name: string; nonce: number } | null>(null);

  // 제안서·보고서 내려받기와 제휴 문의는 각 구역이 SampleNotice 를 직접 연다(가짜 접수·가짜 다운로드 금지).
  // 기술 카드의 「상세 스펙 시트」는 토스트로 때우지 않고 PillarsSection 이 상세 모달을 직접 연다.

  // 한글 제목이 낱말 한가운데서 쪼개지던 자리(「차세/대」·「패키/징」) — 이 데모 안의 제목에 keep-all 을 한 번에 건다
  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans selection:bg-[#00685f]/20 selection:text-[#00685f] [&_h1]:break-keep [&_h2]:break-keep [&_h3]:break-keep">
      {/* 🌟 Taemun Dev Studio Top Floating Demo Bar */}
      {!isEmbed && (
        <aside
          aria-label="데모 안내 바"
          // 공용 샘플 바(높이 --sample-bar-h)에 가려지지 않게 top-0 대신 변수를 쓴다 — 바가 없으면 0px 라 화면은 그대로다.
          className="sticky top-[var(--sample-bar-h,0px)] z-[60] bg-zinc-950/95 backdrop-blur-md text-white border-b border-zinc-800 text-xs py-2 px-4 flex items-center justify-between"
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
        <PillarsSection />

        {/* 4. Live Telemetry & SCADA Hub Network */}
        <HubsTelemetrySection
          selectedHubIndex={hubIndex}
          onSelectHubIndex={setHubIndex}
        />

        {/* 5. Enterprise PPA Financial Engine & Carbon Calculator */}
        <CalculatorSection />

        {/* 6. Global Standards & ESG Governance */}
        <GovernanceSection requestedDoc={requestedDoc} />

        {/* 7. Enterprise Consultation & PPA Meeting Booking Form */}
        <ConsultationSection />
      </main>

      {/* 8. Enterprise Footer */}
      <Footer
        onSelectHub={(index) => {
          setHubIndex(index);
          document.getElementById('nodes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
        onRequestDoc={(docName) => {
          setRequestedDoc({ name: docName, nonce: Date.now() });
          document.getElementById('governance')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }}
      />

      {/* Interactive Video Showcase Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </div>
  );
}
