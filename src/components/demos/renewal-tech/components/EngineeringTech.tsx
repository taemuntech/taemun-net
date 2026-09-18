'use client';

import React from 'react';
import Image from 'next/image';
import { RETROFIT_TECHS } from '../data/renewalData';

export default function EngineeringTech() {
  return (
    <section id="section-tech" className="w-full bg-neutral-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest">
            PATENTED RETROFIT TECH
          </span>
          <h2 className="mt-3 font-mono text-2xl font-black text-white lg:text-4xl">
            자산 가치를 바꾸는 핵심 엔지니어링 공법
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            신축 이상의 구조 안전성과 쾌적한 에너지 효율을 달성하는 리뉴얼테크만의 검증된 대수선 특화 기술입니다.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {RETROFIT_TECHS.map((tech) => (
            <div
              key={tech.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 transition-all hover:border-cyan-500/40 hover:bg-neutral-900"
            >
              {/* Image Preview */}
              <div className="relative h-52 w-full overflow-hidden bg-neutral-950">
                <Image
                  src={tech.image}
                  alt={tech.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3 rounded bg-neutral-950/80 px-2.5 py-1 font-mono text-[11px] font-semibold text-cyan-400 backdrop-blur-md">
                  {tech.category}
                </div>
              </div>

              {/* Body Content */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-mono text-lg font-bold text-white">
                    {tech.name}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-neutral-400">
                    {tech.description}
                  </p>
                </div>

                {/* Merits List */}
                <div className="mt-6 border-t border-neutral-800/80 pt-4">
                  <span className="font-mono text-[11px] font-bold text-neutral-500">핵심 시공 강점</span>
                  <ul className="mt-2 space-y-1.5 font-mono text-xs text-neutral-300">
                    {tech.merits.map((merit, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-cyan-400">⚡</span>
                        <span>{merit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
