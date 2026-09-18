'use client';

import React from 'react';

const TURNKEY_STEPS = [
  {
    step: 'STEP 01',
    title: '부지 적합성 & 법적 타당성 검토',
    desc: '소유 부지의 지구단위계획, 건폐율, 용적률, 일조사선 규제를 분석하고 지반 토질 조사를 실시하여 최적의 건축 규모를 산출합니다.',
  },
  {
    step: 'STEP 02',
    title: '실시설계 & BIM 4D 사전 시뮬레이션',
    desc: '구조·기계·전기·소방 공종 간섭을 3D BIM 모델로 사전 검증하고, 오차 없는 정밀 물량 산출로 턴키 공사비를 확정합니다.',
  },
  {
    step: 'STEP 03',
    title: '인허가 승인 & 특수 기초 토공사',
    desc: '지자체 건축 심의 및 허가를 원스톱 대행하며, 도심지 인접 건물의 균열과 침하를 차단하는 친환경 저소음 흙막이 공법을 적용합니다.',
  },
  {
    step: 'STEP 04',
    title: '골조 상량 & 고기밀 외장 커튼월',
    desc: '고장력 SRC 철골-철근콘크리트 구조로 내진 1등급을 완성하고, 단열성과 조형미를 극대화한 프라임 글래스 커튼월을 시공합니다.',
  },
  {
    step: 'STEP 05',
    title: '사용승인(준공) & 하자보수 보증',
    desc: '정밀 소방 및 전기 완성 검사를 거쳐 사용승인을 득하고, 10년 하자보수 이행증권 발행 및 스마트 시설물 유지관리 시스템을 인계합니다.',
  },
];

export default function TurnkeyRoadmap() {
  return (
    <section id="section-turnkey" className="w-full bg-slate-900 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs font-bold text-blue-400 uppercase tracking-widest">
            ALL-IN-ONE TURNKEY PROCESS
          </span>
          <h2 className="mt-3 font-mono text-2xl font-black text-white lg:text-4xl">
            기획부터 사후관리까지 원스톱 턴키 솔루션
          </h2>
          <p className="mt-3 text-sm text-slate-300">
            복잡한 건축 인허가부터 자재 조달, 안전 시공, 사용승인까지 메트로종합건설이 단일 창구로 일괄 책임집니다.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {TURNKEY_STEPS.map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col justify-between rounded-xl border border-slate-800 bg-slate-950/80 p-6 shadow-lg transition-all hover:border-blue-500/50 hover:bg-slate-950"
            >
              <div>
                <span className="font-mono text-xs font-black text-blue-400">
                  {item.step}
                </span>
                <h3 className="mt-3 font-mono text-sm font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-400">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 pt-4 border-t border-slate-800/80 font-mono text-[11px] text-blue-300">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span>공정률 단계별 확인</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
