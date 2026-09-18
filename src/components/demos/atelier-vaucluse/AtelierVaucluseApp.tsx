'use client';

import { useState } from 'react';
import { Header } from './Header';
import { Hero } from './Hero';
import { Philosophy } from './Philosophy';
import { Portfolio } from './Portfolio';
import { Process } from './Process';
import { Consultation } from './Consultation';
import { Footer } from './Footer';
import { ProjectModal } from './modals/ProjectModal';
import { MaterialArchiveModal } from './modals/MaterialArchiveModal';
import { ImageLightboxModal } from './modals/ImageLightboxModal';
import { JournalModal } from './modals/JournalModal';
import { PrivacyPolicyModal } from './modals/PrivacyPolicyModal';
import { ConsultationPrefill, Project, ProjectCategory } from './types';

/** 프로젝트 분류 → 상담 폼의 공간 유형 (Consultation 의 select 값과 글자까지 같아야 한다) */
const SPACE_TYPE_BY_CATEGORY: Record<Exclude<ProjectCategory, 'all'>, string> = {
  residential: '아파트 / 주거 리노베이션',
  commercial: '상업 / 부티크 플래그십 쇼룸',
  renovation: '아파트 / 주거 리노베이션',
};

export default function AtelierVaucluseApp() {
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
  const [portfolioCategory, setPortfolioCategory] = useState<ProjectCategory>('all');
  const [consultationPrefill, setConsultationPrefill] = useState<ConsultationPrefill | null>(null);

  // 모달을 닫으면서 스크롤하는 버튼이 여럿이다(프로젝트 상세·자재 아카이브·라이트박스).
  // 모달이 닫힐 때 공용 훅이 «열기 전 눌렀던 버튼»으로 포커스를 되돌리는데, 그 focus() 가
  // 그 버튼을 화면 안으로 끌어와 방금 시작한 부드러운 스크롤을 덮어쓴다.
  // 그래서 스크롤은 닫힘 처리(언마운트 정리)가 끝난 다음 프레임에 시작한다.
  const scrollToSection = (id: string) => {
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  // 고른 프로젝트를 상담 폼 상태로 내려보낸다. textarea 를 직접 건드리면 제어 컴포넌트라
  // React 상태가 안 바뀌고 다음 렌더에서 지워진다 — 그래서 props 로 넘긴다.
  const handleRequestConsultationWithProject = (project: Project) => {
    setConsultationPrefill({
      nonce: Date.now(),
      notes: `[참조 프로젝트: ${project.title} (${project.location})] 해당 프로젝트의 마감재 및 분위기를 참고하여 상담받고 싶습니다.`,
      spaceType:
        project.category === 'all' ? undefined : SPACE_TYPE_BY_CATEGORY[project.category],
    });
    scrollToSection('consultation');
  };

  const handleSelectCategory = (category: ProjectCategory) => {
    setPortfolioCategory(category);
    scrollToSection('portfolio');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f7] text-[#1a1c1b] font-sans selection:bg-[#e5e2dd] selection:text-[#161714]">
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
          activeCategory={portfolioCategory}
          onChangeCategory={setPortfolioCategory}
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenMaterialArchive={() => setIsMaterialArchiveOpen(true)}
        />

        {/* Execution Process Section */}
        <Process />

        {/* Consultation & Inquiry Section */}
        <Consultation prefill={consultationPrefill} />
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
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
