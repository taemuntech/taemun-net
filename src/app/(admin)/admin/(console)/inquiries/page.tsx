// 관리자 — 견적 문의 목록(구현계획서 P6). 접수번호·유입·레퍼런스 활용·연락 방법을 한눈에 보고 상태를 바꾼다.
// 읽기는 여기(서버)에서 끝낸다. 상태 바꾸기만 /api/admin/inquiries 로 간다.
//
// P1b(2026-09-19 가온): 카드에 「다음 할 일」·상태 이력·멈춘 딜 표시가 붙었다. 「오늘」 화면의 줄을 누르면
// ?no=<접수번호>(없으면 ?id=<uuid>) 로 들어와 그 한 건만 보인다. 이 화면을 열면 누가 어느 문의를 봤는지 접속 기록에 남는다.

import type { Metadata } from "next";
import { logAccess, requireAdminPage } from "@/lib/admin/guard";
import { listStatusLog, type StatusLogRow } from "@/lib/admin/crm-store";
import { CLOSED_REASON_LABEL, isClosedReason } from "@/lib/admin/crm-input";
import { daysBetween, kstDate } from "@/lib/admin/today-core";
import { formatKstMonthDayTime } from "@/components/admin/types";
import {
  INQUIRY_STATUSES,
  INQUIRY_STATUS_LABEL,
  INQUIRY_PAGE_SIZE,
  isInquiryStatus,
  listInquiries,
  type InquiryStatus,
} from "@/lib/admin/inquiries";
import { LEGACY_LABELS } from "@/lib/inquiry/options";
import { CONTACT_PREF_LABEL, REFERENCE_USAGE_LABEL } from "@/lib/inquiry/labels";
import { CONTACT_PREFS, REFERENCE_USAGES, type ContactPref, type ReferenceUsage } from "@/lib/inquiry/validate";
import { formatKstLong } from "@/lib/kst";
import { getPortfolioBySlug } from "@/lib/portfolio/registry";
import { KIND_LABEL, type PortfolioKind } from "@/lib/portfolio/schema";
import InquiriesView, { type InquiryCard } from "./InquiriesView";

