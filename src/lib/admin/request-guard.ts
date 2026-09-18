// 관리자 쓰기 요청의 **출처 검사** — 다른 사이트가 형 쿠키로 상태를 바꾸지 못하게.
//
// 왜 필요한가: 지금 방어가 쿠키 SameSite=Lax 하나뿐이다. 그런데
// - 라우트가 Origin·Referer 를 보지 않고,
// - req.json() 이 Content-Type 을 따지지 않아 `enctype="text/plain"` 짜리 크로스사이트 폼이 만드는
//   요청 모양을 그대로 받는다(실측: Origin: https://evil.example + Content-Type: text/plain 으로
//   POST /api/admin/verify → 200).
// - SameSite 는 호스트가 아니라 **사이트(등록 도메인)** 단위다. 데모를 서브도메인(*.taemun.net)이나
//   프리뷰 배포로 올리는 순간 그 지면에서 형 세션으로 「전부 내리기 해제」가 가능해진다.
//
// 그래서 쓰기 라우트 맨 앞에서 두 가지를 본다:
//   1) Content-Type 이 application/json 인가 — 아니면 415(크로스사이트 폼 모양을 아예 막는다)
//   2) Origin 이 이 사이트와 같은가 — 없거나 다르면 403
// fetch 는 POST 에 Origin 을 항상 붙인다. 그래서 「없으면 통과」가 아니라 「없으면 거절」이 맞다.

import { NextResponse } from "next/server";

export type RequestGuardFailure = { response: NextResponse };

function originOf(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

/** 이 서버가 자기라고 인정하는 주소들 */
function allowedOrigins(req: Request): string[] {
  const list = [
    originOf(process.env.ADMIN_VERIFY_BASE_URL),
    originOf(process.env.NEXT_PUBLIC_SITE_URL),
    process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
  ].filter((v): v is string => typeof v === "string" && v.length > 0);

  // 요청이 실제로 도착한 주소 — 프리뷰 배포·로컬 포트가 바뀌어도 자기 자신은 늘 허용된다.
  const host = req.headers.get("host");
  if (host) {
    const proto =
      req.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() ??
      (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
    list.push(`${proto}://${host}`);
  }
  return list;
}

/**
 * 통과하면 null, 막아야 하면 그대로 돌려줄 응답을 준다.
 * 부르는 쪽: `const bad = guardAdminWrite(req); if (bad) return bad;`
 *
 * 헤더만 보므로 NextRequest 가 아닌 일반 Request 도 받는다 — 관리자 밖의 공개 쓰기 라우트(견적 문의 접수)도
 * 같은 검사를 쓴다(guardJsonWrite). 규칙을 두 벌로 만들지 않으려고 이름만 하나 더 둔다.
 */
export function guardAdminWrite(req: Request): NextResponse | null {
  const contentType = (req.headers.get("content-type") ?? "").toLowerCase().split(";")[0].trim();
  if (contentType !== "application/json" && !contentType.endsWith("+json")) {
    return NextResponse.json({ error: "요청 형식이 올바르지 않습니다." }, { status: 415 });
  }

  const origin = req.headers.get("origin");
  if (!origin || !allowedOrigins(req).includes(origin)) {
    return NextResponse.json({ error: "허용되지 않은 요청입니다." }, { status: 403 });
  }
  return null;
}

/** 공개 쓰기 라우트용 이름 — 검사 내용은 guardAdminWrite 와 같다(Content-Type json + 같은 출처) */
export const guardJsonWrite = guardAdminWrite;
