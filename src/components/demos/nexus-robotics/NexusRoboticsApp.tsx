'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FleetLineupSection } from './components/FleetLineupSection';
import { DigitalTwinSection } from './components/DigitalTwinSection';
import { RoiCalculatorSection } from './components/RoiCalculatorSection';
import { ReferencesSection } from './components/ReferencesSection';
import { ConsultationWizardSection } from './components/ConsultationWizardSection';
import { Footer } from './components/Footer';
import { VideoModal, SpecModal, DocModal, Toast } from './components/Modals';

interface NexusRoboticsAppProps {
  isEmbed?: boolean;
}

export default function NexusRoboticsApp({ isEmbed = false }: NexusRoboticsAppProps) {
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [specModalOpen, setSpecModalOpen] = useState(false);
  const [specRobotName, setSpecRobotName] = useState('AMR-500');
  const [docModalOpen, setDocModalOpen] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    title: '',
    desc: '',
  });

  const showToast = useCallback((title: string, desc: string) => {
    setToast({ show: true, title, desc });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 4500);
  }, []);

  const handleOpenSpec = (robotName: string) => {
    setSpecRobotName(robotName);
    setSpecModalOpen(true);
  };

  const handleDownloadSpec = () => {
    setSpecModalOpen(false);
    showToast('다운로드가 시작되었습니다.', 'NX-ENG-SPEC-FULL-V4.zip 다운로드를 진행합니다.');
  };

  const handleDownloadRoiReport = () => {
    showToast('ROI 시뮬레이션 PDF 생성 완료', '브라우저 다운로드 폴더로 리포트가 저장되었습니다.');
  };

  const handleConsultationSuccess = (name: string) => {
    showToast('방문 실사 접수 완료', `${name} 담당자님께 24시간 내 유선으로 연락드리겠습니다.`);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
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
              [01] 넥서스 로보틱스 (NEXUS ROBOTICS) — 화이트 프리시전 테크 기업 플래그십
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/inquiry?from=nexus-robotics"
              className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] transition-all flex items-center gap-1 shadow-sm"
            >
              <span>이 프로젝트 견적 문의</span>
              <Send className="w-3 h-3" />
            </Link>
          </div>
        </aside>
      )}

      {/* Global Header */}
      <Header onOpenDocModal={() => setDocModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="pt-16 flex-1">
        {/* 1. Hero Section */}
        <HeroSection onOpenVideoModal={() => setVideoModalOpen(true)} />

        {/* 2. Robot Fleet Lineup Section */}
        <FleetLineupSection onOpenSpecModal={handleOpenSpec} />

        {/* 3. NEXUS-OS Digital Twin 관제 플랫폼 */}
        <DigitalTwinSection />

        {/* 4. ROI Simulator */}
        <RoiCalculatorSection onDownloadReport={handleDownloadRoiReport} />

        {/* 5. Enterprise References & Testimonials */}
        <ReferencesSection />

        {/* 6. Engineering Consultation & PoC Wizard */}
        <ConsultationWizardSection onSubmitSuccess={handleConsultationSuccess} />
      </main>

      {/* Global Enterprise Footer */}
      <Footer />

      {/* Modals & Popups */}
      <VideoModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
      />

      <SpecModal
        isOpen={specModalOpen}
        robotName={specRobotName}
        onClose={() => setSpecModalOpen(false)}
        onDownload={handleDownloadSpec}
      />

      <DocModal
        isOpen={docModalOpen}
        onClose={() => setDocModalOpen(false)}
      />

      {/* Toast Notification */}
      <Toast
        show={toast.show}
        title={toast.title}
        desc={toast.desc}
      />
    </div>
  );
}
