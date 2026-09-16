import type { Metadata } from 'next';
import AtlasResortPageClient from './AtlasResortPageClient';

export const metadata: Metadata = {
  title: 'ATLAS RESORTS & PRIVATE VILLAS — 럭셔리 부티크 호스피탈리티 & 프라이빗 빌라 | 태문 DEV STUDIO',
  description:
    '남해 클리프 풀빌라, 제주 원시림 프레지덴셜 에스테이트, 발리 우붓 생츄어리. 자연과 교감하는 최상위 부티크 호스피탈리티 플래그십 실물 라이브 데모.',
  openGraph: {
    title: 'ATLAS RESORTS & PRIVATE VILLAS — 럭셔리 부티크 호스피탈리티 & 프라이빗 빌라',
    description: '태문 DEV STUDIO 하이엔드 럭셔리 호스피탈리티 기업 랜딩 플래그십 라이브 데모',
    type: 'website',
  },
};

export default async function AtlasResortPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <AtlasResortPageClient isEmbed={isEmbed} />;
}
