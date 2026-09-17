import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import JeonglimTeaPageClient from './JeonglimTeaPageClient';

const DEMO_METADATA: Metadata = {
  title: '정림다원 (靜林茶院) | 북촌·서촌 모던 한옥 티하우스 & 다도 공간 디자인 — 태문 DEV STUDIO',
  description:
    '백 년 고재와 현대식 블랙 대리석 다도대의 조화. 3대 한옥 다도 공간 핫스팟 투어, 날씨와 소리 풍경 앰비언스 HUD, 전통 고재 소나무 및 한지 자재 아카이브 실물 라이브 데모.',
  openGraph: {
    title: '정림다원 | 모던 한옥 티하우스 & 다도 공간 디자인 실물 데모',
    description: '태문 DEV STUDIO 전통 한옥 및 문화 공간 브랜딩 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function JeonglimTeaPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <JeonglimTeaPageClient isEmbed={isEmbed} />;
}
