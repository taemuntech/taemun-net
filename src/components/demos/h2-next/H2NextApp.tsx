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

  const handleDownloadProposal = (details: { power: number; year: number; trucks: number; savings: string }) => {
    showToast(
      '제안서 생성이 완료되었습니다',
      `연간 ${details.power.toLocaleString()} MWh 사용 기준 (연간 약 ${details.savings}원 절감 예상) [H2 NEXT 기업 PPA 기술제안서.pdf]가 다운로드되었습니다.`,
      'download'
    );
  };

  const handleDownloadReport = () => {
    showToast(
      '지속가능경영보고서 수신 완료',
      '2025 H2 NEXT Sustainability Report (GRI/SASB) 국·영문 통합본 전문이 발송되었습니다.',
      'info'
    );
  };

  const handleConsultationSuccess = (data: { company: string; name: string; type: string }) => {
    showToast(
      'PPA 미팅 신청이 정상 접수되었습니다',
      `${data.company} ${data.name} 님의 [${data.type}] 검토 요청이 접수되었습니다. 지정 사업장 담당 수석 엔지니어가 24시간 이내 연락드립니다.`,
      'success'
    );
  };

  const handlePillarAction = (actionText: string) => {
    if (actionText.includes('도면') || actionText.includes('스펙')) {
      showToast(
        '기술 자료 신청 안내',
        '상세 기술 규격서 및 설계 도면은 하단 PPA 미팅 신청서 작성 시 즉시 이메일로 송부됩니다.',
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
        <CalculatorSection onDownloadProposal={handleDownloadProposal} />

        {/* 6. Global Standards & ESG Governance */}
        <GovernanceSection onDownloadReport={handleDownloadReport} />

        {/* 7. Enterprise Consultation & PPA Meeting Booking Form */}
        <ConsultationSection onSubmitSuccess={handleConsultationSuccess} />
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
