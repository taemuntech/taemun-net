import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import AtelierVauclusePageClient from './AtelierVauclusePageClient';

// 제목·설명·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
// 가상 브랜드 샘플이라도 관리자가 비공개로 내릴 수 있으므로 데모는 전부 같은 규칙을 쓴다.
// 제목 뒤 「— 태문 DEV STUDIO」 는 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다. 링크 미리보기(카카오톡·메신저)에서
// 가장 먼저 읽히는 자리라, 화면 안 DemoDisclaimer 와 같은 고지를 여기 설명문에도 싣는다.
// 썸네일은 sampleMetadata 가 defaultThumbnail(slug) 로 자동으로 붙인다.
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'atelier-vaucluse',
  title:
    '아뜰리에 보클루즈 (ATELIER VAUCLUSE) — 하이엔드 인테리어 스튜디오',
  description:
    '태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 상담 신청은 접수되지 않습니다. 프로젝트 아카이브와 분류 필터, 상세·자재·저널 모달, 1:1 상담 신청 폼을 한 페이지에 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function AtelierVauclusePage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <AtelierVauclusePageClient isEmbed={isEmbed} />;
}
