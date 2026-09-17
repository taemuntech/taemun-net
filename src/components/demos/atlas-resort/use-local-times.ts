'use client';

// 히어로의 목적지 시계 — 원래는 '17:42' 같은 문자열이 데이터에 박혀 있어서 언제 봐도 같은 시각이었다.
// IANA 시간대로 실제 현지 시각을 계산해 1분마다 갱신한다.
// 서버 렌더와 첫 클라이언트 렌더가 어긋나지 않도록 마운트 전에는 null 을 준다(호출부가 '--:--' 를 그린다).

import { useEffect, useState } from 'react';
import type { Destination } from './types';

function readTimes(destinations: Destination[]): Record<string, string> {
  const next: Record<string, string> = {};
  for (const dest of destinations) {
    try {
      next[dest.id] = new Intl.DateTimeFormat('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: dest.timeZone,
      }).format(new Date());
    } catch {
      // 지원하지 않는 시간대면 그 목적지만 비워 둔다
    }
  }
  return next;
}

export function useLocalTimes(destinations: Destination[]): Record<string, string> | null {
  const [times, setTimes] = useState<Record<string, string> | null>(null);

  useEffect(() => {
    setTimes(readTimes(destinations));
    const timer = window.setInterval(() => setTimes(readTimes(destinations)), 30_000);
    return () => window.clearInterval(timer);
  }, [destinations]);

  return times;
}
