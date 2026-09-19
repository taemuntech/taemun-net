import type { Metadata } from "next";
import { sampleMetadata } from "@/components/demo-kit/sample-metadata";
import { demoMetadata } from "@/lib/portfolio/demo-metadata";
import LithiumFoilPageClient from "./LithiumFoilPageClient";

// 제목·설명·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
// 제목 뒤 「— 태문넷」 은 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다(화면의 완공작·수치는 모두 예시다).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'lithium-foil',
  title: '소재 공정 데이터 플랫폼 — 제조 공정 데이터 관리 화면',
  description:
    '태문넷이 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 화면의 공정 데이터는 모두 가상 값입니다. 롤 일지 입력, 수율·관리도 KPI 보드, 원료부터 출하까지 로트 계보 추적, 개선 제안 화면을 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function LithiumFoilDemoPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <LithiumFoilPageClient isEmbed={isEmbed} />;
}
