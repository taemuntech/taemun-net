import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import AtelierNoirPageClient from './AtelierNoirPageClient';

// 제목 뒤 「— 태문 DEV STUDIO」 는 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「라이브 데모」 라고 쓰지 않고, 화면의 브랜드·가격·후기가 예시라는 것을 밝힌다.
// 실존 쇼핑몰 이름을 비교 대상으로 적지 않는다 — 제휴·벤치마크로 읽힌다(옛 설명문에 국내 대형 편집숍 두 곳이 박혀 있었다).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'atelier-noir',
  title: '아틀리에 누아르 (ATELIER NOIR) — K-패션 디자이너 셀렉트샵',
  description:
    '태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 주문·결제·상담은 접수되지 않습니다. 카테고리·세부분류·속성을 겹쳐 거르는 필터 HUD, 쇼퍼블 핀이 달린 룩북, 체형별 실측 치수표, 장바구니·위시리스트 드로어를 한 페이지에 담았습니다. 상품명·브랜드·가격은 모두 예시 데이터입니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function AtelierNoirPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <AtelierNoirPageClient isEmbed={isEmbed} />;
}
