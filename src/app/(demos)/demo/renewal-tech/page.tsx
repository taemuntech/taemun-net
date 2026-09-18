import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import RenewalTechPageClient from './RenewalTechPageClient';

const DEMO_METADATA: Metadata = {
  title: '리뉴얼 테크 (RENEWAL TECH) | 도심 노후 빌딩 대수선 & 밸류애드 — 태문넷',
  description:
    '30년 노후 화강석 빌딩을 테헤란로 프라임 테크 타워로 탈바꿈한 실물 비포&애프터 비교 슬라이더. 신축 대비 공사비 40% 절감(예시)·공기 60% 단축(예시) ROI 계산기 및 탄소섬유 내진 보강 엔지니어링 실물 라이브 데모.',
  openGraph: {
    title: '리뉴얼 테크 | 도심 노후 빌딩 리모델링 & 대수선 엔지니어링 실물 데모',
    description: '태문넷 도심 노후 빌딩 밸류애드 & 대수선 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function RenewalTechPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <RenewalTechPageClient isEmbed={isEmbed} />;
}
