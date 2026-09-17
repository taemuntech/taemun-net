import { useSampleDialog } from '@/components/demo-kit/use-sample-dialog';
import React, { useId, useRef, useState } from 'react';

interface WeatherHUDModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ⚠️ 실존 고산의 이름과 진짜 좌표를 넣으면 「그 산의 실제 관측값」처럼 읽힌다.
//    관측점은 가상으로 두고, 값은 전부 예시라고 화면에 적는다.
type Station = {
  key: string;
  tab: string;
  name: string;
  alt: string;
  latLng: string;
  temp: string;
  windChill: string;
  wind: string;
  gust: string;
  pressure: string;
  advisory: string;
  status: string;
  fieldNote: string;
  note: string;
};

const STATIONS: Station[] = [
  {
    key: 'ridge',
    tab: '가상 고산 전진기지',
    name: '노르딕 피크 고산 전진기지 (가상 관측점)',
    alt: '해발 5,600m 설정',
    latLng: '좌표 표기 자리 (예시)',
    temp: '-32.4°C',
    windChill: '-49.2°C',
    wind: '25.8 m/s (북서풍)',
    gust: '34.2 m/s',
    pressure: '512 hPa',
    advisory: 'BLIZZARD (예시)',
    status: '눈보라 상황 가정',
    fieldNote: '경보 가정',
    note: '바르그 4.2 지오데식 구조를 이 조건에 맞춰 설계했습니다 (모의 시나리오)',
  },
  {
    key: 'daegwallyeong',
    tab: '대관령 베이스랩',
    name: '대관령 노르딕피크 베이스랩 (예시)',
    alt: '해발 840m 설정',
    latLng: '좌표 표기 자리 (예시)',
    temp: '-14.8°C',
    windChill: '-24.5°C',
    wind: '16.2 m/s (서풍)',
    gust: '21.0 m/s',
    pressure: '918 hPa',
    advisory: 'WINTER GALE (예시)',
    status: '동계 강풍 지속 가정',
    fieldNote: '주의 가정',
    note: '전 라인업 정상 피칭 및 자체 시험 진행 가능 (예시)',
  },
  {
    key: 'yeongwol',
    tab: '영월 동계 거점',
    name: '영월 동계 거점 캠핑장 필드 (예시)',
    alt: '해발 320m 설정',
    latLng: '좌표 표기 자리 (예시)',
    temp: '-9.2°C',
    windChill: '-16.1°C',
    wind: '8.4 m/s (남서풍)',
    gust: '12.5 m/s',
    pressure: '978 hPa',
    advisory: 'CLEAR (예시)',
    status: '동계 캠핑 양호 가정',
    fieldNote: '양호 가정',
    note: '응급 폴대 배송 지원 지역입니다 (예시 안내)',
  },
];

