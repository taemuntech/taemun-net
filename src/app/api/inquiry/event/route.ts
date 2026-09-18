import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { SUPABASE_URL } from "@/lib/supabase-url";
import { guardJsonWrite } from "@/lib/admin/request-guard";
import { parseInquiryEvent } from "@/lib/inquiry/events";

/** 탭 하나(sid)가 하루에 남길 수 있는 이벤트 수 — 넘으면 조용히 버린다(스크립트가 표를 채우지 못하게) */
const PER_SID_DAILY_MAX = 300;

const done = () => new NextResponse(null, { status: 204 });

/**
 * 견적 흐름 퍼널 계측 한 줄 — 화면(src/lib/inquiry/track.ts)이 keepalive 로 보낸다.
 *
 * 무엇을 받아도 204 만 돌려준다. 계측 실패가 방문자 화면의 오류로 번지면 안 되고,
 * 무엇이 막혔는지 알려 줄 이유도 없다. 모양 검사는 src/lib/inquiry/events.ts(개인정보 칸이 없다).
 */
export async function POST(request: Request) {
  if (guardJsonWrite(request)) return done();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return done();
  }
  const row = parseInquiryEvent(body);
  if (!row) return done();

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) return done();

  try {
    const db = createClient(SUPABASE_URL, serviceKey, { auth: { persistSession: false } });
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const counted = await db
      .from("inquiry_events")
      .select("id", { count: "exact", head: true })
      .eq("sid", row.sid)
      .gte("created_at", since);
    if ((counted.count ?? 0) >= PER_SID_DAILY_MAX) return done();

    const saved = await db.from("inquiry_events").insert([row]);
    if (saved.error) console.warn("inquiry event: insert failed:", saved.error.code);
  } catch (err) {
    console.warn("inquiry event: unexpected error:", err instanceof Error ? err.message : err);
  }
  return done();
}
