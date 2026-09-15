"use client";

// 개선 제안 화면 — 「데이터가 쌓이면 이런 판단이 나온다」 + 「표본이 적으면 적다고 말한다」.
// 제안 본문은 metrics.buildSuggestions 가 정본이다. 이 화면은 보여 주기·근거 이동·계산 가능한 예상 효과만 더한다.

import { useMemo } from "react";
import { ArrowRight, Ban, Calculator, Info, Lightbulb, NotebookPen, PencilLine } from "lucide-react";
import { useDemoData } from "@/components/demo/lithium-foil/DemoDataContext";
import { Badge, Callout, Card, CardHeader, StatTile, TONE, fmtNum, type Tone } from "@/components/demo/lithium-foil/ui";
import {
  buildSuggestions,
  completionByFilmReuse,
  completionByRecipeStratified,
  elementChart,
  motherRolls,
  round,
  type Suggestion,
} from "@/lib/demo/lithium-foil/metrics";
import { SPEC_LIMIT_PPM, type Dataset } from "@/lib/demo/lithium-foil/types";
import type { SuggestionsPanelProps, TraceTarget } from "./types";

/** 모델을 쓰기 시작하는 표본 기준 — 머리말 문구와 막대가 같은 값을 쓴다 */
const MODEL_MIN_ROLLS = 100;
const MODEL_MIN_BATCHES = 100;

const CONFIDENCE: Record<Suggestion["confidence"], { label: string; tone: Tone; hint: string }> = {
  low: { label: "방향만", tone: "amber", hint: "표본이 적어 크기는 믿지 말고 방향만 봅니다" },
  medium: { label: "참고", tone: "indigo", hint: "판단에 참고할 만하지만 확정 전에 더 모읍니다" },
  high: { label: "근거 충분", tone: "emerald", hint: "지금 데이터로 조치를 정해도 됩니다" },
};

/** Suggestion 에 표본 단위가 없어 id 별로 붙인다 */
const SAMPLE_UNIT: Record<string, string> = {
  yield: "배치",
  "tear-film": "롤",
  "tear-recipe": "롤",
  thickness: "롤",
  "fe-crucible": "잉곳",
  otd: "건",
  "dew-point": "롤",
};

type Effect = { headline: string; detail: string; assumption: string };

type Evidence = { label: string; go: () => void };

// ---- 예상 효과 — 계산 근거가 있는 것만. 없으면 null (카드에서 생략) ----

function filmReuseEffect(ds: Dataset): Effect | null {
  const buckets = completionByFilmReuse(ds);
  const low = buckets[0];
  const mid = buckets[1];
  const high = buckets[buckets.length - 1];
  if (!low || !mid || !high || high.rolls === 0 || low.rolls === 0) return null;
  const best = round(high.avgLostM - low.avgLostM, 1);
  if (best <= 0) return null;
  const conservative = round(Math.max(0, high.avgLostM - (mid.rolls > 0 ? mid.avgLostM : low.avgLostM)), 1);
  const range = conservative < best ? `${fmtNum(conservative, 1)}~${fmtNum(best, 1)}m` : `${fmtNum(best, 1)}m`;
  const totalRange =
    conservative < best
      ? `${fmtNum(conservative * high.rolls, 0)}~${fmtNum(best * high.rolls, 0)}m`
      : `${fmtNum(best * high.rolls, 0)}m`;
  return {
    headline: `롤당 손실 길이 ${range} 감소`,
    detail: `지금까지 5회 이상 구간 롤 ${high.rolls}개에 적용하면 누적 약 ${totalRange}. 현재 5회 이상 구간 롤당 손실 ${fmtNum(high.avgLostM, 1)}m.`,
    assumption: `가정 — 상한 적용 뒤 이 롤들이 3~4회 구간(보수, ${fmtNum(mid.avgLostM, 1)}m)에서 1~2회 구간(낙관, ${fmtNum(low.avgLostM, 1)}m) 사이 손실을 따라간다. 레시피 등 다른 조건은 그대로라고 본다.`,
  };
}

