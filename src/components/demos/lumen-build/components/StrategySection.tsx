'use client';

import React from 'react';
import Image from 'next/image';

export default function StrategySection() {
  const strategies = [
    {
      step: '01',
      title: '일조사선 규제를 야외 테라스로 전환',
      desc: '북측 일조권 사선제한으로 잘려 나가는 상층부를 조경이 어우러진 계단식 발코니 테라스로 역이용하여, 테넌트가 가장 선호하는 감성 F&B 공간을 창출합니다.',
    },
    {
      step: '02',
      title: '코어 초집약 설계로 전용률 73% 극대화',
      desc: '계단실, 승강기, 화장실을 한쪽 벽면으로 모으는 고효율 코어 배치를 통해 동급 꼬마빌딩 대비 임대 전용 면적을 5~8평 이상 더 찾아냅니다.',
    },
    {
      step: '03',
      title: '1층 층고 5.0m & 무기둥 통유리 파사드',
      desc: '거리 보행자의 시선을 단숨에 끄는 2개 층 높이의 개방감을 확보하여, 성수·도산 메인 상권의 패션 팝업 및 플래그십 스토어 유치 경쟁력을 확보합니다.',
    },
    {
      step: '04',
      title: '준공 전 앵커 테넌트 선매칭 (Pre-Leasing)',
      desc: '설계 초기 단계부터 타깃 상권에 맞는 우량 F&B 브랜드 및 브랜드 쇼룸과 접촉하여 준공 직후 공실 없이 즉시 임대료를 회수할 수 있도록 지원합니다.',
    },
  ];

  return (
    <section id="strategy" className="w-full bg-neutral-900 py-16 text-white lg:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          {/* 좌측: 전략 회의실 화보 (5열) */}
          <div className="relative min-h-[380px] overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 shadow-2xl lg:col-span-5 lg:min-h-[500px]">
            <Image
              src="/portfolio/lumen-build/lumen-05.jpg"
              alt="루멘 빌드 꼬마빌딩 신축 전략 기획 회의실"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded bg-neutral-950/90 p-4 backdrop-blur-md border border-neutral-800">
              <span className="font-mono text-[11px] font-bold text-amber-400">VALUE-ADD CONSULTING</span>
              <p className="mt-1 text-xs text-neutral-300">
                상권 데이터와 정밀 3D 매스 모델링으로 부지의 잠재력을 끝까지 끌어올리는 전문가 팀
              </p>
            </div>
          </div>

          {/* 우측: 4대 핵심 가치 (7열) */}
          <div className="lg:col-span-7">
            <p className="font-mono text-xs font-bold text-amber-400 uppercase tracking-widest">
              WHY LUMEN COMMERCIAL BUILD
            </p>
            <h2 className="mt-2 font-mono text-2xl font-black tracking-tight text-white lg:text-3xl lg:leading-snug">
              임대료를 더 받고, 공실을 없애는
              <br />
              루멘 빌드만의 4대 상업 건축 전략
            </h2>
            <p className="mt-4 text-xs leading-relaxed text-neutral-400 lg:text-sm">
              같은 평수의 땅이라도 건축가의 기획력에 따라 건물의 월세와 매각 가치는 완전히 달라집니다.
              루멘 빌드는 상업 건축만을 전문으로 연구해 온 실전 노하우로 승부합니다.
            </p>

            {/* 전략 카드 그리드 */}
            <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
              {strategies.map((st, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-neutral-800 bg-neutral-950/70 p-4 transition-all hover:border-amber-500/40 hover:bg-neutral-950"
                >
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-400">
                    <span className="flex h-5 w-5 items-center justify-center rounded bg-amber-500/20 text-[10px] text-amber-300 border border-amber-500/40">
                      {st.step}
                    </span>
                    <span>{st.title}</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-400">{st.desc}</p>
                </div>
              ))}
            </div>

            {/* 면허 및 협력사 */}
            <div className="mt-8 border-t border-neutral-800 pt-5 flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between text-xs text-neutral-500 font-mono">
              <div>
                <strong className="text-white">종합건설면허 보유</strong> | 서울특별시 건축사회 정회원
              </div>
              <div className="text-amber-400">
                TOTAL RESPONSIBLE ARCHITECTURE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
