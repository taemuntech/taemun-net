"use client";

// 견적 문의 목록 화면 — 형이 주로 휴대폰으로 본다. 카드 한 장 = 문의 한 건, 위에서 상태 탭으로 거른다.
// 상태를 바꾸면 바로 화면에 반영하고(낙관적), 저장이 실패하면 되돌리고 카드에 이유를 적는다(alert 금지).
//
// ⚠️ 참고 URL·문의 내용은 방문자가 적은 값이다. 링크는 http(s) 로 시작할 때만 걸고(javascript: 주소 차단),
//    나머지는 글자로만 보여 준다.
//
// P1b(2026-09-19 가온) — 카드가 「관리대장」 한 줄이 됐다:
// - 상태는 드롭다운 대신 **칩 5개**. 폰에서 드롭다운은 한 번 더 눌러야 하고, 지금 어디인지가 한눈에 안 보인다.
//   「종료」는 바로 저장하지 않고 **사유 칩**을 먼저 펼친다 — 나중에 「왜 놓쳤나」를 세려면 사유가 있어야 한다.
//   「진행 완료」 사유는 계약까지 갔던 건에만 연다(데이터베이스 함수도 같은 규칙으로 막는다).
// - 「다음 할 일」 한 줄: 할 일 글자 + 날짜. 날짜가 있어야 「오늘」 화면과 아침 문자에 잡힌다.
//   연락함·견적 보냄인데 날짜가 없으면 「멈춘 딜」로 표시한다 — 놓치는 딜은 대개 이 칸이 비어 있다.
// - 상태 이력은 접어 둔다(<details>). 기본은 카드가 짧아야 한다.
// ⚠️ 이 파일은 클라이언트다 — inquiries.ts·crm-store.ts 같은 서버 모듈에서 값을 가져오지 않는다(타입만).
//    순수 모듈(crm-input.ts·today-core.ts)만 값으로 불러온다.

import Link from "next/link";
import { useState } from "react";
import { ExternalLink, Mail, PhoneCall } from "lucide-react";
import type { InquiryStatus } from "@/lib/admin/inquiries";
import { CLOSED_REASONS, CLOSED_REASON_LABEL, type ClosedReason } from "@/lib/admin/crm-input";
import { LOGIN_REASON_LABEL, isLoginReason } from "@/lib/admin/guard-core";
import { daysBetween, dLabel } from "@/lib/admin/today-core";
import { actorLabel, addDaysYmd, formatYmdShort } from "@/components/admin/types";
import { Chip } from "@/components/admin/ui";

export type InquiryHistoryLine = {
  /** 「9월 19일 오후 2:05」 — 서버가 KST 로 뽑아 넘긴다 */
  at: string;
  /** 사람이 읽는 상태 이름(접수·연락함…). 첫 기록이면 null */
  from: string | null;
  to: string;
  /** 사람이 읽는 종료 사유(가격·시기…) */
  reason: string | null;
};

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
  /** 다음 할 일 글자(200자 이내). 날짜만 있고 글자는 없을 수도 있다 */
  nextAction: string | null;
  /** 다음 할 일 날짜 — KST 달력 날짜 YYYY-MM-DD */
  nextActionDue: string | null;
  closedReason: ClosedReason | null;
  /** 계약까지 갔던 건인가(retention_basis = contract) — 「진행 완료」 사유를 열어 줄지 가른다 */
  canComplete: boolean;
  /** 최근 상태 이력(최신순, 최대 5줄) */
  history: InquiryHistoryLine[];
  /** 연락함·견적 보냄인데 다음 할 일 날짜가 없다 */
  stalled: boolean;
  /** 「마지막 변경 9일 전」 */
  lastActivityLabel: string;
};

const STATUS_TONE: Record<InquiryStatus, string> = {
  pending: "bg-amber-500/15 text-amber-300 border-amber-500/40",
  contacted: "bg-sky-500/15 text-sky-300 border-sky-500/40",
  quoted: "bg-indigo-500/15 text-indigo-300 border-indigo-500/40",
  contracted: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
  closed: "bg-white/5 text-gray-400 border-white/15",
};

/** 지금 상태 칩 — 칠해진 색 */
const STATUS_FILLED: Record<InquiryStatus, string> = {
  pending: "border-amber-400 bg-amber-400 text-[#030712]",
  contacted: "border-sky-400 bg-sky-400 text-[#030712]",
  quoted: "border-indigo-400 bg-indigo-400 text-[#030712]",
  contracted: "border-emerald-400 bg-emerald-400 text-[#030712]",
  closed: "border-gray-300 bg-gray-300 text-[#030712]",
};

