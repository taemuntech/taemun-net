import React from 'react';
import { Satellite, Radio } from 'lucide-react';
import { ModalType } from '../types';

interface HeroSectionProps {
  onOpenModal: (type: ModalType) => void;
  onScrollToTasking: () => void;
}

export const HERO_SATELLITE_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuCSsol02qzwW-iBV_wGuzm3MYvvHeuDYXGxR4eyaKXd7YyZzQO_jJHJaNJOgAdwJ2VujKPSV9pz76tsqkKNHwE6PBgvu2AZZltQhVXEOQ-enkNzKQlYlpn2ezYQSenLWXNlFRRKWRBw-YQDr3mR6y41hrfVhh7w0ppPjParKC6B23qJmiUeXyUZnW11wGJWgOs0Gxe8ASU7dSUDZJtQBxvUuxhGCMXlTc9gxi-1Xhbolv4eTzU8ys_p";

/** 히어로 하단 신뢰 지표 — 가상 브랜드라 전부 예시 수치다(구역 머리에 배지 한 개로 표시). */
const CORE_STATS: ReadonlyArray<{ label: string; value: string; note: string; valueClass: string }> = [
  {
    label: 'CONSTELLATION FLEET',
    value: '32 Active SmallSats',
    note: '500km 태양동기궤도 전개 자율 편대',
    valueClass: 'text-primary',
  },
  {
    label: 'SUB-METER RESOLUTION',
    value: '0.3m GSD',
    note: '초정밀 컬러 광학 & 올웨더 SAR',
    valueClass: 'text-secondary',
  },
  {
    label: 'GLOBAL REVISIT RATE',
    value: '90 Minutes',
    note: '지구 전역 평균 재방문 주기 설계값',
    valueClass: 'text-tertiary-container',
  },
  {
    label: 'GROUND STATIONS',
    value: '14 Autonomous Nodes',
    note: '직접 X/Ka-band 다운링크 네트워크',
    valueClass: 'text-on-surface',
  },
];

