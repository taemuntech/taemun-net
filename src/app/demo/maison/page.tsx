import type { Metadata } from 'next';
import MaisonPageClient from './MaisonPageClient';

export const metadata: Metadata = {
  title: "Maison d'Antique (메종 당티크) | 하이엔드 앤틱 살롱 실물 데모 — 태문 DEV STUDIO",
  description:
    "시간이 빚어낸 예술, 공간을 채우는 백 년의 헤리티지. 18~19세기 프랑스 루이 15세부터 영국 조지안 시대 오리지널 빈티지 앤틱 컬렉션 큐레이션 살롱 공식 실물 라이브 데모.",
  openGraph: {
    title: "Maison d'Antique (메종 당티크) | 하이엔드 앤틱 살롱 실물 데모",
    description: "태문 DEV STUDIO 하이엔드 D2C 브랜드·앤틱 살롱 특화 포트폴리오 라이브 데모",
    type: 'website',
  },
};

export default async function MaisonPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <MaisonPageClient isEmbed={isEmbed} />;
}
