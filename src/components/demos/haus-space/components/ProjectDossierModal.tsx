'use client';

import React, { useId, useRef } from 'react';
import { X, CheckCircle2, ArrowRight, Layers } from 'lucide-react';
import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import { imageCropStyle, ProjectItem } from '../types';

interface ProjectDossierModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquire: (projectTitle: string) => void;
}

export const ProjectDossierModal: React.FC<ProjectDossierModalProps> = ({
  project,
  onClose,
  onInquire,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Esc 닫기 · 배경 스크롤 잠금 · Tab 순환 · 닫으면 원래 자리로 포커스 복귀 (샘플 공용 훅)
  // 훅은 조건 없이 호출해야 하므로 open 여부를 인자로 넘기고, 화면 반환만 아래에서 끊는다.
  useSampleDialog({ open: project !== null, onClose, dialogRef });

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      // 배경을 누르면 닫힌다. mousedown 기준이라 모달 안에서 시작한 드래그가 밖에서 끝나도 안 닫힌다.
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
        className="bg-[#1b1c1e] border border-[#c5a880]/40 max-w-3xl w-full my-8 p-6 lg:p-10 shadow-2xl relative outline-none animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="프로젝트 상세 닫기"
          className="absolute top-2 right-2 lg:top-4 lg:right-4 flex h-11 w-11 items-center justify-center text-[#998f83] hover:text-[#f4efea] transition cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Top Tag & Title */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a880] mb-2 font-semibold pr-12">
          <span>{project.koreanCategory}</span>
          <span className="text-white/20">•</span>
          <span>{project.completionYear}</span>
        </div>
        <h2
          id={titleId}
          className="text-2xl lg:text-3xl font-serif text-[#f4efea] break-keep [word-break:keep-all] pr-12"
        >
          {project.title}
        </h2>
        <p className="text-xs text-[#998f83] tracking-wider uppercase mt-1">
          {project.location} — {project.subtitle}
        </p>
        {/* 위치·면적·공사 기간이 그대로 붙는 지면이라, 형제 데모와 같은 한 줄을 여기에도 둔다 */}
        <p className="mt-2 text-[11px] leading-relaxed text-[#8a8177] [word-break:keep-all]">
          이 프로젝트명·위치·면적·공사 기간·연도는 가상 브랜드 설정으로 지어낸 예시이며 실제 시공 실적이 아닙니다.
        </p>

        {/* Hero Image */}
        <div className="mt-6 aspect-[16/9] overflow-hidden bg-[#0d0e10] border border-white/10">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
            style={imageCropStyle(project.imageCrop)}
          />
        </div>

        {/* Narrative Description */}
        <div className="mt-6">
          <h4 className="text-xs uppercase tracking-widest text-[#c5a880] mb-1 font-medium break-keep [word-break:keep-all]">
            Architectural Concept
          </h4>
          <p className="text-sm lg:text-base text-[#d1c5b8] font-light leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Specifications Grid */}
        {project.specs && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <h4 className="text-xs uppercase tracking-widest text-[#c5a880] mb-3 font-medium flex items-center gap-1.5 break-keep [word-break:keep-all]">
              <Layers className="w-3.5 h-3.5" />
              Project Specifications
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs">
              {project.specs.map((item) => (
                <div
                  key={item.label}
                  className="bg-[#121315] p-3 border border-white/5 flex flex-col"
                >
                  <span className="text-[#998f83]">{item.label}</span>
                  <span className="text-[#f4efea] font-medium mt-0.5 [word-break:keep-all]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Features */}
        {project.features && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <h4 className="text-xs uppercase tracking-widest text-[#c5a880] mb-3 font-medium break-keep [word-break:keep-all]">
              Curatorial Highlights
            </h4>
            <div className="space-y-2">
              {project.features.map((feat) => (
                <div key={feat} className="flex items-start gap-2.5 text-xs text-[#d1c5b8]">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                  <span className="[word-break:keep-all]">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col lg:flex-row items-center justify-between gap-4">
          <span className="text-xs text-[#998f83]">
            Materials: {project.materialsUsed}
          </span>
          <div className="flex gap-3 w-full lg:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="w-full lg:w-auto min-h-11 px-5 py-2.5 text-xs text-[#998f83] hover:text-white border border-white/10 transition cursor-pointer"
            >
              닫기
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onInquire(project.title);
              }}
              className="w-full lg:w-auto min-h-11 inline-flex items-center justify-center gap-2 bg-[#c5a880] text-[#121315] font-semibold px-6 py-2.5 text-xs tracking-wider uppercase hover:bg-[#e0c298] transition cursor-pointer"
            >
              <span>이 스타일로 상담 예약</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