const safeHttp = (url: string) => /^https?:\/\//i.test(url.trim());

function isStalled(status: InquiryStatus, due: string | null): boolean {
  return (status === "contacted" || status === "quoted") && !due;
}

async function readJson(res: Response): Promise<Record<string, unknown> | null> {
  try {
    const json: unknown = await res.json();
    return typeof json === "object" && json !== null ? (json as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}

/**
 * 서버가 준 오류 문구. 401 이면 서버가 붙여 준 reason(해제·만료·다시 로그인)을 로그인 화면과 같은 문구로 바꾼다 —
 * 「로그인이 필요합니다」만 떠서는 다른 기기에서 해제된 건지 알 수 없다.
 */
function errorText(res: Response, json: Record<string, unknown> | null): string {
  if (res.status === 401) {
    const reason = json?.reason;
    return isLoginReason(reason) ? LOGIN_REASON_LABEL[reason] : "로그인이 풀렸습니다. 다시 로그인해 주세요.";
  }
  const err = json?.error;
  return typeof err === "string" ? err : `저장하지 못했습니다 (${res.status})`;
}

async function postJson(
  url: string,
  body: unknown,
): Promise<{ ok: true; data: Record<string, unknown> | null } | { ok: false; error: string }> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const json = await readJson(res);
    if (res.ok) return { ok: true, data: json };
    return { ok: false, error: errorText(res, json) };
  } catch {
    return { ok: false, error: "네트워크 오류로 저장하지 못했습니다." };
  }
}

// ── 상태 칩 ─────────────────────────────────────────────────────────────

