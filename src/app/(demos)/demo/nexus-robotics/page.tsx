import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import NexusRoboticsPageClient from './NexusRoboticsPageClient';

// 제목 뒤 「— 태문 DEV STUDIO」 는 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다(영상·관제 화면·수치는 모두 예시다).
// 제목·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'nexus-robotics',
  title: 'NEXUS ROBOTICS (넥서스 로보틱스) — 클린룸 자율주행 로봇 기업 홈페이지',
  description:
    '태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 실사·PoC 신청은 접수되지 않습니다. 로봇 라인업 탭과 사양 표, 관제 화면 구성, 도입 효과 계산기, 기술 상담 폼을 한 페이지에 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function NexusRoboticsPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <NexusRoboticsPageClient isEmbed={isEmbed} />;
}
