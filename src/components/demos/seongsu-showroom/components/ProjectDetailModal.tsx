'use client';
import React from 'react';
import Image from 'next/image';
import { ProjectCase } from '../types';

interface ProjectDetailModalProps {
  project: ProjectCase | null;
  onClose: () => void;
  onConsult: (projectTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose, onConsult }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#141519] border border-white/15 rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto text-white p-6 lg:p-8 space-y-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-stone-400 hover:text-white text-lg z-10"
          aria-label="닫기"
        >
          ✕
        </button>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden border border-white/10 bg-stone-950">
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-xs font-mono text-amber-400 block mb-1">
              {project.category} · {project.concept}
            </span>
            <h3 className="font-serif text-xl lg:text-2xl font-bold text-white">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Meta Stats Bar */}
        <div className="grid grid-cols-3 gap-3 p-3 bg-stone-900/80 rounded border border-white/5 text-xs font-mono">
          <div>
            <span className="text-stone-400 block mb-0.5">위치</span>
            <span className="text-stone-200 truncate block">{project.location}</span>
          </div>
          <div>
            <span className="text-stone-400 block mb-0.5">시공 면적</span>
            <span className="text-stone-200 block">{project.area}</span>
          </div>
          <div>
            <span className="text-stone-400 block mb-0.5">공사 기간</span>
            <span className="text-stone-200 block">{project.period}</span>
          </div>
        </div>

        {/* Story */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider">
            SPACE DESIGN STORY
          </h4>
          <p className="text-sm text-stone-300 leading-relaxed font-light">
            {project.summary}
          </p>
        </div>

        {/* Key Features */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider">
            KEY ARCHITECTURAL HIGHLIGHTS
          </h4>
          <ul className="space-y-2">
            {project.features.map((feat, idx) => (
              <li key={idx} className="flex items-start text-xs text-stone-300">
                <span className="text-amber-400 mr-2 font-mono font-bold">0{idx + 1}.</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Client Quote */}
        <div className="p-4 bg-amber-500/10 border-l-2 border-amber-400 rounded-r text-stone-200 text-xs italic leading-relaxed">
          {project.clientQuote}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
          <button
            onClick={() => {
              onClose();
              onConsult(project.title);
            }}
            className="flex-1 py-3.5 rounded-sm bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs tracking-widest uppercase transition-colors"
          >
            이 프로젝트 스타일로 상담 신청하기
          </button>
          <button
            onClick={onClose}
            className="px-6 py-3.5 rounded-sm bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-mono uppercase"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
