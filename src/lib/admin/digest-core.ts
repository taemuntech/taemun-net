// 아침 요약 문자(08:30 KST)의 **본문 만들기** — 순수 모듈(런타임 import 없음, `import type` 만).
//
// 🔒 이 문자에는 **숫자만** 싣는다. 고객 이름·연락처·다음 할 일 글자·서비스 이름은 절대 넣지 않는다.
// 이유: 문자는 형 휴대폰 잠금 화면 미리보기·통신사·발송 대행사(솔라피) 기록에 남는다. 거기서 새면 우리가
// 지울 방법이 없다. 자세한 내용은 링크(로그인해야 열리는 「오늘」 화면)로만 본다.
// scripts/tests/admin-digest-core.test.mjs 가 이름·전화번호·할 일 글자가 새지 않는지 시험한다.
//
// 할 말이 없으면 null — 빈 문자를 매일 보내면 형이 문자를 안 읽게 된다(정작 급한 날도 안 읽는다).

import type { TodayBuckets } from "./today-core";

export type DigestInput = {
  buckets: TodayBuckets;
  purgeMode: "dry_run" | "live";
  /** 파기 작업이 하루 넘게 돌지 않았다 */
  purgeStale: boolean;
  /** 지난 7일 실제 파기 건수 — 월요일에만 넣는다(그 밖엔 null) */
  weeklyPurged: number | null;
  /** 마지막 줄에 붙는 주소 (taemun.net/admin/today) */
  url: string;
  /**
   * 확인 안 한 접수 이상(알림 문자 실패·저장 실패·1시간 한도 초과) 건수 합 — intake-core.openIntakeAlertCount.
   * 선택 값인 이유: 아침 문자 route(cron/digest)가 아직 넘기지 않아도 지금처럼 돈다. 넘기기 시작하면 한 줄이 붙는다.
   * 🔒 건수만. 어떤 문의였는지(접수번호)도 싣지 않는다 — 그건 로그인해야 열리는 설정 화면에서 본다.
   */
  intakeAlerts?: number;
};

const HEAD = "[태문넷 오늘]";

export function buildDigestText(input: DigestInput): string | null {
  const { buckets, purgeMode, purgeStale, weeklyPurged, url } = input;
  const counts: [string, number][] = [
    ["지남", buckets.overdue.length],
    ["오늘", buckets.today.length],
    ["3일 안", buckets.within3.length],
    ["새 문의", buckets.newInquiries.length],
    ["멈춤", buckets.stalled.length],
  ];
  const parts = counts.filter(([, n]) => n > 0).map(([label, n]) => `${label} ${n}`);

  const extra: string[] = [];
  if (buckets.purgeOverdue.count > 0) {
    extra.push(`파기 지연 ${buckets.purgeOverdue.count}${purgeMode === "dry_run" ? " (시험 모드)" : ""}`);
  }
  if (purgeStale) extra.push("파기 작업이 하루 넘게 돌지 않았습니다");
  if (weeklyPurged !== null && weeklyPurged > 0) extra.push(`지난 7일 파기 ${weeklyPurged}건`);
  // 접수 이상은 맨 앞에 — 문의를 잃었을 수 있다는 줄이라 파기 안내보다 급하다. 이 줄만 있어도 문자는 나간다
  // (다른 할 말이 없는 날 조용히 넘어가면 형은 저장 실패를 모른 채 하루를 보낸다).
  const intake = input.intakeAlerts ?? 0;
  if (Number.isFinite(intake) && intake > 0) extra.unshift(`접수 이상 ${Math.floor(intake)}건`);

  if (parts.length === 0 && extra.length === 0) return null;

  const first = parts.length ? `${HEAD} ${parts.join(" · ")}` : HEAD;
  return [first, ...extra, url].join("\n");
}

const KST_WEEKDAY = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Seoul", weekday: "short" });

/** 한국 시간으로 월요일인가 */
export function isMondayKst(d: Date): boolean {
  return KST_WEEKDAY.format(d) === "Mon";
}

/** 파기가 이만큼 넘게 안 돌았으면 「멈췄다」고 본다(매일 00:10 KST 한 번 + 여유 2시간) */
export const PURGE_STALE_MS = 26 * 60 * 60 * 1000;

/**
 * Postgres 가 글자로 내보낸 시각(「2026-09-19 03:10:00.123456+00」)도 읽는다.
 * Date.parse 는 공백 구분·「+00」 꼴을 환경마다 다르게 다뤄서, ISO 모양으로 고친 뒤 읽는다.
 */
export function parsePgTimestamp(raw: string): number {
  const direct = Date.parse(raw);
  const m = /^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}(?::\d{2})?)(\.\d+)?\s*(Z|[+-]\d{2}(?::?\d{2})?)?$/i.exec(raw.trim());
  if (!m) return direct;
  const frac = m[3] ? m[3].slice(0, 4) : "";
  let zone = m[4] ?? "Z";
  if (/^[+-]\d{2}$/.test(zone)) zone = `${zone}:00`;
  else if (/^[+-]\d{4}$/.test(zone)) zone = `${zone.slice(0, 3)}:${zone.slice(3)}`;
  const time = m[2].length === 5 ? `${m[2]}:00` : m[2];
  const fixed = Date.parse(`${m[1]}T${time}${frac}${zone.toUpperCase() === "Z" ? "Z" : zone}`);
  return Number.isFinite(fixed) ? fixed : direct;
}

