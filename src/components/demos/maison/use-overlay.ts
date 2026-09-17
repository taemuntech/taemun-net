"use client";

// 이 데모의 모달·드로어 4종(작품 상세·검색·소장 서류함·관심 보관함)이 함께 쓰는 오버레이 동작.
// 배경 클릭 닫힘은 각 컴포넌트가 이미 하고 있었지만 ESC 와 배경 스크롤 잠금이 없어,
// 모바일에서 모달을 열어 둔 채 지면이 같이 굴러갔다.
//
// 잠그는 방법은 demo-kit 의 use-sample-dialog.ts 와 같은 `overflow:hidden` + 스크롤바 폭 보정으로 맞춘다.
// 소장 서류함은 SampleNotice(그 훅을 쓰는 모달)를 위에 겹쳐 띄우므로, 서로 다른 속성을 건드리면
// 나중에 닫히는 쪽이 앞의 복구값을 덮어쓴다.
//
// 오버레이가 겹쳐 열릴 수 있어(관심 보관함 → 작품 상세) 열린 개수를 세고 마지막 하나가 닫힐 때만 푼다.

import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

let lockCount = 0;
let saved: { overflow: string; paddingRight: string } | null = null;

function lockBodyScroll() {
  if (typeof document === 'undefined') return;
  lockCount += 1;
  if (lockCount > 1) return;

  const { body } = document;
  saved = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  body.style.overflow = 'hidden';
  if (scrollbarWidth > 0) {
    const current = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
    body.style.paddingRight = `${current + scrollbarWidth}px`;
  }
}

function unlockBodyScroll() {
  if (typeof document === 'undefined') return;
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount > 0 || !saved) return;

  const { body } = document;
  body.style.overflow = saved.overflow;
  body.style.paddingRight = saved.paddingRight;
  saved = null;
}

/**
 * 열려 있는 동안 ESC 로 닫고 배경 스크롤을 잠그며, 포커스를 오버레이 안에 가둔다.
 *
 * onClose 는 ref 에 담아 의존성에서 뺀다 — 호출부가 인라인 화살표를 넘기므로 매 렌더 새 함수가 되고,
 * 그대로 의존성에 넣으면 렌더마다 잠금이 풀렸다 다시 걸린다.
 *
 * `dialogRef` 를 넘기면 demo-kit 의 use-sample-dialog 와 같은 동작을 얻는다 —
 * 열 때 첫 포커스 이동 · Tab/Shift+Tab 을 안에서 돌리기 · 닫을 때 직전 포커스로 복귀.
 * 예전에는 이 데모의 모달 4종만 포커스가 뒤쪽 지면으로 빠져나갔다(다른 10종은 공용 훅이 같이 처리한다).
 * 컨테이너에는 role="dialog" aria-modal="true" aria-label(또는 aria-labelledby) tabIndex={-1} 을 직접 준다.
 */
export function useOverlay(open: boolean, onClose: () => void, dialogRef?: RefObject<HTMLElement | null>) {
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !dialogRef) return;
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

    document.addEventListener('keydown', onKeyDown);
    lockBodyScroll();

    if (dialogRef) {
      const el = dialogRef.current;
      (el?.querySelector<HTMLElement>(FOCUSABLE) ?? el)?.focus();
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      unlockBodyScroll();
      if (dialogRef) previouslyFocused?.focus();
    };
    // dialogRef 는 ref 객체라 바뀌지 않는다 — open 만 본다
  }, [open]);
}
