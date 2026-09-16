// 요청 경계 — Next 16 은 middleware.ts 가 아니라 proxy.ts 다(파일 이름이 다르면 아예 안 돈다).
// 여기서는 「무겁지 않은 일」만 한다. 판정(공개/링크 전용/비공개)은 (demos) 레이아웃 한 곳이 맡는다.
//
// 하는 일 세 가지:
// 1) /demo/<slug> 요청의 slug 를 x-demo-slug 요청 헤더로 실어 준다.
//    (demos) 레이아웃은 정적 폴더(demo/wonik-qnc/page.tsx)라 params 로 slug 를 못 받는다 — 그래서 헤더로 준다.
//    **들어온 값을 무조건 덮어쓴다.** 방문자가 x-demo-slug 를 직접 붙여 「내려간 시안」을 「살아 있는 시안」인 척
//    통과시키는 우회를 여기서 닫는다.
// 2) 데모 응답에 X-Robots-Tag: noindex 를 한 겹 더 건다((demos) 레이아웃 metadata 의 robots:index=false 와 이중).
//    가상 브랜드 샘플도, 실존 업체 제안 시안도 검색에 뜨면 안 된다.
// 3) 썸네일·업체 원본 이미지 주소를 상태를 보는 라우트(/api/asset/…)로 rewrite 한다.
//    여기서도 데이터베이스는 읽지 않는다 — 넘기기만 하고 판정은 그 라우트가 한다.
//
// 여기서 데이터베이스를 읽지 않는 이유: 상태 읽기가 느리거나 죽으면 데모 요청 전체가 같이 느려지거나 멈춘다.
// 「DB 가 죽어도 사이트는 산다」가 이 작업의 1번 원칙이라 판정은 레이아웃(캐시·태그 무효화가 있는 곳)에 둔다.
//
// ⚠️ 링크 전용(unlisted)은 보안이 아니다 — 목록에서만 빠지고 주소를 아는 사람은 그대로 연다.
//    사람에게 보이면 안 되는 것은 반드시 비공개(private)로 둬야 막힌다.

import { NextResponse, type NextRequest } from "next/server";
import { DEMO_SLUG_HEADER, demoSlugFromPath } from "@/lib/portfolio/gate";
import { assetRoutePath, assetTargetFromPublicPath } from "@/lib/portfolio/protected-assets";

export const config = {
  // 데모 주소 + **상태를 따라야 하는 정적 파일**.
  // 3) 썸네일(/portfolio/<slug>/<파일>)과 업체 원본 이미지 폴더는 public/ 정적 파일이라 예전엔 상태와
  //    무관하게 늘 200 이었다 — 「전부 내리기」를 눌러도 시안 전체 화면 스크린샷과 업체 로고가 그대로 열렸다.
  //    여기서 보호 라우트로 넘긴다(판정은 그 라우트가 한다 — proxy 는 데이터베이스를 읽지 않는다).
  //    업체 폴더가 늘면 아래 한 줄과 protected-assets.ts 의 COMPANY_ASSET_OWNERS 를 같이 늘린다.
  matcher: ["/demo/:path*", "/portfolio/:slug/:file*", "/hysfa/:file*"],
};

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  // ── 상태를 따르는 정적 파일 → 보호 라우트로 넘긴다 ──
  // rewrite 라 방문자에게 보이는 주소는 그대로다(카드 JSON·갤러리 데이터를 한 줄도 안 고친다).
  if (!pathname.startsWith("/demo/")) {
    const target = assetTargetFromPublicPath(pathname);
    if (!target) return NextResponse.next();
    const url = request.nextUrl.clone();
    url.pathname = assetRoutePath(target);
    return NextResponse.rewrite(url);
  }

  const slug = demoSlugFromPath(pathname) ?? "";

  const headers = new Headers(request.headers);
  // slug 를 못 뽑았으면 빈 값으로 덮어쓴다 — 위조 헤더가 살아남지 않게(빈 값 = 레이아웃이 「모름」으로 보고 안전한 쪽으로 넘어진다)
  headers.set(DEMO_SLUG_HEADER, slug);

  const response = NextResponse.next({ request: { headers } });
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}