function recipeEffect(ds: Dataset): Effect | null {
  const byRecipe = completionByRecipeStratified(ds, 4);
  const c = byRecipe.find((s) => s.key === "RCP-C");
  const b = byRecipe.find((s) => s.key === "RCP-B");
  if (!c || !b || c.rolls === 0 || b.rolls === 0) return null;
  const diff = round(c.avgLostM - b.avgLostM, 1);
  if (diff <= 0) return null;
  return {
    headline: `C 롤 한 개당 손실 약 ${fmtNum(diff, 1)}m 차이`,
    detail: `필름 재사용 4회 이하 롤끼리: 레시피 C 롤당 ${fmtNum(c.avgLostM, 1)}m (롤 ${c.rolls}개) vs 레시피 B ${fmtNum(b.avgLostM, 1)}m (롤 ${b.rolls}개).`,
    assumption: `가정 — C 대신 B 로 돌렸다면 B 평균을 따라간다. C 표본이 ${c.rolls}개뿐이라 이 숫자의 크기는 믿지 말고 방향만 본다.`,
  };
}

function crucibleEffect(ds: Dataset): Effect | null {
  const fe = elementChart(ds, "Fe");
  const overIds = new Set(fe.points.filter((p) => p.overSpec).map((p) => p.id));
  if (overIds.size === 0) return null;
  const CAP = 5;
  const useCountOf = (ingotId: string): number | null => {
    const ingot = ds.ingots.find((i) => i.id === ingotId);
    const batch = ingot ? ds.batches.find((b) => b.id === ingot.batchId) : undefined;
    return batch ? batch.crucibleUseCount : null;
  };
  // 규격 초과 잉곳이 전부 교체 상한(5회)을 넘긴 도가니에서 나왔을 때만 계산한다
  const allBeyondCap = [...overIds].every((id) => {
    const n = useCountOf(id);
    return n !== null && n > CAP;
  });
  if (!allBeyondCap) return null;
  const heldRolls = ds.rolls.filter((r) => overIds.has(r.ingotId)).length;
  const beyondCapBatches = ds.batches.filter((b) => b.crucibleUseCount > CAP).length;
  const maxUse = ds.batches.reduce((a, b) => Math.max(a, b.crucibleUseCount), 0);
  // 상한을 넘겨 쓴 도가니 수 — 사용 횟수가 CAP+1 에 닿은 배치 하나가 도가니 하나다
  const cruciblesBeyondCap = ds.batches.filter((b) => b.crucibleUseCount === CAP + 1).length;
  return {
    headline: `규격 초과로 홀드된 롤 ${heldRolls}개가 생기지 않는다`,
    detail: `도가니를 ${CAP}회째에서 바꿨다면 ${CAP + 1}회째 이후 배치 ${beyondCapBatches}건이 새 도가니로 갔다. 대가: 교체 간격이 ${maxUse}회 → ${CAP}회로 짧아진다(도가니 비용 자료는 아직 없음).`,
    assumption: `가정 — Fe 상승 원인이 도가니 사용 횟수다. ${CAP}회를 넘겨 쓴 도가니는 지금까지 ${cruciblesBeyondCap}개뿐이라, 다음 도가니에서도 같은 시점에 오르는지 확인이 필요하다.`,
  };
}

function effectFor(id: string, ds: Dataset): Effect | null {
  if (id === "tear-film") return filmReuseEffect(ds);
  if (id === "tear-recipe") return recipeEffect(ds);
  if (id === "fe-crucible") return crucibleEffect(ds);
  return null;
}

// ---- 근거 대상 찾기 — 하드코딩 없이 데이터에서 ----

function findFeOverIngotId(ds: Dataset): string | null {
  const nc = ds.nonconformances.find((n) => n.reasonCode === "IMP-FE" && n.targetType === "ingot");
  if (nc) return nc.targetId;
  const ingot = ds.ingots.find((i) =>
    i.icp.some((r) => r.element === "Fe" && r.qualifier === "=" && r.valuePpm > SPEC_LIMIT_PPM.Fe),
  );
  return ingot ? ingot.id : null;
}

