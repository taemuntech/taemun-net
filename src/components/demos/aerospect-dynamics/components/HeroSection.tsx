import React, { useState, useEffect } from 'react';
import { ASSET_IMAGES } from '../data/mockData';

interface HeroSectionProps {
  onOpenPocModal: () => void;
  onExploreDualVision: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenPocModal,
  onExploreDualVision,
}) => {
  const [altitude, setAltitude] = useState(48.6);
  const [speed, setSpeed] = useState(4.2);
  const [windGust, setWindGust] = useState(6.4);

  useEffect(() => {
    const interval = setInterval(() => {
      setAltitude(() => Number((48.5 + (Math.random() * 0.3 - 0.15)).toFixed(2)));
      setSpeed(() => Number((4.2 + (Math.random() * 0.4 - 0.2)).toFixed(1)));
      setWindGust(() => Number((6.2 + (Math.random() * 0.5 - 0.2)).toFixed(1)));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 lg:px-12 py-10 lg:py-14 flex flex-col gap-10">
      {/* Title & Action Buttons Row */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="max-w-3xl flex flex-col gap-4">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-100 text-sky-900 font-mono text-xs font-semibold shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-sky-600 animate-pulse"></span>
              AUTONOMOUS INDUSTRIAL UAV PLATFORM // SPEC.V4
            </span>
          </div>

          <h1 className="text-3xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight leading-[1.2] lg:leading-[1.15] [word-break:keep-all]">
            사람이 갈 수 없는 곳에서,<br />
            <span className="text-sky-700">타협 없는 0.1mm 정밀도</span>를<br className="hidden lg:inline" /> 관측합니다.
          </h1>

          <p className="text-sm lg:text-base text-zinc-600 max-w-2xl leading-relaxed [word-break:keep-all]">
            초고해상도 4K 광학 줌, 640p 방사 측정 열화상, 240,000pts/s 라이다 탑재. 험지 송전탑부터 대심도 토목, 해상 풍력 블레이드까지 자율 AI 비행으로 정밀 무인 전수 검측을 완수합니다.
          </p>
        </div>

        <div className="flex flex-col gap-3 min-w-[240px]">
          <button
            onClick={onOpenPocModal}
            className="w-full px-6 py-4 rounded-xl bg-zinc-950 text-white font-mono text-xs uppercase tracking-wider flex items-center justify-between shadow-md hover:bg-zinc-800 transition-all active:scale-[0.98] cursor-pointer font-semibold"
          >
            <span>현장 실증(PoC) 비행 신청</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>

          <button
            onClick={onExploreDualVision}
            className="w-full px-6 py-3.5 rounded-xl bg-zinc-100 text-zinc-900 font-mono text-xs uppercase tracking-wider flex items-center justify-between hover:bg-zinc-200 transition-all cursor-pointer font-semibold border border-zinc-200"
          >
            <span>듀얼 비전 검측 엔진 체험</span>
            <span className="material-symbols-outlined text-base text-sky-700">tune</span>
          </button>
        </div>
      </div>

      {/* Visual Centerpiece & Telemetry HUD Overlay */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-zinc-900 shadow-xl aspect-[16/10] lg:aspect-[21/9] border border-zinc-200">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={ASSET_IMAGES.heroDrone}
          controlsList="nodownload noplaybackrate"
          disablePictureInPicture
          onContextMenu={(e) => e.preventDefault()}
          className="w-full h-full object-cover select-none"
          src={ASSET_IMAGES.heroVideo}
        />

        {/* Dark Gradient Vignette for Tech HUD Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 pointer-events-none"></div>

        {/* Reticle Crosshair Graphics */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-48 h-48 border border-white/20 rounded-full flex items-center justify-center relative">
            <div className="w-32 h-32 border border-sky-400/40 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
            <div className="absolute -top-3 px-1.5 py-0.5 bg-black/70 text-sky-300 font-mono text-[10px] rounded border border-sky-400/30">
              GIMBAL LOCK: 00.00°
            </div>
            {/* Horizontal & Vertical Crosshair Lines */}
            <div className="absolute w-60 h-[1px] bg-white/10 pointer-events-none"></div>
            <div className="absolute h-60 w-[1px] bg-white/10 pointer-events-none"></div>
          </div>
        </div>

        {/* Mobile Minimal Status Badge (영상 위는 슬림하게) */}
        <div className="lg:hidden absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
          <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-white font-mono text-[10px] flex items-center gap-1.5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>LIVE TELEMETRY // AP-X9</span>
          </span>
          <span className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-md text-sky-300 font-mono text-[10px] border border-white/10">
            CH: 34 · RTK FIX
          </span>
        </div>

        {/* Floating HUD Card 1: Top Left (Desktop Only) */}
        <div className="absolute top-4 left-4 lg:top-6 lg:left-6 p-3 rounded-lg bg-black/80 backdrop-blur-md text-white font-mono text-[11px] hidden lg:flex flex-col gap-1 shadow-lg max-w-xs border border-white/10">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sky-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              RTK-GPS: DUAL-BAND FIX
            </span>
            <span className="text-white/60">CH: 34</span>
          </div>
          <p className="text-white/90 text-xs">37°33'59"N, 126°58'41"E</p>
          <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[11px] text-white/70">
            <span>HORIZONTAL ACCURACY</span>
            <span className="text-emerald-400 font-semibold">±1.5 cm</span>
          </div>
        </div>

        {/* Floating HUD Card 2: Top Right (Desktop Only) */}
        <div className="absolute top-4 right-4 lg:top-6 lg:right-6 p-3 rounded-lg bg-black/80 backdrop-blur-md text-white font-mono text-[11px] hidden lg:flex flex-col gap-1 shadow-lg border border-white/10">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sky-400 font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">air</span>
              WIND TOLERANCE
            </span>
            <span className="px-1.5 py-0.2 bg-sky-950 text-sky-300 rounded text-[10px] border border-sky-600/40">
              LEVEL 8
            </span>
          </div>
          <p className="text-white/90 text-xs">GUST: {windGust} m/s (NOMINAL)</p>
          <div className="flex items-center justify-between pt-1 border-t border-white/10 text-[11px] text-white/70">
            <span>STABILITY CORRECTION</span>
            <span className="text-sky-300 font-semibold">0.02ms LATENCY</span>
          </div>
        </div>

        {/* Floating HUD Card 3: Bottom Left (Desktop Only) */}
        <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 p-3 rounded-lg bg-black/80 backdrop-blur-md text-white font-mono text-[11px] hidden lg:flex flex-col gap-1 shadow-lg border border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            <span className="text-amber-400 font-bold uppercase">PAYLOAD: LiDAR + THERMAL</span>
          </div>
          <p className="text-white/90 text-xs">POINT CLOUD INGESTION ACTIVE</p>
          <div className="flex items-center justify-between gap-6 text-[11px] text-white/70 pt-1 border-t border-white/10">
            <span>SAMPLE RATE</span>
            <span className="text-amber-400 font-semibold font-mono">240,000 pts/sec</span>
          </div>
        </div>

        {/* Bottom Right Live Altitude/Speed Display (Desktop Only) */}
        <div className="absolute bottom-4 right-4 lg:bottom-6 lg:right-6 p-3 rounded-lg bg-black/80 backdrop-blur-md text-white font-mono text-[11px] hidden lg:flex items-center gap-4 border border-white/10">
          <div>
            <div className="text-[10px] text-white/50 uppercase">ALTITUDE (AGL)</div>
            <div className="text-base font-bold text-white tracking-wider">{altitude.toFixed(2)} M</div>
          </div>
          <div className="w-[1px] h-8 bg-white/20"></div>
          <div>
            <div className="text-[10px] text-white/50 uppercase">GROUND SPEED</div>
            <div className="text-base font-bold text-sky-400 tracking-wider">{speed.toFixed(1)} M/S</div>
          </div>
        </div>
      </div>

      {/* Mobile-Only Telemetry Data Bar (영상 아래 컴팩트 그리드 배치) */}
      <div className="grid grid-cols-2 gap-2 lg:hidden w-full font-mono">
        {/* Item 1: RTK-GPS */}
        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white flex flex-col gap-0.5">
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="flex items-center gap-1 text-sky-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              RTK-GPS
            </span>
            <span className="text-emerald-400 font-semibold">±1.5cm</span>
          </div>
          <span className="text-xs font-bold text-zinc-100 truncate">37°33'59"N, 126°58'41"E</span>
          <span className="text-[10px] text-zinc-400">DUAL-BAND FIX · CH: 34</span>
        </div>

        {/* Item 2: Wind Gust */}
        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white flex flex-col gap-0.5">
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="flex items-center gap-1 text-sky-400 font-bold">
              <span className="material-symbols-outlined text-[13px]">air</span>
              내풍성
            </span>
            <span className="px-1 py-0.2 bg-sky-950 text-sky-300 rounded text-[9px] border border-sky-800">LV.8</span>
          </div>
          <span className="text-xs font-bold text-zinc-100">{windGust} m/s (NOMINAL)</span>
          <span className="text-[10px] text-zinc-400">0.02ms LATENCY 보정</span>
        </div>

        {/* Item 3: Payload Lidar & Thermal */}
        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white flex flex-col gap-0.5">
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              페이로드
            </span>
            <span className="text-amber-300 text-[10px]">640p FLIR</span>
          </div>
          <span className="text-xs font-bold text-zinc-100">LiDAR + 열화상 듀얼</span>
          <span className="text-[10px] text-zinc-400 font-mono">240,000 pts/sec</span>
        </div>

        {/* Item 4: Altitude & Speed */}
        <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white flex flex-col gap-0.5">
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span className="text-sky-400 font-bold">비행 제원</span>
            <span className="text-emerald-400 text-[10px]">정상 순항</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-bold text-zinc-100">{altitude.toFixed(2)}m <span className="text-[9px] text-zinc-400 font-normal">AGL</span></span>
            <span className="text-xs font-bold text-sky-300">{speed.toFixed(1)} m/s <span className="text-[9px] text-zinc-400 font-normal">SPEED</span></span>
          </div>
          <span className="text-[10px] text-zinc-400">자율 경로 안정화 중</span>
        </div>
      </div>

      {/* 4 Key Flight Metric Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-white flex flex-col gap-1 shadow-xs border border-zinc-200 hover:border-sky-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-zinc-500 uppercase">
              FLIGHT DURATION
            </span>
            <span className="material-symbols-outlined text-sky-600 text-lg">battery_charging_full</span>
          </div>
          <div className="text-2xl lg:text-3xl text-zinc-950 font-bold">
            55<span className="text-sm font-medium ml-1 text-zinc-500">Min</span>
          </div>
          <p className="text-xs text-zinc-500">최대 무급유 전비 중량 연속 비행 (예시)</p>
        </div>

        <div className="p-5 rounded-xl bg-white flex flex-col gap-1 shadow-xs border border-zinc-200 hover:border-sky-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-zinc-500 uppercase">
              SECURE TELEMETRY
            </span>
            <span className="material-symbols-outlined text-sky-600 text-lg">radar</span>
          </div>
          <div className="text-2xl lg:text-3xl text-zinc-950 font-bold">
            15<span className="text-sm font-medium ml-1 text-zinc-500">km</span>
          </div>
          <p className="text-xs text-zinc-500">AES-256 전파 방해 방어 무선 링크</p>
        </div>

        <div className="p-5 rounded-xl bg-white flex flex-col gap-1 shadow-xs border border-zinc-200 hover:border-sky-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-zinc-500 uppercase">
              INGRESS PROTECTION
            </span>
            <span className="material-symbols-outlined text-sky-600 text-lg">water_drop</span>
          </div>
          <div className="text-2xl lg:text-3xl text-zinc-950 font-bold">IP55</div>
          <p className="text-xs text-zinc-500">강우 100mm/h 폭우·강풍 전천후 가동</p>
        </div>

        <div className="p-5 rounded-xl bg-white flex flex-col gap-1 shadow-xs border border-zinc-200 hover:border-sky-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-zinc-500 uppercase">
              OMNI SENSING
            </span>
            <span className="material-symbols-outlined text-sky-600 text-lg">view_in_ar</span>
          </div>
          <div className="text-2xl lg:text-3xl text-zinc-950 font-bold">AI 360°</div>
          <p className="text-xs text-zinc-500">밀리미터파 레이더 전방위 충돌 방지</p>
        </div>
      </div>
    </section>
  );
};
