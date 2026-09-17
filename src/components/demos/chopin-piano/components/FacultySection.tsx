'use client';

import React from 'react';
import { FACULTY_MEMBERS } from '../data/chopinData';

export function FacultySection() {
  return (
    <section id="faculty-section" className="py-20 lg:py-28 bg-[#121110] border-b border-[#2d2926] text-[#f5f0eb]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#d4af37] block mb-2">
            Distinguished Faculty
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-bold text-[#f5f0eb] mb-4">
            유럽·미국 명문 음대 출신 전임 교수진
          </h2>
          <p className="text-sm lg:text-base text-[#a89f95] leading-relaxed">
            국제 유수 콩쿠르 입상 및 해외 명문 음대에서 최고연주자과정을 마친 최정상 피아니스트들이 1:1 맞춤형 도제 지도를 전담합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {FACULTY_MEMBERS.map((faculty) => (
            <div
              key={faculty.id}
              className="bg-[#181513] border border-[#38322c] rounded-2xl p-6 lg:p-8 flex flex-col justify-between hover:border-[#524434] transition-colors"
            >
              <div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#3a3227] to-[#584b39] flex items-center justify-center text-2xl mb-6 border border-[#524434]">
                  🎼
                </div>
                <div className="inline-block px-2.5 py-1 rounded bg-[#2a241e] border border-[#524434] text-[11px] font-semibold text-[#d4af37] mb-3">
                  {faculty.badge}
                </div>
                <h3 className="text-xl font-serif font-bold text-[#f5f0eb] mb-1">
                  {faculty.name}
                </h3>
                <p className="text-xs text-[#c5a880] font-medium mb-3">{faculty.role}</p>
                <p className="text-xs text-[#a89f95] leading-relaxed mb-4 pb-4 border-b border-[#2d2926]">
                  {faculty.almaMater}
                </p>
                <p className="text-xs text-[#8c8276] leading-relaxed mb-6">
                  {faculty.bio}
                </p>
              </div>

              <div className="p-3.5 bg-[#121110] rounded-xl border border-[#2d2926]">
                <span className="text-[11px] text-[#70685e] block mb-1">전문 지도 분야</span>
                <span className="text-xs text-[#e0c298] font-medium block">{faculty.specialty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
