'use client';

import React from 'react';
import { ADMISSION_CASES } from '../data/ivyData';

export function IvyAdmissionsShowcase() {
  return (
    <section id="admissions-showcase" className="py-16 lg:py-24 bg-[#140208] border-b border-rose-900/30 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-serif text-amber-400 uppercase tracking-widest block mb-2">
            PROVEN TRACK RECORD
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-white mb-4">
            숫자로 증명하는 아이비리그 &amp; Top 20 보딩스쿨 합격 사례
          </h2>
          <p className="text-sm text-rose-200/70 font-sans leading-relaxed">
            비슷한 고득점자들 사이에서 합격을 결정짓는 것은 &apos;독창적인 스파이크(Spike)&apos;입니다.
            수험생 한 명 한 명의 스토리를 입체적으로 브랜딩한 실제 합격 포트폴리오를 확인하십시오.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {ADMISSION_CASES.map((item) => (
            <div
              key={item.id}
              className="p-6 lg:p-8 rounded-3xl bg-[#1C040C] border border-rose-900/50 hover:border-amber-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-serif px-2.5 py-1 rounded bg-rose-950 border border-amber-500/30 text-amber-300">
                    ADM-TechTED
                  </span>
                  <span className="text-xs text-rose-300/60 font-serif">
                    {item.studentInitials}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
                  {item.schoolAdmitted}
                </h3>

                <div className="space-y-1.5 p-3 rounded-2xl bg-black/40 border border-rose-900/40 text-xs font-mono text-rose-200/90 mb-4">
                  <div>GPA: {item.gpa}</div>
                  <div>SAT: {item.sat}</div>
                  <div>AP: {item.apCount}</div>
                </div>

                <div className="mb-4">
                  <span className="text-[11px] font-serif font-bold text-amber-400 block mb-1">
                    차별화 스파이크(Hook):
                  </span>
                  <p className="text-xs text-rose-100 font-sans">
                    {item.hook}
                  </p>
                </div>

                <p className="text-xs text-rose-200/70 font-sans leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-rose-900/40 mt-6 text-right">
                <span className="text-xs font-serif text-amber-400 group-hover:translate-x-1 transition-transform inline-block">
                  Case Study Detail ↗
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
