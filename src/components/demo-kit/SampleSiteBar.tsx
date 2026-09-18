"use client";

// (demos) 레이아웃이 모든 샘플 위에 붙이는 태문 표시 바. 샘플 코드는 이 바를 직접 넣지 않는다.
// - fixed 가 아니라 문서 흐름의 sticky top-0 — 샘플 본문을 덮지 않고 밀어낸다.
// - 샘플의 sticky/fixed 헤더는 top 을 var(--sample-bar-h,0px) 로 두어야 바에 가려지지 않는다(바가 이 변수를 선언한다).
// - × 로 접으면 이 탭(세션) 동안 접힌 채 유지. 저장소가 막힌 브라우저면 이 페이지에서만 접힌다.
// - 접혀도 「샘플」 표시는 없애지 않는다 — 왼쪽 아래에 작은 칩(누르면 다시 펼침)을 남긴다.
//   바가 샘플 사이트의 유일한 표시라서, 접은 뒤 가상 업체 사이트가 실재 업체처럼 읽히지 않게 하기 위해서다.

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import { X } from "lucide-react";
import { isSampleSlug, sampleInquiryHref } from "./sample-lead";
import { SAMPLE_BAR_HEIGHT_PX, SAMPLE_BAR_HEIGHT_VAR, type SampleSiteBarProps } from "./types";

const STORAGE_KEY = "taemun:sample-bar:collapsed";

// ── 접힘 상태: sessionStorage + 같은 탭 구독 ──
let memoryCollapsed = false;
const listeners = new Set<() => void>();

function readCollapsed(): boolean {
  if (memoryCollapsed) return true;
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function collapse(): void {
  memoryCollapsed = true;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // 저장소가 막혀 있어도 memoryCollapsed 로 이 페이지에서는 접힌다
  }
  listeners.forEach((l) => l());
}

function expand(): void {
  memoryCollapsed = false;
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // 저장소가 막혀 있으면 memoryCollapsed 만으로 펼친다
  }
  listeners.forEach((l) => l());
}

function slugFromPath(pathname: string | null): string | null {
  const m = pathname?.match(/^\/demo\/([^/?#]+)/);
  if (!m) return null;
  let slug = m[1];
  try {
    slug = decodeURIComponent(slug);
  } catch {
    return null;
  }
  return isSampleSlug(slug) ? slug : null;
}

export default function SampleSiteBar(_props: SampleSiteBarProps) {
  const pathname = usePathname();
  const collapsed = useSyncExternalStore(subscribe, readCollapsed, () => false);
  const slug = slugFromPath(pathname);
  const inquiryHref = slug ? sampleInquiryHref({ from: slug }) : "/inquiry";

  if (collapsed) {
    return (
      <>
        <style>{`:root{${SAMPLE_BAR_HEIGHT_VAR}:0px}`}</style>
        <button
          type="button"
          onClick={expand}
          aria-label="태문 샘플 사이트 — 안내 바 다시 펼치기"
          className="fixed bottom-3 left-3 z-[9999] inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#030712]/90 px-3 py-1.5 text-[11px] font-bold text-white shadow-lg shadow-black/30 backdrop-blur-md transition-colors hover:bg-[#030712] [word-break:keep-all]"
          style={{ fontFamily: "system-ui, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif" }}
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
          태문 샘플 사이트
        </button>
      </>
    );
  }

  return (
    <>
      <style>{`:root{${SAMPLE_BAR_HEIGHT_VAR}:${SAMPLE_BAR_HEIGHT_PX}px}`}</style>
      <div
        role="region"
        aria-label="태문넷 샘플 사이트 안내"
        className="sticky top-0 z-[9999] w-full border-b border-white/10 bg-[#030712]/95 text-white backdrop-blur-md [word-break:keep-all]"
        style={{ height: SAMPLE_BAR_HEIGHT_PX, fontFamily: "system-ui, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif" }}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center gap-2 px-3 lg:gap-4 lg:px-6">
          <Link href="/" className="flex min-w-0 shrink items-center gap-2" aria-label="태문넷 홈">
            <Image
              src="/images/logo/icon-192-transparent.png"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6 shrink-0 object-contain"
            />
            <span className="truncate text-[13px] font-bold leading-none tracking-tight">
              <span className="lg:hidden">태문 샘플</span>
              <span className="hidden lg:inline">
                태문넷 <span className="text-indigo-300">DEV STUDIO</span>
                <span className="ml-1.5 font-medium text-gray-300">샘플 사이트</span>
              </span>
            </span>
          </Link>

          <Link
            href="/portfolio"
            className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
          >
            포트폴리오
          </Link>

          <div className="ml-auto flex shrink-0 items-center gap-1">
            <Link
              href={inquiryHref}
              className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-3 py-1.5 text-xs font-bold text-white shadow-md shadow-indigo-500/20 transition-opacity hover:opacity-90"
            >
              <span className="lg:hidden">제작 문의</span>
              <span className="hidden lg:inline">이런 사이트 제작 문의</span>
            </Link>
            <button
              type="button"
              onClick={collapse}
              aria-label="샘플 안내 바 닫기"
              className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
