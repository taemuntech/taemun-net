// 로그인한 기기 끊기 — POST { action: "revoke", id } | { action: "revoke_others" }
//   → 200 { success:true } / { success:true, revoked: N }
//
// 왜 있나: 휴대폰을 잃었거나, 남의 PC 에서 로그인하고 그냥 나왔을 때 **비밀번호를 바꾸지 않고도** 그 기기만 끊는다.
// (비밀번호를 바꾸면 모든 기기가 한꺼번에 끊긴다 — session.ts signingKey 주석. 그건 유출 대응용 최후 수단이다.)
//
// - 개인정보 등급(pii) — 기기 행을 확인한 로그인만 부를 수 있다.
// - 지금 쓰는 기기는 여기서 못 끊는다(400) — 자기 쿠키가 죽으면 화면이 이상해진다. 로그아웃 버튼을 쓴다.
// - 🔒 접속기록을 **먼저** 쓰고, 못 쓰면(503) 아무것도 하지 않는다. 「누가 기기를 끊었나」가 안 남는 해제는 없다.
// - 「이 기기 말고 모두 로그아웃」은 기기 표의 행만 끊어서는 모자란다 — sid 없는 쿠키(P1b 전 로그인·기기 기록
//   실패 로그인)는 표에 행이 없다. 그래서 지금 시각을 crm_settings.sessions_invalid_before 에 **먼저** 적는다.
//   문지기가 sid 없는 쿠키 중 그보다 먼저 발급된 것을 모두 막는다(guard-core). 이 시각을 못 적으면 행도 끊지 않고
//   실패로 돌려준다 — 「모두 끊었다」고 보였는데 잃어버린 폰의 옛 쿠키가 살아 있는 일이 없게.

import { NextResponse, type NextRequest } from "next/server";
import { parseSessionsBody } from "@/lib/admin/crm-input";
import {
  revokeAdminSession,
  revokeOtherAdminSessions,
  setSessionsInvalidBefore,
  type CrmFailure,
} from "@/lib/admin/crm-store";
import { logAccessSync, requireAdminApi } from "@/lib/admin/guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function fail(f: CrmFailure): NextResponse {
  if (f.reason === "not-found") return NextResponse.json({ error: "그 기기를 찾지 못했습니다." }, { status: 404 });
  if (f.reason === "no-service-key") return NextResponse.json({ error: "서버 설정 오류입니다." }, { status: 503 });
  return NextResponse.json({ error: "저장하지 못했습니다." }, { status: 502 });
}

function logFailed(): NextResponse {
  return NextResponse.json(
    { error: "접속기록을 남기지 못해 진행하지 않았습니다. 잠시 뒤 다시 시도해 주세요." },
    { status: 503 },
  );
}

export async function POST(req: NextRequest) {
  const gate = await requireAdminApi(req, { scope: "pii", write: true });
  if (!gate.ok) return gate.response;
  const { ctx } = gate;

  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    body = null;
  }
  const input = parseSessionsBody(body);
  if (!input.ok) return NextResponse.json({ error: input.error }, { status: 400 });

  if (input.action === "revoke") {
    if (ctx.sessionId && input.id === ctx.sessionId.toLowerCase()) {
      return NextResponse.json({ error: "지금 쓰는 기기는 로그아웃 버튼을 쓰세요." }, { status: 400 });
    }
    const logged = await logAccessSync(ctx, {
      action: "session_revoke",
      resource: "admin_session",
      resourceId: input.id,
      detail: "revoke",
    });
    if (!logged) return logFailed();

    const result = await revokeAdminSession(input.id, "revoked_by_owner");
    if (!result.ok) return fail(result);
    return NextResponse.json({ success: true });
  }

  const logged = await logAccessSync(ctx, {
    action: "session_revoke",
    resource: "admin_session",
    resourceId: ctx.sessionId ? `keep:${ctx.sessionId}` : null,
    detail: "revoke_others",
  });
  if (!logged) return logFailed();

  const cutoff = await setSessionsInvalidBefore(new Date().toISOString());
  if (!cutoff.ok) return fail(cutoff);

  const result = await revokeOtherAdminSessions(ctx.sessionId, "revoke_others");
  if (!result.ok) return fail(result);
  return NextResponse.json({ success: true, revoked: result.data });
}
