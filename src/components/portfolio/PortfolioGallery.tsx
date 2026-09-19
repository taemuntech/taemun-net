"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowRight, Info, Search, X } from "lucide-react";
import { KIND_LABEL, PORTFOLIO_KINDS, industryLabel, type IndustryKey, type PortfolioKind } from "@/lib/portfolio/schema";
import { industryInquiryHref, isIndustryKey } from "@/components/demo-kit/sample-lead";
import PortfolioCardView, { type GalleryItem } from "./PortfolioCardView";

// 포트폴리오 갤러리 — 업종·종류 필터는 URL 쿼리(?industry=interior&kind=sample)와 같다.
// 영업 문자로 「인테리어만 보기」 링크를 그대로 보낼 수 있게 하기 위해서다. 검색어는 화면 안에서만 쓴다.
// useSearchParams 를 쓰므로 page 에서 <Suspense> 로 감싸고, fallback 에는 PortfolioGalleryFallback 을 둔다
// (같은 필터 바 자리를 비활성으로 그려 수화 뒤 카드가 밀려 내려가지 않게).

export const GALLERY_PAGE_SIZE = 24;

export type GalleryIndustryTab = { key: IndustryKey; label: string; count: number };

type Props = {
  items: GalleryItem[];
  industries: GalleryIndustryTab[];
  /** 전체 기준 종류별 개수 — 0개인 종류 탭은 숨긴다 */
  kindCounts: Record<PortfolioKind, number>;
};

function normalize(s: string): string {
  return s.normalize("NFC").toLowerCase();
}

const tabBase =
  "min-h-10 shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900";
const tabOn = "bg-zinc-950 text-white border-zinc-950 shadow-xs";
const tabOff = "bg-white text-zinc-600 border-zinc-200 hover:text-zinc-950 hover:bg-zinc-100 hover:border-zinc-300";

function CountPill({ n, active }: { n: number; active: boolean }) {
  return (
    <span className={`text-xs px-1.5 py-0.5 rounded-full font-mono ${active ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-500"}`}>
      {n}
    </span>
  );
}

type FilterBarProps = {
  items: GalleryItem[];
  industries: GalleryIndustryTab[];
  visibleKinds: readonly PortfolioKind[];
  /** 선택한 업종 안에서 센 종류별 개수 */
  kindCountInIndustry: (k: PortfolioKind) => number;
  industry: IndustryKey | null;
  kind: PortfolioKind | null;
  query: string;
  countText: string;
  /** 수화 전 자리표시 — 누를 수 없고 보조기기에도 숨긴다 */
  placeholder?: boolean;
  onIndustry?: (key: IndustryKey | null) => void;
  onKind?: (k: PortfolioKind | null) => void;
  onQuery?: (q: string) => void;
};

