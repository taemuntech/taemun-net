import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import TerraCorePageClient from './TerraCorePageClient';

const DEMO_METADATA: Metadata = {
  title: '테라코어 (TERRA-CORE) | 대심도 지중 토목 & TBM 관제 — 태문넷',
  description:
    '지상 0m부터 지하 80m 암반까지 파고드는 수직 지층 스크롤 탐사 & 14.2m 초대구경 쉴드 TBM 관제 콘솔. 4대 지층 특화 단면 핫스팟 투어 및 대심도 토목 신소재 아카이브 실물 라이브 데모.',
  openGraph: {
    title: '테라코어 | 대심도 지중 토목 & 쉴드 TBM 관제 실물 데모',
    description: '태문넷 메가 토목 인프라 & TBM 터널링 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function TerraCorePage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <TerraCorePageClient isEmbed={isEmbed} />;
}
