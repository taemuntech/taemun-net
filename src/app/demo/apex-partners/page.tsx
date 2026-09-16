import type { Metadata } from 'next';
import ApexPartnersPageClient from './ApexPartnersPageClient';

export const metadata: Metadata = {
  title: 'APEX PARTNERS — 글로벌 사모펀드(PE) & VC 대체투자 하우스 | 태문 DEV STUDIO',
  description:
    'AUM 4.2조 원, 10년 누적 Net IRR 24.8%, 글로벌 기관투자자(LP) 전용 데이터룸 및 포트폴리오 밸류업 대체투자 기업 랜딩 플래그십 실물 라이브 데모.',
  openGraph: {
    title: 'APEX PARTNERS — 글로벌 사모펀드(PE) & VC 대체투자 하우스',
    description: '태문 DEV STUDIO 글로벌 사모펀드 & 대체자산운용사 기업 랜딩 플래그십 라이브 데모',
    type: 'website',
  },
};

export default async function ApexPartnersPage({
  searchParams,
}: {
  searchParams: Promise<{ embed?: string }>;
}) {
  const params = await searchParams;
  const isEmbed = params.embed === 'true';

  return <ApexPartnersPageClient isEmbed={isEmbed} />;
}
