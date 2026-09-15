"use client";

// 데이터 구조(도입 설계) 화면 — 「첫 6개월에 무엇을 만드는가」를 설계 문서처럼 보여 준다.
// 대부분 정적 콘텐츠이고, 표별 행 수·결측률만 이 데모 데이터(useDemoData)에서 실제로 계산한다.

import { useMemo, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  Boxes,
  CalendarRange,
  ClipboardCheck,
  Database,
  FlaskConical,
  GitBranch,
  KeyRound,
  Keyboard,
  LayoutDashboard,
  Layers,
  Lock,
  Ruler,
  Server,
  Shield,
  TriangleAlert,
  Truck,
  Workflow,
} from "lucide-react";
import { ICP_ELEMENTS } from "@/lib/demo/lithium-foil/types";
import { missingRates } from "@/lib/demo/lithium-foil/metrics";
import { useDemoData } from "../DemoDataContext";
import { Badge, Callout, Card, CardHeader, TONE, TableWrap, fmtNum, fmtPct, type Tone } from "../ui";
import type { SchemaViewProps } from "./types";

type TableSpec = {
  key: string;
  name: string;
  label: string;
  holds: string;
  columns: string[];
  idFormats: string[];
  count: number;
  approx?: boolean;
  countNote: string;
  tone: Tone;
  icon: ReactNode;
  attachesTo?: string[];
};

const KEEP = "[word-break:keep-all]";

