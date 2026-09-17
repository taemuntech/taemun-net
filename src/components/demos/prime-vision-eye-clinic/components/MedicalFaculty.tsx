import React from 'react';
import { Language } from '../types';
import { DOCTORS } from '../constants';

interface MedicalFacultyProps {
  language: Language;
  onSelectDoctor: (doctorName: string) => void;
}

export const MedicalFaculty: React.FC<MedicalFacultyProps> = ({ language, onSelectDoctor }) => {
  return (
    <section id="specialists" className="w-full py-20 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 lg:mb-12 break-keep">
          <span className="px-3.5 py-1.5 rounded-full bg-primary-fixed text-primary font-label-caps text-[11px] font-bold">
            MEDICAL FACULTY
          </span>
          <h2 className="font-headline-xl text-[26px] lg:text-[38px] text-on-surface font-extrabold tracking-tight mt-3 leading-snug">
            {language === 'KR'
              ? '각막 & 망막 세부전공 안과 전문의 팀'
              : 'Cornea & Retina Subspecialist Team'}
          </h2>
          <p className="font-body-lg text-[14px] lg:text-[17px] text-on-surface-variant mt-2 leading-relaxed">
            {language === 'KR'
              ? '1:1 전담 주치의 책임 진료제. 상담부터 정밀 검사, 수술 집도, 수술 후 정기 경과 관찰까지 담당 전문의가 이어서 봅니다. 아래 의료진은 샘플용 예시 인물입니다.'
              : 'A 1:1 attending-physician system covering consultation, examination, surgery and follow-up. The doctors shown below are fictional examples.'}
          </p>
        </div>

        {/* 2 Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch break-keep">
          {/* Doctor 1: Dr. Hyunwoo Kang */}
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col lg:flex-row border border-surface-container/50">
            <div className="w-full lg:w-5/12 h-72 lg:h-auto relative overflow-hidden bg-surface-container">
              <img
                src="/demo-media/prime-vision-eye-clinic/prime-vision-eye-clinic-04.jpg"
                alt="Dr. Hyunwoo Kang - Chief Cornea & Refractive Surgeon"
                className="w-full h-full object-cover object-top"
               referrerPolicy="no-referrer" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm font-label-caps text-[11px] font-bold text-primary shadow">
                각막 &amp; 굴절수술 센터장
              </div>
            </div>

            <div className="p-6 lg:p-7 lg:w-7/12 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-headline-lg text-[22px] font-bold text-on-surface">강현우 대표원장</h3>
                  <span className="font-body-sm text-[13px] text-on-surface-variant font-medium">안과 전문의</span>
                </div>
                <div className="font-label-numeric text-[13px] text-primary font-bold mb-3">
                  각막·망막 세부전공 · 시력교정 담당 (예시)
                </div>

                <p className="font-body-sm text-[13px] text-on-surface-variant italic mb-4 bg-surface-container-low p-3 rounded-xl border border-surface-container">
                  &ldquo;0.01mm 단위까지 확인하고 들어가는 것이 원칙입니다. 환자 한 분 한 분의 생활에 맞는 시야를 함께 찾아 가겠습니다.&rdquo;
                </p>

                <ul className="space-y-1.5 font-body-sm text-[13px] text-on-surface-variant">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                    <span>국내 의과대학(예시) 의학과 졸업</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                    <span>국내 대학병원(예시) 안과 전문의 · 각막 세부전임의 수료</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                    <span>렌티큘 추출술(KLEx) 국제 술기 연수 수료 (예시)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                    <span>안과 관련 학회(예시) 정회원</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => onSelectDoctor(DOCTORS.kang)}
                  className="w-full py-2.5 min-h-[44px] rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-headline-sm text-[13px] font-bold transition-all cursor-pointer text-center"
                >
                  강현우 원장 지정 진료 예약
                </button>
              </div>
            </div>
          </div>

          {/* Doctor 2: Dr. Sohee Yoon */}
          <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col lg:flex-row border border-surface-container/50">
            <div className="w-full lg:w-5/12 h-72 lg:h-auto relative overflow-hidden bg-surface-container">
              <img
                src="/demo-media/prime-vision-eye-clinic/prime-vision-eye-clinic-06.jpg"
                alt="Dr. Sohee Yoon - Chief Cataract & Retinal Specialist"
                className="w-full h-full object-cover object-top"
               referrerPolicy="no-referrer" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm font-label-caps text-[11px] font-bold text-tertiary shadow">
                노안·백내장 &amp; 망막 센터장
              </div>
            </div>

            <div className="p-6 lg:p-7 lg:w-7/12 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-headline-lg text-[22px] font-bold text-on-surface">윤소희 대표원장</h3>
                  <span className="font-body-sm text-[13px] text-on-surface-variant font-medium">안과 전문의</span>
                </div>
                <div className="font-label-numeric text-[13px] text-tertiary font-bold mb-3">
                  노안 · 백내장 수술 담당 (예시)
                </div>

                <p className="font-body-sm text-[13px] text-on-surface-variant italic mb-4 bg-surface-container-low p-3 rounded-xl border border-surface-container">
                  &ldquo;백내장 수술은 혼탁을 걷어내는 데서 끝나지 않습니다. 환자의 취미와 하루 동선을 듣고 어느 거리를 가장 편하게 쓰실지부터 함께 정합니다.&rdquo;
                </p>

                <ul className="space-y-1.5 font-body-sm text-[13px] text-on-surface-variant">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0"></span>
                    <span>국내 의과대학(예시) 졸업</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0"></span>
                    <span>국내 대학병원(예시) 안과 전문의 · 망막 임상강사</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0"></span>
                    <span>프리미엄 다초점 인공수정체 술기 강사 (예시)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0"></span>
                    <span>안과 · 망막 관련 학회(예시) 정회원</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => onSelectDoctor(DOCTORS.yoon)}
                  className="w-full py-2.5 min-h-[44px] rounded-xl bg-surface-container hover:bg-tertiary hover:text-on-tertiary text-tertiary font-headline-sm text-[13px] font-bold transition-all cursor-pointer text-center"
                >
                  윤소희 원장 지정 진료 예약
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
