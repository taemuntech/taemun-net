import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import SejongTerraPageClient from './SejongTerraPageClient';

const DEMO_METADATA: Metadata = {
  title: '세종테라개발 (SEJONG TERRA) | 100만평 스마트 산업단지 & 3D 디지털 토공 토목 — 태문넷',
  description:
    '100만평 미래 모빌리티 국가산단 1,500만㎥ 대토공·스마트 중장비 머신가이던스(MG/MC)·4련 초대형 지하 공동구·연약지반 PBD 압밀 4대 실적. 3D 절·성토 토공 밸런스 뷰어 및 부지조성 공사비 시뮬레이터(예시) 실물 라이브 데모.',
  openGraph: {
    title: '세종테라개발 | 100만평 스마트 산업단지 · 3D 디지털 토공 토목 실물 데모',
    description: '태문넷 국가 전략 산업단지 및 신도시 대단위 부지조성 토목 특화 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function SejongTerraPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <SejongTerraPageClient isEmbed={isEmbed} />;
}
