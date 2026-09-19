// ── 개발·검증용 가짜 관리대장 (ADMIN_CRM_FIXTURE) ─────────────────────────────
//
// 왜 필요한가: 관리대장 표(admin_sessions·inquiry_status_log·admin_access_log·purge_log·crm_settings)와
// 문의 표의 새 칸은 형이 마이그레이션 20260919120000 을 적용해야 생긴다. 그 전에는 「오늘」 화면이
// 지남·오늘·3일 안·새 문의·멈춘 딜·파기 지연을 제대로 나누는지, 상태 칩·다음 할 일·기기 해제가 실제로
// 도는지를 **화면으로 확인할 방법이 없다.** 이 장치는 데이터베이스 대신 메모리(globalThis — 개발 서버
// HMR 에도 살아남는다)에 가짜 문의 11건·기기 2대·설정을 만들어, 표 없이도 그 갈래들을 실제 서버에서 재 보게 한다.
//
// 🔒 운영에서 절대 쓰이지 않게 하는 조건 — **넷을 다 만족해야** 쓴다(src/lib/portfolio/state.ts 의 가짜 상태와 같은 설계):
//   1) ADMIN_CRM_FIXTURE 가 정확히 "1" 이다
//   2) ADMIN_CRM_FIXTURE_ACK 가 정확히 "local-verification-only" 다
//      (값 하나가 실수로 흘러 들어가도 그것만으로는 켜지지 않게 확인 값을 따로 둔다)
//   3) Vercel 이 아니다 — process.env.VERCEL 은 production·preview·development 배포에서 모두 켜진다
//   4) 운영 빌드(NODE_ENV=production)가 아니다 — 단, `next build && next start` 로 운영과 같은 렌더 경로를
//      재야 할 때만 ADMIN_CRM_FIXTURE_ALLOW_PRODUCTION_BUILD=yes-local-next-start 를 같이 주면 켜진다.
//      VERCEL 만으로는 자체 호스팅·Docker 운영을 못 가린다 — 그래서 운영 빌드에서는 기본으로 끈다.
// 조건이 깨지면 조용히 무시하지 않고 console.error 로 시끄럽게 알린다. 켜지면 console.warn 한 번.
//
// 🔒 가짜 사람만 싣는다 — 이 저장소는 공개다. 이름은 「예시 고객 N」, 번호는 010-0000-00NN,
// 메일은 sampleN@example.com. 진짜 고객 이름·번호·금액을 여기 적지 않는다.

import type {
  AccessLogInput,
  AccessLogRow,
  CrmResult,
  CrmSettings,
  ListAccessLogOptions,
  NextActionArgs,
  PurgeLogRow,
  SessionRow,
  StatusLogRow,
  TransitionArgs,
  TransitionResult,
} from "./crm-store";
import type { InquiryListResult, InquiryRow, InquiryStatus } from "./inquiries";
import type { PurgeMode } from "./crm-input";
import type { TodayRow } from "./today-core";
import { canClaimDigest, parseDigestRecord, type DigestRecord } from "./digest-core";
import { kstYymmdd } from "@/lib/kst";

const FIXTURE_ACK = "local-verification-only";
const FIXTURE_PROD_ACK_ENV = "ADMIN_CRM_FIXTURE_ALLOW_PRODUCTION_BUILD";
const FIXTURE_PROD_ACK = "yes-local-next-start";

let decided: boolean | undefined;

