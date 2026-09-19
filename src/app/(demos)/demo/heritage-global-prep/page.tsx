import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import HeritageGlobalPrepPageClient from './HeritageGlobalPrepPageClient';

// 제목 뒤 「— 태문넷」 은 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다(화면의 완공작·수치는 모두 예시다).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'heritage-global-prep',
  title: '헤리티지 글로벌 프렙 (Heritage Global Prep) — 해외 대학 입시 학원 홈페이지',
  description:
    '태문넷이 만든 가상 브랜드 샘플입니다. 실제 학원이 아니며 상담 신청은 접수되지 않습니다. 영자신문 감성의 지면 디자인, SAT 점수 계산기(예시), 에세이 해설 화면, 포트폴리오 상담 신청 위저드를 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function HeritageGlobalPrepPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params?.embed === 'true';

  return <HeritageGlobalPrepPageClient isEmbed={isEmbed} />;
}