export const metadata: Metadata = {
  title: "견적 문의 목록",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const ENTRY_LABEL: Record<string, string> = {
  home_modal: "홈 카드 모달",
  inquiry_page: "문의 페이지",
  demo: "샘플·포트폴리오",
};

/** 옛 행은 유입이 상세 내용 첫 줄 「[유입] kind · slug · industry」 에만 있다 */
const REFERRAL_LINE = /^\[유입\] (\S+) · (\S+) · (\S+)\s*\n?/;

/** 접수번호 모양 — 「오늘」 화면의 링크(?no=)로 들어온다. 모양이 다르면 거르지 않고 무시한다 */
const REQUEST_NO = /^TM-\d{6}-\d{2,3}$/;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function statusWord(s: string | null): string | null {
  if (s === null) return null;
  return isInquiryStatus(s) ? INQUIRY_STATUS_LABEL[s] : s;
}

/** 마지막으로 움직인 날 — 「멈춘 딜」을 가르는 눈금. 달력 날짜(KST)로 센다 */
function lastActivityLabelOf(updatedAt: string | null, createdAt: string, todayKst: string): string {
  const d = new Date(updatedAt ?? createdAt);
  if (Number.isNaN(d.getTime())) return "";
  const days = daysBetween(kstDate(d), todayKst);
  return days <= 0 ? "오늘 움직임" : `마지막 변경 ${days}일 전`;
}

function referralTitle(slug: string): string | null {
  try {
    return getPortfolioBySlug(slug)?.title ?? null;
  } catch {
    return null;
  }
}

export default async function AdminInquiriesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  // 고객 이름·연락처가 뜨는 화면 — 개인정보 등급(pii). 옛 쿠키(기기 번호 없음)는 한 번 다시 로그인해야 들어온다.
  const ctx = await requireAdminPage({ scope: "pii", route: "/admin/inquiries" });

  const params = await searchParams;
  const rawNo = typeof params.no === "string" ? params.no.trim() : "";
  const rawId = typeof params.id === "string" ? params.id.trim() : "";
  const requestNo = REQUEST_NO.test(rawNo) ? rawNo : null;
  const id = !requestNo && UUID.test(rawId) ? rawId.toLowerCase() : null;
  const filtered = requestNo !== null || id !== null;

  const rawStatus = typeof params.status === "string" ? params.status : "all";
  // 한 건만 찾아 들어왔으면 상태 탭으로 거르지 않는다 — 탭이 걸려 있으면 그 건이 안 보일 수 있다
  const status: InquiryStatus | "all" = !filtered && isInquiryStatus(rawStatus) ? rawStatus : "all";
  const page = filtered ? 1 : Math.max(1, Number(typeof params.page === "string" ? params.page : "1") || 1);

  const result = await listInquiries({ status, page, requestNo, id });
  const ids = result.rows.map((r) => r.id);

  // 상태 이력은 없어도 화면은 뜬다 — 못 읽었으면 카드마다 비우고 위에 한 줄 알린다
  let historyByInquiry: Record<string, StatusLogRow[]> = {};
  let historyError: string | null = null;
  if (ids.length > 0) {
    const log = await listStatusLog(ids);
    if (log.ok) historyByInquiry = log.data;
    else historyError = log.reason === "no-service-key" ? "서버 설정 오류입니다." : "상태 이력을 읽지 못했습니다.";
  }

  logAccess(ctx, {
    action: "view",
    resource: "inquiries",
    subjectIds: ids,
    detail: `status=${status} page=${page}`,
  });

  const todayKst = kstDate(new Date());

  const cards: InquiryCard[] = result.rows.map((r) => {
    let details = r.details ?? "";
    let fromSlug = r.referral_from;
    let kind = r.referral_kind;
    const legacy = details.match(REFERRAL_LINE);
    if (legacy) {
      details = details.slice(legacy[0].length);
      if (!fromSlug && legacy[2] !== "-") fromSlug = legacy[2];
      if (!kind && legacy[1] !== "unknown" && legacy[1] !== "industry") kind = legacy[1];
    }
    const kindLabel = kind && kind in KIND_LABEL ? KIND_LABEL[kind as PortfolioKind] : null;
    const budget: string | null = r.budget;
    const timeline: string | null = r.timeline;
    const cardStatus: InquiryStatus = isInquiryStatus(r.status) ? r.status : "pending";
    const history = (historyByInquiry[r.id] ?? []).map((h) => ({
      at: formatKstMonthDayTime(h.at),
      from: statusWord(h.fromStatus),
      to: statusWord(h.toStatus) ?? h.toStatus,
      reason: h.closedReason && isClosedReason(h.closedReason) ? CLOSED_REASON_LABEL[h.closedReason] : h.closedReason,
    }));
    return {
      id: r.id,
      requestNo: r.request_no,
      receivedAt: formatKstLong(new Date(r.created_at)),
      // 파기된 행은 목록에서 빠지지만(listInquiries), 칸 자체는 이제 비어 있을 수 있는 타입이다
      name: r.client_name ?? "(이름 없음)",
      phone: r.phone ?? "",
      email: r.email,
      services: r.services ?? [],
      budget: budget ? LEGACY_LABELS[budget] ?? budget : "—",
      budgetFlexible: r.budget_flexible === true,
      timeline: timeline ? LEGACY_LABELS[timeline] ?? timeline : "—",
      referenceUrl: r.reference_url,
      details: details.trim() || null,
      status: cardStatus,
      referral: fromSlug ? { slug: fromSlug, title: referralTitle(fromSlug), kindLabel } : null,
      entry: r.entry ? ENTRY_LABEL[r.entry] ?? r.entry : null,
      quick: r.path === "quick",
      contactPref: (CONTACT_PREFS as readonly string[]).includes(r.contact_pref ?? "")
        ? CONTACT_PREF_LABEL[r.contact_pref as ContactPref]
        : null,
      referenceUsage: (REFERENCE_USAGES as readonly string[]).includes(r.reference_usage ?? "")
        ? REFERENCE_USAGE_LABEL[r.reference_usage as ReferenceUsage]
        : null,
      nextAction: r.next_action,
      nextActionDue: r.next_action_due,
      closedReason: r.closed_reason && isClosedReason(r.closed_reason) ? r.closed_reason : null,
      canComplete: r.retention_basis === "contract",
      history,
      stalled: (cardStatus === "contacted" || cardStatus === "quoted") && !r.next_action_due,
      lastActivityLabel: lastActivityLabelOf(r.updated_at, r.created_at, todayKst),
    };
  });

  return (
    <InquiriesView
      // 탭·쪽을 바꾸면 새 목록으로 다시 시작한다(안에서 상태를 들고 있어 key 없이는 옛 목록이 남는다)
      key={`${status}-${page}-${requestNo ?? ""}-${id ?? ""}`}
      cards={cards}
      total={result.total}
      counts={result.counts}
      status={status}
      page={page}
      pageSize={INQUIRY_PAGE_SIZE}
      statuses={[...INQUIRY_STATUSES]}
      statusLabel={INQUIRY_STATUS_LABEL}
      error={result.error}
      historyError={historyError}
      actor={ctx.actor}
      todayKst={todayKst}
      filterLabel={requestNo ?? (id ? "한 건" : null)}
    />
  );
}