function findClaimShipmentId(ds: Dataset, reasonCode: string): string | null {
  const nc = ds.nonconformances.find((n) => n.type === "claim" && n.reasonCode === reasonCode && n.targetType === "shipment");
  return nc ? nc.targetId : null;
}

// ---- 조각 ----

function SufficiencyBar({ now, needed, unit }: { now: number; needed: number; unit: string }) {
  const ratio = needed > 0 ? Math.min(1, now / needed) : 1;
  const enough = now >= needed;
  return (
    <div>
      <div className="flex items-center justify-between gap-2 text-[11px] mb-1">
        <span className="text-gray-400">데이터 충분도</span>
        <span className={enough ? "text-emerald-300 font-semibold" : "text-indigo-300 font-semibold"}>
          {fmtNum(now, 0)} / {fmtNum(needed, 0)}
          {unit}
          {enough ? " · 충분" : ` · ${fmtNum(needed - now, 0)}${unit} 더 필요`}
        </span>
      </div>
      <div
        className="h-2 rounded-full bg-white/5 overflow-hidden"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={needed}
        aria-valuenow={Math.min(now, needed)}
        aria-label={`데이터 충분도 ${now}/${needed}${unit}`}
      >
        <div
          className={`h-full rounded-full ${enough ? "bg-emerald-500" : "bg-indigo-500"}`}
          style={{ width: `${Math.max(2, ratio * 100)}%` }}
        />
      </div>
    </div>
  );
}

function SuggestionCard({ s, effect, evidence }: { s: Suggestion; effect: Effect | null; evidence: Evidence }) {
  const conf = CONFIDENCE[s.confidence];
  const t = TONE[s.tone];
  return (
    <Card className="flex flex-col gap-3 h-full">
      <div className="flex flex-wrap items-center gap-1.5">
        <Badge tone={s.tone}>{s.kpi}</Badge>
        <Badge tone={conf.tone} className="ml-auto">
          신뢰도 · {conf.label}
        </Badge>
      </div>

      <h3 className="text-base lg:text-lg font-bold text-white leading-snug">{s.title}</h3>

      <div>
        <div className="text-[11px] font-bold text-gray-500 mb-0.5">발견</div>
        <p className="text-sm text-gray-300 leading-relaxed">{s.finding}</p>
      </div>

      <div className={`rounded-xl border px-3.5 py-3 ${t.bg} ${t.border}`}>
        <div className={`text-[11px] font-bold mb-0.5 ${t.text}`}>조치</div>
        <p className="text-sm text-white leading-relaxed">{s.action}</p>
      </div>

      {effect && (
        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 mb-1">
            <Calculator size={13} aria-hidden="true" />
            예상 효과
            <Badge tone="amber" className="ml-1">
              가정
            </Badge>
          </div>
          <p className="text-sm font-semibold text-white leading-snug">{effect.headline}</p>
          <p className="text-xs text-gray-300 leading-relaxed mt-1">{effect.detail}</p>
          <p className="text-[11px] text-gray-400 leading-relaxed mt-1.5">{effect.assumption}</p>
        </div>
      )}

      <p className="text-[11px] text-gray-400 leading-relaxed">
        <span className="font-semibold text-gray-300">방법</span> · {s.method}
      </p>

      <div className="mt-auto flex flex-col gap-3 pt-1">
        <SufficiencyBar now={s.dataNow} needed={s.dataNeeded} unit={SAMPLE_UNIT[s.id] ?? "건"} />
        <p className="text-[11px] text-gray-400 leading-snug">{s.confidenceNote ?? conf.hint}</p>
        <button
          type="button"
          onClick={evidence.go}
          className="inline-flex items-center justify-center gap-1.5 min-h-10 px-4 rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-gray-200 hover:bg-white/10 hover:text-white transition-colors"
        >
          근거 보기 — {evidence.label}
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </div>
    </Card>
  );
}

