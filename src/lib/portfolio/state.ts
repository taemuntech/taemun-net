// 작업물 공개 상태 — 「지금 보여 줄까 말까」만 데이터베이스(Supabase)에 둔다.
// 작업물의 내용(제목·설명·기능)은 저장소 JSON(src/content/portfolio/*.json)이 계속 정본이다.
//
// 설계 원칙 세 가지:
// 1) **행이 없으면 오늘과 똑같이 동작한다.** 표가 비어 있어도 사이트는 지금 그대로다.
//    기본값은 종류가 정한다 — 실존 업체 제안 시안(kind=proposal)은 unlisted(링크로만),
//    나머지는 public. 사람이 잊어도 회사 이름이 걸린 시안이 목록에 뜨지 않는다.
// 2) **읽기 실패 때 넘어지는 방향이 종류마다 다르다.** DB 가 죽으면 제안 시안은 숨기고(fail-closed),
//    샘플·운영 서비스는 JSON 대로 보여 준다(fail-open). 종류는 JSON 에 있으니 DB 없이도 읽힌다.
// 3) **읽기 실패한 순간의 화면을 캐시에 남기지 않는다.** 남기면 5분 동안 굳는다.
//
// 서버 전용(service_role 키 사용). 클라이언트 컴포넌트에서 import 하지 말 것.

import { unstable_cache } from "next/cache";
import { cache } from "react";
import { SUPABASE_URL } from "../supabase-url";
import type { PortfolioKind } from "./schema";

/** 공개 상태 — 관리자 화면의 버튼 3개와 1:1 */
export const PORTFOLIO_STATUSES = ["public", "unlisted", "private"] as const;
export type PortfolioStatus = (typeof PORTFOLIO_STATUSES)[number];

export const STATUS_LABEL: Record<PortfolioStatus, string> = {
  public: "공개",
  unlisted: "링크 전용",
  private: "비공개",
};

export const STATUS_HELP: Record<PortfolioStatus, string> = {
  public: "홈·포트폴리오 목록에 보이고 링크로도 열립니다",
  unlisted: "목록에는 안 보이고 링크로만 열립니다 (영업용)",
  private: "목록에도 없고 링크도 막힙니다 (내려감)",
};

/** 상태 행이 없을 때의 기본값 — 실존 업체 제안 시안은 링크 전용 */
export function defaultStatus(kind: PortfolioKind): PortfolioStatus {
  return kind === "proposal" ? "unlisted" : "public";
}

/** 읽기 실패(DB 장애) 때의 상태 — 제안 시안만 내린다 */
export function fallbackStatus(kind: PortfolioKind): PortfolioStatus {
  return kind === "proposal" ? "private" : "public";
}

export type PortfolioStateRow = {
  slug: string;
  status: PortfolioStatus;
  sortOrder: number | null;
  featured: boolean | null;
  updatedAt: string;
  updatedBy: string;
};

export type PortfolioFlags = {
  /** 제안 시안 전부 차단 */
  proposalsDown: boolean;
  /** 데모 전부 차단 (최후) */
  allDemosDown: boolean;
};

export type StateSnapshot = {
  rows: Record<string, PortfolioStateRow>;
  flags: PortfolioFlags;
  /** 데이터베이스를 읽었는가 — false 면 화면은 fallbackStatus 로 판정하고 캐시하지 않는다 */
  ok: boolean;
  /** 읽기 실패 사유 (관리자 화면에 그대로 보여 준다) */
  error?: string;
  /**
   * 이 스냅숏을 **실제로 읽은 시각**(ms). 캐시가 기한이 지난 값을 먼저 내주는(stale-while-revalidate)
   * 특성 때문에 「언제 읽은 값인가」를 값 안에 넣어 둔다 — getState() 가 이 시각으로 낡은 값을 걸러낸다.
   */
  fetchedAt: number;
  /** 가짜 상태(PORTFOLIO_STATE_FIXTURE)로 읽은 값인가 — 관리자 화면이 띠를 띄운다 */
  fixture?: boolean;
};

export const EMPTY_FLAGS: PortfolioFlags = { proposalsDown: false, allDemosDown: false };

