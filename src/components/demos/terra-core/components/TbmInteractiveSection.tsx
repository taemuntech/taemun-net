import React, { useState } from 'react';
import Image from 'next/image';
import { Compass, RotateCw, Wrench, Gauge, ShieldCheck, Zap } from 'lucide-react';
import { TBM_SPEC } from '../data/terraData';

export const TbmInteractiveSection: React.FC = () => {
  const [rpmMode, setRpmMode] = useState<'stop' | 'slow' | 'fast'>('slow');
  const [activeMechanism, setActiveMechanism] = useState<number>(0);

  const mechanisms = [
    {
      title: '14.2m 텅스텐 카바이드 커터헤드',
      desc: '19인치 초경합금 디스크 롤러 78기가 단단한 화강암반을 분당 2~3회전으로 파쇄합니다.',
      spec: '직경 14.2m, 중량 450톤 (예시)',
    },
    {
      title: '22만 kN 메가 유압 추진 실린더',
      desc: '조립 완료된 콘크리트 세그먼트 링을 지지대 삼아 기체 전체를 전진시키는 초대형 유압 잭입니다.',
      spec: '추진력 220,000 kN (예시)',
    },
    {
      title: '고압 수냉식 슬러리 배출 챔버',
      desc: '커터헤드 후방 밀폐 챔버에서 이토압을 정밀 제어하여 지반 침하를 0mm로 억제합니다.',
      spec: '이토압 제어 정밀도 ±0.05 bar (예시)',
    },
    {
      title: '자동 세그먼트 이렉터 (링 조립기)',
      desc: '1개 링당 8조의 프리캐스트 콘크리트 블록과 키 블록을 30분 내에 영구 조립합니다.',
      spec: '링 당 조립 소요 28분 (예시)',
    },
  ];

  return (
    <section id="tbm-dynamics" className="py-20 bg-[#0d1117] text-white border-b border-[#30363d] relative">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#ff6b2b]/15 text-[#ff6b2b] text-xs font-mono tracking-widest uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>14.2M MEGA SHIELD TBM DYNAMICS</span>
          </div>
          <h2 className="text-2xl lg:text-4xl font-black font-mono tracking-tight text-white">
            14.2m 초대구경 쉴드 TBM 메커니즘
          </h2>
          <p className="text-xs lg:text-sm text-[#8b949e] font-sans mt-2">
            지하 수십 미터 암반을 무소음·무진동으로 관통하며 영구 콘크리트 링을 즉시 조립하는
            첨단 터널 보링 머신의 핵심 구동계와 제원입니다.
          </p>
        </div>

        {/* TBM Machine Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* TBM Visual Viewport with RPM Animation (Left 7 Cols) */}
          <div className="lg:col-span-7 relative rounded-xl overflow-hidden border border-[#30363d] bg-[#161b22]">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <Image
                src="/portfolio/terra-core/terra-02.jpg"
                alt="14.2m 대구경 쉴드 TBM 커터헤드 실물 단면 (가상 샘플 연출)"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className={`object-cover transition-transform duration-1000 ${
                  rpmMode === 'fast'
                    ? 'scale-105'
                    : rpmMode === 'slow'
                    ? 'scale-100'
                    : 'scale-95 filter brightness-75'
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] via-transparent to-[#0d1117]/40 pointer-events-none" />

              {/* Cutterhead RPM Simulated Gauge Overlay */}
              <div className="absolute top-4 left-4 p-3 rounded bg-[#0d1117]/85 backdrop-blur-md border border-[#30363d] font-mono text-xs">
                <span className="text-[10px] text-[#8b949e] uppercase block">CUTTERHEAD SPEED</span>
                <div className="text-lg font-bold text-white flex items-center gap-2 mt-0.5">
                  <RotateCw
                    className={`w-4 h-4 text-[#ff6b2b] ${
                      rpmMode === 'fast'
                        ? 'animate-spin'
                        : rpmMode === 'slow'
                        ? 'animate-[spin_4s_linear_infinite]'
                        : ''
                    }`}
                  />
                  <span>
                    {rpmMode === 'fast' ? '3.0 RPM' : rpmMode === 'slow' ? '1.5 RPM' : '0.0 RPM (STANDBY)'}
                  </span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 right-4 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-[#30363d] font-mono text-[10px] text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>EPB PRESSURE BALANCED</span>
              </div>
            </div>

            {/* RPM Controller Bar */}
            <div className="p-4 bg-[#161b22] border-t border-[#30363d] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
              <span className="text-[#8b949e] uppercase tracking-wider">
                CUTTERHEAD DRIVE CONTROL:
              </span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setRpmMode('stop')}
                  className={`px-3 py-1.5 rounded transition-all ${
                    rpmMode === 'stop'
                      ? 'bg-rose-500 text-white font-bold'
                      : 'bg-[#21262d] text-[#8b949e] hover:text-white'
                  }`}
                >
                  정지 (0.0)
                </button>
                <button
                  onClick={() => setRpmMode('slow')}
                  className={`px-3 py-1.5 rounded transition-all ${
                    rpmMode === 'slow'
                      ? 'bg-[#ff6b2b] text-black font-bold'
                      : 'bg-[#21262d] text-[#8b949e] hover:text-white'
                  }`}
                >
                  정속 굴진 (1.5 RPM)
                </button>
                <button
                  onClick={() => setRpmMode('fast')}
                  className={`px-3 py-1.5 rounded transition-all ${
                    rpmMode === 'fast'
                      ? 'bg-amber-400 text-black font-bold'
                      : 'bg-[#21262d] text-[#8b949e] hover:text-white'
                  }`}
                >
                  고속 관통 (3.0 RPM)
                </button>
              </div>
            </div>
          </div>

          {/* Mechanisms & Spec Card Stack (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-4 font-mono">
            {/* Mechanism Selection Tabs */}
            <div className="space-y-2">
              {mechanisms.map((mech, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMechanism(idx)}
                  className={`w-full p-4 rounded-lg text-left transition-all border cursor-pointer ${
                    activeMechanism === idx
                      ? 'bg-[#161b22] border-[#ff6b2b] shadow-lg shadow-[#ff6b2b]/10'
                      : 'bg-[#0d1117] border-[#30363d] hover:border-[#8b949e] text-[#8b949e]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-bold ${
                        activeMechanism === idx ? 'text-[#ff6b2b]' : 'text-white'
                      }`}
                    >
                      0{idx + 1}. {mech.title}
                    </span>
                    <span className="text-[10px] text-[#8b949e]">{mech.spec}</span>
                  </div>
                  <p className="text-xs font-sans text-[#8b949e] leading-relaxed">
                    {mech.desc}
                  </p>
                </button>
              ))}
            </div>

            {/* Overall Machine Engineering Specs Box */}
            <div className="p-5 rounded-xl bg-[#161b22] border border-[#30363d] text-xs">
              <span className="text-[10px] text-[#8b949e] uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                <Gauge className="w-3.5 h-3.5 text-[#ff6b2b]" />
                OFFICIAL MACHINE SPECIFICATIONS
              </span>
              <div className="grid grid-cols-2 gap-3 text-[#c9d1d9]">
                <div>
                  <span className="text-[#8b949e] text-[10px] block">CUTTER DIAMETER</span>
                  <span className="font-bold text-white">{TBM_SPEC.diameter}</span>
                </div>
                <div>
                  <span className="text-[#8b949e] text-[10px] block">THRUST CAPACITY</span>
                  <span className="font-bold text-white">{TBM_SPEC.thrustForce}</span>
                </div>
                <div>
                  <span className="text-[#8b949e] text-[10px] block">DRIVE TORQUE</span>
                  <span className="font-bold text-white">{TBM_SPEC.torque}</span>
                </div>
                <div>
                  <span className="text-[#8b949e] text-[10px] block">ADVANCE VELOCITY</span>
                  <span className="font-bold text-white">{TBM_SPEC.advanceRate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
