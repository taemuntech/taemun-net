import React, { useState } from 'react';
import { FACULTY_MEMBERS } from '../data/mockData';
import { FacultyMember } from '../types';
import { GraduationCap, Award, BookOpen, X, CheckCircle2, ChevronRight } from 'lucide-react';

export const FacultySection: React.FC = () => {
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyMember | null>(null);

  return (
    <section
      id="faculty-section"
      className="w-full px-4 lg:px-8 lg:px-12 xl:px-16 py-16 lg:py-20 bg-[#f8f9ff]"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2">
            <span className="font-label-sm text-xs text-[#45464d] uppercase tracking-widest">
              MODULE IV // THE ACADEMIC COLONNADE
            </span>
            <span className="text-[#45464d]">◆</span>
            <span className="font-label-sm text-xs text-[#cf6721] font-semibold uppercase">
              SUPREME COUNCIL
            </span>
          </div>
          <h2 className="font-headline-lg text-3xl lg:text-4xl text-[#0d1c2f] uppercase tracking-tight font-bold">
            Supreme Judicial & Financial Faculty
          </h2>
          <p className="font-body-md text-sm lg:text-base text-[#45464d] leading-relaxed">
            실제 사법시험 출신 법조인, 연구관, 회계법인 파트너 (예시)로서 법리와 수치를 재단하던 최상위권 전문 마스터 교수진이 직접 지도합니다.
          </p>
        </div>

        {/* 4-Column Distinguished Faculty Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          {FACULTY_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="bg-[#ffffff] border border-[#0d1c2f]/10 shadow-xs flex flex-col justify-between overflow-hidden group hover:border-[#0d1c2f]/30 transition-all hover:shadow-md"
            >
              {/* Portrait container */}
              <div
                className="relative w-full h-64 lg:h-72 bg-cover bg-center overflow-hidden"
                style={{
                  backgroundImage: `url('${member.imageUrl}')`,
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-[#ffffff] via-transparent to-transparent"></div>
                <div className="absolute top-3 right-3 px-2.5 py-1 bg-[#000000] text-white font-label-sm text-[11px] uppercase font-semibold tracking-wider shadow-xs">
                  {member.roleBadge}
                </div>
              </div>

              {/* Information body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="font-label-sm text-xs text-[#45464d] uppercase tracking-wider">
                    {member.department}
                  </div>
                  <h3 className="font-headline-md text-xl text-[#0d1c2f] font-bold">
                    {member.name}
                  </h3>
                  <p className="font-body-sm text-xs lg:text-sm text-[#45464d] leading-relaxed">
                    {member.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#0d1c2f]/10 space-y-2">
                  <div className="font-label-sm text-xs text-[#0d1c2f] font-bold uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-[#cf6721] rounded-full inline-block"></span>
                    <span>{member.achievement}</span>
                  </div>

                  <button
                    onClick={() => setSelectedFaculty(member)}
                    className="w-full text-left font-label-sm text-[11px] text-[#45464d] hover:text-[#0d1c2f] hover:underline flex items-center justify-between pt-1 cursor-pointer"
                  >
                    <span>교수진 상세 약력 및 강의 보기</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Faculty Detail Dossier Modal */}
      {selectedFaculty && (
        <div className="fixed inset-0 z-50 bg-[#0d1c2f]/70 backdrop-blur-xs flex items-center justify-center p-4 lg:p-6 animate-in fade-in">
          <div className="bg-[#ffffff] border border-[#0d1c2f]/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 lg:p-8 space-y-6 relative">
            <button
              onClick={() => setSelectedFaculty(null)}
              className="absolute top-4 right-4 p-1.5 text-[#0d1c2f] hover:bg-[#e6eeff] transition-colors"
              aria-label="닫기"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col lg:flex-row gap-5 items-start">
              <img
                src={selectedFaculty.imageUrl}
                alt={selectedFaculty.imageAlt}
                className="w-28 h-36 object-cover border border-[#0d1c2f]/20 shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1">
                <span className="px-2 py-0.5 bg-[#000000] text-white font-label-sm text-xs uppercase tracking-wider">
                  {selectedFaculty.roleBadge}
                </span>
                <h3 className="font-headline-md text-2xl text-[#0d1c2f] font-bold pt-1">
                  {selectedFaculty.name}
                </h3>
                <p className="font-label-sm text-xs text-[#cf6721] font-semibold">
                  {selectedFaculty.department} ({selectedFaculty.academicTitle})
                </p>
                <p className="font-body-sm text-sm text-[#45464d] pt-1">
                  {selectedFaculty.achievement}
                </p>
              </div>
            </div>

            {/* Academic Credentials */}
            <div className="space-y-2">
              <h4 className="font-label-md text-xs uppercase tracking-wider text-[#0d1c2f] font-bold flex items-center gap-1.5 border-b border-[#0d1c2f]/10 pb-1.5">
                <GraduationCap className="w-4 h-4 text-[#cf6721]" />
                주요 학력 및 사법·회계 커리어
              </h4>
              <ul className="space-y-1.5 text-xs lg:text-sm text-[#45464d] font-body-sm">
                {selectedFaculty.credentials.map((cred, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#cf6721] shrink-0 mt-1" />
                    <span>{cred}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Assigned Courses & Masterclasses */}
            <div className="space-y-2">
              <h4 className="font-label-md text-xs uppercase tracking-wider text-[#0d1c2f] font-bold flex items-center gap-1.5 border-b border-[#0d1c2f]/10 pb-1.5">
                <BookOpen className="w-4 h-4 text-[#cf6721]" />
                담당 마스터 클래스 및 정규반 지도 영역
              </h4>
              <ul className="space-y-1.5 text-xs lg:text-sm text-[#0d1c2f] font-body-sm">
                {selectedFaculty.lectures.map((lec, idx) => (
                  <li key={idx} className="p-2.5 bg-[#eff4ff] border border-[#0d1c2f]/10">
                    <span className="font-semibold">{lec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setSelectedFaculty(null)}
                className="px-4 py-2 border border-[#0d1c2f]/20 font-label-sm text-xs uppercase hover:bg-[#eff4ff]"
              >
                닫기
              </button>
              <a
                href="#audit-form"
                onClick={() => setSelectedFaculty(null)}
                className="px-5 py-2 bg-[#000000] text-white font-label-sm text-xs uppercase hover:bg-[#131b2e] transition-colors"
              >
                교수진 1:1 진단 입학 신청
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
