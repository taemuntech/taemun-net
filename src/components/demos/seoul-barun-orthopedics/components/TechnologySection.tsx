import React from 'react';
import { TechnologyItem } from '../types';
import { TECHNOLOGIES } from '../data/clinicData';

interface TechnologySectionProps {
  onSelectTechnology: (tech: TechnologyItem) => void;
}

export const TechnologySection: React.FC<TechnologySectionProps> = ({ onSelectTechnology }) => {
  return (
    <section id="spine-center" className="w-full bg-[#FAF9F6] py-12 lg:py-16 scroll-mt-[132px]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-3">
          <div>
            <div className="flex items-center gap-1.5 text-[#00652C] text-xs lg:text-sm mb-1 font-bold">
              <span className="material-symbols-outlined text-[18px]">science</span>
              <span>ADVANCED NON-SURGICAL SPECTRUM</span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#1A1C1A] tracking-tight">
              조직 회복을 돕는 4대 비수술 테크놀로지
            </h2>
            <p className="text-sm lg:text-base text-[#3F493F] mt-1 max-w-2xl">
              단순 통증 차단을 넘어 인대·신경·관절낭의 회복 반응을 돕는 정형외과 장비 구성입니다. 효과와 필요한 횟수는 개인차가 있습니다.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-[#545F73] text-xs lg:text-sm font-medium self-start lg:self-auto">
            <span className="material-symbols-outlined text-[#00652C] text-[18px]">verified_user</span>
            <span>의료기기 허가 장비 운용 (예시 표기)</span>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* Tech Card 1: ESWT (Large 7 Cols) */}
          <div
            role="button"
            tabIndex={0}
            aria-label={`${TECHNOLOGIES[0].title} 자세히 보기`}
            onClick={() => onSelectTechnology(TECHNOLOGIES[0])}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectTechnology(TECHNOLOGIES[0]);
              }
            }}
            className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-[#E9E8E5] flex flex-col justify-between group hover:shadow-md transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00652C]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-[#00652C]/10 text-[#00652C] text-xs font-bold">
                  집중형(Focus) &amp; 방사형(Radial) 2종 운용
                </span>
                <span className="text-xs text-[#6F7A6E] font-mono">TECHNOLOGY 01</span>
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-[#1A1C1A] tracking-tight group-hover:text-[#00652C] transition-colors">
                고에너지 체외충격파 치료 (ESWT)
              </h3>
              <p className="text-xs lg:text-sm text-[#3F493F] mt-2 leading-relaxed">
                음파 에너지가 손상된 힘줄과 인대 조직에 전달되어 석회성 침착물에 물리적 자극을 주고,
                조직의 회복 반응을 돕는 비침습 치료입니다. 반응 정도와 치료 횟수는 개인차가 있습니다.
              </p>

              {/* Technical Spec Pills */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-4">
                <div className="bg-[#F4F3F1] p-3 rounded-xl border border-[#E9E8E5]">
                  <span className="text-[#545F73] text-xs block font-medium">적용 주요 질환</span>
                  <span className="text-xs lg:text-sm text-[#1A1C1A] font-bold">석회성건염, 족저근막염</span>
                </div>
                <div className="bg-[#F4F3F1] p-3 rounded-xl border border-[#E9E8E5]">
                  <span className="text-[#545F73] text-xs block font-medium">침투 깊이</span>
                  <span className="text-xs lg:text-sm text-[#00652C] font-bold">최대 125mm 심부 타겟</span>
                </div>
                <div className="bg-[#F4F3F1] p-3 rounded-xl border border-[#E9E8E5]">
                  <span className="text-[#545F73] text-xs block font-medium">시술 시간</span>
                  <span className="text-xs lg:text-sm text-[#1A1C1A] font-bold">1회당 약 10~15분</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#EFEEEB] flex items-center justify-between">
              <span className="text-xs text-[#545F73]">마취 및 절개 불필요 / 당일 즉시 일상생활 복귀</span>
              <span className="text-[#00652C] text-xs lg:text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                상세 프로세스 보기 <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </span>
            </div>
          </div>

          {/* Tech Card 2: Prolo / PDRN (5 Cols) */}
          <div
            id="joint-cartilage-center"
            role="button"
            tabIndex={0}
            aria-label={`${TECHNOLOGIES[1].title} 자세히 보기`}
            onClick={() => onSelectTechnology(TECHNOLOGIES[1])}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectTechnology(TECHNOLOGIES[1]);
              }
            }}
            className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-sm border border-[#E9E8E5] flex flex-col justify-between group hover:shadow-md transition-all cursor-pointer scroll-mt-[132px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00652C]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-[#007D73] text-[#C5FFF5] text-xs font-bold">
                  고해상도 정밀 초음파 유도
                </span>
                <span className="text-xs text-[#6F7A6E] font-mono">TECHNOLOGY 02</span>
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-[#1A1C1A] tracking-tight group-hover:text-[#007D73] transition-colors">
                프롤로 인대강화 &amp; PDRN DNA 주사
              </h3>
              <p className="text-xs lg:text-sm text-[#3F493F] mt-2 leading-relaxed">
                실시간 초음파 모니터링으로 미세 손상 인대와 연골 부위를 확인한 뒤,
                고농도 포도당 및 연어 추출 PDRN 성분을 주입하여 인대의 회복 반응을 돕는 치료입니다.
              </p>

              <ul className="space-y-2 mt-4">
                <li className="flex items-center gap-2 text-xs lg:text-sm text-[#1A1C1A]">
                  <span className="material-symbols-outlined text-[#00652C] text-[18px]">check_circle</span>
                  <span>약화된 만성 인대의 증식을 유도하는 주사 치료</span>
                </li>
                <li className="flex items-center gap-2 text-xs lg:text-sm text-[#1A1C1A]">
                  <span className="material-symbols-outlined text-[#00652C] text-[18px]">check_circle</span>
                  <span>스테로이드 미사용(No-Steroid) 처방 원칙</span>
                </li>
              </ul>
            </div>

            <div className="mt-5 pt-3 border-t border-[#EFEEEB] flex items-center justify-between">
              <span className="text-xs text-[#545F73]">회전근개파열, 테니스엘보, 무릎인대손상</span>
              <span className="text-[#007D73] text-xs lg:text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                자세히 <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </span>
            </div>
          </div>

          {/* Tech Card 3: C-Arm Nerve Block (5 Cols) */}
          <div
            role="button"
            tabIndex={0}
            aria-label={`${TECHNOLOGIES[2].title} 자세히 보기`}
            onClick={() => onSelectTechnology(TECHNOLOGIES[2])}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectTechnology(TECHNOLOGIES[2]);
              }
            }}
            className="lg:col-span-5 bg-white rounded-2xl p-6 shadow-sm border border-[#E9E8E5] flex flex-col justify-between group hover:shadow-md transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00652C]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-[#D5E0F8] text-[#586377] text-xs font-bold">
                  HD 영상증폭 투시장비
                </span>
                <span className="text-xs text-[#6F7A6E] font-mono">TECHNOLOGY 03</span>
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-[#1A1C1A] tracking-tight group-hover:text-[#545F73] transition-colors">
                C-Arm 정밀 영상유도 척추신경차단술
              </h3>
              <p className="text-xs lg:text-sm text-[#3F493F] mt-2 leading-relaxed">
                움직이는 X-ray라 불리는 C-Arm으로 척추 신경관과 디스크 탈출 부위를 실시간 투시하며,
                신경 유착을 박리하고 급성 부종을 가라앉히는 주사 치료법입니다.
              </p>

              <div className="p-3 rounded-xl bg-[#F4F3F1] mt-4 space-y-1.5 border border-[#E9E8E5]">
                <div className="flex justify-between text-xs">
                  <span className="text-[#545F73]">시술 소요시간</span>
                  <span className="text-[#1A1C1A] font-bold">약 5분 내외 완료</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#545F73]">치료 후 회복</span>
                  <span className="text-[#1A1C1A] font-bold">30분 안정 후 귀가 가능</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#EFEEEB] flex items-center justify-between">
              <span className="text-xs text-[#545F73]">허리·목 디스크 급성 방사통 진정 특화</span>
              <span className="text-[#545F73] text-xs lg:text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                자세히 <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </span>
            </div>
          </div>

          {/* Tech Card 4: Cryo & High-Intensity Laser (7 Cols) */}
          <div
            role="button"
            tabIndex={0}
            aria-label={`${TECHNOLOGIES[3].title} 자세히 보기`}
            onClick={() => onSelectTechnology(TECHNOLOGIES[3])}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectTechnology(TECHNOLOGIES[3]);
              }
            }}
            className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-[#E9E8E5] flex flex-col justify-between group hover:shadow-md transition-all cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00652C]"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 rounded-full bg-[#89F5E7] text-[#00201D] text-xs font-bold">
                  -78℃ 신속 항염 &amp; 고출력 레이저
                </span>
                <span className="text-xs text-[#6F7A6E] font-mono">TECHNOLOGY 04</span>
              </div>
              <h3 className="text-lg lg:text-xl font-bold text-[#1A1C1A] tracking-tight group-hover:text-[#007D73] transition-colors">
                극저온 크라이오(Cryo) &amp; HILT 고강도 레이저
              </h3>
              <p className="text-xs lg:text-sm text-[#3F493F] mt-2 leading-relaxed">
                영하 78℃의 급속 냉각 이산화탄소 가스로 피부 온도를 급랭하여 신경 수용체의 통증 전달 경로를 
                일시 차단하고, 고강도 레이저의 광생체 반응으로 세포 내 미토콘드리아 ATP 생성을 자극합니다.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4">
                <div className="flex items-start gap-2 bg-[#F4F3F1] p-3 rounded-xl border border-[#E9E8E5]">
                  <span className="material-symbols-outlined text-[#007D73] text-[20px]">ac_unit</span>
                  <div>
                    <div className="text-xs lg:text-sm font-bold text-[#1A1C1A]">극저온 신경반사 치료</div>
                    <div className="text-xs text-[#545F73] mt-0.5">발목 염좌, 급성 인대 염증 부종 급속 진정</div>
                  </div>
                </div>
                <div className="flex items-start gap-2 bg-[#F4F3F1] p-3 rounded-xl border border-[#E9E8E5]">
                  <span className="material-symbols-outlined text-[#007D73] text-[20px]">wb_iridescent</span>
                  <div>
                    <div className="text-xs lg:text-sm font-bold text-[#1A1C1A]">HILT 고출력 레이저</div>
                    <div className="text-xs text-[#545F73] mt-0.5">관절강 내부 심부 세포 대사 활성화</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#EFEEEB] flex items-center justify-between">
              <span className="text-xs text-[#545F73]">수술 후 통증 증후군 및 운동선수 급성 외상 케어</span>
              <span className="text-[#007D73] text-xs lg:text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                치료 안내 <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </span>
            </div>
          </div>
        </div>

        {/* 의료광고 필수 고지 — 효과·부작용 개인차 */}
        <p className="mt-6 text-xs text-[#545F73] bg-white border border-[#E9E8E5] rounded-xl p-4 leading-relaxed break-keep">
          ※ 위 치료의 효과는 환자의 상태에 따라 개인차가 있으며, 통증·부종·멍 등 부작용이 나타날 수 있습니다.
          치료 방법과 적용 여부는 진료와 검사 결과를 바탕으로 전문의가 판단합니다. 본 화면은 가상 브랜드 샘플이며 실제 진료 정보가 아닙니다.
        </p>
      </div>
    </section>
  );
};