/** 캐시 무효화 태그 — 관리자가 저장하면 revalidateTag(PORTFOLIO_STATE_TAG) 로 즉시 갈아 끼운다 */
export const PORTFOLIO_STATE_TAG = "portfolio-state";

const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

/**
 * 관리자 쓰기에 필요한 키가 있는가 — 없으면 화면이 「서버 설정 오류」를 시끄럽게 알린다(조용한 강등 금지).
 *
 * 주소(SUPABASE_URL)는 여기서 따지지 않는다: 공개 값이라 코드에 기본값이 있고(lib/supabase-url.ts),
 * 예전에 「환경변수 NEXT_PUBLIC_SUPABASE_URL 이 없으면 false」로 두었더니 문의 접수는 되는데 관리자만
 * 영영 503 이 나는 갈래가 생겼다. 없으면 안 되는 것은 **키 하나**다.
 */
export function hasServiceRoleKey(): boolean {
  return SERVICE_ROLE_KEY.length > 0;
}

// ── 개발·검증용 가짜 상태 (PORTFOLIO_STATE_FIXTURE) ────────────────────────────
//
// 왜 필요한가: 상태 표 3개가 아직 운영 데이터베이스에 없다. 그래서 「wonik-qnc 를 비공개로 바꾸면
// 정말 주소가 막히는가」, 「제안 시안 전부 내리기가 실제로 다 막는가」, 「DB 읽기가 실패하면 샘플은
// 살고 제안 시안만 내려가는가」를 **화면으로 확인할 방법이 없다.** 이 장치는 데이터베이스 대신 읽을
// 스냅숏을 환경변수로 직접 넣어, 표 없이도 그 갈래들을 실제 서버에서 재 보게 한다.
//
// 🔒 운영에서 절대 쓰이지 않게 하는 조건 — **셋을 다 만족해야** 쓴다:
//   1) PORTFOLIO_STATE_FIXTURE 에 JSON 이 들어 있다
//   2) PORTFOLIO_STATE_FIXTURE_ACK 가 정확히 "local-verification-only" 다
//      (JSON 하나가 실수로 흘러 들어가도 그것만으로는 켜지지 않게 확인 값을 따로 둔다)
//   3) Vercel 이 아니다 — process.env.VERCEL 은 production·preview·development 배포에서 모두 켜진다
// NODE_ENV 만으로는 못 막는다: 검증 자체가 `next build && next start`(= NODE_ENV=production)로 돌아야
// 운영과 같은 렌더 경로를 재는 것이기 때문이다. 그래서 「운영인가」의 판정을 NODE_ENV 가 아니라
// **배포 환경(VERCEL)** 으로 한다. 조건이 깨지면 조용히 무시하지 않고 console.error 로 시끄럽게 알린다.
//
// 형식 (rows 의 값은 상태 문자열 하나이거나, 순서·대표작까지 담은 객체):
//   {"ok":true,"flags":{"proposalsDown":false},"rows":{"wonik-qnc":"private","maison":{"status":"unlisted"}}}
//   {"ok":false,"error":"표가 없습니다"}                    ← 읽기 실패(DB 장애) 흉내
const FIXTURE_ACK = "local-verification-only";

/**
 * VERCEL 만으로는 운영을 가릴 수 없다 — 자체 호스팅·Docker 로 올리면 NODE_ENV=production 이어도
 * process.env.VERCEL 이 없어 가짜 상태가 그대로 켜진다(= 데이터베이스를 아예 안 읽는 운영 서버).
 * 그래서 **운영 빌드에서는 기본으로 끈다.** 검증은 `next build && next start` 로 해야 하므로
 * 그때만 켜는 전용 플래그를 하나 더 둔다 — 값까지 정확히 맞아야 한다.
 */
const FIXTURE_PROD_ACK_ENV = "PORTFOLIO_STATE_FIXTURE_ALLOW_PRODUCTION_BUILD";
const FIXTURE_PROD_ACK = "yes-local-next-start";

