"use client";

// 로트 계보 추적 화면 — 클레임 한 건에서 원인 공정까지 거슬러 올라가고(역추적),
// 원료 로트 하나가 어느 출하까지 퍼졌는지(정추적 · 회수 범위) 보여 준다.
// 데이터는 useDemoData() 에서만 읽는다. 조회 대상(target)은 DemoApp 이 소유한다.

import {
  AlertTriangle,
  ArrowDown,
  ArrowUpRight,
  Box,
  FlaskConical,
  GitBranch,
  Info,
  Layers,
  Package,
  Scissors,
  Search,
  Truck,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  completionByFilmReuse,
  elementChart,
  recipeLabel,
  rollThicknessSdUm,
  rollThicknessUm,
  thicknessSdChart,
  traceBack,
  traceForward,
  traceForwardFromIngot,
  type Genealogy,
  type ImrChart,
} from "@/lib/demo/lithium-foil/metrics";
import { diffDays } from "@/lib/demo/lithium-foil/seed";
import {
  ICP_ELEMENTS,
  SPEC_LIMIT_PPM,
  type Dataset,
  type IcpElement,
  type IcpResult,
  type Ingot,
  type MaterialLot,
  type MaterialLotType,
  type NonConformance,
  type RefineBatch,
  type Roll,
  type RollStatus,
  type Shipment,
} from "@/lib/demo/lithium-foil/types";
import { useDemoData } from "../DemoDataContext";
import {
  Badge,
  Callout,
  Card,
  CardHeader,
  GLOSSARY,
  SCROLL_MARGIN,
  STICKY_TOP_LG,
  StatTile,
  TableWrap,
  TONE,
  fmtNum,
  fmtPct,
  fmtShortDate,
  fmtShortDateTime,
  type Tone,
} from "../ui";
import type { TraceExplorerProps, TraceTarget } from "./types";

// ---- 상수·표기 ----

const DEW_POINT_LIMIT_C = -45;
const FILM_REUSE_WARN = 5;
const CRUCIBLE_WARN = 6;
const TRIAL_RECIPE_ID = "RCP-C";

const TYPE_LABEL: Record<TraceTarget["type"], string> = {
  shipment: "출하",
  roll: "롤",
  ingot: "잉곳",
  material: "원료·자재 로트",
};

const MATERIAL_TYPE_LABEL: Record<MaterialLotType, string> = {
  lithium_feed: "리튬 원료",
  release_film: "이형 필름",
  rolling_oil: "압연유",
  argon: "아르곤 가스",
};

const ROLL_STATUS: Record<RollStatus, { label: string; tone: Tone }> = {
  in_process: { label: "공정 중", tone: "indigo" },
  released: { label: "출하 가능", tone: "emerald" },
  hold: { label: "홀드(출하 보류)", tone: "amber" },
  shipped: { label: "출하됨", tone: "cyan" },
  scrapped: { label: "폐기", tone: "rose" },
};

type ElementCharts = Map<IcpElement, ImrChart & { specPpm: number }>;

/** 대소문자·공백·하이픈을 무시한 비교 키 */
function normalizeId(value: string): string {
  return value.toUpperCase().replace(/[\s_\-–—]/g, "");
}

function fmtTemp(c: number): string {
  return `${fmtNum(c, 1).replace("-", "−")}℃`;
}

function sameTarget(a: TraceTarget | null, b: TraceTarget | null): boolean {
  return Boolean(a && b && a.type === b.type && a.id === b.id);
}

// ---- 검색 ----

type IdKind = TraceTarget["type"] | "batch";
type IdEntry = { id: string; key: string; kind: IdKind };
type Suggestion = { id: string; target: TraceTarget; hint: string };
type SearchError = { message: string; suggestions: Suggestion[] };

function buildIdIndex(ds: Dataset): IdEntry[] {
  const entry = (id: string, kind: IdKind): IdEntry => ({ id, key: normalizeId(id), kind });
  return [
    ...ds.shipments.map((s) => entry(s.id, "shipment")),
    ...ds.rolls.map((r) => entry(r.id, "roll")),
    ...ds.ingots.map((i) => entry(i.id, "ingot")),
    ...ds.materialLots.map((l) => entry(l.id, "material")),
    ...ds.batches.map((b) => entry(b.id, "batch")),
  ];
}

function guessKind(key: string): IdKind | null {
  if (key.startsWith("SH")) return "shipment";
  if (key.startsWith("RM")) return "material";
  if (key.startsWith("ING")) return "ingot";
  if (key.startsWith("B")) return "batch";
  if (key.startsWith("R")) return "roll";
  return null;
}

function entryToSuggestion(ds: Dataset, e: IdEntry): Suggestion | null {
  if (e.kind === "batch") {
    const ingot = ds.ingots.find((i) => i.batchId === e.id);
    return ingot ? { id: ingot.id, target: { type: "ingot", id: ingot.id }, hint: `배치 ${e.id} 의 잉곳` } : null;
  }
  return { id: e.id, target: { type: e.kind, id: e.id }, hint: TYPE_LABEL[e.kind] };
}

type SearchResult = { ok: true; target: TraceTarget } | { ok: false; error: SearchError };

function searchId(ds: Dataset, index: IdEntry[], raw: string): SearchResult {
  const key = normalizeId(raw);
  if (!key) {
    return { ok: false, error: { message: "조회할 아이디를 입력해 주세요. 아래 빠른 시작 칩으로 바로 볼 수도 있습니다.", suggestions: [] } };
  }
  const exact = index.find((e) => e.key === key);
  if (exact && exact.kind !== "batch") {
    return { ok: true, target: { type: exact.kind, id: exact.id } };
  }
  if (exact && exact.kind === "batch") {
    const s = entryToSuggestion(ds, exact);
    return {
      ok: false,
      error: {
        message: `${exact.id} 는 정제 배치입니다. 배치는 거기서 나온 잉곳 기준으로 조회합니다.`,
        suggestions: s ? [s] : [],
      },
    };
  }
  const guessed = guessKind(key);
  let matches: IdEntry[] = [];
  for (let len = key.length; len >= 2 && matches.length === 0; len -= 1) {
    const prefix = key.slice(0, len);
    matches = index.filter((e) => e.key.startsWith(prefix));
  }
  if (guessed) {
    matches = [...matches.filter((e) => e.kind === guessed), ...matches.filter((e) => e.kind !== guessed)];
  }
  const seen = new Set<string>();
  const suggestions: Suggestion[] = [];
  for (const m of matches) {
    const s = entryToSuggestion(ds, m);
    if (!s || seen.has(s.id)) continue;
    seen.add(s.id);
    suggestions.push(s);
    if (suggestions.length >= 5) break;
  }
  const kindText = guessed ? ` (앞부분으로 보아 ${guessed === "batch" ? "정제 배치" : TYPE_LABEL[guessed]} 아이디 같습니다)` : "";
  return {
    ok: false,
    error: {
      message: `「${raw.trim()}」 와 일치하는 아이디가 없습니다${kindText}.${suggestions.length ? " 비슷한 아이디:" : " 출하 SH- · 롤 R- · 잉곳 ING- · 원료 RM- 로 시작하는지 확인해 주세요."}`,
      suggestions,
    },
  };
}

// ---- 의심 지점 규칙 ----

type SuspectItem = { id: string; target: TraceTarget | null; text: string };
type Suspect = { key: string; tone: Tone; title: string; detail: string; items: SuspectItem[] };
type UnknownNote = { key: string; text: string; ids: Array<{ id: string; target: TraceTarget }> };

