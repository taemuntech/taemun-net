import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import SeongsuShowroomPageClient from './SeongsuShowroomPageClient';

const DEMO_METADATA: Metadata = {
  title: 'ATELIER MOOD SEONGSU | 성수 플래그십 쇼룸 & 복합문화공간 디자인 — 태문 DEV STUDIO',
  description:
    '원초적 물성과 현대적 구조가 완성하는 성수 플래그십 쇼룸 인테리어. 3층 조닝 인터랙션, 머티리얼 스펙 아카이브, 실시간 공간 견적 시뮬레이터 라이브 데모.',
  openGraph: {
    title: 'ATELIER MOOD SEONGSU | 플래그십 쇼룸 디자인 실물 데모',
    description: '태문 DEV STUDIO 상업 인테리어 & 공간 브랜딩 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function SeongsuShowroomPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <SeongsuShowroomPageClient isEmbed={isEmbed} />;
}
