'use client';

import React from 'react';
import { STUDENT_PROJECTS } from '../data/codexData';

export function ProjectShowcaseSection() {
  return (
    <section id="projects-showcase" className="py-16 lg:py-24 bg-[#030712] border-b border-emerald-500/15 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest block mb-2">
            PRODUCTION SERVICE SHOWCASE
          </span>
          <h2 className="text-2xl lg:text-4xl font-mono font-bold text-white mb-4">
            수강생들이 기획부터 AWS 배포까지 완성한 프로덕션 SaaS
          </h2>
          <p className="text-sm text-zinc-400 font-mono leading-relaxed">
            토이 프로젝트가 아닙니다. 초당 수만 건의 틱 데이터를 처리하고, 
            분산 DB 락과 LLM RAG 파이프라인을 견고하게 연결한 실제 론칭 서비스 포트폴리오입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {STUDENT_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="p-6 lg:p-8 rounded-3xl bg-[#0B0F17] border border-zinc-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    {proj.category}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">
                    {proj.team}
                  </span>
                </div>

                <h3 className="text-lg font-mono font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  {proj.title}
                </h3>

                <p className="text-xs text-zinc-300 leading-relaxed mb-6">
                  {proj.summary}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-teal-300">
                  {proj.metrics}
                </span>
                <span className="text-xs font-mono text-emerald-400 group-hover:translate-x-1 transition-transform">
                  Architecture ↗
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
