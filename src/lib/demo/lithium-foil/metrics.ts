// 파생 지표 — 수율 워터폴·무파단율·개별값 관리도·원소 관리도·납기·결측률·로트 계보·개선 제안
// 전부 순수 함수. 통계는 데이터 양에 맞는 것만 쓴다(관리도·파레토·교차표). 회귀·DOE 는 제안 문구에서만 언급.
// 문구 규칙: 제목·결론은 데이터 비교 결과로 고른다(고정 문장 금지). 표본이 적으면 적다고 쓴다.

import { addDays, diffDays } from "./seed";
import {
  LI_DENSITY_G_CM3,
  SPEC_LIMIT_PPM,
  type Dataset,
  type IcpElement,
  type Ingot,
  type MaterialLot,
  type NonConformance,
  type RefineBatch,
  type Roll,
  type Shipment,
} from "./types";

export function arealToThicknessUm(gm2: number): number {
  return gm2 / LI_DENSITY_G_CM3; // 5.34 g/m² → 10 µm
}

export function liMassKg(roll: Roll): number {
  return Math.max(0, roll.grossG - roll.tareG) / 1000;
}

function mean(values: number[]): number {
  return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
}

function sampleSd(values: number[]): number {
  if (values.length < 2) return 0;
  const m = mean(values);
  return Math.sqrt(values.reduce((acc, v) => acc + (v - m) ** 2, 0) / (values.length - 1));
}

export function round(v: number, digits = 1): number {
  const f = 10 ** digits;
  return Math.round(v * f) / f;
}

/** "2026-08-09" → "08/09" (ui.tsx fmtShortDate 와 같은 표기 — lib 은 UI 를 import 하지 않는다) */
function shortDate(date: string): string {
  return date.slice(5, 10).replace("-", "/");
}

function pct(ratio: number): string {
  return `${round(ratio * 100, 0)}%`;
}

/** 화면 표기용 레시피 이름 — "RCP-B" → "레시피 B" */
export function recipeLabel(recipeId: string): string {
  return recipeId.replace(/^RCP-/, "레시피 ");
}

export function motherRolls(ds: Dataset): Roll[] {
  return ds.rolls.filter((r) => r.stage === "mother");
}

/** 롤의 두께 3점(µm) — 면밀도가 없으면 null */
export function rollThicknessUm(roll: Roll): [number, number, number] | null {
  if (!roll.arealDensityGm2) return null;
  const [l, c, r] = roll.arealDensityGm2;
  return [arealToThicknessUm(l), arealToThicknessUm(c), arealToThicknessUm(r)];
}

export function rollThicknessSdUm(roll: Roll): number | null {
  const t = rollThicknessUm(roll);
  return t ? sampleSd(t) : null;
}

/** 잉곳별 남은 리튬(kg) = 잉곳 질량 − 그 잉곳에서 압연에 투입한 리튬 합 */
export function ingotRemainingKg(ds: Dataset): Map<string, number> {
  const used = new Map<string, number>();
  for (const r of ds.rolls) {
    if (r.stage !== "mother") continue;
    used.set(r.ingotId, (used.get(r.ingotId) ?? 0) + r.billetG / 1000);
  }
  return new Map(ds.ingots.map((i) => [i.id, round(i.massKg - (used.get(i.id) ?? 0), 3)]));
}

// ---- 1. 수율 워터폴 ----

export type WaterfallStep = {
  key: string;
  label: string;
  valueKg: number;
  /** 이전 단계 대비 줄어든 kg (첫 단계는 0) */
  deltaKg: number;
  /** loss = 공정 손실, inventory = 잃은 게 아니라 재고로 남은 것 */
  deltaKind: "loss" | "inventory" | null;
  note: string;
};

/** 리튬 질량 기준 수율 워터폴. 필름 합권 롤은 롤 중량 − 심·필름 tare 로 리튬만 센다 */
export function yieldWaterfall(ds: Dataset): WaterfallStep[] {
  const inputKg = ds.batches.reduce((a, b) => a + b.inputKg, 0);
  const refinedKg = ds.batches.reduce((a, b) => a + b.outputKg, 0);
  const ingotKg = ds.ingots.reduce((a, i) => a + i.massKg, 0);
  const mothers = ds.rolls.filter((r) => r.stage === "mother");
  const slits = ds.rolls.filter((r) => r.stage === "slit");
  const billetKg = mothers.reduce((a, r) => a + r.billetG, 0) / 1000;
  const motherKg = mothers.reduce((a, r) => a + liMassKg(r), 0);
  // 슬리팅은 슬릿 롤이 나온 모 롤끼리만 비교한다 — 아직 안 자른 모 롤은 손실이 아니라 공정 중 재고
  const slitParentIds = new Set(slits.map((r) => r.parentRollId).filter((id): id is string => Boolean(id)));
  const unslitMothers = mothers.filter((r) => !slitParentIds.has(r.id));
  const slitInputKg = mothers.filter((r) => slitParentIds.has(r.id)).reduce((a, r) => a + liMassKg(r), 0);
  const slitKg = slits.reduce((a, r) => a + liMassKg(r), 0);
  const shippedIds = new Set(ds.shipments.filter((s) => s.shippedAt).flatMap((s) => s.rollIds));
  const shippedKg = ds.rolls.filter((r) => shippedIds.has(r.id)).reduce((a, r) => a + liMassKg(r), 0);

  const steps: Array<Omit<WaterfallStep, "deltaKg">> = [
    { key: "input", label: "원료 투입", valueKg: inputKg, deltaKind: null, note: "정제 배치 투입 질량 합 (스크랩 회수분 포함)" },
    { key: "refined", label: "정제 출력", valueKg: refinedKg, deltaKind: "loss", note: "정제 손실 — 슬래그·도가니 부착" },
    { key: "ingot", label: "잉곳", valueKg: ingotKg, deltaKind: "loss", note: "주조 드로스 제거" },
    { key: "billet", label: "압연 투입", valueKg: billetKg, deltaKind: "inventory", note: "잉곳 잔량 — 손실이 아니라 재고" },
    { key: "mother", label: "모 롤", valueKg: motherKg, deltaKind: "loss", note: "파단 손실·에지 트림·헤드/테일" },
  ];
  if (unslitMothers.length > 0) {
    steps.push({
      key: "slitInput",
      label: "슬리팅 투입",
      valueKg: slitInputKg,
      deltaKind: "inventory",
      note: `아직 슬릿하지 않은 모 롤 ${unslitMothers.length}개 — 공정 중 재고, 손실 아님`,
    });
  }
  steps.push(
    { key: "slit", label: "슬릿 롤", valueKg: slitKg, deltaKind: "loss", note: "슬리팅 트림" },
    { key: "shipped", label: "출하", valueKg: shippedKg, deltaKind: "inventory", note: "출하 보류(홀드)·출하 대기 — 재고" },
  );
  return steps.map((s, i) => {
    const deltaKg = i === 0 ? 0 : round(steps[i - 1].valueKg - s.valueKg, 2);
    const mismatch = s.deltaKind === "inventory" && deltaKg < 0;
    return {
      ...s,
      valueKg: round(s.valueKg, 2),
      deltaKg,
      note: mismatch ? `${s.note} · 앞 단계보다 많음 — 기록 수지 불일치 확인` : s.note,
    };
  });
}

