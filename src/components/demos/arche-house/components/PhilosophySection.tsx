'use client';

import React from 'react';
import Image from 'next/image';
import { PHILOSOPHY_DATA } from '../data/archeData';

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="w-full bg-white py-16 text-stone-900 lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* 좌측: 건축 스튜디오 화보 (5열) */}
          <div className="relative min-h-[380px] overflow-hidden rounded-sm bg-stone-100 shadow-lg lg:col-span-5 lg:min-h-[520px]">
            <Image
              src="/portfolio/arche-house/arche-05.jpg"
              alt="아르케 건축사사무소 디자인 스튜디오"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-sm bg-stone-950/80 p-4 text-white backdrop-blur-sm">
              <p className="font-serif text-xs font-bold text-amber-200">ARCHE STUDIO SEOUL</p>
              <p className="mt-1 text-xs text-stone-300">
                물리적 모형과 천연 자재 샘플을 직접 만지며 최적의 비례와 공간을 다듬는 아틀리에 회의
              </p>
            </div>
          </div>

          {/* 우측: 건축 철학 및 4대 원칙 (7열) */}
          <div className="lg:col-span-7">
            <p className="font-serif text-xs font-semibold tracking-widest text-amber-800 uppercase">
              {PHILOSOPHY_DATA.subtitle}
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold tracking-tight text-stone-900 lg:text-3xl lg:leading-snug">
              {PHILOSOPHY_DATA.title}
            </h2>
            <p className="mt-4 text-xs leading-relaxed text-stone-600 lg:text-sm">
              {PHILOSOPHY_DATA.description}
            </p>

            {/* 4대 원칙 그리드 */}
            <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {PHILOSOPHY_DATA.points.map((pt, idx) => (
                <div
                  key={idx}
                  className="rounded-sm border border-stone-200 bg-stone-50/60 p-4 transition-all hover:bg-white hover:shadow-sm"
                >
                  <div className="flex items-center gap-2 font-serif text-xs font-bold text-stone-900">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-stone-900 text-[10px] text-white">
                      0{idx + 1}
                    </span>
                    <span>{pt.title}</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-stone-600">{pt.desc}</p>
                </div>
              ))}
            </div>

            {/* 건축사 자격 및 소명 */}
            <div className="mt-8 border-t border-stone-200 pt-6 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between text-xs text-stone-500">
              <div>
                <strong className="text-stone-900">대표 건축사</strong> | 공인 건축사(KIRA) · 홍익대 건축도시대학원 수료
              </div>
              <div className="font-serif text-stone-400">
                LICENSED ARCHITECTURAL PRACTICE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
