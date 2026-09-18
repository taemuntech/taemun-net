// 관리자 쓰기 — Supabase REST 에 service_role 키로 직접 쓴다.
//
// 읽기는 src/lib/portfolio/state.ts 가 정본이고, 여기는 **쓰기만** 한다.
// 규칙 셋:
// 1) 키가 없으면 던지지 않고 `{ ok:false, reason:'no-service-key' }` 로 돌려준다 —
//    라우트가 이걸 503 「서버 설정 오류입니다.」 로 바꾼다. 공개 키로 조용히 강등되지 않는다
//    (anon 으로 강등되던 옛 src/lib/supabase.ts getAdminClient() 는 2026-09-18 문의 API 가 떠나면서 지웠다).
// 2) 표가 아직 없거나 DB 가 죽어도 예외로 사이트를 넘어뜨리지 않는다 — 실패는 값으로 돌려준다.
// 3) **모든 쓰기는 portfolio_state_log 에 한 줄을 남긴다**(추가 전용 표). 이력 쓰기가 실패해도
//    본 쓰기는 이미 끝났으므로 성공으로 보고하되 logged:false 로 알린다.
//
// 서버 전용. 클라이언트 컴포넌트에서 import 하지 말 것.

import { getPortfolioBySlug } from "@/lib/portfolio/registry";
import {
  defaultStatus,
  hasServiceRoleKey,
  type PortfolioStatus,
} from "@/lib/portfolio/state";
// 주소는 읽기(state.ts)·문의 API 와 같은 한 곳에서 가져온다 — 세 곳이 다르게 읽으면 관리자만 죽는 갈래가 생긴다
import { SUPABASE_URL } from "@/lib/supabase-url";
import { ADMIN_ACTOR } from "./session";

const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

/** 전역 스위치 키 — 표(portfolio_flags.key)와 state.ts 의 읽기 분기와 같은 문자열 */
export const FLAG_KEYS = ["proposals_down", "all_demos_down"] as const;
export type FlagKey = (typeof FLAG_KEYS)[number];

export const FLAG_LABEL: Record<FlagKey, string> = {
  proposals_down: "제안 시안 전부 내리기",
  all_demos_down: "데모 전부 내리기",
};

export type StoreFailure =
  | { ok: false; reason: "no-service-key"; message: string }
  | { ok: false; reason: "unknown-slug"; message: string }
  | { ok: false; reason: "db-error"; message: string };

export type StoreOk<T> = { ok: true; data: T; logged: boolean };
export type StoreResult<T> = StoreOk<T> | StoreFailure;

export type StateWriteResult = {
  slug: string;
  from: PortfolioStatus | null;
  to: PortfolioStatus;
  sortOrder: number | null;
  featured: boolean | null;
};

export type LogEntry = {
  id: number;
  slug: string;
  fromStatus: string | null;
  toStatus: string | null;
  action: string;
  actor: string;
  note: string | null;
  createdAt: string;
};

const NO_KEY: StoreFailure = {
  ok: false,
  reason: "no-service-key",
  message: "SUPABASE_SERVICE_ROLE_KEY 가 없습니다",
};

function dbError(e: unknown): StoreFailure {
  return { ok: false, reason: "db-error", message: e instanceof Error ? e.message : String(e) };
}

async function rest(path: string, init: RequestInit & { prefer?: string }): Promise<unknown> {
  const { prefer, headers, ...rest_ } = init;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...rest_,
    headers: {
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(prefer ? { Prefer: prefer } : {}),
      ...(headers as Record<string, string> | undefined),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`${res.status} ${body}`.trim());
  }
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

function rowOf(raw: unknown): Record<string, unknown> | null {
  if (Array.isArray(raw)) return rowOf(raw[0]);
  if (typeof raw === "object" && raw !== null) return raw as Record<string, unknown>;
  return null;
}

function statusOf(row: Record<string, unknown> | null): PortfolioStatus | null {
  const s = row?.status;
  return s === "public" || s === "unlisted" || s === "private" ? s : null;
}

/** 이력 한 줄. 실패해도 예외를 밖으로 내보내지 않는다(본 쓰기는 이미 끝났다) */
async function appendLog(entry: {
  slug: string;
  from: string | null;
  to: string | null;
  action: string;
  actor: string;
  note?: string | null;
}): Promise<boolean> {
  try {
    await rest("portfolio_state_log", {
      method: "POST",
      prefer: "return=minimal",
      body: JSON.stringify({
        slug: entry.slug,
        from_status: entry.from,
        to_status: entry.to,
        action: entry.action,
        actor: entry.actor,
        note: entry.note ?? null,
      }),
    });
    return true;
  } catch (e) {
    console.error("portfolio_state_log 기록 실패:", e);
    return false;
  }
}

async function readRow(slug: string): Promise<Record<string, unknown> | null> {
  const raw = await rest(`portfolio_state?slug=eq.${encodeURIComponent(slug)}&select=*`, { method: "GET" });
  return rowOf(raw);
}

/**
 * 한 칸만 바꾼다. 행이 없으면 만들고(없던 칸은 종류 기본값), 있으면 그 칸만 PATCH 한다.
 * PostgREST 의 upsert 는 빠뜨린 칸을 기본값으로 덮어써서 sort_order·featured 가 날아가므로 쓰지 않는다.
 */
