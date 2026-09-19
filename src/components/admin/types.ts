// 관리자 화면이 주고받는 모양 — 서버 page 가 만들고 클라이언트 뷰가 받는다.
// **직렬화 가능한 값만** 담는다(아이콘·함수 금지). state.ts 는 next/cache 를 끌고 오므로
// 클라이언트에서 값(STATUS_LABEL 등)을 import 하지 않고 여기 props 로 받아 쓴다. 타입만 `import type` 으로 가져온다.

import type { VerifyCheck } from "@/app/api/admin/verify/route";
import type { LogEntry } from "@/lib/admin/store";
import type { PortfolioKind } from "@/lib/portfolio/schema";
import type { PortfolioFlags, PortfolioStatus } from "@/lib/portfolio/state";

// verify 라우트·store 가 내보내는 모양을 그대로 쓴다(같은 모양을 두 벌 적지 않는다).
export type { LogEntry, VerifyCheck };

export type AdminItem = {
  slug: string;
  title: string;
  subtitle: string;
  kind: PortfolioKind;
  kindLabel: string;
  industryLabel: string;
  /** "/demo/<slug>" 또는 https:// 주소 */
  liveUrl: string;
  /** public 아래에 실제로 있는 썸네일만. 없으면 null */
  thumbnailSrc: string | null;
  /** 저장된(또는 종류 기본) 상태 — 버튼이 칠해지는 기준 */
  status: PortfolioStatus;
  /** 전역 스위치·DB 장애까지 반영한 지금 실제 상태 */
  effectiveStatus: PortfolioStatus;
  featured: boolean;
  /** DB 에 저장된 순서. null 이면 JSON 규칙대로 */
  sortOrder: number | null;
  updatedAt: string;
  updatedBy: string;
};

export type AdminViewProps = {
  items: AdminItem[];
  flags: PortfolioFlags;
  /** 상태 표를 읽었는가. false 면 쓰기 버튼을 잠그고 「제안 시안은 자동으로 내려가 있습니다」를 띄운다 */
  stateOk: boolean;
  stateError: string | null;
  /**
   * 못 읽었을 때 **다음에 할 일**을 사람 말로 적은 한 줄(예: 「Supabase 대시보드에서 … 을 실행하세요」).
   * 데이터베이스 원문만 보여 주면 비개발자는 무엇을 해야 할지 알 수 없다 — 이 화면을 처음 여는 날이 바로 그 상태다.
   */
  stateHint: string | null;
  /** 저장에 필요한 service_role 키가 서버에 있는가 */
  hasServiceRole: boolean;
  /** 지금 화면이 **가짜 상태**(PORTFOLIO_STATE_FIXTURE)를 읽고 있는가 — 저장은 진짜 데이터베이스로 간다 */
  fixture: boolean;
  statuses: PortfolioStatus[];
  statusLabel: Record<PortfolioStatus, string>;
  statusHelp: Record<PortfolioStatus, string>;
  /** 전역 스위치 키 → 사람이 읽는 이름 (이력 화면이 `flag:proposals_down` 을 옮겨 적는 데 쓴다) */
  flagLabel: Record<string, string>;
  actor: string;
  /** 최근 변경 이력 — 서버에서 미리 읽어 넘긴다. 못 읽었으면 빈 배열 + logError */
  log: LogEntry[];
  logError: string | null;
};

/** POST /api/admin/verify 응답 중 화면이 쓰는 부분 */
export type VerifyResponse = {
  baseUrl: string;
  checkedAt: string;
  stateOk: boolean;
  stateError: string | null;
  listingPages: { portfolio: number | null; home: number | null };
  checks: VerifyCheck[];
};

// ── P1b(관리대장 첫걸음) — 2026-09-19 가온 ─────────────────────────────────────────
// 아래는 오늘·설정·문의 화면이 같이 쓰는 **순수한** 도우미다(서버 page 와 클라이언트 뷰 양쪽에서 부른다).
// 왜 여기 두나: ui.tsx 는 "use client" 라 서버 page 가 거기서 함수를 꺼내 부르면 함수가 아니라 클라이언트 참조가 온다.
// 이 파일은 지시문이 없고, 바깥 값 import 는 kst.ts·digest-core.ts(둘 다 외부 import 없는 순수 모듈)뿐이라 어디서 불러도 안전하다.
// ⚠️ 날짜는 전부 KST 로 뽑는다 — getDate()·toLocaleString(시간대 없이) 금지. 형 폰이 해외 설정이어도 한국 시각이 떠야 한다.

