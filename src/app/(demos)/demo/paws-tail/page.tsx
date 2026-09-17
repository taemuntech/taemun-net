import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import PawsTailPageClient from './PawsTailPageClient';

// 제목 뒤 「— 태문 DEV STUDIO」 는 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다.
// 제목·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'paws-tail',
  title: 'PAWS & TAIL VET (포우즈 앤 테일) — 프리미엄 반려동물 임상영양 & 맞춤 처방식 스토어',
  description:
    '태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 주문·결제는 접수되지 않습니다. AI 반려동물 영양 프로파일러(RER/DER 급여량 계산), 실물 100원 동전 대비 키블 1:1 스케일 뷰어, 수의사 온라인 무료 문진 연계, 영양 리포트(인쇄/PDF) 및 정기구독 15% 카트 드로어를 한 페이지에 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function PawsTailPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <PawsTailPageClient isEmbed={isEmbed} />;
}