// ---- 2. 무파단율(파단) ----

export type CompletionStat = {
  key: string;
  label: string;
  rolls: number;
  /** 파단 0회 롤 비율 (0~1) */
  tearFreeRate: number;
  avgTearCount: number;
  avgLostM: number;
};

function completionStat(key: string, label: string, rolls: Roll[]): CompletionStat {
  return {
    key,
    label,
    rolls: rolls.length,
    tearFreeRate: rolls.length ? rolls.filter((r) => r.tearCount === 0).length / rolls.length : 0,
    avgTearCount: round(mean(rolls.map((r) => r.tearCount)), 2),
    avgLostM: round(mean(rolls.map((r) => r.lostLengthM)), 1),
  };
}

export function completionByRecipe(ds: Dataset): CompletionStat[] {
  const rolls = motherRolls(ds);
  return ds.recipes
    .filter((rc) => rc.kind === "rolling")
    .map((rc) => completionStat(rc.id, rc.name, rolls.filter((r) => r.recipeId === rc.id)))
    .filter((s) => s.rolls > 0);
}

export const FILM_REUSE_BUCKETS: Array<{ key: string; label: string; min: number; max: number }> = [
  { key: "1-2", label: "1~2회", min: 1, max: 2 },
  { key: "3-4", label: "3~4회", min: 3, max: 4 },
  { key: "5+", label: "5회 이상", min: 5, max: Infinity },
];

export function completionByFilmReuse(ds: Dataset): CompletionStat[] {
  const rolls = motherRolls(ds).filter((r) => r.filmReuseCount !== null);
  return FILM_REUSE_BUCKETS.map((b) =>
    completionStat(
      b.key,
      `필름 재사용 ${b.label}`,
      rolls.filter((r) => r.filmReuseCount! >= b.min && r.filmReuseCount! <= b.max),
    ),
  );
}

// ---- 3·4. 개별값(I-MR) 관리도 ----

export type ImrPoint = {
  id: string;
  index: number;
  date: string;
  value: number;
  movingRange: number | null;
  outOfControl: boolean;
  overSpec: boolean;
  label: string;
};

export type ImrChart = {
  points: ImrPoint[];
  mean: number;
  ucl: number;
  lcl: number;
  mrBar: number;
  /** 전체 표본 수 */
  n: number;
  /** 관리한계를 계산한 기준 구간 표본 수 (앞에서부터) */
  baselineN: number;
  /** 기준 구간 표본이 모자라면 false — 관리한계를 그리지 않고, 이탈 판정도 하지 않는다 */
  limitsValid: boolean;
  /** 기준 구간 설명 (예: "새 도가니 1~5회째 잉곳 5개") */
  baselineLabel: string;
  /** 차트에서 뺀 표본 수 (검출한계 미만·미측정) */
  excludedCount: number;
};

/**
 * 개별값 I-MR 관리도. 관리한계 = 기준 구간 평균 ± 2.66 × 기준 구간 이동범위 평균.
 * 이상점을 포함해 한계를 계산하면 한계가 넓어져 이상을 못 잡으므로, 정상 운전 구간을 기준으로 삼는다.
 * 기준 구간 표본이 minBaseline 보다 적으면 한계를 믿을 수 없어 limitsValid=false 로 둔다.
 */
export function imrChart(
  series: Array<{ id: string; date: string; value: number; label: string; overSpec?: boolean }>,
  baselineCount?: number,
  options: { minBaseline?: number; baselineLabel?: string; excludedCount?: number } = {},
): ImrChart {
  const minBaseline = options.minBaseline ?? 2;
  const values = series.map((s) => s.value);
  const baseN = Math.max(0, Math.min(values.length, baselineCount ?? values.length));
  const limitsValid = baseN >= Math.max(2, minBaseline);
  const base = values.slice(0, baseN);
  const m = limitsValid ? mean(base) : mean(values);
  const mrs: number[] = [];
  for (let i = 1; i < values.length; i += 1) mrs.push(Math.abs(values[i] - values[i - 1]));
  const mrBar = limitsValid ? mean(mrs.slice(0, baseN - 1)) : 0;
  const ucl = limitsValid ? m + 2.66 * mrBar : m;
  const lcl = limitsValid ? Math.max(0, m - 2.66 * mrBar) : m;
  const points: ImrPoint[] = series.map((s, i) => ({
    id: s.id,
    index: i,
    date: s.date,
    value: round(s.value, 3),
    movingRange: i === 0 ? null : round(mrs[i - 1], 3),
    outOfControl: limitsValid && (s.value > ucl || s.value < lcl),
    overSpec: Boolean(s.overSpec),
    label: s.label,
  }));
  return {
    points,
    mean: round(m, 3),
    ucl: round(ucl, 3),
    lcl: round(lcl, 3),
    mrBar: round(mrBar, 3),
    n: values.length,
    baselineN: baseN,
    limitsValid,
    baselineLabel: options.baselineLabel ?? `앞 ${baseN}개`,
    excludedCount: options.excludedCount ?? 0,
  };
}

const THICKNESS_BASELINE_ROLLS = 20;

/** 모 롤별 두께 3점 표준편차(µm) 관리도 — 면밀도 결측 롤은 제외. 기준 구간 = 앞 20롤 */
export function thicknessSdChart(ds: Dataset): ImrChart {
  const mothers = motherRolls(ds)
    .slice()
    .sort((a, b) => (a.startedAt < b.startedAt ? -1 : 1));
  const series = mothers.flatMap((r) => {
    const sd = rollThicknessSdUm(r);
    return sd === null ? [] : [{ id: r.id, date: r.startedAt.slice(0, 10), value: sd, label: `${recipeLabel(r.recipeId)} · 패스 ${r.passCount}` }];
  });
  const baseN = Math.min(series.length, THICKNESS_BASELINE_ROLLS);
  return imrChart(series, THICKNESS_BASELINE_ROLLS, {
    minBaseline: 8,
    baselineLabel: `앞 ${baseN}롤`,
    excludedCount: mothers.length - series.length,
  });
}

