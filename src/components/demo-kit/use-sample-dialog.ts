"use client";

// 샘플 사이트 모달 공용 동작 — SampleNotice 와 샘플의 예약·상담 모달이 같이 쓴다.
// 열릴 때: 이전 포커스 기억 · body 스크롤 잠금(스크롤바 폭 보정) · 첫 포커스 이동
// 열린 동안: Esc 로 닫기 · Tab/Shift+Tab 을 모달 안에서 돌기
// 닫힐 때: 스크롤 잠금 해제 · 이전 포커스로 복귀
//
// 모달 요소에는 role="dialog" aria-modal="true" aria-labelledby 와 tabIndex={-1} 을 직접 준다(이 훅은 동작만 맡는다).

import { useEffect, useRef, type RefObject } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export type UseSampleDialogOptions = {
  open: boolean;
  onClose: () => void;
  dialogRef: RefObject<HTMLElement | null>;
  /** 열릴 때 처음 포커스할 요소. 없으면 모달 안 첫 포커스 가능 요소, 그것도 없으면 모달 자체 */
  initialFocusRef?: RefObject<HTMLElement | null>;
};

export function useSampleDialog({ open, onClose, dialogRef, initialFocusRef }: UseSampleDialogOptions): void {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      const current = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${current + scrollbarWidth}px`;
    }

    const dialog = dialogRef.current;
    const first = initialFocusRef?.current ?? dialog?.querySelector<HTMLElement>(FOCUSABLE) ?? dialog;
    first?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const el = dialogRef.current;
      if (!el) return;
      const items = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) {
        e.preventDefault();
        el.focus();
        return;
      }
      const head = items[0];
      const tail = items[items.length - 1];
      const active = document.activeElement;
      const inside = active instanceof Node && el.contains(active);
      if (e.shiftKey) {
        if (!inside || active === head) {
          e.preventDefault();
          tail.focus();
        }
      } else if (!inside || active === tail) {
        e.preventDefault();
        head.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
      previouslyFocused?.focus();
    };
    // dialogRef·initialFocusRef 는 ref 객체라 바뀌지 않는다 — open 만 본다
  }, [open]);
}
