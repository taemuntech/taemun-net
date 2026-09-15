"use client";

// KPI 보드 — 수율·두께 균일도·불순물·파단·납기·환경·기록 품질을 한 화면에.
// 데이터는 전부 useDemoData() 에서 읽고, 계산은 metrics.ts 순수 함수가 한다.
// 하이드레이션 안전: 렌더 중 Date.now()/Math.random() 없음, 날짜는 문자열을 잘라 쓴다.

import { useMemo, useState } from "react";
import { AlertTriangle, ArrowRight, Info, UserPen } from "lucide-react";
import { useDemoData } from "@/components/demo/lithium-foil/DemoDataContext";
import {
  Callout,
  Card,
  CardHeader,
  GLOSSARY,
  StatTile,
  Segmented,
  TableWrap,
  Badge,
  LIGHT,
  fmtNum,
  fmtPct,
  fmtShortDate,
} from "@/components/demo/lithium-foil/ui";
import WaterfallChart from "@/components/demo/lithium-foil/charts/WaterfallChart";
import ControlChart from "@/components/demo/lithium-foil/charts/ControlChart";
import BarChart from "@/components/demo/lithium-foil/charts/BarChart";
import RunChart from "@/components/demo/lithium-foil/charts/RunChart";
import ScatterChart from "@/components/demo/lithium-foil/charts/ScatterChart";
import type { BarItem, ChartTone, RunPoint, ScatterPoint } from "@/components/demo/lithium-foil/charts/types";
import type { KpiBoardProps } from "@/components/demo/lithium-foil/screens/types";
import {
  completionByFilmReuse,
  completionByRecipe,
  completionByRecipeStratified,
  earlyWarning,
  elementChart,
  headlineStats,
  isOverdueUnshipped,
  missingRates,
  motherRolls,
  otdByCustomer,
  otdByWeek,
  recipeLabel,
  recipeReuseConfound,
  rollThicknessSdUm,
  round,
  thicknessSdChart,
  yieldWaterfall,
  type CompletionStat,
} from "@/lib/demo/lithium-foil/metrics";
import { addDays, diffDays } from "@/lib/demo/lithium-foil/seed";
import { ICP_ELEMENTS, type IcpElement, type Roll } from "@/lib/demo/lithium-foil/types";

type RecipeView = "all" | "stratified";

const MAX_REUSE_FOR_STRATIFIED = 4;
const OTD_TARGET = 0.9;
const DEW_POINT_LIMIT_C = -45;
const MISSING_RATE_GOAL = 0.1;

/** ISO datetime 두 개 사이 시간(h) — Date 파싱 없이 문자열 시·분으로 계산 */
function workHours(roll: Roll): number {
  const toH = (iso: string) => Number(iso.slice(11, 13)) + Number(iso.slice(14, 16)) / 60;
  const dayGap = diffDays(roll.endedAt.slice(0, 10), roll.startedAt.slice(0, 10));
  return round(dayGap * 24 + toH(roll.endedAt) - toH(roll.startedAt), 2);
}

const recipeShortLabel = recipeLabel;

function TraceButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={LIGHT.buttonSecondary}
    >
      {label}
      <ArrowRight className="w-3.5 h-3.5" aria-hidden />
    </button>
  );
}

/** 막대 아래 표본 수 줄 — 차트가 좁은 화면에서 hint 를 줄여도 n·롤당 손실은 항상 글자로 남긴다 */
function SampleLine({ stats }: { stats: CompletionStat[] }) {
  return (
    <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">
      {stats.map((s, i) => (
        <span key={s.key}>
          {i > 0 && " · "}
          {s.label.replace("필름 재사용 ", "")} n={s.rolls}, 롤당 손실 {fmtNum(s.avgLostM, 1)}m
        </span>
      ))}
    </p>
  );
}

