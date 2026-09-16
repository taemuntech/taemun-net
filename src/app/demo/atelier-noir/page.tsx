import type { Metadata } from 'next';
import AtelierNoirPageClient from './AtelierNoirPageClient';

export const metadata: Metadata = {
  title: 'ATELIER NOIR (아틀리에 누아르) — K-패션 & 디자이너 셀렉트샵 | 태문 DEV STUDIO',
  description:
    '무신사·29CM 스타일의 4단계 딥 카테고리 HUD, 인터랙티브 룩북 쇼퍼블 펄스 핀, 체형별 실측 치수 조견표 및 실시간 랭킹 시스템을 탑재한 플래그십 이커머스 라이브 데모.',
  openGraph: {
    title: 'ATELIER NOIR — K-패션 & 디자이너 셀렉트샵',
    description: '태문 DEV STUDIO 하이엔드 디자이너 패션 이커머스 플래그십 라이브 데모',
    type: 'website',
  },
};

export default async function AtelierNoirPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <AtelierNoirPageClient isEmbed={isEmbed} />;
}
