"use client";

// 런 차트 — 시간순 선+점. 값이 없는(null) 구간은 선을 끊는다. 목표선은 점선.
// 폭은 ResizeObserver 로 잰다. 첫 렌더는 고정 폭(640)으로 그려 서버·클라이언트 출력이 같다.

import { useEffect, useRef, useState } from "react";
import type { ChartTone, RunChartProps } from "./types";
import { fmtNum } from "../ui";

const TONE_HEX: Record<ChartTone, string> = {
  indigo: "#818cf8",
  purple: "#c084fc",
  emerald: "#34d399",
  amber: "#fbbf24",
  rose: "#fb7185",
  cyan: "#22d3ee",
};

const C = {
  grid: "rgba(255,255,255,0.07)",
  axis: "rgba(255,255,255,0.18)",
  target: "#d1d5db",
  tick: "#9ca3af",
  missing: "#6b7280",
  hover: "rgba(255,255,255,0.05)",
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
  return { min, max, step, ticks };
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

export default function RunChart({
  points,
  unit,
  target,
  min,
  max,
  format = (value: number) => fmtNum(value, 1),
  height = 200,
  tone = "indigo",
}: RunChartProps) {
  const { ref, width } = useChartWidth();
  const [active, setActive] = useState<number | null>(null);
  const values = points.flatMap((p) => (p.value === null ? [] : [p.value]));

  if (points.length === 0 || values.length === 0) {
    return (
      <div ref={ref} className="w-full">
        <div
          className="flex items-center justify-center rounded-xl border border-dashed border-white/10 text-sm text-gray-500"
          style={{ height }}
        >
          데이터가 없습니다
        </div>
      </div>
    );
  }

  const color = TONE_HEX[tone];
  const compact = width < 480;
  const fs = compact ? 10 : 11;
  const n = points.length;
  const hasTarget = typeof target === "number" && Number.isFinite(target);

  const nice = niceScale(
    Math.min(...values, hasTarget ? target : Number.POSITIVE_INFINITY),
    Math.max(...values, hasTarget ? target : Number.NEGATIVE_INFINITY),
    4,
  );
  const yMin = typeof min === "number" ? min : nice.min;
  const yMax = typeof max === "number" && max > yMin ? max : Math.max(nice.max, yMin + nice.step);
  const ticks = (typeof min === "number" || typeof max === "number" ? niceScale(yMin, yMax, 4).ticks : nice.ticks).filter(
    (t) => t >= yMin - 1e-9 && t <= yMax + 1e-9,
  );

  const targetText = hasTarget ? `목표 ${format(target)}` : "";
  const tickW = Math.max(...ticks.map((t) => textWidth(format(t), fs)));
  const M = {
    top: 12,
    right: hasTarget ? Math.ceil(textWidth(targetText, fs)) + 10 : 12,
    bottom: 24,
    left: Math.ceil(tickW) + 10,
  };
  const plotW = Math.max(40, width - M.left - M.right);
  const plotH = Math.max(30, height - M.top - M.bottom);
  const plotRight = M.left + plotW;
  const bottom = M.top + plotH;
  const inset = Math.min(12, plotW / 8);
  const innerW = plotW - inset * 2;
  const step = n > 1 ? innerW / (n - 1) : innerW;
  const xAt = (i: number) => M.left + inset + (n === 1 ? innerW / 2 : i * step);
  const yAt = (v: number) => {
    const clamped = Math.max(yMin, Math.min(yMax, v));
    return bottom - ((clamped - yMin) / (yMax - yMin)) * plotH;
  };

  // 선 — null 에서 끊는다
  let path = "";
  let pen = false;
  points.forEach((p, i) => {
    if (p.value === null) {
      pen = false;
      return;
    }
    path += `${pen ? "L" : "M"}${xAt(i).toFixed(1)},${yAt(p.value).toFixed(1)} `;
    pen = true;
  });

  const maxLabels = Math.max(2, Math.floor(plotW / (compact ? 48 : 60)));
  const stride = Math.max(1, Math.ceil(n / maxLabels));
  const bandW = n > 1 ? step : innerW;
  const missingCount = n - values.length;

  const ariaLabel = `시간순 추이${unit ? `(단위 ${unit})` : ""} — ${points
    .map((p) => `${p.label} ${p.value === null ? "값 없음" : format(p.value)}`)
    .join(", ")}${hasTarget ? `, ${targetText}` : ""}`;

  const activePoint = active !== null ? points[active] : undefined;
  const ax = active !== null ? xAt(active) : 0;
  const ay = activePoint ? (activePoint.value === null ? bottom : yAt(activePoint.value)) : 0;
  const frac = ax / width;
  const tx = frac < 0.3 ? "-12px" : frac > 0.7 ? "calc(-100% + 12px)" : "-50%";
  const ty = ay < 80 ? "14px" : "calc(-100% - 14px)";

  return (
    <div ref={ref} className="w-full">
      {unit && <div className="mb-1 text-right text-[11px] text-gray-500">단위: {unit}</div>}
      <div className="relative">
        <svg role="img" aria-label={ariaLabel} width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="block select-none">
          <title>{ariaLabel}</title>

          {ticks.map((t) => (
            <g key={`t-${t}`}>
              <line x1={M.left} x2={plotRight} y1={yAt(t)} y2={yAt(t)} stroke={C.grid} />
              <text x={M.left - 6} y={yAt(t) + fs * 0.35} fontSize={fs} fill={C.tick} textAnchor="end">
                {format(t)}
              </text>
            </g>
          ))}
          <line x1={M.left} x2={plotRight} y1={bottom} y2={bottom} stroke={C.axis} />

          {active !== null && (
            <rect x={xAt(active) - bandW / 2} y={M.top} width={bandW} height={plotH} fill={C.hover} pointerEvents="none" />
          )}

          {hasTarget && (
            <g>
              <line
                x1={M.left}
                x2={plotRight}
                y1={yAt(target)}
                y2={yAt(target)}
                stroke={C.target}
                strokeOpacity={0.7}
                strokeWidth={1.2}
                strokeDasharray="5 4"
              />
              <text x={plotRight + 6} y={yAt(target) + fs * 0.35} fontSize={fs} fill={C.target} fontWeight={600}>
                {targetText}
              </text>
            </g>
          )}

          {points.map((p, i) =>
            i % stride === 0 ? (
              <text key={`x-${p.key}`} x={xAt(i)} y={bottom + fs + 6} fontSize={fs} fill={C.tick} textAnchor="middle">
                {p.label}
              </text>
            ) : null,
          )}

          <path d={path.trim()} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

          {points.map((p, i) =>
            p.value === null ? (
              <g key={`m-${p.key}`} pointerEvents="none">
                <line x1={xAt(i) - 3} x2={xAt(i) + 3} y1={bottom - 7} y2={bottom - 1} stroke={C.missing} strokeWidth={1.5} />
                <line x1={xAt(i) - 3} x2={xAt(i) + 3} y1={bottom - 1} y2={bottom - 7} stroke={C.missing} strokeWidth={1.5} />
              </g>
            ) : (
              <circle
                key={`p-${p.key}`}
                cx={xAt(i)}
                cy={yAt(p.value)}
                r={active === i ? 5 : compact ? 3 : 3.5}
                fill={color}
                stroke="#030712"
                strokeWidth={1.5}
                pointerEvents="none"
              />
            ),
          )}

          {/* 세로 띠 전체가 hover·터치 대상 */}
          {points.map((p, i) => (
            <rect
              key={`h-${p.key}`}
              x={xAt(i) - bandW / 2}
              y={M.top}
              width={bandW}
              height={plotH}
              fill="transparent"
              stroke="transparent"
              strokeWidth={1.5}
              tabIndex={0}
              role="img"
              aria-label={`${p.label} ${p.value === null ? "값 없음" : format(p.value)}${p.hint ? ` (${p.hint})` : ""}`}
              className="outline-none focus-visible:stroke-white"
              onPointerEnter={() => setActive(i)}
              onPointerLeave={(e) => {
                if (e.pointerType === "mouse") setActive((cur) => (cur === i ? null : cur));
              }}
              onFocus={() => setActive(i)}
              onBlur={() => setActive((cur) => (cur === i ? null : cur))}
              onClick={() => setActive(i)}
            />
          ))}
        </svg>

        {activePoint && (
          <div
            className="pointer-events-none absolute z-10 w-max max-w-[220px] rounded-lg border border-white/10 bg-gray-950/95 px-2.5 py-2 shadow-xl [word-break:keep-all]"
            style={{ left: `${(frac * 100).toFixed(2)}%`, top: ay, transform: `translate(${tx}, ${ty})` }}
          >
            <div className="text-[11px] text-gray-400">{activePoint.label}</div>
            <div className="text-sm font-bold text-white">
              {activePoint.value === null ? "값 없음" : format(activePoint.value)}
              {unit && activePoint.value !== null && <span className="ml-1 text-xs font-medium text-gray-400">{unit}</span>}
            </div>
            {activePoint.hint && <div className="text-[11px] text-gray-300">{activePoint.hint}</div>}
          </div>
        )}
      </div>

      {(hasTarget || missingCount > 0) && (
        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-gray-400 [word-break:keep-all]">
          {hasTarget && (
            <li className="flex items-center gap-1.5">
              <span className="inline-block w-4 border-t border-dashed border-gray-300" aria-hidden />
              {targetText}
            </li>
          )}
          {missingCount > 0 && (
            <li className="flex items-center gap-1.5">
              <span className="text-gray-500" aria-hidden>
                ×
              </span>
              값 없음 {missingCount}개 — 선을 끊어 표시
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