export const WeatherHUDModal: React.FC<WeatherHUDModalProps> = ({ isOpen, onClose }) => {
  const [stationKey, setStationKey] = useState<string>(STATIONS[0].key);
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useSampleDialog({ open: isOpen, onClose, dialogRef });

  if (!isOpen) return null;

  const current = STATIONS.find((s) => s.key === stationKey) ?? STATIONS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-end lg:items-center justify-center lg:p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-surface-container-lowest border-t-2 lg:border-2 border-primary p-5 lg:p-6 rounded-t-xl lg:rounded-sm shadow-2xl blueprint-grid text-on-surface outline-none"
      >
        <div className="flex items-start justify-between gap-3 border-b border-outline-variant pb-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary shrink-0" />
            <h3
              id={titleId}
              className="font-headline-sm text-headline-sm font-bold text-on-surface uppercase"
            >
              필드 기상 관측 HUD
            </h3>
            <span className="font-label-mono-sm text-label-mono-sm bg-surface-container px-2 py-0.5 rounded text-primary border border-outline-variant">
              예시 데이터 · 실제 관측값이 아닙니다
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="기상 HUD 닫기"
            className="h-11 w-11 shrink-0 flex items-center justify-center text-outline hover:text-on-surface rounded cursor-pointer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {STATIONS.map((s) => (
            <button
              key={s.key}
              onClick={() => setStationKey(s.key)}
              aria-pressed={s.key === stationKey}
              className={`min-h-11 px-3 inline-flex items-center rounded-sm font-label-mono-sm text-label-mono-sm border transition-colors cursor-pointer ${
                s.key === stationKey
                  ? 'bg-primary-container text-on-primary-container font-bold border-primary'
                  : 'bg-surface-container text-outline border-outline-variant hover:text-on-surface'
              }`}
            >
              {s.tab}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-surface-container border border-outline-variant p-4 rounded-sm">
            <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
              <div>
                <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface [word-break:keep-all]">
                  {current.name}
                </h4>
                <div className="font-label-mono-sm text-label-mono-sm text-outline">
                  {current.latLng} | {current.alt}
                </div>
              </div>
              <span className="bg-tertiary-container text-on-tertiary font-label-mono-sm text-label-mono-sm px-2 py-0.5 rounded font-bold">
                {current.advisory}
              </span>
            </div>

            {/* sm 2열 은 모바일/웹 경계가 아니라 좁은 폰에서 값이 눌리지 않게 하는 밀도 조정이다 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <div className="bg-surface-container-high p-2.5 rounded border border-outline-variant">
                <span className="font-label-mono-sm text-label-mono-sm text-outline">대기 기온</span>
                <div className="font-headline-sm text-headline-sm font-bold text-tertiary mt-0.5">
                  {current.temp}
                </div>
                <span className="font-label-mono-sm text-label-mono-sm text-outline">
                  체감 {current.windChill}
                </span>
              </div>
              <div className="bg-surface-container-high p-2.5 rounded border border-outline-variant">
                <span className="font-label-mono-sm text-label-mono-sm text-outline">순간 풍속</span>
                <div className="font-headline-sm text-headline-sm font-bold text-primary mt-0.5">
                  {current.wind}
                </div>
                <span className="font-label-mono-sm text-label-mono-sm text-outline">
                  돌풍 {current.gust}
                </span>
              </div>
              <div className="bg-surface-container-high p-2.5 rounded border border-outline-variant">
                <span className="font-label-mono-sm text-label-mono-sm text-outline">기압 / 밀도</span>
                <div className="font-headline-sm text-headline-sm font-bold text-on-surface mt-0.5">
                  {current.pressure}
                </div>
                <span className="font-label-mono-sm text-label-mono-sm text-outline">고지대 환경</span>
              </div>
              <div className="bg-surface-container-high p-2.5 rounded border border-outline-variant">
                <span className="font-label-mono-sm text-label-mono-sm text-outline">현장 상황</span>
                <div className="font-headline-sm text-headline-sm font-bold text-secondary mt-0.5">
                  {current.fieldNote}
                </div>
                <span className="font-label-mono-sm text-label-mono-sm text-outline">{current.status}</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-high p-3.5 rounded-sm border border-outline-variant flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-start gap-2 font-body-sm text-body-sm text-on-surface [word-break:keep-all]">
              <span className="material-symbols-outlined text-primary shrink-0">engineering</span>
              <span>
                <strong>엔지니어링 참고:</strong> {current.note}
              </span>
            </span>
            <span className="font-label-mono-sm text-label-mono-sm text-primary font-bold">
              MIL-STD-810G 기준 참고 (예시)
            </span>
          </div>
        </div>

        <div className="mt-6 pt-3 border-t border-outline-variant flex justify-end">
          <button
            onClick={onClose}
            className="min-h-11 px-4 inline-flex items-center bg-primary-container text-on-primary-container rounded-sm font-label-mono-sm text-label-mono-sm font-bold hover:bg-surface-container-highest cursor-pointer"
          >
            HUD 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
