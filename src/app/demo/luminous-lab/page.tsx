import type { Metadata } from 'next';
import LuminousLabPageClient from './LuminousLabPageClient';

export const metadata: Metadata = {
  title: 'LUMINOUS LAB (루미너스 랩) — K-뷰티 & 클린 더마 코스메틱 | 태문 DEV STUDIO',
  description:
    '올리브영·화해 스타일의 피부타입 및 피부고민별 4단계 딥 필터 HUD, 전성분 EWG 그린 안전 등급 검사기, 실시간 뷰티 어워즈 랭킹 차트 및 임상 시험 리포트가 결합된 플래그십 K-뷰티 이커머스 라이브 데모.',
  openGraph: {
    title: 'LUMINOUS LAB — K-뷰티 & 클린 더마 코스메틱',
    description: '태문 DEV STUDIO 글로벌 K-뷰티 & 클린 더마 코스메틱 플래그십 라이브 데모',
    type: 'website',
  },
};

export default async function LuminousLabPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <LuminousLabPageClient isEmbed={isEmbed} />;
}