const CANNOT_DO: Array<{ title: string; reason: string }> = [
  {
    title: "정제 방식·새 소재 화학 선택",
    reason: "데이터는 해 본 조건끼리만 비교합니다. 안 해 본 방식은 기록에 없어 실험·문헌·전문가 판단의 몫입니다.",
  },
  {
    title: "고객 셀 내부 성능의 원인 귀속",
    reason: "호일이 고객 공장에 들어간 뒤 조립·전해액·충방전 조건은 우리 데이터 밖입니다. 클레임과 롤을 잇는 데까지만 말할 수 있습니다.",
  },
  {
    title: "화재·안전 설계 판단",
    reason: "아차사고처럼 드문 사건은 건수가 적어 통계로 위험을 잴 수 없습니다. 규정과 위험성 평가가 먼저입니다.",
  },
  {
    title: "리튬 시세 예측",
    reason: "가격은 공장 밖 시장이 정합니다. 공정 기록에는 시세를 맞힐 신호가 없습니다.",
  },
  {
    title: "표본이 적은 품목의 최적 조건 찾기",
    reason: "롤 몇 개짜리 시험 레시피로는 최적점을 찾을 만큼 반복이 없습니다. 대신 「몇 개를 더 만들어야 판단이 서는지」는 말할 수 있습니다.",
  },
];

