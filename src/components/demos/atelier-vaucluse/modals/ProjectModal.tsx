'use client';

import React, { useId, useRef, useState } from 'react';
import { Project } from '../types';
import { X, MapPin, Calendar, Layers, Palette, Quote, ArrowRight } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onRequestConsultationWithProject: (project: Project) => void;
}

/**
 * 껍데기는 훅을 하나도 쓰지 않는다 — 예전에는 `if (!project) return null` 뒤에 useState 가 있어서
 * 모달을 닫는 렌더에서 훅 개수가 줄어 React 가 터졌고, 열려 있는 동안에도 처음 연 프로젝트의
 * 대표 사진이 그대로 남아 **다른 프로젝트를 눌러도 앞 사진이 보였다**.
 * project.id 를 key 로 줘서 프로젝트가 바뀌면 안쪽이 새로 마운트되게 한다.
 */
export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onRequestConsultationWithProject,
}) => {
  if (!project) return null;

  return (
    <ProjectModalBody
      key={project.id}
      project={project}
      onClose={onClose}
      onRequestConsultationWithProject={onRequestConsultationWithProject}
    />
  );
};

function ProjectModalBody({
  project,
  onClose,
  onRequestConsultationWithProject,
}: {
  project: Project;
  onClose: () => void;
  onRequestConsultationWithProject: (project: Project) => void;
}) {
  const [selectedImage, setSelectedImage] = useState<string>(project.imageUrl);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  // Esc 닫기 · 배경 스크롤 잠금 · 포커스 가두기 — 샘플 공용 훅
  useSampleDialog({ open: true, onClose, dialogRef, initialFocusRef: closeRef });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="bg-[#faf9f7] rounded max-w-4xl w-full max-h-[90vh] flex flex-col border border-[#c8c7bf]/40 shadow-2xl relative my-auto overflow-hidden outline-none"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#c8c7bf]/30 bg-[#faf9f7] z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#904b35] font-bold tracking-wider">
              {project.index}
            </span>
            <span className="text-xs uppercase tracking-[0.2em] font-sans text-[#474741]">
              {project.category.toUpperCase()} PROJECT
            </span>
          </div>

          <button
            ref={closeRef}
            onClick={onClose}
            className="text-[#474741] hover:text-[#161714] w-11 h-11 -mr-2 flex items-center justify-center rounded hover:bg-[#efeeec] cursor-pointer transition-colors"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 lg:p-8 space-y-8">
          {/* Main Visual & Gallery Strip */}
          <div className="space-y-3">
            <div className="aspect-[16/10] overflow-hidden rounded bg-[#efeeec] border border-[#c8c7bf]/30">
              <img
                referrerPolicy="no-referrer"
                src={selectedImage}
                alt={project.imageAlt}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>

            {project.galleryImages && project.galleryImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {project.galleryImages.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(imgUrl)}
                    aria-label={`${project.title} 사진 ${i + 1} 보기`}
                    aria-pressed={selectedImage === imgUrl}
                    className={`w-20 h-16 rounded overflow-hidden border-2 shrink-0 cursor-pointer transition-all ${
                      selectedImage === imgUrl
                        ? 'border-[#161714] opacity-100 scale-102'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      referrerPolicy="no-referrer"
                      src={imgUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Title & Key Metrics */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#474741] font-sans">
              <span className="flex items-center gap-1">
                <MapPin size={13} className="text-[#904b35]" />
                {project.location}
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Calendar size={13} className="text-[#904b35]" />
                {project.year}년 준공
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Layers size={13} className="text-[#904b35]" />
                면적: {project.area}
              </span>
            </div>

            <h2
              id={titleId}
              className="text-2xl lg:text-3xl font-serif text-[#161714] break-keep [word-break:keep-all]"
            >
              {project.title}
            </h2>

            <p className="text-sm lg:text-base text-[#474741] font-sans font-light leading-relaxed break-keep [word-break:keep-all]">
              {project.description}
            </p>

            <p className="text-[11px] text-[#777770] font-sans">
              가상 브랜드 샘플입니다 — 프로젝트명·지역·연도·면적·후기는 모두 예시이며 실제 시공 실적이 아닙니다.
            </p>
          </div>

          {/* Material Palette Breakdown */}
          <div className="bg-[#f4f3f1] p-6 rounded border border-[#c8c7bf]/30 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#161714] font-sans flex items-center gap-1.5">
              <Palette size={14} className="text-[#904b35]" />
              Material Palette &amp; Finishes
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.materials.map((mat, idx) => (
                <span
                  key={idx}
                  className="bg-[#faf9f7] text-[#161714] border border-[#c8c7bf]/40 px-3 py-1.5 rounded text-xs font-sans"
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>

          {/* Key Architectural Features */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#161714] font-sans">
              Key Architectural Features
            </h4>
            <ul className="grid grid-cols-1 lg:grid-cols-3 gap-3">
              {project.keyFeatures.map((feature, idx) => (
                <li
                  key={idx}
                  className="bg-[#efeeec] p-3 rounded border border-[#c8c7bf]/20 text-xs text-[#161714] font-sans font-light break-keep [word-break:keep-all]"
                >
                  • {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Client Review */}
          {project.clientReview && (
            <div className="bg-[#faf9f7] p-5 rounded border-l-2 border-[#904b35] border-y border-r border-[#c8c7bf]/20 relative">
              <Quote size={18} className="text-[#904b35]/40 mb-1" />
              <p className="text-xs lg:text-sm text-[#474741] italic font-serif leading-relaxed break-keep [word-break:keep-all]">
                &ldquo;{project.clientReview}&rdquo;
              </p>
              <span className="text-[11px] text-[#777770] font-sans block mt-2">
                — {project.title} 건축주 서면 리뷰 (예시 후기)
              </span>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-[#c8c7bf]/30 bg-[#f4f3f1] flex flex-col lg:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#474741] font-sans text-center lg:text-left break-keep [word-break:keep-all]">
            동일한 콘셉트 및 마감재 라이브러리 적용 문의
          </span>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <button
              onClick={onClose}
              className="px-5 min-h-11 rounded border border-[#c8c7bf]/50 text-xs text-[#474741] hover:text-[#161714] font-sans cursor-pointer transition-colors w-1/2 lg:w-auto"
            >
              닫기
            </button>
            <button
              onClick={() => {
                onRequestConsultationWithProject(project);
                onClose();
              }}
              className="bg-[#2b2b28] text-[#faf9f7] hover:bg-[#904b35] px-6 min-h-11 rounded text-xs uppercase tracking-wider font-semibold font-sans flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-1/2 lg:w-auto"
            >
              <span>이 스타일로 상담 예약</span>
              <ArrowRight size={13} className="shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