export default function HeroSection({ onOpenModal, onScrollToTasking }: HeroSectionProps) {
  return (
    <section id="fleet" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden telemetry-grid border-b border-outline-variant/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Heritage Pill Badge */}
        <div className="flex items-center justify-start mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container border border-outline-variant text-primary font-bold text-xs [word-break:keep-all]">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary-container shrink-0" />
            SERIES-B ENTERPRISE • LEO CONSTELLATION RIDESHARE FLIGHT HERITAGE (예시)
          </div>
        </div>

        {/* Main Asymmetric Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Hero Copy Column (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
              Autonomous LEO Satellite Constellation for{' '}
              <span className="text-primary underline decoration-secondary-container decoration-4 underline-offset-8">
                Continuous Planetary
              </span>{' '}
              Intelligence
            </h1>
            <p className="text-base lg:text-lg text-on-surface-variant max-w-2xl leading-relaxed [word-break:keep-all]">
              500km 태양동기궤도(SSO) 상에서 가동되는 32기의 초소형 군집 위성이 전 지구를 90분 주기로 재방문합니다. 0.3m 초고해상도 광학 렌즈와 전천후 X-band SAR 레이더로 기상과 밤낮에 구애받지 않고 지구의 매 순간을 자율 분석합니다.
            </p>

            {/* CTAs — 태블릿(768)부터 가로로 놓는다(모바일/웹 경계는 그대로 lg) */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 pt-2">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-on-background text-on-primary font-semibold text-sm hover:bg-inverse-surface transition-all shadow-md active:scale-95 cursor-pointer"
                onClick={onScrollToTasking}
              >
                <span>촬영 위임(Tasking) 의뢰</span>
                <Satellite className="w-4 h-4 text-secondary-container shrink-0" />
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface font-semibold text-sm hover:bg-surface-container-low transition-all active:scale-95 shadow-sm cursor-pointer"
                onClick={() => onOpenModal('dossier')}
              >
                <Radio className="w-4 h-4 text-primary shrink-0" />
                <span>2026 미션 도시에 (Dossier PDF)</span>
              </button>
            </div>

            {/* Secondary Micro Telemetry Pill Line */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 font-code-mono text-on-surface-variant text-xs">
              <div className="flex items-center gap-1.5">
                <Satellite className="w-3.5 h-3.5 text-secondary shrink-0" />
                <span>Constellation: 32 SmallSats Operational</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>Latency: 15-min Ingestion to Cloud</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-tertiary-container shrink-0" />
                <span>수출통제 준수 표기 (예시)</span>
              </div>
            </div>
          </div>

          {/* Right Hero Satellite HUD Viewport (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative bg-surface-container-lowest rounded-xl border border-outline-variant p-2 shadow-lg overflow-hidden group">
              {/* Top HUD Bar */}
              <div className="bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-t-lg flex items-center justify-between gap-2 font-code-mono text-xs">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse shrink-0" />
                  {/* 375 에서는 뒤쪽 「// SATELLITE HUD」 가 잘려 나가 좁은 폭에서는 위성 이름만 적는다 */}
                  <span className="truncate">
                    <span className="sm:hidden">STELLA-ORBITAL-09</span>
                    <span className="hidden sm:inline">STELLA-ORBITAL-09 // SATELLITE HUD</span>
                  </span>
                </div>
                <span className="text-secondary-fixed shrink-0">TELEMETRY (예시 수치)</span>
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
                <div className="absolute inset-0 pointer-events-none p-2 lg:p-4 flex flex-col justify-between border border-secondary-container/20">
                  {/* 좁은 폭에서는 두 칸이 서로 파고들어 글자가 겹쳤다 — 세로로 쌓는다 */}
                  <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-start text-surface font-code-mono text-[10px] lg:text-[11px] bg-on-background/70 backdrop-blur-sm p-2 rounded border border-outline-variant/30">
                    <div className="min-w-0">
                      <p className="text-secondary-fixed font-bold break-words">TARGET COORD: 36.3504° N, 127.3845° E</p>
                      <p>ALTITUDE: 502.4 KM SSO</p>
                    </div>
                    <div className="md:text-right min-w-0">
                      <p>VELOCITY: 7.66 KM/S</p>
                      <p className="text-tertiary-fixed">CARRIER LOCK: 99.98% (예시)</p>
                    </div>
                  </div>

                  {/* Center Crosshair reticle */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 border border-secondary-fixed/50 rounded-full flex items-center justify-center">
                      <div className="w-1.5 h-1.5 bg-secondary-container rounded-full" />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-x-3 gap-y-0.5 justify-between items-end text-surface font-code-mono text-[10px] bg-on-background/70 backdrop-blur-sm p-1.5 rounded border border-outline-variant/30">
                    <span>SWATH: 12.0 KM</span>
                    <span className="text-secondary-container">OPTICAL GSD: 0.30M TRUECOLOR</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Stats Trust Bar (Laboratory Structural Grid) */}
        <div className="mt-14 pt-8 border-t border-outline-variant/60">
          <div className="mb-4 flex items-center gap-2">
            <span className="inline-flex items-center rounded bg-surface-container px-2.5 py-1 font-code-mono text-[11px] font-bold text-primary">
              예시 수치
            </span>
            <span className="text-xs text-on-surface-variant [word-break:keep-all]">
              가상 브랜드 샘플이라 아래 지표는 모두 예시입니다.
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {CORE_STATS.map((stat) => (
              <div
                key={stat.label}
                className="p-4 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-sm min-w-0"
              >
                <p className="font-code-mono text-[11px] lg:text-xs text-on-surface-variant break-words">{stat.label}</p>
                {/* 375 두 칸 격자에서 「14 Autonomous Nodes」 가 카드 밖으로 잘려 나갔다(실측 146px > 118px).
                    한 칸이 155px 뿐인 모바일에서만 글자를 줄이고, 768 부터는 원래 크기로 돌린다. */}
                <p className={`text-lg md:text-2xl font-bold ${stat.valueClass} mt-1 leading-tight break-words`}>
                  {stat.value}
                </p>
                <p className="text-xs text-on-surface-variant mt-1 [word-break:keep-all]">{stat.note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
