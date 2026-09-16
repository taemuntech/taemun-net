import type { Metadata } from 'next';
import GreencubeAgriPageClient from './GreencubeAgriPageClient';

export const metadata: Metadata = {
  title: 'GREENCUBE AGRI-TECH — AI 무농약 밀폐형 수직 스마트팜 | 태문 DEV STUDIO',
  description:
    'Class 1000 클린룸 바이오스피어, 95% 용수 절감 및 인공지능 분광 제어 차세대 수직 스마트팜 엔터프라이즈 기업 랜딩 플래그십 실물 라이브 데모.',
  openGraph: {
    title: 'GREENCUBE AGRI-TECH — AI 무농약 밀폐형 수직 스마트팜',
    description: '태문 DEV STUDIO 글로벌 친환경 스마트팜 & 바이오 소재 기업 랜딩 플래그십 라이브 데모',
    type: 'website',
  },
};

export default async function GreencubeAgriPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <GreencubeAgriPageClient isEmbed={isEmbed} />;
}
