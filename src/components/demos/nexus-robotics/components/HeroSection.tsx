'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, PlayCircle, Wind } from 'lucide-react';

interface HeroSectionProps {
 onOpenVideoModal: () => void;
}

export function HeroSection({ onOpenVideoModal }: HeroSectionProps) {
  const [telemetry, setTelemetry] = useState({
    airVelocity: '0.45',
    airTolerance: '±0.01',
    particleCount: '0.00',
    activeFleet: 148,
    dockingTolerance: '±0.48',
    coordX: '127.004',
    coordY: '88.319',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // 1. 에어 층류 속도: 0.44 ~ 0.46 m/s 미세 진동
      const vOffset = (Math.random() * 0.02 - 0.01);
      const vel = (0.45 + vOffset).toFixed(2);

      // 2. 도킹 공차: ±0.46 ~ ±0.49 mm 실시간 비전 레이저 실측
      const dock = (0.46 + Math.random() * 0.035).toFixed(2);

      // 3. 우측 상단 관제 3D LiDAR 좌표 미세 트래킹
      const x = (127.000 + Math.random() * 0.018).toFixed(3);
      const y = (88.310 + Math.random() * 0.018).toFixed(3);

      // 4. 활성 군집 수: 148대 기준 가끔 147 또는 149대 충전/도킹 상태 전환
      const randFleet = Math.random();
      const fleet = randFleet > 0.82 ? (randFleet > 0.91 ? 149 : 147) : 148;

      // 5. 파티클 카운트: Class 1 규격상 기본 0.00, 아주 가끔 0.01 순간 감지 후 즉각 정화
      const particle = Math.random() > 0.88 ? '0.01' : '0.00';

      setTelemetry({
        airVelocity: vel,
        airTolerance: '±0.01',
        particleCount: particle,
        activeFleet: fleet,
        dockingTolerance: `±${dock}`,
        coordX: x,
        coordY: y,
      });
    }, 1300);

    return () => clearInterval(interval);
  }, []);
 return (
 <section id="top" className="relative cleanroom-grid border-b border-slate-200 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-slate-100/40">
 {/* Precision reticle marks in background */}
 <div className="absolute inset-0 pointer-events-none flex justify-between max-w-[1600px] mx-auto px-6 lg:px-12">
 <div className="h-full border-r border-dashed border-slate-200/80" />
 <div className="h-full border-r border-dashed border-slate-200/80 hidden lg:block" />
 <div className="h-full border-r border-dashed border-slate-200/80" />
 </div>

 <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 pt-10 pb-14 lg:pt-20 lg:pb-24 relative z-10">
 {/* Top Status Pill */}
 <div className="flex items-center justify-start mb-6">
 <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full bg-white border border-slate-200 shadow-sm">
 <span className="relative flex h-2 w-2">
 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
 <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
 </span>
 <span className="text-[11px] font-mono font-bold text-slate-800 uppercase tracking-wider">
 SAMPLE BRAND • CLEANROOM CLASS 1 대응 (예시 표기)
 </span>
 </div>
 </div>

 {/* Headline & Value Pitch */}
 <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
 <div className="lg:col-span-8">
 <h1 className="text-[28px] sm:text-4xl lg:text-[56px] font-extrabold text-slate-900 tracking-tight leading-[1.2] lg:leading-[1.15] [word-break:keep-all]">
 {/* {' '} 가 없으면 lg 미만에서 br 이 사라지면서 「구현하는자율」로 맞붙는다(실측 textContent) */}
 티끌 하나 없는 정밀함으로 구현하는{' '}
 <br className="hidden lg:inline" />
 <span className="text-blue-600">자율 군집 로보틱스</span> 인텔리전스
 </h1>
 </div>
 <div className="lg:col-span-4 pb-2">
 <p className="text-base lg:text-lg text-slate-600 leading-relaxed font-normal [word-break:keep-all]">
 초당 100회 3D LiDAR·비전 SLAM 다중 센서 융합과 0.5mm 초정밀 도킹. 반도체·2차전지 클린룸 24개 사이트 24/7 가동을 가정한 예시 구성입니다.
 </p>
 </div>
 </div>

 {/* Action Button Cluster */}
 <div className="flex flex-wrap items-center gap-3 lg:gap-4 mb-10 lg:mb-14">
 <a
 href="#consultation-wizard"
 className="inline-flex flex-1 min-[420px]:flex-none items-center justify-center gap-2.5 px-6 py-3.5 min-h-12 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm font-semibold transition-colors shadow-sm"
 >
 <span>현장 엔지니어링 실사 요청</span>
 <ArrowRight className="w-4 h-4" />
 </a>
 <button
 type="button"
 onClick={onOpenVideoModal}
 className="inline-flex flex-1 min-[420px]:flex-none items-center justify-center gap-2 px-5 py-3.5 min-h-12 rounded bg-white border border-slate-200 hover:bg-slate-50 text-slate-900 text-sm font-medium transition-colors shadow-sm cursor-pointer"
 >
 <PlayCircle className="w-5 h-5 text-blue-600" />
 <span>클린룸 무인 주행 실물 영상 (1080p)</span>
 </button>
 <div className="flex items-center gap-2 text-xs font-mono text-slate-500 ml-0 lg:ml-4">
 <span className="w-2 h-2 rounded-full bg-emerald-500" />
 <span>FLEET STATUS: NOMINAL (예시 수치)</span>
 </div>
 </div>

 {/* Hero Video Stream With Precision Cleanroom Telemetry HUD */}
 <div className="relative rounded-lg border border-slate-200 overflow-hidden bg-slate-950 shadow-sm group">
 <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full overflow-hidden">
 <video
 autoPlay
 loop
 muted
 playsInline
 controlsList="nodownload noplaybackrate"
 disablePictureInPicture
 onContextMenu={(e) => e.preventDefault()}
 className="w-full h-full object-cover"
 src="/portfolio/nexus-robotics/cleanroom-fleet.mp4"
 />
 {/* Hairline Crosshairs & Measurement Overlay */}
 <div className="absolute inset-0 pointer-events-none">
 {/* Top Left Reticle */}
 <div className="absolute top-3 left-3 lg:top-6 lg:left-6 p-2.5 lg:p-3 rounded bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm text-slate-900 max-w-[calc(100%-1.5rem)] lg:max-w-xs">
 <div className="flex items-center justify-between gap-2 lg:gap-4 mb-2 pb-1.5 border-b border-slate-100">
 <span className="text-[11px] font-mono text-blue-600 font-bold flex items-center gap-1">
 <Wind className="w-3.5 h-3.5" />
 LAMINAR SENSOR HUD
 </span>
 <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-[10px] font-mono font-bold">
 CLASS 1
 </span>
 </div>
 <div className="grid grid-cols-2 gap-2 lg:gap-3 text-xs font-mono">
 <div>
 <span className="text-slate-400 block text-[10px]">AIR VELOCITY</span>
 <span className="text-slate-800 font-semibold text-xs tabular-nums">
 {telemetry.airVelocity} m/s <span className="text-[10px] text-slate-500 font-normal">{telemetry.airTolerance}</span>
 </span>
 </div>
 <div>
 <span className="text-slate-400 block text-[10px]">PARTICLE COUNT</span>
 <span className={`font-semibold text-xs tabular-nums transition-colors ${telemetry.particleCount !== '0.00' ? 'text-amber-500 font-bold' : 'text-emerald-600'}`}>
 {telemetry.particleCount} / ft³
 </span>
 </div>
 </div>
 </div>

 {/* Bottom Right Fleet Node Status */}
 <div className="absolute bottom-8 right-3 left-3 lg:bottom-6 lg:right-6 lg:left-auto p-2.5 lg:p-3 rounded bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm text-slate-900">
 <div className="flex flex-col min-[560px]:flex-row min-[560px]:items-center gap-1 min-[560px]:gap-4 text-[11px] lg:text-xs font-mono">
 <div className="flex items-center gap-1.5">
 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
 <span className="text-slate-600">
 ACTIVE FLEET: <strong className="text-slate-900 tabular-nums">{telemetry.activeFleet} UNITS</strong>
 </span>
 </div>
 <div className="hidden min-[560px]:block h-3 w-px bg-slate-200" />
 <div className="text-slate-600">
 DOCKING TOLERANCE: <strong className="text-blue-600 tabular-nums">{telemetry.dockingTolerance} mm</strong>
 </div>
 </div>
 </div>

 {/* Subtle Corner Alignment Markers */}
 <div className="absolute top-3 right-3 text-slate-400/70 text-[10px] font-mono tabular-nums">
 + [{telemetry.coordX} : {telemetry.coordY}]
 </div>
 <div className="absolute bottom-3 left-3 text-slate-400/70 text-[10px] font-mono">
 CALIBRATION: ACTIVE_V4.2
 </div>
 </div>
 </div>
 </div>

 {/* Trust Metric Bar (Clean Minimalist Grid with Soft Slate Borders) */}
 <div className="mt-8">
 <div className="mb-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">
 <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
 <span className="text-[11px] font-mono font-bold text-slate-600 uppercase tracking-wider">
 아래 지표는 예시 수치입니다
 </span>
 </div>
 <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
 <div className="p-4 lg:p-5 rounded bg-white border border-slate-200 shadow-sm">
 <span className="text-[11px] font-mono font-bold text-slate-400 block mb-1">
 TOTAL AUTONOMOUS TRAVEL
 </span>
 <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900">
 1,280,000 <span className="text-blue-600 text-lg">km+</span>
 </div>
 <p className="text-xs text-slate-600 mt-1 [word-break:keep-all]">24개 사이트 누적 주행 (예시)</p>
 </div>
 <div className="p-4 lg:p-5 rounded bg-white border border-slate-200 shadow-sm">
 <span className="text-[11px] font-mono font-bold text-slate-400 block mb-1">
 CLEANROOM COMPLIANCE
 </span>
 <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900">Class 1~4</div>
 <p className="text-xs text-slate-600 mt-1 [word-break:keep-all]">클린룸 등급 대응 표기 (예시)</p>
 </div>
 <div className="p-4 lg:p-5 rounded bg-white border border-slate-200 shadow-sm">
 <span className="text-[11px] font-mono font-bold text-slate-400 block mb-1">
 DISPATCH EFFICIENCY
 </span>
 <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-blue-600">
 +380% <span className="text-slate-900 text-lg font-normal">UP</span>
 </div>
 <p className="text-xs text-slate-600 mt-1 [word-break:keep-all]">기존 유인 대차 대비 (예시)</p>
 </div>
 <div className="p-4 lg:p-5 rounded bg-white border border-slate-200 shadow-sm">
 <span className="text-[11px] font-mono font-bold text-slate-400 block mb-1">
 AVERAGE PAYBACK PERIOD
 </span>
 <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900">
 14 <span className="text-lg text-slate-600 font-normal">개월</span>
 </div>
 <p className="text-xs text-slate-600 mt-1 [word-break:keep-all]">라인 CAPEX 회수 가정 (예시)</p>
 </div>
 </div>
 </div>
 </div>
 </section>
 );
}
