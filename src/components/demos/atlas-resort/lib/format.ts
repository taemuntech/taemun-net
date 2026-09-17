// 표시 통화 포맷 — 헤더의 KRW/USD 토글이 실제로 금액을 바꾼다(라벨만 바뀌는 죽은 토글이 아니다).
// 환율은 고정된 예시값이다. 샘플이라 실제 환율을 끌어오지 않고, 화면에도 「예시 환율」이라고 적는다.

import type { Currency } from '../types';

/** 예시 환율 — 실제 시세가 아니다 */
export const SAMPLE_USD_RATE = 1350;

export const EXCHANGE_NOTE = `예시 환율 1 USD = ${SAMPLE_USD_RATE.toLocaleString()} KRW 기준`;

// 금액 자체는 components/Money.tsx 가 그린다 — 문자열로 돌려주면 ₩ 기호만 따로 칠할 수 없어서다
// (세리프 글꼴에 ₩ 글리프가 없어 기호 하나만 대체 글꼴로 크게 찍혔다).

/** 통화 뒤에 붙는 짧은 단위 표기 */
export function currencyUnitLabel(currency: Currency): string {
  return currency === 'USD' ? 'USD (예시 환율 환산)' : 'KRW (V.A.T 포함)';
}
