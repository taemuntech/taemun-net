"use client";

// 견적 문의 목록 화면 — 형이 주로 휴대폰으로 본다. 카드 한 장 = 문의 한 건, 위에서 상태 탭으로 거른다.
// 상태를 바꾸면 바로 화면에 반영하고(낙관적), 저장이 실패하면 되돌리고 카드에 이유를 적는다(alert 금지).
//
// ⚠️ 참고 URL·문의 내용은 방문자가 적은 값이다. 링크는 http(s) 로 시작할 때만 걸고(javascript: 주소 차단),
//    나머지는 글자로만 보여 준다.

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ExternalLink, Mail, PhoneCall } from "lucide-react";
import type { InquiryStatus } from "@/lib/admin/inquiries";

export type InquiryCard = {
  id: string;
  requestNo: string | null;
  receivedAt: string;
  name: string;
  phone: string;
  email: string | null;
  services: string[];
  budget: string;
  budgetFlexible: boolean;
  timeline: string;
  referenceUrl: string | null;
  details: string | null;
  status: InquiryStatus;
  referral: { slug: string; title: string | null; kindLabel: string | null } | null;
  entry: string | null;
  quick: boolean;
  contactPref: string | null;
  referenceUsage: string | null;
};

const STATUS_TONE: Record<InquiryStatus, string> = {
  pending: "bg-amber-500/15 text-amber-300 border-amber-500/40",
  contacted: "bg-sky-500/15 text-sky-300 border-sky-500/40",
  quoted: "bg-indigo-500/15 text-indigo-300 border-indigo-500/40",
  contracted: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
  closed: "bg-white/5 text-gray-400 border-white/15",
};

const safeHttp = (url: string) => /^https?:\/\//i.test(url.trim());

function StatusSelect({
  card,
  statuses,
  statusLabel,
  onSaved,
}: {
  card: InquiryCard;
  statuses: InquiryStatus[];
  statusLabel: Record<InquiryStatus, string>;
  onSaved: (s: InquiryStatus) => void;
}) {
  const [value, setValue] = useState<InquiryStatus>(card.status);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function change(next: InquiryStatus) {
    const before = value;
    setValue(next);
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: card.id, status: next }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "저장하지 못했습니다.");
      onSaved(next);
    } catch (e) {
      setValue(before);
      setError(e instanceof Error ? e.message : "저장하지 못했습니다.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <select
        aria-label="상태"
        value={value}
        disabled={saving}
        onChange={(e) => change(e.target.value as InquiryStatus)}
        className={`rounded-lg border px-2.5 py-1.5 text-xs font-bold ${STATUS_TONE[value]} bg-[#0b1020] disabled:opacity-60`}
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {statusLabel[s]}
          </option>
        ))}
      </select>
      {error && <span className="text-[11px] text-red-300">{error}</span>}
    </div>
  );
}

