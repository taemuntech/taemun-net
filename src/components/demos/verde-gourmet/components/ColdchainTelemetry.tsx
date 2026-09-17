import React from 'react';
import { TELEMETRY_STEPS } from '../data/mockData';

interface ColdchainTelemetryProps {
  onOpenReportModal: () => void;
}

export const ColdchainTelemetry: React.FC<ColdchainTelemetryProps> = ({
  onOpenReportModal
}) => {
  return (
    <section
      id="coldchain-inspection"
      className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 lg:p-8 shadow-sm scroll-mt-[calc(var(--sample-bar-h,0px)_+_140px)]"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-outline-variant">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-2xl">science</span>
            <h2 className="text-xl lg:text-2xl font-bold text-primary">
              골든 콜드체인 이력 추적 &amp; 품질 검증 화면
            </h2>
          </div>
          <p className="text-[13px] text-on-surface-variant mt-1">
            산지에서 고객님 문 앞까지 0~2℃ 저온 구간을 단계별로 보여 주는 화면입니다. 아래 이력·번호·온도는 모두 예시 데이터입니다.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-secondary-container text-on-secondary-fixed-variant px-3 py-1.5 rounded-full text-xs font-mono font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary animate-dawn-pulse"></span>
            IoT 온습도 센서 화면 (예시)
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
              <span className="font-mono font-bold text-primary">000000000000 (예시)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-outline-variant/60">
              <span className="text-on-surface-variant">도축일자</span>
              <span className="font-mono text-primary">2026.09.15 (08:30)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-outline-variant/60">
              <span className="text-on-surface-variant">도축장</span>
              <span className="text-primary font-medium">○○축산물공판장 (예시)</span>
            </div>
            <div className="flex justify-between py-1 border-b border-outline-variant/60">
              <span className="text-on-surface-variant">가공시설 인증</span>
              <span className="text-secondary font-bold">식품안전 인증 표기 (예시)</span>
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
              TEMPERATURE TIMELINE (SAMPLE DATA)
            </div>
            <h3 className="text-base font-bold text-primary mb-4">
              운송 전 구간 무경계 저온 데이터 (0~2℃)
            </h3>

            {/* Process Step Cards — 검증서 모달과 **같은 데이터**를 쓴다(따로 적어 두면 한쪽만 고쳐져 갈라진다) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {TELEMETRY_STEPS.map((step) => (
                <div
                  key={step.step}
                  className={`p-3 rounded-lg border transition-colors hover:border-secondary/50 ${ step.status === 'ready' ? 'bg-secondary-container/40 border-secondary/40' : 'bg-surface-container-lowest border-outline-variant' }`}
                >
                  <div className="flex items-center justify-between gap-1 text-[11px] font-mono text-outline mb-1">
                    <span>{step.step}</span>
                    <span className="text-secondary font-mono font-bold whitespace-nowrap">{step.temp}</span>
                  </div>
                  <div className="font-bold text-primary text-xs">{step.title}</div>
                  <div className="text-[11px] text-on-surface-variant mt-1 leading-snug">
                    {step.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Eco Assurance */}
          <div className="mt-4 pt-4 border-t border-outline-variant flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-primary font-medium">
              <span className="material-symbols-outlined text-secondary text-base">water_drop</span>
              <span>물로 채운 종이 아이스팩 2개 동봉 (예시 구성)</span>
            </div>
            <button
              type="button"
              onClick={onOpenReportModal}
              className="text-secondary font-bold hover:underline inline-flex min-h-11 items-center gap-1 font-mono text-xs cursor-pointer"
            >
              단계별 기록 전문 보기 (예시)
              <span className="material-symbols-outlined text-sm">open_in_new</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