/** 원소 관리도 기준 구간 — 주조 순 앞 5잉곳(새 도가니 1~5회째) */
const ELEMENT_BASELINE_INGOTS = 5;
/** 기준 구간에서 검출된 값이 이보다 적으면 관리한계를 그리지 않는다 */
const ELEMENT_MIN_BASELINE = 3;

/**
 * 잉곳별 원소 농도(ppm) 관리도 — 검출한계 미만('<') 은 숫자로 넣지 않는다.
 * 기준 구간은 「점 앞 5개」가 아니라 「주조 순 앞 5잉곳」이다. '<' 가 많아 기준 구간에 남은 점이 3개 미만이면
 * 뒤쪽(드리프트 구간) 점으로 한계를 잡는 일이 없도록 한계를 그리지 않는다.
 */
export function elementChart(ds: Dataset, element: IcpElement): ImrChart & { specPpm: number } {
  const spec = SPEC_LIMIT_PPM[element];
  const sorted = ds.ingots.slice().sort((a, b) => (a.castAt < b.castAt ? -1 : 1));
  const baselineIngots = sorted.slice(0, ELEMENT_BASELINE_INGOTS);
  const useCountOf = (ingot: Ingot) => ds.batches.find((b) => b.id === ingot.batchId)?.crucibleUseCount ?? null;
  let excluded = 0;
  let baselineDetected = 0;
  const series = sorted.flatMap((ingot, idx) => {
    const r = ingot.icp.find((x) => x.element === element);
    if (!r || r.qualifier === "<") {
      excluded += 1;
      return [];
    }
    if (idx < ELEMENT_BASELINE_INGOTS) baselineDetected += 1;
    const use = useCountOf(ingot);
    return [
      {
        id: ingot.id,
        date: ingot.castAt,
        value: r.valuePpm,
        label: `도가니 ${use ?? "?"}회째`,
        overSpec: r.valuePpm > spec,
      },
    ];
  });
  const uses = baselineIngots.map(useCountOf).filter((v): v is number => v !== null);
  const useRange = uses.length ? `${Math.min(...uses)}~${Math.max(...uses)}회째` : "";
  const baselineLabel =
    baselineDetected >= ELEMENT_MIN_BASELINE
      ? `도가니 ${useRange} 잉곳 ${baselineDetected}개`
      : `도가니 ${useRange} 잉곳 중 검출된 값 ${baselineDetected}개 — 기준 구간 부족`;
  return {
    ...imrChart(series, baselineDetected, {
      minBaseline: ELEMENT_MIN_BASELINE,
      baselineLabel,
      excludedCount: excluded,
    }),
    specPpm: spec,
  };
}

/** 필름 재사용 효과를 걷어내고 레시피끼리 비교 — 재사용 maxReuse 회 이하 롤만 */
export function completionByRecipeStratified(ds: Dataset, maxReuse = 4): CompletionStat[] {
  const rolls = motherRolls(ds).filter((r) => r.filmReuseCount !== null && r.filmReuseCount <= maxReuse);
  return ds.recipes
    .filter((rc) => rc.kind === "rolling")
    .map((rc) => completionStat(rc.id, rc.name, rolls.filter((r) => r.recipeId === rc.id)))
    .filter((s) => s.rolls > 0);
}

/** 레시피 롤 중 필름을 maxReuse 회 넘게 재사용한 롤 수 */
export function highReuseShare(ds: Dataset, recipeId: string, maxReuse = 4): { total: number; high: number; rate: number } {
  const list = motherRolls(ds).filter((r) => r.recipeId === recipeId && r.filmReuseCount !== null);
  const high = list.filter((r) => (r.filmReuseCount ?? 0) > maxReuse).length;
  return { total: list.length, high, rate: list.length ? high / list.length : 0 };
}

/** 노출 비율이 이만큼(15%p) 넘게 차이 나야 「재사용 필름에 더 많이 걸렸다」고 말한다 */
const EXPOSURE_GAP = 0.15;
/** 무파단율이 이만큼(10%p) 넘게 차이 나야 「차이가 남는다」고 말한다 */
const RATE_GAP = 0.1;

export type RecipeConfound = {
  aAll: CompletionStat | undefined;
  bAll: CompletionStat | undefined;
  aStrat: CompletionStat | undefined;
  bStrat: CompletionStat | undefined;
  aShare: { total: number; high: number; rate: number };
  bShare: { total: number; high: number; rate: number };
  /** B 롤의 고재사용 비율이 A 보다 의미 있게 높다 — 걸러내지 않은 비교가 B 에 불리하다 */
  bMoreExposed: boolean;
  /** 재사용을 걸러낸 뒤에도 B 무파단율이 A 보다 의미 있게 낮다 */
  gapRemains: boolean;
  /** 화면 제목 — 판정 결과로 고른다 */
  headline: string;
  /** 판정 문장 (숫자 포함) */
  sentence: string;
};

/** 레시피 A·B 무파단율 비교에서 필름 재사용이 섞였는지 판정 */
export function recipeReuseConfound(ds: Dataset, maxReuse = 4): RecipeConfound {
  const all = completionByRecipe(ds);
  const strat = completionByRecipeStratified(ds, maxReuse);
  const aAll = all.find((s) => s.key === "RCP-A");
  const bAll = all.find((s) => s.key === "RCP-B");
  const aStrat = strat.find((s) => s.key === "RCP-A");
  const bStrat = strat.find((s) => s.key === "RCP-B");
  const aShare = highReuseShare(ds, "RCP-A", maxReuse);
  const bShare = highReuseShare(ds, "RCP-B", maxReuse);
  const bMoreExposed = aShare.total > 0 && bShare.total > 0 && bShare.rate - aShare.rate >= EXPOSURE_GAP;
  const gapRemains = Boolean(aStrat && bStrat && aStrat.tearFreeRate - bStrat.tearFreeRate >= RATE_GAP);
  const sampleNote = aStrat && bStrat ? `(표본 B ${bStrat.rolls}·A ${aStrat.rolls}개)` : "";
  const exposure = `5회 이상 재사용 필름으로 작업한 롤 비율은 B ${pct(bShare.rate)}(${bShare.high}/${bShare.total})·A ${pct(aShare.rate)}(${aShare.high}/${aShare.total})`;

  let headline: string;
  let sentence: string;
  if (!aStrat || !bStrat) {
    headline = "레시피 A·B 를 필름 재사용으로 나눠 비교할 표본이 아직 없다";
    sentence = `${exposure}입니다.`;
  } else if (bMoreExposed) {
    headline = "걸러내지 않으면 레시피 B 가 나빠 보이는 이유";
    sentence = `${exposure}로 B 가 재사용 필름에 더 많이 걸렸습니다. 재사용 ${maxReuse}회 이하 롤끼리 보면 B ${pct(bStrat.tearFreeRate)}·A ${pct(aStrat.tearFreeRate)}${sampleNote}입니다.`;
  } else if (gapRemains) {
    headline = "필름 재사용을 걸러도 레시피 B 무파단율이 A 보다 낮다";
    sentence = `${exposure}로 비슷해, 필름 재사용으로는 차이가 설명되지 않습니다. 재사용 ${maxReuse}회 이하 롤끼리도 B ${pct(bStrat.tearFreeRate)}·A ${pct(aStrat.tearFreeRate)}${sampleNote}로 차이가 남습니다 — 표본이 적어 우연일 수 있습니다.`;
  } else {
    headline = "필름 재사용을 걸러내면 레시피 A·B 의 무파단율 차이는 뚜렷하지 않다";
    sentence = `${exposure}입니다. 재사용 ${maxReuse}회 이하 롤끼리 보면 B ${pct(bStrat.tearFreeRate)}·A ${pct(aStrat.tearFreeRate)}${sampleNote}입니다.`;
  }
  return { aAll, bAll, aStrat, bStrat, aShare, bShare, bMoreExposed, gapRemains, headline, sentence };
}

