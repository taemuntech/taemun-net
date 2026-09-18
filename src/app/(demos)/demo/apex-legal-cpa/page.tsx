import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import ApexLegalCpaPageClient from './ApexLegalCpaPageClient';

const DEMO_METADATA: Metadata = {
  title: '에이펙스 법학·회계 아카데미 (APEX Legal & CPA) | 로스쿨 LEET & 공인회계사 CPA — 태문 DEV STUDIO',
  description:
    '서초 법조타운 감성의 최상위 법학전문대학원(LEET) 및 공인회계사(CPA) 전문 교육기관 웹사이트 샘플. 3개년 전국 로스쿨 입시 매트릭스, 48dB 1인 방음 캐럴 좌석 플로어플랜, 전임 법조인/회계사 교수진, 심층 입학 진단 신청 위저드 탑재.',
  openGraph: {
    title: '에이펙스 법학·회계 아카데미 | 로스쿨 LEET & CPA 전문관 실물 라이브 데모',
    description: '태문 DEV STUDIO 최상위권 전문직 학원 & 에듀테크 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function ApexLegalCpaPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params?.embed === 'true';

  return <ApexLegalCpaPageClient isEmbed={isEmbed} />;
}
