import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import JeonglimTeaPageClient from './JeonglimTeaPageClient';

// 제목 뒤 「— 태문 DEV STUDIO」 는 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적지 않는다.
// 가상 브랜드 샘플이라 「실물·라이브 데모」 라고 쓰지 않는다. 링크 미리보기(카카오톡·메신저)에서
// 가장 먼저 읽히는 자리라, 화면 안 DemoDisclaimer 와 같은 고지를 여기 설명문에도 싣는다.
// 썸네일은 sampleMetadata 가 defaultThumbnail(slug) 로 자동으로 붙인다.
const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'jeonglim-tea',
  title:
    '정림다원 (靜林茶院) — 모던 한옥 티하우스 & 다도 공간',
  description:
    '태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 업체가 아니며 예약 신청은 접수되지 않습니다. 3대 한옥 다도 공간 핫스팟 투어, 소리 풍경 앰비언스 HUD, 고재·한지 자재 아카이브를 한 페이지에 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function JeonglimTeaPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <JeonglimTeaPageClient isEmbed={isEmbed} />;
}
