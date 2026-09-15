// 가상 시드 데이터 생성기 — 결정적(seeded PRNG)이라 새로고침해도 같은 데이터가 나온다.
// 12주 동안 정제 배치 12건 → 잉곳 12개 → 모 롤 36개 → 슬릿 롤 72개 → 출하 24건.
// 일부러 심어 둔 이야기: (1) 도가니 6회째부터 Fe 상승, 8회에서 규격 초과 → 홀드
// (2) 필름 재사용 5회 이상에서 파단 증가 (3) 레시피 C 시험분의 두께 편차 (4) 노점 이탈 → 표면 변색 클레임

import {
  ICP_ELEMENTS,
  LI_DENSITY_G_CM3,
  type Dataset,
  type IcpElement,
  type IcpResult,
  type Ingot,
  type MaterialLot,
  type NonConformance,
  type Recipe,
  type RefineBatch,
  type Roll,
  type RollLogInput,
  type Shipment,
  type SurfaceGrade,
} from "./types";

export const DEMO_AS_OF = "2026-09-11";
const FIRST_WEEK_MONDAY = "2026-06-22";
const WEEKS = 12;

type Rng = {
  next: () => number;
  normal: (mean: number, sd: number) => number;
  int: (min: number, max: number) => number;
  poisson: (lambda: number) => number;
};

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function createRng(seed: number): Rng {
  const next = mulberry32(seed);
  const normal = (mean: number, sd: number) => {
    // Box–Muller
    const u = Math.max(next(), 1e-12);
    const v = next();
    return mean + sd * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  const int = (min: number, max: number) => min + Math.floor(next() * (max - min + 1));
  const poisson = (lambda: number) => {
    const limit = Math.exp(-lambda);
    let k = 0;
    let p = 1;
    do {
      k += 1;
      p *= next();
    } while (p > limit);
    return k - 1;
  };
  return { next, normal, int, poisson };
}

// ---- 날짜 유틸 (UTC 기준으로 계산해 실행 환경 시간대와 무관하게 만든다) ----

function toUtc(dateStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

function fromUtc(ms: number): string {
  return new Date(ms).toISOString().slice(0, 10);
}

export function addDays(dateStr: string, days: number): string {
  return fromUtc(toUtc(dateStr) + days * 86_400_000);
}

export function diffDays(a: string, b: string): number {
  return Math.round((toUtc(a) - toUtc(b)) / 86_400_000);
}

function yymmdd(dateStr: string): string {
  return dateStr.slice(2).replace(/-/g, "");
}

function yymm(dateStr: string): string {
  return dateStr.slice(2, 7).replace("-", "");
}

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** YYYY-MM-DD 두 개 중 이른 날짜 */
function minDate(a: string, b: string): string {
  return a < b ? a : b;
}

function pad3(n: number): string {
  return String(n).padStart(3, "0");
}

function at(dateStr: string, hour: number, minute = 0): string {
  return `${dateStr}T${pad2(hour)}:${pad2(minute)}:00+09:00`;
}

function round(v: number, digits: number): number {
  const f = 10 ** digits;
  return Math.round(v * f) / f;
}

// ---- 마스터 ----

const RECIPES: Recipe[] = [
  { id: "RCP-P1", kind: "refine", name: "정제 표준", note: "전해식 산소 제거 — 전압·시간은 보안 스키마" },
  { id: "RCP-A", kind: "rolling", name: "압연 표준 (6패스)", note: "기준 레시피" },
  { id: "RCP-B", kind: "rolling", name: "압연 저패스 (5패스)", note: "장력 조정판 — 5주차부터 병행" },
  { id: "RCP-C", kind: "rolling", name: "압연 시험 (4패스 고압하)", note: "9주차부터 시험 — 파단·편차 관찰 중" },
];

const OPERATORS = ["김OO", "이OO", "박OO"];
const CUSTOMERS = ["고객 A (셀 제조사)", "고객 B (연구소)", "고객 C (전고체 개발사)"];
const ICP_LAB = "외주 분석기관 1";
const ICP_LOD_PPM = 5;

const ROLLING_RECIPE_BY_WEEK: string[][] = [
  ["RCP-A", "RCP-A", "RCP-A"],
  ["RCP-A", "RCP-A", "RCP-A"],
  ["RCP-A", "RCP-A", "RCP-A"],
  ["RCP-A", "RCP-A", "RCP-A"],
  ["RCP-A", "RCP-B", "RCP-A"],
  ["RCP-B", "RCP-A", "RCP-B"],
  ["RCP-A", "RCP-B", "RCP-B"],
  ["RCP-B", "RCP-A", "RCP-B"],
  ["RCP-C", "RCP-B", "RCP-C"],
  ["RCP-B", "RCP-C", "RCP-B"],
  ["RCP-C", "RCP-B", "RCP-C"],
  ["RCP-B", "RCP-C", "RCP-B"],
];

const PASS_COUNT: Record<string, number> = { "RCP-A": 6, "RCP-B": 5, "RCP-C": 4 };
const AREAL_SD: Record<string, number> = { "RCP-A": 0.14, "RCP-B": 0.09, "RCP-C": 0.26 };
const AREAL_BIAS: Record<string, number> = { "RCP-A": 0, "RCP-B": 0, "RCP-C": 0.1 };
const TEAR_EFFECT: Record<string, number> = { "RCP-A": 0.05, "RCP-B": 0, "RCP-C": 0.9 };

/** 노점 이탈을 심어 둘 위치 — [주차, 모 롤 순번] */
const DEW_POINT_EXCURSIONS: Array<[number, number, number]> = [
  [5, 1, -41],
  [9, 0, -39],
];

// ---- 생성 ----

export function createDemoDataset(seed = 20260911): Dataset {
  const rng = createRng(seed);

  const feedLots: MaterialLot[] = [
    { id: "RM-2606-001", type: "lithium_feed", origin: "purchased", supplier: "리튬 공급사 A", receivedAt: "2026-06-19", massKg: 60, coaAttached: true },
    { id: "RM-2607-002", type: "lithium_feed", origin: "purchased", supplier: "리튬 공급사 A", receivedAt: "2026-07-17", massKg: 60, coaAttached: true },
    { id: "RM-2608-003", type: "lithium_feed", origin: "purchased", supplier: "리튬 공급사 B", receivedAt: "2026-08-14", massKg: 60, coaAttached: true },
    { id: "RM-2607-004", type: "lithium_feed", origin: "internal_scrap", supplier: "자사 트림 회수", receivedAt: "2026-07-24", massKg: 12, coaAttached: false },
  ];
  const filmLots: MaterialLot[] = [
    { id: "RM-2606-101", type: "release_film", origin: "purchased", supplier: "필름 공급사", receivedAt: "2026-06-18", massKg: null, coaAttached: true },
    { id: "RM-2607-102", type: "release_film", origin: "purchased", supplier: "필름 공급사", receivedAt: "2026-07-16", massKg: null, coaAttached: true },
    { id: "RM-2608-103", type: "release_film", origin: "purchased", supplier: "필름 공급사", receivedAt: "2026-08-13", massKg: null, coaAttached: true },
  ];
  const otherLots: MaterialLot[] = [
    { id: "RM-2606-201", type: "rolling_oil", origin: "purchased", supplier: "윤활유 공급사", receivedAt: "2026-06-18", massKg: 20, coaAttached: true },
    { id: "RM-2606-301", type: "argon", origin: "purchased", supplier: "가스 공급사", receivedAt: "2026-06-18", massKg: null, coaAttached: false },
  ];

  const batches: RefineBatch[] = [];
  const ingots: Ingot[] = [];
  const rolls: Roll[] = [];
  const shipments: Shipment[] = [];
  const nonconformances: NonConformance[] = [];

  let ncSeq = 0;
  const nextNcId = () => `NC-2026-${pad3(++ncSeq)}`;

  const filmReuseCounter: Record<string, number> = {};
  let claimDewRollId: string | null = null;
  let claimThicknessRollId: string | null = null;

  for (let w = 0; w < WEEKS; w += 1) {
    const monday = addDays(FIRST_WEEK_MONDAY, 7 * w);
    const feed = w < 4 ? feedLots[0] : w < 8 ? feedLots[1] : feedLots[2];
    const useScrap = w === 5 || w === 7 || w === 9;
    const inputLotIds = useScrap ? [feed.id, feedLots[3].id] : [feed.id];
    const crucibleUseCount = w < 8 ? w + 1 : w - 7; // 8회 사용 뒤 교체
    const castAt = addDays(monday, 1);
    const ingotId = `ING-${yymmdd(castAt)}-01`;
    const filmLot = w < 4 ? filmLots[0] : w < 8 ? filmLots[1] : filmLots[2];

    // 이번 주 모 롤 3개를 먼저 정한다 — 잉곳 크기를 압연 투입량에 맞추기 위해
    type MotherPlan = {
      recipeId: string;
      filmReuseCount: number;
      passCount: number;
      tearCount: number;
      lostLengthM: number;
      trimM: number;
      headTailM: number;
      goodLengthM: number;
      billetG: number;
    };
    const plans: MotherPlan[] = [];
    for (let m = 0; m < 3; m += 1) {
      const recipeId = ROLLING_RECIPE_BY_WEEK[w][m];
      filmReuseCounter[filmLot.id] = ((filmReuseCounter[filmLot.id] ?? 0) % 6) + 1;
      const filmReuseCount = filmReuseCounter[filmLot.id];
      const passCount = PASS_COUNT[recipeId] + (rng.next() < 0.2 ? 1 : 0);
      const tearLambda = 0.12 + (filmReuseCount >= 3 ? 0.18 * (filmReuseCount - 2) : 0) + TEAR_EFFECT[recipeId];
      const tearCount = Math.min(4, rng.poisson(tearLambda));
      let lostLengthM = 0;
      for (let t = 0; t < tearCount; t += 1) lostLengthM += rng.int(6, 18);
      const trimM = rng.int(4, 10);
      const headTailM = rng.int(15, 25);
      const goodLengthM = Math.max(120, 210 - lostLengthM - trimM);
      // 압연 폭 320mm → 에지 트림 후 300mm. 투입 리튬 = 전체 압연 길이 × 320mm × 목표 면밀도
      const rolledLengthM = goodLengthM + lostLengthM + trimM + headTailM;
      const billetG = round(0.32 * rolledLengthM * 10 * LI_DENSITY_G_CM3, 0);
      plans.push({ recipeId, filmReuseCount, passCount, tearCount, lostLengthM, trimM, headTailM, goodLengthM, billetG });
    }
    const drawKg = plans.reduce((a, p) => a + p.billetG, 0) / 1000;

    // 정제 배치 — 잉곳 잔량(재고)이 투입분의 5~12% 남도록 투입량을 정한다
    const drossKg = 0.05;
    const refineYield = rng.normal(0.925, 0.012);
    const ingotTargetKg = drawKg * (1.05 + rng.next() * 0.07);
    const inputKg = round((ingotTargetKg + drossKg) / 0.925 / 0.05, 0) * 0.05 + (useScrap ? 0.2 : 0);
    const outputKg = round(inputKg * refineYield, 2);

    const batch: RefineBatch = {
      id: `B-LI-${yymmdd(monday)}-01`,
      inputLotIds,
      inputKg: round(inputKg, 2),
      outputKg,
      method: "electro",
      recipeId: "RCP-P1",
      crucibleUseCount,
      startedAt: at(monday, 9),
      endedAt: at(monday, 15, 30),
      operator: OPERATORS[w % OPERATORS.length],
    };
    batches.push(batch);

    // 잉곳 — 드로스 제거
    const feedIsB = feed.id === "RM-2608-003";
    const drift = Math.max(0, crucibleUseCount - 5);
    const icpBase: Record<IcpElement, number> = {
      Na: feedIsB ? 112 : 62,
      K: feedIsB ? 78 : 41,
      Ca: 82,
      // 도가니 6회째부터 서서히, 8회째엔 규격(50ppm) 을 확실히 넘는다
      Fe: 20 + 9 * drift + (crucibleUseCount >= 8 ? 20 : 0),
      Ni: 9 + 3 * drift,
      Cr: 4 + 1.2 * drift,
      Si: 31,
    };
    const icp: IcpResult[] = ICP_ELEMENTS.map((element) => {
      const raw = Math.max(0, rng.normal(icpBase[element], icpBase[element] * 0.06));
      const belowLod = raw < ICP_LOD_PPM;
      return {
        element,
        valuePpm: belowLod ? ICP_LOD_PPM : round(raw, 1),
        qualifier: belowLod ? "<" : "=",
        lab: ICP_LAB,
        reportedAt: addDays(castAt, 12),
      };
    });
    const ingot: Ingot = {
      id: ingotId,
      batchId: batch.id,
      castAt,
      massKg: round(Math.max(outputKg - drossKg, drawKg), 2),
      densityGcm3: round(rng.normal(0.534, 0.002), 3),
      appearanceOk: true,
      icp,
    };
    ingots.push(ingot);

    const feOver = icp.find((r) => r.element === "Fe")!.valuePpm > 50;
    if (feOver) {
      nonconformances.push({
        id: nextNcId(),
        type: "internal",
        targetType: "ingot",
        targetId: ingotId,
        reasonCode: "IMP-FE",
        description: `Fe ${icp.find((r) => r.element === "Fe")!.valuePpm}ppm — 규격 50ppm 초과. 도가니 ${crucibleUseCount}회째. 해당 롤 출하 보류`,
        openedAt: addDays(castAt, 12),
        closedAt: null,
      });
    }

    // 모 롤 3개 → 슬릿 롤 6개
    const weekSlitRolls: Roll[] = [];

    for (let m = 0; m < 3; m += 1) {
      const day = addDays(monday, 2 + m);
      const { recipeId, filmReuseCount, passCount, tearCount, lostLengthM, goodLengthM, billetG } = plans[m];

      const targetThicknessUm = 10;
      const targetAreal = targetThicknessUm * LI_DENSITY_G_CM3;
      const center = targetAreal + AREAL_BIAS[recipeId] + rng.normal(0, 0.06);
      const sd = AREAL_SD[recipeId];
      const arealMissing = rng.next() < 0.05;
      const areal: [number, number, number] | null = arealMissing
        ? null
        : [round(rng.normal(center, sd), 2), round(rng.normal(center, sd), 2), round(rng.normal(center, sd), 2)];

      const excursion = DEW_POINT_EXCURSIONS.find(([ew, em]) => ew === w && em === m);
      const dewMissing = !excursion && rng.next() < 0.1;
      const dewPointC = excursion ? excursion[2] : dewMissing ? null : round(rng.normal(-55, 2), 1);

      let surfaceGrade: SurfaceGrade = "A";
      if (dewPointC !== null && dewPointC > -45) surfaceGrade = filmReuseCount >= 5 ? "C" : "B";
      else if (filmReuseCount >= 5 && rng.next() < 0.4) surfaceGrade = "B";

      const widthMm = 300;
      const arealMean = areal ? (areal[0] + areal[1] + areal[2]) / 3 : targetAreal;
      const liMassG = (widthMm / 1000) * goodLengthM * arealMean;
      const tareG = 2100 + rng.int(-50, 50);

      const motherId = `R-${ingotId}-M-${pad2(m + 1)}`;
      const mother: Roll = {
        id: motherId,
        parentRollId: null,
        ingotId,
        stage: "mother",
        widthMm,
        targetThicknessUm,
        recipeId,
        passCount,
        filmLotId: filmLot.id,
        filmReuseCount,
        tearCount,
        lostLengthM,
        goodLengthM,
        billetG,
        grossG: round(tareG + liMassG, 0),
        tareG,
        dewPointC,
        startedAt: at(day, 9),
        endedAt: at(day, 13 + tearCount),
        arealDensityGm2: areal,
        surfaceGrade: rng.next() < 0.03 ? null : surfaceGrade,
        operator: OPERATORS[(w + m) % OPERATORS.length],
        status: feOver ? "hold" : "released",
        entryMode: "seed",
      };
      rolls.push(mother);
      if (excursion && w === 5) claimDewRollId = motherId;
      if (recipeId === "RCP-C" && w === 10) claimThicknessRollId = motherId;

      for (let s = 0; s < 2; s += 1) {
        const slitGood = goodLengthM - rng.int(2, 6);
        const slitAreal: [number, number, number] | null = areal
          ? [round(areal[0] + rng.normal(0, 0.02), 2), round(areal[1] + rng.normal(0, 0.02), 2), round(areal[2] + rng.normal(0, 0.02), 2)]
          : null;
        const slitMean = slitAreal ? (slitAreal[0] + slitAreal[1] + slitAreal[2]) / 3 : targetAreal;
        const slitTare = 1050 + rng.int(-30, 30);
        const slit: Roll = {
          id: `R-${ingotId}-S-${pad2(m * 2 + s + 1)}`,
          parentRollId: motherId,
          ingotId,
          stage: "slit",
          widthMm: 150,
          targetThicknessUm,
          recipeId,
          passCount: 0,
          filmLotId: filmLot.id,
          filmReuseCount: null,
          tearCount: 0,
          lostLengthM: 0,
          goodLengthM: slitGood,
          billetG: 0,
          grossG: round(slitTare + 0.15 * slitGood * slitMean, 0),
          tareG: slitTare,
          dewPointC,
          startedAt: at(day, 14 + tearCount),
          endedAt: at(day, 15 + tearCount),
          arealDensityGm2: slitAreal,
          surfaceGrade: mother.surfaceGrade,
          operator: mother.operator,
          status: feOver ? "hold" : "released",
          entryMode: "seed",
        };
        rolls.push(slit);
        weekSlitRolls.push(slit);
      }
    }

    // 출하 2건 — 슬릿 롤 3개씩. Fe 초과 주는 홀드(미출하), 마지막 주는 진행 중
    for (let k = 0; k < 2; k += 1) {
      const group = weekSlitRolls.slice(k * 3, k * 3 + 3);
      const orderDate = addDays(monday, -rng.int(3, 8));
      const promisedDate = addDays(orderDate, 14);
      const isLastWeek = w === WEEKS - 1;
      const shippedAt = feOver || isLastWeek ? null : addDays(monday, 6 + rng.int(-2, 4));
      const shipment: Shipment = {
        id: `SH-${yymmdd(addDays(monday, 6))}-${pad2(k + 1)}`,
        customer: CUSTOMERS[(w * 2 + k) % CUSTOMERS.length],
        orderDate,
        promisedDate,
        shippedAt,
        rollIds: group.map((r) => r.id),
        verdict: shippedAt ? "accepted" : "pending",
        claimReason: null,
      };
      if (shippedAt) group.forEach((r) => (r.status = "shipped"));
      shipments.push(shipment);
    }
  }

  // 클레임 2건 — 심어 둔 원인 롤이 들어간 출하에 붙인다
  const attachClaim = (motherRollId: string | null, reasonCode: string, reason: string) => {
    if (!motherRollId) return;
    const slitIds = rolls.filter((r) => r.parentRollId === motherRollId).map((r) => r.id);
    const shipment = shipments.find((s) => s.shippedAt && s.rollIds.some((id) => slitIds.includes(id)));
    if (!shipment) return;
    shipment.verdict = "claim";
    shipment.claimReason = reason;
    nonconformances.push({
      id: nextNcId(),
      type: "claim",
      targetType: "shipment",
      targetId: shipment.id,
      reasonCode,
      description: `${shipment.customer} — ${reason}`,
      // 기준일(asOf)보다 뒤에 접수된 클레임이 생기지 않게 자른다
      openedAt: minDate(addDays(shipment.shippedAt!, 9), DEMO_AS_OF),
      closedAt: null,
    });
  };
  attachClaim(claimDewRollId, "SURF-DISC", "표면 변색(검은 반점) — 작업 당일 노점 이탈 기록과 일치, 수분 노출 의심");
  attachClaim(claimThicknessRollId, "THK-DEV", "두께 편차 규격 초과 — RCP-C 시험 롤, 면밀도 3점 산포 큼");

  nonconformances.push({
    id: nextNcId(),
    type: "safety",
    targetType: "batch",
    targetId: batches[3].id,
    reasonCode: "SAF-AR",
    description: "아차사고 — 글러브박스 반입 시 Ar 퍼지 미실시, 작업 전 발견. 체크리스트 항목 추가",
    openedAt: addDays(FIRST_WEEK_MONDAY, 22),
    closedAt: addDays(FIRST_WEEK_MONDAY, 29),
  });

  return {
    asOf: DEMO_AS_OF,
    materialLots: [...feedLots, ...filmLots, ...otherLots],
    batches,
    ingots,
    rolls,
    shipments,
    nonconformances,
    recipes: RECIPES,
  };
}

/** 롤 일지 입력 → 모 롤 1개. id 는 같은 잉곳의 다음 순번 */
export function rollFromInput(dataset: Dataset, input: RollLogInput): Roll {
  const siblings = dataset.rolls.filter((r) => r.ingotId === input.ingotId && r.stage === "mother");
  const seq = siblings.length + 1;
  const arealMean = input.arealDensityGm2
    ? (input.arealDensityGm2[0] + input.arealDensityGm2[1] + input.arealDensityGm2[2]) / 3
    : 10 * LI_DENSITY_G_CM3;
  const tareG = 2100;
  const liMassG = (input.widthMm / 1000) * input.goodLengthM * arealMean;
  // 투입 리튬 추정 — 에지 트림 20mm·헤드/테일 20m 가정
  const billetG = round(((input.widthMm + 20) / 1000) * (input.goodLengthM + input.lostLengthM + 20) * arealMean, 0);
  const day = dataset.asOf;
  // 불순물 부적합이 열려 있는 잉곳에서 나온 롤은 판정 전까지 출하 보류 — 화면 안내와 상태를 맞춘다
  const ingotOnHold = dataset.nonconformances.some(
    (n) => n.targetType === "ingot" && n.targetId === input.ingotId && n.reasonCode.startsWith("IMP-") && !n.closedAt,
  );
  return {
    id: `R-${input.ingotId}-M-${pad2(seq)}`,
    parentRollId: null,
    ingotId: input.ingotId,
    stage: "mother",
    widthMm: input.widthMm,
    targetThicknessUm: 10,
    recipeId: input.recipeId,
    passCount: input.passCount,
    filmLotId: input.filmLotId,
    filmReuseCount: input.filmReuseCount,
    tearCount: input.tearCount,
    lostLengthM: input.lostLengthM,
    goodLengthM: input.goodLengthM,
    billetG,
    grossG: round(tareG + liMassG, 0),
    tareG,
    dewPointC: input.dewPointC,
    startedAt: at(day, 9),
    endedAt: at(day, 13),
    arealDensityGm2: input.arealDensityGm2,
    surfaceGrade: input.surfaceGrade,
    operator: input.operator,
    status: ingotOnHold ? "hold" : "in_process",
    entryMode: "user",
  };
}

export { yymm as formatYymm };
