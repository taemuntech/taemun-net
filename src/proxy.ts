// 요청 경계 — Next 16 은 middleware.ts 가 아니라 proxy.ts 다(파일 이름이 다르면 아예 안 돈다).
//
// 하는 일 네 가지:
// 1) /demo/<slug> 요청의 slug 를 x-demo-slug 요청 헤더로 실어 준다.
//    (demos) 레이아웃은 정적 폴더(demo/wonik-qnc/page.tsx)라 params 로 slug 를 못 받는다 — 그래서 헤더로 준다.
//    **들어온 값을 무조건 덮어쓴다.** 방문자가 x-demo-slug 를 직접 붙여 「내려간 시안」을 「살아 있는 시안」인 척
//    통과시키는 우회를 여기서 닫는다.
// 2) **내려간 데모는 여기서 끝낸다** — 아래 「307 본문」 주석 참고.
// 3) 데모 응답에 X-Robots-Tag: noindex 를 한 겹 더 건다((demos) 레이아웃 metadata 의 robots:index=false 와 이중).
//    가상 브랜드 샘플도, 실존 업체 제안 시안도 검색에 뜨면 안 된다.
// 4) 썸네일·업체 원본 이미지 주소를 상태를 보는 라우트(/api/asset/…)로 rewrite 한다.
//    이 갈래는 데이터베이스를 읽지 않는다 — 넘기기만 하고 판정은 그 라우트가 한다.
//
// ⚠️ **307 본문** (2026-09-16 실측으로 추가한 겹):
//    판정을 레이아웃에만 두었을 때, 내려간 데모 주소는 307 인데 **본문이 8KB 따라왔다**. 레이아웃이 redirect 를
//    던져도 Next 는 그 라우트의 청크 목록을 오류 셸에 싣기 때문이다 — 그 안에 그 데모 **전용 JS 청크 주소**가
//    있었고, 그 청크는 200 에 115KB, 회사 이름이 70번 들어 있었다. 브라우저는 리다이렉트를 따라가지만
//    curl·링크 미리보기 봇은 이 본문을 읽는다. 항의받아 내린 바로 그 주소가 본문 전체가 든 파일을 넘겨주는 셈이다.
//    그래서 **판정을 페이지 해석보다 앞**(여기)으로 한 겹 더 당겼다. proxy 가 내주는 redirect 는 본문이 0B 라
//    청크 주소가 실릴 자리가 없다. 레이아웃·generateMetadata 의 판정은 **그대로 둔다**(proxy 가 안 도는
//    상황까지 막는 두 번째·세 번째 겹).
//
//    값: 데모 요청 1건당 상태 읽기가 1회 늘어난다(여기 1 + 렌더 1). 데모는 영업 링크로만 들어오는 소량
//    트래픽이고, 읽기가 느리거나 죽어도 state.ts 의 4초 타임아웃이 잘라 준다(그때는 제안 시안만 막히고
//    샘플·사이트는 그대로 산다). 정적 파일 갈래(/portfolio/…·/hysfa/…)는 여기서 DB 를 읽지 않는다.
//
// ⚠️ 링크 전용(unlisted)은 보안이 아니다 — 목록에서만 빠지고 주소를 아는 사람은 그대로 연다.
//    사람에게 보이면 안 되는 것은 반드시 비공개(private)로 둬야 막힌다.

import { NextResponse, type NextRequest } from "next/server";
import { DEMO_GONE_PATH, DEMO_SLUG_HEADER, decideDemoAccessAtEdge, demoSlugFromPath } from "@/lib/portfolio/gate";
import { assetRoutePath, assetTargetFromPublicPath } from "@/lib/portfolio/protected-assets";

export const config = {
  // 데모 주소 + **상태를 따라야 하는 정적 파일**.
  // 3) 썸네일(/portfolio/<slug>/<파일>)과 업체 원본 이미지 폴더는 public/ 정적 파일이라 예전엔 상태와
  //    무관하게 늘 200 이었다 — 「전부 내리기」를 눌러도 시안 전체 화면 스크린샷과 업체 로고가 그대로 열렸다.
  //    여기서 보호 라우트로 넘긴다(판정은 그 라우트가 한다 — proxy 는 데이터베이스를 읽지 않는다).
  //    업체 폴더가 늘면 아래 한 줄과 protected-assets.ts 의 COMPANY_ASSET_OWNERS 를 같이 늘린다.
  matcher: ["/demo/:path*", "/portfolio/:slug/:file*", "/hysfa/:file*"],
};

export async function proxy(request: NextRequest): Promise<NextResponse> {
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

  // ── 내려간 데모는 페이지를 해석하기 전에 끝낸다 (위 「307 본문」 주석) ──
  // 여기서 내주는 redirect 는 본문이 없다 — 데모 전용 청크 주소가 실릴 자리가 없다.
  const access = await decideDemoAccessAtEdge(slug);
  if (access.blocked) {
    const gone = request.nextUrl.clone();
    gone.pathname = DEMO_GONE_PATH;
    gone.search = "";
    const blocked = NextResponse.redirect(gone, 307);
    blocked.headers.set("X-Robots-Tag", "noindex, nofollow");
    blocked.headers.set("Cache-Control", "private, no-store");
    return blocked;
  }

  const response = NextResponse.next({ request: { headers } });
  response.headers.set("X-Robots-Tag", "noindex, nofollow");
  return response;
}
