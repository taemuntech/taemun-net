'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { LOGIS_PROJECTS } from '../data/logisData';
import { LogisProject } from '../types';

interface LogisticsShowcaseProps {
  onOpenConsultation: () => void;
}

export default function LogisticsShowcase({ onOpenConsultation }: LogisticsShowcaseProps) {
  const [selectedProject, setSelectedProject] = useState<LogisProject>(LOGIS_PROJECTS[0]);

  return (
    <section id="section-projects" className="w-full bg-neutral-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest">
            LOGISTICS PORTFOLIO
          </span>
          <h2 className="mt-3 font-mono text-2xl font-black text-white lg:text-4xl">
            수도권 메가 물류 허브 완공 실적
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            용인, 이천, 안성 등 핵심 교통 요충지에 구축된 로지스파크의 대표 턴키 시공 프로젝트입니다.
          </p>
        </div>

        {/* Project Selector Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 lg:gap-3">
          {LOGIS_PROJECTS.map((project) => (
            <button
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className={`rounded-lg px-4 py-2.5 font-mono text-xs font-bold transition-all ${
                selectedProject.id === project.id
                  ? 'bg-cyan-500 text-neutral-950 shadow-md shadow-cyan-500/20'
                  : 'border border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-700 hover:text-white'
              }`}
            >
              {project.title.split(' ')[0]} {project.title.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Project Active Card */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Image */}
            <div className="relative h-[320px] lg:col-span-7 lg:h-auto">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 rounded bg-neutral-950/80 px-3 py-1 font-mono text-xs font-bold text-cyan-400 backdrop-blur-md">
                {selectedProject.typeLabel}
              </div>
            </div>

            {/* Info */}
            <div className="p-6 lg:col-span-5 lg:p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-neutral-500">
                  {selectedProject.location}
                </span>
                <h3 className="mt-1 font-mono text-xl font-bold text-white">
                  {selectedProject.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-neutral-300">
                  {selectedProject.summary}
                </p>

                {/* Specs Table */}
                <div className="mt-6 space-y-2 rounded-lg border border-neutral-800 bg-neutral-950/60 p-4 font-mono text-xs">
                  <div className="flex justify-between border-b border-neutral-800/60 pb-1.5">
                    <span className="text-neutral-500">연면적 / 규모</span>
                    <span className="text-white font-semibold">{selectedProject.gfa}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-800/60 pb-1.5">
                    <span className="text-neutral-500">층수 &amp; 접안</span>
                    <span className="text-slate-300 text-right">{selectedProject.floors}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-neutral-500">온도대 구성</span>
                    <span className="text-cyan-400 font-semibold text-right">{selectedProject.tempZones}</span>
                  </div>
                </div>

                {/* Key Specs */}
                <div className="mt-6">
                  <h4 className="font-mono text-xs font-bold text-neutral-400">주요 특화 시공</h4>
                  <ul className="mt-2 space-y-1.5 text-xs text-neutral-300">
                    {selectedProject.specs.map((spec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400">✓</span>
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 pt-4 border-t border-neutral-800/80">
                <button
                  onClick={onOpenConsultation}
                  className="w-full rounded-lg bg-neutral-800 py-3 font-mono text-xs font-bold text-cyan-300 transition-colors hover:bg-neutral-700 hover:text-cyan-200"
                >
                  이 프로젝트와 유사한 부지 시공 문의하기 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
