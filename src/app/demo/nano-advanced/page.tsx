import type { Metadata } from 'next';
import NanoAdvancedPageClient from './NanoAdvancedPageClient';

export const metadata: Metadata = {
  title: 'NANO ADVANCED — 2.5D/3D 반도체 첨단 이종 패키징 & 글래스 기판 | 태문 DEV STUDIO',
  description:
    '차세대 초거대 AI 가속기 및 HBM4 인터커넥트를 위한 2.5D/3D 첨단 이종 반도체 패키징 및 초평탄 글래스 코어 기판 솔루션 플래그십 실물 라이브 데모.',
  openGraph: {
    title: 'NANO ADVANCED — 2.5D/3D 반도체 첨단 이종 패키징',
    description: '태문 DEV STUDIO 첨단 반도체/하드웨어 기업 랜딩 플래그십 라이브 데모',
    type: 'website',
  },
};

export default async function NanoAdvancedPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <NanoAdvancedPageClient isEmbed={isEmbed} />;
}
