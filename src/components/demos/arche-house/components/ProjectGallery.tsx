'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { HOUSE_PROJECTS } from '../data/archeData';
import { HouseProject } from '../types';

export default function ProjectGallery() {
  const [activeProject, setActiveProject] = useState<HouseProject>(HOUSE_PROJECTS[0]);

  return (
    <section id="projects" className="w-full bg-stone-100 py-16 text-stone-900 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* 섹션 타이틀 */}
        <div className="mb-10 text-center">
          <p className="font-serif text-xs font-semibold tracking-widest text-amber-800 uppercase">
            Selected Works
          </p>
          <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-stone-900 lg:text-4xl">
            자연과 시간이 빚어낸 완공 프로젝트
          </h2>
          <p className="mt-3 text-sm text-stone-600 lg:text-base">
            대지의 조건과 건축주 가족의 고유한 삶의 방식을 담아 설계·시공한 대표 주거 작품들입니다.
          </p>
        </div>

        {/* 4대 프로젝트 선택 탭 */}
        <div className="mb-8 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {HOUSE_PROJECTS.map((proj) => {
            const isSelected = activeProject.id === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => setActiveProject(proj)}
                className={`rounded-sm border p-4 text-left transition-all ${
                  isSelected
                    ? 'border-stone-900 bg-white shadow-md'
                    : 'border-stone-300 bg-stone-50/60 hover:bg-white hover:border-stone-400'
                }`}
              >
                <span className="font-serif text-[10px] font-bold text-stone-400 uppercase">
                  {proj.type}
                </span>
                <h3 className="mt-1 font-serif text-xs font-bold text-stone-900 lg:text-sm">
                  {proj.name.split('(')[0]}
                </h3>
                <p className="mt-1 text-[11px] text-stone-500">{proj.year}</p>
              </button>
            );
          })}
        </div>

        {/* 선택된 프로젝트 메인 쇼케이스 (매거진 스타일 2열) */}
        <div className="overflow-hidden rounded-sm border border-stone-200 bg-white shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* 좌측: 대형 화보 뷰포트 (7열) */}
            <div className="relative min-h-[360px] bg-stone-900 lg:col-span-7 lg:min-h-[500px]">
              <Image
                src={activeProject.image}
                alt={activeProject.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-sm bg-stone-950/70 p-4 text-white backdrop-blur-sm">
                <span className="text-[11px] text-amber-300 font-medium">DESIGN CONCEPT</span>
                <p className="mt-1 font-serif text-sm font-medium leading-relaxed">
                  &ldquo;{activeProject.concept}&rdquo;
                </p>
              </div>
            </div>

            {/* 우측: 건축 개요 및 세부 특징 (5열) */}
            <div className="flex flex-col justify-between p-6 lg:col-span-5 lg:p-8">
              <div>
                <span className="font-serif text-xs font-semibold tracking-wider text-amber-800 uppercase">
                  {activeProject.type}
                </span>
                <h3 className="mt-1 font-serif text-xl font-bold text-stone-900 lg:text-2xl">
                  {activeProject.name}
                </h3>
                <p className="mt-1 text-xs text-stone-500">{activeProject.location}</p>

                <p className="mt-4 text-xs leading-relaxed text-stone-700 lg:text-sm">
                  {activeProject.summary}
                </p>

                {/* 건축 개요 스펙 그리드 */}
                <div className="mt-6 grid grid-cols-2 gap-3 border-y border-stone-200 py-4 text-xs">
                  <div>
                    <span className="text-stone-400">대지 면적</span>
                    <p className="font-medium text-stone-800">{activeProject.siteArea}</p>
                  </div>
                  <div>
                    <span className="text-stone-400">연면적 / 규모</span>
                    <p className="font-medium text-stone-800">{activeProject.gfa}</p>
                  </div>
                  <div>
                    <span className="text-stone-400">주요 구조</span>
                    <p className="font-medium text-stone-800">{activeProject.structure}</p>
                  </div>
                  <div>
                    <span className="text-stone-400">완공 시점</span>
                    <p className="font-medium text-stone-800">{activeProject.year}</p>
                  </div>
                </div>

                {/* 핵심 설계 포인트 */}
                <div className="mt-6">
                  <h4 className="font-serif text-xs font-bold text-stone-900 uppercase tracking-wider">
                    Key Architectural Points
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {activeProject.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-stone-900" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>설계 및 책임 감리: 아르케 건축사사무소</span>
                <span className="font-serif text-stone-900 font-bold">ARCHE ARCHITECTS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
