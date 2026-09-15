// 차트 공용 팔레트 — 라이트 캔버스(흰 카드) 전용. 5개 차트가 같은 역할에 같은 색을 쓴다.
//
// 검증 (dataviz validate_palette.js, surface #ffffff, --pairs all):
//   관리도  primary·limit·spec·highlight  → ALL PASS (최악 CVD ΔE 9.4 limit↔spec, 정상시각 16.6)
//   산점도  primary·spec·limit             → ALL PASS
//   워터폴  primary·spec·limit             → ALL PASS
//   ✗ good(emerald)↔spec(rose) 는 적록색약 ΔE 5.8 로 실패 — 같은 차트에 나란히 두지 않는다(워터폴 마지막 막대도 primary).
//   ✗ primary(indigo)↔purple 은 가깝다 — 한 차트 안에서 같이 쓰지 않는다.
// 모든 색은 흰 바탕 3:1 이상(선·점 기준). 글자는 시리즈 색이 아니라 ink/label/tick 을 쓴다.

import type { ChartTone } from "./types";

export const CHART = {
  /** 차트 바탕 (카드와 같은 흰색) — 점 테두리 링·겹침 간격에도 쓴다 */
  surface: "#ffffff",
  /** 기준 구간 띠 등 옅은 면 */
  band: "#f8fafc", // slate-50 — slate-100 이면 그 위를 지나는 관리한계선(amber-600)이 2.91:1 로 3:1 미달
  /** 값 라벨·툴팁 제목 */
  ink: "#0f172a", // slate-900
  /** 축 라벨·범례 글자 */
  label: "#334155", // slate-700
  /** 눈금 숫자·보조 글자 (흰 바탕 4.76:1) */
  tick: "#64748b", // slate-500
  /** 그리드 헤어라인 */
  grid: "#e2e8f0", // slate-200
  /** 기준선·축 */
  axis: "#cbd5e1", // slate-300
  /** 평균선 (중립) */
  mean: "#64748b", // slate-500
  /** 결측·비활성 표시 */
  missing: "#64748b", // slate-500 (흰 바탕 4.76:1) — 점·× 표시. 평균선과 같은 색이지만 × 모양으로 구분된다

  /** 기본 시리즈 (점·선·막대) */
  primary: "#4f46e5", // indigo-600
  /** 관리한계선·관리한계 이탈 점·재고 조각 */
  limit: "#d97706", // amber-600
  /** 규격선·규격 초과 점·공정 손실 조각·강조 이상점 */
  spec: "#e11d48", // rose-600
  /** 사용자 입력 롤 강조 링 */
  highlight: "#0891b2", // cyan-600
  /** 좋음 (단독으로만) */
  good: "#059669", // emerald-600

  /** 툴팁 */
  tooltipBg: "#ffffff",
  tooltipBorder: "#e2e8f0",
  tooltipShadow: "0 8px 24px rgba(15, 23, 42, 0.12)",
} as const;

/** BarChart·RunChart tone → hex. 흰 바탕 3:1 이상 */
export const TONE_HEX: Record<ChartTone, string> = {
  indigo: CHART.primary,
  purple: "#9333ea", // purple-600
  emerald: CHART.good,
  amber: CHART.limit,
  rose: CHART.spec,
  cyan: CHART.highlight,
};

/** 차트 글자 크기 — 모바일 최소 10px */
export const CHART_FONT = {
  compact: 10,
  regular: 11,
  value: 12,
} as const;
