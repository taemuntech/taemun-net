import React from 'react';

interface ColdchainTelemetryProps {
  onOpenReportModal: () => void;
}

export const ColdchainTelemetry: React.FC<ColdchainTelemetryProps> = ({
  onOpenReportModal
}) => {
  return (
    <section
      id="coldchain-inspection"
      className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 lg:p-8 shadow-sm"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-outline-variant">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-2xl">science</span>
            <h2 className="text-xl lg:text-2xl font-bold text-primary">
              골든 콜드체인 실시간 이력 추적 &amp; 품질 검증
            </h2>
          </div>
          <p className="text-[13px] text-on-surface-variant mt-1">
            농장 도축 순간부터 고객님 문 앞까지, 단 0.1초도 끊기지 않는 0~2℃ 무중단 저온 제어 시스템
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-secondary-container text-on-secondary-fixed-variant px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary animate-dawn-pulse"></span>
            IoT 온습도 센서 실시간 가동
          </span>
        </div>
      </div>

      {/* Live Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Telemetry Step 1: 축산물 이력 정보 */}
        <div className="lg:col-span-4 bg-surface-container-low rounded-xl p-5 border border-outline-variant">
          <div className="text-[11px] font-mono text-secondary font-bold uppercase mb-2">
            PROVENANCE LOG
          </div>
          <h3 className="text-base font-bold text-primary mb-3">도축 및 가공 정밀 이력</h3>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1 border-b border-outline-variant/60">
              <span className="text-on-surface-variant">축산물이력번호</span>
              <span className="font-mono font-bold text-primary">002194820192</span>
            </div>
            <div className="flex justify-between py-1 border-b border-outline-variant/60">
              <span className="text-on-surface-variant">도축일자</span>
              <span className="font-mono text-primary">2026.09.15 (08:30)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-outline-variant/60">
              <span className="text-on-surface-variant">도축장</span>
              <span className="text-primary font-medium">농협안성축산물공판장</span>
            </div>
            <div className="flex justify-between py-1 border-b border-outline-variant/60">
              <span className="text-on-surface-variant">가공시설 인증</span>
              <span className="text-secondary font-bold">HACCP 제2023-019호</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-on-surface-variant">포장 방식</span>
              <span className="text-primary">초신선 3중 스킨 진공밀봉</span>
            </div>
          </div>
        </div>

        {/* Telemetry Step 2: 실시간 온도 여정 타임라인 */}
        <div className="lg:col-span-8 bg-surface-container rounded-xl p-5 border border-outline-variant flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-mono text-secondary font-bold uppercase mb-2">
              LIVE TEMPERATURE TIMELINE
            </div>
            <h3 className="text-base font-bold text-primary mb-4">
              운송 전 구간 무경계 저온 데이터 (0~2℃)
            </h3>

            {/* Process Step Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant hover:border-secondary/50 transition-colors">
                <div className="flex items-center justify-between text-[11px] font-mono text-outline mb-1">
                  <span>STEP 01</span>
                  <span className="text-secondary font-mono font-bold">0.8℃</span>
                </div>
                <div className="font-bold text-primary text-xs">산지 출하시설</div>
                <div className="text-[11px] text-on-surface-variant mt-1 leading-snug">
                  진공 스킨팩 직후 저온 챔버 입고
                </div>
              </div>

              <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant hover:border-secondary/50 transition-colors">
                <div className="flex items-center justify-between text-[11px] font-mono text-outline mb-1">
                  <span>STEP 02</span>
                  <span className="text-secondary font-mono font-bold">1.2℃</span>
                </div>
                <div className="font-bold text-primary text-xs">냉장 탑차 이동</div>
                <div className="text-[11px] text-on-surface-variant mt-1 leading-snug">
                  차량 내부 GPS 온도 트래커 연동
                </div>
              </div>

              <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant hover:border-secondary/50 transition-colors">
                <div className="flex items-center justify-between text-[11px] font-mono text-outline mb-1">
                  <span>STEP 03</span>
                  <span className="text-secondary font-mono font-bold">1.0℃</span>
                </div>
                <div className="font-bold text-primary text-xs">곤지암 물류허브</div>
                <div className="text-[11px] text-on-surface-variant mt-1 leading-snug">
                  풀콜드 실내 피킹 &amp; 포장 구역
                </div>
              </div>

              <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant bg-surface-container-low/50 hover:border-secondary/50 transition-colors">
                <div className="flex items-center justify-between text-[11px] font-mono text-outline mb-1">
                  <span>STEP 04</span>
                  <span className="text-secondary font-mono font-bold">0.5℃ 유지</span>
                </div>
                <div className="font-bold text-primary text-xs">고객 문 앞 도착</div>
                <div className="text-[11px] text-on-surface-variant mt-1 leading-snug">
                  새벽 07:00 전 보냉백 인도 완료
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Eco Assurance */}
          <div className="mt-4 pt-4 border-t border-outline-variant flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-primary font-medium">
              <span className="material-symbols-outlined text-secondary text-base">water_drop</span>
              <span>100% 순수 물로 채운 종이 아이스팩 2개 동봉 (하수구 방류 가능)</span>
            </div>
            <button
              type="button"
              onClick={onOpenReportModal}
              className="text-secondary font-bold hover:underline flex items-center gap-1 font-mono text-xs cursor-pointer"
            >
              이력번호 전문 조회하기
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
