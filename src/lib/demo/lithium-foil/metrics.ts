// 파생 지표 — 수율 워터폴·완주율·I-MR 관리도·원소 관리도·납기·결측률·로트 계보·개선 제안
// 전부 순수 함수. 통계는 데이터 양에 맞는 것만 쓴다(관리도·파레토·교차표). 회귀·DOE 는 제안 문구에서만 언급.

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
  const billetKg = mothers.reduce((a, r) => a + r.billetG, 0) / 1000;
  const motherKg = mothers.reduce((a, r) => a + liMassKg(r), 0);
  const slitKg = ds.rolls.filter((r) => r.stage === "slit").reduce((a, r) => a + liMassKg(r), 0);
  const shippedIds = new Set(ds.shipments.filter((s) => s.shippedAt).flatMap((s) => s.rollIds));
  const shippedKg = ds.rolls.filter((r) => shippedIds.has(r.id)).reduce((a, r) => a + liMassKg(r), 0);

  const steps: Array<Omit<WaterfallStep, "deltaKg">> = [
    { key: "input", label: "원료 투입", valueKg: inputKg, deltaKind: null, note: "정제 배치 투입 질량 합 (스크랩 회수분 포함)" },
    { key: "refined", label: "정제 출력", valueKg: refinedKg, deltaKind: "loss", note: "정제 손실 — 슬래그·도가니 부착" },
    { key: "ingot", label: "잉곳", valueKg: ingotKg, deltaKind: "loss", note: "주조 드로스 제거" },
    { key: "billet", label: "압연 투입", valueKg: billetKg, deltaKind: "inventory", note: "잉곳 잔량 — 손실이 아니라 재고" },
    { key: "mother", label: "모 롤", valueKg: motherKg, deltaKind: "loss", note: "파단 손실·에지 트림·헤드/테일" },
    { key: "slit", label: "슬릿 롤", valueKg: slitKg, deltaKind: "loss", note: "슬리팅 트림" },
    { key: "shipped", label: "출하", valueKg: shippedKg, deltaKind: "inventory", note: "출하 보류(홀드)·출하 대기 — 재고" },
  ];
  return steps.map((s, i) => ({
    ...s,
    valueKg: round(s.valueKg, 2),
    deltaKg: i === 0 ? 0 : round(steps[i - 1].valueKg - s.valueKg, 2),
  }));
}

// ---- 2. 완주율(파단) ----

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

// ---- 3·4. I-MR 관리도 ----

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
};

/**
 * 개별값 I-MR 관리도. 관리한계 = 기준 구간 평균 ± 2.66 × 기준 구간 이동범위 평균.
 * 이상점을 포함해 한계를 계산하면 한계가 넓어져 이상을 못 잡으므로, 정상 운전 구간을 기준으로 삼는다.
 */
export function imrChart(
  series: Array<{ id: string; date: string; value: number; label: string; overSpec?: boolean }>,
  baselineCount?: number,
): ImrChart {
  const values = series.map((s) => s.value);
  const baseN = Math.min(values.length, Math.max(2, baselineCount ?? values.length));
  const base = values.slice(0, baseN);
  const m = mean(base);
  const mrs: number[] = [];
  for (let i = 1; i < values.length; i += 1) mrs.push(Math.abs(values[i] - values[i - 1]));
  const mrBar = mean(mrs.slice(0, baseN - 1));
  const ucl = m + 2.66 * mrBar;
  const lcl = Math.max(0, m - 2.66 * mrBar);
  const points: ImrPoint[] = series.map((s, i) => ({
    id: s.id,
    index: i,
    date: s.date,
    value: round(s.value, 3),
    movingRange: i === 0 ? null : round(mrs[i - 1], 3),
    outOfControl: s.value > ucl || s.value < lcl,
    overSpec: Boolean(s.overSpec),
    label: s.label,
  }));
  return { points, mean: round(m, 3), ucl: round(ucl, 3), lcl: round(lcl, 3), mrBar: round(mrBar, 3), n: values.length, baselineN: baseN };
}

