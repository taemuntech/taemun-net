import React from 'react';
import { Language } from '../types';

interface LocationAndGuideProps {
  language: Language;
}

export const LocationAndGuide: React.FC<LocationAndGuideProps> = ({ language }) => {
  return (
    <section id="location-guide" className="w-full py-20 bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 lg:mb-12 break-keep">
          <span className="px-3.5 py-1.5 rounded-full bg-primary-fixed text-primary font-label-caps text-[11px] font-bold">
            LOCATION &amp; CONSULTATION HOURS
          </span>
          <h2 className="font-headline-xl text-[26px] lg:text-[38px] text-on-surface font-extrabold tracking-tight mt-3 leading-snug">
            {language === 'KR'
              ? '강남역 1번 출구 도보 1분 오시는 길 & 진료시간'
              : 'Location & Consultation Hours'}
          </h2>
          <p className="font-body-lg text-[14px] lg:text-[17px] text-on-surface-variant mt-2 leading-relaxed">
            {language === 'KR'
              ? '역삼 · 강남 테헤란로의 중심, 쾌적한 프라이빗 메디컬 라운지에서 정밀 아이케어를 받아 보세요. 아래 주소와 번호는 샘플용 예시입니다.'
              : 'Located at Gangnam Station Exit 1, Teheran-ro 124, Prime Medical Tower 4-7F.'}
          </p>
        </div>

        {/* 2-Column Info & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch break-keep">
          {/* Detailed Info Card (6 Cols) */}
          <div className="lg:col-span-6 bg-surface-container-lowest p-6 lg:p-8 rounded-2xl shadow-sm flex flex-col justify-between border border-surface-container/50">
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[22px]">location_on</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-[16px] font-bold text-on-surface">병원 위치 및 주소</h4>
                  <p className="font-body-sm text-[14px] text-on-surface-variant mt-1 leading-relaxed">
                    서울특별시 강남구 테헤란로 124 프라임 메디컬 타워<br />
                    4층 (정밀검진센터) ~ 7층 (시력교정 및 노안 · 백내장 수술센터)
                  </p>
                </div>
              </div>

              {/* Subway & Transit */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed text-secondary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[22px]">subway</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-[16px] font-bold text-on-surface">지하철 및 대중교통</h4>
                  <p className="font-body-sm text-[14px] text-on-surface-variant mt-1 leading-relaxed">
                    <strong className="text-primary font-semibold">2호선 / 신분당선 강남역 1번 출구</strong> 나오신 후 테헤란로 방면 80m 직진 (도보 1분 거리, 1층에 카페가 입점한 빌딩)
                  </p>
                </div>
              </div>

              {/* Parking */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed text-tertiary flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[22px]">local_parking</span>
                </div>
                <div>
                  <h4 className="font-headline-sm text-[16px] font-bold text-on-surface">전용 주차 및 발레파킹</h4>
                  <p className="font-body-sm text-[14px] text-on-surface-variant mt-1 leading-relaxed">
                    건물 타워 지하 전용 주차장 완비. 내원 시 1층 주차부스에서 <strong className="text-on-surface font-semibold">발레파킹</strong> 서비스를 이용하실 수 있으며, 내원 확인 시 주차 등록을 도와 드립니다.
                  </p>
                </div>
              </div>

              {/* Hours Box */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container space-y-2">
                <div className="flex items-center gap-2 text-primary font-headline-sm text-[14px] font-bold mb-1">
                  <span className="material-symbols-outlined text-[18px]">schedule</span>
                  <span>상세 진료 및 수술 시간</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-1.5 gap-x-4 font-body-sm text-[13px] text-on-surface-variant">
                  <div><strong>월 ~ 목 :</strong> 09:30 ~ 18:30</div>
                  <div><strong>금요일 (야간) :</strong> 09:30 ~ 20:30</div>
                  <div><strong>토요일 :</strong> 09:00 ~ 16:00 (노런치)</div>
                  <div><strong>일 / 공휴일 :</strong> 휴진 (당직제)</div>
                </div>
                <div className="text-[12px] text-outline pt-1">
                  ※ 점심시간: 13:00 ~ 14:00 (토요일은 점심시간 없이 연속 진료)
                </div>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-surface-container flex items-center justify-between">
              <div>
                <span className="font-label-caps text-[11px] text-on-surface-variant">대표 전화 문의</span>
                <div className="font-label-numeric text-[20px] font-bold text-primary">02-0000-0000</div>
              </div>
              <a
                href="#fast-track-section"
                className="inline-flex items-center px-5 py-2.5 min-h-[44px] rounded-xl bg-primary text-on-primary font-headline-sm text-[13px] font-bold hover:bg-primary-container hover:text-on-primary-container transition-all"
              >
                예약 신청 바로가기
              </a>
            </div>
          </div>

          {/* Interactive Map Visual Card (6 Cols) */}
          <div className="lg:col-span-6 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col border border-surface-container/50">
            <div className="relative w-full h-[320px] lg:h-[380px] bg-surface-container overflow-hidden">
              <img
                src="/demo-media/prime-vision-eye-clinic/prime-vision-eye-clinic-02.png"
                alt="Map of Gangnam Station Exit 1 Prime Medical Tower"
                className="w-full h-full object-cover"
               referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/60 via-transparent to-transparent pointer-events-none"></div>

              {/* Pin Marker */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-headline-sm text-[12px] font-bold shadow-xl border-2 border-surface-container-lowest animate-bounce">
                  프라임 스마트 아이 안과 (4-7F)
                </div>
                <div className="w-3 h-3 bg-primary rotate-45 -mt-1.5"></div>
              </div>

              {/* Bottom location badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-2 text-on-surface">
                  <span className="material-symbols-outlined text-primary text-[20px]">directions_walk</span>
                  <span className="font-headline-sm text-[13px] font-bold">
                    강남역 1번 출구에서 80m (1분)
                  </span>
                </div>
                <span className="font-label-caps text-[11px] text-primary font-semibold">PARKING AVAILABLE</span>
              </div>
            </div>

            <div className="p-6 flex flex-wrap items-center justify-between gap-4">
              <div className="font-body-sm text-[13px] text-on-surface-variant">
                실제 사이트라면 지도 앱에서 병원 이름을 검색해 실시간 교통 · 주차 현황을 볼 수 있는 자리입니다. (아래 버튼은 지도 서비스 첫 화면으로 이동합니다 — 샘플 주소라 검색 결과는 없습니다.)
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="https://map.naver.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 min-h-[44px] rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-body-sm text-[13px] font-medium transition-all"
                >
                  네이버 지도
                </a>
                <a
                  href="https://map.kakao.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 min-h-[44px] rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-body-sm text-[13px] font-medium transition-all"
                >
                  카카오맵
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
