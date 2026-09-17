import React from 'react';
import type { Currency } from '../types';
import { SAMPLE_USD_RATE } from '../lib/format';

/**
 * 금액 표시 — 원화 기호만 산세리프로 그린다.
 *
 * 왜 컴포넌트인가: 이 데모의 금액은 font-editorial(EB Garamond → Georgia) 로 찍는데 두 글꼴 모두 ₩ 글리프가
 * 없다. 그래서 브라우저가 고른 대체 글꼴로 ₩ 하나만 다르게 그려져 굵기·높이·기준선이 어긋나고 숫자보다 커
 * 보였다(요금·총 견적처럼 이 페이지에서 가장 중요한 숫자마다 그랬다. 예전엔 leading-none 으로 윗줄 침범만
 * 가리고 있었다). 문자열을 돌려주는 함수로는 기호만 따로 칠할 수 없어 조각 컴포넌트로 바꾼다.
 *
 * 숫자 쪽 서체·크기·색은 부모가 정한 그대로다 — 기호만 Manrope 로 고정하고 0.86em 으로 낮춰 높이를 맞춘다.
 */
export function Money({ amount, currency }: { amount: number; currency: Currency }) {
  if (currency === 'USD') {
    return <>${Math.round(amount / SAMPLE_USD_RATE).toLocaleString()}</>;
  }
  return (
    <>
      <span className="font-sans-luxury text-[0.86em] tracking-normal mr-[0.06em]">₩</span>
      {amount.toLocaleString()}
    </>
  );
}
