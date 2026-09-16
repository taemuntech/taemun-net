import type { Metadata } from 'next';
import VoltronEvPageClient from './VoltronEvPageClient';

export const metadata: Metadata = {
  title: 'VOLTRON ADVANCED EV — 800V 차세대 전력반도체 & 메가와트 충전 | 태문 DEV STUDIO',
  description:
    '차세대 800V SiC 인버터, 15분 메가와트 초급속 충전 및 ASIL-D 전장 인증 글로벌 Tier-1 전기차 엔지니어링 기업 랜딩 플래그십 실물 라이브 데모.',
  openGraph: {
    title: 'VOLTRON ADVANCED EV — 800V 차세대 전력반도체 & 메가와트 충전',
    description: '태문 DEV STUDIO 글로벌 Tier-1 EV 전장 엔지니어링 기업 랜딩 플래그십 라이브 데모',
    type: 'website',
  },
};

export default async function VoltronEvPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <VoltronEvPageClient isEmbed={isEmbed} />;
}
