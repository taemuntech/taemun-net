import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import AthleticPrepPageClient from './AthleticPrepPageClient';

const DEMO_METADATA: Metadata = {
  title: '아펙스 체대입시 & 엘리트 스포츠 | 기초실기 센서 HUD & 합격 계산기 — 태문 DEV STUDIO',
  description:
    '최상위 체육교육과 및 명문 체대 입시 전문 아카데미 웹사이트 샘플. 4대 기초실기 전자기측기 센서 계측 텔레메트리, 수능+실기 합산 합격 진단 매트릭스, 1:1 무료 실기 측정 신청 실물 라이브 데모.',
  openGraph: {
    title: '아펙스 체대입시 & 엘리트 스포츠 | 센서 HUD 실물 라이브 데모',
    description: '태문 DEV STUDIO 프리미엄 체대입시 & 스포츠과학 에듀테크 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function AthleticPrepPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <AthleticPrepPageClient isEmbed={isEmbed} />;
}
