'use client';

import React, { useState } from 'react';
import { Radar } from 'lucide-react';
import { SensorModeKey, SensorSpec, ModalType } from '../types';

interface SensorExplorerProps {
  onOpenModal: (type: ModalType) => void;
  onScrollToTasking: () => void;
}

/**
 * 원본 사진 왼쪽에 실존 위성 이름이 박혀 있다 — 그 열을 잘라낸다.
 * 사진 속 관제 화면의 왼쪽 패널에 「Project: Port Guardian / Satellite: Sentinel-5A / Altitude 675km /
 * Image Date 2023-10-27」이 찍혀 있는데, Sentinel 은 실존 지구관측 위성 프로그램이다. 지어낸 회사가
 * 실존 위성 영상을 파는 것처럼 읽히고, 글자가 이미지 안이라 audit-portfolio 는 보지 못한다(ERROR 0).
 * 오른쪽 기준으로 확대해 왼쪽 약 20% 를 화면 밖으로 밀어낸다.
 */
const SENSOR_IMAGE_CROP: React.CSSProperties = {
  transform: 'scale(1.25)',
  transformOrigin: 'right center',
};

export const SENSOR_DISPLAY_IMG = "/demo-media/stella-orbital/stella-orbital-03.jpg";
export const SENSOR_HYPER_IMG = "/demo-media/stella-orbital/stella-orbital-02.jpg";

const SENSOR_MODES: Record<SensorModeKey, SensorSpec> = {
  optical: {
    code: 'MODE // 01',
    badge: '0.3M GSD',
    name: 'Sub-meter Optical Imaging',
    shortDesc: '0.3m 초고해상도 다중분광 컬러 렌즈. 공항 활주로 기종 판독 및 항만 선박 정밀 트래킹.',
    detailTitle: 'Sub-meter Optical Multi-Spectral Specs',
    gsd: '0.30 m GSD (Nadir)',
    swath: '12.0 km Standard Strip',
    bands: '16-Band Multispectral',
    latency: '15 Minutes Avg',
    revisit: '90 Min Constellation Wide',
    hudLabel: 'LAYER: OPTICAL TRUE-COLOR [RGB+NIR]',
    polarization: 'POLARIZATION: PASS-1 COG',
    fovGsd: 'FOV: 1.37° • GSD: 0.30m NADIR',
    imageUrl: SENSOR_DISPLAY_IMG,
    imageAlt: '광학 트루컬러로 본 지구 관측 영상 예시',
    imageClass: 'saturate-100',
  },
  sar: {
    code: 'MODE // 02',
    badge: 'ALL-WEATHER',
    name: 'X-band SAR Synthetic Radar',
    shortDesc: '파장 3.1cm 초고주파 마이크로웨이브로 악천후 폭풍우와 칠흑 같은 야간에도 지표 투과 영상화.',
    detailTitle: 'X-Band Synthetic Aperture Radar (SAR) Specs',
    gsd: '0.50 m Spotlight / 1.0m Strip',
    swath: '15.0 km to 30.0 km Swath',
    bands: 'Quad-Pol (HH, HV, VV, VH)',
    latency: '12 Minutes Ultra-Fast',
    revisit: '90 Min Constellation Wide',
    hudLabel: 'LAYER: X-BAND SAR ALL-WEATHER POLARIZATION',
    polarization: 'POLARIZATION: PASS-2 HH/HV CO-REG',
    fovGsd: 'INCIDENCE: 21°–48° • GSD: 0.50m SPOTLIGHT',
    imageUrl: SENSOR_DISPLAY_IMG,
    imageAlt: 'X-band SAR 후방산란 강도로 본 흑백 관측 영상 예시',
    imageClass: 'grayscale contrast-125 brightness-90',
  },
  hyper: {
    code: 'MODE // 03',
    badge: '150-BAND',
    name: 'Hyperspectral & Thermal IR',
    shortDesc: '150개 분광 밴드를 통한 메탄 누출 탐지, 도시 열섬 및 가뭄 지수 정밀 분광 분석.',
    detailTitle: 'Hyperspectral & Thermal IR Payloads',
    gsd: '1.20 m SWIR / 2.5m Thermal',
    swath: '10.0 km Target Corridor',
    bands: '150 Discrete Spectral Channels',
    latency: '25 Minutes Radiometric',
    revisit: '90 Min Constellation Wide',
    hudLabel: 'LAYER: 150-BAND GAS FLUX & THERMAL ANOMALY',
    polarization: 'BANDPASS: VNIR/SWIR/LWIR FLUX',
    fovGsd: 'BANDPASS: 400–2500nm • GSD: 1.20m SWIR',
    imageUrl: SENSOR_HYPER_IMG,
    imageAlt: '초분광·열적외선 위색 합성으로 본 관측 영상 예시',
    imageClass: 'hue-rotate-180 saturate-150',
  },
};

const MODE_ORDER: ReadonlyArray<SensorModeKey> = ['optical', 'sar', 'hyper'];

/** 탭마다 강조색이 달라 아라의 색 구성을 그대로 따른다 */
const MODE_ACCENT: Record<SensorModeKey, { active: string; idle: string; badge: string; code: string }> = {
  optical: {
    active: 'border-2 border-primary bg-surface-container-low shadow-sm',
    idle: 'border border-outline-variant bg-surface-container-lowest hover:border-primary',
    badge: 'bg-primary-fixed text-primary',
    code: 'text-primary',
  },
  sar: {
    active: 'border-2 border-secondary bg-surface-container-low shadow-sm',
    idle: 'border border-outline-variant bg-surface-container-lowest hover:border-secondary',
    badge: 'bg-secondary-fixed text-secondary',
    code: 'text-secondary',
  },
  hyper: {
    active: 'border-2 border-tertiary-container bg-surface-container-low shadow-sm',
    idle: 'border border-outline-variant bg-surface-container-lowest hover:border-tertiary-container',
    badge: 'bg-surface-container text-tertiary-container',
    code: 'text-tertiary-container',
  },
};

