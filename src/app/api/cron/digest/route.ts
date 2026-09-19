// 아침 요약 문자 — Vercel Cron 이 매일 08:30 KST(23:30 UTC, vercel.json) 에 GET 으로 부른다.
//
// 왜 있나: 형은 관리자 화면을 매일 열지 않는다. 그래서 「오늘 챙길 것」이 있는 날만 숫자 한 줄을 문자로 받는다
// (지남 2 · 오늘 1 · 새 문의 1 …) + 파기가 밀렸거나 멈췄으면 그 경보. 할 말이 없는 날은 보내지 않는다.
// 🔒 문자에는 **숫자만** 싣는다 — 이름·연락처·할 일 글자·서비스 이름은 넣지 않는다(digest-core.ts 주석·시험).
//
// 문지기:
// - CRON_SECRET 이 없으면 503 — Vercel 은 이 값이 있을 때만 `Authorization: Bearer <값>` 을 붙여 부른다.
//   값이 없는데 열어 두면 아무나 주소를 불러 형에게 문자를 보내게 만들 수 있다.
// - 헤더 비교는 sha256 후 timingSafeEqual(길이가 달라도 시간이 새지 않게).
// - 프리뷰·개발 배포에서는 503(운영 데이터로 문자를 보내지 않는다).
// - 하루 한 통: 보내기 **전에** SQL 함수 crm_claim_digest 로 그날 몫을 찜한다(행 잠금 — 예약 실행과 수동 「Run」,
//   Vercel 의 중복 호출이 겹쳐도 한 호출만 이긴다). 못 찜하면 { skipped: "already-sent" }.
//   이미 보냈거나 「알릴 것 없음」이던 날은 다시 안 보낸다. **실패로 끝난 날은 다시 돌리면 보낸다**
//   (예전에는 실패한 날도 날짜를 적어 재실행이 막혔다). 찜만 하고 죽은 호출은 10분 뒤 다시 찜할 수 있다.
//   끝나면 결과를 state:"done" 으로 덮는다(digest-core.canClaimDigest 가 같은 규칙을 글자로 적어 두었다).

import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { sendSms } from "@/lib/solapi";
import {
  claimDigest,
  countPurgedSince,
  getCrmSettings,
  listTodayRows,
  setDigestLast,
  type DigestRecord,
} from "@/lib/admin/crm-store";
import { buildDigestText, isMondayKst, purgeIsStale } from "@/lib/admin/digest-core";
import { isNonProductionDeployment } from "@/lib/admin/env";
import { adminReceiverPhone } from "@/lib/admin/notify";
import { buildToday, kstDate } from "@/lib/admin/today-core";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const DIGEST_URL = "taemun.net/admin/today";

function sameSecret(given: string, expected: string): boolean {
  const a = createHash("sha256").update(given, "utf8").digest();
  const b = createHash("sha256").update(expected, "utf8").digest();
  return timingSafeEqual(a, b);
}

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET ?? "";
  if (!secret) {
    console.error("cron/digest: CRON_SECRET 이 없어 보내지 않습니다");
    return NextResponse.json({ error: "서버 설정 오류입니다." }, { status: 503 });
  }
  if (!sameSecret(req.headers.get("authorization") ?? "", `Bearer ${secret}`)) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }
  if (isNonProductionDeployment()) {
    return NextResponse.json({ error: "서버 설정 오류입니다." }, { status: 503 });
  }

  const now = new Date();
  const today = kstDate(now);

  const settings = await getCrmSettings();
  if (!settings.ok) {
    // 오늘 이미 보냈는지 모르는 채로 보내면 두 통이 갈 수 있다 — 보내지 않는다
    console.error("cron/digest: 설정을 읽지 못해 보내지 않습니다:", settings.reason, settings.message);
    return NextResponse.json({ error: "설정을 읽지 못했습니다." }, { status: settings.reason === "no-service-key" ? 503 : 502 });
  }

  // 보내기 전에 그날 몫을 찜한다 — 못 읽거나 못 찜하면 보내지 않는다(두 통보다 0통이 낫다. 다시 돌리면 된다)
  const claim = await claimDigest(today);
  if (!claim.ok) {
    console.error("cron/digest: 오늘 몫을 찜하지 못해 보내지 않습니다:", claim.reason, claim.message);
    return NextResponse.json({ error: "기록을 쓰지 못했습니다." }, { status: claim.reason === "no-service-key" ? 503 : 502 });
  }
  if (!claim.data) {
    return NextResponse.json({ success: true, skipped: "already-sent" });
  }

  const record = async (r: Omit<DigestRecord, "date" | "at" | "state">): Promise<boolean> =>
    setDigestLast({ date: today, at: new Date().toISOString(), state: "done", ...r });

  const rows = await listTodayRows();
  if (!rows.ok) {
    console.error("cron/digest: 문의를 읽지 못했습니다:", rows.reason, rows.message);
    await record({ sent: false, skipped: null, error: `문의를 읽지 못했습니다 (${rows.reason})`, summary: "" });
    return NextResponse.json({ error: "문의를 읽지 못했습니다." }, { status: 502 });
  }

  const buckets = buildToday(rows.data, now);
  let weeklyPurged: number | null = null;
  if (isMondayKst(now)) {
    const purged = await countPurgedSince(new Date(now.getTime() - 7 * 86_400_000).toISOString());
    weeklyPurged = purged.ok ? purged.data : null;
  }

  const text = buildDigestText({
    buckets,
    purgeMode: settings.data.purgeMode,
    purgeStale: purgeIsStale(settings.data.purgeLastRun, settings.data.purgeSelftest, now),
    weeklyPurged,
    url: DIGEST_URL,
  });

  if (text === null) {
    const saved = await record({ sent: false, skipped: "nothing", error: null, summary: "챙길 것 없음" });
    return NextResponse.json({ success: true, sent: false, skipped: "nothing", recorded: saved });
  }

  // 요약에는 첫 줄(숫자)만 남긴다 — 본문 전체도 숫자뿐이지만, 기록은 짧을수록 좋다
  const summary = text.split("\n")[0].slice(0, 200);
  const result = await sendSms(adminReceiverPhone(), text);
  const error = result.success ? null : String(("error" in result && result.error) || "발송 실패").slice(0, 200);
  if (!result.success) console.error("cron/digest: 문자 발송 실패:", error);
  const saved = await record({ sent: result.success, skipped: null, error, summary });

  return NextResponse.json({ success: true, sent: result.success, recorded: saved, ...(error ? { error } : {}) });
}
