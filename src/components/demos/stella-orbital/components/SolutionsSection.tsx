import React from 'react';
import { Radar, Satellite, Sprout, AlertTriangle } from 'lucide-react';

export default function SolutionsSection() {
  return (
    <section id="solutions" className="py-16 lg:py-24 bg-surface border-b border-outline-variant/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container text-primary font-bold text-xs mb-3">
            <Satellite className="w-3.5 h-3.5" />
            MISSION INTELLIGENCE DOMAINS
          </div>
          <h2 className="text-2xl lg:text-4xl font-bold text-on-surface">
            국가 안보와 핵심 산업 인프라를 위한 위성 관측 솔루션
          </h2>
          <p className="text-sm lg:text-base text-on-surface-variant mt-3 leading-relaxed">
            방위 안보, 에너지 인프라, 농업 기후 데이터부터 긴급 재난 대응까지 초고해상도 궤도 데이터를 실시간 의사결정으로 변환합니다.
          </p>
        </div>

        {/* 4 High-Value Industrial Pillars (Clean Clinical Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pillar 1: Defense & Maritime Surveillance */}
          <div className="p-8 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm hover:border-primary transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <Radar className="w-6 h-6" />
              </div>
              <span className="font-code-mono text-primary bg-surface-container-low px-2.5 py-1 rounded text-xs font-semibold">
                DEFENSE &amp; MARITIME
              </span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-3">
              해양 감시 및 국방 안보 안티-스텔스 솔루션
            </h3>
            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
              AIS(선박자동식별장치)를 끄고 불법 조업을 자행하는 다크 베슬(Dark Vessels)을 X-band SAR 레이더로 탐지합니다. 배타적 경제수역(EEZ) 및 군사 경계선의 24시간 항적을 추적하고 자동 선종 식별 리포트를 생성합니다.
            </p>
            <div className="p-4 bg-surface-container-low rounded border border-outline-variant/60 font-code-mono text-xs text-on-surface-variant space-y-1.5">
              <div className="flex justify-between">
                <span>Dark Vessel Detection Rate:</span> <span className="font-bold text-on-surface">99.4%</span>
              </div>
              <div className="flex justify-between">
                <span>Sensor Synergy:</span> <span className="font-bold text-primary">SAR Radar + AIS Correlation</span>
              </div>
            </div>
          </div>

          {/* Pillar 2: Energy, Oil & Critical Infrastructure */}
          <div className="p-8 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm hover:border-secondary transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-secondary">
                <Satellite className="w-6 h-6" />
              </div>
              <span className="font-code-mono text-secondary bg-surface-container-low px-2.5 py-1 rounded text-xs font-semibold">
                CRITICAL INFRASTRUCTURE
              </span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-3">
              에너지 파이프라인 및 주요 인프라 영구변위 감측
            </h3>
            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
              수천 킬로미터에 이르는 대규모 원유 송유관, 가스관 누출을 열적외선 초분광으로 정밀 감지합니다. 댐, 교량, 초고층 구조물 및 원자력 발전소의 미세 지반 변위를 연간 1mm 단위의 영구변위 InSAR 간섭 기법으로 영구 모니터링합니다.
            </p>
            <div className="p-4 bg-surface-container-low rounded border border-outline-variant/60 font-code-mono text-xs text-on-surface-variant space-y-1.5">
              <div className="flex justify-between">
                <span>Structural Displacement Accuracy:</span> <span className="font-bold text-on-surface">±1.0 mm (InSAR)</span>
              </div>
              <div className="flex justify-between">
                <span>Methane Plume Detection:</span> <span className="font-bold text-secondary">50 kg/h Threshold</span>
              </div>
            </div>
          </div>

          {/* Pillar 3: Agriculture & Corporate ESG */}
          <div className="p-8 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm hover:border-tertiary-container transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-tertiary-container">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="font-code-mono text-tertiary-container bg-surface-container-low px-2.5 py-1 rounded text-xs font-semibold">
                AGRICULTURE &amp; ESG
              </span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-3">
              정밀 농업 작황 모니터링 &amp; Scope 3 탄소 배출 실사
            </h3>
            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
              전 지구 곡물 지대의 다중분광 NDVI 식생 지수와 토양 수분도를 주간 단위로 산출하여 작황을 조기 예측합니다. 다국적 기업의 공급망 산림 벌채 현황 및 탄소 상쇄 조림 프로젝트의 진위를 위성 데이터를 통해 수학적으로 검증합니다.
            </p>
            <div className="p-4 bg-surface-container-low rounded border border-outline-variant/60 font-code-mono text-xs text-on-surface-variant space-y-1.5">
              <div className="flex justify-between">
                <span>Vegetation Health Index:</span> <span className="font-bold text-on-surface">16-Band Calibrated NDVI</span>
              </div>
              <div className="flex justify-between">
                <span>Deforestation Verification:</span> <span className="font-bold text-tertiary-container">Bi-weekly Auditing</span>
              </div>
            </div>
          </div>

          {/* Pillar 4: Disaster Response & Humanitarian */}
          <div className="p-8 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm hover:border-primary-container transition-all duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary-container">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <span className="font-code-mono text-primary-container bg-surface-container-low px-2.5 py-1 rounded text-xs font-semibold">
                CRISIS &amp; HUMANITARIAN
              </span>
            </div>
            <h3 className="text-lg font-bold text-on-surface mb-3">
              골든타임 2시간 이내 3D 재난 침수 및 피해 분석 지도
            </h3>
            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
              대형 지진, 태풍 침수, 산불 등 국가 재난 발생 즉시 가용한 최단 궤도 군집 위성을 자동 리타스킹합니다. SAR 레이더로 야간 폭풍우 속에서도 침수 경계선을 신속 추출하여 구조 지휘 본부에 GeoJSON 벡터로 실시간 스트리밍합니다.
            </p>
            <div className="p-4 bg-surface-container-low rounded border border-outline-variant/60 font-code-mono text-xs text-on-surface-variant space-y-1.5">
              <div className="flex justify-between">
                <span>Emergency Tasking Response:</span> <span className="font-bold text-on-surface">&lt; 90 Minutes</span>
              </div>
              <div className="flex justify-between">
                <span>Vector Map Delivery:</span> <span className="font-bold text-primary">STAC &amp; Cloud-Optimized GeoTIFF</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
