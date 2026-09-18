'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { imageCropStyle, ProjectItem } from '../types';

interface SelectedWorksSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const SelectedWorksSection: React.FC<SelectedWorksSectionProps> = ({
  onSelectProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All Archival');

  const categories = [
    'All Archival',
    'Luxury Residential',
    'Commercial Lounge',
    'Workspace',
  ];

  const filteredProjects =
    activeCategory === 'All Archival'
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section
      className="py-16 lg:py-24 bg-[#0d0e10] border-y border-white/10 scroll-mt-[calc(var(--sample-bar-h,0px)_+_80px)]"
      id="selected-works"
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-16">
        {/* Header & Category Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16">
          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#c5a880] mb-2 block font-semibold">
              Curated Portfolio Archive
            </span>
            <h2 className="text-3xl lg:text-4xl font-serif text-[#f4efea] break-keep [word-break:keep-all]">
              Selected Works
            </h2>
            <p className="text-[15px] text-[#d1c5b8] mt-2 max-w-xl font-light leading-relaxed">
              절제된 비례와 하이엔드 물성의 결합. 주거와 상업 공간의 경계를 넘나드는 대표 프로젝트 셀렉션.
            </p>
            {/* 형제 데모(seongsu-showroom·atelier-vaucluse)와 같은 자리에 같은 고지를 둔다 —
                위치·면적·공사 기간이 붙어 있어 예시 표시가 없으면 실제 시공 실적으로 읽힌다. */}
            <p className="text-xs text-[#998f83] mt-1.5 max-w-xl leading-relaxed">
              아래 프로젝트명·위치·면적·공사 기간·연도는 가상 브랜드 설정으로 지어낸 예시이며 실제 시공 실적이 아닙니다.
            </p>
          </div>

          {/* Rectilinear Category Badges */}
          <div className="flex flex-wrap gap-2 mt-6 lg:mt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                aria-pressed={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs min-h-11 px-4 py-2 uppercase tracking-wider transition cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#c5a880] text-[#121315] font-semibold'
                    : 'bg-[#1b1c1e] text-[#d1c5b8] border border-white/10 hover:border-[#c5a880]/50 hover:text-[#f4efea]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4 High Aesthetic Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="group bg-[#1b1c1e] border border-white/10 p-6 flex flex-col justify-between hover:border-[#c5a880]/60 transition-all duration-300 shadow-xl"
            >
              <div>
                <div
                  role="button"
                  tabIndex={0}
                  aria-label={`${project.title} 상세 보기`}
                  onClick={() => onSelectProject(project)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onSelectProject(project);
                    }
                  }}
                  className="relative aspect-[16/10] overflow-hidden bg-[#121315] mb-6 cursor-pointer"
                >
                  {/* 확대 연출과 원본 잘라내기가 같은 scale 유틸리티를 쓰면 hover 때 잘라낸 부분이
                      다시 드러난다 — 바깥 상자가 확대를 맡고 img 는 잘라내기만 맡게 나눈다 */}
                  <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      style={imageCropStyle(project.imageCrop)}
                    />
                  </div>
                  <span className="absolute top-4 left-4 z-10 bg-[#0d0e10]/90 border border-white/15 text-[#f4efea] text-[11px] px-3 py-1 uppercase tracking-wider">
                    {project.koreanCategory}
                  </span>
                  <span className="absolute bottom-4 right-4 z-10 bg-[#0d0e10]/80 text-[#d1c5b8] text-[11px] px-2.5 py-1 font-mono">
                    {project.completionYear}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs text-[#c5a880] uppercase tracking-widest font-medium">
                    {project.location}
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-xs text-[#998f83]">{project.subtitle}</span>
                </div>

                <h3
                  onClick={() => onSelectProject(project)}
                  className="text-xl font-serif text-[#f4efea] group-hover:text-[#c5a880] transition-colors cursor-pointer"
                >
                  {project.title}
                </h3>
                <p className="text-sm text-[#d1c5b8] mt-2 font-light leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-[#998f83]">{project.materialsUsed}</span>
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="text-xs tracking-wider uppercase text-[#c5a880] flex min-h-11 items-center gap-1.5 hover:text-[#f4efea] transition cursor-pointer"
                >
                  <span>View Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
