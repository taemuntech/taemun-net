// 관리대장(P1b) 데이터 층 — 기기(admin_sessions)·접속기록(admin_access_log)·문의 상태 전이·다음 할 일·
// 파기 설정/기록(crm_settings·purge_log)을 **이 파일 한 곳에서만** 읽고 쓴다. 서버 전용.
//
// 왜 한 곳에 모으나:
// - 표 여섯 개가 전부 공개 키로는 못 읽는다(마이그레이션 20260919120000 이 anon·authenticated·PUBLIC 을 회수).
//   service_role 로만 다루고, 키가 없으면 조용히 빈 목록을 주지 않고 `no-service-key` 로 알린다(store.ts 와 같은 원칙).
// - 절대 던지지 않는다. 실패는 값(CrmResult)으로 돌려준다 — 관리자 화면 하나가 DB 장애로 500 이 나면
//   급할 때 「전부 내리기」 화면까지 같이 죽는다.
// - 개발·검증용 가짜 데이터(crm-fixture.ts)가 켜져 있으면 데이터베이스를 아예 건드리지 않고 그쪽으로 보낸다.
//
// 🔒 개인정보 원칙:
// - 「오늘」 목록(listTodayRows)은 이름·연락처·이메일·내용 칸을 **고르지 않는다**. 필요 없는 칸은 읽지도 않는다.
// - 접속기록에는 다음 할 일 글자·고객 이름을 넣지 않는다(부르는 쪽 규칙 — detail 은 「무엇을 바꿨나」만).
// - 상태 전이는 SQL 함수 inquiry_transition 이 표 갱신 + 이력 한 줄을 **한 트랜잭션**으로 한다.
//   여기서 update 두 번으로 흉내 내면 둘 중 하나만 남는 날이 생긴다.

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "@/lib/supabase-url";
import { crmFixture, crmFixtureEnabled } from "./crm-fixture";
import { isUuid, type ClosedReason, type InquiryStatus, type PurgeMode } from "./crm-input";
import type { TodayRow } from "./today-core";
import { parseDigestRecord, type DigestRecord } from "./digest-core";
import {
  acknowledgeIntakeAlerts,
  acknowledgeSummary,
  mergeIntakeAlert,
  parseIntakeAlerts,
  shouldSendCapNotice,
  type IntakeAlertEvent,
  type IntakeAlertMap,
  type IntakeAlertSeen,
} from "@/lib/inquiry/intake-core";

// 아침 문자 기록의 모양·읽기는 순수 모듈(digest-core)에 둔다 — 시험이 그대로 불러 쓴다. 예전 import 자리를 위해 다시 내보낸다.
export { parseDigestRecord, type DigestRecord };

export type CrmFailure = {
  ok: false;
  reason: "no-service-key" | "db-error" | "not-found" | "invalid" | "purged";
  message: string;
};
export type CrmResult<T> = { ok: true; data: T } | CrmFailure;

// ── 타입 ────────────────────────────────────────────────────────────

export type SessionRow = {
  id: string;
  actor: string;
  createdAt: string;
  lastSeenAt: string | null;
  expiresAt: string;
  revokedAt: string | null;
  revokedReason: string | null;
  ip: string | null;
  ua: string | null;
};

export const ACCESS_ACTIONS = [
  "view",
  "update",
  "login",
  "login_fail",
  "logout",
  "session_revoke",
  "setting",
  "purge_run",
  "export",
] as const;
export type AccessAction = (typeof ACCESS_ACTIONS)[number];

export type AccessLogInput = {
  actor: string;
  sessionId: string | null;
  ip: string;
  ua: string;
  method: string;
  route: string;
  action: AccessAction;
  resource: string | null;
  resourceId: string | null;
  subjectIds: string[] | null;
  detail: string | null;
  outcome: "ok" | "denied" | "error";
};
export type AccessLogRow = AccessLogInput & { id: number; at: string };

export type StatusLogRow = {
  id: number;
  inquiryId: string;
  fromStatus: string | null;
  toStatus: string;
  closedReason: string | null;
  note: string | null;
  actor: string;
  at: string;
};

export type TransitionArgs = {
  id: string;
  to: InquiryStatus;
  closedReason: ClosedReason | null;
  note: string | null;
  actor: string;
  sessionId: string | null;
};
export type TransitionResult = { changed: boolean; from: string; to: string };

export type NextActionArgs = { id: string; text: string | null; due: string | null };

export type CrmSettings = {
  purgeMode: PurgeMode;
  purgeCap: number;
  purgeLastRun: string | null;
  purgeSelftest: string | null;
  digestLast: DigestRecord | null;
  /** 접수 이상 기록(종류별). 기록이 없거나 모양이 이상하면 {} — intake-core.parseIntakeAlerts */
  intakeAlerts: IntakeAlertMap;
  /**
   * intake_alert 행이 있는가 — 마이그레이션 20260920090000 이 행을 `{}` 로 심는다. 없으면 기록 쓰기가 전부 실패하고 있는
   * 것이라(키 목록 제약 23514) 화면이 「이상 없음」 초록 대신 「아직 기록할 수 없음」을 보여야 한다. 빈 기록과 못 쓰는 기록을 가른다.
   */
  intakeAlertReady: boolean;
};

export type PurgeLogRow = {
  id: number;
  runAt: string;
  mode: string;
  trigger: string;
  target: string;
  rowCount: number;
  outcome: string;
  note: string | null;
};

// ── 공통 ────────────────────────────────────────────────────────────

