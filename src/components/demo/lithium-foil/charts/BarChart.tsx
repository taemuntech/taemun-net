"use client";

// 막대 차트 — 세로(기본)·가로(horizontal). 값 라벨은 막대 끝, hint 는 라벨 아래 작은 글씨.
// 폭은 ResizeObserver 로 잰다. 첫 렌더는 고정 폭(640)으로 그려 서버·클라이언트 출력이 같다.

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { BarChartProps, ChartTone } from "./types";
import { fmtNum } from "../ui";
import { CHART, CHART_FONT, TONE_HEX } from "./palette";

// 라이트 캔버스: 값 라벨은 항상 막대 밖 ink 글자(막대 색 무관), 막대는 불투명 tone 색.
const C = {
  grid: CHART.grid,
  axis: CHART.axis,
  /** 가로 막대 뒤 옅은 트랙 */
  track: CHART.band,
  tick: CHART.tick,
  label: CHART.label,
  hint: CHART.tick,
  value: CHART.ink,
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

function niceTicks(maxValue: number, count = 4): { max: number; ticks: number[] } {
  const v = maxValue > 0 ? maxValue : 1;
  const raw = v / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
  const max = Math.ceil(v / step - 1e-9) * step;
  const ticks: number[] = [];
  for (let t = 0; t <= max + step * 1e-6; t += step) ticks.push(Number(t.toFixed(10)));
  return { max, ticks };
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

/** 폭에 맞춰 줄바꿈(띄어쓰기 기준), maxLines 를 넘으면 말줄임 */
function wrapText(text: string, maxWidth: number, fontSize: number, maxLines: number): string[] {
  const words = text.split(" ").filter(Boolean);
  const lines: string[] = [];
  let cur = "";
  for (const word of words) {
    const next = cur ? `${cur} ${word}` : word;
    if (textWidth(next, fontSize) <= maxWidth || !cur) cur = next;
    else {
      lines.push(cur);
      cur = word;
    }
  }
  if (cur) lines.push(cur);
  const out = lines.slice(0, maxLines);
  const lastIdx = out.length - 1;
  const truncated = lines.length > maxLines;
  if (lastIdx >= 0) {
    let lastLine = out[lastIdx] ?? "";
    if (truncated || textWidth(lastLine, fontSize) > maxWidth) {
      const chars = Array.from(lastLine);
      while (chars.length > 1 && textWidth(`${chars.join("")}…`, fontSize) > maxWidth) chars.pop();
      lastLine = `${chars.join("")}…`;
      out[lastIdx] = lastLine;
    }
  }
  return out;
}

export default function BarChart({
  items,
  unit,
  max,
  format = (value: number) => fmtNum(value, 1),
  height = 200,
  horizontal = false,
}: BarChartProps) {
  const { ref, width } = useChartWidth();

  if (items.length === 0) {
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

  const compact = width < 480;
  const fs = compact ? CHART_FONT.compact : CHART_FONT.regular;
  /** hint 글자 — 모바일에서도 10px 아래로 내리지 않는다 */
  const hfs = Math.max(CHART_FONT.compact, fs - 1);
  const n = items.length;
  const dataMax = Math.max(...items.map((it) => it.value), 0);
  const fixedMax = typeof max === "number" && max > 0 ? max : null;
  const nice = niceTicks(fixedMax ?? dataMax, 4);
  const domainMax = fixedMax ?? nice.max;
  const ticks = nice.ticks.filter((t) => t <= domainMax + 1e-9);
  const ratio = (v: number) => Math.max(0, Math.min(1, v / domainMax));
  const colorOf = (tone: ChartTone | undefined) => TONE_HEX[tone ?? "indigo"];
  const titleOf = (label: string, value: number, hint?: string) =>
    `${label}: ${format(value)}${unit ? ` ${unit}` : ""}${hint ? ` (${hint})` : ""}`;

  const ariaLabel = `막대 차트${unit ? `(단위 ${unit})` : ""} — ${items.map((it) => `${it.label} ${format(it.value)}`).join(", ")}`;

  let body: ReactNode;
  let svgHeight = height;

  if (horizontal) {
    const hasHint = items.some((it) => Boolean(it.hint));
    const rowH = hasHint ? 40 : 30;
    const barH = 14;
    const labelMax = Math.min(width * 0.4, 180);
    const labelW = Math.min(labelMax, Math.max(...items.map((it) => textWidth(it.label, fs))));
    const valueW = Math.max(...items.map((it) => textWidth(format(it.value), fs)));
    const M = { top: 4, right: Math.ceil(valueW) + 10, bottom: 4, left: Math.ceil(labelW) + 10 };
    const plotW = Math.max(40, width - M.left - M.right);
    svgHeight = n * rowH + M.top + M.bottom;

    body = items.map((it, i) => {
      const rowTop = M.top + i * rowH;
      const barY = rowTop + (rowH - barH) / 2;
      const w = ratio(it.value) * plotW;
      const labelLine = wrapText(it.label, labelW, fs, 1)[0] ?? it.label;
      const hintLine = it.hint ? (wrapText(it.hint, labelW, hfs, 1)[0] ?? it.hint) : null;
      const color = colorOf(it.tone);
      return (
        <g key={it.key}>
          <title>{titleOf(it.label, it.value, it.hint)}</title>
          <text x={M.left - 8} y={hintLine ? rowTop + 17 : barY + barH / 2 + fs * 0.35} fontSize={fs} fill={C.label} textAnchor="end">
            {labelLine}
          </text>
          {hintLine && (
            <text x={M.left - 8} y={rowTop + 30} fontSize={hfs} fill={C.hint} textAnchor="end">
              {hintLine}
            </text>
          )}
          <rect x={M.left} y={barY} width={plotW} height={barH} rx={3} fill={C.track} />
          <rect x={M.left} y={barY} width={Math.max(w, it.value > 0 ? 2 : 0)} height={barH} rx={3} fill={color} fillOpacity={1} />
          <text x={M.left + w + 5} y={barY + barH / 2 + fs * 0.35} fontSize={fs} fontWeight={700} fill={C.value}>
            {format(it.value)}
          </text>
        </g>
      );
    });
  } else {
    const tickW = Math.max(...ticks.map((t) => textWidth(format(t), fs)));
    const left = Math.ceil(tickW) + 10;
    const plotW0 = Math.max(40, width - left - 8);
    const slot = plotW0 / n;
    const labelLines = items.map((it) => wrapText(it.label, slot - 4, fs, 2));
    // hint 는 좁은 칸에서 두 줄까지 — 한 줄 말줄임으로 n·손실 같은 핵심 값이 잘리지 않게
    const hintLines = items.map((it) => (it.hint ? wrapText(it.hint, slot - 4, hfs, 2) : []));
    const maxLabelLines = Math.max(...labelLines.map((l) => l.length));
    const maxHintLines = Math.max(0, ...hintLines.map((l) => l.length));
    const M = { top: 18, right: 8, bottom: 8 + maxLabelLines * (fs + 3) + maxHintLines * (hfs + 2), left };
    const plotH = Math.max(30, height - M.top - M.bottom);
    const bottom = M.top + plotH;
    const barW = Math.min(48, slot * 0.6);
    const yAt = (v: number) => bottom - ratio(v) * plotH;

    body = (
      <>
        {ticks.map((t) => (
          <g key={`t-${t}`}>
            <line x1={M.left} x2={M.left + plotW0} y1={yAt(t)} y2={yAt(t)} stroke={C.grid} />
            <text x={M.left - 6} y={yAt(t) + fs * 0.35} fontSize={fs} fill={C.tick} textAnchor="end">
              {format(t)}
            </text>
          </g>
        ))}
        <line x1={M.left} x2={M.left + plotW0} y1={bottom} y2={bottom} stroke={C.axis} />
        {items.map((it, i) => {
          const cx = M.left + slot * (i + 0.5);
          const y = yAt(it.value);
          const lines = labelLines[i] ?? [it.label];
          const hint = hintLines[i] ?? [];
          return (
            <g key={it.key}>
              <title>{titleOf(it.label, it.value, it.hint)}</title>
              <rect
                x={cx - barW / 2}
                y={y}
                width={barW}
                height={Math.max(bottom - y, it.value > 0 ? 2 : 0)}
                rx={3}
                fill={colorOf(it.tone)}
                fillOpacity={1}
              />
              <text x={cx} y={y - 5} fontSize={fs} fontWeight={700} fill={C.value} textAnchor="middle">
                {format(it.value)}
              </text>
              {lines.map((line, li) => (
                <text key={li} x={cx} y={bottom + fs + 4 + li * (fs + 3)} fontSize={fs} fill={C.label} textAnchor="middle">
                  {line}
                </text>
              ))}
              {hint.map((line, hi) => (
                <text
                  key={`h-${hi}`}
                  x={cx}
                  y={bottom + fs + 4 + maxLabelLines * (fs + 3) + hi * (hfs + 2)}
                  fontSize={hfs}
                  fill={C.hint}
                  textAnchor="middle"
                >
                  {line}
                </text>
              ))}
            </g>
          );
        })}
      </>
    );
  }

  return (
    <div ref={ref} className="w-full">
      {unit && <div className="mb-1 text-right text-[11px] text-slate-500">단위: {unit}</div>}
      <svg role="img" aria-label={ariaLabel} width="100%" height={svgHeight} viewBox={`0 0 ${width} ${svgHeight}`} className="block select-none">
        <title>{ariaLabel}</title>
        {body}
      </svg>
    </div>
  );
}
