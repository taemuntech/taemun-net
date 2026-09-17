import React from 'react';
import { Calendar, Award, Check } from 'lucide-react';
import { DOCTORS } from '../data/clinicData';
import { Doctor } from '../types';

interface DoctorsSectionProps {
  onSelectDoctor: (doctorName: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ onSelectDoctor }) => {
  return (
    <section id="dermatologists" className="w-full py-16 lg:py-20 bg-[#fbf9f6] border-b border-[#eae8e5]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3 py-1 rounded-full bg-[#efeeeb] text-[#745a2a] text-xs font-semibold tracking-widest uppercase mb-2 inline-block border border-[#e4e2df]">
            Seoul Nat'l Univ. Board-Certified Faculty
          </span>
          <h2 className="font-serif text-2xl lg:text-3xl lg:text-[32px] text-[#00110b] tracking-tight mb-3">
            풍부한 임상 경험과 학술적 깊이를 지닌 의료진
          </h2>
          <p className="text-sm lg:text-base text-[#424845] leading-relaxed">
            모든 진료와 시술은 국내 명문 A대학(예시) 의과대학 졸업 및 대학병원(예시) 수련을 마친 보건복지부 공인 피부과 전문의 3인이 직접 책임 집도합니다.
          </p>
        </div>

        {/* 3 Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="rounded-xl bg-[#ffffff] p-6 shadow-md hover:shadow-xl border border-[#eae8e5] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-72 lg:h-80 rounded-lg overflow-hidden mb-4 bg-[#efeeeb]">
                  <img
                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    alt={doc.name}
                    src={doc.image}
                   referrerPolicy="no-referrer" />
                  <div className="absolute bottom-3 left-3 bg-[#00110b]/85 backdrop-blur-md px-3 py-1.5 rounded text-[#ffffff] text-xs font-medium border border-white/10">
                    {doc.role}
                  </div>
                </div>

                <div className="mb-3">
                  <h3 className="font-serif text-xl lg:text-2xl text-[#00110b] font-medium">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#745a2a] uppercase tracking-wider mt-0.5">
                    {doc.roleEn}
                  </p>
                </div>

                {/* Credentials list */}
                <div className="space-y-1.5 text-xs text-[#424845] mb-5">
                  {doc.credentials.map((cred, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#745a2a]">•</span>
                      <span>{cred}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Doctor Philosophy Quote */}
                <div className="bg-[#f5f3f0] p-4 rounded-lg border border-[#eae8e5] mb-4">
                  <p className="font-serif italic text-xs lg:text-sm text-[#00110b] leading-relaxed">
                    "{doc.quote}"
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectDoctor(doc.name)}
                  className="w-full py-2.5 rounded-lg bg-[#efeeeb] text-[#00110b] hover:bg-[#00110b] hover:text-[#ffffff] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{doc.name} 1:1 상담 예약</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
