import React from 'react';
import { Language } from '../types';

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
            WORLD-CLASS MEDICAL FACULTY
          </span>
          <h2 className="font-headline-xl text-[26px] lg:text-[38px] text-on-surface font-extrabold tracking-tight mt-3 leading-snug">
            {language === 'KR'
              ? '국내 명문대(예시) · 세브란스 출신 각막 & 망막 전임의 팀'
              : 'Seoul National Univ & Severance Cornea & Retina Fellows'}
          </h2>
          <p className="font-body-lg text-[14px] lg:text-[17px] text-on-surface-variant mt-2 leading-relaxed">
            {language === 'KR'
              ? '공장형 안과와 차별화된 1:1 전담 주치의 책임 진료제. 상담부터 정밀 검사, 수술 집도, 평생 사후 관리까지 담당 전문의가 직접 책임집니다.'
              : 'Dedicated 1:1 primary attending physician system. From consultation and 50-step exam to surgery and lifelong post-op care.'}
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
                  누적 시력교정 18,000+ 케이스 집도
                </div>

                <p className="font-body-sm text-[13px] text-on-surface-variant italic mb-4 bg-surface-container-low p-3 rounded-xl border border-surface-container">
                  &ldquo;단 0.01mm의 오차도 허용하지 않는 엄격한 집도 철학으로, 환자 개개인의 시각적 삶의 질을 온전히 회복시켜 드립니다.&rdquo;
                </p>

                <ul className="space-y-1.5 font-body-sm text-[13px] text-on-surface-variant">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                    <span>국내 명문 A대학(예시) 의과대학 의학과 졸업</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                    <span>국내 명문 A대학(예시)병원 안과 전문의 및 각막 세부전임의</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                    <span>독일 Carl Zeiss 공인 SMILE Pro Master Surgeon</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                    <span>안과학회(예시)(KOS) · KSCRS 정회원</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => onSelectDoctor('강현우 대표원장 (스마일프로·시력교정)')}
                  className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary text-primary font-headline-sm text-[13px] font-bold transition-all cursor-pointer text-center"
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
                  노안·백내장 수술 12,000+ 케이스 달성
                </div>

                <p className="font-body-sm text-[13px] text-on-surface-variant italic mb-4 bg-surface-container-low p-3 rounded-xl border border-surface-container">
                  &ldquo;백내장은 단순히 혼탁을 제거하는 것을 넘어, 환자의 평생 취미와 일상 동선을 고려한 최적의 빛 설계를 완성하는 예술입니다.&rdquo;
                </p>

                <ul className="space-y-1.5 font-body-sm text-[13px] text-on-surface-variant">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0"></span>
                    <span>국내 명문 B대학(예시) 의과대학 졸업 (신촌 세브란스)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0"></span>
                    <span>국내 명문 B대학(예시) 대학병원(예시) 안과 전문의 및 망막 임상강사</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0"></span>
                    <span>존슨앤드존슨 / 자이스 프리미엄 인공수정체 키닥터</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary shrink-0"></span>
                    <span>안과학회(예시)(KOS) · 한국망막학회(KRS) 정회원</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-surface-container">
                <button
                  type="button"
                  onClick={() => onSelectDoctor('윤소희 대표원장 (노안·백내장·망막)')}
                  className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-tertiary hover:text-on-tertiary text-tertiary font-headline-sm text-[13px] font-bold transition-all cursor-pointer text-center"
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
