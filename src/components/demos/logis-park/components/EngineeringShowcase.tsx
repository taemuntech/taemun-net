'use client';

import React from 'react';
import Image from 'next/image';

const TECH_LIST = [
  {
    id: 'tech-pc',
    title: '고강도 PC(Precast Concrete) 골조 고속 가설',
    category: '골조 엔지니어링',
    image: '/portfolio/logis-park/logis-05.jpg',
    description: '공장에서 사전 양생된 고품질 프리캐스트 콘크리트 기둥과 거더를 현장에서 즉시 조립 양중하여, 현장 타설 대비 골조 공사 기간을 4~5개월 단축합니다.',
    merits: ['우천·동절기 기후 영향 최소화', '최대 14m 무주 스팬 구현', '균일한 고강도 품질 확보'],
  },
  {
    id: 'tech-floor',
    title: 'TR34 FM1 규격 레이저 스크리드 초평탄 바닥',
    category: '바닥 엔지니어링',
    image: '/portfolio/logis-park/logis-04.jpg',
    description: '밀리미터 단위 레이저 레벨링 스크리드와 파워 트로웰 미장으로 하이베이 무인 셔틀 및 고속 삼방향 지게차 운행에 요구되는 최고 수준 평탄도를 완성합니다.',
    merits: ['지게차 주행 충격 및 진동 제거', '분진 발생 없는 하드너 마감', '바닥 허용하중 ㎡당 3.0톤 대응'],
  },
  {
    id: 'tech-insulation',
    title: '-25℃ 초저온 PIR 단열 & 바닥 히팅 시스템',
    category: '단열·방열 공법',
    image: '/portfolio/logis-park/logis-03.jpg',
    description: '난연 150mm PIR 단열 패널 시공과 콘크리트 슬래브 하부 열선 파이프 배관을 통해 지반 동결로 인한 슬래브 융기 현상을 원천 방지합니다.',
    merits: ['냉기 누출 없는 3중 밀폐 에어록', '지반 동결 융기 방지 히팅 파이프', '냉동 에너지 손실 30% 절감(예시)'],
  },
];

export default function EngineeringShowcase() {
  return (
    <section id="section-tech" className="w-full bg-neutral-950 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest">
            LOGISTICS ENGINEERING EXCELLENCE
          </span>
          <h2 className="mt-3 font-mono text-2xl font-black text-white lg:text-4xl">
            물류 운영 효율을 결정하는 3대 특화 공법
          </h2>
          <p className="mt-3 text-sm text-neutral-400">
            공기 단축부터 무인 로봇 주행성, 초저온 단열까지 완벽한 물류 기능을 구현하는 로지스파크만의 시공 노하우입니다.
          </p>
        </div>

        {/* Tech Cards */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {TECH_LIST.map((tech) => (
            <div
              key={tech.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/60 transition-all hover:border-cyan-500/40"
            >
              {/* Image */}
              <div className="relative h-56 w-full overflow-hidden bg-neutral-950">
                <Image
                  src={tech.image}
                  alt={tech.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-3 left-3 rounded bg-neutral-950/80 px-2.5 py-1 font-mono text-[11px] font-semibold text-cyan-400 backdrop-blur-md">
                  {tech.category}
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-mono text-lg font-bold text-white">
                    {tech.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-neutral-400">
                    {tech.description}
                  </p>
                </div>

                {/* Merits */}
                <div className="mt-6 border-t border-neutral-800/80 pt-4">
                  <span className="font-mono text-[11px] font-bold text-neutral-500">핵심 시공 장점</span>
                  <ul className="mt-2 space-y-1.5 font-mono text-xs text-neutral-300">
                    {tech.merits.map((m, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-cyan-400">✓</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
