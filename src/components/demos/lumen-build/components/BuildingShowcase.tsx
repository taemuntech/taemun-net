'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { COMMERCIAL_BUILDINGS } from '../data/lumenData';
import { CommercialBuilding } from '../types';

export default function BuildingShowcase() {
  const [activeBuilding, setActiveBuilding] = useState<CommercialBuilding>(COMMERCIAL_BUILDINGS[0]);

  return (
    <section id="showcase" className="w-full bg-neutral-900 py-16 text-white lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* 섹션 헤더 */}
        <div className="mb-10 text-center">
          <p className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest">
            COMPLETED COMMERCIAL LANDMARKS
          </p>
          <h2 className="mt-2 font-mono text-2xl font-black tracking-tight text-white lg:text-4xl">
            상권의 흐름을 바꾼 루멘 빌드 대표 완공작
          </h2>
          <p className="mt-3 text-sm text-neutral-400 lg:text-base">
            성수동, 한남동, 연남동, 도산대로 등 서울 핵심 상권에서 검증된 꼬마빌딩 신축 및 대수선 실적입니다.
          </p>
        </div>

        {/* 4대 프로젝트 선택 탭 */}
        <div className="mb-8 grid grid-cols-2 gap-2 lg:grid-cols-4">
          {COMMERCIAL_BUILDINGS.map((bld) => {
            const isSelected = activeBuilding.id === bld.id;
            return (
              <button
                key={bld.id}
                onClick={() => setActiveBuilding(bld)}
                className={`rounded border p-4 text-left transition-all ${
                  isSelected
                    ? 'border-amber-500 bg-neutral-800 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                    : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:border-neutral-700 hover:text-white'
                }`}
              >
                <span className="font-mono text-[10px] text-amber-400 uppercase">
                  {bld.district.split(' ')[0]}
                </span>
                <h3 className="mt-1 font-mono text-xs font-bold text-white lg:text-sm">
                  {bld.name.split('(')[0]}
                </h3>
                <p className="mt-1 text-[11px] text-neutral-400">{bld.floors}</p>
              </button>
            );
          })}
        </div>

        {/* 선택된 빌딩 메인 쇼케이스 (2열 레이아웃) */}
        <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* 좌측: 대형 화보 뷰포트 (7열) */}
            <div className="relative min-h-[360px] bg-neutral-900 lg:col-span-7 lg:min-h-[520px]">
              <Image
                src={activeBuilding.image}
                alt={activeBuilding.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded bg-neutral-950/85 p-4 backdrop-blur-md border border-neutral-800">
                <span className="text-[11px] font-mono font-bold text-amber-400">FAÇADE CONCEPT</span>
                <p className="mt-1 text-xs text-neutral-200 lg:text-sm leading-relaxed">
                  &ldquo;{activeBuilding.concept}&rdquo;
                </p>
              </div>
            </div>

            {/* 우측: 건축 개요 및 MD 구성 (5열) */}
            <div className="flex flex-col justify-between p-6 lg:col-span-5 lg:p-8">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-amber-400">
                    {activeBuilding.district}
                  </span>
                  <span className="rounded bg-amber-500/20 px-2 py-0.5 font-mono text-xs font-bold text-amber-300 border border-amber-500/30">
                    수익률 {activeBuilding.rentalYield}
                  </span>
                </div>

                <h3 className="mt-2 font-mono text-lg font-bold text-white lg:text-xl">
                  {activeBuilding.name}
                </h3>
                <p className="mt-1 text-xs text-neutral-400">{activeBuilding.location}</p>

                <p className="mt-4 text-xs leading-relaxed text-neutral-300 lg:text-sm">
                  {activeBuilding.summary}
                </p>

                {/* 빌딩 개요 스펙 그리드 */}
                <div className="mt-6 grid grid-cols-2 gap-3 border-y border-neutral-800 py-4 text-xs">
                  <div>
                    <span className="text-neutral-500">대지 면적</span>
                    <p className="font-mono font-bold text-white mt-0.5">{activeBuilding.siteArea}</p>
                  </div>
                  <div>
                    <span className="text-neutral-500">연면적 / 규모</span>
                    <p className="font-mono font-bold text-white mt-0.5">{activeBuilding.gfa}</p>
                  </div>
                  <div className="col-span-2">
                    <span className="text-neutral-500">입점 테넌트 구성(MD)</span>
                    <p className="text-neutral-200 mt-0.5">{activeBuilding.mainTenants}</p>
                  </div>
                </div>

                {/* 핵심 설계 포인트 */}
                <div className="mt-5">
                  <h4 className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider">
                    COMMERCIAL VALUE-ADD POINTS
                  </h4>
                  <ul className="mt-2.5 space-y-2">
                    {activeBuilding.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span>DESIGN &amp; BUILD: LUMEN COMMERCIAL</span>
                <span className="text-amber-400 font-bold">VERIFIED REALIZED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
