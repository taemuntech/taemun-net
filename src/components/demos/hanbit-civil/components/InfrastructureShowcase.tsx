'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CIVIL_PROJECTS } from '../data/civilData';
import { CivilProject } from '../types';

interface InfrastructureShowcaseProps {
  onOpenConsultation: () => void;
}

export default function InfrastructureShowcase({ onOpenConsultation }: InfrastructureShowcaseProps) {
  const [filter, setFilter] = useState<'all' | 'bridge' | 'tunnel' | 'highway'>('all');

  const filteredProjects = filter === 'all'
    ? CIVIL_PROJECTS
    : CIVIL_PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="section-projects" className="w-full bg-neutral-900 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest">
              INFRASTRUCTURE ARCHIVE
            </span>
            <h2 className="mt-3 font-mono text-2xl font-black text-white lg:text-4xl">
              대한민국 랜드마크 메가 인프라 완공 실적
            </h2>
            <p className="mt-2 text-sm text-neutral-400">
              해상 사장교부터 대심도 철도 터널까지 국토 균형 발전과 물류 대동맥을 완성한 한빛토목의 대표 현장입니다.
            </p>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-amber-500 text-neutral-950 font-bold'
                  : 'border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
              }`}
            >
              전체 인프라
            </button>
            <button
              onClick={() => setFilter('bridge')}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                filter === 'bridge'
                  ? 'bg-amber-500 text-neutral-950 font-bold'
                  : 'border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
              }`}
            >
              장대 교량
            </button>
            <button
              onClick={() => setFilter('tunnel')}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                filter === 'tunnel'
                  ? 'bg-amber-500 text-neutral-950 font-bold'
                  : 'border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
              }`}
            >
              대심도 터널
            </button>
            <button
              onClick={() => setFilter('highway')}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                filter === 'highway'
                  ? 'bg-amber-500 text-neutral-950 font-bold'
                  : 'border border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
              }`}
            >
              고속도로 토공
            </button>
          </div>
        </div>

        {/* Project Cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {filteredProjects.map((project: CivilProject) => (
            <div
              key={project.id}
              className="group overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950 shadow-xl transition-all hover:border-amber-500/40"
            >
              {/* Image */}
              <div className="relative h-64 w-full overflow-hidden bg-neutral-950">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 rounded bg-neutral-950/80 px-3 py-1 font-mono text-xs font-bold text-amber-400 backdrop-blur-md">
                  {project.categoryLabel}
                </div>
                <div className="absolute bottom-4 right-4 rounded bg-neutral-950/80 px-3 py-1 font-mono text-xs text-neutral-300 backdrop-blur-md">
                  {project.period}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 lg:p-8">
                <span className="font-mono text-xs text-neutral-500">{project.location}</span>
                <h3 className="mt-1 font-mono text-xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-neutral-300">
                  {project.summary}
                </p>

                {/* Specs */}
                <div className="mt-5 flex flex-wrap gap-4 border-t border-neutral-800/80 pt-4 font-mono text-xs">
                  <div>
                    <span className="text-neutral-500">연장:</span>{' '}
                    <strong className="text-white font-normal">{project.length}</strong>
                  </div>
                  <div>
                    <span className="text-neutral-500">구조 형식:</span>{' '}
                    <strong className="text-amber-300 font-normal">{project.structureType}</strong>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mt-4">
                  <span className="font-mono text-[11px] font-bold text-neutral-400">주요 엔지니어링 특징</span>
                  <ul className="mt-2 space-y-1 text-xs text-neutral-300">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-400">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="mt-6 pt-4 border-t border-neutral-800/80">
                  <button
                    onClick={onOpenConsultation}
                    className="w-full rounded bg-neutral-900 py-2.5 font-mono text-xs font-bold text-amber-400 transition-colors hover:bg-neutral-800 hover:text-amber-300"
                  >
                    이 프로젝트와 유사한 인프라 협력 문의 →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
