'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Header } from './Header';
import { Hero } from './Hero';
import { Philosophy } from './Philosophy';
import { Portfolio } from './Portfolio';
import { Process } from './Process';
import { Consultation } from './Consultation';
import { Footer } from './Footer';
import { ProjectModal } from './modals/ProjectModal';
import { ConfirmationModal } from './modals/ConfirmationModal';
import { MaterialArchiveModal } from './modals/MaterialArchiveModal';
import { ImageLightboxModal } from './modals/ImageLightboxModal';
import { JournalModal } from './modals/JournalModal';
import { PrivacyPolicyModal } from './modals/PrivacyPolicyModal';
import { Project, SubmissionRecord } from './types';

export default function AtelierVaucluseApp({ isEmbed = false }: { isEmbed?: boolean } = {}) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    label: string;
    description: string;
    alt: string;
  } | null>(null);
  const [isMaterialArchiveOpen, setIsMaterialArchiveOpen] = useState(false);
  const [journalModalState, setJournalModalState] = useState<{
    isOpen: boolean;
    tab: 'journal' | 'press';
  }>({
    isOpen: false,
    tab: 'journal',
  });
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [confirmedRecord, setConfirmedRecord] = useState<SubmissionRecord | null>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleRequestConsultationWithProject = (project: Project) => {
    scrollToSection('consultation');
    setTimeout(() => {
      const notesEl = document.querySelector('textarea[name="notes"]') as HTMLTextAreaElement | null;
      if (notesEl && !notesEl.value) {
        notesEl.value = `[참조 프로젝트: ${project.title} (${project.location})] 해당 프로젝트의 마감재 및 분위기를 참고하여 상담받고 싶습니다.`;
        notesEl.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f7] text-[#1a1c1b] font-sans selection:bg-[#e5e2dd] selection:text-[#161714]">
      {/* 🌟 Taemun Dev Studio Top Floating Demo Bar */}
      {!isEmbed && (
        <aside aria-label="데모 안내 바" className="sticky top-0 z-[60] bg-gray-950/95 backdrop-blur-md text-white border-b border-gray-800 text-xs py-2 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/portfolio"
              className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors font-medium"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>포트폴리오 목록</span>
            </Link>
            <span className="text-gray-600">|</span>
            <span className="flex items-center gap-1.5 font-medium text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-semibold text-white">ATELIER VAUCLUSE</span> 실물 라이브 데모
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden lg:inline text-gray-400">
              태문 DEV STUDIO 하이엔드 인테리어·건축 레퍼런스
            </span>
            <Link
              href="/inquiry?from=atelier-vaucluse"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-3 py-1 rounded text-xs transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" />
              <span>이런 사이트 제작 문의</span>
            </Link>
          </div>
        </aside>
      )}

      {/* Top Header */}
      <Header
        onOpenJournal={() => setJournalModalState({ isOpen: true, tab: 'journal' })}
        onOpenPress={() => setJournalModalState({ isOpen: true, tab: 'press' })}
        onOpenMaterialArchive={() => setIsMaterialArchiveOpen(true)}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onExplorePortfolio={() => scrollToSection('portfolio')}
          onRequestConsultation={() => scrollToSection('consultation')}
          onSelectImage={(img) => setSelectedImage(img)}
        />

        {/* Brand Philosophy Section */}
        <Philosophy
          onOpenMaterialArchive={() => setIsMaterialArchiveOpen(true)}
        />

        {/* Curated Portfolio Showcase */}
        <Portfolio
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenMaterialArchive={() => setIsMaterialArchiveOpen(true)}
        />

        {/* Execution Process Section */}
        <Process />

        {/* Consultation & Inquiry Section */}
        <Consultation
          onSubmitSuccess={(record) => setConfirmedRecord(record)}
        />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={() => {
          scrollToSection('portfolio');
        }}
        onOpenMaterialArchive={() => setIsMaterialArchiveOpen(true)}
        onOpenJournal={() => setJournalModalState({ isOpen: true, tab: 'journal' })}
        onOpenPress={() => setJournalModalState({ isOpen: true, tab: 'press' })}
        onOpenConsultation={() => scrollToSection('consultation')}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

      {/* Interactive Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestConsultationWithProject={handleRequestConsultationWithProject}
      />

      <ConfirmationModal
        record={confirmedRecord}
        onClose={() => setConfirmedRecord(null)}
      />

      <MaterialArchiveModal
        isOpen={isMaterialArchiveOpen}
        onClose={() => setIsMaterialArchiveOpen(false)}
        onOpenConsultation={() => scrollToSection('consultation')}
      />

      <ImageLightboxModal
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
        onRequestConsultation={() => scrollToSection('consultation')}
      />

      <JournalModal
        isOpen={journalModalState.isOpen}
        initialTab={journalModalState.tab}
        onClose={() => setJournalModalState((prev) => ({ ...prev, isOpen: false }))}
      />

      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}
