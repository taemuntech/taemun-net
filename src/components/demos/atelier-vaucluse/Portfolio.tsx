'use client';

import React, { useState, useMemo } from 'react';
import { Project, ProjectCategory } from './types';
import { PROJECTS } from './data/projects';
import { ArrowUpRight } from 'lucide-react';

interface PortfolioProps {
  onSelectProject: (project: Project) => void;
  onOpenMaterialArchive: () => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({
  onSelectProject,
  onOpenMaterialArchive,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="py-24 border-b border-[#c8c7bf]/20 bg-[#faf9f7]" id="portfolio">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header & Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 lg:mb-12 gap-6">
          <div className="shrink-0">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#904b35] block mb-2 font-sans">
              Selected Works
            </span>
            <h2 className="text-3xl lg:text-5xl font-serif font-normal text-[#161714] tracking-[-0.015em] break-keep [word-break:keep-all]">
              대표 프로젝트 아카이브
            </h2>
          </div>

          {/* Category Filter Tabs: Horizontal swipe scroll on mobile, wrap on desktop */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 -mx-6 px-6 lg:mx-0 lg:px-0 lg:pb-0 lg:flex-wrap">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded text-xs uppercase tracking-wider font-sans transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-[#161714] text-[#faf9f7] border border-[#161714]'
                  : 'bg-[#faf9f7] text-[#474741] hover:text-[#161714] border border-[#c8c7bf]/40'
              }`}
            >
              전체 (All)
            </button>
            <button
              onClick={() => setActiveCategory('residential')}
              className={`px-4 py-2 rounded text-xs uppercase tracking-wider font-sans transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === 'residential'
                  ? 'bg-[#161714] text-[#faf9f7] border border-[#161714]'
                  : 'bg-[#faf9f7] text-[#474741] hover:text-[#161714] border border-[#c8c7bf]/40'
              }`}
            >
              주거 공간 (Residential)
            </button>
            <button
              onClick={() => setActiveCategory('commercial')}
              className={`px-4 py-2 rounded text-xs uppercase tracking-wider font-sans transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === 'commercial'
                  ? 'bg-[#161714] text-[#faf9f7] border border-[#161714]'
                  : 'bg-[#faf9f7] text-[#474741] hover:text-[#161714] border border-[#c8c7bf]/40'
              }`}
            >
              상업 공간 (Commercial)
            </button>
            <button
              onClick={() => setActiveCategory('renovation')}
              className={`px-4 py-2 rounded text-xs uppercase tracking-wider font-sans transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                activeCategory === 'renovation'
                  ? 'bg-[#161714] text-[#faf9f7] border border-[#161714]'
                  : 'bg-[#faf9f7] text-[#474741] hover:text-[#161714] border border-[#c8c7bf]/40'
              }`}
            >
              리노베이션 (Renovation)
            </button>
          </div>
        </div>

        {/* Mobile Swipe Notice */}
        <div className="flex lg:hidden items-center justify-between text-xs text-[#777770] font-sans mb-3 px-1">
          <span>{filteredProjects.length}개 프로젝트 컬렉션</span>
          <span className="flex items-center gap-1 font-mono text-[11px] text-[#904b35]">
            좌우 스와이프 &rarr;
          </span>
        </div>

        {/* Editorial Project Showcase: Mobile Horizontal Swipe Carousel & Desktop 3-col Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-6 px-6 scrollbar-none lg:grid lg:grid-cols-3 lg:gap-8 lg:mx-0 lg:px-0">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="w-[84vw] shrink-0 snap-center lg:w-auto group cursor-pointer flex flex-col"
            >
              <div className="aspect-[4/5] overflow-hidden rounded bg-[#efeeec] relative mb-4 border border-[#c8c7bf]/20 shadow-xs">
                <img
                  referrerPolicy="no-referrer"
                  src={project.imageUrl}
                  alt={project.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

                {/* Project Index Badge */}
                <div className="absolute top-4 left-4 bg-[#161714]/85 backdrop-blur text-[#faf9f7] px-3 py-1 rounded text-[11px] font-sans tracking-widest font-medium">
                  {project.index}
                </div>

                {/* Hover overlay hint */}
                <div className="absolute bottom-4 right-4 bg-[#faf9f7]/95 backdrop-blur text-[#161714] px-3 py-1.5 rounded text-xs font-sans font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                  <span>상세 보기</span>
                  <ArrowUpRight size={13} className="text-[#904b35]" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-[#474741] tracking-wider font-sans">
                  <span>{project.location}</span>
                  <span>{project.year} / {project.area}</span>
                </div>

                <h3 className="text-xl lg:text-2xl font-serif text-[#161714] group-hover:text-[#904b35] transition-colors leading-snug break-keep [word-break:keep-all]">
                  {project.title}
                </h3>

                <p className="text-xs lg:text-sm text-[#474741] font-sans font-light line-clamp-1 break-keep [word-break:keep-all]">
                  {project.subtitle}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* View All & Material Details CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <button
            onClick={onOpenMaterialArchive}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#161714] hover:text-[#904b35] border-b border-[#161714] hover:border-[#904b35] pb-1 transition-colors cursor-pointer break-keep [word-break:keep-all]"
          >
            <span>모든 프로젝트 및 마감재 디테일 보기</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};