export default function SensorExplorer({ onOpenModal, onScrollToTasking }: SensorExplorerProps) {
  const [activeMode, setActiveMode] = useState<SensorModeKey>('optical');
  const current = SENSOR_MODES[activeMode];

  return (
    <section id="sensors" className="py-16 lg:py-24 bg-surface-container-lowest border-b border-outline-variant/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container text-primary font-bold text-xs mb-3">
              <Radar className="w-3.5 h-3.5" />
              SENSOR MULTI-LAYER PAYLOADS
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-on-surface [word-break:keep-all]">
              전천후 다중 분광 센서 스위트 &amp; 레이더 인터페이스
            </h2>
          </div>
          <p className="text-sm lg:text-base text-on-surface-variant max-w-md mt-4 lg:mt-0 [word-break:keep-all]">
            광학 카메라, X-band SAR 레이더, 열적외선 초분광 센서를 통해 대기 구름이나 암야와 무관하게 완전한 지구 상태를 합성합니다.
          </p>
        </div>

        {/* Sensor Switcher Tabs — 태블릿(768)부터 세 칸으로 편다 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8" role="tablist" aria-label="센서 페이로드 선택">
          {MODE_ORDER.map((mode) => {
            const spec = SENSOR_MODES[mode];
            const accent = MODE_ACCENT[mode];
            const isActive = activeMode === mode;
            return (
              <button
                key={mode}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-controls="sensor-detail-panel"
                className={`text-left p-5 rounded-lg transition-all cursor-pointer ${isActive ? accent.active : accent.idle}`}
                onClick={() => setActiveMode(mode)}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`font-code-mono text-xs font-bold ${isActive ? accent.code : 'text-on-surface-variant'}`}>
                    {spec.code}
                  </span>
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold shrink-0 ${accent.badge}`}>
                    {spec.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-on-surface mt-2">{spec.name}</h3>
                <p className="text-xs text-on-surface-variant mt-2 leading-relaxed [word-break:keep-all]">{spec.shortDesc}</p>
              </button>
            );
          })}
        </div>

        {/* Sensor Spec & Image Display Showcase */}
        <div id="sensor-detail-panel" className="bg-surface-container-low border border-outline-variant rounded-xl p-4 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Visual Simulation Canvas */}
            <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-lg p-3 relative overflow-hidden shadow-inner">
              <div className="relative w-full aspect-video rounded bg-on-background overflow-hidden">
                <img
                  className={`w-full h-full object-cover transition-all duration-500 ${current.imageClass}`}
                  alt={current.imageAlt}
                  src={current.imageUrl}
                  referrerPolicy="no-referrer"
                  style={SENSOR_IMAGE_CROP}
                />
                {/* Floating HUD Indicators */}
                <div className="absolute top-2 left-2 lg:top-3 lg:left-3 max-w-[calc(100%-1rem)] bg-on-background/80 backdrop-blur-md px-2.5 py-1.5 rounded font-code-mono text-surface text-[10px] lg:text-xs border border-outline-variant/40">
                  <span className="text-secondary-fixed break-words">{current.hudLabel}</span>
                </div>
                <div className="absolute bottom-2 right-2 lg:bottom-3 lg:right-3 max-w-[calc(100%-1rem)] bg-on-background/80 backdrop-blur-md px-2.5 py-1.5 rounded font-code-mono text-surface text-[10px] lg:text-xs border border-outline-variant/40">
                  <span className="break-words">{current.polarization}</span>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-2 font-code-mono text-xs text-on-surface-variant">
                <span className="break-words">{current.fovGsd}</span>
                <button
                  type="button"
                  className="text-primary font-bold hover:underline inline-flex items-center gap-1 cursor-pointer max-lg:min-h-11 max-lg:w-full max-lg:justify-center max-lg:rounded-lg max-lg:border max-lg:border-outline-variant max-lg:px-3"
                  onClick={() => onOpenModal('viewer')}
                >
                  <Radar className="w-3.5 h-3.5 shrink-0" />
                  Launch Deep GeoTIFF Spectral Viewer
                </button>
              </div>
            </div>

            {/* Parameter Cards */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              <h4 className="text-xl font-bold text-on-surface [word-break:keep-all]">{current.detailTitle}</h4>
              <div className="space-y-3 font-code-mono text-xs">
                {[
                  { label: 'Ground Sampling Distance:', value: current.gsd, tone: 'text-primary' },
                  { label: 'Swath Width:', value: current.swath, tone: 'text-on-surface' },
                  { label: 'Spectral Bands:', value: current.bands, tone: 'text-secondary' },
                  { label: 'Downlink-to-API Latency:', value: current.latency, tone: 'text-tertiary-container' },
                  { label: 'Orbital Revisit:', value: current.revisit, tone: 'text-on-surface' },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="p-3 bg-surface-container-lowest rounded border border-outline-variant flex flex-wrap justify-between gap-x-3 gap-y-1"
                  >
                    <span className="text-on-surface-variant">{row.label}</span>
                    <span className={`font-bold ${row.tone}`}>{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  className="w-full min-h-11 py-3 bg-primary text-on-primary rounded-lg font-semibold text-xs hover:bg-primary-container transition-all text-center cursor-pointer shadow-sm active:scale-95"
                  onClick={onScrollToTasking}
                >
                  Configure Sensor Tasking Mission
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
