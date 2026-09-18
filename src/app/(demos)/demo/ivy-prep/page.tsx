import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import IvyPrepPageClient from './IvyPrepPageClient';

const DEMO_METADATA: Metadata = {
  title: '아이비 프렙 아카데미 | 6대 입시역량 Radar & Digital SAT — 태문 DEV STUDIO',
  description:
    '미국 명문 사립 보딩스쿨 및 아이비리그(Ivy League) 진학 전문 입시학원 웹사이트 샘플. 6대 역량 방사형 레이더 차트, 대학별 Digital SAT 1600점 비교 텔레메트리, 1:1 프라이빗 입시 로드맵 신청 실물 라이브 데모.',
  openGraph: {
    title: '아이비 프렙 아카데미 | 6대 입시역량 Radar 실물 라이브 데모',
    description: '태문 DEV STUDIO 프리미엄 미국 보딩 & 아이비리그 에듀테크 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function IvyPrepPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <IvyPrepPageClient isEmbed={isEmbed} />;
}
