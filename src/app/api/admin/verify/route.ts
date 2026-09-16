// 「진짜 내려갔나 확인」 — 서버가 **자기 공개 주소를 바깥에서** 다시 불러 본다.
// POST { slugs?: string[] } → 200 { success:true, baseUrl, checks:[...] }
//
// 왜 필요한가: 형은 휴대폰에서 확인한다. 휴대폰·통신사·CDN 캐시 때문에 「아직 보인다」로 보이거나
// 반대로 「내려간 것 같다」로 보인다. 그래서 서버가 no-store 로 직접 받아 온 상태코드와
// 목록(홈·포트폴리오) 노출 여부를 숫자로 보여 준다. 화면의 스위치 상태가 아니라 **바깥에서 보이는 것**이 답이다.
//
// 부르는 주소는 레지스트리에 등록된 작업물로만 만든다(아무 주소나 서버가 대신 부르지 않게).

import { NextResponse, type NextRequest } from "next/server";
import { guardAdminWrite } from "@/lib/admin/request-guard";
import { readAdminSession } from "@/lib/admin/session";
import { DEMO_GONE_PATH } from "@/lib/portfolio/gate";
import { getPortfolio, type PortfolioCard } from "@/lib/portfolio/registry";
import {
  isListed,
  isReachable,
  readStateUncached,
  resolveStatus,
  type PortfolioStatus,
} from "@/lib/portfolio/state";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_SLUGS = 20;
const TIMEOUT_MS = 8000;

/**
 * 확인에 쓸 공개 주소.
 * 1) ADMIN_VERIFY_BASE_URL / NEXT_PUBLIC_SITE_URL 이 있으면 그것(운영 주소를 확인하는 게 목적)
 * 2) Vercel 운영 주소
 * 3) 요청이 들어온 주소 (로컬 개발)
 * host 헤더는 원래 못 믿을 값이지만 이 라우트는 로그인해야 부를 수 있고, 하는 일이 GET 한 번이다.
 */
function baseUrlOf(req: NextRequest): string {
  const explicit = process.env.ADMIN_VERIFY_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  const host = req.headers.get("host") ?? "localhost:3000";
  const proto = req.headers.get("x-forwarded-proto") ?? (host.startsWith("localhost") || host.startsWith("127.") ? "http" : "https");
  return `${proto}://${host}`;
}

type Fetched = { status: number | null; location: string | null; body: string; error: string | null };

async function fetchOnce(url: string, withBody: boolean): Promise<Fetched> {
  try {
    const res = await fetch(url, {
      cache: "no-store",
      redirect: "manual",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { "user-agent": "taemun-admin-verify" },
    });
    return {
      status: res.status,
      location: res.headers.get("location"),
      body: withBody ? await res.text().catch(() => "") : "",
      error: null,
    };
  } catch (e) {
    return { status: null, location: null, body: "", error: e instanceof Error ? e.message : String(e) };
  }
}

export type VerifyCheck = {
  slug: string;
  title: string;
  kind: PortfolioCard["kind"];
  url: string;
  /** 지금 설정상 이래야 한다 */
  expectedStatus: PortfolioStatus;
  expectedReachable: boolean;
  expectedListed: boolean;
  /** 바깥에서 본 실제 */
  httpStatus: number | null;
  redirectTo: string | null;
  /** 안내 화면(/gone)으로 보내졌는가 — 데모가 「내려간」 정상 모습이다 */
  redirectedToGone: boolean;
  listedOnPortfolio: boolean;
  listedOnHome: boolean;
  fetchError: string | null;
  /** 설정과 바깥이 다르면 true — 화면이 빨갛게 보여 준다 */
  mismatch: boolean;
  mismatchReason: string | null;
};