// ---- 4-1. 관리도 조기 경보 — 외주 분석 회신일 기준 ----

export type EarlyWarning = {
  element: IcpElement;
  firstOoc: ImrPoint | null;
  firstOver: ImrPoint | null;
  /** 첫 관리한계 이탈 결과가 회신된 날 */
  oocReportedAt: string | null;
  /** 규격 초과 잉곳의 정제 배치 착수일 */
  overBatchStartedAt: string | null;
  /** 첫 이탈 뒤 회신 전에 이미 주조된 잉곳 수 — 경보를 받을 수 없던 잉곳 */
  castBeforeReport: number;
  /** 회신 뒤에 착수해 규격 초과까지 간 배치 수(규격 초과 배치 포함) — 경보로 멈출 수 있었던 배치 */
  batchesAfterReport: number;
  /** 규격 초과 잉곳에서 나온 홀드 롤 수 */
  holdRolls: number;
};

/**
 * 관리도가 규격 초과보다 얼마나 먼저 알렸나. 주조 순서만 세면 외주 ICP 회신 지연(12일)을 무시하게 되므로,
 * 첫 이탈 결과가 회신된 날 이후에 착수한 배치만 「경보로 막을 수 있었던 배치」로 센다.
 */
export function earlyWarning(ds: Dataset, element: IcpElement = "Fe"): EarlyWarning {
  const chart = elementChart(ds, element);
  const firstOoc = chart.points.find((p) => p.outOfControl) ?? null;
  const firstOver = chart.points.find((p) => p.overSpec) ?? null;
  const ingotById = new Map(ds.ingots.map((i) => [i.id, i]));
  const batchById = new Map(ds.batches.map((b) => [b.id, b]));
  const oocIngot = firstOoc ? ingotById.get(firstOoc.id) : undefined;
  const oocReportedAt = oocIngot?.icp.find((r) => r.element === element)?.reportedAt ?? null;
  const overIngot = firstOver ? ingotById.get(firstOver.id) : undefined;
  const overBatch = overIngot ? batchById.get(overIngot.batchId) : undefined;
  const overBatchStartedAt = overBatch ? overBatch.startedAt.slice(0, 10) : null;

  let castBeforeReport = 0;
  let batchesAfterReport = 0;
  if (oocIngot && oocReportedAt && overIngot && overIngot.castAt > oocIngot.castAt) {
    for (const ingot of ds.ingots) {
      if (ingot.castAt <= oocIngot.castAt || ingot.castAt > overIngot.castAt) continue;
      const started = batchById.get(ingot.batchId)?.startedAt.slice(0, 10) ?? ingot.castAt;
      if (started > oocReportedAt) batchesAfterReport += 1;
      else castBeforeReport += 1;
    }
  }
  const holdRolls = overIngot ? ds.rolls.filter((r) => r.ingotId === overIngot.id && r.status === "hold").length : 0;
  return { element, firstOoc, firstOver, oocReportedAt, overBatchStartedAt, castBeforeReport, batchesAfterReport, holdRolls };
}

// ---- 5. 납기 ----

export type OtdPoint = {
  week: string; // 주 시작일
  label: string;
  /** 판정 대상 = 출하된 건 + 약속일이 지났는데 못 나간 건 */
  shipments: number;
  onTime: number;
  /** 약속일이 지났는데 아직 출하 안 된 건 (지연으로 센다) */
  overdue: number;
  rate: number | null;
  avgLeadDays: number | null;
};

function mondayOf(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  return addDays(date, -((dow + 6) % 7));
}

/** 약속일이 기준일보다 앞인데 아직 출하되지 않은 건 */
export function isOverdueUnshipped(ds: Dataset, s: Shipment): boolean {
  return !s.shippedAt && diffDays(ds.asOf, s.promisedDate) > 0;
}

/** 납기 판정 대상 — 출하된 건 + 약속일이 지난 미출하 건. 약속일이 남은 진행 중 출하만 뺀다 */
export function otdEvaluated(ds: Dataset): Shipment[] {
  return ds.shipments.filter((s) => s.shippedAt || isOverdueUnshipped(ds, s));
}

function isOnTime(s: Shipment): boolean {
  return Boolean(s.shippedAt) && diffDays(s.shippedAt!, s.promisedDate) <= 0;
}

export function otdByWeek(ds: Dataset): OtdPoint[] {
  const byWeek = new Map<string, Shipment[]>();
  otdEvaluated(ds).forEach((s) => {
    // 출하된 건은 출하 주, 못 나간 건은 약속일이 지난 주에 센다
    const monday = mondayOf(s.shippedAt ?? s.promisedDate);
    byWeek.set(monday, [...(byWeek.get(monday) ?? []), s]);
  });
  return Array.from(byWeek.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([week, list]) => {
      const shipped = list.filter((s) => s.shippedAt);
      const onTime = list.filter(isOnTime).length;
      return {
        week,
        label: shortDate(week),
        shipments: list.length,
        onTime,
        overdue: list.length - shipped.length,
        rate: list.length ? onTime / list.length : null,
        avgLeadDays: shipped.length ? round(mean(shipped.map((s) => diffDays(s.shippedAt!, s.orderDate))), 1) : null,
      };
    });
}

