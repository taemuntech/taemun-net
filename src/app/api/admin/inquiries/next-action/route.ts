// 견적 문의 하나의 「다음 할 일」 — POST { id, text, due } → 200 { success:true, text, due }
//
// 왜 있나: 딜이 멈추는 가장 흔한 이유는 「다음에 뭘 언제 할지」를 머리에만 두는 것이다. 한 줄 + 날짜를 적어 두면
// 「오늘」 화면이 그날 위로 올려 주고, 아침 문자가 건수를 알려 준다.
// - text 는 200자 한 줄(비우면 null), due 는 KST 날짜(비우면 null). 날짜만 있는 것도 된다.
// - 🔒 접속기록에는 **할 일 글자를 남기지 않는다** — 고객 이름·사정이 섞일 수 있다. 「next_action 을 바꿨다」만 남긴다.

import { NextResponse, type NextRequest } from "next/server";
import { parseNextActionBody } from "@/lib/admin/crm-input";
import { setInquiryNextAction } from "@/lib/admin/crm-store";
import { logAccess, requireAdminApi } from "@/lib/admin/guard";
import { kstDate } from "@/lib/admin/today-core";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
  const input = parseNextActionBody(body, kstDate(new Date()));
  if (!input.ok) return NextResponse.json({ error: input.error }, { status: 400 });

  const result = await setInquiryNextAction({ id: input.id, text: input.text, due: input.due });
  if (!result.ok) {
    const status = result.reason === "not-found" ? 404 : result.reason === "no-service-key" ? 503 : 502;
    const error =
      result.reason === "not-found"
        ? "그 문의를 찾지 못했습니다."
        : result.reason === "no-service-key"
          ? "서버 설정 오류입니다."
          : "저장하지 못했습니다.";
    logAccess(ctx, {
      action: "update",
      resource: "inquiry",
      resourceId: input.id,
      subjectIds: [input.id],
      detail: `next_action 실패(${result.reason})`,
      outcome: status === 404 ? "denied" : "error",
    });
    return NextResponse.json({ error }, { status });
  }

  logAccess(ctx, {
    action: "update",
    resource: "inquiry",
    resourceId: input.id,
    subjectIds: [input.id],
    detail: "next_action",
  });
  return NextResponse.json({ success: true, text: input.text, due: input.due });
}
