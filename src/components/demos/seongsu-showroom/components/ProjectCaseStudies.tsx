'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { PROJECT_CASES } from '../data/showroomData';
import { ProjectCase } from '../types';

interface ProjectCaseStudiesProps {
  onSelectProject: (project: ProjectCase) => void;
}

export const ProjectCaseStudies: React.FC<ProjectCaseStudiesProps> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState<'All' | 'Retail' | 'F&B' | 'Lounge' | 'Showroom'>('All');

  const filteredProjects =
    filter === 'All'
      ? PROJECT_CASES
      : PROJECT_CASES.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-[#0d0e11] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header & Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
              COMMERCIAL ARCHIVE & STORIES
            </span>
            <h2 className="font-serif text-2xl lg:text-4xl font-normal text-stone-100 mt-2">
              상업 공간 프로젝트 케이스 스터디
            </h2>
            <p className="text-stone-400 text-sm mt-2">
              설계 초기 컨셉 기획부터 현장 감리, 마감 시공까지 완수한 대표적인 상업 공간들입니다.
            </p>
            <p className="text-stone-500 text-xs mt-1.5">
              아래 사례·면적·기간·후기는 가상 스튜디오 설정으로 지어낸 예시이며 실제 시공 실적이 아닙니다.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 mt-6 lg:mt-0">
            {(['All', 'Retail', 'F&B', 'Lounge', 'Showroom'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
                className={`inline-flex items-center justify-center max-lg:min-h-11 px-4 py-2 rounded-sm text-xs font-mono tracking-wider transition-all ${
                  filter === cat
                    ? 'bg-amber-500 text-stone-950 font-bold'
                    : 'bg-stone-900 text-stone-400 hover:text-white border border-white/5'
                }`}
              >
                {cat === 'All' ? '전체 보기' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => onSelectProject(project)}
              aria-label={`${project.title} 상세 스토리 보기`}
              className="group text-left w-full cursor-pointer rounded-sm bg-stone-900/40 border border-white/10 hover:border-amber-400/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400 overflow-hidden transition-all duration-300 flex flex-col justify-between"
            >
              {/* 사진 자리 — 전용 사진이 있을 때만 사진을 쓰고, 없으면 개념 판(타이포)을 그린다.
                  다른 구역 사진을 돌려 쓰면 「우리 쇼룸」이 「남의 시공 사례」가 되어 버린다. */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-950">
                {project.thumbnailUrl ? (
                  <>
                    <Image
                      src={project.thumbnailUrl}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1023px) 100vw, 45vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  </>
                ) : (
                  <>
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[linear-gradient(135deg,#1b1c20_0%,#111216_55%,#191a1e_100%)]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-[0.18] bg-[repeating-linear-gradient(135deg,transparent_0px,transparent_9px,rgba(245,197,110,0.5)_9px,rgba(245,197,110,0.5)_10px)]"
                    />
                    <span className="absolute top-4 right-4 px-2 py-1 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-stone-400 tracking-wider">
                      가상 사례 · 시공 사진 없음
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  </>
                )}

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-amber-300 text-xs font-mono border border-white/10">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-black/70 backdrop-blur-md text-stone-300 text-xs font-mono border border-white/10">
                    {project.year}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-mono text-amber-400/90 block mb-1">
                    {project.concept}
                  </span>
                  <h3 className="font-serif text-lg lg:text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <p className="text-stone-300 text-xs lg:text-sm leading-relaxed font-light">
                  {project.summary}
                </p>

                {/* Meta details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 text-[11px] font-mono py-3 border-y border-white/5 text-stone-400">
                  <div>
                    <span className="text-stone-400 block">위치</span>
                    <span className="text-stone-200 block [word-break:keep-all]">{project.location}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">시공 면적</span>
                    <span className="text-stone-200 block">{project.area}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">공사 기간</span>
                    <span className="text-stone-200 block">{project.period}</span>
                  </div>
                </div>

                {/* Features Pill */}
                <div className="space-y-1.5 pt-1">
                  {project.features.slice(0, 2).map((feat, i) => (
                    <div key={i} className="flex items-start text-xs text-stone-300">
                      <span className="w-1.5 h-1.5 mt-1.5 rounded-full bg-amber-400/80 mr-2 shrink-0" />
                      <span className="line-clamp-2 [word-break:keep-all]">{feat}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 flex items-center justify-between text-xs font-mono text-amber-400 group-hover:underline">
                  <span className="text-left [word-break:keep-all]">프로젝트 상세 스토리 및 고객 후기 보기</span>
                  <span className="pl-2 shrink-0">→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