export type CustomerOtd = {
  customer: string;
  /** 판정 대상 = 출하 + 약속일 지난 미출하 */
  shipments: number;
  onTime: number;
  overdue: number;
  rate: number;
  claims: number;
};

export function otdByCustomer(ds: Dataset): CustomerOtd[] {
  const customers = Array.from(new Set(ds.shipments.map((s) => s.customer)));
  const evaluated = otdEvaluated(ds);
  return customers.map((customer) => {
    const list = evaluated.filter((s) => s.customer === customer);
    const onTime = list.filter(isOnTime).length;
    return {
      customer,
      shipments: list.length,
      onTime,
      overdue: list.filter((s) => !s.shippedAt).length,
      rate: list.length ? onTime / list.length : 0,
      claims: ds.shipments.filter((s) => s.customer === customer && s.verdict === "claim").length,
    };
  });
}

// ---- 6. 결측률 ----

export type MissingStat = { field: string; label: string; missing: number; total: number; rate: number };

export function missingRates(ds: Dataset): MissingStat[] {
  const rolls = motherRolls(ds);
  const total = rolls.length;
  const stat = (field: string, label: string, isMissing: (r: Roll) => boolean): MissingStat => {
    const missing = rolls.filter(isMissing).length;
    return { field, label, missing, total, rate: total ? missing / total : 0 };
  };
  return [
    stat("dewPointC", "교대 시작 노점", (r) => r.dewPointC === null),
    stat("arealDensityGm2", "면밀도 3점", (r) => r.arealDensityGm2 === null),
    stat("surfaceGrade", "외관 등급", (r) => r.surfaceGrade === null),
    stat("filmLotId", "이형 필름 로트", (r) => r.filmLotId === null),
  ];
}

// ---- 7. 로트 계보 ----

export type Genealogy = {
  shipment: Shipment | null;
  /** 조회 대상 롤들 (출하면 그 안의 슬릿 롤, 롤이면 그 롤) */
  rolls: Roll[];
  parentRolls: Roll[];
  ingots: Ingot[];
  batches: RefineBatch[];
  materialLots: MaterialLot[];
  nonconformances: NonConformance[];
};

export function traceBack(ds: Dataset, target: { type: "shipment" | "roll" | "ingot"; id: string }): Genealogy | null {
  let shipment: Shipment | null = null;
  let rolls: Roll[] = [];
  if (target.type === "ingot") {
    const ingot = ds.ingots.find((i) => i.id === target.id);
    if (!ingot) return null;
    const batches = ds.batches.filter((b) => b.id === ingot.batchId);
    const lotIds = new Set(batches.flatMap((b) => b.inputLotIds));
    const involved = new Set([ingot.id, ...batches.map((b) => b.id)]);
    return {
      shipment: null,
      rolls: [],
      parentRolls: [],
      ingots: [ingot],
      batches,
      materialLots: ds.materialLots.filter((l) => lotIds.has(l.id)),
      nonconformances: ds.nonconformances.filter((n) => involved.has(n.targetId)),
    };
  }
  if (target.type === "shipment") {
    shipment = ds.shipments.find((s) => s.id === target.id) ?? null;
    if (!shipment) return null;
    rolls = ds.rolls.filter((r) => shipment!.rollIds.includes(r.id));
  } else {
    const roll = ds.rolls.find((r) => r.id === target.id);
    if (!roll) return null;
    rolls = [roll];
    shipment = ds.shipments.find((s) => s.rollIds.includes(roll.id)) ?? null;
  }
  const parentIds = new Set(rolls.map((r) => r.parentRollId).filter((id): id is string => Boolean(id)));
  const parentRolls = ds.rolls.filter((r) => parentIds.has(r.id));
  const ingotIds = new Set([...rolls, ...parentRolls].map((r) => r.ingotId));
  const ingots = ds.ingots.filter((i) => ingotIds.has(i.id));
  const batchIds = new Set(ingots.map((i) => i.batchId));
  const batches = ds.batches.filter((b) => batchIds.has(b.id));
  const lotIds = new Set([
    ...batches.flatMap((b) => b.inputLotIds),
    ...[...rolls, ...parentRolls].map((r) => r.filmLotId).filter((id): id is string => Boolean(id)),
  ]);
  const materialLots = ds.materialLots.filter((l) => lotIds.has(l.id));
  const involved = new Set<string>([
    ...rolls.map((r) => r.id),
    ...parentRolls.map((r) => r.id),
    ...ingots.map((i) => i.id),
    ...batches.map((b) => b.id),
    ...(shipment ? [shipment.id] : []),
  ]);
  const nonconformances = ds.nonconformances.filter((n) => involved.has(n.targetId));
  return { shipment, rolls, parentRolls, ingots, batches, materialLots, nonconformances };
}

export type ForwardTrace = {
  lot: MaterialLot;
  batches: RefineBatch[];
  ingots: Ingot[];
  motherRolls: Roll[];
  slitRolls: Roll[];
  shipments: Shipment[];
};

/** 잉곳 → 그 잉곳으로 만든 모 롤·슬릿 롤·출하 (홀드·회수 범위) */
export function traceForwardFromIngot(
  ds: Dataset,
  ingotId: string,
): { ingot: Ingot; motherRolls: Roll[]; slitRolls: Roll[]; shipments: Shipment[] } | null {
  const ingot = ds.ingots.find((i) => i.id === ingotId);
  if (!ingot) return null;
  const mothers = ds.rolls.filter((r) => r.stage === "mother" && r.ingotId === ingotId);
  const motherIds = new Set(mothers.map((r) => r.id));
  const slitRolls = ds.rolls.filter((r) => r.parentRollId && motherIds.has(r.parentRollId));
  const slitIds = new Set(slitRolls.map((r) => r.id));
  const shipments = ds.shipments.filter((s) => s.rollIds.some((id) => slitIds.has(id)));
  return { ingot, motherRolls: mothers, slitRolls, shipments };
}

