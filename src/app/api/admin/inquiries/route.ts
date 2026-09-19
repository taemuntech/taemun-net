// 견적 문의 하나의 상태를 바꾼다. POST { id, status, closedReason?, note? } → 200 { success:true, changed, from, to }
// 순서는 다른 관리자 쓰기와 같다: 출처 검사 → 로그인·기기(개인정보 등급) → 입력 검사 → service_role 저장 → 접속기록.
//
// 2026-09-19(P1b): 표를 직접 update 하지 않고 SQL 함수 inquiry_transition 을 부른다(crm-store.transitionInquiry).
// 상태·종료 사유·보관 근거(계약이면 보관기한을 풀고, 계약에서 되돌리면 접수일+1년으로)·이력 한 줄을
// **한 트랜잭션**으로 바꾼다. 「진행 완료」 사유는 계약했던 문의에만 된다 — 규칙의 정본은 SQL 함수다.

import { NextResponse, type NextRequest } from "next/server";
import { parseTransitionBody } from "@/lib/admin/crm-input";
import { transitionInquiry, type CrmFailure } from "@/lib/admin/crm-store";
import { logAccess, requireAdminApi } from "@/lib/admin/guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function failureStatus(f: CrmFailure): number {
  switch (f.reason) {
    case "invalid":
      return 400;
    case "not-found":
      return 404;
    case "purged":
      return 409;
    case "no-service-key":
      return 503;
    default:
      return 502;
  }
}

function failureMessage(f: CrmFailure): string {
  if (f.reason === "no-service-key") return "서버 설정 오류입니다.";
  if (f.reason === "db-error") return "저장하지 못했습니다.";
  return f.message;
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
  const input = parseTransitionBody(body);
  if (!input.ok) return NextResponse.json({ error: input.error }, { status: 400 });

  const result = await transitionInquiry({
    id: input.id,
    to: input.to,
    closedReason: input.closedReason,
    note: input.note,
    actor: ctx.actor,
    sessionId: ctx.sessionId,
  });
  if (!result.ok) {
    logAccess(ctx, {
      action: "update",
      resource: "inquiry",
      resourceId: input.id,
      subjectIds: [input.id],
      detail: `status →${input.to} 실패(${result.reason})`,
      outcome: result.reason === "db-error" || result.reason === "no-service-key" ? "error" : "denied",
    });
    return NextResponse.json({ error: failureMessage(result) }, { status: failureStatus(result) });
  }

  const { changed, from, to } = result.data;
  logAccess(ctx, {
    action: "update",
    resource: "inquiry",
    resourceId: input.id,
    subjectIds: [input.id],
    detail: `status ${from}→${to}${input.closedReason ? ` (사유 ${input.closedReason})` : ""}${changed ? "" : " 변경 없음"}`,
  });
  return NextResponse.json({ success: true, changed, from, to });
}
