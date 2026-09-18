import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import CelebrisBiopharmaPageClient from './CelebrisBiopharmaPageClient';

// 제목 뒤 「— 태문넷」 은 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다.
// 제목·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'celebris-biopharma',
  title: '셀레브리스 바이오파마 (CELEBRIS BIOPHARMA) — 표적단백질분해(TPD)·ADC 바이오텍',
  description:
    '태문넷이 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 파트너링·기술이전 신청은 접수되지 않습니다. 임상 단계별 파이프라인 매트릭스와 프로토콜 요약 모달, 분자 작용 기전(MoA) 시뮬레이션, 연구·생산 인프라 소개, 과학 자문단과 논문 초록을 한 페이지에 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function CelebrisBiopharmaPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <CelebrisBiopharmaPageClient isEmbed={isEmbed} />;
}
