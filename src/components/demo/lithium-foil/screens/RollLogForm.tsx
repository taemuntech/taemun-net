"use client";

// 롤 일지 입력 화면 — 현장 태블릿용. 「롤 1개 = 화면 1장, 10칸 이내, 자유 텍스트 없이 선택·숫자」.
// 저장하면 DemoDataContext 에 모 롤이 하나 늘어, KPI·관리도·계보가 같은 데이터로 즉시 다시 계산된다.

import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import {
  BarChart3,
  CircleCheck,
  Database,
  GitBranch,
  Info,
  Minus,
  OctagonAlert,
  Plus,
  RotateCcw,
  Save,
  TriangleAlert,
  Wand2,
} from "lucide-react";
import {
  arealToThicknessUm,
  completionByFilmReuse,
  ingotRemainingKg,
  motherRolls,
  rollThicknessSdUm,
  rollThicknessUm,
  thicknessSdChart,
} from "@/lib/demo/lithium-foil/metrics";
import { estimateBilletG } from "@/lib/demo/lithium-foil/seed";
import type { Dataset, Roll, RollLogInput, SurfaceGrade } from "@/lib/demo/lithium-foil/types";
import { useDemoData } from "../DemoDataContext";
import {
  Badge,
  Callout,
  Card,
  CardHeader,
  GLOSSARY,
  SCROLL_MARGIN,
  STICKY_TOP_LG,
  TONE,
  fmtNum,
  fmtPct,
  fmtShortDate,
  radioKeyNav,
} from "../ui";
import type { RollLogFormProps } from "./types";

// ---- 상수 ----

const OPERATOR_OPTIONS = ["김OO", "이OO", "박OO", "데모 사용자"];
const FILM_REUSE_MIN = 1;
const FILM_REUSE_MAX = 8;
const FILM_REUSE_WARN = 5;
const TEAR_MAX = 5;
const DEW_STOP_C = -45;
const DEFAULT_WIDTH_MM = "300";
const AREAL_LABELS = ["좌", "중", "우"] as const;

const INPUT_CLASS =
  "w-full min-h-10 bg-gray-950 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-indigo-500 outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 aria-[invalid=true]:border-rose-500/60 disabled:opacity-40 disabled:cursor-not-allowed";

// ---- 폼 상태 ----

type FormState = {
  ingotId: string;
  recipeId: string;
  passCount: number;
  filmLotId: string;
  filmReuseCount: number;
  /** 노점은 영하만 — 절댓값 숫자로 받는다(태블릿 숫자 키패드엔 − 가 없는 경우가 많다) */
  dewAbs: string;
  tearCount: number;
  lostLengthM: string;
  goodLengthM: string;
  widthMm: string;
  areal: [string, string, string];
  surfaceGrade: SurfaceGrade | null;
  operator: string;
};

const EMPTY_FORM: FormState = {
  ingotId: "",
  recipeId: "",
  passCount: 5,
  filmLotId: "",
  filmReuseCount: 1,
  dewAbs: "",
  tearCount: 0,
  lostLengthM: "",
  goodLengthM: "",
  widthMm: DEFAULT_WIDTH_MM,
  areal: ["", "", ""],
  surfaceGrade: null,
  operator: "",
};

type FieldKey = "ingot" | "stock" | "recipe" | "film" | "dew" | "lost" | "good" | "width" | "areal" | "operator";
type FieldErrors = Partial<Record<FieldKey, string>>;

/** 저장 실패 시 포커스를 옮길 순서 — 화면 위에서 아래 */
const FIELD_ORDER: FieldKey[] = ["ingot", "stock", "recipe", "film", "dew", "lost", "good", "width", "areal", "operator"];

type NumParse = { state: "empty" } | { state: "invalid"; comma?: boolean } | { state: "ok"; value: number };

/**
 * 숫자 입력 해석.
 * - length(길이·폭): 천 단위 쉼표(1,200)만 천 단위로 읽고, 그 밖의 쉼표는 오류 — 「1,200」을 1.2 로 조용히 읽지 않는다
 * - decimal(면밀도·노점): 소수점 쉼표 하나(5,34)는 소수점으로 읽는다
 */
function parseNum(raw: string, mode: "length" | "decimal" = "decimal"): NumParse {
  let s = raw.trim();
  if (s === "") return { state: "empty" };
  if (mode === "length") {
    if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(s)) s = s.replace(/,/g, "");
    else if (s.includes(",")) return { state: "invalid", comma: true };
  } else if (/^\d+,\d+$/.test(s)) {
    s = s.replace(",", ".");
  }
  if (!/^\d+(\.\d+)?$/.test(s) && !/^\d+\.$/.test(s)) return { state: "invalid" };
  const value = Number(s);
  return Number.isFinite(value) ? { state: "ok", value } : { state: "invalid" };
}

function invalidMessage(p: NumParse, example: string): string {
  return p.state === "invalid" && p.comma ? `쉼표 없이 숫자만 입력하세요. 예: ${example}` : `숫자만 입력하세요. 예: ${example}`;
}

/** 노점 입력 — 앞에 − 를 붙여 적어도 받아 준다 */
function parseDew(raw: string): NumParse {
  return parseNum(raw.trim().replace(/^[-−]/, ""), "decimal");
}

function sampleSd(values: number[]): number {
  if (values.length < 2) return 0;
  const m = values.reduce((a, b) => a + b, 0) / values.length;
  return Math.sqrt(values.reduce((acc, v) => acc + (v - m) ** 2, 0) / (values.length - 1));
}

function round2(v: number): number {
  return Math.round(v * 100) / 100;
}

/** "압연 표준 (6패스)" → 6 */
function recommendedPass(name: string): number | null {
  const m = name.match(/(\d+)\s*패스/);
  return m ? Number(m[1]) : null;
}

function recipeLetter(recipeId: string): string {
  return recipeId.replace(/^RCP-/, "");
}

type Validation = {
  errors: FieldErrors;
  /** 필수인데 아직 올바르게 채워지지 않은 칸 수 */
  missingRequired: number;
  input: RollLogInput | null;
  /** 면밀도 세 점이 모두 올바를 때만 */
  arealValues: [number, number, number] | null;
  dewPointC: number | null;
};

