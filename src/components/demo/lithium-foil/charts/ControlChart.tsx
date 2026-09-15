"use client";

// 개별값(I) 관리도 — 점+선, 평균(실선)·관리한계(점선 amber)·규격 상한(점선 rose), 기준 구간 띠.
// 폭은 ResizeObserver 로 잰다. 첫 렌더는 고정 폭(640)으로 그려 서버·클라이언트 출력이 같다.

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { ControlChartProps } from "./types";
import { fmtNum, fmtShortDate } from "../ui";

const C = {
  point: "#818cf8",
  line: "#818cf8",
  mean: "#9ca3af",
  limit: "#fbbf24",
  spec: "#fb7185",
  highlight: "#22d3ee",
  grid: "rgba(255,255,255,0.07)",
  axis: "rgba(255,255,255,0.18)",
  band: "rgba(129,140,248,0.07)",
  tick: "#9ca3af",
  dim: "#6b7280",
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

export default function ControlChart({
  chart,
  unit,
  specLimit,
  specLabel = "규격",
  height = 240,
  onPointClick,
  highlightIds,
}: ControlChartProps) {
  const { ref, width } = useChartWidth();
  const [active, setActive] = useState<number | null>(null);
  const pts = chart.points;

  if (pts.length === 0) {
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

  const compact = width < 480;
  const fs = compact ? 10 : 11;
  const n = pts.length;
  const values = pts.map((p) => p.value);
  const maxAbs = Math.max(...values.map(Math.abs), Math.abs(chart.ucl));
  const vd = maxAbs < 1 ? 3 : maxAbs < 10 ? 2 : 1;

  const lo = Math.min(...values, chart.lcl, chart.mean);
  const hi = Math.max(...values, chart.ucl, specLimit ?? Number.NEGATIVE_INFINITY);
  const scale = niceScale(lo, hi, 4);
  const td = stepDigits(scale.step);

  const hasSpec = typeof specLimit === "number" && Number.isFinite(specLimit);
  const showLcl = chart.lcl > scale.min;
  const rightItems: Array<{ key: string; value: number; text: string; color: string }> = [
    { key: "ucl", value: chart.ucl, text: `UCL ${fmtSigned(chart.ucl, vd)}`, color: C.limit },
    { key: "mean", value: chart.mean, text: `평균 ${fmtSigned(chart.mean, vd)}`, color: C.mean },
  ];
  if (showLcl) rightItems.push({ key: "lcl", value: chart.lcl, text: `LCL ${fmtSigned(chart.lcl, vd)}`, color: C.limit });
  if (hasSpec) rightItems.push({ key: "spec", value: specLimit, text: `${specLabel} ${fmtSigned(specLimit, vd)}`, color: C.spec });

  const tickLabelW = Math.max(...scale.ticks.map((t) => textWidth(fmtSigned(t, td), fs)));
  const rightLabelW = Math.max(...rightItems.map((r) => textWidth(r.text, fs)));
  const M = {
    top: 22,
    right: Math.min(120, Math.max(44, Math.ceil(rightLabelW) + 10)),
    bottom: 24,
    left: Math.max(28, Math.ceil(tickLabelW) + 10),
  };
  const plotW = Math.max(40, width - M.left - M.right);
  const plotH = Math.max(40, height - M.top - M.bottom);
  const inset = Math.min(10, plotW / 8);
  const innerW = plotW - inset * 2;
  const step = n > 1 ? innerW / (n - 1) : innerW;
  const xAt = (i: number) => M.left + inset + (n === 1 ? innerW / 2 : i * step);
  const yAt = (v: number) => M.top + plotH - ((v - scale.min) / (scale.max - scale.min)) * plotH;
  const plotRight = M.left + plotW;
  const plotBottom = M.top + plotH;

  // 오른쪽 끝 라벨 — 가까우면 아래로 민다
  const placed = rightItems
    .map((r) => ({ ...r, y: yAt(r.value) }))
    .sort((a, b) => a.y - b.y);
  for (let i = 1; i < placed.length; i += 1) {
    const prev = placed[i - 1];
    const cur = placed[i];
    if (prev && cur && cur.y - prev.y < fs + 1) cur.y = prev.y + fs + 1;
  }

  // 기준 구간 띠
  const baseN = Math.min(chart.baselineN, n);
  const showBand = baseN > 0 && baseN < n;
  const bandX0 = M.left;
  const bandX1 = Math.min(plotRight, xAt(baseN - 1) + (n > 1 ? step / 2 : innerW / 2));

  // x 축 날짜 라벨 — 몇 개만
  const maxLabels = Math.max(2, Math.floor(plotW / (compact ? 56 : 68)));
  const stride = Math.max(1, Math.ceil(n / maxLabels));

  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${xAt(i).toFixed(1)},${yAt(p.value).toFixed(1)}`).join(" ");
  const highlight = new Set(highlightIds ?? []);
  const hitR = Math.min(18, Math.max(8, step * 0.6));
  const clickable = typeof onPointClick === "function";

  const oocCount = pts.filter((p) => p.outOfControl).length;
  const overCount = pts.filter((p) => p.overSpec).length;
  const ariaLabel = `개별값 관리도 — 표본 ${n}개, 평균 ${fmtSigned(chart.mean, vd)}${unit}, 관리상한 ${fmtSigned(chart.ucl, vd)}${unit}, 관리한계 이탈 ${oocCount}개${hasSpec ? `, ${specLabel} ${fmtSigned(specLimit, vd)}${unit} 초과 ${overCount}개` : ""}`;

  const activePoint = active !== null ? pts[active] : undefined;
  const ax = active !== null ? xAt(active) : 0;
  const ay = activePoint ? yAt(activePoint.value) : 0;
  const frac = ax / width;
  const tx = frac < 0.3 ? "-12px" : frac > 0.7 ? "calc(-100% + 12px)" : "-50%";
  const ty = ay < 90 ? "14px" : "calc(-100% - 14px)";

  function handleKey(e: KeyboardEvent<SVGCircleElement>, id: string) {
    if (!clickable) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onPointClick?.(id);
    }
  }

  return (
    <div ref={ref} className="w-full">
      <div className="relative">
        <svg
          role="img"
          aria-label={ariaLabel}
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="block select-none"
        >
          <title>{ariaLabel}</title>

          {showBand && (
            <g>
              <rect x={bandX0} y={M.top} width={Math.max(0, bandX1 - bandX0)} height={plotH} fill={C.band} />
              <text x={bandX0 + 4} y={M.top - 7} fontSize={fs} fill={C.dim}>
                기준 구간 ({baseN}개)
              </text>
            </g>
          )}

          {scale.ticks.map((t) => (
            <g key={`y-${t}`}>
              <line x1={M.left} x2={plotRight} y1={yAt(t)} y2={yAt(t)} stroke={C.grid} />
              <text x={M.left - 6} y={yAt(t) + fs * 0.35} fontSize={fs} fill={C.tick} textAnchor="end">
                {fmtSigned(t, td)}
              </text>
            </g>
          ))}
          <line x1={M.left} x2={plotRight} y1={plotBottom} y2={plotBottom} stroke={C.axis} />

          {pts.map((p, i) =>
            i % stride === 0 ? (
              <text key={`x-${p.id}`} x={xAt(i)} y={plotBottom + fs + 5} fontSize={fs} fill={C.tick} textAnchor="middle">
                {fmtShortDate(p.date)}
              </text>
            ) : null,
          )}

          {/* 중심선·관리한계·규격 */}
          <line x1={M.left} x2={plotRight} y1={yAt(chart.mean)} y2={yAt(chart.mean)} stroke={C.mean} strokeWidth={1.2} />
          <line
            x1={M.left}
            x2={plotRight}
            y1={yAt(chart.ucl)}
            y2={yAt(chart.ucl)}
            stroke={C.limit}
            strokeWidth={1.2}
            strokeDasharray="5 4"
          />
          {showLcl && (
            <line
              x1={M.left}
              x2={plotRight}
              y1={yAt(chart.lcl)}
              y2={yAt(chart.lcl)}
              stroke={C.limit}
              strokeWidth={1.2}
              strokeDasharray="5 4"
            />
          )}
          {hasSpec && (
            <line
              x1={M.left}
              x2={plotRight}
              y1={yAt(specLimit)}
              y2={yAt(specLimit)}
              stroke={C.spec}
              strokeWidth={1.5}
              strokeDasharray="2 3"
            />
          )}
          {placed.map((r) => (
            <text key={r.key} x={plotRight + 6} y={r.y + fs * 0.35} fontSize={fs} fill={r.color} fontWeight={600}>
              {r.text}
            </text>
          ))}

          <path d={linePath} fill="none" stroke={C.line} strokeOpacity={0.55} strokeWidth={1.5} strokeLinejoin="round" />

          {pts.map((p, i) => {
            const x = xAt(i);
            const y = yAt(p.value);
            const isActive = active === i;
            return (
              <g key={`p-${p.id}`} pointerEvents="none">
                {highlight.has(p.id) && <circle cx={x} cy={y} r={9} fill="none" stroke={C.highlight} strokeWidth={2} />}
                {p.overSpec ? (
                  <circle cx={x} cy={y} r={compact ? 5 : 5.5} fill={C.spec} stroke="#030712" strokeWidth={1.5} />
                ) : p.outOfControl ? (
                  <circle cx={x} cy={y} r={compact ? 4.5 : 5} fill={C.limit} stroke="#030712" strokeWidth={1.5} />
                ) : (
                  <circle cx={x} cy={y} r={compact ? 2.5 : 3} fill={C.point} />
                )}
                {isActive && <circle cx={x} cy={y} r={7} fill="none" stroke="#ffffff" strokeOpacity={0.8} strokeWidth={1.5} />}
              </g>
            );
          })}

          {/* 터치·키보드 대상 — 보이지 않는 큰 원 */}
          {pts.map((p, i) => {
            const status = p.overSpec ? ", 규격 초과" : p.outOfControl ? ", 관리한계 이탈" : "";
            const label = `${p.id} ${fmtShortDate(p.date)} ${fmtSigned(p.value, vd)}${unit} ${p.label}${status}`;
            return (
              <circle
                key={`h-${p.id}`}
                cx={xAt(i)}
                cy={yAt(p.value)}
                r={hitR}
                fill="transparent"
                stroke="transparent"
                strokeWidth={2}
                tabIndex={0}
                role={clickable ? "button" : "img"}
                aria-label={clickable ? `${label} — 눌러서 자세히 보기` : label}
                className={`outline-none focus-visible:stroke-white ${clickable ? "cursor-pointer" : ""}`}
                onPointerEnter={() => setActive(i)}
                onPointerLeave={(e) => {
                  if (e.pointerType === "mouse") setActive((cur) => (cur === i ? null : cur));
                }}
                onFocus={() => setActive(i)}
                onBlur={() => setActive((cur) => (cur === i ? null : cur))}
                onClick={() => {
                  setActive(i);
                  onPointClick?.(p.id);
                }}
                onKeyDown={(e) => handleKey(e, p.id)}
              />
            );
          })}
        </svg>

        {activePoint && (
          <div
            className="pointer-events-none absolute z-10 w-max max-w-[220px] rounded-lg border border-white/10 bg-gray-950/95 px-2.5 py-2 shadow-xl [word-break:keep-all]"
            style={{ left: `${(frac * 100).toFixed(2)}%`, top: ay, transform: `translate(${tx}, ${ty})` }}
          >
            <div className="font-mono text-[11px] text-white">{activePoint.id}</div>
            <div className="text-[11px] text-gray-400">
              {fmtShortDate(activePoint.date)} · {activePoint.label}
            </div>
            <div className="mt-0.5 text-sm font-bold text-white">
              {fmtSigned(activePoint.value, vd)} <span className="text-xs font-medium text-gray-400">{unit}</span>
            </div>
            {activePoint.overSpec && <div className="text-[11px] font-semibold text-rose-300">{specLabel} 초과</div>}
            {activePoint.outOfControl && !activePoint.overSpec && (
              <div className="text-[11px] font-semibold text-amber-300">관리한계 이탈</div>
            )}
            {highlight.has(activePoint.id) && <div className="text-[11px] font-semibold text-cyan-300">강조한 항목</div>}
            {clickable && <div className="mt-0.5 text-[11px] text-indigo-300">눌러서 자세히 보기</div>}
          </div>
        )}
      </div>

      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-gray-400 [word-break:keep-all]">
        <li className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-indigo-400" aria-hidden />
          측정값
        </li>
        <li className="flex items-center gap-1.5">
          <span className="inline-block w-4 border-t border-gray-400" aria-hidden />
          평균
        </li>
        <li className="flex items-center gap-1.5">
          <span className="inline-block w-4 border-t border-dashed border-amber-400" aria-hidden />
          관리한계(UCL·LCL)
        </li>
        {oocCount > 0 && (
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden />
            관리한계 이탈
          </li>
        )}
        {hasSpec && (
          <li className="flex items-center gap-1.5">
            <span className="inline-block w-4 border-t border-dotted border-rose-400" aria-hidden />
            {specLabel}
          </li>
        )}
        {overCount > 0 && (
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-400" aria-hidden />
            {specLabel} 초과
          </li>
        )}
        {highlight.size > 0 && pts.some((p) => highlight.has(p.id)) && (
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full border-2 border-cyan-400" aria-hidden />
            강조
          </li>
        )}
        {showBand && (
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-4 rounded-sm bg-indigo-400/15" aria-hidden />
            기준 구간 — 관리한계를 계산한 정상 운전 구간
          </li>
        )}
      </ul>
    </div>
  );
}
