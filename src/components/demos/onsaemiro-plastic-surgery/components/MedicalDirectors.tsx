import React from 'react';
import { DOCTORS } from '../data/clinicData';

interface MedicalDirectorsProps {
  onSelectDoctorForConsultation: (doctorId: string) => void;
}

export const MedicalDirectors: React.FC<MedicalDirectorsProps> = ({ onSelectDoctorForConsultation }) => {
  return (
    <section className="w-full py-20 bg-[#fdf9f5] relative" id="medical-directors">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center gap-3">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#725b38] font-bold">
            DISTINGUISHED KOREAN SURGEONS
          </span>
          <h2 className="font-serif text-[28px] lg:text-[34px] text-[#1c1c19]">
            진실된 의술을 실천하는 온새미로 의료진
          </h2>
          <p className="text-[14px] leading-relaxed text-[#4d463c]">
            풍부한 임상경험의 성형외과 및 마취통증의학과 전문의들이 정직한 진료와 섬세한 미세 손기술로 당신의 고유한 아름다움을 마주합니다.
          </p>
          {/* 지어낸 인물에 진짜 이력이 붙은 것처럼 읽히지 않도록 명시한다 */}
          <p className="text-[12px] text-[#725b38] bg-[#f1ede9] border border-[#c5a880]/30 rounded-full px-4 py-1.5 break-keep">
            ※ 아래 의료진과 이력은 가상 브랜드 샘플의 예시이며 실존 인물이 아닙니다.
          </p>
        </div>

        {/* 3 Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {DOCTORS.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col rounded-3xl bg-[#ffffff] border border-[#d1c5b8]/30 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="h-80 w-full overflow-hidden bg-[#ebe7e4] relative group">
                <img
                  src={doc.image}
                  alt={`${doc.name} 프로필`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent pointer-events-none"></div>

                <div className="absolute bottom-4 left-5 right-5 text-[#fdf9f5]">
                  <span className="text-[11px] text-[#fedeb2] uppercase tracking-wider font-semibold block">
                    {doc.subRole}
                  </span>
                  <div className="font-serif text-[22px] font-semibold">
                    {doc.name}
                  </div>
                </div>
              </div>

              <div className="p-6 flex flex-col justify-between flex-grow gap-6">
                <div className="flex flex-col gap-4">
                  {/* Doctor Philosophy Quote */}
                  <div className="p-3.5 rounded-xl bg-[#f7f3ef] font-serif italic text-[13px] text-[#4d463c] leading-relaxed border-l-2 border-[#725b38]">
                    {doc.quote}
                  </div>

                  {/* Credentials */}
                  <ul className="space-y-1.5 text-[13px] text-[#4d463c]">
                    {doc.credentials.map((cred, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#725b38] shrink-0"></span>
                        <span>{cred}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-[#f1ede9] flex flex-col gap-3">
                  <span className="text-[12px] px-3 py-1.5 rounded-md bg-[#f1ede9] text-[#725b38] font-semibold text-center">
                    전문분야: {doc.specialties}
                  </span>
                  <button
                    onClick={() => onSelectDoctorForConsultation(doc.id)}
                    className="w-full py-2.5 min-h-[44px] rounded-xl bg-[#1A1817] text-[#fdf9f5] text-[12px] font-semibold hover:bg-[#2E2A27] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>{doc.name} 1:1 상담 지정하기</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