export default function InquiriesView({
  cards,
  total,
  counts,
  status,
  page,
  pageSize,
  statuses,
  statusLabel,
  error,
  actor,
}: {
  cards: InquiryCard[];
  total: number;
  counts: Record<InquiryStatus | "all", number>;
  status: InquiryStatus | "all";
  page: number;
  pageSize: number;
  statuses: InquiryStatus[];
  statusLabel: Record<InquiryStatus, string>;
  error: string | null;
  actor: string;
}) {
  const [list, setList] = useState(cards);
  const lastPage = Math.max(1, Math.ceil(total / pageSize));
  const tabHref = (s: InquiryStatus | "all") => (s === "all" ? "/admin/inquiries" : `/admin/inquiries?status=${s}`);
  const pageHref = (p: number) => `/admin/inquiries?${status === "all" ? "" : `status=${status}&`}page=${p}`;

  return (
    <main className="min-h-screen overflow-x-clip bg-[#030712] text-gray-100 [word-break:keep-all]">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#030712]/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto max-w-3xl space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold text-white">견적 문의</h1>
              <p className="truncate text-[11px] text-gray-500">
                {actor} 로 로그인 · 전체 {counts.all}건
              </p>
            </div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 rounded-lg border border-white/10 px-2.5 py-1.5 text-xs font-semibold text-gray-300 hover:bg-white/5"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              작업물 공개 관리
            </Link>
          </div>
          <nav aria-label="상태로 거르기" className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
            {(["all", ...statuses] as const).map((s) => (
              <Link
                key={s}
                href={tabHref(s)}
                aria-current={status === s ? "page" : undefined}
                className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-semibold ${
                  status === s ? "border-white bg-white text-[#030712]" : "border-white/15 text-gray-300 hover:bg-white/5"
                }`}
              >
                {s === "all" ? "전체" : statusLabel[s]} {counts[s]}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-3xl space-y-3 px-4 py-4">
        {error && (
          <p role="alert" className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </p>
        )}
        {!error && list.length === 0 && <p className="py-10 text-center text-sm text-gray-500">문의가 없습니다.</p>}

        {list.map((c) => (
          <article key={c.id} className="space-y-3 rounded-2xl border border-white/10 bg-gray-900/60 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="font-mono text-[12px] text-gray-400">
                  {c.requestNo ?? "접수번호 없음(옛 접수)"} · {c.receivedAt}
                </div>
                <div className="mt-0.5 text-base font-bold text-white">{c.name}</div>
              </div>
              <StatusSelect
                card={c}
                statuses={statuses}
                statusLabel={statusLabel}
                onSaved={(s) => setList((cur) => cur.map((x) => (x.id === c.id ? { ...x, status: s } : x)))}
              />
            </div>

            <div className="flex flex-wrap gap-2 text-sm">
              <a href={`tel:${c.phone}`} className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1.5 font-semibold text-white hover:bg-white/10">
                <PhoneCall className="h-3.5 w-3.5" aria-hidden="true" /> {c.phone}
              </a>
              {c.email && (
                <a href={`mailto:${c.email}`} className="inline-flex items-center gap-1.5 rounded-lg bg-white/5 px-2.5 py-1.5 text-gray-200 hover:bg-white/10">
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" /> {c.email}
                </a>
              )}
              {c.contactPref && <span className="rounded-lg border border-white/10 px-2.5 py-1.5 text-xs text-gray-300">{c.contactPref}</span>}
            </div>

            <dl className="grid grid-cols-[4.5rem_1fr] gap-x-3 gap-y-1.5 text-[13px]">
              <dt className="text-gray-500">서비스</dt>
              <dd className="flex flex-wrap gap-1">
                {c.services.map((s) => (
                  <span key={s} className="rounded-md bg-white/5 px-1.5 py-0.5 text-gray-200">
                    {s}
                  </span>
                ))}
              </dd>
              <dt className="text-gray-500">예산</dt>
              <dd className="text-gray-200">
                {c.budget}
                {c.budgetFlexible && <span className="ml-1 text-gray-400">· 조정 가능</span>}
              </dd>
              <dt className="text-gray-500">일정</dt>
              <dd className="text-gray-200">{c.timeline}</dd>
              {c.referral && (
                <>
                  <dt className="text-gray-500">레퍼런스</dt>
                  <dd className="text-gray-200">
                    {c.referral.title ?? c.referral.slug}
                    {c.referral.kindLabel && <span className="ml-1 text-gray-400">({c.referral.kindLabel})</span>}
                    {c.referenceUsage && <span className="block text-gray-400">활용: {c.referenceUsage}</span>}
                  </dd>
                </>
              )}
              {(c.entry || c.quick) && (
                <>
                  <dt className="text-gray-500">경로</dt>
                  <dd className="text-gray-300">
                    {[c.entry, c.quick ? "연락처만 남김" : null].filter(Boolean).join(" · ")}
                  </dd>
                </>
              )}
              {c.referenceUrl && (
                <>
                  <dt className="text-gray-500">참고</dt>
                  <dd className="break-all">
                    {safeHttp(c.referenceUrl) ? (
                      <a
                        href={c.referenceUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-1 text-sky-300 underline underline-offset-2"
                      >
                        {c.referenceUrl} <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    ) : (
                      <span className="text-gray-300">{c.referenceUrl}</span>
                    )}
                  </dd>
                </>
              )}
            </dl>

            {c.details && (
              <p className="whitespace-pre-line rounded-xl bg-black/30 p-3 text-[13px] leading-relaxed text-gray-200">{c.details}</p>
            )}
          </article>
        ))}

        {lastPage > 1 && (
          <nav aria-label="쪽 이동" className="flex items-center justify-between pt-2 text-sm">
            {page > 1 ? (
              <Link href={pageHref(page - 1)} className="rounded-lg border border-white/15 px-3 py-1.5 text-gray-200 hover:bg-white/5">
                ← 이전
              </Link>
            ) : (
              <span />
            )}
            <span className="text-gray-500">
              {page} / {lastPage}
            </span>
            {page < lastPage ? (
              <Link href={pageHref(page + 1)} className="rounded-lg border border-white/15 px-3 py-1.5 text-gray-200 hover:bg-white/5">
                다음 →
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </div>
    </main>
  );
}
