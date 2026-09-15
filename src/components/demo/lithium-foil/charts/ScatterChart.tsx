"use client";

// 산점도 — 강조 점은 rose 큰 점 + 라벨, 세로 기준선(예: 노점 −45℃)은 점선 + 라벨.
// 폭은 ResizeObserver 로 잰다. 첫 렌더는 고정 폭(640)으로 그려 서버·클라이언트 출력이 같다.

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { ScatterChartProps } from "./types";
import { fmtNum } from "../ui";
import { CHART, CHART_FONT } from "./palette";

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

function niceScale(lo: number, hi: number, count = 4) {
  let a = Math.min(lo, hi);
  let b = Math.max(lo, hi);
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    a = 0;
    b = 1;
  }
  if (a === b) {
    const pad = Math.abs(a) * 0.1 || 1;
    a -= pad;
    b += pad;
  }
  const raw = (b - a) / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10) * mag;
  const min = Math.floor(a / step + 1e-9) * step;
  const max = Math.ceil(b / step - 1e-9) * step;
  const ticks: number[] = [];
  for (let v = min; v <= max + step * 1e-6; v += step) ticks.push(Number(v.toFixed(10)));
  return { min: ticks[0] ?? min, max: ticks[ticks.length - 1] ?? max, step, ticks };
}

function stepDigits(step: number): number {
  let d = 0;
  while (d < 4 && Math.abs(Math.round(step * 10 ** d) - step * 10 ** d) > 1e-6) d += 1;
  return d;
}

