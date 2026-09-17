'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { LANDMARK_PROJECTS } from '../data/strataData';
import { LandmarkProject } from '../types';

export default function LandmarkShowcase() {
  const [activeProject, setActiveProject] = useState<LandmarkProject>(LANDMARK_PROJECTS[0]);

  return (
    <section id="landmarks" className="relative w-full border-t border-slate-800 bg-slate-950 py-16 text-white lg:py-24">
      {/* 배경 장식 선 */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* 섹션 헤더 */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded border border-amber-500/40 bg-amber-500/10 px-3 py-1 font-mono text-xs text-amber-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
            <span>MEGA STRUCTURE LANDMARKS</span>
          </div>
          <h2 className="mt-3 text-2xl font-black tracking-tight text-white lg:text-4xl">
            도시의 스카이라인을 바꾼 스트라타 3대 메가 랜드마크
          </h2>
          <p className="mt-3 text-sm text-slate-400 lg:text-base">
            초고층 복합 타워부터 지하 대공간 환승 인프라, 초평탄 스마트 물류 플랜트까지 종합건설 실적을 확인해 보세요.
          </p>
        </div>

        {/* 3대 프로젝트 탭 셀렉터 */}
        <div className="mb-8 grid grid-cols-1 gap-3 lg:grid-cols-3">
          {LANDMARK_PROJECTS.map((proj) => {
            const isSelected = activeProject.id === proj.id;
            return (
              <button
                key={proj.id}
                onClick={() => setActiveProject(proj)}
                className={`rounded-lg border p-4 text-left transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="font-mono text-[11px] text-amber-400">{proj.type}</div>
                <h3 className="mt-1 text-sm font-bold text-white lg:text-base">{proj.name}</h3>
                <div className="mt-2 flex items-center gap-2 font-mono text-xs text-slate-400">
                  <span>{proj.location}</span>
                  <span>·</span>
                  <span>{proj.gfa.split('(')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 선택된 프로젝트 상세 쇼케이스 */}
        <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-slate-800 bg-slate-900/90 shadow-2xl lg:grid-cols-12">
          {/* 좌측: 대형 비주얼 뷰포트 (7열) */}
          <div className="relative min-h-[350px] lg:col-span-7 lg:min-h-[480px]">
            <Image
              src={activeProject.image}
              alt={activeProject.name}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

            {/* 비주얼 오버레이 배지 */}
            <div className="absolute top-4 left-4 rounded bg-slate-950/80 px-3 py-1 font-mono text-xs text-amber-400 backdrop-blur-md border border-amber-500/40">
              STRUCTURAL SYSTEM: {activeProject.structuralSystem.split('+')[0]}
            </div>

            <div className="absolute bottom-4 left-4 right-4 rounded bg-slate-950/85 p-4 backdrop-blur-md border border-slate-800">
              <div className="font-mono text-xs text-amber-400">{activeProject.location}</div>
              <h3 className="text-lg font-bold text-white lg:text-xl">{activeProject.name}</h3>
              <p className="mt-1.5 text-xs text-slate-300 lg:text-sm">{activeProject.summary}</p>
            </div>
          </div>

          {/* 우측: 정밀 스펙 시트 & 핵심 기술 (5열) */}
          <div className="flex flex-col justify-between p-6 lg:col-span-5">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="font-mono text-xs text-amber-400">PROJECT METRICS</span>
                <span className="font-mono text-xs text-slate-400">{activeProject.period}</span>
              </div>

              {/* 스펙 테이블 */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-[11px] text-slate-400">규모 / 층수</div>
                  <div className="mt-0.5 font-mono text-xs font-bold text-white">{activeProject.floors}</div>
                </div>
                <div className="rounded border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-[11px] text-slate-400">연면적</div>
                  <div className="mt-0.5 font-mono text-xs font-bold text-white">{activeProject.gfa}</div>
                </div>
                <div className="rounded border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-[11px] text-slate-400">최고 높이 / 심도</div>
                  <div className="mt-0.5 font-mono text-xs font-bold text-white">{activeProject.height}</div>
                </div>
                <div className="rounded border border-slate-800 bg-slate-950/60 p-3">
                  <div className="text-[11px] text-slate-400">공사 기간</div>
                  <div className="mt-0.5 font-mono text-xs font-bold text-white">{activeProject.period}</div>
                </div>
              </div>

              {/* 적용 핵심 시공 기술 */}
              <div className="mt-6">
                <h4 className="font-mono text-xs font-bold text-slate-200">KEY APPLIED TECHNOLOGIES</h4>
                <ul className="mt-3 space-y-2">
                  {activeProject.keyFeatures.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 구조 형식 요약 */}
            <div className="mt-6 border-t border-slate-800 pt-4">
              <div className="text-[11px] text-slate-400">구조 설계 및 특수 공법:</div>
              <div className="mt-1 font-mono text-xs text-amber-300">{activeProject.structuralSystem}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
