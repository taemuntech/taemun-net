// 「오늘」 화면 본체 — 서버 컴포넌트(누를 것이 링크뿐이라 브라우저 상태가 필요 없다). 2026-09-19 가온, P1b.
//
// 읽는 순서 = 급한 순서: 지남(빨강) → 오늘 → 3일 안 → 14일 안 → 새 문의 → 멈춘 딜 → 파기 요약.
// 빈 칸은 통째로 숨긴다(「0건」 칸이 여섯 개 늘어서면 정작 있는 것이 안 보인다).
// 한 줄 = 문의 한 건 링크. 접수번호로 문의 화면을 열고, 접수번호가 없는 옛 행은 id 로 연다.
//
// ⚠️ 고객 이름·연락처는 이 화면에 없다(데이터에도 없다). 제목은 「다음 할 일」 글자 또는 서비스 이름이다.
// ⚠️ 색만으로 급함을 전하지 않는다 — 칸 제목·「3일 지남」 같은 글자가 늘 같이 있다.

import Link from "next/link";
import { AlertTriangle, CheckCircle2, ChevronRight, Info } from "lucide-react";
import type { TodayBuckets, TodayItem } from "@/lib/admin/today-core";
import { formatYmdShort, formatYmdWithWeekday } from "@/components/admin/types";
import { Banner, Section } from "@/components/admin/ui";

export type TodayPurgeSummary = {
  mode: "dry_run" | "live";
  /** 「5시간 전」 — 서버 시각 기준. 한 번도 안 돌았으면 null */
  lastRunAgo: string | null;
};

export type TodayViewProps = {
  /** KST 오늘(YYYY-MM-DD) */
  todayKst: string;
  /** 못 읽었으면 null + error */
  buckets: TodayBuckets | null;
  error: string | null;
  /** 파기 설정 요약. 못 읽었으면 null + purgeError */
  purge: TodayPurgeSummary | null;
  purgeError: string | null;
  /** 파기 작업이 하루(26시간) 넘게 돌지 않았다 */
  purgeStale: boolean;
  /**
   * 기기 확인이 안 된 로그인이라 제목에서 다음 할 일 글자를 뺐다(서비스 이름만).
   * 그 사실과 「다시 로그인하면 보입니다」를 한 줄로 알린다.
   */
  nextActionHidden: boolean;
};

const KIND_CHIP: Record<TodayItem["kind"], { label: string; tone: string }> = {
  due: { label: "할 일", tone: "border-indigo-400/40 bg-indigo-500/15 text-indigo-200" },
  new: { label: "새 문의", tone: "border-amber-500/40 bg-amber-500/15 text-amber-200" },
  stalled: { label: "멈춤", tone: "border-white/15 bg-white/5 text-gray-300" },
};

type Urgency = "overdue" | "today" | "soon" | "calm";

const LABEL_TONE: Record<Urgency, string> = {
  overdue: "text-red-300",
  today: "text-amber-300",
  soon: "text-gray-300",
  calm: "text-gray-500",
};

function itemHref(item: TodayItem): string {
  return item.requestNo
    ? `/admin/inquiries?no=${encodeURIComponent(item.requestNo)}`
    : `/admin/inquiries?id=${encodeURIComponent(item.id)}`;
}

