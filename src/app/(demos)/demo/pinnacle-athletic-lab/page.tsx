import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import PinnacleAthleticLabPageClient from './PinnacleAthleticLabPageClient';

// 제목 뒤 「— 태문넷」 은 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다(화면의 완공작·수치는 모두 예시다).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'pinnacle-athletic-lab',
  title: '피나클 체육과학 아카데미 (PINNACLE Athletic Lab) — 체대·특채 실기 학원 홈페이지',
  description:
    '태문넷이 만든 가상 브랜드 샘플입니다. 실제 학원이 아니며 진단 예약은 접수되지 않습니다. 동작 분석 화면(예시), 종목별 실기 점수 환산기, 코칭스태프 소개, 진단 예약 위저드를 담았습니다.',
});

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