function parseFixtureRow(slug: string, raw: unknown): PortfolioStateRow | null {
  const source = typeof raw === "string" ? { status: raw } : raw;
  if (typeof source !== "object" || source === null) return null;
  const r = source as Record<string, unknown>;
  if (typeof r.status !== "string" || !(PORTFOLIO_STATUSES as readonly string[]).includes(r.status)) return null;
  return {
    slug,
    status: r.status as PortfolioStatus,
    sortOrder: typeof r.sortOrder === "number" ? r.sortOrder : null,
    featured: typeof r.featured === "boolean" ? r.featured : null,
    updatedAt: typeof r.updatedAt === "string" ? r.updatedAt : "",
    updatedBy: typeof r.updatedBy === "string" ? r.updatedBy : "fixture",
  };
}

/** 한 번만 해석하고 한 번만 알린다(요청마다 로그가 쌓이지 않게). undefined = 아직 안 봄 */
let fixtureCache: StateSnapshot | null | undefined;

function readFixture(): StateSnapshot | null {
  if (fixtureCache !== undefined) return fixtureCache;
  fixtureCache = null;

  const raw = process.env.PORTFOLIO_STATE_FIXTURE;
  if (!raw) return fixtureCache;

  if (process.env.VERCEL) {
    console.error("[portfolio-state] PORTFOLIO_STATE_FIXTURE 는 배포 환경에서 쓸 수 없습니다 — 무시하고 데이터베이스를 읽습니다.");
    return fixtureCache;
  }
  if (process.env.PORTFOLIO_STATE_FIXTURE_ACK !== FIXTURE_ACK) {
    console.error(
      `[portfolio-state] PORTFOLIO_STATE_FIXTURE 가 있지만 PORTFOLIO_STATE_FIXTURE_ACK 가 「${FIXTURE_ACK}」 가 아니라 무시합니다.`,
    );
    return fixtureCache;
  }
  if (process.env.NODE_ENV === "production" && process.env[FIXTURE_PROD_ACK_ENV] !== FIXTURE_PROD_ACK) {
    console.error(
      `[portfolio-state] PORTFOLIO_STATE_FIXTURE 는 운영 빌드(NODE_ENV=production)에서 쓰지 않습니다 — 무시하고 데이터베이스를 읽습니다. ` +
        `로컬 검증(next build && next start)이라면 ${FIXTURE_PROD_ACK_ENV}=${FIXTURE_PROD_ACK} 를 같이 주세요.`,
    );
    return fixtureCache;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    console.error("[portfolio-state] PORTFOLIO_STATE_FIXTURE 가 JSON 이 아닙니다 — 무시합니다:", (e as Error).message);
    return fixtureCache;
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    console.error("[portfolio-state] PORTFOLIO_STATE_FIXTURE 최상위가 객체가 아닙니다 — 무시합니다.");
    return fixtureCache;
  }

  const f = parsed as Record<string, unknown>;
  const ok = f.ok !== false;
  const rows: Record<string, PortfolioStateRow> = {};
  if (typeof f.rows === "object" && f.rows !== null && !Array.isArray(f.rows)) {
    for (const [slug, value] of Object.entries(f.rows as Record<string, unknown>)) {
      const row = parseFixtureRow(slug, value);
      if (row) rows[slug] = row;
      else console.error(`[portfolio-state] PORTFOLIO_STATE_FIXTURE 의 「${slug}」 값이 상태(public|unlisted|private)가 아니라 건너뜁니다.`);
    }
  }
  const flagsRaw = typeof f.flags === "object" && f.flags !== null ? (f.flags as Record<string, unknown>) : {};
  const flags: PortfolioFlags = {
    proposalsDown: flagsRaw.proposalsDown === true,
    allDemosDown: flagsRaw.allDemosDown === true,
  };

  console.warn(
    `[portfolio-state] ⚠️ 가짜 상태(PORTFOLIO_STATE_FIXTURE)로 동작합니다 — 데이터베이스를 읽지 않습니다. ok=${ok} · 행 ${Object.keys(rows).length}개 · 제안시안전부내리기=${flags.proposalsDown} · 데모전부내리기=${flags.allDemosDown}`,
  );

  fixtureCache = ok
    ? { rows, flags, ok: true, fetchedAt: Date.now(), fixture: true }
    : {
        rows: {},
        flags: EMPTY_FLAGS,
        ok: false,
        error: typeof f.error === "string" ? f.error : "가짜 상태: 읽기 실패",
        fetchedAt: Date.now(),
        fixture: true,
      };
  return fixtureCache;
}