export async function POST(req: NextRequest) {
  // 확인은 「읽기」지만 서버가 대신 여러 주소를 부르는 일이라, 다른 사이트가 시키지 못하게 같이 막는다.
  const blocked = guardAdminWrite(req);
  if (blocked) return blocked;

  const session = readAdminSession(req);
  if (!session) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });

  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    body = null;
  }
  const rawSlugs = typeof body === "object" && body !== null ? (body as Record<string, unknown>).slugs : undefined;
  if (rawSlugs !== undefined && !Array.isArray(rawSlugs)) {
    return NextResponse.json({ error: "slugs 는 문자열 배열이어야 합니다." }, { status: 400 });
  }

  let all: PortfolioCard[];
  try {
    all = getPortfolio();
  } catch (e) {
    console.error("포트폴리오 레지스트리를 읽지 못했습니다:", e);
    return NextResponse.json({ error: "작업물 목록을 읽지 못했습니다." }, { status: 500 });
  }

  let targets: PortfolioCard[];
  if (rawSlugs === undefined) {
    targets = all;
  } else {
    const wanted = rawSlugs.filter((s): s is string => typeof s === "string");
    const unknown = wanted.filter((s) => !all.some((c) => c.slug === s));
    if (unknown.length) {
      return NextResponse.json({ error: `등록되지 않은 작업물: ${unknown.join(", ")}` }, { status: 400 });
    }
    targets = all.filter((c) => wanted.includes(c.slug));
  }
  if (targets.length === 0) return NextResponse.json({ error: "확인할 작업물이 없습니다." }, { status: 400 });
  if (targets.length > MAX_SLUGS) targets = targets.slice(0, MAX_SLUGS);

  const base = baseUrlOf(req);
  const snapshot = await readStateUncached();

  // 목록 노출은 두 페이지를 한 번씩만 받아 본다(작업물마다 다시 받지 않는다)
  const [portfolioPage, homePage] = await Promise.all([
    fetchOnce(`${base}/portfolio`, true),
    fetchOnce(`${base}/`, true),
  ]);

  const checks: VerifyCheck[] = await Promise.all(
    targets.map(async (card) => {
      const url = card.liveUrl.startsWith("/") ? `${base}${card.liveUrl}` : card.liveUrl;
      const expectedStatus = resolveStatus(snapshot, card.slug, card.kind);
      const expectedReachable = isReachable(expectedStatus);
      const expectedListed = isListed(expectedStatus);
      const hit = await fetchOnce(url, false);

      // 목록에 그 작업물이 남아 있는지 — 내려온 HTML 을 문자열로 본다(렌더된 지면이 정답).
      // 링크 주소와 slug 를 둘 다 본다: 카드가 주소를 서버에서 안 내보내는 형태여도(모달 등)
      // 「아직 보인다」 쪽으로 기울게 한다 — 내려갔다고 잘못 안심시키는 쪽이 더 위험하다.
      const link = card.liveUrl.startsWith("/") ? card.liveUrl : card.liveUrl.replace(/^https?:\/\//, "");
      const mentions = (html: string) => html.includes(link) || html.includes(card.slug);
      const listedOnPortfolio = mentions(portfolioPage.body);
      const listedOnHome = mentions(homePage.body);

      // 내려간 데모는 410 이 아니라 307 → /gone 이다(이유는 components/demo-kit/DemoGate.tsx 주석).
      // 그래서 「3xx 면 열려 있다」로 세면 제대로 내려간 시안이 전부 빨간불로 뜬다 — 안내 화면으로 보내는
      // 리다이렉트는 열린 것이 아니다.
      const sentToGone =
        hit.status !== null &&
        hit.status >= 300 &&
        hit.status < 400 &&
        (hit.location ?? "").includes(DEMO_GONE_PATH);
      const reallyReachable = hit.status !== null && hit.status >= 200 && hit.status < 400 && !sentToGone;
      let mismatchReason: string | null = null;
      if (hit.error) {
        mismatchReason = `주소를 열지 못했습니다: ${hit.error}`;
      } else if (expectedReachable !== reallyReachable) {
        mismatchReason = expectedReachable
          ? `열려 있어야 하는데 ${hit.status} 로 막혔습니다`
          : `막혀 있어야 하는데 ${hit.status} 로 열립니다`;
      } else if (!expectedListed && (listedOnPortfolio || listedOnHome)) {
        mismatchReason = `목록에서 빠져야 하는데 ${[listedOnPortfolio ? "포트폴리오" : null, listedOnHome ? "홈" : null]
          .filter(Boolean)
          .join("·")} 에 아직 보입니다`;
      } else if (expectedListed && !listedOnPortfolio && portfolioPage.status === 200) {
        mismatchReason = "목록에 있어야 하는데 포트폴리오 페이지에 없습니다";
      }

      return {
        slug: card.slug,
        title: card.title,
        kind: card.kind,
        url,
        expectedStatus,
        expectedReachable,
        expectedListed,
        httpStatus: hit.status,
        redirectTo: hit.location,
        redirectedToGone: sentToGone,
        listedOnPortfolio,
        listedOnHome,
        fetchError: hit.error,
        mismatch: mismatchReason !== null,
        mismatchReason,
      };
    }),
  );

  return NextResponse.json({
    success: true,
    baseUrl: base,
    checkedAt: new Date().toISOString(),
    // 상태를 못 읽었으면(표 없음·DB 장애) 판정은 fallbackStatus 기준이라는 걸 화면에 알린다
    stateOk: snapshot.ok,
    stateError: snapshot.error ?? null,
    listingPages: {
      portfolio: portfolioPage.status,
      home: homePage.status,
    },
    checks,
  });
}
