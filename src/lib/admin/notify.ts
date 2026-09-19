// 형에게 가는 알림 문자의 **받는 번호** 한 곳 — 접수 알림(api/inquiry)과 아침 요약(api/cron/digest)이 같이 쓴다.
//
// 왜 한 곳인가: 두 군데가 각자 번호를 고르면, Vercel 에 SOLAPI_ADMIN_RECEIVER_PHONE 을 바꿨을 때
// 접수 알림만 새 번호로 가고 아침 문자는 옛 번호로 가는 날이 생긴다.
// 발송 자체는 src/lib/solapi.ts 의 sendSms 만 쓴다(그 파일은 고치지 않는다 — 형 지시).

import { STUDIO_PHONE } from "@/lib/inquiry/contact";

/** 알림 받는 번호(숫자만). 환경변수가 있으면 그 값, 없으면 사이트에 적힌 직통 번호 */
export function adminReceiverPhone(): string {
  return process.env.SOLAPI_ADMIN_RECEIVER_PHONE || STUDIO_PHONE.replace(/-/g, "");
}
