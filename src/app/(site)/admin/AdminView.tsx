"use client";

// 관리자 화면 본체 — 휴대폰 세로 375px 기준으로 짠다.
//
// 규칙 넷:
// 1) 상태 버튼은 **누르면 곧바로 저장**한다(따로 저장 버튼 없음). 저장 중·실패는 그 줄 안에서 보여 준다.
// 2) 실패하면 **누르기 전 값으로 되돌리고** 서버가 준 문구를 그대로 띄운다.
// 3) 저장이 안 되는 상태(상태 표를 못 읽음 / service_role 키 없음)면 쓰기 버튼을 **잠근다** —
//    눌러도 아무 일이 없는 버튼을 남겨 두면 「눌렀는데 안 내려갔다」가 된다.
// 4) 삭제·내용 수정은 없다. 여기서 바꿀 수 있는 것은 상태·순서·대표작뿐이다.

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Check,
  ExternalLink,
  Link2,
  Loader2,
  LogOut,
  RefreshCw,
  ShieldAlert,
  Star,
  Undo2,
  X,
} from "lucide-react";
import { Banner, Chip, KindBadge } from "@/components/admin/ui";
import type {
  AdminItem,
  AdminViewProps,
  VerifyCheck,
  VerifyResponse,
} from "@/components/admin/types";
import type { FlagKey } from "@/lib/admin/store";
import type { PortfolioStatus } from "@/lib/portfolio/state";

/** 「직전 상태로」 되돌리기가 살아 있는 시간 */
const UNDO_WINDOW_MS = 5 * 60 * 1000;

/** 순서를 한 번 만지면 전체를 10 단위로 다시 매긴다(JSON 의 order 와 섞이지 않게) */
const ORDER_STEP = 10;

/** 이력의 action 값(저장된 영어) → 화면 문구 */
const ACTION_LABEL: Record<string, string> = {
  status: "공개 상태",
  order: "순서",
  featured: "대표작",
  flag: "전체 스위치",
};

const STATUS_TONE: Record<PortfolioStatus, string> = {
  public: "border-emerald-400/70 bg-emerald-500/25 text-white",
  unlisted: "border-amber-400/70 bg-amber-500/25 text-white",
  private: "border-red-400/70 bg-red-500/25 text-white",
};

type RowState = {
  busy: boolean;
  error: string | null;
  savedAt: number | null;
  /**
   * 오류 문구 앞에 붙일 말. 「되돌렸습니다」는 **정말로 값을 바꿨다가 되돌렸을 때만** 쓴다 —
   * 아무것도 바꾼 적 없는데 「되돌렸습니다」가 뜨면 무슨 말인지 알 수 없다. 스스로 설명하는 문구면 null.
   */
  errorLead?: "되돌렸습니다" | "바꾸지 못했습니다" | null;
};

const IDLE_ROW: RowState = { busy: false, error: null, savedAt: null, errorLead: null };

type PostResult<T> = { ok: true; data: T } | { ok: false; error: string; status: number };

async function postJson<T>(url: string, body: unknown): Promise<PostResult<T>> {
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (e) {
    return {
      ok: false,
      status: 0,
      error: e instanceof Error ? `연결하지 못했습니다 — ${e.message}` : "연결하지 못했습니다",
    };
  }
  let json: unknown = null;
  try {
    json = await res.json();
  } catch {
    json = null;
  }
  const serverError =
    typeof json === "object" && json !== null && typeof (json as Record<string, unknown>).error === "string"
      ? ((json as Record<string, unknown>).error as string)
      : null;
  if (!res.ok) {
    const fallback =
      res.status === 404
        ? "이 기능이 아직 서버에 없습니다 (404)"
        : `요청이 실패했습니다 (${res.status})`;
    return { ok: false, status: res.status, error: serverError ?? fallback };
  }
  return { ok: true, data: (json ?? {}) as T };
}

