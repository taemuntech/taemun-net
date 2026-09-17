import React from 'react';
import { ClinicalTab } from '../types';
import { HOSPITAL_IMAGES } from '../data/hospitalData';

interface SpecializedCentersProps {
  onSelectDepartment: (dept: ClinicalTab) => void;
  /** 탭은 부모가 쥔다 — 헤더 메뉴(「암 통합진료 센터」·「교통사고·수술재활」)가 탭까지 바꿔야 해서 */
  activeTab: ClinicalTab;
  onTabChange: (tab: ClinicalTab) => void;
}

export const SpecializedCentersSection: React.FC<SpecializedCentersProps> = ({
  onSelectDepartment,
  activeTab,
  onTabChange,
}) => {

  return (
    <section id="specialized-centers" className="w-full bg-[#f4f3f0] py-16 border-y border-[#e9e8e5]">
      <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-[760px] mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e3e2e0] text-[#75593c] text-[12px] font-semibold mb-2">
            <span>EVIDENCE-BASED INTEGRATIVE MEDICINE</span>
          </div>
          <h2 className="font-serif text-[32px] lg:text-[38px] text-[#102a20] font-semibold mb-3">
            본초 3대 집중 진료 특화 센터
          </h2>
          <p className="text-[15px] lg:text-[16px] text-[#424844] leading-relaxed">
            암 치료 전후의 컨디션 관리부터 교통사고 후 급성 통증, 수술 후 재활까지 의사와 한의사가 함께 진료 계획을 세웁니다.
          </p>

          {/* Tab Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 bg-[#e9e8e5] p-1.5 rounded-xl inline-flex">
            <button
              onClick={() => onTabChange('oncology')}
              className={`px-5 py-2.5 max-lg:min-h-[44px] rounded-lg text-[15px] font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'oncology'
                  ? 'bg-[#102a20] text-white shadow-sm'
                  : 'bg-transparent text-[#424844] hover:text-[#102a20]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">ecg_heart</span>
              <span>암 통합진료 센터</span>
            </button>

            <button
              onClick={() => onTabChange('traffic')}
              className={`px-5 py-2.5 max-lg:min-h-[44px] rounded-lg text-[15px] font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'traffic'
                  ? 'bg-[#102a20] text-white shadow-sm'
                  : 'bg-transparent text-[#424844] hover:text-[#102a20]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">airline_seat_recline_extra</span>
              <span>교통사고·척추관절 입원</span>
            </button>

            <button
              onClick={() => onTabChange('rehab')}
              className={`px-5 py-2.5 max-lg:min-h-[44px] rounded-lg text-[15px] font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'rehab'
                  ? 'bg-[#102a20] text-white shadow-sm'
                  : 'bg-transparent text-[#424844] hover:text-[#102a20]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">accessibility_new</span>
              <span>수술 후 뇌신경·보행 재활</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Integrative Oncology */}
        {activeTab === 'oncology' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-block px-3 py-1 rounded bg-[#ffd9b4] text-[#2a1702] text-[12px] font-semibold">
                고주파 온열치료 · 면역 영양 수액 병행
              </div>
              <h3 className="font-serif text-[26px] lg:text-[30px] text-[#102a20] font-semibold leading-tight">
                항암·방사선 치료 기간의<br />
                컨디션 관리와 의·한의 통합 진료
              </h3>
              <p className="text-[15px] text-[#424844] leading-relaxed">
                13.56MHz 고주파 온열치료와 면역·영양 수액 요법을 환자 상태에 맞춰 담당 의료진이 조합합니다. 수액 구성은 진료와 혈액검사 결과를 보고 정하며, 시행 여부와 기대할 수 있는 점, 부작용과 주의사항은 진료 상담에서 개별적으로 설명드립니다.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-[#e3e2e0] shadow-sm">
                  <span className="material-symbols-outlined text-[#102a20] text-[22px] shrink-0 mt-0.5">
                    heat_pump
                  </span>
                  <div>
                    <strong className="text-[15px] text-[#102a20] block font-semibold">
                      독일산 고주파 온열치료 장비 운용
                    </strong>
                    <span className="text-[13px] text-[#424844]">
                      치료 부위 심부 온도를 올리는 방식이며, 적용 여부는 진료 후 결정합니다
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-[#e3e2e0] shadow-sm">
                  <span className="material-symbols-outlined text-[#75593c] text-[22px] shrink-0 mt-0.5">
                    medication
                  </span>
                  <div>
                    <strong className="text-[15px] text-[#102a20] block font-semibold">
                      원내 조제 본초 탕약 &amp; 환제
                    </strong>
                    <span className="text-[13px] text-[#424844]">
                      식욕·소화·피로 등 치료 기간에 힘드신 부분을 한의사와 상의해 처방합니다
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-[#e3e2e0] shadow-sm">
                  <span className="material-symbols-outlined text-[#264035] text-[22px] shrink-0 mt-0.5">
                    restaurant
                  </span>
                  <div>
                    <strong className="text-[15px] text-[#102a20] block font-semibold">
                      환자별 맞춤 치료식 상담
                    </strong>
                    <span className="text-[13px] text-[#424844]">
                      임상영양사가 1:1로 상담해 소화가 편한 식단을 구성합니다
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectDepartment('oncology')}
                  className="inline-flex items-center gap-2 max-lg:min-h-[44px] text-[14px] font-semibold text-[#102a20] hover:text-[#264035] underline underline-offset-4"
                >
                  <span>암 통합진료 입원 상담 문의</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden shadow-md bg-white border border-[#e3e2e0]">
                <img
                  className="w-full h-56 object-cover"
                  alt="13.56MHz 고주파 온열치료 장비"
                  src={HOSPITAL_IMAGES.hyperthermia}
                />
                <div className="p-5">
                  <span className="text-[11px] text-[#75593c] uppercase tracking-wider font-semibold">
                    High Frequency Hyperthermia
                  </span>
                  <h4 className="text-[17px] font-bold text-[#102a20] mt-1">
                    13.56MHz 고주파 온열치료
                  </h4>
                  <p className="text-[13px] text-[#424844] mt-2 leading-relaxed">
                    치료 부위를 국소적으로 가온하는 장비입니다. 적응증과 부작용은 진료 시 설명드립니다.
                  </p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-md bg-white border border-[#e3e2e0]">
                <img
                  className="w-full h-56 object-cover"
                  alt="면역·영양 수액 치료실"
                  src={HOSPITAL_IMAGES.immuneIV}
                />
                <div className="p-5">
                  <span className="text-[11px] text-[#75593c] uppercase tracking-wider font-semibold">
                    Immune IV Therapy
                  </span>
                  <h4 className="text-[17px] font-bold text-[#102a20] mt-1">
                    면역·영양 수액 요법 (진료 후 결정)
                  </h4>
                  <p className="text-[13px] text-[#424844] mt-2 leading-relaxed">
                    담당 의료진이 혈액검사 결과를 보고 수액 구성과 투여 여부를 정합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Traffic Accident */}
        {activeTab === 'traffic' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-block px-3 py-1 rounded bg-[#ffdcbb] text-[#2a1702] text-[12px] font-semibold">
                자동차보험 대인접수 시 보험사 직접 지급
              </div>
              <h3 className="font-serif text-[26px] lg:text-[30px] text-[#102a20] font-semibold leading-tight">
                사고 직후 편타성 손상 및<br />
                어혈 집중 해소 당일 입원
              </h3>
              <p className="text-[15px] text-[#424844] leading-relaxed">
                사고 직후의 통증은 사람마다 경과가 다릅니다. 영상 판독과 진찰로 상태를 먼저 확인한 뒤, 입원이 필요하면 당일 수속까지 원무팀이 함께 안내합니다.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-lg bg-white border border-[#e3e2e0] shadow-sm flex gap-3">
                  <span className="material-symbols-outlined text-[#102a20] text-[22px] shrink-0 mt-0.5">
                    medical_services
                  </span>
                  <div>
                    <strong className="text-[15px] text-[#102a20] block font-semibold">
                      한의사 추나요법 &amp; 약침 치료
                    </strong>
                    <span className="text-[13px] text-[#424844]">
                      경추·요추 상태를 진찰한 뒤 추나와 약침을 병행합니다
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-[#e3e2e0] shadow-sm flex gap-3">
                  <span className="material-symbols-outlined text-[#75593c] text-[22px] shrink-0 mt-0.5">
                    receipt_long
                  </span>
                  <div>
                    <strong className="text-[15px] text-[#102a20] block font-semibold">
                      대인접수번호 연동 청구 대행
                    </strong>
                    <span className="text-[13px] text-[#424844]">
                      접수번호를 알려 주시면 치료비 청구 절차를 원무팀이 대신 진행합니다
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectDepartment('traffic')}
                  className="inline-flex items-center gap-2 max-lg:min-h-[44px] text-[14px] font-semibold text-[#102a20] hover:text-[#264035] underline underline-offset-4"
                >
                  <span>교통사고 당일 입원 수속 문의</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden shadow-md bg-white border border-[#e3e2e0]">
                <img
                  className="w-full h-56 object-cover"
                  alt="추나요법 치료 장면"
                  src={HOSPITAL_IMAGES.chuna}
                />
                <div className="p-5">
                  <span className="text-[11px] text-[#75593c] uppercase tracking-wider font-semibold">
                    Spine &amp; Joint Manual Care
                  </span>
                  <h4 className="text-[17px] font-bold text-[#102a20] mt-1">
                    경추·요추 1:1 관절 교정 추나
                  </h4>
                  <p className="text-[13px] text-[#424844] mt-2 leading-relaxed">
                    한의사가 경추·요추 상태를 진찰한 뒤 시행하는 추나 치료입니다.
                  </p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-md bg-white border border-[#e3e2e0]">
                <img
                  className="w-full h-56 object-cover"
                  alt="한방 물리치료 및 온열 팩"
                  src={HOSPITAL_IMAGES.physicalTherapy}
                />
                <div className="p-5">
                  <span className="text-[11px] text-[#75593c] uppercase tracking-wider font-semibold">
                    Integrated Pain Relief
                  </span>
                  <h4 className="text-[17px] font-bold text-[#102a20] mt-1">
                    당일 어혈 한약 &amp; 물리치료 병행
                  </h4>
                  <p className="text-[13px] text-[#424844] mt-2 leading-relaxed">
                    어혈 한약과 한방 물리치료를 함께 진행하는 입원 프로그램입니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Post-Op Rehabilitation */}
        {activeTab === 'rehab' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-in fade-in duration-300">
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-block px-3 py-1 rounded bg-[#b0cdbe] text-[#052017] text-[12px] font-semibold">
                수술 후 회복기 재활 입원 프로그램
              </div>
              <h3 className="font-serif text-[26px] lg:text-[30px] text-[#102a20] font-semibold leading-tight">
                인공관절·척추 수술 및<br />
                뇌졸중 신경계 1:1 보행 재활
              </h3>
              <p className="text-[15px] text-[#424844] leading-relaxed">
                무릎 인공관절, 고관절, 척추 유합술 이후의 균형감각과 근력을 슬링(Sling) 장비와 물리치료사의 밀착 지도로 단계적으로 훈련합니다.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-lg bg-white border border-[#e3e2e0] shadow-sm flex gap-3">
                  <span className="material-symbols-outlined text-[#102a20] text-[22px] shrink-0 mt-0.5">
                    directions_walk
                  </span>
                  <div>
                    <strong className="text-[15px] text-[#102a20] block font-semibold">
                      무부하 슬링(Sling) 운동 시스템
                    </strong>
                    <span className="text-[13px] text-[#424844]">
                      관절 부하를 덜어낸 자세에서 코어 근력과 가동 범위를 훈련합니다
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-[#e3e2e0] shadow-sm flex gap-3">
                  <span className="material-symbols-outlined text-[#75593c] text-[22px] shrink-0 mt-0.5">
                    neurology
                  </span>
                  <div>
                    <strong className="text-[15px] text-[#102a20] block font-semibold">
                      재활 기간 중 미세 전침 치료
                    </strong>
                    <span className="text-[13px] text-[#424844]">
                      담당 한의사가 상태를 보며 자극 세기를 조절해 시행합니다
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectDepartment('rehab')}
                  className="inline-flex items-center gap-2 max-lg:min-h-[44px] text-[14px] font-semibold text-[#102a20] hover:text-[#264035] underline underline-offset-4"
                >
                  <span>수술 후 맞춤 재활 입원 문의</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden shadow-md bg-white border border-[#e3e2e0]">
                <img
                  className="w-full h-56 object-cover"
                  alt="슬링 재활 치료실"
                  src={HOSPITAL_IMAGES.rehabSling}
                />
                <div className="p-5">
                  <span className="text-[11px] text-[#75593c] uppercase tracking-wider font-semibold">
                    Zero-Gravity Sling Rehab
                  </span>
                  <h4 className="text-[17px] font-bold text-[#102a20] mt-1">
                    슬링 무중력 체간 재활
                  </h4>
                  <p className="text-[13px] text-[#424844] mt-2 leading-relaxed">
                    척추와 관절에 부담이 적은 각도에서 인대와 근육을 자극합니다
                  </p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-md bg-white border border-[#e3e2e0]">
                <img
                  className="w-full h-56 object-cover"
                  alt="1:1 도수 재활 치료"
                  src={HOSPITAL_IMAGES.rehabTherapy}
                />
                <div className="p-5">
                  <span className="text-[11px] text-[#75593c] uppercase tracking-wider font-semibold">
                    1:1 Joint Mobilization
                  </span>
                  <h4 className="text-[17px] font-bold text-[#102a20] mt-1">
                    1:1 전담 도수 및 관절 가동화
                  </h4>
                  <p className="text-[13px] text-[#424844] mt-2 leading-relaxed">
                    전담 물리치료사가 매일 회복 상태를 확인하며 단계적으로 각도를 넓힙니다
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 의료법 제56조 — 치료 소개 옆에 반드시 남는 고지. 세 탭 공통이라 탭 밖에 한 번만 둔다. */}
        <p className="mt-10 text-[12px] lg:text-[13px] text-[#424844] leading-relaxed bg-white/70 border border-[#e3e2e0] rounded-xl px-4 py-3 break-keep">
          ※ 위 치료 소개는 일반적인 안내이며 특정한 치료 효과를 단정하지 않습니다. 같은 치료라도 개인의 상태·기저
          질환에 따라 경과가 다르고 부작용이 생길 수 있으므로, 시행 여부는 진료와 검사 결과를 바탕으로 의료진과
          상의해 결정합니다. 이 화면은 가상 브랜드 샘플이며 실제 의료기관이 아닙니다.
        </p>
      </div>
    </section>
  );
};
