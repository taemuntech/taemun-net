// 관리자 — 견적 문의 목록 읽기·상태 바꾸기(구현계획서 P6). 서버 전용.
//
// inquiries 표는 공개 키로 읽을 수도 쓸 수도 없다(마이그레이션 20260918220000). 그래서 service_role 로만 다룬다 —
// 키가 없으면 조용히 비우지 않고 「서버 설정 오류」로 알린다(store.ts 와 같은 원칙).
// 삭제는 일부러 없다: 보유기간(접수일부터 1년)이 지나면 파기하는 일은 따로 만든다. 여기서는 상태만 바꾼다.

import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "@/lib/supabase-url";

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

export type InquiryRow = {
  id: string;
  created_at: string;
  request_no: string | null;
  client_name: string;
  phone: string;
  email: string | null;
  services: string[];
  budget: string;
  timeline: string;
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
};

/** 읽는 칸을 한 곳에 — 표에 없는 칸을 적으면 PostgREST 가 쿼리 전체를 거절한다(칸 추가는 20260919090000) */
const COLUMNS =
  "id,created_at,request_no,client_name,phone,email,services,budget,timeline,reference_url,details,status," +
  "referral_from,referral_kind,entry,path,budget_flexible,contact_pref,reference_usage";

export const INQUIRY_PAGE_SIZE = 30;

function serviceClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return null;
  return createClient(SUPABASE_URL, key, { auth: { persistSession: false } });
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

/** 최신순. 옛 행의 status 가 비어 있으면 「접수」로 센다 */
export async function listInquiries(opts: { status: InquiryStatus | "all"; page: number }): Promise<InquiryListResult> {
  const db = serviceClient();
  if (!db) return { rows: [], total: 0, counts: EMPTY_COUNTS(), error: "서버 설정 오류입니다. (SUPABASE_SERVICE_ROLE_KEY 없음)" };

  const page = Math.max(1, Math.floor(opts.page));
  const from = (page - 1) * INQUIRY_PAGE_SIZE;
  let query = db
    .from("inquiries")
    .select(COLUMNS, { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, from + INQUIRY_PAGE_SIZE - 1);
  if (opts.status === "pending") query = query.or("status.eq.pending,status.is.null");
  else if (opts.status !== "all") query = query.eq("status", opts.status);

  const counts = EMPTY_COUNTS();
  const [list, ...countResults] = await Promise.all([
    query,
    db.from("inquiries").select("id", { count: "exact", head: true }),
    ...INQUIRY_STATUSES.map((s) =>
      s === "pending"
        ? db.from("inquiries").select("id", { count: "exact", head: true }).or("status.eq.pending,status.is.null")
        : db.from("inquiries").select("id", { count: "exact", head: true }).eq("status", s),
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

export async function setInquiryStatus(id: string, status: InquiryStatus): Promise<{ error: string | null; status: number }> {
  const db = serviceClient();
  if (!db) return { error: "서버 설정 오류입니다.", status: 503 };
  const res = await db.from("inquiries").update({ status }).eq("id", id).select("id");
  if (res.error) {
    console.error("admin inquiries: status update failed:", res.error);
    return { error: "저장하지 못했습니다.", status: 502 };
  }
  if (!res.data || res.data.length === 0) return { error: "그 문의를 찾지 못했습니다.", status: 404 };
  return { error: null, status: 200 };
}
