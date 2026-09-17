import React from 'react';
import { HOSPITAL_IMAGES } from '../data/hospitalData';

interface SuitesSectionProps {
  onSelectRoom: (roomType: 'royal' | 'harmony') => void;
  onOpenTour: (roomType?: 'royal' | 'harmony') => void;
  onOpenInsurance: () => void;
}

export const SuitesSection: React.FC<SuitesSectionProps> = ({
  onSelectRoom,
  onOpenTour,
  onOpenInsurance,
}) => {
  return (
    <section id="suites-section" className="w-full bg-[#faf9f6] py-16">
      <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[12px] text-[#75593c] tracking-widest uppercase font-semibold">
              Hospitality Meets Healing Sanctuary
            </span>
            <h2 className="font-serif text-[32px] lg:text-[38px] text-[#102a20] font-semibold mt-1">
              호텔 그 이상의 힐링, 360° VIP 프라이빗 입원실
            </h2>
            <p className="text-[15px] text-[#424844] mt-2 max-w-[640px]">
              오롯이 치유에만 전념할 수 있도록 편백나무(히노끼) 향, 독일식 전동 모션베드, 스마트 항균 공조 시스템을 전 객실에 완비하였습니다.
            </p>
          </div>

          {/* Quick Counter Badge */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e3e2e0] flex items-center gap-4 shrink-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#264035] animate-pulse"></span>
              <div>
                <div className="text-[11px] text-[#424844]">1인실 로열 잔여</div>
                <div className="text-[15px] text-[#102a20] font-bold">2 실 가능</div>
              </div>
            </div>
            <span className="text-[#c2c8c3] opacity-60">|</span>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#75593c] animate-pulse"></span>
              <div>
                <div className="text-[11px] text-[#424844]">2인실 하모니 잔여</div>
                <div className="text-[15px] text-[#75593c] font-bold">3 실 가능</div>
              </div>
            </div>
          </div>
        </div>

        {/* Suites Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 1인실 로열 스위트 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-[#e3e2e0] transition-all hover:shadow-lg flex flex-col justify-between group">
            <div>
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-103"
                  alt="1인실 로열 스위트 침실 및 프라이빗 정원 테라스"
                  src={HOSPITAL_IMAGES.royalSuite}
                />
                <div className="absolute top-4 left-4 bg-[#102a20] text-white px-3 py-1 rounded-md text-[12px] font-semibold tracking-wide">
                  ROYAL SUITE · 1인실
                </div>
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-semibold text-[#102a20] flex items-center gap-1.5 shadow">
                  <span className="material-symbols-outlined text-[16px]">nature</span>
                  <span>편백나무 피톤치드 테라스</span>
                </div>
                {/* 360 virtual tour button overlay */}
                <button
                  onClick={() => onOpenTour('royal')}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-[#102a20] px-2.5 py-1.5 rounded-lg text-[12px] font-semibold flex items-center gap-1 shadow cursor-pointer transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
                  <span>360° 투어</span>
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-[24px] text-[#102a20] font-semibold">
                    1인실 로열 스위트
                  </h3>
                  <span className="text-[13px] text-[#75593c] font-semibold">
                    완전한 독립 프라이버시
                  </span>
                </div>

                <p className="text-[14px] text-[#424844] leading-relaxed">
                  가족 및 보호자가 함께 머물러도 넉넉한 공간. 전용 프라이빗 테라스 정원과 개별 샤워부스, 다이슨 퓨어쿨 공기청정기가 24시간 쾌적함을 선사합니다.
                </p>

                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <div className="flex items-center gap-2 text-[13px] text-[#1a1c1a] bg-[#f4f3f0] p-2.5 rounded-lg">
                    <span className="material-symbols-outlined text-[#102a20] text-[18px]">bed</span>
                    <span>독일제 4모터 전동 모션베드</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#1a1c1a] bg-[#f4f3f0] p-2.5 rounded-lg">
                    <span className="material-symbols-outlined text-[#102a20] text-[18px]">balcony</span>
                    <span>정원 조망 프라이빗 테라스</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#1a1c1a] bg-[#f4f3f0] p-2.5 rounded-lg">
                    <span className="material-symbols-outlined text-[#102a20] text-[18px]">tv</span>
                    <span>55" 스마트 TV &amp; 무선 헤드셋</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#1a1c1a] bg-[#f4f3f0] p-2.5 rounded-lg">
                    <span className="material-symbols-outlined text-[#102a20] text-[18px]">shower</span>
                    <span>개별 비데 &amp; 최고급 샤워실</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 flex gap-2">
              <button
                onClick={() => onSelectRoom('royal')}
                className="flex-1 py-3 rounded-lg bg-[#102a20] text-white text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-[#264035] active:scale-98 transition-colors cursor-pointer"
              >
                <span>1인실 로열 스위트 입원 문의</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                onClick={() => onOpenTour('royal')}
                className="px-4 py-3 rounded-lg bg-[#f4f3f0] text-[#102a20] text-[13px] font-semibold flex items-center justify-center gap-1 hover:bg-[#e9e8e5] transition-colors cursor-pointer"
                title="360 가상 투어"
              >
                <span className="material-symbols-outlined text-[18px]">360</span>
              </button>
            </div>
          </div>

          {/* 2인실 하모니 스위트 */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-[#e3e2e0] transition-all hover:shadow-lg flex flex-col justify-between group">
            <div>
              <div className="relative overflow-hidden">
                <img
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-103"
                  alt="2인실 하모니 스위트 완벽 차음 방음 칸막이"
                  src={HOSPITAL_IMAGES.harmonySuite}
                />
                <div className="absolute top-4 left-4 bg-[#75593c] text-white px-3 py-1 rounded-md text-[12px] font-semibold tracking-wide">
                  HARMONY SUITE · 2인실
                </div>
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] font-semibold text-[#75593c] flex items-center gap-1.5 shadow">
                  <span className="material-symbols-outlined text-[16px]">lock</span>
                  <span>독립 암막 방음 파티션</span>
                </div>
                {/* 360 virtual tour button overlay */}
                <button
                  onClick={() => onOpenTour('harmony')}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-[#75593c] px-2.5 py-1.5 rounded-lg text-[12px] font-semibold flex items-center gap-1 shadow cursor-pointer transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
                  <span>360° 투어</span>
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-serif text-[24px] text-[#102a20] font-semibold">
                    2인실 하모니 스위트
                  </h3>
                  <span className="text-[13px] text-[#102a20] font-semibold">
                    1인실 같은 완벽한 차음 배려
                  </span>
                </div>

                <p className="text-[14px] text-[#424844] leading-relaxed">
                  천장까지 이어지는 견고한 암막 방음 칸막이 설계로 타 환자의 시선과 소음을 차단하여 2인실에서도 1인실 못지않은 안락한 독립 공간을 제공합니다.
                </p>

                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <div className="flex items-center gap-2 text-[13px] text-[#1a1c1a] bg-[#f4f3f0] p-2.5 rounded-lg">
                    <span className="material-symbols-outlined text-[#75593c] text-[18px]">table_restaurant</span>
                    <span>개별 침상 맞춤 모니터 &amp; OTT</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#1a1c1a] bg-[#f4f3f0] p-2.5 rounded-lg">
                    <span className="material-symbols-outlined text-[#75593c] text-[18px]">bed</span>
                    <span>개별 독립 전동 모션베드</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#1a1c1a] bg-[#f4f3f0] p-2.5 rounded-lg">
                    <span className="material-symbols-outlined text-[#75593c] text-[18px]">inventory_2</span>
                    <span>전자식 개인 락커 &amp; 냉장고</span>
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-[#1a1c1a] bg-[#f4f3f0] p-2.5 rounded-lg">
                    <span className="material-symbols-outlined text-[#75593c] text-[18px]">air</span>
                    <span>침상별 개별 급배기 환기 노즐</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 flex gap-2">
              <button
                onClick={() => onSelectRoom('harmony')}
                className="flex-1 py-3 rounded-lg bg-[#e9e8e5] text-[#102a20] text-[14px] font-semibold flex items-center justify-center gap-2 hover:bg-[#e3e2e0] active:scale-98 transition-colors cursor-pointer"
              >
                <span>2인실 하모니 스위트 입원 문의</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
              <button
                onClick={() => onOpenTour('harmony')}
                className="px-4 py-3 rounded-lg bg-[#f4f3f0] text-[#75593c] text-[13px] font-semibold flex items-center justify-center gap-1 hover:bg-[#e9e8e5] transition-colors cursor-pointer"
                title="360 가상 투어"
              >
                <span className="material-symbols-outlined text-[18px]">360</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Insurance & Cost Estimator Banner */}
        <div className="mt-8 p-6 bg-[#efeeeb] rounded-xl border border-[#e3e2e0] flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#264035] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">calculate</span>
            </div>
            <div>
              <div className="font-serif text-[18px] text-[#102a20] font-semibold">
                실손의료보험 &amp; 자동차보험 간편 비용 시뮬레이션
              </div>
              <p className="text-[13px] text-[#424844] mt-0.5">
                개인 실손보험 가입 시기 및 약관에 따라 입원료·비급여 치료비의 최대 80~100% 실손 적용 가능 범위를 사전 검토해 드립니다.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenInsurance}
            className="shrink-0 px-5 py-2.5 rounded-lg bg-[#102a20] text-white text-[13px] font-semibold hover:bg-[#264035] active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>실손보험 사전 무료 조회</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
};
