import React, { useState } from 'react';

export const NetworkAndLocationSection: React.FC = () => {
  const [mapTab, setMapTab] = useState<'subway' | 'car' | 'shuttle'>('subway');

  return (
    <section className="w-full bg-[#faf9f6] py-16">
      <div className="max-w-[1360px] mx-auto px-4 lg:px-8">
        {/* Network Hospitals Header */}
        <div className="text-center max-w-[720px] mx-auto mb-10">
          <span className="text-[12px] text-[#75593c] tracking-widest uppercase font-semibold">
            Emergency Referral Network
          </span>
          <h2 className="font-serif text-[32px] lg:text-[38px] text-[#102a20] font-semibold mt-1">
            주요 대학병원 골든타임 비상 핫라인
          </h2>
          <p className="text-[15px] text-[#424844] mt-2">
            응급 상황 발생 시 즉시 전원 가능한 비상 의료 협력망과 항암·방사선 외래 통원 차량을 운행합니다.
          </p>
        </div>

        {/* 4 University Hospitals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          <div className="bg-white p-5 rounded-xl border border-[#e3e2e0] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif text-[18px] text-[#102a20] font-bold">서초 성모 메디컬 센터 (가상 협력망)</span>
                <span className="text-[11px] bg-[#cbe9da] text-[#052017] px-2 py-0.5 rounded font-semibold">
                  차량 7분
                </span>
              </div>
              <p className="text-[13px] text-[#424844] leading-relaxed">
                서초 성모 메디컬 센터 응급의료센터와 최단 거리 직통 앰뷸런스 비상 이송 핫라인
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#efeeeb] text-[12px] text-[#75593c] font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">local_shipping</span>
              <span>외래 항암치료 정기 픽업</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#e3e2e0] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif text-[18px] text-[#102a20] font-bold">일원 메디컬 암병원 (가상 협력망)</span>
                <span className="text-[11px] bg-[#ffd9b4] text-[#533417] px-2 py-0.5 rounded font-semibold">
                  차량 15분
                </span>
              </div>
              <p className="text-[13px] text-[#424844] leading-relaxed">
                일원 메디컬 암병원 (가상 협력망) 암병원 외래 진료 일정과 연계된 1:1 리무진 동행 케어 시스템
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#efeeeb] text-[12px] text-[#75593c] font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              <span>방사선 통원 스케줄 관리</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#e3e2e0] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif text-[18px] text-[#102a20] font-bold">송파 아산 메디컬 (가상 협력망)</span>
                <span className="text-[11px] bg-[#e9e8e5] text-[#102a20] px-2 py-0.5 rounded font-semibold">
                  차량 20분
                </span>
              </div>
              <p className="text-[13px] text-[#424844] leading-relaxed">
                풍납동 송파 아산 메디컬 (가상 협력망) 암병원 전원 및 수술 후 집중 회복을 위한 원스톱 이송 협력
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#efeeeb] text-[12px] text-[#75593c] font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">support</span>
              <span>퇴원 환자 안심 픽업</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#e3e2e0] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-serif text-[18px] text-[#102a20] font-bold">국립암센터</span>
                <span className="text-[11px] bg-[#e9e8e5] text-[#102a20] px-2 py-0.5 rounded font-semibold">
                  공동 진료망
                </span>
              </div>
              <p className="text-[13px] text-[#424844] leading-relaxed">
                국가 암 진료 가이드라인에 기반한 의·한의 통합 면역 프로토콜 공동 적용
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-[#efeeeb] text-[12px] text-[#75593c] font-medium flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">handshake</span>
              <span>임상 데이터 상호 참조</span>
            </div>
          </div>
        </div>

        {/* Location & Valet Parking Detail */}
        <div className="bg-[#f4f3f0] rounded-2xl p-6 lg:p-10 border border-[#e9e8e5]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 text-[12px] text-[#75593c] font-semibold bg-[#e9e8e5] px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-[16px]">location_on</span>
                <span>서초 반포 중심 메디컬 랜드마크</span>
              </div>
              <h3 className="font-serif text-[28px] text-[#102a20] font-semibold">
                오시는 길 &amp; 24시간 안심 발렛파킹
              </h3>
              <p className="text-[15px] text-[#424844] leading-relaxed">
                서울특별시 서초구 반포대로 180 (서초역 1번 출구 도보 3분 / 교대역 9번 출구 인근).
                병원 정문 도착 즉시 전문 발렛 요원이 주차를 대행해 드려 거동이 불편하신 환자분도 편안하게 입장하실 수 있습니다.
              </p>

              {/* Direction Tabs */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setMapTab('subway')}
                  className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-colors cursor-pointer ${
                    mapTab === 'subway'
                      ? 'bg-[#102a20] text-white'
                      : 'bg-white text-[#424844] border border-[#e3e2e0]'
                  }`}
                >
                  지하철 안내
                </button>
                <button
                  onClick={() => setMapTab('car')}
                  className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-colors cursor-pointer ${
                    mapTab === 'car'
                      ? 'bg-[#102a20] text-white'
                      : 'bg-white text-[#424844] border border-[#e3e2e0]'
                  }`}
                >
                  자가용 및 주차
                </button>
                <button
                  onClick={() => setMapTab('shuttle')}
                  className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-colors cursor-pointer ${
                    mapTab === 'shuttle'
                      ? 'bg-[#102a20] text-white'
                      : 'bg-white text-[#424844] border border-[#e3e2e0]'
                  }`}
                >
                  병원 셔틀버스
                </button>
              </div>

              {/* Tab descriptions */}
              <div className="p-4 bg-white rounded-xl border border-[#e3e2e0] text-[13px] text-[#424844] space-y-2">
                {mapTab === 'subway' && (
                  <>
                    <div className="flex items-center gap-2 font-medium text-[#1a1c1a]">
                      <span className="w-5 h-5 rounded-full bg-[#3cb44a] text-white flex items-center justify-center text-[10px] font-bold">
                        2
                      </span>
                      <span>2호선 서초역 1번 출구 도보 3분 직진</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium text-[#1a1c1a]">
                      <span className="w-5 h-5 rounded-full bg-[#ef7c1c] text-white flex items-center justify-center text-[10px] font-bold">
                        3
                      </span>
                      <span>3호선 교대역 9번 출구 도보 7분 (도보 셔틀 수시 운행)</span>
                    </div>
                  </>
                )}

                {mapTab === 'car' && (
                  <>
                    <p>• 내비게이션 검색: <strong>'본초통합한방병원'</strong> 또는 <strong>'서초구 반포대로 180'</strong></p>
                    <p>• 입원 환자 및 보호자: <strong>입원 기간 전일 무료 주차</strong> 지원</p>
                    <p>• 외래 진료 환자: <strong>4시간 무료 발렛파킹</strong> 지원</p>
                  </>
                )}

                {mapTab === 'shuttle' && (
                  <>
                    <p>• 서초 성모 메디컬 센터 (가상 협력망) 암병원 정문 ↔ 본초한방병원: <strong>30분 간격 순환 셔틀</strong> 운행</p>
                    <p>• 탑승 위치: 성모병원 본관 1층 정문 택시 승강장 건너편 전용 셔틀 베이</p>
                    <p>• 첫차 08:30 / 막차 18:00 (입원·외래 예약 환자 무료 탑승)</p>
                  </>
                )}
              </div>
            </div>

            {/* Interactive Map Visual Representation */}
            <div className="lg:col-span-6">
              <div className="bg-white rounded-xl p-5 border border-[#e3e2e0] shadow-md space-y-4">
                <div className="relative h-64 bg-[#efeeeb] rounded-lg overflow-hidden flex items-center justify-center border border-[#e3e2e0]">
                  {/* Stylized schematic map */}
                  <div className="absolute inset-0 bg-[#f4f3f0] flex flex-col justify-between p-4">
                    <div className="flex justify-between items-center text-[11px] text-[#727974]">
                      <span>반포대교 방면 ↑</span>
                      <span>서울고속버스터미널 (차량 5분)</span>
                    </div>
                    {/* Roads grid */}
                    <div className="relative h-28 bg-[#e9e8e5] rounded-lg flex items-center justify-center border border-[#e3e2e0]">
                      <div className="absolute w-full h-8 bg-[#c2c8c3]/40 top-10"></div>
                      <div className="absolute h-full w-8 bg-[#c2c8c3]/40 left-28"></div>
                      {/* Hospital pin */}
                      <div className="relative z-10 flex flex-col items-center animate-bounce">
                        <div className="bg-[#102a20] text-white px-3 py-1.5 rounded-lg shadow-lg text-[12px] font-bold flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-[#cbe9da]">local_hospital</span>
                          <span>본초 통합한방병원</span>
                        </div>
                        <div className="w-2 h-2 bg-[#102a20] rotate-45 -mt-1"></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-[11px] text-[#727974]">
                      <span>서초역 1번 출구 (도보 3분)</span>
                      <span>서초IC 방면 ↓</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[13px] text-[#102a20] font-semibold pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#102a20]">car_rental</span>
                    <span>24시간 전담 발렛파킹 요원 상주 (정문 대기)</span>
                  </div>
                  <a
                    href="https://map.kakao.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#75593c] hover:underline flex items-center gap-0.5 text-[12px]"
                  >
                    <span>지도 앱 길찾기</span>
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
