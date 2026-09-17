import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import ArtisanGiftPageClient from './ArtisanGiftPageClient';

// 제목 뒤 「— 태문 DEV STUDIO」 는 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다.
// 제목·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'artisan-gift',
  title: 'ARTISAN & GIFT (아티장 앤 기프트) — 전통 공예 & 비스포크 기프팅 셀렉트샵',
  description:
    '태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 주문·결제는 접수되지 않습니다. 실시간 24K 골드박·불도장 각인 시뮬레이터, 4가지 전통 보자기 매듭 룩북, 카테고리·검색·정렬이 실제로 동작하는 백자 다기·황동 롤러볼 펜 컬렉션, 기념일 희망일 예약 배송 안내 및 슬라이드 카트 드로어를 한 페이지에 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function ArtisanGiftPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <ArtisanGiftPageClient isEmbed={isEmbed} />;
}
