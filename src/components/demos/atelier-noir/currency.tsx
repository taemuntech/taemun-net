'use client';

// 헤더의 KR/KRW 드롭다운은 라벨만 바뀌고 값은 계속 원화였다 — 고르면 지면의 모든 금액이 같이 바뀌게 한다.
// 환율은 실시간 고시가가 아니라 화면을 보여 주기 위한 예시값이라, 드롭다운과 표시 옆에 그렇게 적는다.

import React, { createContext, useContext, useMemo, useState } from 'react';

export type CurrencyCode = 'KRW' | 'USD' | 'EUR';

/** 1 단위당 원화 — 예시 환율(고시 환율 아님) */
export const SAMPLE_RATES: Record<CurrencyCode, number> = {
  KRW: 1,
  USD: 1350,
  EUR: 1450,
};

export const CURRENCY_LABEL: Record<CurrencyCode, string> = {
  KRW: '🇰🇷 KR / KRW (₩)',
  USD: '🇺🇸 US / USD ($)',
  EUR: '🇪🇺 EU / EUR (€)',
};

const SYMBOL: Record<CurrencyCode, string> = { KRW: '₩', USD: '$', EUR: '€' };

type CurrencyContextValue = {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  /** 원화 금액을 현재 통화 표기로 (예: 348000 → "₩348,000" / "$258") */
  price: (krw: number) => string;
};

const CurrencyContext = createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>('KRW');

  const value = useMemo<CurrencyContextValue>(
    () => ({
      currency,
      setCurrency,
      price: (krw: number) => {
        const converted = Math.round(krw / SAMPLE_RATES[currency]);
        return `${SYMBOL[currency]}${converted.toLocaleString('ko-KR')}`;
      },
    }),
    [currency]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency(): CurrencyContextValue {
  const ctx = useContext(CurrencyContext);
  if (!ctx) {
    // 공급자 밖에서 쓰이면 원화 그대로 — 화면이 깨지지 않게 한다.
    return {
      currency: 'KRW',
      setCurrency: () => {},
      price: (krw: number) => `₩${krw.toLocaleString('ko-KR')}`,
    };
  }
  return ctx;
}
