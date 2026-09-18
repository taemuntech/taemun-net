// 견적 흐름 값 → 사람이 읽는 말. 화면(요청서 패널·완료 화면)과 형에게 가는 알림 문자가 같은 말을 쓰게 한 곳에 둔다.
// ⚠️ 외부 import 는 타입만 — 서버·클라이언트 어디서나 쓴다.

import type { ContactPref, ReferenceUsage } from "./validate";

export const REFERENCE_USAGE_LABEL: Record<ReferenceUsage, string> = {
  as_is: "디자인 거의 그대로 · 우리 내용으로",
  mood: "분위기·구성만 참고",
  feature: "기능만 가져오기",
};

export const CONTACT_PREF_LABEL: Record<ContactPref, string> = {
  call: "전화 주세요",
  text_first: "문자로 먼저 연락 주세요",
};
