'use client';

import React, { useState } from 'react';
import { STUDENT_WORKS } from '../data/leCordonData';
import { Sparkles, Eye } from 'lucide-react';

export function MasteryGallery() {
  const [filter, setFilter] = useState<'all' | 'patisserie' | 'floral'>('all');

  const filteredWorks = STUDENT_WORKS.filter((work) => {
    if (filter === 'all') return true;
    return work.discipline === filter;
  });

  return (
    <section className="py-20 bg-stone-900 text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
              ATELIER ARCHIVE & PORTFOLIO
            </span>
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-stone-50">
              수강생 마스터피스 갤러리
            </h2>
            <p className="text-stone-300 text-xs font-light">
              실무 수준을 뛰어넘는 창의적 감성과 완성도를 지닌 수료생들의 작품입니다.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-stone-950 p-1.5 rounded-xl border border-stone-800">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === 'all'
                  ? 'bg-amber-600 text-white'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              전체 보기
            </button>
            <button
              type="button"
              onClick={() => setFilter('patisserie')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === 'patisserie'
                  ? 'bg-amber-600 text-white'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              파티스리
            </button>
            <button
              type="button"
              onClick={() => setFilter('floral')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === 'floral'
                  ? 'bg-emerald-700 text-white'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
            >
              오뜨 플로랄
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredWorks.map((work) => (
            <div
              key={work.id}
              className="group rounded-2xl overflow-hidden bg-stone-950 border border-stone-800 hover:border-amber-700/60 transition-all shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={work.imageUrl}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
                <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-stone-950/80 text-[10px] font-mono text-stone-300 border border-stone-700">
                  {work.year}
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-amber-400">{work.author}</span>
                  <span className="text-stone-400">{work.track}</span>
                </div>
                <h3 className="text-base font-serif font-bold text-stone-100">{work.title}</h3>
                <p className="text-xs text-stone-300 leading-relaxed bg-stone-900/60 p-3 rounded-lg border border-stone-800">
                  <span className="text-stone-400 font-semibold block text-[11px] mb-0.5">교수진 강평 (예시)</span>
                  {work.critique}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
