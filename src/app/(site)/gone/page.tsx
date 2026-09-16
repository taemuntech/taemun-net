import type { Metadata } from "next";
import DemoGate from "@/components/demo-kit/DemoGate";

// 내려간 시안 주소가 도착하는 안내 화면(/gone).
// (demos) 레이아웃이 비공개 판정을 내리면 여기로 보낸다 — 데모 page 가 아예 해석되지 않아
// 회사 이름·시안 설명이 title·og:* 로 새지 않는다(근거: src/lib/portfolio/gate.ts 의 DEMO_GONE_PATH 주석).
//
// 이 화면의 제목·설명에도 회사 이름·시안 내용을 적지 않는다. 주소만 남기고 내용은 남기지 않는 것이 목적이다.
//
// 응답 코드: 이 화면은 200, 여기로 보내는 데모 주소는 307(임시)이다. 상태는 관리자가 되돌릴 수 있으므로
// 영구(308)가 아니라 임시가 맞다. 410(Gone)을 쓰지 못하는 이유는 DemoGate.tsx 주석에 적었다.
export const metadata: Metadata = {
  title: "공개가 종료된 주소",
  description: "요청하신 주소는 더 이상 공개하지 않습니다.",
  robots: { index: false, follow: false },
};

export default function GonePage() {
  return <DemoGate />;
}
