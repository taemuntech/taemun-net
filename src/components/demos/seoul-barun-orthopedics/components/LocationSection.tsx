import React from 'react';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="w-full bg-[#FAF9F6] py-12 lg:py-16 scroll-mt-[132px]">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center gap-1.5 text-[#00652C] text-xs lg:text-sm mb-1 font-bold">
            <span className="material-symbols-outlined text-[18px]">map</span>
            <span>LOCATION &amp; CLINICAL HOURS</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-[#1A1C1A] tracking-tight">
            오시는 길 &amp; 화·목 야간진료 안내
          </h2>
          <p className="text-sm lg:text-base text-[#3F493F] mt-2">
            퇴근 후에도 여유롭게 진료받으실 수 있도록 매주 화요일과 목요일 저녁 8시까지 야간진료를 시행합니다.
          </p>
        </div>

        {/* Information 3-Column Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Hours Card */}
          <div className="bg-white p-5 lg:p-6 rounded-2xl shadow-sm border border-[#E9E8E5] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#00652C]/10 text-[#00652C] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined">schedule</span>
              </div>
              <h3 className="text-base lg:text-lg font-bold text-[#1A1C1A] mb-3">상세 진료 시간</h3>
              <div className="space-y-2 text-xs lg:text-sm text-[#3F493F]">
                <div className="flex justify-between py-1.5 border-b border-[#EFEEEB]">
                  <span className="text-[#545F73]">월 · 수 · 금</span>
                  <span className="font-semibold text-[#1A1C1A]">09:00 - 18:30</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#EFEEEB] bg-[#00652C]/5 px-2 rounded-md">
                  <span className="text-[#00652C] font-bold">화 · 목 (야간진료)</span>
                  <span className="font-bold text-[#00652C]">09:00 - 20:00</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#EFEEEB]">
                  <span className="text-[#545F73]">토요일 (점심없음)</span>
                  <span className="font-semibold text-[#1A1C1A]">09:00 - 14:00</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#545F73]">점심시간 (평일)</span>
                  <span className="text-[#1A1C1A]">13:00 - 14:00</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 text-[#BA1A1A] text-xs border-t border-[#EFEEEB]">
              * 일요일 및 법정 공휴일은 집중 치료실 정기 소독으로 휴진합니다.
            </div>
          </div>

          {/* Parking & Subway Card */}
          <div className="bg-white p-5 lg:p-6 rounded-2xl shadow-sm border border-[#E9E8E5] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#D5E0F8] text-[#586377] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined">directions_subway</span>
              </div>
              <h3 className="text-base lg:text-lg font-bold text-[#1A1C1A] mb-3">지하철 &amp; 도보 안내</h3>
              <div className="space-y-3 text-xs lg:text-sm text-[#3F493F]">
                <div className="p-3 rounded-xl bg-[#F4F3F1] border border-[#E9E8E5]">
                  <div className="font-bold text-[#1A1C1A]">지하철 2호선 · 3호선 교대역</div>
                  <div className="text-xs text-[#545F73] mt-0.5">
                    4번 출구 바로 앞 도보 1분 (메디컬타워 2~5층 전관)
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#F4F3F1] border border-[#E9E8E5]">
                  <div className="font-bold text-[#1A1C1A]">지하철 2호선 서초역</div>
                  <div className="text-xs text-[#545F73] mt-0.5">
                    1번 출구 도보 5분 거리 (서초대로 방면 직진)
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 text-[#00652C] text-xs font-bold flex items-center gap-1.5 border-t border-[#EFEEEB]">
              <span className="material-symbols-outlined text-[16px]">accessible</span>
              <span>거동 불편 환자 전용 엘리베이터 및 휠체어 리프트 가동</span>
            </div>
          </div>

          {/* Valet Parking Card */}
          <div className="bg-white p-5 lg:p-6 rounded-2xl shadow-sm border border-[#E9E8E5] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#007D73]/10 text-[#007D73] flex items-center justify-center mb-4">
                <span className="material-symbols-outlined">local_parking</span>
              </div>
              <h3 className="text-base lg:text-lg font-bold text-[#1A1C1A] mb-3">주차 시설 &amp; 발렛 서비스</h3>
              <div className="space-y-2.5 text-xs lg:text-sm text-[#3F493F]">
                <div className="p-3 rounded-xl bg-[#F4F3F1] border border-[#E9E8E5]">
                  <div className="font-bold text-[#1A1C1A]">지상 및 지하 자주식 대형 주차장 완비</div>
                  <div className="text-xs text-[#545F73] mt-0.5">
                    SUV, 대형 세단 모두 편리하게 입출차 가능 (총 80대 수용)
                  </div>
                </div>
                <ul className="text-xs text-[#3F493F] space-y-1 pl-4 list-disc">
                  <li>
                    <strong>진료 및 검사 환자:</strong> 2시간 전액 무료 주차 지원
                  </li>
                  <li>
                    <strong>도수재활 및 MRI 검진 환자:</strong> 최대 3시간 무료 주차
                  </li>
                  <li>본원 1층 발렛파킹 부스 상시 운영 중 (무료 대행)</li>
                </ul>
              </div>
            </div>

            {/* 가상 상호라 내비에서 검색하면 아무것도 안 나온다 — 「이렇게 검색하세요」로 두면 거짓 안내가 된다. */}
            <div className="mt-4 pt-3 text-[#3F493F] text-xs border-t border-[#EFEEEB]">
              내비게이션 검색어 표기 자리:{' '}
              <strong className="text-[#1A1C1A]">'서울바른마디정형외과'</strong> ·{' '}
              <strong className="text-[#1A1C1A]">'바른마디메디컬타워'</strong>{' '}
              <span className="text-[#6F7A6E]">(샘플이라 실제로는 검색되지 않습니다)</span>
            </div>
          </div>
        </div>

        {/* Map Integration Container */}
        <div className="relative w-full h-80 lg:h-96 rounded-2xl overflow-hidden shadow-sm bg-[#EFEEEB] border border-[#E9E8E5]">
          {/* 약도 그래픽 — 원래는 구글 지도 캡처(구글 로고와 「Map data ©2026 TMap Mobility」가 찍힌 이미지)를
              배경으로 깔았다. 지어낸 병원 화면에 실존 지도 서비스 자산을 얹는 것이라 나머지 의료 샘플 5종과
              같은 방식(자체 약도)으로 바꿨다. 위치는 가상이므로 지도가 아니라 「약도」임을 화면에 적는다. */}
          <div
            className="w-full h-full relative"
            role="img"
            aria-label="교대역과 서초역 사이 바른마디 메디컬타워 위치를 나타낸 약도 (예시)"
          >
            <div className="absolute inset-0 opacity-50 bg-[radial-gradient(#C9D2C8_1px,transparent_1px)] [background-size:16px_16px]" />
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <line x1="0" y1="52%" x2="100%" y2="52%" stroke="#E3E2E0" strokeWidth="26" />
              <line x1="38%" y1="0" x2="38%" y2="100%" stroke="#E3E2E0" strokeWidth="18" />
              <line x1="0" y1="18%" x2="100%" y2="78%" stroke="#EAE9E6" strokeWidth="12" />
              <line x1="0" y1="52%" x2="100%" y2="52%" stroke="#95F8A7" strokeWidth="3" strokeDasharray="10 8" />
            </svg>

            <div className="absolute top-12 left-4 bg-white px-2.5 py-1 rounded shadow-sm text-[11px] font-medium text-[#3F493F] border border-[#E9E8E5]">
              교대역 4번출구
            </div>
            <div className="absolute top-12 right-4 bg-white px-2.5 py-1 rounded shadow-sm text-[11px] font-medium text-[#3F493F] border border-[#E9E8E5]">
              서초역 방면
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="bg-[#1A1C1A] text-[#95F8A7] px-3 py-1.5 rounded-lg shadow-lg text-xs font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#95F8A7]" />
                <span>바른마디 메디컬타워</span>
              </div>
              <div className="w-3 h-3 bg-[#1A1C1A] rotate-45 -mt-1.5" />
            </div>
            <div className="absolute top-4 left-4 right-4 text-center text-[11px] text-[#6F7A6E]">
              <span className="inline-block bg-white/85 px-2 py-0.5 rounded border border-[#E9E8E5]">
                약도 (예시) — 실제 지도가 아닙니다
              </span>
            </div>
          </div>

          {/* In-map floating card */}
          <div className="absolute bottom-4 left-4 right-4 lg:right-auto bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg max-w-sm border border-white/80">
            <div className="text-xs lg:text-sm font-bold text-[#1A1C1A] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#00652C] text-[18px]">location_on</span>
              <span>서울 바른마디 척추관절 정형외과</span>
            </div>
            <div className="text-xs text-[#545F73] mt-1">
              서울특별시 서초구 서초중앙로 142 바른마디 메디컬타워 2F~5F 전관
            </div>
            <div className="mt-3 flex items-center gap-2">
              <a
                className="px-3 py-1.5 bg-[#00652C] hover:bg-[#15803D] text-white rounded-lg text-xs font-bold inline-flex items-center gap-1 transition-colors"
                href="#fast-track-booking"
              >
                <span className="material-symbols-outlined text-[14px]">call</span>
                <span>02-0000-0000</span>
              </a>
              <span className="text-[11px] text-[#6F7A6E]">대표 상담 및 예약</span>
            </div>
          </div>
        </div>

        {/* Portfolio Demo Notice Banner */}
        <div className="mt-6 p-4 rounded-xl bg-[#E3E2E0]/60 text-center text-xs text-[#545F73] border border-[#E9E8E5]">
          <p className="font-bold text-[#1A1C1A]">※ 포트폴리오 디자인 데모 안내</p>
          <p className="mt-0.5">
            본 웹사이트는 웹 인터랙션 및 의료 디자인 시스템 연구를 위해 제작된 가상 병원 샘플 데모 페이지이며 실제 의료기관이 아닙니다.
          </p>
        </div>
      </div>
    </section>
  );
};