/**
 * 상태 읽기 한 번의 제한 시간. 「데이터베이스가 죽어도 사이트는 산다」는 **응답이 없을 때**도 지켜져야 한다 —
 * 시간 제한이 없으면 느린 DB 가 데모·홈·포트폴리오 요청을 통째로 붙잡는다(죽은 것보다 나쁘다).
 * 잘리면 ok:false 로 넘어가 제안 시안만 내려가고 샘플·운영 서비스는 그대로 보인다.
 */
const READ_TIMEOUT_MS = 4000;

async function fetchTable(table: string, query: string): Promise<unknown[]> {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      Accept: "application/json",
    },
    signal: AbortSignal.timeout(READ_TIMEOUT_MS),
    // 상태는 자주 바뀐다 — fetch 자체는 캐시하지 않고 바깥 unstable_cache 가 태그로 관리한다
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`${table} ${res.status} ${await res.text().catch(() => "")}`.trim());
  const json: unknown = await res.json();
  return Array.isArray(json) ? json : [];
}

function toRow(raw: unknown): PortfolioStateRow | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;
  const slug = typeof r.slug === "string" ? r.slug : null;
  const status = typeof r.status === "string" && (PORTFOLIO_STATUSES as readonly string[]).includes(r.status)
    ? (r.status as PortfolioStatus)
    : null;
  if (!slug || !status) return null;
  return {
    slug,
    status,
    sortOrder: typeof r.sort_order === "number" ? r.sort_order : null,
    featured: typeof r.featured === "boolean" ? r.featured : null,
    updatedAt: typeof r.updated_at === "string" ? r.updated_at : "",
    updatedBy: typeof r.updated_by === "string" ? r.updated_by : "",
  };
}

/** 데이터베이스에서 상태를 읽는다. 실패해도 예외를 던지지 않고 ok:false 로 알린다 */
export async function readStateUncached(): Promise<StateSnapshot> {
  // 개발·검증용 가짜 상태가 켜져 있으면 데이터베이스를 아예 건드리지 않는다(위 readFixture 주석 참고).
  // 읽기 한 곳에만 둔다 — 쓰기(lib/admin/store.ts)는 가짜 상태를 모른다. 가짜 상태에서 저장을 누르면
  // 진짜 데이터베이스로 가거나 「서버 설정 오류」가 난다. 가짜가 진짜를 덮어쓰지 않게 하려는 것이다.
  const fixture = readFixture();
  if (fixture) return { ...fixture, fetchedAt: Date.now() };

  if (!hasServiceRoleKey()) {
    return {
      rows: {},
      flags: EMPTY_FLAGS,
      ok: false,
      error: "SUPABASE_SERVICE_ROLE_KEY 가 없습니다",
      fetchedAt: Date.now(),
    };
  }
  try {
    const [stateRaw, flagsRaw] = await Promise.all([
      fetchTable("portfolio_state", "select=*"),
      fetchTable("portfolio_flags", "select=key,enabled"),
    ]);
    const rows: Record<string, PortfolioStateRow> = {};
    for (const raw of stateRaw) {
      const row = toRow(raw);
      if (row) rows[row.slug] = row;
    }
    const flags = { ...EMPTY_FLAGS };
    for (const raw of flagsRaw) {
      if (typeof raw !== "object" || raw === null) continue;
      const f = raw as Record<string, unknown>;
      if (f.key === "proposals_down") flags.proposalsDown = f.enabled === true;
      if (f.key === "all_demos_down") flags.allDemosDown = f.enabled === true;
    }
    return { rows, flags, ok: true, fetchedAt: Date.now() };
  } catch (e) {
    return { rows: {}, flags: EMPTY_FLAGS, ok: false, error: (e as Error).message, fetchedAt: Date.now() };
  }
}

/**
 * 한 요청 안에서의 읽기 메모.
 *
 * 왜: 데모 한 장을 그리는 데 판정이 **두 번** 필요하다 — 레이아웃(주소를 열어 줄지)과 generateMetadata
 * (제목·og 를 내보낼지). 메모가 없으면 요청 1건에 상태 읽기 2회(최악 4초 × 2)가 된다.
 * React cache() 는 요청 경계마다 비워지므로 「내려간 것이 되살아난다」는 위험이 없다(캐시가 아니라 메모다).
 */
