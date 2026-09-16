import type { Metadata } from "next";
import { demoMetadata } from "@/lib/portfolio/demo-metadata";
import HysfaPageClient from "./HysfaPageClient";

// 제목·설명·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
const DEMO_METADATA: Metadata = {
  title: "한양시스템㈜ — 차세대 반도체 공정 설비 & 4K SCADA 관제 | 태문 DEV STUDIO",
  description:
    "삼성전자 세메스(SEMES) SSQ 품질 인증 협력사 한양시스템㈜ 공식 리뉴얼 프로토타입. 반도체 매엽식 세정 설비, 특수가스 캐비닛(Gas Keeper), 4K 초고화질 SCADA 관제 시뮬레이터를 직접 조작해 보세요.",
  alternates: {
    canonical: "/demo/hysfa",
  },
  openGraph: {
    title: "한양시스템㈜ — 반도체 설비 & 4K SCADA 라이브 데모",
    description:
      "27년 업력의 반도체 공정 설비 명가 한양시스템㈜. 살아 움직이는 4K SCADA 관제소와 인터록 안전 시스템을 체험해 보세요.",
    url: "https://taemun.net/demo/hysfa",
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
