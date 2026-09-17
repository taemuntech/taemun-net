'use client';

import React, { useState } from 'react';
import { Satellite } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';
import { SensorModeKey } from '../types';

type UrgencyKey = 'standard' | 'rush' | 'routine';

const AOI_PRESETS: ReadonlyArray<{ id: string; coords: string; name: string; codeClass: string; hoverClass: string; activeClass: string }> = [
  {
    id: 'A',
    coords: '36.3504° N, 127.3845° E',
    name: '동아시아 주요 해협/항만',
    codeClass: 'text-primary',
    hoverClass: 'hover:border-primary',
    activeClass: 'border-primary ring-1 ring-primary bg-surface-container',
  },
  {
    id: 'B',
    coords: '30.0444° N, 31.2357° E',
    name: '북아프리카 운하 공급망 수로',
    codeClass: 'text-secondary',
    hoverClass: 'hover:border-secondary',
    activeClass: 'border-secondary ring-1 ring-secondary bg-surface-container',
  },
  {
    id: 'C',
    coords: '37.7749° N, 122.4194° W',
    name: '북미 서부 테크 인프라 허브',
    codeClass: 'text-tertiary-container',
    hoverClass: 'hover:border-tertiary-container',
    activeClass: 'border-tertiary-container ring-1 ring-tertiary-container bg-surface-container',
  },
];

const SENSOR_CHOICES: ReadonlyArray<{ key: SensorModeKey; label: string; summary: string }> = [
  { key: 'optical', label: '0.3m 초고해상도 광학 (Optical Multi-spectral)', summary: '광학 0.3m' },
  { key: 'sar', label: 'X-Band 전천후 합성개구레이더 (SAR Radar)', summary: 'X-Band SAR' },
  { key: 'hyper', label: '150-Band 초분광 및 열적외선 (Hyperspectral)', summary: '초분광·열적외선' },
];

const URGENCY_CHOICES: ReadonlyArray<{ key: UrgencyKey; label: string; summary: string; eta: string; labelClass?: string }> = [
  {
    key: 'standard',
    label: '일반 스케줄링 (24시간 이내 패스 배정)',
    summary: '일반 스케줄링',
    eta: '패스 배정 24시간 이내 · 산출물 익일 전달 (예시)',
  },
  {
    key: 'rush',
    label: 'Rush Emergency (90분 최우선 궤도 기동)',
    summary: 'Rush Emergency',
    eta: '최우선 기동 90분 이내 · 산출물 당일 전달 (예시)',
    labelClass: 'text-error font-semibold',
  },
  {
    key: 'routine',
    label: '정기 순환 감시 (Weekly/Monthly Monitoring)',
    summary: '정기 순환 감시',
    eta: '주간·월간 반복 관측 · 정기 리포트 동봉 (예시)',
  },
];

const FORMAT_CHOICES: ReadonlyArray<{ key: 'cloudGeoTiff' | 'cloudIngest' | 'stacRestApi'; label: string }> = [
  { key: 'cloudGeoTiff', label: 'Cloud-Optimized GeoTIFF' },
  { key: 'cloudIngest', label: 'S3 호환 오브젝트 스토리지 직접 수신' },
  { key: 'stacRestApi', label: 'STAC REST API Key 발급' },
];

