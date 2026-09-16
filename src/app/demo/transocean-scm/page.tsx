import type { Metadata } from 'next';
import TransoceanScmPageClient from './TransoceanScmPageClient';

export const metadata: Metadata = {
  title: 'TRANSOCEAN GLOBAL SCM — 스마트 항만 & AI 복합물류 | 태문 DEV STUDIO',
  description:
    '부산신항-로테르담 글로벌 항로 실시간 AIS 선박 추적, -18℃ 초저온 콜드체인 IoT 관제 및 Scope-3 탄소 감축 스마트 해운물류 플래그십 실물 라이브 데모.',
  openGraph: {
    title: 'TRANSOCEAN GLOBAL SCM — 스마트 항만 & AI 복합물류',
    description: '태문 DEV STUDIO 글로벌 스마트 항만 & AI 복합물류 기업 랜딩 플래그십 라이브 데모',
    type: 'website',
  },
};

export default async function TransoceanScmPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <TransoceanScmPageClient isEmbed={isEmbed} />;
}
