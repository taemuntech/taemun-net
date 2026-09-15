"use client";

// 개별값(I) 관리도 — 점+선, 평균(실선)·관리한계(점선 amber)·규격 상한(점선 rose), 기준 구간 띠.
// 폭은 ResizeObserver 로 잰다. 첫 렌더는 고정 폭(640)으로 그려 서버·클라이언트 출력이 같다.
// 접근성: svg 는 group, 점은 탭 정지 1개(roving tabindex, ←/→·Home/End 이동).
// 포인터: 투명 사각형 하나에서 x 좌표로 가장 가까운 점을 고른다. 마우스는 클릭 = 이동,
// 터치·펜은 첫 탭 = 값 확인(툴팁의 「계보 보기」 버튼), 같은 점을 한 번 더 탭 = 이동.

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type PointerEvent } from "react";
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
  dim: "#9ca3af",
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
  const svgRef = useRef<SVGSVGElement>(null);
  const pointRefs = useRef<Array<SVGCircleElement | null>>([]);
  const lastPointerType = useRef<string>("mouse");
  const [active, setActive] = useState<number | null>(null);
  /** 키보드 탭 정지가 놓인 점 — null 이면 기본 위치 */
  const [roving, setRoving] = useState<number | null>(null);
  /** 터치로 고른 점 — 툴팁에 이동 버튼을 띄운다 */
  const [touchPicked, setTouchPicked] = useState(false);
  const pts = chart.points;

  if (pts.length === 0) {
    return (
      <div ref={ref} className="w-full">
        <div
          className="flex items-center justify-center rounded-xl border border-dashed border-white/10 text-sm text-gray-400"
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
  const limitsValid = chart.limitsValid;
  const values = pts.map((p) => p.value);
  const maxAbs = Math.max(...values.map(Math.abs), limitsValid ? Math.abs(chart.ucl) : 0);
  const vd = maxAbs < 1 ? 3 : maxAbs < 10 ? 2 : 1;

  const lo = Math.min(...values, limitsValid ? chart.lcl : Number.POSITIVE_INFINITY, chart.mean);
  const hi = Math.max(...values, limitsValid ? chart.ucl : Number.NEGATIVE_INFINITY, specLimit ?? Number.NEGATIVE_INFINITY);
  const scale = niceScale(lo, hi, 4);
  const td = stepDigits(scale.step);

  const hasSpec = typeof specLimit === "number" && Number.isFinite(specLimit);
  const showLcl = limitsValid && chart.lcl > scale.min;
  // specLabel 에 이미 숫자가 들어 있으면(예: "규격 50ppm") 값을 다시 붙이지 않는다
  const specText = hasSpec ? (/\d/.test(specLabel) ? specLabel : `${specLabel} ${fmtSigned(specLimit, vd)}`) : "";
  const rightItems: Array<{ key: string; value: number; text: string; color: string }> = [
    { key: "mean", value: chart.mean, text: `평균 ${fmtSigned(chart.mean, vd)}`, color: C.mean },
  ];
  if (limitsValid) rightItems.push({ key: "ucl", value: chart.ucl, text: `관리상한 ${fmtSigned(chart.ucl, vd)}`, color: C.limit });
  if (showLcl) rightItems.push({ key: "lcl", value: chart.lcl, text: `관리하한 ${fmtSigned(chart.lcl, vd)}`, color: C.limit });
  if (hasSpec) rightItems.push({ key: "spec", value: specLimit, text: specText, color: C.spec });

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
  const showBand = limitsValid && baseN > 0 && baseN < n;
  const bandX0 = M.left;
  const bandX1 = Math.min(plotRight, xAt(baseN - 1) + (n > 1 ? step / 2 : innerW / 2));

  // x 축 날짜 라벨 — 몇 개만
  const maxLabels = Math.max(2, Math.floor(plotW / (compact ? 56 : 68)));
  const stride = Math.max(1, Math.ceil(n / maxLabels));

  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${xAt(i).toFixed(1)},${yAt(p.value).toFixed(1)}`).join(" ");
  const highlight = new Set(highlightIds ?? []);
  const clickable = typeof onPointClick === "function";

  const oocCount = pts.filter((p) => p.outOfControl).length;
  const overCount = pts.filter((p) => p.overSpec).length;
  const specName = hasSpec ? specText.replace(/\s[−\d.,]+$/, "") : specLabel;
  const ariaLabel = `개별값 관리도 — 표본 ${n}개, 평균 ${fmtSigned(chart.mean, vd)}${unit}${
    limitsValid ? `, 관리상한 ${fmtSigned(chart.ucl, vd)}${unit}, 관리한계 이탈 ${oocCount}개` : ", 기준 구간 표본 부족으로 관리한계 없음"
  }${hasSpec ? `, ${specName} ${fmtSigned(specLimit, vd)}${unit} 초과 ${overCount}개` : ""}. 점 사이는 왼쪽·오른쪽 방향키로 이동`;

  // 키보드 탭 정지 기본 위치 — 규격 초과 → 관리한계 이탈 → 첫 점
  const defaultRoving = Math.max(
    0,
    pts.findIndex((p) => p.overSpec) >= 0 ? pts.findIndex((p) => p.overSpec) : pts.findIndex((p) => p.outOfControl),
  );
  const tabStop = roving !== null && roving < n ? roving : defaultRoving;

  const activePoint = active !== null && active < n ? pts[active] : undefined;
  const ax = active !== null ? xAt(active) : 0;
  const ay = activePoint ? yAt(activePoint.value) : 0;
  const frac = ax / width;
  const tx = frac < 0.3 ? "-12px" : frac > 0.7 ? "calc(-100% + 12px)" : "-50%";
  const ty = ay < 90 ? "14px" : "calc(-100% - 14px)";
  const showTouchAction = clickable && touchPicked && activePoint !== undefined;

  function nearestIndex(clientX: number): number | null {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    if (rect.width <= 0) return null;
    const x = ((clientX - rect.left) * width) / rect.width;
    if (n === 1) return 0;
    return Math.max(0, Math.min(n - 1, Math.round((x - M.left - inset) / step)));
  }

  function onHitMove(e: PointerEvent<SVGRectElement>) {
    if (e.pointerType !== "mouse") return;
    const i = nearestIndex(e.clientX);
    if (i !== null) setActive(i);
  }

  function onHitClick(e: MouseEvent<SVGRectElement>) {
    const i = nearestIndex(e.clientX);
    if (i === null) return;
    const point = pts[i];
    if (!point) return;
    if (lastPointerType.current === "mouse") {
      setActive(i);
      onPointClick?.(point.id);
      return;
    }
    // 터치·펜 — 첫 탭은 확인만, 같은 점을 다시 탭하면 이동
    if (clickable && active === i && touchPicked) {
      onPointClick?.(point.id);
      return;
    }
    setActive(i);
    setTouchPicked(true);
  }

  function focusPoint(i: number) {
    setRoving(i);
    setActive(i);
    pointRefs.current[i]?.focus();
  }

  function handleKey(e: KeyboardEvent<SVGCircleElement>, i: number, id: string) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      focusPoint(Math.min(n - 1, i + 1));
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      focusPoint(Math.max(0, i - 1));
    } else if (e.key === "Home") {
      e.preventDefault();
      focusPoint(0);
    } else if (e.key === "End") {
      e.preventDefault();
      focusPoint(n - 1);
    } else if (clickable && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onPointClick?.(id);
    } else if (e.key === "Escape") {
      setActive(null);
    }
  }

  return (
    <div ref={ref} className="w-full">
      <div className="mb-1 text-right text-[11px] text-gray-400">단위: {unit}</div>
      <div className="relative">
        <svg
          ref={svgRef}
          role="group"
          aria-label={ariaLabel}
          width="100%"
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="block select-none"
        >
          {showBand && (
            <g aria-hidden>
              <rect x={bandX0} y={M.top} width={Math.max(0, bandX1 - bandX0)} height={plotH} fill={C.band} />
              <text x={bandX0 + 4} y={M.top - 7} fontSize={fs} fill={C.dim}>
                기준 구간 ({baseN}개)
              </text>
            </g>
          )}
          {!limitsValid && (
            <text x={M.left + 4} y={M.top - 7} fontSize={fs} fill={C.limit} aria-hidden>
              기준 구간 표본 부족 — 관리한계 없음
            </text>
          )}

          <g aria-hidden>
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
            {limitsValid && (
              <line
                x1={M.left}
                x2={plotRight}
                y1={yAt(chart.ucl)}
                y2={yAt(chart.ucl)}
                stroke={C.limit}
                strokeWidth={1.2}
                strokeDasharray="5 4"
              />
            )}
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
          </g>

          {/* 포인터 대상 — 플롯 전체 사각형 하나, x 로 가장 가까운 점 */}
          <rect
            x={M.left}
            y={M.top}
            width={plotW}
            height={plotH}
            fill="transparent"
            className={clickable ? "cursor-pointer" : ""}
            aria-hidden
            onPointerDown={(e) => {
              lastPointerType.current = e.pointerType || "mouse";
            }}
            onPointerMove={onHitMove}
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") setActive(null);
            }}
            onClick={onHitClick}
          />

          {pts.map((p, i) => {
            const x = xAt(i);
            const y = yAt(p.value);
            const isActive = active === i;
            const status = p.overSpec ? `, ${specName} 초과` : p.outOfControl ? ", 관리한계 이탈" : "";
            const label = `${i + 1}/${n}번째 ${p.id} ${fmtShortDate(p.date)} ${fmtSigned(p.value, vd)}${unit} ${p.label}${status}${
              highlight.has(p.id) ? ", 강조한 항목" : ""
            }`;
            return (
              <g key={`p-${p.id}`}>
                {highlight.has(p.id) && <circle cx={x} cy={y} r={9} fill="none" stroke={C.highlight} strokeWidth={2} pointerEvents="none" />}
                {p.overSpec ? (
                  <circle cx={x} cy={y} r={compact ? 5 : 5.5} fill={C.spec} stroke="#030712" strokeWidth={1.5} pointerEvents="none" />
                ) : p.outOfControl ? (
                  <circle cx={x} cy={y} r={compact ? 4.5 : 5} fill={C.limit} stroke="#030712" strokeWidth={1.5} pointerEvents="none" />
                ) : (
                  <circle cx={x} cy={y} r={compact ? 2.5 : 3} fill={C.point} pointerEvents="none" />
                )}
                {isActive && <circle cx={x} cy={y} r={7} fill="none" stroke="#ffffff" strokeOpacity={0.8} strokeWidth={1.5} pointerEvents="none" />}
                {/* 키보드 대상 — 보이지 않는 원, 탭 정지는 하나만 */}
                <circle
                  ref={(el) => {
                    pointRefs.current[i] = el;
                  }}
                  cx={x}
                  cy={y}
                  r={8}
                  fill="transparent"
                  stroke="transparent"
                  strokeWidth={2}
                  pointerEvents="none"
                  tabIndex={i === tabStop ? 0 : -1}
                  role={clickable ? "button" : "img"}
                  aria-label={clickable ? `${label} — Enter 로 계보 보기` : label}
                  className="outline-none focus-visible:stroke-white"
                  onFocus={() => {
                    setRoving(i);
                    setActive(i);
                    setTouchPicked(false);
                  }}
                  onBlur={() => setActive((cur) => (cur === i ? null : cur))}
                  onKeyDown={(e) => handleKey(e, i, p.id)}
                />
              </g>
            );
          })}
        </svg>

        {activePoint && (
          <div
            className={`absolute z-10 w-max max-w-[220px] rounded-lg border border-white/10 bg-gray-950/95 px-2.5 py-2 shadow-xl [word-break:keep-all] ${
              showTouchAction ? "pointer-events-auto" : "pointer-events-none"
            }`}
            style={{ left: `${(frac * 100).toFixed(2)}%`, top: ay, transform: `translate(${tx}, ${ty})` }}
          >
            <div className="font-mono text-[11px] text-white">{activePoint.id}</div>
            <div className="text-[11px] text-gray-400">
              {fmtShortDate(activePoint.date)} · {activePoint.label}
            </div>
            <div className="mt-0.5 text-sm font-bold text-white">
              {fmtSigned(activePoint.value, vd)} <span className="text-xs font-medium text-gray-400">{unit}</span>
            </div>
            {activePoint.overSpec && <div className="text-[11px] font-semibold text-rose-300">{specName} 초과</div>}
            {activePoint.outOfControl && !activePoint.overSpec && (
              <div className="text-[11px] font-semibold text-amber-300">관리한계 이탈</div>
            )}
            {highlight.has(activePoint.id) && <div className="text-[11px] font-semibold text-cyan-300">강조한 항목</div>}
            {showTouchAction ? (
              <button
                type="button"
                onClick={() => onPointClick?.(activePoint.id)}
                className="mt-1.5 inline-flex w-full min-h-10 items-center justify-center rounded-lg bg-indigo-600 px-3 text-xs font-semibold text-white hover:bg-indigo-500"
              >
                계보 보기
              </button>
            ) : (
              clickable && <div className="mt-0.5 text-[11px] text-indigo-300">눌러서 계보 보기</div>
            )}
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
        {limitsValid ? (
          <li className="flex items-center gap-1.5">
            <span className="inline-block w-4 border-t border-dashed border-amber-400" aria-hidden />
            관리한계(상한·하한)
          </li>
        ) : (
          <li className="flex items-center gap-1.5 text-amber-300">기준 구간 표본 부족 — 관리한계를 그리지 않음</li>
        )}
        {oocCount > 0 && (
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden />
            관리한계 이탈
          </li>
        )}
        {hasSpec && (
          <li className="flex items-center gap-1.5">
            <span className="inline-block w-4 border-t border-dotted border-rose-400" aria-hidden />
            {specName}
          </li>
        )}
        {overCount > 0 && (
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-rose-400" aria-hidden />
            {specName} 초과
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
