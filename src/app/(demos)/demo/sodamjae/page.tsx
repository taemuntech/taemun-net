import type { Metadata } from 'next';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import SodamjaePageClient from './SodamjaePageClient';

// 제목·설명·og 는 **판정 뒤에** 내보낸다(근거·실측: src/lib/portfolio/demo-metadata.ts).
// 의뢰 없이 만든 제안 시안이다. 링크 미리보기에는 제목·설명만 보이므로 og·twitter 제목 앞에 「[제안 시안]」 을 붙이고,
// 공식·직영·업력처럼 그 공방의 공식 사이트나 주장으로 읽히는 말은 쓰지 않는다.
// 제목 뒤 「— 태문넷」 은 (demos) 레이아웃 템플릿이 붙인다 — 여기서 또 적으면 두 번 붙는다.
const TITLE = '소담재 한옥건축 — 한옥 설계·시공 공방 사이트 제안 시안';
const DESCRIPTION =
  '태문넷이 소담재 한옥건축에 제안하려고 만든 사이트 시안입니다. 해당 공방이 만들었거나 의뢰한 사이트가 아니며, 화면의 완공작·연혁·면허 번호·연락처는 예시입니다.';
const SHARE_TITLE = '[제안 시안] 소담재 한옥건축 — 한옥 설계·시공 공방 사이트';

const DEMO_METADATA: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: SHARE_TITLE,
    description: DESCRIPTION,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: SHARE_TITLE,
    description: DESCRIPTION,
  },
};

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function SodamjaePage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <SodamjaePageClient isEmbed={isEmbed} />;
}
