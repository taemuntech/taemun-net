import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import OnsaemiroPageClient from './OnsaemiroPageClient';

const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'onsaemiro-plastic-surgery',
  title: '온새미로 성형외과의원 (ONSAEMIRO) — 순우리말 자연미 & 안면 황금비율 센터',
  description:
    // 화면의 전후 비교 슬라이더에는 「예시 이미지 · 개인차가 있으며 부작용이 있을 수 있습니다」 고지가 붙어 있는데
    // 이 설명만 실제 환자 전후 사진처럼 읽혔다(의료법 제56조 제2항 제3호 전후 사진 광고).
    '태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 의료기관이 아니며 진료 예약은 접수되지 않습니다. 화면의 의료진·수치·진료비는 모두 예시이고, 전후 비교 화면의 사진은 실제 환자가 아닌 예시 이미지입니다(결과에는 개인차가 있고 부작용이 있을 수 있습니다). 1:1:0.8 안면 비율 시뮬레이터, 예시 이미지 전후 비교 뷰어, 수술 실명제·1:1 마취과 전문의·보호자 CCTV 등 5대 안심안전망, 1인 VIP 리커버리 케어 안내를 한 페이지에 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function OnsaemiroPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <OnsaemiroPageClient isEmbed={isEmbed} />;
}
