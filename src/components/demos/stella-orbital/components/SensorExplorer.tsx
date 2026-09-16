import React, { useState } from 'react';
import { Radar, ExternalLink } from 'lucide-react';
import { SensorModeKey, ModalType } from '../types';

interface SensorExplorerProps {
  onOpenModal: (type: ModalType) => void;
  onScrollToTasking: () => void;
}

export const SENSOR_DISPLAY_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuC4KA1dVMfjVmnCBnY3opYcfhDjf6FMDgrM_fmflYxg7r2SZKB3r5LLIuX2XlMLFbjEGuTjYT6CgiP1J8ws3e0wDKbvKZZ0NsVC08I1ov5EpFTVww2uGzmgoZkUOxisrhw7X8l34OVk1Gx8B9rGEOa2FnyXNGm02-E5LlC5-CvJfInsDpckzbEXiAF-AJTpJb9bgYI5KunR5EKB6WrNj1SG_XTxvsxdA6eWzEs-PIATYa6_pJQaaaHz";
export const SENSOR_HYPER_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuAONxcUKaLT_msE-aP-YygIZmLyxk60RldiVGDw2i4rmsRKToTwfYmY1TcWlmnGqnSGKrlVAExUUTRMFBQbic0GAU-Fr0hMENLyeeLtQszl4b2AN9rcFkhBDlBmugxuvQUsoBR9iJhEBnBQK7bGxsevjWFLscjCbois_4jc732Jm2m68ubxSIvrM9Cua4TDAwavEVWwuQPJ1dEywYldL1aVLH_x5L2M96YVXl-lqEor9SK3PLZksUBk";

