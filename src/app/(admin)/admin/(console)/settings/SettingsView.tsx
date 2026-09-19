"use client";

// 설정 화면 본체 — 휴대폰 세로 375px 기준. 2026-09-19 가온, 관리자 개편 P1b.
//
// 규칙:
// 1) 되돌리기 어려운 버튼(다른 기기 모두 로그아웃·파기 실행 모드)은 **한 번 더 묻는다** — 화면 안에서.
//    브라우저 confirm() 은 쓰지 않는다(폰에서 문구가 잘리고, 실수로 두 번 누르면 그대로 넘어간다).
// 2) 성공하면 router.refresh() 로 서버가 다시 읽은 값을 보여 준다(화면이 짐작한 값을 믿지 않는다).
// 3) 실패하면 그 칸 안에 서버가 준 문구를 그대로 적는다.
// 4) 시각은 전부 KST. 「N시간 전」은 서버가 넘긴 nowIso 로 계산한다(브라우저 시계로 세면 서버가 그린 글자와 어긋난다).
//
// ⚠️ 클라이언트 파일이다 — crm-store.ts·guard.ts 같은 서버 모듈에서는 **타입만** 가져온다.

import { useRouter } from "next/navigation";
import { useState, type ReactNode } from "react";
import { AlertTriangle, CheckCircle2, LogOut, MonitorSmartphone } from "lucide-react";
import type { AccessLogRow, CrmSettings, PurgeLogRow, SessionRow } from "@/lib/admin/crm-store";
import { LOGIN_REASON_LABEL, isLoginReason } from "@/lib/admin/guard-core";
import { summarizeAccessLog } from "@/lib/admin/access-log-core";
import { isDigestSendingFresh } from "@/lib/admin/digest-core";
import { actorLabel, agoLabel, formatKstCompact, formatKstMonthDayTime } from "@/components/admin/types";
import { Banner, Chip, Section } from "@/components/admin/ui";

export type SettingsViewProps = {
  /** 서버가 이 화면을 그린 시각 — 「N시간 전」·「지금 살아 있는 기기」 판정의 기준 */
  nowIso: string;
  /** 지금 이 기기의 세션 번호(옛 쿠키면 null) */
  currentSessionId: string | null;
  sessions: SessionRow[] | null;
  sessionsError: string | null;
  settings: CrmSettings | null;
  settingsError: string | null;
  purgeLog: PurgeLogRow[] | null;
  purgeLogError: string | null;
  /** 최근 accessLogDays 일 접속 기록(비밀번호 틀림 줄은 빠져 있다) */
  accessLog: AccessLogRow[] | null;
  accessLogError: string | null;
  /** 접속 기록을 며칠치 읽었나(35) */
  accessLogDays: number;
  /** 줄 수 상한(1000)에 닿아 더 오래된 줄이 잘렸다 */
  accessLogTruncated: boolean;
  /** 같은 기간 비밀번호 틀림 기록 건수. 못 셌으면 null */
  loginFailCount: number | null;
  /** Vercel 에 CRON_SECRET 이 있는가(값은 넘기지 않는다) */
  hasCronSecret: boolean;
};

// ── 옮겨 적기 ───────────────────────────────────────────────────────────

/** 접속 기록의 동작 — 저장값은 영어 그대로 두고 화면에서만 바꾼다 */
const ACTION_LABEL: Record<string, string> = {
  view: "조회",
  update: "변경",
  login: "로그인",
  login_fail: "로그인 실패",
  logout: "로그아웃",
  session_revoke: "기기 로그아웃",
  setting: "설정 변경",
  purge_run: "파기 실행",
  export: "내보내기",
};

const RESOURCE_LABEL: Record<string, string> = {
  portfolio: "작업물",
  portfolio_state: "작업물 상태",
  portfolio_flag: "전역 스위치",
  portfolio_verify: "공개 확인",
  inquiries: "문의 목록",
  inquiry: "문의",
  today: "오늘",
  settings: "설정",
  session: "기기",
  sessions: "기기",
  admin_session: "기기",
  crm_settings: "설정",
};