export default function TaskingWizard() {
  const [coordinates, setCoordinates] = useState(AOI_PRESETS[0].coords);
  const [radius, setRadius] = useState('10 km x 10 km (Standard Single Swath)');
  const [sensor, setSensor] = useState<SensorModeKey>('optical');
  const [urgency, setUrgency] = useState<UrgencyKey>('standard');
  const [formats, setFormats] = useState({
    cloudGeoTiff: true,
    cloudIngest: true,
    stacRestApi: false
  });
  const [orgName, setOrgName] = useState('');
  const [corpEmail, setCorpEmail] = useState('');
  const [agreedExportTerms, setAgreedExportTerms] = useState(true);

  // 샘플이라 촬영 의뢰를 받지 않는다 — 주문 번호가 찍힌 가짜 접수증 대신 공용 안내(SampleNotice)만 연다.
  // 입력값은 이 컴포넌트 밖으로 한 글자도 나가지 않는다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const activePreset = AOI_PRESETS.find((preset) => preset.coords === coordinates);
  const selectedSensor = SENSOR_CHOICES.find((choice) => choice.key === sensor) ?? SENSOR_CHOICES[0];
  const selectedUrgency = URGENCY_CHOICES.find((choice) => choice.key === urgency) ?? URGENCY_CHOICES[0];
  const selectedFormats = FORMAT_CHOICES.filter((choice) => formats[choice.key]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsNoticeOpen(true);
  };

  return (
    <section id="tasking" className="py-16 lg:py-24 bg-surface border-b border-outline-variant/60">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container text-primary font-bold text-xs mb-3">
            <Satellite className="w-3.5 h-3.5" />
            MISSION ORCHESTRATION ENGINE
          </div>
          <h2 className="text-2xl lg:text-4xl font-bold text-on-surface [word-break:keep-all]">
            위성 촬영 위임(Tasking) &amp; 데이터 수신 API 설정
          </h2>
          <p className="text-sm lg:text-base text-on-surface-variant max-w-xl mx-auto mt-2 leading-relaxed [word-break:keep-all]">
            원하는 지역의 경위도 좌표와 관측 센서를 지정하면 아래 미션 요약이 바로 갱신됩니다. 샘플이라 실제 발주는 이뤄지지 않습니다.
          </p>
        </div>

        {/* 3-Step Wizard Container */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-5 lg:p-10 shadow-sm">
          {/* Step Indicators — 세 단계가 한 화면에 모두 열려 있으므로 한 칸만 「현재」인 척하지 않는다 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pb-8 border-b border-outline-variant/60 text-center font-code-mono text-xs">
            <div className="p-2 border-b-2 border-primary text-primary font-bold">01. TARGET AOI</div>
            <div className="p-2 border-b-2 border-primary text-primary font-bold">02. SENSOR &amp; SLA</div>
            <div className="p-2 border-b-2 border-primary text-primary font-bold">03. DELIVERY INGESTION</div>
          </div>

          <form className="space-y-8 pt-8" onSubmit={handleSubmit}>
            {/* Step 1: Area of Interest (AOI) */}
            <div>
              <span className="block font-bold text-sm text-on-surface mb-2 [word-break:keep-all]">
                Step 1: 관심 구역(AOI) 좌표 또는 사전 설정 프리셋 선택
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                {AOI_PRESETS.map((preset) => {
                  const isActive = activePreset?.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      aria-pressed={isActive}
                      className={`p-3 min-h-11 rounded-lg text-left transition-all cursor-pointer bg-surface-container-low border ${isActive ? preset.activeClass : `border-outline-variant ${preset.hoverClass}`}`}
                      onClick={() => setCoordinates(preset.coords)}
                    >
                      <span className={`block font-bold text-xs font-code-mono ${preset.codeClass}`}>
                        PRESET {preset.id}
                      </span>
                      <span className="text-xs font-semibold text-on-surface [word-break:keep-all]">{preset.name}</span>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-on-surface-variant mb-1" htmlFor="stella-coords">
                    Target Coordinates (Lat, Lon):
                  </label>
                  <input
                    id="stella-coords"
                    className="w-full px-4 py-2.5 min-h-11 bg-surface-container-lowest border border-outline-variant rounded font-code-mono text-xs focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    required
                    type="text"
                    value={coordinates}
                    onChange={(e) => setCoordinates(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-on-surface-variant mb-1" htmlFor="stella-radius">
                    AOI Bounding Box Radius (km):
                  </label>
                  <select
                    id="stella-radius"
                    className="w-full px-4 py-2.5 min-h-11 bg-surface-container-lowest border border-outline-variant rounded text-xs focus:border-primary outline-none"
                    value={radius}
                    onChange={(e) => setRadius(e.target.value)}
                  >
                    <option value="10 km x 10 km (Standard Single Swath)">10 km x 10 km (Standard Single Swath)</option>
                    <option value="25 km x 25 km (Multi-strip Mosaic)">25 km x 25 km (Multi-strip Mosaic)</option>
                    <option value="50 km x 50 km (Regional Corridor)">50 km x 50 km (Regional Corridor)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Sensor Payload & Priority SLA */}
            <div>
              <span className="block font-bold text-sm text-on-surface mb-2 [word-break:keep-all]">
                Step 2: 관측 탑재체(Sensor) 및 미션 우선권(Priority)
              </span>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <fieldset className="p-4 border border-outline-variant rounded-lg space-y-1 bg-surface-container-low/40">
                  <legend className="px-1 font-semibold text-xs text-on-surface">센서 페이로드 선택</legend>
                  {SENSOR_CHOICES.map((choice) => (
                    <label
                      key={choice.key}
                      className="flex items-center gap-2.5 min-h-11 text-xs cursor-pointer [word-break:keep-all]"
                    >
                      <input
                        checked={sensor === choice.key}
                        className="text-primary focus:ring-primary shrink-0"
                        name="sensor_choice"
                        type="radio"
                        onChange={() => setSensor(choice.key)}
                      />
                      <span>{choice.label}</span>
                    </label>
                  ))}
                </fieldset>

                <fieldset className="p-4 border border-outline-variant rounded-lg space-y-1 bg-surface-container-low/40">
                  <legend className="px-1 font-semibold text-xs text-on-surface">타스킹 긴급도 (SLA)</legend>
                  {URGENCY_CHOICES.map((choice) => (
                    <label
                      key={choice.key}
                      className="flex items-center gap-2.5 min-h-11 text-xs cursor-pointer [word-break:keep-all]"
                    >
                      <input
                        checked={urgency === choice.key}
                        className="text-primary focus:ring-primary shrink-0"
                        name="urgency_choice"
                        type="radio"
                        onChange={() => setUrgency(choice.key)}
                      />
                      <span className={choice.labelClass}>{choice.label}</span>
                    </label>
                  ))}
                </fieldset>
              </div>
            </div>

            {/* Step 3: Delivery Format & Ingestion */}
            <div>
              <span className="block font-bold text-sm text-on-surface mb-2 [word-break:keep-all]">
                Step 3: 데이터 수신 포맷 및 클라우드 연동
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {FORMAT_CHOICES.map((choice) => (
                  <label
                    key={choice.key}
                    className="p-3 min-h-11 border border-outline-variant rounded-lg flex items-center gap-2 cursor-pointer hover:border-primary bg-surface-container-low/40"
                  >
                    <input
                      checked={formats[choice.key]}
                      className="rounded text-primary focus:ring-primary shrink-0"
                      type="checkbox"
                      onChange={(e) => setFormats({ ...formats, [choice.key]: e.target.checked })}
                    />
                    <span className="text-xs">{choice.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 고른 값이 그대로 비치는 미션 요약 — 라디오·체크박스가 화면을 실제로 바꾼다 */}
            <div
              aria-live="polite"
              className="p-4 rounded-lg border border-outline-variant bg-surface-container-low font-code-mono text-xs text-on-surface-variant space-y-1.5"
            >
              <div className="font-bold text-primary">MISSION SUMMARY (예시 견적 · 접수되지 않음)</div>
              <div className="flex flex-wrap justify-between gap-x-3 gap-y-0.5">
                <span>AOI:</span>
                <span className="font-bold text-on-surface break-words">
                  {coordinates}
                  {activePreset ? ` · PRESET ${activePreset.id}` : ''}
                </span>
              </div>
              <div className="flex flex-wrap justify-between gap-x-3 gap-y-0.5">
                <span>BBOX:</span>
                <span className="font-bold text-on-surface break-words">{radius}</span>
              </div>
              <div className="flex flex-wrap justify-between gap-x-3 gap-y-0.5">
                <span>SENSOR:</span>
                <span className="font-bold text-secondary break-words">{selectedSensor.summary}</span>
              </div>
              <div className="flex flex-wrap justify-between gap-x-3 gap-y-0.5">
                <span>SLA:</span>
                <span className="font-bold text-on-surface break-words">{selectedUrgency.summary}</span>
              </div>
              <div className="flex flex-wrap justify-between gap-x-3 gap-y-0.5">
                <span>ETA:</span>
                <span className="font-bold text-tertiary-container break-words">{selectedUrgency.eta}</span>
              </div>
              <div className="flex flex-wrap justify-between gap-x-3 gap-y-0.5">
                <span>DELIVERY:</span>
                <span className="font-bold text-on-surface break-words">
                  {selectedFormats.length > 0
                    ? selectedFormats.map((choice) => choice.label).join(' · ')
                    : '선택된 수신 포맷 없음'}
                </span>
              </div>
            </div>

            {/* Corporate Lead Identity */}
            <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant space-y-4">
              <span className="block font-semibold text-xs text-on-surface [word-break:keep-all]">
                신청 기관 및 엔터프라이즈 보안 담당자 정보:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className="px-4 py-2 min-h-11 bg-surface-container-lowest border border-outline-variant rounded text-xs outline-none focus:border-primary"
                  placeholder="기관/기업명 (Organization Name)"
                  aria-label="기관/기업명"
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
                <input
                  className="px-4 py-2 min-h-11 bg-surface-container-lowest border border-outline-variant rounded text-xs outline-none focus:border-primary"
                  placeholder="공식 업무용 이메일 (Corporate Email)"
                  aria-label="공식 업무용 이메일"
                  type="email"
                  value={corpEmail}
                  onChange={(e) => setCorpEmail(e.target.value)}
                />
              </div>
              <label className="flex items-center gap-2 min-h-11 text-xs text-on-surface-variant cursor-pointer [word-break:keep-all]">
                <input
                  checked={agreedExportTerms}
                  className="rounded text-primary focus:ring-primary shrink-0"
                  required
                  type="checkbox"
                  onChange={(e) => setAgreedExportTerms(e.target.checked)}
                />
                <span>수출 통제 규정(예시) 및 상업용 지구관측 위성 라이선스 약관에 동의합니다.</span>
              </label>
            </div>

            <div className="pt-2 space-y-3">
              <p className="rounded-lg border border-outline-variant bg-surface-container-low px-4 py-2.5 text-center text-xs font-semibold leading-relaxed text-on-surface [word-break:keep-all]">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
              </p>
              <button
                className="w-full py-4 min-h-11 bg-primary text-on-primary font-bold text-sm rounded-lg hover:bg-primary-container transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer [word-break:keep-all]"
                type="submit"
              >
                <Satellite className="w-4 h-4 shrink-0" />
                위성 촬영 타스킹 예약 및 견적 확인 (Task Satellite Now)
              </button>
            </div>
          </form>
        </div>
      </div>

      <SampleNotice
        open={isNoticeOpen}
        onClose={() => setIsNoticeOpen(false)}
        slug="stella-orbital"
        industry="corporate"
        featureName="위성 촬영 위임(Tasking) 의뢰 폼"
      />
    </section>
  );
}
