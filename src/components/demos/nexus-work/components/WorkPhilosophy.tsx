'use client';

import React from 'react';

export const WorkPhilosophy: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: '유연한 가변성 (Modularity)',
      sub: 'Agile Spatial Reconfiguration',
      desc: '고정된 벽체에 조직을 맞추지 않습니다. 팀 규모의 변화와 프로젝트 주기에 따라 1시간 안에 레이아웃을 전환할 수 있는 모듈러 가구와 글래스 파티션 시스템을 설계합니다.',
    },
    {
      num: '02',
      title: '음향적 안락함 (Acoustic Comfort)',
      sub: 'Targeted Sound Decoupling',
      desc: '협업 라운지의 활기찬 대화 소음이 개인의 딥 워크를 방해하지 않도록, 공간 구획마다 주파수 대역별 흡음·차음 등급을 차등 적용하여 스트레스 없는 청각 환경을 구축합니다.',
    },
    {
      num: '03',
      title: '인간 중심 웰니스 (Biophilic Well-being)',
      sub: 'Circadian Light & Pure Atmosphere',
      desc: '자연 채광을 최대한 깊숙이 끌어들이고 실시간 CO2 공기 순환과 식재 테라피를 결합하여 장시간 근무에도 뇌 피로도를 낮추고 몰입을 지속할 수 있는 건강한 오피스를 완성합니다.',
    },
  ];

  return (
    <section id="philosophy" className="py-24 bg-[#090b10] text-zinc-200 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mb-16">
          <span className="text-cyan-400 font-mono text-xs tracking-[0.3em] uppercase block mb-3">
            ARCHITECTURAL PHILOSOPHY
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-white tracking-tight leading-snug">
            기술과 자연이 공존하는<br />
            차세대 스마트 사옥의 3대 설계 원칙
          </h2>
          <p className="mt-6 text-zinc-400 font-light text-base lg:text-lg leading-relaxed">
            단순히 책상을 채워 넣는 인테리어를 넘어, 구성원의 업무 몰입과 심리적 안정감을 극대화하는 공간 사이언스를 제안합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pillars.map((item) => (
            <div
              key={item.num}
              className="p-8 rounded-2xl bg-[#11131a] border border-zinc-800 relative group hover:border-cyan-500/40 transition-colors duration-300"
            >
              <span className="font-mono text-3xl font-black text-cyan-500/40 block mb-6">
                {item.num}
              </span>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>
              <span className="text-xs font-mono text-zinc-500 block mb-4 uppercase tracking-wider">
                {item.sub}
              </span>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
