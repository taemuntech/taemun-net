'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { Engineering } from './components/Engineering';
import { MasterBuilder } from './components/MasterBuilder';
import { Portfolio } from './components/Portfolio';
import { Roadmap } from './components/Roadmap';
import { ConsultationForm } from './components/ConsultationForm';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { Project } from './types';

export default function SodamjaeApp({ isEmbed = false }: { isEmbed?: boolean } = {}) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const scrollToConsultation = (projectPrefill?: Project) => {
    const consultationEl = document.getElementById('consultation');
    if (consultationEl) {
      consultationEl.scrollIntoView({ behavior: 'smooth' });
      if (projectPrefill) {
        const textarea = document.querySelector<HTMLTextAreaElement>('#consultation textarea');
        if (textarea && !textarea.value) {
          textarea.value = `[${projectPrefill.name} (${projectPrefill.hanjaName})] 스타일의 한옥 건축 상담을 희망합니다. 대지 현장 답사 및 예상 견적 가이드를 부탁드립니다.`;
          textarea.dispatchEvent(new Event('input', { bubbles: true }));
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] text-[#1a1c1b] flex flex-col font-sans selection:bg-[#fea58a] selection:text-[#161714]">
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
            <span className="flex items-center gap-1.5 font-medium text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span className="font-semibold text-white">소담재 건축공방</span> 실물 라이브 데모
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden lg:inline text-gray-400">
              태문 DEV STUDIO 프리미엄 전통한옥·중목구조 레퍼런스
            </span>
            <Link
              href="/inquiry?from=sodamjae"
              className="bg-amber-600 hover:bg-amber-500 text-white font-medium px-3 py-1 rounded text-xs transition-colors flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              <span>이런 사이트 제작 문의</span>
            </Link>
          </div>
        </aside>
      )}

      {/* Header */}
      <Header onOpenConsultation={() => scrollToConsultation()} />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onSelectProject={(project) => setSelectedProject(project)}
          onOpenConsultation={() => scrollToConsultation()}
        />

        <Philosophy />

        <Engineering />

        <MasterBuilder />

        <Portfolio
          onSelectProject={(project) => setSelectedProject(project)}
        />

        <Roadmap />

        <ConsultationForm />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onConsultSimilar={(project) => scrollToConsultation(project)}
      />
    </div>
  );
}