const OUTCOME_LABEL: Record<string, string> = { ok: "", denied: "거절", error: "오류" };

const PURGE_MODE_LABEL: Record<string, string> = { dry_run: "시험", live: "실행" };
const PURGE_TARGET_LABEL: Record<string, string> = { inquiry: "문의", access_log: "접속 기록", session: "기기" };
const PURGE_TRIGGER_LABEL: Record<string, string> = { schedule: "자동", manual: "수동", selftest: "자체 시험" };
const PURGE_OUTCOME_LABEL: Record<string, string> = {
  ok: "정상",
  refused_over_cap: "비정상적으로 많아 멈춤",
  error: "오류",
};

/** 「iPhone · Safari」 — UA 에서 기기·브라우저만 뽑는다. 모르면 「알 수 없는 기기」 */
function deviceLabel(ua: string | null): string {
  if (!ua) return "알 수 없는 기기";
  const os = /iPhone/.test(ua)
    ? "iPhone"
    : /iPad/.test(ua)
      ? "iPad"
      : /Android/.test(ua)
        ? "Android"
        : /Windows/.test(ua)
          ? "Windows"
          : /Macintosh|Mac OS X/.test(ua)
            ? "Mac"
            : null;
  const browser = /SamsungBrowser/.test(ua)
    ? "Samsung"
    : /Edg(e|A|iOS)?\//.test(ua)
      ? "Edge"
      : /CriOS|Chrome\//.test(ua)
        ? "Chrome"
        : /Safari\//.test(ua)
          ? "Safari"
          : null;
  if (!os && !browser) return "알 수 없는 기기";
  return [os, browser].filter(Boolean).join(" · ");
}

function isActiveSession(s: SessionRow, nowMs: number): boolean {
  return !s.revokedAt && new Date(s.expiresAt).getTime() > nowMs;
}

async function postJson(url: string, body: unknown): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) return { ok: true };
    let message: string | null = null;
    let reason: unknown = null;
    try {
      const json: unknown = await res.json();
      if (typeof json === "object" && json !== null) {
        const err = (json as Record<string, unknown>).error;
        if (typeof err === "string") message = err;
        reason = (json as Record<string, unknown>).reason;
      }
    } catch {
      message = null;
    }
    // 401 이면 로그인 화면과 같은 문구로 이유(해제·만료·다시 로그인)를 알린다
    if (res.status === 401) {
      return {
        ok: false,
        error: isLoginReason(reason) ? LOGIN_REASON_LABEL[reason] : "로그인이 풀렸습니다. 다시 로그인해 주세요.",
      };
    }
    return { ok: false, error: message ?? `처리하지 못했습니다 (${res.status})` };
  } catch {
    return { ok: false, error: "네트워크 오류로 처리하지 못했습니다." };
  }
}

function ErrorLine({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="px-3 py-2 text-[12px] text-red-300">
      {children}
    </p>
  );
}

function LoadError({ message }: { message: string }) {
  return <p className="px-3 py-3 text-[13px] text-amber-200">{message}</p>;
}

// ── 1. 로그인한 기기 ─────────────────────────────────────────────────────