type ValidateContext = {
  /** 잉곳별 남은 리튬(kg) */
  remainingKg: Map<string, number>;
};

function validate(form: FormState, ctx: ValidateContext): Validation {
  const errors: FieldErrors = {};
  let missingRequired = 0;

  if (!form.ingotId) {
    errors.ingot = "잉곳을 선택하세요.";
    missingRequired += 1;
  }
  if (!form.recipeId) {
    errors.recipe = "압연 레시피를 선택하세요.";
    missingRequired += 1;
  }
  if (!form.filmLotId) {
    errors.film = "이형 필름 로트를 선택하세요.";
    missingRequired += 1;
  }
  if (!form.operator) {
    errors.operator = "작업자를 선택하세요.";
    missingRequired += 1;
  }

  // 노점 — 비워 둘 수 있다(결측으로 기록)
  let dewPointC: number | null = null;
  const dew = parseDew(form.dewAbs);
  if (dew.state === "invalid") errors.dew = "숫자만 입력하세요. 예: 55 → −55℃";
  else if (dew.state === "ok") {
    if (dew.value > 90) errors.dew = "−90 ~ 0℃ 사이로 입력하세요.";
    else dewPointC = dew.value === 0 ? 0 : -round2(dew.value);
  }

  // 파단 손실 — 파단 0 이면 0
  let lostLengthM = 0;
  if (form.tearCount > 0) {
    const lost = parseNum(form.lostLengthM, "length");
    if (lost.state === "empty") {
      errors.lost = "파단이 있으면 손실 길이를 입력하세요.";
      missingRequired += 1;
    } else if (lost.state === "invalid") {
      errors.lost = invalidMessage(lost, "12");
      missingRequired += 1;
    } else if (lost.value < 1 || lost.value > 500) {
      errors.lost = "1 ~ 500m 사이로 입력하세요.";
      missingRequired += 1;
    } else lostLengthM = round2(lost.value);
  }

  let goodLengthM = 0;
  const good = parseNum(form.goodLengthM, "length");
  if (good.state === "empty") {
    errors.good = "양품 길이를 입력하세요.";
    missingRequired += 1;
  } else if (good.state === "invalid") {
    errors.good = invalidMessage(good, "195");
    missingRequired += 1;
  } else if (good.value < 1 || good.value > 2000) {
    errors.good = "1 ~ 2000m 사이로 입력하세요.";
    missingRequired += 1;
  } else goodLengthM = round2(good.value);

  let widthMm = 0;
  const width = parseNum(form.widthMm, "length");
  if (width.state === "empty") {
    errors.width = "폭을 입력하세요.";
    missingRequired += 1;
  } else if (width.state === "invalid") {
    errors.width = invalidMessage(width, "300");
    missingRequired += 1;
  } else if (width.value < 50 || width.value > 1000) {
    errors.width = "50 ~ 1000mm 사이로 입력하세요.";
    missingRequired += 1;
  } else widthMm = round2(width.value);

  // 면밀도 3점 — 셋 다 비우거나 셋 다 채운다
  let arealValues: [number, number, number] | null = null;
  const parsedAreal = form.areal.map((a) => parseNum(a, "decimal"));
  const filled = parsedAreal.filter((p) => p.state !== "empty").length;
  if (parsedAreal.some((p) => p.state === "invalid")) errors.areal = "숫자만 입력하세요. 예: 5.34";
  else if (filled > 0 && filled < 3) errors.areal = `세 점을 모두 입력하거나 모두 비워 두세요. (${filled}/3 입력됨)`;
  else if (filled === 3) {
    const vals = parsedAreal.map((p) => (p.state === "ok" ? p.value : 0));
    if (vals.some((v) => v < 1 || v > 20)) errors.areal = "1 ~ 20 g/m² 사이로 입력하세요. 두께 10µm 는 약 5.34 g/m² 입니다.";
    else arealValues = [round2(vals[0]), round2(vals[1]), round2(vals[2])];
  }

  // 잉곳 잔량 — 길이·폭·면밀도가 다 맞게 들어왔을 때만 추정 투입량과 비교한다
  if (form.ingotId && !errors.lost && !errors.good && !errors.width && !errors.areal && goodLengthM > 0 && widthMm > 0) {
    const remaining = ctx.remainingKg.get(form.ingotId);
    const needKg = estimateBilletG({ widthMm, goodLengthM, lostLengthM, arealDensityGm2: arealValues }) / 1000;
    if (remaining !== undefined && needKg > remaining) {
      errors.stock = `잔량 부족 — 이 잉곳에 남은 리튬은 ${fmtNum(Math.max(0, remaining), 2)}kg 인데, 이 롤을 만들려면 약 ${fmtNum(needKg, 2)}kg 이 필요합니다. 잔량이 넉넉한 잉곳을 고르세요.`;
    }
  }

  const ok = Object.keys(errors).length === 0;
  const input: RollLogInput | null = ok
    ? {
        ingotId: form.ingotId,
        recipeId: form.recipeId,
        passCount: form.passCount,
        filmLotId: form.filmLotId,
        filmReuseCount: form.filmReuseCount,
        dewPointC,
        tearCount: form.tearCount,
        lostLengthM,
        goodLengthM,
        widthMm,
        arealDensityGm2: arealValues,
        surfaceGrade: form.surfaceGrade,
        operator: form.operator,
      }
    : null;

  return { errors, missingRequired, input, arealValues, dewPointC };
}

// ---- 경고 ----

type Warning = { tone: "amber" | "rose" | "gray"; text: string };

type WarningContext = {
  holdIngotIds: Set<string>;
  sdUcl: number;
};

