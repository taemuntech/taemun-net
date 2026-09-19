// 관리자 화면·API 의 **입구 한 곳** — 로그인 확인 + 기기(세션) 확인 + 접속기록. 서버 전용.
//
// 왜 한 곳인가: P1b 전에는 화면·API 가 각자 readAdminSession 을 불렀다. 기기 해제·접속기록·프리뷰 차단을
// 붙이려면 그 여러 입구를 다 고쳐야 하고, 하나라도 빠지면 「해제한 휴대폰이 문의 화면은 여전히 연다」가 된다.
// 이제 화면은 requireAdminPage, API 는 requireAdminApi 만 부른다.
//
// 판정 규칙은 guard-core.ts(순수·시험됨). 여기는 쿠키·헤더를 읽고 DB 세션 행을 찾아 그 규칙에 넘길 뿐이다.
// - 프리뷰·개발 배포(VERCEL_ENV)는 화면 404, API 503 — 운영 데이터가 공개 프리뷰 주소로 새지 않게(env.ts).
// - basic(작업물·「오늘」)은 DB 가 죽어도 열린다 — 항의 전화 중 「전부 내리기」가 막히면 안 된다.
// - pii(문의·설정)는 기기 행을 확인해야만 열린다 — 해제가 실제로 먹혀야 한다.
//
// 접속기록(개인정보처리시스템 접속기록 보관·점검 — 누가 언제 어느 고객 정보를 봤고 바꿨나):
// - logAccess 는 응답을 늦추지 않도록 after() 로 미뤄 쓴다. 실패해도 던지지 않는다.
// - 기기 해제·설정 변경처럼 「기록 없이 일어나면 안 되는」 일은 logAccessSync 로 **먼저** 쓰고, 못 쓰면 그 일을 하지 않는다.