function SessionsSection({
  sessions,
  error: loadError,
  currentSessionId,
  nowIso,
}: {
  sessions: SessionRow[] | null;
  error: string | null;
  currentSessionId: string | null;
  nowIso: string;
}) {
  const router = useRouter();
  const nowMs = new Date(nowIso).getTime();
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmOthers, setConfirmOthers] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  const active = (sessions ?? []).filter((s) => isActiveSession(s, nowMs));
  const ended = (sessions ?? []).filter((s) => !isActiveSession(s, nowMs));
  const othersActive = active.filter((s) => s.id !== currentSessionId).length;

  async function revoke(id: string) {
    setBusy(id);
    setError(null);
    setDone(null);
    const r = await postJson("/api/admin/sessions", { action: "revoke", id });
    setBusy(null);
    if (!r.ok) return setError(r.error);
    router.refresh();
  }

  async function revokeOthers() {
    setBusy("others");
    setError(null);
    setDone(null);
    const r = await postJson("/api/admin/sessions", { action: "revoke_others" });
    setBusy(null);
    setConfirmOthers(false);
    if (!r.ok) return setError(r.error);
    setDone("다른 기기의 로그인을 모두 끊었습니다. 그 기기들은 비밀번호를 다시 넣어야 들어옵니다.");
    router.refresh();
  }

  async function logoutHere() {
    setBusy("self");
    setError(null);
    const r = await postJson("/api/admin/logout", {});
    if (!r.ok) {
      setBusy(null);
      return setError(r.error);
    }
    router.push("/admin/login");
    router.refresh();
  }

  function row(s: SessionRow, live: boolean) {
    const mine = s.id === currentSessionId;
    return (
      <li key={s.id} className="flex items-start gap-3 px-3 py-2.5">
        <MonitorSmartphone className={`mt-0.5 h-4 w-4 shrink-0 ${live ? "text-gray-300" : "text-gray-600"}`} aria-hidden="true" />
        <div className="min-w-0 flex-1 text-[12px] leading-relaxed text-gray-400">
          <p className="flex flex-wrap items-center gap-x-2 text-[13px] font-semibold text-gray-100">
            {deviceLabel(s.ua)}
            {mine ? (
              <span className="rounded-full border border-emerald-500/40 bg-emerald-500/15 px-2 py-0.5 text-[11px] font-semibold text-emerald-200">
                지금 이 기기
              </span>
            ) : null}
            {!live ? <span className="text-[11px] font-normal text-gray-500">{s.revokedAt ? "로그아웃됨" : "기간 끝남"}</span> : null}
          </p>
          <p className="break-all">IP {s.ip ?? "—"}</p>
          <p>처음 로그인 {formatKstMonthDayTime(s.createdAt)}</p>
          <p>
            마지막 사용 {s.lastSeenAt ? formatKstMonthDayTime(s.lastSeenAt) : "—"}
            {s.lastSeenAt ? ` (${agoLabel(s.lastSeenAt, nowIso) ?? ""})` : ""}
          </p>
        </div>
        {live && !mine ? (
          <Chip tone="danger" disabled={busy !== null} onClick={() => void revoke(s.id)} className="shrink-0">
            {busy === s.id ? "처리 중…" : "로그아웃시키기"}
          </Chip>
        ) : null}
      </li>
    );
  }

  return (
    <Section title="로그인한 기기" count={loadError ? undefined : active.length}>
      {loadError ? <LoadError message={loadError} /> : null}
      {sessions ? (
        <>
          <ul className="divide-y divide-white/5">
            {active.map((s) => row(s, true))}
            {active.length === 0 ? <li className="px-3 py-3 text-[13px] text-gray-500">살아 있는 로그인이 없습니다.</li> : null}
          </ul>
          {ended.length > 0 ? (
            <details className="border-t border-white/5">
              <summary className="flex min-h-11 cursor-pointer list-none items-center px-3 text-[12px] font-semibold text-gray-500 hover:text-gray-300">
                끝난 로그인 {ended.length}
              </summary>
              <ul className="divide-y divide-white/5">{ended.map((s) => row(s, false))}</ul>
            </details>
          ) : null}
        </>
      ) : null}

      <div className="space-y-2 border-t border-white/5 px-3 py-3">
        {/*
          목록에 다른 기기가 없어도 늘 보여 준다 — 기기 번호 없이 로그인한 옛 쿠키(P1b 전 로그인)는 목록에 안 나오지만
          이 버튼이 「누른 시각 이전 로그인」으로 함께 끊는다(sessions_invalid_before). 잃어버린 폰이 바로 그런 쿠키일 수 있다.
        */}
        {!confirmOthers ? (
          <Chip tone="neutral" disabled={busy !== null} onClick={() => setConfirmOthers(true)}>
            이 기기 말고 모두 로그아웃
          </Chip>
        ) : null}
        {confirmOthers ? (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-[13px] text-red-100">
            <p>다른 기기(목록에 없는 9월 19일 이전 로그인 포함)의 로그인을 모두 끊습니다.</p>
            {othersActive > 0 ? <p className="mt-1 text-[12px] text-red-200/80">목록의 다른 기기 {othersActive}대 포함.</p> : null}
            <div className="mt-2 flex flex-wrap gap-1.5">
              <Chip tone="danger" disabled={busy !== null} onClick={() => void revokeOthers()}>
                {busy === "others" ? "처리 중…" : "네, 모두 로그아웃"}
              </Chip>
              <Chip tone="ghost" disabled={busy !== null} onClick={() => setConfirmOthers(false)}>
                취소
              </Chip>
            </div>
          </div>
        ) : null}
        <Chip tone="ghost" disabled={busy !== null} onClick={() => void logoutHere()}>
          <LogOut className="h-4 w-4" aria-hidden="true" />
          {busy === "self" ? "로그아웃 중…" : "이 기기 로그아웃"}
        </Chip>
      </div>
      {done ? (
        <p role="status" className="px-3 py-2 text-[12px] text-emerald-300">
          {done}
        </p>
      ) : null}
      {error ? <ErrorLine>{error}</ErrorLine> : null}
    </Section>
  );
}

