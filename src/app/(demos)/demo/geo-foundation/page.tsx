import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import GeoFoundationPageClient from './GeoFoundationPageClient';

const DEMO_METADATA: Metadata = {
  title: '지오파운데이션 (GEO FOUNDATION) | 대심도 흙막이 & 특수기초 토목 — 태문넷',
  description:
    '지하 52m 대심도 역타 흙막이·지하연속벽 D-Wall·대구경 RCD 현장타설말뚝·초고압 제트그라우팅 4대 특수기초 실적. 심도별 지층 분석기 및 굴착 공사비 시뮬레이터(예시) 실물 라이브 데모.',
  openGraph: {
    title: '지오파운데이션 | 대심도 흙막이 · 특수기초 토목 실물 데모',
    description: '태문넷 도심 초고밀도 대심도 흙막이·지반개량 특화 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function GeoFoundationPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <GeoFoundationPageClient isEmbed={isEmbed} />;
}
