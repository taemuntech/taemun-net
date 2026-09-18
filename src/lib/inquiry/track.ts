// 견적 흐름 퍼널 계측 — 화면에서 부른다. 받는 쪽은 api/inquiry/event, 모양 규칙은 events.ts.
//
// 개인정보를 싣지 않는다: 이름·연락처·입력값은 보내지 않는다. sid 는 탭마다 만드는 난수(sessionStorage)다.
// 계측은 절대 화면을 멈추거나 오류를 띄우지 않는다 — 저장소가 막혔거나 요청이 실패하면 조용히 넘어간다.

import type { InquiryEventName } from "./events";

const SID_KEY = "tm_inquiry_sid_v1";

/**
 * 기록 시작 시각 — 개인정보 처리방침 7항 변경 시행일(2026-09-26 KST).
 * 처리방침이 「방침을 바꾸면 시행 7일 전에 알립니다」라고 약속했고, 지금 7항은 「방문 통계 도구도 쓰지 않습니다」다.
 * 그래서 변경 공지(09-19)부터 7일이 지나기 전에는 아무것도 보내지 않는다. 시행일을 바꾸면 privacy/page.tsx 도 같이.
 */
export const TRACKING_STARTS_AT = Date.parse("2026-09-26T00:00:00+09:00");

function sessionId(): string | null {
  try {
    let sid = window.sessionStorage.getItem(SID_KEY);
    if (!sid) {
      sid = window.crypto.randomUUID();
      window.sessionStorage.setItem(SID_KEY, sid);
    }
    return sid;
  } catch {
    return null;
  }
}

export type TrackFields = {
  step?: number;
  variant?: string;
  entry?: string;
  referralFrom?: string | null;
  value?: string;
};

export function trackInquiry(event: InquiryEventName, fields: TrackFields = {}): void {
  if (typeof window === "undefined") return;
  if (Date.now() < TRACKING_STARTS_AT) return;
  const sid = sessionId();
  if (!sid) return;
  try {
    // keepalive — 페이지를 떠나는 순간(abandon)에도 요청이 끝까지 간다. sendBeacon 은 text/plain 이라 쓰지 않는다
    void fetch("/api/inquiry/event", {
      method: "POST",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sid, event, ...fields, referralFrom: fields.referralFrom ?? undefined }),
    }).catch(() => {});
  } catch {
    // 계측 실패는 무시한다
  }
}