function collectWarnings(
  v: { ingotId: string; recipeId: string; filmReuseCount: number; dewPointC: number | null; areal: [number, number, number] | null; grade: SurfaceGrade | null; tearCount: number },
  ctx: WarningContext,
): Warning[] {
  const out: Warning[] = [];
  if (v.dewPointC !== null && v.dewPointC > DEW_STOP_C) out.push({ tone: "rose", text: `노점 ${fmtNum(v.dewPointC, 1)}℃ — 작업 중단 기준(−45℃) 초과` });
  if (v.ingotId && ctx.holdIngotIds.has(v.ingotId)) out.push({ tone: "amber", text: `잉곳 ${v.ingotId} 출하 보류 중` });
  if (v.filmReuseCount >= FILM_REUSE_WARN) out.push({ tone: "amber", text: `이형 필름 재사용 ${v.filmReuseCount}회 — 파단 위험 구간` });
  if (v.areal) {
    const sd = sampleSd(v.areal.map(arealToThicknessUm));
    if (sd > ctx.sdUcl) out.push({ tone: "amber", text: `두께 3점 편차 ${fmtNum(sd, 2)}µm — 관리한계 ${fmtNum(ctx.sdUcl, 2)}µm 초과` });
  } else out.push({ tone: "gray", text: "면밀도 미측정 — 두께 관리도에서 빠짐" });
  if (v.dewPointC === null) out.push({ tone: "gray", text: "노점 결측으로 기록" });
  if (v.tearCount > 0) out.push({ tone: "amber", text: `파단 ${v.tearCount}회` });
  if (v.recipeId === "RCP-C") out.push({ tone: "gray", text: "시험 레시피 C — 파단·편차 관찰 대상" });
  if (v.grade === "C") out.push({ tone: "amber", text: "외관 C등급" });
  return out;
}

// ---- 작은 입력 조각 ----

function Field({
  label,
  htmlFor,
  hint,
  error,
  errorId,
  right,
  children,
  step,
}: {
  label: string;
  htmlFor?: string;
  hint?: ReactNode;
  error?: string;
  /** 입력의 aria-describedby 가 가리킬 id */
  errorId?: string;
  right?: ReactNode;
  children: ReactNode;
  step: number;
}) {
  return (
    <div className="min-w-0">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
        <label htmlFor={htmlFor} className="flex items-center gap-2 text-sm font-semibold text-gray-200 [word-break:keep-all]">
          <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-indigo-500/15 text-[11px] font-bold text-indigo-300">
            {step}
          </span>
          {label}
        </label>
        {right}
      </div>
      {children}
      {hint && <div className="mt-1.5 text-xs text-gray-500 leading-relaxed [word-break:keep-all]">{hint}</div>}
      {error && (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-rose-400 [word-break:keep-all]">
          {error}
        </p>
      )}
    </div>
  );
}

function SubLabel({ htmlFor, children }: { htmlFor?: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-xs text-gray-400 mb-1 [word-break:keep-all]">
      {children}
    </label>
  );
}

function Stepper({
  id,
  value,
  min,
  max,
  onChange,
  unit,
  label,
  disabled = false,
}: {
  id: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  unit: string;
  label: string;
  disabled?: boolean;
}) {
  const btn =
    "flex h-10 w-11 shrink-0 items-center justify-center rounded-lg text-gray-300 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors";
  return (
    <div
      className={`inline-flex items-center rounded-xl border border-white/10 bg-gray-950 p-0.5 ${disabled ? "opacity-50" : ""}`}
      role="group"
      aria-label={label}
    >
      <button type="button" className={btn} aria-label={`${label} 줄이기`} disabled={disabled || value <= min} onClick={() => onChange(Math.max(min, value - 1))}>
        <Minus size={16} />
      </button>
      <output id={id} aria-live="polite" className="min-w-14 px-1 text-center text-base font-bold text-white tabular-nums">
        {value}
        <span className="ml-0.5 text-xs font-medium text-gray-500">{unit}</span>
      </output>
      <button type="button" className={btn} aria-label={`${label} 늘리기`} disabled={disabled || value >= max} onClick={() => onChange(Math.min(max, value + 1))}>
        <Plus size={16} />
      </button>
    </div>
  );
}

function ChoiceGroup<T extends string>({
  id,
  value,
  options,
  onChange,
  ariaLabel,
  invalid = false,
  describedBy,
}: {
  id?: string;
  value: T;
  options: Array<{ value: T; label: string; sub?: string }>;
  onChange: (value: T) => void;
  ariaLabel: string;
  invalid?: boolean;
  describedBy?: string;
}) {
  const values = options.map((o) => o.value);
  const hasActive = values.includes(value);
  return (
    <div
      id={id}
      role="radiogroup"
      aria-label={ariaLabel}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className="flex flex-wrap gap-2"
    >
      {options.map((o, i) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active || (!hasActive && i === 0) ? 0 : -1}
            onClick={() => onChange(o.value)}
            onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => radioKeyNav(e, values, value, onChange)}
            className={`min-h-10 rounded-xl border px-3 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
              active
                ? "border-indigo-500 bg-indigo-600/90 text-white"
                : "border-white/10 bg-gray-950 text-gray-300 hover:border-white/20 hover:text-white"
            }`}
          >
            <span className="block text-sm font-semibold leading-tight">{o.label}</span>
            {o.sub && <span className={`block text-[11px] leading-tight mt-0.5 ${active ? "text-indigo-100" : "text-gray-500"}`}>{o.sub}</span>}
          </button>
        );
      })}
    </div>
  );
}

function WarningLine({ warning }: { warning: Warning }) {
  const Icon = warning.tone === "rose" ? OctagonAlert : warning.tone === "amber" ? TriangleAlert : Info;
  return (
    <li className={`flex items-start gap-1.5 text-xs leading-relaxed [word-break:keep-all] ${TONE[warning.tone].text}`}>
      <Icon size={13} className="mt-0.5 shrink-0" />
      <span>{warning.text}</span>
    </li>
  );
}

// ---- 저장 결과 ----

type SavedResult = {
  roll: Roll;
  warnings: Warning[];
  motherCountBefore: number;
};

function findHoldIngots(ds: Dataset): Set<string> {
  const s = new Set<string>();
  for (const nc of ds.nonconformances) {
    if (nc.reasonCode === "IMP-FE" && nc.targetType === "ingot") s.add(nc.targetId);
  }
  for (const r of ds.rolls) {
    if (r.status === "hold") s.add(r.ingotId);
  }
  return s;
}

// ---- 화면 ----

