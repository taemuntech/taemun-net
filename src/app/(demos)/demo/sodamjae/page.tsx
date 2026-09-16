import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import SodamjaePageClient from './SodamjaePageClient';

// 제목·설명·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
const DEMO_METADATA: Metadata = {
  title: '소담재 건축공방 (SODAMJAE) | 프리미엄 전통한옥 & 중목구조 실물 데모 — 태문 DEV STUDIO',
  description:
    '자연을 담고 시간을 품는 집, 현대인을 위한 프리미엄 한옥. 25년 도편수 직영 전통 결구 공법과 패시브 단열 설비가 융합된 소담재 건축공방 공식 실물 라이브 데모.',
  openGraph: {
    title: '소담재 건축공방 (SODAMJAE) | 프리미엄 전통한옥 & 중목구조 실물 데모',
    description: '태문 DEV STUDIO 건축·전통한옥 특화 포트폴리오 라이브 데모',
    type: 'website',
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function SodamjaePage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <SodamjaePageClient isEmbed={isEmbed} />;
}
