'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TERRA_PROJECTS } from '../data/terraData';
import { TerraProject } from '../types';

export default function TerraProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<TerraProject | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProjects = activeFilter === 'all'
    ? TERRA_PROJECTS
    : TERRA_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 bg-stone-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-4">
              Key Mega Land Development Works
            </div>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white">
              국가 전략 산업단지 · 메가 부지조성 실적 갤러리
            </h2>
            <p className="text-stone-400 text-base mt-2 max-w-2xl">
              100만평 미래 모빌리티 국가산단부터 스마트 중장비 머신가이던스 시공, 4련 지하 공동구, 연약지반 PBD 압밀까지 세종테라의 정밀 토공 실적입니다(예시).
            </p>
          </div>

          {/* 카테고리 필터 버튼 */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeFilter === 'all'
                  ? 'bg-amber-500 text-stone-950'
                  : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              전체 보기
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('smart-industrial')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeFilter === 'smart-industrial'
                  ? 'bg-amber-500 text-stone-950'
                  : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              스마트 산업단지
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('machine-guidance')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeFilter === 'machine-guidance'
                  ? 'bg-amber-500 text-stone-950'
                  : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              스마트 건설장비
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('utility-tunnel')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeFilter === 'utility-tunnel'
                  ? 'bg-amber-500 text-stone-950'
                  : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              지하 공동구
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('ground-improvement')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeFilter === 'ground-improvement'
                  ? 'bg-amber-500 text-stone-950'
                  : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              연약지반 개량
            </button>
          </div>
        </div>

        {/* 프로젝트 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-stone-900/80 rounded-2xl border border-stone-800 overflow-hidden group hover:border-amber-500/50 transition-all duration-300 shadow-xl flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-950">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-amber-500/90 text-stone-950 text-xs font-black shadow-lg">
                    {project.categoryLabel}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-medium text-amber-300 block mb-1">{project.location}</span>
                  <h3 className="text-xl font-black text-white">{project.title}</h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-stone-400 text-sm leading-relaxed mb-6">
                  {project.summary}
                </p>

                <div className="space-y-2 mb-6 border-t border-stone-800 pt-4 text-xs">
                  <div className="flex justify-between py-1">
                    <span className="text-stone-500">사업 규모 및 면적</span>
                    <span className="text-stone-200 font-bold">{project.scale}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-stone-500">공사 기간 및 성과</span>
                    <span className="text-amber-400 font-bold">{project.period}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-3 rounded-xl bg-stone-800 text-stone-200 font-bold text-xs hover:bg-amber-500 hover:text-stone-950 transition-colors border border-stone-700 hover:border-amber-500 flex items-center justify-center gap-2"
                >
                  <span>토공 기술 사양서 보기</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 프로젝트 상세 모달 */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  {selectedProject.categoryLabel}
                </span>
                <h3 className="text-2xl font-black text-white">{selectedProject.title}</h3>
                <span className="text-xs text-stone-400">{selectedProject.location}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-lg bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition-colors"
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6 bg-stone-950">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6 text-sm">
              <div>
                <h4 className="text-xs font-bold text-stone-400 uppercase mb-2">공사 개요</h4>
                <p className="text-stone-300 leading-relaxed">{selectedProject.summary}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-amber-400 uppercase mb-3">핵심 스마트 토목 기술 사양</h4>
                <div className="space-y-2">
                  {selectedProject.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2 bg-stone-950/60 p-3 rounded-lg border border-stone-800">
                      <span className="text-amber-400 font-bold shrink-0">✓</span>
                      <span className="text-stone-300 text-xs leading-relaxed">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2.5 rounded-xl bg-stone-800 text-white font-bold text-xs hover:bg-stone-700 transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
