import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import HanbitCivilPageClient from './HanbitCivilPageClient';

const DEMO_METADATA: Metadata = {
  title: '한빛토목이앤씨 (HANBIT CIVIL) | 고속도로 & 해상 장대교량 토목 — 태문넷',
  description:
    '서해 해상 사장교·도심 대심도 철도 터널 4대 메가 인프라 완공 실적 갤러리. MSS 이동식 비계 공법 아카이브 및 인프라 연장(km)별 예상 공사비 시뮬레이터(예시) 실물 라이브 데모.',
  openGraph: {
    title: '한빛토목이앤씨 | 고속도로 · 장대교량 · 대심도 철도 토목 실물 데모',
    description: '태문넷 국가 기간망 인프라 토목 턴키 특화 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function HanbitCivilPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <HanbitCivilPageClient isEmbed={isEmbed} />;
}
