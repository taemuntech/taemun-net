import type { Metadata } from "next";
import { demoMetadata } from "@/lib/portfolio/demo-metadata";
import WonikQncPageClient from "./WonikQncPageClient";

// 제목·설명·og 는 **판정 뒤에** 내보낸다. 정적 metadata 로 두면 내려간 뒤에도 307 응답 본문에
// 회사 이름·종목코드가 실려 나간다(근거·실측: src/lib/portfolio/demo-metadata.ts).
const DEMO_METADATA: Metadata = {
  title: "원익큐앤씨(WONIK QnC) — 글로벌 No.1 반도체 쿼츠웨어 & 정밀 세라믹 | 태문 DEV STUDIO",
  description:
    "코스닥 상장 첨단 반도체 소재 리더 원익큐앤씨(KOSDAQ: 074600) 공식 리뉴얼 프로토타입. 쿼츠웨어, 세라믹, 정밀 세정·코팅, 40주년 기념 영상 쇼케이스 및 실시간 IR 허브를 체험해 보세요.",
  alternates: {
    canonical: "/demo/wonik-qnc",
  },
  openGraph: {
    title: "원익큐앤씨 — 글로벌 No.1 반도체 쿼츠웨어 & 정밀 세라믹 라이브 데모",
    description:
      "40년 소재 혁신의 역사, 원익큐앤씨. 쿼츠웨어 점유율 세계 1위의 기술력과 ESG 지속가능경영을 직접 확인하세요.",
    url: "https://taemun.net/demo/wonik-qnc",
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function WonikQncDemoPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === "true";

  return <WonikQncPageClient isEmbed={isEmbed} />;
}
