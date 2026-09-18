'use client';

import React from 'react';
import { STEM_PROJECTS } from '../data/robotData';

export function StemProjectsSection() {
  return (
    <section id="projects-archive" className="py-16 lg:py-24 bg-[#070B14] border-b border-orange-500/15 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono text-orange-400 uppercase tracking-widest block mb-2">
            STUDENT ENGINEERING ARCHIVE
          </span>
          <h2 className="text-2xl lg:text-4xl font-mono font-bold text-white mb-4">
            수강생들이 직접 하드웨어·소프트웨어를 설계한 공학 프로젝트
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            단순 매뉴얼 따라 하기가 아닙니다. 센서의 물리적 원리를 수식으로 모델링하고
            알고리즘을 C++/Python으로 코딩하여 완성한 실물 포트폴리오입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {STEM_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="p-6 rounded-3xl bg-[#0E1526] border border-zinc-800 hover:border-orange-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30">
                    {proj.category}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">
                    {proj.author}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                  {proj.title}
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                  {proj.description}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-zinc-800 text-[11px] font-mono">
                <div className="flex items-start gap-2">
                  <span className="text-zinc-500 shrink-0">H/W:</span>
                  <span className="text-zinc-300">{proj.hardware}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-zinc-500 shrink-0">S/W:</span>
                  <span className="text-amber-300">{proj.software}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
