import React from 'react';
import { Radar, Satellite, Sprout, AlertTriangle, type LucideIcon } from 'lucide-react';

type Pillar = {
  id: string;
  icon: LucideIcon;
  tag: string;
  title: string;
  body: string;
  /** 실적처럼 읽히는 값이라 구역 머리와 각 상자에 「예시 수치」를 적는다 */
  metrics: ReadonlyArray<{ label: string; value: string; tone: string }>;
  iconClass: string;
  tagClass: string;
  hoverClass: string;
};

const PILLARS: ReadonlyArray<Pillar> = [
  {
    id: 'defense',
    icon: Radar,
    tag: 'DEFENSE & MARITIME',
    title: '해양 감시 및 국방 안보 안티-스텔스 솔루션',
    body: 'AIS(선박자동식별장치)를 끄고 불법 조업을 자행하는 다크 베슬(Dark Vessels)을 X-band SAR 레이더로 탐지합니다. 배타적 경제수역(EEZ) 및 군사 경계선의 항적을 추적하고 자동 선종 식별 리포트를 생성합니다.',
    metrics: [
      { label: 'Dark Vessel Detection Rate', value: '99.4%', tone: 'text-on-surface' },
      { label: 'Sensor Synergy', value: 'SAR Radar + AIS Correlation', tone: 'text-primary' },
    ],
    iconClass: 'bg-surface-container text-primary',
    tagClass: 'text-primary',
    hoverClass: 'hover:border-primary',
  },
  {
    id: 'infra',
    icon: Satellite,
    tag: 'CRITICAL INFRASTRUCTURE',
    title: '에너지 파이프라인 및 주요 인프라 영구변위 감측',
    body: '수천 킬로미터에 이르는 대규모 원유 송유관, 가스관 누출을 열적외선 초분광으로 감지합니다. 댐, 교량, 초고층 구조물 및 발전 설비의 미세 지반 변위를 InSAR 간섭 기법으로 장기 모니터링합니다.',
    metrics: [
      { label: 'Structural Displacement Accuracy', value: '±1.0 mm (InSAR)', tone: 'text-on-surface' },
      { label: 'Methane Plume Detection', value: '50 kg/h Threshold', tone: 'text-secondary' },
    ],
    iconClass: 'bg-surface-container-low text-secondary',
    tagClass: 'text-secondary',
    hoverClass: 'hover:border-secondary',
  },
  {
    id: 'agri',
    icon: Sprout,
    tag: 'AGRICULTURE & ESG',
    title: '정밀 농업 작황 모니터링 & Scope 3 탄소 배출 실사',
    body: '전 지구 곡물 지대의 다중분광 NDVI 식생 지수와 토양 수분도를 주간 단위로 산출하여 작황을 조기 예측합니다. 다국적 기업의 공급망 산림 벌채 현황과 탄소 상쇄 조림 프로젝트의 진행 상태를 위성 데이터로 교차 검증합니다.',
    metrics: [
      { label: 'Vegetation Health Index', value: '16-Band Calibrated NDVI', tone: 'text-on-surface' },
      { label: 'Deforestation Verification', value: 'Bi-weekly Auditing', tone: 'text-tertiary-container' },
    ],
    iconClass: 'bg-surface-container-low text-tertiary-container',
    tagClass: 'text-tertiary-container',
    hoverClass: 'hover:border-tertiary-container',
  },
  {
    id: 'crisis',
    icon: AlertTriangle,
    tag: 'CRISIS & HUMANITARIAN',
    title: '재난 발생 직후 침수·피해 범위 분석 지도',
    body: '대형 지진, 태풍 침수, 산불 등 재난 발생 시 가용한 최단 궤도 군집 위성을 자동 리타스킹합니다. SAR 레이더로 야간 폭풍우 속에서도 침수 경계선을 추출하여 구조 지휘 본부에 GeoJSON 벡터로 전달합니다.',
    metrics: [
      { label: 'Emergency Tasking Response', value: '< 90 Minutes', tone: 'text-on-surface' },
      { label: 'Vector Map Delivery', value: 'STAC & Cloud-Optimized GeoTIFF', tone: 'text-primary' },
    ],
    iconClass: 'bg-surface-container-low text-primary-container',
    tagClass: 'text-primary-container',
    hoverClass: 'hover:border-primary-container',
  },
];

export default function SolutionsSection() {
  return (
    <section id="solutions" className="py-16 lg:py-24 bg-surface border-b border-outline-variant/60">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-surface-container text-primary font-bold text-xs mb-3">
            <Satellite className="w-3.5 h-3.5" />
            MISSION INTELLIGENCE DOMAINS
          </div>
          <h2 className="text-2xl lg:text-4xl font-bold text-on-surface [word-break:keep-all]">
            국가 안보와 핵심 산업 인프라를 위한 위성 관측 솔루션
          </h2>
          <p className="text-sm lg:text-base text-on-surface-variant mt-3 leading-relaxed [word-break:keep-all]">
            방위 안보, 에너지 인프라, 농업 기후 데이터부터 긴급 재난 대응까지 초고해상도 궤도 데이터를 의사결정 자료로 변환합니다.
          </p>
          <p className="mt-3 inline-flex items-center rounded bg-surface-container px-2.5 py-1 font-code-mono text-[11px] font-bold text-primary">
            아래 지표는 모두 예시 수치
          </p>
        </div>

        {/* 4 High-Value Industrial Pillars (Clean Clinical Cards) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className={`p-6 lg:p-8 bg-surface-container-lowest rounded-xl border border-outline-variant shadow-sm transition-all duration-200 ${pillar.hoverClass}`}
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${pillar.iconClass}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span
                    className={`font-code-mono bg-surface-container-low px-2.5 py-1 rounded text-[11px] lg:text-xs font-semibold text-right ${pillar.tagClass}`}
                  >
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-on-surface mb-3 [word-break:keep-all]">{pillar.title}</h3>
                <p className="text-sm text-on-surface-variant mb-6 leading-relaxed [word-break:keep-all]">{pillar.body}</p>
                <div className="p-4 bg-surface-container-low rounded border border-outline-variant/60 font-code-mono text-xs text-on-surface-variant space-y-1.5">
                  <div className="text-[10px] font-bold text-on-surface-variant/80">예시 수치</div>
                  {pillar.metrics.map((metric) => (
                    // 좁은 폭에서 라벨과 값이 서로 파고들어 줄이 엉켰다 — 넘치면 줄을 바꾼다
                    <div key={metric.label} className="flex flex-wrap justify-between gap-x-3 gap-y-0.5">
                      <span>{metric.label}:</span>
                      <span className={`font-bold ${metric.tone}`}>{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
