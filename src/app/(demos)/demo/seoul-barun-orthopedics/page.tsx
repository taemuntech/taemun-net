import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import SeoulBarunOrthopedicsPageClient from './SeoulBarunOrthopedicsPageClient';

const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'seoul-barun-orthopedics',
  title: 'BARUN MADI (서울 바른마디 척추관절 정형외과) — 비수술 척추·관절 & 도수재활센터',
  description:
    // 화면은 「이 자가체크는 의학적 진단이 아닙니다」라고 적어 두었는데 이 설명만 「자가진단」이라 서로 어긋났다.
    '태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 의료기관이 아니며 진료 예약은 접수되지 않습니다. 화면의 의료진·장비·수치·진료비는 모두 예시입니다. 부위별 통증 자가체크(의학적 진단이 아닙니다), 당일 MRI 원스톱 예약 화면, 100평 규모 1:1 도수운동재활센터와 비수술 치료 안내를 한 페이지에 담았습니다.',
});

export function generateMetadata(): Promise<Metadata> {
  return demoMetadata(DEMO_METADATA);
}

export default async function SeoulBarunOrthopedicsPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <SeoulBarunOrthopedicsPageClient isEmbed={isEmbed} />;
}
