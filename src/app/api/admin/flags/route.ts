// 전역 스위치 — 「제안 시안 전부 내리기」·「데모 전부 내리기」.
// POST { key: "proposals_down" | "all_demos_down", enabled: boolean } → 200 { success:true, ... }
//
// 항의 전화가 왔을 때 형이 휴대폰에서 누르는 버튼이다. 작업물을 하나씩 고르지 않고 한 번에 막는다.
// 켜져 있으면 state.ts 의 resolveStatus() 가 해당 종류를 전부 private 로 판정한다.

import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { logAccess, requireAdminApi } from "@/lib/admin/guard";
import { FLAG_KEYS, setFlag, type FlagKey } from "@/lib/admin/store";
import { PORTFOLIO_STATE_TAG, hasServiceRoleKey } from "@/lib/portfolio/state";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isFlagKey(v: unknown): v is FlagKey {
  return typeof v === "string" && (FLAG_KEYS as readonly string[]).includes(v);
}

export async function POST(req: NextRequest) {
  // 출처 검사가 먼저다 — 다른 사이트가 형 쿠키로 「전부 내리기」를 해제하지 못하게(lib/admin/request-guard.ts).
  // requireAdminApi 가 출처 검사 → 로그인을 한 번에 한다. 급한 스위치라 basic 등급(DB 가 죽어도 열림, 옛 쿠키 통과).
  const gate = await requireAdminApi(req, { scope: "basic", write: true });
  if (!gate.ok) return gate.response;
  const { ctx } = gate;
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

  if (!isFlagKey(b.key)) {
    return NextResponse.json({ error: `key 는 ${FLAG_KEYS.join(" | ")} 중 하나여야 합니다.` }, { status: 400 });
  }
  if (typeof b.enabled !== "boolean") {
    return NextResponse.json({ error: "enabled 는 true 또는 false 여야 합니다." }, { status: 400 });
  }
  const note = typeof b.note === "string" && b.note.length <= 300 ? b.note : null;

  const result = await setFlag(b.key, b.enabled, ctx.actor, note);
  if (!result.ok) {
    if (result.reason === "no-service-key") {
      return NextResponse.json({ error: "서버 설정 오류입니다." }, { status: 503 });
    }
    return NextResponse.json({ error: `저장하지 못했습니다: ${result.message}` }, { status: 502 });
  }

  // Next 16 은 두 번째 인자(cacheLife)를 요구한다. { expire: 0 } = 「지금 당장 만료」 —
  // "max" 를 주면 낡은 값을 계속 내보내도 된다는 뜻이라 내려간 시안이 살아 있을 수 있다.
  revalidateTag(PORTFOLIO_STATE_TAG, { expire: 0 });
  revalidatePath("/portfolio");
  revalidatePath("/");

  logAccess(ctx, {
    action: "update",
    resource: "portfolio_flag",
    resourceId: result.data.key,
    detail: `${result.data.key} ${result.data.enabled ? "on" : "off"}`,
  });

  return NextResponse.json({ success: true, key: result.data.key, enabled: result.data.enabled, logged: result.logged });
}
