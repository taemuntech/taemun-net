import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import OceanMarinePageClient from './OceanMarinePageClient';

const DEMO_METADATA: Metadata = {
  title: '오션마린건설 (OCEAN MARINE) | 스마트 항만 부두 & 외해 케이슨 방파제 해양 토목 — 태문넷',
  description:
    '24,000 TEU 스마트 안벽 부두·12,000톤급 메가 케이슨 외해 방파제·80톤급 TTP 소파블록·1,500만㎥ 해상 준설 매립 4대 해양 토목 실적. 케이슨 제작/거치 공정 다이어그램 및 항만 공사비 시뮬레이터(예시) 실물 라이브 데모.',
  openGraph: {
    title: '오션마린건설 | 스마트 항만 · 외해 케이슨 방파제 해양 토목 실물 데모',
    description: '태문넷 국가 무역항 및 외해 심해 방파제 해양 토목 특화 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function OceanMarinePage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <OceanMarinePageClient isEmbed={isEmbed} />;
}
