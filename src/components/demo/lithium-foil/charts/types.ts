// 차트 컴포넌트 props 계약 — 구현(charts/*.tsx)과 사용처(KpiBoard 등)가 이 파일만 보고 맞춘다.
// 전부 순수 SVG 프레젠테이션 컴포넌트. 데이터 계산은 lib/demo/lithium-foil/metrics.ts 가 한다.

import type { ImrChart, WaterfallStep } from "@/lib/demo/lithium-foil/metrics";

export type ChartTone = "indigo" | "purple" | "emerald" | "amber" | "rose" | "cyan";

export type WaterfallChartProps = {
  steps: WaterfallStep[];
  unit?: string; // 기본 "kg"
  height?: number; // 기본 260
};

export type ControlChartProps = {
  chart: ImrChart;
  unit: string; // "µm" | "ppm"
  /** 규격 상한 — 있으면 점선으로 그린다 */
  specLimit?: number;
  /** 규격 상한 라벨 (기본 "규격") */
  specLabel?: string;
  height?: number; // 기본 240
  /** 점 클릭 시 id 전달 (계보 조회로 이동 등) */
  onPointClick?: (id: string) => void;
  /** 강조할 점 id (사용자 입력 롤 등) */
  highlightIds?: string[];
};

export type BarItem = {
  key: string;
  label: string;
  value: number;
  /** 보조 텍스트 (툴팁·라벨 뒤) */
  hint?: string;
  tone?: ChartTone;
};

export type BarChartProps = {
  items: BarItem[];
  unit?: string;
  /** 축 최대값 고정 (예: 비율이면 1) */
  max?: number;
  /** 값 표기 (기본 소수 1자리) */
  format?: (value: number) => string;
  height?: number; // 기본 200
  /** 가로 막대 (라벨이 길 때) */
  horizontal?: boolean;
};

export type RunPoint = { key: string; label: string; value: number | null; hint?: string };

export type RunChartProps = {
  points: RunPoint[];
  unit?: string;
  /** 목표선 */
  target?: number;
  min?: number;
  max?: number;
  format?: (value: number) => string;
  height?: number; // 기본 200
  tone?: ChartTone;
};

export type ScatterPoint = { key: string; x: number; y: number; label: string; highlight?: boolean };

export type ScatterChartProps = {
  points: ScatterPoint[];
  xLabel: string;
  yLabel: string;
  height?: number; // 기본 240
  /** 세로 기준선 (예: 노점 −45℃) */
  xThreshold?: number;
};
