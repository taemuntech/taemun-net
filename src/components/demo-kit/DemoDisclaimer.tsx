"use client";

// 제안용 시안(kind=proposal) 맨 위에 붙는 고지 한 줄.
// (demos) 레이아웃이 모든 데모에 렌더하고, 주소의 slug 로 종류를 판정해 제안 시안에서만 보인다.
// - 아라가 만든 데모 디자인 파일을 건드리지 않고 한 곳에서 붙이려고 이 방식으로 둔다.
// - 새 제안 시안이 들어와도 카드 JSON 의 kind 가 proposal 이면 자동으로 붙는다.
// - fixed 가 아니라 문서 흐름 맨 위 — 데모의 sticky 헤더를 덮지 않고 밀어낸다.

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROPOSAL_DISCLAIMER } from "@/lib/portfolio/schema";

/** slug → kind (서버에서 레지스트리를 읽어 넘긴다 — 직렬화 가능한 값만) */
export type DemoKindMap = Record<string, string>;

function slugOf(pathname: string | null): string | null {
  const match = /^\/demo\/([a-z0-9-]+)/.exec(pathname ?? "");
  return match ? match[1] : null;
}

export default function DemoDisclaimer({ kinds }: { kinds: DemoKindMap }) {
  const slug = slugOf(usePathname());
  if (!slug || kinds[slug] !== "proposal") return null;

  return (
    <div className="w-full bg-amber-100 text-amber-950 border-b border-amber-300 px-4 py-2 text-[12px] lg:text-sm leading-relaxed [word-break:keep-all]">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
        <span className="font-semibold">{PROPOSAL_DISCLAIMER}</span>
        <Link
          href={"/inquiry?from=" + slug}
          className="underline underline-offset-2 font-bold hover:text-amber-800 whitespace-nowrap"
        >
          이런 사이트 제작 문의
        </Link>
      </div>
    </div>
  );
}
