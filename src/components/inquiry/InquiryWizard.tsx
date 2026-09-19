"use client";

// 견적 요청 위저드 — 구현계획서 3·5절(2026-09-19 정본 v3).
//
// 흐름: 1 서비스 → 2 일정 → 3 예산 → 4 연락처·요청서 완성 → 접수 완료(접수번호)
//   - 설명 화면을 앞에 두지 않는다: 이탈은 첫 칸을 누르기 전에 가장 많이 일어난다. 흐름은 한 줄 + 펼침.
//   - 옆(모바일은 「내 요청서」)에 견적요청서가 답할 때마다 채워진다. 연락처 칸은 손을 뗄 때 반영(한 글자마다 X).
//   - 1~3단계 어디서나 「연락처만 남기기」(빠른 출구) — 답하지 않은 칸은 「상담에서 정함」.
//   - 레퍼런스가 있으면 머리에 고정하고 「이 레퍼런스를 어떻게 쓰실 건가요」(선택)를 묻는다 — 공개 가격이 없는
//     대신 규모를 가르는 질문(형 결정 #172 · 아라 #173 안을 고쳐서).
//
// 뒤로가기: 단계마다 history 에 한 칸(?step=N). 화면의 「이전」도 history.back() — 브라우저 뒤로가기와 같게 움직인다.
//   Next 16 은 native pushState 를 라우터와 맞춰 주므로(내부 상태를 복사해 붙인다) 우리 키(tmInq·tmStep·tmIdx)를
//   얹어도 된다. 접수 뒤에는 뒤로가기로 입력 단계에 돌아가도 다시 제출되지 않게 완료 화면에 머문다.
// 초안: sessionStorage(이 탭에만) — **휴대폰 번호는 저장하지 않는다**(같은 기기를 쓰는 다른 사람에게 보일 수 있다).
// 계측: src/lib/inquiry/track.ts — 입력값·연락처는 보내지 않는다.

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronDown, FileText, PhoneCall, X } from "lucide-react";
import { BUDGET_OPTIONS, SERVICE_OPTIONS, TIMELINE_OPTIONS, serviceLabelOf } from "@/lib/inquiry/options";
import {
  INQUIRY_LIMITS,
  REFERENCE_USAGES,
  type ContactPref,
  type InquiryEntry,
  type ReferenceUsage,
} from "@/lib/inquiry/validate";
import { REFERENCE_USAGE_LABEL } from "@/lib/inquiry/labels";
import { STUDIO_PHONE } from "@/lib/inquiry/contact";
import { trackInquiry } from "@/lib/inquiry/track";
import { PROPOSAL_DISCLAIMER, type IndustryKey, type PortfolioKind } from "@/lib/portfolio/schema";
import { QuoteRequestDocument, filledCount } from "./QuoteRequestDocument";
import type { QuoteRequestData, WizardReference } from "./types";

type InputStep = 1 | 2 | 3 | 4;
type Step = InputStep | "done";

const STEP_TITLE: Record<InputStep, string> = { 1: "서비스", 2: "일정", 3: "예산", 4: "연락처" };
const DRAFT_KEY = "tm_inquiry_draft_v1";
const VARIANT = "doc";

/** 칩·안내에 쓰는 이름 — 운영 서비스를 「샘플」이라고 부르지 않는다 */
const REFERRAL_NOUN: Record<PortfolioKind | "unknown", string> = {
  sample: "샘플",
  proposal: "제안용 시안",
  service: "운영 서비스",
  case: "구축 사례",
  unknown: "포트폴리오",
};

function serviceForIndustry(industry: IndustryKey | undefined): string {
  if (industry === "commerce") return "shopping-mall";
  if (industry === "platform") return "custom-web-app";
  return "company-homepage";
}

type Contact = { name: string; phone: string; email: string; referenceUrl: string; details: string; pref: ContactPref | null };
const EMPTY_CONTACT: Contact = { name: "", phone: "", email: "", referenceUrl: "", details: "", pref: null };

type Draft = {
  v: 1;
  from: string | null;
  services: string[];
  timeline: string | null;
  budget: string | null;
  budgetFlexible: boolean;
  referenceUsage: ReferenceUsage | null;
  quick: boolean;
  /** 휴대폰 번호는 싣지 않는다 */
  contact: Omit<Contact, "phone">;
  step: InputStep;
};

function readDraft(): Draft | null {
  try {
    const raw = window.sessionStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const d = JSON.parse(raw) as Draft;
    return d && d.v === 1 ? d : null;
  } catch {
    return null;
  }
}

function writeDraft(d: Draft) {
  try {
    window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(d));
  } catch {
    // 저장이 막힌 환경(사생활 보호 모드 등) — 초안 없이도 흐름은 돈다
  }
}

