import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import PinnacleAthleticLabPageClient from './PinnacleAthleticLabPageClient';

const DEMO_METADATA: Metadata = {
  title: '피나클 체육과학 아카데미 (PINNACLE Athletic Lab) | 체대·특채 실기 — 태문 DEV STUDIO',
  description:
    '0.01초와 1cm를 지배하는 스포츠 바이오메카닉스 & 체대·특채 실기 텔레메트리 웹사이트 샘플. 1,000Hz 지면반력기 3D 관절 분석, 5대 종목 실기 만점 환산기, 국가대표급 코칭스태프, 정밀 진단 예약 위저드 탑재.',
  openGraph: {
    title: '피나클 체육과학 아카데미 | 스포츠 바이오메카닉스 전문관 실물 라이브 데모',
    description: '태문 DEV STUDIO 스포츠 과학 & 에듀테크 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function PinnacleAthleticLabPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params?.embed === 'true';

  return <PinnacleAthleticLabPageClient isEmbed={isEmbed} />;
}
