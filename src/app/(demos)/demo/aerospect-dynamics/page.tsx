import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import AerospectPageClient from './AerospectPageClient';

// 제목 뒤 「— 태문넷」 은 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다.
// 제목·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'aerospect-dynamics',
  title: '에어로스펙트 다이내믹스 (AEROSPECT DYNAMICS) — 산업용 자율비행 드론 & AI 안전진단',
  description:
    '태문넷이 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 실증 비행·보고서 신청은 접수되지 않습니다. 4K 광학 및 열화상 스플릿 듀얼 비전 뷰어, AI 균열 자동 판독 콘솔, 무인 도크 스테이션 원격 시뮬레이터, 원클릭 정밀진단 보고서 출력을 한 페이지에 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function AerospectPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <AerospectPageClient isEmbed={isEmbed} />;
}