import { cookies, headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { after, NextResponse } from "next/server";
import { isNonProductionDeployment } from "./env";
import { decideSession, type AdminScope, type SessionDbState, type SessionDecision } from "./guard-core";
import { guardAdminWrite } from "./request-guard";
import { ADMIN_ACTOR, ADMIN_COOKIE_NAME, clientIpFromHeaders, verifySessionToken } from "./session";
import {
  getAdminSession,
  getSessionsInvalidBefore,
  insertAccessLog,
  touchAdminSession,
  type AccessAction,
} from "./crm-store";

export type { AdminScope } from "./guard-core";
export type { AccessAction } from "./crm-store";

export type AdminContext = {
  actor: string;
  sessionId: string | null;
  /**
   * 기기 행을 DB 에서 찾아 살아 있음을 **확인한** 로그인인가. sid 없는 옛 쿠키이거나 DB 를 못 읽어
   * basic 으로만 들여보낸 경우 false — 「오늘」 화면은 그때 다음 할 일 글자(고객 이름이 들어 있을 수 있다)를 숨긴다.
   */
  sessionChecked: boolean;
  ip: string;
  ua: string;
  route: string;
  method: string;
};

export type AccessEntry = {
  action: AccessAction;
  resource: string | null;
  resourceId?: string | null;
  subjectIds?: string[] | null;
  detail?: string | null;
  outcome?: "ok" | "denied" | "error";
};

const UA_MAX = 300;
const IP_MAX = 64;

function trim(v: string | null | undefined, max: number): string {
  const s = (v ?? "").trim();
  return s.length > max ? s.slice(0, max) : s;
}

/**
 * sid 없는 쿠키용 「모두 로그아웃」 시각(ms). 기록이 없거나 **못 읽으면 null** —
 * DB 장애 중에도 basic(「전부 내리기」)은 열려야 하므로 못 읽은 것을 「막기」로 바꾸지 않는다.
 */
async function sidlessCutoffMs(): Promise<number | null> {
  const r = await getSessionsInvalidBefore();
  if (!r.ok) {
    console.warn("admin guard: 모두 로그아웃 시각을 읽지 못했습니다 — sid 없는 쿠키는 예전 규칙으로 봅니다:", r.reason);
    return null;
  }
  if (!r.data) return null;
  const ms = Date.parse(r.data);
  return Number.isFinite(ms) ? ms : null;
}

/** 토큰 → (필요하면) DB 세션 행·모두 로그아웃 시각 → 판정 */
async function decide(
  token: ReturnType<typeof verifySessionToken>,
  scope: AdminScope,
): Promise<{ decision: SessionDecision; sid: string | null }> {
  const now = Date.now();
  if (!token) return { decision: decideSession({ token: null, db: "skipped", scope, now }), sid: null };
  if (!token.sid) {
    const cutoff = await sidlessCutoffMs();
    return {
      decision: decideSession({
        token: { sid: null, issuedAt: token.issuedAt },
        db: "skipped",
        scope,
        now,
        sidlessCutoffMs: cutoff,
      }),
      sid: null,
    };
  }

  let db: SessionDbState;
  const found = await getAdminSession(token.sid);
  if (!found.ok) db = "error";
  else db = found.data ? { revokedAt: found.data.revokedAt, expiresAt: found.data.expiresAt } : null;
  return { decision: decideSession({ token: { sid: token.sid }, db, scope, now }), sid: token.sid };
}

function scheduleTouch(sid: string): void {
  try {
    after(() => touchAdminSession(sid));
  } catch {
    // 요청 범위 밖(시험 등) — 마지막 사용 시각은 못 써도 된다
  }
}

/**
 * 관리자 화면(서버 컴포넌트) 맨 앞에서 부른다. 통과하면 접속기록에 쓸 문맥을 준다.
 * 막히면 로그인 화면으로 보낸다(이 함수는 돌아오지 않는다 — redirect/notFound 는 던진다).
 */
export async function requireAdminPage(opts: { scope: AdminScope; route: string }): Promise<AdminContext> {
  if (isNonProductionDeployment()) notFound();

  const jar = await cookies();
  const h = await headers();
  const token = verifySessionToken(jar.get(ADMIN_COOKIE_NAME)?.value);
  const { decision, sid } = await decide(token, opts.scope);

  if (!decision.allow) {
    if (decision.reason === "no-session") redirect("/admin/login");
    redirect(`/admin/login?reason=${decision.reason}`);
  }
  if (decision.checked && sid) scheduleTouch(sid);

  return {
    actor: ADMIN_ACTOR,
    sessionId: sid,
    sessionChecked: decision.checked,
    ip: trim(clientIpFromHeaders(h), IP_MAX),
    ua: trim(h.get("user-agent"), UA_MAX),
    route: opts.route,
    method: "GET",
  };
}

/** 쿠키 헤더에서 한 값만 꺼낸다 — NextRequest 가 아닌 일반 Request 도 받으려고 */
function readCookie(req: Request, name: string): string | undefined {
  const withJar = req as Request & { cookies?: { get(n: string): { value: string } | undefined } };
  if (withJar.cookies && typeof withJar.cookies.get === "function") return withJar.cookies.get(name)?.value;
  const raw = req.headers.get("cookie");
  if (!raw) return undefined;
  for (const part of raw.split(";")) {
    const eq = part.indexOf("=");
    if (eq < 0) continue;
    if (part.slice(0, eq).trim() !== name) continue;
    const value = part.slice(eq + 1).trim();
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }
  return undefined;
}

function pathnameOf(req: Request): string {
  try {
    return new URL(req.url).pathname;
  } catch {
    return "";
  }
}

/**
 * 관리자 API 맨 앞에서 부른다.
 * 순서: 프리뷰 차단(503) → (쓰기면) 출처·형식 검사(415/403) → 로그인·기기 판정(401 { error, reason }).
 */
export async function requireAdminApi(
  req: Request,
  opts: { scope: AdminScope; write: boolean },
): Promise<{ ok: true; ctx: AdminContext } | { ok: false; response: NextResponse }> {
  if (isNonProductionDeployment()) {
    return { ok: false, response: NextResponse.json({ error: "서버 설정 오류입니다." }, { status: 503 }) };
  }
  if (opts.write) {
    const blocked = guardAdminWrite(req);
    if (blocked) return { ok: false, response: blocked };
  }

  const token = verifySessionToken(readCookie(req, ADMIN_COOKIE_NAME));
  const { decision, sid } = await decide(token, opts.scope);
  if (!decision.allow) {
    return {
      ok: false,
      response: NextResponse.json({ error: "로그인이 필요합니다.", reason: decision.reason }, { status: 401 }),
    };
  }
  if (decision.checked && sid) scheduleTouch(sid);

  return {
    ok: true,
    ctx: {
      actor: ADMIN_ACTOR,
      sessionId: sid,
      sessionChecked: decision.checked,
      ip: trim(clientIpFromHeaders(req.headers), IP_MAX),
      ua: trim(req.headers.get("user-agent"), UA_MAX),
      route: trim(pathnameOf(req), 200),
      method: trim(req.method, 10),
    },
  };
}

/**
 * 이 요청이 관리자의 것인가 — basic 등급 판정(기기 해제·모두 로그아웃 시각 포함) 그대로.
 * 보호 자산 라우트(/api/asset)처럼 「관리자면 내려간 것도 보여 주고, 아니면 방문자 규칙」인 곳이 쓴다.
 * 예전에는 서명만 봐서, 해제한 휴대폰이 내린 시안 썸네일을 계속 받아 갔다.
 * 던지지 않는다. 쿠키가 없으면 DB 를 읽지 않는다(방문자 요청마다 DB 를 치지 않게).
 */
export async function isAdminRequest(req: Request): Promise<boolean> {
  try {
    const raw = readCookie(req, ADMIN_COOKIE_NAME);
    if (!raw) return false;
    const token = verifySessionToken(raw);
    if (!token) return false;
    const { decision } = await decide(token, "basic");
    return decision.allow;
  } catch {
    return false;
  }
}

function toInput(ctx: AdminContext, entry: AccessEntry) {
  return {
    actor: ctx.actor,
    sessionId: ctx.sessionId,
    ip: ctx.ip,
    ua: ctx.ua,
    method: ctx.method,
    route: ctx.route,
    action: entry.action,
    resource: entry.resource,
    resourceId: entry.resourceId ?? null,
    subjectIds: entry.subjectIds ?? null,
    detail: entry.detail ?? null,
    outcome: entry.outcome ?? "ok",
  };
}

/** 접속기록 한 줄 — 응답이 나간 뒤(after) 쓴다. 절대 던지지 않는다 */
export function logAccess(ctx: AdminContext, entry: AccessEntry): void {
  const input = toInput(ctx, entry);
  const write = async () => {
    const ok = await insertAccessLog(input);
    if (!ok) console.error("admin guard: 접속기록을 남기지 못했습니다:", input.action, input.resource, input.route);
  };
  try {
    after(write);
  } catch {
    // 요청 범위 밖이면 바로 쓴다(기다리지 않는다)
    void write().catch(() => undefined);
  }
}

/** 접속기록을 **먼저** 남겨야 하는 일(기기 해제·설정 변경)용 — 썼으면 true */
export async function logAccessSync(ctx: AdminContext, entry: AccessEntry): Promise<boolean> {
  try {
    return await insertAccessLog(toInput(ctx, entry));
  } catch {
    return false;
  }
}
