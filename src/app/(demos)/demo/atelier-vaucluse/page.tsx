import type { Metadata } from 'next';
import AtelierVauclusePageClient from './AtelierVauclusePageClient';

export const metadata: Metadata = {
  title: 'ATELIER VAUCLUSE | 하이엔드 인테리어 스튜디오 실물 데모 — 태문 DEV STUDIO',
  description:
    '아뜰리에 보클루즈는 유행을 넘어 영속적인 미학을 담은 하이엔드 주거 및 감도 높은 상업 공간을 설계합니다. 태문 DEV STUDIO 건축·인테리어 특화 포트폴리오 라이브 데모.',
  openGraph: {
    title: 'ATELIER VAUCLUSE | 하이엔드 인테리어 스튜디오 실물 데모',
    description: '태문 DEV STUDIO 건축·인테리어 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export default async function AtelierVauclusePage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <AtelierVauclusePageClient isEmbed={isEmbed} />;
}
