'use client';

import React from 'react';
import { X, CheckCircle2, ArrowRight, MapPin, Calendar, Layers } from 'lucide-react';
import { ProjectItem } from '../types';

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
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#1b1c1e] border border-[#c5a880]/40 max-w-3xl w-full my-8 p-6 lg:p-10 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 lg:top-6 lg:right-6 p-2 text-[#998f83] hover:text-[#f4efea] transition cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Top Tag & Title */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a880] mb-2 font-semibold">
          <span>{project.koreanCategory}</span>
          <span className="text-white/20">•</span>
          <span>{project.completionYear}</span>
        </div>
        <h2 className="text-2xl lg:text-3xl font-serif text-[#f4efea] break-keep [word-break:keep-all]">
          {project.title}
        </h2>
        <p className="text-xs text-[#998f83] tracking-wider uppercase mt-1">
          {project.location} — {project.subtitle}
        </p>

        {/* Hero Image */}
        <div className="mt-6 aspect-[16/9] overflow-hidden bg-[#0d0e10] border border-white/10">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
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
                  <span className="text-[#f4efea] font-medium mt-0.5">
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
                  <span>{feat}</span>
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
              onClick={onClose}
              className="w-full lg:w-auto px-5 py-2.5 text-xs text-[#998f83] hover:text-white border border-white/10 transition cursor-pointer"
            >
              닫기
            </button>
            <button
              onClick={() => {
                onClose();
                onInquire(project.title);
              }}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-[#c5a880] text-[#121315] font-semibold px-6 py-2.5 text-xs tracking-wider uppercase hover:bg-[#e0c298] transition cursor-pointer"
            >
              <span>이 스타일로 상담 예약</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