function buildSuspects(
  ds: Dataset,
  g: Genealogy,
  sdChart: ImrChart,
  elementCharts: ElementCharts,
): { suspects: Suspect[]; unknowns: UnknownNote[] } {
  const allRolls = [...g.rolls, ...g.parentRolls];
  const mothers = allRolls.filter((r) => r.stage !== "slit");
  const rollTarget = (id: string): TraceTarget => ({ type: "roll", id });

  const spec: SuspectItem[] = [];
  const ooc: SuspectItem[] = [];
  g.ingots.forEach((ingot) => {
    ingot.icp.forEach((r) => {
      const j = judgeIcp(ingot.id, r, elementCharts);
      if (j.over) {
        spec.push({
          id: ingot.id,
          target: { type: "ingot", id: ingot.id },
          text: `${r.element} ${fmtNum(r.valuePpm, 1)}ppm > 규격 ${SPEC_LIMIT_PPM[r.element]}ppm`,
        });
      } else if (j.ooc && j.chart) {
        const above = r.valuePpm > j.chart.ucl;
        ooc.push({
          id: ingot.id,
          target: { type: "ingot", id: ingot.id },
          text: above
            ? `${r.element} ${fmtNum(r.valuePpm, 1)}ppm > 관리상한 ${fmtNum(j.chart.ucl, 1)}ppm (규격 ${SPEC_LIMIT_PPM[r.element]}ppm 이내)`
            : `${r.element} ${fmtNum(r.valuePpm, 1)}ppm < 관리하한 ${fmtNum(j.chart.lcl, 1)}ppm`,
        });
      }
    });
  });

  const dew: SuspectItem[] = mothers
    .filter((r) => r.dewPointC !== null && r.dewPointC > DEW_POINT_LIMIT_C)
    .map((r) => ({
      id: r.id,
      target: rollTarget(r.id),
      text: `노점 ${fmtTemp(r.dewPointC ?? 0)} (기준 ${fmtTemp(DEW_POINT_LIMIT_C)} 이하)${r.surfaceGrade ? ` · 외관 ${r.surfaceGrade}등급` : ""}`,
    }));

  const sd: SuspectItem[] = mothers.flatMap((r) => {
    const v = rollThicknessSdUm(r);
    if (v === null || v <= sdChart.ucl) return [];
    return [{ id: r.id, target: rollTarget(r.id), text: `두께 SD ${fmtNum(v, 2)}µm > 관리상한 ${fmtNum(sdChart.ucl, 2)}µm` }];
  });

  const film: SuspectItem[] = mothers
    .filter((r) => r.filmReuseCount !== null && r.filmReuseCount >= FILM_REUSE_WARN)
    .map((r) => ({
      id: r.id,
      target: rollTarget(r.id),
      text: `필름 재사용 ${r.filmReuseCount}회째 · 파단 ${r.tearCount}회${r.lostLengthM ? ` · 손실 ${fmtNum(r.lostLengthM, 0)}m` : ""}`,
    }));
  const reuse = completionByFilmReuse(ds);
  const reuseLow = reuse[0];
  const reuseHigh = reuse[reuse.length - 1];

  const recipeC: SuspectItem[] = mothers
    .filter((r) => r.recipeId === TRIAL_RECIPE_ID)
    .map((r) => {
      const v = rollThicknessSdUm(r);
      const overlap = r.filmReuseCount !== null && r.filmReuseCount >= FILM_REUSE_WARN;
      return {
        id: r.id,
        target: rollTarget(r.id),
        text: `${recipeLabel(r.recipeId)} ${r.passCount}패스 · 파단 ${r.tearCount}회${v !== null ? ` · 두께 SD ${fmtNum(v, 2)}µm` : ""}${overlap ? ` · 필름 재사용 ${r.filmReuseCount}회와 겹침` : ""}`,
      };
    });

  const crucible: SuspectItem[] = g.batches
    .filter((b) => b.crucibleUseCount >= CRUCIBLE_WARN)
    .map((b) => ({ id: b.id, target: null, text: `도가니 ${b.crucibleUseCount}회째 사용` }));

  const scrap: SuspectItem[] = g.materialLots
    .filter((l) => l.origin === "internal_scrap")
    .map((l) => ({
      id: l.id,
      target: { type: "material", id: l.id },
      text: `${l.supplier}${l.coaAttached ? "" : " · 성적서(COA) 없음"}`,
    }));

  const suspects: Suspect[] = [
    {
      key: "spec",
      tone: "rose" as Tone,
      title: "원소 규격 초과",
      detail: "출하 규격 상한을 넘은 불순물 — 출하 판정에 바로 걸립니다.",
      items: spec,
    },
    {
      key: "dew",
      tone: "rose" as Tone,
      title: "노점 −45℃ 초과 작업",
      detail: `${GLOSSARY.dewPoint}.`,
      items: dew,
    },
    {
      key: "sd",
      tone: "rose" as Tone,
      title: "두께 산포가 관리한계 밖",
      detail: `롤 안 두께 3점의 표준편차가 관리도(정상 범위를 벗어나면 알리는 그래프) 상한 ${fmtNum(sdChart.ucl, 2)}µm 를 넘었습니다. 한계는 ${sdChart.baselineLabel} 기준.`,
      items: sd,
    },
    {
      key: "film",
      tone: "amber" as Tone,
      title: "이형 필름 5회 이상 재사용",
      detail:
        reuseLow.rolls && reuseHigh.rolls
          ? `${GLOSSARY.releaseFilm}. 전체 데이터에서 무파단율 ${reuseLow.label} ${fmtPct(reuseLow.tearFreeRate)} (롤 ${reuseLow.rolls}개) → ${reuseHigh.label} ${fmtPct(reuseHigh.tearFreeRate)} (롤 ${reuseHigh.rolls}개).`
          : `${GLOSSARY.releaseFilm}. 재사용이 늘면 파단이 늘 수 있습니다.`,
      items: film,
    },
    {
      key: "recipe-c",
      tone: "amber" as Tone,
      title: "시험 레시피 C (4패스 고압하)",
      detail: "시험 중인 압연 조건. 필름 재사용과 겹친 롤은 한 건만으로 어느 쪽 영향인지 가를 수 없어, 개선 제안 탭의 층별 비교로 봐야 합니다.",
      items: recipeC,
    },
    {
      key: "ooc",
      tone: "amber" as Tone,
      title: "원소 관리한계 이탈 (규격 이내)",
      detail: "규격 안이지만 평소 범위(새 도가니 기준 구간)를 벗어났습니다 — 규격 초과의 전조일 수 있습니다.",
      items: ooc,
    },
    {
      key: "crucible",
      tone: "amber" as Tone,
      title: "도가니 6회 이상 사용",
      detail: "도가니 — 리튬을 녹이는 용기. 오래 쓸수록 용기 성분(Fe·Ni·Cr)이 녹아들 수 있습니다.",
      items: crucible,
    },
    {
      key: "scrap",
      tone: "amber" as Tone,
      title: "스크랩 회수 원료 포함",
      detail: "자사 트림 회수분은 공급사 성적서가 없어 불순물 이력을 확인하기 어렵습니다.",
      items: scrap,
    },
  ].filter((s) => s.items.length > 0);

  const unknowns: UnknownNote[] = [];
  const dewMissing = mothers.filter((r) => r.dewPointC === null).map((r) => ({ id: r.id, target: rollTarget(r.id) }));
  if (dewMissing.length) unknowns.push({ key: "dew", text: "노점 기록이 비어 있어 수분 노출 여부를 판단할 수 없습니다.", ids: dewMissing });
  const arealMissing = mothers.filter((r) => r.arealDensityGm2 === null).map((r) => ({ id: r.id, target: rollTarget(r.id) }));
  if (arealMissing.length) unknowns.push({ key: "areal", text: "면밀도 3점이 비어 있어 두께 산포를 판단할 수 없습니다.", ids: arealMissing });
  const noIcp = g.ingots.filter((i) => i.icp.length === 0).map((i) => ({ id: i.id, target: { type: "ingot", id: i.id } as TraceTarget }));
  if (noIcp.length) unknowns.push({ key: "icp", text: "ICP 분석 결과가 아직 없습니다.", ids: noIcp });

  return { suspects, unknowns };
}

function judgeIcp(
  ingotId: string,
  r: IcpResult,
  charts: ElementCharts,
): { over: boolean; ooc: boolean; chart: (ImrChart & { specPpm: number }) | null } {
  const chart = charts.get(r.element) ?? null;
  if (r.qualifier === "<") return { over: false, ooc: false, chart };
  const point = chart?.points.find((p) => p.id === ingotId);
  return { over: r.valuePpm > SPEC_LIMIT_PPM[r.element], ooc: Boolean(point?.outOfControl), chart };
}

