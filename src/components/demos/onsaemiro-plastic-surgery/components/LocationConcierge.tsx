import React, { useState } from 'react';

export const LocationConcierge: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [copyFailed, setCopyFailed] = useState<boolean>(false);
  const address = '서울특별시 강남구 압구정로 000 온새미로 메디컬 타워 4F~7F';

  // clipboard 는 비보안 문맥·권한 거부에서 거절된다 — 잡지 않으면 콘솔에 에러만 남고 버튼은 반응이 없다
  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopyFailed(true);
      setTimeout(() => setCopyFailed(false), 2500);
    }
  };

  return (
    <section className="w-full py-20 bg-[#fdf9f5] relative" id="location-concierge">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Left: Map Visual Container */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl overflow-hidden bg-[#f1ede9] shadow-md p-6 lg:p-8 border border-[#d1c5b8]/30">
            <div>
              <div className="flex flex-col gap-2 mb-4">
                <span className="text-[11px] uppercase tracking-wider text-[#725b38] font-bold">
                  LOCATION &amp; ACCESS
                </span>
                <h3 className="font-serif text-[24px] lg:text-[28px] text-[#1c1c19]">
                  압구정로데오역 5번 출구 도보 2분
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[13px] text-[#4d463c]">
                    {address}
                  </p>
                  <button
                    onClick={handleCopyAddress}
                    className="text-[11px] px-2.5 py-1 min-h-[44px] rounded-md bg-[#ffffff] text-[#725b38] border border-[#c5a880]/40 font-medium hover:bg-[#c5a880]/10 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {copyFailed ? 'error' : copied ? 'check' : 'content_copy'}
                    </span>
                    <span>{copyFailed ? '복사 권한 없음' : copied ? '복사 완료' : '주소 복사'}</span>
                  </button>
                </div>
              </div>

              {/* 약도 그래픽 — 원래는 구글 지도 캡처(구글 로고와 「Map data ©2026 TMap Mobility」 워터마크가
                  그대로 박힌 이미지)를 배경으로 깔았다. 지어낸 의원 화면에 실존 지도 서비스 자산을 얹는 꼴이고,
                  주소도 가상(압구정로 000)이라 실제 지도를 보여 줄 근거가 없다. 자체 약도로 바꾼다. */}
              <div className="w-full h-72 lg:h-80 rounded-2xl bg-[#ece7e1] relative overflow-hidden shadow-inner flex items-end p-4 border border-[#d1c5b8]/40">
                <div className="absolute inset-0 opacity-50 bg-[radial-gradient(#d1c5b8_1px,transparent_1px)] [background-size:16px_16px]" />
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <line x1="0" y1="44%" x2="100%" y2="44%" stroke="#dfd6cc" strokeWidth="26" />
                  <line x1="34%" y1="0" x2="34%" y2="100%" stroke="#dfd6cc" strokeWidth="18" />
                  <line x1="0" y1="14%" x2="100%" y2="72%" stroke="#e6ded6" strokeWidth="12" />
                  <line x1="0" y1="44%" x2="100%" y2="44%" stroke="#c5a880" strokeWidth="3" strokeDasharray="10 8" />
                </svg>
                <div className="absolute top-4 left-4 right-4 text-center text-[11px] text-[#6d6459]">
                  <span className="inline-block bg-[#fdf9f5]/90 px-2 py-0.5 rounded border border-[#d1c5b8]/50">
                    약도 (예시) — 실제 지도가 아닙니다
                  </span>
                </div>
                <div className="absolute top-14 left-4 bg-[#fdf9f5] px-2.5 py-1 rounded shadow-sm text-[11px] font-medium text-[#4d463c] border border-[#d1c5b8]/50">
                  압구정로데오역 5번출구
                </div>
                <div className="absolute top-14 right-4 bg-[#fdf9f5] px-2.5 py-1 rounded shadow-sm text-[11px] font-medium text-[#4d463c] border border-[#d1c5b8]/50">
                  청담사거리 방면
                </div>
                <div className="absolute top-[44%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                  <div className="bg-[#1c1c19] text-[#e8d5b5] px-3 py-1.5 rounded-lg shadow-lg text-xs font-semibold flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#c5a880]" />
                    <span>본원 위치</span>
                  </div>
                  <div className="w-3 h-3 bg-[#1c1c19] rotate-45 -mt-1.5" />
                </div>
                {/* relative z-10 — 위 약도 레이어가 absolute 라 그냥 두면 정적 블록인 이 카드를 덮어 버린다 */}
                <div className="relative z-10 bg-[#fdf9f5]/90 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-[#c5a880]/30 flex items-center gap-3">
                  <span className="material-symbols-outlined text-[#725b38] text-[24px]">location_on</span>
                  <div>
                    <div className="text-[15px] font-semibold text-[#1c1c19]">
                      온새미로 메디컬 타워
                    </div>
                    <div className="text-[11px] text-[#4d463c]">
                      지하 프라이빗 발렛 주차장 직결 엘리베이터 운행
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-6 pt-2">
              <div className="p-3.5 rounded-xl bg-[#ffffff] border border-[#d1c5b8]/30 shadow-sm">
                <span className="text-[14px] font-semibold text-[#1c1c19] flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-[#725b38] text-[18px]">directions_subway</span>
                  지하철 이용 시
                </span>
                <span className="text-[12px] text-[#4d463c] leading-relaxed block">
                  수인분당선 압구정로데오역 5번 출구 150m 직진 후 도보 2분
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#ffffff] border border-[#d1c5b8]/30 shadow-sm">
                <span className="text-[14px] font-semibold text-[#1c1c19] flex items-center gap-1.5 mb-1">
                  <span className="material-symbols-outlined text-[#725b38] text-[18px]">local_parking</span>
                  자가용 이용 시
                </span>
                <span className="text-[12px] text-[#4d463c] leading-relaxed block">
                  건물 1층 전담 의전팀 발렛파킹(Valet) 상시 대기
                </span>
              </div>
            </div>
          </div>

          {/* Right: Clinic Hours & Secret Elevator Access */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 p-6 lg:p-8 rounded-3xl bg-[#ffffff] shadow-md border border-[#d1c5b8]/30">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-wider text-[#725b38] font-bold">
                  OPERATING HOURS
                </span>
                <h3 className="font-serif text-[22px] font-semibold text-[#1c1c19]">
                  진료 및 수술 시간표
                </h3>
              </div>

              <div className="space-y-2.5 text-[13px]">
                <div className="flex justify-between items-center py-2 border-b border-[#f1ede9]">
                  <span className="text-[#4d463c]">월 · 화 · 목</span>
                  <span className="font-semibold text-[#1c1c19]">10:00 - 19:00</span>
                </div>
                <div className="flex justify-between items-center py-2.5 bg-[#f7f3ef] px-3.5 rounded-xl border border-[#c5a880]/30">
                  <span className="text-[#725b38] font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#725b38]"></span>
                    수 · 금 (VIP 야간 상담제)
                  </span>
                  <span className="font-bold text-[#725b38]">10:00 - 20:30</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#f1ede9]">
                  <span className="text-[#4d463c]">토요일 (집중 예약제)</span>
                  <span className="font-semibold text-[#1c1c19]">10:00 - 16:00 (점심시간 없음)</span>
                </div>
                <div className="flex justify-between items-center py-2 text-[#4d463c]">
                  <span>일요일 및 법정 공휴일</span>
                  <span className="font-semibold text-[#ba1a1a]">프라이빗 정기 휴진</span>
                </div>
              </div>

              {/* Floor directory */}
              <div className="pt-2 flex flex-col gap-2">
                <span className="text-[11px] uppercase tracking-wider text-[#725b38] font-bold">
                  TOWER DIRECTORY
                </span>
                <div className="grid grid-cols-1 gap-2 text-[12px] text-[#4d463c]">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-[#f7f3ef]">
                    <span className="px-2 py-0.5 rounded bg-[#ffffff] font-mono text-[11px] text-[#725b38] font-bold">7F</span>
                    <span>1인 VIP 붓기 완화 힐링 라운지 &amp; 고압산소실</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-[#f7f3ef]">
                    <span className="px-2 py-0.5 rounded bg-[#ffffff] font-mono text-[11px] text-[#725b38] font-bold">6F</span>
                    <span>Class 1,000 무균 양압 클린 수술실 &amp; 안심 CCTV 참관실</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-[#f7f3ef]">
                    <span className="px-2 py-0.5 rounded bg-[#ffffff] font-mono text-[11px] text-[#725b38] font-bold">5F</span>
                    <span>3D 안면 정밀 계측실 &amp; 원장 1:1 시크릿 상담 스위트</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-[#f7f3ef]">
                    <span className="px-2 py-0.5 rounded bg-[#ffffff] font-mono text-[11px] text-[#725b38] font-bold">4F</span>
                    <span>VIP 컨시어지 데스크 &amp; 라운지</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#ebe7e4]/70 text-center text-[12px] text-[#4d463c] border border-[#d1c5b8]/30">
              상담 당일 대기 없이 개별 프라이빗 룸으로 즉시 안내받으실 수 있습니다.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