const NO_KEY: CrmFailure = {
  ok: false,
  reason: "no-service-key",
  message: "서버 설정 오류입니다. (SUPABASE_SERVICE_ROLE_KEY 없음)",
};

let cachedClient: SupabaseClient | null = null;

/**
 * 데이터베이스 요청 하나가 기다리는 최대 시간.
 *
 * 왜: 관리자 확인(guard)이 이 클라이언트로 로그인 기기를 읽는다. Supabase 가 오류를 **돌려주면** 긴급 스위치는
 * 그대로 열리지만(basic 범위는 읽기 실패를 통과로 본다), **대답 없이 매달리면** 요청이 플랫폼 시간 제한까지 멈춘다 —
 * 항의 전화를 받으며 「전부 내리기」를 누르는 순간이 그때일 수 있다. 공개 상태 읽기(portfolio/state.ts)와 같은 4초로 끊어
 * 「매달림」도 「실패」로 바꾼다.
 */
export const CRM_DB_TIMEOUT_MS = 4000;

/** 요청마다 시간 제한을 거는 fetch — 부르는 쪽이 이미 signal 을 줬으면 그것을 존중한다 */
export const timedFetch: typeof fetch = (input, init) =>
  fetch(input, { ...init, signal: init?.signal ?? AbortSignal.timeout(CRM_DB_TIMEOUT_MS) });

function serviceClient(): SupabaseClient | null {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return null;
  if (!cachedClient) {
    cachedClient = createClient(SUPABASE_URL, key, { auth: { persistSession: false }, global: { fetch: timedFetch } });
  }
  return cachedClient;
}

/** 가짜 데이터가 켜져 있거나 service_role 키가 있으면 true */
export function crmAvailable(): boolean {
  return crmFixtureEnabled() || Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);
}

type PgError = { code?: string; message?: string } | null;

function dbFail(where: string, e: unknown): CrmFailure {
  const err = e as PgError;
  const code = typeof err?.code === "string" ? err.code : null;
  const msg = e instanceof Error ? e.message : typeof err?.message === "string" ? err.message : String(e);
  console.error(`admin crm-store: ${where} failed:`, code ?? "", msg);
  return { ok: false, reason: "db-error", message: code ? `데이터베이스 오류 (${code})` : "데이터베이스 오류" };
}

function clip(v: string | null | undefined, max: number): string | null {
  if (typeof v !== "string") return null;
  return v.length > max ? v.slice(0, max) : v;
}

function str(v: unknown): string | null {
  return typeof v === "string" ? v : null;
}

function num(v: unknown): number {
  return typeof v === "number" ? v : Number(v ?? 0) || 0;
}

function rec(v: unknown): Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
}

// ── 기기(admin_sessions) ─────────────────────────────────────────────

const SESSION_COLUMNS = "id,actor,created_at,last_seen_at,expires_at,revoked_at,revoked_reason,ip,ua";

function toSessionRow(raw: unknown): SessionRow {
  const r = rec(raw);
  return {
    id: String(r.id ?? ""),
    actor: String(r.actor ?? ""),
    createdAt: String(r.created_at ?? ""),
    lastSeenAt: str(r.last_seen_at),
    expiresAt: String(r.expires_at ?? ""),
    revokedAt: str(r.revoked_at),
    revokedReason: str(r.revoked_reason),
    ip: str(r.ip),
    ua: str(r.ua),
  };
}

export async function createAdminSession(args: {
  id: string;
  actor: string;
  expiresAt: Date;
  ip: string;
  ua: string;
}): Promise<CrmResult<null>> {
  if (crmFixtureEnabled()) return crmFixture().createAdminSession(args);
  const db = serviceClient();
  if (!db) return NO_KEY;
  try {
    const nowIso = new Date().toISOString();
    const res = await db.from("admin_sessions").insert({
      id: args.id,
      actor: args.actor,
      expires_at: args.expiresAt.toISOString(),
      last_seen_at: nowIso,
      ip: clip(args.ip, 64),
      ua: clip(args.ua, 300),
    });
    if (res.error) return dbFail("createAdminSession", res.error);
    lastTouched.set(args.id, Date.now());
    return { ok: true, data: null };
  } catch (e) {
    return dbFail("createAdminSession", e);
  }
}

export async function getAdminSession(id: string): Promise<CrmResult<SessionRow | null>> {
  if (crmFixtureEnabled()) return crmFixture().getAdminSession(id);
  if (!isUuid(id)) return { ok: true, data: null };
  const db = serviceClient();
  if (!db) return NO_KEY;
  try {
    const res = await db.from("admin_sessions").select(SESSION_COLUMNS).eq("id", id).maybeSingle();
    if (res.error) return dbFail("getAdminSession", res.error);
    return { ok: true, data: res.data ? toSessionRow(res.data) : null };
  } catch (e) {
    return dbFail("getAdminSession", e);
  }
}

/** 마지막 사용 시각은 5분에 한 번만 쓴다 — 화면을 열 때마다 쓰면 DB 쓰기가 조회 수만큼 늘어난다 */
const TOUCH_INTERVAL_MS = 5 * 60 * 1000;
/** 이 인스턴스가 최근에 쓴 시각(DB 조건과 이중으로 거른다 — 서버리스라 인스턴스마다 따로 논다) */
const lastTouched = new Map<string, number>();

