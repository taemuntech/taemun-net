import React from 'react';
import { Sparkles, Award, GraduationCap, Quote } from 'lucide-react';
import { DOCTORS } from '../data/clinicData';

export const DoctorsSection: React.FC = () => {
  return (
    <section id="doctors" className="py-20 lg:py-28 bg-[#1A1817] text-white">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/30 text-[#E8DDD4] text-[12px] font-medium mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>온새미로 의료진</span>
          </div>
          <h2 className="text-[28px] lg:text-[40px] font-serif font-bold text-white leading-tight mb-4">
            풍부한 임상경험과 심미안의<br />
            <span className="bg-gradient-to-r from-[#FFF] via-[#E8DDD4] to-[#C5A880] bg-clip-text text-transparent">
              분야별 성형외과 전문의
            </span>
          </h2>
          <p className="text-[15px] text-[#A69F97] leading-relaxed">
            상담부터 수술 계획 수립, 미세 봉합까지 전문의가 직접 전담합니다.<br className="hidden lg:block" />
            자연스러운 조화를 위한 끊임없는 학술 연구와 정직한 진료를 약속드립니다.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="bg-white/[0.04] border border-white/10 rounded-3xl overflow-hidden hover:border-[#C5A880]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Doctor Image */}
                <div className="relative h-72 w-full overflow-hidden bg-[#252220]">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1817] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-[11px] font-semibold text-[#C5A880] tracking-wider uppercase mb-0.5">
                      {doc.role}
                    </div>
                    <div className="text-[22px] font-serif font-bold text-white">
                      {doc.name} 원장
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-5">
                  {/* Specialty */}
                  <div className="text-[13px] text-[#E8DDD4] font-medium bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
                    {doc.specialty}
                  </div>

                  {/* Quote */}
                  <div className="relative pl-6 text-[13px] text-[#A69F97] italic leading-relaxed">
                    <Quote className="w-4 h-4 text-[#C5A880] absolute left-0 top-0 opacity-60" />
                    “{doc.quote}”
                  </div>

                  {/* Career List */}
                  <div className="space-y-1.5 pt-2 border-t border-white/10">
                    <div className="text-[11px] font-bold text-[#C5A880] uppercase tracking-wider mb-2">
                      주요 약력
                    </div>
                    {doc.career.map((c, idx) => (
                      <div key={idx} className="text-[12px] text-[#D3CBC3] flex items-start gap-1.5 leading-snug">
                        <span className="text-[#C5A880]">•</span>
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Academic Highlights */}
              <div className="p-6 pt-0">
                <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-[11px] text-[#A69F97] space-y-1">
                  <div className="font-semibold text-[#E8DDD4] flex items-center gap-1 mb-1">
                    <Award className="w-3 h-3 text-[#C5A880]" />
                    <span>주요 학술 활동</span>
                  </div>
                  {doc.academic.map((a, idx) => (
                    <div key={idx} className="leading-snug text-[#A69F97]">
                      - {a}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
