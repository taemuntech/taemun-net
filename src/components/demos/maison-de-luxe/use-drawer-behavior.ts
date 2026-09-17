import { useEffect, useRef } from 'react';

/**
 * 이 샘플의 우측 드로어(장바구니·컨시어지) 공용 동작.
 * 열려 있는 동안: Esc 로 닫기 · 배경 스크롤 잠금(스크롤바 폭 보정).
 *
 * 왜 필요한가: 예전에는 Esc 도 안 먹고 배경이 계속 스크롤됐다. 배경 클릭 닫기는 각 드로어의
 * 백드롭이 맡고, 여기서는 키보드와 스크롤만 본다.
 *
 * 드로어와 그 위의 주문서 모달이 겹쳐 열려도 안전하다 — 각자 열릴 때의 값을 기억했다가 되돌린다.
 */
export function useDrawerBehavior(open: boolean, onClose: () => void): void {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      const current = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${current + scrollbarWidth}px`;
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onCloseRef.current();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
    };
  }, [open]);
}
