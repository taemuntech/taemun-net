'use client';

import React, { useState } from 'react';
import { CircadianLightingMode } from '../types';

export const AcousticSilenceHUD: React.FC = () => {
  const [lightingMode, setLightingMode] = useState<CircadianLightingMode>('welcome');
  const [soundproofActive, setSoundproofActive] = useState<boolean>(true);

  const getLightingParams = () => {
    switch (lightingMode) {
      case 'welcome':
        return { temp: '3200K', lux: '420 Lux', feel: '따뜻한 환대 & 안정감' };
      case 'treatment':
        return { temp: '4500K', lux: '850 Lux', feel: '정밀 시술용 무영 조도' };
      case 'recovery':
        return { temp: '2700K', lux: '180 Lux', feel: '깊은 릴랙스 & 진정' };
    }
  };

  const light = getLightingParams();

  return (
    <section id="telemetry" className="py-24 bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-mono text-[#a38068] tracking-widest uppercase block mb-2">
            ENVIRONMENTAL TELEMETRY & ACOUSTICS
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl font-normal text-[#2d241e] tracking-tight mb-4">
            청각적 고요와 서카디언 조도, <br />
            <span className="italic font-light text-[#7a6252]">정온 힐링 환경 시뮬레이션</span>
          </h2>
          <p className="text-xs lg:text-sm text-[#6e5849] font-light leading-relaxed">
            소음 스트레스를 줄이는 것을 목표로 한 이중 차음벽 설계와 시술 단계별 색온도 제어 시스템을 직접 테스트해 보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* HUD Monitor Panel 1: Soundproof Acoustics */}
          <div className="lg:col-span-6 bg-white p-6 lg:p-8 rounded-3xl border border-[#ebdcd0] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#ebdcd0] pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#a38068] uppercase block">SYSTEM 01</span>
                <h3 className="font-serif text-lg font-bold text-[#2d241e]">차음 & 흡음 텔레메트리</h3>
              </div>
              <button
                type="button"
                onClick={() => setSoundproofActive(!soundproofActive)}
                aria-pressed={soundproofActive}
                className={`px-4 py-1.5 min-h-11 rounded-full text-xs font-mono whitespace-nowrap transition-colors cursor-pointer ${
                  soundproofActive ? 'bg-[#524135] text-white' : 'bg-[#ebdcd0] text-[#6e5849]'
                }`}
              >
                {soundproofActive ? '차음벽 가동중' : '차음벽 해제'}
              </button>
            </div>

            {/* Decibel Meter Display */}
            <div className="p-5 rounded-2xl bg-[#faf7f2] border border-[#ebdcd0] text-center space-y-2">
              <span className="text-xs font-mono text-[#9c8473] uppercase">ROOM NOISE LEVEL (SIM)</span>
              <div className="font-serif text-4xl lg:text-5xl font-bold text-[#3d2f26]">
                {soundproofActive ? '34.2 dB' : '58.7 dB'}
              </div>
              <p className="text-xs text-[#7a6252] font-light [word-break:keep-all]">
                {soundproofActive
                  ? '도서관 수준의 정숙도를 목표로 한 1인 특화 차음 설계 (기준 45dB 이하 · 예시 수치)'
                  : '일반 복도 소음이 유입되는 상태 (시뮬레이션 예시 수치)'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-[#faf7f2] rounded-xl border border-[#ebdcd0]">
                <span className="text-[#9c8473] block mb-1">흡음 계수 (NRC)</span>
                <span className="font-bold text-[#2d241e]">0.85 고성능 (예시)</span>
              </div>
              <div className="p-3 bg-[#faf7f2] rounded-xl border border-[#ebdcd0]">
                <span className="text-[#9c8473] block mb-1">진동 차단 지수</span>
                <span className="font-bold text-[#2d241e]">98.2% 완충 (예시)</span>
              </div>
            </div>
          </div>

          {/* HUD Monitor Panel 2: Circadian Lighting */}
          <div className="lg:col-span-6 bg-white p-6 lg:p-8 rounded-3xl border border-[#ebdcd0] shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-[#ebdcd0] pb-4">
              <div>
                <span className="text-[10px] font-mono text-[#a38068] uppercase block">SYSTEM 02</span>
                <h3 className="font-serif text-lg font-bold text-[#2d241e]">서카디언 조도 제어</h3>
              </div>
              <span className="text-xs font-mono text-[#9c8473]">{light.temp}</span>
            </div>

            {/* Mode Toggle Buttons */}
            <div className="grid grid-cols-3 gap-2">
              {(['welcome', 'treatment', 'recovery'] as CircadianLightingMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setLightingMode(mode)}
                  aria-pressed={lightingMode === mode}
                  className={`py-3 px-2 min-h-11 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    lightingMode === mode
                      ? 'bg-[#524135] text-white shadow'
                      : 'bg-[#faf7f2] text-[#6e5849] hover:bg-[#ebdcd0]'
                  }`}
                >
                  {mode === 'welcome' && '웰컴 앰비언트'}
                  {mode === 'treatment' && '정밀 시술 모드'}
                  {mode === 'recovery' && '회복 & 릴랙스'}
                </button>
              ))}
            </div>

            {/* Lighting Status Display */}
            <div className="p-5 rounded-2xl bg-[#faf7f2] border border-[#ebdcd0] space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#9c8473]">색온도 (Correlated Temp)</span>
                <span className="font-bold text-[#2d241e]">{light.temp}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#9c8473]">작업면 조도 (Illuminance)</span>
                <span className="font-bold text-[#2d241e]">{light.lux}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#9c8473]">공간 분위기 효과</span>
                <span className="font-bold text-[#7a6252]">{light.feel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
