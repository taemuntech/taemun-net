import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import RoyalBalletPageClient from './RoyalBalletPageClient';

const DEMO_METADATA: Metadata = {
  title: '로열 발레 아카데미 (ROYAL BALLET) | 클래식 무용 & 해부학적 턴아웃 — 태문 DEV STUDIO',
  description:
    '러시아 바가노바 & 영국 로열 발레단 정통 메소드 기반 무용 아카데미 웹사이트 샘플. 5대 기본 발 포지션 해부학적 턴아웃 시뮬레이터, 예중·예고 입시 커리큘럼, 정기 갈라 공연 아카이브 및 1:1 체형 진단 오디션 신청 실물 라이브 데모.',
  openGraph: {
    title: '로열 발레 아카데미 | 클래식 무용 & 턴아웃 Lab 실물 라이브 데모',
    description: '태문 DEV STUDIO 프리미엄 클래식 무용 & 에듀테크 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function RoyalBalletPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <RoyalBalletPageClient isEmbed={isEmbed} />;
}
