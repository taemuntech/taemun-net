import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import NordicPeakPageClient from './NordicPeakPageClient';

// 제목 뒤 「— 태문 DEV STUDIO」 는 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다.
// 제목·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'nordic-peak',
  title: 'NORDIC PEAK (노르딕 피크) — 테크니컬 아웃도어 & 익스페디션 기어 스토어',
  description:
    '태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 주문·결제는 접수되지 않습니다. 4단계 택티컬 기어 HUD 필터, 텐트 규격 & 피칭 블루프린트 시뮬레이터, 실시간 기상 텔레메트리 연동 뷰어, 장비 1:1 정밀 비교 매트릭스 및 설산 긴급 당일 직배송 신청 시스템을 한 페이지에 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function NordicPeakPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <NordicPeakPageClient isEmbed={isEmbed} />;
}
