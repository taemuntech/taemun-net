import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import NouveauDiningPageClient from './NouveauDiningPageClient';

const DEMO_METADATA: Metadata = {
  title: '누보 다이닝 (NOUVEAU DINING) | 성수·청담 하이엔드 카페 & 레스토랑 인테리어 — 태문 DEV STUDIO',
  description:
    '미식과 공간의 조화를 담은 F&B 레스토랑 & 카페 인테리어. 오픈 셰프 카운터 바, 온실 테라스 가든, 3단계 조도 앰비언스 시뮬레이션, 프리미엄 마감재 아카이브 실물 라이브 데모.',
  openGraph: {
    title: '누보 다이닝 | F&B 카페 & 파인다이닝 공간 디자인 실물 데모',
    description: '태문 DEV STUDIO 하이엔드 F&B 및 상업 공간 브랜딩 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function NouveauDiningPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <NouveauDiningPageClient isEmbed={isEmbed} />;
}
