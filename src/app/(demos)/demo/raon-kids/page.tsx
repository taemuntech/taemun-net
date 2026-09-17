import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import RaonKidsPageClient from './RaonKidsPageClient';

const DEMO_METADATA: Metadata = {
  title: '라온 키즈 아틀리에 (RAON KIDS) | 서초·판교 프리미엄 키즈 에듀 & 복합문화공간 인테리어 — 태문 DEV STUDIO',
  description:
    '햇살과 곡면이 자라나는 아이들의 감성 놀이터. 라돈 Zero & VOC Free 친환경 텔레메트리 HUD, 무독성 E0 자작나무 및 천연 규조토 마감재 아카이브 실물 라이브 데모.',
  openGraph: {
    title: '라온 키즈 아틀리에 | 프리미엄 키즈 에듀 & 복합문화공간 디자인 실물 데모',
    description: '태문 DEV STUDIO 프리미엄 키즈 카페 & 어린이 교육 복합시설 인테리어 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function RaonKidsPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <RaonKidsPageClient isEmbed={isEmbed} />;
}

