import React, { useState } from 'react';
import { ClinicalTab } from '../types';
import { HOSPITAL_IMAGES } from '../data/hospitalData';

interface SpecializedCentersProps {
  onSelectDepartment: (dept: string) => void;
}

export const SpecializedCentersSection: React.FC<SpecializedCentersProps> = ({
  onSelectDepartment,
}) => {
  const [activeTab, setActiveTab] = useState<ClinicalTab>('oncology');

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
            동서의학의 정밀한 융합으로 암 수술 전후 체력 재건부터 급성 척추관절 손상, 중풍 수술 후 재활까지 단계별 회복을 견인합니다.
          </p>

          {/* Tab Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mt-6 bg-[#e9e8e5] p-1.5 rounded-xl inline-flex">
            <button
              onClick={() => setActiveTab('oncology')}
              className={`px-5 py-2.5 rounded-lg text-[15px] font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'oncology'
                  ? 'bg-[#102a20] text-white shadow-sm'
                  : 'bg-transparent text-[#424844] hover:text-[#102a20]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">ecg_heart</span>
              <span>암면역 집중 센터</span>
            </button>

            <button
              onClick={() => setActiveTab('traffic')}
              className={`px-5 py-2.5 rounded-lg text-[15px] font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'traffic'
                  ? 'bg-[#102a20] text-white shadow-sm'
                  : 'bg-transparent text-[#424844] hover:text-[#102a20]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">airline_seat_recline_extra</span>
              <span>교통사고·척추관절 입원</span>
            </button>

            <button
              onClick={() => setActiveTab('rehab')}
              className={`px-5 py-2.5 rounded-lg text-[15px] font-semibold transition-all flex items-center gap-2 cursor-pointer ${
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
                독일 최신 고주파 온열암치료 · 면역 시너지
              </div>
              <h3 className="font-serif text-[26px] lg:text-[30px] text-[#102a20] font-semibold leading-tight">
                항암·방사선 부작용 완화 및<br />
                자연 살해세포(NK Cell) 활성 케어
              </h3>
              <p className="text-[15px] text-[#424844] leading-relaxed">
                암세포가 열에 약한 원리를 이용한 13.56MHz 고주파 온열암치료(Oncothermia)와 싸이모신 알파-1, 미슬토(압노바), 고농도 비타민C 복합 투여로 정상 세포 손상 없이 암세포의 자연사를 유도하고 항암 치료 순응도를 극대화합니다.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-[#e3e2e0] shadow-sm">
                  <span className="material-symbols-outlined text-[#102a20] text-[22px] shrink-0 mt-0.5">
                    heat_pump
                  </span>
                  <div>
                    <strong className="text-[15px] text-[#102a20] block font-semibold">
                      독일 셀시우스 TCS 온열암 치료기 도입
                    </strong>
                    <span className="text-[13px] text-[#424844]">
                      선택적 심부 열 상승으로 종양 혈관 축소 및 항암제 흡수율 배가
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-[#e3e2e0] shadow-sm">
                  <span className="material-symbols-outlined text-[#75593c] text-[22px] shrink-0 mt-0.5">
                    medication
                  </span>
                  <div>
                    <strong className="text-[15px] text-[#102a20] block font-semibold">
                      독자 조제 본초 면역단 &amp; 건칠정
                    </strong>
                    <span className="text-[13px] text-[#424844]">
                      식욕 부진, 오심, 말초신경병증 등 항암제 독성 부작용 타깃 한방 면역 처방
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-lg bg-white border border-[#e3e2e0] shadow-sm">
                  <span className="material-symbols-outlined text-[#264035] text-[22px] shrink-0 mt-0.5">
                    restaurant
                  </span>
                  <div>
                    <strong className="text-[15px] text-[#102a20] block font-semibold">
                      암환자 맞춤 치료 항암 약선 식단
                    </strong>
                    <span className="text-[13px] text-[#424844]">
                      임상영양사 1:1 상담 기반 소화 흡수 중심 멸균 항암 식이상
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectDepartment('oncology')}
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#102a20] hover:text-[#264035] underline underline-offset-4"
                >
                  <span>암면역 집중 입원 상담 예약하기</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden shadow-md bg-white border border-[#e3e2e0]">
                <img
                  className="w-full h-56 object-cover"
                  alt="13.56MHz 고주파 온열암치료 장비"
                  src={HOSPITAL_IMAGES.oncothermia}
                />
                <div className="p-5">
                  <span className="text-[11px] text-[#75593c] uppercase tracking-wider font-semibold">
                    High Frequency Hyperthermia
                  </span>
                  <h4 className="text-[17px] font-bold text-[#102a20] mt-1">
                    13.56MHz 고주파 온열암치료
                  </h4>
                  <p className="text-[13px] text-[#424844] mt-2 leading-relaxed">
                    종양 주변 미세 환경 온도를 42℃ 이상 유도하여 정상 세포 손상 없는 정밀 선택 파괴
                  </p>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden shadow-md bg-white border border-[#e3e2e0]">
                <img
                  className="w-full h-56 object-cover"
                  alt="싸이모신α1 및 미슬토 면역치료 라운지"
                  src={HOSPITAL_IMAGES.immuneIV}
                />
                <div className="p-5">
                  <span className="text-[11px] text-[#75593c] uppercase tracking-wider font-semibold">
                    Immune IV Therapy
                  </span>
                  <h4 className="text-[17px] font-bold text-[#102a20] mt-1">
                    싸이모신α1 &amp; 압노바 미슬토 요법
                  </h4>
                  <p className="text-[13px] text-[#424844] mt-2 leading-relaxed">
                    흉선 호르몬 유래 펩타이드 주사로 T세포와 면역글로불린 수치를 즉각 끌어올립니다.
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
                자동차보험 100% 전액 적용 (본인부담금 0원)
              </div>
              <h3 className="font-serif text-[26px] lg:text-[30px] text-[#102a20] font-semibold leading-tight">
                사고 직후 편타성 손상 및<br />
                어혈 집중 해소 당일 입원
              </h3>
              <p className="text-[15px] text-[#424844] leading-relaxed">
                미세 골절 판독, 목·허리 디스크 신경 압박, 두통과 근막 통증을 초기에 바로잡지 않으면 만성 통증 증후군으로 발전합니다. 당일 진단부터 프라이빗 병실 입원까지 신속 원스톱 케어를 지원합니다.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-lg bg-white border border-[#e3e2e0] shadow-sm flex gap-3">
                  <span className="material-symbols-outlined text-[#102a20] text-[22px] shrink-0 mt-0.5">
                    medical_services
                  </span>
                  <div>
                    <strong className="text-[15px] text-[#102a20] block font-semibold">
                      한의사 전문 추나요법 &amp; 정밀 약침
                    </strong>
                    <span className="text-[13px] text-[#424844]">
                      틀어진 척추 관절 교정 및 신경 염증 진정 소염 약침 집중 처치
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-[#e3e2e0] shadow-sm flex gap-3">
                  <span className="material-symbols-outlined text-[#75593c] text-[22px] shrink-0 mt-0.5">
                    receipt_long
                  </span>
                  <div>
                    <strong className="text-[15px] text-[#102a20] block font-semibold">
                      복잡한 절차 없는 대인접수번호 연동
                    </strong>
                    <span className="text-[13px] text-[#424844]">
                      상대방 보험사 담당자 접수번호만으로 침, 뜸, 부항, 입원비 일체 0원 처리
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectDepartment('traffic')}
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#102a20] hover:text-[#264035] underline underline-offset-4"
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
                    급작스러운 추돌 충격으로 굳어진 관절 마디의 긴장을 즉시 해제합니다.
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
                    체내 뭉친 미세 혈전을 배출하고 온열 한방 팩으로 근육을 이완합니다.
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
                대학병원 수술 후 골든타임 회복 프로그램
              </div>
              <h3 className="font-serif text-[26px] lg:text-[30px] text-[#102a20] font-semibold leading-tight">
                인공관절·척추 수술 및<br />
                뇌졸중 신경계 1:1 보행 재활
              </h3>
              <p className="text-[15px] text-[#424844] leading-relaxed">
                무릎 인공관절, 고관절, 척추 유합술 직후 무너진 균형감각과 근력을 무중력 슬링(Sling) 장비 및 물리치료사의 밀착 케어로 안전하게 복원합니다.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-lg bg-white border border-[#e3e2e0] shadow-sm flex gap-3">
                  <span className="material-symbols-outlined text-[#102a20] text-[22px] shrink-0 mt-0.5">
                    directions_walk
                  </span>
                  <div>
                    <strong className="text-[15px] text-[#102a20] block font-semibold">
                      무부하 레드코드 슬링(Sling) 시스템
                    </strong>
                    <span className="text-[13px] text-[#424844]">
                      환자의 관절 부하를 상쇄한 상태에서 코어 근력과 가동 범위를 안전하게 증진
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-white border border-[#e3e2e0] shadow-sm flex gap-3">
                  <span className="material-symbols-outlined text-[#75593c] text-[22px] shrink-0 mt-0.5">
                    neurology
                  </span>
                  <div>
                    <strong className="text-[15px] text-[#102a20] block font-semibold">
                      신경 손상 회복 촉진 미세 전침 요법
                    </strong>
                    <span className="text-[13px] text-[#424844]">
                      말초 혈류 순환 및 신경 재생 신호를 자극하여 마비 및 저림을 경감
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onSelectDepartment('rehab')}
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-[#102a20] hover:text-[#264035] underline underline-offset-4"
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
                  alt="레드코드 슬링 재활 치료실"
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
                    척추 및 관절에 부담 없는 각도에서 굳어진 인대와 근육을 자극
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
                    국가공인 도수치료사가 매일 회복 상태를 체크하며 단계적 각도 확대
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