/** 모 롤별 두께 3점 표준편차(µm) 관리도 — 면밀도 결측 롤은 제외. 기준 구간 = 앞 20롤 */
export function thicknessSdChart(ds: Dataset): ImrChart {
  const series = motherRolls(ds)
    .slice()
    .sort((a, b) => (a.startedAt < b.startedAt ? -1 : 1))
    .flatMap((r) => {
      const sd = rollThicknessSdUm(r);
      return sd === null ? [] : [{ id: r.id, date: r.startedAt.slice(0, 10), value: sd, label: `${r.recipeId} · 패스 ${r.passCount}` }];
    });
  return imrChart(series, 20);
}

/** 잉곳별 원소 농도(ppm) 관리도 — 검출한계 미만('<') 은 제외. 기준 구간 = 앞 5잉곳(새 도가니 1~5회째) */
export function elementChart(ds: Dataset, element: IcpElement): ImrChart & { specPpm: number } {
  const spec = SPEC_LIMIT_PPM[element];
  const series = ds.ingots
    .slice()
    .sort((a, b) => (a.castAt < b.castAt ? -1 : 1))
    .flatMap((ingot) => {
      const r = ingot.icp.find((x) => x.element === element);
      if (!r || r.qualifier === "<") return [];
      const batch = ds.batches.find((b) => b.id === ingot.batchId);
      return [
        {
          id: ingot.id,
          date: ingot.castAt,
          value: r.valuePpm,
          label: `도가니 ${batch?.crucibleUseCount ?? "?"}회째`,
          overSpec: r.valuePpm > spec,
        },
      ];
    });
  return { ...imrChart(series, 5), specPpm: spec };
}

/** 필름 재사용 효과를 걷어내고 레시피끼리 비교 — 재사용 maxReuse 회 이하 롤만 */
export function completionByRecipeStratified(ds: Dataset, maxReuse = 4): CompletionStat[] {
  const rolls = motherRolls(ds).filter((r) => r.filmReuseCount !== null && r.filmReuseCount <= maxReuse);
  return ds.recipes
    .filter((rc) => rc.kind === "rolling")
    .map((rc) => completionStat(rc.id, rc.name, rolls.filter((r) => r.recipeId === rc.id)))
    .filter((s) => s.rolls > 0);
}

// ---- 5. 납기 ----

export type OtdPoint = {
  week: string; // 주 시작일
  label: string;
  shipments: number;
  onTime: number;
  rate: number | null;
  avgLeadDays: number | null;
};

export function otdByWeek(ds: Dataset): OtdPoint[] {
  const shipped = ds.shipments.filter((s) => s.shippedAt);
  const byWeek = new Map<string, Shipment[]>();
  shipped.forEach((s) => {
    const d = s.shippedAt!;
    const [y, m, day] = d.split("-").map(Number);
    const dow = new Date(Date.UTC(y, m - 1, day)).getUTCDay();
    const monday = addDays(d, -((dow + 6) % 7));
    byWeek.set(monday, [...(byWeek.get(monday) ?? []), s]);
  });
  return Array.from(byWeek.entries())
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .map(([week, list]) => {
      const onTime = list.filter((s) => diffDays(s.shippedAt!, s.promisedDate) <= 0).length;
      return {
        week,
        label: week.slice(5).replace("-", "/"),
        shipments: list.length,
        onTime,
        rate: list.length ? onTime / list.length : null,
        avgLeadDays: round(mean(list.map((s) => diffDays(s.shippedAt!, s.orderDate))), 1),
      };
    });
}

export type CustomerOtd = { customer: string; shipments: number; onTime: number; rate: number; claims: number };

