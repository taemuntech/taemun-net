import type { Metadata } from 'next';
import { sampleMetadata } from '@/components/demo-kit/sample-metadata';
import { demoMetadata } from '@/lib/portfolio/demo-metadata';
import SeoulBarunOrthopedicsPageClient from './SeoulBarunOrthopedicsPageClient';

const DEMO_METADATA: Metadata = sampleMetadata({
  slug: 'seoul-barun-orthopedics',
  title: 'BARUN MADI (서울 바른마디 척추관절 정형외과) — 비수술 척추·관절 & 도수재활센터',
  description:
    '태문 DEV STUDIO 가 만든 가상 브랜드 샘플입니다. 실제 의료기관이 아니며 진료 예약은 접수되지 않습니다. 5문항 인터랙티브 통증 자가진단 맵, 1.5T MRI 당일 판독 원스톱 패스트트랙 예약, 100평 규모 1:1 도수운동재활센터 및 비수술 재생치료 쇼케이스를 한 페이지에 담았습니다.',
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
