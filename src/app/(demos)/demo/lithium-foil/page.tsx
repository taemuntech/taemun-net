import type { Metadata } from "next";
import LithiumFoilPageClient from "./LithiumFoilPageClient";

export const metadata: Metadata = {
  title: "소재 공정 데이터 플랫폼 라이브 데모 — 태문 DEV STUDIO",
  description:
    "리튬 호일 제조 공정 12주치 가상 데이터로 돌아가는 공정 데이터 플랫폼 데모. 롤 일지 입력, 수율 워터폴·관리도 KPI 보드, 원료→출하 로트 계보 추적, 데이터 기반 개선 제안까지 직접 체험해 보세요.",
  alternates: {
    canonical: "/demo/lithium-foil",
  },
  openGraph: {
    title: "소재 공정 데이터 플랫폼 라이브 데모 | 태문 DEV STUDIO",
    description:
      "롤 일지를 입력하면 KPI·관리도·로트 계보가 즉시 바뀌는 제조 공정 데이터 플랫폼 데모.",
    url: "https://taemun.net/demo/lithium-foil",
  },
};

export default async function LithiumFoilDemoPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <LithiumFoilPageClient isEmbed={isEmbed} />;
}