import { kstParts } from "@/lib/kst";
import { parsePgTimestamp } from "@/lib/admin/digest-core";

/**
 * 시각 글자 → Date. crm_settings 의 값(마지막 파기 실행 등)은 Postgres 가 글자로 내보낸
 * 「2026-09-19 03:10:00.123+00」 꼴일 수 있어 new Date() 만으로는 브라우저마다 Invalid Date 가 난다.
 */
function toDate(iso: string | null | undefined): Date | null {
  if (!iso) return null;
  const ms = parsePgTimestamp(iso);
  return Number.isFinite(ms) ? new Date(ms) : null;
}

/** 로그인 계정 표시 이름 — 계정은 하나뿐이다(owner). 옛 쿠키·옛 이력의 "admin" 도 같은 사람이다 */
export function actorLabel(actor: string): string {
  return actor === "owner" || actor === "admin" ? "대표 계정" : actor;
}

/** 「9월 19일 오후 2:05」 — 연도를 뺀 짧은 KST 시각(카드·이력 줄에 쓴다) */
export function formatKstMonthDayTime(iso: string | null | undefined): string {
  const d = toDate(iso);
  if (!d) return "—";
  const { month, day, hour, minute } = kstParts(d);
  const h = Number(hour);
  const period = h < 12 ? "오전" : "오후";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${Number(month)}월 ${Number(day)}일 ${period} ${h12}:${minute}`;
}

/** 「9/19 14:05」 — 접속 기록처럼 줄이 많은 곳에 쓰는 가장 짧은 KST 시각 */
export function formatKstCompact(iso: string | null | undefined): string {
  const d = toDate(iso);
  if (!d) return "—";
  const { month, day, hour, minute } = kstParts(d);
  return `${Number(month)}/${Number(day)} ${hour}:${minute}`;
}

const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토"] as const;

/**
 * 「9월 19일 (토)」 — KST 날짜 문자열(YYYY-MM-DD)을 그대로 읽는다.
 * 요일은 Date.UTC 로 계산한다(달력 날짜만 다루므로 서버·브라우저 시간대가 끼어들 틈이 없다).
 */
export function formatYmdWithWeekday(ymd: string | null | undefined): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd ?? "");
  if (!m) return "—";
  const y = Number(m[1]);
  const mo = Number(m[2]);
  const d = Number(m[3]);
  const wd = new Date(Date.UTC(y, mo - 1, d)).getUTCDay();
  return `${mo}월 ${d}일 (${WEEKDAY[wd]})`;
}

/** 「9월 19일」 — KST 날짜 문자열(YYYY-MM-DD) */
export function formatYmdShort(ymd: string | null | undefined): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd ?? "");
  if (!m) return "—";
  return `${Number(m[2])}월 ${Number(m[3])}일`;
}

/** KST 날짜 문자열에 날수를 더한다 — 「3일 뒤」 같은 빠른 선택에 쓴다(달력 날짜 계산, 시간대 무관) */
export function addDaysYmd(ymd: string, days: number): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd);
  if (!m) return ymd;
  const t = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3]) + days));
  const mm = String(t.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(t.getUTCDate()).padStart(2, "0");
  return `${t.getUTCFullYear()}-${mm}-${dd}`;
}

/**
 * 「3시간 전」「2일 전」 — 기준 시각(now)을 **서버가 넘긴 값**으로 받는다.
 * 브라우저 시계로 계산하면 서버가 그린 글자와 어긋나 수화(hydration) 경고가 난다.
 */
export function agoLabel(iso: string | null | undefined, nowIso: string): string | null {
  const d = toDate(iso);
  const n = toDate(nowIso);
  if (!d || !n) return null;
  const t = d.getTime();
  const now = n.getTime();
  const min = Math.floor((now - t) / 60000);
  if (min < 1) return "방금";
  if (min < 60) return `${min}분 전`;
  const h = Math.floor(min / 60);
  if (h < 48) return `${h}시간 전`;
  return `${Math.floor(h / 24)}일 전`;
}
