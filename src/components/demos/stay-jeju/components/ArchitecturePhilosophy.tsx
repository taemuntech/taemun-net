'use client';

import React from 'react';

export const ArchitecturePhilosophy: React.FC = () => {
  const philosophies = [
    {
      num: '01',
      title: '차경(借景) — 풍경을 빌려오다',
      desc: '자연을 인위적으로 정복하거나 과시하지 않고, 제주의 바다와 바람, 사계절의 빛을 공간 내부로 고스란히 끌어들이는 프레임리스 픽스창 설계를 고수합니다.',
      sub: 'Nature Framing Architectural Logic',
    },
    {
      num: '02',
      title: '여백(餘白) — 비워냄으로써 채우다',
      desc: '필요 이상의 장식과 가구를 배제하여 머무는 이의 시선과 감정이 온전히 휴식에 집중될 수 있도록 불필요한 시각적 노이즈를 덜어냈습니다.',
      sub: 'Minimalistic Void & Spatial Breath',
    },
    {
      num: '03',
      title: '순응(順應) — 제주의 대지에 깃들다',
      desc: '대지의 원래 굴곡과 돌담의 결을 훼손하지 않고 전통 서까래와 현무암의 무게감을 존중하며 현대적 웰니스 설비를 유기적으로 접목했습니다.',
      sub: 'Contextual Topography Harmony',
    },
  ];

  return (
    <section id="philosophy" className="py-24 bg-[#0e1014] text-stone-200 border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <span className="text-amber-500/80 font-mono text-xs tracking-[0.3em] uppercase block mb-3">
            ARCHITECTURAL ETHOS
          </span>
          <h2 className="text-3xl lg:text-5xl font-serif font-light text-stone-100 tracking-tight leading-snug">
            비움과 침묵,<br />
            풍경을 빌려오는 차경(借景)의 철학
          </h2>
          <p className="mt-6 text-stone-400 font-light text-base lg:text-lg leading-relaxed">
            소소재는 단순한 숙박 시설이 아닌, 제주의 시간과 자연이 머무는 한 편의 시(詩) 같은 공간을 지향합니다.
            돌 하나, 나무 한 결에도 대지의 존중을 담았습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {philosophies.map((item) => (
            <div
              key={item.num}
              className="p-8 rounded-2xl bg-[#14161b] border border-stone-800/90 relative group hover:border-amber-500/40 transition-colors duration-300"
            >
              <span className="font-mono text-3xl font-light text-amber-500/40 block mb-6">
                {item.num}
              </span>
              <h3 className="text-xl font-serif text-stone-100 mb-2 group-hover:text-amber-300 transition-colors">
                {item.title}
              </h3>
              <span className="text-xs font-mono text-stone-500 block mb-4 uppercase tracking-wider">
                {item.sub}
              </span>
              <p className="text-stone-400 text-sm font-light leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