// ---- 화면 ----

export default function TraceExplorer({ target, onTargetChange }: TraceExplorerProps) {
  const { dataset, userRolls } = useDemoData();
  const rootRef = useRef<HTMLDivElement>(null);

  const targetKey = target ? `${target.type}:${target.id}` : "";
  const [syncedKey, setSyncedKey] = useState(targetKey);
  const [query, setQuery] = useState(target?.id ?? "");
  const [searchError, setSearchError] = useState<SearchError | null>(null);
  if (syncedKey !== targetKey) {
    // 바깥(다른 탭·칩)에서 대상이 바뀌면 입력창을 맞춘다 — 렌더 중 상태 보정 패턴
    setSyncedKey(targetKey);
    setQuery(target?.id ?? "");
    setSearchError(null);
  }

  const idIndex = useMemo(() => buildIdIndex(dataset), [dataset]);
  const sdChart = useMemo(() => thicknessSdChart(dataset), [dataset]);
  const elementCharts = useMemo<ElementCharts>(
    () => new Map(ICP_ELEMENTS.map((el) => [el, elementChart(dataset, el)] as const)),
    [dataset],
  );

  const resultRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  /** 칩·검색으로 대상을 바꾸면 결과로 포커스를 옮긴다 — 누른 칩이 사라져 포커스가 문서 맨 앞으로 떨어지지 않게 */
  const pendingFocus = useRef(false);

  const go = (next: TraceTarget | null) => {
    const nextKey = next ? `${next.type}:${next.id}` : "";
    if (nextKey !== targetKey) pendingFocus.current = true;
    onTargetChange(next);
    const el = rootRef.current;
    if (el && el.getBoundingClientRect().top < 0) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    if (!pendingFocus.current) return;
    pendingFocus.current = false;
    if (targetKey) resultRef.current?.focus({ preventScroll: true });
    else searchInputRef.current?.focus({ preventScroll: true });
  }, [targetKey]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = searchId(dataset, idIndex, query);
    if (result.ok) {
      setSearchError(null);
      if (sameTarget(result.target, target)) setQuery(result.target.id);
      else go(result.target);
    } else {
      setSearchError(result.error);
    }
  };

  const quickChips = useMemo(() => {
    const chips: Array<{ key: string; label: string; target: TraceTarget; tone: Tone }> = [];
    const claim = (code: string) => dataset.nonconformances.find((n) => n.type === "claim" && n.reasonCode === code);
    const surf = claim("SURF-DISC");
    if (surf) chips.push({ key: "surf", label: "표면 변색 클레임 출하", target: { type: "shipment", id: surf.targetId }, tone: "rose" });
    const thk = claim("THK-DEV");
    if (thk) chips.push({ key: "thk", label: "두께 편차 클레임 출하", target: { type: "shipment", id: thk.targetId }, tone: "rose" });
    const fe = dataset.nonconformances.find((n) => n.reasonCode === "IMP-FE" && n.targetType === "ingot");
    if (fe) chips.push({ key: "fe", label: "Fe 규격 초과 잉곳", target: { type: "ingot", id: fe.targetId }, tone: "amber" });
    const scrap = dataset.materialLots.find((l) => l.origin === "internal_scrap");
    if (scrap) chips.push({ key: "scrap", label: "스크랩 회수 로트", target: { type: "material", id: scrap.id }, tone: "amber" });
    const lastUser = userRolls[userRolls.length - 1];
    if (lastUser) chips.push({ key: "user", label: "방금 입력한 롤", target: { type: "roll", id: lastUser.id }, tone: "emerald" });
    return chips;
  }, [dataset, userRolls]);

  return (
    <div ref={rootRef} className={`space-y-4 lg:space-y-6 ${SCROLL_MARGIN} [word-break:keep-all]`}>
      <Card>
        <CardHeader
          eyebrow="로트 계보 추적"
          title="클레임 한 건에서 원인 공정까지, 원료 한 로트에서 출하까지"
          description="아이디 하나로 출하 → 슬릿 롤 → 모 롤 → 잉곳 → 정제 배치 → 원료를 잇습니다. 모든 데이터는 가상입니다."
          right={
            target ? (
              <button
                type="button"
                onClick={() => go(null)}
                className="inline-flex items-center gap-1.5 min-h-10 px-3 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-3.5 h-3.5" aria-hidden />
                조회 지우기
              </button>
            ) : undefined
          }
        />

        <form onSubmit={onSubmit} className="flex gap-2" role="search">
          <label htmlFor="trace-id-input" className="sr-only">
            조회할 아이디
          </label>
          <div className="relative flex-1 min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" aria-hidden />
            <input
              ref={searchInputRef}
              id="trace-id-input"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                if (searchError) setSearchError(null);
              }}
              placeholder="예: SH-260802-01 · RM-2607-004"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              aria-invalid={Boolean(searchError)}
              aria-describedby={searchError ? "trace-search-error" : "trace-search-hint"}
              className="w-full h-11 pl-9 pr-3 rounded-xl bg-gray-950 border border-white/10 text-sm text-white font-mono placeholder:font-sans placeholder:text-gray-500 focus:outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
          <button
            type="submit"
            className="shrink-0 h-11 px-4 lg:px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-bold text-white transition-colors"
          >
            조회
          </button>
        </form>

        {searchError ? (
          <div id="trace-search-error" role="alert" className="mt-3">
            <Callout tone="amber" icon={<AlertTriangle className="w-4 h-4" aria-hidden />}>
              <p>{searchError.message}</p>
              {searchError.suggestions.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {searchError.suggestions.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setSearchError(null);
                        go(s.target);
                      }}
                      className="inline-flex flex-col items-start min-h-10 px-2.5 py-1.5 rounded-lg border border-amber-500/30 bg-gray-950/60 hover:border-amber-400/60 text-left transition-colors"
                    >
                      <span className="font-mono text-xs text-white break-all">{s.id}</span>
                      <span className="text-[11px] text-gray-400">{s.hint}</span>
                    </button>
                  ))}
                </div>
              )}
            </Callout>
          </div>
        ) : (
          <p id="trace-search-hint" className="mt-2 text-[11px] lg:text-xs text-gray-500">
            출하 SH- · 롤 R- · 잉곳 ING- · 원료·자재 RM- — 대소문자·공백·하이픈은 신경 쓰지 않아도 됩니다.
          </p>
        )}

        {quickChips.length > 0 && (
          <div className="mt-4">
            <div className="text-[11px] font-bold text-gray-400 mb-2">빠른 시작</div>
            <div className="flex flex-wrap gap-2">
              {quickChips.map((c) => {
                const active = sameTarget(c.target, target);
                return (
                  <button
                    key={c.key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => go(c.target)}
                    className={`inline-flex flex-col items-start min-h-10 px-3 py-1.5 rounded-xl border text-left transition-colors ${
                      active ? "border-indigo-400/60 bg-indigo-500/15" : `${TONE[c.tone].border} bg-gray-950/60 hover:bg-white/5`
                    }`}
                  >
                    <span className={`text-xs font-bold ${active ? "text-white" : TONE[c.tone].text}`}>{c.label}</span>
                    <span className="font-mono text-[11px] text-gray-400 break-all">{c.target.id}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </Card>

      <div
        ref={resultRef}
        tabIndex={-1}
        role="region"
        aria-label={target ? `${TYPE_LABEL[target.type]} ${target.id} 조회 결과` : "조회 안내"}
        className="space-y-4 lg:space-y-6 focus:outline-none"
      >
        {!target && <EmptyState />}

        {target && (
          <TraceResult
            dataset={dataset}
            target={target}
            sdChart={sdChart}
            elementCharts={elementCharts}
            onSelect={go}
          />
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  const items: Array<{ icon: ReactNode; title: string; body: string }> = [
    {
      icon: <Truck className="w-4 h-4" aria-hidden />,
      title: "역추적 — 클레임에서 원인으로",
      body: "출하·롤·잉곳 아이디를 넣으면 그 제품이 거쳐 온 롤·잉곳·배치·원료를 한 줄로 세우고, 규칙에 걸린 의심 지점을 옆에 뽑아 줍니다.",
    },
    {
      icon: <Package className="w-4 h-4" aria-hidden />,
      title: "정추적 — 원료에서 출하로",
      body: "원료 로트(RM-)를 넣으면 그 로트가 들어간 배치·잉곳·롤·출하를 세어, 회수·통보할 범위를 표로 보여 줍니다.",
    },
    {
      icon: <GitBranch className="w-4 h-4" aria-hidden />,
      title: "계속 따라가기",
      body: "화면의 아이디 칩은 전부 누를 수 있습니다. 롤을 누르면 그 롤 기준으로, 잉곳을 누르면 잉곳 기준으로 다시 펼쳐집니다.",
    },
  ];
  return (
    <Card>
      <CardHeader
        eyebrow="무엇을 할 수 있나요"
        title="위의 빠른 시작 칩 하나를 눌러 보세요"
        description="여러 장부를 뒤져야 하던 「이 클레임, 어느 원료·어느 작업에서 왔나?」를 아이디 하나로 답합니다."
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {items.map((it) => (
          <div key={it.title} className="rounded-xl border border-white/10 bg-gray-950/50 p-4">
            <div className="flex items-center gap-2 text-indigo-300 mb-1.5">
              {it.icon}
              <span className="text-sm font-bold text-white">{it.title}</span>
            </div>
            <p className="text-xs lg:text-sm text-gray-400 leading-relaxed">{it.body}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

// ---- 결과 ----

type ResultProps = {
  dataset: Dataset;
  target: TraceTarget;
  sdChart: ImrChart;
  elementCharts: ElementCharts;
  onSelect: (t: TraceTarget) => void;
};

function TraceResult({ dataset, target, sdChart, elementCharts, onSelect }: ResultProps) {
  const back = useMemo(
    () => (target.type === "material" ? null : traceBack(dataset, { type: target.type, id: target.id })),
    [dataset, target],
  );
  const forwardMaterial = useMemo(
    () => (target.type === "material" ? traceForward(dataset, target.id) : null),
    [dataset, target],
  );
  const forwardIngot = useMemo(
    () => (target.type === "ingot" ? traceForwardFromIngot(dataset, target.id) : null),
    [dataset, target],
  );
  const suspects = useMemo(
    () => (back ? buildSuspects(dataset, back, sdChart, elementCharts) : null),
    [dataset, back, sdChart, elementCharts],
  );

  const notFound = target.type === "material" ? !forwardMaterial : !back;
  if (notFound) {
    return (
      <Card>
        <Callout tone="amber" icon={<AlertTriangle className="w-4 h-4" aria-hidden />}>
          {TYPE_LABEL[target.type]} <span className="font-mono">{target.id}</span> 를 데이터에서 찾을 수 없습니다. 위 입력창에서
          아이디를 다시 확인해 주세요.
        </Callout>
      </Card>
    );
  }

  const ctx: NodeCtx = { dataset, target, sdChart, elementCharts, onSelect };

  if (target.type === "material" && forwardMaterial) {
    const lot = forwardMaterial.lot;
    const slitIds = new Set(forwardMaterial.slitRolls.map((r) => r.id));
    return (
      <div className="space-y-4 lg:space-y-6">
        <Card>
          <CardHeader eyebrow="조회 대상 — 원료·자재 로트" title={`${MATERIAL_TYPE_LABEL[lot.type]} ${lot.id}`} />
          <MaterialNode lot={lot} ctx={ctx} />
          {lot.origin === "internal_scrap" && forwardMaterial.batches.length > 0 && (
            <div className="mt-3">
              <Callout tone="amber" icon={<AlertTriangle className="w-4 h-4" aria-hidden />}>
                자사에서 회수한 스크랩이 정제 배치 {forwardMaterial.batches.length}건에 다시 들어갔습니다. 성적서가 없는 원료라, 이
                로트에 문제가 생기면 아래 범위 전체를 함께 봐야 합니다.
              </Callout>
            </div>
          )}
        </Card>
        <ForwardPanel
          eyebrow="정추적 — 영향 범위"
          title={`${lot.id} 가 들어간 곳`}
          tiles={[
            { label: "정제 배치", value: forwardMaterial.batches.length, tone: "indigo" },
            { label: "잉곳", value: forwardMaterial.ingots.length, tone: "indigo" },
            { label: "모 롤", value: forwardMaterial.motherRolls.length, tone: "purple" },
            { label: "슬릿 롤", value: forwardMaterial.slitRolls.length, tone: "purple" },
            { label: "출하", value: forwardMaterial.shipments.length, tone: forwardMaterial.shipments.length ? "rose" : "emerald" },
          ]}
          paths={
            <PathChips
              groups={[
                { label: "배치", ids: forwardMaterial.batches.map((b) => b.id), toTarget: null },
                { label: "잉곳", ids: forwardMaterial.ingots.map((i) => i.id), toTarget: (id) => ({ type: "ingot", id }) },
                // 이형 필름처럼 배치를 거치지 않는 자재는 모 롤로 바로 이어진다
                ...(forwardMaterial.batches.length === 0
                  ? [{ label: "모 롤", ids: forwardMaterial.motherRolls.map((r) => r.id), toTarget: (id: string): TraceTarget => ({ type: "roll", id }) }]
                  : []),
              ]}
              ctx={ctx}
            />
          }
          emptyNote={
            forwardMaterial.batches.length === 0 && forwardMaterial.motherRolls.length === 0
              ? "이 자재는 배치·롤에 로트 연결이 기록되어 있지 않습니다. 투입 기록을 받기 시작하면 같은 방식으로 추적됩니다."
              : "아직 출하로 이어진 롤이 없습니다."
          }
          shipments={forwardMaterial.shipments}
          scopeSlitIds={slitIds}
          ctx={ctx}
        />
      </div>
    );
  }

  if (!back || !suspects) return null;

  const allRolls = [...back.rolls, ...back.parentRolls];
  const slits = allRolls.filter((r) => r.stage === "slit").sort((a, b) => (a.id < b.id ? -1 : 1));
  const mothers = allRolls.filter((r) => r.stage !== "slit").sort((a, b) => (a.id < b.id ? -1 : 1));

  // 모 롤을 직접 조회했으면 그 롤이 나간 곳도 함께 본다
  const motherTarget = target.type === "roll" ? mothers.find((m) => m.id === target.id) : undefined;
  const motherForward = motherTarget ? forwardFromMother(dataset, motherTarget.id) : null;

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] gap-4 lg:gap-6 items-start">
        <Card className="min-w-0">
          <CardHeader
            eyebrow="역추적 — 결과에서 원인으로"
            title={`${TYPE_LABEL[target.type]} ${target.id}`}
            description="위에서 아래로 공정을 거슬러 올라갑니다. 아이디 칩을 누르면 그 지점 기준으로 다시 펼칩니다."
          />
          <ChainSummary back={back} slits={slits.length} mothers={mothers.length} />
          <ol className="mt-5">
            {back.shipment && (
              <Stage icon={<Truck className="w-4 h-4" aria-hidden />} label="출하" count={1}>
                <ShipmentNode shipment={back.shipment} ctx={ctx} ncs={ncsFor(back.nonconformances, back.shipment.id)} />
              </Stage>
            )}
            {slits.length > 0 && (
              <Stage icon={<Scissors className="w-4 h-4" aria-hidden />} label="슬릿 롤" sub="폭을 나눠 자른 출하 단위 롤" count={slits.length}>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                  {slits.map((r) => (
                    <SlitNode key={r.id} roll={r} ctx={ctx} ncs={ncsFor(back.nonconformances, r.id)} />
                  ))}
                </div>
              </Stage>
            )}
            {mothers.length > 0 && (
              <Stage icon={<Layers className="w-4 h-4" aria-hidden />} label="모 롤" sub="압연기에서 나온 원단 롤" count={mothers.length}>
                <div className="space-y-2">
                  {mothers.map((r) => (
                    <MotherNode key={r.id} roll={r} ctx={ctx} ncs={ncsFor(back.nonconformances, r.id)} />
                  ))}
                </div>
              </Stage>
            )}
            {back.ingots.length > 0 && (
              <Stage icon={<Box className="w-4 h-4" aria-hidden />} label="잉곳" sub="정제한 리튬을 굳힌 덩어리" count={back.ingots.length}>
                <div className="space-y-2">
                  {back.ingots.map((i) => (
                    <IngotNode key={i.id} ingot={i} ctx={ctx} ncs={ncsFor(back.nonconformances, i.id)} />
                  ))}
                </div>
              </Stage>
            )}
            {back.batches.length > 0 && (
              <Stage icon={<FlaskConical className="w-4 h-4" aria-hidden />} label="정제 배치" count={back.batches.length}>
                <div className="space-y-2">
                  {back.batches.map((b) => (
                    <BatchNode key={b.id} batch={b} ctx={ctx} ncs={ncsFor(back.nonconformances, b.id)} />
                  ))}
                </div>
              </Stage>
            )}
            {back.materialLots.length > 0 && (
              <Stage
                icon={<Package className="w-4 h-4" aria-hidden />}
                label="원료·자재 로트"
                sub="누르면 이 로트가 퍼진 범위(정추적)"
                count={back.materialLots.length}
                last
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {back.materialLots.map((l) => (
                    <MaterialNode key={l.id} lot={l} ctx={ctx} compact />
                  ))}
                </div>
              </Stage>
            )}
          </ol>
        </Card>

        <SuspectPanel suspects={suspects.suspects} unknowns={suspects.unknowns} ctx={ctx} />
      </div>

      {forwardIngot && (
        <ForwardPanel
          eyebrow="정추적 — 이 잉곳이 퍼진 범위"
          title={`${forwardIngot.ingot.id} 로 만든 롤과 출하`}
          tiles={[
            { label: "정제 배치", value: 1, tone: "indigo" },
            { label: "잉곳", value: 1, tone: "indigo" },
            { label: "모 롤", value: forwardIngot.motherRolls.length, tone: "purple" },
            { label: "슬릿 롤", value: forwardIngot.slitRolls.length, tone: "purple" },
            { label: "출하", value: forwardIngot.shipments.length, tone: forwardIngot.shipments.length ? "rose" : "emerald" },
          ]}
          paths={
            <PathChips
              groups={[{ label: "모 롤", ids: forwardIngot.motherRolls.map((r) => r.id), toTarget: (id) => ({ type: "roll", id }) }]}
              ctx={ctx}
            />
          }
          holdCount={[...forwardIngot.motherRolls, ...forwardIngot.slitRolls].filter((r) => r.status === "hold").length}
          emptyNote="이 잉곳으로 만든 롤이 아직 출하로 이어지지 않았습니다."
          shipments={forwardIngot.shipments}
          scopeSlitIds={new Set(forwardIngot.slitRolls.map((r) => r.id))}
          ctx={ctx}
        />
      )}

      {motherForward && motherTarget && (
        <ForwardPanel
          eyebrow="정추적 — 이 모 롤이 나간 곳"
          title={`${motherTarget.id} 에서 자른 롤과 출하`}
          tiles={[
            { label: "슬릿 롤", value: motherForward.slitRolls.length, tone: "purple" },
            { label: "출하", value: motherForward.shipments.length, tone: motherForward.shipments.length ? "rose" : "emerald" },
          ]}
          paths={
            <PathChips
              groups={[{ label: "슬릿 롤", ids: motherForward.slitRolls.map((r) => r.id), toTarget: (id) => ({ type: "roll", id }) }]}
              ctx={ctx}
            />
          }
          emptyNote={
            motherForward.slitRolls.length === 0
              ? "아직 슬리팅 전인 롤입니다. 자르고 출하하면 여기서 바로 이어집니다."
              : "아직 출하로 이어지지 않았습니다."
          }
          shipments={motherForward.shipments}
          scopeSlitIds={new Set(motherForward.slitRolls.map((r) => r.id))}
          ctx={ctx}
        />
      )}
    </div>
  );
}

function forwardFromMother(ds: Dataset, motherId: string): { slitRolls: Roll[]; shipments: Shipment[] } {
  const slitRolls = ds.rolls.filter((r) => r.parentRollId === motherId);
  const ids = new Set(slitRolls.map((r) => r.id));
  return { slitRolls, shipments: ds.shipments.filter((s) => s.rollIds.some((id) => ids.has(id))) };
}

function ncsFor(ncs: NonConformance[], id: string): NonConformance[] {
  return ncs.filter((n) => n.targetId === id);
}

// ---- 사슬 조각 ----

type NodeCtx = {
  dataset: Dataset;
  target: TraceTarget;
  sdChart: ImrChart;
  elementCharts: ElementCharts;
  onSelect: (t: TraceTarget) => void;
};

function ChainSummary({ back, slits, mothers }: { back: Genealogy; slits: number; mothers: number }) {
  const parts: string[] = [];
  if (back.shipment) parts.push("출하 1");
  if (slits) parts.push(`슬릿 롤 ${slits}`);
  if (mothers) parts.push(`모 롤 ${mothers}`);
  if (back.ingots.length) parts.push(`잉곳 ${back.ingots.length}`);
  if (back.batches.length) parts.push(`배치 ${back.batches.length}`);
  if (back.materialLots.length) parts.push(`원료·자재 ${back.materialLots.length}`);
  return (
    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] lg:text-xs text-gray-400">
      {parts.map((p, i) => (
        <span key={p} className="inline-flex items-center gap-1.5">
          {i > 0 && <span className="text-gray-600" aria-hidden>←</span>}
          <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-300">{p}</span>
        </span>
      ))}
      {back.nonconformances.length > 0 && (
        <Badge tone="rose" className="ml-1">
          부적합 {back.nonconformances.length}건
        </Badge>
      )}
    </div>
  );
}

function Stage({
  icon,
  label,
  sub,
  count,
  last = false,
  children,
}: {
  icon: ReactNode;
  label: string;
  sub?: string;
  count: number;
  last?: boolean;
  children: ReactNode;
}) {
  return (
    <li className={`relative pl-11 lg:pl-14 ${last ? "" : "pb-5 lg:pb-6"}`}>
      {!last && (
        <span aria-hidden className="absolute left-4 lg:left-5 top-10 bottom-1 w-px bg-indigo-500/25">
          <ArrowDown className="absolute -left-[5.5px] -bottom-1 w-3 h-3 text-indigo-400/60" />
        </span>
      )}
      <span className="absolute left-0 top-0 flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
        {icon}
      </span>
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 min-h-8 lg:min-h-10 pt-1 lg:pt-2 mb-2">
        <span className="text-sm font-bold text-white">{label}</span>
        {count > 1 && <span className="text-xs text-gray-400">{count}개</span>}
        {sub && <span className="text-[11px] text-gray-500">{sub}</span>}
      </div>
      {children}
    </li>
  );
}

function IdChip({ id, target, ctx }: { id: string; target: TraceTarget | null; ctx: NodeCtx }) {
  const current = target !== null && sameTarget(target, ctx.target);
  const base = "inline-flex items-center gap-1 max-w-full px-2 py-1 rounded-md border font-mono text-[11px] lg:text-xs break-all text-left";
  if (!target || current) {
    return (
      <span
        className={`${base} ${current ? "border-indigo-400/60 bg-indigo-500/15 text-indigo-100" : "border-white/10 bg-white/5 text-gray-300"}`}
        aria-current={current ? "true" : undefined}
      >
        {id}
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={() => ctx.onSelect(target)}
      title={`${TYPE_LABEL[target.type]} ${id} 기준으로 보기`}
      className={`${base} relative border-white/15 bg-white/5 text-gray-100 hover:border-indigo-400/60 hover:bg-indigo-500/10 hover:text-white transition-colors before:absolute before:content-[''] before:-inset-y-1.5 before:inset-x-0`}
    >
      {id}
      <ArrowUpRight className="w-3 h-3 shrink-0 text-indigo-300" aria-hidden />
    </button>
  );
}

function NodeFrame({ id, danger, children }: { id: string; danger: boolean; children: ReactNode }) {
  return (
    <div
      data-node-id={id}
      className={`rounded-xl border p-3 lg:p-4 min-w-0 ${danger ? "border-rose-500/30 bg-rose-500/[0.04]" : "border-white/10 bg-gray-950/50"}`}
    >
      {children}
    </div>
  );
}

function NcBadges({ ncs }: { ncs: NonConformance[] }) {
  if (!ncs.length) return null;
  return (
    <div className="mt-2 space-y-1.5">
      {ncs.map((n) => {
        const tone: Tone = n.closedAt ? "gray" : n.type === "safety" ? "amber" : "rose";
        const typeLabel = n.type === "claim" ? "고객 클레임" : n.type === "safety" ? "안전" : "내부 부적합";
        return (
          <div key={n.id} className={`rounded-lg border px-2.5 py-2 ${TONE[tone].bg} ${TONE[tone].border}`}>
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge tone={tone}>
                <AlertTriangle className="w-3 h-3" aria-hidden />
                {typeLabel} {n.id}
              </Badge>
              <span className="font-mono text-[11px] text-gray-400">{n.reasonCode}</span>
              <span className="text-[11px] text-gray-500">
                {fmtShortDate(n.openedAt)} 등록{n.closedAt ? ` · ${fmtShortDate(n.closedAt)} 종결` : " · 미결"}
              </span>
            </div>
            <p className="mt-1 text-xs text-gray-300 leading-relaxed">{n.description}</p>
          </div>
        );
      })}
    </div>
  );
}

function Field({ label, children, tone }: { label: string; children: ReactNode; tone?: Tone }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] text-gray-500">{label}</dt>
      <dd className={`text-xs lg:text-sm font-semibold break-words ${tone ? TONE[tone].text : "text-gray-200"}`}>{children}</dd>
    </div>
  );
}

function ShipmentNode({ shipment, ctx, ncs }: { shipment: Shipment; ctx: NodeCtx; ncs: NonConformance[] }) {
  const verdict = verdictBadge(shipment);
  let due: { text: string; tone: Tone };
  if (shipment.shippedAt) {
    const d = diffDays(shipment.shippedAt, shipment.promisedDate);
    due = d > 0 ? { text: `납기 ${d}일 지연`, tone: "rose" } : { text: d === 0 ? "납기 당일 출하" : `납기 준수 (${-d}일 먼저)`, tone: "emerald" };
  } else {
    const d = diffDays(ctx.dataset.asOf, shipment.promisedDate);
    due = d > 0 ? { text: `미출하 · 약속일 ${d}일 경과`, tone: "rose" } : { text: `출하 전 · 약속일까지 ${-d}일`, tone: "gray" };
  }
  return (
    <NodeFrame id={shipment.id} danger={shipment.verdict === "claim"}>
      <div className="flex flex-wrap items-center gap-2">
        <IdChip id={shipment.id} target={{ type: "shipment", id: shipment.id }} ctx={ctx} />
        <Badge tone={verdict.tone}>{verdict.label}</Badge>
        <Badge tone={due.tone}>{due.text}</Badge>
      </div>
      <dl className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-2">
        <Field label="고객">{shipment.customer}</Field>
        <Field label="수주일">{fmtShortDate(shipment.orderDate)}</Field>
        <Field label="약속일">{fmtShortDate(shipment.promisedDate)}</Field>
        <Field label="출하일">{shipment.shippedAt ? fmtShortDate(shipment.shippedAt) : "—"}</Field>
      </dl>
      {shipment.claimReason && (
        <p className="mt-3 text-xs lg:text-sm text-rose-300 leading-relaxed">클레임 사유: {shipment.claimReason}</p>
      )}
      <NcBadges ncs={ncs} />
    </NodeFrame>
  );
}

function verdictBadge(s: Shipment): { label: string; tone: Tone } {
  if (s.verdict === "claim") return { label: "클레임", tone: "rose" };
  if (s.verdict === "accepted") return { label: "고객 합격", tone: "emerald" };
  return s.shippedAt ? { label: "판정 대기", tone: "gray" } : { label: "출하 전", tone: "gray" };
}

function SlitNode({ roll, ctx, ncs }: { roll: Roll; ctx: NodeCtx; ncs: NonConformance[] }) {
  const st = ROLL_STATUS[roll.status];
  return (
    <NodeFrame id={roll.id} danger={roll.status === "hold" || roll.status === "scrapped"}>
      <div className="flex flex-wrap items-center gap-2">
        <IdChip id={roll.id} target={{ type: "roll", id: roll.id }} ctx={ctx} />
        <Badge tone={st.tone}>{st.label}</Badge>
      </div>
      <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5">
        <Field label="폭">{fmtNum(roll.widthMm, 0)}mm</Field>
        <Field label="양품 길이">{fmtNum(roll.goodLengthM, 0)}m</Field>
      </dl>
      <NcBadges ncs={ncs} />
    </NodeFrame>
  );
}

function MotherNode({ roll, ctx, ncs }: { roll: Roll; ctx: NodeCtx; ncs: NonConformance[] }) {
  const st = ROLL_STATUS[roll.status];
  const recipe = ctx.dataset.recipes.find((r) => r.id === roll.recipeId);
  const thickness = rollThicknessUm(roll);
  const sd = rollThicknessSdUm(roll);
  const sdOver = sd !== null && sd > ctx.sdChart.ucl;
  const dewOver = roll.dewPointC !== null && roll.dewPointC > DEW_POINT_LIMIT_C;
  const reuseWarn = roll.filmReuseCount !== null && roll.filmReuseCount >= FILM_REUSE_WARN;
  const isTrial = roll.recipeId === TRIAL_RECIPE_ID;
  const gradeTone: Tone | undefined = roll.surfaceGrade === "C" ? "rose" : roll.surfaceGrade === "B" ? "amber" : roll.surfaceGrade === "A" ? "emerald" : undefined;

  return (
    <NodeFrame id={roll.id} danger={dewOver || sdOver || roll.status === "hold"}>
      <div className="flex flex-wrap items-center gap-2">
        <IdChip id={roll.id} target={{ type: "roll", id: roll.id }} ctx={ctx} />
        <Badge tone={st.tone}>{st.label}</Badge>
        <Badge tone={isTrial ? "amber" : "purple"}>
          {recipeLabel(roll.recipeId)}
          {recipe ? ` · ${recipe.name}` : ""}
        </Badge>
        {roll.entryMode === "user" && <Badge tone="emerald">방금 입력</Badge>}
      </div>
      <dl className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-2.5">
        <Field label="패스 수">{roll.passCount}패스</Field>
        <Field label="노점 (교대 시작)" tone={roll.dewPointC === null ? "gray" : dewOver ? "rose" : undefined}>
          {roll.dewPointC === null ? "결측 — 기록 없음" : fmtTemp(roll.dewPointC)}
        </Field>
        <Field label="파단" tone={roll.tearCount > 0 ? "amber" : undefined}>
          {roll.tearCount}회{roll.lostLengthM ? ` · 손실 ${fmtNum(roll.lostLengthM, 0)}m` : ""}
        </Field>
        <div className="min-w-0 col-span-2 sm:col-span-3">
          <dt className="text-[11px] text-gray-500">이형 필름 로트 · 재사용</dt>
          <dd className="mt-0.5 flex flex-wrap items-center gap-2">
            {roll.filmLotId ? (
              <IdChip id={roll.filmLotId} target={{ type: "material", id: roll.filmLotId }} ctx={ctx} />
            ) : (
              <span className="text-xs text-gray-400">결측</span>
            )}
            {roll.filmReuseCount !== null && (
              <span className={`text-xs lg:text-sm font-semibold ${reuseWarn ? TONE.amber.text : "text-gray-200"}`}>
                {roll.filmReuseCount === 1 ? "새 필름" : `${roll.filmReuseCount}회째 재사용`}
              </span>
            )}
          </dd>
        </div>
        <div className="min-w-0 col-span-2 sm:col-span-3">
          <dt className="text-[11px] text-gray-500">면밀도 3점 (좌·중·우) → 두께 · 면밀도는 정해진 넓이의 무게로, 두께의 정본</dt>
          <dd className="text-xs lg:text-sm font-semibold text-gray-200 break-words">
            {roll.arealDensityGm2 && thickness ? (
              <>
                <span className="font-mono">{roll.arealDensityGm2.map((v) => fmtNum(v, 2)).join(" · ")}</span> g/m² →{" "}
                <span className="font-mono">{thickness.map((v) => fmtNum(v, 1)).join(" · ")}</span> µm
              </>
            ) : (
              <span className="text-gray-400">결측 — 두께를 판단할 수 없음</span>
            )}
          </dd>
        </div>
        <Field label="두께 SD (롤 안 산포)" tone={sd === null ? "gray" : sdOver ? "rose" : undefined}>
          {sd === null ? "—" : `${fmtNum(sd, 2)}µm`}
          {sdOver && <span className="block text-[11px] font-normal">관리상한 {fmtNum(ctx.sdChart.ucl, 2)}µm 초과</span>}
        </Field>
        <Field label="외관 등급" tone={gradeTone ?? "gray"}>
          {roll.surfaceGrade ?? "결측"}
        </Field>
        <Field label="작업자">{roll.operator}</Field>
        <Field label="작업 시각">
          {fmtShortDateTime(roll.startedAt)}~{roll.endedAt.slice(11, 16)}
        </Field>
        <Field label="양품 길이 · 폭">
          {fmtNum(roll.goodLengthM, 0)}m · {fmtNum(roll.widthMm, 0)}mm
        </Field>
      </dl>
      <NcBadges ncs={ncs} />
    </NodeFrame>
  );
}

function IngotNode({ ingot, ctx, ncs }: { ingot: Ingot; ctx: NodeCtx; ncs: NonConformance[] }) {
  const rows = ICP_ELEMENTS.map((el) => ingot.icp.find((r) => r.element === el)).filter((r): r is IcpResult => Boolean(r));
  const judged = rows.map((r) => ({ r, j: judgeIcp(ingot.id, r, ctx.elementCharts) }));
  const anyOver = judged.some((x) => x.j.over);
  const reportedAt = rows[0]?.reportedAt;
  const lab = rows[0]?.lab;

  return (
    <NodeFrame id={ingot.id} danger={anyOver}>
      <div className="flex flex-wrap items-center gap-2">
        <IdChip id={ingot.id} target={{ type: "ingot", id: ingot.id }} ctx={ctx} />
        {anyOver ? <Badge tone="rose">불순물 규격 초과</Badge> : rows.length ? <Badge tone="emerald">ICP 규격 이내</Badge> : <Badge>ICP 대기</Badge>}
      </div>
      <dl className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-x-3 gap-y-2">
        <Field label="주조일">{fmtShortDate(ingot.castAt)}</Field>
        <Field label="질량">{fmtNum(ingot.massKg, 2)}kg</Field>
        <Field label="밀도">{fmtNum(ingot.densityGcm3, 3)}g/cm³</Field>
        <Field label="외관" tone={ingot.appearanceOk ? undefined : "rose"}>
          {ingot.appearanceOk ? "이상 없음" : "이상"}
        </Field>
      </dl>
      {rows.length > 0 && (
        <div className="mt-3">
          <div className="text-[11px] text-gray-500 mb-1.5">
            ICP 불순물 분석 (ppm){lab ? ` · ${lab}` : ""}
            {reportedAt ? ` · ${fmtShortDate(reportedAt)} 회신` : ""}
          </div>
          <TableWrap>
            <table className="w-full min-w-[320px] text-xs lg:text-sm">
              <thead>
                <tr className="text-left text-[11px] text-gray-500">
                  <th className="py-1.5 pr-3 font-medium">원소</th>
                  <th className="py-1.5 pr-3 font-medium text-right">값</th>
                  <th className="py-1.5 pr-3 font-medium text-right">규격</th>
                  <th className="py-1.5 font-medium">판정</th>
                </tr>
              </thead>
              <tbody>
                {judged.map(({ r, j }) => {
                  const verdict: { label: string; tone: Tone } = j.over
                    ? { label: "규격 초과", tone: "rose" }
                    : j.ooc
                      ? { label: "관리한계 이탈", tone: "amber" }
                      : r.qualifier === "<"
                        ? { label: "검출한계 미만", tone: "gray" }
                        : { label: "적합", tone: "emerald" };
                  return (
                    <tr key={r.element} className={`border-t border-white/5 ${j.over ? "bg-rose-500/[0.06]" : ""}`}>
                      <td className="py-1.5 pr-3 font-semibold text-gray-200">{r.element}</td>
                      <td className={`py-1.5 pr-3 text-right font-mono ${j.over ? "text-rose-300 font-bold" : j.ooc ? "text-amber-300" : "text-gray-200"}`}>
                        {r.qualifier === "<" ? "<" : ""}
                        {fmtNum(r.valuePpm, 1)}
                      </td>
                      <td className="py-1.5 pr-3 text-right font-mono text-gray-400">≤{SPEC_LIMIT_PPM[r.element]}</td>
                      <td className="py-1.5">
                        <Badge tone={verdict.tone}>{verdict.label}</Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableWrap>
          <p className="mt-1.5 text-[11px] text-gray-400 leading-relaxed">
            관리한계 — 새 도가니로 작업한 앞 잉곳들로 잡은 평소 범위(검출된 값이 모자란 원소는 판정하지 않음). 「&lt;」 는 검출한계 미만이라 통계에 넣지 않습니다.
          </p>
        </div>
      )}
      <NcBadges ncs={ncs} />
    </NodeFrame>
  );
}

function BatchNode({ batch, ctx, ncs }: { batch: RefineBatch; ctx: NodeCtx; ncs: NonConformance[] }) {
  const crucibleWarn = batch.crucibleUseCount >= CRUCIBLE_WARN;
  return (
    <NodeFrame id={batch.id} danger={false}>
      <div className="flex flex-wrap items-center gap-2">
        <IdChip id={batch.id} target={null} ctx={ctx} />
        <Badge tone={crucibleWarn ? "amber" : "gray"}>도가니 {batch.crucibleUseCount}회째</Badge>
      </div>
      <dl className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-2">
        <Field label="투입 → 출력">
          {fmtNum(batch.inputKg, 2)} → {fmtNum(batch.outputKg, 2)}kg
        </Field>
        <Field label="정제 수율">{batch.inputKg > 0 ? fmtPct(batch.outputKg / batch.inputKg, 1) : "—"}</Field>
        <Field label="도가니 사용" tone={crucibleWarn ? "amber" : undefined}>
          {batch.crucibleUseCount}회째{crucibleWarn ? " (6회 이상)" : ""}
        </Field>
        <Field label="정제 레시피">
          <span className="font-mono">{batch.recipeId}</span>
        </Field>
        <Field label="작업자">{batch.operator}</Field>
        <Field label="작업 시각">
          {fmtShortDateTime(batch.startedAt)}~{batch.endedAt.slice(11, 16)}
        </Field>
      </dl>
      <NcBadges ncs={ncs} />
    </NodeFrame>
  );
}

function MaterialNode({ lot, ctx, compact = false }: { lot: MaterialLot; ctx: NodeCtx; compact?: boolean }) {
  const scrap = lot.origin === "internal_scrap";
  return (
    <NodeFrame id={lot.id} danger={false}>
      <div className="flex flex-wrap items-center gap-2">
        <IdChip id={lot.id} target={{ type: "material", id: lot.id }} ctx={ctx} />
        <Badge tone="indigo">{MATERIAL_TYPE_LABEL[lot.type]}</Badge>
        <Badge tone={scrap ? "amber" : "gray"}>{scrap ? "스크랩 회수" : "구매"}</Badge>
      </div>
      <dl className={`mt-2 grid grid-cols-2 ${compact ? "" : "sm:grid-cols-4"} gap-x-3 gap-y-1.5`}>
        <Field label="공급처">{lot.supplier}</Field>
        <Field label="입고일">{fmtShortDate(lot.receivedAt)}</Field>
        <Field label="성적서(COA)" tone={lot.coaAttached ? "emerald" : "amber"}>
          {lot.coaAttached ? "첨부됨" : "없음"}
        </Field>
        {lot.massKg !== null && <Field label="입고 질량">{fmtNum(lot.massKg, 0)}kg</Field>}
      </dl>
    </NodeFrame>
  );
}

// ---- 의심 지점 패널 ----

function SuspectPanel({ suspects, unknowns, ctx }: { suspects: Suspect[]; unknowns: UnknownNote[]; ctx: NodeCtx }) {
  return (
    <Card className={`min-w-0 lg:sticky ${STICKY_TOP_LG} lg:max-h-[calc(100vh_-_var(--demo-sticky-offset)_-_1rem)] lg:overflow-y-auto`}>
      <CardHeader
        eyebrow="의심 지점"
        title={suspects.length ? `원인 후보 ${suspects.length}가지` : "규칙에 걸린 후보 없음"}
        description={
          suspects.length
            ? "사슬 위 기록을 규칙으로 걸렀습니다. 빨강은 규격·기준 이탈, 주황은 주의 조건입니다."
            : "노점·필름 재사용·레시피·두께 산포·불순물·도가니·스크랩 원료 규칙에 걸린 값이 없습니다."
        }
      />
      <div className="space-y-2.5">
        {suspects.map((s) => (
          <div key={s.key} className={`rounded-xl border p-3 ${TONE[s.tone].bg} ${TONE[s.tone].border}`}>
            <div className="flex items-start gap-2">
              <AlertTriangle className={`w-4 h-4 mt-0.5 shrink-0 ${TONE[s.tone].text}`} aria-hidden />
              <div className="min-w-0">
                <div className={`text-sm font-bold ${TONE[s.tone].text}`}>{s.title}</div>
                <p className="mt-0.5 text-[11px] lg:text-xs text-gray-400 leading-relaxed">{s.detail}</p>
              </div>
            </div>
            <ul className="mt-2 space-y-2">
              {s.items.map((it, i) => (
                <li key={`${it.id}-${i}`} className="flex flex-col gap-1">
                  <IdChip id={it.id} target={it.target} ctx={ctx} />
                  <span className="text-xs text-gray-200 leading-relaxed">{it.text}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {unknowns.length > 0 && (
        <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="text-xs font-bold text-gray-300">판단할 수 없는 항목 (기록 결측)</div>
          <ul className="mt-1.5 space-y-2">
            {unknowns.map((u) => (
              <li key={u.key} className="text-[11px] lg:text-xs text-gray-400 leading-relaxed">
                {u.text}
                <span className="mt-1 flex flex-wrap gap-1.5">
                  {u.ids.map((x) => (
                    <IdChip key={x.id} id={x.id} target={x.target} ctx={ctx} />
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-3 flex gap-1.5 text-[11px] text-gray-500 leading-relaxed">
        <Info className="w-3.5 h-3.5 shrink-0 mt-px" aria-hidden />
        규칙 기반 후보이며, 원인 확정은 엔지니어 판단입니다.
      </p>
    </Card>
  );
}

// ---- 정추적 패널 ----

function PathChips({
  groups,
  ctx,
}: {
  groups: Array<{ label: string; ids: string[]; toTarget: ((id: string) => TraceTarget) | null }>;
  ctx: NodeCtx;
}) {
  const visible = groups.filter((g) => g.ids.length > 0);
  if (!visible.length) return null;
  return (
    <div className="space-y-2">
      {visible.map((g) => (
        <div key={g.label} className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-gray-500 w-full sm:w-auto sm:mr-1">{g.label}</span>
          {g.ids.map((id) => (
            <IdChip key={id} id={id} target={g.toTarget ? g.toTarget(id) : null} ctx={ctx} />
          ))}
        </div>
      ))}
    </div>
  );
}

function ForwardPanel({
  eyebrow,
  title,
  tiles,
  paths,
  holdCount,
  emptyNote,
  shipments,
  scopeSlitIds,
  ctx,
}: {
  eyebrow: string;
  title: string;
  tiles: Array<{ label: string; value: number; tone: Tone }>;
  paths?: ReactNode;
  holdCount?: number;
  emptyNote: string;
  shipments: Shipment[];
  scopeSlitIds: Set<string>;
  ctx: NodeCtx;
}) {
  const shipped = shipments.filter((s) => s.shippedAt);
  const unshipped = shipments.filter((s) => !s.shippedAt);
  const sorted = [...shipments].sort((a, b) => (a.id < b.id ? -1 : 1));
  const colsClass = tiles.length >= 5 ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5" : "grid-cols-2";

  return (
    <Card>
      <CardHeader eyebrow={eyebrow} title={title} description="회수·통보 범위를 이 표로 바로 정합니다." />
      <div className={`grid ${colsClass} gap-2 lg:gap-3`}>
        {tiles.map((t) => (
          <StatTile key={t.label} label={t.label} value={fmtNum(t.value, 0)} tone={t.tone} />
        ))}
      </div>

      {paths && <div className="mt-4">{paths}</div>}

      {shipments.length > 0 ? (
        <>
          <div className="mt-4">
            <Callout tone={shipped.length ? "rose" : "amber"} icon={<Truck className="w-4 h-4" aria-hidden />}>
              {shipped.length > 0 && <>이미 고객에게 나간 출하 {shipped.length}건은 통보·회수 검토 대상</>}
              {shipped.length > 0 && unshipped.length > 0 && ", "}
              {unshipped.length > 0 && <>아직 안 나간 출하 {unshipped.length}건은 출하 전 격리 대상</>}
              입니다.
              {holdCount ? ` 이 범위의 롤 ${holdCount}개는 이미 홀드(출하 보류) 상태입니다.` : ""}
            </Callout>
          </div>
          <div className="mt-3">
            <TableWrap>
              <table className="w-full min-w-[560px] text-xs lg:text-sm">
                <thead>
                  <tr className="text-left text-[11px] text-gray-500">
                    <th className="py-2 pr-3 font-medium">출하 ID</th>
                    <th className="py-2 pr-3 font-medium">고객</th>
                    <th className="py-2 pr-3 font-medium">출하일</th>
                    <th className="py-2 pr-3 font-medium text-right">범위 안 롤</th>
                    <th className="py-2 font-medium">판정</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((s) => {
                    const v = verdictBadge(s);
                    const inScope = s.rollIds.filter((id) => scopeSlitIds.has(id)).length;
                    const go = () => ctx.onSelect({ type: "shipment", id: s.id });
                    return (
                      <tr
                        key={s.id}
                        onClick={go}
                        className="border-t border-white/5 cursor-pointer hover:bg-white/5 transition-colors"
                      >
                        <td className="py-1 pr-3">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              go();
                            }}
                            className="inline-flex items-center gap-1 min-h-10 font-mono text-indigo-200 hover:text-white"
                          >
                            {s.id}
                            <ArrowUpRight className="w-3 h-3" aria-hidden />
                          </button>
                        </td>
                        <td className="py-1 pr-3 text-gray-200 whitespace-nowrap">{s.customer}</td>
                        <td className="py-1 pr-3 text-gray-300 whitespace-nowrap">
                          {s.shippedAt ? fmtShortDate(s.shippedAt) : <span className="text-amber-300">미출하</span>}
                        </td>
                        <td className="py-1 pr-3 text-right font-mono text-gray-300">
                          {inScope}/{s.rollIds.length}
                        </td>
                        <td className="py-1">
                          <Badge tone={v.tone}>{v.label}</Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </TableWrap>
          </div>
        </>
      ) : (
        <p className="mt-4 text-xs lg:text-sm text-gray-400">{emptyNote}</p>
      )}
    </Card>
  );
}
