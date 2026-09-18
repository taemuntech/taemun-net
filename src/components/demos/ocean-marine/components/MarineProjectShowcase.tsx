'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MARINE_PROJECTS } from '../data/marineData';
import { MarineProject } from '../types';

export default function MarineProjectShowcase() {
  const [selectedProject, setSelectedProject] = useState<MarineProject | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProjects = activeFilter === 'all'
    ? MARINE_PROJECTS
    : MARINE_PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-24 bg-slate-950 text-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-semibold tracking-wider uppercase mb-4">
              Key Maritime &amp; Harbor Works
            </div>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight text-white">
              국가 기간 무역항 · 외해 방파제 실적 갤러리
            </h2>
            <p className="text-slate-400 text-base mt-2 max-w-2xl">
              24,000 TEU 스마트 안벽 부두부터 외해 12,000톤 케이슨 방파제, 80톤 TTP 소파블록 호안, 펌프 준설 매립까지 오션마린의 정밀 해양 토목 실적입니다(예시).
            </p>
          </div>

          {/* 카테고리 필터 버튼 */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeFilter === 'all'
                  ? 'bg-sky-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              전체 보기
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('container-quay')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeFilter === 'container-quay'
                  ? 'bg-sky-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              스마트 안벽 부두
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('caisson-breakwater')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeFilter === 'caisson-breakwater'
                  ? 'bg-sky-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              외해 케이슨 방파제
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('ttp-protection')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeFilter === 'ttp-protection'
                  ? 'bg-sky-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              초대형 TTP 호안
            </button>
            <button
              type="button"
              onClick={() => setActiveFilter('dredging-reclamation')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                activeFilter === 'dredging-reclamation'
                  ? 'bg-sky-500 text-slate-950'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              해상 준설 매립
            </button>
          </div>
        </div>

        {/* 프로젝트 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-900/80 rounded-2xl border border-slate-800 overflow-hidden group hover:border-sky-500/50 transition-all duration-300 shadow-xl flex flex-col"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-sky-500/90 text-slate-950 text-xs font-black shadow-lg">
                    {project.categoryLabel}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-xs font-medium text-sky-300 block mb-1">{project.location}</span>
                  <h3 className="text-xl font-black text-white">{project.title}</h3>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {project.summary}
                </p>

                <div className="space-y-2 mb-6 border-t border-slate-800 pt-4 text-xs">
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">시설 규모 및 수심</span>
                    <span className="text-slate-200 font-bold">{project.scale}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">공사 기간 및 성과</span>
                    <span className="text-sky-400 font-bold">{project.period}</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="w-full py-3 rounded-xl bg-slate-800 text-slate-200 font-bold text-xs hover:bg-sky-500 hover:text-slate-950 transition-colors border border-slate-700 hover:border-sky-500 flex items-center justify-center gap-2"
                >
                  <span>해양 기술 사양서 보기</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 프로젝트 상세 모달 */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">
                  {selectedProject.categoryLabel}
                </span>
                <h3 className="text-2xl font-black text-white">{selectedProject.title}</h3>
                <span className="text-xs text-slate-400">{selectedProject.location}</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-[16/9] rounded-xl overflow-hidden mb-6 bg-slate-950">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="space-y-6 text-sm">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">공사 개요</h4>
                <p className="text-slate-300 leading-relaxed">{selectedProject.summary}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-sky-400 uppercase mb-3">핵심 해양 토목 기술 사양</h4>
                <div className="space-y-2">
                  {selectedProject.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2 bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                      <span className="text-sky-400 font-bold shrink-0">✓</span>
                      <span className="text-slate-300 text-xs leading-relaxed">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 transition-colors"
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