function formatKstTime(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  // 브라우저 시간대와 무관하게 한국 시각으로 보여 준다
  return d.toLocaleString("ko-KR", {
    timeZone: "Asia/Seoul",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** 되돌리기 기록을 새로고침·앱 전환 뒤에도 살리는 자리 (탭 하나 안에서만 산다) */
const UNDO_STORAGE_KEY = "taemun-admin-undos";

type UndoMap = Record<string, { prev: PortfolioStatus; at: number }>;

function readStoredUndos(): UndoMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(UNDO_STORAGE_KEY);
    if (!raw) return {};
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== "object" || parsed === null) return {};
    const out: UndoMap = {};
    for (const [slug, value] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof value !== "object" || value === null) continue;
      const v = value as Record<string, unknown>;
      const prev = v.prev;
      const at = v.at;
      if ((prev === "public" || prev === "unlisted" || prev === "private") && typeof at === "number") {
        out[slug] = { prev, at };
      }
    }
    return out;
  } catch {
    return {};
  }
}

export default function AdminView(props: AdminViewProps) {
  const { statuses, statusLabel, statusHelp, stateOk, stateError, stateHint, hasServiceRole, fixture, flagLabel, actor } =
    props;
  const router = useRouter();

  const [items, setItems] = useState<AdminItem[]>(props.items);
  const [flags, setFlags] = useState(props.flags);
  const [rows, setRows] = useState<Record<string, RowState>>({});
  // 「직전 상태로」 는 5분을 화면에 약속한다 — 폰에서 다른 앱 갔다 와도 살아 있어야 그 약속이 참이 된다.
  // (예전엔 메모리에만 있어 새로고침·앱 전환 한 번에 사라졌다.)
  const [undos, setUndos] = useState<UndoMap>({});
  const [copied, setCopied] = useState<Record<string, string>>({});
  const [now, setNow] = useState<number>(() => Date.now());
  const [tab, setTab] = useState<"items" | "log">("items");
  const [busyFlag, setBusyFlag] = useState<FlagKey | null>(null);
  const [confirmProposalsDown, setConfirmProposalsDown] = useState(false);
  const [reordering, setReordering] = useState(false);
  const [topError, setTopError] = useState<string | null>(null);
  const [authLost, setAuthLost] = useState(false);
  const [verify, setVerify] = useState<{
    busy: boolean;
    error: string | null;
    data: VerifyResponse | null;
    /** null 이면 전체 확인, 배열이면 그 작업물만 확인 중·확인함 */
    scope: string[] | null;
  }>({
    busy: false,
    error: null,
    data: null,
    scope: null,
  });

  // 서버가 다시 그려 주면(router.refresh) 그 값이 정답이다
  useEffect(() => setItems(props.items), [props.items]);
  useEffect(() => setFlags(props.flags), [props.flags]);

  // 되돌리기 5분 창을 저절로 닫기 위한 시계
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 15_000);
    return () => window.clearInterval(id);
  }, []);

  // 저장해 둔 되돌리기 기록을 되살린다(첫 렌더 뒤 — 서버 HTML 과 어긋나지 않게)
  useEffect(() => setUndos(readStoredUndos()), []);
  useEffect(() => {
    try {
      window.sessionStorage.setItem(UNDO_STORAGE_KEY, JSON.stringify(undos));
    } catch {
      // 사생활 보호 모드 등에서 저장이 막힐 수 있다 — 되돌리기는 이번 화면에서만 살아 있게 되고, 그게 전부다
    }
  }, [undos]);

  const writeLocked = !stateOk || !hasServiceRole;

  const rowOf = useCallback((slug: string): RowState => rows[slug] ?? IDLE_ROW, [rows]);
  const setRow = useCallback((slug: string, next: RowState) => {
    setRows((prev) => ({ ...prev, [slug]: next }));
  }, []);

  const handleFailure = useCallback((status: number) => {
    if (status === 401) setAuthLost(true);
  }, []);

  const changeStatus = useCallback(
    async (slug: string, next: PortfolioStatus, recordUndo = true): Promise<boolean> => {
      const current = items.find((i) => i.slug === slug);
      if (!current || current.status === next) return true;
      const prev = current.status;

      setRow(slug, { busy: true, error: null, savedAt: null });
      setItems((list) => list.map((i) => (i.slug === slug ? { ...i, status: next } : i)));

      const res = await postJson<{ success: boolean; logged?: boolean }>("/api/admin/state", { slug, status: next });
      if (!res.ok) {
        setItems((list) => list.map((i) => (i.slug === slug ? { ...i, status: prev } : i)));
        setRow(slug, { busy: false, error: res.error, savedAt: null, errorLead: "되돌렸습니다" });
        handleFailure(res.status);
        return false;
      }

      setRow(slug, { busy: false, error: null, savedAt: Date.now() });
      setUndos((u) => {
        const nextUndos = { ...u };
        if (recordUndo) nextUndos[slug] = { prev, at: Date.now() };
        else delete nextUndos[slug];
        return nextUndos;
      });
      router.refresh();
      return true;
    },
    [items, router, setRow, handleFailure],
  );

  const toggleFeatured = useCallback(
    async (slug: string) => {
      const current = items.find((i) => i.slug === slug);
      if (!current) return;
      const next = !current.featured;

      setRow(slug, { busy: true, error: null, savedAt: null });
      setItems((list) => list.map((i) => (i.slug === slug ? { ...i, featured: next } : i)));

      const res = await postJson<{ success: boolean }>("/api/admin/state", { slug, featured: next });
      if (!res.ok) {
        setItems((list) => list.map((i) => (i.slug === slug ? { ...i, featured: !next } : i)));
        setRow(slug, { busy: false, error: res.error, savedAt: null, errorLead: "되돌렸습니다" });
        handleFailure(res.status);
        return;
      }
      setRow(slug, { busy: false, error: null, savedAt: Date.now() });
      router.refresh();
    },
    [items, router, setRow, handleFailure],
  );

  const move = useCallback(
    async (index: number, direction: -1 | 1) => {
      const target = index + direction;
      if (target < 0 || target >= items.length || reordering) return;

      const before = items;
      const swapped = [...items];
      const tmp = swapped[index];
      swapped[index] = swapped[target];
      swapped[target] = tmp;

      const movedSlug = swapped[target].slug;
      const plan = swapped.map((it, i) => ({ slug: it.slug, order: (i + 1) * ORDER_STEP, stale: it.sortOrder !== (i + 1) * ORDER_STEP }));

      setReordering(true);
      setItems(swapped.map((it, i) => ({ ...it, sortOrder: (i + 1) * ORDER_STEP })));
      setRow(movedSlug, { busy: true, error: null, savedAt: null });

      // 한 줄씩 저장한다. 도중에 실패하면 **앞의 몇 줄은 이미 저장돼 있다** — 화면만 되돌리면
      // 다음 새로고침에 뒤섞인 목록이 나오고 형은 자기가 뭘 했는지 알 수 없다.
      // 그래서 「중간까지만 저장됐다」고 말하고, 서버에서 진짜 순서를 다시 읽어 바로 보여 준다.
      let savedCount = 0;
      for (const step of plan) {
        if (!step.stale) continue;
        const res = await postJson<{ success: boolean }>("/api/admin/state", { slug: step.slug, sortOrder: step.order });
        if (!res.ok) {
          setItems(before);
          setRow(movedSlug, {
            busy: false,
            error: savedCount
              ? `순서가 중간까지만 저장됐습니다(${savedCount}개). 지금 실제 순서를 다시 읽어 왔으니 확인하고 다시 맞춰 주세요 — ${res.error}`
              : `순서를 저장하지 못했습니다 — ${res.error}`,
            savedAt: null,
            // 이 문구는 스스로 설명한다 — 앞에 「되돌렸습니다」를 붙이지 않는다
            errorLead: null,
          });
          handleFailure(res.status);
          setReordering(false);
          if (savedCount) router.refresh();
          return;
        }
        savedCount += 1;
      }

      setRow(movedSlug, { busy: false, error: null, savedAt: Date.now() });
      setReordering(false);
      router.refresh();
    },
    [items, reordering, router, setRow, handleFailure],
  );

  const toggleFlag = useCallback(
    async (key: FlagKey, enabled: boolean) => {
      setBusyFlag(key);
      setTopError(null);
      const res = await postJson<{ key: FlagKey; enabled: boolean }>("/api/admin/flags", { key, enabled });
      setBusyFlag(null);
      if (!res.ok) {
        setTopError(res.error);
        handleFailure(res.status);
        return;
      }
      setFlags((f) =>
        res.data.key === "proposals_down"
          ? { ...f, proposalsDown: res.data.enabled }
          : { ...f, allDemosDown: res.data.enabled },
      );
      setConfirmProposalsDown(false);
      router.refresh();
    },
    [router, handleFailure],
  );

  /**
   * 「진짜 내려갔나 확인」 — slugs 를 주면 그것만 잰다.
   * 전체 확인은 작업물 수만큼 주소를 새로 받아 오므로 운영(데모가 전부 동적 렌더)에서 10초 가까이 걸린다.
   * 방금 내린 하나만 재는 길이 있어야 급할 때 기다리지 않는다(API 는 원래부터 slugs 를 받는다).
   */
  const runVerify = useCallback(
    async (slugs?: string[]) => {
      setVerify((v) => ({ busy: true, error: null, data: slugs ? v.data : null, scope: slugs ?? null }));
      const res = await postJson<VerifyResponse>("/api/admin/verify", slugs ? { slugs } : {});
      if (!res.ok) {
        setVerify({ busy: false, error: res.error, data: null, scope: null });
        handleFailure(res.status);
        return;
      }
      setVerify({ busy: false, error: null, data: res.data, scope: slugs ?? null });
    },
    [handleFailure],
  );

  const copyLink = useCallback(
    async (item: AdminItem) => {
      if (item.status === "private") {
        const ok = await changeStatus(item.slug, "unlisted");
        if (!ok) return;
      }
      const url = item.liveUrl.startsWith("/") ? `${window.location.origin}${item.liveUrl}` : item.liveUrl;
      let message = `링크를 복사했습니다 — ${url}`;
      try {
        await navigator.clipboard.writeText(url);
      } catch {
        message = `복사가 막혀 있습니다. 직접 복사하세요 — ${url}`;
      }
      setCopied((c) => ({ ...c, [item.slug]: message }));
      window.setTimeout(() => {
        setCopied((c) => {
          const next = { ...c };
          delete next[item.slug];
          return next;
        });
      }, 6000);
    },
    [changeStatus],
  );

  const logout = useCallback(async () => {
    await postJson("/api/admin/logout", {});
    router.replace("/admin/login");
    router.refresh();
  }, [router]);

  const checksBySlug = useMemo(() => {
    const map: Record<string, VerifyCheck> = {};
    for (const c of verify.data?.checks ?? []) map[c.slug] = c;
    return map;
  }, [verify.data]);

  // ── 이력 화면이 쓰는 옮겨 적기 ──────────────────────────────
  // 저장된 값은 영어 그대로 두고(추가 전용 표라 고칠 수도 없다) **화면에서만** 사람 말로 바꾼다.
  const logTitleOf = useCallback(
    (slug: string): string => {
      if (slug.startsWith("flag:")) return flagLabel[slug.slice("flag:".length)] ?? "전체 스위치";
      return items.find((i) => i.slug === slug)?.title ?? slug;
    },
    [items, flagLabel],
  );
  /** public|unlisted|private → 공개·링크 전용·비공개. 전역 스위치 줄이면 on·off → 켬·끔 */
  const logStateWord = useCallback(
    (value: string | null, isFlag: boolean): string | null => {
      if (!value) return null;
      if (isFlag) return value === "on" ? "켬" : value === "off" ? "끔" : value;
      // 「(기본값 unlisted)」 처럼 문장 안에 들어 있는 경우도 있어 포함된 낱말을 전부 바꾼다
      let out = value;
      for (const [key, label] of Object.entries(statusLabel)) out = out.split(key).join(label);
      return out;
    },
    [statusLabel],
  );

  const proposalCount = items.filter((i) => i.kind === "proposal").length;
  const mismatchCount = (verify.data?.checks ?? []).filter((c) => c.mismatch).length;
  /** 확인 결과가 「자동 판정 기준」인지 — 상태를 못 읽은 채 잰 값은 형이 정한 설정이 아니다 */
  const verifiedWithoutState = verify.data !== null && verify.data.stateOk === false;

  return (
    // overflow-x-hidden: 긴 오류 원문이 와도 화면이 가로로 밀리지 않게 한 겹 더 건다
    <main className="min-h-screen overflow-x-hidden bg-[#030712] text-gray-100">
      {/* ── 맨 위 고정 바 ───────────────────────────────── */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-[#030712]/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold text-white">작업물 공개 관리</h1>
              <p className="truncate text-[11px] text-gray-500">{actor} 로 로그인 · 작업물 {items.length}개</p>
            </div>
            <Chip tone="ghost" onClick={logout} aria-label="로그아웃">
              <LogOut className="h-4 w-4" aria-hidden="true" />
              <span>로그아웃</span>
            </Chip>
          </div>

          {/* 경고 배지 — 저장이 안 되는 상태를 조용히 넘기지 않는다 */}
          <div className="mt-3 space-y-2">
            {!hasServiceRole && (
              <Banner tone="danger" icon={<ShieldAlert className="h-4 w-4" aria-hidden="true" />}>
                <strong className="font-semibold">서버 설정 오류</strong> — Vercel 에 SUPABASE_SERVICE_ROLE_KEY 를 넣어야
                저장됩니다. 지금은 아무것도 바꿀 수 없습니다.
              </Banner>
            )}
            {fixture && (
              <Banner tone="warn" icon={<AlertTriangle className="h-4 w-4" aria-hidden="true" />}>
                <strong className="font-semibold">가짜 상태로 읽는 중입니다</strong> — 화면의 값은 검증용 예시이고,
                저장은 진짜 데이터베이스로 갑니다. 운영 화면이라면 서버의 PORTFOLIO_STATE_FIXTURE 를 지워야 합니다.
              </Banner>
            )}
            {!stateOk && (
              <Banner tone="warn" icon={<AlertTriangle className="h-4 w-4" aria-hidden="true" />}>
                <strong className="font-semibold">상태를 읽지 못했습니다</strong> — 제안 시안은 자동으로 내려가 있습니다.
                {/* 다음에 할 일을 사람 말로. 원문은 그 아래 작은 글씨로만 둔다 */}
                {stateHint ? <span className="mt-1 block text-[12px] text-amber-100">{stateHint}</span> : null}
                {stateError ? (
                  <span className="mt-1 block break-words text-[11px] text-amber-200/80">{stateError}</span>
                ) : null}
                <span className="mt-2 flex flex-wrap gap-2">
                  <Chip tone="neutral" onClick={() => router.refresh()}>
                    <RefreshCw className="h-4 w-4" aria-hidden="true" />
                    <span>다시 시도</span>
                  </Chip>
                </span>
              </Banner>
            )}
            {authLost && (
              <Banner tone="danger" icon={<ShieldAlert className="h-4 w-4" aria-hidden="true" />}>
                로그인이 풀렸습니다.{" "}
                <a href="/admin/login" className="underline underline-offset-2">
                  다시 로그인
                </a>
              </Banner>
            )}
            {topError && (
              <Banner tone="danger" icon={<X className="h-4 w-4" aria-hidden="true" />}>
                {topError}
              </Banner>
            )}
          </div>

          {/* 제안 시안 전부 내리기 */}
          <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.03] p-3">
            {flags.proposalsDown ? (
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[13px] text-red-200">
                  제안 시안 {proposalCount}개가 <strong className="font-semibold">전부 내려가 있습니다</strong>
                </p>
                <Chip
                  tone="neutral"
                  disabled={writeLocked || busyFlag !== null}
                  onClick={() => toggleFlag("proposals_down", false)}
                >
                  {busyFlag === "proposals_down" ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Undo2 className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span>다시 올리기</span>
                </Chip>
              </div>
            ) : confirmProposalsDown ? (
              <div>
                <p className="text-[13px] text-red-100">
                  제안 시안 {proposalCount}개를 모두 내립니다. 링크로도 열리지 않습니다. 진행할까요?
                </p>
                <div className="mt-2 flex gap-2">
                  <Chip
                    tone="danger"
                    className="flex-1"
                    disabled={busyFlag !== null}
                    onClick={() => toggleFlag("proposals_down", true)}
                  >
                    {busyFlag === "proposals_down" ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <Check className="h-4 w-4" aria-hidden="true" />
                    )}
                    <span>네, 전부 내립니다</span>
                  </Chip>
                  <Chip tone="neutral" className="flex-1" onClick={() => setConfirmProposalsDown(false)}>
                    취소
                  </Chip>
                </div>
              </div>
            ) : (
              <Chip
                tone="danger"
                className="w-full"
                disabled={writeLocked}
                onClick={() => setConfirmProposalsDown(true)}
              >
                <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                <span>제안 시안 전부 내리기</span>
              </Chip>
            )}

            {/* 데모 전부 내리기(all_demos_down) — **끄는 길은 항상 열어 둔다.**
                켜는 버튼은 1단계에 두지 않았지만, 다른 경로로 켜졌을 때(다른 사람·직접 DB 수정) 이 화면에서
                되돌릴 수 없으면 전 사이트 데모가 내려간 채 묶인다. */}
            {flags.allDemosDown && (
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-red-500/40 bg-red-500/10 p-2.5">
                <p className="text-[13px] text-red-100">
                  <strong className="font-semibold">데모 전부 내리기</strong>가 켜져 있습니다 — 샘플까지 전부 막혀 있습니다
                </p>
                <Chip
                  tone="neutral"
                  disabled={writeLocked || busyFlag !== null}
                  onClick={() => toggleFlag("all_demos_down", false)}
                >
                  {busyFlag === "all_demos_down" ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  ) : (
                    <Undo2 className="h-4 w-4" aria-hidden="true" />
                  )}
                  <span>데모 전부 다시 올리기</span>
                </Chip>
              </div>
            )}

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Chip tone="neutral" onClick={() => runVerify()} disabled={verify.busy}>
                {verify.busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                )}
                <span>{items.length}개 전부 확인</span>
              </Chip>
              {verify.busy && (
                <span className="text-[12px] text-gray-400">
                  {verify.scope ? "작업물 1개를 재는 중…" : `작업물 ${items.length}개와 목록 2쪽을 새로 받는 중… 10초쯤 걸립니다`}
                </span>
              )}
              {!verify.busy && verify.data && (
                <span className={`text-[12px] ${mismatchCount ? "text-red-300" : "text-emerald-300"}`}>
                  {mismatchCount ? `${mismatchCount}개가 설정과 다릅니다` : "전부 설정대로입니다"} ·{" "}
                  {formatKstTime(verify.data.checkedAt)} 기준
                  {verify.scope ? ` · ${verify.scope.length}개만 확인` : ""}
                </span>
              )}
              {verify.error && <span className="text-[12px] break-words text-red-300">{verify.error}</span>}
            </div>
            {/* 상태를 못 읽은 채 잰 결과는 「형이 정한 설정대로」가 아니라 「장애 때의 자동 판정대로」다 —
                초록불을 「내 설정이 다 반영됐다」로 읽으면 안 된다 */}
            {!verify.busy && verifiedWithoutState && (
              <p className="mt-1 text-[11px] leading-relaxed text-amber-300">
                지금은 저장된 상태를 못 읽어, 장애 때 쓰는 자동 판정(제안 시안은 내려감) 기준으로 잰 결과입니다.
              </p>
            )}
            {verify.data && (
              <p className="mt-1 text-[11px] text-gray-500 break-all">확인한 주소: {verify.data.baseUrl}</p>
            )}

            {/* ⚠️ 두 시간이 예전 문구와 정반대였다. 데모 주소 판정(gate.ts)은 요청마다 지금 값을 읽어 **즉시**이고,
                목록(홈·포트폴리오)은 최대 20초 캐시를 지난다. 항의 전화 중에 목록에 회사 이름이 남아 있는 걸 보고
                「안 내려갔다」고 판단하지 않도록 사실대로 적는다. */}
            <p className="mt-2 text-[11px] leading-relaxed text-gray-500">
              저장하면 <strong className="text-gray-300">링크는 즉시</strong> 막히고,{" "}
              <strong className="text-gray-300">목록(홈·포트폴리오)에서 사라지는 데는 최대 20초</strong> 걸립니다.
            </p>
          </div>

          {/* 탭 */}
          <div className="mt-3 flex gap-1.5" role="tablist" aria-label="관리자 화면 탭">
            <Chip
              tone={tab === "items" ? "active" : "neutral"}
              role="tab"
              aria-selected={tab === "items"}
              onClick={() => setTab("items")}
            >
              작업물
            </Chip>
            <Chip
              tone={tab === "log" ? "active" : "neutral"}
              role="tab"
              aria-selected={tab === "log"}
              onClick={() => setTab("log")}
            >
              최근 이력
            </Chip>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-4">
        {tab === "items" ? (
          <ul className="space-y-3">
            {items.map((item, index) => {
              const row = rowOf(item.slug);
              const undo = undos[item.slug];
              const undoAlive = undo !== undefined && now - undo.at < UNDO_WINDOW_MS;
              const undoMinutes = undo ? Math.max(1, Math.ceil((UNDO_WINDOW_MS - (now - undo.at)) / 60_000)) : 0;
              const check = checksBySlug[item.slug];
              const note = copied[item.slug];
              const busy = row.busy || reordering;

              return (
                <li key={item.slug} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <div className="flex gap-3">
                    {item.thumbnailSrc ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.thumbnailSrc}
                        alt=""
                        className="h-14 w-14 shrink-0 rounded-lg border border-white/10 object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-[10px] text-gray-600">
                        없음
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="min-w-0 truncate text-sm font-semibold text-white">{item.title}</span>
                        <KindBadge kind={item.kind} label={item.kindLabel} />
                      </div>
                      <p className="mt-0.5 truncate text-xs text-gray-400">{item.subtitle}</p>
                      <p className="mt-0.5 truncate text-[11px] text-gray-600">
                        {item.industryLabel} · {item.slug}
                      </p>
                    </div>

                    {/* 순서 위·아래 — 둘 다 세로 44px. 예전엔 22px 씩이라 손가락으로 오조준하면
                        반대 방향으로 움직였다(같은 화면의 다른 버튼은 전부 min-h-11 이다) */}
                    <div className="flex shrink-0 flex-col gap-1">
                      <button
                        type="button"
                        aria-label={`${item.title} 위로`}
                        disabled={writeLocked || busy || index === 0}
                        onClick={() => move(index, -1)}
                        className="flex min-h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-gray-300 transition hover:bg-white/[0.08] disabled:opacity-30"
                      >
                        <ArrowUp className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        aria-label={`${item.title} 아래로`}
                        disabled={writeLocked || busy || index === items.length - 1}
                        onClick={() => move(index, 1)}
                        className="flex min-h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] text-gray-300 transition hover:bg-white/[0.08] disabled:opacity-30"
                      >
                        <ArrowDown className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  {/* 상태 버튼 3개 — 누르면 즉시 저장 */}
                  <div className="mt-3 grid grid-cols-3 gap-1.5" role="group" aria-label={`${item.title} 공개 상태`}>
                    {statuses.map((s) => {
                      const active = item.status === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          aria-pressed={active}
                          disabled={writeLocked || busy}
                          onClick={() => changeStatus(item.slug, s)}
                          className={`min-h-11 rounded-xl border px-2 text-[13px] font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
                            active ? STATUS_TONE[s] : "border-white/10 bg-white/[0.04] text-gray-400 hover:bg-white/[0.08]"
                          }`}
                        >
                          {statusLabel[s]}
                        </button>
                      );
                    })}
                  </div>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-gray-500">{statusHelp[item.status]}</p>

                  {item.effectiveStatus !== item.status && (
                    <p className="mt-1 text-[11px] text-amber-300">
                      지금은 「{statusLabel[item.effectiveStatus]}」 로 적용 중입니다
                      {flags.allDemosDown
                        ? " (데모 전부 내리기 켜짐)"
                        : flags.proposalsDown && item.kind === "proposal"
                          ? " (제안 시안 전부 내리기 켜짐)"
                          : !stateOk
                            ? " (상태를 읽지 못해 자동으로 내림)"
                            : ""}
                    </p>
                  )}

                  {/* 줄 안의 동작들 */}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Chip
                      tone={item.featured ? "active" : "neutral"}
                      aria-pressed={item.featured}
                      disabled={writeLocked || busy}
                      onClick={() => toggleFeatured(item.slug)}
                    >
                      <Star className={`h-4 w-4 ${item.featured ? "fill-current" : ""}`} aria-hidden="true" />
                      <span>대표작</span>
                    </Chip>

                    {/* 비공개 항목의 복사는 **상태를 바꾸는 동작**이다 — 저장이 잠겼으면 같이 잠근다.
                        (예전엔 눌리기만 하고 503 을 받아 「되돌렸습니다 — 서버 설정 오류입니다」가 떴다) */}
                    <Chip
                      tone="neutral"
                      disabled={busy || (item.status === "private" && writeLocked)}
                      onClick={() => copyLink(item)}
                    >
                      <Link2 className="h-4 w-4" aria-hidden="true" />
                      <span>{item.status === "private" ? "링크전용으로 바꾸고 복사" : "링크 복사"}</span>
                    </Chip>

                    {/* 방금 내린 하나만 재는 길 — 전체 확인은 10초쯤 걸린다 */}
                    <Chip tone="neutral" disabled={verify.busy} onClick={() => runVerify([item.slug])}>
                      {verify.busy && verify.scope?.includes(item.slug) ? (
                        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      ) : (
                        <RefreshCw className="h-4 w-4" aria-hidden="true" />
                      )}
                      <span>이것만 확인</span>
                    </Chip>

                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-[13px] font-medium text-gray-200 transition hover:bg-white/[0.08]"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      <span>미리보기</span>
                    </a>

                    {undoAlive && (
                      <Chip
                        tone="neutral"
                        disabled={writeLocked || busy}
                        onClick={() => changeStatus(item.slug, undo.prev, false)}
                      >
                        <Undo2 className="h-4 w-4" aria-hidden="true" />
                        <span>
                          직전 상태로 ({statusLabel[undo.prev]}, {undoMinutes}분)
                        </span>
                      </Chip>
                    )}
                  </div>

                  {/* 이 줄의 저장 상태 — 토스트로만 알리지 않는다 */}
                  <div className="mt-2 min-h-[18px] text-[11px]" aria-live="polite">
                    {busy && (
                      <span className="inline-flex items-center gap-1 text-gray-400">
                        <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" />
                        저장 중…
                      </span>
                    )}
                    {!busy && row.error && (
                      <span className="inline-flex items-start gap-1 text-red-300">
                        <X className="mt-px h-3 w-3 shrink-0" aria-hidden="true" />
                        {/* break-words: 데이터베이스 원문이 길어도 화면이 가로로 밀리지 않게 */}
                        <span className="min-w-0 break-words">
                          {row.errorLead ? `${row.errorLead} — ` : ""}
                          {row.error}
                        </span>
                      </span>
                    )}
                    {!busy && !row.error && row.savedAt && (
                      <span className="inline-flex items-center gap-1 text-emerald-300">
                        <Check className="h-3 w-3" aria-hidden="true" />
                        저장했습니다
                      </span>
                    )}
                    {!busy && !row.error && !row.savedAt && item.updatedAt && (
                      <span className="text-gray-600">최근 변경 {formatKstTime(item.updatedAt)} · {item.updatedBy}</span>
                    )}
                  </div>

                  {note && <p className="mt-1 text-[11px] break-all text-indigo-300">{note}</p>}

                  {check && (
                    <p
                      className={`mt-1 text-[11px] leading-relaxed ${check.mismatch ? "text-red-300" : "text-emerald-300"}`}
                    >
                      {check.mismatch ? "✕ " : "✓ "}
                      {check.mismatch
                        ? check.mismatchReason
                        : `바깥에서 확인: ${check.expectedReachable ? "열림" : "막힘"} (HTTP ${check.httpStatus ?? "-"})${
                            check.expectedListed ? " · 목록 노출" : " · 목록에서 빠짐"
                          }`}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        ) : (
          <div>
            <div className="mb-3 flex items-center justify-between gap-2">
              <p className="text-[13px] text-gray-400">최근 변경 {props.log.length}건</p>
              <Chip tone="neutral" onClick={() => router.refresh()}>
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                <span>새로 읽기</span>
              </Chip>
            </div>
            {props.logError && (
              <Banner tone="warn" icon={<AlertTriangle className="h-4 w-4" aria-hidden="true" />}>
                이력을 읽지 못했습니다 — {props.logError}
              </Banner>
            )}
            {!props.logError && props.log.length === 0 && (
              <p className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-6 text-center text-[13px] text-gray-500">
                아직 변경 이력이 없습니다.
              </p>
            )}
            {/* 이력은 5분 뒤 「내가 뭘 눌렀더라」를 확인하는 **유일한 영구 기록**이다 —
                데이터베이스 값(wonik-qnc / status: unlisted → private)을 그대로 보여 주지 않고
                화면에서 사람 말로 옮겨 적는다. 저장된 값 자체는 그대로 둔다. */}
            <ul className="space-y-2">
              {props.log.map((entry) => {
                const isFlag = entry.slug.startsWith("flag:");
                const from = logStateWord(entry.fromStatus, isFlag);
                const to = logStateWord(entry.toStatus, isFlag);
                return (
                  <li key={entry.id} className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
                      <span className="text-[13px] font-medium text-gray-200">{logTitleOf(entry.slug)}</span>
                      <span className="text-[11px] text-gray-500">
                        {formatKstTime(entry.createdAt)} · {entry.actor}
                      </span>
                    </div>
                    <p className="mt-0.5 break-words text-[12px] text-gray-400">
                      {ACTION_LABEL[entry.action] ?? entry.action}
                      {from || to ? (
                        <>
                          를 {from ?? "-"} → {to ?? "-"} 로 바꿈
                        </>
                      ) : null}
                      {entry.note ? <span className="text-gray-600"> · {entry.note}</span> : null}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
