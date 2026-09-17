import React from 'react';
import { REHAB_EQUIPMENT } from '../data/clinicData';
import { RehabEquipment } from '../types';

interface RehabSuiteSectionProps {
  onSelectEquipment: (item: RehabEquipment) => void;
  onBookConsultation: () => void;
}

export const RehabSuiteSection: React.FC<RehabSuiteSectionProps> = ({
  onSelectEquipment,
  onBookConsultation,
}) => {
  return (
    <section id="rehab-center" className="w-full bg-[#F4F3F1] py-12 lg:py-16 scroll-mt-[132px]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 lg:px-12">
        {/* Split Hero Banner for Rehab Center */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-1.5 text-[#00652C] text-xs lg:text-sm mb-1 font-bold">
              <span className="material-symbols-outlined text-[18px]">fitness_center</span>
              <span>100-PYEONG DEDICATED REHABILITATION SUITE</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#1A1C1A] tracking-tight leading-snug">
              통증 완화를 넘어 재발 위험을 낮추는 것을 목표로 하는 <br />
              100평 규모 1:1 맞춤형 도수·운동치료센터
            </h2>
            <p className="text-sm lg:text-base text-[#3F493F] mt-2 max-w-xl leading-relaxed">
              물리치료사와 환자 1인을 1:1로 매칭합니다.
              단순 마사지식 도수가 아닌, 바이오메카닉스 기구와 심부 근육 활성화 프로토콜로 척추 축과 관절의 가동범위를 단계적으로 회복시키는 운동 치료입니다.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={onBookConsultation}
                className="inline-flex min-h-11 items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00652C] hover:bg-[#15803D] text-white text-xs lg:text-sm font-bold shadow-sm transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">sports_gymnastics</span>
                <span>1:1 맞춤 도수치료 상담 신청</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-3">
            {/* Room Features Pills */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white shadow-sm border border-[#E9E8E5]">
              <div className="w-10 h-10 rounded-lg bg-[#00652C]/10 flex items-center justify-center text-[#00652C] flex-shrink-0">
                <span className="material-symbols-outlined">meeting_room</span>
              </div>
              <div>
                <div className="text-xs lg:text-sm text-[#1A1C1A] font-bold">
                  독립형 프라이빗 1:1 도수치료실 8개실 완비
                </div>
                <div className="text-xs text-[#545F73]">
                  환자의 프라이버시를 보호하는 안락하고 쾌적한 룸 환경
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white shadow-sm border border-[#E9E8E5]">
              <div className="w-10 h-10 rounded-lg bg-[#007D73]/10 flex items-center justify-center text-[#007D73] flex-shrink-0">
                <span className="material-symbols-outlined">badge</span>
              </div>
              <div>
                <div className="text-xs lg:text-sm text-[#1A1C1A] font-bold">
                  정형도수치료 교육과정(예시) 이수 치료사
                </div>
                <div className="text-xs text-[#545F73]">
                  해부학적 관절 가동술 및 기능적 신경근 재교육 전담
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Rehab Machinery 3-Card Mosaic */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {REHAB_EQUIPMENT.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              aria-label={`${item.title} 자세히 보기`}
              onClick={() => onSelectEquipment(item)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectEquipment(item);
                }
              }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E9E8E5] flex flex-col justify-between group hover:shadow-md transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00652C]"
            >
              <div className="relative h-48 w-full bg-[#EFEEEB] overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt={item.title}
                  src={item.image}
                 referrerPolicy="no-referrer" />
                <div className={`absolute top-3 left-3 text-xs px-2.5 py-1 rounded-md font-bold shadow-sm ${item.badgeBg}`}>
                  {item.badge}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-base lg:text-lg text-[#1A1C1A] font-bold group-hover:text-[#00652C] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-[#3F493F] mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#EFEEEB] flex items-center justify-between text-xs text-[#545F73]">
                  <span>{item.targetCases}</span>
                  <span className="text-[#00652C] font-bold">{item.highlightTag}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 의료광고 필수 고지 — 효과·부작용 개인차 (TechnologySection 과 같은 문안) */}
        <p className="mt-6 text-xs text-[#545F73] bg-white border border-[#E9E8E5] rounded-xl p-4 leading-relaxed break-keep">
          ※ 위 재활 프로그램의 효과는 환자의 상태에 따라 개인차가 있으며, 통증·근육통 등 부작용이 나타날 수 있습니다.
          프로그램 구성과 적용 여부는 진료와 검사 결과를 바탕으로 전문의가 판단합니다. 본 화면은 가상 브랜드 샘플이며 실제 진료 정보가 아닙니다.
        </p>
      </div>
    </section>
  );
};