export default function SuggestionsPanel({ onTrace, onNavigate }: SuggestionsPanelProps) {
  const { dataset, userRolls } = useDemoData();

  const view = useMemo(() => {
    const suggestions = buildSuggestions(dataset);
    const effects = new Map(suggestions.map((s) => [s.id, effectFor(s.id, dataset)] as const));
    const targets: Record<string, TraceTarget | null> = {};
    const feIngot = findFeOverIngotId(dataset);
    const surf = findClaimShipmentId(dataset, "SURF-DISC");
    targets["fe-crucible"] = feIngot ? { type: "ingot", id: feIngot } : null;
    targets["dew-point"] = surf ? { type: "shipment", id: surf } : null;
    // 파단 비교(tear-recipe)의 근거는 클레임 계보가 아니라 KPI 보드의 무파단율 표다 — 두께 클레임으로 보내지 않는다
    return {
      suggestions,
      effects,
      targets,
      mothers: motherRolls(dataset).length,
      ingots: dataset.ingots.length,
      batches: dataset.batches.length,
      shipments: dataset.shipments.length,
    };
  }, [dataset]);

  const evidenceFor = (s: Suggestion): Evidence => {
    const target = view.targets[s.id];
    if (target) {
      const kind = target.type === "ingot" ? "잉곳" : target.type === "shipment" ? "출하" : target.type === "roll" ? "롤" : "원료";
      return { label: `${kind} ${target.id} 계보`, go: () => onTrace(target) };
    }
    const kpiCard: Record<string, string> = {
      yield: "수율 카드",
      "tear-film": "무파단율 카드",
      "tear-recipe": "무파단율 카드",
      thickness: "두께 관리도",
      otd: "납기 카드",
    };
    return { label: `KPI 보드 ${kpiCard[s.id] ?? ""}`.trim(), go: () => onNavigate("kpi") };
  };

  return (
    <div className="flex flex-col gap-4 lg:gap-6 [word-break:keep-all] [overflow-wrap:anywhere]">
      {/* 1. 머리말 */}
      <Card>
        <CardHeader
          eyebrow="개선 제안"
          title="규칙·통계 기반 제안 — 모델이 아니라 관리도·교차표·파레토"
          description={
            <>
              관리도(정상 범위를 벗어나면 알리는 그래프), 교차표(조건별로 나눠 세는 표), 파레토(큰 원인부터 줄 세우기)만
              씁니다. 아래 제안은 지금 쌓인 데이터에서 매번 새로 계산됩니다.
            </>
          }
          right={<Lightbulb className="text-indigo-400" size={28} aria-hidden="true" />}
        />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3 mb-4">
          <StatTile label="모 롤" value={fmtNum(view.mothers, 0)} sub="압연 1회 = 1개" tone="indigo" />
          <StatTile label="잉곳" value={fmtNum(view.ingots, 0)} sub="ICP 성분 분석 단위" tone="purple" />
          <StatTile label="정제 배치" value={fmtNum(view.batches, 0)} sub="도가니 투입 단위" tone="purple" />
          <StatTile label="출하" value={fmtNum(view.shipments, 0)} sub="납기·클레임 단위" tone="emerald" />
        </div>

        <Callout tone="amber" icon={<Info size={16} aria-hidden="true" />}>
          <p>
            <strong className="text-white">
              롤 {MODEL_MIN_ROLLS}개·배치 {MODEL_MIN_BATCHES}건이 쌓이기 전에는 회귀 분석·실험계획(DOE — 조건을 체계적으로
              바꿔 보는 실험 설계)·베이지안 최적화를 하지 않습니다.
            </strong>{" "}
            지금 표본으로 모델을 돌리면 그럴듯한 숫자는 나오지만, 다음 달 데이터에 쉽게 뒤집힙니다.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-3">
            <SufficiencyBar now={view.mothers} needed={MODEL_MIN_ROLLS} unit="롤" />
            <SufficiencyBar now={view.batches} needed={MODEL_MIN_BATCHES} unit="배치" />
          </div>
        </Callout>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mt-4 text-[11px] text-gray-400">
          <span className="font-semibold text-gray-300">신뢰도 읽는 법</span>
          {(["low", "medium", "high"] as const).map((k) => (
            <span key={k} className="inline-flex items-center gap-1.5">
              <Badge tone={CONFIDENCE[k].tone}>{CONFIDENCE[k].label}</Badge>
              <span>{CONFIDENCE[k].hint}</span>
            </span>
          ))}
        </div>
      </Card>

      {userRolls.length > 0 && (
        <Callout tone="cyan" icon={<PencilLine size={16} aria-hidden="true" />}>
          입력한 롤 {fmtNum(userRolls.length, 0)}개 반영 — 아래 제안·충분도·예상 효과가 입력값을 포함해 다시 계산됐습니다.
        </Callout>
      )}

      {/* 2·3. 제안 카드 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {view.suggestions.map((s) => (
          <SuggestionCard key={s.id} s={s} effect={view.effects.get(s.id) ?? null} evidence={evidenceFor(s)} />
        ))}
      </div>

      {/* 4. 데이터로 못 하는 것 */}
      <Card>
        <CardHeader
          eyebrow="정직하게"
          title="데이터로 못 하는 것"
          description="데이터가 많아져도 이 판단들은 공정 기록만으로 내리지 않습니다."
          right={<Ban className="text-rose-400" size={24} aria-hidden="true" />}
        />
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {CANNOT_DO.map((item) => (
            <li key={item.title} className="rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3">
              <div className="text-sm font-semibold text-white leading-snug">{item.title}</div>
              <p className="text-xs text-gray-400 leading-relaxed mt-1">{item.reason}</p>
            </li>
          ))}
        </ul>
      </Card>

      {/* 5. 입력 → 재계산 안내 */}
      <Card className="flex flex-col lg:flex-row lg:items-center gap-3 lg:gap-6">
        <div className="flex gap-3 min-w-0">
          <NotebookPen className="text-cyan-400 shrink-0 mt-0.5" size={22} aria-hidden="true" />
          <div className="min-w-0">
            <div className="text-sm lg:text-base font-bold text-white">사용자가 롤을 입력하면 제안이 다시 계산됩니다</div>
            <p className="text-xs lg:text-sm text-gray-400 leading-relaxed mt-1">
              롤 일지에서 필름 재사용 횟수·노점·파단을 바꿔 넣어 보세요. 충분도 막대와 신뢰도, 예상 효과가 함께 움직입니다.
              입력은 이 브라우저 안에서만 쓰이고 새로고침하면 사라집니다.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onNavigate("log")}
          className="inline-flex items-center justify-center gap-1.5 min-h-10 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white transition-colors lg:ml-auto shrink-0"
        >
          롤 일지로 가기
          <ArrowRight size={15} aria-hidden="true" />
        </button>
      </Card>
    </div>
  );
}