/** 가짜 관리대장을 쓰는가 — 판정은 프로세스당 한 번(경고도 한 번) */
export function crmFixtureEnabled(): boolean {
  if (decided !== undefined) return decided;
  decided = false;
  const raw = process.env.ADMIN_CRM_FIXTURE;
  if (!raw) return decided;
  if (raw !== "1") {
    console.error(`[admin-crm] ADMIN_CRM_FIXTURE 는 "1" 일 때만 켭니다(지금 값은 무시합니다).`);
    return decided;
  }
  if (process.env.VERCEL) {
    console.error("[admin-crm] ADMIN_CRM_FIXTURE 는 배포 환경에서 쓸 수 없습니다 — 무시하고 데이터베이스를 읽습니다.");
    return decided;
  }
  if (process.env.ADMIN_CRM_FIXTURE_ACK !== FIXTURE_ACK) {
    console.error(
      `[admin-crm] ADMIN_CRM_FIXTURE 가 있지만 ADMIN_CRM_FIXTURE_ACK 가 「${FIXTURE_ACK}」 가 아니라 무시합니다.`,
    );
    return decided;
  }
  if (process.env.NODE_ENV === "production" && process.env[FIXTURE_PROD_ACK_ENV] !== FIXTURE_PROD_ACK) {
    console.error(
      `[admin-crm] ADMIN_CRM_FIXTURE 는 운영 빌드(NODE_ENV=production)에서 쓰지 않습니다 — 무시하고 데이터베이스를 읽습니다. ` +
        `로컬 검증(next build && next start)이라면 ${FIXTURE_PROD_ACK_ENV}=${FIXTURE_PROD_ACK} 를 같이 주세요.`,
    );
    return decided;
  }
  decided = true;
  console.warn("[admin-crm] ⚠️ 가짜 관리대장(ADMIN_CRM_FIXTURE)으로 동작합니다 — 데이터베이스를 읽지도 쓰지도 않습니다.");
  return decided;
}

// ── 메모리 저장소 ────────────────────────────────────────────────────

type FixtureInquiry = InquiryRow & { request_no: string | null };

type FixtureState = {
  inquiries: FixtureInquiry[];
  statusLog: StatusLogRow[];
  sessions: SessionRow[];
  accessLog: AccessLogRow[];
  purgeLog: (PurgeLogRow & { ids: string[] })[];
  settings: Record<string, string>;
  seq: { statusLog: number; accessLog: number; purgeLog: number };
};

const GLOBAL_KEY = "__taemunAdminCrmFixture";
const DAY = 86_400_000;
const HOUR = 3_600_000;

function iso(ms: number): string {
  return new Date(ms).toISOString();
}

function ymdKst(ms: number): string {
  const d = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(ms));
  return d;
}

function uuidOf(n: number, group: string): string {
  return `00000000-0000-4000-${group}-${String(n).padStart(12, "0")}`;
}

