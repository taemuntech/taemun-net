// 데모 page 의 제목·설명을 「지금 열어 줘도 되는가」 판정 뒤에 내보내는 한 겹.
//
// 왜 필요한가(실측): (demos) 레이아웃이 redirect(/gone) 를 해도 Next 는 **그 전에** 데모 page 의
// metadata 를 해석해 307 응답 본문(__next_error__ HTML)에 <title>·description·og:title·og:url 로 싣는다.
// 전부 내리기 ON 상태에서 `curl -D- /demo/<제안시안>` → 307 + 9KB 본문, 안에 회사 이름·코스닥 종목코드·
// 영업 문구가 그대로 있었다. 브라우저는 리다이렉트를 따라가지만 curl·카카오/슬랙 링크 미리보기 봇은
// 이 본문을 읽는다 — 항의받아 내린 바로 그 주소에서 회사 이름이 계속 나간다.
//
// 그래서 각 데모 page 는 정적 `export const metadata` 대신
//   export function generateMetadata() { return demoMetadata({ ... }); }
// 를 쓴다. 막힌 요청에는 아래 BLOCKED_METADATA(회사 이름 한 글자 없는 중립 제목)만 돌려준다.
//
// 서버 전용. 클라이언트 컴포넌트에서 import 하지 말 것.

import type { Metadata } from "next";
import { headers } from "next/headers";
import { DEMO_SLUG_HEADER, decideDemoAccess } from "./gate";

/**
 * 내려간 주소가 내보내는 전부. 제목·설명에 **회사 이름·시안 내용·slug 를 넣지 않는다**
 * (/gone 화면과 같은 원칙 — components/demo-kit/DemoGate.tsx 주석).
 */
const BLOCKED_METADATA: Metadata = {
  title: "공개가 종료된 주소",
  description: "요청하신 주소는 더 이상 공개하지 않습니다.",
  robots: { index: false, follow: false },
  // 레이아웃·이전 값이 og 로 새지 않게 빈 값으로 덮는다
  openGraph: {
    title: "공개가 종료된 주소",
    description: "요청하신 주소는 더 이상 공개하지 않습니다.",
    images: [],
  },
  alternates: {},
};

/**
 * 데모 page 의 metadata 를 판정 뒤에 돌려준다.
 * 판정 자체는 (demos) 레이아웃과 같은 함수·같은 요청 메모를 쓰므로 상태 읽기는 요청당 1회다.
 */
export async function demoMetadata(meta: Metadata): Promise<Metadata> {
  const access = await decideDemoAccess((await headers()).get(DEMO_SLUG_HEADER));
  return access.blocked ? BLOCKED_METADATA : meta;
}
