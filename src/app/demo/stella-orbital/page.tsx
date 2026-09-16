import type { Metadata } from 'next';
import StellaOrbitalPageClient from './StellaOrbitalPageClient';

export const metadata: Metadata = {
  title: 'STELLA ORBITAL SYSTEMS — 초소형 위성 군집 & 지구관측 AI 스페이스테크 | 태문 DEV STUDIO',
  description:
    '태양동기궤도(SSO) 500km 초소형 위성 군집 기반 0.3m 초고해상도 광학 및 X-Band 전천후 SAR 지구관측 데이터 플랫폼 플래그십 실물 라이브 데모.',
  openGraph: {
    title: 'STELLA ORBITAL SYSTEMS — 초소형 위성 군집 & 지구관측 AI 스페이스테크',
    description: '태문 DEV STUDIO 우주항공/방산 지구관측 데이터 기업 랜딩 플래그십 라이브 데모',
    type: 'website',
  },
};

export default async function StellaOrbitalPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <StellaOrbitalPageClient isEmbed={isEmbed} />;
}