function clearDraft() {
  try {
    window.sessionStorage.removeItem(DRAFT_KEY);
  } catch {
    // 무시
  }
}

/** 「example.com」처럼 적어도 주소로 받는다 — 브라우저 기본 검사가 제출을 막지 않게 폼은 noValidate */
function normalizeUrl(value: string): string {
  const v = value.trim();
  if (!v) return "";
  return /^https?:\/\//i.test(v) ? v : `https://${v}`;
}

type HistoryState = { tmInq?: boolean; tmStep?: Step; tmIdx?: number } | null;

export function InquiryWizard({
  reference,
  entry,
  industryLead = null,
  surface = "page",
  onClose,
}: {
  reference: WizardReference | null;
  entry: InquiryEntry;
  /** 샘플 없이 업종만 들고 온 문의(?industry=) — 서비스만 미리 고른다 */
  industryLead?: IndustryKey | null;
  /** page = /inquiry 페이지 · modal = 홈 카드 모달 안(그 자리에서 바뀐다) */
  surface?: "page" | "modal";
  /** modal 에서만 — 닫기(×). 작성하던 내용은 이 탭의 초안에 남으므로 확인을 묻지 않는다 */
  onClose?: () => void;
}) {
  const inModal = surface === "modal";
  const fieldId = useId();
  const [step, setStep] = useState<Step>(1);
  const [editing, setEditing] = useState(false);
  const [services, setServices] = useState<string[]>(() =>
    reference ? [serviceForIndustry(reference.industry)] : industryLead ? [serviceForIndustry(industryLead)] : [],
  );
  const [timeline, setTimeline] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [budgetFlexible, setBudgetFlexible] = useState(false);
  const [referenceUsage, setReferenceUsage] = useState<ReferenceUsage | null>(null);
  const [quick, setQuick] = useState(false);
  const [contact, setContact] = useState<Contact>(EMPTY_CONTACT);
  /** 요청서에 보이는 연락처 — 칸에서 손을 뗄 때 반영 */
  const [docContact, setDocContact] = useState<Contact>(EMPTY_CONTACT);
  const [website, setWebsite] = useState("");
  const [flowOpen, setFlowOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [requestNo, setRequestNo] = useState<string | null>(null);
  const [submittedAt, setSubmittedAt] = useState<Date | null>(null);

  const idxRef = useRef(0);
  const stepRef = useRef<Step>(1);
  const submittedRef = useRef(false);
  const touchedRef = useRef(false);
  const openedAtRef = useRef<number | null>(null);
  const restoredRef = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  /** 마지막으로 화면에 반영한 단계 — null 이면 아직 한 번도 안 그림 */
  const shownStepRef = useRef<Step | null>(null);

  const base = { entry, variant: VARIANT, referralFrom: reference?.slug ?? null };

  // ── history ───────────────────────────────────────────────────────────────
  function writeHistory(next: Step, mode: "push" | "replace") {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("step", String(next));
      if (mode === "push") idxRef.current += 1;
      const state: HistoryState = { tmInq: true, tmStep: next, tmIdx: idxRef.current };
      if (mode === "push") window.history.pushState(state, "", url);
      else window.history.replaceState(state, "", url);
    } catch {
      // history 를 못 쓰는 환경 — 화면 전환만 한다
    }
  }

  function go(next: Step, mode: "push" | "replace" = "push") {
    stepRef.current = next;
    setStep(next);
    writeHistory(next, mode);
  }

  // 처음 한 번: 초안 복원 → 시작 단계 결정 → 현재 기록에 단계를 얹는다
  useEffect(() => {
    openedAtRef.current = Date.now();
    let initial: InputStep = 1;
    const draft = readDraft();
    const from = reference?.slug ?? null;
    if (draft && draft.from === from) {
      restoredRef.current = true;
      setServices(draft.services);
      setTimeline(draft.timeline);
      setBudget(draft.budget);
      setBudgetFlexible(draft.budgetFlexible);
      setReferenceUsage(draft.referenceUsage);
      setQuick(draft.quick);
      const c = { ...EMPTY_CONTACT, ...draft.contact, phone: "" };
      setContact(c);
      setDocContact(c);
      const urlStep = Number(new URL(window.location.href).searchParams.get("step"));
      if (urlStep >= 1 && urlStep <= 4) initial = urlStep as InputStep;
      trackInquiry("draft_resume", { ...base, step: initial });
    }
    stepRef.current = initial;
    setStep(initial);
    // 첫 기록에는 단계를 얹지 않는다 — 수화 직후 Next 라우터가 첫 기록을 자기 상태로 한 번 덮어써서(사용자 키를
    // 보존하지 않는 유일한 때) 여기서 쓴 값이 사라진다. 첫 기록으로 돌아오면 onPop 이 주소의 step 을 읽는다.
    trackInquiry("wizard_open", { ...base, step: initial });

    const onPop = (e: PopStateEvent) => {
      const s = e.state as HistoryState;
      if (submittedRef.current) {
        // 위저드가 쓴 기록 밖으로 나갔으면(모달을 닫는 뒤로가기 등) 손대지 않는다 — 그 기록에 step=done 을 덮어쓰면
        // 홈 주소에 ?step=done 이 남는다
        if (!s?.tmInq) return;
        stepRef.current = "done";
        setStep("done");
        writeHistory("done", "replace");
        return;
      }
      setEditing(false);
      const urlStep = Number(new URL(window.location.href).searchParams.get("step"));
      const fromUrl: InputStep = urlStep >= 1 && urlStep <= 4 ? (urlStep as InputStep) : 1;
      const target: Step = s?.tmInq && s.tmStep && s.tmStep !== "done" ? s.tmStep : fromUrl;
      idxRef.current = s?.tmInq ? s.tmIdx ?? 0 : 0;
      stepRef.current = target;
      setStep(target);
    };
    const onHide = () => {
      if (!submittedRef.current && touchedRef.current) {
        const s = stepRef.current;
        trackInquiry("abandon", { ...base, step: s === "done" ? 5 : s });
      }
    };
    window.addEventListener("popstate", onPop);
    window.addEventListener("pagehide", onHide);
    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("pagehide", onHide);
    };
    // 처음 한 번만 — reference·entry 는 이 화면이 사는 동안 바뀌지 않는다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 단계가 바뀌면: 계측 · 제목으로 초점 · 카드 머리로 스크롤.
  // 「처음 그림」 표시(boolean)로 거르면 개발 모드의 효과 두 번 실행에서 두 번째가 스크롤해 버린다 —
  // 직전 단계와 비교해 실제로 바뀐 때만 움직인다.
  useEffect(() => {
    if (shownStepRef.current === step) return;
    const isFirst = shownStepRef.current === null;
    shownStepRef.current = step;
    if (isFirst) return;
    if (step !== "done") trackInquiry("step_view", { ...base, step });
    headingRef.current?.focus({ preventScroll: true });
    cardRef.current?.scrollIntoView({ block: "start", behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  // 초안 저장(접수 뒤에는 저장하지 않는다)
  useEffect(() => {
    if (submittedRef.current || step === "done") return;
    const { phone: _phone, ...rest } = contact;
    void _phone;
    writeDraft({
      v: 1,
      from: reference?.slug ?? null,
      services,
      timeline,
      budget,
      budgetFlexible,
      referenceUsage,
      quick,
      contact: rest,
      step,
    });
  }, [services, timeline, budget, budgetFlexible, referenceUsage, quick, contact, step, reference?.slug]);

  // ── 동작 ───────────────────────────────────────────────────────────────────
  const touch = () => {
    touchedRef.current = true;
  };

  function finishStep(current: InputStep, next: InputStep) {
    touch();
    trackInquiry("step_done", { ...base, step: current });
    if (editing) {
      setEditing(false);
      go(4, "replace");
    } else {
      go(next);
    }
  }

  function next() {
    setError("");
    if (step === 1) {
      if (services.length === 0) {
        setError("필요한 작업을 하나 이상 골라 주세요. 모르시면 「아직 모르겠어요」를 고르셔도 됩니다.");
        return;
      }
      finishStep(1, 2);
    } else if (step === 2 && timeline) finishStep(2, 3);
    else if (step === 3 && budget) finishStep(3, 4);
  }

  function prev() {
    setError("");
    if (step === "done" || step === 1) return;
    if (idxRef.current > 0) window.history.back();
    else go((step - 1) as InputStep, "replace");
  }

  function quickExit() {
    touch();
    setQuick(true);
    trackInquiry("quick_exit", { ...base, step: step === "done" ? 5 : step });
    go(4);
  }

  function editFromReview(target: 1 | 2 | 3) {
    trackInquiry("review_edit", { ...base, step: target });
    setEditing(true);
    go(target, "replace");
  }

  function toggleService(id: string) {
    touch();
    setError("");
    setServices((cur) => (cur.includes(id) ? cur.filter((s) => s !== id) : [...cur, id]));
  }

  function pickUsage(u: ReferenceUsage) {
    touch();
    const nextValue = referenceUsage === u ? null : u;
    setReferenceUsage(nextValue);
    if (nextValue) trackInquiry("reference_usage_pick", { ...base, step: 1, value: nextValue });
  }

  const setField = (key: keyof Contact) => (value: string) => {
    touch();
    setContact((c) => ({ ...c, [key]: value }));
  };
  const commitContact = () => setDocContact(contact);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!contact.name.trim() || !contact.phone.trim()) {
      setError("성함(회사명)과 휴대폰 번호를 적어 주세요.");
      return;
    }
    commitContact();
    setSubmitting(true);
    const complete = services.length > 0 && Boolean(timeline) && Boolean(budget);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          services: services.map(serviceLabelOf),
          budget: budget ?? "",
          timeline: timeline ?? "",
          clientName: contact.name,
          phone: contact.phone,
          email: contact.email,
          referenceUrl: normalizeUrl(contact.referenceUrl),
          details: contact.details,
          referral: reference
            ? { from: reference.slug, industry: reference.industry, kind: reference.kind }
            : industryLead
              ? { industry: industryLead }
              : undefined,
          entry,
          path: complete ? "full" : "quick",
          budgetFlexible: budget ? budgetFlexible : undefined,
          contactPref: contact.pref ?? undefined,
          referenceUsage: referenceUsage ?? undefined,
          variant: VARIANT,
          website,
          elapsedMs: openedAtRef.current === null ? undefined : Date.now() - openedAtRef.current,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; requestNo?: string | null };
      if (!res.ok) throw new Error(data.error || "접수 중 문제가 생겼습니다. 잠시 뒤 다시 시도해 주세요.");
      submittedRef.current = true;
      setRequestNo(data.requestNo ?? null);
      setSubmittedAt(new Date());
      clearDraft();
      trackInquiry("submit_ok", { ...base, step: 4 });
      go("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "접수 중 문제가 생겼습니다. 잠시 뒤 다시 시도해 주세요.");
      trackInquiry("submit_error", { ...base, step: 4 });
    } finally {
      setSubmitting(false);
    }
  }

  // ── 그리기 ─────────────────────────────────────────────────────────────────
  const docData: QuoteRequestData = {
    reference,
    referenceUsage,
    services: services.map(serviceLabelOf),
    timeline,
    budget,
    budgetFlexible,
    quick,
    contact: docContact,
    requestNo,
    submittedAt,
  };
  const filled = filledCount(docData);
  const stepNo = step === "done" ? 4 : step;
  const progress = step === "done" ? 100 : ((stepNo - 1) / 4) * 100;
  const noun = reference ? REFERRAL_NOUN[reference.kind ?? "unknown"] : null;

  // 페이지 모드는 밝은 바탕(zinc-50) 위에 놓인다 — 어두운 바탕 시절의 shadow-2xl 은 무거워서 옅은 테두리 + 긴 그림자로(09-19)
  const cardClass = inModal
    ? "min-h-full bg-white text-zinc-900 lg:min-h-0 lg:rounded-3xl"
    : "scroll-mt-28 rounded-3xl border border-zinc-200 bg-white text-zinc-900 shadow-[0_24px_60px_-30px_rgba(24,24,27,0.25)]";
  const closeButton = onClose ? (
    <button
      type="button"
      onClick={onClose}
      aria-label="닫기"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
    >
      <X className="w-4 h-4" aria-hidden="true" />
    </button>
  ) : null;

  const callLink = (
    <a
      href={`tel:${STUDIO_PHONE}`}
      onClick={() => trackInquiry("call_click", { ...base, step: step === "done" ? 5 : step })}
      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-950"
    >
      <PhoneCall className="w-3.5 h-3.5" aria-hidden="true" />
      총괄 아키텍트에게 직접 전화 · {STUDIO_PHONE}
    </a>
  );

  if (step === "done") {
    return (
      <section ref={cardRef} aria-labelledby={`${fieldId}-done`} className={`${cardClass} p-5 lg:p-8`}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-8">
          <div className="space-y-5" role="status">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white">
                <Check className="w-5 h-5" aria-hidden="true" />
              </span>
              <h2 id={`${fieldId}-done`} ref={headingRef} tabIndex={-1} className="flex-1 text-xl lg:text-2xl font-extrabold tracking-tight outline-none">
                접수되었습니다
              </h2>
              {closeButton}
            </div>
            {requestNo ? (
              <p className="text-sm text-zinc-600">
                접수번호 <strong className="font-mono text-zinc-900">{requestNo}</strong> — 이 번호는 이 화면에서만 보여
                드립니다. 캡처해 두시면 통화 때 편합니다.
              </p>
            ) : (
              <p className="text-sm text-zinc-600">방금 같은 번호로 접수하신 문의가 있어 한 번만 받았습니다.</p>
            )}

            <ol className="space-y-3 border-l-2 border-zinc-200 pl-4 text-sm">
              <li className="relative">
                <span className="absolute -left-[1.4rem] top-1 h-3 w-3 rounded-full bg-emerald-600" aria-hidden="true" />
                <div className="font-bold">접수 완료</div>
              </li>
              <li className="relative">
                <span className="absolute -left-[1.4rem] top-1 h-3 w-3 rounded-full border-2 border-zinc-300 bg-white" aria-hidden="true" />
                <div className="font-bold">총괄 아키텍트가 연락드립니다</div>
                <div className="text-zinc-500">
                  {docContact.pref === "text_first" ? "말씀하신 대로 문자로 먼저 연락드립니다." : "적어 주신 번호로 연락드립니다."}
                </div>
              </li>
              <li className="relative">
                <span className="absolute -left-[1.4rem] top-1 h-3 w-3 rounded-full border-2 border-zinc-300 bg-white" aria-hidden="true" />
                <div className="font-bold">T-DOCS 견적서를 받아 보고 결정</div>
                <div className="text-zinc-500">견적서는 태문이 만든 전자문서 서비스 T-DOCS(티독스)로 보내 드립니다. 견적 요청은 계약이 아닙니다.</div>
              </li>
              <li className="relative">
                <span className="absolute -left-[1.4rem] top-1 h-3 w-3 rounded-full border-2 border-zinc-300 bg-white" aria-hidden="true" />
                <div className="font-bold">계약하시면 전자계약서에 서명</div>
                <div className="text-zinc-500">휴대폰 번호 확인 뒤 손으로 서명하고, 전자서명 확인서·증명서가 붙은 PDF 로 보관하실 수 있습니다.</div>
              </li>
              <li className="relative">
                <span className="absolute -left-[1.4rem] top-1 h-3 w-3 rounded-full border-2 border-zinc-300 bg-white" aria-hidden="true" />
                <div className="font-bold">착수</div>
              </li>
            </ol>

            <div className="flex flex-col gap-3 border-t border-zinc-200 pt-4">
              <span className="text-xs text-zinc-500">급하시면 지금 전화 주세요.</span>
              {callLink}
              {onClose ? (
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex w-fit items-center gap-1.5 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-bold text-white hover:bg-black"
                >
                  닫기
                </button>
              ) : (
                <Link href="/" className="inline-flex w-fit items-center gap-1.5 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-bold text-white hover:bg-black">
                  홈으로
                </Link>
              )}
            </div>
          </div>
          <div>
            <div className="mb-2 text-xs font-bold text-zinc-500">접수된 요청서</div>
            <QuoteRequestDocument data={docData} variant="receipt" />
          </div>
        </div>
      </section>
    );
  }

  const inputStep = step;

  return (
    <section ref={cardRef} aria-labelledby={`${fieldId}-h`} className={cardClass}>
      {/* 머리: 단계 · 진행 · (모바일) 내 요청서 */}
      <div className="flex items-center justify-between gap-3 border-b border-zinc-200 px-5 py-4 lg:px-8">
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[12px] text-zinc-500">
            {inputStep}/4 · {STEP_TITLE[inputStep]}
            {editing && <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-[11px] font-bold text-amber-800">수정 중</span>}
          </div>
          <div className="mt-2 h-1 w-full max-w-xs rounded-full bg-zinc-100" aria-hidden="true">
            <div className="h-1 rounded-full bg-emerald-600 transition-[width] duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setPanelOpen((o) => !o);
            if (!panelOpen) trackInquiry("panel_open", { ...base, step: inputStep });
          }}
          aria-expanded={panelOpen}
          aria-controls={`${fieldId}-panel`}
          className="lg:hidden inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-800"
        >
          <FileText className="w-3.5 h-3.5" aria-hidden="true" />
          내 요청서 · {filled}/5
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${panelOpen ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
        {closeButton}
      </div>

      {panelOpen && (
        <div id={`${fieldId}-panel`} className="lg:hidden border-b border-zinc-200 bg-zinc-50 px-5 py-4">
          <QuoteRequestDocument data={docData} variant="panel" onEdit={inputStep === 4 ? editFromReview : undefined} />
        </div>
      )}

      <div className="grid gap-6 px-5 py-5 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-8 lg:px-8 lg:py-7">
        <div className="min-w-0 space-y-5">
          {/* 레퍼런스(있을 때) — 모든 단계에 고정 */}
          {reference ? (
            <div className="space-y-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
              <div className="grid grid-cols-[4.5rem_1fr] items-center gap-3">
                <div className="h-12 w-[4.5rem] overflow-hidden rounded-lg bg-zinc-200">
                  {reference.thumb && (
                    // eslint-disable-next-line @next/next/no-img-element -- 게이트가 걸린 자산이라 이미지 최적화 캐시를 거치지 않는다
                    <img
                      src={reference.thumb}
                      alt=""
                      className="h-full w-full object-cover object-top"
                      onError={(e) => {
                        e.currentTarget.style.visibility = "hidden";
                      }}
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700">
                    <Check className="w-3 h-3" aria-hidden="true" /> 레퍼런스 첨부됨 · {noun}
                  </div>
                  <div className="truncate text-sm font-bold">{reference.title}</div>
                  {reference.subtitle && <div className="truncate text-xs text-zinc-500">{reference.subtitle}</div>}
                </div>
              </div>
              {reference.kind === "proposal" && <p className="text-[11px] text-zinc-500">{PROPOSAL_DISCLAIMER}</p>}
              <fieldset>
                <legend className="mb-1.5 text-[12px] font-bold text-zinc-700">
                  이 레퍼런스를 어떻게 쓰실 건가요? <span className="font-normal text-zinc-500">(선택)</span>
                </legend>
                <div className="flex flex-wrap gap-1.5">
                  {REFERENCE_USAGES.map((u) => (
                    <button
                      key={u}
                      type="button"
                      aria-pressed={referenceUsage === u}
                      onClick={() => pickUsage(u)}
                      className={`rounded-lg border px-2.5 py-1.5 text-[12px] font-semibold transition-colors ${
                        referenceUsage === u
                          ? "border-emerald-700 bg-emerald-700 text-white"
                          : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-500"
                      }`}
                    >
                      {REFERENCE_USAGE_LABEL[u]}
                    </button>
                  ))}
                </div>
              </fieldset>
            </div>
          ) : (
            inputStep === 1 && <p className="text-xs text-zinc-500">참고할 사이트가 있으면 4단계에서 주소를 적어 주세요.</p>
          )}

          {/* 흐름 한 줄 + 펼침 */}
          <div className="text-[12px] text-zinc-600">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>질문 3개</span>
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
              <span>총괄 아키텍트 연락</span>
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
              <span>견적서 받아 보고 결정</span>
              <button
                type="button"
                aria-expanded={flowOpen}
                onClick={() => {
                  setFlowOpen((o) => !o);
                  if (!flowOpen) trackInquiry("flow_expand", { ...base, step: inputStep });
                }}
                className="font-bold text-emerald-700 hover:underline"
              >
                진행 방식 보기 {flowOpen ? "▴" : "▾"}
              </button>
            </div>
            {flowOpen && (
              <ol className="mt-2 list-decimal space-y-1 rounded-xl bg-zinc-50 p-3 pl-7 text-[12px] text-zinc-700">
                <li>질문 3개와 연락처를 남기시면 됩니다. 로그인은 필요 없습니다.</li>
                <li>총괄 아키텍트가 적어 주신 번호로 연락드려 요건을 여쭙습니다.</li>
                <li>T-DOCS(티독스) 견적서를 받아 보고 결정하세요. 견적 요청은 계약이 아닙니다.</li>
              </ol>
            )}
          </div>

          {/* 단계 본문 */}
          {inputStep === 1 && (
            <div className="space-y-3">
              <h2 id={`${fieldId}-h`} ref={headingRef} tabIndex={-1} className="text-lg lg:text-xl font-extrabold tracking-tight outline-none">
                어떤 작업이 필요하세요?
                <span className="ml-2 text-xs font-normal text-zinc-500">여러 개 고르셔도 됩니다</span>
              </h2>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {SERVICE_OPTIONS.map((opt) => {
                  const on = services.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggleService(opt.id)}
                      className={`rounded-xl border p-3 text-left transition-colors ${
                        on ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white hover:border-zinc-400"
                      } ${opt.id === "undecided" ? "sm:col-span-2" : ""}`}
                    >
                      <div className="text-sm font-bold">{opt.label}</div>
                      <div className={`text-[11px] ${on ? "text-zinc-300" : "text-zinc-500"}`}>{opt.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {inputStep === 2 && (
            <div className="space-y-3">
              <h2 id={`${fieldId}-h`} ref={headingRef} tabIndex={-1} className="text-lg lg:text-xl font-extrabold tracking-tight outline-none">
                언제쯤 오픈하고 싶으세요?
              </h2>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" role="radiogroup" aria-labelledby={`${fieldId}-h`}>
                {TIMELINE_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={timeline === opt}
                    onClick={() => {
                      setTimeline(opt);
                      finishStep(2, 3);
                    }}
                    className={`rounded-xl border p-3.5 text-left text-sm font-bold transition-colors ${
                      timeline === opt ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white hover:border-zinc-400"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {inputStep === 3 && (
            <div className="space-y-3">
              <h2 id={`${fieldId}-h`} ref={headingRef} tabIndex={-1} className="text-lg lg:text-xl font-extrabold tracking-tight outline-none">
                생각하시는 예산대가 있으세요?
              </h2>
              <p className="text-xs text-zinc-500">정확한 금액은 요건을 듣고 T-DOCS 견적서로 드립니다.</p>
              <label className="inline-flex items-center gap-2 text-[13px] text-zinc-700">
                <input
                  type="checkbox"
                  checked={budgetFlexible}
                  onChange={(e) => {
                    touch();
                    setBudgetFlexible(e.target.checked);
                  }}
                  className="h-4 w-4 accent-emerald-700"
                />
                예산은 조정할 수 있어요
              </label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" role="radiogroup" aria-labelledby={`${fieldId}-h`}>
                {BUDGET_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    role="radio"
                    aria-checked={budget === opt}
                    onClick={() => {
                      setBudget(opt);
                      finishStep(3, 4);
                    }}
                    className={`rounded-xl border p-3.5 text-left text-sm font-bold transition-colors ${
                      budget === opt ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white hover:border-zinc-400"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {inputStep === 4 && (
            <form id={`${fieldId}-form`} noValidate onSubmit={submit} className="space-y-4">
              <div className="rounded-lg bg-amber-50 px-3 py-2 text-[12px] font-bold text-amber-900">
                접수 전 확인 · 아직 보내지 않았습니다
              </div>
              <h2 id={`${fieldId}-h`} ref={headingRef} tabIndex={-1} className="text-lg lg:text-xl font-extrabold tracking-tight outline-none">
                연락처를 남기시면 이대로 접수됩니다
              </h2>

              {/* 봇 걸러내기 칸 — 화면 밖·탭 이동 제외. 채워서 오면 서버가 저장·문자 없이 조용히 성공을 돌려준다 */}
              <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
                <label>
                  웹사이트
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </label>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${fieldId}-name`} className="mb-1 block text-xs font-bold text-zinc-700">
                    성함 또는 회사명 <span className="text-emerald-700" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={`${fieldId}-name`}
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={INQUIRY_LIMITS.name}
                    value={contact.name}
                    onChange={(e) => setField("name")(e.target.value)}
                    onBlur={commitContact}
                    className="w-full rounded-xl border border-zinc-300 px-3.5 py-3 text-sm focus:border-zinc-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor={`${fieldId}-phone`} className="mb-1 block text-xs font-bold text-zinc-700">
                    휴대폰 번호 <span className="text-emerald-700" aria-hidden="true">*</span>
                  </label>
                  <input
                    id={`${fieldId}-phone`}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    enterKeyHint="next"
                    required
                    placeholder="010-1234-5678"
                    value={contact.phone}
                    onChange={(e) => setField("phone")(e.target.value)}
                    onBlur={commitContact}
                    className="w-full rounded-xl border border-zinc-300 px-3.5 py-3 text-sm focus:border-zinc-900 focus:outline-none"
                  />
                  <p className="mt-1 text-[11px] text-zinc-500">상담 연락용입니다. 광고 문자는 보내지 않습니다.</p>
                </div>
              </div>

              <fieldset>
                <legend className="mb-1.5 text-xs font-bold text-zinc-700">연락 방법 <span className="font-normal text-zinc-500">(선택)</span></legend>
                <div className="flex flex-wrap gap-2">
                  {(["call", "text_first"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      aria-pressed={contact.pref === p}
                      onClick={() => {
                        touch();
                        const pref = contact.pref === p ? null : p;
                        const nextContact = { ...contact, pref };
                        setContact(nextContact);
                        setDocContact(nextContact);
                      }}
                      className={`rounded-lg border px-3 py-2 text-[13px] font-semibold ${
                        contact.pref === p ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-300 bg-white text-zinc-700"
                      }`}
                    >
                      {p === "call" ? "전화 주세요" : "문자로 먼저 연락 주세요"}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${fieldId}-email`} className="mb-1 block text-xs font-bold text-zinc-700">
                    이메일 <span className="font-normal text-zinc-500">(선택)</span>
                  </label>
                  <input
                    id={`${fieldId}-email`}
                    type="email"
                    autoComplete="email"
                    maxLength={INQUIRY_LIMITS.email}
                    value={contact.email}
                    onChange={(e) => setField("email")(e.target.value)}
                    onBlur={commitContact}
                    className="w-full rounded-xl border border-zinc-300 px-3.5 py-3 text-sm focus:border-zinc-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor={`${fieldId}-ref`} className="mb-1 block text-xs font-bold text-zinc-700">
                    참고 사이트 주소 <span className="font-normal text-zinc-500">(선택)</span>
                  </label>
                  <input
                    id={`${fieldId}-ref`}
                    type="text"
                    inputMode="url"
                    autoComplete="url"
                    placeholder="example.com"
                    maxLength={INQUIRY_LIMITS.referenceUrl}
                    value={contact.referenceUrl}
                    onChange={(e) => setField("referenceUrl")(e.target.value)}
                    onBlur={commitContact}
                    className="w-full rounded-xl border border-zinc-300 px-3.5 py-3 text-sm focus:border-zinc-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor={`${fieldId}-details`} className="mb-1 block text-xs font-bold text-zinc-700">
                  남기실 말씀 <span className="font-normal text-zinc-500">(선택)</span>
                </label>
                <textarea
                  id={`${fieldId}-details`}
                  rows={3}
                  maxLength={INQUIRY_LIMITS.details}
                  placeholder="필요한 기능, 참고하실 점을 자유롭게 적어 주세요."
                  value={contact.details}
                  onChange={(e) => setField("details")(e.target.value)}
                  onBlur={commitContact}
                  className="w-full resize-none rounded-xl border border-zinc-300 px-3.5 py-3 text-sm focus:border-zinc-900 focus:outline-none"
                />
              </div>

              {/* 모바일은 요청서가 옆에 없으므로 여기서 한 번 보여 준다 */}
              <div className="lg:hidden">
                <div className="mb-2 text-xs font-bold text-zinc-500">태문에 이렇게 접수됩니다</div>
                <QuoteRequestDocument data={docData} variant="panel" onEdit={editFromReview} />
              </div>

              {/* 개인정보 고지 — 제출 버튼 바로 위. 동의 체크박스는 두지 않는다(요청에 따른 처리, 개인정보 보호법 제15조 제1항 제4호) */}
              <p className="text-[11px] leading-relaxed text-zinc-500">
                견적 회신과 상담을 위해 성함(회사명)·휴대폰 번호와, 적어 주신 경우 이메일·참고 주소·남기신 말씀을 받습니다.
                접수일로부터 1년 동안 보관한 뒤 파기합니다. 자세한 내용은{" "}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-zinc-900">
                  개인정보 처리방침
                </Link>
                을 확인해 주세요. 견적 요청은 계약이 아닙니다.
              </p>
            </form>
          )}

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-[13px] font-semibold text-red-700">
              {error}
            </p>
          )}

          {/* 빠른 출구 · 전화 */}
          {inputStep !== 4 && (
            <div className="flex flex-col gap-2 border-t border-zinc-100 pt-4">
              <button
                type="button"
                onClick={quickExit}
                className="w-fit text-left text-[13px] font-semibold text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-950"
              >
                나머지는 통화로 정할게요 — 연락처만 남기기 ›
              </button>
              {callLink}
            </div>
          )}
        </div>

        {/* 데스크톱: 옆 견적요청서 */}
        <aside className="hidden lg:block" aria-label="내 견적요청서">
          <div className={`sticky space-y-2 ${inModal ? "top-4" : "top-28"}`}>
            <div className="text-xs font-bold text-zinc-500">
              {inputStep === 4 ? "태문에 이렇게 접수됩니다" : `내 요청서 · ${filled}/5`}
            </div>
            <QuoteRequestDocument data={docData} variant="panel" onEdit={inputStep === 4 ? editFromReview : undefined} />
          </div>
        </aside>
      </div>

      {/* 이동 막대 — 모바일에서는 화면 아래에 붙는다(엄지가 닿는 곳) */}
      <div className="sticky bottom-0 z-10 flex items-center justify-between gap-3 rounded-b-3xl border-t border-zinc-200 bg-white/95 px-5 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:static lg:px-8 lg:pb-5">
        {inputStep > 1 ? (
          <button
            type="button"
            onClick={prev}
            className="inline-flex items-center gap-1.5 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-600 hover:bg-zinc-100"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" /> 이전
          </button>
        ) : (
          <span />
        )}
        {editing && inputStep !== 4 ? (
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              go(4, "replace");
            }}
            className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-bold text-white hover:bg-black"
          >
            요청서로 돌아가기
          </button>
        ) : inputStep === 4 ? (
          <button
            type="submit"
            form={`${fieldId}-form`}
            disabled={submitting}
            className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-bold text-white hover:bg-black disabled:opacity-50"
          >
            {submitting ? "접수하는 중…" : "이대로 접수하기"}
          </button>
        ) : (
          <button
            type="button"
            onClick={next}
            disabled={(inputStep === 2 && !timeline) || (inputStep === 3 && !budget)}
            className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-bold text-white hover:bg-black disabled:opacity-40"
          >
            다음 <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  );
}