/** 원료 로트 → 영향 받은 배치·잉곳·롤·출하 (회수 범위 판단용) */
export function traceForward(ds: Dataset, materialLotId: string): ForwardTrace | null {
  const lot = ds.materialLots.find((l) => l.id === materialLotId);
  if (!lot) return null;
  let mothers: Roll[];
  let batches: RefineBatch[] = [];
  let ingots: Ingot[] = [];
  if (lot.type === "release_film") {
    mothers = ds.rolls.filter((r) => r.stage === "mother" && r.filmLotId === lot.id);
    const ingotIds = new Set(mothers.map((r) => r.ingotId));
    ingots = ds.ingots.filter((i) => ingotIds.has(i.id));
  } else {
    batches = ds.batches.filter((b) => b.inputLotIds.includes(lot.id));
    const batchIds = new Set(batches.map((b) => b.id));
    ingots = ds.ingots.filter((i) => batchIds.has(i.batchId));
    const ingotIds = new Set(ingots.map((i) => i.id));
    mothers = ds.rolls.filter((r) => r.stage === "mother" && ingotIds.has(r.ingotId));
  }
  const motherIds = new Set(mothers.map((r) => r.id));
  const slitRolls = ds.rolls.filter((r) => r.parentRollId && motherIds.has(r.parentRollId));
  const slitIds = new Set(slitRolls.map((r) => r.id));
  const shipments = ds.shipments.filter((s) => s.rollIds.some((id) => slitIds.has(id)));
  return { lot, batches, ingots, motherRolls: mothers, slitRolls, shipments };
}

// ---- 8. 개선 제안 ----

export type Suggestion = {
  id: string;
  kpi: string;
  title: string;
  finding: string;
  action: string;
  method: string;
  /** 지금 있는 표본 수 · 이 판단에 필요한 표본 수 */
  dataNow: number;
  dataNeeded: number;
  /** 충분도(dataNow/dataNeeded)와 모순되지 않게 buildSuggestions 끝에서 한 번 더 맞춘다 */
  confidence: "low" | "medium" | "high";
  /** 일반 신뢰도 설명 대신 보여 줄 이유 (예: 표본은 찼지만 차이가 뚜렷하지 않다) */
  confidenceNote?: string;
  tone: "indigo" | "purple" | "emerald" | "amber" | "rose";
};

/**
 * 신뢰도는 충분도 막대와 한 방향으로 말해야 한다.
 * - 필요한 표본에 못 미치면 「근거 충분(high)」 금지
 * - 표본이 찼는데 high 가 아니면, 왜 아닌지(신호가 약함)를 confidenceNote 로 반드시 밝힌다
 */
function settleConfidence(s: Suggestion): Suggestion {
  const enough = s.dataNow >= s.dataNeeded;
  if (!enough && s.confidence === "high") {
    return {
      ...s,
      confidence: "medium",
      confidenceNote:
        s.confidenceNote ?? `신호는 분명하지만 필요한 표본(${s.dataNeeded})에 못 미칩니다 — 조치는 시작하되 확정 전에 더 모읍니다`,
    };
  }
  if (enough && s.confidence !== "high" && !s.confidenceNote) {
    return { ...s, confidence: "medium", confidenceNote: "표본 수는 찼지만 비교 결과의 차이가 작아, 확정 전에 더 지켜봅니다" };
  }
  return s;
}

