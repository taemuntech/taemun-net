import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import NexusWorkPageClient from './NexusWorkPageClient';

const DEMO_METADATA: Metadata = {
  title: 'NEXUS WORK (넥서스 워크) | 성수·강남 스마트 오피스 & 사옥 디자인 — 태문 DEV STUDIO',
  description:
    '몰입과 유기적 연결을 담은 하이테크 하이브리드 스마트 오피스 인테리어. 4대 특화 존 핫스팟 투어, 스마트 회의실 IoT 관제 HUD, 친환경 음향 차음재 아카이브 실물 데모.',
  openGraph: {
    title: '넥서스 워크 | 스마트 오피스 & 사옥 디자인 실물 데모',
    description: '태문 DEV STUDIO 하이테크 상업 인테리어 & 사옥 공간 브랜딩 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function NexusWorkPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <NexusWorkPageClient isEmbed={isEmbed} />;
}
