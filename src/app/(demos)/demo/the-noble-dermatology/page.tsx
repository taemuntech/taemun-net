import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import TheNobleDermatologyPageClient from './TheNobleDermatologyPageClient';

const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'the-noble-dermatology',
  title: 'THE NOBLE (더 노블 청담 피부과의원) — 안티에이징 & 프라이빗 리프팅 센터',
  description:
    '태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 의료기관이 아니며 진료 예약은 접수되지 않습니다. 1회용 멸균 소모품 번호 조회 위젯, 4광원 피부 영상 분석 쇼케이스, 1인 단독 독립 VIP 케어룸 안내와 맞춤형 모바일 사전 문진 예약 화면을 한 페이지에 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function TheNobleDermatologyPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <TheNobleDermatologyPageClient isEmbed={isEmbed} />;
}