export function buildSuggestions(ds: Dataset): Suggestion[] {
  const mothers = motherRolls(ds);
  const out: Suggestion[] = [];

  // 1. 수율 — 가장 큰 손실 단계 (재고로 남은 차이는 손실에서 뺀다)
  const wf = yieldWaterfall(ds);
  const losses = wf.filter((s) => s.deltaKind === "loss");
  const worst = losses.reduce((a, b) => (b.deltaKg > a.deltaKg ? b : a), losses[0]);
  const totalLoss = losses.reduce((a, s) => a + s.deltaKg, 0);
  out.push({
    id: "yield",
    kpi: "수율",
    title: `손실이 가장 큰 단계는 「${worst.label}」`,
    finding: `${worst.label} 단계에서 리튬 ${worst.deltaKg}kg 손실 — 전체 공정 손실 ${round(totalLoss, 2)}kg 의 ${round((worst.deltaKg / Math.max(totalLoss, 0.01)) * 100, 0)}%. (${worst.note})`,
    action: "해당 단계 손실을 원인 코드별로 나눠 기록 시작 → 상위 2개 원인부터 조치",
    method: "단계별 순중량 워터폴 + 원인 파레토(큰 원인부터 줄 세우기)",
    dataNow: ds.batches.length,
    dataNeeded: 20,
    confidence: ds.batches.length >= 20 ? "high" : "medium",
    tone: "indigo",
  });

  // 2. 파단 — 필름 재사용
  const byReuse = completionByFilmReuse(ds);
  const low = byReuse[0];
  const high = byReuse[byReuse.length - 1];
  if (low.rolls > 0 && high.rolls > 0) {
    const drop = low.tearFreeRate - high.tearFreeRate;
    const title =
      drop >= 0.3
        ? "이형 필름 5회 이상 재사용에서 파단 급증"
        : drop >= 0.15
          ? "이형 필름 5회 이상 재사용에서 파단이 늘었다"
          : drop > 0
            ? "필름 재사용 5회 이상에서 파단이 조금 많지만 차이는 작다"
            : "필름 재사용 횟수와 파단의 관계가 아직 보이지 않는다";
    const reuseRolls = mothers.filter((r) => r.filmReuseCount !== null).length;
    out.push({
      id: "tear-film",
      kpi: "무파단율",
      title,
      finding: `무파단율 ${low.label} ${pct(low.tearFreeRate)} (롤 ${low.rolls}개) → ${high.label} ${pct(high.tearFreeRate)} (롤 ${high.rolls}개). 롤당 손실 길이 ${low.avgLostM}m → ${high.avgLostM}m`,
      action:
        drop >= 0.15
          ? "필름 재사용 상한 4회를 4주간 시범 적용하고 무파단율 변화를 같은 표로 비교"
          : "재사용 횟수 기록을 계속하고, 구간별 롤이 각 10개를 넘으면 다시 비교",
      method: "재사용 횟수 구간 × 파단 여부 교차표 (롤 100개가 쌓이면 파단 확률 모델)",
      dataNow: reuseRolls,
      dataNeeded: 100,
      confidence: drop >= 0.15 && high.rolls >= 8 ? "medium" : "low",
      tone: "amber",
    });
  }

  // 3. 파단 — 레시피 C (필름 재사용 효과와 겹치지 않게 재사용 4회 이하 롤끼리만 비교)
  const byRecipe = completionByRecipeStratified(ds, 4);
  const c = byRecipe.find((s) => s.key === "RCP-C");
  const b = byRecipe.find((s) => s.key === "RCP-B");
  if (c && b && c.rolls > 0) {
    const confound = recipeReuseConfound(ds, 4);
    const cWorse = c.tearFreeRate + 0.15 < b.tearFreeRate;
    let abNote = "";
    if (confound.bAll && confound.bStrat && confound.aStrat) {
      abNote = confound.bMoreExposed
        ? ` 참고로 걸러내지 않으면 레시피 B 가 ${pct(confound.bAll.tearFreeRate)} 로 더 낮게 보이는데, B 롤이 재사용 필름에 더 많이 걸렸기 때문이다(5회 이상 비율 B ${pct(confound.bShare.rate)}·A ${pct(confound.aShare.rate)}).`
        : confound.gapRemains
          ? ` 참고로 레시피 B 는 재사용 효과를 걸러도 A 와 차이가 남는다(무파단율 B ${pct(confound.bStrat.tearFreeRate)}·A ${pct(confound.aStrat.tearFreeRate)}, 표본 B ${confound.bStrat.rolls}·A ${confound.aStrat.rolls}개). 5회 이상 재사용 비율은 B ${pct(confound.bShare.rate)}·A ${pct(confound.aShare.rate)}로 비슷해 필름으로는 설명되지 않는다.`
          : "";
    }
    out.push({
      id: "tear-recipe",
      kpi: "무파단율",
      title: cWorse ? "시험 레시피 C 는 파단이 많다" : "레시피 C 와 B 의 파단 차이는 아직 뚜렷하지 않다",
      finding: `필름 재사용 4회 이하 롤끼리 비교: 레시피 C 무파단율 ${pct(c.tearFreeRate)} (롤 ${c.rolls}개) vs 레시피 B ${pct(b.tearFreeRate)} (롤 ${b.rolls}개).${abNote}`,
      action: cWorse
        ? "C 시험을 중단하거나 압하율을 낮춘 C′ 로 재설계. 시험 롤은 표기 후 출하 판단"
        : "C 시험을 이어 가되 롤마다 파단 위치를 함께 기록해 비교 표본을 늘린다",
      method: `층별 교차표(재사용 구간 × 레시피) — 표본 ${c.rolls}개는 방향만 보여 준다`,
      dataNow: c.rolls,
      dataNeeded: 16,
      confidence: "low",
      tone: "rose",
    });
  }

  // 4. 두께 — 레시피 A vs B 산포
  const sdA = mothers.filter((r) => r.recipeId === "RCP-A").map(rollThicknessSdUm).filter((v): v is number => v !== null);
  const sdB = mothers.filter((r) => r.recipeId === "RCP-B").map(rollThicknessSdUm).filter((v): v is number => v !== null);
  const tChart = thicknessSdChart(ds);
  if (sdA.length && sdB.length) {
    const mA = mean(sdA);
    const mB = mean(sdB);
    const bBetter = mB <= mA * 0.8;
    const bWorse = mB >= mA * 1.25;
    const enough = tChart.n >= 30;
    out.push({
      id: "thickness",
      kpi: "두께 균일도",
      title: bBetter
        ? "레시피 B 가 두께 산포를 줄인다"
        : bWorse
          ? "레시피 B 의 두께 산포가 A 보다 크다"
          : "레시피 A·B 의 두께 산포 차이가 뚜렷하지 않다",
      finding: `롤 안 두께 3점의 표준편차 평균 레시피 A ${round(mA, 2)}µm (롤 ${sdA.length}개) → 레시피 B ${round(mB, 2)}µm (롤 ${sdB.length}개). 관리상한 ${tChart.ucl}µm 를 넘은 롤 ${tChart.points.filter((p) => p.outOfControl).length}개`,
      action: bBetter
        ? "B 를 표준으로 전환하되, 먼저 같은 롤을 여러 번 재서 측정값이 일정한지(측정 반복성) 확인해야 공정 능력 지수(규격 안에 드는 여유)를 말할 수 있다"
        : bWorse
          ? "B 전환을 멈추고 A 를 표준으로 유지. B 롤의 장력 조건을 다시 확인한다"
          : "전환을 서두르지 않고 A·B 를 병행해 롤을 더 모은다. 측정 반복성부터 확인한다",
      method: "롤별 개별값 관리도 → 롤 100개 이후 조건을 나눠 바꿔 보는 실험(DOE)",
      dataNow: tChart.n,
      dataNeeded: 30,
      confidence: enough ? ((bBetter || bWorse) ? "high" : "medium") : "low",
      confidenceNote: enough && !(bBetter || bWorse) ? "표본 수는 찼지만 A·B 차이가 작아, 방향을 정하기엔 이릅니다" : undefined,
      tone: "purple",
    });
  }

  // 5. 불순물 — Fe vs 도가니 (관리한계는 새 도가니 1~5회째 구간으로 계산, 경보 시점은 외주 회신일 기준)
  const fe = elementChart(ds, "Fe");
  const feOver = fe.points.filter((p) => p.overSpec);
  const ew = earlyWarning(ds, "Fe");
  let feTitle: string;
  if (ew.firstOoc && ew.firstOver && ew.batchesAfterReport > 0) {
    feTitle = `관리도 경보는 Fe 규격 초과보다 먼저 왔다 — 회신 기준 ${ew.batchesAfterReport}배치 전`;
  } else if (ew.firstOoc && ew.firstOver) {
    feTitle = "관리도는 Fe 이탈을 잡았지만, 외주 분석 회신이 늦어 규격 초과 전에 막지 못했다";
  } else if (feOver.length) {
    feTitle = "Fe 규격 초과 — 관리도 기준선을 먼저 세워야 한다";
  } else if (ew.firstOoc) {
    feTitle = "Fe 관리한계 이탈 — 규격 안이지만 도가니를 점검할 때";
  } else {
    feTitle = "Fe 는 관리한계 안에서 안정적이다";
  }
  const feBase = fe.limitsValid
    ? `기준(${fe.baselineLabel}) 평균 ${round(fe.mean, 1)}ppm, 관리상한 ${round(fe.ucl, 1)}ppm.`
    : `기준 구간(${fe.baselineLabel})이라 관리한계를 잡지 못했다.`;
  let feStory = "";
  if (ew.firstOoc) {
    feStory = ` ${ew.firstOoc.label} 잉곳(${ew.firstOoc.value}ppm)이 처음 관리상한을 넘었고, 이 결과는 ${ew.oocReportedAt ? `${shortDate(ew.oocReportedAt)}에` : "나중에"} 회신됐다.`;
    if (ew.firstOver && ew.firstOver.index > ew.firstOoc.index) {
      feStory += ` 회신 전에 잉곳 ${ew.castBeforeReport}개가 이미 주조됐고, ${ew.overBatchStartedAt ? `${shortDate(ew.overBatchStartedAt)} 착수한 ` : ""}${ew.firstOver.label} 잉곳(${ew.firstOver.value}ppm)이 규격 50ppm 을 넘어 롤 ${ew.holdRolls}개가 홀드됐다.`;
    }
  } else if (ew.firstOver) {
    feStory = ` ${ew.firstOver.label} 잉곳(${ew.firstOver.value}ppm)이 규격 50ppm 을 넘어 롤 ${ew.holdRolls}개가 홀드됐다.`;
  }
  out.push({
    id: "fe-crucible",
    kpi: "불순물",
    title: feTitle,
    finding: `${feBase}${feStory} 외주 분석 회신까지 12일이 걸린다.`,
    action: feOver.length
      ? "도가니 교체 주기를 5회로 앞당기고, 관리한계 이탈 배치는 「분석 결과 전 압연 금지」"
      : "도가니 사용 횟수를 계속 함께 기록하고, 관리한계 이탈이 나오면 다음 배치 착수 전에 확인",
    method: "원소별 개별값 관리도에 도가니 사용 횟수를 함께 표시",
    dataNow: fe.n,
    dataNeeded: 25,
    confidence: feOver.length ? "high" : "medium",
    confidenceNote: feOver.length
      ? "규격 초과는 분명하지만 도가니 한 주기만 본 결과라, 교체 주기를 확정하려면 다음 도가니에서도 같은 시점에 오르는지 봐야 합니다"
      : undefined,
    tone: "rose",
  });

  // 6. 납기 — 약속일이 지난 미출하 건은 지연으로 센다
  const byCustomer = otdByCustomer(ds).filter((cst) => cst.shipments > 0);
  const evaluated = otdEvaluated(ds);
  if (byCustomer.length) {
    const worstCustomer = byCustomer.reduce((a, x) => (x.rate < a.rate ? x : a), byCustomer[0]);
    const onTimeAll = evaluated.filter(isOnTime).length;
    const overallRate = evaluated.length ? onTimeAll / evaluated.length : 0;
    const shipped = evaluated.filter((s) => s.shippedAt);
    const avgLead = shipped.length ? round(mean(shipped.map((s) => diffDays(s.shippedAt!, s.orderDate))), 1) : null;
    const overdueAll = evaluated.length - shipped.length;
    out.push({
      id: "otd",
      kpi: "납기",
      title: `납기 준수율 ${pct(overallRate)} — 가장 낮은 곳은 ${worstCustomer.customer}`,
      finding: `${worstCustomer.customer} 준수율 ${pct(worstCustomer.rate)} (${worstCustomer.onTime}/${worstCustomer.shipments}${worstCustomer.overdue ? `, 약속일 지난 미출하 ${worstCustomer.overdue}건 포함` : ""}). ${avgLead !== null ? `출하된 건의 수주→출하 평균 ${avgLead}일 vs 약속 14일.` : ""}${overdueAll ? ` 홀드 등으로 약속일을 넘기고도 못 나간 ${overdueAll}건은 지연으로 셌다.` : ""}`,
      action: "수주·약속·출하 세 날짜만으로 매주 갱신. 잉곳 재고 일수와 함께 보면 착수 지연인지 압연 지연인지 갈린다",
      method: "리드타임 런차트 + 고객별 표 (모델 불필요)",
      dataNow: evaluated.length,
      dataNeeded: 20,
      confidence: evaluated.length >= 20 ? "high" : "medium",
      tone: "emerald",
    });
  }

  // 7. 환경 — 노점 이탈과 클레임 (클레임 출하에 실제로 들어간 이탈 롤만 연결로 센다)
  const excursions = mothers.filter((r) => r.dewPointC !== null && r.dewPointC > -45);
  const claimShipmentIds = new Set(
    ds.nonconformances.filter((n) => n.type === "claim" && n.reasonCode === "SURF-DISC" && n.targetType === "shipment").map((n) => n.targetId),
  );
  const rollById = new Map(ds.rolls.map((r) => [r.id, r]));
  const claimMotherIds = new Set(
    ds.shipments
      .filter((s) => claimShipmentIds.has(s.id))
      .flatMap((s) => s.rollIds)
      .map((id) => rollById.get(id)?.parentRollId)
      .filter((v): v is string => Boolean(v)),
  );
  const linked = excursions.filter((r) => claimMotherIds.has(r.id)).length;
  const dewMissing = mothers.filter((r) => r.dewPointC === null).length;
  out.push({
    id: "dew-point",
    kpi: "환경",
    title:
      linked > 0
        ? "노점 −45℃ 초과 작업분에서 표면 변색 클레임이 나왔다"
        : excursions.length > 0
          ? "노점 −45℃ 초과 작업이 있었지만 클레임 연결은 아직 없다"
          : "노점 기준(−45℃) 이탈 작업은 없었다",
    finding: `노점 이탈 기록 롤 ${excursions.length}개 중 표면 변색 클레임 출하에 들어간 롤 ${linked}개. 노점 결측 롤 ${dewMissing}개는 판단 불가`,
    action: "노점 −45℃ 초과 시 작업 중단 규칙 + 노점 결측 0 을 첫 목표로",
    method: "노점 × 작업 시간 산점도에 클레임 로트 표시 (로트 200개 이후 변색 확률 모델)",
    dataNow: mothers.filter((r) => r.dewPointC !== null).length,
    dataNeeded: 200,
    confidence: linked ? "medium" : "low",
    tone: "amber",
  });

  return out.map(settleConfidence);
}

