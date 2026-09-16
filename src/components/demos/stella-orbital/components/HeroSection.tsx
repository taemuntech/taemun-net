import React from 'react';
import { Satellite, Radio, ShieldCheck, Clock, Layers, Globe } from 'lucide-react';
import { ModalType } from '../types';

interface HeroSectionProps {
  onOpenModal: (type: ModalType) => void;
  onScrollToTasking: () => void;
}

export const HERO_SATELLITE_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuCSsol02qzwW-iBV_wGuzm3MYvvHeuDYXGxR4eyaKXd7YyZzQO_jJHJaNJOgAdwJ2VujKPSV9pz76tsqkKNHwE6PBgvu2AZZltQhVXEOQ-enkNzKQlYlpn2ezYQSenLWXNlFRRKWRBw-YQDr3mR6y41hrfVhh7w0ppPjParKC6B23qJmiUeXyUZnW11wGJWgOs0Gxe8ASU7dSUDZJtQBxvUuxhGCMXlTc9gxi-1Xhbolv4eTzU8ys_p";

export default function HeroSection({ onOpenModal, onScrollToTasking }: HeroSectionProps) {
  return (
    <section id="fleet" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden telemetry-grid border-b border-outline-variant/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Heritage Pill Badge */}
        <div className="flex items-center justify-start mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container border border-outline-variant text-primary font-bold text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-container" />
            SERIES-B ENTERPRISE • LEO CONSTELLATION AIRBUS/SPACEX FLIGHT HERITAGE
          </div>
        </div>

        {/* Main Asymmetric Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Copy Column (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <h1 className="text-3xl lg:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
              Autonomous LEO Satellite Constellation for{' '}
              <span className="text-primary underline decoration-secondary-container decoration-4 underline-offset-8">
                Continuous Planetary
              </span>{' '}
              Intelligence
            </h1>
            <p className="text-base lg:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
              500km 태양동기궤도(SSO) 상에서 가동되는 32기의 초소형 군집 위성이 전 지구를 90분 주기로 재방문합니다. 0.3m 초고해상도 광학 렌즈와 전천후 X-band SAR 레이더로 기상과 밤낮에 구애받지 않고 지구의 매 순간을 자율 분석합니다.
            </p>

            {/* CTAs */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 pt-2">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-on-background text-on-primary font-semibold text-sm hover:bg-inverse-surface transition-all shadow-md active:scale-95 cursor-pointer"
                onClick={onScrollToTasking}
              >
                <span>촬영 위임(Tasking) 의뢰</span>
                <Satellite className="w-4 h-4 text-secondary-container" />
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface font-semibold text-sm hover:bg-surface-container-low transition-all active:scale-95 shadow-sm cursor-pointer"
                onClick={() => onOpenModal('dossier')}
              >
                <Radio className="w-4 h-4 text-primary" />
                <span>2026 미션 도시에 (Dossier PDF)</span>
              </button>
            </div>

            {/* Secondary Micro Telemetry Pill Line */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 font-code-mono text-on-surface-variant text-xs">
              <div className="flex items-center gap-1.5">
                <Satellite className="w-3.5 h-3.5 text-secondary" />
                <span>Constellation: 32 SmallSats Operational</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-primary" />
                <span>Latency: 15-min Ingestion to Cloud</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tertiary-container" />
                <span>ITAR Registered Defense Compliant</span>
              </div>
            </div>
          </div>

          {/* Right Hero Satellite HUD Viewport (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-surface-container-lowest rounded-xl border border-outline-variant p-2 shadow-lg overflow-hidden group">
              {/* Top HUD Bar */}
              <div className="bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-t-lg flex items-center justify-between font-code-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
                  <span>STELLA-ORBITAL-09 // SATELLITE HUD</span>
                </div>
                <span className="text-secondary-fixed">LIVE RECON TELEMETRY</span>
              </div>

              {/* Satellite Photographic Feed Container */}
              <div className="relative aspect-video lg:aspect-square w-full rounded-b-lg overflow-hidden bg-on-background">
                <img
                  alt="STELLA-09 SmallSat in Low Earth Orbit with solar array over Europe and blue ocean"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src={HERO_SATELLITE_IMG}
                  referrerPolicy="no-referrer"
                />

                {/* Subtle Telemetry HUD Overlays */}
                <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between border border-secondary-container/20">
                  <div className="flex justify-between items-start text-surface font-code-mono text-[11px] bg-on-background/70 backdrop-blur-sm p-2 rounded border border-outline-variant/30">
                    <div>
                      <p className="text-secondary-fixed font-bold">TARGET COORD: 36.3504° N, 127.3845° E</p>
                      <p>ALTITUDE: 502.4 KM SSO</p>
                    </div>
                    <div className="text-right">
                      <p>VELOCITY: 7.66 KM/S</p>
                      <p className="text-tertiary-fixed">CARRIER LOCK: 99.98%</p>
                    </div>
                  </div>

                  {/* Center Crosshair reticle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border border-secondary-fixed/50 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-secondary-container rounded-full" />
                    </div>
                  </div>

                  <div className="flex justify-between items-end text-surface font-code-mono text-[10px] bg-on-background/70 backdrop-blur-sm p-1.5 rounded border border-outline-variant/30">
                    <span>SWATH: 12.0 KM</span>
                    <span className="text-secondary-container">OPTICAL GSD: 0.30M TRUECOLOR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Stats Trust Bar (Laboratory Structural Grid) */}
        <div className="mt-14 pt-8 border-t border-outline-variant/60 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-4 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-sm">
            <p className="font-code-mono text-xs text-on-surface-variant">CONSTELLATION FLEET</p>
            <p className="text-2xl font-bold text-primary mt-1">32 Active SmallSats</p>
            <p className="text-xs text-on-surface-variant mt-1">500km 태양동기궤도 전개 자율 편대</p>
          </div>
          <div className="p-4 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-sm">
            <p className="font-code-mono text-xs text-on-surface-variant">SUB-METER RESOLUTION</p>
            <p className="text-2xl font-bold text-secondary mt-1">0.3m GSD</p>
            <p className="text-xs text-on-surface-variant mt-1">초정밀 컬러 광학 &amp; 올웨더 SAR</p>
          </div>
          <div className="p-4 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-sm">
            <p className="font-code-mono text-xs text-on-surface-variant">GLOBAL REVISIT RATE</p>
            <p className="text-2xl font-bold text-tertiary-container mt-1">90 Minutes</p>
            <p className="text-xs text-on-surface-variant mt-1">지구 전역 평균 재방문 주기 달성</p>
          </div>
          <div className="p-4 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-sm">
            <p className="font-code-mono text-xs text-on-surface-variant">GROUND STATIONS</p>
            <p className="text-2xl font-bold text-on-surface mt-1">14 Autonomous Nodes</p>
            <p className="text-xs text-on-surface-variant mt-1">직접 X/Ka-band 다운링크 네트워크</p>
          </div>
        </div>
      </div>
    </section>
  );
}
