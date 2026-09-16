import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import GreencubeAgriPageClient from './GreencubeAgriPageClient';

// 제목 뒤 「— 태문 DEV STUDIO」 는 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다.
// 제목·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'greencube-agri',
  title: '그린큐브 (GREENCUBE AGRI-TECH) — AI 클린룸 수직 스마트팜',
  description:
    '태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 B2B 상담·시설 투어는 접수되지 않습니다. 수확량·자원 절감 계산기, 분광 생육 시뮬레이터, 콜드체인 공정 소개, 클린룸 관제 모달을 한 페이지에 담았습니다. 화면의 수치는 모두 예시 값입니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function GreencubeAgriPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <GreencubeAgriPageClient isEmbed={isEmbed} />;
}
