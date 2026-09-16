import type { Metadata } from 'next';
import H2NextPageClient from './H2NextPageClient';

export const metadata: Metadata = {
  title: 'H2 NEXT — 차세대 신재생에너지 & 그린수소 엔터프라이즈 | 태문 DEV STUDIO',
  description:
    '기가와트급 해상풍력 연계 PEM 수전해 플랜트부터 극저온 액화수소 인프라까지. 넷제로 에너지 엔지니어링 글로벌 플래그십 실물 라이브 데모.',
  openGraph: {
    title: 'H2 NEXT — 차세대 신재생에너지 & 그린수소 엔터프라이즈',
    description: '태문 DEV STUDIO 클린테크 신재생에너지 기업 랜딩 플래그십 라이브 데모',
    type: 'website',
  },
};

export default async function H2NextPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <H2NextPageClient isEmbed={isEmbed} />;
}
