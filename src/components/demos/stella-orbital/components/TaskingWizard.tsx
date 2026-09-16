import React, { useState } from 'react';
import { Satellite } from 'lucide-react';
import SampleNotice from '@/components/demo-kit/SampleNotice';

export default function TaskingWizard() {
  const [coordinates, setCoordinates] = useState('36.3504° N, 127.3845° E');
  const [radius, setRadius] = useState('10 km x 10 km (Standard Single Swath)');
  const [sensor, setSensor] = useState('optical');
  const [urgency, setUrgency] = useState('standard');
  const [formats, setFormats] = useState({
    cloudGeoTiff: true,
    cloudIngest: true,
    stacRestApi: false
  });
  const [orgName, setOrgName] = useState('');
  const [corpEmail, setCorpEmail] = useState('');
  const [agreedITAR, setAgreedITAR] = useState(true);

  // 샘플이라 촬영 의뢰를 받지 않는다 — 주문 번호가 찍힌 가짜 접수증 대신 공용 안내(SampleNotice)만 연다.
  // 입력값은 이 컴포넌트 밖으로 한 글자도 나가지 않는다.
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);

  const handlePreset = (coords: string) => {
    setCoordinates(coords);
  };

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
          <h2 className="text-2xl lg:text-4xl font-bold text-on-surface">
            위성 촬영 위임(Tasking) &amp; 데이터 수신 API 설정
          </h2>
          <p className="text-sm lg:text-base text-on-surface-variant max-w-xl mx-auto mt-2 leading-relaxed">
            원하는 지역의 경위도 좌표와 관측 센서를 지정하면, 최적의 궤도 위성이 90분 내에 할당되어 다이렉트 클라우드로 전송됩니다.
          </p>
        </div>

        {/* 3-Step Wizard Container */}
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 lg:p-10 shadow-sm">
          {/* Step Indicators */}
          <div className="grid grid-cols-3 gap-2 pb-8 border-b border-outline-variant/60 text-center font-code-mono text-xs">
            <div className="p-2 border-b-2 border-primary text-primary font-bold">01. TARGET AOI</div>
            <div className="p-2 border-b-2 border-primary/50 text-on-surface font-semibold">02. SENSOR &amp; SLA</div>
            <div className="p-2 border-b-2 border-primary/50 text-on-surface font-semibold">03. DELIVERY INGESTION</div>
          </div>

          <form className="space-y-8 pt-8" onSubmit={handleSubmit}>
            {/* Step 1: Area of Interest (AOI) */}
            <div>
              <label className="block font-bold text-sm text-on-surface mb-2">
                Step 1: 관심 구역(AOI) 좌표 또는 사전 설정 프리셋 선택
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 mb-4">
                <button
                  type="button"
                  className="p-3 border border-outline-variant rounded-lg text-left hover:border-primary focus:border-primary transition-all bg-surface-container-low cursor-pointer"
                  onClick={() => handlePreset('36.3504° N, 127.3845° E')}
                >
                  <span className="block font-bold text-xs text-primary font-code-mono">PRESET A</span>
                  <span className="text-xs font-semibold text-on-surface">동아시아 주요 해협/항만</span>
                </button>
                <button
                  type="button"
                  className="p-3 border border-outline-variant rounded-lg text-left hover:border-secondary focus:border-secondary transition-all bg-surface-container-low cursor-pointer"
                  onClick={() => handlePreset('30.0444° N, 31.2357° E')}
                >
                  <span className="block font-bold text-xs text-secondary font-code-mono">PRESET B</span>
                  <span className="text-xs font-semibold text-on-surface">수에즈 운하 공급망 수로</span>
                </button>
                <button
                  type="button"
                  className="p-3 border border-outline-variant rounded-lg text-left hover:border-tertiary-container focus:border-tertiary-container transition-all bg-surface-container-low cursor-pointer"
                  onClick={() => handlePreset('37.7749° N, 122.4194° W')}
                >
                  <span className="block font-bold text-xs text-tertiary-container font-code-mono">PRESET C</span>
                  <span className="text-xs font-semibold text-on-surface">북미 테크 인프라 허브</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs text-on-surface-variant mb-1">Target Coordinates (Lat, Lon):</span>
                  <input
                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded font-code-mono text-xs focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    required
                    type="text"
                    value={coordinates}
                    onChange={(e) => setCoordinates(e.target.value)}
                  />
                </div>
                <div>
                  <span className="block text-xs text-on-surface-variant mb-1">AOI Bounding Box Radius (km):</span>
                  <select
                    className="w-full px-4 py-2.5 bg-surface-container-lowest border border-outline-variant rounded text-xs focus:border-primary outline-none"
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
              <label className="block font-bold text-sm text-on-surface mb-2">
                Step 2: 관측 탑재체(Sensor) 및 미션 우선권(Priority)
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="p-4 border border-outline-variant rounded-lg space-y-2.5 bg-surface-container-low/40">
                  <span className="block font-semibold text-xs text-on-surface">센서 페이로드 선택:</span>
                  <label className="flex items-center gap-2.5 text-xs cursor-pointer">
                    <input
                      checked={sensor === 'optical'}
                      className="text-primary focus:ring-primary"
                      name="sensor_choice"
                      type="radio"
                      onChange={() => setSensor('optical')}
                    />
                    <span>0.3m 초고해상도 광학 (Optical Multi-spectral)</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-xs cursor-pointer">
                    <input
                      checked={sensor === 'sar'}
                      className="text-primary focus:ring-primary"
                      name="sensor_choice"
                      type="radio"
                      onChange={() => setSensor('sar')}
                    />
                    <span>X-Band 전천후 합성개구레이더 (SAR Radar)</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-xs cursor-pointer">
                    <input
                      checked={sensor === 'hyper'}
                      className="text-primary focus:ring-primary"
                      name="sensor_choice"
                      type="radio"
                      onChange={() => setSensor('hyper')}
                    />
                    <span>150-Band 초분광 및 열적외선 (Hyperspectral)</span>
                  </label>
                </div>

                <div className="p-4 border border-outline-variant rounded-lg space-y-2.5 bg-surface-container-low/40">
                  <span className="block font-semibold text-xs text-on-surface">타스킹 긴급도 (SLA):</span>
                  <label className="flex items-center gap-2.5 text-xs cursor-pointer">
                    <input
                      checked={urgency === 'standard'}
                      className="text-primary focus:ring-primary"
                      name="urgency_choice"
                      type="radio"
                      onChange={() => setUrgency('standard')}
                    />
                    <span>일반 스케줄링 (24시간 이내 패스 배정)</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-xs cursor-pointer">
                    <input
                      checked={urgency === 'rush'}
                      className="text-primary focus:ring-primary"
                      name="urgency_choice"
                      type="radio"
                      onChange={() => setUrgency('rush')}
                    />
                    <span className="text-error font-semibold">Rush Emergency (90분 최우선 궤도 기동)</span>
                  </label>
                  <label className="flex items-center gap-2.5 text-xs cursor-pointer">
                    <input
                      checked={urgency === 'routine'}
                      className="text-primary focus:ring-primary"
                      name="urgency_choice"
                      type="radio"
                      onChange={() => setUrgency('routine')}
                    />
                    <span>정기 순환 감시 (Weekly/Monthly Monitoring)</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Step 3: Delivery Format & Ingestion */}
            <div>
              <label className="block font-bold text-sm text-on-surface mb-2">
                Step 3: 데이터 수신 포맷 및 클라우드 연동
              </label>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                <label className="p-3 border border-outline-variant rounded-lg flex items-center gap-2 cursor-pointer hover:border-primary bg-surface-container-low/40">
                  <input
                    checked={formats.cloudGeoTiff}
                    className="rounded text-primary focus:ring-primary"
                    type="checkbox"
                    onChange={(e) => setFormats({ ...formats, cloudGeoTiff: e.target.checked })}
                  />
                  <span className="text-xs">Cloud-Optimized GeoTIFF</span>
                </label>
                <label className="p-3 border border-outline-variant rounded-lg flex items-center gap-2 cursor-pointer hover:border-primary bg-surface-container-low/40">
                  <input
                    checked={formats.cloudIngest}
                    className="rounded text-primary focus:ring-primary"
                    type="checkbox"
                    onChange={(e) => setFormats({ ...formats, cloudIngest: e.target.checked })}
                  />
                  <span className="text-xs">AWS S3 / GCP Direct Ingest</span>
                </label>
                <label className="p-3 border border-outline-variant rounded-lg flex items-center gap-2 cursor-pointer hover:border-primary bg-surface-container-low/40">
                  <input
                    checked={formats.stacRestApi}
                    className="rounded text-primary focus:ring-primary"
                    type="checkbox"
                    onChange={(e) => setFormats({ ...formats, stacRestApi: e.target.checked })}
                  />
                  <span className="text-xs">STAC REST API Key 발급</span>
                </label>
              </div>
            </div>

            {/* Corporate Lead Identity */}
            <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant space-y-4">
              <span className="block font-semibold text-xs text-on-surface">
                신청 기관 및 엔터프라이즈 보안 담당자 정보:
              </span>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <input
                  className="px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded text-xs outline-none focus:border-primary"
                  placeholder="기관/기업명 (Organization Name)"
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
                <input
                  className="px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded text-xs outline-none focus:border-primary"
                  placeholder="공식 업무용 이메일 (Corporate Email)"
                  type="email"
                  value={corpEmail}
                  onChange={(e) => setCorpEmail(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <input
                  checked={agreedITAR}
                  className="rounded text-primary focus:ring-primary"
                  required
                  type="checkbox"
                  onChange={(e) => setAgreedITAR(e.target.checked)}
                />
                <span>수출 통제 규정(예시) 및 상업용 지구관측 위성 라이선스 약관에 동의합니다.</span>
              </div>
            </div>

            <div className="pt-2 space-y-3">
              <p className="rounded-lg border border-outline-variant bg-surface-container-low px-4 py-2.5 text-center text-xs font-semibold leading-relaxed text-on-surface">
                샘플 사이트입니다 — 입력하신 내용은 어디에도 전송되지 않습니다.
              </p>
              <button
                className="w-full py-4 bg-primary text-on-primary font-bold text-sm rounded-lg hover:bg-primary-container transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                type="submit"
              >
                <Satellite className="w-4 h-4" />
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
