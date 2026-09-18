// 견적요청서 — 방문자가 답할 때마다 채워지는 문서(구현계획서 4-1절).
//
// 세 자리에서 같은 컴포넌트를 쓴다:
//   - panel   : 1~4단계 옆(데스크톱)·「내 요청서」(모바일). 비어 있는 칸은 「N단계」로 흐리게.
//   - receipt : 접수 완료 화면. 접수번호·접수 시각(KST)이 찍힌 사본.
// 휴대폰 번호는 가운데를 가린다(화면을 옆 사람이 볼 수 있다). 실제로 저장되는 값은 가리지 않은 번호다.
//
// ⚠️ 이 문서는 「T-DOCS 서식」이 아니다 — 태문넷 문의가 어떻게 접수되는지 보여 주는 화면이다.
//    T-DOCS 견적요청서(proc-1)는 자재 구매용이라 이름을 빌리지 않는다.

import { Check, PencilLine } from "lucide-react";
import { DECIDE_IN_CONSULT } from "@/lib/inquiry/validate";
import { CONTACT_PREF_LABEL, REFERENCE_USAGE_LABEL } from "@/lib/inquiry/labels";
import { formatKstLong } from "@/lib/kst";
import type { QuoteRequestData } from "./types";

type EditableStep = 1 | 2 | 3;

export function maskPhone(phone: string): string {
  const d = phone.replace(/[^0-9]/g, "");
  if (d.length < 9) return phone;
  return `${d.slice(0, 3)}-****-${d.slice(-4)}`;
}

/** 채워진 칸 수(의뢰인·레퍼런스·서비스·일정·예산 다섯 칸 기준) — 모바일 「내 요청서 · n/5」 */
export function filledCount(d: QuoteRequestData): number {
  return [
    Boolean(d.contact.name && d.contact.phone),
    Boolean(d.reference || d.contact.referenceUrl),
    d.services.length > 0 || d.quick,
    Boolean(d.timeline) || d.quick,
    Boolean(d.budget) || d.quick,
  ].filter(Boolean).length;
}

function Row({
  n,
  label,
  filled,
  placeholder,
  onEdit,
  children,
}: {
  n: string;
  label: string;
  filled: boolean;
  placeholder: string;
  onEdit?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[1.75rem_1fr_auto] gap-2 border-b border-dashed border-zinc-200 py-2.5 last:border-b-0">
      <span className="font-mono text-[11px] text-zinc-400 pt-0.5">{n}</span>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
          {filled && <Check className="w-3 h-3 text-emerald-600" aria-hidden="true" />}
          <span>{label}</span>
        </div>
        {filled ? (
          <div className="text-[13px] font-semibold text-zinc-900 break-words">{children}</div>
        ) : (
          <div className="text-[13px] text-zinc-400">{placeholder}</div>
        )}
      </div>
      {onEdit && filled ? (
        <button
          type="button"
          onClick={onEdit}
          className="self-start inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-semibold text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
          aria-label={`${label} 수정`}
        >
          <PencilLine className="w-3 h-3" aria-hidden="true" />
          수정
        </button>
      ) : (
        <span />
      )}
    </div>
  );
}

export function QuoteRequestDocument({
  data,
  variant,
  onEdit,
}: {
  data: QuoteRequestData;
  variant: "panel" | "receipt";
  /** 4단계에서만 넘긴다 — 서비스·일정·예산 줄에 「수정」이 붙는다 */
  onEdit?: (step: EditableStep) => void;
}) {
  const { reference, contact } = data;
  const consult = (value: string | null) => (value ? value : data.quick ? DECIDE_IN_CONSULT : null);
  const timeline = consult(data.timeline);
  const budget = consult(data.budget);
  const services = data.services.length > 0 ? data.services : data.quick ? [DECIDE_IN_CONSULT] : [];

  return (
    <article
      aria-label="견적요청서"
      className="rounded-2xl border border-zinc-200 bg-[#fcfcfb] p-4 lg:p-5 shadow-sm text-zinc-900"
    >
      <header className="flex items-end justify-between gap-3 border-b-2 border-zinc-900 pb-2">
        <div>
          <div className="font-serif text-base lg:text-lg font-bold tracking-tight">견적요청서</div>
          <div className="font-mono text-[10px] uppercase tracking-widest text-zinc-400">Request for Proposal</div>
        </div>
        <div className="text-right font-mono text-[10px] text-zinc-500">
          {data.requestNo ? (
            <>
              <div className="text-[12px] font-bold text-zinc-900">{data.requestNo}</div>
              {data.submittedAt && <div>{formatKstLong(data.submittedAt)}</div>}
            </>
          ) : (
            <div>접수 시 번호 발급</div>
          )}
        </div>
      </header>

      <div className="mt-1">
        <Row n="00" label="의뢰인" filled={Boolean(contact.name && contact.phone)} placeholder="4단계에서 입력">
          {contact.name} · {maskPhone(contact.phone)}
          {contact.email && <span className="block text-[12px] font-normal text-zinc-600">{contact.email}</span>}
          {contact.pref && (
            <span className="block text-[12px] font-normal text-zinc-600">{CONTACT_PREF_LABEL[contact.pref]}</span>
          )}
        </Row>
        <Row
          n="01"
          label="레퍼런스"
          filled={Boolean(reference || contact.referenceUrl)}
          placeholder="레퍼런스 없음 — 참고 사이트가 있으면 4단계에서"
        >
          {reference ? reference.title : contact.referenceUrl}
          {reference && data.referenceUsage && (
            <span className="block text-[12px] font-normal text-zinc-600">
              활용: {REFERENCE_USAGE_LABEL[data.referenceUsage]}
            </span>
          )}
          {reference && contact.referenceUrl && (
            <span className="block text-[12px] font-normal text-zinc-600 break-all">참고: {contact.referenceUrl}</span>
          )}
        </Row>
        <Row
          n="02"
          label="요청 서비스"
          filled={services.length > 0}
          placeholder="1단계"
          onEdit={onEdit ? () => onEdit(1) : undefined}
        >
          <span className="flex flex-wrap gap-1 pt-0.5">
            {services.map((s) => (
              <span key={s} className="rounded-md bg-zinc-100 px-1.5 py-0.5 text-[12px] font-semibold">
                {s}
              </span>
            ))}
          </span>
        </Row>
        <Row n="03" label="희망 일정" filled={Boolean(timeline)} placeholder="2단계" onEdit={onEdit ? () => onEdit(2) : undefined}>
          {timeline}
        </Row>
        <Row n="04" label="예산" filled={Boolean(budget)} placeholder="3단계" onEdit={onEdit ? () => onEdit(3) : undefined}>
          {budget}
          {data.budgetFlexible && data.budget && (
            <span className="ml-1 text-[12px] font-normal text-zinc-600">· 조정 가능</span>
          )}
        </Row>
        <Row n="05" label="요청 사항" filled={Boolean(contact.details)} placeholder="선택">
          <span className="block font-normal text-[12px] text-zinc-700 whitespace-pre-line line-clamp-4">
            {contact.details}
          </span>
        </Row>
      </div>

      <footer className="mt-2 border-t border-zinc-200 pt-2 font-mono text-[10px] text-zinc-400">
        {variant === "receipt" ? "접수 완료 → 총괄 아키텍트 연락 → T-DOCS 견적서 → 결정" : "접수 → 총괄 아키텍트 연락 → T-DOCS 견적서 → 결정"}
      </footer>
    </article>
  );
}
