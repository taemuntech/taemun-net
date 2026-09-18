'use client';

import React from 'react';
import Image from 'next/image';
import { CIVIL_TECHS } from '../data/civilData';

export default function EngineeringTechSection() {
  return (
    <section id="section-tech" className="w-full bg-neutral-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest">
            ADVANCED CIVIL METHODS
          </span>
          <h2 className="mt-3 font-mono text-2xl font-black text-white lg:text-4xl">
            고난도 지형을 극복하는 3대 특화 토목 기술
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            깊은 협곡, 도심지 대심도 암반, 복잡한 산악 지형에서 안전과 시공성을 극대화하는 한빛토목이앤씨의 핵심 공법입니다.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {CIVIL_TECHS.map((tech) => (
            <div
              key={tech.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 transition-all hover:border-amber-500/40"
            >
              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden bg-neutral-950">
                <Image
                  src={tech.image}
                  alt={tech.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3 rounded bg-neutral-950/80 px-2.5 py-1 font-mono text-[11px] font-semibold text-amber-400 backdrop-blur-md">
                  {tech.category}
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-mono text-lg font-bold text-white">
                    {tech.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-neutral-400">
                    {tech.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mt-6 border-t border-neutral-800/80 pt-4">
                  <span className="font-mono text-[11px] font-bold text-neutral-500">주요 공학적 효과</span>
                  <ul className="mt-2 space-y-1.5 font-mono text-xs text-neutral-300">
                    {tech.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-amber-400">⚡</span>
                        <span>{f}</span>
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