function FilterBar({
  items,
  industries,
  visibleKinds,
  kindCountInIndustry,
  industry,
  kind,
  query,
  countText,
  placeholder = false,
  onIndustry,
  onKind,
  onQuery,
}: FilterBarProps) {
  return (
    <div className="space-y-3 mb-8" aria-hidden={placeholder || undefined} inert={placeholder || undefined}>
      <div role="group" aria-label="업종" className="-mx-4 px-4 lg:mx-0 lg:px-0 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        <button
          type="button"
          aria-pressed={industry === null}
          onClick={() => onIndustry?.(null)}
          className={`${tabBase} ${industry === null ? tabOn : tabOff}`}
        >
          전체 <CountPill n={items.length} active={industry === null} />
        </button>
        {industries.map((i) => {
          const active = industry === i.key;
          return (
            <button
              key={i.key}
              type="button"
              aria-pressed={active}
              onClick={() => onIndustry?.(i.key)}
              className={`${tabBase} ${active ? tabOn : tabOff}`}
            >
              {i.label} <CountPill n={i.count} active={active} />
            </button>
          );
        })}
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        {visibleKinds.length > 1 && (
          <div role="group" aria-label="종류" className="-mx-4 px-4 lg:mx-0 lg:px-0 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
            <button
              type="button"
              aria-pressed={kind === null}
              onClick={() => onKind?.(null)}
              className={`${tabBase} ${kind === null ? tabOn : tabOff}`}
            >
              전체 종류
            </button>
            {visibleKinds.map((k) => {
              const active = kind === k;
              return (
                <button
                  key={k}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onKind?.(k)}
                  className={`${tabBase} ${active ? tabOn : tabOff}`}
                >
                  {KIND_LABEL[k]} <CountPill n={kindCountInIndustry(k)} active={active} />
                </button>
              );
            })}
          </div>
        )}

        <div className="relative w-full lg:ml-auto lg:max-w-xs">
          <label htmlFor={placeholder ? undefined : "portfolio-search"} className="sr-only">
            포트폴리오 검색
          </label>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" aria-hidden="true" />
          <input
            id={placeholder ? undefined : "portfolio-search"}
            type="search"
            value={query}
            readOnly={placeholder}
            onChange={(e) => onQuery?.(e.target.value)}
            placeholder="이름·기능으로 찾기 (예: 예약)"
            className="w-full min-h-11 rounded-xl bg-white border border-zinc-200 pl-10 pr-10 text-base lg:text-sm text-zinc-900 placeholder:text-zinc-400 shadow-2xs focus:outline-none focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 transition-all"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQuery?.("")}
              aria-label="검색어 지우기"
              className="absolute right-1 top-1/2 -translate-y-1/2 w-10 h-10 inline-flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-700 transition-colors"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      <p className="text-sm text-zinc-500 font-mono" aria-live={placeholder ? undefined : "polite"}>
        {countText}
      </p>
    </div>
  );
}

