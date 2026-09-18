'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { METRO_PROJECTS } from '../data/metroData';
import { MetroProject } from '../types';

interface PortfolioShowcaseProps {
  onOpenConsultation: () => void;
}

export default function PortfolioShowcase({ onOpenConsultation }: PortfolioShowcaseProps) {
  const [filter, setFilter] = useState<'all' | 'corporate' | 'knowledge-center' | 'rnd-facility'>('all');

  const filteredProjects = filter === 'all'
    ? METRO_PROJECTS
    : METRO_PROJECTS.filter((p) => p.category === filter);

  return (
    <section id="section-portfolio" className="w-full bg-slate-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="font-mono text-xs font-bold text-blue-400 uppercase tracking-widest">
              PROVEN MASTERPIECES
            </span>
            <h2 className="mt-3 font-mono text-2xl font-black text-white lg:text-4xl">
              주요 사옥 &amp; 복합 지식산업센터 완공 실적
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              판교, 마곡, 가산 등 대한민국 핵심 비즈니스 클러스터에 세워진 메트로종합건설의 대표 시공 프로젝트입니다.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              전체 실적
            </button>
            <button
              onClick={() => setFilter('corporate')}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                filter === 'corporate'
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              기업 본사 사옥
            </button>
            <button
              onClick={() => setFilter('knowledge-center')}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                filter === 'knowledge-center'
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              지식산업센터
            </button>
            <button
              onClick={() => setFilter('rnd-facility')}
              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold transition-all ${
                filter === 'rnd-facility'
                  ? 'bg-blue-600 text-white'
                  : 'border border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              R&amp;D 연구소
            </button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {filteredProjects.map((project: MetroProject) => (
            <div
              key={project.id}
              className="group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl transition-all hover:border-blue-500/40"
            >
              {/* Image Preview */}
              <div className="relative h-64 w-full overflow-hidden bg-slate-950">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 rounded bg-slate-950/80 px-3 py-1 font-mono text-xs font-bold text-blue-400 backdrop-blur-md">
                  {project.categoryLabel}
                </div>
                <div className="absolute bottom-4 right-4 rounded bg-slate-950/80 px-3 py-1 font-mono text-xs text-slate-300 backdrop-blur-md">
                  {project.duration}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 lg:p-8">
                <span className="font-mono text-xs text-slate-400">{project.location}</span>
                <h3 className="mt-1 font-mono text-xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-slate-300">
                  {project.summary}
                </p>

                {/* Specs */}
                <div className="mt-5 flex flex-wrap gap-4 border-t border-slate-800/80 pt-4 font-mono text-xs text-slate-400">
                  <div>
                    <span className="text-slate-400">연면적:</span>{' '}
                    <strong className="text-white font-normal">{project.gfa}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">층수:</span>{' '}
                    <strong className="text-white font-normal">{project.floors}</strong>
                  </div>
                </div>

                {/* Highlights */}
                <div className="mt-4">
                  <span className="font-mono text-[11px] font-bold text-slate-400">핵심 시공 하이라이트</span>
                  <ul className="mt-2 space-y-1 text-xs text-slate-300">
                    {project.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-blue-400">✓</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="mt-6 pt-4 border-t border-slate-800/80">
                  <button
                    onClick={onOpenConsultation}
                    className="w-full rounded bg-slate-800 py-2.5 font-mono text-xs font-bold text-blue-400 transition-colors hover:bg-slate-700 hover:text-blue-300"
                  >
                    이 프로젝트와 유사한 턴키 견적 문의하기 →
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
