'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { REMODELING_PROJECTS } from '../data/renewalData';
import { RemodelingProject } from '../types';

interface ProjectShowcaseProps {
  onOpenConsultation: () => void;
}

export default function ProjectShowcase({ onOpenConsultation }: ProjectShowcaseProps) {
  const [activeProject, setActiveProject] = useState<RemodelingProject>(REMODELING_PROJECTS[0]);

  return (
    <section id="section-projects" className="w-full bg-neutral-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest">
            VALUABLE PORTFOLIO
          </span>
          <h2 className="mt-3 font-mono text-2xl font-black text-white lg:text-4xl">
            도심 주요 권역 대수선 실적
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            테헤란로 업무지구, 종로 CBD 금융가, 도산대로 메디컬 특화거리, 성수동 크리에이티브 밸리까지
            건물의 입지와 상권에 최적화된 리모델링 솔루션을 제시합니다.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 lg:gap-3">
          {REMODELING_PROJECTS.map((project) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(project)}
              className={`rounded-lg px-4 py-2.5 font-mono text-xs font-bold transition-all ${
                activeProject.id === project.id
                  ? 'bg-cyan-500 text-neutral-950 shadow-md shadow-cyan-500/20'
                  : 'border border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700 hover:text-white'
              }`}
            >
              {project.name.split(' ')[0]} {project.name.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Active Project Detail Card */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left Image Area */}
            <div className="relative h-[320px] lg:col-span-7 lg:h-auto">
              <Image
                src={activeProject.afterImage}
                alt={activeProject.name}
                fill
                sizes="(max-width: 1024px) 100vw, 650px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent lg:hidden" />
              <div className="absolute bottom-4 left-4 rounded bg-neutral-950/80 px-3 py-1 font-mono text-xs font-bold text-cyan-400 backdrop-blur-md">
                {activeProject.remodeledYear}
              </div>
            </div>

            {/* Right Information Area */}
            <div className="p-6 lg:col-span-5 lg:p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-neutral-500">
                  {activeProject.location}
                </span>
                <h3 className="mt-1 font-mono text-xl font-bold text-white">
                  {activeProject.name}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-neutral-300">
                  {activeProject.summary}
                </p>

                {/* Specs Table */}
                <div className="mt-6 space-y-2 rounded-lg border border-neutral-800 bg-neutral-950/60 p-4 font-mono text-xs">
                  <div className="flex justify-between border-b border-neutral-800/60 pb-1.5">
                    <span className="text-neutral-500">기존 건립</span>
                    <span className="text-neutral-300">{activeProject.builtYear}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-800/60 pb-1.5">
                    <span className="text-neutral-500">연면적 / 규모</span>
                    <span className="text-neutral-300">{activeProject.gfa} · {activeProject.floors}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-800/60 pb-1.5">
                    <span className="text-neutral-500">대수선 공사 범위</span>
                    <span className="text-right text-cyan-400 font-semibold">{activeProject.scope}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-neutral-500">자산 가치 상승 효과</span>
                    <span className="text-emerald-400 font-bold">{activeProject.valueIncrease}</span>
                  </div>
                </div>

                {/* Key Features */}
                <div className="mt-6">
                  <h4 className="font-mono text-xs font-bold text-neutral-400">주요 엔지니어링 특징</h4>
                  <ul className="mt-2 space-y-1.5 text-xs text-neutral-300">
                    {activeProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-8 pt-4 border-t border-neutral-800/80">
                <button
                  onClick={onOpenConsultation}
                  className="w-full rounded-lg bg-neutral-800 py-3 font-mono text-xs font-bold text-cyan-300 transition-colors hover:bg-neutral-700 hover:text-cyan-200"
                >
                  이 프로젝트와 유사한 건물 진단 문의하기 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
