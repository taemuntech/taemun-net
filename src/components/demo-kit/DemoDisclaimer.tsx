// 제안용 시안(kind=proposal) 맨 위에 붙는 고지 한 줄.
// (demos) 레이아웃이 모든 데모에 렌더하고, 제안 시안일 때만 실제로 보인다.
// - 아라가 만든 데모 디자인 파일을 건드리지 않고 한 곳에서 붙이려고 이 방식으로 둔다.
// - 새 제안 시안이 들어와도 카드 JSON 의 kind 가 proposal 이면 자동으로 붙는다.
// - fixed 가 아니라 문서 흐름 맨 위 — 데모의 sticky 헤더를 덮지 않고 밀어낸다.
//
// ⚠️ 예전에는 클라이언트에서 usePathname 으로 판정하려고 **slug→종류 표 전체**를 prop 으로 받았다.
// 그러면 공개 샘플 한 장만 열어도 「이 스튜디오에 wonik-qnc·hysfa·sodamjae 라는 proposal 이 있다」가
// HTML 에 남는다(실측: /demo/maison 본문에 8개가 전부 있었다). 내려간 시안의 slug 는 곧 회사 이름이라
// 내린 뒤에도 존재와 주소가 계속 새는 셈이다. 그래서 **지금 이 데모의 판정 결과 두 값만** 받는다.
// 서버 판정(decideDemoAccess)이 이미 끝난 값이라 클라이언트가 다시 판정할 이유도 없다 —
// 'use client' 도 필요 없다(Link 만 쓰므로 서버 컴포넌트로 충분하다).

import Link from "next/link";
import { PROPOSAL_DISCLAIMER } from "@/lib/portfolio/schema";

export type DemoDisclaimerProps = {
  /** 이 데모가 실존 업체 제안 시안인가 — 서버(decideDemoAccess)가 정한다 */
  isProposal: boolean;
  /** 문의 유입 표시에 쓸 slug. 모르면 null (그때는 유입 표시 없이 문의로 보낸다) */
  slug: string | null;
};

export default function DemoDisclaimer({ isProposal, slug }: DemoDisclaimerProps) {
  if (!isProposal) return null;

  return (
    <div className="w-full bg-amber-100 text-amber-950 border-b border-amber-300 px-4 py-2 text-[12px] lg:text-sm leading-relaxed [word-break:keep-all]">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
        <span className="font-semibold">{PROPOSAL_DISCLAIMER}</span>
        <Link
          href={slug ? `/inquiry?from=${slug}` : "/inquiry"}
          className="underline underline-offset-2 font-bold hover:text-amber-800 whitespace-nowrap"
        >
          이런 사이트 제작 문의
        </Link>
      </div>
    </div>
  );
}
