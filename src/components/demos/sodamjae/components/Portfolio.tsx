"use client";

import React, { useState } from 'react';
import { PROJECTS } from '../data/hanokData';
import { Project } from '../types';
import { Maximize2 } from 'lucide-react';

interface PortfolioProps {
  onSelectProject: (project: Project) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectProject }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('전체');

  const filterTabs = [
    { label: '전체 완공작', value: '전체' },
    { label: '단독 살림집', value: '살림집' },
    { label: '별서·세컨하우스', value: '별서·세컨하우스' },
    { label: '도심형 및 갤러리', value: '도심형 한옥' },
  ];

  const filteredProjects = selectedFilter === '전체'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedFilter || (selectedFilter === '도심형 한옥' && (p.category === '도심형 한옥' || p.category === '한옥 갤러리·카페')));

  return (
    <section id="projects" className="py-16 lg:py-24 border-b border-[#c8c7bf]/30 bg-[#faf9f7]">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-semibold text-[#904b35] uppercase tracking-wider block mb-2 font-mono">
              Selected Works Archive
            </span>
            <h2 className="font-serif text-3xl lg:text-[2.75rem] text-[#161714] font-normal tracking-tight">
              소담재 주요 완공 한옥작
            </h2>
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => {
              const isSelected = selectedFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  id={`filter-tab-${tab.value}`}
                  onClick={() => setSelectedFilter(tab.value)}
                  className={`px-4 py-2 rounded-xs text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#161714] text-[#faf9f7] shadow-xs'
                      : 'border border-[#c8c7bf] bg-transparent text-[#474741] hover:bg-[#efeeec]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Major Selected Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              id={`project-article-${project.id}`}
              onClick={() => onSelectProject(project)}
              className="group cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden rounded-xs bg-[#e9e8e6] border border-[#c8c7bf]/40 mb-4 lg:mb-5 relative shadow-2xs">
                  <img
                    src={project.imageUrl}
                    alt={`${project.name} (${project.hanjaName})`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3.5 left-3.5 bg-[#faf9f7]/95 backdrop-blur-md px-3 py-1 rounded-xs text-[11px] font-sans font-medium text-[#161714] border border-[#c8c7bf]/40 shadow-xs">
                    {project.categoryLabel}
                  </div>

                  {/* Expand Overlay on Hover */}
                  <div className="absolute inset-0 bg-[#161714]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-[#faf9f7]/95 backdrop-blur-sm text-[#161714] text-xs font-medium px-4 py-2 rounded-xs flex items-center gap-1.5 shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <Maximize2 className="w-3.5 h-3.5 text-[#904b35]" />
                      <span>건축 상세 및 평면 열람</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#777770] font-sans mb-1.5">
                  <span>{project.location} · {project.year}</span>
                  <span className="font-mono">{project.area}</span>
                </div>

                <h3 className="font-serif text-xl lg:text-2xl text-[#161714] group-hover:text-[#904b35] transition-colors mb-2 font-medium">
                  {project.name} <span className="text-base text-[#777770] font-light">({project.hanjaName})</span>
                </h3>

                <p className="text-xs lg:text-sm text-[#474741] leading-relaxed mb-4 font-light">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#c8c7bf]/20">
                {project.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] px-2.5 py-1 bg-[#efeeec] rounded-xs text-[#474741] font-sans"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
