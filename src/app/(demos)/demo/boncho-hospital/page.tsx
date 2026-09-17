import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import BonchoHospitalPageClient from './BonchoHospitalPageClient';

const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'boncho-hospital',
  // 화면은 「암 통합진료 센터」·「병동 현황 안내 (예시 데이터)」로 고쳐졌는데 이 설명만 옛 문구로 남아 있었다.
  // 「암면역 치료」는 암 치료 효과 표방(의료법 제56조 제2항 제2호), 「24시간 실시간 병상 현황」은 없는 기능이다.
  title: '본초 통합한방병원 (BONCHO) — 의·한의 협진 80병상 암 통합진료·수술재활센터',
  description:
    '태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 의료기관이 아니며 진료 예약은 접수되지 않습니다. 화면의 의료진·병상·진료비·약재 정보는 모두 예시입니다. 의·한의 통합 진료와 수술 후 재활 안내, 전 객실 1인실·2인실 모션베드 360 가상 투어, hGMP 규격 청정 탕전 로트 조회 화면, 병동 현황 안내(예시 데이터)와 입원 예약 문의 화면을 한 페이지에 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function BonchoHospitalPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <BonchoHospitalPageClient isEmbed={isEmbed} />;
}