function CardGrid({ items }: { items: GalleryItem[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
      {items.map((it) => (
        <PortfolioCardView key={it.slug} item={it} />
      ))}
    </div>
  );
}

/** Suspense fallback — 필터 없는 첫 목록 + 같은 높이의 비활성 필터 바. 첫 HTML(검색 엔진·수화 전)에 실린다 */
export function PortfolioGalleryFallback({ items, industries, kindCounts }: Props) {
  if (items.length === 0) return null;
  const visibleKinds = PORTFOLIO_KINDS.filter((k) => kindCounts[k] > 0);
  return (
    <div className="min-w-0">
      <FilterBar
        items={items}
        industries={industries}
        visibleKinds={visibleKinds}
        kindCountInIndustry={(k) => kindCounts[k]}
        industry={null}
        kind={null}
        query=""
        countText={`${items.length}개`}
        placeholder
      />
      <CardGrid items={items.slice(0, GALLERY_PAGE_SIZE)} />
    </div>
  );
}

export default function PortfolioGallery({ items, industries, kindCounts }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL 값은 실제로 보이는 탭일 때만 인정한다(모르는 값·0개 업종은 「전체」로)
  const rawIndustry = searchParams.get("industry");
  const industry: IndustryKey | null = industries.some((i) => i.key === rawIndustry) ? (rawIndustry as IndustryKey) : null;
  // 영업 링크가 아직 샘플 0개인 업종(예: ?industry=commerce)을 가리키면 조용히 전체를 보여 주지 않고 알린다
  const pendingIndustry: IndustryKey | null = rawIndustry && !industry && isIndustryKey(rawIndustry) ? rawIndustry : null;
  const pendingIndustryLabel = pendingIndustry ? industryLabel(pendingIndustry) : null;
  const rawKind = searchParams.get("kind");
  const kind: PortfolioKind | null =
    PORTFOLIO_KINDS.includes(rawKind as PortfolioKind) && kindCounts[rawKind as PortfolioKind] > 0 ? (rawKind as PortfolioKind) : null;

  const [query, setQuery] = useState("");
  const q = normalize(query.trim());

  const visibleKinds = PORTFOLIO_KINDS.filter((k) => kindCounts[k] > 0);

  // 업종만 적용한 목록 — 종류 탭의 개수는 선택한 업종 안에서 센다
  const inIndustry = useMemo(() => (industry ? items.filter((it) => it.industry === industry) : items), [items, industry]);

  const filtered = useMemo(() => {
    return inIndustry.filter((it) => {
      if (kind && it.kind !== kind) return false;
      if (!q) return true;
      return [it.title, it.subtitle, ...it.features].some((s) => normalize(s).includes(q));
    });
  }, [inIndustry, kind, q]);

  // 「더 보기」 개수 — 필터·검색이 바뀌면 24로 돌아간다(effect 없이 키 비교로)
  const filterKey = `${industry ?? ""}|${kind ?? ""}|${q}`;
  const [paging, setPaging] = useState({ key: filterKey, count: GALLERY_PAGE_SIZE });
  const shownCount = paging.key === filterKey ? paging.count : GALLERY_PAGE_SIZE;
  const shown = filtered.slice(0, shownCount);

  function replaceParams(mutate: (next: URLSearchParams) => void) {
    const next = new URLSearchParams(searchParams.toString());
    mutate(next);
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function setParam(name: "industry" | "kind", value: string | null) {
    replaceParams((next) => {
      if (value) next.set(name, value);
      else next.delete(name);
    });
  }

  // 필터만 지운다 — utm 같은 다른 쿼리(영업 링크 추적)는 남긴다
  function resetAll() {
    setQuery("");
    replaceParams((next) => {
      next.delete("industry");
      next.delete("kind");
    });
  }

  const hasFilter = Boolean(industry || kind || q);

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-zinc-200 bg-white shadow-xs px-6 py-14 text-center">
        <p className="text-lg font-bold text-zinc-950">포트폴리오를 정리하고 있습니다</p>
        <p className="mt-2 text-sm text-zinc-500">업종별 샘플 사이트를 곧 올립니다. 먼저 상담이 필요하시면 문의해 주세요.</p>
        <Link
          href="/inquiry"
          className="mt-6 inline-flex min-h-11 items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-semibold transition-colors"
        >
          제작 문의 <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    );
  }

  return (
    <div className="min-w-0">
      {pendingIndustry && pendingIndustryLabel && (
        <div
          role="status"
          className="mb-4 flex items-start gap-2 rounded-2xl border border-amber-300/80 bg-amber-50 px-4 py-3 text-sm text-amber-900 break-keep"
        >
          <Info className="w-4 h-4 mt-0.5 shrink-0 text-amber-700" aria-hidden="true" />
          <span>
            「{pendingIndustryLabel}」 업종 샘플은 준비 중입니다 — 전체 목록을 보여 드립니다.{" "}
            <Link href={industryInquiryHref(pendingIndustry)} className="font-semibold underline underline-offset-2 hover:text-amber-950">
              이 업종으로 시안 문의
            </Link>
          </span>
        </div>
      )}

      <FilterBar
        items={items}
        industries={industries}
        visibleKinds={visibleKinds}
        kindCountInIndustry={(k) => inIndustry.filter((it) => it.kind === k).length}
        industry={industry}
        kind={kind}
        query={query}
        countText={`${filtered.length}개${hasFilter ? ` / 전체 ${items.length}개` : ""}`}
        onIndustry={(key) => setParam("industry", key)}
        onKind={(k) => setParam("kind", k)}
        onQuery={setQuery}
      />

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-zinc-200 bg-white shadow-xs px-6 py-14 text-center">
          <p className="text-lg font-bold text-zinc-950">조건에 맞는 사이트가 없습니다</p>
          <p className="mt-2 text-sm text-zinc-500">검색어나 필터를 바꿔 보세요. 원하는 업종이 없다면 시안부터 만들어 드립니다.</p>
          <div className="mt-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-center gap-2">
            <button
              type="button"
              onClick={resetAll}
              className="min-h-11 inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-800 text-sm font-semibold transition-colors"
            >
              필터 초기화
            </button>
            <Link
              href="/inquiry"
              className="min-h-11 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-sm font-semibold transition-colors"
            >
              제작 문의 <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      ) : (
        <>
          <CardGrid items={shown} />
          {filtered.length > shown.length && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setPaging({ key: filterKey, count: shownCount + GALLERY_PAGE_SIZE })}
                className="min-h-11 inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-200 text-zinc-800 text-sm font-semibold shadow-2xs transition-colors"
              >
                더 보기 ({shown.length} / {filtered.length})
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