function StatusChips({
  card,
  statuses,
  statusLabel,
  onChange,
}: {
  card: InquiryCard;
  statuses: InquiryStatus[];
  statusLabel: Record<InquiryStatus, string>;
  onChange: (patch: Pick<InquiryCard, "status" | "closedReason" | "canComplete">) => void;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /** 「종료」를 눌러 사유 칩을 펼쳤는가 */
  const [askReason, setAskReason] = useState(false);
  /**
   * 계약(보관 근거 = 계약)에서 접수·연락함·견적 보냄으로 되돌리려는 상태 — 한 번 더 묻는다.
   * 되돌리면 「접수일부터 1년」 보관 규칙이 다시 걸려, 1년 넘은 계약 건은 7일 뒤 이름·연락처·내용이 지워진다
   * (데이터베이스 트리거 inquiries_status_retention — 7일은 잘못 누른 것을 되돌릴 여유).
   * 칩이 촘촘해 폰에서 옆 칩을 잘못 누르기 쉽다 — 그 한 번이 계약 고객 정보를 지우면 안 된다.
   */
  const [confirmUncontract, setConfirmUncontract] = useState<InquiryStatus | null>(null);

  async function save(to: InquiryStatus, closedReason: ClosedReason | null) {
    if (saving) return;
    const before = { status: card.status, closedReason: card.closedReason, canComplete: card.canComplete };
    // 계약으로 가면 「진행 완료」가 열리고, 앞 단계로 돌아가면 닫힌다(데이터베이스 함수의 보관 근거 규칙과 같다)
    const canComplete = to === "contracted" ? true : to === "closed" ? card.canComplete : false;
    onChange({ status: to, closedReason: to === "closed" ? closedReason : null, canComplete });
    setAskReason(false);
    setConfirmUncontract(null);
    setSaving(true);
    setError(null);
    const body = to === "closed" ? { id: card.id, status: to, closedReason } : { id: card.id, status: to };
    const result = await postJson("/api/admin/inquiries", body);
    if (!result.ok) {
      onChange(before);
      setError(result.error);
    }
    setSaving(false);
  }

  function tap(s: InquiryStatus) {
    if (s === "closed") {
      // 종료는 사유를 먼저 묻는다 — 이미 종료였어도 사유를 바꿀 수 있게 펼친다
      setError(null);
      setConfirmUncontract(null);
      setAskReason(true);
      return;
    }
    if (s === card.status) return;
    if (card.canComplete && s !== "contracted") {
      // 계약 보관 근거를 잃는 이동 — 바로 저장하지 않고 카드 안에서 한 번 더 묻는다
      setError(null);
      setAskReason(false);
      setConfirmUncontract(s);
      return;
    }
    void save(s, null);
  }

  const reasons = CLOSED_REASONS.filter((r) => r !== "completed" || card.canComplete);

  return (
    <div className="space-y-2">
      <div role="group" aria-label="상태 바꾸기" className="flex flex-wrap gap-1.5">
        {statuses.map((s) => {
          const current = card.status === s;
          return (
            <button
              key={s}
              type="button"
              disabled={saving}
              aria-pressed={current}
              onClick={() => tap(s)}
              className={`inline-flex min-h-11 items-center rounded-xl border px-3 text-[13px] font-bold transition disabled:opacity-60 ${
                current ? STATUS_FILLED[s] : `${STATUS_TONE[s]} hover:brightness-125`
              }`}
            >
              {statusLabel[s]}
              {current && s === "closed" && card.closedReason ? (
                <span className="ml-1 font-semibold">· {CLOSED_REASON_LABEL[card.closedReason]}</span>
              ) : null}
            </button>
          );
        })}
      </div>

      {askReason && (
        <div className="rounded-xl border border-white/10 bg-black/30 p-3">
          <p className="text-[12px] text-gray-400">왜 종료합니까? 사유를 누르면 바로 저장됩니다.</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {reasons.map((r) => (
              <Chip
                key={r}
                tone={card.status === "closed" && card.closedReason === r ? "active" : "neutral"}
                disabled={saving}
                onClick={() => void save("closed", r)}
              >
                {CLOSED_REASON_LABEL[r]}
              </Chip>
            ))}
            <Chip tone="ghost" disabled={saving} onClick={() => setAskReason(false)}>
              취소
            </Chip>
          </div>
        </div>
      )}

      {confirmUncontract && (
        <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-[13px] text-red-100">
          <p>
            계약에서 되돌리면 접수일부터 1년 보관 규칙이 다시 적용됩니다. 1년이 지난 문의는 7일 뒤
            이름·연락처·내용이 지워집니다.
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <Chip tone="danger" disabled={saving} onClick={() => void save(confirmUncontract, null)}>
              네, 되돌리기
            </Chip>
            <Chip tone="ghost" disabled={saving} onClick={() => setConfirmUncontract(null)}>
              취소
            </Chip>
          </div>
        </div>
      )}

      {saving && <p className="text-[12px] text-gray-500">저장 중…</p>}
      {error && (
        <p role="alert" className="text-[12px] text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

// ── 다음 할 일 ───────────────────────────────────────────────────────────

const QUICK_DUE: readonly { label: string; days: number }[] = [
  { label: "오늘", days: 0 },
  { label: "내일", days: 1 },
  { label: "3일 뒤", days: 3 },
  { label: "1주 뒤", days: 7 },
];

/** 연락함·견적 보냄인데 날짜가 없다 — 글자만 적어 두면 「오늘」 화면에 안 잡혀 잊힌다 */
function StalledPill() {
  return (
    <span className="ml-2 inline-flex rounded-full border border-amber-500/40 bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold text-amber-200">
      멈춘 딜
    </span>
  );
}

function NextActionRow({
  card,
  todayKst,
  onSaved,
}: {
  card: InquiryCard;
  todayKst: string;
  onSaved: (patch: Pick<InquiryCard, "nextAction" | "nextActionDue">) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(card.nextAction ?? "");
  const [due, setDue] = useState(card.nextActionDue ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stalled = isStalled(card.status, card.nextActionDue);
  const days = card.nextActionDue ? daysBetween(todayKst, card.nextActionDue) : null;
  const dueTone =
    days === null ? "text-gray-400" : days < 0 ? "text-red-300" : days === 0 ? "text-amber-300" : "text-gray-400";

  function openEditor() {
    setText(card.nextAction ?? "");
    setDue(card.nextActionDue ?? "");
    setError(null);
    setEditing(true);
  }

  async function save(nextText: string | null, nextDue: string | null) {
    if (saving) return;
    setSaving(true);
    setError(null);
    const result = await postJson("/api/admin/inquiries/next-action", { id: card.id, text: nextText, due: nextDue });
    setSaving(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    // 서버가 다듬은 값(줄바꿈·탭 → 띄어쓰기, 빈 글자 → null)을 그대로 쓴다 — 새로고침 뒤와 같게
    const saved = result.data;
    const savedText = saved && (typeof saved.text === "string" || saved.text === null) ? saved.text : nextText;
    const savedDue = saved && (typeof saved.due === "string" || saved.due === null) ? saved.due : nextDue;
    onSaved({ nextAction: savedText, nextActionDue: savedDue });
    setEditing(false);
  }

  if (!editing) {
    const hasAny = card.nextAction !== null || card.nextActionDue !== null;
    return (
      <div className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/20 py-1 pl-3 pr-1">
        <p className="min-w-0 text-[13px] leading-snug">
          {hasAny ? (
            <>
              <span className="text-gray-500">다음 할 일</span>
              {card.nextAction ? <span className="text-gray-100"> · {card.nextAction}</span> : null}
              {stalled ? <StalledPill /> : null}
              {card.nextActionDue && days !== null ? (
                <span className={`font-semibold ${dueTone}`}>
                  {" "}
                  · {dLabel(days)}
                  <span className="ml-1 font-normal text-gray-500">({formatYmdShort(card.nextActionDue)})</span>
                </span>
              ) : null}
            </>
          ) : (
            <>
              <span className="text-gray-500">다음 할 일 없음</span>
              {stalled ? <StalledPill /> : null}
            </>
          )}
        </p>
        <Chip tone="ghost" onClick={openEditor} aria-label="다음 할 일 바꾸기" className="shrink-0">
          바꾸기
        </Chip>
      </div>
    );
  }

  const trimmed = text.trim();
  return (
    <div className="space-y-2 rounded-xl border border-indigo-400/30 bg-black/30 p-3">
      <label className="block text-[12px] font-semibold text-gray-300" htmlFor={`next-${card.id}`}>
        다음 할 일
      </label>
      <input
        id={`next-${card.id}`}
        type="text"
        value={text}
        maxLength={200}
        onChange={(e) => setText(e.target.value)}
        placeholder="예: 견적서 보내기"
        className="block w-full min-h-11 rounded-xl border border-white/10 bg-black/40 px-3 text-base text-white placeholder:text-gray-600 outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/30"
      />
      <div className="flex flex-wrap items-center gap-1.5">
        <input
          type="date"
          aria-label="날짜"
          value={due}
          onChange={(e) => setDue(e.target.value)}
          className="min-h-11 rounded-xl border border-white/10 bg-black/40 px-3 text-base text-white outline-none [color-scheme:dark] focus:border-indigo-400/60"
        />
        {QUICK_DUE.map((q) => {
          const ymd = addDaysYmd(todayKst, q.days);
          return (
            <Chip key={q.label} tone={due === ymd ? "active" : "neutral"} onClick={() => setDue(ymd)}>
              {q.label}
            </Chip>
          );
        })}
      </div>
      <p className="text-[11px] text-gray-500">날짜를 넣어야 「오늘」 화면과 아침 문자에 잡힙니다.</p>
      <div className="flex flex-wrap gap-1.5 pt-1">
        <Chip
          tone="active"
          disabled={saving}
          onClick={() => void save(trimmed === "" ? null : trimmed, due === "" ? null : due)}
        >
          {saving ? "저장 중…" : "저장"}
        </Chip>
        <Chip tone="neutral" disabled={saving} onClick={() => void save(null, null)}>
          비우기
        </Chip>
        <Chip tone="ghost" disabled={saving} onClick={() => setEditing(false)}>
          취소
        </Chip>
      </div>
      {error && (
        <p role="alert" className="text-[12px] text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

// ── 화면 ────────────────────────────────────────────────────────────────

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
  historyError,
  actor,
  todayKst,
  filterLabel,
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
  /** 상태 이력을 못 읽었을 때 한 줄. 목록은 그대로 뜬다 */
  historyError: string | null;
  actor: string;
  /** KST 오늘(YYYY-MM-DD) — 서버가 계산해 넘긴다(브라우저 시계·시간대에 기대지 않는다) */
  todayKst: string;
  /** ?no= / ?id= 로 한 건만 거른 상태면 그 표시(접수번호 또는 「한 건」). 아니면 null */
  filterLabel: string | null;
}) {
  const [list, setList] = useState(cards);
  const lastPage = Math.max(1, Math.ceil(total / pageSize));
  const tabHref = (s: InquiryStatus | "all") => (s === "all" ? "/admin/inquiries" : `/admin/inquiries?status=${s}`);
  const pageHref = (p: number) => `/admin/inquiries?${status === "all" ? "" : `status=${status}&`}page=${p}`;

  function patch(id: string, p: Partial<InquiryCard>) {
    setList((cur) =>
      cur.map((x) => {
        if (x.id !== id) return x;
        const next = { ...x, ...p };
        return { ...next, stalled: isStalled(next.status, next.nextActionDue) };
      }),
    );
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#030712] text-gray-100 [word-break:keep-all]">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#030712]/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto max-w-3xl space-y-3">
          <div className="min-w-0">
            <h1 className="truncate text-base font-bold text-white">견적 문의</h1>
            <p className="truncate text-[11px] text-gray-500">
              {actorLabel(actor)}으로 로그인 · 전체 {counts.all}건
            </p>
          </div>
          <nav aria-label="상태로 거르기" className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
            {(["all", ...statuses] as const).map((s) => (
              <Link
                key={s}
                href={tabHref(s)}
                aria-current={!filterLabel && status === s ? "page" : undefined}
                className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-full border px-3 text-xs font-semibold ${
                  !filterLabel && status === s
                    ? "border-white bg-white text-[#030712]"
                    : "border-white/15 text-gray-300 hover:bg-white/5"
                }`}
              >
                {s === "all" ? "전체" : statusLabel[s]} {counts[s]}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-3xl space-y-3 px-4 py-4">
        {filterLabel && (
          <div className="flex items-center justify-between gap-2 rounded-xl border border-indigo-400/30 bg-indigo-500/10 py-1 pl-3 pr-1 text-[13px] text-indigo-100">
            <span className="min-w-0 truncate">{filterLabel} 만 보는 중입니다.</span>
            <Link
              href="/admin/inquiries"
              className="inline-flex min-h-11 shrink-0 items-center rounded-xl px-3 font-semibold text-white hover:bg-white/10"
            >
              전체 문의 보기
            </Link>
          </div>
        )}
        {error && (
          <p role="alert" className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </p>
        )}
        {historyError && !error && (
          <p className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-[13px] text-amber-100">
            {historyError} 카드의 상태 이력만 비어 보입니다.
          </p>
        )}
        {!error && list.length === 0 && (
          <p className="py-10 text-center text-sm text-gray-500">
            {filterLabel ? "그 문의를 찾지 못했습니다. 파기되었거나 주소가 틀렸을 수 있습니다." : "문의가 없습니다."}
          </p>
        )}

        {list.map((c) => (
          <article key={c.id} className="space-y-3 rounded-2xl border border-white/10 bg-gray-900/60 p-4">
            <div className="min-w-0">
              <div className="font-mono text-[12px] text-gray-400">
                {c.requestNo ?? "접수번호 없음(옛 접수)"} · {c.receivedAt}
              </div>
              <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2">
                <span className="text-base font-bold text-white">{c.name}</span>
                {c.lastActivityLabel ? <span className="text-[11px] text-gray-500">{c.lastActivityLabel}</span> : null}
              </div>
            </div>

            <StatusChips card={c} statuses={statuses} statusLabel={statusLabel} onChange={(p) => patch(c.id, p)} />

            <NextActionRow card={c} todayKst={todayKst} onSaved={(p) => patch(c.id, p)} />

            <div className="flex flex-wrap gap-2 text-sm">
              {c.phone && (
                <a
                  href={`tel:${c.phone}`}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-white/5 px-3 font-semibold text-white hover:bg-white/10"
                >
                  <PhoneCall className="h-3.5 w-3.5" aria-hidden="true" /> {c.phone}
                </a>
              )}
              {c.email && (
                <a
                  href={`mailto:${c.email}`}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-white/5 px-3 text-gray-200 hover:bg-white/10"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" /> {c.email}
                </a>
              )}
              {c.contactPref && (
                <span className="inline-flex items-center rounded-xl border border-white/10 px-2.5 py-1.5 text-xs text-gray-300">
                  {c.contactPref}
                </span>
              )}
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

            {c.history.length > 0 && (
              <details className="group rounded-xl border border-white/10 bg-black/20">
                <summary className="flex min-h-11 cursor-pointer list-none items-center px-3 text-[12px] font-semibold text-gray-400 hover:text-gray-200">
                  <span className="mr-1.5 inline-block transition group-open:rotate-90" aria-hidden="true">
                    ›
                  </span>
                  상태 이력 {c.history.length}
                </summary>
                <ul className="space-y-1 px-3 pb-3 text-[12px] text-gray-400">
                  {c.history.map((h, i) => (
                    <li key={`${h.at}-${i}`}>
                      {h.at} · {h.from ?? "—"} → <span className="text-gray-200">{h.to}</span>
                      {h.reason ? <span> ({h.reason})</span> : null}
                    </li>
                  ))}
                </ul>
              </details>
            )}
          </article>
        ))}

        {lastPage > 1 && !filterLabel && (
          <nav aria-label="쪽 이동" className="flex items-center justify-between pt-2 text-sm">
            {page > 1 ? (
              <Link
                href={pageHref(page - 1)}
                className="inline-flex min-h-11 items-center rounded-xl border border-white/15 px-3 text-gray-200 hover:bg-white/5"
              >
                ← 이전
              </Link>
            ) : (
              <span />
            )}
            <span className="text-gray-500">
              {page} / {lastPage}
            </span>
            {page < lastPage ? (
              <Link
                href={pageHref(page + 1)}
                className="inline-flex min-h-11 items-center rounded-xl border border-white/15 px-3 text-gray-200 hover:bg-white/5"
              >
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
