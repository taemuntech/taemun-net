import type { Metadata } from "next";
import { demoMetadata } from "@/lib/portfolio/demo-metadata";
import HysfaPageClient from "./HysfaPageClient";

// 제목·설명·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
//
// 실존 회사에 의뢰 없이 만든 제안 시안이다. 링크 미리보기(카카오·슬랙)에는 제목·설명만 보이므로
// og·twitter 제목 앞에 「[제안 시안]」 을 붙이고, 그 회사의 공식 사이트로 읽히는 말이나 인증·업력 같은
// 그 회사의 주장은 쓰지 않는다. 제목 뒤 「— 태문넷」 은 (demos) 레이아웃 템플릿이 붙인다.
const TITLE = "한양시스템㈜ — 반도체 공정 설비 기업 사이트 제안 시안";
const DESCRIPTION =
  "태문넷이 한양시스템㈜에 제안하려고 만든 사이트 시안입니다. 한양시스템㈜이 만들었거나 의뢰한 사이트가 아니며, 화면의 수치·연혁·인증·관제 데이터와 연락처는 예시입니다. 설비 소개, 관제 화면 시뮬레이터, 문의 화면 구성을 담았습니다.";
const SHARE_TITLE = "[제안 시안] 한양시스템㈜ — 반도체 공정 설비 기업 사이트";

const DEMO_METADATA: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/demo/hysfa",
  },
  openGraph: {
    title: SHARE_TITLE,
    description: DESCRIPTION,
    url: "https://taemun.net/demo/hysfa",
  },
  twitter: {
    card: "summary",
    title: SHARE_TITLE,
    description: DESCRIPTION,
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function HysfaDemoPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === "true";

  return <HysfaPageClient isEmbed={isEmbed} />;
}