function ItemList({ items, urgency }: { items: TodayItem[]; urgency: Urgency }) {
  return (
    <ul className="divide-y divide-white/5">
      {items.map((item) => {
        const chip = KIND_CHIP[item.kind];
        return (
          <li key={`${item.kind}-${item.id}`}>
            <Link
              href={itemHref(item)}
              className="flex min-h-12 items-center gap-2 px-3 py-2 transition hover:bg-white/[0.04]"
            >
              <span
                className={`inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold ${chip.tone}`}
              >
                {chip.label}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-mono text-[11px] text-gray-500">{item.requestNo ?? "접수번호 없음"}</span>
                <span className="block truncate text-[13px] text-gray-100">{item.title}</span>
              </span>
              <span className={`shrink-0 text-[12px] font-semibold ${LABEL_TONE[urgency]}`}>{item.dLabel}</span>
              <ChevronRight className="h-4 w-4 shrink-0 text-gray-600" aria-hidden="true" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function PurgeCard({
  buckets,
  purge,
  purgeError,
}: {
  buckets: TodayBuckets;
  purge: TodayPurgeSummary | null;
  purgeError: string | null;
}) {
  const soon = buckets.purgeSoon;
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.02] px-3 py-2.5 text-[12px] leading-relaxed text-gray-400">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-semibold text-gray-300">개인정보 파기</h2>
        <Link
          href="/admin/settings"
          className="inline-flex min-h-11 items-center rounded-xl px-2 font-semibold text-indigo-300 hover:bg-white/5"
        >
          설정
        </Link>
      </div>
      <p>
        30일 안 예정 {soon.count}건
        {soon.earliest ? ` · 가장 이른 날 ${formatYmdShort(soon.earliest)}` : ""}
        {purge ? ` · ${purge.mode === "live" ? "실행 모드" : "시험 모드"}` : ""}
        {purge ? ` · 마지막 실행 ${purge.lastRunAgo ?? "기록 없음"}` : ""}
      </p>
      {purgeError ? <p className="text-amber-300">{purgeError}</p> : null}
    </section>
  );
}

/** 파기 지연 배너의 「지금 모드」 한 줄 — 설정을 못 읽었으면 모드를 짐작하지 않는다 */
function purgeModeNote(purge: TodayPurgeSummary | null): string {
  if (purge === null) return "파기 설정을 읽지 못해 지금 모드를 알 수 없습니다. 설정 화면에서 확인해 주세요.";
  if (purge.mode === "live") return "실행 모드인데 남아 있습니다. 설정 화면의 최근 파기 기록에서 결과를 확인해 주세요.";
  return "지금은 시험 모드라 대상만 기록하고 지우지 않습니다. 설정 화면에서 실행 모드로 바꾸면 매일 밤 지웁니다.";
}

export function TodayView({ todayKst, buckets, error, purge, purgeError, purgeStale, nextActionHidden }: TodayViewProps) {
  const lists = buckets
    ? [buckets.overdue, buckets.today, buckets.within3, buckets.within14, buckets.newInquiries, buckets.stalled]
    : [];
  const allEmpty = buckets !== null && lists.every((l) => l.length === 0);
  const overdue = buckets?.purgeOverdue ?? { count: 0, requestNos: [] };

  return (
    <main className="min-h-screen overflow-x-clip bg-[#030712] text-gray-100 [word-break:keep-all]">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#030712]/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-baseline justify-between gap-2">
          <h1 className="text-base font-bold text-white">오늘</h1>
          <p className="text-[13px] text-gray-400">{formatYmdWithWeekday(todayKst)}</p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl space-y-5 px-4 py-4">
        {error ? (
          <Banner tone="danger" icon={<AlertTriangle className="h-4 w-4" aria-hidden="true" />}>
            {error}
          </Banner>
        ) : null}

        {overdue.count > 0 ? (
          <Banner tone="danger" icon={<AlertTriangle className="h-4 w-4" aria-hidden="true" />}>
            <strong className="font-semibold">
              보관 기간이 지난 문의 {overdue.count}건이 아직 파기되지 않았습니다.
            </strong>
            {overdue.requestNos.length > 0 ? (
              <span className="mt-1 block font-mono text-[12px] text-red-200/90">
                {overdue.requestNos.join(" · ")}
                {overdue.count > overdue.requestNos.length ? " …" : ""}
              </span>
            ) : null}
            <span className="mt-1 block">{purgeModeNote(purge)}</span>
            <Link href="/admin/settings" className="mt-1 inline-flex min-h-11 items-center font-semibold underline underline-offset-2">
              설정으로 가기
            </Link>
          </Banner>
        ) : null}

        {purgeStale ? (
          <Banner tone="danger" icon={<AlertTriangle className="h-4 w-4" aria-hidden="true" />}>
            <strong className="font-semibold">파기 작업이 하루 넘게 돌지 않았습니다.</strong>
            <span className="mt-1 block">
              Supabase 의 예약 작업(taemun-crm-purge-due)이 멈췄을 수 있습니다. 설정 화면에서 마지막 실행 시각을 확인해 주세요.
            </span>
            <Link href="/admin/settings" className="mt-1 inline-flex min-h-11 items-center font-semibold underline underline-offset-2">
              설정으로 가기
            </Link>
          </Banner>
        ) : null}

        {buckets && nextActionHidden && !allEmpty ? (
          <Link
            href="/admin/login?reason=relogin-required"
            className="flex min-h-11 items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.02] px-3 text-[12px] leading-relaxed text-gray-400 hover:bg-white/[0.05]"
          >
            <Info className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="min-w-0 flex-1">다음 할 일 글은 다시 로그인하면 보입니다.</span>
            <span className="shrink-0 font-semibold text-indigo-300">다시 로그인</span>
          </Link>
        ) : null}

        {buckets && allEmpty ? (
          <div className="flex flex-col items-center gap-2 py-12 text-center">
            <CheckCircle2 className="h-8 w-8 text-emerald-400" aria-hidden="true" />
            <p className="text-sm text-gray-300">오늘 챙길 것이 없습니다.</p>
          </div>
        ) : null}

        {buckets && buckets.overdue.length > 0 ? (
          <Section title="지남" count={buckets.overdue.length} tone="danger">
            <ItemList items={buckets.overdue} urgency="overdue" />
          </Section>
        ) : null}
        {buckets && buckets.today.length > 0 ? (
          <Section title="오늘" count={buckets.today.length} tone="warn">
            <ItemList items={buckets.today} urgency="today" />
          </Section>
        ) : null}
        {buckets && buckets.within3.length > 0 ? (
          <Section title="3일 안" count={buckets.within3.length}>
            <ItemList items={buckets.within3} urgency="soon" />
          </Section>
        ) : null}
        {buckets && buckets.within14.length > 0 ? (
          <Section title="14일 안" count={buckets.within14.length}>
            <ItemList items={buckets.within14} urgency="calm" />
          </Section>
        ) : null}
        {buckets && buckets.newInquiries.length > 0 ? (
          <Section title="새 문의" count={buckets.newInquiries.length} hint="아직 연락하지 않은 문의입니다.">
            <ItemList items={buckets.newInquiries} urgency="soon" />
          </Section>
        ) : null}
        {buckets && buckets.stalled.length > 0 ? (
          <Section
            title="멈춘 딜"
            count={buckets.stalled.length}
            hint="연락했거나 견적을 보냈는데 다음 할 일 날짜가 없습니다. 눌러서 날짜를 넣어 주세요."
          >
            <ItemList items={buckets.stalled} urgency="calm" />
          </Section>
        ) : null}

        {buckets ? <PurgeCard buckets={buckets} purge={purge} purgeError={purgeError} /> : null}
      </div>
    </main>
  );
}
