import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import LeetCpaPageClient from './LeetCpaPageClient';

const DEMO_METADATA: Metadata = {
  title: '렉스 로스쿨 LEET & CPA 고시관 | 기출 핀셋 해체 & 표준점수 계산 — 태문 DEV STUDIO',
  description:
    '법학전문대학원(로스쿨 LEET) 및 공인회계사(CPA) 전문 고시 아카데미 웹사이트 샘플. 킬러 문항 오답 함정 핀셋 해체 Lab, 목표 로스쿨별 LEET 요구 표준점수 환산 시뮬레이터, 1:1 합격 진단 실물 라이브 데모.',
  openGraph: {
    title: '렉스 로스쿨 LEET & CPA 고시관 | 기출 핀셋 해체 실물 라이브 데모',
    description: '태문 DEV STUDIO 프리미엄 로스쿨 LEET & CPA 고시 에듀테크 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function LeetCpaPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <LeetCpaPageClient isEmbed={isEmbed} />;
}