function seed(): FixtureState {
  const now = Date.now();
  const seqByDay = new Map<string, number>();
  const inquiries: FixtureInquiry[] = [];

  type Spec = {
    status: InquiryStatus;
    createdAgo: number;
    updatedAgo?: number;
    due?: number;
    action?: string;
    closed?: string;
    basis?: "inquiry" | "contract";
    retainIn?: number;
    services: string[];
  };
  const specs: Spec[] = [
    { status: "contacted", createdAgo: 6 * DAY, updatedAgo: 3 * DAY, due: -2, action: "견적서 다시 보내기", services: ["웹사이트"] },
    { status: "quoted", createdAgo: 5 * DAY, updatedAgo: 1 * DAY, due: 0, action: "통화 약속", services: ["웹사이트", "관리자 화면"] },
    { status: "contacted", createdAgo: 4 * DAY, updatedAgo: 2 * DAY, due: 2, services: ["앱"] },
    { status: "quoted", createdAgo: 12 * DAY, updatedAgo: 4 * DAY, due: 10, action: "계약서 초안 확인", services: ["예약 시스템"] },
    { status: "pending", createdAgo: 3 * HOUR, services: ["웹사이트"] },
    { status: "pending", createdAgo: 1 * DAY + 2 * HOUR, services: ["쇼핑몰"] },
    { status: "quoted", createdAgo: 20 * DAY, updatedAgo: 9 * DAY, services: ["홈페이지 개편"] },
    { status: "contracted", createdAgo: 40 * DAY, updatedAgo: 10 * DAY, basis: "contract", services: ["웹사이트"] },
    { status: "closed", createdAgo: 30 * DAY, updatedAgo: 15 * DAY, closed: "price", services: ["앱"] },
    { status: "closed", createdAgo: 368 * DAY, updatedAgo: 300 * DAY, closed: "no_response", retainIn: -3, services: ["웹사이트"] },
    { status: "closed", createdAgo: 345 * DAY, updatedAgo: 330 * DAY, closed: "timing", retainIn: 20, services: ["랜딩 페이지"] },
  ];

  specs.forEach((s, i) => {
    const n = i + 1;
    const created = now - s.createdAgo;
    const yymmdd = kstYymmdd(new Date(created));
    const daySeq = (seqByDay.get(yymmdd) ?? 0) + 1;
    seqByDay.set(yymmdd, daySeq);
    const basis = s.basis ?? "inquiry";
    const retain = basis === "contract" ? null : iso(s.retainIn !== undefined ? now + s.retainIn * DAY : created + 365 * DAY);
    inquiries.push({
      id: uuidOf(n, "8000"),
      created_at: iso(created),
      request_no: `TM-${yymmdd}-${String(daySeq).padStart(2, "0")}`,
      client_name: `예시 고객 ${n}`,
      phone: `010-0000-00${String(n).padStart(2, "0")}`,
      email: `sample${n}@example.com`,
      services: s.services,
      budget: "500만원 ~ 1,000만원",
      timeline: "1~2개월",
      reference_url: null,
      details: `예시 문의 내용 ${n} — 가짜 데이터입니다.`,
      status: s.status,
      referral_from: null,
      referral_kind: null,
      entry: n % 2 === 0 ? "inquiry_page" : "home_modal",
      path: "full",
      budget_flexible: n % 3 === 0,
      contact_pref: n % 2 === 0 ? "call" : "text_first",
      reference_usage: null,
      updated_at: s.updatedAgo !== undefined ? iso(now - s.updatedAgo) : null,
      closed_reason: s.closed ?? null,
      next_action: s.action ?? null,
      next_action_due: s.due !== undefined ? ymdKst(now + s.due * DAY) : null,
      retention_basis: basis,
      retain_until: retain,
      purged_at: null,
    });
  });

  const statusLog: StatusLogRow[] = [];
  let logSeq = 0;
  const addLog = (n: number, from: string | null, to: string, agoMs: number, reason: string | null = null) => {
    logSeq += 1;
    statusLog.push({
      id: logSeq,
      inquiryId: uuidOf(n, "8000"),
      fromStatus: from,
      toStatus: to,
      closedReason: reason,
      note: null,
      actor: "owner",
      at: iso(now - agoMs),
    });
  };
  addLog(1, "pending", "contacted", 3 * DAY);
  addLog(2, "pending", "contacted", 4 * DAY);
  addLog(2, "contacted", "quoted", 1 * DAY);
  addLog(7, "pending", "quoted", 9 * DAY);
  addLog(8, "quoted", "contracted", 10 * DAY);
  addLog(9, "quoted", "closed", 15 * DAY, "price");

  const sessions: SessionRow[] = [
    {
      id: uuidOf(1, "9000"),
      actor: "owner",
      createdAt: iso(now - 6 * DAY),
      lastSeenAt: iso(now - 1 * HOUR),
      expiresAt: iso(now + 24 * DAY),
      revokedAt: null,
      revokedReason: null,
      ip: "203.0.113.10",
      ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1",
    },
    {
      id: uuidOf(2, "9000"),
      actor: "owner",
      createdAt: iso(now - 12 * DAY),
      lastSeenAt: iso(now - 2 * DAY),
      expiresAt: iso(now + 18 * DAY),
      revokedAt: null,
      revokedReason: null,
      ip: "198.51.100.20",
      ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    },
  ];

  const lastRun = iso(now - 5 * HOUR);
  return {
    inquiries,
    statusLog,
    sessions,
    accessLog: [],
    purgeLog: [
      {
        id: 1,
        runAt: lastRun,
        mode: "dry_run",
        trigger: "schedule",
        target: "inquiry",
        rowCount: 1,
        outcome: "ok",
        note: null,
        ids: [uuidOf(10, "8000")],
      },
    ],
    settings: {
      purge_mode: "dry_run",
      purge_cap: "50",
      purge_last_run: lastRun,
      purge_selftest: `ok ${iso(now - 2 * DAY)}`,
    },
    seq: { statusLog: logSeq, accessLog: 0, purgeLog: 1 },
  };
}

function state(): FixtureState {
  const g = globalThis as typeof globalThis & { [GLOBAL_KEY]?: FixtureState };
  if (!g[GLOBAL_KEY]) g[GLOBAL_KEY] = seed();
  return g[GLOBAL_KEY];
}

const NOT_FOUND = { ok: false as const, reason: "not-found" as const, message: "그 항목을 찾지 못했습니다." };

