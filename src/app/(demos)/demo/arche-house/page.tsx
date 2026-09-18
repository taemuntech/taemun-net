import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import ArcheHousePageClient from './ArcheHousePageClient';

const DEMO_METADATA: Metadata = {
  title: '아르케 건축사사무소 (ARCHE HOUSE) | 하이엔드 주거 아틀리에 — 태문 DEV STUDIO',
  description:
    '판교 중정주택, 가평 수변별서, 서초 콘크리트 레지던스 등 4대 완공작 갤러리 & 건축가의 공간 철학. 평형별 예상 건축비 가이드 및 1:1 건축 설계 상담 실물 라이브 데모.',
  openGraph: {
    title: '아르케 건축사사무소 | 하이엔드 단독주택 & 별서 아틀리에 실물 데모',
    description: '태문 DEV STUDIO 고급 주거 건축 설계 및 시공 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function ArcheHousePage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <ArcheHousePageClient isEmbed={isEmbed} />;
}