async function writeField(
  slug: string,
  patch: { status?: PortfolioStatus; sort_order?: number | null; featured?: boolean | null },
  action: string,
  actor: string,
  note: string | null,
): Promise<StoreResult<StateWriteResult>> {
  if (!hasServiceRoleKey()) return NO_KEY;
  const card = getPortfolioBySlug(slug);
  if (!card) {
    return { ok: false, reason: "unknown-slug", message: `등록되지 않은 작업물 「${slug}」 입니다` };
  }
  try {
    const existing = await readRow(slug);
    const from = statusOf(existing);
    const nextStatus = patch.status ?? from ?? defaultStatus(card.kind);
    const body: Record<string, unknown> = {
      ...patch,
      status: nextStatus,
      updated_at: new Date().toISOString(),
      updated_by: actor,
    };
    let saved: Record<string, unknown> | null;
    if (existing) {
      saved = rowOf(
        await rest(`portfolio_state?slug=eq.${encodeURIComponent(slug)}`, {
          method: "PATCH",
          prefer: "return=representation",
          body: JSON.stringify(body),
        }),
      );
    } else {
      saved = rowOf(
        await rest("portfolio_state", {
          method: "POST",
          prefer: "return=representation",
          body: JSON.stringify({ slug, ...body }),
        }),
      );
    }
    const logged = await appendLog({
      slug,
      from: from ?? `(기본값 ${defaultStatus(card.kind)})`,
      to: nextStatus,
      action,
      actor,
      note,
    });
    return {
      ok: true,
      logged,
      data: {
        slug,
        from,
        to: nextStatus,
        sortOrder: typeof saved?.sort_order === "number" ? saved.sort_order : null,
        featured: typeof saved?.featured === "boolean" ? saved.featured : null,
      },
    };
  } catch (e) {
    return dbError(e);
  }
}

/** 공개 상태를 바꾼다 */
export function setStatus(
  slug: string,
  status: PortfolioStatus,
  actor: string = ADMIN_ACTOR,
  note: string | null = null,
): Promise<StoreResult<StateWriteResult>> {
  return writeField(slug, { status }, "status", actor, note);
}

/** 목록 순서를 바꾼다(작을수록 앞). null 이면 JSON 의 order 규칙으로 돌아간다 */
export function setOrder(
  slug: string,
  sortOrder: number | null,
  actor: string = ADMIN_ACTOR,
  note: string | null = null,
): Promise<StoreResult<StateWriteResult>> {
  return writeField(slug, { sort_order: sortOrder }, "order", actor, note ?? `순서 ${sortOrder ?? "기본값"}`);
}

/** 홈 대표작 지정 */
export function setFeatured(
  slug: string,
  value: boolean | null,
  actor: string = ADMIN_ACTOR,
  note: string | null = null,
): Promise<StoreResult<StateWriteResult>> {
  return writeField(slug, { featured: value }, "featured", actor, note ?? `대표작 ${value === null ? "기본값" : value ? "켬" : "끔"}`);
}

/** 전역 스위치. 이력의 slug 칸에는 `flag:<키>` 로 남는다(작업물 slug 와 섞이지 않게) */
export async function setFlag(
  key: FlagKey,
  enabled: boolean,
  actor: string = ADMIN_ACTOR,
  note: string | null = null,
): Promise<StoreResult<{ key: FlagKey; enabled: boolean }>> {
  if (!hasServiceRoleKey()) return NO_KEY;
  try {
    const before = rowOf(
      await rest(`portfolio_flags?key=eq.${encodeURIComponent(key)}&select=key,enabled`, { method: "GET" }),
    );
    const body = { key, enabled, updated_at: new Date().toISOString(), updated_by: actor };
    if (before) {
      await rest(`portfolio_flags?key=eq.${encodeURIComponent(key)}`, {
        method: "PATCH",
        prefer: "return=minimal",
        body: JSON.stringify(body),
      });
    } else {
      await rest("portfolio_flags", { method: "POST", prefer: "return=minimal", body: JSON.stringify(body) });
    }
    const logged = await appendLog({
      slug: `flag:${key}`,
      from: before?.enabled === true ? "on" : "off",
      to: enabled ? "on" : "off",
      action: "flag",
      actor,
      note: note ?? FLAG_LABEL[key],
    });
    return { ok: true, logged, data: { key, enabled } };
  } catch (e) {
    return dbError(e);
  }
}

/** 최근 변경 이력 — 관리자 화면 아래쪽에 그대로 보여 준다 */
export async function listLog(limit = 30): Promise<StoreResult<LogEntry[]>> {
  if (!hasServiceRoleKey()) return NO_KEY;
  const safeLimit = Math.min(Math.max(Math.trunc(limit) || 1, 1), 200);
  try {
    const raw = await rest(`portfolio_state_log?select=*&order=created_at.desc&limit=${safeLimit}`, { method: "GET" });
    const rows = Array.isArray(raw) ? raw : [];
    const entries: LogEntry[] = [];
    for (const item of rows) {
      const r = rowOf(item);
      if (!r) continue;
      entries.push({
        id: typeof r.id === "number" ? r.id : 0,
        slug: typeof r.slug === "string" ? r.slug : "",
        fromStatus: typeof r.from_status === "string" ? r.from_status : null,
        toStatus: typeof r.to_status === "string" ? r.to_status : null,
        action: typeof r.action === "string" ? r.action : "",
        actor: typeof r.actor === "string" ? r.actor : "",
        note: typeof r.note === "string" ? r.note : null,
        createdAt: typeof r.created_at === "string" ? r.created_at : "",
      });
    }
    return { ok: true, logged: true, data: entries };
  } catch (e) {
    return dbError(e);
  }
}
