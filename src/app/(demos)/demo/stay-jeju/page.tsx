import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import StayJejuPageClient from './StayJejuPageClient';

const DEMO_METADATA: Metadata = {
  title: '소소재 제주 (SOSOJAE JEJU) | 애월 프라이빗 독채 스테이 공간 디자인 — 태문 DEV STUDIO',
  description:
    '비움과 여백, 제주의 시간과 돌담이 머무는 프라이빗 독채 스테이 인테리어 디자인. 시간대별 서커디언 조명 연출, 안채 및 노천 히노끼탕 360 투어, 제주 자연 물성 아카이브 실물 데모.',
  openGraph: {
    title: '소소재 제주 | 프라이빗 독채 스테이 디자인 실물 데모',
    description: '태문 DEV STUDIO 호스피탈리티 & 스테이 인테리어 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function StayJejuPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <StayJejuPageClient isEmbed={isEmbed} />;
}
