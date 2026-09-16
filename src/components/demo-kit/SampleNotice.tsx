"use client";

// 샘플 사이트의 문의·예약·상담 폼 제출 시 띄우는 안내 모달.
// 샘플 폼의 onSubmit 은 입력값을 어디에도 보내지 않고 이것만 연다 — 「접수됐다」는 가짜 성공 화면을 만들지 않는다.
// 어떤 샘플 디자인(다크·라이트) 위에서도 읽히게 자체 색(흰 카드 + 진한 글자)을 쓰고, body 로 포털해 샘플의 쌓임 맥락을 벗어난다.
//
// 제목은 kind 로 갈린다. 가상 브랜드 샘플이면 「샘플 사이트입니다」, 실존 업체 제안 시안(kind="proposal")이면
// 「제안용 시안입니다」 + 「해당 회사가 만들었거나 의뢰한 사이트가 아닙니다」 — 실존 회사 이름이 걸린 화면에서
// 「샘플 사이트」라고만 하면 「그 회사가 만든 샘플」로 읽힌다.

import Link from "next/link";
import { useId, useRef } from "react";
import { createPortal } from "react-dom";
import { Info, X } from "lucide-react";
import { PROPOSAL_DISCLAIMER } from "@/lib/portfolio/schema";
import { sampleInquiryHref } from "./sample-lead";
import type { SampleNoticeProps } from "./types";
import { useSampleDialog } from "./use-sample-dialog";

export default function SampleNotice({ open, onClose, slug, industry, featureName, kind = "sample" }: SampleNoticeProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLAnchorElement>(null);
  const titleId = useId();
  const descId = useId();

  // 포커스 기억·스크롤 잠금·Esc·Tab 순환 — 샘플의 예약 모달과 같은 훅(use-sample-dialog.ts)
  useSampleDialog({ open, onClose, dialogRef, initialFocusRef: primaryRef });

  if (!open || typeof document === "undefined") return null;

  const featureText = featureName?.trim() || "이 기능";

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm [word-break:keep-all]"
      style={{ fontFamily: "system-ui, -apple-system, 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className="relative w-full max-w-md rounded-2xl bg-white p-6 text-left text-gray-900 shadow-2xl outline-none lg:p-7"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="안내 닫기"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
          <Info className="h-6 w-6" aria-hidden="true" />
        </div>

        <h2 id={titleId} className="mb-2 text-lg font-extrabold text-gray-900 lg:text-xl">
          {kind === "proposal" ? "제안용 시안입니다" : "샘플 사이트입니다"}
        </h2>
        <p id={descId} className="text-sm leading-relaxed text-gray-700">
          {kind === "proposal" && <span className="mb-1.5 block font-semibold text-gray-900">{PROPOSAL_DISCLAIMER}</span>}
          이 폼은 실제로 접수되지 않았고 입력하신 내용은 어디에도 전송되지 않았습니다. {featureText} 그대로 귀사 사이트에 만들어
          드립니다.
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <Link
            ref={primaryRef}
            href={sampleInquiryHref({ from: slug, industry })}
            className="flex w-full items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            이런 사이트 제작 문의하기
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="flex w-full items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
          >
            계속 둘러보기
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
