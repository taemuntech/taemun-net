import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import StrataBuildPageClient from './StrataBuildPageClient';

const DEMO_METADATA: Metadata = {
  title: '스트라타 종합건설 (STRATA) | 메가 시공 & 공정 시뮬레이터 — 태문 DEV STUDIO',
  description:
    '0% 터파기부터 100% 준공까지 4단계 건축 공정 타임랩스 빌드업 시뮬레이터 & 러기드 현장 감리 패드 HUD. 메가 랜드마크 실적 및 초고성능 구조재 아카이브 실물 라이브 데모.',
  openGraph: {
    title: '스트라타 종합건설 | 메가 시공 & 타임랩스 공정 시뮬레이터 실물 데모',
    description: '태문 DEV STUDIO 종합건설 & 초정밀 시공 엔지니어링 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function StrataBuildPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <StrataBuildPageClient isEmbed={isEmbed} />;
}
