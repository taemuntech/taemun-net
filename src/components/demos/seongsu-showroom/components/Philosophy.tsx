'use client';
import React from 'react';

export const Philosophy: React.FC = () => {
  const principles = [
    {
      num: '01',
      title: '원형의 보존과 대담한 개입',
      engTitle: 'Preservation & Bold Intervention',
      desc: '1970년대 성수동 준공업지역의 붉은 벽돌 파사드와 거친 콘크리트 보를 억지로 가리지 않고 드러냅니다. 옛 시간의 켜 위에 정밀한 금속 프로파일과 조명을 더해 과거와 현재가 공존하는 긴장감을 연출합니다.',
      tag: '성수 유산의 재해석',
    },
    {
      num: '02',
      title: '소재 본연의 물성과 촉각적 질감',
      engTitle: 'Tactile Authenticity & Raw Texture',
      desc: '모조 필름이나 플라스틱 마감을 배제하고, 차가운 스테인리스, 미세한 기포가 살아있는 노출 콘크리트, 온화한 이탈리아산 트래버틴 등 시간이 흐를수록 품격이 더해지는 천연 물성만을 큐레이션합니다.',
      tag: '진정성 있는 마감재',
    },
    {
      num: '03',
      title: '브랜드 서사를 공간 동선으로 치환',
      engTitle: 'Spatial Narrative & Zoning Flow',
      desc: '단순히 제품을 진열하는 상업 공간을 넘어, 방문객이 문을 열고 들어서서 계단을 오르고 머무르는 전 과정이 하나의 입체적인 스토리텔링이 되도록 빛의 조도와 음향, 시선의 개방감을 치밀하게 계산합니다.',
      tag: '체류 시간 극대화 설계',
    },
  ];

  return (
    <section id="philosophy" className="py-24 bg-[#141519] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs font-mono tracking-widest text-amber-400 uppercase">
            ARCHITECTURAL PHILOSOPHY
          </span>
          <h2 className="font-serif text-2xl lg:text-4xl font-normal text-stone-100 mt-2 mb-4">
            시간이 흘러도 가치를 잃지 않는<br />
            공간의 힘을 믿습니다
          </h2>
          <p className="text-stone-300 text-sm lg:text-base font-light leading-relaxed">
            아틀리에 무드 성수는 유행에 따라 쉽게 교체되는 인테리어가 아닌, 브랜드의 핵심 가치를 공간의 구조와 물성으로 온전히 체화시키는 하이엔드 상업 건축을 지향합니다.
          </p>
        </div>

        {/* 3 Principles Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {principles.map((item) => (
            <div
              key={item.num}
              className="p-8 rounded-sm bg-stone-900/60 border border-white/10 hover:border-amber-500/40 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-3xl font-bold text-amber-500/80 group-hover:text-amber-400 transition-colors">
                    {item.num}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-stone-400 border border-white/10">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-serif text-lg lg:text-xl font-bold text-stone-100 mb-1">
                  {item.title}
                </h3>
                <p className="text-xs font-mono text-amber-300/70 uppercase tracking-wider mb-4">
                  {item.engTitle}
                </p>
                <p className="text-stone-300 text-sm leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex items-center text-xs text-stone-400 group-hover:text-amber-300 transition-colors">
                <span>자세한 시공 디테일 확인하기</span>
                <svg className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
