// 작업물 하나의 상태·순서·대표작을 저장한다.
// POST { slug, status?, sortOrder?, featured?, note? } → 200 { success:true, ... }
//
// 삭제·내용 수정은 일부러 없다 — 내용(제목·설명)의 정본은 저장소 JSON 이고,
// 관리자 화면에서 잘못 눌러 깨질 표면을 만들지 않는다.
//
// 저장이 끝나면 공개 화면 캐시를 즉시 갈아 끼운다(태그 + 홈·포트폴리오 경로).

import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { guardAdminWrite } from "@/lib/admin/request-guard";
import { readAdminSession } from "@/lib/admin/session";
import { setFeatured, setOrder, setStatus, type StoreResult } from "@/lib/admin/store";
import { getPortfolioBySlug } from "@/lib/portfolio/registry";
import {
  PORTFOLIO_STATE_TAG,
  PORTFOLIO_STATUSES,
  hasServiceRoleKey,
  type PortfolioStatus,
} from "@/lib/portfolio/state";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NOTE_MAX = 300;

function isStatus(v: unknown): v is PortfolioStatus {
  return typeof v === "string" && (PORTFOLIO_STATUSES as readonly string[]).includes(v);
}

/** 실패 결과를 HTTP 로 옮긴다 — 키 없음은 503(조용한 강등 금지), 나머지는 400/502 */
function failureResponse(result: Extract<StoreResult<unknown>, { ok: false }>): { status: number; error: string } {
  if (result.reason === "no-service-key") return { status: 503, error: "서버 설정 오류입니다." };
  if (result.reason === "unknown-slug") return { status: 400, error: result.message };
  return { status: 502, error: `저장하지 못했습니다: ${result.message}` };
}

export async function POST(req: NextRequest) {
  // 출처 검사가 먼저다 — 다른 사이트가 형 쿠키로 상태를 바꾸지 못하게(lib/admin/request-guard.ts)
  const blocked = guardAdminWrite(req);
  if (blocked) return blocked;

  const session = readAdminSession(req);
  if (!session) return NextResponse.json({ error: "로그인이 필요합니다." }, { status: 401 });
  if (!hasServiceRoleKey()) return NextResponse.json({ error: "서버 설정 오류입니다." }, { status: 503 });

  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    body = null;
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return NextResponse.json({ error: "요청 형식이 올바르지 않습니다." }, { status: 400 });
  }
  const b = body as Record<string, unknown>;

  const slug = typeof b.slug === "string" ? b.slug : "";
  if (!slug) return NextResponse.json({ error: "slug 가 필요합니다." }, { status: 400 });
  let card: ReturnType<typeof getPortfolioBySlug>;
  try {
    card = getPortfolioBySlug(slug);
  } catch (e) {
    console.error("포트폴리오 레지스트리를 읽지 못했습니다:", e);
    return NextResponse.json({ error: "작업물 목록을 읽지 못했습니다." }, { status: 500 });
  }
  if (!card) return NextResponse.json({ error: `등록되지 않은 작업물 「${slug}」 입니다.` }, { status: 400 });

  if (b.status !== undefined && !isStatus(b.status)) {
    return NextResponse.json(
      { error: `status 는 ${PORTFOLIO_STATUSES.join(" | ")} 중 하나여야 합니다.` },
      { status: 400 },
    );
  }
  if (b.sortOrder !== undefined && b.sortOrder !== null && !Number.isInteger(b.sortOrder)) {
    return NextResponse.json({ error: "sortOrder 는 정수 또는 null 이어야 합니다." }, { status: 400 });
  }
  if (b.featured !== undefined && b.featured !== null && typeof b.featured !== "boolean") {
    return NextResponse.json({ error: "featured 는 true·false·null 이어야 합니다." }, { status: 400 });
  }
  if (b.note !== undefined && (typeof b.note !== "string" || b.note.length > NOTE_MAX)) {
    return NextResponse.json({ error: `note 는 ${NOTE_MAX}자 이하 문자열이어야 합니다.` }, { status: 400 });
  }
  if (b.status === undefined && b.sortOrder === undefined && b.featured === undefined) {
    return NextResponse.json({ error: "바꿀 값이 없습니다 (status·sortOrder·featured)." }, { status: 400 });
  }

  const note = typeof b.note === "string" ? b.note : null;
  const actor = session.actor;
  const applied: string[] = [];
  let logged = true;
  let lastData: unknown = null;

  // 한 번에 여러 칸이 와도 각각 따로 저장하고 각각 이력을 남긴다. 하나라도 실패하면 거기서 멈춘다.
  const steps: Array<() => Promise<StoreResult<unknown>>> = [];
  if (b.status !== undefined && isStatus(b.status)) {
    const next = b.status;
    steps.push(() => setStatus(slug, next, actor, note));
    applied.push("status");
  }
  if (b.sortOrder !== undefined) {
    const next = b.sortOrder === null ? null : (b.sortOrder as number);
    steps.push(() => setOrder(slug, next, actor, note));
    applied.push("sortOrder");
  }
  if (b.featured !== undefined) {
    const next = b.featured === null ? null : (b.featured as boolean);
    steps.push(() => setFeatured(slug, next, actor, note));
    applied.push("featured");
  }

  const done: string[] = [];
  for (const [i, step] of steps.entries()) {
    const result = await step();
    if (!result.ok) {
      // 앞 단계가 이미 저장됐을 수 있으니 캐시는 갈아 끼우고 나간다
      if (done.length) revalidatePublic();
      const fail = failureResponse(result);
      return NextResponse.json({ error: fail.error, applied: done }, { status: fail.status });
    }
    logged = logged && result.logged;
    lastData = result.data;
    done.push(applied[i]);
  }

  revalidatePublic();

  return NextResponse.json({
    success: true,
    slug,
    applied: done,
    state: lastData,
    // 이력 표가 아직 없거나 쓰기가 막히면 false — 화면이 「이력이 안 남았습니다」를 보여 줄 수 있게
    logged,
  });
}

/** 공개 화면을 즉시 갈아 끼운다 — 상태 캐시 태그 + 목록이 있는 두 경로 */
function revalidatePublic(): void {
  // Next 16 은 두 번째 인자(cacheLife)를 요구한다. { expire: 0 } = 「지금 당장 만료」 —
  // "max" 를 주면 낡은 값을 계속 내보내도 된다는 뜻이라 내려간 시안이 살아 있을 수 있다.
  revalidateTag(PORTFOLIO_STATE_TAG, { expire: 0 });
  revalidatePath("/portfolio");
  revalidatePath("/");
}
