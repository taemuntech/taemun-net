import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import AquaInfraPageClient from './AquaInfraPageClient';

const DEMO_METADATA: Metadata = {
  title: '아쿠아인프라엔지니어링 (AQUA INFRA) | 대용량 상수도 & 지하화 하수처리장 토목 — 태문넷',
  description:
    '지하 45m 대심도 빗물터널·일일 50만톤 완전 지하화 하수처리장·Ø2,400mm 광역 도수관로·도심 생태하천 4대 수자원 토목 실적. 지하 4단계 MBR 수처리 다이어그램 및 인프라 사업비 시뮬레이터(예시) 실물 라이브 데모.',
  openGraph: {
    title: '아쿠아인프라엔지니어링 | 상수도 · 하수처리장 · 대심도 빗물터널 토목 실물 데모',
    description: '태문넷 국가 수자원 및 친환경 지하화 인프라 토목 특화 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function AquaInfraPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <AquaInfraPageClient isEmbed={isEmbed} />;
}