export const readStateForRequest = cache(readStateUncached);

// 목록(홈·포트폴리오)이 쓰는 캐시. 관리자가 저장하면 revalidateTag 로 즉시 갈아 끼우므로 보통은 이 값이 안 쓰인다 —
// 이건 **태그 무효화가 닿지 않은 경우**(다른 인스턴스, 재배포, 저장 뒤 revalidate 실패)의 상한이다.
// 300초였는데 15초로 줄였다: 실측에서 상태를 바꾸고 서버를 다시 띄우자 목록이 **앞 스냅숏 그대로** 나왔다
// (unstable_cache 는 기한이 지나도 일단 낡은 값을 내주고 뒤에서 갱신한다 + .next/cache 는 재시작해도 남는다).
// 내린 시안의 회사 이름이 목록에 5분 더 남는 것보다, 요청 15초당 읽기 1회가 싸다. 화면에 적은 「최대 20초」와도 맞는다.
// (주소를 여닫는 판정은 이 캐시를 아예 쓰지 않는다 — lib/portfolio/gate.ts 참고)
//
// 캐시 키에 **배포 식별자**를 넣는다: .next/cache 는 재배포·재시작해도 남아서, 키가 같으면 예전 배포에서
// 굳은 스냅숏이 그대로 되살아난다(실측에서 앞 시나리오의 스냅숏이 뒤 시나리오에 나왔다).
const DEPLOY_ID =
  process.env.VERCEL_DEPLOYMENT_ID ?? process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.NEXT_BUILD_ID ?? "dev";

const readStateCached = unstable_cache(readStateUncached, ["portfolio-state-v2", DEPLOY_ID], {
  tags: [PORTFOLIO_STATE_TAG],
  revalidate: 15,
});

/**
 * 캐시 값을 **믿어도 되는 한계 시간**. unstable_cache 는 기한이 지나도 일단 낡은 값을 내주고 뒤에서
 * 갱신한다(stale-while-revalidate). 그래서 revalidate 15초는 「15초 지난 값」을 보장하지 않는다 —
 * 실측(3081): DB 를 죽이기 전에 읽힌 「공개」 스냅숏이 죽인 뒤 첫 요청에 그대로 나와, 주소는 이미 307 인데
 * /portfolio 에는 실존 업체 카드가 남았다. 여기서 값 안의 fetchedAt 으로 그 창을 닫는다 —
 * 20초보다 오래된 값이면 캐시를 버리고 지금 값을 읽는다(읽기가 실패하면 fail-closed 로 넘어간다).
 */
const STALE_HARD_MS = 20_000;

/**
 * 공개 화면(홈·포트폴리오·문의)이 쓰는 읽기.
 *
 * - 캐시가 **읽기 실패**를 담고 있으면 그대로 돌려준다. 다시 읽지 않는다 — 실패는 fail-closed 판정이라
 *   안전한 쪽이고, 여기서 한 번 더 읽으면 느린 DB 에서 한 장이 타임아웃 4초를 두 번 먹는다.
 * - 캐시가 성공이어도 **20초보다 낡았으면 버리고 지금 값을 읽는다**(위 STALE_HARD_MS 주석).
 */
export async function getState(): Promise<StateSnapshot> {
  const cached = await readStateCached();
  if (!cached.ok) return cached;
  if (Date.now() - cached.fetchedAt > STALE_HARD_MS) return readStateForRequest();
  return cached;
}

/** 이 작업물을 지금 어떤 상태로 다뤄야 하는가 */
export function resolveStatus(
  snapshot: StateSnapshot,
  slug: string,
  kind: PortfolioKind,
): PortfolioStatus {
  if (!snapshot.ok) return fallbackStatus(kind);
  if (snapshot.flags.allDemosDown) return "private";
  if (snapshot.flags.proposalsDown && kind === "proposal") return "private";
  return snapshot.rows[slug]?.status ?? defaultStatus(kind);
}

/** 목록(홈·포트폴리오·헤더)에 보일 것인가 */
export function isListed(status: PortfolioStatus): boolean {
  return status === "public";
}

/** 주소로 열 수 있는가 */
export function isReachable(status: PortfolioStatus): boolean {
  return status !== "private";
}
