import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import ArcheWellnessPageClient from './ArcheWellnessPageClient';

const DEMO_METADATA: Metadata = {
  title: '아르케 웰니스 (ARCHE WELLNESS) | 한남·청담 프라이빗 필라테스 & 스파 인테리어 — 태문 DEV STUDIO',
  description:
    '빛과 곡선이 머무는 1:1 VIP 프라이빗 필라테스 & 스파 인테리어. 3대 특화 룸 핫스팟 투어, 클린 에어 텔레메트리 HUD, 친환경 마감재 아카이브 실물 라이브 데모.',
  openGraph: {
    title: '아르케 웰니스 | 프라이빗 필라테스 & 스파 공간 디자인 실물 데모',
    description: '태문 DEV STUDIO 웰니스 & 힐링 스튜디오 공간 브랜딩 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function ArcheWellnessPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <ArcheWellnessPageClient isEmbed={isEmbed} />;
}
