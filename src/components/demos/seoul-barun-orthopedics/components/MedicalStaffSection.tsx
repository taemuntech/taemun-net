import React from 'react';
import { DOCTORS } from '../data/clinicData';
import { DoctorProfile } from '../types';

interface MedicalStaffSectionProps {
  onSelectDoctor: (doctorName: string) => void;
}

export const MedicalStaffSection: React.FC<MedicalStaffSectionProps> = ({ onSelectDoctor }) => {
  return (
    <section id="medical-staff" className="w-full bg-[#FAF9F6] py-12 lg:py-16 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 lg:px-12">
        {/* Staff Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-1.5 text-[#00652C] text-xs lg:text-sm mb-1 font-bold">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span>MEDICAL SPECIALISTS</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#1A1C1A] tracking-tight">
            수술적 치료와 비수술적 치료의 경계를 가장 잘 아는 전문의
          </h2>
          <p className="text-sm lg:text-base text-[#3F493F] mt-2">
            국내 명문 대학병원(예시) 및 대학병원(예시) 출신 정형외과 전문의가 직접 진단하고, 끝까지 책임 진료합니다.
          </p>
        </div>

        {/* Two Doctor Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {DOCTORS.map((doc: DoctorProfile) => {
            const isPark = doc.id === 'park';
            const accentColor = isPark ? '#00652C' : '#007D73';

            return (
              <div
                key={doc.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-[#E9E8E5] flex flex-col lg:flex-row gap-5 hover:shadow-md transition-shadow"
              >
                {/* Doctor Portrait Image */}
                <div className="w-full lg:w-52 h-64 lg:h-auto rounded-xl overflow-hidden bg-[#EFEEEB] flex-shrink-0 relative">
                  <img
                    alt={doc.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    src={doc.image}
                   referrerPolicy="no-referrer" />
                  <div
                    className="absolute bottom-2 left-2 text-white text-xs px-2.5 py-1 rounded font-bold shadow"
                    style={{ backgroundColor: accentColor }}
                  >
                    {doc.centerBadge}
                  </div>
                </div>

                {/* Info and Details */}
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <h3 className="text-xl lg:text-2xl font-bold text-[#1A1C1A]">{doc.name}</h3>
                      <span
                        className="text-xs lg:text-sm font-bold"
                        style={{ color: accentColor }}
                      >
                        {doc.title}
                      </span>
                    </div>

                    {/* Quote */}
                    <blockquote
                      className="text-xs lg:text-sm text-[#3F493F] italic mb-4 pl-3 border-l-2 leading-relaxed"
                      style={{ borderColor: accentColor }}
                    >
                      {doc.quote}
                    </blockquote>

                    {/* Credentials */}
                    <div className="space-y-1.5 text-[#3F493F] text-xs">
                      {doc.credentials.map((cred, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: accentColor }}
                          ></span>
                          <span>{cred}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#EFEEEB]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#545F73] font-bold">전문 진료 분야</span>
                      <button
                        onClick={() => onSelectDoctor(`${doc.name} ${doc.title.split('/')[0].trim()}`)}
                        className="text-xs font-bold px-2.5 py-1 rounded-md text-white transition-all cursor-pointer shadow-xs"
                        style={{ backgroundColor: accentColor }}
                      >
                        전담 예약하기 &rarr;
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {doc.specialties.map((spec, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded bg-[#F4F3F1] text-[#3F493F] text-xs font-medium border border-[#E9E8E5]"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