// ---- 9. 상단 요약 ----

export type HeadlineStats = {
  motherRolls: number;
  slitRolls: number;
  tearFreeRate: number;
  avgThicknessSdUm: number | null;
  otdRate: number | null;
  /** 납기 판정 대상 수 (출하 + 약속일 지난 미출하) */
  otdEvaluated: number;
  openNc: number;
  holdRolls: number;
  weeks: number;
};

export function headlineStats(ds: Dataset): HeadlineStats {
  const mothers = motherRolls(ds);
  const sds = mothers.map(rollThicknessSdUm).filter((v): v is number => v !== null);
  const evaluated = otdEvaluated(ds);
  const onTime = evaluated.filter(isOnTime).length;
  return {
    motherRolls: mothers.length,
    slitRolls: ds.rolls.filter((r) => r.stage === "slit").length,
    tearFreeRate: mothers.length ? mothers.filter((r) => r.tearCount === 0).length / mothers.length : 0,
    avgThicknessSdUm: sds.length ? round(mean(sds), 2) : null,
    otdRate: evaluated.length ? onTime / evaluated.length : null,
    otdEvaluated: evaluated.length,
    openNc: ds.nonconformances.filter((n) => !n.closedAt).length,
    holdRolls: ds.rolls.filter((r) => r.status === "hold").length,
    weeks: 12,
  };
}