/** 자체 시험 값 「ok <시각>」 에서 시각을 뽑는다. 「fail …」 은 시각이 없어 NaN */
function selftestMs(value: string | null): number {
  if (!value) return Number.NaN;
  const m = /^ok\s+(.+)$/i.exec(value.trim());
  if (!m) return Number.NaN;
  return parsePgTimestamp(m[1]);
}

/**
 * 파기 작업이 멈췄는가. 마지막 실행과 자체 시험(마이그레이션 적용 시각) 중 **더 최근 것**이 26시간보다 오래면 멈춤.
 * 둘 다 없으면 false — 아직 마이그레이션을 적용하지 않은 상태를 「멈춤」으로 경보하지 않는다.
 */
export function purgeIsStale(lastRunIso: string | null, selftestValue: string | null, now: Date): boolean {
  const candidates = [lastRunIso ? parsePgTimestamp(lastRunIso) : Number.NaN, selftestMs(selftestValue)].filter((n) =>
    Number.isFinite(n),
  );
  if (candidates.length === 0) return false;
  const newest = Math.max(...candidates);
  return now.getTime() - newest > PURGE_STALE_MS;
}

// ── 하루 한 통 보장(digest_last 기록) ────────────────────────────────────
//
// 왜 「보내기 전에 먼저 찜한다」인가(2026-09-19 수정 F8):
// - 예전에는 보낸 **뒤에** 기록했다. 예약 실행과 수동 「Run」(또는 Vercel 의 중복 호출)이 겹치면 둘 다
//   「오늘 기록 없음」을 읽고 둘 다 보냈다 — 형 휴대폰에 같은 문자가 두 통.
// - 또 실패한 날에도 오늘 날짜를 적어서, 원인을 고치고 다시 돌려도 「이미 보냄」으로 건너뛰었다.
// 이제 SQL 함수 crm_claim_digest 가 행을 잠그고 「보내는 중」을 먼저 적는다(한 번에 한 호출만 이긴다).
// 끝나면 route 가 결과를 state:"done" 으로 덮는다. 실패로 끝난 날(보냄 아님·건너뜀 아님)은 다시 찜할 수 있다.
// 「보내는 중」이 10분 넘게 그대로면 도중에 죽은 호출로 보고 다시 찜할 수 있다.
//
// canClaimDigest 는 SQL 함수와 **같은 규칙**을 글자로 적은 것이다 — 가짜 데이터(crm-fixture)가 쓰고, 시험이 규칙을 못 박는다.

export type DigestRecord = {
  /** KST 「YYYY-MM-DD」 */
  date: string;
  at: string;
  sent: boolean;
  skipped: "nothing" | null;
  error: string | null;
  summary: string;
  /** "sending" = 찜만 하고 아직 끝나지 않음. 옛 기록에는 없다(= 끝난 기록) */
  state?: "sending" | "done";
};

/** 「보내는 중」 찜이 이만큼 넘게 그대로면 도중에 죽은 호출로 본다(SQL crm_claim_digest 와 같은 값) */
export const DIGEST_CLAIM_STALE_MS = 10 * 60 * 1000;

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/** crm_settings.digest_last 글자 → 기록. 모양이 이상하면 null(화면이 「기록 없음」으로 보인다) */
export function parseDigestRecord(raw: string | null): DigestRecord | null {
  if (!raw) return null;
  let v: unknown;
  try {
    v = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!isRecord(v)) return null;
  if (typeof v.date !== "string" || typeof v.at !== "string") return null;
  const rec: DigestRecord = {
    date: v.date,
    at: v.at,
    sent: v.sent === true,
    skipped: v.skipped === "nothing" ? "nothing" : null,
    error: typeof v.error === "string" ? v.error : null,
    summary: typeof v.summary === "string" ? v.summary : "",
  };
  if (v.state === "sending" || v.state === "done") rec.state = v.state;
  return rec;
}

/** 찜한 지 10분이 안 된 「보내는 중」 기록인가 — 설정 화면이 「보내는 중」으로 보여 준다 */
export function isDigestSendingFresh(rec: DigestRecord | null, nowMs: number): boolean {
  if (!rec || rec.state !== "sending") return false;
  const at = parsePgTimestamp(rec.at);
  if (!Number.isFinite(at)) return false;
  return nowMs - at < DIGEST_CLAIM_STALE_MS;
}

/**
 * 오늘(date) 아침 문자를 이 호출이 찜해도 되는가 — SQL crm_claim_digest 와 같은 규칙.
 * - 기록이 없거나 JSON 객체가 아니면 → 찜한다
 * - 다른 날 기록 → 찜한다
 * - 같은 날: 보냄·「알릴 것 없음」 → 안 찜한다. 그 밖(실패)은 「보내는 중」이 10분 안이면 안 찜하고, 아니면 찜한다.
 * @param updatedAtMs 그 행을 마지막으로 쓴 시각(ms). 모르면 NaN — 「보내는 중」을 오래된 것으로 본다.
 */
export function canClaimDigest(existingRaw: string | null, date: string, nowMs: number, updatedAtMs: number): boolean {
  if (!existingRaw) return true;
  let v: unknown;
  try {
    v = JSON.parse(existingRaw);
  } catch {
    return true;
  }
  if (!isRecord(v)) return true;
  if (v.date !== date) return true;
  if (v.sent === true) return false;
  if (v.skipped !== null && v.skipped !== undefined) return false;
  if (v.state !== "sending") return true;
  return !(Number.isFinite(updatedAtMs) && updatedAtMs >= nowMs - DIGEST_CLAIM_STALE_MS);
}
