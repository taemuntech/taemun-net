// 관리자 — 견적 문의 목록 읽기·상태 바꾸기(구현계획서 P6). 서버 전용.
//
// inquiries 표는 공개 키로 읽을 수도 쓸 수도 없다(마이그레이션 20260918220000). 그래서 service_role 로만 다룬다 —
// 키가 없으면 조용히 비우지 않고 「서버 설정 오류」로 알린다(store.ts 와 같은 원칙).
// 삭제는 일부러 없다: 보유기간(접수일부터 1년)이 지나면 파기하는 일은 DB 함수 crm_purge_due 가 매일 한다.
//
// 2026-09-19(P1b): 상태 바꾸기는 crm-store.ts 의 transitionInquiry(SQL 함수 inquiry_transition — 표 갱신과
// 이력 한 줄을 한 트랜잭션으로)로 옮겼다. 여기에는 목록 읽기만 남는다.
// - 파기된 행(purged_at 있음)은 목록·건수에서 뺀다 — 이름·연락처가 비어 있는 껍데기라 화면에 둘 이유가 없다.
// - 「오늘」 화면에서 한 건을 눌러 들어오면 접수번호(request_no) 또는 id 로 그 한 건만 거른다.
// - 가짜 관리대장(crm-fixture.ts)이 켜져 있으면 데이터베이스 대신 그쪽을 읽는다.

import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "@/lib/supabase-url";
import { crmFixture, crmFixtureEnabled } from "./crm-fixture";
import { timedFetch } from "./crm-store";

export const INQUIRY_STATUSES = ["pending", "contacted", "quoted", "contracted", "closed"] as const;
export type InquiryStatus = (typeof INQUIRY_STATUSES)[number];

export const INQUIRY_STATUS_LABEL: Record<InquiryStatus, string> = {
  pending: "접수",
  contacted: "연락함",
  quoted: "견적 보냄",
  contracted: "계약",
  closed: "종료",
};

export function isInquiryStatus(v: unknown): v is InquiryStatus {
  return typeof v === "string" && (INQUIRY_STATUSES as readonly string[]).includes(v);
}

/**
 * 이름·연락처·서비스·예산·일정은 파기(crm_purge_due)되면 비므로 null 이 될 수 있다(표의 NOT NULL 도 풀었다 —
 * 대신 「파기 안 된 행은 다 차 있어야 한다」는 체크 제약 inquiries_pii_until_purged_chk 가 있다).
 * 이 목록은 파기된 행을 빼고 읽지만, 타입은 표 그대로 둔다.
 */
export type InquiryRow = {
  id: string;
  created_at: string;
  request_no: string | null;
  client_name: string | null;
  phone: string | null;
  email: string | null;
  services: string[] | null;
  budget: string | null;
  timeline: string | null;
  reference_url: string | null;
  details: string | null;
  status: string | null;
  referral_from: string | null;
  referral_kind: string | null;
  entry: string | null;
  path: string | null;
  budget_flexible: boolean | null;
  contact_pref: string | null;
  reference_usage: string | null;
  updated_at: string | null;
  closed_reason: string | null;
  next_action: string | null;
  next_action_due: string | null;
  retention_basis: string;
  retain_until: string | null;
  purged_at: string | null;
};

/** 읽는 칸을 한 곳에 — 표에 없는 칸을 적으면 PostgREST 가 쿼리 전체를 거절한다(칸 추가는 20260919090000) */
const COLUMNS =
  "id,created_at,request_no,client_name,phone,email,services,budget,timeline,reference_url,details,status," +
  "referral_from,referral_kind,entry,path,budget_flexible,contact_pref,reference_usage," +
  // 관리대장 칸 — 마이그레이션 20260919120000 이 먼저 적용돼 있어야 한다(없으면 목록 전체가 42703 으로 실패)
  "updated_at,closed_reason,next_action,next_action_due,retention_basis,retain_until,purged_at";

export const INQUIRY_PAGE_SIZE = 30;

function serviceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return null;
  // 관리대장(crm-store)과 같은 4초 제한 — 데이터베이스가 매달려도 화면이 끝없이 멈추지 않게
  return createClient(SUPABASE_URL, key, { auth: { persistSession: false }, global: { fetch: timedFetch } });
}

export type InquiryListResult = {
  rows: InquiryRow[];
  total: number;
  /** 상태별 건수(탭) */
  counts: Record<InquiryStatus | "all", number>;
  error: string | null;
};

const EMPTY_COUNTS = (): InquiryListResult["counts"] => ({
  all: 0,
  pending: 0,
  contacted: 0,
  quoted: 0,
  contracted: 0,
  closed: 0,
});

export type InquiryListOptions = {
  status: InquiryStatus | "all";
  page: number;
  /** 접수번호로 한 건만(정확히 일치) */
  requestNo?: string | null;
  /** id 로 한 건만 */
  id?: string | null;
};

/**
 * 최신순. 파기된 행은 목록·건수에서 뺀다. 옛 행의 status 가 비어 있으면 「접수」로 센다
 * (마이그레이션이 null 을 pending 으로 채우지만, 적용 전 데이터에서도 같은 답이 나오게 둔다).
 * requestNo·id 는 목록에만 건다 — 탭의 상태별 건수는 늘 전체 기준이다.
 */
export async function listInquiries(opts: InquiryListOptions): Promise<InquiryListResult> {
  if (crmFixtureEnabled()) return crmFixture().listInquiries(opts, INQUIRY_PAGE_SIZE);
  const db = serviceClient();
  if (!db) return { rows: [], total: 0, counts: EMPTY_COUNTS(), error: "서버 설정 오류입니다. (SUPABASE_SERVICE_ROLE_KEY 없음)" };

  const page = Math.max(1, Math.floor(opts.page));
  const from = (page - 1) * INQUIRY_PAGE_SIZE;
  let query = db
    .from("inquiries")
    .select(COLUMNS, { count: "exact" })
    .is("purged_at", null)
    .order("created_at", { ascending: false })
    .order("id", { ascending: true })
    .range(from, from + INQUIRY_PAGE_SIZE - 1);
  if (opts.status === "pending") query = query.or("status.eq.pending,status.is.null");
  else if (opts.status !== "all") query = query.eq("status", opts.status);
  if (opts.requestNo) query = query.eq("request_no", opts.requestNo);
  if (opts.id) query = query.eq("id", opts.id);

  const counted = () => db.from("inquiries").select("id", { count: "exact", head: true }).is("purged_at", null);
  const counts = EMPTY_COUNTS();
  const [list, ...countResults] = await Promise.all([
    query,
    counted(),
    ...INQUIRY_STATUSES.map((s) =>
      s === "pending" ? counted().or("status.eq.pending,status.is.null") : counted().eq("status", s),
    ),
  ]);
  counts.all = countResults[0].count ?? 0;
  INQUIRY_STATUSES.forEach((s, i) => {
    counts[s] = countResults[i + 1].count ?? 0;
  });

  if (list.error) {
    console.error("admin inquiries: list failed:", list.error);
    return { rows: [], total: 0, counts, error: `목록을 읽지 못했습니다 (${list.error.code ?? "오류"})` };
  }
  return { rows: (list.data ?? []) as unknown as InquiryRow[], total: list.count ?? 0, counts, error: null };
}
