import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import TechnovaGearPageClient from './TechnovaGearPageClient';

// 제목 뒤 「— 태문넷」 은 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다.
// 제목·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'technova-gear',
  title: 'TECHNOVA GEAR (테크노바 기어) — 디지털 가전·하이테크 하드웨어 커머스',
  description:
    '태문넷이 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 주문·결제는 접수되지 않습니다. 그래픽·프로세서·디스플레이·메모리 스펙 필터와 3개 모델 대조 매트릭스, 쿨링 구조 분해도 뷰어, 섀시 I/O 포트 맵, 장바구니 드로어를 한 페이지에 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function TechnovaGearPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <TechnovaGearPageClient isEmbed={isEmbed} />;
}
