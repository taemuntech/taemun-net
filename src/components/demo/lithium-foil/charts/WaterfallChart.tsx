"use client";

// 수율 워터폴 — 단계별 질량 막대 + 이전 단계에서 줄어든 부분을 떠 있는 조각으로.
// 공정 손실(rose)과 재고로 남은 것(amber 빗금)을 구분한다. 좁은 화면(560px 미만)은 가로 막대로 바꾼다.
// 라이트 캔버스: 막대는 전부 primary(마지막 출하 막대도 — emerald↔rose 나란히 금지), 글자는 ink/label/tick.

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import type { WaterfallChartProps } from "./types";
import { fmtNum } from "../ui";
import { CHART, CHART_FONT } from "./palette";

const C = {
  bar: CHART.primary,
  loss: CHART.spec,
  inventory: CHART.limit,
  /** 재고 빗금 바탕 — amber-100, 흰 카드 위에서 조각 면이 보이게 */
  inventoryFill: "#fef3c7",
  grid: CHART.grid,
  axis: CHART.axis,
  connector: CHART.axis,
  tick: CHART.tick,
  label: CHART.label,
  value: CHART.ink,
  /** 진한 막대(불투명 primary) 안쪽 값 글자 */
  onBar: CHART.surface,
};

const INITIAL_WIDTH = 640;

function useChartWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(INITIAL_WIDTH);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver((entries) => {
      const w = Math.round(entries[0]?.contentRect.width ?? 0);
      if (w > 0) setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, width };
}

function niceMax(value: number): { max: number; ticks: number[]; digits: number } {
  const v = value > 0 ? value : 1;
  const raw = v / 4;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
  const max = Math.ceil(v / step - 1e-9) * step;
  const ticks: number[] = [];
  for (let t = 0; t <= max + step * 1e-6; t += step) ticks.push(Number(t.toFixed(10)));
  let digits = 0;
  while (digits < 4 && Math.abs(Math.round(step * 10 ** digits) - step * 10 ** digits) > 1e-6) digits += 1;
  return { max, ticks, digits };
}

function textWidth(s: string, fontSize: number): number {
  let w = 0;
  for (const ch of s) {
    if (/[ㄱ-힣一-鿿]/.test(ch)) w += fontSize * 0.95;
    else if (ch === " ") w += fontSize * 0.3;
    else w += fontSize * 0.6;
  }
  return w;
}

