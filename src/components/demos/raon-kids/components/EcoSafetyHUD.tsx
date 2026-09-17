'use client';

import React, { useState } from 'react';

export const EcoSafetyHUD: React.FC = () => {
  const [purifierBoost, setPurifierBoost] = useState(false);

  return (
    <section id="safety" className="py-24 bg-[#fcf9f2]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mb-16">
          <span className="text-xs font-mono text-[#c98330] tracking-widest uppercase block mb-2">
            ECO-SAFETY TELEMETRY & AIR PURITY
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl font-normal text-[#3b2e1e] tracking-tight mb-4">
            아이의 숨결까지 지키는 <br />
            <span className="italic font-light text-[#c98330]">친환경 실내 환경 안전 모니터링</span>
          </h2>
          <p className="text-xs lg:text-sm text-[#6e5840] font-light leading-relaxed">
            새집증후군 유발 물질(VOCs)과 라돈을 제로 수준으로 유지하는 친환경 공조 환기 텔레메트리 시스템입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tile 1: Radon Monitoring */}
          <div className="bg-white p-6 lg:p-8 rounded-3xl border border-[#ebdcd0] shadow-sm space-y-4">
            <span className="text-[10px] font-mono text-[#8c7456] uppercase block">SENSOR 01</span>
            <h3 className="font-serif text-lg font-bold text-[#3b2e1e]">라돈 안전 지수</h3>
            <div className="p-4 rounded-2xl bg-[#fcf9f2] border border-[#ebdcd0] text-center">
              <span className="text-3xl lg:text-4xl font-serif font-bold text-[#2e5b3b]">0.02 pCi/L</span>
              <span className="text-[11px] text-[#2e5b3b] block mt-1 font-mono">국내 권고기준(4.0) 대비 극저수치 (예시)</span>
            </div>
            <p className="text-xs text-[#6e5840] font-light leading-relaxed">
              자연 배출 환기층과 지하 라돈 차단 필름 시공으로 방사성 유해 물질 유입을 원천 차단합니다.
            </p>
          </div>

          {/* Tile 2: TVOC & Formaldehyde */}
          <div className="bg-white p-6 lg:p-8 rounded-3xl border border-[#ebdcd0] shadow-sm space-y-4">
            <span className="text-[10px] font-mono text-[#8c7456] uppercase block">SENSOR 02</span>
            <h3 className="font-serif text-lg font-bold text-[#3b2e1e]">휘발성유기화합물 (VOCs)</h3>
            <div className="p-4 rounded-2xl bg-[#fcf9f2] border border-[#ebdcd0] text-center">
              <span className="text-3xl lg:text-4xl font-serif font-bold text-[#2e5b3b]">ZERO</span>
              <span className="text-[11px] text-[#2e5b3b] block mt-1 font-mono">친환경 천연 규조 미장 적용 (예시)</span>
            </div>
            <p className="text-xs text-[#6e5840] font-light leading-relaxed">
              화학 본드와 유성 페인트를 100% 배제하고 수용성 천연 미네랄 마감재만을 사용하여 무취 공간을 실현했습니다.
            </p>
          </div>

          {/* Tile 3: Air Purifier Telemetry */}
          <div className="bg-white p-6 lg:p-8 rounded-3xl border border-[#ebdcd0] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#8c7456] uppercase">SYSTEM 03</span>
              <button
                onClick={() => setPurifierBoost(!purifierBoost)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  purifierBoost ? 'bg-[#e39c44] text-white' : 'bg-[#f5e6bb] text-[#735824]'
                }`}
              >
                {purifierBoost ? '순환 부스트 ON' : '에코 순환 모드'}
              </button>
            </div>
            <h3 className="font-serif text-lg font-bold text-[#3b2e1e]">신선 공기 환기율</h3>
            <div className="p-4 rounded-2xl bg-[#fcf9f2] border border-[#ebdcd0] text-center">
              <span className="text-3xl lg:text-4xl font-serif font-bold text-[#735824]">
                {purifierBoost ? '시간당 18회' : '시간당 10회 (예시)'}
              </span>
              <span className="text-[11px] text-[#8c7456] block mt-1 font-mono">
                {purifierBoost ? '초미세먼지 급속 배출 가동' : '쾌적 기류 항시 유지'}
              </span>
            </div>
            <p className="text-xs text-[#6e5840] font-light leading-relaxed">
              H13 등급 헤파필터가 장착된 전열교환기로 이산화탄소와 먼지를 24시간 배출합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
