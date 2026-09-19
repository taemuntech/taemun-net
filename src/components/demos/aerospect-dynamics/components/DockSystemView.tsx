import React, { useState } from 'react';
import { ASSET_IMAGES } from '../data/mockData';

interface DockSystemViewProps {
  onOpenPocModal: () => void;
}

export const DockSystemView: React.FC<DockSystemViewProps> = ({ onOpenPocModal }) => {
  const [stationStatus, setStationStatus] = useState<'READY' | 'DEPLOYING' | 'CHARGING'>('READY');
  const [batteryLevel] = useState<number>(94);

  const triggerMissionSimulation = () => {
    setStationStatus('DEPLOYING');
    setTimeout(() => {
      setStationStatus('CHARGING');
      setTimeout(() => {
        setStationStatus('READY');
      }, 4000);
    }, 4000);
  };

  return (
    <section id="dock-system-section" className="w-full bg-surface-container-lowest py-16 border-b border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 flex flex-col gap-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <span className="font-telemetry-code text-telemetry-code text-emerald-600 font-semibold uppercase">
              AUTONOMOUS HANGAR STATION // BVLOS DEPLOYMENT
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              SENTINEL DOCK : 24/7 완전 무인 자율 관제 기지국
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded bg-emerald-100 text-emerald-800 font-telemetry-code text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              STATUS: {stationStatus}
            </span>
            <button
              onClick={triggerMissionSimulation}
              disabled={stationStatus !== 'READY'}
              className="px-4 py-2 bg-secondary text-white rounded font-telemetry-label text-xs uppercase tracking-wider hover:bg-secondary/90 transition-all cursor-pointer disabled:opacity-50"
            >
              {stationStatus === 'READY'
                ? '원격 출격 임무 시뮬레이션'
                : stationStatus === 'DEPLOYING'
                ? '임무 자율 비행 중...'
                : '초고속 공조 충전 중...'}
            </button>
          </div>
        </div>

        {/* Central Display Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visual */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden bg-surface-container relative aspect-[16/9] border border-outline-variant/30">
            <img
              src={ASSET_IMAGES.dockStation}
              alt="Industrial drone dock station container"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none"></div>

            <div className="absolute top-4 left-4 p-3 rounded-lg bg-black/75 backdrop-blur text-white font-telemetry-code text-xs flex flex-col gap-1 border border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span className="font-bold">SENTINEL DOCK ID: KR-DOCK-01</span>
              </div>
              <span className="text-white/70">LOCATION: 서남해 해상풍력 관제기지 (시범 단지)</span>
              <span className="text-emerald-400">AIR CONDITIONING: 22.4°C (OPTIMAL)</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-black/80 backdrop-blur text-white flex flex-wrap items-center justify-between font-telemetry-code text-xs border border-white/10">
              <div className="flex items-center gap-4">
                <span>배터리 잔량: <strong className="text-emerald-400">{batteryLevel}%</strong></span>
                <span>착륙 유도 비주얼 서보: <strong className="text-sky-300">±1.8cm 정밀도</strong></span>
              </div>
              <span className="text-white/60 text-[11px]">STARLINK SATELLITE LINK ACTIVE</span>
            </div>
          </div>

          {/* Meteorological and Station Diagnostics Radar */}
          <div className="flex flex-col gap-4">
            <div className="p-5 rounded-2xl bg-surface-container flex flex-col gap-3 border border-outline-variant/30">
              <div className="flex items-center justify-between border-b border-outline-variant/30 pb-2">
                <span className="font-telemetry-label text-xs text-on-surface font-bold">
                  기상 관측 스테이션 (METEOROLOGICAL RADAR)
                </span>
                <span className="material-symbols-outlined text-secondary text-base">cloud_sync</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-telemetry-code">
                <div className="p-2.5 bg-surface-container-low rounded-lg">
                  <span className="text-on-surface-variant block text-[10px]">현장 풍속</span>
                  <span className="text-sm font-bold text-on-surface">5.8 m/s</span>
                  <span className="text-[10px] text-emerald-600 block">비행 적합 (Nominal)</span>
                </div>
                <div className="p-2.5 bg-surface-container-low rounded-lg">
                  <span className="text-on-surface-variant block text-[10px]">강우량 센서</span>
                  <span className="text-sm font-bold text-on-surface">0.0 mm/h</span>
                  <span className="text-[10px] text-emerald-600 block">무강우 청명</span>
                </div>
                <div className="p-2.5 bg-surface-container-low rounded-lg">
                  <span className="text-on-surface-variant block text-[10px]">외기 습도</span>
                  <span className="text-sm font-bold text-on-surface">42.1 %</span>
                  <span className="text-[10px] text-on-surface-variant block">결로 위험 없음</span>
                </div>
                <div className="p-2.5 bg-surface-container-low rounded-lg">
                  <span className="text-on-surface-variant block text-[10px]">대기압</span>
                  <span className="text-sm font-bold text-on-surface">1,013.2 hPa</span>
                  <span className="text-[10px] text-on-surface-variant block">표준 기압계</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-surface-container flex flex-col gap-3 border border-outline-variant/30">
              <span className="font-telemetry-label text-xs text-on-surface font-bold">
                자동화 메커니즘 사양
              </span>
              <ul className="text-xs text-on-surface-variant flex flex-col gap-2 font-telemetry-code">
                <li className="flex items-center gap-2">
                  <span className="text-secondary font-bold">▸</span>
                  <span>로봇 암 기반 배터리 충전 컨택터 자동 밀착</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secondary font-bold">▸</span>
                  <span>25분 급속 충전 (수랭-공랭 복합 쿨링)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secondary font-bold">▸</span>
                  <span>IP67 방수 전동 슬라이딩 해치 도어</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-secondary font-bold">▸</span>
                  <span>내장 비상 UPS 발전 시스템 (4시간 무전원 유지)</span>
                </li>
              </ul>

              <button
                onClick={onOpenPocModal}
                className="mt-2 w-full py-2.5 bg-primary text-on-primary rounded font-telemetry-label text-xs uppercase tracking-wider hover:bg-surface-container-high hover:text-on-surface transition-all cursor-pointer"
              >
                도크 기지국 도입 문의
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