export default function KpiBoard({ onTrace }: KpiBoardProps) {
  const { dataset: ds, userRolls } = useDemoData();
  const [element, setElement] = useState<IcpElement>("Fe");
  const [recipeView, setRecipeView] = useState<RecipeView>("all");

  const head = useMemo(() => headlineStats(ds), [ds]);
  const waterfall = useMemo(() => yieldWaterfall(ds), [ds]);
  const thk = useMemo(() => thicknessSdChart(ds), [ds]);
  const elChart = useMemo(() => elementChart(ds, element), [ds, element]);
  const byReuse = useMemo(() => completionByFilmReuse(ds), [ds]);
  const byRecipeAll = useMemo(() => completionByRecipe(ds), [ds]);
  const byRecipeStrat = useMemo(() => completionByRecipeStratified(ds, MAX_REUSE_FOR_STRATIFIED), [ds]);
  const otdWeeks = useMemo(() => otdByWeek(ds), [ds]);
  const otdCustomers = useMemo(() => otdByCustomer(ds), [ds]);
  const missing = useMemo(() => missingRates(ds), [ds]);
  const mothers = useMemo(() => motherRolls(ds), [ds]);

  const userRollIds = useMemo(() => userRolls.map((r) => r.id), [userRolls]);

  // ---- 상단 요약 보조값 ----
  const overdueUnshipped = ds.shipments.filter((s) => isOverdueUnshipped(ds, s)).length;
  const pendingCount = ds.shipments.filter((s) => !s.shippedAt && !isOverdueUnshipped(ds, s)).length;
  const userRollsWithSd = userRolls.filter((r) => rollThicknessSdUm(r) !== null).length;
  const userRollsNoSd = userRolls.length - userRollsWithSd;
  const openNcs = ds.nonconformances.filter((n) => !n.closedAt);
  const openClaims = openNcs.filter((n) => n.type === "claim").length;
  const holdMothers = ds.rolls.filter((r) => r.status === "hold" && r.stage === "mother").length;
  const holdSlits = ds.rolls.filter((r) => r.status === "hold" && r.stage === "slit").length;

  // ---- 수율 ----
  const lossKg = round(waterfall.filter((s) => s.deltaKind === "loss").reduce((a, s) => a + s.deltaKg, 0), 2);
  const inventoryKg = round(waterfall.filter((s) => s.deltaKind === "inventory").reduce((a, s) => a + s.deltaKg, 0), 2);
  const inputKg = waterfall[0]?.valueKg ?? 0;
  const shippedKg = waterfall[waterfall.length - 1]?.valueKg ?? 0;

  // ---- 두께 ----
  const thkOoc = thk.points.filter((p) => p.outOfControl);
  const rollById = useMemo(() => new Map(ds.rolls.map((r) => [r.id, r])), [ds]);
  const thkOocRecipes = Array.from(new Set(thkOoc.map((p) => rollById.get(p.id)?.recipeId).filter((v): v is string => Boolean(v))));
  const thkByRecipe = ds.recipes
    .filter((rc) => rc.kind === "rolling")
    .map((rc) => {
      const sds = mothers
        .filter((r) => r.recipeId === rc.id)
        .map(rollThicknessSdUm)
        .filter((v): v is number => v !== null);
      return { key: rc.id, n: sds.length, mean: sds.length ? sds.reduce((a, b) => a + b, 0) / sds.length : null };
    })
    .filter((s) => s.n > 0);

  // ---- 불순물 ----
  const elOoc = elChart.points.filter((p) => p.outOfControl);
  const elOver = elChart.points.filter((p) => p.overSpec);
  const elExcluded = elChart.excludedCount;
  const warn = useMemo(() => earlyWarning(ds, element), [ds, element]);
  const firstOoc = warn.firstOoc;
  const firstOver = warn.firstOver;

  // ---- 파단 ----
  const reuseTones: ChartTone[] = ["indigo", "amber", "rose"];
  const reuseItems: BarItem[] = byReuse.map((s, i) => ({
    key: s.key,
    label: s.label.replace("필름 재사용 ", ""),
    value: s.tearFreeRate,
    hint: `n=${s.rolls} · 롤당 손실 ${fmtNum(s.avgLostM, 1)}m`,
    tone: reuseTones[i] ?? "indigo",
  }));
  const recipeStats = recipeView === "all" ? byRecipeAll : byRecipeStrat;
  const recipeTone: Record<string, ChartTone> = { "RCP-A": "indigo", "RCP-B": "cyan", "RCP-C": "rose" };
  const recipeItems: BarItem[] = recipeStats.map((s) => ({
    key: s.key,
    label: recipeShortLabel(s.key),
    value: s.tearFreeRate,
    hint: `${s.label} · n=${s.rolls}`,
    tone: recipeTone[s.key] ?? "cyan",
  }));
  const confound = useMemo(() => recipeReuseConfound(ds, MAX_REUSE_FOR_STRATIFIED), [ds]);

  // ---- 납기 ----
  const otdPoints: RunPoint[] = useMemo(() => {
    if (!otdWeeks.length) return [];
    const byWeek = new Map(otdWeeks.map((p) => [p.week, p]));
    const first = otdWeeks[0].week;
    const last = otdWeeks[otdWeeks.length - 1].week;
    const out: RunPoint[] = [];
    for (let w = first; w <= last; w = addDays(w, 7)) {
      const p = byWeek.get(w);
      out.push({
        key: w,
        label: w.slice(5).replace("-", "/"),
        value: p ? p.rate : null,
        hint: p ? `${p.onTime}/${p.shipments}건 준수${p.overdue ? ` · 미출하 지연 ${p.overdue}건` : ""}` : "판정 대상 없음",
      });
    }
    return out;
  }, [otdWeeks]);
  const emptyWeeks = otdPoints.filter((p) => p.value === null).length;

  // ---- 환경 ----
  const claimShipmentIds = new Set(
    ds.nonconformances.filter((n) => n.reasonCode === "SURF-DISC" && n.targetType === "shipment").map((n) => n.targetId),
  );
  const claimMotherIds = new Set(
    ds.shipments
      .filter((s) => claimShipmentIds.has(s.id))
      .flatMap((s) => s.rollIds)
      .map((id) => rollById.get(id)?.parentRollId)
      .filter((v): v is string => Boolean(v)),
  );
  const dewRolls = mothers.filter((r) => r.dewPointC !== null);
  const dewMissing = mothers.length - dewRolls.length;
  const scatterPoints: ScatterPoint[] = dewRolls.map((r) => {
    const hours = workHours(r);
    return {
      key: r.id,
      x: r.dewPointC as number,
      y: hours,
      label: `${r.id} · 노점 ${fmtNum(r.dewPointC as number, 1)}℃ · ${fmtNum(hours, 1)}h`,
      highlight: claimMotherIds.has(r.id),
    };
  });
  const excursions = dewRolls.filter((r) => (r.dewPointC as number) > DEW_POINT_LIMIT_C);
  const excursionWithClaim = excursions.filter((r) => claimMotherIds.has(r.id)).length;

  // ---- 기록 품질 ----
  const maxMissing = missing.reduce((a, m) => Math.max(a, m.rate), 0);
  const missingItems: BarItem[] = missing.map((m) => ({
    key: m.field,
    label: m.label,
    value: m.rate,
    hint: `${m.missing}/${m.total}롤`,
    // 통과는 indigo(primary) — amber↔emerald 는 적록색약에서 가깝고 palette 검증에도 없는 조합
    tone: m.rate >= MISSING_RATE_GOAL ? "amber" : "indigo",
  }));
  const failingFields = missing.filter((m) => m.rate >= MISSING_RATE_GOAL);

  const elementOptions = ICP_ELEMENTS.map((el) => ({ value: el, label: el }));

  return (
    <div className="space-y-4 lg:space-y-6 [word-break:keep-all]">
      {userRolls.length > 0 && (
        <Callout tone="cyan" icon={<UserPen className="w-4 h-4" aria-hidden />}>
          <strong className="text-slate-900">방금 입력한 롤 {userRolls.length}개가 반영됐습니다.</strong> 아래 모든 지표가 다시 계산됐습니다.
          {userRollsWithSd > 0 && <> 두께 관리도에는 입력한 롤 {userRollsWithSd}개가 청록 테두리로 강조됩니다.</>}
          {userRollsNoSd > 0 && <> 면밀도를 비워 둔 {userRollsNoSd}개는 두께를 알 수 없어 관리도에서 빠집니다.</>}
        </Callout>
      )}

      {/* 1. 상단 요약 */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
        <StatTile
          label="모 롤 (압연 완료)"
          value={`${fmtNum(head.motherRolls, 0)}개`}
          sub={`슬릿 롤 ${fmtNum(head.slitRolls, 0)}개 · ${head.weeks}주치`}
          tone="indigo"
        />
        <StatTile
          label="무파단율"
          value={fmtPct(head.tearFreeRate)}
          sub={`압연 중 한 번도 끊기지 않은 모 롤 비율 · n=${head.motherRolls}`}
          tone={head.tearFreeRate >= 0.85 ? "emerald" : "amber"}
        />
        <StatTile
          label="롤 내 두께 SD 평균"
          value={
            head.avgThicknessSdUm === null ? (
              "—"
            ) : (
              <>
                {fmtNum(head.avgThicknessSdUm, 2)}
                <span className="text-sm font-bold ml-0.5">µm</span>
              </>
            )
          }
          sub={`좌·중·우 3점이 흩어진 정도 · n=${thk.n}`}
          tone="purple"
        />
        <StatTile
          label="납기 준수율"
          value={head.otdRate === null ? "—" : fmtPct(head.otdRate)}
          sub={`약속일 안에 출하 · n=${head.otdEvaluated}건${overdueUnshipped ? `(미출하 지연 ${overdueUnshipped} 포함)` : ""}`}
          tone={head.otdRate !== null && head.otdRate >= OTD_TARGET ? "emerald" : "amber"}
        />
        <StatTile
          label="열린 부적합"
          value={`${fmtNum(head.openNc, 0)}건`}
          sub={`고객 클레임 ${openClaims} · 사내 ${head.openNc - openClaims}`}
          tone={head.openNc > 0 ? "amber" : "emerald"}
        />
        <StatTile
          label="출하 보류(홀드) 롤"
          value={`${fmtNum(head.holdRolls, 0)}개`}
          sub={`모 롤 ${holdMothers} · 슬릿 롤 ${holdSlits}`}
          tone={head.holdRolls > 0 ? "rose" : "emerald"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* 2. 수율 워터폴 */}
        <Card className="lg:col-span-2">
          <CardHeader
            eyebrow="수율"
            title="리튬이 어디서 줄었나 — 단계별 질량"
            description={
              <>
                리튬 질량(kg) 기준입니다. 이형 필름과 함께 감긴 롤은 롤 무게에서 심·필름 무게를 빼 리튬만 셉니다.
                줄어든 양은 <span className="text-rose-700">공정 손실</span>과{" "}
                <span className="text-amber-800">재고(잉곳 잔량·슬릿 전 롤·출하 대기)</span>로 나눠 봅니다 — 재고는 잃은 게 아닙니다.
              </>
            }
            right={<Badge tone="gray">정제 배치 n={ds.batches.length}</Badge>}
          />
          <WaterfallChart steps={waterfall} unit="kg" />
          <div className="mt-3 grid grid-cols-1 lg:grid-cols-3 gap-2 text-xs">
            <div className="rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-slate-600">
              공정 손실 <strong className="text-rose-700">{fmtNum(lossKg, 2)}kg</strong>
              <span className="text-slate-500"> · 투입의 {fmtPct(inputKg ? lossKg / inputKg : 0, 1)}</span>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-slate-600">
              재고로 남음 <strong className="text-amber-800">{fmtNum(inventoryKg, 2)}kg</strong>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-slate-600">
              투입 대비 출하 <strong className="text-slate-900">{fmtPct(inputKg ? shippedKg / inputKg : 0, 1)}</strong>
            </div>
          </div>
        </Card>

        {/* 3. 두께 균일도 관리도 */}
        <Card>
          <CardHeader
            eyebrow="두께 균일도"
            title="롤마다 두께가 고른가"
            description={
              <>
                관리도 — 정상 범위를 벗어나면 알리는 그래프입니다. 점 하나가 모 롤 하나이고, 값은 면밀도(정해진 넓이의 무게,
                두께의 정본) 3점으로 환산한 두께의 표준편차(µm)입니다. 관리한계는 {thk.baselineLabel} 기준 구간으로 계산했습니다.
              </>
            }
            right={<Badge tone="gray">n={thk.n}</Badge>}
          />
          <ControlChart
            chart={thk}
            unit="µm"
            highlightIds={userRollIds}
            onPointClick={(id: string) => onTrace({ type: "roll", id })}
          />
          <div className="mt-3 space-y-2 text-xs lg:text-sm text-slate-600 leading-relaxed">
            <p>
              관리상한 {fmtNum(thk.ucl, 2)}µm 을 넘은 롤{" "}
              <strong className={thkOoc.length ? "text-rose-700" : "text-emerald-700"}>{thkOoc.length}개</strong>
              {thkOoc.length > 0 && thkOocRecipes.length > 0 && <> — 전부 {thkOocRecipes.map(recipeShortLabel).join("·")} 롤</>}
              {thk.excludedCount > 0 && <span className="text-slate-500"> (면밀도 미기록 {thk.excludedCount}롤 제외)</span>}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {thkByRecipe.map((s) => (
                <Badge key={s.key} tone={recipeTone[s.key] ?? "gray"}>
                  {recipeShortLabel(s.key)} 평균 {s.mean === null ? "—" : `${fmtNum(s.mean, 2)}µm`} · n={s.n}
                </Badge>
              ))}
            </div>
            <p className="text-slate-500 text-[11px]">
              점을 누르면 그 롤의 계보(어느 잉곳·원료에서 왔는지)로 이동합니다(터치는 한 번 눌러 값 확인, 한 번 더 눌러 이동).
              같은 롤을 여러 번 재도 값이 일정한지(측정 반복성) 확인하기 전에는 공정 능력 지수(규격 안에 드는 여유)를 말하지 않습니다.
            </p>
          </div>
        </Card>

        {/* 4. 불순물 관리도 */}
        <Card>
          <CardHeader
            eyebrow="불순물"
            title="잉곳별 원소 농도(ppm)"
            description={
              <>
                외주 ICP 분석(원소 농도 측정) 값입니다. 기준 구간 = {elChart.baselineLabel}. 외주 분석 회신까지 12일이 걸려,
                결과가 오기 전에 이미 압연이 끝나 있을 수 있습니다.
              </>
            }
            right={<Badge tone="gray">n={elChart.n}</Badge>}
          />
          <div className="mb-3">
            <Segmented ariaLabel="원소 선택" value={element} options={elementOptions} onChange={setElement} />
          </div>
          <ControlChart
            chart={elChart}
            unit="ppm"
            specLimit={elChart.specPpm}
            specLabel="규격"
            onPointClick={(id: string) => onTrace({ type: "ingot", id })}
          />
          <div className="mt-3 space-y-2 text-xs lg:text-sm text-slate-600 leading-relaxed">
            <p>
              {elChart.limitsValid ? (
                <>
                  {element} 관리한계 이탈 <strong className={elOoc.length ? "text-amber-800" : "text-emerald-700"}>{elOoc.length}건</strong>
                  {" · "}
                </>
              ) : (
                <>
                  {element} 관리한계 <strong className="text-slate-900">계산 안 함</strong>
                  {" · "}
                </>
              )}
              규격 {elChart.specPpm}ppm 초과 <strong className={elOver.length ? "text-rose-700" : "text-emerald-700"}>{elOver.length}건</strong>
              {elExcluded > 0 && <span className="text-slate-500"> (검출한계 미만 {elExcluded}건은 숫자로 넣지 않고 제외)</span>}
            </p>
            {!elChart.limitsValid && (
              <p className="text-amber-800 text-[11px]">
                기준 구간(새 도가니 1~5회째)에서 검출된 값이 모자라 관리한계를 그리지 않았습니다. 뒤쪽 점으로 한계를 잡으면 오른
                값이 「정상」으로 보이기 때문입니다. 차트의 점은 전부 기준 구간 밖 값입니다.
              </p>
            )}
            {elChart.limitsValid && elChart.n < 8 && (
              <p className="text-amber-800 text-[11px]">
                표본이 {elChart.n}개뿐이라 관리한계가 불안정합니다. 추세만 참고하세요.
              </p>
            )}
            {firstOoc && (
              <Callout tone={firstOver ? "rose" : "amber"} icon={<AlertTriangle className="w-4 h-4" aria-hidden />}>
                {firstOoc.label} 잉곳({firstOoc.id}, {fmtNum(firstOoc.value, 1)}ppm)에서 처음 관리상한 {fmtNum(elChart.ucl, 1)}ppm 을 넘었고,
                이 결과는 {warn.oocReportedAt ? fmtShortDate(warn.oocReportedAt) : "나중"}에 회신됐습니다.
                {firstOver && firstOver.index > firstOoc.index && (
                  <>
                    {" "}
                    회신 전에 이미 주조된 잉곳이 {warn.castBeforeReport}개였고, {warn.overBatchStartedAt ? `${fmtShortDate(warn.overBatchStartedAt)} 착수한 ` : ""}
                    {firstOver.label} 잉곳({firstOver.id}, {fmtNum(firstOver.value, 1)}ppm)이 규격 {elChart.specPpm}ppm 을 넘어 롤{" "}
                    {warn.holdRolls}개가 출하 보류 중입니다.{" "}
                    {warn.batchesAfterReport > 0 ? (
                      <>회신 날짜 기준으로 관리도 경보는 규격 초과 {warn.batchesAfterReport}배치 전에 도착했습니다 — 그때 멈췄다면 막을 수 있던 배치입니다.</>
                    ) : (
                      <>회신이 늦어 경보가 규격 초과 배치 착수보다 늦게 도착했습니다 — 분석 회신을 앞당기는 것이 먼저입니다.</>
                    )}
                  </>
                )}
              </Callout>
            )}
            {elOoc.length > 0 && elOver.length === 0 && (
              <p className="text-slate-500 text-[11px]">
                관리한계는 벗어났지만 규격 안입니다 — 공정 조건(원료·도가니 등)이 달라졌다는 신호이지, 곧 불량이라는 뜻은 아닙니다.
              </p>
            )}
            {firstOver && (
              <div>
                <TraceButton label={`${firstOver.id} 영향 범위 보기`} onClick={() => onTrace({ type: "ingot", id: firstOver.id })} />
              </div>
            )}
          </div>
        </Card>

        {/* 5. 파단(무파단율) */}
        <Card className="lg:col-span-2">
          <CardHeader
            eyebrow="무파단율"
            title="롤이 왜 끊기나 — 이형 필름과 레시피"
            description={
              <>
                {GLOSSARY.tearFreeRate}. {GLOSSARY.releaseFilm}. 필름은 여러 번 재사용하는데, 재사용 횟수와 레시피가 함께 섞여
                있어 둘을 나눠 봐야 합니다.
              </>
            }
            right={<Badge tone="gray">모 롤 n={mothers.length}</Badge>}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-slate-900 mb-2">필름 재사용 횟수별 무파단율</h4>
              <BarChart items={reuseItems} max={1} format={(v: number) => fmtPct(v)} />
              <SampleLine stats={byReuse} />
            </div>
            <div className="min-w-0">
              <div className="flex flex-col items-start gap-2 mb-2">
                <h4 className="text-sm font-semibold text-slate-900">레시피별 무파단율</h4>
                <Segmented<RecipeView>
                  ariaLabel="레시피 비교 범위"
                  value={recipeView}
                  onChange={setRecipeView}
                  options={[
                    { value: "all", label: "전체" },
                    { value: "stratified", label: `필름 재사용 ${MAX_REUSE_FOR_STRATIFIED}회 이하만` },
                  ]}
                />
              </div>
              <BarChart items={recipeItems} max={1} format={(v: number) => fmtPct(v)} />
              <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">
                {recipeStats.map((s, i) => (
                  <span key={s.key}>
                    {i > 0 && " · "}
                    {recipeShortLabel(s.key)} n={s.rolls}
                  </span>
                ))}
                {recipeView === "stratified" && " — 재사용 5회 이상 롤을 뺀 표본"}
              </p>
            </div>
          </div>
          {confound.bAll && confound.bStrat && (
            <div className="mt-4">
              <Callout tone="purple" icon={<Info className="w-4 h-4" aria-hidden />}>
                <strong className="text-slate-900">{confound.headline}</strong>
                <br />
                전체 롤로는 B {fmtPct(confound.bAll.tearFreeRate)}
                {confound.aAll && <>·A {fmtPct(confound.aAll.tearFreeRate)}</>}입니다. {confound.sentence} 걸러낸 표본이 적어 결론이 아니라
                방향입니다 — 필름 재사용 상한을 정한 뒤 다시 비교해야 합니다.
              </Callout>
            </div>
          )}
        </Card>

        {/* 6. 납기 */}
        <Card className="lg:col-span-2">
          <CardHeader
            eyebrow="납기"
            title="약속한 날짜에 나갔나"
            description={`주별 납기 준수율(약속일 이내 출하 비율)과 고객별 표입니다. 약속일이 지났는데 못 나간 건은 지연으로 셉니다. 점선은 목표 ${fmtPct(OTD_TARGET)}.`}
            right={<Badge tone="gray">판정 n={head.otdEvaluated}</Badge>}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="min-w-0">
              <RunChart points={otdPoints} target={OTD_TARGET} min={0} max={1} format={(v: number) => fmtPct(v)} tone="emerald" />
              <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">
                한 주 판정 대상이 1~3건이라 한 건만 늦어도 50%까지 떨어집니다 — 주별 값보다 흐름을 보세요. 못 나간 건은 약속일이 지난
                주에 셉니다.
                {emptyWeeks > 0 && ` 판정 대상이 없던 ${emptyWeeks}주는 비워 뒀습니다.`}
              </p>
            </div>
            <div className="min-w-0">
              <TableWrap>
                <table className="w-full min-w-[480px] text-xs lg:text-sm">
                  <thead>
                    <tr>
                      <th className={LIGHT.thCompact}>고객</th>
                      <th className={`${LIGHT.thCompact} text-right`}>판정</th>
                      <th className={`${LIGHT.thCompact} text-right`}>준수</th>
                      <th className={`${LIGHT.thCompact} text-right`}>미출하 지연</th>
                      <th className={`${LIGHT.thCompact} text-right`}>준수율</th>
                      <th className={`${LIGHT.thCompact} text-right`}>클레임</th>
                    </tr>
                  </thead>
                  <tbody>
                    {otdCustomers.map((c) => (
                      <tr key={c.customer}>
                        <td className={`${LIGHT.tdCompact} text-slate-900`}>{c.customer}</td>
                        <td className={`${LIGHT.tdCompact} text-right text-slate-700 tabular-nums`}>{c.shipments}</td>
                        <td className={`${LIGHT.tdCompact} text-right text-slate-700 tabular-nums`}>{c.onTime}</td>
                        <td className={`${LIGHT.tdCompact} text-right tabular-nums ${c.overdue > 0 ? "text-rose-700" : "text-slate-500"}`}>{c.overdue}</td>
                        <td
                          className={`${LIGHT.tdCompact} text-right font-semibold tabular-nums ${
                            c.shipments === 0 ? "text-slate-500" : c.rate < OTD_TARGET ? "text-rose-700" : "text-emerald-700"
                          }`}
                        >
                          {c.shipments === 0 ? "—" : fmtPct(c.rate)}
                        </td>
                        <td className={`${LIGHT.tdCompact} text-right tabular-nums ${c.claims > 0 ? "text-amber-800" : "text-slate-500"}`}>
                          {c.claims}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TableWrap>
              <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">
                고객 이름은 가상입니다. 판정 = 출하된 건 + 약속일이 지났는데 못 나간 건.
                {overdueUnshipped > 0 && ` 홀드 등으로 약속일을 넘긴 미출하 ${overdueUnshipped}건은 지연으로 셌습니다.`}
                {pendingCount > 0 && ` 약속일이 아직 남은 진행 중 ${pendingCount}건만 뺐습니다.`}
              </p>
            </div>
          </div>
        </Card>

        {/* 7. 환경 */}
        <Card>
          <CardHeader
            eyebrow="환경"
            title="작업실 습도와 표면 변색"
            description={
              <>
                {GLOSSARY.dewPoint}. 기준 {DEW_POINT_LIMIT_C}℃ 를 세로선으로 표시했습니다. 세로축은 모 롤 작업 시작부터 종료까지의
                시간(길수록 작업실 공기에 오래 노출)입니다. 강조한 점은 표면 변색 클레임 출하에 들어간 롤입니다.
              </>
            }
            right={<Badge tone="gray">n={dewRolls.length}</Badge>}
          />
          <ScatterChart points={scatterPoints} xLabel="교대 시작 노점(℃)" yLabel="롤 작업 시간(h)" xThreshold={DEW_POINT_LIMIT_C} />
          <div className="mt-3 space-y-2 text-xs lg:text-sm text-slate-600 leading-relaxed">
            <p>
              노점 {DEW_POINT_LIMIT_C}℃ 초과 작업 <strong className="text-amber-800">{excursions.length}롤</strong>, 그중 클레임 연결{" "}
              <strong className={excursionWithClaim ? "text-rose-700" : "text-slate-600"}>{excursionWithClaim}롤</strong>.{" "}
              {dewMissing > 0 && (
                <>
                  노점 미기록 <strong className="text-slate-900">{dewMissing}롤은 판단 불가</strong>로 그래프에서 뺐습니다.
                </>
              )}
            </p>
            <p className="text-slate-500 text-[11px]">
              이탈 기록이 {excursions.length}건뿐이라 「노점이 원인」이라고 단정할 수는 없습니다. 노점 결측부터 0 으로 만들어야 판단이
              가능해집니다.
            </p>
            {Array.from(claimShipmentIds).map((id) => (
              <TraceButton key={id} label={`클레임 출하 ${id} 계보 보기`} onClick={() => onTrace({ type: "shipment", id })} />
            ))}
          </div>
        </Card>

        {/* 8. 기록 품질 */}
        <Card>
          <CardHeader
            eyebrow="기록 품질"
            title="빈칸이 얼마나 되나"
            description="모 롤 일지에서 항목별로 비어 있는 비율입니다. 빈칸이 많으면 위 분석이 틀려도 알 수 없습니다."
            right={<Badge tone="gray">모 롤 n={mothers.length}</Badge>}
          />
          <BarChart
            items={missingItems}
            horizontal
            max={Math.max(0.25, Math.ceil(maxMissing * 10) / 10)}
            format={(v: number) => fmtPct(v)}
          />
          <div className="mt-3">
            <Callout tone={failingFields.length ? "amber" : "emerald"} icon={<Info className="w-4 h-4" aria-hidden />}>
              결측률 {fmtPct(MISSING_RATE_GOAL)} 미만이 2단계(계측기 연동) 진입 조건입니다 — 데이터 구조 탭의 로드맵과 같은 기준입니다.{" "}
              {failingFields.length ? (
                <>
                  12주 누적으로 보면 {failingFields.map((m) => `${m.label} ${fmtPct(m.rate)}`).join(", ")}로 아직 미달입니다.
                </>
              ) : (
                <>12주 누적 기준으로는 모든 항목이 조건을 충족합니다.</>
              )}
            </Callout>
          </div>
        </Card>
      </div>
    </div>
  );
}
