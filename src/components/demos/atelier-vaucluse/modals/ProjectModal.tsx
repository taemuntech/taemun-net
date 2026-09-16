'use client';

import React, { useState } from 'react';
import { Project } from '../types';
import { X, MapPin, Calendar, Layers, Palette, Quote, ArrowRight } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onRequestConsultationWithProject: (project: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onRequestConsultationWithProject,
}) => {
  if (!project) return null;

  const [selectedImage, setSelectedImage] = useState<string>(project.imageUrl);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 lg:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#faf9f7] rounded max-w-4xl w-full max-h-[90vh] flex flex-col border border-[#c8c7bf]/40 shadow-2xl relative my-auto overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#c8c7bf]/30 bg-[#faf9f7] sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#904b35] font-bold tracking-wider">
              {project.index}
            </span>
            <span className="text-xs uppercase tracking-[0.2em] font-sans text-[#474741]">
              {project.category.toUpperCase()} PROJECT
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-[#474741] hover:text-[#161714] p-1.5 rounded hover:bg-[#efeeec] cursor-pointer transition-colors"
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
                    className={`w-20 h-16 rounded overflow-hidden border-2 shrink-0 cursor-pointer transition-all ${
                      selectedImage === imgUrl
                        ? 'border-[#161714] opacity-100 scale-102'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      referrerPolicy="no-referrer"
                      src={imgUrl}
                      alt={`Gallery thumbnail ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Title & Key Metrics */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#474741] font-sans">
              <span className="flex items-center gap-1">
                <MapPin size={13} className="text-[#904b35]" />
                {project.location}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar size={13} className="text-[#904b35]" />
                {project.year}년 준공
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Layers size={13} className="text-[#904b35]" />
                면적: {project.area}
              </span>
            </div>

            <h2 className="text-2xl lg:text-3xl font-serif text-[#161714]">
              {project.title}
            </h2>

            <p className="text-sm lg:text-base text-[#474741] font-sans font-light leading-relaxed">
              {project.description}
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
                  className="bg-[#efeeec] p-3 rounded border border-[#c8c7bf]/20 text-xs text-[#161714] font-sans font-light"
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
              <p className="text-xs lg:text-sm text-[#474741] italic font-serif leading-relaxed">
                "{project.clientReview}"
              </p>
              <span className="text-[11px] text-[#777770] font-sans block mt-2">
                — {project.title} 건축주 서면 리뷰
              </span>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 border-t border-[#c8c7bf]/30 bg-[#f4f3f1] flex flex-col lg:flex-row items-center justify-between gap-3">
          <span className="text-xs text-[#474741] font-sans">
            동일한 콘셉트 및 마감재 라이브러리 적용 문의
          </span>

          <div className="flex items-center gap-3 w-full lg:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded border border-[#c8c7bf]/50 text-xs text-[#474741] hover:text-[#161714] font-sans cursor-pointer transition-colors w-1/2 lg:w-auto"
            >
              닫기
            </button>
            <button
              onClick={() => {
                onRequestConsultationWithProject(project);
                onClose();
              }}
              className="bg-[#2b2b28] text-[#faf9f7] hover:bg-[#904b35] px-6 py-2.5 rounded text-xs uppercase tracking-wider font-semibold font-sans flex items-center justify-center gap-1.5 transition-colors cursor-pointer w-1/2 lg:w-auto"
            >
              <span>이 스타일로 상담 예약</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