export default function SensorExplorer({ onOpenModal, onScrollToTasking }: SensorExplorerProps) {
  const [activeMode, setActiveMode] = useState<SensorModeKey>('optical');

  const sensorModes = {
    optical: {
      title: "Sub-meter Optical Multi-Spectral Specs",
      gsd: "0.30 m GSD (Nadir)",
      swath: "12.0 km Standard Strip",
      bands: "16-Band Multispectral",
      latency: "15 Minutes Avg",
      hud: "LAYER: OPTICAL TRUE-COLOR [RGB+NIR]",
      polarization: "POLARIZATION: PASS-1 COG",
      img: SENSOR_DISPLAY_IMG
    },
    sar: {
      title: "X-Band Synthetic Aperture Radar (SAR) Specs",
      gsd: "0.50 m Spotlight / 1.0m Strip",
      swath: "15.0 km to 30.0 km Swath",
      bands: "Quad-Pol (HH, HV, VV, VH)",
      latency: "12 Minutes Ultra-Fast",
      hud: "LAYER: X-BAND SAR ALL-WEATHER POLARIZATION",
      polarization: "POLARIZATION: PASS-2 HH/HV CO-REG",
      img: SENSOR_DISPLAY_IMG
    },
    hyper: {
      title: "Hyperspectral & Thermal IR Payloads",
      gsd: "1.20 m SWIR / 2.5m Thermal",
      swath: "10.0 km Target Corridor",
      bands: "150 Discrete Spectral Channels",
      latency: "25 Minutes Radiometric",
      hud: "LAYER: 150-BAND GAS FLUX & THERMAL ANOMALY",
      polarization: "BANDPASS: VNIR/SWIR/LWIR FLUX",
      img: SENSOR_HYPER_IMG
    }
  };

  const current = sensorModes[activeMode];

  return (
    <section id="sensors" className="py-16 lg:py-24 bg-surface-container-lowest border-b border-outline-variant/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container text-primary font-bold text-xs mb-3">
              <Radar className="w-3.5 h-3.5" />
              SENSOR MULTI-LAYER PAYLOADS
            </div>
            <h2 className="text-2xl lg:text-4xl font-bold text-on-surface">
              전천후 다중 분광 센서 스위트 &amp; 레이더 인터페이스
            </h2>
          </div>
          <p className="text-sm lg:text-base text-on-surface-variant max-w-md mt-4 lg:mt-0">
            광학 카메라, X-band SAR 레이더, 열적외선 초분광 센서를 통해 대기 구름이나 암야와 무관하게 완전한 지구 상태를 실시간 합성합니다.
          </p>
        </div>

        {/* Sensor Switcher Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <button
            type="button"
            className={`text-left p-5 rounded-lg transition-all cursor-pointer ${ activeMode === 'optical' ? 'border-2 border-primary bg-surface-container-low shadow-sm' : 'border border-outline-variant bg-surface-container-lowest hover:border-primary' }`}
            onClick={() => setActiveMode('optical')}
          >
            <div className="flex items-center justify-between">
              <span className="font-code-mono text-xs text-primary font-bold">MODE // 01</span>
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-primary-fixed text-primary">
                ACTIVE 0.3M
              </span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mt-2">Sub-meter Optical Imaging</h3>
            <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
              0.3m 초고해상도 다중분광 컬러 렌즈. 공항 활주로 기종 판독 및 항만 선박 정밀 트래킹.
            </p>
          </button>

          <button
            type="button"
            className={`text-left p-5 rounded-lg transition-all cursor-pointer ${ activeMode === 'sar' ? 'border-2 border-secondary bg-surface-container-low shadow-sm' : 'border border-outline-variant bg-surface-container-lowest hover:border-secondary' }`}
            onClick={() => setActiveMode('sar')}
          >
            <div className="flex items-center justify-between">
              <span className="font-code-mono text-xs text-on-surface-variant">MODE // 02</span>
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-secondary-fixed text-secondary">
                ALL-WEATHER
              </span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mt-2">X-band SAR Synthetic Radar</h3>
            <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
              파장 3.1cm 초고주파 마이크로웨이브로 악천후 폭풍우와 칠흑 같은 야간에도 지표 투과 영상화.
            </p>
          </button>

          <button
            type="button"
            className={`text-left p-5 rounded-lg transition-all cursor-pointer ${ activeMode === 'hyper' ? 'border-2 border-tertiary-container bg-surface-container-low shadow-sm' : 'border border-outline-variant bg-surface-container-lowest hover:border-tertiary-container' }`}
            onClick={() => setActiveMode('hyper')}
          >
            <div className="flex items-center justify-between">
              <span className="font-code-mono text-xs text-on-surface-variant">MODE // 03</span>
              <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-surface-container text-tertiary-container">
                150-BAND
              </span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mt-2">Hyperspectral &amp; Thermal IR</h3>
            <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
              150개 분광 밴드를 통한 메탄 누출 탐지, 도시 열섬 및 가뭄 지수 정밀 분광 분석.
            </p>
          </button>
        </div>

        {/* Sensor Spec & Image Display Showcase */}
        <div className="bg-surface-container-low border border-outline-variant rounded-xl p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Interactive Visual Simulation Canvas */}
            <div className="lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-lg p-3 relative overflow-hidden shadow-inner">
              <div className="relative w-full aspect-video rounded bg-on-background overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-opacity duration-300"
                  alt="Aerospace laboratory visualization displaying high precision satellite observation"
                  src={current.img}
                  referrerPolicy="no-referrer"
                />
                {/* Floating HUD Indicators */}
                <div className="absolute top-3 left-3 bg-on-background/80 backdrop-blur-md px-3 py-1.5 rounded font-code-mono text-surface text-xs border border-outline-variant/40">
                  <span className="text-secondary-fixed">{current.hud}</span>
                </div>
                <div className="absolute bottom-3 right-3 bg-on-background/80 backdrop-blur-md px-3 py-1.5 rounded font-code-mono text-surface text-xs border border-outline-variant/40">
                  <span>{current.polarization}</span>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 px-2 font-code-mono text-xs text-on-surface-variant">
                <span>FOV: 1.37° • GSD: 0.30m NADIR</span>
                <button
                  type="button"
                  className="text-primary font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  onClick={() => onOpenModal('viewer')}
                >
                  <Radar className="w-3.5 h-3.5" />
                  Launch Deep GeoTIFF Spectral Viewer
                </button>
              </div>
            </div>

            {/* Parameter Cards */}
            <div className="lg:col-span-5 flex flex-col space-y-4">
              <h4 className="text-xl font-bold text-on-surface">{current.title}</h4>
              <div className="space-y-3 font-code-mono text-xs">
                <div className="p-3 bg-surface-container-lowest rounded border border-outline-variant flex justify-between">
                  <span className="text-on-surface-variant">Ground Sampling Distance:</span>
                  <span className="font-bold text-primary">{current.gsd}</span>
                </div>
                <div className="p-3 bg-surface-container-lowest rounded border border-outline-variant flex justify-between">
                  <span className="text-on-surface-variant">Swath Width:</span>
                  <span className="font-bold text-on-surface">{current.swath}</span>
                </div>
                <div className="p-3 bg-surface-container-lowest rounded border border-outline-variant flex justify-between">
                  <span className="text-on-surface-variant">Spectral Bands:</span>
                  <span className="font-bold text-secondary">{current.bands}</span>
                </div>
                <div className="p-3 bg-surface-container-lowest rounded border border-outline-variant flex justify-between">
                  <span className="text-on-surface-variant">Downlink-to-API Latency:</span>
                  <span className="font-bold text-tertiary-container">{current.latency}</span>
                </div>
                <div className="p-3 bg-surface-container-lowest rounded border border-outline-variant flex justify-between">
                  <span className="text-on-surface-variant">Orbital Revisit:</span>
                  <span className="font-bold text-on-surface">90 Min Constellation Wide</span>
                </div>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  className="w-full py-3 bg-primary text-on-primary rounded-lg font-semibold text-xs hover:bg-primary-container transition-all text-center cursor-pointer shadow-sm active:scale-95"
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