export function otdByCustomer(ds: Dataset): CustomerOtd[] {
  const customers = Array.from(new Set(ds.shipments.map((s) => s.customer)));
  return customers.map((customer) => {
    const list = ds.shipments.filter((s) => s.customer === customer && s.shippedAt);
    const onTime = list.filter((s) => diffDays(s.shippedAt!, s.promisedDate) <= 0).length;
    return {
      customer,
      shipments: list.length,
      onTime,
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
  confidence: "low" | "medium" | "high";
  tone: "indigo" | "purple" | "emerald" | "amber" | "rose";
};

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
    method: "단계별 순중량 워터폴 + 원인 파레토",
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
    out.push({
      id: "tear-film",
      kpi: "완주율",
      title: "이형 필름 5회 이상 재사용에서 파단 급증",
      finding: `무파단율 ${low.label} ${round(low.tearFreeRate * 100, 0)}% → ${high.label} ${round(high.tearFreeRate * 100, 0)}%. 롤당 손실 길이 ${low.avgLostM}m → ${high.avgLostM}m`,
      action: "필름 재사용 상한 4회를 4주간 시범 적용하고 완주율 변화를 같은 표로 비교",
      method: "재사용 횟수 구간 × 파단 여부 교차표 (롤 100개 이후 로지스틱 회귀)",
      dataNow: mothers.filter((r) => r.filmReuseCount !== null).length,
      dataNeeded: 100,
      confidence: high.rolls >= 8 ? "medium" : "low",
      tone: "amber",
    });
  }

  // 3. 파단 — 레시피 C (필름 재사용 효과와 겹치지 않게 재사용 4회 이하 롤끼리만 비교)
  const byRecipeRaw = completionByRecipe(ds);
  const byRecipe = completionByRecipeStratified(ds, 4);
  const c = byRecipe.find((s) => s.key === "RCP-C");
  const b = byRecipe.find((s) => s.key === "RCP-B");
  const bRaw = byRecipeRaw.find((s) => s.key === "RCP-B");
  if (c && b && c.rolls > 0) {
    out.push({
      id: "tear-recipe",
      kpi: "완주율",
      title: c.tearFreeRate + 0.15 < b.tearFreeRate ? "시험 레시피 C 는 파단이 많다" : "레시피 C 와 B 의 파단 차이는 아직 뚜렷하지 않다",
      finding: `필름 재사용 4회 이하 롤끼리 비교: RCP-C 무파단율 ${round(c.tearFreeRate * 100, 0)}% (롤 ${c.rolls}개) vs RCP-B ${round(b.tearFreeRate * 100, 0)}% (롤 ${b.rolls}개).${bRaw ? ` 걸러내지 않으면 B 가 ${round(bRaw.tearFreeRate * 100, 0)}% 로 나빠 보인다 — B 가 재사용 필름에 많이 걸렸기 때문` : ""}`,
      action: "C 시험을 중단하거나 압하율을 낮춘 C′ 로 재설계. 시험 롤은 표기 후 출하 판단",
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
    out.push({
      id: "thickness",
      kpi: "두께 균일도",
      title: "레시피 B 가 두께 산포를 줄인다",
      finding: `롤 내 두께 SD 평균 RCP-A ${round(mean(sdA), 2)}µm → RCP-B ${round(mean(sdB), 2)}µm. 관리한계 이탈 ${tChart.points.filter((p) => p.outOfControl).length}건 (UCL ${tChart.ucl}µm)`,
      action: "B 를 표준으로 전환하되, 먼저 두께 측정 반복성(GR&R) 을 통과해야 Cpk 를 말할 수 있다",
      method: "롤별 I-MR 관리도 → 100롤 이후 분할 요인 DOE",
      dataNow: tChart.n,
      dataNeeded: 30,
      confidence: tChart.n >= 30 ? "medium" : "low",
      tone: "purple",
    });
  }

  // 5. 불순물 — Fe vs 도가니 (관리한계는 새 도가니 1~5회째 구간으로 계산)
  const fe = elementChart(ds, "Fe");
  const feOver = fe.points.filter((p) => p.overSpec);
  const firstOoc = fe.points.find((p) => p.outOfControl);
  const firstOver = feOver[0];
  const batchesBefore = firstOoc && firstOver ? firstOver.index - firstOoc.index : 0;
  const holdCount = ds.rolls.filter((r) => r.status === "hold").length;
  out.push({
    id: "fe-crucible",
    kpi: "불순물",
    title: firstOoc && batchesBefore > 0
      ? `관리도는 Fe 규격 초과 ${batchesBefore}배치 전에 알렸다`
      : "Fe 규격 초과 — 관리도 기준선을 먼저 세워야 한다",
    finding: `기준(${fe.baselineN}잉곳) 평균 ${round(fe.mean, 1)}ppm, 관리상한 ${round(fe.ucl, 1)}ppm. ${firstOoc ? `${firstOoc.label}(${firstOoc.value}ppm)에 처음 관리한계 이탈` : "이탈 없음"}${firstOver ? ` → ${firstOver.label}(${firstOver.value}ppm)에 규격 50ppm 초과` : ""}. 외주 ICP 회신 12일 사이에 롤 ${holdCount}개가 이미 만들어져 전부 홀드`,
    action: "도가니 교체 주기를 5회로 앞당기고, 관리한계 이탈 배치는 「분석 결과 전 압연 금지」",
    method: "원소별 I-MR 관리도에 소모품 사용 횟수를 주석으로",
    dataNow: fe.n,
    dataNeeded: 25,
    confidence: feOver.length ? "high" : "medium",
    tone: "rose",
  });

  // 6. 납기
  const byCustomer = otdByCustomer(ds);
  const worstCustomer = byCustomer.reduce((a, b) => (b.rate < a.rate ? b : a), byCustomer[0]);
  const overall = otdByWeek(ds);
  const overallRate = overall.reduce((a, p) => a + p.onTime, 0) / Math.max(1, overall.reduce((a, p) => a + p.shipments, 0));
  out.push({
    id: "otd",
    kpi: "납기",
    title: `납기 준수율 ${round(overallRate * 100, 0)}% — 「${worstCustomer.customer}」 이 가장 낮다`,
    finding: `${worstCustomer.customer} 준수율 ${round(worstCustomer.rate * 100, 0)}% (${worstCustomer.onTime}/${worstCustomer.shipments}). 수주→출하 평균 ${round(mean(overall.map((p) => p.avgLeadDays ?? 0)), 1)}일 vs 약속 14일`,
    action: "수주·약속·출하 세 날짜만으로 매주 갱신. 잉곳 재고 일수와 함께 보면 착수 지연인지 압연 지연인지 갈린다",
    method: "리드타임 런차트 + 고객별 표 (모델 불필요)",
    dataNow: ds.shipments.filter((s) => s.shippedAt).length,
    dataNeeded: 20,
    confidence: "high",
    tone: "emerald",
  });

  // 7. 환경 — 노점 이탈과 클레임
  const excursions = mothers.filter((r) => r.dewPointC !== null && r.dewPointC > -45);
  const claimNc = ds.nonconformances.filter((n) => n.type === "claim" && n.reasonCode === "SURF-DISC");
  out.push({
    id: "dew-point",
    kpi: "환경",
    title: "노점 −45℃ 초과 작업분에서 표면 변색 클레임",
    finding: `노점 이탈 기록 롤 ${excursions.length}개 중 클레임 연결 ${claimNc.length}건. 노점 결측 롤 ${mothers.filter((r) => r.dewPointC === null).length}개는 판단 불가`,
    action: "노점 −45℃ 초과 시 작업 중단 규칙 + 노점 결측 0 을 첫 목표로",
    method: "노점 × 노출 시간 산점도에 클레임 로트 표시 (로트 200개 이후 로지스틱)",
    dataNow: mothers.filter((r) => r.dewPointC !== null).length,
    dataNeeded: 200,
    confidence: claimNc.length ? "medium" : "low",
    tone: "amber",
  });

  return out;
}

// ---- 9. 상단 요약 ----

export type HeadlineStats = {
  motherRolls: number;
  slitRolls: number;
  tearFreeRate: number;
  avgThicknessSdUm: number | null;
  otdRate: number | null;
  openNc: number;
  holdRolls: number;
  weeks: number;
};

export function headlineStats(ds: Dataset): HeadlineStats {
  const mothers = motherRolls(ds);
  const sds = mothers.map(rollThicknessSdUm).filter((v): v is number => v !== null);
  const otd = otdByWeek(ds);
  const shipped = otd.reduce((a, p) => a + p.shipments, 0);
  const onTime = otd.reduce((a, p) => a + p.onTime, 0);
  return {
    motherRolls: mothers.length,
    slitRolls: ds.rolls.filter((r) => r.stage === "slit").length,
    tearFreeRate: mothers.length ? mothers.filter((r) => r.tearCount === 0).length / mothers.length : 0,
    avgThicknessSdUm: sds.length ? round(mean(sds), 2) : null,
    otdRate: shipped ? onTime / shipped : null,
    openNc: ds.nonconformances.filter((n) => !n.closedAt).length,
    holdRolls: ds.rolls.filter((r) => r.status === "hold").length,
    weeks: 12,
  };
}
