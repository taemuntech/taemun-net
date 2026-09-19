import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import ApexLegalCpaPageClient from './ApexLegalCpaPageClient';

// 제목 뒤 「— 태문넷」 은 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다(화면의 완공작·수치는 모두 예시다).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'apex-legal-cpa',
  title: '에이펙스 법학·회계 아카데미 (APEX Legal & CPA) — 로스쿨 LEET·CPA 전문 학원 홈페이지',
  description:
    '태문넷이 만든 가상 브랜드 샘플입니다. 실제 학원이 아니며 입학 진단 신청은 접수되지 않습니다. 로스쿨 입시 자료 화면, 좌석 배치도, 교수진 소개, 입학 진단 신청 화면을 한 페이지에 담았습니다.',
});

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
