import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import DaechiPrestigePageClient from './DaechiPrestigePageClient';

const DEMO_METADATA: Metadata = {
  title: '대치 프레스티지 학원 (DAECHI PRESTIGE) | 대치동 의치약한 최상위권 전문 입시학원 — 태문 DEV STUDIO',
  description:
    '대한민국 최상위권 0.01% 의치약학 계열 전문 입시학원 웹사이트 샘플. 국·수·탐 백분위 실시간 모의 합격진단 시뮬레이터, 수능 킬러문항 3단계 핀셋 해체 Lab, 1:1 심층 입학 진단 레벨테스트 신청 위저드 실물 라이브 데모.',
  openGraph: {
    title: '대치 프레스티지 학원 | 의치약한 전문 입시학원 실물 라이브 데모',
    description: '태문 DEV STUDIO 최상위권 프리미엄 학원 & 에듀테크 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function DaechiPrestigePage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <DaechiPrestigePageClient isEmbed={isEmbed} />;
}
