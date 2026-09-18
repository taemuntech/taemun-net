import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import MetroBuildPageClient from './MetroBuildPageClient';

const DEMO_METADATA: Metadata = {
  title: '메트로 종합건설 (METRO BUILD) | 기업사옥 & 지식산업센터 턴키 시공 — 태문 DEV STUDIO',
  description:
    '판교 IT 본사 사옥·가산 드라이브인 지식산업센터 4대 완공 실적 갤러리. 스마트 BIM 4D 공정 통합 관제 시스템 및 연면적별 예상 공사비 간이 시뮬레이터(예시) 실물 라이브 데모.',
  openGraph: {
    title: '메트로 종합건설 | 기업사옥 & 첨단 지식산업센터 턴키 시공 실물 데모',
    description: '태문 DEV STUDIO 기업 본사 사옥 및 지식산업센터 턴키 종합건설 특화 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function MetroBuildPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <MetroBuildPageClient isEmbed={isEmbed} />;
}