function isActive(s: SessionRow, nowMs: number): boolean {
  return !s.revokedAt && Date.parse(s.expiresAt) > nowMs;
}

const CLOSED_REASON_VALUES = ["price", "timing", "no_response", "not_fit", "completed"];

/** crm-store.ts 와 같은 함수들 — 가짜 데이터가 켜져 있으면 crm-store 가 이쪽으로 보낸다 */
export function crmFixture() {
  const st = state();

  return {
    async createAdminSession(args: { id: string; actor: string; expiresAt: Date; ip: string; ua: string }): Promise<CrmResult<null>> {
      st.sessions.push({
        id: args.id,
        actor: args.actor,
        createdAt: new Date().toISOString(),
        lastSeenAt: new Date().toISOString(),
        expiresAt: args.expiresAt.toISOString(),
        revokedAt: null,
        revokedReason: null,
        ip: args.ip.slice(0, 64),
        ua: args.ua.slice(0, 300),
      });
      return { ok: true, data: null };
    },

    async getAdminSession(id: string): Promise<CrmResult<SessionRow | null>> {
      const row = st.sessions.find((s) => s.id === id.toLowerCase());
      return { ok: true, data: row ? { ...row } : null };
    },

    async touchAdminSession(id: string): Promise<void> {
      const row = st.sessions.find((s) => s.id === id.toLowerCase());
      if (row && !row.revokedAt) row.lastSeenAt = new Date().toISOString();
    },

    async revokeAdminSession(id: string, reason: string): Promise<CrmResult<null>> {
      const row = st.sessions.find((s) => s.id === id.toLowerCase());
      if (!row) return NOT_FOUND;
      if (!row.revokedAt) {
        row.revokedAt = new Date().toISOString();
        row.revokedReason = reason.slice(0, 100);
      }
      return { ok: true, data: null };
    },

    async revokeOtherAdminSessions(keepId: string | null, reason: string): Promise<CrmResult<number>> {
      const nowMs = Date.now();
      let n = 0;
      for (const s of st.sessions) {
        if (s.id === keepId || !isActive(s, nowMs)) continue;
        s.revokedAt = new Date(nowMs).toISOString();
        s.revokedReason = reason.slice(0, 100);
        n += 1;
      }
      return { ok: true, data: n };
    },

    async listAdminSessions(): Promise<CrmResult<SessionRow[]>> {
      const nowMs = Date.now();
      const active = st.sessions
        .filter((s) => isActive(s, nowMs))
        .sort((a, b) => (b.lastSeenAt ?? "").localeCompare(a.lastSeenAt ?? "") || b.createdAt.localeCompare(a.createdAt));
      const ended = st.sessions
        .filter((s) => !isActive(s, nowMs))
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        .slice(0, 10);
      return { ok: true, data: [...active, ...ended].map((s) => ({ ...s })) };
    },

    async insertAccessLog(e: AccessLogInput): Promise<boolean> {
      st.seq.accessLog += 1;
      st.accessLog.unshift({ ...e, id: st.seq.accessLog, at: new Date().toISOString() });
      if (st.accessLog.length > 500) st.accessLog.length = 500;
      return true;
    },

    async listAccessLog(opts: ListAccessLogOptions): Promise<CrmResult<AccessLogRow[]>> {
      const since = opts.sinceIso ? Date.parse(opts.sinceIso) : Number.NEGATIVE_INFINITY;
      const exclude = new Set<string>(opts.excludeActions ?? []);
      const limit = Math.min(1000, Math.max(1, Math.floor(opts.limit ?? 50) || 50));
      const rows = st.accessLog.filter((r) => Date.parse(r.at) >= since && !exclude.has(r.action));
      return { ok: true, data: rows.slice(0, limit).map((r) => ({ ...r })) };
    },

    async countAccessLog(opts: { sinceIso?: string; action?: AccessLogInput["action"] }): Promise<CrmResult<number>> {
      const since = opts.sinceIso ? Date.parse(opts.sinceIso) : Number.NEGATIVE_INFINITY;
      const n = st.accessLog.filter((r) => Date.parse(r.at) >= since && (!opts.action || r.action === opts.action)).length;
      return { ok: true, data: n };
    },

    async setSessionsInvalidBefore(isoValue: string): Promise<CrmResult<null>> {
      st.settings.sessions_invalid_before = isoValue;
      return { ok: true, data: null };
    },

    async getSessionsInvalidBefore(): Promise<CrmResult<string | null>> {
      return { ok: true, data: st.settings.sessions_invalid_before ?? null };
    },

    /** SQL 함수 inquiry_transition 과 같은 규칙 */
    async transitionInquiry(args: TransitionArgs): Promise<CrmResult<TransitionResult>> {
      const row = st.inquiries.find((r) => r.id === args.id.toLowerCase());
      if (!row) return { ok: false, reason: "not-found", message: "그 문의를 찾지 못했습니다." };
      if (row.purged_at) return { ok: false, reason: "purged", message: "보관 기간이 지나 파기된 문의입니다." };
      if (args.to === "closed") {
        if (!args.closedReason || !CLOSED_REASON_VALUES.includes(args.closedReason)) {
          return { ok: false, reason: "invalid", message: "종료 사유가 필요합니다" };
        }
        if (args.closedReason === "completed" && row.retention_basis !== "contract") {
          return { ok: false, reason: "invalid", message: "「진행 완료」는 계약한 문의에만 쓸 수 있습니다" };
        }
      }
      const from = row.status ?? "pending";
      if (from === args.to && (args.to !== "closed" || row.closed_reason === args.closedReason)) {
        return { ok: true, data: { changed: false, from, to: args.to } };
      }
      const nowMs = Date.now();
      row.status = args.to;
      row.closed_reason = args.to === "closed" ? args.closedReason : null;
      row.updated_at = iso(nowMs);
      // 데이터베이스 트리거 inquiries_status_retention 과 같은 규칙
      const oneYear = Date.parse(row.created_at) + 365 * DAY;
      if (args.to === "contracted") {
        row.retention_basis = "contract";
        row.retain_until = null;
      } else if (args.to !== "closed" && row.retention_basis === "contract") {
        // 계약에서 되돌림 — 1년이 이미 지났어도 7일은 남긴다(잘못 누른 것을 되돌릴 여유)
        row.retention_basis = "inquiry";
        row.retain_until = iso(Math.max(oneYear, nowMs + 7 * DAY));
      } else if (args.to !== "closed") {
        row.retain_until = row.retain_until ?? iso(oneYear);
      }
      st.seq.statusLog += 1;
      st.statusLog.push({
        id: st.seq.statusLog,
        inquiryId: row.id,
        fromStatus: from,
        toStatus: args.to,
        closedReason: row.closed_reason,
        note: args.note,
        actor: args.actor,
        at: iso(nowMs),
      });
      return { ok: true, data: { changed: true, from, to: args.to } };
    },

    async setInquiryNextAction(args: NextActionArgs): Promise<CrmResult<null>> {
      const row = st.inquiries.find((r) => r.id === args.id.toLowerCase() && !r.purged_at);
      if (!row) return { ok: false, reason: "not-found", message: "그 문의를 찾지 못했습니다." };
      row.next_action = args.text;
      row.next_action_due = args.due;
      row.updated_at = new Date().toISOString();
      return { ok: true, data: null };
    },

    async listStatusLog(inquiryIds: string[]): Promise<CrmResult<Record<string, StatusLogRow[]>>> {
      const wanted = new Set(inquiryIds.map((s) => s.toLowerCase()));
      const out: Record<string, StatusLogRow[]> = {};
      const rows = st.statusLog
        .filter((r) => wanted.has(r.inquiryId))
        .sort((a, b) => b.at.localeCompare(a.at) || b.id - a.id);
      for (const r of rows) {
        const list = (out[r.inquiryId] ??= []);
        if (list.length < 5) list.push({ ...r });
      }
      return { ok: true, data: out };
    },

    async listTodayRows(): Promise<CrmResult<TodayRow[]>> {
      const rows = st.inquiries
        .filter((r) => !r.purged_at)
        .sort((a, b) => b.created_at.localeCompare(a.created_at))
        .map(
          (r): TodayRow => ({
            id: r.id,
            requestNo: r.request_no,
            createdAt: r.created_at,
            status: r.status ?? "pending",
            services: r.services,
            nextAction: r.next_action,
            nextActionDue: r.next_action_due,
            updatedAt: r.updated_at,
            retainUntil: r.retain_until,
            retentionBasis: r.retention_basis,
            purgedAt: r.purged_at,
          }),
        );
      return { ok: true, data: rows };
    },

    async getCrmSettings(): Promise<CrmResult<CrmSettings>> {
      const m = st.settings;
      const cap = Number.parseInt(m.purge_cap ?? "", 10);
      const digestLast = parseDigestRecord(m.digest_last ?? null);
      return {
        ok: true,
        data: {
          purgeMode: m.purge_mode === "live" ? "live" : "dry_run",
          purgeCap: Number.isFinite(cap) && cap > 0 ? cap : 50,
          purgeLastRun: m.purge_last_run ?? null,
          purgeSelftest: m.purge_selftest ?? null,
          digestLast,
        },
      };
    },

    async setPurgeMode(mode: PurgeMode, _actor: string): Promise<CrmResult<{ from: string; to: string }>> {
      const from = st.settings.purge_mode ?? "dry_run";
      st.settings.purge_mode = mode;
      return { ok: true, data: { from, to: mode } };
    },

    async setDigestLast(record: DigestRecord): Promise<boolean> {
      st.settings.digest_last = JSON.stringify(record);
      return true;
    },

    /** SQL crm_claim_digest 와 같은 규칙(digest-core.canClaimDigest). 메모리라 행 잠금은 필요 없다 */
    async claimDigest(date: string): Promise<CrmResult<boolean>> {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { ok: false, reason: "invalid", message: "날짜 형식이 아닙니다." };
      const nowMs = Date.now();
      const existing = st.settings.digest_last ?? null;
      const prevAt = parseDigestRecord(existing)?.at;
      if (!canClaimDigest(existing, date, nowMs, prevAt ? Date.parse(prevAt) : Number.NaN)) return { ok: true, data: false };
      const claim: DigestRecord = {
        date,
        state: "sending",
        sent: false,
        skipped: null,
        error: null,
        summary: "",
        at: new Date(nowMs).toISOString(),
      };
      st.settings.digest_last = JSON.stringify(claim);
      return { ok: true, data: true };
    },

    async listPurgeLog(limit: number): Promise<CrmResult<PurgeLogRow[]>> {
      const rows = [...st.purgeLog]
        .sort((a, b) => b.runAt.localeCompare(a.runAt))
        .slice(0, Math.max(1, Math.min(100, limit)))
        .map(({ ids: _ids, ...rest }) => rest);
      return { ok: true, data: rows };
    },

    async countPurgedSince(sinceIso: string): Promise<CrmResult<number>> {
      const since = Date.parse(sinceIso);
      const n = st.purgeLog
        .filter((r) => r.target === "inquiry" && r.mode === "live" && r.outcome === "ok" && Date.parse(r.runAt) >= since)
        .reduce((sum, r) => sum + r.rowCount, 0);
      return { ok: true, data: n };
    },

    /** inquiries.ts 의 listInquiries 와 같은 모양(파기된 행 제외·상태별 건수는 전체 기준) */
    async listInquiries(
      opts: { status: InquiryStatus | "all"; page: number; requestNo?: string | null; id?: string | null },
      pageSize: number,
    ): Promise<InquiryListResult> {
      const live = st.inquiries.filter((r) => !r.purged_at);
      const counts: InquiryListResult["counts"] = { all: live.length, pending: 0, contacted: 0, quoted: 0, contracted: 0, closed: 0 };
      for (const r of live) {
        const s = (r.status ?? "pending") as InquiryStatus;
        if (s in counts) counts[s] += 1;
      }
      let rows = live;
      if (opts.status !== "all") rows = rows.filter((r) => (r.status ?? "pending") === opts.status);
      if (opts.requestNo) rows = rows.filter((r) => r.request_no === opts.requestNo);
      if (opts.id) rows = rows.filter((r) => r.id === opts.id?.toLowerCase());
      rows = [...rows].sort((a, b) => b.created_at.localeCompare(a.created_at));
      const page = Math.max(1, Math.floor(opts.page));
      const from = (page - 1) * pageSize;
      return {
        rows: rows.slice(from, from + pageSize).map((r) => ({ ...r, services: r.services ? [...r.services] : r.services })),
        total: rows.length,
        counts,
        error: null,
      };
    },
  };
}