export async function touchAdminSession(id: string): Promise<void> {
  if (!isUuid(id)) return;
  const nowMs = Date.now();
  const prev = lastTouched.get(id);
  if (prev !== undefined && nowMs - prev < TOUCH_INTERVAL_MS) return;
  lastTouched.set(id, nowMs);
  if (lastTouched.size > 200) {
    for (const [k, t] of lastTouched) if (nowMs - t >= TOUCH_INTERVAL_MS) lastTouched.delete(k);
  }
  if (crmFixtureEnabled()) {
    await crmFixture().touchAdminSession(id);
    return;
  }
  const db = serviceClient();
  if (!db) return;
  try {
    const cutoff = new Date(nowMs - TOUCH_INTERVAL_MS).toISOString();
    const res = await db
      .from("admin_sessions")
      .update({ last_seen_at: new Date(nowMs).toISOString() })
      .eq("id", id)
      .is("revoked_at", null)
      .or(`last_seen_at.is.null,last_seen_at.lt.${cutoff}`);
    if (res.error) console.warn("admin crm-store: touchAdminSession failed:", res.error.code);
  } catch (e) {
    console.warn("admin crm-store: touchAdminSession threw:", e instanceof Error ? e.message : e);
  }
}

export async function revokeAdminSession(id: string, reason: string): Promise<CrmResult<null>> {
  if (crmFixtureEnabled()) return crmFixture().revokeAdminSession(id, reason);
  if (!isUuid(id)) return { ok: false, reason: "not-found", message: "그 기기를 찾지 못했습니다." };
  const db = serviceClient();
  if (!db) return NO_KEY;
  try {
    const res = await db
      .from("admin_sessions")
      .update({ revoked_at: new Date().toISOString(), revoked_reason: clip(reason, 100) })
      .eq("id", id)
      .is("revoked_at", null)
      .select("id");
    if (res.error) return dbFail("revokeAdminSession", res.error);
    if (res.data && res.data.length > 0) return { ok: true, data: null };
    // 이미 해제된 기기면 성공으로 본다(두 번 누름). 아예 없으면 not-found.
    const existing = await getAdminSession(id);
    if (!existing.ok) return existing;
    if (!existing.data) return { ok: false, reason: "not-found", message: "그 기기를 찾지 못했습니다." };
    return { ok: true, data: null };
  } catch (e) {
    return dbFail("revokeAdminSession", e);
  }
}

/** keepId 말고 살아 있는 기기를 모두 해제한다. 해제한 개수를 돌려준다 */
export async function revokeOtherAdminSessions(keepId: string | null, reason: string): Promise<CrmResult<number>> {
  if (crmFixtureEnabled()) return crmFixture().revokeOtherAdminSessions(keepId, reason);
  const db = serviceClient();
  if (!db) return NO_KEY;
  try {
    const nowIso = new Date().toISOString();
    let q = db
      .from("admin_sessions")
      .update({ revoked_at: nowIso, revoked_reason: clip(reason, 100) })
      .is("revoked_at", null)
      .gt("expires_at", nowIso);
    if (keepId && isUuid(keepId)) q = q.neq("id", keepId);
    const res = await q.select("id");
    if (res.error) return dbFail("revokeOtherAdminSessions", res.error);
    return { ok: true, data: res.data?.length ?? 0 };
  } catch (e) {
    return dbFail("revokeOtherAdminSessions", e);
  }
}

/** 살아 있는 기기 먼저(최근 사용순), 그다음 해제·만료된 기기 최근 10개 */
export async function listAdminSessions(): Promise<CrmResult<SessionRow[]>> {
  if (crmFixtureEnabled()) return crmFixture().listAdminSessions();
  const db = serviceClient();
  if (!db) return NO_KEY;
  try {
    const nowIso = new Date().toISOString();
    const [active, ended] = await Promise.all([
      db
        .from("admin_sessions")
        .select(SESSION_COLUMNS)
        .is("revoked_at", null)
        .gt("expires_at", nowIso)
        .order("last_seen_at", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false })
        .limit(50),
      db
        .from("admin_sessions")
        .select(SESSION_COLUMNS)
        .or(`revoked_at.not.is.null,expires_at.lte.${nowIso}`)
        .order("created_at", { ascending: false })
        .limit(10),
    ]);
    if (active.error) return dbFail("listAdminSessions(active)", active.error);
    if (ended.error) return dbFail("listAdminSessions(ended)", ended.error);
    return { ok: true, data: [...(active.data ?? []), ...(ended.data ?? [])].map(toSessionRow) };
  } catch (e) {
    return dbFail("listAdminSessions", e);
  }
}

// ── 접속기록(admin_access_log) ───────────────────────────────────────

function accessRowToDb(e: AccessLogInput): Record<string, unknown> {
  const subjects = (e.subjectIds ?? []).filter(isUuid).map((s) => s.toLowerCase());
  return {
    actor: clip(e.actor, 40) ?? "owner",
    session_id: e.sessionId && isUuid(e.sessionId) ? e.sessionId : null,
    ip: clip(e.ip, 64),
    ua: clip(e.ua, 300),
    method: clip(e.method, 10),
    route: clip(e.route, 200),
    action: e.action,
    resource: clip(e.resource, 60),
    resource_id: clip(e.resourceId, 100),
    subject_ids: subjects.length ? subjects : null,
    detail: clip(e.detail, 300),
    outcome: e.outcome,
  };
}

