'use client';

import React from 'react';
import { FACULTY_MEMBERS } from '../data/veritasData';
import { VeritasFaculty } from '../types';

export function FacultySection() {
  return (
    <section id="faculty" className="py-20 lg:py-28 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-700 uppercase tracking-widest block mb-2">
            NATIVE FACULTY
          </span>
          <h2 className="text-2xl lg:text-4xl font-serif font-extrabold text-[#0F2942] tracking-tight">
            영미 명문대 출신 전임 원어민 강사진
          </h2>
          <p className="text-xs lg:text-sm text-slate-600 mt-2">
            미국 교원 자격 및 ESL 전문 자격을 갖춘 100% 북미·영국 국적 전임 교수진이 전담 지도합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {FACULTY_MEMBERS.map((member: VeritasFaculty, idx: number) => (
            <div
              key={idx}
              className="p-6 lg:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-900 text-white font-serif font-bold text-xl flex items-center justify-center mb-5 shadow-sm">
                  {member.name.slice(0, 1)}
                </div>
                <span className="text-xs font-bold text-blue-700 block mb-1">
                  {member.role}
                </span>
                <h3 className="text-lg font-serif font-bold text-[#0F2942] mb-2">
                  {member.name}
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  {member.almaMater}
                </p>
                <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100 mb-4 space-y-1">
                  <p>경력: {member.experience}</p>
                  <p className="text-blue-900 font-medium">분야: {member.specialty}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>정규 담임제</span>
                <span className="text-blue-700 font-semibold">● 100% 원어민 수업</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