/** 칸 폭에 안 들어가면 띄어쓰기에서 두 줄로 */
function splitLabel(label: string, maxWidth: number, fontSize: number): string[] {
  if (textWidth(label, fontSize) <= maxWidth) return [label];
  const words = label.split(" ");
  if (words.length < 2) return [label];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

function deltaText(delta: number): string {
  return delta >= 0 ? `−${fmtNum(delta, 2)}` : `+${fmtNum(-delta, 2)}`;
}

export default function WaterfallChart({ steps, unit = "kg", height = 260 }: WaterfallChartProps) {
  const { ref, width } = useChartWidth();
  const patternId = `wf-hatch-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  if (steps.length === 0) {
    return (
      <div ref={ref} className="w-full">
        <div
          className="flex items-center justify-center rounded-xl border border-dashed border-slate-300 text-sm text-slate-500"
          style={{ height }}
        >
          데이터가 없습니다
        </div>
      </div>
    );
  }

  const n = steps.length;
  const horizontal = width < 560;
  const hasLoss = steps.some((s) => s.deltaKind === "loss" && s.deltaKg !== 0);
  const hasInventory = steps.some((s) => s.deltaKind === "inventory" && s.deltaKg !== 0);
  const top = Math.max(...steps.map((s, i) => Math.max(s.valueKg, i > 0 ? (steps[i - 1]?.valueKg ?? 0) : 0)));
  const scale = niceMax(top);

  const first = steps[0];
  const last = steps[n - 1];
  const overall = first && last && first.valueKg > 0 ? last.valueKg / first.valueKg : null;
  const ariaLabel = `수율 워터폴(단위 ${unit}) — ${steps
    .map((s) => `${s.label} ${fmtNum(s.valueKg, 2)}${s.deltaKind && s.deltaKg !== 0 ? `(${s.deltaKind === "loss" ? "공정 손실" : "재고"} ${deltaText(s.deltaKg)})` : ""}`)
    .join(", ")}`;

  /** 처음·마지막은 불투명(흰 값 글자 대비 확보), 중간 단계는 옅게 — 옅은 막대 안 값 글자는 ink */
  const isSolid = (i: number) => i === 0 || i === n - 1;
  const opacityOf = (i: number) => (isSolid(i) ? 1 : 0.6);
  const deltaFill = (kind: "loss" | "inventory") => (kind === "loss" ? C.loss : `url(#${patternId})`);
  const deltaColor = (kind: "loss" | "inventory") => (kind === "loss" ? C.loss : C.inventory);

  let svg: ReactNode;
  let svgHeight = height;

  if (!horizontal) {
    const fs = CHART_FONT.regular;
    const M = { top: 14, right: 44, bottom: 38, left: Math.ceil(textWidth(fmtNum(scale.max, scale.digits), fs)) + 12 };
    const plotW = width - M.left - M.right;
    const plotH = height - M.top - M.bottom;
    const slot = plotW / n;
    const barW = Math.min(64, slot * 0.55);
    const yAt = (v: number) => M.top + plotH - (v / scale.max) * plotH;
    const cx = (i: number) => M.left + slot * (i + 0.5);
    const bottom = M.top + plotH;

    svg = (
      <>
        {scale.ticks.map((t) => (
          <g key={`t-${t}`}>
            <line x1={M.left} x2={M.left + plotW} y1={yAt(t)} y2={yAt(t)} stroke={C.grid} />
            <text x={M.left - 6} y={yAt(t) + 4} fontSize={fs} fill={C.tick} textAnchor="end">
              {fmtNum(t, scale.digits)}
            </text>
          </g>
        ))}
        <line x1={M.left} x2={M.left + plotW} y1={bottom} y2={bottom} stroke={C.axis} />

        {steps.map((s, i) => {
          const x = cx(i);
          const yv = yAt(s.valueKg);
          const prev = i > 0 ? steps[i - 1] : undefined;
          const showDelta = Boolean(prev && s.deltaKind && s.deltaKg !== 0);
          const yPrev = prev ? yAt(prev.valueKg) : yv;
          const lines = splitLabel(s.label, slot - 4, fs);
          const barH = Math.max(0, bottom - yv);
          return (
            <g key={s.key}>
              <title>{`${s.label} ${fmtNum(s.valueKg, 2)}${unit}${showDelta ? ` · ${deltaText(s.deltaKg)}${unit}` : ""} — ${s.note}`}</title>
              {prev && (
                <line
                  x1={cx(i - 1) + barW / 2}
                  x2={x - barW / 2}
                  y1={yPrev}
                  y2={yPrev}
                  stroke={C.connector}
                  strokeDasharray="3 3"
                />
              )}
              <rect x={x - barW / 2} y={yv} width={barW} height={barH} rx={3} fill={C.bar} fillOpacity={opacityOf(i)} />
              {showDelta && s.deltaKind && (
                <>
                  <rect
                    x={x - barW / 2}
                    y={Math.min(yPrev, yv)}
                    width={barW}
                    height={Math.max(1.5, Math.abs(yv - yPrev))}
                    fill={deltaFill(s.deltaKind)}
                    fillOpacity={1}
                    stroke={deltaColor(s.deltaKind)}
                    strokeWidth={1}
                  />
                  <text x={x + barW / 2 + 3} y={Math.max(yv, yPrev) - 3} fontSize={CHART_FONT.compact} fontWeight={700} fill={C.label}>
                    {deltaText(s.deltaKg)}
                  </text>
                </>
              )}
              <text
                x={x}
                y={barH >= 20 ? yv + 14 : yv - 4}
                fontSize={fs}
                fontWeight={700}
                fill={barH >= 20 && isSolid(i) ? C.onBar : C.value}
                textAnchor="middle"
              >
                {fmtNum(s.valueKg, 2)}
              </text>
              {lines.map((line, li) => (
                <text key={li} x={x} y={bottom + 15 + li * 13} fontSize={fs} fill={C.label} textAnchor="middle">
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </>
    );
  } else {
    const fs = CHART_FONT.regular;
    const rowH = 40;
    const labelW = Math.min(width * 0.3, Math.max(...steps.map((s) => Math.max(...splitLabel(s.label, 60, fs).map((l) => textWidth(l, fs))))));
    const M = { top: 4, right: Math.ceil(textWidth(fmtNum(top, 2), fs)) + 10, bottom: 4, left: Math.ceil(labelW) + 10 };
    const plotW = Math.max(40, width - M.left - M.right);
    svgHeight = n * rowH + M.top + M.bottom;
    const xAt = (v: number) => M.left + (v / scale.max) * plotW;
    const barH = 16;

    svg = (
      <>
        <line x1={M.left} x2={M.left} y1={M.top} y2={svgHeight - M.bottom} stroke={C.axis} />
        {steps.map((s, i) => {
          const rowTop = M.top + i * rowH;
          const barY = rowTop + 5;
          const prev = i > 0 ? steps[i - 1] : undefined;
          const showDelta = Boolean(prev && s.deltaKind && s.deltaKg !== 0);
          const xv = xAt(s.valueKg);
          const xPrev = prev ? xAt(prev.valueKg) : xv;
          const lines = splitLabel(s.label, 60, fs);
          return (
            <g key={s.key}>
              <title>{`${s.label} ${fmtNum(s.valueKg, 2)}${unit}${showDelta ? ` · ${deltaText(s.deltaKg)}${unit}` : ""} — ${s.note}`}</title>
              {lines.map((line, li) => (
                <text
                  key={li}
                  x={M.left - 8}
                  y={barY + 12 + (li - (lines.length - 1) / 2) * 13}
                  fontSize={fs}
                  fill={C.label}
                  textAnchor="end"
                >
                  {line}
                </text>
              ))}
              <rect x={M.left} y={barY} width={Math.max(0, xv - M.left)} height={barH} rx={3} fill={C.bar} fillOpacity={opacityOf(i)} />
              {showDelta && s.deltaKind && (
                <>
                  <rect
                    x={Math.min(xv, xPrev)}
                    y={barY}
                    width={Math.max(1.5, Math.abs(xPrev - xv))}
                    height={barH}
                    fill={deltaFill(s.deltaKind)}
                    fillOpacity={1}
                    stroke={deltaColor(s.deltaKind)}
                    strokeWidth={1}
                  />
                  <text x={Math.max(xv, xPrev)} y={barY + barH + 13} fontSize={CHART_FONT.compact} fontWeight={700} fill={C.label} textAnchor="end">
                    {deltaText(s.deltaKg)}
                  </text>
                </>
              )}
              <text x={Math.max(xv, xPrev) + 5} y={barY + 12} fontSize={fs} fontWeight={700} fill={C.value}>
                {fmtNum(s.valueKg, 2)}
              </text>
            </g>
          );
        })}
      </>
    );
  }

  return (
    <div ref={ref} className="w-full">
      <div className="mb-1 flex items-center justify-between gap-2 text-[11px] text-slate-500">
        <span>단위: {unit}</span>
        {overall !== null && (
          <span className="[word-break:keep-all]">
            처음 대비 마지막 단계 <span className="font-semibold text-slate-900">{fmtNum(overall * 100, 1)}%</span>
          </span>
        )}
      </div>
      <svg role="img" aria-label={ariaLabel} width="100%" height={svgHeight} viewBox={`0 0 ${width} ${svgHeight}`} className="block select-none">
        <title>{ariaLabel}</title>
        <defs>
          <pattern id={patternId} patternUnits="userSpaceOnUse" width={6} height={6} patternTransform="rotate(45)">
            <rect width={6} height={6} fill={C.inventoryFill} />
            <line x1={0} y1={0} x2={0} y2={6} stroke={C.inventory} strokeWidth={2.5} />
          </pattern>
        </defs>
        {svg}
      </svg>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-slate-600 [word-break:keep-all]">
        <li className="flex items-center gap-1.5">
          {/* 처음·마지막 막대(불투명)와 중간 막대(옅게)를 한 칸에 반씩 — 차트의 두 농도가 모두 범례에 있다 */}
          <span className="inline-flex h-2.5 w-5 overflow-hidden rounded-sm" aria-hidden>
            <span className="h-full w-1/2" style={{ backgroundColor: C.bar }} />
            <span className="h-full w-1/2 opacity-60" style={{ backgroundColor: C.bar }} />
          </span>
          단계별 질량
        </li>
        {hasLoss && (
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-3.5 rounded-sm" style={{ backgroundColor: C.loss }} aria-hidden />
            공정 손실
          </li>
        )}
        {hasInventory && (
          <li className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-3.5 rounded-sm border"
              style={{
                borderColor: C.inventory,
                backgroundColor: C.inventoryFill,
                backgroundImage: `repeating-linear-gradient(45deg, ${C.inventory} 0 2px, transparent 2px 5px)`,
              }}
              aria-hidden
            />
            재고(손실 아님)
          </li>
        )}
      </ul>
    </div>
  );
}