function fmtSigned(value: number, digits: number): string {
  return fmtNum(value, digits).replace("-", "−");
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

type Box = { x: number; y: number; w: number; h: number };

function overlaps(a: Box, b: Box): boolean {
  return a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
}

export default function ScatterChart({ points, xLabel, yLabel, height = 240, xThreshold }: ScatterChartProps) {
  const { ref, width } = useChartWidth();
  const [active, setActive] = useState<number | null>(null);
  /** 키보드 탭 정지 — 차트 하나에 하나 (roving tabindex). 방향키는 x 순서로 옮긴다 */
  const [roving, setRoving] = useState<number | null>(null);
  const hitRefs = useRef<Array<SVGCircleElement | null>>([]);

  if (points.length === 0) {
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
  const hasThreshold = typeof xThreshold === "number" && Number.isFinite(xThreshold);

  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const xScale = niceScale(
    Math.min(...xs, hasThreshold ? xThreshold : Number.POSITIVE_INFINITY),
    Math.max(...xs, hasThreshold ? xThreshold : Number.NEGATIVE_INFINITY),
    compact ? 3 : 5,
  );
  const yScale = niceScale(Math.min(...ys), Math.max(...ys), 4);
  const xd = stepDigits(xScale.step);
  const yd = stepDigits(yScale.step);
  const xTip = Math.min(3, xd + 1);
  const yTip = Math.min(3, yd + 1);

  const tickW = Math.max(...yScale.ticks.map((t) => textWidth(fmtSigned(t, yd), fs)));
  const M = { top: 24, right: 14, bottom: 42, left: Math.ceil(tickW) + 10 };
  const plotW = Math.max(40, width - M.left - M.right);
  const plotH = Math.max(40, height - M.top - M.bottom);
  const plotRight = M.left + plotW;
  const bottom = M.top + plotH;
  const xAt = (v: number) => M.left + ((v - xScale.min) / (xScale.max - xScale.min)) * plotW;
  const yAt = (v: number) => bottom - ((v - yScale.min) / (yScale.max - yScale.min)) * plotH;

  // 강조 점 라벨 — 오른쪽 우선, 끝에 걸리면 왼쪽, 양쪽 다 넘치면 점 위(아래) 가운데로 두고 svg 안쪽으로 붙인다.
  // 좁은 화면에서는 라벨의 첫 조각(「 · 」 앞, 보통 ID)만 쓰고 나머지는 툴팁으로 본다.
  const placedBoxes: Box[] = [];
  const labels = points.flatMap((p) => {
    if (!p.highlight) return [];
    const px = xAt(p.x);
    const py = yAt(p.y);
    const text = compact ? (p.label.split(" · ")[0] ?? p.label) : p.label;
    const w = textWidth(text, fs);
    const fitsRight = px + 9 + w <= width - 2;
    const fitsLeft = px - 9 - w >= 2;
    let box: Box;
    if (fitsRight) box = { x: px + 9, y: py - fs - 4, w, h: fs + 2 };
    else if (fitsLeft) box = { x: px - 9 - w, y: py - fs - 4, w, h: fs + 2 };
    else box = { x: Math.max(2, Math.min(width - 2 - w, px - w / 2)), y: py - fs - 12, w, h: fs + 2 };
    for (let tries = 0; tries < 4 && placedBoxes.some((b) => overlaps(b, box)); tries += 1) {
      box = { ...box, y: box.y + fs + 3 };
    }
    if (box.y < 2) box = { ...box, y: py + 10 };
    placedBoxes.push(box);
    return [{ key: p.key, text, x: box.x, y: box.y + fs, anchor: "start" } as const];
  });

  const thresholdText = hasThreshold ? `기준 ${fmtSigned(xThreshold, xd)}` : "";
  const thresholdX = hasThreshold ? xAt(xThreshold) : 0;
  const thresholdRight = thresholdX + 5 + textWidth(thresholdText, fs) <= plotRight;

  const highlightCount = points.filter((p) => p.highlight).length;
  const ariaLabel = `산점도 — 가로 ${xLabel}, 세로 ${yLabel}, 점 ${points.length}개${highlightCount > 0 ? `, 강조 ${highlightCount}개` : ""}${hasThreshold ? `, ${thresholdText}` : ""}. 점 사이는 방향키로 이동`;

  // 키보드 이동 순서 — 가로축(x) 값 순
  const navOrder = points.map((_, i) => i).sort((a, b) => (points[a]?.x ?? 0) - (points[b]?.x ?? 0));
  const firstHighlight = navOrder.find((i) => points[i]?.highlight);
  const tabStop = roving !== null && roving < points.length ? roving : (firstHighlight ?? navOrder[0] ?? 0);
  const moveBy = (from: number, delta: number | "home" | "end") => {
    const pos = navOrder.indexOf(from);
    const nextPos =
      delta === "home" ? 0 : delta === "end" ? navOrder.length - 1 : Math.max(0, Math.min(navOrder.length - 1, pos + delta));
    const next = navOrder[nextPos];
    if (next === undefined) return;
    setRoving(next);
    setActive(next);
    hitRefs.current[next]?.focus();
  };
  const onPointKey = (e: KeyboardEvent<SVGCircleElement>, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") moveBy(i, 1);
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") moveBy(i, -1);
    else if (e.key === "Home") moveBy(i, "home");
    else if (e.key === "End") moveBy(i, "end");
    else if (e.key === "Escape") setActive(null);
    else return;
    e.preventDefault();
  };

  const activePoint = active !== null ? points[active] : undefined;
  const ax = activePoint ? xAt(activePoint.x) : 0;
  const ay = activePoint ? yAt(activePoint.y) : 0;
  const frac = ax / width;
  const tx = frac < 0.3 ? "-12px" : frac > 0.7 ? "calc(-100% + 12px)" : "-50%";
  const ty = ay < 90 ? "14px" : "calc(-100% - 14px)";

  // 겹친 점이 많아도 강조 점이 위에 오도록 순서를 바꿔 그린다
  const order = points.map((_, i) => i).sort((a, b) => Number(points[a]?.highlight ?? false) - Number(points[b]?.highlight ?? false));

  return (
    <div ref={ref} className="w-full">
      <div className="relative">
        <svg role="group" aria-label={ariaLabel} width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="block select-none">

          <text x={M.left - 6} y={12} fontSize={fs} fill={CHART.label} fontWeight={600}>
            {yLabel}
          </text>

          {yScale.ticks.map((t) => (
            <g key={`y-${t}`}>
              <line x1={M.left} x2={plotRight} y1={yAt(t)} y2={yAt(t)} stroke={CHART.grid} />
              <text x={M.left - 6} y={yAt(t) + fs * 0.35} fontSize={fs} fill={CHART.tick} textAnchor="end">
                {fmtSigned(t, yd)}
              </text>
            </g>
          ))}
          {xScale.ticks.map((t) => (
            <g key={`x-${t}`}>
              <line x1={xAt(t)} x2={xAt(t)} y1={M.top} y2={bottom} stroke={CHART.grid} />
              <text x={xAt(t)} y={bottom + fs + 5} fontSize={fs} fill={CHART.tick} textAnchor="middle">
                {fmtSigned(t, xd)}
              </text>
            </g>
          ))}
          <line x1={M.left} x2={plotRight} y1={bottom} y2={bottom} stroke={CHART.axis} />
          <line x1={M.left} x2={M.left} y1={M.top} y2={bottom} stroke={CHART.axis} />
          <text x={M.left + plotW / 2} y={height - 6} fontSize={fs} fill={CHART.label} fontWeight={600} textAnchor="middle">
            {xLabel}
          </text>

          {hasThreshold && (
            <g>
              <line
                x1={thresholdX}
                x2={thresholdX}
                y1={M.top}
                y2={bottom}
                stroke={CHART.limit}
                strokeWidth={2}
                strokeDasharray="5 4"
              />
              <text
                x={thresholdRight ? thresholdX + 5 : thresholdX - 5}
                y={M.top - 6}
                fontSize={fs}
                fill={CHART.label}
                fontWeight={600}
                textAnchor={thresholdRight ? "start" : "end"}
              >
                {thresholdText}
              </text>
            </g>
          )}

          {order.map((i) => {
            const p = points[i];
            if (!p) return null;
            const cx = xAt(p.x);
            const cy = yAt(p.y);
            return (
              <g key={`p-${p.key}`} pointerEvents="none">
                {/* 겹친 점 사이는 2px surface 링으로 뗀다 — 링 안쪽 채움 지름 8px 이상 */}
                {p.highlight ? (
                  <circle cx={cx} cy={cy} r={compact ? 6.5 : 7} fill={CHART.spec} stroke={CHART.surface} strokeWidth={2} />
                ) : (
                  <circle cx={cx} cy={cy} r={5} fill={CHART.primary} fillOpacity={0.8} stroke={CHART.surface} strokeWidth={2} />
                )}
                {active === i && <circle cx={cx} cy={cy} r={10} fill="none" stroke={CHART.ink} strokeOpacity={0.7} strokeWidth={1.5} />}
              </g>
            );
          })}

          {labels.map((l) => (
            <text
              key={`l-${l.key}`}
              x={l.x}
              y={l.y}
              fontSize={fs}
              fontWeight={600}
              fill={CHART.ink}
              textAnchor={l.anchor}
              stroke={CHART.surface}
              strokeWidth={3}
              paintOrder="stroke"
              pointerEvents="none"
            >
              {l.text}
            </text>
          ))}

          {order.map((i) => {
            const p = points[i];
            if (!p) return null;
            return (
              <circle
                ref={(el) => {
                  hitRefs.current[i] = el;
                }}
                key={`h-${p.key}`}
                cx={xAt(p.x)}
                cy={yAt(p.y)}
                r={compact ? 12 : 10}
                fill="transparent"
                stroke="transparent"
                strokeWidth={2}
                tabIndex={i === tabStop ? 0 : -1}
                role="img"
                aria-label={`${p.label} — ${xLabel} ${fmtSigned(p.x, xTip)}, ${yLabel} ${fmtSigned(p.y, yTip)}${p.highlight ? " (강조)" : ""}`}
                className="outline-none focus-visible:stroke-indigo-500"
                onPointerEnter={() => setActive(i)}
                onPointerLeave={(e) => {
                  if (e.pointerType === "mouse") setActive((cur) => (cur === i ? null : cur));
                }}
                onFocus={() => {
                  setRoving(i);
                  setActive(i);
                }}
                onBlur={() => setActive((cur) => (cur === i ? null : cur))}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onPointKey(e, i)}
              />
            );
          })}
        </svg>

        {activePoint && (
          <div
            className="pointer-events-none absolute z-10 w-max max-w-[220px] rounded-lg border px-2.5 py-2 [word-break:keep-all]"
            style={{
              left: `${(frac * 100).toFixed(2)}%`,
              top: ay,
              transform: `translate(${tx}, ${ty})`,
              backgroundColor: CHART.tooltipBg,
              borderColor: CHART.tooltipBorder,
              boxShadow: CHART.tooltipShadow,
            }}
          >
            {/* 제목은 강조 여부와 무관하게 ink — 강조는 차트의 rose 점이 맡는다 */}
            <div className="text-[11px] font-semibold text-slate-900">{activePoint.label}</div>
            <div className="text-[11px] text-slate-600">
              {xLabel} <span className="font-bold text-slate-900">{fmtSigned(activePoint.x, xTip)}</span>
            </div>
            <div className="text-[11px] text-slate-600">
              {yLabel} <span className="font-bold text-slate-900">{fmtSigned(activePoint.y, yTip)}</span>
            </div>
          </div>
        )}
      </div>

      {(highlightCount > 0 || hasThreshold) && (
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-slate-600 [word-break:keep-all]">
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2 w-2 rounded-full bg-indigo-600/80" aria-hidden />
            측정 {points.length - highlightCount}개
          </li>
          {highlightCount > 0 && (
            <li className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-600" aria-hidden />
              강조 {highlightCount}개
            </li>
          )}
          {hasThreshold && (
            <li className="flex items-center gap-1.5">
              <span className="inline-block h-3 border-l-2 border-dashed border-amber-600" aria-hidden />
              {thresholdText}
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