export default function RollLogForm({ onNavigate, onTrace }: RollLogFormProps) {
  const { dataset, addRoll, reset, userRolls } = useDemoData();
  const uid = useId();
  const fid = (name: string) => `${uid}-${name}`;

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [showErrors, setShowErrors] = useState(false);
  const [saved, setSaved] = useState<SavedResult | null>(null);
  const successRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => setForm((prev) => ({ ...prev, [key]: value }));

  // ---- 데이터에서 읽는 선택지·기준 ----

  const ingots = useMemo(() => dataset.ingots.slice().sort((a, b) => (a.castAt < b.castAt ? 1 : a.castAt > b.castAt ? -1 : 0)), [dataset.ingots]);
  const holdIngotIds = useMemo(() => findHoldIngots(dataset), [dataset]);
  const rollingRecipes = useMemo(() => dataset.recipes.filter((r) => r.kind === "rolling"), [dataset.recipes]);
  const filmLots = useMemo(
    () => dataset.materialLots.filter((m) => m.type === "release_film").sort((a, b) => (a.receivedAt < b.receivedAt ? 1 : -1)),
    [dataset.materialLots],
  );
  const sdChart = useMemo(() => thicknessSdChart(dataset), [dataset]);
  const remainingKg = useMemo(() => ingotRemainingKg(dataset), [dataset]);
  const reuseStats = useMemo(() => completionByFilmReuse(dataset), [dataset]);
  const reuseLow = reuseStats.find((s) => s.key === "1-2");
  const reuseHigh = reuseStats.find((s) => s.key === "5+");
  const dewClaim = useMemo(() => dataset.nonconformances.find((nc) => nc.reasonCode === "SURF-DISC" && nc.type === "claim"), [dataset.nonconformances]);

  const selectedIngot = ingots.find((i) => i.id === form.ingotId) ?? null;
  const selectedIngotHold = selectedIngot ? holdIngotIds.has(selectedIngot.id) : false;
  const holdReason = selectedIngot
    ? dataset.nonconformances.find((nc) => nc.targetType === "ingot" && nc.targetId === selectedIngot.id && nc.reasonCode === "IMP-FE")
    : undefined;
  const selectedRecipe = rollingRecipes.find((r) => r.id === form.recipeId) ?? null;
  const recPass = selectedRecipe ? recommendedPass(selectedRecipe.name) : null;

  const validation = validate(form, { remainingKg });
  const { errors, missingRequired, arealValues, dewPointC } = validation;
  const visibleErrors: FieldErrors = showErrors
    ? errors
    : {
        // 저장 전에는 「비어 있음」 오류는 숨기고, 잘못 적은 값만 바로 알린다
        dew: errors.dew,
        // 면밀도 일부만 입력 — 저장이 막히는 이유라 바로 보여 준다
        areal: errors.areal,
        // 잉곳 잔량 부족 — 값이 다 들어온 뒤에만 생기는 오류라 바로 보여 준다
        stock: errors.stock,
        lost: form.lostLengthM.trim() !== "" ? errors.lost : undefined,
        good: form.goodLengthM.trim() !== "" ? errors.good : undefined,
        width: form.widthMm.trim() !== "" ? errors.width : undefined,
      };
  /** 필수 칸이 아닌데 잘못 적힌 칸(노점·면밀도·잉곳 잔량) */
  const otherErrorCount = (errors.dew ? 1 : 0) + (errors.areal ? 1 : 0) + (errors.stock ? 1 : 0);
  /** 입력에 붙일 접근성 속성 — 오류가 보일 때만 오류 문장과 잇는다 */
  const errId = (key: FieldKey) => fid(`${key}-error`);
  const a11y = (key: FieldKey, alsoKey?: FieldKey) => {
    const shown = visibleErrors[key] ?? (alsoKey ? visibleErrors[alsoKey] : undefined);
    const idKey = visibleErrors[key] ? key : alsoKey ?? key;
    return { "aria-invalid": shown ? true : undefined, "aria-describedby": shown ? errId(idKey) : undefined } as const;
  };

  // 면밀도 → 환산 두께
  const arealThickness = form.areal.map((a) => {
    const p = parseNum(a, "decimal");
    return p.state === "ok" ? arealToThicknessUm(p.value) : null;
  });
  const sdUm = arealValues ? sampleSd(arealValues.map(arealToThicknessUm)) : null;
  const meanUm = arealValues ? arealValues.map(arealToThicknessUm).reduce((a, b) => a + b, 0) / 3 : null;
  const sdOver = sdUm !== null && sdUm > sdChart.ucl;

  const dewParsed = parseDew(form.dewAbs);
  const dewOver = dewPointC !== null && dewPointC > DEW_STOP_C;

  useEffect(() => {
    if (saved) successRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [saved]);

  // ---- 동작 ----

  const chooseRecipe = (recipeId: string) => {
    const recipe = rollingRecipes.find((r) => r.id === recipeId);
    const pass = recipe ? recommendedPass(recipe.name) : null;
    setForm((prev) => ({ ...prev, recipeId, passCount: pass ?? prev.passCount }));
  };

  const setTear = (n: number) => setForm((prev) => ({ ...prev, tearCount: n, lostLengthM: n === 0 ? "" : prev.lostLengthM }));

  const setAreal = (idx: 0 | 1 | 2, value: string) =>
    setForm((prev) => {
      const next: [string, string, string] = [prev.areal[0], prev.areal[1], prev.areal[2]];
      next[idx] = value;
      return { ...prev, areal: next };
    });

  const fillExample = (kind: "normal" | "problem") => {
    // 예시 롤 한 개는 리튬 약 0.37kg 을 쓴다 — 잔량이 넉넉한 최신 잉곳부터
    const ingot =
      ingots.find((i) => !holdIngotIds.has(i.id) && (remainingKg.get(i.id) ?? 0) >= 0.45) ??
      ingots.find((i) => !holdIngotIds.has(i.id)) ??
      ingots[0];
    const film = filmLots[0];
    const recipeId = kind === "normal" ? "RCP-B" : "RCP-C";
    const recipe = rollingRecipes.find((r) => r.id === recipeId);
    const pass = recipe ? recommendedPass(recipe.name) : null;
    setShowErrors(false);
    setForm(
      kind === "normal"
        ? {
            ingotId: ingot?.id ?? "",
            recipeId: recipe ? recipeId : "",
            passCount: pass ?? 5,
            filmLotId: film?.id ?? "",
            filmReuseCount: 2,
            dewAbs: "55",
            tearCount: 0,
            lostLengthM: "",
            goodLengthM: "196",
            widthMm: DEFAULT_WIDTH_MM,
            areal: ["5.33", "5.36", "5.31"],
            surfaceGrade: "A",
            operator: "데모 사용자",
          }
        : {
            ingotId: ingot?.id ?? "",
            recipeId: recipe ? recipeId : "",
            passCount: pass ?? 4,
            filmLotId: film?.id ?? "",
            filmReuseCount: 6,
            dewAbs: "41",
            tearCount: 2,
            lostLengthM: "24",
            goodLengthM: "168",
            widthMm: DEFAULT_WIDTH_MM,
            // 5.10/5.62/5.25 는 SD 0.50µm 로 시드 관리한계(0.53µm) 바로 아래라 경고가 안 뜬다 — 한계를 넘도록 조금 벌렸다
            areal: ["5.05", "5.65", "5.25"],
            surfaceGrade: "C",
            operator: "데모 사용자",
          },
    );
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { input } = validation;
    if (!input) {
      setShowErrors(true);
      // 첫 오류 칸으로 — 모바일에서 오류가 버튼보다 한참 위에 있어도 찾아가게 한다
      const first = FIELD_ORDER.find((k) => errors[k]);
      if (first) {
        const targetId =
          first === "stock" ? fid("ingot") : first === "areal" ? fid(`areal-${Math.max(0, form.areal.findIndex((a) => parseNum(a, "decimal").state !== "ok"))}`) : fid(first);
        const el = document.getElementById(targetId);
        const focusable = el?.getAttribute("role") === "radiogroup" ? el.querySelector<HTMLElement>('[role="radio"]') : el;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "center" });
        focusable?.focus({ preventScroll: true });
      }
      return;
    }
    const warnings = collectWarnings(
      {
        ingotId: input.ingotId,
        recipeId: input.recipeId,
        filmReuseCount: input.filmReuseCount,
        dewPointC: input.dewPointC,
        areal: input.arealDensityGm2,
        grade: input.surfaceGrade,
        tearCount: input.tearCount,
      },
      { holdIngotIds, sdUcl: sdChart.ucl },
    );
    const motherCountBefore = motherRolls(dataset).length;
    const roll = addRoll(input);
    setSaved({ roll, warnings, motherCountBefore });
    setForm(EMPTY_FORM);
    setShowErrors(false);
  };

  const onReset = () => {
    reset();
    setSaved(null);
  };

  // ---- 렌더 ----

  const savedThickness = saved ? rollThicknessUm(saved.roll) : null;
  const savedSd = saved ? rollThicknessSdUm(saved.roll) : null;
  const liveWarnings = collectWarnings(
      {
        ingotId: form.ingotId,
        recipeId: form.recipeId,
        filmReuseCount: form.filmReuseCount,
        dewPointC,
        areal: arealValues,
        grade: form.surfaceGrade,
        tearCount: form.tearCount,
      },
      { holdIngotIds, sdUcl: sdChart.ucl },
    ).filter((w) => w.tone !== "gray");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_20rem] gap-4 lg:gap-6 items-start">
      <div className="min-w-0 space-y-4">
        {saved && (
          <div ref={successRef} className={SCROLL_MARGIN}>
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md p-4 lg:p-6">
              <div className="flex items-start gap-3">
                <CircleCheck size={22} className="mt-0.5 shrink-0 text-emerald-400" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-emerald-300">저장했습니다 — KPI 보드가 이 롤을 포함해 다시 계산됐습니다</div>
                  <div className="mt-1 font-mono text-base lg:text-lg font-bold text-white break-all">{saved.roll.id}</div>
                  <dl className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-2">
                    <SummaryItem label="평균 두께" value={savedThickness ? `${fmtNum((savedThickness[0] + savedThickness[1] + savedThickness[2]) / 3, 2)}µm` : "미측정"} />
                    <SummaryItem label="3점 편차(SD)" value={savedSd !== null ? `${fmtNum(savedSd, 2)}µm` : "—"} />
                    <SummaryItem label="파단" value={`${saved.roll.tearCount}회 · ${fmtNum(saved.roll.lostLengthM, 0)}m`} />
                    <SummaryItem label="모 롤 수" value={`${saved.motherCountBefore} → ${saved.motherCountBefore + 1}개`} />
                  </dl>
                  {saved.warnings.length > 0 ? (
                    <ul className="mt-3 space-y-1">
                      {saved.warnings.map((w) => (
                        <WarningLine key={w.text} warning={w} />
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-xs text-emerald-200/80">경고 없음 — 기준 안에서 작업된 롤입니다.</p>
                  )}
                  <div className="mt-4 flex flex-col lg:flex-row gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigate("kpi")}
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
                    >
                      <BarChart3 size={16} />
                      KPI 보드에서 보기
                    </button>
                    <button
                      type="button"
                      onClick={() => onTrace({ type: "roll", id: saved.roll.id })}
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-gray-100 hover:bg-white/10 transition-colors"
                    >
                      <GitBranch size={16} />
                      계보 조회 — 이 롤이 어디서 왔나
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <Card>
          <CardHeader
            eyebrow="현장 태블릿 · 롤 일지"
            title="압연 모 롤 1개 기록"
            description={
              <span className="[word-break:keep-all]">
                롤 1개 = 화면 1장, 9칸. 자유 텍스트 없이 고르고 숫자만 넣습니다. 저장하면 KPI 보드·관리도·계보가 같은 데이터로 바로 바뀝니다.
              </span>
            }
          />

          <div className="mb-5 flex flex-col lg:flex-row lg:flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fillExample("normal")}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-2 text-sm font-semibold text-indigo-200 hover:bg-indigo-500/20 transition-colors"
            >
              <Wand2 size={15} />
              예시로 채우기 — 정상 롤
            </button>
            <button
              type="button"
              onClick={() => fillExample("problem")}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3.5 py-2 text-sm font-semibold text-amber-200 hover:bg-amber-500/20 transition-colors"
            >
              <Wand2 size={15} />
              예시로 채우기 — 문제 롤
            </button>
          </div>

          <form onSubmit={onSubmit} noValidate className="space-y-6">
            {/* 1. 잉곳 */}
            <Field
              step={1}
              label="잉곳"
              htmlFor={fid("ingot")}
              error={visibleErrors.ingot ?? visibleErrors.stock}
              errorId={errId(visibleErrors.ingot ? "ingot" : "stock")}
              right={selectedIngotHold ? <Badge tone="amber">출하 보류</Badge> : undefined}
              hint="최신 주조순, 괄호는 남은 리튬. 롤 1개(폭 300mm·약 200m)에 리튬 약 0.37kg 이 듭니다. 「출하 보류」는 불순물 규격 초과로 판정 대기 중인 잉곳입니다."
            >
              <select
                id={fid("ingot")}
                value={form.ingotId}
                onChange={(e) => set("ingotId", e.target.value)}
                className={INPUT_CLASS}
                {...a11y("ingot", "stock")}
              >
                <option value="">잉곳 선택</option>
                {ingots.map((i) => (
                  <option key={i.id} value={i.id}>
                    {`${i.id} · 주조 ${fmtShortDate(i.castAt)} (잔량 ${fmtNum(Math.max(0, remainingKg.get(i.id) ?? 0), 2)}kg)${holdIngotIds.has(i.id) ? " · 출하 보류" : ""}`}
                  </option>
                ))}
              </select>
              {selectedIngotHold && (
                <div className="mt-2">
                  <Callout tone="amber" icon={<TriangleAlert size={15} />}>
                    <span className="[word-break:keep-all]">
                      이 잉곳은 <b className="text-amber-200">출하 보류</b> 중입니다.
                      {holdReason ? ` ${holdReason.description}.` : ""} 기록은 할 수 있지만, 이 잉곳에서 나온 롤은 판정 전까지 출하할 수 없습니다.
                    </span>
                  </Callout>
                </div>
              )}
            </Field>

            {/* 2. 레시피 + 패스 */}
            <Field
              step={2}
              label="압연 레시피 · 패스 수"
              error={visibleErrors.recipe}
              errorId={errId("recipe")}
              hint="레시피는 id 만 기록합니다. 압하력·장력 같은 조건 원값은 별도 보안 표에 둡니다."
            >
              <ChoiceGroup
                id={fid("recipe")}
                invalid={Boolean(visibleErrors.recipe)}
                describedBy={visibleErrors.recipe ? errId("recipe") : undefined}
                ariaLabel="압연 레시피"
                value={form.recipeId}
                onChange={chooseRecipe}
                options={rollingRecipes.map((r) => ({ value: r.id, label: `레시피 ${recipeLetter(r.id)}`, sub: r.name }))}
              />
              {selectedRecipe && (
                <div className="mt-3 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                  <div>
                    <SubLabel htmlFor={fid("pass")}>패스 수 — 압연기를 통과시킨 횟수</SubLabel>
                    <Stepper id={fid("pass")} label="패스 수" unit="회" value={form.passCount} min={1} max={10} onChange={(n) => set("passCount", n)} />
                  </div>
                  <div className="text-xs text-gray-400 leading-relaxed [word-break:keep-all]">
                    {recPass !== null && (
                      <div>
                        권장 <b className="text-gray-200">{recPass}패스</b>
                        {form.passCount !== recPass && <span className="ml-1 text-amber-300">· 권장과 다름</span>}
                      </div>
                    )}
                    <div className="text-gray-500">{selectedRecipe.note}</div>
                  </div>
                </div>
              )}
            </Field>

            {/* 3. 이형 필름 */}
            <Field step={3} label="이형 필름 로트 · 재사용 횟수" error={visibleErrors.film} errorId={errId("film")} hint={`${GLOSSARY.releaseFilm}. 1회 = 새 필름.`}>
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-3 lg:items-end">
                <div className="min-w-0">
                  <SubLabel htmlFor={fid("film")}>필름 로트</SubLabel>
                  <select id={fid("film")} value={form.filmLotId} onChange={(e) => set("filmLotId", e.target.value)} className={INPUT_CLASS} {...a11y("film")}>
                    <option value="">필름 로트 선택</option>
                    {filmLots.map((m) => (
                      <option key={m.id} value={m.id}>
                        {`${m.id} · 입고 ${fmtShortDate(m.receivedAt)}`}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <SubLabel htmlFor={fid("reuse")}>재사용 횟수</SubLabel>
                  <Stepper
                    id={fid("reuse")}
                    label="재사용 횟수"
                    unit="회"
                    value={form.filmReuseCount}
                    min={FILM_REUSE_MIN}
                    max={FILM_REUSE_MAX}
                    onChange={(n) => set("filmReuseCount", n)}
                  />
                </div>
              </div>
              {form.filmReuseCount >= FILM_REUSE_WARN && (
                <div className="mt-2">
                  <Callout tone="amber" icon={<TriangleAlert size={15} />}>
                    <span className="[word-break:keep-all]">
                      재사용 {FILM_REUSE_WARN}회 이상 구간입니다. 지금까지 데이터에서{" "}
                      {reuseHigh && reuseLow && reuseHigh.rolls > 0 && reuseLow.rolls > 0 ? (
                        <>
                          무파단율이 <b className="text-amber-200">5회 이상 {fmtPct(reuseHigh.tearFreeRate)}</b>({reuseHigh.rolls}롤) vs{" "}
                          <b className="text-emerald-300">1~2회 {fmtPct(reuseLow.tearFreeRate)}</b>({reuseLow.rolls}롤). 표본이 적어 확정은 아니지만 필름 교체를 검토하세요.
                        </>
                      ) : (
                        <>비교할 롤이 아직 부족합니다.</>
                      )}
                    </span>
                  </Callout>
                </div>
              )}
            </Field>

            {/* 4. 노점 */}
            <Field
              step={4}
              label="교대 시작 노점"
              htmlFor={fid("dew")}
              error={visibleErrors.dew}
              errorId={errId("dew")}
              hint={
                dewParsed.state === "empty" ? (
                  <span className="text-gray-400">비워 두면 「결측」으로 기록됩니다. {GLOSSARY.dewPoint}.</span>
                ) : (
                  "영하 값이라 숫자만 입력합니다. 예: 55 → −55℃"
                )
              }
            >
              <div className="flex items-center gap-2 max-w-full lg:max-w-60">
                <div className="relative w-full">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">−</span>
                  <input
                    id={fid("dew")}
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="55"
                    value={form.dewAbs}
                    onChange={(e) => set("dewAbs", e.target.value)}
                    className={`${INPUT_CLASS} pl-7 pr-9 ${dewOver ? "border-rose-500/60" : ""}`}
                    {...a11y("dew")}
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500">℃</span>
                </div>
              </div>
              {dewOver && (
                <div className="mt-2">
                  <Callout tone="rose" icon={<OctagonAlert size={15} />}>
                    <span className="[word-break:keep-all]">
                      <b className="text-rose-200">작업 중단 기준</b> — 노점 {fmtNum(dewPointC ?? 0, 1)}℃ 는 −45℃ 보다 습합니다. 수분이 리튬 표면을 변색시킬 수 있습니다.
                      {dewClaim ? ` 같은 조건의 작업분이 표면 변색 클레임(${dewClaim.targetId})으로 돌아온 적이 있습니다.` : ""}
                    </span>
                  </Callout>
                </div>
              )}
            </Field>

            {/* 5. 파단 */}
            <Field step={5} label="파단 횟수 · 손실 길이" error={visibleErrors.lost} errorId={errId("lost")} hint="파단 — 압연 중 호일이 끊어진 것. 끊긴 앞뒤 구간은 버립니다.">
              <div className="grid grid-cols-1 lg:grid-cols-[auto_minmax(0,1fr)] gap-3 lg:items-end">
                <div>
                  <SubLabel htmlFor={fid("tear")}>파단 횟수</SubLabel>
                  <Stepper id={fid("tear")} label="파단 횟수" unit="회" value={form.tearCount} min={0} max={TEAR_MAX} onChange={setTear} />
                </div>
                <div className="min-w-0 lg:max-w-60">
                  <SubLabel htmlFor={fid("lost")}>파단 손실 길이 (m)</SubLabel>
                  <input
                    id={fid("lost")}
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder={form.tearCount === 0 ? "파단 0 — 0m" : "예: 12"}
                    disabled={form.tearCount === 0}
                    value={form.tearCount === 0 ? "" : form.lostLengthM}
                    onChange={(e) => set("lostLengthM", e.target.value)}
                    className={INPUT_CLASS}
                    {...a11y("lost")}
                  />
                </div>
              </div>
            </Field>

            {/* 6. 길이·폭 */}
            <Field step={6} label="양품 길이 · 폭" error={visibleErrors.good ?? visibleErrors.width} errorId={errId(visibleErrors.good ? "good" : "width")}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div className="min-w-0">
                  <SubLabel htmlFor={fid("good")}>양품 길이 (m)</SubLabel>
                  <input
                    id={fid("good")}
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    placeholder="예: 195"
                    value={form.goodLengthM}
                    onChange={(e) => set("goodLengthM", e.target.value)}
                    className={INPUT_CLASS}
                    {...a11y("good")}
                  />
                </div>
                <div className="min-w-0">
                  <SubLabel htmlFor={fid("width")}>폭 (mm)</SubLabel>
                  <input
                    id={fid("width")}
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    value={form.widthMm}
                    onChange={(e) => set("widthMm", e.target.value)}
                    className={INPUT_CLASS}
                    {...a11y("width")}
                  />
                </div>
              </div>
              {visibleErrors.good && visibleErrors.width && (
                <p id={errId("width")} className="mt-1 text-xs font-medium text-rose-400">
                  {visibleErrors.width}
                </p>
              )}
            </Field>

            {/* 7. 면밀도 3점 */}
            <Field
              step={7}
              label="면밀도 3점 (g/m²)"
              error={visibleErrors.areal}
              errorId={errId("areal")}
              hint={`${GLOSSARY.arealDensity}. 셋 다 비우면 「미측정」.`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {AREAL_LABELS.map((pos, idx) => {
                  const t = arealThickness[idx];
                  return (
                    <div key={pos} className="min-w-0">
                      <SubLabel htmlFor={fid(`areal-${idx}`)}>{pos}</SubLabel>
                      <input
                        id={fid(`areal-${idx}`)}
                        type="text"
                        inputMode="decimal"
                        autoComplete="off"
                        placeholder="5.34"
                        value={form.areal[idx]}
                        onChange={(e) => setAreal(idx as 0 | 1 | 2, e.target.value)}
                        className={INPUT_CLASS}
                        {...a11y("areal")}
                      />
                      <div className="mt-1 text-xs text-gray-500 tabular-nums">{t !== null ? `≈ ${fmtNum(t, 2)}µm` : "두께 —"}</div>
                    </div>
                  );
                })}
              </div>
              <div
                className={`mt-3 rounded-xl border px-3 py-2.5 text-xs lg:text-sm leading-relaxed [word-break:keep-all] ${
                  sdUm === null ? "border-white/10 bg-white/5 text-gray-400" : sdOver ? `${TONE.amber.border} ${TONE.amber.bg} text-amber-200` : `${TONE.emerald.border} ${TONE.emerald.bg} text-emerald-200`
                }`}
              >
                {sdUm === null || meanUm === null ? (
                  <>세 점을 넣으면 환산 두께와 좌·중·우 편차(SD)를 바로 계산합니다. 관리한계 {fmtNum(sdChart.ucl, 2)}µm.</>
                ) : (
                  <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span>
                      평균 <b className="tabular-nums">{fmtNum(meanUm, 2)}µm</b>
                    </span>
                    <span>
                      3점 SD <b className="tabular-nums">{fmtNum(sdUm, 2)}µm</b>
                    </span>
                    {sdOver ? (
                      <span className="inline-flex items-center gap-1 font-semibold">
                        <TriangleAlert size={14} /> 관리한계({fmtNum(sdChart.ucl, 2)}µm) 초과
                      </span>
                    ) : (
                      <span className="text-emerald-300/80">관리한계 {fmtNum(sdChart.ucl, 2)}µm 이내</span>
                    )}
                  </span>
                )}
              </div>
            </Field>

            {/* 8. 외관 등급 */}
            <Field step={8} label="외관 등급" hint="A 이상 없음 · B 경미한 흠 · C 변색·주름 등 판정 필요. 못 봤으면 「미기록」.">
              <ChoiceGroup<"" | SurfaceGrade>
                ariaLabel="외관 등급"
                value={form.surfaceGrade ?? ""}
                onChange={(v) => set("surfaceGrade", v === "" ? null : v)}
                options={[
                  { value: "A", label: "A" },
                  { value: "B", label: "B" },
                  { value: "C", label: "C" },
                  { value: "", label: "미기록" },
                ]}
              />
            </Field>

            {/* 9. 작업자 */}
            <Field step={9} label="작업자" htmlFor={fid("operator")} error={visibleErrors.operator} errorId={errId("operator")}>
              <select
                id={fid("operator")}
                value={form.operator}
                onChange={(e) => set("operator", e.target.value)}
                className={`${INPUT_CLASS} lg:max-w-60`}
                {...a11y("operator")}
              >
                <option value="">작업자 선택</option>
                {OPERATOR_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Field>

            {/* 저장 */}
            <div className="border-t border-white/10 pt-4">
              {liveWarnings.length > 0 && (
                <ul className="mb-3 space-y-1">
                  {liveWarnings.map((w) => (
                    <WarningLine key={w.text} warning={w} />
                  ))}
                </ul>
              )}
              <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-900/30 hover:from-indigo-500 hover:to-purple-500 transition-colors"
                >
                  <Save size={16} />
                  롤 일지 저장
                </button>
                <div className="text-sm [word-break:keep-all]" aria-live="polite">
                  {missingRequired > 0 ? (
                    <span className="text-gray-300">
                      필수 <b className="text-white">{missingRequired}칸</b> 남음
                    </span>
                  ) : otherErrorCount > 0 ? (
                    <span className="text-rose-400">고칠 칸 {otherErrorCount}개</span>
                  ) : (
                    <span className="text-emerald-400">저장할 수 있습니다</span>
                  )}
                  {missingRequired > 0 && otherErrorCount > 0 && <span className="ml-2 text-rose-400">· 고칠 칸 {otherErrorCount}개</span>}
                </div>
              </div>
              <p aria-live="polite" className="mt-2 text-xs text-rose-400 [word-break:keep-all]">
                {showErrors && Object.keys(errors).length > 0
                  ? `저장하지 못했습니다 — 빨간 글씨가 있는 칸 ${Object.keys(errors).length}곳을 확인해 주세요. 첫 칸으로 이동했습니다.`
                  : ""}
              </p>
            </div>
          </form>
        </Card>
      </div>

      {/* 오른쪽(lg) / 아래(모바일) */}
      <aside className={`min-w-0 space-y-4 lg:sticky ${STICKY_TOP_LG}`}>
        <Card>
          <CardHeader
            title="이번 방문에 입력한 롤"
            description="이 브라우저 안에만 있습니다. 새로고침하면 사라집니다."
            right={<Badge tone={userRolls.length ? "indigo" : "gray"}>{userRolls.length}개</Badge>}
          />
          {userRolls.length === 0 ? (
            <p className="text-sm text-gray-500 [word-break:keep-all]">아직 없습니다. 「예시로 채우기」로 한 개 저장해 보세요.</p>
          ) : (
            <ul className="space-y-2">
              {userRolls
                .slice()
                .reverse()
                .map((r) => {
                  const sd = rollThicknessSdUm(r);
                  const dewBad = r.dewPointC !== null && r.dewPointC > DEW_STOP_C;
                  return (
                    <li key={r.id}>
                      <button
                        type="button"
                        onClick={() => onTrace({ type: "roll", id: r.id })}
                        className="w-full min-h-10 rounded-xl border border-white/10 bg-gray-950/60 px-3 py-2.5 text-left hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-colors"
                      >
                        <div className="font-mono text-xs font-semibold text-white break-all">{r.id}</div>
                        <div className="mt-1 flex flex-wrap gap-1">
                          <Badge tone="indigo">레시피 {recipeLetter(r.recipeId)}</Badge>
                          <Badge tone={r.tearCount > 0 ? "amber" : "gray"}>파단 {r.tearCount}</Badge>
                          <Badge tone={sd !== null && sd > sdChart.ucl ? "amber" : "gray"}>{sd !== null ? `SD ${fmtNum(sd, 2)}µm` : "면밀도 없음"}</Badge>
                          <Badge tone={dewBad ? "rose" : "gray"}>{r.dewPointC !== null ? `노점 ${fmtNum(r.dewPointC, 0)}℃` : "노점 결측"}</Badge>
                        </div>
                        <div className="mt-1 text-[11px] text-gray-500">눌러서 계보 보기</div>
                      </button>
                    </li>
                  );
                })}
            </ul>
          )}
          <button
            type="button"
            onClick={onReset}
            disabled={userRolls.length === 0}
            className="mt-4 inline-flex w-full min-h-10 items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-sm font-semibold text-rose-200 hover:bg-rose-500/20 disabled:opacity-40 disabled:cursor-not-allowed transition-colors [word-break:keep-all]"
          >
            <RotateCcw size={15} />
            {userRolls.length ? `입력 초기화 — 내가 넣은 롤 ${userRolls.length}개 바로 삭제` : "입력 초기화 — 지울 롤 없음"}
          </button>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-3">
            <Database size={16} className="text-purple-400" />
            <h3 className="text-sm font-bold text-white">이 입력이 저장되는 표</h3>
          </div>
          <ul className="space-y-2.5 text-xs text-gray-400 leading-relaxed [word-break:keep-all]">
            <li>
              <code className="font-mono text-indigo-300">roll</code> — 롤 ID·잉곳·폭·양품 길이·파단 횟수·손실 길이·외관 등급·상태
            </li>
            <li>
              <code className="font-mono text-indigo-300">process_run</code> — 레시피·패스 수·필름 로트·재사용 횟수·노점·작업자·시각
            </li>
            <li>
              <code className="font-mono text-indigo-300">measurement</code> — 면밀도 좌·중·우 3행(g/m²). 두께·편차는 저장하지 않고 계산합니다
            </li>
          </ul>
        </Card>
      </aside>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-gray-950/50 px-3 py-2 min-w-0">
      <dt className="text-[11px] text-gray-400">{label}</dt>
      <dd className="text-sm font-bold text-white tabular-nums [word-break:keep-all]">{value}</dd>
    </div>
  );
}
