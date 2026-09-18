// 견적 문의 하나의 상태를 바꾼다. POST { id, status } → 200 { success:true }
// 순서는 다른 관리자 쓰기와 같다: 출처 검사 → 로그인 → 입력 검사 → service_role 저장.

import { NextResponse, type NextRequest } from "next/server";
import { guardAdminWrite } from "@/lib/admin/request-guard";
import { readAdminSession } from "@/lib/admin/session";
import { INQUIRY_STATUSES, isInquiryStatus, setInquiryStatus } from "@/lib/admin/inquiries";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: NextRequest) {
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
  const b = (typeof body === "object" && body !== null && !Array.isArray(body) ? body : {}) as Record<string, unknown>;
  const id = typeof b.id === "string" ? b.id : "";
  if (!UUID_RE.test(id)) return NextResponse.json({ error: "문의 id 가 올바르지 않습니다." }, { status: 400 });
  if (!isInquiryStatus(b.status)) {
    return NextResponse.json({ error: `status 는 ${INQUIRY_STATUSES.join(" | ")} 중 하나여야 합니다.` }, { status: 400 });
  }

  const result = await setInquiryStatus(id, b.status);
  if (result.error) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json({ success: true });
}
