import React from 'react';
import { DOCTOR_PROFILES } from '../data/clinicData';
import { Award, CheckCircle, GraduationCap } from 'lucide-react';

export const FacultySection: React.FC = () => {
  return (
    <section className="w-full bg-[#efeeeb] py-20 lg:py-28" id="faculty-section">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] text-[#775a19] tracking-widest uppercase font-semibold block mb-2 font-sans">
            FACULTY &amp; SPECIALISTS
          </span>
          <h2 className="font-serif text-3xl lg:text-4xl text-[#1a1c1a] font-medium tracking-tight">
            구강악안면외과 · 치과보철과 전문의 협진
          </h2>
          <p className="text-sm lg:text-base text-[#4e4639] mt-3 leading-relaxed font-sans">
            외과적 수술을 맡는 구강악안면외과와 심미 교합을 설계하는 치과보철과가 함께 진단하고 치료 계획을 세웁니다. 아래 의료진과 약력은 샘플용 예시입니다.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {DOCTOR_PROFILES.map((doc, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white p-8 lg:p-10 shadow-lg border border-[#d1c5b4]/40 flex flex-col justify-between"
            >
              <div>
                {/* Doctor Head Info */}
                <div className="flex flex-col lg:flex-row lg:items-center gap-6 mb-8">
                  <img
                    src={doc.image}
                    alt={`${doc.name} ${doc.title}`}
                    className="w-32 h-32 rounded-2xl object-cover shadow-md border border-[#d1c5b4]/30 shrink-0"
                  referrerPolicy="no-referrer" />
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase ${
                      doc.tagColor === 'primary' 
                        ? 'bg-[#ffdea5] text-[#261900]' 
                        : 'bg-[#dae2fd] text-[#131b2e]'
                    }`}>
                      {doc.department}
                    </span>
                    <h3 className="font-serif text-2xl text-[#1a1c1a] font-bold mt-2">
                      {doc.name} <span className="font-sans text-sm text-[#4e4639] font-normal">{doc.title}</span>
                    </h3>
                    <span className="text-xs text-[#7f7667] tracking-wider block mt-1 font-medium">
                      {doc.almaMater}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="p-4 rounded-xl bg-[#faf9f6] text-[#1a1c1a] font-serif text-sm italic mb-6 border-l-2 border-[#775a19]/60">
                  {doc.quote}
                </blockquote>

                {/* Credentials */}
                <div className="space-y-2.5 text-xs text-[#4e4639] font-sans">
                  {doc.credentials.map((cred, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${doc.tagColor === 'primary' ? 'bg-[#775a19]' : 'bg-[#565e74]'}`} />
                      <span>{cred}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Specialty Footer */}
              <div className="mt-8 pt-6 bg-[#faf9f6] -mx-8 -mb-8 p-6 rounded-b-3xl border-t border-[#d1c5b4]/30 flex flex-col lg:flex-row lg:items-center justify-between gap-2">
                <span className="text-[11px] text-[#7f7667] font-bold uppercase tracking-wider">
                  SPECIALTY FOCUS
                </span>
                <span className={`text-xs font-bold ${doc.tagColor === 'primary' ? 'text-[#775a19]' : 'text-[#565e74]'}`}>
                  {doc.specialty}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
