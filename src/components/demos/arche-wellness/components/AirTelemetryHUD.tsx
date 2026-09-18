'use client';

import React, { useEffect, useRef, useState } from 'react';
import { INITIAL_TELEMETRY } from '../data/wellnessData';

// 급속 청정 뒤의 예시 수치. 한 번 누르면 여기로, 다시 누르면 평상 수치로 되돌아간다
// (예전에는 두 번째부터 눌러도 숫자가 그대로라 「눌러도 아무 일 없는 버튼」이었다).
const PURIFIED_TELEMETRY = {
  ...INITIAL_TELEMETRY,
  oxygenRate: 21.4,
  co2Level: 390,
  humidity: 50,
};

export const AirTelemetryHUD: React.FC = () => {
  const [telemetry, setTelemetry] = useState(INITIAL_TELEMETRY);
  const [isPurifying, setIsPurifying] = useState(false);
  const [isPurified, setIsPurified] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const triggerRapidPurify = () => {
    if (isPurifying) return;
    const next = !isPurified;
    setIsPurifying(true);
    timerRef.current = setTimeout(() => {
      setTelemetry(next ? PURIFIED_TELEMETRY : INITIAL_TELEMETRY);
      setIsPurified(next);
      setIsPurifying(false);
    }, 1200);
  };

  return (
    <section id="telemetry" className="py-24 bg-[#f5efe6] text-[#3d322a] border-t border-[#ebdcd0]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-12">
          <span className="text-[#b8613d] font-mono text-xs tracking-widest uppercase block mb-2">
            SECTION 02 · CLEAN AIR & RESPIRATORY TELEMETRY
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl font-bold text-[#2d221b] mb-4">
            깊은 호흡을 위한 실시간 청정 공기질 관제 HUD
          </h2>
          <p className="text-sm lg:text-base text-[#6e5d50] font-light leading-relaxed">
            필라테스와 요가는 바른 호흡에서 시작됩니다. 이산화탄소 농도와 산소 비율, 쾌적 습도를
            24시간 측정해 쾌적한 실내 환경을 유지하는 공조 인테리어 설계를 체험해 보세요.
            아래 수치는 모두 연출용 예시 값입니다.
          </p>
        </div>

        <div className="p-8 lg:p-10 rounded-3xl bg-white border border-[#ebdcd0] shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-[#ebdcd0]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono text-emerald-700 font-bold uppercase">
                  ACTIVE RESPIRATORY AIR STATUS: OPTIMAL (예시)
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#2d221b]">스튜디오 전 구역 청정 공기질 모니터링</h3>
              <p className="text-xs text-[#8a7566]">헤파 등급 필터 및 천연 규조토 습도 조절 연동 (예시 사양)</p>
            </div>

            <button
              type="button"
              onClick={triggerRapidPurify}
              disabled={isPurifying}
              className={`min-h-11 shrink-0 px-5 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all cursor-pointer ${
                isPurifying
                  ? 'bg-stone-300 text-stone-500 cursor-wait'
                  : 'bg-[#d27952] hover:bg-[#b8613d] text-white shadow-md shadow-[#d27952]/20 active:scale-95'
              }`}
            >
              {isPurifying
                ? '에어 케어 순환 중...'
                : isPurified
                  ? '평상 모드로 되돌리기'
                  : '급속 청정 모드 시뮬레이션'}
            </button>
          </div>

          {/* Telemetry Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" aria-live="polite">
            <div className="p-5 rounded-2xl bg-[#faf7f2] border border-[#ebdcd0]">
              <span className="text-[11px] font-mono text-[#8a7566] block mb-1">OXYGEN RATE</span>
              <div className="text-2xl lg:text-3xl font-mono font-bold text-[#b8613d]">
                {telemetry.oxygenRate}%
              </div>
              <span className="text-[11px] text-emerald-600 font-medium">청정 산소 유지 (예시)</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#faf7f2] border border-[#ebdcd0]">
              <span className="text-[11px] font-mono text-[#8a7566] block mb-1">CO2 CONCENTRATION</span>
              <div className="text-2xl lg:text-3xl font-mono font-bold text-[#b8613d]">
                {telemetry.co2Level} <span className="text-xs font-normal">ppm</span>
              </div>
              <span className="text-[11px] text-emerald-600 font-medium">쾌적 호흡 범위 (예시)</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#faf7f2] border border-[#ebdcd0]">
              <span className="text-[11px] font-mono text-[#8a7566] block mb-1">HUMIDITY</span>
              <div className="text-2xl lg:text-3xl font-mono font-bold text-[#b8613d]">
                {telemetry.humidity}%
              </div>
              <span className="text-[11px] text-emerald-600 font-medium">규조토 자연 습도 (예시)</span>
            </div>

            <div className="p-5 rounded-2xl bg-[#faf7f2] border border-[#ebdcd0]">
              <span className="text-[11px] font-mono text-[#8a7566] block mb-1">TEMPERATURE</span>
              <div className="text-2xl lg:text-3xl font-mono font-bold text-[#b8613d]">
                {telemetry.temperature}°C
              </div>
              <span className="text-[11px] text-emerald-600 font-medium">온화한 실내 온도 (예시)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
