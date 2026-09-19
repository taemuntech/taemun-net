// 관리자 — 견적 문의 목록(구현계획서 P6). 접수번호·유입·레퍼런스 활용·연락 방법을 한눈에 보고 상태를 바꾼다.
// 읽기는 여기(서버)에서 끝낸다. 상태 바꾸기만 /api/admin/inquiries 로 간다.

import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readAdminSession } from "@/lib/admin/session";
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
  const session = readAdminSession(await cookies());
  if (!session) redirect("/admin/login");

  const params = await searchParams;
  const rawStatus = typeof params.status === "string" ? params.status : "all";
  const status: InquiryStatus | "all" = isInquiryStatus(rawStatus) ? rawStatus : "all";
  const page = Math.max(1, Number(typeof params.page === "string" ? params.page : "1") || 1);

  const result = await listInquiries({ status, page });

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
    return {
      id: r.id,
      requestNo: r.request_no,
      receivedAt: formatKstLong(new Date(r.created_at)),
      name: r.client_name,
      phone: r.phone,
      email: r.email,
      services: r.services ?? [],
      budget: LEGACY_LABELS[r.budget] ?? r.budget,
      budgetFlexible: r.budget_flexible === true,
      timeline: LEGACY_LABELS[r.timeline] ?? r.timeline,
      referenceUrl: r.reference_url,
      details: details.trim() || null,
      status: isInquiryStatus(r.status) ? r.status : "pending",
      referral: fromSlug ? { slug: fromSlug, title: referralTitle(fromSlug), kindLabel } : null,
      entry: r.entry ? ENTRY_LABEL[r.entry] ?? r.entry : null,
      quick: r.path === "quick",
      contactPref: (CONTACT_PREFS as readonly string[]).includes(r.contact_pref ?? "")
        ? CONTACT_PREF_LABEL[r.contact_pref as ContactPref]
        : null,
      referenceUsage: (REFERENCE_USAGES as readonly string[]).includes(r.reference_usage ?? "")
        ? REFERENCE_USAGE_LABEL[r.reference_usage as ReferenceUsage]
        : null,
    };
  });

  return (
    <InquiriesView
      // 탭·쪽을 바꾸면 새 목록으로 다시 시작한다(안에서 상태를 들고 있어 key 없이는 옛 목록이 남는다)
      key={`${status}-${page}`}
      cards={cards}
      total={result.total}
      counts={result.counts}
      status={status}
      page={page}
      pageSize={INQUIRY_PAGE_SIZE}
      statuses={[...INQUIRY_STATUSES]}
      statusLabel={INQUIRY_STATUS_LABEL}
      error={result.error}
      actor={session.actor}
    />
  );
}
