import type { Metadata } from 'next';
import VerdeGourmetPageClient from './VerdeGourmetPageClient';

export const metadata: Metadata = {
  title: 'VERDE GOURMET (베르데 고메) — 프리미엄 신선식품 & 풀콜드체인 새벽배송 | 태문 DEV STUDIO',
  description:
    '마켓컬리 스타일의 산지 직송 스토리, 셰프의 레시피 연계 재료 일괄 담기, 영하 18℃ 풀콜드체인 실시간 안심 텔레메트리 및 새벽배송 타이머가 결합된 플래그십 그로서리 이커머스 라이브 데모.',
  openGraph: {
    title: 'VERDE GOURMET — 프리미엄 신선식품 & 풀콜드체인 새벽배송',
    description: '태문 DEV STUDIO 프리미엄 고메 그로서리 플래그십 라이브 데모',
    type: 'website',
  },
};

export default async function VerdeGourmetPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <VerdeGourmetPageClient isEmbed={isEmbed} />;
}