export default function SchemaView({ onNavigate }: SchemaViewProps) {
  const { dataset } = useDemoData();

  const counts = useMemo(() => {
    const mothers = dataset.rolls.filter((r) => r.stage === "mother").length;
    const slits = dataset.rolls.filter((r) => r.stage === "slit").length;
    const strips = dataset.rolls.filter((r) => r.stage === "strip").length;
    const batchInputs = dataset.batches.reduce((s, b) => s + b.inputLotIds.length, 0);
    const shipmentLines = dataset.shipments.reduce((s, sh) => s + sh.rollIds.length, 0);
    const filmUses = dataset.rolls.filter((r) => r.stage === "mother" && r.filmLotId !== null).length;
    const withAreal = dataset.rolls.filter((r) => r.arealDensityGm2 !== null).length;
    const scrapLots = dataset.materialLots.filter((m) => m.origin === "internal_scrap").length;

    // 계보 edge(추정) = 배치 투입(원료→배치) + 잉곳(배치→잉곳) + 모 롤(잉곳→모 롤)
    //                 + 슬릿(모 롤→슬릿) + 출하 라인(롤→출하) + 이형 필름 사용(필름 로트→모 롤)
    const genealogy = batchInputs + dataset.ingots.length + mothers + strips + slits + shipmentLines + filmUses;
    // process_run = 정제 배치 + 모 롤 압연 + 슬릿 작업 (스트립 단계가 있으면 함께)
    const runs = dataset.batches.length + mothers + slits + strips;
    // measurement = 잉곳 × ICP 원소 7종 + 면밀도가 기록된 롤 × 3점(좌·중·우)
    const measurements = dataset.ingots.length * ICP_ELEMENTS.length + withAreal * 3;

    return {
      mothers,
      slits,
      batchInputs,
      shipmentLines,
      filmUses,
      withAreal,
      scrapLots,
      genealogy,
      runs,
      measurements,
      items: dataset.ingots.length + dataset.rolls.length,
    };
  }, [dataset]);

  const missing = useMemo(() => missingRates(dataset), [dataset]);
  const worstMissing = useMemo(
    () => missing.reduce((a, b) => (b.rate > a.rate ? b : a), missing[0] ?? { field: "", label: "", missing: 0, total: 0, rate: 0 }),
    [missing],
  );

  const mainTables: TableSpec[] = [
    {
      key: "material_lot",
      name: "material_lot",
      label: "원료·자재 로트",
      holds: "들어온 리튬 원료·이형 필름·압연유·아르곤. 자사 스크랩 회수분도 같은 표에 출처만 달리 적는다.",
      columns: ["lot_id", "material_type", "origin", "supplier_id", "received_at", "mass_kg", "coa_attached"],
      idFormats: ["RM-YYMM-NNN"],
      count: dataset.materialLots.length,
      countNote: `스크랩 회수 로트 ${counts.scrapLots}건 포함`,
      tone: "cyan",
      icon: <Boxes className="w-4 h-4" />,
    },
    {
      key: "process_run",
      name: "process_run",
      label: "공정 실행",
      holds: "정제 배치·압연·슬릿 작업 한 번 한 번. 언제·어느 설비·어떤 레시피로 했는지.",
      columns: ["run_id", "run_type", "recipe_id", "equipment_id", "crucible_use_count", "pass_count", "started_at · ended_at", "dew_point_c"],
      idFormats: ["B-LI-YYMMDD-NN"],
      count: counts.runs,
      countNote: `정제 배치 ${dataset.batches.length} + 압연 ${counts.mothers} + 슬릿 ${counts.slits}`,
      tone: "indigo",
      icon: <Workflow className="w-4 h-4" />,
    },
    {
      key: "roll",
      name: "roll",
      label: "잉곳·롤 (손에 잡히는 물건)",
      holds: "잉곳부터 모 롤·슬릿 롤까지 한 표. 단계(stage) 컬럼으로 구분하고 부모 ID 로 이어진다.",
      columns: ["item_id", "stage", "parent_id", "width_mm", "target_um", "good_length_m", "gross_g · tare_g", "status"],
      idFormats: ["ING-YYMMDD-NN", "R-<ING>-<M|S>-NN"],
      count: counts.items,
      countNote: `잉곳 ${dataset.ingots.length} · 모 롤 ${counts.mothers} · 슬릿 롤 ${counts.slits}`,
      tone: "purple",
      icon: <Layers className="w-4 h-4" />,
    },
    {
      key: "shipment",
      name: "shipment + shipment_line",
      label: "출하 · 출하 라인",
      holds: "고객에게 나간 한 건과, 그 안에 실린 롤 목록. 약속일·출하일·고객 판정까지.",
      columns: ["shipment_id", "customer_id", "order_date", "promised_date", "shipped_at", "verdict", "line: roll_id"],
      idFormats: ["SH-YYMMDD-NN"],
      count: dataset.shipments.length,
      countNote: `출하 ${dataset.shipments.length}건 · 라인 ${counts.shipmentLines}줄`,
      tone: "emerald",
      icon: <Truck className="w-4 h-4" />,
    },
  ];

  const sideTables: TableSpec[] = [
    {
      key: "lot_genealogy",
      name: "lot_genealogy",
      label: "계보 (무엇이 무엇으로 들어갔나)",
      holds: "한 줄 = 화살표 하나. 원료→배치, 잉곳→모 롤, 모 롤→슬릿, 롤→출하를 같은 모양으로 적는다. 클레임 역추적의 뼈대.",
      columns: ["parent_id", "parent_kind", "child_id", "child_kind", "run_id", "qty"],
      idFormats: [],
      count: counts.genealogy,
      approx: true,
      countNote: `배치 투입 ${counts.batchInputs} + 잉곳 ${dataset.ingots.length} + 모 롤 ${counts.mothers} + 슬릿 ${counts.slits} + 출하 라인 ${counts.shipmentLines} + 필름 사용 ${counts.filmUses}`,
      tone: "indigo",
      icon: <GitBranch className="w-4 h-4" />,
      attachesTo: ["material_lot", "roll", "shipment_line"],
    },
    {
      key: "measurement",
      name: "measurement",
      label: "측정값",
      holds: "한 줄 = 측정 한 점. ICP 원소 ppm, 면밀도 좌·중·우를 같은 표에. 검출한계 미만(<)은 숫자와 따로 적는다.",
      columns: ["sample_id", "target_id", "item", "point", "value", "qualifier", "detection_limit", "instrument_id"],
      idFormats: ["S-<대상>-<채취점>-N"],
      count: counts.measurements,
      approx: true,
      countNote: `잉곳 ${dataset.ingots.length} × 원소 ${ICP_ELEMENTS.length} + 면밀도 기록 롤 ${counts.withAreal} × 3점`,
      tone: "amber",
      icon: <Ruler className="w-4 h-4" />,
      attachesTo: ["roll", "process_run"],
    },
    {
      key: "nonconformance",
      name: "nonconformance",
      label: "부적합·클레임",
      holds: "사내 불량·고객 클레임·안전 사고를 한 표에. 대상 ID 만 적으면 계보를 따라 원인 후보가 나온다.",
      columns: ["nc_id", "nc_type", "target_type", "target_id", "reason_code", "opened_at", "closed_at", "disposition"],
      idFormats: ["NC-YYYY-NNN"],
      count: dataset.nonconformances.length,
      countNote: "사내 · 클레임 · 안전 합계",
      tone: "rose",
      icon: <TriangleAlert className="w-4 h-4" />,
      attachesTo: ["roll", "process_run", "shipment"],
    },
  ];

  return (
    <div className={`space-y-4 lg:space-y-6 ${KEEP}`}>
      {/* 1. 핵심 메시지 */}
      <Card className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl" aria-hidden />
        <div className="relative">
          <div className="text-indigo-400 text-[11px] font-bold uppercase tracking-widest mb-2">도입 설계 · 첫 6개월</div>
          <h2 className="text-xl lg:text-3xl font-extrabold text-white leading-tight">
            표 <span className="text-indigo-300">7개</span> · 수기 입력 변수 <span className="text-purple-300">10개</span> · 화면{" "}
            <span className="text-emerald-300">3개</span>로 시작합니다
          </h2>
          <p className="text-sm text-gray-400 mt-2 leading-relaxed">
            화면 3개 = 롤 일지 입력 · KPI 보드 · 계보 조회. 데모의 앞 세 탭이 그 세 화면이고, 「개선 제안」 탭은 데이터가 쌓인 뒤의 모습입니다.
          </p>

          <div className="grid grid-cols-3 gap-2 lg:gap-4 mt-5">
            <BigNumber value="7" label="표" tone="indigo" icon={<Database className="w-4 h-4" />} />
            <BigNumber value="10" label="수기 입력 변수" tone="purple" icon={<Keyboard className="w-4 h-4" />} />
            <BigNumber value="3" label="화면" tone="emerald" icon={<LayoutDashboard className="w-4 h-4" />} />
          </div>

          <ul className="mt-5 space-y-2.5">
            <Reason n={1}>
              <b className="text-white">작은 조직이 표 16개를 한 번에 받으면 첫 달에 버려집니다.</b> 입력할 사람은 그대로인데 칸만 늘어나기
              때문입니다. 매일 꼭 쓰는 것부터 시작합니다.
            </Reason>
            <Reason n={2}>
              <b className="text-white">나트륨 호일·합금 같은 새 품목은 같은 롤 표에 컬럼으로 얹힙니다.</b> 품목마다 표를 새로 만들지
              않으니, 품목이 늘어도 화면과 집계가 그대로 돌아갑니다.
            </Reason>
            <Reason n={3}>
              <b className="text-white">계측기 연동은 입력률 90% 이후입니다.</b> 사람이 적는 습관이 먼저 자리 잡아야, 자동으로 들어온
              숫자를 어느 롤에 붙일지 정해집니다.
            </Reason>
          </ul>
        </div>
      </Card>

      {/* 2. 표 7개 다이어그램 */}
      <Card>
        <CardHeader
          eyebrow="데이터 구조"
          title="표 7개 — 물건의 흐름대로 4개, 옆에서 붙는 표 3개"
          description="숫자는 이 데모에 실제로 들어 있는 행 수입니다. 「약」은 계산식으로 추정한 값입니다(카드 아래 식 참고)."
        />

        <FlowStrip />

        {/* 본 흐름 4개 */}
        <div className="mt-5 grid grid-cols-1 lg:grid-cols-4 gap-0 lg:gap-6">
          {mainTables.map((t, i) => (
            <div key={t.key} className="relative flex flex-col">
              <TableCard spec={t} />
              {i < mainTables.length - 1 && (
                <>
                  <div className="flex lg:hidden justify-center py-1.5 text-gray-500" aria-hidden>
                    <ArrowDown className="w-5 h-5" />
                  </div>
                  <div
                    className="hidden lg:flex absolute top-8 -right-6 w-6 justify-center text-gray-500 z-10"
                    aria-hidden
                  >
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* 관계선 — lg 에서만 버스 모양으로 */}
        <div className="hidden lg:block mt-2" aria-hidden>
          <svg viewBox="0 0 1000 56" preserveAspectRatio="none" className="w-full h-14">
            {[125, 375, 625, 875].map((x) => (
              <line key={`t${x}`} x1={x} y1={0} x2={x} y2={28} className="stroke-white/20" strokeWidth={1.5} strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
            ))}
            <line x1={125} y1={28} x2={875} y2={28} className="stroke-indigo-400/50" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
            {[166, 500, 834].map((x) => (
              <line key={`b${x}`} x1={x} y1={28} x2={x} y2={56} className="stroke-white/20" strokeWidth={1.5} strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
        </div>
        <div className="hidden lg:block text-center text-xs text-gray-500 mb-2">
          옆 표 3개는 대상 ID(원료 로트·배치·롤·출하)만 적어서 붙는다
        </div>

        <div className="flex lg:hidden items-center gap-2 mt-5 mb-2 text-xs text-gray-400">
          <span className="h-px flex-1 bg-white/10" />
          옆에서 붙는 표 — 대상 ID 만 적는다
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-6">
          {sideTables.map((t) => (
            <TableCard key={t.key} spec={t} />
          ))}
        </div>

        {/* 공용 마스터 · 레시피 보안 스키마 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6 mt-5">
          <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Database className="w-4 h-4 text-gray-400" />
              공용 마스터 — 한 번 등록하고 모든 표가 참조
            </div>
            <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <MasterItem name="customer" desc="고객사 (이 데모는 가상의 고객 A·B·C)" />
              <MasterItem name="supplier" desc="원료·필름·가스 공급사" />
              <MasterItem name="equipment / instrument" desc="정제로·압연기·슬리터 / ICP·저울·노점계" />
              <MasterItem name="spec_version" desc="규격 상한의 버전 — 규격이 바뀌어도 옛 판정이 남는다" />
              <MasterItem name="code_table" desc="부적합 사유·외관 등급·단계 같은 코드" />
            </ul>
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/[0.06] p-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Lock className="w-4 h-4 text-amber-300" />
              레시피 보안 스키마 — 노하우는 따로 잠근다
            </div>
            <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
              운영 표에는 <code className="font-mono text-amber-200">recipe_id</code> 만 남습니다. 압하력·장력·전압·시간 같은 원값은 별도
              스키마에 암호화해 두고, 열람 권한자만 보며 열람할 때마다 기록이 남습니다.
            </p>
            <TableWrap>
              <table className="w-full mt-3 text-xs min-w-[300px]">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="font-medium py-1.5 pr-3">운영 표에 보이는 것</th>
                    <th className="font-medium py-1.5">보안 스키마에만</th>
                  </tr>
                </thead>
                <tbody>
                  {dataset.recipes.map((r) => (
                    <tr key={r.id} className="border-t border-white/5">
                      <td className="py-1.5 pr-3 align-top">
                        <span className="font-mono text-gray-200">{r.id}</span>
                        <span className="text-gray-500"> · {r.name}</span>
                      </td>
                      <td className="py-1.5 align-top">
                        <span className="inline-flex items-center gap-1 text-amber-200/80">
                          <KeyRound className="w-3 h-3" />
                          <span className="font-mono tracking-widest">••••</span>
                          <span className="text-gray-500">{r.kind === "refine" ? "전압·시간" : "압하력·장력·속도"}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableWrap>
          </div>
        </div>
      </Card>

      {/* 3. 변수 10개 */}
      <Card>
        <CardHeader
          eyebrow="수기 입력"
          title="현장에서 적는 변수 10개 — 나머지는 전부 자동 계산"
          description="작업자가 적는 것은 이것뿐입니다. 오른쪽 지표는 입력 즉시 계산되어 KPI 보드에 올라갑니다."
        />
        <ol className="divide-y divide-white/5">
          {VARIABLES.map((v, i) => (
            <li key={v.input} className="py-3 grid grid-cols-[2rem_1fr] lg:grid-cols-[2rem_minmax(0,5fr)_1.5rem_minmax(0,6fr)] gap-x-2 gap-y-1 items-start">
              <span className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white leading-snug">{v.input}</div>
                {v.hint && <div className="text-[11px] text-gray-500 mt-0.5">{v.hint}</div>}
              </div>
              <ArrowRight className="hidden lg:block w-4 h-4 text-gray-600 mt-1" aria-hidden />
              <div className="col-start-2 lg:col-start-auto min-w-0">
                <div className="text-sm text-emerald-300 leading-snug">
                  <span className="lg:hidden text-gray-600 mr-1">→</span>
                  {v.output}
                </div>
                {v.story && <div className="text-[11px] text-gray-500 mt-0.5">이 데모에서: {v.story}</div>}
              </div>
            </li>
          ))}
        </ol>
      </Card>

      {/* 4. 도입 4단계 매트릭스 */}
      <Card>
        <CardHeader
          eyebrow="어디까지 되나"
          title="도입 4단계 — 지금 바로 되는 것과, 데이터로도 못 하는 것"
          description="오른쪽 칸으로 갈수록 돈과 시간이 듭니다. 첫 6개월은 맨 왼쪽 칸만 합니다."
        />
        <TableWrap>
          <table className="w-full min-w-[760px] text-xs lg:text-sm border-separate border-spacing-0">
            <thead>
              <tr>
                <th className="text-left font-medium text-gray-500 py-2 pr-3 w-[120px]">구분</th>
                {STAGES.map((s) => (
                  <th key={s.label} className="text-left py-2 px-3 align-bottom">
                    <div className={`text-[11px] font-bold ${TONE[s.tone].text}`}>{s.step}</div>
                    <div className="text-white font-semibold">{s.label}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MATRIX.map((row) => (
                <tr key={row.area}>
                  <th scope="row" className="text-left align-top font-semibold text-gray-200 py-3 pr-3 border-t border-white/10">
                    {row.area}
                  </th>
                  {row.cells.map((c, ci) => (
                    <td
                      key={ci}
                      className={`align-top py-3 px-3 border-t border-white/10 leading-relaxed ${
                        ci === 0 ? "bg-indigo-500/[0.07] text-gray-100" : ci === 3 ? "text-gray-400" : "text-gray-300"
                      }`}
                    >
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </TableWrap>
      </Card>

      {/* 5. 6개월 로드맵 */}
      <Card>
        <CardHeader
          eyebrow="일정"
          title="6개월 로드맵"
          description="매주 결측률(적어야 할 칸 중 비어 있는 비율)을 봅니다. 숫자가 좋아지지 않으면 화면을 늘리지 않고 입력 방식부터 고칩니다."
          right={<Badge tone="indigo"><CalendarRange className="w-3 h-3" />26주</Badge>}
        />
        <div className="relative">
        <div className="hidden lg:block absolute top-[14px] left-4 right-4 h-px bg-gradient-to-r from-indigo-500/60 via-purple-500/60 to-emerald-500/60" aria-hidden />
        <ol className="relative grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-5">
          {ROADMAP.map((p, i) => (
            <li key={p.weeks} className="relative pl-9 lg:pl-0 lg:pt-10">
              {i < ROADMAP.length - 1 && (
                <span className="lg:hidden absolute left-[13px] top-7 bottom-[-1rem] w-px bg-white/10" aria-hidden />
              )}
              <span
                className={`absolute left-0 top-0 lg:left-0 w-7 h-7 rounded-full border-2 border-gray-950 ${TONE[p.tone].solid} text-white text-xs font-bold flex items-center justify-center`}
              >
                {i + 1}
              </span>
              <div className={`text-xs font-bold ${TONE[p.tone].text}`}>{p.weeks}</div>
              <div className="text-sm font-bold text-white mt-0.5">{p.title}</div>
              <ul className="mt-2 space-y-1">
                {p.items.map((it) => (
                  <li key={it} className="text-xs text-gray-400 leading-relaxed flex gap-1.5">
                    <span className="text-gray-600">·</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        </div>
        {worstMissing.total > 0 && (
          <div className="mt-5">
            <Callout tone={worstMissing.rate < 0.1 ? "emerald" : "amber"} icon={<ClipboardCheck className="w-4 h-4" />}>
              이 데모 공장이라면: 모 롤 {fmtNum(worstMissing.total, 0)}개 중 「{worstMissing.label}」이 {fmtNum(worstMissing.missing, 0)}건
              비어 있습니다(결측률 {fmtPct(worstMissing.rate, 0)}).{" "}
              {worstMissing.rate < 0.1
                ? "10% 미만이라 2단계(계측기 연동)로 넘어갈 수 있습니다."
                : "10% 이상이라 아직 2단계로 넘어가지 않고, 입력 습관부터 잡습니다."}
            </Callout>
          </div>
        )}
      </Card>

      {/* 6. 보안·인프라 */}
      <Card>
        <CardHeader eyebrow="보안 · 인프라" title="공정 데이터는 회사 밖으로 나가지 않게" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <SecurityItem icon={<Server className="w-4 h-4" />} title="사내 서버(또는 국내 리전) PostgreSQL + 웹 폼">
            현장 PC·태블릿 브라우저로 입력합니다. 별도 프로그램 설치 없이, 데이터베이스는 회사가 정한 곳에만 둡니다.
          </SecurityItem>
          <SecurityItem icon={<Lock className="w-4 h-4" />} title="레시피 분리 · 암호화 · 접근 기록">
            조건 원값은 보안 스키마에 암호화 저장하고, 누가 언제 열람했는지 남깁니다. 운영 화면에는 레시피 ID 만 보입니다.
          </SecurityItem>
          <SecurityItem icon={<FlaskConical className="w-4 h-4" />} title="외주 개발은 가짜 데이터로">
            개발자는 이 데모처럼 형태만 같은 가상 데이터로 작업합니다. 실제 공정값은 개발 환경에 들어오지 않습니다.
          </SecurityItem>
          <SecurityItem icon={<Shield className="w-4 h-4" />} title="고객 간 교차 분석 금지">
            고객사별 데이터는 서로 섞어 분석하지 않습니다. 한 고객의 클레임 데이터가 다른 고객 보고서에 쓰이지 않습니다.
          </SecurityItem>
        </div>
      </Card>

      {/* 7. 하단 이동 */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => onNavigate("log")}
          className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold px-5 transition-colors"
        >
          <Keyboard className="w-4 h-4" />
          롤 일지로 체험하기
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onNavigate("kpi")}
          className="flex-1 min-h-[48px] inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-gray-100 text-sm font-bold px-5 transition-colors"
        >
          <LayoutDashboard className="w-4 h-4" />
          KPI 보드 보기
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 조각

function BigNumber({ value, label, tone, icon }: { value: string; label: string; tone: Tone; icon: ReactNode }) {
  const t = TONE[tone];
  return (
    <div className={`rounded-xl border ${t.border} ${t.bg} p-3 lg:p-4`}>
      <div className={`flex items-center gap-1.5 text-[11px] lg:text-xs ${t.text}`}>
        {icon}
        <span className="truncate">{label}</span>
      </div>
      <div className="text-3xl lg:text-5xl font-extrabold text-white mt-1">{value}</div>
    </div>
  );
}

function Reason({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li className="flex gap-2.5 text-sm text-gray-300 leading-relaxed">
      <span className="shrink-0 w-5 h-5 mt-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-gray-400 font-bold flex items-center justify-center">
        {n}
      </span>
      <span className="min-w-0">{children}</span>
    </li>
  );
}

/** 공장 안 물건의 흐름 ↔ 표 이름 대응 */
function FlowStrip() {
  const steps: Array<{ label: string; table: string; tone: Tone }> = [
    { label: "원료 입고", table: "material_lot", tone: "cyan" },
    { label: "정제 배치", table: "process_run", tone: "indigo" },
    { label: "잉곳", table: "roll", tone: "purple" },
    { label: "압연 → 모 롤", table: "process_run · roll", tone: "purple" },
    { label: "슬릿 롤", table: "roll", tone: "purple" },
    { label: "출하", table: "shipment", tone: "emerald" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
      {steps.map((s, i) => (
        <div key={s.label} className="flex items-center gap-1.5">
          <div className={`rounded-lg border px-2.5 py-1.5 ${TONE[s.tone].bg} ${TONE[s.tone].border}`}>
            <div className="text-xs font-semibold text-white leading-tight">{s.label}</div>
            <div className={`font-mono text-[10px] ${TONE[s.tone].text} leading-tight`}>{s.table}</div>
          </div>
          {i < steps.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-gray-600 shrink-0" aria-hidden />}
        </div>
      ))}
    </div>
  );
}

function TableCard({ spec }: { spec: TableSpec }) {
  const t = TONE[spec.tone];
  return (
    <div className={`h-full rounded-xl border ${t.border} bg-gray-950/60 p-3.5 flex flex-col`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className={`flex items-center gap-1.5 font-mono text-xs font-bold ${t.text} break-all`}>
            {spec.icon}
            {spec.name}
          </div>
          <div className="text-sm font-bold text-white mt-1 leading-snug">{spec.label}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-lg font-extrabold text-white leading-none">
            {spec.approx && <span className="text-[11px] font-semibold text-gray-500 mr-0.5">약</span>}
            {fmtNum(spec.count, 0)}
          </div>
          <div className="text-[10px] text-gray-500 mt-0.5">행</div>
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-2 leading-relaxed">{spec.holds}</p>

      <div className="mt-2.5 flex flex-wrap gap-1">
        {spec.columns.map((c) => (
          <code key={c} className="font-mono text-[11px] text-gray-300 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 break-all">
            {c}
          </code>
        ))}
      </div>

      <div className="mt-auto pt-3 space-y-1.5">
        {spec.idFormats.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {spec.idFormats.map((f) => (
              <Badge key={f} tone={spec.tone} className="font-mono">
                {f}
              </Badge>
            ))}
          </div>
        )}
        {spec.attachesTo && (
          <div className="text-[11px] text-gray-500">
            붙는 곳: <span className="font-mono text-gray-400">{spec.attachesTo.join(" · ")}</span>
          </div>
        )}
        <div className="text-[11px] text-gray-500 leading-snug">
          {spec.approx ? "추정식: " : ""}
          {spec.countNote}
        </div>
      </div>
    </div>
  );
}

function MasterItem({ name, desc }: { name: string; desc: string }) {
  return (
    <li className="rounded-lg bg-white/[0.03] border border-white/5 px-2.5 py-2">
      <div className="font-mono text-xs text-gray-200 break-all">{name}</div>
      <div className="text-[11px] text-gray-500 mt-0.5 leading-snug">{desc}</div>
    </li>
  );
}

function SecurityItem({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3.5">
      <span className="shrink-0 w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center justify-center">
        {icon}
      </span>
      <div className="min-w-0">
        <div className="text-sm font-bold text-white leading-snug">{title}</div>
        <p className="text-xs text-gray-400 mt-1 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 정적 콘텐츠

const VARIABLES: Array<{ input: string; hint?: string; output: string; story?: string }> = [
  {
    input: "잉곳 ID · 원료 출처 · 투입 질량",
    hint: "정제 배치마다 한 번",
    output: "정제 수율, 원료 로트별 영향 범위(어느 롤·출하까지 갔나)",
    story: "스크랩 회수 로트 RM-2607-004 가 배치 3건에 재투입된 경로",
  },
  {
    input: "롤 ID · 부모 롤 · 단계",
    hint: "라벨 발번과 동시에",
    output: "계보 역추적(출하 → 롤 → 잉곳 → 원료), 단계별 수율",
  },
  {
    input: "레시피 ID · 패스 수",
    output: "레시피별 무파단율·두께 산포 비교",
    story: "레시피 B 는 산포가 줄고, 시험 레시피 C 는 파단·편차가 크다",
  },
  {
    input: "시작·종료 시각 + 교대 노점",
    hint: "노점 — 공기 중 수분 지표, 낮을수록 건조",
    output: "사이클 타임, 노점 기준 이탈 작업분 표시",
    story: "노점 −45℃ 초과 작업분이 표면 변색 클레임(SH-260802-01)으로",
  },
  {
    input: "면밀도 3점 (좌·중·우)",
    hint: "면밀도 — 정해진 넓이의 무게, 두께의 정본",
    output: "두께(µm) 환산, 폭 방향 편차 관리도",
  },
  {
    input: "폭",
    output: "면적 환산, 폭 규격 대비 트림 손실",
  },
  {
    input: "양품 길이 · 총중량 · tare + 파단 횟수 · 손실 m",
    hint: "tare — 코어·필름 무게, 빼야 리튬 무게",
    output: "질량 수율 폭포, 무파단율, 필름 재사용 횟수별 파단",
    story: "이형 필름 재사용 5회 이상에서 파단 급증",
  },
  {
    input: "ICP 성적서 전기 (원소 ppm · 부등호 · 검출한계)",
    hint: "ICP — 불순물 원소 분석, 성적서 숫자를 옮겨 적는다",
    output: "원소별 관리도, 규격 초과 시 해당 잉곳의 롤 자동 홀드",
    story: "도가니 6회째 Fe 관리한계 이탈 → 8회째 잉곳 규격 초과 → 롤 홀드",
  },
  {
    input: "외관 등급 · 사진",
    output: "등급 분포, 클레임과 대조",
  },
  {
    input: "출하 ↔ 롤 · 수주일 · 출하일 · 고객 판정",
    output: "고객별 납기 준수율, 클레임 → 원인 롤 역추적",
    story: "고객 A 납기 준수율이 낮다",
  },
];

const STAGES: Array<{ step: string; label: string; tone: Tone }> = [
  { step: "1단계", label: "지금 바로 (수기·엑셀 정리)", tone: "indigo" },
  { step: "2단계", label: "계측기 연동", tone: "purple" },
  { step: "3단계", label: "새 계측 필요", tone: "amber" },
  { step: "한계", label: "데이터로 못 함", tone: "gray" },
];

const MATRIX: Array<{ area: string; cells: [string, string, string, string] }> = [
  {
    area: "정제 · 잉곳",
    cells: [
      "투입·산출 질량, 도가니 사용 횟수, ICP 성적서 전기",
      "저울 값 자동 전송, 정제 전압·전류 로그 수집",
      "용탕 산소·질소 인라인 측정",
      "공급사 내부 공정 이력 (공급사가 주지 않으면)",
    ],
  },
  {
    area: "호일 압연",
    cells: [
      "레시피·패스 수, 파단 횟수·손실 m, 면밀도 3점",
      "압연기 롤 간격·장력·속도 PLC 수집",
      "전폭 두께 연속 측정기",
      "숙련자의 손감각 판단 (말로 옮기기 전까지)",
    ],
  },
  {
    area: "품질 · 계보",
    cells: [
      "로트 발번·라벨, 출하 ↔ 롤 연결, 부적합 기록",
      "바코드 스캔 입출고, ICP 결과 파일 가져오기",
      "표면 결함 비전 검사",
      "고객 셀 공정에서 생긴 불량의 원인 확정",
    ],
  },
  {
    area: "환경 · 운영",
    cells: [
      "교대 노점·작업자·시각",
      "드라이룸 노점계·온습도 연속 기록",
      "구역별 노점 센서 추가",
      "기록 안 된 과거 작업분의 노점 되살리기",
    ],
  },
];

const ROADMAP: Array<{ weeks: string; title: string; items: string[]; tone: Tone }> = [
  {
    weeks: "1~2주",
    title: "현장 실사 · 로트 정의",
    items: ["공정을 따라 걸으며 물건이 나뉘고 합쳐지는 지점 확인", "로트 단위 정의·ID 발번 규칙 확정", "라벨 양식·부착 위치 결정"],
    tone: "indigo",
  },
  {
    weeks: "3~4주",
    title: "기존 엑셀 이관 · 화면 1",
    items: ["지금 쓰는 엑셀·성적서를 표 7개로 옮기기", "화면 1(롤 일지 입력) 배포", "작업자 교육 — 교대당 10분"],
    tone: "purple",
  },
  {
    weeks: "5~12주",
    title: "전향 기록",
    items: ["모든 신규 롤을 입력하며 생산", "주 1회 결측률 점검·입력 칸 조정", "라벨 누락·ID 중복을 그 주에 바로잡기"],
    tone: "cyan",
  },
  {
    weeks: "13~26주",
    title: "관리도 · 화면 2·3",
    items: ["데이터가 쌓인 항목부터 관리도 시작", "화면 2(KPI 보드)·화면 3(계보 조회) 배포", "6개월 재검토 — 결측률 10% 미만이면 2단계"],
    tone: "emerald",
  },
];
