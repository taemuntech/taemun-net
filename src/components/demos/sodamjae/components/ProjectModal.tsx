"use client";

import React from 'react';
import { X, MapPin, Calendar, Layers, ShieldCheck, ThermometerSun, Compass, ArrowRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onConsultSimilar: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onConsultSimilar }) => {
  if (!project) return null;

  return (
    <div
      id="project-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-6 bg-[#161714]/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="project-modal-content"
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#faf9f7] rounded-xs border border-[#c8c7bf]/60 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-modal-button"
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-[#161714]/80 text-[#faf9f7] hover:bg-[#904b35] rounded-xs transition-colors cursor-pointer"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Hero Image */}
        <div className="relative aspect-[16/10] lg:aspect-[16/9] w-full overflow-hidden bg-[#e9e8e6]">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-4 left-4 bg-[#faf9f7]/95 backdrop-blur-md px-3 py-1 rounded-xs text-xs font-mono text-[#161714]">
            {project.categoryLabel}
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#777770] font-sans mb-2">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#904b35]" />
              {project.location}
            </span>
            <span className="flex items-center gap-1 font-mono">
              <Calendar className="w-3.5 h-3.5" />
              {project.year} · {project.area}
            </span>
          </div>

          <h2 className="font-serif text-2xl lg:text-3xl text-[#161714] mb-1 font-medium">
            {project.name} <span className="text-xl text-[#777770] font-light">({project.hanjaName})</span>
          </h2>

          <p className="text-sm text-[#474741] leading-relaxed mb-6 font-light">
            {project.detailedStory || project.description}
          </p>

          {/* Detailed Specifications Grid */}
          <div className="mb-6 pt-6 border-t border-[#c8c7bf]/30">
            <h4 className="text-xs font-semibold text-[#904b35] uppercase tracking-wider mb-3 font-mono">
              Architectural Specifications
            </h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
              <div className="p-3.5 bg-[#f4f3f1] rounded-xs border border-[#c8c7bf]/30">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#161714] mb-1">
                  <Compass className="w-4 h-4 text-[#904b35]" />
                  <span>원목 수종 및 함수율</span>
                </div>
                <p className="text-xs text-[#474741] font-light">{project.specs.wood}</p>
              </div>

              <div className="p-3.5 bg-[#f4f3f1] rounded-xs border border-[#c8c7bf]/30">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#161714] mb-1">
                  <Layers className="w-4 h-4 text-[#904b35]" />
                  <span>단열 및 기밀 시스템</span>
                </div>
                <p className="text-xs text-[#474741] font-light">{project.specs.insulation}</p>
              </div>

              <div className="p-3.5 bg-[#f4f3f1] rounded-xs border border-[#c8c7bf]/30">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#161714] mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#904b35]" />
                  <span>전통 결구 방식</span>
                </div>
                <p className="text-xs text-[#474741] font-light">{project.specs.joinery}</p>
              </div>

              <div className="p-3.5 bg-[#f4f3f1] rounded-xs border border-[#c8c7bf]/30">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#161714] mb-1">
                  <ThermometerSun className="w-4 h-4 text-[#904b35]" />
                  <span>냉난방 및 환기 공조</span>
                </div>
                <p className="text-xs text-[#474741] font-light">{project.specs.heating}</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mb-6">
            {project.tags.map((tag, idx) => (
              <span key={idx} className="text-xs px-2.5 py-1 bg-[#efeeec] text-[#474741] rounded-xs">
                #{tag}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#c8c7bf]/30">
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-[#c8c7bf] text-xs font-medium text-[#474741] rounded-xs hover:bg-[#efeeec] transition-colors cursor-pointer"
            >
              닫기
            </button>
            <button
              onClick={() => {
                onClose();
                onConsultSimilar(project);
              }}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#161714] text-[#faf9f7] text-xs font-medium rounded-xs hover:bg-[#904b35] transition-colors cursor-pointer"
            >
              <span>이 프로젝트와 유사한 한옥 상담하기</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