/** 한 줄 쓴다. 실패해도 던지지 않고 false */
export async function insertAccessLog(e: AccessLogInput): Promise<boolean> {
  if (crmFixtureEnabled()) return crmFixture().insertAccessLog(e);
  const db = serviceClient();
  if (!db) {
    console.error("admin crm-store: 접속기록을 남기지 못했습니다 — SUPABASE_SERVICE_ROLE_KEY 없음");
    return false;
  }
  try {
    const res = await db.from("admin_access_log").insert(accessRowToDb(e));
    if (res.error) {
      console.error("admin crm-store: insertAccessLog failed:", res.error.code, res.error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error("admin crm-store: insertAccessLog threw:", err instanceof Error ? err.message : err);
    return false;
  }
}

function toAccessRow(raw: unknown): AccessLogRow {
  const r = rec(raw);
  const action = str(r.action);
  const outcome = str(r.outcome);
  return {
    id: num(r.id),
    at: String(r.at ?? ""),
    actor: String(r.actor ?? ""),
    sessionId: str(r.session_id),
    ip: String(r.ip ?? ""),
    ua: String(r.ua ?? ""),
    method: String(r.method ?? ""),
    route: String(r.route ?? ""),
    action: (ACCESS_ACTIONS as readonly string[]).includes(action ?? "") ? (action as AccessAction) : "view",
    resource: str(r.resource),
    resourceId: str(r.resource_id),
    subjectIds: Array.isArray(r.subject_ids) ? r.subject_ids.filter((s): s is string => typeof s === "string") : null,
    detail: str(r.detail),
    outcome: outcome === "denied" || outcome === "error" ? outcome : "ok",
  };
}

export type ListAccessLogOptions = {
  /** 이 시각(ISO) 이후 줄만 */
  sinceIso?: string;
  /** 최대 줄 수(기본 50, 상한 1000) */
  limit?: number;
  /** 빼고 읽을 동작 — 예: 비밀번호 틀림(login_fail)은 건수로만 따로 센다 */
  excludeActions?: AccessAction[];
};

/** 줄 수 상한 — 설정 화면이 35일치를 한 번에 읽는다(월 1회 점검). 넘으면 잘렸다고 화면이 알린다 */
export const ACCESS_LOG_MAX_LIMIT = 1000;

export function accessLogLimit(limit: number | undefined): number {
  return Math.min(ACCESS_LOG_MAX_LIMIT, Math.max(1, Math.floor(limit ?? 50) || 50));
}

function validActions(list: AccessAction[] | undefined): AccessAction[] {
  return (list ?? []).filter((a) => (ACCESS_ACTIONS as readonly string[]).includes(a));
}

export async function listAccessLog(opts: ListAccessLogOptions = {}): Promise<CrmResult<AccessLogRow[]>> {
  if (crmFixtureEnabled()) return crmFixture().listAccessLog(opts);
  const db = serviceClient();
  if (!db) return NO_KEY;
  const n = accessLogLimit(opts.limit);
  const exclude = validActions(opts.excludeActions);
  try {
    let q = db
      .from("admin_access_log")
      .select("id,at,actor,session_id,ip,ua,method,route,action,resource,resource_id,subject_ids,detail,outcome");
    if (opts.sinceIso) q = q.gte("at", opts.sinceIso);
    if (exclude.length) q = q.not("action", "in", `(${exclude.join(",")})`);
    const res = await q.order("at", { ascending: false }).order("id", { ascending: false }).limit(n);
    if (res.error) return dbFail("listAccessLog", res.error);
    return { ok: true, data: (res.data ?? []).map(toAccessRow) };
  } catch (e) {
    return dbFail("listAccessLog", e);
  }
}

/** 접속기록 건수만 센다(줄은 읽지 않는다) — 비밀번호 틀림 몇 번 같은 요약용 */
export async function countAccessLog(opts: { sinceIso?: string; action?: AccessAction }): Promise<CrmResult<number>> {
  if (crmFixtureEnabled()) return crmFixture().countAccessLog(opts);
  const db = serviceClient();
  if (!db) return NO_KEY;
  try {
    let q = db.from("admin_access_log").select("id", { count: "exact", head: true });
    if (opts.sinceIso) q = q.gte("at", opts.sinceIso);
    if (opts.action && (ACCESS_ACTIONS as readonly string[]).includes(opts.action)) q = q.eq("action", opts.action);
    const res = await q;
    if (res.error) return dbFail("countAccessLog", res.error);
    return { ok: true, data: res.count ?? 0 };
  } catch (e) {
    return dbFail("countAccessLog", e);
  }
}

// ── 문의: 상태 전이·다음 할 일·이력·「오늘」 ─────────────────────────

/** SQL 함수 inquiry_transition 의 오류 코드 → 실패 이유 */
function transitionFailure(err: { code?: string; message?: string }): CrmFailure {
  switch (err.code) {
    case "22023":
      // 함수가 던지는 문장은 형이 읽을 한국어다(「종료 사유가 필요합니다」 등) — 그대로 보여 준다
      return {
        ok: false,
        reason: "invalid",
        message: typeof err.message === "string" && err.message ? err.message : "그 상태로는 바꿀 수 없습니다.",
      };
    case "P0002":
      return { ok: false, reason: "not-found", message: "그 문의를 찾지 못했습니다." };
    case "55000":
      return { ok: false, reason: "purged", message: "보관 기간이 지나 파기된 문의입니다." };
    default:
      return dbFail("transitionInquiry", err);
  }
}

export async function transitionInquiry(args: TransitionArgs): Promise<CrmResult<TransitionResult>> {
  if (crmFixtureEnabled()) return crmFixture().transitionInquiry(args);
  const db = serviceClient();
  if (!db) return NO_KEY;
  try {
    const res = await db.rpc("inquiry_transition", {
      p_id: args.id,
      p_to: args.to,
      p_closed_reason: args.closedReason,
      p_note: args.note,
      p_actor: clip(args.actor, 40) ?? "owner",
      p_session: args.sessionId && isUuid(args.sessionId) ? args.sessionId : null,
    });
    if (res.error) return transitionFailure(res.error);
    const r = rec(res.data);
    return { ok: true, data: { changed: r.changed === true, from: String(r.from ?? ""), to: String(r.to ?? args.to) } };
  } catch (e) {
    return dbFail("transitionInquiry", e);
  }
}

export async function setInquiryNextAction(args: NextActionArgs): Promise<CrmResult<null>> {
  if (crmFixtureEnabled()) return crmFixture().setInquiryNextAction(args);
  const db = serviceClient();
  if (!db) return NO_KEY;
  try {
    const res = await db
      .from("inquiries")
      .update({ next_action: args.text, next_action_due: args.due, updated_at: new Date().toISOString() })
      .eq("id", args.id)
      .is("purged_at", null)
      .select("id");
    if (res.error) return dbFail("setInquiryNextAction", res.error);
    if (!res.data || res.data.length === 0) {
      return { ok: false, reason: "not-found", message: "그 문의를 찾지 못했습니다." };
    }
    return { ok: true, data: null };
  } catch (e) {
    return dbFail("setInquiryNextAction", e);
  }
}

const STATUS_LOG_PER_INQUIRY = 5;

function toStatusLogRow(raw: unknown): StatusLogRow {
  const r = rec(raw);
  return {
    id: num(r.id),
    inquiryId: String(r.inquiry_id ?? ""),
    fromStatus: str(r.from_status),
    toStatus: String(r.to_status ?? ""),
    closedReason: str(r.closed_reason),
    note: str(r.note),
    actor: String(r.actor ?? ""),
    at: String(r.at ?? ""),
  };
}

/** 문의별 최근 상태 이력 5줄(최신순) */
export async function listStatusLog(inquiryIds: string[]): Promise<CrmResult<Record<string, StatusLogRow[]>>> {
  if (crmFixtureEnabled()) return crmFixture().listStatusLog(inquiryIds);
  const ids = [...new Set(inquiryIds.filter(isUuid).map((s) => s.toLowerCase()))];
  if (ids.length === 0) return { ok: true, data: {} };
  const db = serviceClient();
  if (!db) return NO_KEY;
  try {
    const res = await db
      .from("inquiry_status_log")
      .select("id,inquiry_id,from_status,to_status,closed_reason,note,actor,at")
      .in("inquiry_id", ids)
      .order("at", { ascending: false })
      .order("id", { ascending: false })
      .limit(Math.min(1000, ids.length * 20));
    if (res.error) return dbFail("listStatusLog", res.error);
    return { ok: true, data: groupStatusLog((res.data ?? []).map(toStatusLogRow)) };
  } catch (e) {
    return dbFail("listStatusLog", e);
  }
}

/** 최신순으로 들어온 줄을 문의별 5줄로 묶는다(가짜 데이터도 같이 쓴다) */
export function groupStatusLog(rows: StatusLogRow[]): Record<string, StatusLogRow[]> {
  const out: Record<string, StatusLogRow[]> = {};
  for (const row of rows) {
    const list = (out[row.inquiryId] ??= []);
    if (list.length < STATUS_LOG_PER_INQUIRY) list.push(row);
  }
  return out;
}

/** 「오늘」 화면이 고르는 칸 — 이름·연락처·이메일·내용은 **읽지 않는다** */
const TODAY_COLUMNS =
  "id,request_no,created_at,status,services,next_action,next_action_due,updated_at,retain_until,retention_basis,purged_at";
const TODAY_PAGE = 1000;
/** 안전 상한(20만 행) — 넘으면 멈추고 알린다. 조용히 잘리면 「오늘」이 거짓말을 한다 */
const TODAY_MAX_PAGES = 200;

export function toTodayRow(raw: unknown): TodayRow {
  const r = rec(raw);
  return {
    id: String(r.id ?? ""),
    requestNo: str(r.request_no),
    createdAt: String(r.created_at ?? ""),
    status: String(r.status ?? "pending"),
    services: Array.isArray(r.services) ? r.services.filter((s): s is string => typeof s === "string") : null,
    nextAction: str(r.next_action),
    nextActionDue: str(r.next_action_due),
    updatedAt: str(r.updated_at),
    retainUntil: str(r.retain_until),
    retentionBasis: String(r.retention_basis ?? "inquiry"),
    purgedAt: str(r.purged_at),
  };
}

/**
 * 파기 안 된 행 전부(파기 기한이 지난 행 포함). 1000 행씩 끝까지 넘겨 읽는다 —
 * PostgREST 는 범위 없는 select 를 1000 행에서 **조용히** 자른다(태문브릿지에서 한 번 당했다).
 */
export async function listTodayRows(): Promise<CrmResult<TodayRow[]>> {
  if (crmFixtureEnabled()) return crmFixture().listTodayRows();
  const db = serviceClient();
  if (!db) return NO_KEY;
  const out: TodayRow[] = [];
  try {
    for (let page = 0; page < TODAY_MAX_PAGES; page++) {
      const from = page * TODAY_PAGE;
      const res = await db
        .from("inquiries")
        .select(TODAY_COLUMNS)
        .is("purged_at", null)
        .order("created_at", { ascending: false })
        .order("id", { ascending: true })
        .range(from, from + TODAY_PAGE - 1);
      if (res.error) return dbFail("listTodayRows", res.error);
      const rows = res.data ?? [];
      for (const raw of rows) out.push(toTodayRow(raw));
      if (rows.length < TODAY_PAGE) return { ok: true, data: out };
    }
    console.error("admin crm-store: listTodayRows 가 안전 상한을 넘었습니다 — 목록이 잘렸을 수 있습니다");
    return { ok: false, reason: "db-error", message: "문의가 너무 많아 다 읽지 못했습니다." };
  } catch (e) {
    return dbFail("listTodayRows", e);
  }
}

// ── 설정·파기 기록 ───────────────────────────────────────────────────

const DEFAULT_PURGE_CAP = 50;

/** crm_settings 의 key → value 표를 화면이 쓰는 모양으로. 이상한 값은 안전한 기본값(시험 모드·50건)으로 */
export function settingsFromMap(map: Record<string, string>): CrmSettings {
  const cap = Number.parseInt(map.purge_cap ?? "", 10);
  return {
    purgeMode: map.purge_mode === "live" ? "live" : "dry_run",
    purgeCap: Number.isFinite(cap) && cap > 0 ? cap : DEFAULT_PURGE_CAP,
    purgeLastRun: map.purge_last_run ?? null,
    purgeSelftest: map.purge_selftest ?? null,
    digestLast: parseDigestRecord(map.digest_last ?? null),
    intakeAlerts: parseIntakeAlerts(map.intake_alert ?? null),
    intakeAlertReady: "intake_alert" in map,
  };
}

export async function getCrmSettings(): Promise<CrmResult<CrmSettings>> {
  if (crmFixtureEnabled()) return crmFixture().getCrmSettings();
  const db = serviceClient();
  if (!db) return NO_KEY;
  try {
    const res = await db.from("crm_settings").select("key,value");
    if (res.error) return dbFail("getCrmSettings", res.error);
    const map: Record<string, string> = {};
    for (const raw of res.data ?? []) {
      const r = rec(raw);
      if (typeof r.key === "string" && typeof r.value === "string") map[r.key] = r.value;
    }
    return { ok: true, data: settingsFromMap(map) };
  } catch (e) {
    return dbFail("getCrmSettings", e);
  }
}

export async function setPurgeMode(mode: PurgeMode, actor: string): Promise<CrmResult<{ from: string; to: string }>> {
  if (crmFixtureEnabled()) return crmFixture().setPurgeMode(mode, actor);
  const db = serviceClient();
  if (!db) return NO_KEY;
  try {
    const cur = await db.from("crm_settings").select("value").eq("key", "purge_mode").maybeSingle();
    if (cur.error) return dbFail("setPurgeMode(read)", cur.error);
    const from = cur.data && typeof rec(cur.data).value === "string" ? String(rec(cur.data).value) : "dry_run";
    const res = await db
      .from("crm_settings")
      .upsert(
        { key: "purge_mode", value: mode, updated_at: new Date().toISOString(), updated_by: clip(actor, 40) ?? "owner" },
        { onConflict: "key" },
      );
    if (res.error) return dbFail("setPurgeMode", res.error);
    return { ok: true, data: { from, to: mode } };
  } catch (e) {
    return dbFail("setPurgeMode", e);
  }
}

/** 아침 문자 결과를 남긴다(같은 날 두 번 보내지 않는 근거). 실패해도 던지지 않고 false */
export async function setDigestLast(record: DigestRecord): Promise<boolean> {
  if (crmFixtureEnabled()) return crmFixture().setDigestLast(record);
  const db = serviceClient();
  if (!db) return false;
  try {
    const res = await db
      .from("crm_settings")
      .upsert(
        { key: "digest_last", value: JSON.stringify(record), updated_at: new Date().toISOString(), updated_by: "cron" },
        { onConflict: "key" },
      );
    if (res.error) {
      console.error("admin crm-store: setDigestLast failed:", res.error.code, res.error.message);
      return false;
    }
    return true;
  } catch (e) {
    console.error("admin crm-store: setDigestLast threw:", e instanceof Error ? e.message : e);
    return false;
  }
}

/**
 * 오늘(KST date) 아침 문자를 **보내기 전에** 찜한다 — SQL 함수 crm_claim_digest(행 잠금이라 동시에 불러도 하나만 이긴다).
 * true = 이 호출이 보낸다. false = 이미 보냈거나·알릴 것 없던 날이거나·다른 호출이 10분 안에 보내는 중.
 * 규칙은 digest-core.canClaimDigest 와 같다.
 */
export async function claimDigest(date: string): Promise<CrmResult<boolean>> {
  if (crmFixtureEnabled()) return crmFixture().claimDigest(date);
  const db = serviceClient();
  if (!db) return NO_KEY;
  try {
    const res = await db.rpc("crm_claim_digest", { p_date: date });
    if (res.error) return dbFail("claimDigest", res.error);
    return { ok: true, data: res.data === true };
  } catch (e) {
    return dbFail("claimDigest", e);
  }
}

// ── 「이 기기 말고 모두 로그아웃」 시각(sid 없는 쿠키 일괄 해제) ──────────
//
// sid 없는 쿠키(P1b 전 발급·기기 표 저장 실패)는 기기 표에 행이 없어 한 대씩 못 끊는다.
// 모두 로그아웃을 누른 시각을 crm_settings.sessions_invalid_before 에 적고, 문지기(guard.ts)가
// sid 없는 쿠키 중 그보다 먼저 발급된 것을 해제로 본다(guard-core.decideSession 의 sidlessCutoffMs).

const SESSIONS_CUTOFF_KEY = "sessions_invalid_before";

export async function setSessionsInvalidBefore(iso: string): Promise<CrmResult<null>> {
  if (crmFixtureEnabled()) return crmFixture().setSessionsInvalidBefore(iso);
  if (!Number.isFinite(Date.parse(iso))) return { ok: false, reason: "invalid", message: "시각 형식이 아닙니다." };
  const db = serviceClient();
  if (!db) return NO_KEY;
  try {
    const res = await db
      .from("crm_settings")
      .upsert(
        { key: SESSIONS_CUTOFF_KEY, value: iso, updated_at: new Date().toISOString(), updated_by: "owner" },
        { onConflict: "key" },
      );
    if (res.error) return dbFail("setSessionsInvalidBefore", res.error);
    return { ok: true, data: null };
  } catch (e) {
    return dbFail("setSessionsInvalidBefore", e);
  }
}

/** 기록이 없으면 null. 못 읽으면 실패 — 문지기는 그때 예전 규칙(basic 허용)으로 간다 */
export async function getSessionsInvalidBefore(): Promise<CrmResult<string | null>> {
  if (crmFixtureEnabled()) return crmFixture().getSessionsInvalidBefore();
  const db = serviceClient();
  if (!db) return NO_KEY;
  try {
    const res = await db.from("crm_settings").select("value").eq("key", SESSIONS_CUTOFF_KEY).maybeSingle();
    if (res.error) return dbFail("getSessionsInvalidBefore", res.error);
    const value = res.data ? str(rec(res.data).value) : null;
    return { ok: true, data: value && Number.isFinite(Date.parse(value)) ? value : null };
  } catch (e) {
    return dbFail("getSessionsInvalidBefore", e);
  }
}

function toPurgeLogRow(raw: unknown): PurgeLogRow {
  const r = rec(raw);
  return {
    id: num(r.id),
    runAt: String(r.run_at ?? ""),
    mode: String(r.mode ?? ""),
    trigger: String(r.trigger ?? ""),
    target: String(r.target ?? ""),
    rowCount: num(r.row_count),
    outcome: String(r.outcome ?? ""),
    note: str(r.note),
  };
}

/** 최근 파기 기록. 지운 문의 id 목록(ids)은 **돌려주지 않는다** — 화면에 필요 없다 */
export async function listPurgeLog(limit: number): Promise<CrmResult<PurgeLogRow[]>> {
  if (crmFixtureEnabled()) return crmFixture().listPurgeLog(limit);
  const db = serviceClient();
  if (!db) return NO_KEY;
  const n = Math.min(100, Math.max(1, Math.floor(limit) || 10));
  try {
    const res = await db
      .from("purge_log")
      .select("id,run_at,mode,trigger,target,row_count,outcome,note")
      .order("run_at", { ascending: false })
      .limit(n);
    if (res.error) return dbFail("listPurgeLog", res.error);
    return { ok: true, data: (res.data ?? []).map(toPurgeLogRow) };
  } catch (e) {
    return dbFail("listPurgeLog", e);
  }
}

/** iso 이후 **실제로(live)** 파기한 문의 건수 합 */
export async function countPurgedSince(iso: string): Promise<CrmResult<number>> {
  if (crmFixtureEnabled()) return crmFixture().countPurgedSince(iso);
  const db = serviceClient();
  if (!db) return NO_KEY;
  try {
    const res = await db
      .from("purge_log")
      .select("row_count")
      .eq("target", "inquiry")
      .eq("mode", "live")
      .eq("outcome", "ok")
      .gte("run_at", iso)
      .limit(1000);
    if (res.error) return dbFail("countPurgedSince", res.error);
    return { ok: true, data: (res.data ?? []).reduce((sum, raw) => sum + num(rec(raw).row_count), 0) };
  } catch (e) {
    return dbFail("countPurgedSince", e);
  }
}

// ── 접수 이상 기록(crm_settings.intake_alert) — 2026-09-20 가온, 오픈 주간 P1-6 ──────────
//
// 왜: 접수 알림 문자가 실패해도·저장이 실패해도 route 는 console 에만 적었다. Vercel 로그는 요금제에 따라 1시간~1일이면
// 사라져서, 형은 「문의가 없었다」와 「문의가 왔는데 몰랐다」를 가를 수 없었다. 이제 종류별로 건수·시각을 여기 남기고
// 「오늘」 화면 빨간 배너·설정 화면·아침 문자가 읽는다.
//
// 동시에 두 건이 실패하면(솔라피 장애 때 흔하다) 둘 다 「지금 값」을 읽고 각자 +1 해서 덮어 한 건이 사라진다.
// 그래서 「읽은 값 그대로일 때만 바꾼다」(값 비교 update)로 쓰고, 그사이 누가 바꿨으면 다시 읽어 합친다(최대 4번).
// 행이 없으면 insert 하고, 동시에 누가 먼저 넣었으면(23505) 다시 돈다.
// 마이그레이션 20260920090000 전에는 키 목록 제약(23514)에 걸린다 — 그때는 로그만 남기고 조용히 포기한다.

const INTAKE_ALERT_KEY = "intake_alert";
const INTAKE_CAS_TRIES = 4;

type CasOutcome = { ok: true; map: IntakeAlertMap } | { ok: false; code: string | null };

async function casIntakeAlerts(
  db: SupabaseClient,
  change: (map: IntakeAlertMap) => IntakeAlertMap,
  updatedBy: string,
): Promise<CasOutcome> {
  for (let attempt = 0; attempt < INTAKE_CAS_TRIES; attempt++) {
    const cur = await db.from("crm_settings").select("value").eq("key", INTAKE_ALERT_KEY).maybeSingle();
    if (cur.error) return { ok: false, code: cur.error.code ?? null };
    const prevRaw = cur.data ? str(rec(cur.data).value) : null;
    const next = change(parseIntakeAlerts(prevRaw));
    const value = JSON.stringify(next);
    // 바뀐 것이 없으면(확인할 것이 없는데 「확인」을 누름 등) 쓰지 않는다 — 기록 없는 표에 빈 행을 만들지 않게
    if (value === (prevRaw ?? JSON.stringify({}))) return { ok: true, map: next };
    const row = { value, updated_at: new Date().toISOString(), updated_by: updatedBy };
    if (prevRaw === null) {
      const ins = await db.from("crm_settings").insert({ key: INTAKE_ALERT_KEY, ...row });
      if (!ins.error) return { ok: true, map: next };
      if (ins.error.code === "23505") continue;
      return { ok: false, code: ins.error.code ?? null };
    }
    const upd = await db
      .from("crm_settings")
      .update(row)
      .eq("key", INTAKE_ALERT_KEY)
      .eq("value", prevRaw)
      .select("key");
    if (upd.error) return { ok: false, code: upd.error.code ?? null };
    if ((upd.data ?? []).length === 1) return { ok: true, map: next };
    // 그사이 다른 호출이 값을 바꿨다 — 다시 읽어 합친다
  }
  return { ok: false, code: "cas-exhausted" };
}

/**
 * 접수 이상 한 건을 남긴다 — /api/inquiry 가 after() 로 부른다.
 * **절대 던지지 않고, 기다리게 하지 않는다**(실패는 로그 한 줄). 고객 응답이 이 기록 때문에 늦어지거나 깨지면 안 된다.
 * 🔒 ev 에는 종류·시각·접수번호만 있다. 고객 정보·DB 오류 원문은 넣을 자리가 없다.
 */
export async function recordIntakeAlert(ev: IntakeAlertEvent): Promise<boolean> {
  try {
    if (crmFixtureEnabled()) return crmFixture().recordIntakeAlert(ev);
    const db = serviceClient();
    if (!db) {
      console.error("admin crm-store: recordIntakeAlert skipped — no service key", ev.kind);
      return false;
    }
    const res = await casIntakeAlerts(db, (m) => mergeIntakeAlert(m, ev), "inquiry");
    if (!res.ok) {
      console.error(
        "admin crm-store: recordIntakeAlert failed:",
        ev.kind,
        res.code ?? "",
        res.code === "23514" ? "(마이그레이션 20260920090000_intake_alert.sql 적용 전?)" : "",
      );
      return false;
    }
    return true;
  } catch (e) {
    console.error("admin crm-store: recordIntakeAlert threw:", ev.kind, e instanceof Error ? e.message : e);
    return false;
  }
}

/**
 * 한도 초과 n건을 남기고, **이 쓰기가 한도 안내 문자를 보낼 차례인지** 돌려준다.
 * 판단(shouldSendCapNotice)을 값 비교 쓰기 안에서 한다 — 실제로 쓰인 판(version)을 본 요청 하나만 true 를 받는다.
 * 동시에 여럿이 한도를 넘어도 안내는 한 통, 아무도 「딱 30」을 못 봐도 한 통(예전엔 둘 다 틀렸다).
 * 기록을 못 쓰면 "failed" — 부르는 쪽(route)이 인스턴스 울타리로 안내를 보낼지 정한다(안내 없이 문자가 끊기지 않게).
 */
export async function recordOverCap(ev: IntakeAlertEvent): Promise<"claimed" | "recorded" | "failed"> {
  try {
    if (crmFixtureEnabled()) return crmFixture().recordOverCap(ev);
    const db = serviceClient();
    if (!db) {
      console.error("admin crm-store: recordOverCap skipped — no service key");
      return "failed";
    }
    let claimed = false;
    const res = await casIntakeAlerts(
      db,
      (m) => {
        // 재시도마다 다시 정한다 — 마지막으로 성공한 판의 답만 남는다
        claimed = shouldSendCapNotice(m.over_cap, ev.at);
        return mergeIntakeAlert(m, { ...ev, kind: "over_cap" });
      },
      "inquiry",
    );
    if (!res.ok) {
      console.error(
        "admin crm-store: recordOverCap failed:",
        res.code ?? "",
        res.code === "23514" ? "(마이그레이션 20260920090000_intake_alert.sql 적용 전?)" : "",
      );
      return "failed";
    }
    return claimed ? "claimed" : "recorded";
  } catch (e) {
    console.error("admin crm-store: recordOverCap threw:", e instanceof Error ? e.message : e);
    return "failed";
  }
}

/**
 * 설정 화면 「확인했습니다」 — 화면이 그려 놓았던 칸(seen)만 지금 시각으로 찍는다(intake-core.acknowledgeIntakeAlerts).
 * 확인한 사건 수와, 그사이 새로 늘어 열어 둔 칸 수를 돌려준다.
 */
export async function acknowledgeIntakeAlert(
  actor: string,
  seen: IntakeAlertSeen,
): Promise<CrmResult<{ acknowledged: number; keptOpen: number }>> {
  if (crmFixtureEnabled()) return crmFixture().acknowledgeIntakeAlert(actor, seen);
  const db = serviceClient();
  if (!db) return NO_KEY;
  try {
    let summary = { acknowledged: 0, keptOpen: 0 };
    const res = await casIntakeAlerts(
      db,
      (m) => {
        summary = acknowledgeSummary(m, seen);
        return acknowledgeIntakeAlerts(m, new Date().toISOString(), seen);
      },
      clip(actor, 40) ?? "owner",
    );
    if (!res.ok) return dbFail("acknowledgeIntakeAlert", { code: res.code ?? undefined });
    return { ok: true, data: summary };
  } catch (e) {
    return dbFail("acknowledgeIntakeAlert", e);
  }
}
