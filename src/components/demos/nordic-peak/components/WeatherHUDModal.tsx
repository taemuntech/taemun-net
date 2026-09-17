import React, { useState } from 'react';

interface WeatherHUDModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WeatherHUDModal: React.FC<WeatherHUDModalProps> = ({ isOpen, onClose }) => {
  const [station, setStation] = useState<'k2' | 'daegwallyeong' | 'yeongwol'>('k2');

  if (!isOpen) return null;

  const stationData = {
    k2: {
      name: 'K2 베이스캠프 전진기지',
      alt: '해발 5,895m',
      latLng: '35°52′52″N 76°30′48″E',
      temp: '-32.4°C',
      windChill: '-49.2°C',
      wind: '25.8 m/s (북서풍)',
      gust: '34.2 m/s',
      pressure: '512 hPa',
      advisory: 'CRITICAL COLD BLIZZARD WARNING',
      status: '극한 눈보라 관측 중',
      safetyFactor: '바르그 4.2 지오데식 구조 98.4% 안정성 유지 중',
    },
    daegwallyeong: {
      name: '대관령 노르딕피크 베이스랩',
      alt: '해발 840m',
      latLng: '37°40′44″N 128°43′15″E',
      temp: '-14.8°C',
      windChill: '-24.5°C',
      wind: '16.2 m/s (서풍)',
      gust: '21.0 m/s',
      pressure: '918 hPa',
      advisory: 'WINTER GALE WATCH',
      status: '동계 강풍 지속',
      safetyFactor: '전 라인업 정상 피칭 및 테스트 진행 가능',
    },
    yeongwol: {
      name: '영월 동계 거점 캠핑장 필드',
      alt: '해발 320m',
      latLng: '37°11′02″N 128°28′10″E',
      temp: '-9.2°C',
      windChill: '-16.1°C',
      wind: '8.4 m/s (남서풍)',
      gust: '12.5 m/s',
      pressure: '978 hPa',
      advisory: 'CLEAR WINTER CAMPSITE',
      status: '동계 캠핑 최적 조건',
      safetyFactor: '응급 폴대 퀵 배송 차량 비상 대기 중',
    },
  };

  const current = stationData[station];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* HUD Container */}
      <div className="relative w-full max-w-2xl bg-surface-container-lowest border-2 border-primary/50 p-6 rounded-sm shadow-2xl blueprint-grid text-on-surface">
        {/* HUD Top Bar */}
        <div className="flex items-center justify-between border-b border-outline-variant pb-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-ping" />
            <span className="font-headline-sm text-headline-sm font-bold text-on-surface uppercase">
              필드 기상 텔레메트리 관제 HUD
            </span>
            <span className="font-label-mono-sm text-label-mono-sm bg-surface-container px-2 py-0.5 rounded text-primary">
              LIVE SATELLITE FEED
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-outline hover:text-on-surface p-1 rounded cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Station Selectors */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setStation('k2')}
            className={`px-3 py-1.5 rounded-sm font-label-mono-sm text-label-mono-sm border transition-colors cursor-pointer ${
              station === 'k2'
                ? 'bg-primary-container text-on-primary-container font-bold border-primary'
                : 'bg-surface-container text-outline border-outline-variant hover:text-on-surface'
            }`}
          >
            K2 베이스캠프 (5,895m)
          </button>
          <button
            onClick={() => setStation('daegwallyeong')}
            className={`px-3 py-1.5 rounded-sm font-label-mono-sm text-label-mono-sm border transition-colors cursor-pointer ${
              station === 'daegwallyeong'
                ? 'bg-primary-container text-on-primary-container font-bold border-primary'
                : 'bg-surface-container text-outline border-outline-variant hover:text-on-surface'
            }`}
          >
            대관령 베이스랩 (840m)
          </button>
          <button
            onClick={() => setStation('yeongwol')}
            className={`px-3 py-1.5 rounded-sm font-label-mono-sm text-label-mono-sm border transition-colors cursor-pointer ${
              station === 'yeongwol'
                ? 'bg-primary-container text-on-primary-container font-bold border-primary'
                : 'bg-surface-container text-outline border-outline-variant hover:text-on-surface'
            }`}
          >
            영월 동계 거점 (320m)
          </button>
        </div>

        {/* Telemetry Display */}
        <div className="space-y-4">
          <div className="bg-surface-container/90 border border-outline-variant p-4 rounded-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  {current.name}
                </h3>
                <div className="font-label-mono-sm text-label-mono-sm text-outline">
                  {current.latLng} | {current.alt}
                </div>
              </div>
              <span className="bg-tertiary-container text-on-tertiary font-label-mono-sm text-label-mono-sm px-2 py-0.5 rounded font-bold">
                {current.advisory}
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-surface-container-high p-2.5 rounded border border-outline-variant">
                <span className="font-label-mono-sm text-[11px] text-outline">대기 기온</span>
                <div className="font-headline-sm font-bold text-tertiary mt-0.5">{current.temp}</div>
                <span className="text-[10px] text-outline">체감 {current.windChill}</span>
              </div>
              <div className="bg-surface-container-high p-2.5 rounded border border-outline-variant">
                <span className="font-label-mono-sm text-[11px] text-outline">순간 풍속</span>
                <div className="font-headline-sm font-bold text-primary mt-0.5">{current.wind}</div>
                <span className="text-[10px] text-outline">돌풍 {current.gust}</span>
              </div>
              <div className="bg-surface-container-high p-2.5 rounded border border-outline-variant">
                <span className="font-label-mono-sm text-[11px] text-outline">기압 / 밀도</span>
                <div className="font-headline-sm font-bold text-on-surface mt-0.5">{current.pressure}</div>
                <span className="text-[10px] text-outline">저산소 극한 환경</span>
              </div>
              <div className="bg-surface-container-high p-2.5 rounded border border-outline-variant">
                <span className="font-label-mono-sm text-[11px] text-outline">현장 상황</span>
                <div className="font-headline-sm font-bold text-secondary mt-0.5">경보 발령</div>
                <span className="text-[10px] text-outline">{current.status}</span>
              </div>
            </div>
          </div>

          {/* Shelter Dynamic Factor */}
          <div className="bg-surface-container-high p-3.5 rounded-sm border border-primary/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">verified</span>
              <span className="font-body-sm text-on-surface">
                <strong>엔지니어링 권고사항:</strong> {current.safetyFactor}
              </span>
            </div>
            <span className="font-label-mono-sm text-primary font-bold">MIL-SPEC 810G 통과</span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3 border-t border-outline-variant flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary-container text-on-primary-container rounded-sm font-label-mono-sm text-label-mono-sm font-bold hover:bg-surface-container-highest cursor-pointer"
          >
            HUD 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