// ── 2. 개인정보 자동 파기 ────────────────────────────────────────────────

function selftestView(value: string | null): { ok: boolean | null; text: string } {
  if (!value) return { ok: null, text: "기록 없음 — 관리대장 마이그레이션을 적용하면 자체 시험 결과가 남습니다." };
  const trimmed = value.trim();
  const ok = /^ok\b/i.exec(trimmed);
  if (ok) {
    const at = trimmed.slice(2).trim();
    return { ok: true, text: `자체 시험 통과${at ? ` · ${formatKstMonthDayTime(at)}` : ""}` };
  }
  return { ok: false, text: `자체 시험 실패 — ${trimmed.replace(/^fail\s*/i, "")}` };
}

function PurgeSection({
  settings,
  settingsError,
  purgeLog,
  purgeLogError,
  nowIso,
}: {
  settings: CrmSettings | null;
  settingsError: string | null;
  purgeLog: PurgeLogRow[] | null;
  purgeLogError: string | null;
  nowIso: string;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mode = settings?.purgeMode ?? null;
  const target = mode === "live" ? "dry_run" : "live";

  async function switchMode() {
    setBusy(true);
    setError(null);
    const r = await postJson("/api/admin/settings", { key: "purge_mode", value: target });
    setBusy(false);
    setConfirming(false);
    if (!r.ok) return setError(r.error);
    router.refresh();
  }

  const selftest = selftestView(settings?.purgeSelftest ?? null);

  return (
    <Section
      title="개인정보 자동 파기"
      hint="문의는 접수일부터 1년 보관합니다(계약한 건은 파기 대상에서 빠집니다). 기간이 지나면 매일 밤 0시 10분쯤 이름·연락처·내용을 지웁니다."
    >
      {settingsError ? <LoadError message={settingsError} /> : null}
      {settings ? (
        <div className="space-y-3 px-3 py-3 text-[13px] text-gray-300">
          <div>
            <p className="font-semibold text-white">
              지금: {mode === "live" ? "실행 모드" : "시험 모드"}
            </p>
            <p className="text-[12px] text-gray-400">
              {mode === "live"
                ? "보관 기간이 지난 문의의 이름·연락처·내용을 매일 지웁니다."
                : "지우지 않고 대상만 기록합니다."}
            </p>
          </div>

          {!confirming ? (
            <Chip tone={mode === "live" ? "neutral" : "active"} disabled={busy} onClick={() => setConfirming(true)}>
              {mode === "live" ? "시험 모드로 바꾸기" : "실행 모드로 바꾸기"}
            </Chip>
          ) : (
            <div
              className={`rounded-xl border p-3 ${
                target === "live" ? "border-red-500/40 bg-red-500/10 text-red-100" : "border-white/10 bg-black/30 text-gray-200"
              }`}
            >
              {target === "live" ? (
                <p>
                  실행 모드로 바꾸면 오늘 밤부터 보관 기간이 지난 문의의 이름·연락처·내용을 실제로 지웁니다.{" "}
                  <strong className="font-semibold">지운 내용은 되돌릴 수 없습니다.</strong>
                </p>
              ) : (
                <p>시험 모드로 바꾸면 기간이 지나도 지우지 않고 대상만 기록합니다. 그동안 보관 기간을 넘긴 개인정보가 남게 됩니다.</p>
              )}
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Chip tone={target === "live" ? "danger" : "active"} disabled={busy} onClick={() => void switchMode()}>
                  {busy ? "바꾸는 중…" : target === "live" ? "네, 실행 모드로" : "네, 시험 모드로"}
                </Chip>
                <Chip tone="ghost" disabled={busy} onClick={() => setConfirming(false)}>
                  취소
                </Chip>
              </div>
            </div>
          )}
          {error ? (
            <p role="alert" className="text-[12px] text-red-300">
              {error}
            </p>
          ) : null}

          <dl className="grid grid-cols-[5.5rem_1fr] gap-x-3 gap-y-1 text-[12px]">
            <dt className="text-gray-500">마지막 실행</dt>
            <dd className="text-gray-300">
              {settings.purgeLastRun
                ? `${formatKstMonthDayTime(settings.purgeLastRun)} (${agoLabel(settings.purgeLastRun, nowIso) ?? "—"})`
                : "아직 없음"}
            </dd>
            <dt className="text-gray-500">한 번에 최대</dt>
            <dd className="text-gray-300">
              {settings.purgeCap}건 (더 많으면 오래된 것부터 지우고 나머지는 다음 날 밤에 이어서 지웁니다. 한꺼번에{" "}
              {Math.max(settings.purgeCap * 20, 1000)}건을 넘으면 이상 신호로 보고 아무것도 지우지 않습니다)
            </dd>
            <dt className="text-gray-500">자체 시험</dt>
            <dd
              className={`flex items-start gap-1 ${
                selftest.ok === true ? "text-emerald-300" : selftest.ok === false ? "text-red-300" : "text-gray-400"
              }`}
            >
              {selftest.ok === true ? <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" /> : null}
              {selftest.ok === false ? <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" /> : null}
              <span className="break-words">{selftest.text}</span>
            </dd>
          </dl>
        </div>
      ) : null}

      <div className="border-t border-white/5">
        <p className="px-3 pt-2.5 text-[12px] font-semibold text-gray-400">최근 파기 기록</p>
        {purgeLogError ? <LoadError message={purgeLogError} /> : null}
        {purgeLog && purgeLog.length === 0 ? <p className="px-3 py-2.5 text-[12px] text-gray-500">기록이 없습니다.</p> : null}
        {purgeLog && purgeLog.length > 0 ? (
          <ul className="space-y-1 px-3 py-2.5 text-[12px] text-gray-400">
            {purgeLog.map((p) => (
              <li key={p.id} className={p.outcome === "ok" ? "" : "text-red-300"}>
                {formatKstCompact(p.runAt)} · {PURGE_MODE_LABEL[p.mode] ?? p.mode} · {PURGE_TARGET_LABEL[p.target] ?? p.target} ·{" "}
                {p.rowCount}건 · {PURGE_OUTCOME_LABEL[p.outcome] ?? p.outcome}
                <span className="text-gray-600"> ({PURGE_TRIGGER_LABEL[p.trigger] ?? p.trigger})</span>
                {p.note ? <span className="block break-words text-gray-500">{p.note}</span> : null}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Section>
  );
}

// ── 3. 아침 요약 문자 ────────────────────────────────────────────────────

function DigestSection({
  settings,
  hasCronSecret,
  nowIso,
}: {
  settings: CrmSettings | null;
  hasCronSecret: boolean;
  nowIso: string;
}) {
  const last = settings?.digestLast ?? null;
  // 찜만 하고 끝나지 않은 기록: 10분 안이면 「보내는 중」, 넘었으면 도중에 멈춘 것(다음 실행이 다시 보낸다)
  const sendingNow = isDigestSendingFresh(last, new Date(nowIso).getTime());
  let lastText = "아직 보낸 기록이 없습니다.";
  if (last) {
    const status = sendingNow
      ? "보내는 중"
      : last.state === "sending"
        ? "안 보냄 — 보내다 멈췄습니다(다시 실행하면 보냅니다)"
        : last.sent
          ? "보냄"
          : last.skipped === "nothing"
            ? "안 보냄 — 알릴 것이 없었습니다"
            : `안 보냄 — ${last.error ?? "이유 모름"}`;
    lastText = `${formatKstMonthDayTime(last.at)} · ${status}`;
  }
  return (
    <Section title="아침 요약 문자">
      <div className="space-y-2 px-3 py-3 text-[13px] text-gray-300">
        <p>
          매일 아침 8시대에 오늘 챙길 건수만 문자로 보냅니다. 고객 이름·연락처는 문자에 넣지 않습니다.
        </p>
        {!hasCronSecret ? (
          <Banner tone="warn" icon={<AlertTriangle className="h-4 w-4" aria-hidden="true" />}>
            Vercel 환경변수 CRON_SECRET 이 없어 문자가 나가지 않습니다.
          </Banner>
        ) : (
          <p className="text-[12px] text-gray-500">CRON_SECRET 설정됨</p>
        )}
        <p
          className={`text-[12px] ${
            last && !last.sent && !sendingNow && (last.error || last.state === "sending") ? "text-red-300" : "text-gray-400"
          }`}
        >
          마지막: {lastText}
        </p>
      </div>
    </Section>
  );
}

// ── 4. 접속 기록 ────────────────────────────────────────────────────────

function AccessLogSection({
  rows,
  error,
  days,
  truncated,
  loginFailCount,
  sessions,
}: {
  rows: AccessLogRow[] | null;
  error: string | null;
  days: number;
  truncated: boolean;
  loginFailCount: number | null;
  sessions: SessionRow[] | null;
}) {
  // 요약 먼저(월 1회 점검에 필요한 네 숫자), 줄 목록은 접어 둔다 — access-log-core.ts 주석
  const summary = rows ? summarizeAccessLog(rows, loginFailCount, sessions ? sessions.map((s) => s.ip) : []) : null;
  return (
    <Section
      title="접속 기록"
      hint={`월 1회 훑어보세요. 최근 ${days}일치를 요약합니다. 2년 보관 뒤 자동 삭제됩니다(로그인 기록은 3년).`}
    >
      {error ? <LoadError message={error} /> : null}
      {summary ? (
        <div className="space-y-1.5 px-3 py-3 text-[13px] text-gray-300">
          <p>
            로그인 {summary.logins}회 · 비밀번호 틀림 {summary.loginFails === null ? "?" : summary.loginFails}회 ·{" "}
            <span className={summary.problems > 0 ? "font-semibold text-red-300" : ""}>오류/거절 {summary.problems}건</span>
          </p>
          {summary.unknownIps.length > 0 ? (
            <p className="text-[12px] text-amber-200">
              처음 보는 IP(기기 목록에 없음):{" "}
              <span className="break-all">
                {summary.unknownIps
                  .slice(0, 5)
                  .map((u) => `${u.ip} (${u.count})`)
                  .join(" · ")}
                {summary.unknownIps.length > 5 ? ` 외 ${summary.unknownIps.length - 5}개` : ""}
              </span>
            </p>
          ) : (
            <p className="text-[12px] text-gray-500">처음 보는 IP 없음 — 모두 기기 목록에 있는 IP 입니다.</p>
          )}
          {summary.loginFails !== null && summary.loginFails > 0 ? (
            <p className="text-[11px] text-gray-500">비밀번호 틀림은 IP 마다 5분 안의 첫 번째와 잠기는 번째만 기록합니다.</p>
          ) : null}
          {truncated ? (
            <p className="text-[11px] text-amber-200">기록이 많아 최근 {rows?.length ?? 0}줄까지만 읽었습니다.</p>
          ) : null}
        </div>
      ) : null}
      {rows && rows.length === 0 ? <p className="px-3 pb-3 text-[13px] text-gray-500">기록이 없습니다.</p> : null}
      {rows && rows.length > 0 ? (
        <details className="border-t border-white/5">
          <summary className="flex min-h-11 cursor-pointer list-none items-center px-3 text-[12px] font-semibold text-gray-400 hover:text-gray-200">
            최근 {days}일 {rows.length}건 펼치기
          </summary>
          <ul className="divide-y divide-white/5 text-[12px]">
          {rows.map((r) => {
            const bad = r.outcome !== "ok";
            const parts = [
              formatKstCompact(r.at),
              ACTION_LABEL[r.action] ?? r.action,
              r.resource ? RESOURCE_LABEL[r.resource] ?? r.resource : null,
              actorLabel(r.actor) === "대표 계정" ? "대표" : r.actor,
              r.ip || null,
            ].filter((p): p is string => Boolean(p));
            return (
              <li key={r.id} className={`break-words px-3 py-2 ${bad ? "text-red-300" : "text-gray-400"}`}>
                {parts.join(" · ")}
                {bad ? <span className="font-semibold"> · {OUTCOME_LABEL[r.outcome] ?? r.outcome}</span> : null}
              </li>
            );
          })}
          </ul>
        </details>
      ) : null}
    </Section>
  );
}

// ── 5. 유출 대응 ────────────────────────────────────────────────────────

function BreachSection() {
  return (
    <Section title="유출이 의심될 때">
      <ol className="list-decimal space-y-1.5 py-3 pl-8 pr-3 text-[13px] leading-relaxed text-gray-300">
        <li>이 화면 위쪽에서 「이 기기 말고 모두 로그아웃」을 누릅니다.</li>
        <li>Vercel 환경변수의 관리자 비밀번호(ADMIN_PASSCODE)를 바꾸고 다시 배포합니다.</li>
        <li>
          유출을 알게 된 때부터 72시간 안에 정보주체(문의한 고객)에게 알리고, 개인정보보호위원회에 신고합니다
          (개인정보 포털 privacy.go.kr).
        </li>
        <li>위 접속 기록에서 언제·어느 IP 로 무엇을 봤는지 확인해 둡니다.</li>
      </ol>
    </Section>
  );
}

// ── 화면 ────────────────────────────────────────────────────────────────

export function SettingsView(props: SettingsViewProps) {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#030712] text-gray-100 [word-break:keep-all]">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#030712]/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-base font-bold text-white">설정</h1>
          <p className="text-[11px] text-gray-500">로그인 기기 · 개인정보 파기 · 아침 문자 · 접속 기록</p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-4">
        <SessionsSection
          sessions={props.sessions}
          error={props.sessionsError}
          currentSessionId={props.currentSessionId}
          nowIso={props.nowIso}
        />
        <PurgeSection
          settings={props.settings}
          settingsError={props.settingsError}
          purgeLog={props.purgeLog}
          purgeLogError={props.purgeLogError}
          nowIso={props.nowIso}
        />
        <DigestSection settings={props.settings} hasCronSecret={props.hasCronSecret} nowIso={props.nowIso} />
        <AccessLogSection
          rows={props.accessLog}
          error={props.accessLogError}
          days={props.accessLogDays}
          truncated={props.accessLogTruncated}
          loginFailCount={props.loginFailCount}
          sessions={props.sessions}
        />
        <BreachSection />
      </div>
    </main>
  );
}
