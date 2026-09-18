import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import LogisParkPageClient from './LogisParkPageClient';

const DEMO_METADATA: Metadata = {
  title: '로지스파크 건설 (LOGIS PARK) | 스마트 저온 물류센터 & 첨단 플랜트 시공 — 태문 DEV STUDIO',
  description:
    '용인 메가 콜드체인 허브 등 4대 완공 실적 갤러리. -25℃ 초저온 멀티 챔버 공조 인터랙티브 다이어그램 및 물류센터 규모별 예상 시공비 시뮬레이터(예시) 실물 라이브 데모.',
  openGraph: {
    title: '로지스파크 건설 | 스마트 저온 물류센터 & 콜드체인 플랜트 실물 데모',
    description: '태문 DEV STUDIO 초대형 스마트 저온 물류센터 턴키 시공 특화 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function LogisParkPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <LogisParkPageClient isEmbed={isEmbed} />;
}
